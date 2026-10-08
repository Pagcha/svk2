"use client"

import { useEffect, useRef } from "react"
import { Cog, ShieldCheck, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { setupRevealOnViewport } from "@/lib/utils"

type Competency = {
  icon: LucideIcon
  title: string
  description: string
}

const competencies: Competency[] = [
  {
    icon: Cog,
    title: "Проектирование и инжиниринг",
    description:
      "Разрабатываем инженерные решения под задачи заказчика: расчёты, подбор оборудования и подготовка технической документации на всех этапах проекта.",
  },
  {
    icon: Wrench,
    title: "Монтаж и пусконаладка",
    description:
      "Выполняем монтажные работы и пусконаладку силами собственных специалистов, обеспечивая ввод оборудования в эксплуатацию точно в срок.",
  },
  {
    icon: ShieldCheck,
    title: "Сервис и поддержка",
    description:
      "Обеспечиваем регламентное и аварийное обслуживание, поставку запасных частей и техническую поддержку на протяжении всего срока эксплуатации.",
  },
]

export function CompetenciesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = Array.from(section.querySelectorAll("article"))

    const showCards = () => {
      const timers: number[] = []

      cards.forEach((card, index) => {
        const t = window.setTimeout(() => {
          card.classList.add("is-visible")
        }, index * 120)
        timers.push(t)
      })

      return () => {
        timers.forEach((id) => clearTimeout(id))
      }
    }

    return setupRevealOnViewport(section, showCards, {
      threshold: 0.25,
      viewportFactor: 0.85,
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="competencies"
      aria-labelledby="competencies-heading"
      className="section-ambient border-b border-gray-300/50 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="ambient-orb ambient-orb--1" />
      <div className="ambient-orb ambient-orb--2" />
      <div className="site-shell py-12 lg:py-16">
        <h2
          id="competencies-heading"
          className="mb-10 bg-gradient-to-r from-red-700 via-red-500 to-slate-900 bg-clip-text text-center text-[clamp(1.7rem,2.2vw,2.5rem)] font-black leading-[1.08] tracking-[-0.04em] text-transparent"
        >
          Наши основные компетенции
        </h2>

        <ul className="flex flex-col gap-6">
          {competencies.map(({ icon: Icon, title, description }, index) => {
            const iconFirst = index % 2 === 0
            return (
              <li key={title}>
                <article
                  className={`competency-card card-appear group relative flex flex-col overflow-hidden border border-gray-300/40 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_36px_rgba(239,68,68,0.12)] sm:flex-row ${
                    iconFirst ? "" : "sm:flex-row-reverse"
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.12),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div
                    className={`relative z-10 flex shrink-0 items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-red-700 p-6 sm:w-44 ${
                      iconFirst ? "sm:border-r" : "sm:border-l"
                    } sm:border-red-300/40`}
                  >
                    <div className="flex h-16 w-16 items-center justify-center border border-white/25 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon
                        className="competency-icon h-8 w-8 text-white transition-transform duration-500 group-hover:scale-110"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col justify-center gap-2 p-6 sm:p-8">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.7)]" />
                      <h3 className="text-lg font-bold text-black">{title}</h3>
                    </div>
                    <p className="text-pretty leading-relaxed text-slate-700">
                      {description}
                    </p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
