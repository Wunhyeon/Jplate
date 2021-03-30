import react from "react";
import { Link } from "react-router-dom";
import "./logo.css";

const SmallLogo = () => {
  return (
    <Link to="/">
      <h1 className="smallLogo">JPLATE</h1>
    </Link>
  );
};

export default SmallLogo;
