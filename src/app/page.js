import HeroHeader from './sections/HeroHeader';
import About from './sections/About';
import VisionMission from './sections/VisionMission';
import Products from './sections/Products';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import BackgroundMusic from './components/BackgroundMusic';
import InquiryCart from './components/InquiryCart';
import Notification from './components/Notification';

export default function Home() {
    return (
        <div style={{ fontFamily: 'sans-serif', overflowX: 'hidden' }}>
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
