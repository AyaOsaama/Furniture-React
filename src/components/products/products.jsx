import CustomCard from "../custom_card/custom_card.jsx";
import cardProductOne from "../../assets/images/cp1.png";
import cardProductTwo from "../../assets/images/cp2.png";
import cardProductThree from "../../assets/images/cp3.png";
function Product() {
  return (
    <div className="px-4 sm:px-6 md:px-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#373737] text-center py-6 font-['PTSans']">
        Products of the week
      </h1>

      <p className="text-center text-[#8A8A8A] font-['PTSans'] text-base sm:text-lg max-w-md sm:max-w-xl mx-auto mb-8 px-2">
        Discover our handpicked selection of this week's favorite pieces — where
        modern elegance meets everyday comfort. Elevate your space with designs
        made to stand out.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 flex-wrap pb-12">
        <CustomCard
          imageCard={cardProductOne}
          titleCard="Pot"
          price="$ 223,00"
        />
        <CustomCard
          imageCard={cardProductTwo}
          titleCard="Lamp"
          price="$ 223,00"
        />
        <CustomCard
          imageCard={cardProductThree}
          titleCard="Chair"
          price="$ 223,00"
        />
      </div>
    </div>
  );
}

export default Product;
