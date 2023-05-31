import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://game-reviews-8ld1.onrender.com/api",
});

export const getAllReviews = () => {
  return baseApi.get("/reviews").then((res) => {
    return res.data;
  });
};

export const getReviewById = (review_id) => {
  return baseApi.get(`/reviews/${review_id}`).then((res) => {
    return res.data;
  });
};

export const getCommentByReviewId = (review_id) => {
  return baseApi.get(`/reviews/${review_id}/comments`).then((res) => {
    return res.data;
  });
};

export const upvoteReview = (review_id, update) => {
  return baseApi
    .patch(`/reviews/${review_id}`, { inc_votes: update })
    .then((res) => {
      return res.data;
    });
};

export const addComment = (review_id, review) => {
  return baseApi.post(`/reviews/${review_id}/comments`, review).then((res) => {
    return res.data;
  });
};
