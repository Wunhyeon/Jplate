import axios from "axios";
import React, { useEffect, useState } from "react";
import EditBigPicture from "../components/EditBigPicture";
import EditMusic from "../components/EditMusic";
import EditSide from "../components/EditSide";
import "./edit.css";

const Edit = () => {
  const [templateInfo, setTemplateInfo] = useState();
  const [gotTemplateInfo, setGotTemplateInfo] = useState(false);

  const [musicList, setMusicList] = useState();
  const [gotMusicList, setGotMusicList] = useState(false);

  const [showMusicListModal, setShowMusicListModal] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState();

  const [selectedPicture, setSelectedPicture] = useState();
  const [templateOrder, setTemplateOrder] = useState(0);

  const [videoList, setVideoList] = useState();
  const [gotVideoList, setGotVideoList] = useState(false);

  let templateInfoVal;

  const [editForm, setEditForm] = useState({
    selectedVideo: [],
    selectedText: [],
    templateId: "",
  });

  const getTemplateInfo = async () => {
    console.log("%%%getTemplateInfo");
    const url = new URL(window.location.href);
    console.log("url.search : ", url.search);
    let templateId = url.search.split("=")[1];
    axios
      .get(
        `http://localhost:5000/templates/getOneTemplate?templateId=${templateId}`
      )
      .then(async (result) => {
        console.log("$$$ : ", result);
        setTemplateInfo(result.data.oneTemplate);
        templateInfoVal = { ...result.data.oneTemplate };
        setSelectedPicture(result.data.oneTemplate.EditData.EditPicture[0]);
        setGotTemplateInfo(true);
        let temp = { ...editForm };
        temp.templateId = result.data.oneTemplate._id;
        console.log("temp : ", { ...temp });
        setEditForm({ ...temp });
        getVideoList();
      })
      .catch((err) => {
        console.log("err : ", err);
        setGotTemplateInfo(false);
      });
  };

  const getMusicList = () => {
    axios
      .get("http://localhost:5000/edits/getMusicList")
      .then((result) => {
        setMusicList(result.data.musicList);
        setGotMusicList(true);
        setSelectedMusic(result.data.musicList[0].URL);
      })
      .catch((err) => {
        console.log("Error on get Music List : ", err);
        setGotMusicList(false);
      });
  };

  const getVideoList = () => {
    console.log("###getVideoList");
    axios
      .get("http://localhost:5000/edits/getVideoList")
      .then((result) => {
        setVideoList(result.data.videoList);
        setGotVideoList(true);
        // templateInfo.Pages.forEach();
        // console.log({ ...editForm });
        let temp = { ...editForm };
        console.log("&&&templateInfoVal : ", templateInfoVal);
        templateInfoVal.EditData.EditPicture.forEach((el) => {
          // setEditForm({
          //   ...editForm.selectedVideo.push[result.data.videoList[0].URL],
          // });
          temp.selectedVideo.push(result.data.videoList[0].URL);
          temp.selectedText.push("");
        });
        temp.templateId = templateInfoVal._id;
        // console.log(temp);
        setEditForm({ ...temp });
      })
      .catch((err) => {
        console.log("Error on get Video List : ", err);
        setGotVideoList(false);
      });
  };

  const handleShowMusicListModal = (e) => {
    setShowMusicListModal(!showMusicListModal);
  };

  const selectMusic = (e) => {
    console.log("select Music : ", e);
    setSelectedMusic(e);
    setShowMusicListModal(false);
  };

  useEffect(async () => {
    if (!templateInfo) {
      await getTemplateInfo();
      // if (!videoList) {
      //   await getVideoList();
      // }
    }
    if (!musicList) {
      getMusicList();
    }
  }, [templateInfo, musicList, videoList]);

  return (
    <div className="editContainer">
      {templateInfo && gotTemplateInfo && (
        <div className="editContents">
          <div className="descriptionArea">
            <div className="concreteArea">
              ❐ {templateInfo.Ratio} ⏱ {templateInfo.Time} 𝐓{" "}
              {templateInfo.TextLength} 📄 {templateInfo.Pages}
              <br />
              ❗️주의 : 새로고침시 선택하신 비디오와 문구가 초기화됩니다.
            </div>
            <div className="titleArea">{templateInfo.Title}</div>
          </div>
          <hr />
          <div className="editArea">
            <div className="optionArea">
              <button
                className="musicButton"
                onClick={handleShowMusicListModal}
              >
                🎶 배경음
              </button>
              {showMusicListModal && (
                <EditMusic
                  handleShowMusicListModal={handleShowMusicListModal}
                  musicList={musicList}
                  selectMusic={selectMusic}
                  selectedMusic={selectedMusic}
                />
              )}
            </div>
            <div className="pictureEditArea">
              <EditSide
                editPicture={templateInfo.EditData.EditPicture}
                setSelectedPicture={setSelectedPicture}
                setTemplateOrder={setTemplateOrder}
              />
              <EditBigPicture
                selectedPicture={selectedPicture}
                templateOrder={templateOrder}
                videoList={videoList}
                editForm={editForm}
                setEditForm={setEditForm}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
