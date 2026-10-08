"use client";

import { useEffect } from "react";

type Product = {
  name: string;
  image: string;
};

const products: Product[] = [
  { name: "Пневмоцилиндры", image: "/products/cilinder.png" },
  { name: "Пневмоприводы", image: "/products/povorotniy.png" },
  { name: "Пневмомоторы", image: "/products/motor.png" },
  { name: "Фитинги", image: "/products/fistingi.png" },
  { name: "Трубы и шланги", image: "/products/trubki.png" },
  { name: "Блоки подготовки воздуха", image: "/products/block.png" },
  { name: "Распределители", image: "/products/raspredblock.png" },
  { name: "Редукторы", image: "/products/reductor.png" },
  { name: "Дроссели", image: "/products/drossel.png" },
  { name: "Пневмоострова", image: "/products/ostrov.png" },
  { name: "Датчики, реле, индикаторы", image: "/products/rele.png" },
  { name: "Контроллеры", image: "/products/controller.png" },
] as const;

export default function ProductsSection() {
  useEffect(() => {
    const cards = document.querySelectorAll("[data-product-card]");

    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.add("is-visible");
          } else {
            element.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.12),transparent_38%),linear-gradient(180deg,#ffffff_0%,#fff7f7_38%,#f8fafc_100%)] py-[clamp(52px,6vw,90px)] text-slate-900"
    >
      <div className="relative z-10 w-screen max-w-none -ml-[50vw] left-1/2 px-0">
        {/* <div className="mb-5">
          <span className="inline-flex border border-red-200 bg-red-50 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-red-700">
            Каталог
          </span>
        </div> */}

        <div className="grid gap-0 md:grid-cols-2">
          {products.map((product, index) => (
            <article
              key={product.name}
              data-product-card
              className="product-card group relative overflow-hidden border-0 bg-white shadow-none"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <div className="relative overflow-hidden bg-slate-50">
                <div
                  className="aspect-[7/5] w-full bg-cover bg-center bg-no-repeat transition-none"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundColor: "#fff",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  aria-label={product.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="text-xl font-black leading-tight tracking-[-0.05em] text-white sm:text-[clamp(1.4rem,2vw,2rem)]">
                    {product.name}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}