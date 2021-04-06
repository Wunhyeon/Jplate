import axios from "axios";
import react, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";
import "./purchase.css";

const Purchase = (props) => {
  const [gotTemplate, setGotTemplate] = useState(false);
  const [templateInfo, setTemplateInfo] = useState();

  const getTemplateOne = () => {
    const url = new URL(window.location.href);
    const templateId = url.search.split("=")[1];
    console.log("templateId : ", templateId);
    axios
      .get(
        `https://jplate-server.ga/templates/getOneTemplate?templateId=${templateId}`
      )
      .then((result) => {
        console.log("result : ", result);
        setTemplateInfo(result.data.oneTemplate);
        setGotTemplate(true);
      })
      .catch((err) => {
        console.log("err : ", err.response);
        setGotTemplate(false);
      });
  };

  const purchaseTemplate = () => {
    axios
      .post(
        "https://jplate-server.ga/templates/purchaseTemplate",
        {
          template: templateInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((result) => {
        alert("구매가 완료되었습니다.");
        props.history.push("/project");
      })
      .catch((err) => {
        console.log("err in purchase template: ", err);
      });
  };

  useEffect(() => {
    getTemplateOne();
  }, [gotTemplate]);

  return (
    <div className="purchaseContainer">
      <Header />
      <div className="purchaseContents">
        <h1>결제하기</h1>
        <div className="purchaseConcrete">
          {gotTemplate && (
            <div className="purchaseTemplateInfo">
              <h2>상세정보</h2>
              <div className="templatePictureContiner">
                <img
                  src={templateInfo.ThumbnailPicture}
                  className="templatePicture"
                />
              </div>
              <div className="templateTitle">{templateInfo.Title}</div>
              <div className="templatePrice">{templateInfo.Price}원</div>
              <div className="templateConcreteSetting">
                ❐ {templateInfo.Ratio} ⏱ {templateInfo.Time} 𝐓{" "}
                {templateInfo.TextLength} ✏ {templateInfo.Pages}
              </div>
              <div className="templateTag">{templateInfo.Tag}</div>
              <button
                className="templatePurchaseButton"
                onClick={purchaseTemplate}
              >
                구매하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Purchase);
