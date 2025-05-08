import coverAboutUs from "../../assets/images/banner-about-us-page.png";

function Hero() {
  return (
    <div
      className="w-full h-[300px] bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${coverAboutUs})` }}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">About us</h1>
    </div>
  );
}

export default Hero;
