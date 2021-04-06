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
  const [showLoadng, setShowLoading] = useState(false);

  const handleShowVideoModal = () => {
    setShowVideoModal(!showVideoModal);
  };
  // console.log("@@@editForm : ", editForm);
  const handleSubmitEditForm = () => {
    console.log("editForm : ", editForm);
    setShowLoading(true);
    axios
      .post(
        "http://localhost:5000/edits/makeVideo",
        {
          editForm,
        },
        {
          responseType: "arraybuffer",
        }
      )
      .then((result) => {
        setShowLoading(false);
        console.log("@@@result : ", result);
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement("a");
        const contentDisposition = result.headers["content-disposition"]; // 파일 이름
        let fileName = "JPLATE_Video.mp4";
        if (contentDisposition) {
          const [fileNameMatch] = contentDisposition
            .split(";")
            .filter((str) => str.includes("filename"));
          if (fileNameMatch) [, fileName] = fileNameMatch.split("=");
        }
        link.href = url;
        link.setAttribute("download", `${fileName}`);
        link.style.cssText = "display:none";
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => {
        setShowLoading(false);
        alert("에러가 발생하였습니다.");
      });
  };
  return (
    <div className="editBigPictureContainer">
      {templateOrder + 1}
      {showLoadng && (
        <div className="loadingGifContainer">
          <img src="./loading.gif" className="loadingGif" />
          <br />
          잠시만 기다려주세요... 5분정도 소요됩니다.
        </div>
      )}

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
