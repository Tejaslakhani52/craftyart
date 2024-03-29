import CloseIcon from "@mui/icons-material/Close";
import { Skeleton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    // maxWidth: "1000px",
    "&::-webkit-scrollbar": {
      width: "8px",
      backgroundColor: "#F5F5F5",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "8px",
      backgroundColor: "#D4D4D4",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#999999",
    },
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      width: "100%",
      maxWidth: "80%", // Set your width here
      // maxHeight: "auto",
      borderRadius: "20px",
    },
  },
}));

// localStorage.clear();

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "fixed",
            right: "6%",
            top: "3%",
            color: "white",
            backgroundColor: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function TemplateModel({
  open,
  setOpen,
  templateData,
  templates,
  screenWidth,
  mainId,
  currentPathname,
}: any) {
  const userPremium = localStorage.getItem("premium");
  const token = localStorage.getItem("userProfile");
  const navigate = useNavigate();

  const [finalData, setfinalData] = React.useState<any>([]);
  const [page, setPage] = React.useState<number>(0);
  const [isloading, setIsloading] = useState<boolean>(true);
  const [showingData, setshowingData] = useState<any>(templateData);
  const [mobile, setmobile] = useState<any>(false);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      setmobile(true);
    }
  }, []);

  useEffect(() => {
    setshowingData(templateData);
    setPage(0);
  }, [templateData]);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  // useEffect(() => {}, []);

  const handleShowing = (item: any) => {
    setshowingData(item);
    setPage(0);
    setIsloading(true);
    const myElement = document.getElementById("myId");
    if (myElement) {
      myElement.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  };

  setTimeout(() => {
    setIsloading(false);
  }, 1000);

  useEffect(() => {
    let data = templates
      ?.filter((obj: any) => obj.template_id !== showingData.template_id)
      .map((data: any) => data);
    data?.unshift(showingData);

    setfinalData(data);
  }, [templates, showingData]);

  const multiSize = useMemo(() => {
    switch (true) {
      case screenWidth > 1500:
        return 6;
      case screenWidth > 1400:
        return 5;
      case screenWidth > 1200:
        return 4;
      case screenWidth > 1000:
        return 3;
      case screenWidth > 600:
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

  return (
    <div>
      <BootstrapDialog
        // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <DialogContent id="myId">
          <div className="template_modal">
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="template_modal_body">
                    {finalData && (
                      <div
                        className="row row_media"
                        style={{
                          position: "relative",
                          height: rowHeight,
                          alignItems: "center",
                        }}
                      >
                        <div
                          className="col-xl-8 col-lg-7 col-12 padding_none"
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
                                      crossOrigin="anonymous"
                                      src={finalData[page]?.template_thumb}
                                      alt="templateinsta"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {finalData.length - 1 > page && (
                          <div
                            className="swiper-button-next"
                            style={{
                              position: "fixed",
                              right: "7%",
                              color: "white",
                            }}
                            onClick={() => {
                              window.history.replaceState(
                                {},
                                "",
                                `/templates/p/${finalData[page + 1]?.id_name}`
                              );
                              const myElement = document.getElementById("myId");
                              if (myElement) {
                                myElement.scrollTo(0, 0);
                              } else {
                                window.scrollTo(0, 0);
                              }
                              if (!isloading) {
                                setPage(page + 1);
                                setIsloading(true);
                              }
                            }}
                          />
                        )}
                        {page > 0 && (
                          <div
                            className="swiper-button-prev"
                            style={{
                              position: "fixed",
                              left: "7%",
                              color: "white",
                            }}
                            onClick={() => {
                              window.history.replaceState(
                                {},
                                "",
                                `/templates/p/${finalData[page - 1]?.id_name}`
                              );
                              const myElement = document.getElementById("myId");
                              if (myElement) {
                                myElement.scrollTo(0, 0);
                              } else {
                                window.scrollTo(0, 0);
                              }
                              if (!isloading) {
                                setPage(page - 1);
                                setIsloading(true);
                              }
                            }}
                          />
                        )}
                        <div className="col-xl-4 col-lg-5 col-12 mt-4 mt-lg-0 padding_none">
                          {isloading ? (
                            <>
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
                            </>
                          ) : (
                            <div className="template_details">
                              <h1
                                className="teamplate_heading"
                                style={{ fontSize: "25px" }}
                              >
                                {finalData[page]?.template_name}
                              </h1>
                              <h5 className="fw-normal my-3">
                                {finalData[page]?.category_size}
                              </h5>

                              {finalData[page]?.is_premium && !token ? (
                                <button
                                  className="use_template_btn "
                                  style={{ border: "none" }}
                                  onClick={() => {
                                    navigate("/login");
                                    localStorage.setItem(
                                      "navigate",
                                      `/templates/p/${finalData[page]?.id_name}`
                                    );
                                  }}
                                >
                                  <a
                                    href="javscript:;"
                                    className="text-decoration-none text-white"
                                  >
                                    <i className="fa-solid fa-crown text-warning pe-2" />

                                    <span> Use this Template</span>
                                  </a>
                                </button>
                              ) : (
                                <p
                                  className="use_template_btn "
                                  onClick={() => {
                                    if (mobile) {
                                      window.open(
                                        `https://play.google.com/store/apps/details?id=com.crafty.art`
                                      );
                                    } else {
                                      if (
                                        finalData[page]?.is_premium &&
                                        userPremium !== "true"
                                      ) {
                                        navigate("/pricePlans");
                                      } else
                                        window.open(
                                          `https://editor.craftyartapp.com/${finalData[page]?.id_name}`
                                        );
                                    }
                                  }}
                                >
                                  <a
                                    href="javscript:;"
                                    className="text-decoration-none text-white"
                                  >
                                    {finalData[page]?.is_premium && (
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
                              {finalData[page]?.is_premium && (
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
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {isloading ? (
                      <>
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
                      </>
                    ) : (
                      <div className="you_may_like template_main my-4">
                        <h3 className="mb-4">You might also like</h3>

                        <div
                          style={{
                            gridTemplateColumns: ` repeat(${multiSize}, minmax(0px, 1fr))`,
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          {finalData
                            .filter(
                              (obj: any, index: number) =>
                                obj?.template_id !==
                                  finalData[page]?.template_id && index < 15
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
                                  className="single_template_card see_all mobile_temp "
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    handleShowing(item);
                                    window.history.replaceState(
                                      {},
                                      "",
                                      `/templates/p/${item?.id_name}`
                                    );
                                  }}
                                >
                                  <div
                                    className={`${
                                      mainId < 0
                                        ? "background_light_green padding_10 min_h_240 mobile_temp "
                                        : "h_auto mobile_temp"
                                    } gallery_img position-relative`}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img
                                      className={`${
                                        mainId < 0
                                          ? "no_width mobile_temp_h"
                                          : `img_width_187px border_radius this_template_width mobile_temp_h`
                                      }`}
                                      crossOrigin="anonymous"
                                      src={item?.template_thumb}
                                      alt={item?.template_name}
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
                                    className={`img_small_title mt-3 pb-3 mobile_temp ${"img_small_title_template_width"} `}
                                  >
                                    <h6 className="mb-0">
                                      {item.template_name}
                                    </h6>
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
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
