import axios from 'axios';

export default async (req, res) => {
  let posts = []
  try {
    //const axiosRes = await axios.get("https://fgjhfjhgfjhgfjhgfjhgfjhf")
    const axiosRes = await axios.get("https://jsonplaceholder.typicode.com/posts")
    const posts = axiosRes.data.slice(0, 10)
    return res.status(200).json(posts);
  } catch(e) {
    console.error(e);
    return res.status(e.status || 400).json({message: 'Api error!'});
  }
}