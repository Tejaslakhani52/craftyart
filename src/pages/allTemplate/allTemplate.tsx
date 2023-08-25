import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Creation from "../../components/creationOffcanvas/Creation";
import CustomeSize from "../../components/footer/customeSize/CustomeSize";
import Profile from "../../components/profile/Profile";
import SmallScreen from "../../components/smallScreenBottom/SmallScreen";
import Templete from "./components/templeteSection/Template";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { consoleShow } from "../../commonFunction/console";
import { Helmet } from "react-helmet";

export default function AllTemplate() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  consoleShow("categoryId: ", categoryId);
  const [value, setValue] = useState<any>("");

  const [templatesData, setTemplatesData] = useState<any>(null);
  const [description, setDescription] = useState<string>("");

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

  const [more, setMore] = useState<boolean>(false);

  useEffect(() => {
    const formattedText = templatesData?.long_desc
      ?.replace(/\r\n\r\n/g, "\n\n")
      ?.replace(/\r\n/g, "\n");
    const description = formattedText || "";
    const words = description.split(" ");
    const truncatedDescription = words.slice(0, 40).join(" ");
    if (more) {
      setDescription(formattedText);
    } else setDescription(truncatedDescription);
  }, [templatesData, more]);

  return (
    <div>
      <Helmet>
        <title>{templatesData?.meta_title}</title>
        <meta name="description" content={templatesData?.meta_desc} />
      </Helmet>
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
              {templatesData?.h1_tag}
            </h1>
            <div
              style={{
                maxHeight: "200px",
                overflow: "auto",
              }}
              className="scroll_custome"
            >
              <p
                className=" "
                style={{
                  color: "white",
                  whiteSpace: "pre-line",
                  textAlign: "center",
                }}
              >
                {templatesData?.short_desc}
              </p>
              <div
                style={{
                  display: more ? "flex" : "none",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2
                  className="main_heading  "
                  style={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    fontSize: "20px",
                    lineHeight: "auto",
                  }}
                >
                  {templatesData?.h2_tag}
                </h2>
                <p
                  className="comman_para mb-0 w-75"
                  style={{
                    color: "white",
                    whiteSpace: "pre-line",
                    textAlign: "justify",
                  }}
                >
                  {description}
                </p>
              </div>
              <span
                style={{
                  color: "blue",
                  borderBottom: "1px solid blue",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
                onClick={() => setMore(!more)}
              >
                {more ? "Short" : "... More"}
              </span>
            </div>
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
                <Templete setTemplatesData={setTemplatesData} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
