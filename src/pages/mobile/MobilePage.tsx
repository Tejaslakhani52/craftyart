import React from "react";
import mobile from "../../assets/images/mobileBackground.png";
import mobileLogo from "../../assets/images/mobileLogo.png";
import PlayStore from "../../assets/images/playstoreButton.png";
import HandMobileImage from "../../assets/images/HandMobileImage.png";

export default function MobilePage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${mobile})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div style={{ padding: "30px 0" }}>
        <img src={mobileLogo} alt="" style={{ width: "180px" }} />
      </div>

      <div style={{ padding: "" }}>
        <h1
          style={{ fontWeight: "bold", fontSize: "30px", textAlign: "center" }}
        >
          Mobile Experience <br /> Coming Soon...
        </h1>

        <p
          style={{ textAlign: "center", fontWeight: "500", paddingTop: "10px" }}
        >
          Please Download Our App To Create <br /> Your Invitation, Banner,
          Logo, Etc.
        </p>
      </div>

      <h1
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        Download App Now
      </h1>

      <div className="py-3">
        <a
          href="https://play.google.com/store/apps/details?id=com.crafty.art"
          className="text-decoration-none footer_items get_app"
        >
          <img src={PlayStore} alt="playstore" style={{ width: "200px" }} />
        </a>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "70%",
            position: "unset",
            bottom: "0",
            right: "-20px",
          }}
        >
          <img src={HandMobileImage} alt="" style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
}
