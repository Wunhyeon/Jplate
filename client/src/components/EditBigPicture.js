import react from "react";
import "./edit.css";

const EditBigPicture = ({ selectedPicture, templateOrder }) => {
  return (
    <div className="editBigPictureContainer">
      {templateOrder}
      <img src={selectedPicture} className="editBigPicture" />
    </div>
  );
};

export default EditBigPicture;
