import Templates from "../../models/templateModel";
import Users from "../../models/userModel";
import { parseToken } from "../../util/token/token";

export const postTemplate = {
  purchaseTemplate: async (req, res) => {
    console.log("purchaseTemplate");

    let template = req.body.template;
    let userInfoFromToken = parseToken(req.headers.authorization);
    if (userInfoFromToken) {
      try {
        let userInfoFromDB = await Users.findById(userInfoFromToken._id);

        userInfoFromDB.Templates.push(template);
        await userInfoFromDB.save();
        res.send({ message: "ok" });
      } catch (err) {
        res.status(500).send({ message: "Server Error" });
      }
    } else {
      res.status(403).send({ message: "Invalid User" });
    }
  },
};
