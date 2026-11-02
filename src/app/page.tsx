import HeroSection from "@/components/home/HeroSection";
import QuickLinks from "@/components/home/QuickLinks";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import LatestBlogPosts from "@/components/home/LatestBlogPosts";
import GitHubActivity from "@/components/home/GitHubActivity";
import AlsoBuilding from "@/components/home/AlsoBuilding";
import LatestUpdates from "@/components/home/LatestUpdates";
import TopSkills from "@/components/home/TopSkills";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-[var(--section-divider)]" />
      </div>

      <QuickLinks />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-[var(--section-divider)]" />
      </div>

      <FeaturedProjects />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-[var(--section-divider)]" />
      </div>

      <LatestBlogPosts />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-[var(--section-divider)]" />
      </div>

      <GitHubActivity />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-[var(--section-divider)]" />
      </div>

      <AlsoBuilding />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-[var(--section-divider)]" />
      </div>

      <LatestUpdates />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-[var(--section-divider)]" />
      </div>

      <TopSkills />
    </>
  );
}
