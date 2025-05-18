import React, { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import MessageIcon from "../../../../assets/icons/message.svg";
import { api } from "../../../../axios/axios";

const PostComments = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentData, setCommentData] = useState({
    comment: "",
    name: "",
    email: "",
    saveInfo: false,
  });
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    const savedInfo = localStorage.getItem("commentUserInfo");
    if (savedInfo) {
      setCommentData((prev) => ({
        ...prev,
        ...JSON.parse(savedInfo),
        name: "",
        email: "",
        saveInfo: false,
      }));
    }
  }, []);

  useEffect(() => {
    if (commentData.saveInfo) {
      localStorage.setItem(
        "commentUserInfo",
        JSON.stringify({
          name: commentData.name,
          email: commentData.email,
        })
      );
    }
  }, [commentData.saveInfo, commentData.name, commentData.email]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCommentData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      await api.post(`/posts/comment/${post._id}`, {
        username: commentData.name,
        email: commentData.email,
        comment: commentData.comment,
      });

      setSubmitStatus({ loading: false, success: true, error: null });
      setCommentData((prev) => ({
        ...prev,
        comment: "",
        ...(!prev.saveInfo && { name: "", email: "" }),
      }));

      setTimeout(() => {
        setSubmitStatus((prev) => ({ ...prev, success: false }));
        window.location.reload();
      }, 3000);
    } catch (err) {
      setSubmitStatus({
        loading: false,
        success: false,
        error:
          err.response?.data?.message || err.message || "Failed to submit comment",
      });
    }
  };

  // ... باقي الكود الخاص بالـ JSX (زي ما هو)
};

export default PostComments;