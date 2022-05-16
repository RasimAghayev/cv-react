import React from "react";
import {BsLinkedin} from "react-icons/bs";
import {FaGithub} from "react-icons/fa";
import {FiDribbble} from "react-icons/fi";

const HeaderSocials = () => {
  return(
      <div className="header__socials">
          <a href="https://www.linkedin.com/in/rasimaghayev/" target="blank"><BsLinkedin/></a>
          <a href="https://github.com/RasimAghayev" target="blank"><FaGithub/></a>
          <a href="https://dribbble.com/RasimAghayev" target="blank"><FiDribbble/></a>
      </div>
  )
}
export default HeaderSocials