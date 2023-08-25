import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import commonBanner from "../../assets/images/commonBanner.png";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import api from "../../services/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import TemplateModel from "../allTemplate/components/tempateModal/TemplateModel";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import BigLogo from "../../assets/images/Icons/craftyart_main_logo.png";
import NotFound from "../NotFound";
import { consoleShow } from "../../commonFunction/console";
// import BigLogo from "../assets/images/Icons/craftyart_main_logo.png";

export const ImageComponent = ({ state, item, height, isNotFix }: any) => {
  function calculateHeight(width: number, height: number, newWidth: number) {
    return (height / width) * newWidth;
  }

  return (
    <>
      <div
        className={`${
          !isNotFix ? "background_light_green padding_10 min_h_240" : "h_auto"
        } gallery_img position-relative `}
        style={{
          // display: isLoadedImage ? "flex" : "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className={`${
            !isNotFix
              ? "no_width"
              : "img_width_187px border_radius this_template_width background_light_green"
          }`}
          style={{
            height: isNotFix
              ? `${calculateHeight(item?.width, item?.height, height)}px`
              : "",
            width: "auto",
          }}
        >
          <LazyLoadImage
            src={item?.template_thumb}
            alt={item?.template_name}
            height={100}
            width={100}
            effect="blur"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

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
    </>
  );
};

export default function DynamicLandingPage() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const navigate = useNavigate();
  const { categoryId } = useParams();
  const location = useLocation();
  consoleShow("location: ", location);
  const currentPathname = location.pathname;
  consoleShow("categoryId: ", location);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [templates, setTemplates] = useState<any>(undefined);
  consoleShow("templates: ", templates);
  const [isloading, setIsloading] = React.useState(true);
  const [apiData, setapiData] = useState<any>([]);
  consoleShow("apiData: ", templates);
  const [page, setPage] = useState<any>(1);
  consoleShow("page: ", page);
  const [open, setOpen] = useState(false);
  const [dataPass, setDataPaas] = useState({});
  const [isNotFix, setIsNotFix] = useState<boolean>(false);
  const [keywordName, setKeywordName] = useState<string>("");
  const [proccess, setProccess] = useState<boolean>(true);
  const [description, setDescription] = useState<string>("");

  consoleShow("proccess: ", proccess);
  consoleShow("keywordName: ", templates?.title);

  useEffect(() => {
    const formattedText = templates?.long_desc?.replace(/\n/g, "\n\n");

    setDescription(formattedText);
  }, [templates]);

  useEffect(() => {
    if (location?.search) {
      consoleShow("categoryIddcd: ", (location?.search as any).split("=")[1]);
      setPage((location?.search as any).split("=")[1]);
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem("navigate", ``);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const modifiedURL = currentPathname.replace(/%20/g, "-");
    consoleShow("modifiedURLxzc: ", modifiedURL.split("=")[1]);

    const keywordName = modifiedURL.split("/")[2];
    axios
      .post(
        `https://panel.craftyartapp.com/templates/api/getKeyTemplates/?page=${page}`,
        {
          key: "qwfsegxdhbxfjhncf",
          key_name: keywordName,
        }
      )
      .then((res: any) => {
        setapiData(res?.data?.datas);
        setIsloading(false);
        setProccess(false);
        setTemplates(res?.data);
      })
      .catch((error) => {
        setIsloading(false);
        setProccess(false);
      });
  }, [page]);

  // useEffect(() => {

  // }, [templates]);

  const multiSize = useMemo(() => {
    switch (true) {
      case screenWidth > 1500:
        return 8;
      case screenWidth > 1200:
        return 6;
      case screenWidth > 900:
        return 5;
      case screenWidth > 800:
      case screenWidth > 700:
        return 4;
      case screenWidth > 600:
      case screenWidth > 550:
        return 3;
      default:
        return 2;
    }
  }, [screenWidth]);

  function calculateHeight(width: number, height: number, newWidth: number) {
    return (height / width) * newWidth;
  }

  const height = useMemo(() => {
    switch (true) {
      case screenWidth > 480:
        return 160;
      default:
        return 150;
    }
  }, [screenWidth]);

  window.addEventListener("popstate", function (event) {
    setOpen(false);
  });

  const handleChange = (e: any, p: any) => {
    const modifiedURL = currentPathname.replace(/%20/g, "-");
    window.scrollTo(300, 300);
    setPage(p);
    setIsloading(true);
    // navigate(`/k/${modifiedURL.split("/")[2]}?page=${p}`);

    const newUrl = `/k/${modifiedURL.split("/")[2]}?page=${p}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  return proccess ? ( // Check if "templates" is still null
    <div className="white_screen" />
  ) : templates?.current_page ? (
    <div>
      <Helmet>
        <title>{templates?.title}</title>
        <meta name="description" content={templates?.meta_desc} />
      </Helmet>
      <Box
        sx={{
          backgroundImage: `url(${commonBanner})`,
          height: "330px",
          display: "flex",
          alignItems: "center",
          paddingLeft: { xs: "10px", lg: "50px" },
          borderRadius: "8px",
          margin: "10px auto",
          width: "97%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          justifyContent: "center",
          paddingRight: "10px",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", lg: "57%" },
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "30px", lg: "40px" },
              color: "#ffffff",
              fontWeight: "600",
              lineHeight: "48px",
              textAlign: "center",
            }}
            variant="h1"
          >
            {templates?.title}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "20px", lg: "30px" },
              color: "#ffffff",
              fontWeight: "600",
              lineHeight: "30px",
              textAlign: "center",
            }}
            variant="h2"
          >
            {templates?.h2_tag}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "17px", lg: "20px" },
              color: "#ffffff",
              width: "100%",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {templates?.short_desc}
          </Typography>
        </Box>
      </Box>
      <div style={{ padding: "0 25px" }}>
        <nav aria-label="breadcrumb" className="pt-4 breadcrumb_nav pb-3">
          <span className="navigate" onClick={() => navigate("/")}>
            Home
          </span>
          <KeyboardArrowRightIcon sx={{ opacity: "0.5" }} />
          <span style={{ textTransform: "capitalize" }}>
            {keywordName.replace(/-/g, " ")}
          </span>
        </nav>

        <div
          className="template_main mt-4 mt-lg-0 template_design"
          id="scrollableDiv"
        >
          {isloading ? (
            <section className="latest_templates mt-2">
              <div className="container-fluid">
                <Skeleton count={5} height={200} />
              </div>
            </section>
          ) : (
            <>
              <div
                style={{
                  gridTemplateColumns: ` repeat(${multiSize}, minmax(0px, 1fr))`,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {apiData?.map((item: any, index: number) => (
                  <>
                    <div
                      key={index}
                      className="single_template_card see_all  "
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setDataPaas(item);
                        setTimeout(() => {
                          setOpen(true);
                        }, 200);

                        const newPath = `/templates/p/${item?.id_name}`;
                        window.history.pushState({}, "", newPath);
                      }}
                    >
                      <ImageComponent
                        state={categoryId}
                        item={item}
                        height={height}
                        isNotFix={isNotFix}
                      />

                      <div
                        className={`img_small_title mt-3 pb-3 ${
                          isNotFix && "img_small_title_template_width"
                        } `}
                      >
                        <h6 className="mb-0">{item.template_name}</h6>
                        <span>{item.category_name}</span>
                      </div>
                    </div>
                  </>
                ))}
              </div>

              <TemplateModel
                open={open}
                setOpen={setOpen}
                templateData={dataPass}
                templates={apiData}
                screenWidth={screenWidth}
                mainId={templates?.cat_id}
                currentPathname={currentPathname}
              />
            </>
          )}
        </div>
      </div>
      {/* <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        onClick={(e, p) => setPage(p)}
      /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 0",
        }}
      >
        <Pagination
          count={templates?.total_page}
          size="large"
          page={Number(page)}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </div>

      <Box
        sx={{
          width: { xs: "98%", lg: "75%" },
          margin: "auto",
          padding: "20px 0",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "700",
            paddingBottom: "20px",
          }}
        >
          {templates?.title}
        </h2>
        <p style={{ textAlign: "justify", whiteSpace: "pre-line" }}>
          {description}
        </p>
      </Box>
    </div>
  ) : (
    <NotFound />
  );
}
