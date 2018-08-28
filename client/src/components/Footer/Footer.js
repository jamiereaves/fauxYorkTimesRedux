import React from "react";
import "./Footer.css";

const Footer = props => 
<footer className="footer fixed-bottom text-center mt-2 pt-2">
  <h6 className="text-dark"><span>
      <h6 className="mb-0 pb-0 footerText">built with<a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">{props.children}</a> || 
      <a className="footerText rightSide" href= "https://github.com/jamiereaves/reactGameHW" target="_blank" rel="noopener noreferrer">  github repository</a> ||
      hosted on <a className="font-weight-bold text-dark" href="http://www.heroku.com">Heroku</a></h6>
  </span></h6>
</footer>
export default Footer;