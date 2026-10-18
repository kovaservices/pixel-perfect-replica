import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#inicio" className={cn("inline-flex items-center gap-2 font-extrabold text-xl tracking-tight", className)} aria-label="Kova, inicio">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden className="text-primary">
        <rect width="28" height="28" rx="7" fill="currentColor" />
        <path d="M9 7v14M9 15l8-8M12 12l6 9" stroke="var(--primary-foreground)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      kova
    </a>
  );
}

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

type BtnVariant = "primary" | "outline" | "outline-ink" | "ghost-ink";
const variants: Record<BtnVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  outline: "border border-foreground/20 text-foreground hover:border-primary hover:text-primary",
  "outline-ink": "border border-ink-border text-ink-foreground hover:border-primary hover:text-primary",
  "ghost-ink": "text-ink-foreground hover:text-primary",
};

export function Btn({ children, variant = "primary", arrow, className, href, type = "button", ...rest }: {
  children: ReactNode; variant?: BtnVariant; arrow?: boolean; className?: string; href?: string; type?: "button" | "submit"; target?: string; rel?: string; onClick?: () => void;
}) {
  const cls = cn(
    "btn-arrow inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-200 whitespace-nowrap",
    variants[variant],
    className,
  );
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4" />}
    </>
  );
  return href ? <a href={href} className={cls} {...rest}>{inner}</a> : <button type={type} className={cls} {...rest}>{inner}</button>;
}

export function SectionHead({ eyebrow, title, className, light }: { eyebrow: string; title: ReactNode; className?: string; light?: boolean }) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={cn("mt-3 text-3xl font-extrabold md:text-[2.75rem]", light && "text-ink-foreground")}>{title}</h2>
    </div>
  );
}

export const inputCls = "w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
