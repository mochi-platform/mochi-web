import { Navigate, Route, Routes } from 'react-router-dom'
import { useProfile } from '@/hooks/useProfile'
import { SessionProvider, useSessionContext } from '@/contexts/SessionContext'
import { AuthCallback } from '@/pages/AuthCallback'
import { AccountPage } from '@/pages/AccountPage'
import { DeleteAccountInfoPage } from '@/pages/DeleteAccountInfoPage'
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { TermsPage } from '@/pages/TermsPage'
import { AdminLayout } from '@/pages/admin/AdminLayout'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage'
import { AdminVouchersPage } from '@/pages/admin/AdminVouchersPage'
import { AdminGrantsPage } from '@/pages/admin/AdminGrantsPage'
import { AdminRecipesPage } from '@/pages/admin/AdminRecipesPage'
import { AdminRevenuePage } from '@/pages/admin/AdminRevenuePage'

function PublicOnly({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSessionContext()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-purple-50">
        <p className="text-sm font-semibold text-purple-800">Cargando...</p>
      </div>
    )
  }

  if (session) {
    return <Navigate to="/account" replace />
  }

  return children
}

function AdminGuard() {
  const { profile, loading } = useProfile()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-semibold text-slate-700">Verificando acceso admin...</p>
      </div>
    )
  }

  if (!profile?.is_admin) {
    return <Navigate to="/account" replace />
  }

  return <AdminLayout />
}

export default function App() {
  return (
    <SessionProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Legales y borrado de cuenta: públicos */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/delete-account" element={<DeleteAccountInfoPage />} />

        <Route
          path="/login"
          element={
            <PublicOnly>
              <LoginPage />
            </PublicOnly>
          }
        />

        <Route path="/account" element={<AccountPage />} />

        <Route path="/admin" element={<AdminGuard />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="vouchers" element={<AdminVouchersPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="grants" element={<AdminGrantsPage />} />
          <Route path="recipes" element={<AdminRecipesPage />} />
          <Route path="revenue" element={<AdminRevenuePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SessionProvider>
  )
}
