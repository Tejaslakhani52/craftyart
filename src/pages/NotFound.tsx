import React, { useEffect } from "react";
import BigLogo from "../assets/images/Icons/craftyart_main_logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { headerShowing } from "../redux/reducer/dataReducer";

export default function NotFound() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(headerShowing(false));
  }, []);

  return (
    <div className="not_found_page">
      <div className="inner_not_found">
        <div className="back_box">
          <img
            src={BigLogo}
            alt="logo"
            className="img-fluid"
            style={{ width: "150px" }}
          />

          <h2 style={{ fontWeight: "600", marginTop: "30px" }}>
            Not found (404)
          </h2>

          <p style={{ marginTop: "10px" }}>
            Sorry, the page you are looking for does not exist.
          </p>

          <p
            style={{
              textDecoration: "underline",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Go back to the Craftyart homepage
          </p>
        </div>
      </div>
    </div>
  );
}
