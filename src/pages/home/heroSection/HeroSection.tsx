  import React, { useState } from "react";
import MainSerchbar from "../../../components/commonComponents/MainSerchbar";

export default function HeroSection() {
  const [value, setValue] = useState<any>("");
  // console.log("value: ", value);
  return (
    <section className="hero d-none d-sm-block">
      <div className="hero_inner">
        <div className="hero_heading text-center d-flex justify-content-center align-items-center h-100 flex-column">
          <h1 className="main_heading mb-0" style={{ color: "#ffff" }}>
            Graphic Design Tool | Crafty Art
          </h1>
          <p className="comman_para my-2 py-2" style={{ color: "white" }}>
            Create eye-catching visual content for social media in minutes -
            it’s easy, fast, and free! Pick a template, customize it, and post.
          </p>
        </div>
        <MainSerchbar value={value} setValue={setValue} />
      </div>
      <div
        className="d_block_mobile header_search_box d-none "
        style={{ position: "fixed", top: "34px", zIndex: "5000" }}
      >
        <MainSerchbar value={value} setValue={setValue} />
      </div>
    </section>
  );
}
  