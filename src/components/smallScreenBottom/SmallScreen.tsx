import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SmallScreen() {
  const [active, setactive] = useState<any>("Home");
  const location = useLocation();
  return (
    <div className="small_screen_footer_link position-relative">
      <div className="d-flex justify-content-between">
        <div className="bottom_footer_link">
          <Link
            to="/"
            className={`d-flex flex-column align-items-center text-decoration-none ${
              location.pathname == "/" && "active"
            }`}
          >
            <i className="fa-sharp fa-solid fa-house fs-5" />
            <span>Home</span>
          </Link>
        </div>

        <div className="bottom_footer_link">
          <Link
            to="/pricePlans"
            className={`d-flex flex-column align-items-center text-decoration-none ${
              location.pathname == "/pricePlans" && "active"
            }`}
          >
            <i className="fa-sharp fa-solid fa-crown fs-5" />
            <span>Premium</span>
          </Link>
        </div>

        <div className="bottom_footer_link">
          <Link
            to="/subscriptions"
            className={`d-flex flex-column align-items-center text-decoration-none ${
              location.pathname == "/subscriptions" && "active"
            }`}
          >
            <i className="fa-sharp fa-solid fa-circle-user fs-5" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
