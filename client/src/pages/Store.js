import axios from "axios";
import react, { useEffect } from "react";
import Header from "../components/Header";
import StroeCategory from "../components/StoreCategory";
import StoreTemplateThumb from "../components/StoreTemplateThumb";
import "./store.css";

const Store = () => {
  const getAllTemplate = () => {
    axios.get("http://localhost:5000/templates/getAllTemplate");
  };

  useEffect(() => {
    getAllTemplate();
  }, []);

  return (
    <div className="storeContainer">
      <Header />
      <div className="storeContents">
        <StroeCategory />
        <StoreTemplateThumb />
      </div>
    </div>
  );
};

export default Store;
