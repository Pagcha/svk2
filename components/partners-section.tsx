'use client';

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { setupRevealOnViewport } from "@/lib/utils"

const partners = [
  {
    name: "MetalWork",
    src: "/logos/metalwork.png",
    description:
      "Итальянский производитель премиального пневмооборудования, известного надежностью и высокими стандартами качества в сфере промышленной автоматизации. Компания предлагает широкий спектр высокоточных компонентов — от пневмоцилиндров до систем подготовки воздуха, идеально подходящих для сложных эксплуатационных условий.",
  },
  {
    name: "Festo",
    src: "/logos/festo.png",
    description:
      "Немецкий технологический гигант и признанный эталон в сфере промышленной автоматизации и пневматических систем. Инновационные решения Festo задают стандарты эффективности, цифровизации и точности по всему миру.",
  },
  {
    name: "Camozzi",
    src: "/logos/camozzi.png",
    description:
      "Итальянский производитель пневматических компонентов, сочетающий инновационные инженерные разработки с европейским качеством. Продукция компании широко используется для автоматизации производственных процессов и управления технологическими потоками.",
  },
  {
    name: "Airtac",
    src: "/logos/airtac.png",
    description:
      "Один из крупнейших международных поставщиков высококлассного пневмооборудования с современным производством в Азии. Продукция бренда ценится за функциональность, широкую номенклатуру и высокую экономическую эффективность.",
  },
  {
    name: "Pemaks",
    src: "/logos/pemaks.png",
    description:
      "Турецкий бренд, специализирующийся на производстве высококачественных пневмоцилиндров и вспомогательного оборудования. Компания предлагает оптимальное соотношение доступной цены и долговечности для решения базовых и специализированных задач.",
  },
  {
    name: "Aignep",
    src: "/logos/aignep.png",
    description:
      "Итальянский производитель премиальных фитингов, быстроразъемных соединений и пневмораспределителей. Компания известна непревзойденной точностью изготовления, высокими стандартами безопасности и эстетичным дизайном каждого узла.",
  },
  {
    name: "Dalgakiran",
    src: "/logos/dalgakiran.png",
    description:
      "Международный гигант с турецкими корнями, один из ведущих производителей компрессорного оборудования и систем подготовки сжатого воздуха. Оборудование компании славится высокой производительностью, энергоэффективностью и стабильной работой в непрерывном цикле.",
  },
  {
    name: "Smarta",
    src: "/logos/smarta.webp",
    description:
      "Специализированный бренд, предлагающий современную запорно-регулирующую арматуру и элементы управления пневматическими системами. Продукция сочетает в себе компактные габариты, простоту монтажа и надежность при работе с различными рабочими средами.",
  },
  {
    name: "Magnus",
    src: "/logos/magnus.png",
    description:
      "Поставщик доступного протекционного и технологичного пневматического оборудования, ориентированного на базовые задачи автоматизации. Бренд привлекает оптимальным балансом стоимости и достойного качества для бюджетоориентированных проектов.",
  },
  {
    name: "KipValve",
    src: "/logos/kipvalve.png",
    description:
      "Российский разработчик и поставщик надежной трубопроводной арматуры и пневматических компонентов для автоматизации производства. Продукция бренда отлично адаптирована под жесткие условия эксплуатации и предлагает доступную альтернативу мировым аналогам.",
  },
] as const

