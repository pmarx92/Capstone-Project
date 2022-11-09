import dbConnect from "../../../utils/dbConnect";
import Cards from "../../../models/Cards";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const formdata = await Cards.findById(id);

        if (!Cards) {
          res.status(400).json({ success: false });
        } else {
          res.status(200).json({ success: true, data: formdata });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    case "PUT":
      try {
        const formdata = await Cards.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!Cards) {
          res.status(400).json({ success: false });
        } else {
          res.status(200).json({ success: true, data: formdata });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    case "DELETE":
      try {
        const deleteData = await Cards.deleteOne({ _id: id });

        if (!deleteData) {
          res.status(400).json({ success: false });
        } else {
          res.status(200).json({ success: true, data: deleteData });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    default:
      res.status(400).json({ success: false });
  }
};
