import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://game-reviews-8ld1.onrender.com/api",
});

export const getAllReviews = (category, sort_by, order) => {
  return baseApi
    .get("/reviews", {
      params: {
        category: category,
        sort_by: sort_by,
        order: order,
      },
    })
    .then((res) => {
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

export const getCategories = () => {
  return baseApi.get("/categories").then((res) => {
    return res.data;
  });
};

export const addComment = (review_id, review) => {
  return baseApi.post(`/reviews/${review_id}/comments`, review).then((res) => {
    return res.data;
  });
};

export const upvoteComment = (comment_id, update) => {
  return baseApi
    .patch(`/comments/${comment_id}`, { inc_votes: update })
    .then((res) => {
      return res.data;
    });
};

export const deleteComment = (comment_id) => {
  return baseApi.delete(`/comments/${comment_id}`).then((res) => {
    return res.data;
  });
};

export const getUser = (username) => {
  return baseApi.get(`/users/${username}`).then((res) => {
    return res.data;
  });
};

export const getAllUsers = () => {
  return baseApi.get(`/users`).then((res) => {
    return res.data;
  });
};

export const postReview = (review) => {
  return baseApi.post(`/reviews`, review).then((res) => {
    return res.data;
  });
};
