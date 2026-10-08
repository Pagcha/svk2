"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Товары", href: "#products" },
  { label: "О нас", href: "#about" },
  { label: "Компетенции", href: "#competencies" },
  { label: "Партнёры", href: "#partners" },
  { label: "Преимущества", href: "#why-us" },
  { label: "Контакты", href: "#contacts" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-red-200/80 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="site-shell grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-3">
        <Link href="/" className="flex shrink-0 items-center justify-self-start" aria-label="СВК Технолоджи — на главную">
          <span className="flex items-center justify-center p-2">
            <img
              src="/logos/svk-logo.png"
              alt="СВК Технолоджи"
              className="h-8 w-auto object-contain"
            />
          </span>
        </Link>

        <nav className="hidden items-center justify-self-center md:flex" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex items-center px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-700 transition-all duration-200 hover:text-red-700"
            >
              <span className="absolute inset-x-2 bottom-1 h-px scale-x-0 bg-red-600 transition-transform duration-200 group-hover:scale-x-100" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="justify-self-end md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center p-2 text-slate-700"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Мобильная навигация"
        className={cn(
          "border-t border-gray-200 bg-white/95 md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="site-shell py-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-gray-200 py-3 text-sm font-semibold tracking-[0.14em] text-slate-700 last:border-b-0 hover:text-red-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
