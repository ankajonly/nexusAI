import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Reviews from './components/Reviews';
import CTA from './components/CTA';
import Services from './components/Services';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import ServicesPage from './pages/ServicesPage';
import Chatbot from './components/Chatbot';


function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <About />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function ServicesPageComponent() {
  return (
    <>
      <main>
        <ServicesPage />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function AboutPageComponent() {
  return (
    <>
      <main>
        <AboutPage />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function ReviewsPageComponent() {
  return (
    <>
      <main>
        <ReviewsPage />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ProtectedRoute><ServicesPageComponent /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><AboutPageComponent /></ProtectedRoute>} />
            <Route path="/reviews" element={<ProtectedRoute><ReviewsPageComponent /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Chatbot />
        </div>

      </Router>
    </AuthProvider>
  );
}

export default App;
