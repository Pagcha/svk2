"use client"

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = ref.current

    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const offset = Math.max(-80, Math.min(80, rect.top * 0.18))
      const image = section.querySelector("[data-hero-bg]") as HTMLElement | null

      if (image) {
        image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Приветствие"
      className="section-ambient relative isolate overflow-hidden border-b border-red-200/80 bg-gradient-to-br from-white via-slate-50 to-white"
    >
      <div className="ambient-orb ambient-orb--1" />
      <div className="ambient-orb ambient-orb--2" />
      <div className="ambient-orb ambient-orb--3" />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          data-hero-bg
          className="absolute inset-0 transition-transform duration-75 ease-out"
          style={{ willChange: 'transform' }}
        >
          <Image
            src="/fon1.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-100 scale-[1.13]"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.18),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.85),_rgba(248,250,252,0.85))]" />
      </div>

      <div className="site-shell hero-content relative z-10 flex min-h-[92vh] flex-col items-center justify-center py-20 text-center lg:min-h-[94vh]">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          
        </div>

        <h1 className="max-w-5xl text-balance text-3xl font-black tracking-[-0.06em] text-black sm:text-5xl lg:text-7xl">
          Инженерные решения
          <span className="mt-2 block bg-gradient-to-r from-red-700 via-red-500 to-slate-900 bg-clip-text text-transparent">
          для вашего бизнеса
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-sm text-slate-700 sm:text-lg">
          Проектирование, поставка и обслуживание технологического оборудования
          с полным циклом сопровождения — от расчёта до ввода в эксплуатацию.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contacts"
            className="hero-cta hero-cta--primary"
          >
            Получить консультацию
          </a>
          <a
            href="#products"
            className="hero-cta hero-cta--secondary"
          >
            Смотреть каталог
          </a>
        </div>
      </div>
    </section>
  )
}
