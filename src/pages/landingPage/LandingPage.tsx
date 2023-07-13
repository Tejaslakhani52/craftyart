import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo1 from "../../assets/images/logo1.svg";
import logo2 from "../../assets/images/logo2.svg";
import logo3 from "../../assets/images/logo3.svg";
// import logoGroup from "../../assets/images/happyRes.svg";
import logoGroup from "../../assets/images/perfactInvitation.png";
import stunning from "../../assets/images/stunningInvitation.png";
import custome from "../../assets/images/customeInvitation.png";
import mainLogo from "../../assets/images/invitationMainGroup.png";
import mark from "../../assets/images/rightMarks.svg";
import api from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import FAQs from "../faqs/faqs";
import FaqsBox from "../categoryPage/components/Faqs";
import Banner from "../categoryPage/components/Banner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const token = localStorage.getItem("userProfile");

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
        fontSize: "32px",
        color: "#000",
        fontWeight: "600",
      }}
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
          margin: "0 10px",
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
          padding: "50px",
          gap: "50px",
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
              fontSize: "32px",
              color: "#ffffff",
              fontWeight: "600",
              lineHeight: "41px",
            }}
          >
            Unlock The Creativity Of Your Inner Designer With 5000+ Invitation
            Templates.
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#ffffff",
              fontWeight: "400",
              lineHeight: "41px",
            }}
          >
            Create unforgettable moments with personalized invitations
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
  const [data2, setData2] = useState<any>([]);
  const [data3, setData3] = useState<any>([]);

  const fetchData = async () => {
    const templates_ = await api.getCategoryDatas({
      debug_key: "debug",
      cat_id: "a4-invitation" as any,
      limit: 7,
      page: 1,
    });
    setData(templates_?.datas);
  };

  const fetchData2 = async () => {
    const templates_ = await api.getCategoryDatas({
      debug_key: "debug",
      cat_id: "invitation-portrait" as any,
      limit: 7,
      page: 1,
    });
    setData2(templates_?.datas);
  };

  const fetchData3 = async () => {
    const templates_ = await api.getCategoryDatas({
      debug_key: "debug",
      cat_id: "a4-greeting" as any,
      limit: 7,
      page: 1,
    });
    setData3(templates_?.datas);
  };

  useEffect(() => {
    fetchData();
    fetchData2();
    fetchData3();
  }, []);
  return (
    <>
      <Box sx={{ width: "90%", margin: "50px auto" }}>
        <Typography
          sx={{
            color: "#1C3048",
            fontSize: "36px",
            textAlign: "center",
            fontWeight: "500",
          }}
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
        >
          Get a headstart with fully customizable templates
        </Typography>

        <Box
          sx={{
            width: "75%",
            justifyContent: "space-between",
            display: "flex",
            margin: "auto",
          }}
        >
          {data
            ?.filter((e: any, index: number) => index < 5)
            .map((item: any, index: number) => (
              <Box
                key={index}
                className="background_light_green"
                sx={{
                  width: "18%",
                  cursor: "pointer",
                  height: "287px",
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
                    width={100}
                    effect="blur"
                    style={{ width: "100%" }}
                  />
                </a>
              </Box>
            ))}
        </Box>
        <Box
          sx={{
            width: "90%",
            justifyContent: "space-between",
            display: "flex",
            margin: "auto",
          }}
        >
          {data2
            ?.filter((e: any, index: number) => index < 6)
            .map((item: any, index: number) => (
              <Box
                key={index}
                className="background_light_green"
                sx={{
                  width: "14.66%",
                  cursor: "pointer",
                  my: "20px",
                  height: "247px",
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
                    width={100}
                    effect="blur"
                    style={{ width: "100%" }}
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
            display: "flex",
            margin: "auto",
          }}
        >
          {data3
            ?.filter((e: any, index: number) => index < 5)
            .map((item: any, index: number) => (
              <Box
                key={index}
                className="background_light_green"
                sx={{
                  width: "18%",
                  cursor: "pointer",
                  my: "20px",
                  height: "286px",
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
                    width={100}
                    effect="blur"
                    style={{ width: "100%" }}
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
    </>
  );
}

export default function LandingPage() {
  return (
    <div>
      <Box
        sx={{
          background:
            "linear-gradient(268.03deg, #5961F8 -0.66%, #5961F8 -0.65%, #497DEC 22.41%, #15D8C5 100%, #15D8C5 100%)",
          height: "420px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "50px",
          borderRadius: "8px",
          margin: "10px auto",
          width: "97%",
        }}
      >
        <Box
          sx={{
            width: "57%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              color: "#ffffff",
              width: "100%",
              fontWeight: "600",
              lineHeight: "48px",
            }}
          >
            Let Your Invitation Shine with Our Smooth and Sleek Invitation Maker
          </Typography>

          <Typography
            sx={{
              fontSize: "20px",
              color: "#1C3048",
              width: "100%",
              fontWeight: "500",
            }}
          >
            Make lovely invitations for birthdays, baby showers, weddings, and
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
            display: "flex",
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
          height: "500px",
          display: "flex",
          alignItems: "center",
          padding: "0 0px",
          width: "80%",
          margin: "auto",
          justifyContent: "space-between",
          marginY: "50px",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <img
            src={logoGroup}
            alt=""
            style={{ width: "570px", height: "100%" }}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <DetailTitle
              text1={" Craft the"}
              text2={"PERFACT INVITATION"}
              text3={"with ease"}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <MarkText text="Choose a design template that matches your event's theme and purpose." />
              <MarkText text="Customise the text, font, and colour to convey your message and personality." />
              <MarkText text="Select high-quality images or graphics to add visual appeal and context." />
              <MarkText text="Preview the invitation to ensure it looks clean, professional, and error-free." />
              <MarkText text="Share the invitation via social media, email, or print to reach your desired audience." />
            </Box>
            <CustomeButton text="Start Designing" />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "500px",
          display: "flex",
          alignItems: "center",
          padding: "0 0px",
          width: "80%",
          margin: "auto",
          justifyContent: "space-between",
          marginY: "50px",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <DetailTitle
              text1={"Make"}
              text2={"CUSTOM INVITATIONS"}
              text3={"in minutes"}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <MarkText text="Sign up for an account or log in with your existing credentials." />
              <MarkText text="Browse through the selection of customizable invitation templates." />
              <MarkText text="Pick a template that aligns with your event's style and tone." />
              <MarkText text="Add your personalised information, such as event details, date, time, location, etc." />
              <MarkText text="Save, preview, and send the invitation to your guests." />
            </Box>

            <CustomeButton text="Start Designing" />
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "flex-end",
          }}
        >
          <img
            src={custome}
            alt=""
            style={{ width: "500px", height: "100%" }}
          />
        </Box>
      </Box>
      <InvitationBox />
      <Box
        sx={{
          height: "500px",
          display: "flex",
          alignItems: "center",
          padding: "0 0px",
          width: "80%",
          margin: "auto",
          justifyContent: "space-between",
          marginY: "50px",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <img
            src={stunning}
            alt=""
            style={{ width: "550px", height: "100%" }}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <DetailTitle
              text1={"How to make"}
              text2={"STUNNING INVITATIONS"}
              text3={"for free"}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <MarkText text="Start by searching for a reputable online invitation maker." />
              <MarkText text="Explore the different design templates available and select one that fits your occasion." />
              <MarkText text="Personalise your invitation by adding your own text, images, and other elements." />
              <MarkText text="Experiment with different fonts, colours, and layouts to create a visually appealing invitation." />
              <MarkText text="Preview your work before sending it out to ensure it looks polished and professional." />
            </Box>

            <CustomeButton text="Start Designing" />
          </Box>
        </Box>
      </Box>

      <GetTemplates
        heading="Unlock The Creativity Of Your Inner Designer With 5000+ Invitation Templates."
        text="Create unforgettable moments with personalized invitations"
        path="/templates/invitation-card"
      />

      <Box
        sx={{
          width: "60%",
          my: "100px",
          mx: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <DetailTitle text1={"Some Popular"} text2={"Questions/Answered"} />
        <Box sx={{ p: "20px" }}></Box>
        <FaqsBox
          heding="1. What are the available design templates for invitations? "
          text="Our invitation maker offers a wide range of design templates to choose from, including options for birthdays, weddings,
          baby showers, graduations, and more."
        />
        <FaqsBox
          heding="2. Can I customise the text and images on the invitations?"
          text="Yes, our invitation maker allows you to personalise your invitations with your own text and images. You can also
          experiment with different fonts, colours, and layouts to create a unique look that matches your event."
        />
        <FaqsBox
          heding="3. How can I share my invitations with guests?"
          text="You can share your invitations via email, social media, or print. Our platform makes it easy to send your invitations
          directly to your guests' inboxes or share them on your social media accounts."
        />
        <FaqsBox
          heding="4. Can I preview my invitations before sending them out?"
          text="Yes, our invitation maker comes with a preview feature that allows you to see how your finished invitations will look. You
          can make any necessary changes before sending them out to ensure they are error-free and visually appealing."
        />
        <FaqsBox
          heding="5. Is the invitation maker free to use?"
          text="We offer both free and paid options for using our invitation maker. The free version allows you to access basic features
          and templates, while the paid version offers advanced customization options and premium templates."
        />
      </Box>
    </div>
  );
}
