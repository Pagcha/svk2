"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "О нас", href: "#about" },
  { label: "Компетенции", href: "#competencies" },
  { label: "Товары", href: "#products" },
  { label: "Партнёры", href: "#partners" },
  { label: "Преимущества", href: "#why-us" },
  { label: "Контакты", href: "#contacts" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-red-600/30 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-8 px-4 py-2 sm:px-6 md:justify-center">
        <Link href="/" className="flex shrink-0 items-center" aria-label="СВК Технолоджи — на главную">
          <img
            src="/logos/svk-logo.png"
            alt="СВК Технолоджи"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:items-stretch md:self-stretch" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center border-l border-gray-300 px-5 text-sm font-semibold tracking-[0.14em] text-slate-700 transition-colors last:border-r last:border-gray-300 hover:text-red-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      <nav
        id="mobile-nav"
        aria-label="Мобильная навигация"
        className={cn(
          "border-t border-gray-300 bg-white md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-gray-300 py-3 text-sm font-semibold tracking-[0.14em] text-slate-700 last:border-b-0 hover:text-red-700"
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
