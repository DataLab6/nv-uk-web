import Link from "next/link";
import {
  ArrowRight,
  Database,
  Gift,
  Handshake,
  MessageSquareWarning,
  Scale,
  ShieldCheck,
  TriangleAlert,
  Users,
} from "lucide-react";
import type { SiteConfig } from "../config/types";
import { PageIntro } from "../components/PageIntro";
import { RevealGroup } from "../components/RevealGroup";

const principles = [
  {
    title: "Integridad",
    description:
      "Actuar de forma honesta, coherente y verificable, respetando la ley y los compromisos adquiridos.",
    icon: ShieldCheck,
  },
  {
    title: "Respeto",
    description:
      "Tratar a cada persona con dignidad, escuchar perspectivas distintas y evitar cualquier forma de discriminación.",
    icon: Users,
  },
  {
    title: "Imparcialidad",
    description:
      "Tomar decisiones con criterios objetivos y revelar oportunamente cualquier interés que pueda afectarlas.",
    icon: Scale,
  },
  {
    title: "Responsabilidad",
    description:
      "Cuidar a las personas, la información y los recursos, y pedir orientación antes de asumir riesgos innecesarios.",
    icon: Handshake,
  },
] as const;

const guidance = [
  {
    id: "conflictos-de-interes",
    label: "Decisiones imparciales",
    title: "Conflictos de interés",
    description:
      "Existe un posible conflicto cuando una relación personal, familiar o económica puede influir, o parecer que influye, en una decisión de trabajo.",
    actions: [
      "Informar la situación antes de participar en la decisión.",
      "Abstenerse de seleccionar, negociar, aprobar o supervisar mientras se evalúa el caso.",
      "Dejar registro de la consulta y de la medida que finalmente se autorice.",
    ],
    icon: Scale,
  },
  {
    id: "regalos-y-atenciones",
    label: "Relaciones transparentes",
    title: "Regalos, invitaciones y atenciones",
    description:
      "Un regalo o una invitación no debería condicionar una decisión, crear una deuda de gratitud ni buscar una ventaja indebida.",
    actions: [
      "No ofrecer ni aceptar dinero, equivalentes de dinero, comisiones indebidas o beneficios personales.",
      "Rechazar cualquier atención vinculada a una negociación o aprobación en curso.",
      "Consultar antes de aceptar una cortesía, hasta que existan límites y autorizaciones oficiales.",
    ],
    icon: Gift,
  },
  {
    id: "respeto-y-acoso",
    label: "Entornos seguros",
    title: "Respeto, discriminación y acoso",
    description:
      "Este borrador propone considerar inaceptables la intimidación, la humillación, las expresiones discriminatorias, el acoso sexual y las represalias.",
    actions: [
      "Marcar un límite si hacerlo es seguro y buscar apoyo oportunamente.",
      "Conservar datos sobre hechos, fechas y personas presentes sin difundirlos innecesariamente.",
      "Si se presencia una situación, ofrecer apoyo sin exponer a la persona afectada ni investigar por cuenta propia.",
    ],
    icon: Users,
  },
  {
    id: "datos-y-recursos",
    label: "Uso responsable",
    title: "Datos, información y recursos",
    description:
      "La información personal, comercial y operativa requiere un uso limitado a la finalidad autorizada y medidas razonables de protección.",
    actions: [
      "Acceder solo a la información necesaria y usar las herramientas autorizadas para el trabajo.",
      "Verificar destinatarios, permisos y archivos antes de compartir información.",
      "No compartir credenciales y avisar de inmediato sobre pérdidas, accesos o envíos equivocados.",
    ],
    icon: Database,
  },
] as const;

const decisionQuestions = [
  "¿La decisión es legal y puede explicarse con transparencia?",
  "¿Protege la dignidad, la seguridad y la información de las personas?",
  "¿Podría existir un interés personal o una apariencia de favoritismo?",
  "¿Me sentiría tranquilo si la decisión quedara registrada y fuera revisada?",
] as const;

