import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";

const actions = [
  { icon: "✉️", label: "Contattaci", sub: "info@kronos.tech", href: "mailto:info@kronos.tech" },
  { icon: "📅", label: "Appuntamento", sub: "Prenota una call", href: "#" },
  { icon: "📞", label: "Telefonaci", sub: "+39 02 39003176", href: "tel:+390239003176" },
];

export function ContactSection() {
  return (
    <section id="preventivo" className="bg-[#fafafa] scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="Configurazione su misura"
          title="Parliamo del tuo progetto."
          subtitle="Tre modi per iniziare, oppure invia subito una richiesta con il preventivo che hai costruito."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            {actions.map((a) => (
              <a
                key={a.label}
                href={a.href}
                className="flex items-center gap-4 rounded-2xl bg-white ring-1 ring-zinc-100 hover:ring-zinc-200 transition-all p-5"
              >
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0066cc]/10 text-2xl"
                >
                  {a.icon}
                </span>
                <span className="flex-1">
                  <span className="block text-base font-semibold text-zinc-900">
                    {a.label}
                  </span>
                  <span className="block text-sm text-zinc-500">{a.sub}</span>
                </span>
                <span aria-hidden className="text-zinc-300">
                  →
                </span>
              </a>
            ))}
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
