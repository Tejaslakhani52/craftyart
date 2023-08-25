import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginGoogle from "../../../pages/login&register/components/commonComponents/LoginGoogle";
import LoginRegister from "../../../pages/login&register/loginRegister";
import api from "../../../services/api";
import BigLogo from "../../../assets/images/Icons/craftyart_main_logo.png";
import SmallLogo from "../../style/images/Icons/craftysmall.png";
import MainSerchbar from "../../commonComponents/MainSerchbar";
import UserProfile from "./UserProfile";
import { consoleShow } from "../../../commonFunction/console";
import { useSelector } from "react-redux";
import Mlogo from "../../../assets/images/Mlogo.svg";
import { Box } from "@mui/material";

export default function MainHeader() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();
  const token = localStorage.getItem("userProfile");
  const [userProfile, setUserProfile] = useState<any>(null);
  const [uId, setuId] = useState<any>("");
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [imageBaseUrl, setImageBaseUrl] = useState<any>(null);
  const getData = localStorage.getItem("userProfile");
  consoleShow("getData: ", getData);

  useEffect(() => {
    const getData = localStorage.getItem("userProfile");
    setuId(getData);
    setProfileLoading(true);
  }, []);

  // localStorage.clear();
  useEffect(() => {
    if (uId == "") {
      setUserProfile(null);
    } else fetchData();
  }, [uId, getData]);

  const fetchData = async () => {
    const getUserData: any = await api.getUser({
      key: "qwfsegxdhbxfjhncf",
      device_id: "",
      email: uId,
    });
    consoleShow("getUserData: ", getUserData);
    localStorage.setItem(
      "premium",
      getUserData?.user?.is_premium === 1 ? "true" : "false"
    );
    setImageBaseUrl(getUserData?.url);
    setUserProfile(getUserData?.user);
  };

  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg bg-light position-relative h-100">
          <div className="container-fluid ">
            {/* ========LOGO FOR DESKTOP====== */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <a
                className="navbar-brand navbar_logo_desktop"
                onClick={() => navigate(`/`, { replace: true })}
              >
                <img src={BigLogo} alt="logo" className="img-fluid" />
              </a>
            </Box>

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <a
                className="navbar-brand "
                onClick={() => navigate(`/`, { replace: true })}
              >
                <img src={Mlogo} alt="logo" className="img-fluid" />
              </a>
            </Box>

            <div>
              <div className="">
                <div className="header_right d-flex align-items-center">
                  <div className="pricing">
                    <Link
                      to="/pricePlans"
                      className="text-decoration-none me-3"
                    >
                      <i className="fa-solid fa-crown text-warning me-2" />
                      <span className="text-black">Pricing</span>
                    </Link>
                  </div>
                  {token ? (
                    <>
                      {userProfile ? (
                        <UserProfile
                          userProfile={userProfile}
                          imageBaseUrl={imageBaseUrl}
                        />
                      ) : (
                        <div
                          style={{
                            backgroundColor: "#497dec26",
                            borderRadius: "50%",
                            width: "48px",
                            height: "48px",
                          }}
                          className={`skeleton-loader`}
                        ></div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="login_btn d-flex justify-content-between align-items-center">
                        <div
                          onClick={() => localStorage.setItem("navigate", ``)}
                        >
                          <a
                            className="text-decoration-none"
                            data-bs-toggle="modal"
                            href="#loginModal"
                            role="button"
                          >
                            <i className="fa-regular fa-circle-user user_icon me-2" />
                            <span className="login_text">Login / Register</span>
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <LoginRegister />
    </>
  );
}
