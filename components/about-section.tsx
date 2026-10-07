"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { setupRevealOnViewport } from "@/lib/utils"

export function AboutSection() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const items = Array.from(section.querySelectorAll("[data-reveal]"))
    const revealItems = () => {
      const timers: number[] = []

      items.forEach((item, index) => {
        const t = window.setTimeout(() => {
          item.classList.add("is-visible")
        }, index * 120)
        timers.push(t)
      })

      return () => {
        timers.forEach((id) => clearTimeout(id))
      }
    }

    return setupRevealOnViewport(section, revealItems, {
      threshold: 0.25,
      viewportFactor: 0.85,
    })
  }, [])

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className="section-ambient flex min-h-screen items-center border-b border-gray-300/50 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="ambient-orb ambient-orb--1" />
      <div className="ambient-orb ambient-orb--2" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <h2
          id="about-heading"
          className="mb-10 bg-gradient-to-r from-red-700 via-red-500 to-slate-900 bg-clip-text text-center text-[clamp(1.7rem,2.2vw,2.5rem)] font-black leading-[1.08] tracking-[-0.04em] text-transparent"
        >
          О нас
        </h2>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div
            data-reveal
            className="info-card about-card group relative flex items-center overflow-hidden rounded-3xl border border-gray-300/40 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.12),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="relative z-10 text-pretty leading-relaxed text-slate-700">
              СВК Технолоджи — инженерные решения под ключ для вашего бизнеса и производства.
              Мы берём на себя полный цикл инженерно-технических работ: от первичного аудита
              и проектирования до поставки, монтажа и пусконаладки инженерных систем.
              Тесное сотрудничество с ведущими мировыми и отечественными производителями 
              оборудования позволяет нам находить оптимальные технические решения под задачи
              любой сложности. Мы гарантируем высокую надёжность, строгое соблюдение сроков
              и обеспечиваем полное сервисное обслуживание на протяжении всего срока эксплуатации систем.
            </p>
          </div>

          <div
            data-reveal
            className="about-card relative min-h-64 overflow-hidden rounded-3xl border border-gray-300/40 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.12),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Image
              src="/about-facility.png"
              alt="Производственный объект компании СВК Технолоджи"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
