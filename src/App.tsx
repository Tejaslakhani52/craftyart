import { useEffect, useLayoutEffect, useState } from "react";
import "../src/style/styles.css";
import "../src/style/newStyles.css";
import "../src/style/responsives.css";
import "./App.css";

// import "../src/style/owl.carousel.css";

import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Home from "./pages/home/home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import loadjs from "loadjs";
import AllTemplate from "./pages/allTemplate/allTemplate";
import ContactUs from "./pages/contactus/contactus";
import CreateBlog from "./pages/createblog/createblog";
import Invoice from "./pages/invoice/invoice";
import PricePlan from "./pages/pricePlan/pricePlan";
import AboutUs from "./pages/aboutus/aboutus";
import Blog from "./pages/blog/blog";
import Career from "./pages/career/carrer";
import Subscriptions from "./pages/subscriptions/subscriptions";
import Successful from "./pages/successfull/successfull";
import SubTemplates from "./pages/allTemplate/subTemplates";
import { Toaster } from "react-hot-toast";
import FAQs from "./pages/faqs/faqs";
import ChatBox from "./components/commonComponents/ChatBox";
import TermCondition from "./pages/term&condition/termCondition";
import axios from "axios";
import TemplateModelPage from "./pages/allTemplate/components/tempateModal/TemplateModalPage";
import SearchBox from "./components/commonComponents/SearchedTemplate";
import LogoPage from "./pages/categoryPage/LogoPage";
import InvitationPage from "./pages/categoryPage/InvitationPage";

import store from "./store";
// import Sitemap from "./sitemap";
import { Provider, useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/landingPage/LandingPage";
import MobilePage from "./pages/mobile/MobilePage";
import DynamicLandingPage from "./pages/landingPage/DynamicLandingPage";

const PrivateWrapper = () => {
  const token = localStorage.getItem("userProfile");
  return token ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  const [openMobile, setOpenMobile] = useState<boolean>(false);
  const location = useLocation();
  useLayoutEffect(() => {
    loadjs("assets/js/custom.js", () => {});
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // const url = new URL(
      //   "https://play.google.com/store/apps/details?id=com.crafty.art"
      // );
      // window.location.assign(url);
      setOpenMobile(true);
    }
  }, []);

  // const generateSitemap = require("./sitemapGenerator");

  // // Call the generateSitemap function
  // generateSitemap().then((sitemap: any) => {
  //   // Write the generated sitemap to a file
  //   fs.writeFileSync("./public/sitemap.xml", sitemap.toString());
  // });

  // useEffect(() => {
  //   generateSitemap();
  // }, []);

  const token = localStorage.getItem("userProfile");

  return openMobile ? (
    <MobilePage />
  ) : (
    <Provider store={store}>
      <Header />
      <div style={{ zIndex: "1000000000000000" }}>
        <Toaster />
      </div>

      <Routes>
        <Route path="/" element={token ? <Home /> : <LandingPage />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/createblog" element={<CreateBlog />} />
        {/* <Route path="/contactus" element={<ContactUs />} /> */}
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/templates/:categoryId" element={<AllTemplate />} />
        <Route path="/navigate/:categoryId" element={<AllTemplate />} />
        <Route path="/templates/p/:slug" element={<TemplateModelPage />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/pricePlans" element={<PricePlan />} />
        <Route path="/term-condition" element={<TermCondition />} />
        <Route path="/privacy-policy" element={<TermCondition />} />
        <Route path="/copyright-information" element={<TermCondition />} />
        <Route path="/aboutus" element={<AboutUs />} />
        {/* <Route path="/blog" element={<Blog />} /> */}
        <Route path="/career" element={<Career />} />
        <Route path="/templates/:id/:name" element={<SearchBox />} />
        <Route path="s/:name" element={<SearchBox />} />
        <Route path="/logos" element={<LogoPage />} />
        <Route path="/invitation" element={<InvitationPage />} />
        <Route path="k/:name" element={<DynamicLandingPage />} />
        {/* <Route path="/k/:name/:page" element={<DynamicLandingPage />} /> */}

        <Route element={<PrivateWrapper />}>
          <Route path="/subscriptions" element={<Subscriptions />} />
        </Route>

        <Route path="/successfull" element={<Successful />} />
        <Route path="/subTemplate" element={<SubTemplates />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ChatBox />
      <Footer />
    </Provider>
  );
}

export default App;
