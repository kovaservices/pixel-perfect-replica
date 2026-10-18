import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Check, Menu, X, Plus, MapPin, KeyRound, PencilLine, BadgeEuro, Phone, Mail, MessageCircle, ExternalLink,
} from "lucide-react";
import { Logo, Reveal, Btn, SectionHead, inputCls } from "@/components/kova/primitives";
import { cn } from "@/lib/utils";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kova — Webs para tu negocio que puedes editar tú mismo" },
      { name: "description", content: "Agencia de diseño web en Ciudad Real. Diseñamos tu web, la ponemos a tu nombre y te enseñamos a cambiarla." },
      { property: "og:title", content: "Kova — Webs para negocios de Ciudad Real" },
      { property: "og:description", content: "Diseñamos tu web, la ponemos a tu nombre y te enseñamos a cambiarla. Sin complicaciones." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PRICE = "[PRECIO]";
const WA = "https://wa.me/34000000000";
const noSubmit = (e: FormEvent) => e.preventDefault();

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Includes />
        <PriceBand />
        <Plans />
        <Projects />
        <Why />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <a href={WA} target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp"
        className="pulse-soft fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lg transition-transform hover:scale-105">
        <MessageCircle className="h-6 w-6" />
      </a>
    </>
  );
}

const nav = [
  { label: "Webs", href: "#incluye" },
  { label: "Tiendas online", href: "#proyectos" },
  { label: "Cómo trabajamos", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 text-ink-foreground transition-all duration-300", scrolled ? "bg-ink/75 backdrop-blur-md border-b border-ink-border" : "bg-transparent")}>
      <div className={cn("container-k flex items-center justify-between transition-all duration-300", scrolled ? "h-16" : "h-20")}>
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-ink-muted transition-colors hover:text-ink-foreground">{n.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Btn href={WA} target="_blank" rel="noreferrer" variant="outline-ink" className="py-2.5">WhatsApp</Btn>
          <Btn href="#contacto" className="py-2.5">Pide presupuesto</Btn>
        </div>
        <button className="lg:hidden p-2" aria-label="Abrir menú" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-ink-border bg-ink lg:hidden">
          <div className="container-k flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 font-medium">{n.label}</a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Btn href={WA} variant="outline-ink">WhatsApp</Btn>
              <Btn href="#contacto" onClick={() => setOpen(false)}>Presupuesto</Btn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="section-ink grid-texture relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-k grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <h1 className="text-[2.6rem] font-extrabold leading-[1.05] md:text-6xl">
            Webs para tu negocio que puedes <span className="text-primary">editar tú mismo</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-muted">
            Diseñamos tu web, la ponemos a tu nombre y te enseñamos a cambiarla. Sin complicaciones.
          </p>
          <p className="mt-6 text-ink-muted">desde <span className="text-3xl font-extrabold text-ink-foreground">{PRICE} €</span></p>
          <form onSubmit={noSubmit} className="mt-6 flex max-w-lg flex-col gap-2 rounded-xl bg-card p-2 sm:flex-row">
            <label htmlFor="hero-email" className="sr-only">Tu email</label>
            <input id="hero-email" type="email" placeholder="Tu email" className={cn(inputCls, "border-transparent")} />
            <Btn type="submit" arrow>Quiero mi presupuesto</Btn>
          </form>
          <a href="#contacto" className="mt-4 inline-block text-sm font-medium text-ink-muted underline-offset-4 hover:text-primary hover:underline">Prefiero que me llaméis</a>
        </Reveal>
        <div className="relative mx-auto h-[320px] w-full max-w-[560px] sm:h-[400px]">
          <Laptop src={p1} className="float absolute left-0 top-4 w-[82%] [--rot:-3deg]" />
          <Laptop src={p2} className="float float-delay absolute right-0 bottom-0 w-[62%] [--rot:2deg] opacity-95" />
          <PhoneMock src={p4} className="float absolute right-[8%] top-0 w-[22%] [--rot:5deg]" />
        </div>
      </div>
    </section>
  );
}

function Laptop({ src, className }: { src: string; className?: string }) {
  return (
    <div className={className}>
      <div className="rounded-t-xl border border-ink-border bg-ink-deep p-1.5 shadow-2xl">
        <img src={src} alt="Ejemplo de web diseñada por Kova" width={1280} height={800} className="aspect-[16/10] w-full rounded-md object-cover object-top" />
      </div>
      <div className="mx-auto h-2.5 w-[108%] -translate-x-[3.7%] rounded-b-xl bg-ink-muted/60" />
    </div>
  );
}

