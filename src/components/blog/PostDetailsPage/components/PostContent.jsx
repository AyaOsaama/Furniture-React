import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import MessageIcon from "../../../../assets/icons/message.svg";
import PostNavigation from "./PostNavigation";
import PostComments from "./PostComments";

const PostContent = ({ post, posts }) => {
  const [hoveredPostId, setHoveredPostId] = useState(null);

  return (
    <div className="lg:w-3/4 lg:order-1 order-2">
      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title?.en || post.title?.ar || "Post image"}
          className="w-full h-auto max-h-[500px] object-cover mb-6"
        />
      )}

      {/* Meta information */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-2">
        <span>
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span>|</span>
        <span>{post.tags?.join(", ") || "Newest, sofa and chair, wooden"}</span>
        <span>|</span>
        <span>By {post.author || "sorouah money"}</span>
        <span>|</span>
        <div
          className="relative flex items-center gap-1"
          onMouseEnter={() => setHoveredPostId(post._id)}
          onMouseLeave={() => setHoveredPostId(null)}
        >
          <CiHeart className="h-5 w-5" />
          <span>{post.likes?.length || 0}</span>
          {hoveredPostId === post._id && post.likes?.length > 0 && (
            <div className="absolute top-6 left-0 mb-2 p-2 bg-black/50 text-white text-sm shadow-lg z-10 min-w-[150px]">
              <h4 className="font-medium mb-1">Liked by:</h4>
              <ul className="space-y-1">
                {post.likes.map((like) => (
                  <li key={like._id}>{like.user || "Anonymous"}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <span>|</span>
        <span className="flex items-center gap-1">
          <img src={MessageIcon} alt="message" className="w-5 h-5" />
          {post.comments?.length || 0}
        </span>
      </div>

      {/* Post Content */}
      <div className="mb-8">
        <h1 className="text-3xl text-heading-blog font-bold mb-4">
          {post.title?.en || post.title?.ar || "Untitled Post"}
        </h1>

        {post.description && (
          <p className="text-sm text-gray-500 mb-6">
            {post.description.en || post.description.ar}
          </p>
        )}

        <div className="prose max-w-none">
          <p className="text-gray-800 font-medium whitespace-pre-line">
            {post.content?.en || post.content?.ar || "No content available."}
          </p>
        </div>

        <PostNavigation postId={post._id} posts={posts} />
        <PostComments post={post} />
      </div>
    </div>
  );
};

export default PostContent;