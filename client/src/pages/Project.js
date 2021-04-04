import axios from "axios";
import react, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProjectThumb from "../components/projectThumb";
import "./project.css";

const Project = () => {
  const [myProjectList, setMyProjectList] = useState();
  const [gotList, setGotList] = useState(false);

  const getMyProject = () => {
    axios
      .get("http://localhost:5000/users/getMyProject", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((result) => {
        console.log("result : ", result);
        setMyProjectList(result.data.myTemplates.Templates);
        setGotList(true);
      })
      .catch((err) => {
        console.log("err : ", err);
        setGotList(false);
      });
  };

  useEffect(() => {
    getMyProject();
  }, [gotList]);

  // id,
  // thumbnailPicture,
  // title,
  // ratio,
  // time,
  // textLength,
  // pages,
  console.log("@@@myProjectList : ", myProjectList);

  return (
    <div className="projectContainer">
      <Header />
      <div className="projectContents">
        <h1>나의 프로젝트</h1>
        <div className="projectList">
          {/* <ProjectThumb
          id={myProjectList._id}
          thumbnailPicture={myProjectList.ThumbnailPicture}
          title={myProjectList.Title}
          ratio={myProjectList.Ratio}
          time={myProjectList.Time}
          textLength={myProjectList.TextLength}
          />
          <ProjectThumb />
          <ProjectThumb /> */}
          {myProjectList &&
            myProjectList.map((el, i) => (
              <ProjectThumb
                key={i}
                id={el._id}
                thumbnailPicture={el.ThumbnailPicture}
                title={el.Title}
                ratio={el.Ratio}
                time={el.Time}
                textLength={el.TextLength}
                pages={el.Pages}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
