import { ToastProvider } from './components/ui'
import { AppLayout } from './layouts/AppLayout'
import { DashboardPage } from './pages/DashboardPage'

export default function App() {
  return (
    <ToastProvider>
      <AppLayout>
        <DashboardPage />
      </AppLayout>
    </ToastProvider>
  )
}
