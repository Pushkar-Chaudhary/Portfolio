import Navbar from "../components/Navbar.jsx";
import SEO from "../components/SEO.jsx";

const Dashboard = () => {
  return (
    <div> <SEO
        title="Dashboard | Pushkar Chaudhary "
        description="You can view my contributions through here."
        path="/dashboard"
      />
      <Navbar />
      </div>
  )
}

export default Dashboard