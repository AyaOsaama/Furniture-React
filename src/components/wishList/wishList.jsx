import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setWishlist } from "../../redux/wishList";
import CustomCard from "../card/customeCard";

function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistIds = useSelector((state) => state.wishlist.items);
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("/wishlist", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const productList = res.data.wishlist;
        const productIds = productList.map((item) => item._id);

        dispatch(setWishlist(productIds));
        setProducts(productList);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-6 md:px-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#373737] text-center py-6 font-['PTSans']">
        Saved
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-[#8A8A8A] font-['PTSans'] text-base sm:text-lg max-w-md sm:max-w-xl mx-auto mb-8 px-2">
          Your List Is Empty
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 flex-wrap pb-12">
          {products.map((product) => (
            <CustomCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