/**
 * Shared demonstration page. Its copy is deliberately framed as a draft so it
 * cannot be mistaken for an approved policy of either brand.
 */
export function EthicsCodePage({ site }: { site: SiteConfig }) {
  return (
    <>
      <PageIntro copy={site.ethics} />

      <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-8">
        <div
          role="note"
          aria-labelledby="ethics-draft-notice"
          className="rounded-3xl border-2 border-amber-500/60 bg-amber-50 p-6 text-amber-950 shadow-sm dark:bg-amber-950/30 dark:text-amber-100 sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15">
              <TriangleAlert className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em]">
                Contenido de demostración
              </p>
              <h2
                id="ethics-draft-notice"
                className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Borrador ficticio, provisional y no aprobado
              </h2>
              <p className="mt-3 leading-relaxed">
                Este contenido se publica únicamente para demostrar la
                estructura de una futura página. No ha sido revisado ni aprobado
                por {site.legalName}, no constituye una política corporativa y
                no reemplaza procedimientos, contratos, reglamentos o canales
                oficiales vigentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-start lg:gap-14">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Alcance propuesto
            </span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Una referencia para conversar y decidir con criterio
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Como punto de partida, este borrador plantea orientaciones para
              colaboradores, líderes, contratistas, proveedores y terceros que
              se relacionen con {site.name}. Su alcance real deberá ser definido
              y aprobado formalmente antes de entrar en vigencia.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold tracking-tight">
              Cómo usar este borrador
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Puede servir como guía de discusión. Ante una situación concreta:
            </p>
            <ol className="mt-5 space-y-3 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="font-bold text-primary">01</span>
                Detén la decisión si existe un riesgo inmediato.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">02</span>
                Reúne hechos verificables sin investigar por cuenta propia.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">03</span>
                Consulta los procedimientos y canales oficiales disponibles.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Principios orientativos
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Criterios propuestos para actuar
            </h2>
          </div>
          <RevealGroup
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.08}
          >
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <principle.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Orientaciones de muestra
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Situaciones frecuentes en el entorno empresarial
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Estas pautas son ejemplos editoriales y requieren validación legal,
            laboral y operativa antes de convertirse en reglas internas.
          </p>
        </div>

        <RevealGroup className="mt-10 grid gap-6 lg:grid-cols-2" stagger={0.08}>
          {guidance.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {item.label}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <ul className="mt-5 space-y-3">
                {item.actions.map((action) => (
                  <li key={action} className="flex gap-3 leading-relaxed">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </RevealGroup>
      </section>

      <section className="border-y border-border bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MessageSquareWarning className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Reporte y orientación
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Esta página no crea un canal ético
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Mientras se define y valida un mecanismo específico, consulta los
              canales oficiales de PQRS para solicitar orientación o comunicar
              una situación. Antes de enviar información sensible, confirma el
              canal adecuado y limita el mensaje a los datos necesarios.
            </p>
            <Link
              href="/legal/pqrs"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transform-none"
            >
              Consultar canales PQRS
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Un código definitivo debería identificar responsables, opciones de
              confidencialidad, tiempos de atención y medidas frente a
              represalias. Ninguna de esas condiciones se promete en este
              borrador.
            </p>
          </div>

          <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/15">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground/75">
              Pausa antes de actuar
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
              Cuatro preguntas de control
            </h2>
            <ul className="mt-6 space-y-4">
              {decisionQuestions.map((question, index) => (
                <li key={question} className="flex gap-3 leading-relaxed">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15 text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-primary-foreground/20 pt-5 text-sm leading-relaxed text-primary-foreground/80">
              Si una respuesta genera dudas, la orientación provisional es
              detenerse, no ocultar la situación y consultar antes de continuar.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <p className="flex max-w-4xl gap-3 text-sm leading-relaxed text-muted-foreground">
          <TriangleAlert
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          Recordatorio: todo el contenido de esta página es ficticio,
          demostrativo y está pendiente de revisión y aprobación formal por{" "}
          {site.legalName}.
        </p>
      </section>
    </>
  );
}
