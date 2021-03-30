import react from "react";
import { Link } from "react-router-dom";
import "./logo.css";

const BigLogo = () => {
  return (
    <Link to="/">
      <h1 className="bigLogo">JPLATE</h1>
    </Link>
  );
};

export default BigLogo;
