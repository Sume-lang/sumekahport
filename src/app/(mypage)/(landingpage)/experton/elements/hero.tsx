import Img from "next/image";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaMailBulk,
} from "react-icons/fa";
export default function Hero() {
  const Socialmedia = [
    {
      name: "Github",
      icon: <FaGithub size={30} />,
      link: "https://github.com/ahmadgusti",
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={30} />,
      link: "https://www.facebook.com/ahmad.gustiawan.9/",
    },
    {
      name: "Email",
      icon: <FaMailBulk size={30} />,
      link: "https://twitter.com/ahmadgusti",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={30} />,
      link: "https://www.linkedin.com/in/ahmad-gustiawan-anton-sumekah-7b0a821b1/",
    },
  ];
  return (
    <main className="p-4 flex lg:flex-row flex-col items-center justify-center gap-2">
      <section className="lg:w-1/2 w-full h-full flex items-center justify-end">
        <Img
          src="/assets/1.png"
          alt="hero"
          width={600}
          height={600}
          className="rounded-full shadow-lg bg-gradient-to-br hover:from-[#cb8e72] hover:to-transparent hover:shadow-2xl hover:shadow-[#faad86]/10 transition duration-500 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ maxWidth: "100%", height: "auto" }}
          loading="lazy"
          placeholder="blur"
          blurDataURL="/assets/myprofiles.png"
          quality={100}
        />
      </section>
      <section className="lg:w-1/2 w-full h-full flex flex-col items-start justify-center">
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            Hy, I Am{" "}
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            <span className="font-light">
              Ahmad Gustiawan <br />
              Anton Sumekah
            </span>
          </h2>
          <p className="w-full text-sm md:text-base lg:text-lg font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            repellat eveniet, deserunt amet doloremque cupiditate ipsam id aut
            ullam reiciendis ratione, quam tempora laudantium ab sequi? Fugiat
            similique atque possimus.
          </p>
        </div>
        <div className="flex flex-row gap-4 mt-5">
          {Socialmedia.map((media, index) => (
            <a
              key={index}
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#faad86] hover:text-white transition duration-150 ease-in-out"
            >
              {media.icon}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
