import axios from 'axios';

export default async (req, res) => {
  try {
    //const axiosRes = await axios.get("https://fgjhfjhgfjhgfjhgfjhgfjhf")
    const axiosRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${req.query.id}`)
    const post = axiosRes.data
    return res.status(200).json(post);
  } catch(e) {
    console.error(e);
    return res.status(e.status || 400).json({message: 'Api error!'});
  }
}
