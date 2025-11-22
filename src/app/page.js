import HeroHeader from './sections/HeroHeader';
import About from './sections/About';
import VisionMission from './sections/VisionMission';
import Products from './sections/Products';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import BackgroundMusic from './components/BackgroundMusic';
import InquiryCart from './components/InquiryCart';
import Notification from './components/Notification';
import Script from 'next/script';

export default function Home() {
    // Structured Data for Homepage
    const homepageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Krishnawanshi Overseas - Premium Laboratory Glassware",
        "description": "Leading manufacturer and exporter of high-quality laboratory glassware for scientific research, pharmaceutical, and industrial applications worldwide.",
        "url": "https://krishnawanshioverseas.com",
        "inLanguage": "en-US",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Krishnawanshi Overseas",
            "url": "https://krishnawanshioverseas.com"
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', overflowX: 'hidden' }}>
            <Script
                id="homepage-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
            />
            <BackgroundMusic />
            <Notification />
            <InquiryCart />
            <HeroHeader />
            <About />
            <VisionMission />
            <Products />
            <Contact />
            <Footer />
        </div>
    );
}
