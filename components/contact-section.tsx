"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { User, Phone, Mail, MapPin, Clock3 } from "lucide-react"
import { submitContact, type ContactState } from "@/app/actions/contact"
import { setupRevealOnViewport } from "@/lib/utils"

const initialState: ContactState = { status: "idle", message: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(220,38,38,0.3)] transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Отправка…" : "Отправить заявку"}
    </button>
  )
}

export function ContactSection() {
  const [state, formAction] = useActionState(submitContact, initialState)
  const [copiedValue, setCopiedValue] = useState<string | null>(null)
  const ref = useRef<HTMLElement | null>(null)

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedValue(value)
      window.setTimeout(() => {
        setCopiedValue((current) => (current === value ? null : current))
      }, 1200)
    } catch {
      console.error("Не удалось скопировать значение в буфер обмена")
    }
  }

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const cards = Array.from(section.querySelectorAll("[data-contact-reveal]"))
    const revealCards = () => {
      const timers: number[] = []

      cards.forEach((card, index) => {
        const t = window.setTimeout(() => {
          card.classList.add("is-visible")
        }, index * 120)
        timers.push(t)
      })

      return () => timers.forEach((id) => clearTimeout(id))
    }

    return setupRevealOnViewport(section, revealCards, {
      threshold: 0.2,
      viewportFactor: 0.9,
    })
  }, [])

  return (
    <section
      ref={ref}
      id="contacts"
      aria-labelledby="contacts-heading"
      className="section-ambient relative overflow-hidden border-b border-red-950/40 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.18),transparent_30%),linear-gradient(180deg,#2f0d12_0%,#1c1013_100%)] text-white"
    >
      <div className="ambient-orb ambient-orb--1" />
      <div className="ambient-orb ambient-orb--2" />
      <div className="ambient-orb ambient-orb--3" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_32%)]" />

      <div className="site-shell relative py-12 lg:py-16">
        <h2
          id="contacts-heading"
          className="border-b border-red-400/30 pb-5 text-center text-2xl font-black text-white sm:text-3xl"
        >
          Свяжитесь с нами
        </h2>

        <form action={formAction} className="mt-8">
          <div className="grid gap-8 border border-red-500/20 bg-white/5 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-6 md:grid-cols-2 md:gap-12">
            <div className="space-y-4">
              {/* Наши контакты */}
              <div
                data-contact-reveal
                className="contact-card border border-white/10 bg-black/10 p-4 transition-all duration-200 hover:border-red-300/60 hover:bg-black/15 hover:shadow-[0_12px_28px_rgba(239,68,68,0.12)] sm:p-5"
              >
                <div className="mb-4 flex items-center gap-2 text-red-200">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-red-100">
                    ОФИС В ЛИПЕЦКЕ
                  </h3>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/80">
                  

                  <a
                    href="https://yandex.ru/maps/org/svk_tekhnolodzhi/68810926737/?ll=39.536257%2C52.633242&z=16"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex w-full items-start gap-3 border border-transparent p-2 text-left transition-colors hover:border-red-300/40 hover:bg-white/5"
                  >
                    <MapPin className="mt-0.5 size-4 shrink-0 text-red-200 transition group-hover:text-red-100" />
                    <span className="text-white/85 transition group-hover:text-white">
                      <span className="font-medium text-white/85">Адрес:</span> Липецкая область, г. Липецк, ул. Виктора Музыки, 3, пом. 16
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy("+7 (4742) 20-36-48")}
                    className="flex w-full items-start gap-3 border border-transparent p-2 text-left transition-colors hover:border-red-300/40 hover:bg-white/5"
                  >
                    <Phone className="mt-0.5 size-4 shrink-0 text-red-200" />
                    <div className="text-left">
                      <span className="font-medium text-white/85">Телефон: </span>
                      <span className="text-white/85 transition hover:text-red-200">
                        {copiedValue === "+7 (4742) 20-36-48" ? "Скопировано" : "+7 (4742) 20-36-48"}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy("info@svk-tech.ru")}
                    className="flex w-full items-start gap-3 border border-transparent p-2 text-left transition-colors hover:border-red-300/40 hover:bg-white/5"
                  >
                    <Mail className="mt-0.5 size-4 shrink-0 text-red-200" />
                    <div className="text-left">
                      <span className="font-medium text-white/85">E-mail: </span>
                      <span className="text-white/85 transition hover:text-red-200">
                        {copiedValue === "info@svk-tech.ru" ? "Скопировано" : "info@svk-tech.ru"}
                      </span>
                    </div>
                  </button>
                  <div className="flex items-start gap-3 border border-transparent p-2 transition-colors hover:border-red-300/40 hover:bg-white/5">
                    <Clock3 className="mt-0.5 size-4 shrink-0 text-red-200" />
                    <span className="text-left text-white/85">Пн–Пт: 8:00–17:00</span>
                  </div>
                </div>
              </div>

              {/* Офис в Воронеже */}
              <div
                data-contact-reveal
                className="contact-card border border-white/10 bg-black/10 p-4 transition-all duration-200 hover:border-red-300/60 hover:bg-black/15 hover:shadow-[0_12px_28px_rgba(239,68,68,0.12)] sm:p-5"
              >
                <div className="mb-4 flex items-center gap-2 text-red-200">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-red-100">
                    Офис в Воронеже
                  </h3>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/80">
                  <a
                    href="https://yandex.ru/maps/org/svk_tekhnolodzhi/35781136006/?ll=39.178686%2C51.686919&mode=search&sctx=ZAAAAAgBEAAaKAoSCXqp2JjXq0NAEZNwIY%2Fg2ElAEhIJDJQUWABT9j8RV81zRL7L4D8iBgABAgMEBSgKOABAs80GSABiOnJlYXJyPXNjaGVtZV9Mb2NhbC9HZW91cHBlci9BZHZlcnRzL0N1c3RvbU1heGFkdi9FbmFibGVkPTFiOnJlYXJyPXNjaGVtZV9Mb2NhbC9HZW91cHBlci9BZHZlcnRzL0N1c3RvbU1heGFkdi9NYXhhZHY9MTViRHJlYXJyPXNjaGVtZV9Mb2NhbC9HZW91cHBlci9BZHZlcnRzL0N1c3RvbU1heGFkdi9SZWdpb25JZHM9WzEsMTAxNzRdYkByZWFycj1zY2hlbWVfTG9jYWwvR2VvdXBwZXIvQWR2ZXJ0cy9NYXhhZHZUb3BNaXgvTWF4YWR2Rm9yTWl4PTEwagJydZ0BzczMPaABAKgBAL0BY8osRcIBBoad46WFAYICG9Ch0JLQmiDQotCV0KXQndCe0JvQntCU0JbQmIoCAJICAJoCDGRlc2t0b3AtbWFwcw%3D%3D&sll=39.178686%2C51.686919&sspn=0.033044%2C0.012433&text=%D0%A1%D0%92%D0%9A%20%D0%A2%D0%95%D0%A5%D0%9D%D0%9E%D0%9B%D0%9E%D0%9B%D0%96%D0%98&z=15.4"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 border border-transparent p-2 transition-colors hover:border-red-300/40 hover:bg-white/5"
                  >
                    <MapPin className="mt-0.5 size-4 shrink-0 text-red-200 transition group-hover:text-red-100" />
                    <span className="text-left text-white/85 transition group-hover:text-white">
                      Адрес: г. Воронеж, ул. Дружинников, д. 10, офис 102 (1 этаж, БЦ «Дельта»)
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy("+7 (920) 504-90-22")}
                    className="flex w-full items-start gap-3 border border-transparent p-2 text-left transition-colors hover:border-red-300/40 hover:bg-white/5"
                  >
                    <Phone className="mt-0.5 size-4 shrink-0 text-red-200" />
                    <div className="text-left">
                      <span className="font-medium text-white/85">Телефон: </span>
                      <span className="text-white/85 transition hover:text-red-200">
                        {copiedValue === "+7 (920) 504-90-22" ? "Скопировано" : "+7 (920) 504-90-22"}
                      </span>
                    </div>
                  </button>

                  <div className="flex items-start gap-3 border border-transparent p-2 transition-colors hover:border-red-300/40 hover:bg-white/5">
                    <Clock3 className="mt-0.5 size-4 shrink-0 text-red-200" />
                    <span className="text-left text-white/85">Пн–Пт: 8:00–17:00</span>
                  </div>

                  
                </div>
              </div>
            </div>

            {/* Оставьте заявку */}
            <div data-contact-reveal className="contact-card border border-white/10 bg-black/10 p-4 sm:p-5">
              <h3 className="text-center text-sm font-semibold text-white/90">
                Оставьте заявку
              </h3>
              <div className="mt-4 space-y-3">
                <Field icon={<User className="size-4" />} htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Имя"
                    autoComplete="name"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                  />
                </Field>
                <Field icon={<Phone className="size-4" />} htmlFor="phone">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Телефон"
                    autoComplete="tel"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                  />
                </Field>
                <Field icon={<Mail className="size-4" />} htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    autoComplete="email"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                  />
                </Field>

                <div className="border border-red-400/30 bg-white/5 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-all duration-200 focus-within:border-red-300 focus-within:shadow-[0_0_0_3px_rgba(251,113,133,0.15)]">
                  <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-red-100/90">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="По какому вопросу вам требуется консультация?"
                    className="w-full min-h-64 resize-y bg-transparent text-sm leading-relaxed text-white placeholder:text-white/50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <SubmitButton />
          </div>

          {/* Honeypot для защиты от ботов */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="company">Не заполняйте это поле</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({
  icon,
  htmlFor,
  children,
}: {
  icon: React.ReactNode
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-3 border border-white/15 bg-white/5 px-3 py-2.5 text-white transition-all duration-200 focus-within:border-red-300 focus-within:bg-white/8 focus-within:shadow-[0_0_0_3px_rgba(251,113,133,0.18)]"
    >
      <span className="text-red-200">{icon}</span>
      {children}
    </label>
  )
}
