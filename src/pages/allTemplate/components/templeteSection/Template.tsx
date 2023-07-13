import React, { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import api from "../../../../services/api";
import { CatDataRoot } from "../../../../interfaces/CatDataObject";
import TemplateModel from "../tempateModal/TemplateModel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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

export default function Templete() {
  const location = useLocation();
  const currentPathname = location.pathname;
  const { categoryId } = useParams();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [templates, setTemplates] = useState<CatDataRoot>();
  const [isloading, setIsloading] = React.useState(true);
  const [apiData, setapiData] = useState<any>([]);
  console.log("apiData: ", apiData);
  const [page, setPage] = useState<number>(1);
  console.log("page: ", page);
  const [open, setOpen] = useState(false);
  const [dataPass, setDataPaas] = useState({});
  const [isNotFix, setIsNotFix] = useState<boolean>(false);

  // const [uniqueApiData, setUniqueApiData] = useState<any>([]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async (pages: number) => {
    const templates_ = await api.getCategoryDatas({
      debug_key: "debug",
      cat_id: categoryId as any,
      limit: 50,
      page: pages,
    });
    setIsloading(true);
    const newItems = templates_?.datas;
    setapiData((prevData: any) => [...prevData, ...newItems]);
    setPage((prevPage) => prevPage + 1);
    setIsloading(false);
    setTemplates(templates_);
    setIsNotFix(templates_?.cat_id >= 0);
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  useEffect(() => {
    let debounceTimer: any;

    const handleScroll = () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      debounceTimer = setTimeout(() => {
        const { scrollTop, clientHeight, scrollHeight } =
          document.documentElement;
        const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

        if (distanceFromBottom < 1200 && !isloading) {
          fetchData(page);
        }
      }, 700);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, isloading]);

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

  // useEffect(() => {
  //   const uniqueApiData = Object.values(
  //     apiData.reduce((uniqueItems: any, item: any) => {
  //       if (!uniqueItems[item.template_id]) {
  //         uniqueItems[item.template_id] = item;
  //       }
  //       return uniqueItems;
  //     }, {})
  //   );

  //   const sortedApiData = uniqueApiData.reverse(); // Reverse the array

  //   setUniqueApiData(sortedApiData);
  // }, [apiData]);

  return (
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
            {apiData.map((item: any, index: number) => (
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
            {templates && templates?.total_pages > page ? (
              new Array(multiSize).fill("#497dec26").map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#497dec26",
                    borderRadius: "10px",
                    marginBottom: "61px",
                    height: `${calculateHeight(
                      apiData[0]?.width,
                      apiData[0]?.height,
                      height
                    )}px`,
                  }}
                  className={` ${
                    !isNotFix ? "min_h_240" : ""
                  }  skeleton-loader img_width_187px this_template_width`}
                  //
                ></div>
              ))
            ) : (
              <></>
            )}
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
  );
}
