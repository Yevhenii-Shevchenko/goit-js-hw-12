import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "54321560-f6f3fd1bbb688b32de8acdaed";

// export async function  getImageByQuery(query) {
//   const params = {
//     key: API_KEY,
//     q: query,
//     image_type: "photo",
//     orientation: "horizontal",
//     safesearch: true,
//   };

//   try {
//     const response = await axios.get(BASE_URL, { params });
//     return response.data;
//   }
//   catch (error) {
//     throw new Error(`Failed to fetch images: ${error.message}`);
//   }
// };

export async function getImageByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }
}