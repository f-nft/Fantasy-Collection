import { Routes, Route } from "react-router-dom";
import HomeV1 from "../pages/homeV1";
// import HomeV2 from "../pages/homeV2";
// import HomeV3 from "../pages/homeV3";
import Blogs from "../pages/blogs";
import BlogDetails from "../pages/blogDetails";
import Gallery from "../pages/Gallery";
import HowToMint from "../components/section/howToMint/v2";
import About from "../components/section/about/v1";
import RoadMap from "../components/section/roadMap/v1";
import Team from "../components/section/team/v1";
import FAQ from "../components/section/faq/v3";
import Partner from "../components/section/partner";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeV1 />} exact />
      <Route path="/home" element={<HomeV1 />} exact />
      <Route path="/about" element={<About />} exact />
      <Route path="HowToMint" element={<HowToMint />} exact />
      <Route path="RoadMap" element={<RoadMap />} exact />
      <Route path="Team" element={<Team />} exact />
      <Route path="FAQ" element={<FAQ />} exact />
      <Route path="Partner" element={<Partner />} exact />
      {/* <Route path="/home-two" element={<HomeV2 />}  />
      <Route path="/home-three" element={<HomeV3 />} /> */}
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/post" element={<BlogDetails />} />
      <Route path="/nfts" element={<Gallery />} />
    </Routes>
  );
}

export default App;
