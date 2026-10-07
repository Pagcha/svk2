"use server"

import nodemailer from "nodemailer"

export type ContactState = {
  status: "idle" | "success" | "error"
  message: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  const honeypot = String(formData.get("company") ?? "").trim()
  if (honeypot) {
    return { status: "success", message: "Спасибо! Ваша заявка отправлена." }
  }

  if (!name) {
    return { status: "error", message: "Пожалуйста, укажите ваше имя." }
  }
  if (!phone && !email) {
    return { status: "error", message: "Укажите телефон или e-mail для связи." }
  }
  if (email && !isValidEmail(email)) {
    return { status: "error", message: "Проверьте правильность e-mail." }
  }

  const to = process.env.CONTACT_TO_EMAIL || "pagchahuy@gmail.com"
  const from = process.env.CONTACT_FROM_EMAIL || "pahas.bessonov@gmail.com"
  const smtpUser = process.env.SMTP_USER || "pahas.bessonov@gmail.com"
  const smtpPass = process.env.SMTP_PASS
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com"
  const smtpPort = Number(process.env.SMTP_PORT || "587")

  if (!smtpPass) {
    console.error("[contact] SMTP_PASS is missing")
    return {
      status: "error",
      message: "Почта не настроена. Добавьте SMTP_PASS в .env.local.",
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      from: `"СВК Технолоджи" <${from}>`,
      to,
      replyTo: email || undefined,
      subject: `Новая заявка с сайта — ${name}`,
      text: [
        `Имя: ${name}`,
        `Телефон: ${phone || "—"}`,
        `E-mail: ${email || "—"}`,
        "",
        "Сообщение:",
        message || "—",
      ].join("\n"),
    })

    return { status: "success", message: "Спасибо! Ваша заявка отправлена." }
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error)
    console.error("[contact] Ошибка отправки письма:", details)

    const isAuthError = /535|Username and Password not accepted|Authentication failed|Invalid login|535-5\.7\.8|gmail/i.test(details)
    const isTlsError = /certificate|STARTTLS|SSL|TLS|ECONNRESET|ETIMEDOUT/i.test(details)

    return {
      status: "error",
      message: isAuthError
        ? "Не удалось войти в Gmail по SMTP. Проверьте пароль приложения и включён ли двухэтапный вход."
        : isTlsError
          ? "Ошибка подключения к SMTP Gmail. Проверьте хост, порт и TLS/SSL-настройки."
          : "Не удалось отправить заявку. Попробуйте позже.",
    }
  }
}