const loopedPartners = [...partners, ...partners]

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLUListElement | null>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const metricsRef = useRef({ setWidth: 0, step: 0, maxScroll: 0 })

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const items = track.children
    if (items.length <= partners.length) return

    const first = items[0].getBoundingClientRect()
    const clone = items[partners.length].getBoundingClientRect()
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0

    metricsRef.current = {
      setWidth: clone.left - first.left,
      step: first.width + gap,
      maxScroll: track.scrollWidth - track.clientWidth,
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const timers: number[] = []
    const revealCards = () => {
      const cards = Array.from(section.querySelectorAll("[data-reveal]"))
      cards.forEach((card, index) => {
        const t = window.setTimeout(() => card.classList.add("is-visible"), index * 100)
        timers.push(t)
      })
    }

    const cleanup = setupRevealOnViewport(section, revealCards, {
      threshold: 0.2,
      viewportFactor: 0.9,
    })

    return () => {
      cleanup?.()
      timers.forEach((id) => clearTimeout(id))
    }
  }, [])

  useEffect(() => {
    measure()
    const track = trackRef.current
    if (!track) return
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [measure])

  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const { setWidth, maxScroll } = metricsRef.current
    if (setWidth <= 0) return

    if (track.scrollLeft <= 1) {
      track.scrollLeft += setWidth
    } else if (track.scrollLeft >= maxScroll - 1) {
      track.scrollLeft -= setWidth
    }
  }, [])

  const scrollCards = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const { setWidth, step, maxScroll } = metricsRef.current
    if (setWidth <= 0 || step <= 0) return

    if (direction === 1 && track.scrollLeft + step > maxScroll - 1) {
      track.scrollLeft -= setWidth
    } else if (direction === -1 && track.scrollLeft - step < 1) {
      track.scrollLeft += setWidth
    }

    track.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
  }

  const toggleCard = (index: number) =>
    setActiveCard((prev) => (prev === index ? null : index))

  return (
    <section
      ref={sectionRef}
      id="partners"
      aria-labelledby="partners-heading"
      className="section-ambient border-b border-red-950/10 bg-gradient-to-b from-white to-slate-100"
    >
      <div className="ambient-orb ambient-orb--1" />
      <div className="ambient-orb ambient-orb--2" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <h2
          id="partners-heading"
          className="mb-10 bg-gradient-to-r from-red-700 via-red-500 to-slate-900 bg-clip-text text-center text-[clamp(1.7rem,2.2vw,2.5rem)] font-black leading-[1.08] tracking-[-0.04em] text-transparent"
        >
          Генеральные партнёры компании
        </h2>

        <div className="relative mx-auto w-[95%] max-w-[1400px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center">
            <button
              type="button"
              aria-label="Прокрутить партнёров назад"
              onClick={() => scrollCards(-1)}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-700 shadow-lg shadow-slate-200/80 backdrop-blur-sm transition hover:border-red-200 hover:text-red-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center">
            <button
              type="button"
              aria-label="Прокрутить партнёров вперёд"
              onClick={() => scrollCards(1)}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-700 shadow-lg shadow-slate-200/80 backdrop-blur-sm transition hover:border-red-200 hover:text-red-600"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <ul
            ref={trackRef}
            onScroll={handleScroll}
            tabIndex={0}
            role="region"
            aria-label="Карточки партнёров, прокручиваемый список"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-16 pr-16 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {loopedPartners.map(({ name, src, description }, index) => {
              const isClone = index >= partners.length
              const isActive = activeCard === index

              return (
                <li
                  key={`${name}-${index}`}
                  aria-hidden={isClone || undefined}
                  className="group relative w-[240px] shrink-0 snap-center sm:w-[250px] lg:w-[260px]"
                >
                  <div
                    data-reveal
                    role="button"
                    tabIndex={isClone ? -1 : 0}
                    aria-pressed={isActive}
                    aria-label={`${name}: показать описание`}
                    onClick={() => toggleCard(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        toggleCard(index)
                      }
                    }}
                    className="partner-card relative flex aspect-[1/1.35] w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-gray-300/50 bg-gradient-to-br from-white to-slate-50 p-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_18px_32px_rgba(239,68,68,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  >
                    <Image
                      src={src}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 220px, (max-width: 1024px) 240px, 260px"
                      className={`object-contain p-3 transition duration-300 group-hover:brightness-75 ${
                        isActive ? "brightness-75" : ""
                      }`}
                    />

                    <div
                      className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/15 transition duration-300 group-hover:opacity-100 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="max-w-[80%] rounded-xl border border-slate-400/40 bg-white/95 px-3 py-2 text-center backdrop-blur-sm">
                        <div className="text-sm font-bold text-slate-900">{name}</div>
                        <p className="mt-1 font-semibold text-[12px] leading-relaxed text-slate-700">{description}</p>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}