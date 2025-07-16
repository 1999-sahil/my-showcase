import Navbar from "@/components/navbar/navbar"
import Blogs from "@/components/blogs/blogs"
import Introduction from "@/components/introduction"
import FeaturedProjects from "@/components/projects/featured-projects"
import Work from "@/components/work/work"

function HomePage() {
  return (
    <div className="">
      <Navbar />
      <section className="py-20 max-w-6xl mx-auto p-5">
        <Introduction />
        <FeaturedProjects />
        <Blogs />
        <Work />
      </section>
    </div>
  )
}

export default HomePage