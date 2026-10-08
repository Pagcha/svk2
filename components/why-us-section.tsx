"use client"

import { useEffect, useRef } from "react"
import { setupRevealOnViewport } from "@/lib/utils"

const reasons = [
  "Более 10 лет опыта на рынке. Работаем в сфере промышленного снабжения с 2015 года. За это время мы заслужили доверие крупнейших предприятий региона (включая ПАО «НЛМК» и «Лебедяньмолоко»), успешно решая задачи для тяжелой металлургии и пищевой промышленности.",
  "Сборка строго по вашему ТЗ. Исключаем любые отклонения от конструкторской документации. Собираем пневмомеханизмы и сложные пневмосхемы в точном соответствии с вашими инженерными чертежами, стандартами и спецификациями.",
  "Комплексные поставки компонентов. Не ограничиваемся стандартными решениями. Поставляем широкий спектр промышленного оборудования — от пневматики и гидравлики до компрессорных систем и КИПиА. Вы получаете все необходимые узлы от одного надежного партнера.",
  "Собственный склад в Липецке. Оперативно комплектуем заказы и осуществляем сборку благодаря отлаженной логистике и постоянному наличию востребованного пневмооборудования на складе. Это минимизирует сроки отгрузки и защищает ваши линии от простоев.",
]

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = Array.from(section.querySelectorAll("article"))
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
      ref={sectionRef}
      id="why-us"
      aria-labelledby="why-us-heading"
      className="section-ambient relative overflow-hidden border-b border-gray-300/50 bg-gradient-to-b from-white via-slate-50 to-slate-100"
    >
      <div className="ambient-orb ambient-orb--1" />
      <div className="ambient-orb ambient-orb--2" />
      <div className="ambient-orb ambient-orb--3" />

      <div className="site-shell relative grid gap-10 py-12 lg:grid-cols-[minmax(0,0.9fr)_2fr] lg:items-center lg:gap-12 lg:py-16">
        <div className="space-y-4">
          <span className="inline-flex border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-700">
            Почему мы
          </span>
          <h2
            id="why-us-heading"
            className="bg-gradient-to-r from-red-700 via-red-500 to-slate-900 bg-clip-text text-[clamp(1.7rem,2.2vw,2.5rem)] font-black leading-[1.08] tracking-[-0.04em] text-transparent"
          >
            Наши главные преимущества
          </h2>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {reasons.map((text, index) => (
            <li key={index}>
              <article
                className="why-card group relative h-full overflow-hidden border border-red-100 bg-white/85 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_32px_rgba(239,68,68,0.12)]"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.12),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-9 w-9 items-center justify-center bg-red-600 text-sm font-bold text-white shadow-[0_8px_18px_rgba(239,68,68,0.35)]">
                      {index + 1}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-red-300 via-red-100 to-transparent" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">{text}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
