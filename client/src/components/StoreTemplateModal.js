import react from "react";
import ReactDOM from "react-dom";
import { withRouter, useHistory } from "react-router-dom";

const StoreTemplateModal = ({
  handleModalOn,
  id,
  thumbnailPicture,
  sampleVideo,
  time,
  textLength,
  category,
  tag,
  pages,
  price,
  title,
  ratio,
  description,
}) => {
  const history = useHistory();

  const handlePurchase = () => {
    if (localStorage.getItem("accessToken")) {
      history.push(`purchase?templateId=${id}`);
    } else {
      alert("로그인 해주세요");
      history.push("auth/signin");
    }
  };

  return ReactDOM.createPortal(
    <div
      className="StoreTemplateModal"
      onClick={() => {
        handleModalOn();
      }}
    >
      <div
        className="StoreTemplateModalContents"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modalVideoArea">
          <video
            src={sampleVideo}
            controls
            autoPlay
            className="modalSampleVideo"
          />
        </div>
        <div className="modalDescriptionArea">
          <div className="modalDescription_title">
            <h2>{title}</h2>
          </div>
          <div className="modalDescription_title_concreteSetting">
            ❐ {ratio} ⏱ {time} 𝐓 {textLength} ✏ {pages}
          </div>
          <div className="modalDescription_description">
            <div className="modal_category modalConcrete">
              <span>카테고리</span>
              <span>{category}</span>
            </div>
            <div className="modal_tag modalConcrete">
              <span>스타일</span>
              <span>{tag}</span>
            </div>
            <div className="modal_description modalConcrete">
              <span>설명</span>
              <span>{description}</span>
            </div>
            <div className="modal_price modalConcrete">
              <span>금액</span>
              <span>{price}</span>
            </div>
          </div>
          <div className="modalButtonArea">
            <button className="buyDesignButton" onClick={handlePurchase}>
              디자인 구매
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#root")
  );
};

export default withRouter(StoreTemplateModal);
