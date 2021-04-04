import Templates from "../../models/templateModel";

export const getTemplate = {
  getAllTemplate: async (req, res) => {
    console.log("get All Template!");
    try {
      let templateList = await Templates.find();
      res.send({ message: "ok", templateList });
    } catch (e) {
      res.status(500).send({ message: "Server error" });
    }
  },
  getOneTemplate: async (req, res) => {
    console.log("get One Template!");
    console.log(req.query);
    try {
      let oneTemplate = await Templates.findById(req.query.templateId);
      res.send({ message: "ok", oneTemplate });
    } catch (err) {
      console.log("err on get one Template : ", err);
      res.status(500).send({ message: "server Error" });
    }
  },
};
