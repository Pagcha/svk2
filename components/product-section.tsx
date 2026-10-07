"use client";

import React, { useEffect } from "react";

type Product = {
  name: string;
  category: string;
  image: string;
};

const categoryGroups = [
  {
    category: "Актуаторы",
    items: [
      { name: "Пневмоцилиндры", category: "Актуаторы", image: "/products/cilinder.png" },
      { name: "Пневмоприводы", category: "Актуаторы", image: "/products/povorotniy.png" },
      { name: "Пневмомоторы", category: "Актуаторы", image: "/products/motor.png" },
    ],
  },
  {
    category: "Пневмомагистраль",
    items: [
      { name: "Фитинги", category: "Пневмомагистраль", image: "/products/fistingi.png" },
      { name: "Трубы и шланги", category: "Пневмомагистраль", image: "/products/trubki.png" },
      { name: "Блоки подготовки воздуха", category: "Пневмомагистраль", image: "/products/block.png" },
    ],
  },
  {
    category: "Регулировка и управление",
    items: [
      { name: "Распределители", category: "Регулировка воздуха", image: "/products/raspredblock.png" },
      { name: "Редукторы", category: "Регулировка воздуха", image: "/products/reductor.png" },
      { name: "Дроссели", category: "Регулировка воздуха", image: "/products/drossel.png" },
    ],
  },
  {
    category: "Элементы автоматизации",
    items: [
      { name: "Пневмоострова", category: "Управление", image: "/products/ostrov.png" },
      { name: "Датчики, реле, индикаторы", category: "Управление", image: "/products/rele.png" },
      { name: "Контроллеры", category: "Управление", image: "/products/controller.png" },
    ],
  },
] as const;

export default function ProductsSection() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;

          if (entry.isIntersecting) {
            target.setAttribute("data-reveal-visible", "true");
            return;
          }

          target.setAttribute("data-reveal-visible", "false");
        });
      },
      {
        threshold: 0.18,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.12),transparent_38%),linear-gradient(180deg,#ffffff_0%,#fff7f7_38%,#f8fafc_100%)] py-[clamp(72px,8vw,120px)] text-slate-900"
    >
      <div className="relative z-10 mx-auto max-w-[1150px] px-5 sm:px-6">
        <div
          data-reveal
          data-reveal-visible="false"
          className="mb-7 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[reveal-visible=true]:opacity-100 data-[reveal-visible=true]:translate-y-0"
        >
          <h2
          id="products-heading"
          className="mb-10 pb-1 bg-gradient-to-r from-red-700 via-red-500 to-slate-900 bg-clip-text text-center text-[clamp(1.7rem,2.2vw,2.5rem)] font-black leading-[1.08] tracking-[-0.04em] text-transparent"
        >
          Каталог пневмооборудования и компонентов
        </h2>
        </div>

        <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-4">
          {categoryGroups.map(({ category, items }, groupIndex) => (
            <div
              key={category}
              data-reveal
              data-reveal-visible="false"
              className="flex min-w-0 flex-col gap-3 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[reveal-visible=true]:opacity-100 data-[reveal-visible=true]:translate-y-0"
              style={{ transitionDelay: `${groupIndex * 80}ms` }}
            >
              <div className="inline-flex items-center justify-center rounded-full border border-red-200 bg-red-50 px-3 py-2 text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-red-700">
                {category}
              </div>

              <div className="flex flex-col gap-3">
                {items.map((product, index) => (
                  <article
                    key={`${product.name}-${category}-${index}`}
                    data-reveal
                    data-reveal-visible="false"
                    className="group relative overflow-hidden rounded-[22px] border border-red-100 bg-white/80 shadow-[0_16px_34px_rgba(15,23,42,0.06)] opacity-0 translate-y-6 transition-all duration-700 ease-out hover:-translate-y-2 hover:border-red-200 hover:shadow-[0_18px_40px_rgba(239,68,68,0.12)] data-[reveal-visible=true]:opacity-100 data-[reveal-visible=true]:translate-y-0"
                    style={{ transitionDelay: `${index * 40}ms` }}
                  >
                    <div
                      className="group relative aspect-[5/4] w-full bg-center bg-no-repeat transition duration-700 ease-out group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${product.image})`,
                        backgroundColor: "#fff",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                      }}
                      aria-label={product.name}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/15 to-slate-900/10 transition duration-300 group-hover:from-slate-900/75 group-hover:via-slate-900/25" />
                      <div className="absolute inset-x-4 bottom-4 z-10">
                        <h3 className="mt-2.5 text-base font-bold leading-tight tracking-[-0.04em] text-white sm:text-[clamp(0.96rem,1.2vw,1.22rem)]">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}