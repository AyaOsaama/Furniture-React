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
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation("about");

  return (
    <Layout>
      <Hero />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-8 px-2 justify-items-center">
        <div>
          <div className="flex items-center mb-2">
            <AccessTimeIcon />
            <p className="ml-2 font-bold text-[#353535]">{t("shopOnlineTitle")}</p>
          </div>
          <p className="text-[#ABABAB] max-w-[200px]">{t("shopOnlineDesc")}</p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <ShoppingBagOutlinedIcon />
            <p className="ml-2 font-bold text-[#353535]">{t("freeShippingTitle")}</p>
          </div>
          <p className="text-[#ABABAB] max-w-[200px]">{t("freeShippingDesc")}</p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <PaymentOutlinedIcon />
            <p className="ml-2 font-bold text-[#353535]">{t("returnPolicyTitle")}</p>
          </div>
          <p className="text-[#ABABAB] max-w-[200px]">{t("returnPolicyDesc")}</p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <MonetizationOnOutlinedIcon />
            <p className="ml-2 font-bold text-[#353535]">{t("paymentTitle")}</p>
          </div>
          <p className="text-[#ABABAB] max-w-[200px]">{t("paymentDesc")}</p>
        </div>
      </div>

      <img
        src={bannerAbout}
        alt={t("bannerAlt")}
        className="w-full h-[350px] object-cover my-8"
      />

      <div className="flex flex-col lg:flex-row justify-between gap-8 px-4">
        <Functionality />
        <ProgressBar />
      </div>

      <div className="mt-12">
        <p className="font-bold text-xl">{t("lastBlogPost")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4 mb-12">
        <Card
          imageCard={cardOne}
          titleCard={t("card1Title")}
          dateCard={t("card1Date")}
        />
        <Card
          imageCard={cardTwo}
          titleCard={t("card2Title")}
          dateCard={t("card2Date")}
        />
        <Card
          imageCard={cardThree}
          titleCard={t("card3Title")}
          dateCard={t("card3Date")}
        />
      </div>
    </Layout>
  );
}

export default About;
