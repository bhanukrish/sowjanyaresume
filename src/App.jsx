import "./assets/css/style.css";
import HeroSection from "./components/Hero";
import Footer from "./components/Footer";
import resumeData from "./assets/data.json";
import VideoBackground from "./components/VideoBackground"

export default function App() {
  return (
    <>
    <VideoBackground>
      <HeroSection data={resumeData}/>
      <Footer />
    </VideoBackground>
    </>
  );
}
