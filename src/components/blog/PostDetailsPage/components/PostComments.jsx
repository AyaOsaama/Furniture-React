import React, { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import MessageIcon from "../../../../assets/icons/message.svg";
import { API_BASE_URL } from "../../../../api";

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

  // Load saved user info from localStorage
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

  // Save user info when checkbox is checked
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
      const response = await fetch(`${API_BASE_URL}/posts/comment/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: commentData.name,
          email: commentData.email,
          comment: commentData.comment,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit comment");

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
        error: err.message || "Failed to submit comment",
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setShowComments(!showComments)}
        className="mt-8 flex items-center gap-2 text-gray-700 hover:text-gray-500 transition-colors"
      >
        <img src={MessageIcon} alt="message" className="w-5 h-5" />
        <span className="font-medium">
          {showComments
            ? "Hide Comments"
            : `Show Comments (${post.comments?.length || 0})`}
        </span>
      </button>

      {showComments && (
        <div className="mt-6">
          <h3 className="text-base font-bold text-gray-600 mb-6 pb-2 border-b border-gray-200">
            Comments ({post.comments?.length || 0})
          </h3>

          {post.comments?.length > 0 ? (
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-white shadow-md p-4 transition-shadow duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <FaRegUser className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">
                          {comment.username || "Anonymous"}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700 leading-relaxed">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 rounded-lg">
              <p className="mt-3 text-gray-500 font-medium">No comments yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Be the first to share your thoughts
              </p>
            </div>
          )}
        </div>
      )}

      {/* Comment Form */}
      <div className="border-t border-gray-300 pt-6 mt-8">
        <h3 className="text-xl font-semibold mb-6">Post a comment</h3>

        {submitStatus.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Comment submitted successfully!
          </div>
        )}
        {submitStatus.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {submitStatus.error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <textarea
              name="comment"
              value={commentData.comment}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 placeholder:font-medium"
              placeholder="Your Comment"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="name"
              value={commentData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 placeholder:font-medium"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={commentData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 placeholder:font-medium"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="saveInfo"
              checked={commentData.saveInfo}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Save my name, email, and website in this browser for the next
              time I comment.
            </label>
          </div>

          <button
            type="submit"
            className="px-8 py-3 bg-heading-blog text-white font-medium hover:bg-gray-700 disabled:opacity-50"
            disabled={submitStatus.loading}
          >
            {submitStatus.loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default PostComments;