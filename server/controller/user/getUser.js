import { parseToken } from "../../util/token/token";
import Users from "../../models/userModel";

export const getUser = {
  getUserInfo: async (req, res) => {
    let userToken = parseToken(req.headers.authorization);
    try {
      if (userToken) {
        const { _id } = userToken;
        let userInfoFromDB = await Users.findById(_id);
        const {
          Email,
          Name,
          Phone,
          Membership,
          Videos,
          Coupons,
          Receipt,
          Like,
        } = userInfoFromDB;

        const userInfo = {
          email: Email,
          name: Name,
          phone: Phone,
          membership: Membership,
          videos: Videos,
          coupons: Coupons,
          receipt: Receipt,
          like: Like,
        };
        res.send({ userInfo, message: "ok" });
      } else {
        res.status(403).send({ message: "Invalid User" });
      }
    } catch (err) {
      console.log("err : ", err);
      res.status(403).send({ message: "Invalid User" });
    }
  },
  logout: async (req, res) => {
    console.log("logout!");
    let userToken = parseToken(req.headers.authorization);
    if (userToken) {
      res.send({ message: "ok" });
    } else {
      res.status(403).send({ message: "Invalid User" });
    }
  },
  getMyProject: async (req, res) => {
    console.log("getMyProject");
    let userToken = parseToken(req.headers.authorization);
    if (userToken) {
      try {
        let myTemplates = await Users.findById(userToken._id, {
          _id: 1,
          Templates: 1,
        });
        console.log("myTemplates : ", myTemplates);
        res.send({ message: "ok", myTemplates });
      } catch (err) {
        res.status(500).send({ message: "Server Error" });
      }
    } else {
      res.status(403).send({ message: "Invalid User" });
    }
  },
};
