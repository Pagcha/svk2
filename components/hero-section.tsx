"use client"

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null)

  return (
    <section
      ref={ref}
      aria-label="Приветствие"
      className="section-ambient relative isolate overflow-hidden border-b border-red-200/80 bg-gradient-to-br from-white via-slate-50 to-white"
    >
      <div className="ambient-orb ambient-orb--1" />
      <div className="ambient-orb ambient-orb--2" />
      <div className="ambient-orb ambient-orb--3" />

      <div className="absolute inset-0 -z-10">
        <Image
          src="/about-facility.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.18),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.85),_rgba(248,250,252,0.85))]" />
      </div>

      <div className="mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:min-h-[94vh]">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <span className="hero-chip">СВК Технолоджи</span>
          <span className="hero-chip hero-chip--muted">Пневмоавтоматика</span>
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

        {/* <div className="mt-10 grid w-full max-w-4xl gap-3 sm:grid-cols-3">
          {[
            ['10+', 'лет опыта'],
            ['300+', 'проектов'],
            ['100%', 'довольных клиентов'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <div className="text-2xl font-black tracking-[-0.05em] text-slate-900">{value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-600">{label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}
