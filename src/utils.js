import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://game-reviews-8ld1.onrender.com/api",
});

export const getAllReviews = () => {
  return baseApi.get("/reviews").then((res) => {
    return res.data;
  });
};
