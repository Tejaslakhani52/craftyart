import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CatDataRoot } from "../../interfaces/CatDataObject";
import TemplateModel from "../../pages/allTemplate/components/tempateModal/TemplateModel";
import { useDispatch, useSelector } from "react-redux";
import { searchLoading } from "../../redux/reducer/dataReducer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function calculateHeight(width: number, height: number, newWidth: number) {
  return (height / width) * newWidth;
}

export default function SearchBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPathname = location.pathname;
  const { name } = useParams();
  const modifiedName = name?.replace(/-/g, " ");

  const { id } = useParams();
  console.log("id: ", currentPathname);
  const [value, setValue] = useState<any>(modifiedName);
  const [finalData, setfinalData] = React.useState<any>([]);
  console.log("finalData: ", finalData);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  // const [uniqueApiData, setUniqueApiData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [dataPass, setDataPaas] = useState({});
  const [page, setPage] = useState<number>(1);
  console.log("page: ", page);
  const [templates, setTemplates] = useState<CatDataRoot>();

  const searchLoadingValue = useSelector(
    (state: any) => state.data.searchLoading
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const replaceURL = (url: string) => {
    const modifiedURL = url.replace(/%20/g, "-");
    console.log("modifiedURL: ", modifiedURL);
    navigate(modifiedURL);
  };

  useEffect(() => {
    replaceURL(currentPathname);
  }, [currentPathname]);

  const getSearchList = (pages: number) => {
    axios
      .post("https://story.craftyartapp.com/search-template", {
        key: "qwfsegxdhbxfjhncf",
        app_id: "1",
        cat_id: id?.toString() ?? "-1",
        keywords: value?.toString(),
        device: "0",
        refWidth: "1080",
        refHeight: "1080",
        page: pages,
        debug: "debug",
      })
      .then((response: any) => {
        const jsonString = response.data.substring(
          response.data.indexOf("{"),
          response.data.lastIndexOf("}") + 1
        );
        const getData = JSON.parse(jsonString);
        setTemplates(getData);
        const newItems = getData?.datas;
        if (pages === 1) {
          setfinalData(newItems);
          setPage(2);
        } else {
          setfinalData((prevData: any) => [...prevData, ...newItems]);
          setPage((prevPage) => prevPage + 1);
        }

        dispatch(searchLoading(false));
      })
      .catch((error: any) => console.log("error: ", error));
  };

  useEffect(() => {
    getSearchList(page);
    dispatch(searchLoading(true));
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

        if (distanceFromBottom < 1200 && !searchLoadingValue) {
          getSearchList(page);
        }
      }, 700);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, searchLoadingValue]);

  // useEffect(() => {
  //   const uniqueApiDatas = Object.values(
  //     finalData.reduce((uniqueItems: any, item: any) => {
  //       if (!uniqueItems[item.template_id]) {
  //         uniqueItems[item.template_id] = item;
  //       }
  //       return uniqueItems;
  //     }, {})
  //   );

  //   const sortedApiData = uniqueApiDatas; // Reverse the array

  //   setUniqueApiData(sortedApiData);
  // }, [finalData]);

  return (
    <div>
      <div className="template_modal">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              <div
                className="template_modal_body"
                style={{ minHeight: `${screenHeight - 435}px` }}
              >
                <div
                  className="insta_template_left template_left_width px-0 px-lg-2"
                  style={{ border: "none", width: "100%" }}
                >
                  <div className="d-none d-lg-block serachbar_position">
                    <div
                      className="search_input d-flex align-items-center"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const modifiedValue = value.replace(/ /g, "-");
                          console.log("modifiedValue: ", modifiedValue);
                          if (value !== "") {
                            if (id && id !== "latest" && id !== "trending") {
                              window.history.replaceState(
                                { replace: true },
                                "",
                                `/templates/${id}/${modifiedValue}`
                              );
                            } else {
                              window.history.replaceState(
                                { replace: true },
                                "",
                                `/s/${modifiedValue}`
                              );
                            }
                            getSearchList(1);
                            dispatch(searchLoading(true));
                          } else {
                            dispatch(searchLoading(false));
                          }
                        }
                      }}
                    >
                      <input
                        type="search"
                        value={value}
                        placeholder="Search posts"
                        className="border-0 bg-transparent w-100 h-100 fs-5"
                        onChange={(e) => setValue(e.target.value)}
                      />
                      <i
                        className="fa-solid fa-magnifying-glass color_green1 fs-6"
                        onClick={() => {
                          const modifiedValue = value.replace(/ /g, "-");
                          if (value !== "") {
                            id && id !== "latest" && id !== "trending"
                              ? window.history.replaceState(
                                  { replace: true },
                                  "",
                                  `/templates/${id}/${modifiedValue}`
                                )
                              : window.history.replaceState(
                                  { replace: true },
                                  "",
                                  `/s/${modifiedValue}`
                                );
                            getSearchList(1);
                            dispatch(searchLoading(true));
                          } else {
                            dispatch(searchLoading(false));
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
                {searchLoadingValue ? (
                  <main className="main">
                    <span className="loader"></span>
                  </main>
                ) : (
                  <div className="you_may_like template_main ">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 30px",
                        minHeight: "70px",
                      }}
                    >
                      {finalData?.length > 0 ? (
                        <h3 className="mb-0 text-center">
                          The template you found
                        </h3>
                      ) : (
                        <div
                          style={{
                            textAlign: "center",
                            // height: `${screenHeight - 485}px`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <h3> No templates found</h3>
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        gridTemplateColumns: ` repeat(${multiSize}, minmax(0px, 1fr))`,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {finalData?.map((item: any, index: number) => {
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

                              const newPath = `/templates/p/${item?.id_name}`;
                              window.history.pushState({}, "", newPath);
                            }}
                          >
                            <div
                              className={`${
                                id && id !== "latest" && id !== "trending"
                                  ? "h_auto background_light_green w_fit brd_10"
                                  : "background_light_green padding_10 min_h_240 brd_10"
                              } gallery_img position-relative`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {/* <img
                                className={`${
                                  id && id !== "latest" && id !== "trending"
                                    ? "img_width_187px border_radius this_template_width "
                                    : `no_width`
                                }  `}
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
                              /> */}
                              <div
                                className={`${
                                  id && id !== "latest" && id !== "trending"
                                    ? "img_width_187px border_radius this_template_width"
                                    : "no_width max_w_120"
                                }`}
                                style={{
                                  height:
                                    id && id !== "latest" && id !== "trending"
                                      ? `${calculateHeight(
                                          item?.width,
                                          item?.height,
                                          height
                                        )}px`
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
                            <div
                              className={`img_small_title mt-3 pb-3 ${"img_small_title_template_width"} `}
                            >
                              <h6 className="mb-0">{item.template_name}</h6>
                              <span>{item.category_name}</span>
                            </div>
                          </div>
                        );
                      })}
                      {templates && !templates?.isLastPage ? (
                        new Array(multiSize)
                          .fill("#497dec26")
                          .map((item, index) => (
                            <div
                              key={index}
                              style={{
                                backgroundColor: "#497dec26",
                                borderRadius: "10px",
                                marginBottom: "61px",
                                height: `${calculateHeight(
                                  finalData[0]?.width,
                                  finalData[0]?.height,
                                  height
                                )}px`,
                              }}
                              className={`${id ? "" : "min_h_240"}
                              } skeleton-loader img_width_187px this_template_width`}
                            ></div>
                          ))
                      ) : (
                        <></>
                      )}
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
        templates={finalData ?? []}
        screenWidth={screenWidth}
        mainId={"-1"}
        currentPathname={currentPathname}
      />
    </div>
  );
}
