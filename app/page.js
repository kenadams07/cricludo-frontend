import PlayRules from "./components/homeSections/PlayRules";
import AboutOurApp from "./components/homeSections/AboutOurApp";
import EndlessFun from "./components/homeSections/EndlessFun";
import AchievementsAndMilestones from "./components/homeSections/AchievementsAndMilestones";
import DownloadBanner from "./components/homeSections/DownloadBanner";
import AppFeatures from "./components/homeSections/AppFeatures";
import Hero from "./components/homeSections/Hero";
import BlogSection from "./blogs/page";

export default function Home() {
  return (
    <>
      <div className="tournament-bg"></div>
      <div className="relative min-h-screen">
        <section
          className="pb-20 relative z-10"
          style={{
            background:
              "linear-gradient(to bottom, #00000071 0%, #ffffff59 20%, #f9e9ff 45%, #865cda 100%)",
          }}
        >
          <div className="container mx-auto bg-white relative top-20 heroStart shadow-xl mb-20 overflow-x-hidden rounded-xxl candySection ">
            <Hero />
            <AppFeatures />
            <AboutOurApp />
            <EndlessFun />
            <AchievementsAndMilestones />
            <PlayRules />
            {/* <BlogSection /> */}
            <DownloadBanner />
          </div>
        </section>
      </div>
    </>
  );
}
