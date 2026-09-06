import HomeHero from "../components/home/HomeHero";
import HomeStats from "../components/home/HomeStats";
import HomeRecentPapers from "../components/home/HomeRecentPapers";
import HomeFeatures from "../components/home/HomeFeatures";
import HomeCTA from "../components/home/HomeCTA";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <HomeHero />

      <HomeStats />

      <HomeRecentPapers />

      <HomeFeatures />

      <HomeCTA />
    </div>
  );
};

export default Home;
