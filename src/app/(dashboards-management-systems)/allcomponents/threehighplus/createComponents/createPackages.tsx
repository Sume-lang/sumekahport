"use client";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { addTourpackages } from "@/context/threehighplus/tourpackages";
import { Rinjani } from "@/type/threehighplus/tourpackages";
import { Textarea } from "@/components/ui/textarea";
// import Scroll from "@/components/reusable/sliderinout";

export default function CreatePackages() {
  const [pack, setPack] = useState<Rinjani>({
    title: "",
    slug: [],
    price: 0,
    day: 0,
    night: 0,
    img: "",
    catagory: [],
    desc: [],
    date: new Date(),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addTourpackages(pack);
      alert("Package created successfully!");
      setPack({
        title: "",
        slug: [],
        price: 0,
        day: 0,
        night: 0,
        img: "",
        catagory: [],
        desc: [],
      });
    } catch (error) {
      console.error("Error creating package:", error);
      alert("Failed to create package. Please try again later.");
    }
  };

  const handleChange =
    (field: keyof Rinjani) => (value: string | number | string[]) => {
      setPack((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleAddMoreContent = () => {
    setPack((prev) => ({
      ...prev,
      desc: [...(prev.desc ?? []), ""],
    }));
  };

  const handleDeleteContent = (index: number) => {
    setPack((prev) => ({
      ...prev,
      desc: prev.desc?.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-col w-full h-screen p-8 gap-4 overflow-hidden text-slate-100">
      <h1 className="text-3xl font-bold">
        Create Your <span className="text-slate-50">Package</span> Here!!
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={pack.title}
            placeholder="Title"
            onChange={(e) => handleChange("title")(e.target.value)}
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
          <input
            type="text"
            value={pack.slug?.join(", ")}
            placeholder="Slug"
            onChange={(e) => handleChange("slug")(e.target.value.split(", "))}
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="number"
            value={pack.price}
            placeholder="Price"
            onChange={(e) => handleChange("price")(Number(e.target.value))}
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
          <input
            type="number"
            value={pack.day}
            placeholder="Day"
            onChange={(e) => handleChange("day")(Number(e.target.value))}
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
          <input
            type="number"
            value={pack.night}
            placeholder="Night"
            onChange={(e) => handleChange("night")(Number(e.target.value))}
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value={pack.img}
            placeholder="Image"
            onChange={(e) => handleChange("img")(e.target.value)}
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
          <input
            type="text"
            value={pack.catagory?.join(", ")}
            placeholder="Category"
            onChange={(e) =>
              handleChange("catagory")(e.target.value.split(", "))
            }
            className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Textarea
              rows={10}
              cols={30}
              placeholder="Description"
              value={pack.desc?.join(", ")}
              onChange={(e) => handleChange("desc")(e.target.value.split(", "))}
              className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
            />
            {pack.desc?.map((content, index) => (
              <div key={index} className="flex items-center gap-2">
                <Textarea
                  rows={10}
                  cols={30}
                  placeholder={`Description ${index + 1}`}
                  value={content}
                  onChange={(e) =>
                    handleChange("desc")(e.target.value.split(", "))
                  }
                  className="block w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteContent(index)}
                  className="text-red-500"
                >
                  &#x2715;
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddMoreContent}
            className="flex items-center gap-2 text-blue-500"
          >
            <FaPlusCircle />
            Add Description
          </button>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full p-2 bg-[#faad86]/10 border-[1px] border-[#faad86]/5 rounded-md"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
