import { Skeleton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../../../services/api";
import TemplateModel from "./TemplateModel";
import NotFound from "../../../NotFound";
import { consoleShow } from "../../../../commonFunction/console";
import { Helmet } from "react-helmet";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function TemplateModelPage({ mainId }: any) {
  const userPremium = localStorage.getItem("premium");
  const apiKey = process.env.REACT_APP_API_KEY;
  const token = localStorage.getItem("userProfile");
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;
  consoleShow("currentPathname: ", currentPathname);
  const { slug } = useParams();
  consoleShow("slug: ", slug);
  const [finalData, setfinalData] = React.useState<any>([]);
  consoleShow("finalData: ", finalData);
  const [proccess, setProccess] = useState<boolean>(true);
  const [description, setDescription] = useState<string>("");
  const [mobile, setmobile] = useState<any>(false);

  // localStorage.clear( );

  const [isloading, setIsloading] = useState<boolean>(false);
  const [showingData, setshowingData] = useState<any>([]);
  consoleShow("showingData: ", showingData);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [dataPass, setDataPaas] = useState({});
  const [more, setMore] = useState<boolean>(false);
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      setmobile(true);
    }
  }, []);

  useEffect(() => {
    setIsloading(true);
    localStorage.setItem("navigate", "");

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const formattedText = showingData?.description
      ?.replace(/\r\n\r\n/g, "\n\n")
      ?.replace(/\r\n/g, "\n");
    const description = formattedText || "";
    const words = description.split(" ");
    const truncatedDescription = words.slice(0, 10).join(" ");
    if (more) {
      setDescription(formattedText);
    } else setDescription(truncatedDescription);
  }, [showingData, more]);

  const multiSize = useMemo(() => {
    switch (true) {
      case screenWidth > 1500:
        return 7;
      case screenWidth > 1400:
        return 6;
      case screenWidth > 1200:
        return 5;
      case screenWidth > 1000:
        return 4;
      case screenWidth > 550:
        return 3;
      default:
        return 2;
    }
  }, [screenWidth]);

  const height = useMemo(() => {
    switch (true) {
      case screenWidth > 480:
        return 160;
      default:
        return 150;
    }
  }, [screenWidth]);

  const rowHeight = useMemo(() => {
    switch (true) {
      case screenWidth > 991:
        return `500px`;
      default:
        return "auto";
    }
  }, [screenWidth]);

  useEffect(() => {
    axios
      .post(
        "https://story.craftyartapp.com/my-posterPage",
        {
          key: "qwfsegxdhbxfjhncf",
          id_name: slug,
        },
        { withCredentials: false }
      )
      .then((response: any) => {
        const jsonString = response.data.substring(
          response.data.indexOf("{"),
          response.data.lastIndexOf("}") + 1
        );
        const getData = JSON.parse(jsonString);
        consoleShow("getData: ", getData);
        setIsloading(false);
        setshowingData(getData);
        setProccess(false);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        consoleShow("currError: ", error);
        setProccess(false);
        setStatus(error?.response?.status);
      });
  }, [slug]);

  const fetchData = async () => {
    const templates_ = await api.getCategoryDatas({
      debug_key: "debug",
      cat_id: showingData?.category_id_name as any,
      limit: 20,
      page: 1,
    });

    setfinalData(templates_);
    consoleShow("templates_: ", templates_);
    // if (templates_?.datas.length < ) {
    //   setShowNotFound(true);
    // }
  };
  useEffect(() => {
    fetchData();
  }, [showingData]);

  window.addEventListener("popstate", function (event) {
    setOpen(false);
  });

  return proccess ? (
    <div className="white_screen"></div>
  ) : !status ? (
    <>
      <Helmet>
        <title>{showingData?.template_name}</title>
        <meta
          name="description"
          content={`Design with ${showingData?.template_name}: Ignite Your Imagination, Create Unique Art, and Inspire Awe. Start Design Crafting Today with Crafty Art!`}
        />
      </Helmet>
      <div>
        <div className="template_modal">
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-body">
                <div className="template_modal_body">
                  <div
                    className="row row_media"
                    style={{
                      position: "relative",
                      height: rowHeight,
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="col-xl-8 col-lg-7 col-12"
                      style={{ height: "100%" }}
                    >
                      {isloading ? (
                        <Skeleton
                          sx={{
                            borderRadius: "30px",
                            height: "800px",
                            marginTop: "-150px",
                          }}
                        />
                      ) : (
                        <div className="template_left">
                          <div className="swiper mySwiper h-100">
                            <div className="swiper-wrapper">
                              <div className="swiper-slide d-flex justify-content-center align-items-center">
                                <img
                                  src={
                                    showingData?.url +
                                    showingData?.template_thumb
                                  }
                                  crossOrigin="anonymous"
                                  alt="templateinsta"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className="col-xl-4 col-lg-5 col-12 mt-4 mt-lg-0 "
                      style={{ maxHeight: "500px", overflow: "auto" }}
                    >
                      {isloading ? (
                        <div>
                          <Skeleton
                            sx={{
                              borderRadius: "30px",
                              marginTop: "-200px",
                            }}
                          />
                          <Skeleton
                            sx={{
                              borderRadius: "30px",
                              // marginTop: "-100px",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="template_details">
                          <h1
                            className="teamplate_heading"
                            style={{ fontSize: "28px" }}
                          >
                            {showingData?.template_name}
                          </h1>
                          <h5 className="fw-normal my-3">
                            {showingData?.category_size}
                          </h5>

                          {showingData?.is_premium && !token ? (
                            userPremium === "true" ? (
                              <button
                                className="use_template_btn d-none d-lg-block"
                                style={{ border: "none" }}
                                onClick={() => {
                                  window.open(
                                    `https://editor.craftyartapp.com/${showingData?.id_name}`
                                  );
                                }}
                              >
                                <a className="text-decoration-none text-white">
                                  <i className="fa-solid fa-crown text-warning pe-2" />

                                  <span> Use this Template</span>
                                </a>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="use_template_btn"
                                data-bs-toggle="modal"
                                data-bs-target="#loginModal"
                                role="button"
                                style={{ border: "none" }}
                              >
                                <a className="text-decoration-none text-white">
                                  <i className="fa-solid fa-crown text-warning pe-2" />

                                  <span> Use this Template</span>
                                </a>
                              </button>
                            )
                          ) : (
                            <p
                              className="use_template_btn"
                              onClick={() => {
                                if (mobile) {
                                  window.open(
                                    `https://play.google.com/store/apps/details?id=com.crafty.art`
                                  );
                                } else {
                                  if (
                                    showingData?.is_premium &&
                                    userPremium !== "true"
                                  ) {
                                    navigate("/pricePlans");
                                  } else
                                    window.open(
                                      `https://editor.craftyartapp.com/${showingData?.id_name}`
                                    );
                                }
                              }}
                            >
                              <a
                                href="javscript:;"
                                className="text-decoration-none text-white"
                              >
                                {showingData?.is_premium && (
                                  <i className="fa-solid fa-crown text-warning pe-2" />
                                )}
                                <span> Use this Template</span>
                              </a>
                            </p>
                          )}
                          <p className="mb-3">
                            <span className="pe-2">
                              <img
                                src="../../../../assets/images/Icons/Brush.svg"
                                className="template_details_icon"
                                alt="brush"
                              />
                            </span>
                            <span>100% fully customizable</span>
                          </p>
                          <p className="mb-3">
                            <span className="pe-2">
                              <img
                                src="../../../../assets/images/Icons/Phone.svg"
                                className="template_details_icon"
                                alt="phone"
                              />
                            </span>
                            <span> Edit and download on the go</span>
                          </p>
                          <p className="mb-3">
                            <span className="pe-2">
                              <img
                                src="../../../../assets/images/Icons/mobile2.svg"
                                className="template_details_icon"
                                alt="mobile"
                              />
                            </span>
                            <span>Share and publish anywhere</span>
                          </p>
                          {showingData?.is_premium && (
                            <>
                              <p className="mb-3">
                                <span className="pe-2">
                                  <img
                                    src="../../../../assets/images/Icons/fileframe.svg"
                                    className="template_details_icon"
                                    alt="fileframe"
                                  />
                                </span>
                                <span> File Type: JPG, PNG,PDF</span>
                              </p>
                            </>
                          )}
                          <h2 style={{ fontSize: "22px", fontWeight: "500" }}>
                            {showingData?.h2_tag}
                          </h2>
                          <p style={{ width: "100%", whiteSpace: "pre-line" }}>
                            {description}
                            <span
                              style={{
                                color: "blue",
                                borderBottom: "1px solid blue",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                              onClick={() => setMore(!more)}
                            >
                              {more ? "Short" : "...More"}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {isloading ? (
                    <div>
                      <Skeleton
                        sx={{
                          borderRadius: "30px",
                          height: "200px",
                        }}
                      />
                      <Skeleton
                        sx={{
                          borderRadius: "30px",
                          height: "200px",
                          marginTop: "-50px",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="you_may_like template_main my-4">
                      <h2 className="mb-4" style={{ fontSize: "26px" }}>
                        You might also like
                      </h2>

                      <div
                        style={{
                          gridTemplateColumns: ` repeat(${multiSize}, minmax(0px, 1fr))`,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        {finalData?.datas
                          ?.filter(
                            (obj: any, index: number) =>
                              obj?.template_id !== showingData?.template_id
                          )
                          .map((item: any, index: number) => {
                            function calculateHeight(
                              width: number,
                              height: number,
                              newWidth: number
                            ) {
                              return (height / width) * newWidth;
                            }
                            return (
                              <div
                                key={index}
                                className="single_template_card see_all  "
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setDataPaas(item);
                                  setTimeout(() => {
                                    setOpen(true);
                                  }, 200);
                                  const newPath = `${item.id_name}`;
                                  window.history.pushState({}, "", newPath);
                                }}
                              >
                                <div
                                  className={`${
                                    mainId < 0
                                      ? "background_light_green padding_10 min_h_240"
                                      : "h_auto"
                                  } gallery_img position-relative`}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  // style={{ display: isLoadedImage ? "flex" : "none" }}
                                  // onClick={() => setOpen(true)}
                                >
                                  <img
                                    className={`${
                                      mainId < 0
                                        ? " no_width "
                                        : `img_width_187px border_radius this_template_width`
                                    }  `}
                                    crossOrigin="anonymous"
                                    src={item?.template_thumb}
                                    alt={item?.template_name}
                                    // onLoad={handleImageLoad}
                                    style={{
                                      height: `${calculateHeight(
                                        item?.width,
                                        item?.height,
                                        height
                                      )}px`,
                                    }}
                                  />

                                  {item.is_premium ? (
                                    <div className="pricing_option">
                                      <a className="pricing_icon text-decoration-none">
                                        <i className="fa-solid fa-crown text-warning" />
                                      </a>
                                    </div>
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                                <div
                                  className={`img_small_title mt-3 pb-3 ${"img_small_title_template_width"} `}
                                >
                                  <h6 className="mb-0">{item.template_name}</h6>
                                  <span>{item.category_name}</span>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <TemplateModel
          open={open}
          setOpen={setOpen}
          templateData={dataPass}
          templates={finalData?.datas ?? []}
          screenWidth={screenWidth}
          mainId={showingData?.cat_id}
          currentPathname={currentPathname}
        />
      </div>
    </>
  ) : (
    <NotFound />
  );
}
