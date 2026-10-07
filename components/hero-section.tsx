"use client"

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null)

  return (
    <section
      ref={ref}
      aria-label="Приветствие"
      className="section-ambient relative isolate overflow-hidden border-b border-red-600/40 bg-gradient-to-br from-white via-slate-50 to-white"
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
        <div className=" opacity-90 absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.20),_transparent_70%),linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(248,250,252,0.95))]" />
      </div>

      <div className="mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center gap-5 px-4 py-20 text-center sm:px-6 lg:min-h-[94vh]">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-red-700">
          СВК Технолоджи
        </p>
        <h1 className="max-w-4xl text-balance text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-6xl">
          Инженерные решения для вашего бизнеса
        </h1>
        <p className="max-w-2xl text-pretty text-sm text-slate-700 sm:text-base">
          Проектирование, поставка и обслуживание технологического оборудования
          с полным циклом сопровождения.
        </p>
      </div>
    </section>
  )
}
