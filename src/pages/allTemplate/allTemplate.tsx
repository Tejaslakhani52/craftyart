import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Creation from "../../components/creationOffcanvas/Creation";
import CustomeSize from "../../components/footer/customeSize/CustomeSize";
import Profile from "../../components/profile/Profile";
import SmallScreen from "../../components/smallScreenBottom/SmallScreen";
import Templete from "./components/templeteSection/Template";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function AllTemplate() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  console.log("categoryId: ", categoryId);
  const [value, setValue] = useState<any>("");

  const handleSearch = () => {
    const modifiedValue = value.replace(/ /g, "-");
    if (value) {
      if (categoryId && categoryId !== "latest" && categoryId !== "trending") {
        navigate(`/templates/${categoryId}/${modifiedValue}`);
      } else {
        navigate(`/s/${modifiedValue}`);
      }
    }
  };

  return (
    <div>
      <div className="small_fixed_footer d-bock d-sm-none">
        <SmallScreen />
        <Profile />
        <Creation />
        <CustomeSize />
      </div>

      <section className="all_template">
        <div className="all_template_inner px-3">
          <div className="all_template_heading text-center d-flex justify-content-center align-items-center h-100 flex-column">
            <h1
              className="main_heading mb-3"
              style={{ textTransform: "capitalize" }}
            >
              {categoryId} Templates
            </h1>
            <p className="comman_para mb-0 w-75" style={{ color: "white" }}>
              Make your Templates attract even more with stunning images.
              Promote your brand and engage your followers with eye-catching
              templates. With pre-designed templates, you will all stay on the
              same page as you edit your visuals directly in Crafty Art.
            </p>
          </div>
        </div>
      </section>

      <section className="insta_post_template py-4">
        <div className="container-fluid">
          <div className="insta_tempalte">
            <div className="d-flex justify-content-between flex-wrap">
              <div
                className="insta_template_left template_left_width px-0 px-lg-2"
                style={{ border: "none", width: "100%" }}
              >
                <div className="d-none d-lg-block serachbar_position">
                  <div
                    className="search_input d-flex align-items-center"
                    onKeyPress={(e) => {
                      e.key === "Enter" && handleSearch();
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
                      onClick={handleSearch}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="d-none d-lg-block">
                  <nav
                    aria-label="breadcrumb"
                    className="pt-4 breadcrumb_nav pb-3"
                  >
                    <span className="navigate" onClick={() => navigate("/")}>
                      Home
                    </span>
                    <KeyboardArrowRightIcon sx={{ opacity: "0.5" }} />
                    <span>{categoryId}</span>
                  </nav>
                </div>
                <Templete />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
