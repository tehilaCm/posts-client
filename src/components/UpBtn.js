import React from "react";
import { CgArrowUpO } from "react-icons/cg";

const UpBtn = () => {
  let $ = require("jquery");
  window.addEventListener(
    "scroll",
    function () {
      if (window.pageYOffset > 600) {
        $(".scroll-up").show("slow");
      } else if (window.pageYOffset < 500) {
        $(".scroll-up").hide("slow");
      }
    },
    false
  );

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <CgArrowUpO className="scroll-up" onClick={scrollTop} />
    </>
  );
};

export default UpBtn;
