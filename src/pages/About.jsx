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

function About() {
  return (
    <Layout>
      <Hero />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-8 px-2 justify-items-center">
        <div>
          <div className="flex items-center mb-2">
            <AccessTimeIcon />
            <p className="ml-2 font-bold text-[#353535]">Shop online</p>
          </div>
          <p className="text-[#ABABAB] max-w-[200px]">
            Shop from the comfort of your home with a smooth, modern online
            experience.
          </p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <ShoppingBagOutlinedIcon />
            <p className="ml-2 font-bold text-[#353535]">Free shipping</p>
          </div>
          <p className="text-[#ABABAB] max-w-[200px]">
            Enjoy fast and free delivery straight to your doorstep, hassle-free.
          </p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <PaymentOutlinedIcon />
            <p className="ml-2 font-bold text-[#353535]">Return policy</p>
          </div>
          <p className="text-[#ABABAB] max-w-[200px]">
            Not satisfied? Our return process is easy and guaranteed to keep you
            happy.
          </p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <MonetizationOnOutlinedIcon />
            <p className="ml-2 font-bold text-[#353535]">PAYMENT</p>
          </div>
          <p className="text-[#ABABAB] max-w-[200px]">
            Secure and flexible payment methods for a seamless checkout
            experience.
          </p>
        </div>
      </div>

      <img
        src={bannerAbout}
        alt="Banner About"
        className="w-full h-[350px] object-cover my-8"
      />

      <div className="flex flex-col lg:flex-row justify-between gap-8 px-4">
        <Functionality />
        <ProgressBar />
      </div>

      <div className=" mt-12">
        <p className="font-bold text-xl">Last Blog Post</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4 mb-12">
        <Card
          imageCard={cardOne}
          titleCard="Paint your office in natural colors only"
          dateCard="Sep 26, 2022"
        />
        <Card
          imageCard={cardTwo}
          titleCard="Choose furniture with a modern twist"
          dateCard="Oct 10, 2022"
        />
        <Card
          imageCard={cardThree}
          titleCard="Decorate your living room with soft touches"
          dateCard="Nov 15, 2022"
        />
      </div>
    </Layout>
  );
}

export default About;
