import axios from "axios";
import react, { useEffect, useState } from "react";
import Header from "../components/Header";
import StroeCategory from "../components/StoreCategory";
import StoreTemplateThumb from "../components/StoreTemplateThumb";
import "./store.css";

const Store = () => {
  const [gotList, setGotList] = useState(false);
  const [templateList, setTemplateList] = useState();

  const getAllTemplate = () => {
    axios
      .get("https://jplate-server.ga/templates/getAllTemplate")
      .then((result) => {
        console.log("result : ", result);
        setTemplateList(result.data.templateList);
        setGotList(true);
        console.log("@@@ : ", templateList);
      })
      .catch((err) => {
        console.log("err in get TemplateList");
        setGotList(false);
      });
  };

  useEffect(() => {
    getAllTemplate();
  }, [gotList]);

  return (
    <div className="storeContainer">
      <Header />
      <div className="storeContents">
        <StroeCategory />
        <div className="templatesContainer">
          {templateList
            ? templateList.map((el, i) => (
                <StoreTemplateThumb
                  key={i}
                  id={el._id}
                  thumbnailPicture={el.ThumbnailPicture}
                  sampleVideo={el.SampleVideo}
                  time={el.Time}
                  textLength={el.TextLength}
                  category={el.Category}
                  tag={el.Tag}
                  pages={el.Pages}
                  price={el.Price}
                  title={el.Title}
                  ratio={el.Ratio}
                  description={el.Description}
                />
              ))
            : "잠시만 기다려주세요"}
        </div>
      </div>
    </div>
  );
};

export default Store;
