import { ArrowLeft, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

type Section = {
  id: string
  title: string
  content: React.ReactNode
}

const LAST_UPDATED = '28 de octubre de 2026'
const APP_NAME = 'Mochi'
const CONTACT_EMAIL = 'privacidad@siramong.tech'
const COMPANY_NAME = 'SirAmong'

const sections: Section[] = [
  {
    id: 'responsable',
    title: '1. Quién trata tus datos',
    content: (
      <>
        <p>
          {COMPANY_NAME} es el responsable del tratamiento de los datos de {APP_NAME}, conforme a la Ley
          Orgánica de Protección de Datos Personales de Ecuador (LOPDP). Para cualquier consulta o para ejercer
          tus derechos escribe a {CONTACT_EMAIL}.
        </p>
        <p className="mt-3">
          {APP_NAME} está dirigida a mujeres de 16 años o más. Si tienes entre 16 y 17 años, tratamos tus datos
          con especial cuidado y no te mostramos anuncios personalizados.
        </p>
      </>
    ),
  },
  {
    id: 'datos',
    title: '2. Qué datos tratamos',
    content: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Cuenta: correo electrónico y, si inicias con Google, tu identificador de Google.</li>
        <li>
          Perfil y uso de los módulos que tú activas: nombre, hábitos, sesiones de estudio, exámenes, metas,
          ánimo, gratitud, ejercicio, recetas, puntos y logros.
        </li>
        <li>Preferencias y configuración de la app, y tus consentimientos.</li>
        <li>Estado de tu plan (gratis o Premium) y, si compras, datos de la transacción que nos informa Google Play.</li>
        <li>Datos técnicos mínimos necesarios para el funcionamiento y la seguridad del servicio, incluidos reportes de errores (Sentry) sin datos personales.</li>
        <li>
          Estadísticas de uso (PostHog) solo si las activas en Ajustes: qué módulos usas y eventos como compras, con un
          identificador anónimo. Nunca incluyen datos de salud ni lo que escribes.
        </li>
      </ul>
    ),
  },
  {
    id: 'ciclo',
    title: '3. Ciclo menstrual (dato de salud)',
    content: (
      <>
        <p>
          El ciclo es un dato sensible. Se calcula en tu teléfono, a partir de lo que registras tú o de lo que
          autorices leer en Health Connect. <strong>No se envía a la inteligencia artificial.</strong>
        </p>
        <p className="mt-3">
          Solo si lo activas en Ajustes → Privacidad de tu ciclo (viene apagado), guardamos en nuestro servidor un
          resumen mínimo: la fecha de inicio y la duración de tu ciclo. Lo usamos únicamente para que tu pareja vea
          tu fase en Duo si tú decides compartirla. Puedes retirar el consentimiento en cualquier momento y esos
          datos se borran del servidor.
        </p>
        <p className="mt-3">
          {APP_NAME} no es un dispositivo médico ni sirve como método anticonceptivo.
        </p>
      </>
    ),
  },
  {
    id: 'ia',
    title: '4. Inteligencia artificial',
    content: (
      <>
        <p>
          Las funciones de IA envían a nuestro servidor el texto que escribes y contexto genérico de la tarea (por
          ejemplo, un nivel de energía baja, media o alta). Si activas la Memoria de Mochi (sección 5), también
          enviamos el resumen de esa memoria: títulos de tus metas, materias de tus próximos exámenes y tu racha.
          Nunca enviamos tu nombre, tu correo ni datos de tu ciclo. Nuestro servidor reenvía la solicitud a OpenRouter, que la procesa con modelos de terceros.
        </p>
        <p className="mt-3">
          Algunos modelos gratuitos pueden registrar el contenido de las solicitudes. Por eso te pedimos no escribir
          datos personales ni de salud en los campos de texto libre de la IA ni en los títulos de tus metas y exámenes. Las respuestas pueden contener errores.
        </p>
      </>
    ),
  },
  {
    id: 'memoria',
    title: '5. Memoria de Mochi',
    content: (
      <p>
        Es opcional y viene apagada. Antes de activarla te mostramos qué se envía. Si la activas, guardamos un resumen corto de tus metas activas, tus próximos
        exámenes, tu racha y el tono que prefieres, y lo enviamos a la IA como contexto para personalizar las
        respuestas. Nunca incluye datos de salud. Puedes verlo, borrarlo o desactivarlo en Ajustes → Lo que Mochi
        recuerda; al desactivarlo se borra.
      </p>
    ),
  },
  {
    id: 'anuncios',
    title: '6. Anuncios',
    content: (
      <p>
        En el plan gratuito puedes ver, de forma opcional, anuncios con recompensa (Google AdMob) para obtener
        créditos extra de IA. Nunca se muestran a quienes tienen Premium. Los anuncios para menores de 18 años no
        son personalizados. Puedes gestionar tu consentimiento de publicidad desde la app.
      </p>
    ),
  },
  {
    id: 'pagos',
    title: '7. Compras y suscripciones',
    content: (
      <p>
        Los pagos los procesa Google Play. Usamos RevenueCat para validar tu suscripción; no recibimos los datos de
        tu tarjeta. Las suscripciones se gestionan y se cancelan desde Google Play.
      </p>
    ),
  },
  {
    id: 'duo',
    title: '8. Mochi Duo',
    content: (
      <p>
        Duo vincula tu cuenta con la de tu pareja mediante un código de invitación que expira a los 7 días. Tú decides,
        dato por dato, qué ve tu pareja (ciclo, ánimo, estudio, ejercicio, hábitos, cocina). Todo está apagado por
        defecto y puedes cambiarlo o salir del espacio cuando quieras.
      </p>
    ),
  },
  {
    id: 'base-legal',
    title: '9. Para qué los usamos y base legal',
    content: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Prestarte el servicio que pides al crear tu cuenta (ejecución del contrato).</li>
        <li>Los datos de salud y los consentimientos opcionales: tu consentimiento expreso, que puedes retirar.</li>
        <li>Seguridad y prevención de abuso: nuestro interés legítimo.</li>
        <li>Facturación: obligación legal.</li>
      </ul>
    ),
  },
  {
    id: 'conservacion',
    title: '10. Cuánto tiempo los conservamos',
    content: (
      <p>
        Mientras tengas la cuenta. Si la eliminas, borramos tus datos de forma permanente. Los registros de
        facturación se conservan sin datos personales por obligaciones contables.
      </p>
    ),
  },
  {
    id: 'derechos',
    title: '11. Tus derechos',
    content: (
      <>
        <p>
          Tienes derecho de acceso, rectificación, eliminación, oposición, portabilidad, suspensión del tratamiento y a
          no ser objeto de decisiones basadas únicamente en tratamientos automatizados.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            Exportar tus datos y eliminar tu cuenta: en la web, en{' '}
            <Link className="font-bold underline" to="/account">Mi cuenta</Link>, o en la app desde Ajustes.
          </li>
          <li>Cualquier otro derecho: escribe a {CONTACT_EMAIL}.</li>
          <li>
            Si consideras que no atendimos tu solicitud, puedes acudir a la Superintendencia de Protección de Datos
            Personales de Ecuador.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'terceros',
    title: '12. Con quién compartimos datos y transferencias internacionales',
    content: (
      <>
        <p>Usamos proveedores que tratan datos por encargo nuestro:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Supabase (alojamiento y base de datos, Estados Unidos).</li>
          <li>OpenRouter y sus proveedores de modelos (IA).</li>
          <li>Google (inicio de sesión, Play, AdMob y Health Connect).</li>
          <li>RevenueCat (validación de suscripciones).</li>
          <li>Sentry (reportes de errores) y PostHog (estadísticas, solo con tu consentimiento).</li>
        </ul>
        <p className="mt-3">No vendemos tus datos.</p>
      </>
    ),
  },
  {
    id: 'seguridad',
    title: '13. Seguridad',
    content: (
      <p>
        Aplicamos controles de acceso por usuaria a nivel de base de datos, cifrado en tránsito y verificación en el
        servidor de puntos, planes y créditos. Si ocurriera una brecha que afecte tus datos, la notificaremos a la
        autoridad y a ti en los plazos que fija la ley.
      </p>
    ),
  },
  {
    id: 'cambios',
    title: '14. Cambios a esta política',
    content: (
      <p>
        Si cambiamos esta política de forma importante te avisaremos en la app. La fecha de la última actualización
        aparece arriba.
      </p>
    ),
  },
]

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fce7f3,_#ede9fe_45%,_#dbeafe_100%)]">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Back link */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-sm font-semibold text-purple-700 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-purple-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-purple-950 sm:text-3xl">
                Política de Privacidad
              </h1>
              <p className="mt-1 text-sm font-semibold text-purple-600">
                {APP_NAME} · Última actualización: {LAST_UPDATED}
              </p>
            </div>
          </div>

          <p className="mt-5 rounded-2xl border border-purple-100 bg-purple-50 p-4 text-sm font-semibold text-purple-800">
            Tu privacidad es fundamental para nosotros. {APP_NAME} está diseñada para ayudarte a
            crecer sin comprometer tus datos. Lee este documento para entender exactamente qué
            información recopilamos y cómo la usamos.
          </p>
        </div>

        {/* Table of contents */}
        <nav className="mt-4 rounded-3xl border border-white/70 bg-white/50 p-5 backdrop-blur-sm">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-purple-600">
            Contenido
          </p>
          <div className="grid gap-1 sm:grid-cols-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-lg px-2 py-1 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-100 hover:text-purple-900"
              >
                {section.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Sections */}
        <div className="mt-4 space-y-4">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-6 rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-sm"
            >
              <h2 className="mb-3 text-base font-black text-purple-950">{section.title}</h2>
              <div className="text-sm leading-relaxed text-purple-900">{section.content}</div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 rounded-3xl border border-purple-200 bg-white/60 p-5 text-center backdrop-blur-sm">
          <p className="text-xs font-semibold text-purple-600">
            © {new Date().getFullYear()} {COMPANY_NAME} · {APP_NAME} · Todos los derechos
            reservados
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <Link
              to="/terms"
              className="text-xs font-bold text-purple-500 underline underline-offset-2 hover:text-purple-700"
            >
              Condiciones del Servicio
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-xs font-bold text-purple-500 underline underline-offset-2 hover:text-purple-700"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage