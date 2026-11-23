import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Public Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Locations from './pages/Locations';
import NRIServices from './pages/NRIServices';
import InvestmentGuide from './pages/InvestmentGuide';
import Listings from './pages/Listings';
import CorporateLandBank from './pages/CorporateLandBank';
import Insights from './pages/Insights';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminEnquiries from './admin/AdminEnquiries';
import AdminProjects from './admin/AdminProjects';
import AdminListings from './admin/AdminListings';
import AdminServices from './admin/AdminServices';
import AdminLocations from './admin/AdminLocations';
import AdminBlogs from './admin/AdminBlogs';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminContent from './admin/AdminContent';
import AdminSettings from './admin/AdminSettings';

// Protected Route Guard for Admin
const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white text-xs">
        Verifying authorization...
      </div>
    );
  }
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// Public Wrapper layout (with sticky white header & rich brown footer + floating WhatsApp)
const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden w-full relative">
      <Header />
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false, // Animates on scroll
      mirror: false, // Prevents elements from jarringly disappearing while scrolling - eliminates lag & disturbance!
      easing: 'ease-out-cubic',
      offset: 50,
      debounceDelay: 50,
      throttleDelay: 99
    });
  }, []);

  useEffect(() => {
    // Refresh AOS animations on route navigation and scroll events
    AOS.refresh();
  }, [location.pathname]);

  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <PublicLayout>
              <Projects />
            </PublicLayout>
          }
        />
        <Route
          path="/projects/:idOrSlug"
          element={
            <PublicLayout>
              <ProjectDetails />
            </PublicLayout>
          }
        />
        <Route
          path="/locations"
          element={
            <PublicLayout>
              <Locations />
            </PublicLayout>
          }
        />
        <Route
          path="/nri-services"
          element={
            <PublicLayout>
              <NRIServices />
            </PublicLayout>
          }
        />
        <Route
          path="/investment-guide"
          element={
            <PublicLayout>
              <InvestmentGuide />
            </PublicLayout>
          }
        />
        <Route
          path="/listings"
          element={
            <PublicLayout>
              <Listings />
            </PublicLayout>
          }
        />
        <Route
          path="/corporate-land-bank"
          element={
            <PublicLayout>
              <CorporateLandBank />
            </PublicLayout>
          }
        />
        <Route
          path="/insights"
          element={
            <PublicLayout>
              <Insights />
            </PublicLayout>
          }
        />
        <Route
          path="/insights/:slug"
          element={
            <PublicLayout>
              <BlogDetails />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="locations" element={<AdminLocations />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
