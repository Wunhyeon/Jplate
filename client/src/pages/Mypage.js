import axios from "axios";
import react, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./myPage.css";
import { Switch, Route, withRouter } from "react-router-dom";
import MyPageSidebar from "../components/myPageSidebar";
import MyPageEditUserInfo from "../components/myPageEditUserInfo";
import MyPageEditPassword from "../components/myPageEditPassword";
import MyPageCoupon from "../components/myPageCoupon";
import MyPageLike from "../components/myPageLike";
import MyPageReceipt from "../components/myPageReceipt";

const MyPage = (props) => {
  const [userInfo, setUserInfo] = useState("");
  const [flag, setFlag] = useState(false);
  const [content, setContent] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!userInfo) {
      getUserInfo();
    }
    console.log("content : ", content);
  }, [flag, content]);

  const getUserInfo = () => {
    console.log("getUserInfo");
    axios
      .get("https://laggard-server.ga/users/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((result) => {
        console.log("mypage - result : ", result);
        setFlag(true);
        setUserInfo(result.data.userInfo);
        setName(result.data.userInfo.name);
      })
      .catch((err) => {
        console.log("mypage - err : ", err);
        props.history.push("/auth/signin");
      });
  };

  return (
    <div className="myPageContainer">
      <Header />
      <div className="myPageContents">
        <MyPageSidebar name={userInfo.name} setContent={setContent} />
        {(() => {
          switch (content) {
            case 1:
              return (
                <MyPageEditUserInfo
                  email={userInfo.email}
                  phone={userInfo.phone}
                  name={name}
                  setName={setName}
                  setContent={setContent}
                />
              );
            case 2:
              return <MyPageEditPassword email={userInfo.email} />;
            case 3:
              return <MyPageCoupon />;
            case 4:
              return <MyPageLike />;
            case 5:
              return <MyPageReceipt />;

            default:
              break;
          }
          // if (content === 1) {
          //   return <MyPageEditUserInfo />;
          // }
        })()}
      </div>
    </div>
  );
};

export default withRouter(MyPage);
