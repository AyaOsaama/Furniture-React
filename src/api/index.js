import axios from "axios";
export const API_BASE_URL = "http://localhost:3000";

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data; // Returns single product
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};


export const fetchAllCategories = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/categories`);
    return(res.data)
  } catch (error) {
    console.error("Error fetching Categories:", error);
    throw error;
  }
};

// Return All Posts
export const fetchAllPosts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/posts`);
    return(res.data)
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
    console.log(response)
    return response.data; 

  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

