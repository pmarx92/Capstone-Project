import dbConnect from "../../../utils/dbConnect";
import Cards from "../../../models/Cards";

export default async (req, res) => {
  dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const formData = await Cards.find({});

        res.status(200).json({ success: true, data: formData });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
      }
      break;
    case "POST":
      try {
        const data = await Cards.create(req.body);

        res.status(201).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
