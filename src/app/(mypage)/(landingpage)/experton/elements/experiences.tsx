import Img from "next/image";
export default function Experiences() {
  const Experiences = [
    {
      name: "Pasir Putih",
      position: "Data Master",
      date: "2025 - Present",
      img: "/logopl2/Pasirputih.png",
    },
    {
      name: "AMAN",
      position: "Branch Office: General Scretary",
      date: "2021 - 2024",
      img: "/logopl2/AMAN.png",
    },
    {
      name: "IFRC",
      position: "Information Management",
      date: "2019 - 2021",
      img: "/logopl2/IFRC.png",
    },
    {
      name: "Plan",
      position: "Logistic: Volunteering",
      date: "2018 - 2019",
      img: "/logopl2/Plan.png",
    },
    {
      name: "Inovasi",
      position: "Communication Facilitator",
      date: "2017 - 2018",
      img: "/logopl2/Inovasi.png",
    },
  ];
  return (
    <main className="flex lg:flex-row flex-col h-full bg-gradient-to-br from-transparent/5 to-slate-800/50 text-white border-slate-50/10 border-[1px] rounded-md shadow-lg">
      <section className="flex lg:w-1/2 w-full p-5 border-r-[1px] border-slate-50/10 items-center justify-center lg:bg-slate-600/20">
        <div>
          <h1 className="lg:text-4xl text-2xl font-bold">
            Experiencing <span>With</span>
            <br /> Offer 8 Years in <span>Proffessional Environments</span>
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex rerum
            fuga soluta temporibus, exercitationem nisi excepturi totam,
            blanditiis atque consequatur ab. Nam eum numquam recusandae iure
            fuga a esse quaerat.
          </p>
        </div>
      </section>
      <section className="flex w-full h-full p-5">
        <div className="lg:grid lg:grid-cols-3 flex flex-col items-start justify-start w-full h-full">
          {Experiences.map((item, index) => (
            <div
              className="flex flex-col items-start justify-start gap-2 p-2 w-full"
              key={index}
            >
              <Img
                src={item.img}
                alt={item.name}
                width={250}
                height={250}
                className="rounded-md w-full border-slate-50/10 border-[1px] shadow-lg grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              />
              <div className="flex flex-col items-start justify-start w-full">
                <h1 className="uppercase font-bold">{item.name}</h1>
                <h2 className="font-ligh text-md">{item.position}</h2>
                <h1 className="text-lg">{item.date}</h1>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
