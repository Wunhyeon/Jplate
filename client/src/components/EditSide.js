import react from "react";
import "./edit.css";

const EditSide = ({ editPicture, setSelectedPicture, setTemplateOrder }) => {
  return (
    <div className="editSideContainer">
      {editPicture.map((el, i) => (
        <div
          className="sampleEditPictureContainer"
          key={i}
          onClick={() => {
            setSelectedPicture(el);
            setTemplateOrder(i);
          }}
        >
          <img src={el} className="sampleEditPicture" />
        </div>
      ))}
    </div>
  );
};

export default EditSide;
