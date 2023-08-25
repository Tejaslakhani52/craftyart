import React, { Suspense, useLayoutEffect, useState } from "react";
import "../src/style/newStyles.css";
import "../src/style/responsives.css";
import "../src/style/styles.css";
import "./App.css";
// import "../src/style/owl.carousel.css";
import Footer from "./components/footer/footer";
// import Home from "./pages/home/home";
import loadjs from "loadjs";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
// import AllTemplate from "./pages/allTemplate/allTemplate";
// import CreateBlog from "./pages/createblog/createblog";
// import Invoice from "./pages/invoice/invoice";
// import PricePlan from "./pages/pricePlan/pricePlan";
// import AboutUs from "./pages/aboutus/aboutus";
// import Career from "./pages/career/carrer";
// import Subscriptions from "./pages/subscriptions/subscriptions";
// import Successful from "./pages/successfull/successfull";
// import SubTemplates from "./pages/allTemplate/subTemplates";
import { Toaster } from "react-hot-toast";
// import FAQs from "./pages/faqs/faqs";
// import ChatBox from "./components/commonComponents/ChatBox";
// import TermCondition from "./pages/term&condition/termCondition";
// import TemplateModelPage from "./pages/allTemplate/components/tempateModal/TemplateModalPage";
// import SearchBox from "./components/commonComponents/SearchedTemplate";
// import LogoPage from "./pages/categoryPage/LogoPage";
// import InvitationPage from "./pages/categoryPage/InvitationPage";
import store from "./store";
// import Sitemap from "./sitemap";
import { Provider } from "react-redux";
import LoadingPage from "./suspenseLoading/LoadingPage";
// import NotFound from "./pages/NotFound";
// import LandingPage from "./pages/landingPage/LandingPage";
// import MobilePage from "./pages/mobile/MobilePage";
// import DynamicLandingPage from "./pages/landingPage/DynamicLandingPage";
// import Navbar from "./components/header/Navbar";
// import Index from "./paymentSuccess/Index";
// import LoginPage from "./pages/loginPage/LoginPage";
// import SmallScreen from "./components/smallScreenBottom/SmallScreen";

const Home = React.lazy(() => import("./pages/home/home"));

const AllTemplate = React.lazy(() => import("./pages/allTemplate/allTemplate"));
const CreateBlog = React.lazy(() => import("./pages/createblog/createblog"));
const Invoice = React.lazy(() => import("./pages/invoice/invoice"));
const PricePlan = React.lazy(() => import("./pages/pricePlan/pricePlan"));
const AboutUs = React.lazy(() => import("./pages/aboutus/aboutus"));
const Career = React.lazy(() => import("./pages/career/carrer"));
const Subscriptions = React.lazy(
  () => import("./pages/subscriptions/subscriptions")
);
const Successful = React.lazy(() => import("./pages/successfull/successfull"));
const SubTemplates = React.lazy(
  () => import("./pages/allTemplate/subTemplates")
);
const FAQs = React.lazy(() => import("./pages/faqs/faqs"));
const ChatBox = React.lazy(
  () => import("./components/commonComponents/ChatBox")
);
const TermCondition = React.lazy(
  () => import("./pages/term&condition/termCondition")
);
const TemplateModelPage = React.lazy(
  () => import("./pages/allTemplate/components/tempateModal/TemplateModalPage")
);
const SearchBox = React.lazy(
  () => import("./components/commonComponents/SearchedTemplate")
);
const LogoPage = React.lazy(() => import("./pages/categoryPage/LogoPage"));
const InvitationPage = React.lazy(
  () => import("./pages/categoryPage/InvitationPage")
);

const NotFound = React.lazy(() => import("./pages/NotFound"));
const LandingPage = React.lazy(() => import("./pages/landingPage/LandingPage"));
const MobilePage = React.lazy(() => import("./pages/mobile/MobilePage"));
const DynamicLandingPage = React.lazy(
  () => import("./pages/landingPage/DynamicLandingPage")
);
const Navbar = React.lazy(() => import("./components/header/Navbar"));
const Index = React.lazy(() => import("./paymentSuccess/Index"));
const LoginPage = React.lazy(() => import("./pages/loginPage/LoginPage"));
const SmallScreen = React.lazy(
  () => import("./components/smallScreenBottom/SmallScreen")
);

const PrivateWrapper = () => {
  const token = localStorage.getItem("userProfile");
  return token ? <Outlet /> : <Navigate to="/" />;
};

const PrivateWrapperLogin = () => {
  const token = localStorage.getItem("userProfile");
  return !token ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  const [openMobile, setOpenMobile] = useState<boolean>(false);
  const location = useLocation();
  useLayoutEffect(() => {
    loadjs("assets/js/custom.js", () => {});
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const token = localStorage.getItem("userProfile");

  return openMobile ? (
    <MobilePage />
  ) : (
    <Provider store={store}>
      <Suspense fallback={<LoadingPage />}>
        <Navbar />
        <div style={{ zIndex: "1000000000000000" }}>
          <Toaster />
        </div>

        <Routes>0
          <Route path="/" element={token ? <Home /> : <LandingPage />} />
          <Route path="/templates" element={<Home />} />
          <Route path="/createblog" element={<CreateBlog />} />
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
          <Route path="/career" element={<Career />} />
          <Route path="/templates/:id/:name" element={<SearchBox />} />
          <Route path="s/:name" element={<SearchBox />} />
          <Route path="/logos" element={<LogoPage />} />
          <Route path="/invitation" element={<InvitationPage />} />
          <Route path="k/:name" element={<DynamicLandingPage />} />
          <Route path="payment/success/:msg" element={<Index />} />

          <Route element={<PrivateWrapper />}>
            <Route path="/subscriptions" element={<Subscriptions />} />
          </Route>
          <Route element={<PrivateWrapperLogin />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route path="/successfull" element={<Successful />} />
          <Route path="/subTemplate" element={<SubTemplates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />

        {token && (
          <div className="small_fixed_footer d-bock d-sm-none">
            <SmallScreen />
          </div>
        )}
      </Suspense>
    </Provider>
  );
}

export default App;
