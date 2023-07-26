import React, { PropsWithChildren, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AllDataRoot } from "../../interfaces/AllDataObject";
import "react-loading-skeleton/dist/skeleton.css";
import HeroSection from "./heroSection/HeroSection";
import DesignFor from "./designFor/DesignFor";
import TamplateDesign from "./tamplateDesign/TamplateDesign";
import Waiting from "./waitingFor/Waiting";
import Profile from "../../components/profile/Profile";
import SmallScreen from "../../components/smallScreenBottom/SmallScreen";
import Creation from "../../components/creationOffcanvas/Creation";
import CustomeSize from "../../components/footer/customeSize/CustomeSize";
import axios from "axios";
import { templatesData } from "../../redux/reducer/apiDataReducer";
import { useDispatch, useSelector } from "react-redux";

export default function Home(): JSX.Element {
  // const apiKey = process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();
  const token = localStorage.getItem("userProfile");
  const urlNavigate = localStorage.getItem("navigate");

  useEffect(() => {
    if (urlNavigate !== null) {
      navigate(urlNavigate);
    }
  }, [urlNavigate]);
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState<AllDataRoot>();
  const [isloading, setIsloading] = React.useState(true);

  useEffect(() => {
    fetchData();
    localStorage.setItem("page", "1");
  }, []);

  const fetchData = React.useCallback(async () => {
    setIsloading(true);
    const newImages = await api.getDatas({
      key: process.env.REACT_APP_API_KEY as string,
      page: 1,
      count: 0,
    });
    setTemplates(newImages);
    console.log("newImages: ", newImages);
    dispatch(templatesData(newImages));
    setIsloading(false);
  }, [templates]);

  return (
    <>
      <div className="small_fixed_footer d-bock d-sm-none">
        <SmallScreen />
        <Profile />
        <Creation />
        <CustomeSize />
      </div>
      <HeroSection />
      <DesignFor templates={templates} isloading={isloading} />
      <TamplateDesign templates={templates} isloading={isloading} />
      <Waiting />
    </>
  );
}
