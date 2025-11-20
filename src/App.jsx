import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from '@/pages/Home';
import FestivalsIndex from '@/pages/festivals/Index';
import { SidebarInset, SidebarProvider } from './components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { SiteHeader } from './components/site-header';
import FestivalsShow from './pages/festivals/Show';
import CreateFestival from './pages/festivals/Create';
import EditFestival from './pages/festivals/Edit';
import { Toaster } from 'sonner';
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" richColors />
        <SidebarProvider
          style={{
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          }}
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 mx-6">
                  {/* Main content */}
                  <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/festivals" element={<FestivalsIndex />} />
                    <Route
                      path="/festivals/create"
                      element={<CreateFestival />}
                    />
                    <Route path="/festivals/:id" element={<FestivalsShow />} />
                    <Route
                      path="/festivals/:id/edit"
                      element={<EditFestival />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}
