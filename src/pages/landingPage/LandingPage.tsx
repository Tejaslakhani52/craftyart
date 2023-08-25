import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo1 from "../../assets/images/logo1.svg";
import logo2 from "../../assets/images/logo2.svg";
import logo3 from "../../assets/images/logo3.svg";
// import logoGroup from "../../assets/images/happyRes.svg";
import logoGroup from "../../assets/images/perfactInvitation-min.png";
import stunning from "../../assets/images/stunningInvitation-min.png";
import custome from "../../assets/images/customeInvitation-min.png";
import mainLogo from "../../assets/images/invitationMainGroup-min.png";
import mark from "../../assets/images/rightMarks.svg";
import api from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import FAQs from "../faqs/faqs";
import FaqsBox from "../categoryPage/components/Faqs";
import Banner from "../categoryPage/components/Banner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { consoleShow } from "../../commonFunction/console";
import { Helmet } from "react-helmet";
import LinkComponent from "../../components/commonComponents/LinkComponent";

const token = localStorage.getItem("userProfile");

function calculateHeight(width: number, height: number, newWidth: number) {
  return (height / width) * newWidth;
}

export const MarkText = ({ text }: any) => {
  return (
    <Box sx={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
      <img src={mark} alt="" style={{ marginTop: "5px" }} />
      <Typography sx={{ fontSize: "16px", color: "#1C3048" }}>
        {text}
      </Typography>
    </Box>
  );
};

export const CustomeButton = ({ text }: any) => {
  const navigate = useNavigate();
  return token ? (
    <button
      style={{
        background:
          "linear-gradient(268.03deg, #5961F8 -0.66%, #15D8C5 100%, #15D8C5 100%)",
        width: "162px",
        fontSize: "20px",
        textTransform: "unset",
        filter:
          "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        border: "none",
        padding: "5px 10px",
        borderRadius: "4px",
        marginLeft: "40px",
      }}
      onClick={() => navigate("/")}
    >
      <Typography
        sx={{
          fontSize: "20px",
          color: "white",
          width: "100%",
          fontWeight: "500",
        }}
        variant="h1"
      >
        {text}
      </Typography>
    </button>
  ) : (
    <button
      style={{
        background:
          "linear-gradient(268.03deg, #5961F8 -0.66%, #15D8C5 100%, #15D8C5 100%)",
        width: "162px",
        fontSize: "20px",
        textTransform: "unset",
        filter:
          "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        border: "none",
        padding: "5px 10px",
        borderRadius: "4px",
        marginLeft: "40px",
      }}
    >
      {/* <Typography
        sx={{
          fontSize: "20px",
          color: "white",
          width: "100%",
          fontWeight: "500",
        }}
      >
        {text}
      </Typography> */}

      <a
        className="text-decoration-none"
        data-bs-toggle="modal"
        href="#loginModal"
        role="button"
      >
        <Typography
          sx={{
            fontSize: "20px",
            color: "white",
            width: "100%",
            fontWeight: "500",
          }}
        >
          {text}
        </Typography>
      </a>
    </button>
  );
};

export const DetailTitle = ({ text1, text2, text3 }: any) => {
  return (
    <Typography
      sx={{
        fontSize: { xs: "21px", lg: "32px" },
        color: "#000",
        fontWeight: "600",
        textAlign: { xs: "center", lg: "left" },
      }}
      variant="h2"
    >
      {text1}
      <span
        style={{
          background:
            "-webkit-linear-gradient(268.03deg, #5961F8 -0.66%, #5961F8 -0.65%, #497DEC 22.41%, #15D8C5 100%, #15D8C5 100%)",
          WebkitBackgroundClip: "text",
          // color: "transparent",
          WebkitTextFillColor: "transparent",
          width: "100%",
          margin: "0 7px",
        }}
      >
        {text2}
      </span>
      {text3}
    </Typography>
  );
};

export function GetTemplates(props: any) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          background:
            "linear-gradient(268.03deg, #5961F8 -0.66%, #15D8C5 100%, #15D8C5 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: { xs: "20px 10px", lg: "50px" },
          gap: { xs: "20px", lg: "50px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "25px", lg: "32px" },
              color: "#ffffff",
              fontWeight: "600",
              // lineHeight: "41px",
              textAlign: "center",
            }}
            variant="h2"
          >
            Discover Limitless Design Possibilities with Our Collection of 5000+
            Invitation Templates.
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#ffffff",
              fontWeight: "400",
              padding: { xs: "10px 0", lg: "20px 0 0 0 " },
              textAlign: "center",
            }}
            variant="h3"
          >
            Discover the art of unforgettable moments through invitation cards.
            Make a Personalized and perfect invitation card for your special
            event. Let's make memories together!
          </Typography>
        </Box>
        {token ? (
          <button
            style={{
              backgroundColor: "white",
              width: "203px",
              fontSize: "20px",
              textTransform: "unset",
              filter:
                "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              // margin: "20px 0",
            }}
            onClick={() => navigate("/templates/invitation-card")}
          >
            <Typography
              sx={{
                fontSize: "20px",
                background:
                  "-webkit-linear-gradient(268.03deg, #5961F8 -0.66%, #5961F8 -0.65%, #497DEC 22.41%, #15D8C5 100%, #15D8C5 100%)",
                WebkitBackgroundClip: "text",
                // color: "transparent",
                WebkitTextFillColor: "transparent",
                width: "100%",
                fontWeight: "500",
              }}
            >
              Get All Templates
            </Typography>
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "white",
              width: "203px",
              fontSize: "20px",
              textTransform: "unset",
              filter:
                "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              // margin: "20px 0",
            }}
          >
            <a
              className="text-decoration-none"
              data-bs-toggle="modal"
              href="#loginModal"
              role="button"
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  background:
                    "-webkit-linear-gradient(268.03deg, #5961F8 -0.66%, #5961F8 -0.65%, #497DEC 22.41%, #15D8C5 100%, #15D8C5 100%)",
                  WebkitBackgroundClip: "text",
                  // color: "transparent",
                  WebkitTextFillColor: "transparent",
                  width: "100%",
                  fontWeight: "500",
                }}
              >
                Get All Templates
              </Typography>
            </a>
          </button>
        )}
      </Box>
    </>
  );
}

