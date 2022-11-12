import { search } from "../../components/lib/cloudinary";

export default async function handler(req, res) {
  const results = await search();
  res.status(200).json({
    ...results,
  });
}
