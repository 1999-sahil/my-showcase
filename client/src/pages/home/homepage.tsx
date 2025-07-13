import Introduction from "@/components/introduction"
import Navbar from "@/components/navbar/navbar"
import FeaturedProjects from "@/components/projects/featured-projects"

function HomePage() {
  return (
    <div className="">
      <Navbar />
      <section className="py-30 max-w-6xl mx-auto p-5">
        <Introduction />
        <FeaturedProjects />
      </section>
    </div>
  )
}

export default HomePage