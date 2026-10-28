import { Link } from 'react-router-dom'

export function DeleteAccountInfoPage() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl bg-purple-50 px-4 py-10">
      <h1 className="text-2xl font-extrabold text-purple-900">Eliminar tu cuenta de Mochi</h1>
      <p className="mt-3 text-sm text-purple-800">
        Puedes eliminar tu cuenta y todos tus datos de dos formas:
      </p>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-purple-800">
        <li>En la app: Ajustes → Cuenta → Eliminar mi cuenta.</li>
        <li>
          En la web: <Link className="font-bold underline" to="/account">inicia sesión en Mi cuenta</Link> y
          usa la opción "Eliminar mi cuenta".
        </li>
      </ol>
      <p className="mt-4 text-sm text-purple-800">
        Se borran de forma permanente tu perfil, hábitos, estudio, ánimo, recetas, ciclo, vales y demás datos
        asociados. Los registros de facturación se conservan sin datos personales por obligaciones contables.
        Si tienes una suscripción, cancélala también en Google Play.
      </p>
    </main>
  )
}
