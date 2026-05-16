import "./app.css";
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import GallerySection from '@/components/GallerySection'
import DifferentialsSection from '@/components/DifferentialsSection'
import ParticleTextSection from '@/components/ParticleTextSection'
import AdvisorySection from '@/components/AdvisorySection'
import VideoSection from '@/components/VideoSection'
import AssistanceSection from '@/components/AssistanceSection'
import TrustSection from '@/components/TrustSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* 1. Scroll-expand hero — video de maquinário de panificação */}
        <HeroSection />

        {/* 2. História e timeline da empresa */}
        <AboutSection />

        {/* 3. Galeria de produtos e serviços */}
        <GallerySection />

        {/* 4. Cards de diferenciais */}
        <DifferentialsSection />

        {/* 5. Partículas "PENATEC" — momento visual interativo entre seções */}
        <ParticleTextSection />

        {/* 6. Assessoria técnica especializada */}
        <AdvisorySection />

        {/* 7. Vídeos institucionais */}
        <VideoSection />

        {/* 8. Assistência técnica — horários */}
        <AssistanceSection />

        {/* 9. Números de credibilidade */}
        <TrustSection />

        {/* 10. CTA final */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
