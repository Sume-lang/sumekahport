import Style from "../threehighplus/styles/threehigh.module.css";
import SliderInOut from "@/components/reusable/sliderinout";
export default function Aboutus() {
  return (
    <SliderInOut className="p-8 w-full flex lg:flex-row flex-col rounded-xl h-[50vh] lg:h-[60vh] gap-8">
      <section className="w-full p-5 lg:shadow-lg flex flex-col items-center justify-center lg:rounded-none rounded-t-md border-[1px] border-slate-50/20">
        <h1 className="text-4xl lg:text-6xl font-bold">
          Call Back <span className="text-slate-300">The Nature</span>
        </h1>
        <h1 className="text-2xl font-light">
          For Better Future and{" "}
          <span className="text-slate-300">For Our Next Generations</span>
        </h1>
      </section>
      <section className={`${Style.Containers} w-full h-full`}>
        <div className="bg-gradient-to-t from-[#030E36]/120 to-[#00163B]/5 w-full h-full p-10 flex flex-col items-center justify-center">
          <h1 className="font-ligh">Welcome to</h1>
          <h1 className="text-4xl lg:text-6xl font-bold">Three High Plus</h1>
          <p className="font-light lg:w-1/2 w-full text-center lg:text-md text-[15px]">
            Our company aims to protect the environment and maintain it with all
            our might, together with the local community. Not only do we aim to
            protect the environment and improve the welfare of local
            communities, but we also offer to share our knowledge with the
            global community. We strive to give a positive impact, both for our
            community and the world at large. We are not just selling tourism,
            but we invite the global community to collaborate with us in taking
            real action to protect the environment.
          </p>
        </div>
      </section>
    </SliderInOut>
  );
}
// style={{
//     backgroundImage: `url('/threehighplus/images/culture-5.jpg')`,
//     backgroundSize: "cover",
//     backgroundPosition: "top center",
//     backgroundRepeat: "no-repeat",
//   }}
