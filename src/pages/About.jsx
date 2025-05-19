import Hero from "../components/hero/hero.jsx";
import Layout from "../components/layout/layout.jsx";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import bannerAbout from "../assets/images/Rectangle 48.png";
import Functionality from "../components/functionality/functionality.jsx";
import ProgressBar from "../components/progressbar/progressbar.jsx";
import Card from "../components/card/card.jsx";
import cardOne from "../assets/images/card-one.png";
import cardTwo from "../assets/images/card-two.png";
import cardThree from "../assets/images/card-three.png";
import { SearchContext } from "../searchContext/SearchContext.jsx";
import { useContext } from "react";

function About() {
  const { searchQuery } = useContext(SearchContext);

  // بيانات المميزات
  const features = [
    {
      icon: <AccessTimeIcon />,
      title: "Shop online",
      description:
        "Shop from the comfort of your home with a smooth, modern online experience.",
    },
    {
      icon: <ShoppingBagOutlinedIcon />,
      title: "Free shipping",
      description:
        "Enjoy fast and free delivery straight to your doorstep, hassle-free.",
    },
    {
      icon: <PaymentOutlinedIcon />,
      title: "Return policy",
      description:
        "Not satisfied? Our return process is easy and guaranteed to keep you happy.",
    },
    {
      icon: <MonetizationOnOutlinedIcon />,
      title: "PAYMENT",
      description:
        "Secure and flexible payment methods for a seamless checkout experience.",
    },
  ];

  // بيانات البوستات
  const blogPosts = [
    {
      image: cardOne,
      title: "Paint your office in natural colors only",
      date: "Sep 26, 2022",
    },
    {
      image: cardTwo,
      title: "Choose furniture with a modern twist",
      date: "Oct 10, 2022",
    },
    {
      image: cardThree,
      title: "Decorate your living room with soft touches",
      date: "Nov 15, 2022",
    },
  ];

  // فلترة حسب البحث
  const filteredFeatures = features.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Hero />

      {/* FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-8 px-2 justify-items-center">
        {filteredFeatures.length > 0 ? (
          filteredFeatures.map((item, index) => (
            <div key={index}>
              <div className="flex items-center mb-2">
                {item.icon}
                <p className="ml-2 font-bold text-[#353535]">{item.title}</p>
              </div>
              <p className="text-[#ABABAB] max-w-[200px]">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No features found.
          </p>
        )}
      </div>

      {/* BANNER */}
      <img
        src={bannerAbout}
        alt="Banner About"
        className="w-full h-[350px] object-cover my-8"
      />

      {/* FUNCTIONALITY + PROGRESS */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 px-4">
        <Functionality />
        <ProgressBar />
      </div>

      {/* BLOG POSTS */}
      <div className="mt-12 px-4">
        <p className="font-bold text-xl">Last Blog Post</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4 mb-12">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Card
              key={index}
              imageCard={post.image}
              titleCard={post.title}
              dateCard={post.date}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No blog posts found.
          </p>
        )}
      </div>
    </Layout>
  );
}

export default About;