export function InvitationBox() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState<any>([]);
  consoleShow("data: ", data);
  const [data2, setData2] = useState<any>([]);
  const [data3, setData3] = useState<any>([]);

  const fetchData = async () => {
    const templates_ = await api.getCategoryDatas({
      debug_key: "debug",
      cat_id: "a4-invitation" as any,
      limit: 18,
      page: 1,
    });
    setData(templates_?.datas);
  };

  // const fetchData2 = async () => {
  //   const templates_ = await api.getCategoryDatas({
  //     debug_key: "debug",
  //     cat_id: "invitation-portrait" as any,
  //     limit: 7,
  //     page: 1,
  //   });
  //   setData2(templates_?.datas);
  // };

  // const fetchData3 = async () => {
  //   const templates_ = await api.getCategoryDatas({
  //     debug_key: "debug",
  //     cat_id: "a4-greeting" as any,
  //     limit: 7,
  //     page: 1,
  //   });
  //   setData3(templates_?.datas);
  // };

  useEffect(() => {
    fetchData();
    // fetchData2();
    // fetchData3();
  }, []);
  return (
    <div>
      <Box sx={{ width: { xs: "95%", lg: "90%" }, margin: "50px auto" }}>
        <Typography
          sx={{
            color: "#1C3048",
            fontSize: { xs: "25px", lg: "36px" },
            textAlign: "center",
            fontWeight: "500",
          }}
          variant="h2"
        >
          Start Explore Templates :
        </Typography>

        <Typography
          sx={{
            color: "#1C3048",
            fontSize: "18px",
            textAlign: "center",
            fontWeight: "500",
            my: "20px",
          }}
          variant="h3"
        >
          Get a headstart with fully customizable templates
        </Typography>

        <Box
          sx={{
            width: "75%",
            justifyContent: "space-between",
            display: { xs: "none", lg: "flex" },
            margin: "auto",
            gap: "20px",
          }}
        >
          {data
            ?.filter((e: any, index: number) => index < 5)
            .map((item: any, index: number) => (
              <Box
                key={index}
                className="background_light_green"
                sx={{
                  width: "200px",
                  cursor: "pointer",
                  height: calculateHeight(item?.width, item?.height, 200),
                  marginBottom: "15px",
                }}
                onClick={() => {
                  localStorage.setItem(
                    "navigate",
                    `/templates/p/${item.id_name}`
                  );
                }}
              >
                {/* <img
                  src={item.template_thumb}
                  alt=""
                  style={{ width: "100%" }}
                /> */}
                <a
                  className="text-decoration-none"
                  data-bs-toggle="modal"
                  href="#loginModal"
                  role="button"
                >
                  <LazyLoadImage
                    src={item.template_thumb}
                    alt={"image"}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: calculateHeight(item?.width, item?.height, 200),
                    }}
                  />
                </a>
              </Box>
            ))}
        </Box>
        <Box
          sx={{
            width: { xs: "100%", lg: "90%" },
            justifyContent: { xs: "center", lg: "space-between" },
            display: "flex",
            margin: "auto",
            gap: { xs: "10px", lg: "20px" },
            flexWrap: { xs: "wrap", lg: "nowrap" },
          }}
        >
          {data
            ?.filter((e: any, index: number) => index > 5 && index < 12)
            .map((item: any, index: number) => (
              <Box
                key={index}
                className="background_light_green"
                sx={{
                  width: { xs: "160px", lg: "200px" },
                  cursor: "pointer",
                  my: "20px",
                  height: calculateHeight(item?.width, item?.height, 200),
                }}
                onClick={() => {
                  localStorage.setItem(
                    "navigate",
                    `/templates/p/${item.id_name}`
                  );
                }}
              >
                <a
                  className="text-decoration-none"
                  data-bs-toggle="modal"
                  href="#loginModal"
                  role="button"
                >
                  <LazyLoadImage
                    src={item.template_thumb}
                    alt={"image"}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: calculateHeight(item?.width, item?.height, 200),
                    }}
                  />
                </a>
                {/* <img
                  src={item.template_thumb}
                  alt=""
                  style={{ width: "100%" }}
                /> */}
                {/* 
                <LazyLoadImage
                  src={item.template_thumb}
                  alt={"image"}
                  width={100}
                  effect="blur"
                  style={{ width: "100%" }}
                /> */}
              </Box>
            ))}
        </Box>

        <Box
          sx={{
            width: "75%",
            justifyContent: "space-between",
            display: { xs: "none", lg: "flex" },
            margin: "auto",
            gap: "20px",
          }}
        >
          {data
            ?.filter((e: any, index: number) => index > 12 && index < 18)
            .map((item: any, index: number) => (
              <Box
                key={index}
                className="background_light_green"
                sx={{
                  width: "200px",
                  cursor: "pointer",
                  my: "20px",
                  height: calculateHeight(item?.width, item?.height, 200),
                }}
                onClick={() => {
                  localStorage.setItem(
                    "navigate",
                    `/templates/p/${item.id_name}`
                  );
                }}
              >
                <a
                  className="text-decoration-none"
                  data-bs-toggle="modal"
                  href="#loginModal"
                  role="button"
                >
                  <LazyLoadImage
                    src={item.template_thumb}
                    alt={"image"}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: calculateHeight(item?.width, item?.height, 200),
                    }}
                  />
                </a>
                {/* <img
                  src={item.template_thumb}
                  alt=""
                  style={{ width: "100%" }}
                /> */}
              </Box>
            ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: "30px" }}>
          <button
            style={{
              background:
                "linear-gradient(268.03deg, #5961F8 -0.66%, #15D8C5 100%, #15D8C5 100%)",
              width: "203px",
              fontSize: "20px",
              textTransform: "unset",
              filter:
                "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              margin: "auto",
            }}
            onClick={() =>
              localStorage.setItem("navigate", `/templates/invitation-card`)
            }
          >
            <a
              className="text-decoration-none"
              data-bs-toggle="modal"
              href="#loginModal"
              role="button"
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "white",
                  width: "100%",
                  fontWeight: "500",
                }}
              >
                Get All Templates
              </Typography>
            </a>
          </button>
        </Box>
      </Box>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div>
      <Helmet>
        <title>
          Customize Your Invitation Card in Your Style And Your Event with
          crafty art
        </title>
        <meta
          name="description"
          content="Create Stunning Invitations card with Crafty Art Invitation Card Maker Online - Easy, Fast, & Free. Design Your Dream Invite Today!"
        />
      </Helmet>
      <Box
        sx={{
          background:
            "linear-gradient(268.03deg, #5961F8 -0.66%, #5961F8 -0.65%, #497DEC 22.41%, #15D8C5 100%, #15D8C5 100%)",
          height: "420px",
          display: "flex",
          alignItems: "center",
          paddingLeft: { xs: "10px", md: "50px" },
          borderRadius: "8px",
          margin: "10px auto",
          width: "97%",
          // flexDirection: { sm: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "57%" },
            display: "flex",
            flexDirection: "column",
            gap: { xs: "15px", md: "30px" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "30px", md: "40px" },
              color: "#ffffff",
              width: "100%",
              fontWeight: "600",
              lineHeight: { xs: "35px", md: "48px" },
            }}
            variant="h1"
          >
            Invitations Beyond Imagination - Welcome to Crafty Art Invitation
            Card Maker
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "17px", md: "20px" },
              color: "#1C3048",
              // color: "#ffffff",
              width: "100%",
              fontWeight: "500",
            }}
          >
            Make lovely invitation card for birthday, baby shower, weddings, and
            save-the-dates. Regardless of the event, you can make beautiful,
            personalised invites and shop with confidence by choosing the finish
            type, size, and matching envelopes.
          </Typography>
          {token ? (
            <button
              style={{
                backgroundColor: "white",
                width: "162px",
                fontSize: "20px",
                textTransform: "unset",
                filter:
                  "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
              }}
              // onClick={() => navigate("/")}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  background:
                    "-webkit-linear-gradient(268.03deg, #5961F8 -0.66%, #5961F8 -0.65%, #497DEC 22.41%, #15D8C5 100%, #15D8C5 100%)",
                  WebkitBackgroundClip: "text",
                  // color: "transparent",
                  WebkitTextFillColor: "transparent",
                  width: "100%",
                  fontWeight: "500",
                }}
              >
                Start Designing
              </Typography>
            </button>
          ) : (
            <button
              style={{
                backgroundColor: "white",
                width: "162px",
                fontSize: "20px",
                textTransform: "unset",
                filter:
                  "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
              }}
              // onClick={() => navigate("/")}
            >
              <a
                className="text-decoration-none"
                data-bs-toggle="modal"
                href="#loginModal"
                role="button"
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    background:
                      "-webkit-linear-gradient(268.03deg, #5961F8 -0.66%, #5961F8 -0.65%, #497DEC 22.41%, #15D8C5 100%, #15D8C5 100%)",
                    WebkitBackgroundClip: "text",
                    // color: "transparent",
                    WebkitTextFillColor: "transparent",
                    width: "100%",
                    fontWeight: "500",
                  }}
                >
                  Start Designing
                </Typography>
              </a>
            </button>
          )}
        </Box>
        <Box
          sx={{
            width: "43%",
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "354px" }}>
            <img
              src={mainLogo}
              alt=""
              // className="img_logo"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 0px",
          width: { xs: "95%", lg: "80%" },
          margin: "auto",
          justifyContent: "space-between",
          marginY: "50px",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: { xs: "90%", xl: "570px" },
            height: "100%",
          }}
        >
          <img
            src={logoGroup}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box
          sx={{
            flex: "1",
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: { xs: "30px", xl: "0" },
            }}
          >
            <DetailTitle
              text1={"Craft the"}
              text2={"PERFACT INVITATION CARD"}
              text3={"with ease"}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <MarkText text="Choose a design template that matches your event's theme and purpose." />
              <MarkText text="Customise the text, font, and colour to convey your message and personality." />
              <MarkText text="Select high-quality images or graphics to add visual appeal and context on invitation card." />
              <MarkText text="Preview the invitation card to ensure it looks clean, professional, and error-free." />
              <MarkText text="Share the invitation card via social media, email, or print to reach your desired audience." />
            </Box>
            <CustomeButton text="Start Designing" />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 0px",
          width: { xs: "95%", lg: "80%" },
          margin: "auto",
          justifyContent: "space-between",
          marginY: "50px",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Box
          sx={{
            flex: "1",
            display: "flex",
            order: { xs: "2", lg: "1" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: { xs: "30px", xl: "0" },
            }}
          >
            <DetailTitle
              text1={"Make"}
              text2={"CUSTOM INVITATIONS CARD"}
              text3={"in minutes"}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <MarkText text="Sign up for an account or log in with your existing credentials." />
              <MarkText text="Browse through the selection of customizable invitation card templates." />
              <MarkText text="Pick a invitation template that aligns with your event's style and tone." />
              <MarkText text="Add your personalised information, such as event details, date, time, location, etc." />
              <MarkText text="Save, preview, and send the invitation card to your guests." />
            </Box>

            <CustomeButton text="Start Designing" />
          </Box>
        </Box>
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: { xs: "90%", xl: "570px" },
            height: "100%",
            order: { xs: "1", lg: "2" },
          }}
        >
          <img src={custome} alt="" style={{ width: "100%", height: "100%" }} />
        </Box>
      </Box>
      <InvitationBox />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 0px",
          width: { xs: "95%", lg: "80%" },
          margin: "auto",
          justifyContent: "space-between",
          marginY: "50px",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: { xs: "90%", xl: "570px" },
            height: "100%",
          }}
        >
          <img
            src={stunning}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box
          sx={{
            flex: "1",
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: { xs: "30px", xl: "0" },
            }}
          >
            <DetailTitle
              text1={"How to make"}
              text2={"STUNNING INVITATIONS CARD"}
              text3={"for free"}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <MarkText text="Start by searching for a reputable online invitation card maker." />
              <MarkText text="Explore the different invitation design templates available and select one that fits your occasion." />
              <MarkText text="Personalise your invitation by adding your own text, images, and other elements." />
              <MarkText text="Experiment with different fonts, colours, and layouts to create a visually appealing in your invitation card." />
              <MarkText text="Preview your work before sending it out to ensure it looks polished and professional." />
            </Box>

            <CustomeButton text="Start Designing" />
          </Box>
        </Box>
      </Box>

      <GetTemplates
        heading="Discover Limitless Design Possibilities with Our Collection of 5000+ Invitation Templates."
        text="Discover the art of unforgettable moments through invitation cards. Make a Personalized and perfect invitation card for your special event. Let's make memories together!"
        path="/templates/invitation-card"
      />

      <Box
        sx={{
          width: { xs: "95%", lg: "60%" },
          my: { xs: "50px", lg: "100px" },
          mx: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <DetailTitle text1={"Our"} text2={"Invitation"} text3={"Services"} />

        <Typography sx={{ pt: 2, width: "100%" }}>
          At Crafty Art, we offer a wide range of invitation services designed
          to make your special moments truly exceptional.
        </Typography>

        <Box>
          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "20px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Wedding Invitations :
            </Typography>{" "}
            From classic elegance to modern charm, our invitation card for
            wedding are tailored to capture the essence of your love story.
            Explore our wedding invitation background and design it today!
          </Typography>

          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "20px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Birthday Invitation :
            </Typography>{" "}
            Make every birthday a memorable event with our personalized birthday
            invitation card . Choose from a variety of themes and styles to suit
            your birthday celebration.
          </Typography>

          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "20px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Corporate Events :
            </Typography>{" "}
            Set the tone for your corporate events with our professional and
            customizable invitation cards. Impress your clients and partners
            with our sleek designs.
          </Typography>

          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "20px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Baby Showers :
            </Typography>{" "}
            Celebrate the upcoming arrival of your little one with our adorable
            baby shower invitation card maker template. We offer cute and
            creative baby shower designs for this special occasion.
          </Typography>

          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "20px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Custom Design :
            </Typography>{" "}
            Bring your vision to life with our custom invitation card design
            services. Our team of talented designers will work closely with you
            to create a one-of-a-kind invitation card for your wedding,
            engagement, anniversary, reception, birthday, baby shower, opening
            ceremony etc.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "95%", lg: "60%" },
          my: { xs: "50px", lg: "100px" },
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DetailTitle text1={"Why"} text2={"Choose"} text3={"Us"} />

        <Box sx={{ p: "5px" }}></Box>
        <div style={{ width: "100%" }}>
          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "10px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Unparalleled Creativity :
            </Typography>{" "}
            Crafty Art is known for their creativity and attention to detail.
            Expect invitation card that stand out from the rest.
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "20px", mt: "30px", fontWeight: "500" }}
          ></Typography>

          <Typography sx={{ pt: 0 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Customization :
            </Typography>{" "}
            Your vision is our priority. We offer fully customized designs to
            match your unique style and preferences.
          </Typography>

          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "10px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Exceptional Service :
            </Typography>{" "}
            Crafty Art is here to assist you at every step, making the process
            enjoyable and stress-free.
          </Typography>

          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "10px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Quality :
            </Typography>{" "}
            We provide a high resolution e- invitation card for your special
            event
          </Typography>
        </div>
      </Box>

      <Box
        sx={{
          width: { xs: "95%", lg: "60%" },
          my: { xs: "50px", lg: "100px" },
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DetailTitle text1={"We"} text2={"Are"} text3={"Unique"} />

        <Typography sx={{ pt: 2, width: "100%" }}>
          At Crafty Art we go beyond the ordinary to make your invitation card
          extraordinary. What sets us apart:
        </Typography>

        <div>
          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "10px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Innovation :
            </Typography>{" "}
            We stay ahead of the latest trends to offer fresh and innovative
            invitation card designs.
          </Typography>

          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "10px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Personal Touch :
            </Typography>{" "}
            Each invitation Card is crafted with care, ensuring it reflects the
            personality of the host.
          </Typography>

          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "10px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Affordability :
            </Typography>{" "}
            Quality invitations need not break the bank. We offer competitive
            pricing to fit your budget.
          </Typography>

          <Typography sx={{ pt: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                mt: "10px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Sustainability :
            </Typography>{" "}
            We are committed to eco-friendly practices, using E- invitation card
            for your event. Satisfaction Guaranteed: Your satisfaction is our
            top priority. We aren't happy unless you're delighted with your
            invitations.
          </Typography>
        </div>
      </Box>

      <Box
        sx={{
          width: { xs: "95%", lg: "60%" },
          my: { xs: "50px", lg: "100px" },
          mx: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <DetailTitle text1={"Some Popular"} text2={"Questions/Answered"} />
        <Box sx={{ p: "20px" }}></Box>
        <FaqsBox
          heding="1. How to write invitation card in english? "
          text={
            <p style={{ marginBottom: "0" }}>
              In{" "}
              <LinkComponent
                text={"Crafty Art"}
                link="https://www.craftyartapp.com/"
              />{" "}
              you can write{" "}
              <LinkComponent
                text={"invitation card"}
                link="https://www.craftyartapp.com/templates/invitation"
              />{" "}
              in english very easily and effortlessly.
            </p>
          }
        />
        <FaqsBox
          heding="2. How do I invite my friends for my wedding?"
          text={
            <div>
              <h3 style={{ fontSize: "16px" }}>
                To invite your friends to your wedding, follow these steps:
              </h3>
              <Box sx={{ padding: "0 20px" }}>
                <p style={{ marginBottom: "0" }}>
                  1. Create a guest list: Make a list of all the friends you
                  want to invite.
                </p>
                <p style={{ marginBottom: "0" }}>
                  2. Choose invitations: Select{" "}
                  <LinkComponent
                    text={"wedding invitations template "}
                    link="https://www.craftyartapp.com/k/wedding-invitation-template/"
                  />{" "}
                  that match your theme and style.
                </p>
                <p style={{ marginBottom: "0" }}>
                  3. Collect contact information: Ensure you have the current
                  addresses or email addresses of your friends.
                </p>
                <p style={{ marginBottom: "0" }}>
                  4. Send invitations: Mail physical invitations or use{" "}
                  <LinkComponent
                    text={" digital invites"}
                    link="https://www.craftyartapp.com/templates/invitation"
                  />{" "}
                  via email or social media.
                </p>
                <p style={{ marginBottom: "0" }}>
                  5. Include RSVP details: Specify the deadline and method for
                  RSVPs to confirm attendance.
                </p>
              </Box>
            </div>
          }
        />
        <FaqsBox
          heding="3. What should I include in a baby shower invitation card?"
          text={
            <p style={{ marginBottom: "0" }}>
              A{" "}
              <LinkComponent
                text={"baby shower invitation"}
                link="https://www.craftyartapp.com/s/baby-shower-invitation"
              />{" "}
              should include the date, time, location, RSVP details, and any
              specific requests such as bringing a gift or a dish to share.
            </p>
          }
        />
        <FaqsBox
          heding="4. Can I send digital invitation card for a formal corporate event?"
          text={
            <p style={{ marginBottom: "0" }}>
              While{" "}
              <LinkComponent
                text={"digital invitations"}
                link="https://www.craftyartapp.com/invitation"
              />{" "}
              are convenient, formal corporate events typically warrant printed
              invitations. However, you can send digital save-the-date cards to
              announce the event in advance.
            </p>
          }
        />
        <FaqsBox
          heding="5. Can I create custom invitation cards?"
          text={
            <p style={{ marginBottom: "0" }}>
              Absolutely! Crafty Art{" "}
              <LinkComponent
                text={"Invitation Card Maker"}
                link="https://www.craftyartapp.com/invitation"
              />{" "}
              empowers you to unleash your creativity and design{" "}
              <LinkComponent
                text={"custom invitation cards"}
                link="https://www.craftyartapp.com/templates/invitation"
              />{" "}
              that perfectly match your vision and event theme. With our
              user-friendly interface and a wide array of design elements, you
              can craft invitation cards that are as unique as your celebration.
            </p>
          }
        />
      </Box>

      <Box
        sx={{
          width: { xs: "95%", lg: "60%" },
          my: { xs: "50px", lg: "100px" },
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DetailTitle text1={"About "} text2={"Us"} />

        <Typography sx={{ pt: 2 }}>
          At Crafty Art we are passionate about turning life's moments into
          beautiful memories. With years of experience in the industry, we
          understand the importance of make perfect invitation card for your
          special event. Our commitment to quality, creativity, and customer
          satisfaction sets us apart.
        </Typography>
      </Box>
    </div>
  );
}
