import dbConnect from "../../utils/dbConnect";
import Cards from "../../models/Cards";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
        try {
            
        }
  }
};
