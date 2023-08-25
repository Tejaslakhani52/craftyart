import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Payment from "./payment/Payment";
import { toast } from "react-hot-toast";
import { consoleShow } from "../../commonFunction/console";
import { Box } from "@mui/material";
// import geoip from "geoip-lite";

export default function PricePlan() {
  const uId = localStorage.getItem("userProfile");
  const [pricePlaneData, setpricePlaneData] = useState<any>();
  const [checkedDataPlane, setcheckedDataPlane] = useState<any>(null);
  consoleShow("checkedDataPlane: ", checkedDataPlane);
  const [isLoading, setIsLoading] = useState<any>(false);

  useEffect(() => {
    if (uId) {
      localStorage.setItem("navigate", ``);
    }
  }, [uId]);

  const [userCountryCode, setUserCountryCode] = useState("");
  consoleShow("userCountryCode: ", userCountryCode);

  const getData = async () => {
    try {
      const res = await axios.get("https://story.craftyartapp.com/get-ip");
      const ip = res.data.ip;

      const response = await axios
        .post("https://story.craftyartapp.com/api/getCountryCode", { ip })
        .then((res: any) => {
          setUserCountryCode(res?.data?.countryCode);
          axios
            .post(
              "https://story.craftyartapp.com/my-api",
              {
                user_id: uId,
                currency: res?.data?.countryCode === "IN" ? "INR" : "USD",
              },
              { withCredentials: false }
            )
            .then((response: any) => {
              consoleShow("response: ", response);
              const jsonString = response.data.substring(
                response.data.indexOf("{"),
                response.data.lastIndexOf("}") + 1
              );
              // const a = JSON.stringify(response?.data);
              consoleShow("itsData", JSON.parse(jsonString));
              const getData = JSON.parse(jsonString);
              setpricePlaneData(getData?.subs);
              setIsLoading(false);
            })
            .catch((error) => {
              consoleShow("error:", error);
              setIsLoading(false);
            });
        });
      consoleShow("responsescsacascas: ", response);
    } catch (error) {
      console.error("Error fetching country code:", error);
      setUserCountryCode("Unknown");
    }
  };

  useEffect(() => {
    getData();
    setIsLoading(true);
  }, []);

  return (
    <>
      <Box
        className=" "
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        <div
          className="faq_main col-md-6"
          style={{ backgroundColor: "#F5F5F5", paddingTop: "25px" }}
        >
          <div className="section_heading text-center mb-4 pb-2">
            <h5 className="color_green1">Welcome To Crafty Art Design</h5>
            <h2 className="section_title mb-0">Select Your Best Plan</h2>
          </div>
          <div className="container">
            <div className="faq_inner">
              <div className="faq_accordion">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq1"
                        aria-expanded="true"
                        aria-controls="faq1"
                      >
                        Can I use Crafty Art for free?
                      </button>
                    </h2>
                    <div
                      id="faq1"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p className="mb-0">
                          Yes, Crafty Art offers a free online logo maker. To
                          access it, select the Logo Maker option from the main
                          page and choose one of the premade templates. You can
                          then add your own images, text, and design elements to
                          customise the post. When you’re finished, click
                          "Save," and your logo will be ready to download.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq2"
                        aria-expanded="false"
                        aria-controls="faq2"
                      >
                        What are the benefits of a premium subscription?
                      </button>
                    </h2>
                    <div
                      id="faq2"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p className="mb-0">
                          As a premium user you can download unlimited Crafty
                          Art assets, and various services.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq3"
                        aria-expanded="false"
                        aria-controls="faq3"
                      >
                        Why do i have to purchase Crafty Art Pro?
                      </button>
                    </h2>
                    <div
                      id="faq3"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p className="mb-0">
                          With the premium user, you can access unlimited
                          service of Crafty Art Pro.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq4"
                        aria-expanded="false"
                        aria-controls="faq4"
                      >
                        Are my downloads unlimited as a premium user?
                      </button>
                    </h2>
                    <div
                      id="faq4"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p className="mb-0">
                          Yes, as a premium user, you have unlimited downloads.
                          There is no limitations on the use of Crafty Art
                          assets, templates, and the Background Remover Tool.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ========= CHOOSE PLAN SECTION ========= */}
        <section
          className="choose-plan my-5 container-fluid col-md-6"
          style={{ paddingTop: "40px" }}
        >
          <div className="choose-plan-inner px-sm-0 px-3">
            <div className="justify-content-center align-items-center flex-wrap">
              {pricePlaneData?.map((item: any) => (
                <div
                  className="px-3 mb-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => setcheckedDataPlane(item)}
                >
                  <div
                    className="choose-plan-card common-card selected-cards"
                    id="basic"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="radioButton">
                        <input
                          type="radio"
                          id={`plane-${item.id}`}
                          name="plane-selector"
                          value={item.id}
                          checked={checkedDataPlane?.id === item.id}
                        />
                        <label htmlFor="f-option">
                          <h3 className="section_title mb-3">
                            {item?.package_name}
                          </h3>
                        </label>
                        <div className="check"></div>
                      </div>

                      <div
                        className="choose-plan-inr"
                        style={{
                          display: "inline-block",
                          alignItems: "flex-end",
                        }}
                      >
                        <h4
                          className=" mb-0"
                          style={{
                            textDecoration: "line-through",
                            opacity: "0.6",
                          }}
                        >
                          {item?.has_offer ? item?.actual_price : ""}
                        </h4>
                        <h4 className=" mb-0">
                          {/* {convertINRtoUSD(item?.price) as any} */}
                          {item?.offer_price}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="choose-plan my-3 container-fluid">
            <div className="choose-plan-inner px-sm-0 px-3">
              <div
                className="choose-plan-card"
                style={{
                  backgroundColor: "#F5F5F5",
                  paddingLeft: "0",
                  paddingRight: "0",
                }}
              >
                {checkedDataPlane?.id ? (
                  uId ? (
                    <button
                      type="button"
                      className="w-100 register_btn text-decoration-none login_modal_open"
                      data-bs-toggle="modal"
                      data-bs-target="#payout"
                      style={{ border: "none" }}
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-100 register_btn text-decoration-none login_modal_open"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                      role="button"
                      style={{ border: "none" }}
                      onClick={() => {
                        localStorage.setItem("navigate", `/pricePlans`);
                      }}
                    >
                      Continue
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    className="w-100 register_btn text-decoration-none login_modal_open"
                    style={{ border: "none" }}
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ========= CHOOSE PLAN MODAL START ========= */}
          <Payment
            selectPaln={checkedDataPlane}
            countryCode={userCountryCode}
          />
          {/* ========= CHOOSE PLAN OFFCANVAS START ========= */}
          <div
            className="offcanvas offcanvas-end "
            tabIndex={-1}
            id="choosePlanOffcanvas"
            aria-labelledby="choosePlanOffcanvasLabel"
          >
            <div className="offcanvas-header justify-content-start align-items-baseline">
              <button
                type="button"
                className="btn text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <i className="fa-solid fa-arrow-left" />
              </button>
              <h5 className="section_heading_title mb-0">Subscriptions Plan</h5>
            </div>
            <div className="plan-inner-body">
              <div className="plan-card card active mb-3">
                <div className="card-header">
                  <h3 className="plan-card-title text-center mb-0">Basic</h3>
                </div>
                <div className="card-body text-center mx-auto">
                  <div className="plan-card-contact d-flex align-items-baseline ">
                    <h3 className="mb-0">99</h3>
                    <p className="text-start mb-0">INR / per 7 days</p>
                  </div>
                  <p className="mb-0">Best for professionals</p>
                </div>
              </div>
              <div className="plan-card card mb-3">
                <div className="card-header">
                  <h3 className="plan-card-title text-center mb-0">Standard</h3>
                </div>
                <div className="card-body text-center mx-auto">
                  <div className="plan-card-contact d-flex align-items-baseline ">
                    <h3 className="mb-0">299</h3>
                    <p className="text-start mb-0">INR / per 1 month</p>
                  </div>
                  <p className="mb-0">Best for professionals</p>
                </div>
              </div>
              <div className="plan-card card mb-3">
                <div className="card-header">
                  <h3 className="plan-card-title text-center mb-0">Premium</h3>
                </div>
                <div className="card-body text-center mx-auto">
                  <div className="plan-card-contact d-flex align-items-baseline ">
                    <h3 className="mb-0">899</h3>
                    <p className="text-start mb-0">INR / per 6 month</p>
                  </div>
                  <p className="mb-0">Best for professionals</p>
                </div>
              </div>
              <div className="plan-card card mb-3">
                <div className="card-header">
                  <h3 className="plan-card-title text-center mb-0">Silver</h3>
                </div>
                <div className="card-body text-center mx-auto">
                  <div className="plan-card-contact d-flex align-items-baseline ">
                    <h3 className="mb-0">1255</h3>
                    <p className="text-start mb-0">INR / per 1 year</p>
                  </div>
                  <p className="mb-0">Best for professionals</p>
                </div>
              </div>
              <div className="plan-card card mb-3">
                <div className="card-header">
                  <h3 className="plan-card-title text-center mb-0">Gold</h3>
                </div>
                <div className="card-body text-center mx-auto">
                  <div className="plan-card-contact d-flex align-items-baseline ">
                    <h3 className="mb-0">2149</h3>
                    <p className="text-start mb-0">INR / per 2 year</p>
                  </div>
                  <p className="mb-0">Best for professionals</p>
                </div>
              </div>
              <div className="plan-card card mb-3">
                <div className="card-header">
                  <h3 className="plan-card-title text-center mb-0">Platinum</h3>
                </div>
                <div className="card-body text-center mx-auto">
                  <div className="plan-card-contact d-flex align-items-baseline ">
                    <h3 className="mb-0">4469</h3>
                    <p className="text-start mb-0">INR / per 5 year</p>
                  </div>
                  <p className="mb-0">Best for professionals</p>
                </div>
              </div>
            </div>
            <div className="plan-inner-footer">
              <a
                href="javascript:;"
                className="btn paynow py-2"
                data-bs-toggle="modal"
                data-bs-target="#payout"
              >
                Next
              </a>
            </div>
          </div>
        </section>
      </Box>

      {isLoading && (
        <main className="main">
          <span className="loader"></span>
        </main>
      )}
    </>
  );
}
