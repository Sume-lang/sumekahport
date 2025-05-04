import { UserX } from "lucide-react";

export default function Specialits() {
  return (
    <main className="flex flex-col gap-1 w-full h-auto">
      <section className="flex flex-col w-1/2 ">
        <h2 className="font-light text-xl">Give the Services</h2>
        <h1 className="text-2xl font-bold border-l-[10px] border-[#faad86]/30 pl-2">
          My Specialities
        </h1>
      </section>
      <section className="mt-10 flex flex-col gap-2">
        <div className="p-2 flex flex-col border-[1px] border-[#faad86]/30 w-1/4 gap-2">
          <span className="rounded-full bg-[#faad86]/10 p-2 w-10 h-10">
            <UserX className="h-10 w-10" />
          </span>
          <h1>UX/UI Design</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi eius
            fugit eaque exercitationem rerum numquam voluptatem a voluptate
            reprehenderit perferendis unde cupiditate, iusto inventore placeat
            tenetur eum ducimus quasi deserunt.
          </p>
        </div>
      </section>
    </main>
  );
}

// import { Database } from "lucide-react";
// import React from "react";
// import { FaNode, FaReact } from "react-icons/fa";
// import { SiJavascript } from "react-icons/si";
// const dataWhatIdo = [
//   {
//     title: "I Do Programing",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor enim explicabo omnis cupiditate eligendi hic temporibus veritatis expeditarerum dignissimos ab id repellat in, maxime corrupti quiaexercitationem voluptates ipsa?",
//     child: [
//       { id: 1, title: "ReactJs", icon: <FaReact size={30} /> },
//       { id: 2, title: "NodeJs", icon: <FaNode size={30} /> },
//       { id: 3, title: "JavaScript", icon: <SiJavascript size={30} /> },
//       { id: 4, title: "Firebase", icon: <Database size={30} /> },
//       { id: 5, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 6, title: "NodeJs", icon: <FaNode size={30} /> },
//       { id: 7, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 8, title: "NodeJs", icon: <FaNode size={30} /> },
//       { id: 9, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 10, title: "NodeJs", icon: <FaNode size={30} /> },
//     ],
//   },
//   {
//     title: "I Do Organization Planning Project",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor enim explicabo omnis cupiditate eligendi hic temporibus veritatis expeditarerum dignissimos ab id repellat in, maxime corrupti quiaexercitationem voluptates ipsa?",
//     child: [
//       { id: 11, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 12, title: "NodeJs", icon: <FaNode size={30} /> },
//       { id: 13, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 14, title: "NodeJs", icon: <FaNode size={30} /> },
//       { id: 15, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 16, title: "NodeJs", icon: <FaNode size={30} /> },
//       { id: 17, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 18, title: "NodeJs", icon: <FaNode size={30} /> },
//       { id: 19, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 20, title: "NodeJs", icon: <FaNode size={30} /> },
//     ],
//   },
//   {
//     title: "I Do Data Analysis",
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor enim explicabo omnis cupiditate eligendi hic temporibus veritatis expeditarerum dignissimos ab id repellat in, maxime corrupti quiaexercitationem voluptates ipsa?",
//     child: [
//       { id: 21, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 22, title: "NodeJs", icon: <FaNode size={30} /> },
//       { id: 23, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 24, title: "NodeJs", icon: <FaNode size={30} /> },
//       { id: 25, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 26, title: "NodeJs", icon: <FaNode size={30} /> },
//       { id: 27, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 28, title: "NodeJs", icon: <FaNode size={30} /> },
//       { id: 29, title: "ReactJS", icon: <FaReact size={30} /> },
//       { id: 30, title: "NodeJs", icon: <FaNode size={30} /> },
//     ],
//   },
// ];

// export default function WhatIdo() {
//   return (
//     <main className="flex lg:flex-row flex-col w-full h-auto gap-2">
//       <section className="lg:w-1/2 w-full p-2 bg-[#faad86]/30 shadow-lg">
//         <h1 className="text-2xl font-bold">What I Do</h1>
//         <p className="font-light">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor enim
//           explicabo omnis cupiditate eligendi hic temporibus veritatis expedita
//           rerum dignissimos ab id repellat in, maxime corrupti quia
//           exercitationem voluptates ipsa?
//         </p>
//       </section>
//       {dataWhatIdo.map((item) => (
//         <section
//           key={item.title}
//           className="lg:w-1/2 w-full h-full p-2 flex flex-col items-start justify-start border-[1px] border-[#faad86]/20 rounded-md"
//         >
//           <h1 className="text-2xl font-bold">{item.title}</h1>
//           <p className="font-light">{item.desc}</p>
//           <div className="grid lg:grid-cols-5 grid-cols-4 gap-2 mt-2 w-full border-[1px] border-[#faad86]/20 p-2 rounded-md bg-[#faad86]/10 shadow-lg">
//             {item.child.map((item) => (
//               <div key={item.id} className="flex flex-col gap-1">
//                 <span>{item.icon}</span>
//                 <h1>{item.title}</h1>
//               </div>
//             ))}
//           </div>
//         </section>
//       ))}
//     </main>
//   );
// }
