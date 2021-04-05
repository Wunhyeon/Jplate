import axios from "axios";
import react, { useState } from "react";
import "./edit.css";
import EditVideo from "./EditVideo";

const EditBigPicture = ({
  selectedPicture,
  templateOrder,
  videoList,
  editForm,
  setEditForm,
}) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleShowVideoModal = () => {
    setShowVideoModal(!showVideoModal);
  };
  // console.log("@@@editForm : ", editForm);
  const handleSubmitEditForm = () => {
    console.log("editForm : ", editForm);
    axios.post("http://localhost:5000/edits/makeVideo", {
      editForm,
    });
  };
  return (
    <div className="editBigPictureContainer">
      {templateOrder}
      <img src={selectedPicture} className="editBigPicture" />
      <button onClick={handleShowVideoModal} className="showVideoModalButton">
        비디오 선택
      </button>
      {showVideoModal && (
        <EditVideo
          handleShowVideoModal={handleShowVideoModal}
          videoList={videoList}
          templateOrder={templateOrder}
          editForm={editForm}
          setEditForm={setEditForm}
        />
      )}
      <button onClick={handleSubmitEditForm} className="submitEditButton">
        비디오 만들기
      </button>
    </div>
  );
};

export default EditBigPicture;
