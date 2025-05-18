import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById, fetchAllPosts } from "../../../api";
import PostSidebar from "./components/PostSidebar";
import PostContent from "./components/PostContent";
import LoadingIndicator from "./components/LeadingIndicator";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all posts for sidebar and navigation
  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchAllPosts();
        setPosts(postsData.posts);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
      }
    };

    getPosts();
  }, []);

  // Fetch single post
  useEffect(() => {
    const getPost = async () => {
      try {
        const postData = await fetchPostById(id);
        setPost(postData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getPost();
  }, [id]);

  if (loading) return <LoadingIndicator />;
  if (error) return <div className="text-red-500 py-8">Error: {error}</div>;
  if (!post) return <div className="py-8">Post not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to={`/posts`}>
        <button className="flex items-center text-gray-600 hover:text-black mb-6 transition-all duration-300 group cursor-pointer">
          <FiArrowLeft className="mr-2 transition-all duration-300 group-hover:-translate-x-1" />
          <span>Back to Posts</span>
        </button>
      </Link>
      <div className="flex flex-col lg:flex-row gap-8 ">
        <PostSidebar
          posts={posts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <PostContent post={post} posts={posts} />
      </div>
    </div>
  );
};

export default PostDetails;
