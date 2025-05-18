import React from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

const PostSidebar = ({ posts }) => {
  // Get 3 most recent posts
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="lg:w-1/4 lg:order-2 order-1">
      <div className="lg:sticky lg:top-8 space-y-6">
        <div className="md:block hidden">
          {/* Popular Posts */}
          <div className="">
            <h3 className="text-sm text-gray-500 mb-1">Popular Posts</h3>
            <div className="space-y-4">
              {posts
                .filter((post) => post.likes?.length > 0)
                .sort((a, b) => b.likes?.length - a.likes?.length)
                .slice(0, 3)
                .map((post) => (
                  <div
                    key={`popular-${post._id}`}
                    className="flex flex-col gap-3"
                  >
                    <Link to={`/posts/${post._id}`}>
                      <h4 className="font-medium text-lg line-clamp-2">
                        {post.title?.en || post.title?.ar || "Untitled"}
                      </h4>
                    </Link>

                    {post.image && (
                      <Link to={`/posts/${post._id}`}>
                        <img
                          src={post.image}
                          alt={post.title?.en || post.title?.ar || "Post image"}
                          className="w-full h-40 object-cover"
                        />
                      </Link>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="text-gray-500 text-sm">
                        {post.description?.en}...
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <CiHeart className="h-5 w-5" />
                        {post.likes?.length || 0}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {recentPosts.map((post) => {
                const postTitle =
                  post.title?.en || post.title?.ar || "Untitled Post";
                return (
                  <div
                    key={`recent-${post._id}`}
                    className="flex items-center justify-between"
                  >
                    <Link to={`/posts/${post._id}`}>
                      <h4 className="text-base text-heading-blog hover:underline">
                        {postTitle}
                      </h4>
                    </Link>
                    <div className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSidebar;