function PhoneMock({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cn("rounded-[1.4rem] border border-ink-border bg-ink-deep p-1.5 shadow-2xl", className)}>
      <img src={src} alt="Web vista en móvil" className="aspect-[9/19] w-full rounded-[1.1rem] object-cover object-left-top" />
    </div>
  );
}

const includes = ["Diseño a medida", "Dominio a tu nombre", "Editor para cambiar textos y fotos", "Adaptada a móvil", "SEO básico", "Textos legales", "Formulario de contacto", "Formación incluida"];

function Includes() {
  return (
    <section id="incluye" className="py-20 md:py-28">
      <div className="container-k grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHead eyebrow="Qué incluye" title="Una web que es tuya de verdad" />
          <p className="mt-5 max-w-md text-muted-foreground">
            Sin letra pequeña. Tu web, tu dominio y las llaves para cambiarla cuando quieras. Te lo dejamos todo listo para que solo te ocupes de tu negocio.
          </p>
        </Reveal>
        <ul className="grid content-center gap-x-8 gap-y-5 sm:grid-cols-2">
          {includes.map((t, i) => (
            <Reveal as="li" key={t} delay={i * 50} className="flex items-start gap-3 font-medium">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Check className="h-4 w-4" /></span>
              {t}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PriceBand() {
  return (
    <section className="section-ink py-16 md:py-20">
      <div className="container-k grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
        <Reveal>
          <p className="text-ink-muted">Tu web desde</p>
          <p className="text-5xl font-extrabold md:text-6xl">{PRICE} €</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted"><Check className="h-4 w-4 text-primary" />Te respondemos en menos de 24 horas</p>
        </Reveal>
        <Reveal delay={100}>
          <form onSubmit={noSubmit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr_auto]">
            <input aria-label="Nombre" placeholder="Nombre" className={inputCls} />
            <input aria-label="Email" type="email" placeholder="Email" className={inputCls} />
            <input aria-label="Teléfono" type="tel" placeholder="Teléfono" className={inputCls} />
            <input aria-label="Qué web necesitas" placeholder="¿Qué web necesitas?" className={inputCls} />
            <Btn type="submit" arrow className="sm:col-span-2 lg:col-span-1">Pedir presupuesto</Btn>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const plans = [
  { name: "Solo diseño", desc: "Para quien ya tiene quien la monte.", items: ["Diseño a medida", "Versión móvil y ordenador", "Hasta 2 cambios de diseño", "Archivos listos para desarrollar"] },
  { name: "Web llave en mano", desc: "Te la damos hecha y funcionando.", featured: true, items: ["Todo lo de Solo diseño", "Web programada y publicada", "Dominio a tu nombre", "Editor para cambiar textos y fotos", "Formación incluida"] },
  { name: "Web con mantenimiento", desc: "Nos ocupamos de todo, siempre.", items: ["Todo lo de Llave en mano", "Actualizaciones y copias de seguridad", "Pequeños cambios cuando los pidas", "Ayuda por teléfono y WhatsApp"] },
];

function Plans() {
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="container-k">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionHead eyebrow="Modalidades" title="Elige cómo quieres tu web" />
        </Reveal>
        <div className="mt-14 grid items-center gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <div className={cn("card-lift relative rounded-lg border bg-card p-7", p.featured && "border-2 border-primary lg:scale-105 lg:py-10")}>
                {p.featured && <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">La más elegida</span>}
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-6 text-4xl font-extrabold">{PRICE} €</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5"><Check className="h-4 w-4 shrink-0 translate-y-0.5 text-primary" />{it}</li>
                  ))}
                </ul>
                <Btn href="#contacto" arrow variant={p.featured ? "primary" : "outline"} className="mt-8 w-full">Lo quiero</Btn>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const projects = [
  { name: "Horno Santa María", line: "Panadería artesana con pedidos por teléfono.", tag: "Diseño web", img: p1, url: "https://example.com" },
  { name: "Fisio Alarcos", line: "Clínica de fisioterapia con reserva de citas.", tag: "Diseño web", img: p2, url: "https://example.com" },
  { name: "Despensa Manchega", line: "Aceite y queso de La Mancha a domicilio.", tag: "Tienda online", img: p3, url: "https://example.com" },
  { name: "Estudio Lúa", line: "Peluquería con galería y servicios.", tag: "Diseño web", img: p4, url: "https://example.com" },
  { name: "Barro Vivo", line: "Cerámica hecha a mano, venta online.", tag: "Tienda online", img: p5, url: "https://example.com" },
];
type Project = (typeof projects)[number];

function Projects() {
  const [sel, setSel] = useState<Project | null>(null);
  const loop = [...projects, ...projects];
  return (
    <section id="proyectos" className="overflow-hidden py-20 md:py-28">
      <Reveal className="container-k">
        <SectionHead eyebrow="Proyectos" title="Algunas webs que hemos hecho" />
      </Reveal>
      <div className="mt-12 overflow-x-auto pb-4 [scrollbar-width:none] md:overflow-hidden">
        <div className="marquee flex w-max gap-6 px-5">
          {loop.map((p, i) => (
            <button key={i} onClick={() => setSel(p)} aria-hidden={i >= projects.length}
              tabIndex={i >= projects.length ? -1 : 0}
              className="card-lift w-[290px] shrink-0 overflow-hidden rounded-lg border bg-card text-left sm:w-[380px]">
              <img src={p.img} alt={p.name} loading="lazy" width={1280} height={800} className="aspect-[16/10] w-full object-cover object-top" />
              <div className="p-5">
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{p.tag}</span>
                <h3 className="mt-3 text-lg font-bold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.line}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Dialog.Root open={!!sel} onOpenChange={(o) => !o && setSel(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl bg-card shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
            {sel && (
              <>
                <img src={sel.img} alt={sel.name} className="aspect-[16/10] w-full object-cover object-top" />
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{sel.tag}</span>
                    <Dialog.Title className="mt-3 text-2xl font-bold">{sel.name}</Dialog.Title>
                    <Dialog.Description className="mt-1 text-muted-foreground">{sel.line}</Dialog.Description>
                  </div>
                  <Btn href={sel.url} target="_blank" rel="noreferrer">Ver web <ExternalLink className="h-4 w-4" /></Btn>
                </div>
                <Dialog.Close className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-foreground" aria-label="Cerrar"><X className="h-5 w-5" /></Dialog.Close>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

const why = [
  { icon: MapPin, t: "Somos de aquí", d: "Trabajamos con negocios de Ciudad Real, en persona." },
  { icon: KeyRound, t: "La web es tuya", d: "Dominio y web a tu nombre. Desde el primer día." },
  { icon: PencilLine, t: "La editas tú", d: "Cambia textos y fotos sin tener que llamarnos." },
  { icon: BadgeEuro, t: "Precio cerrado", d: "Sabes lo que pagas desde el principio." },
];

function Why() {
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="container-k">
        <Reveal><SectionHead eyebrow="Por qué Kova" title="Fácil, cerca y sin sorpresas" /></Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <Reveal key={w.t} delay={i * 80}>
              <div className="card-lift h-full rounded-lg border bg-card p-6">
                <w.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                <h3 className="mt-5 text-lg font-bold">{w.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", t: "Reunión", d: "Nos cuentas tu negocio y qué necesitas. En persona o por teléfono." },
  { n: "02", t: "Diseño", d: "Ves el diseño antes de que lo programemos. Lo ajustamos contigo." },
  { n: "03", t: "Desarrollo", d: "Montamos la web, la adaptamos a móvil y la dejamos lista." },
  { n: "04", t: "Entrega y formación", d: "La publicamos a tu nombre y te enseñamos a editarla." },
];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setProgress(Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section id="proceso" className="section-ink py-20 md:py-28">
      <div className="container-k">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <Reveal><SectionHead light eyebrow="Cómo trabajamos" title="Cuatro pasos y tu web está lista" /></Reveal>
          <Reveal delay={100}><p className="text-ink-muted lg:max-w-md lg:justify-self-end">Te acompañamos de principio a fin. Sin jerga, sin esperas eternas. Siempre sabes en qué punto estamos.</p></Reveal>
        </div>
        <div ref={ref} className="relative mt-14">
          <div className="absolute left-6 top-0 h-full w-px bg-ink-border lg:left-0 lg:top-8 lg:h-px lg:w-full" />
          <div className="absolute left-6 top-0 w-px bg-primary lg:hidden" style={{ height: `${progress * 100}%` }} />
          <div className="absolute left-0 top-8 hidden h-px bg-primary lg:block" style={{ width: `${progress * 100}%` }} />
          <div className="relative grid gap-6 pl-12 lg:grid-cols-4 lg:pl-0">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="h-full rounded-lg border border-ink-border bg-ink p-6">
                  <span className="text-sm font-bold text-primary">{s.n}</span>
                  <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "¿La web será mía?", a: "Sí. El dominio y la web van a tu nombre desde el primer día. Es tuya, no nuestra." },
  { q: "¿Hay cuotas mensuales?", a: "Solo si eliges la modalidad con mantenimiento. Si no, pagas una vez y listo (más el dominio y el alojamiento, que te explicamos claro)." },
  { q: "¿Puedo cambiar los textos yo?", a: "Claro. Te dejamos un editor sencillo y te enseñamos a usarlo. Textos y fotos, cuando quieras." },
  { q: "¿Cuánto tardáis?", a: "Depende de la web, pero te damos una fecha cerrada antes de empezar." },
  { q: "¿Qué pasa si quiero irme?", a: "Te vas con tu web y tu dominio. Sin permanencias ni ataduras." },
  { q: "¿Hacéis tiendas online?", a: "Sí. Hacemos tiendas sencillas de gestionar para que vendas tus productos por internet." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28">
      <div className="container-k grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Reveal>
          <SectionHead eyebrow="Preguntas" title="Quizá te preguntes esto" />
          <Btn href="#contacto" variant="outline" arrow className="mt-8">Contacto</Btn>
        </Reveal>
        <Reveal delay={100} className="divide-y border-y">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold transition-colors hover:text-primary">
                  {f.q}
                  <Plus className={cn("h-5 w-5 shrink-0 text-primary transition-transform duration-300", isOpen && "rotate-45")} />
                </button>
                <div className={cn("grid transition-all duration-300 ease-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <p className="overflow-hidden pr-8 text-muted-foreground"><span className="block pb-5">{f.a}</span></p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    { icon: Phone, label: "Teléfono", value: "600 000 000", href: "tel:+34600000000" },
    { icon: MessageCircle, label: "WhatsApp", value: "Escríbenos", href: WA },
    { icon: Mail, label: "Email", value: "hola@kova.es", href: "mailto:hola@kova.es" },
  ];
  return (
    <section id="contacto" className="section-ink py-20 md:py-28">
      <div className="container-k grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">Contacto</p>
          <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">¿Hablamos?</h2>
          <p className="mt-5 max-w-md text-ink-muted">Cuéntanos qué necesitas y te preparamos un presupuesto sin compromiso.</p>
          <ul className="mt-10 space-y-5">
            {items.map((it) => (
              <li key={it.label}>
                <a href={it.href} className="group flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-lg border border-ink-border text-primary transition-colors group-hover:border-primary"><it.icon className="h-5 w-5" /></span>
                  <span><span className="block text-xs text-ink-muted">{it.label}</span><span className="font-semibold">{it.value}</span></span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100}>
          <form onSubmit={noSubmit} className="grid gap-4 rounded-xl bg-card p-6 text-foreground sm:grid-cols-2 md:p-8">
            <input aria-label="Nombre" placeholder="Nombre" className={inputCls} />
            <input aria-label="Teléfono" type="tel" placeholder="Teléfono" className={inputCls} />
            <input aria-label="Email" type="email" placeholder="Email" className={cn(inputCls, "sm:col-span-2")} />
            <textarea aria-label="Tu negocio y qué web necesitas" rows={4} placeholder="¿A qué se dedica tu negocio y qué web necesitas?" className={cn(inputCls, "resize-none sm:col-span-2")} />
            <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
              <input type="checkbox" className="mt-1 h-4 w-4 accent-primary" />
              <span>He leído y acepto la <a href="#" className="text-primary hover:underline">política de privacidad</a>.</span>
            </label>
            <Btn type="submit" arrow className="w-full sm:col-span-2 py-3.5">Quiero mi presupuesto</Btn>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { t: "Servicios", l: ["Diseño web", "Tiendas online", "Mantenimiento"] },
    { t: "Contacto", l: ["600 000 000", "hola@kova.es", "WhatsApp"] },
    { t: "Legal", l: ["Aviso legal", "Privacidad", "Cookies"] },
  ];
  return (
    <footer className="bg-ink-deep text-ink-foreground">
      <div className="container-k grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-ink-muted">Ciudad Real</p>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <p className="text-sm font-bold">{c.t}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              {c.l.map((x) => <li key={x}><a href="#" className="transition-colors hover:text-primary">{x}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-border">
        <p className="container-k py-6 text-sm text-ink-muted">© 2026 Kova</p>
      </div>
    </footer>
  );
}
