"use client";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { addTourpackages } from "@/context/threehighplus/tourpackages";
import { Rinjani } from "@/type/threehighplus/tourpackages";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, MoonIcon, Sun } from "lucide-react";

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

  const [error, setError] = useState<{ [key in keyof Rinjani]: string }>({
    title: "",
    slug: "",
    price: "",
    day: "",
    night: "",
    img: "",
    catagory: "",
    desc: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!pack.title) {
        setError((prev) => ({ ...prev, title: "Title is required" }));
        return;
      }
      if (pack.slug?.length === 0) {
        setError((prev) => ({ ...prev, slug: "Slug is required" }));
        return;
      }
      if (pack.price === 0) {
        setError((prev) => ({ ...prev, price: "Price is required" }));
        return;
      }
      if (pack.day === 0) {
        setError((prev) => ({ ...prev, day: "Day is required" }));
        return;
      }
      if (pack.night === 0) {
        setError((prev) => ({ ...prev, night: "Night is required" }));
        return;
      }
      if (!pack.img) {
        setError((prev) => ({ ...prev, img: "Image is required" }));
        return;
      }
      if (pack.catagory?.length === 0) {
        setError((prev) => ({ ...prev, catagory: "Category is required" }));
        return;
      }
      if (pack.desc?.length === 0) {
        setError((prev) => ({ ...prev, desc: "Description is required" }));
        return;
      }
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
        date: new Date(),
      });
      setError({
        title: "",
        slug: "",
        price: "",
        day: "",
        night: "",
        img: "",
        catagory: "",
        desc: "",
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
      setError((prev) => ({ ...prev, [field]: "" }));
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
    <div className="flex flex-col w-full h-auto gap-4 overflow-hidden text-slate-100">
      <h1 className="text-3xl font-bold">
        Create Your <span className="text-slate-50">Package</span> Here!!
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <input
            type="text"
            value={pack.title}
            placeholder="Title"
            onChange={(e) => handleChange("title")(e.target.value)}
            className="block w-full p-3 bg-slate-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#faad86]"
          />
          {error.title && <p className="text-red-500 text-sm">{error.title}</p>}
          <input
            type="text"
            value={pack.slug?.join(", ")}
            placeholder="Slug"
            onChange={(e) => handleChange("slug")(e.target.value.split(", "))}
            className="block w-full p-3 bg-slate-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#faad86]"
          />
          {error.slug && <p className="text-red-500 text-sm">{error.slug}</p>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-1/2">
          <div className="flex flex-row gap-1 items-center">
            <DollarSign />
            <input
              type="number"
              value={pack.price}
              placeholder="Price"
              onChange={(e) => handleChange("price")(Number(e.target.value))}
              className="block w-1/2 p-3 bg-slate-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#faad86]"
            />
            {error.price && (
              <p className="text-red-500 text-sm">{error.price}</p>
            )}
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Sun />
            <input
              type="number"
              value={pack.day}
              placeholder="Day"
              onChange={(e) => handleChange("day")(Number(e.target.value))}
              className="block w-1/2 p-3 bg-slate-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#faad86]"
            />
            {error.day && <p className="text-red-500 text-sm">{error.day}</p>}
          </div>
          <div className="flex flex-row gap-1 items-center">
            <MoonIcon />
            <input
              type="number"
              value={pack.night}
              placeholder="Night"
              onChange={(e) => handleChange("night")(Number(e.target.value))}
              className="block w-1/2 p-3 bg-slate-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#faad86]"
            />
            {error.night && (
              <p className="text-red-500 text-sm">{error.night}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={pack.img}
            placeholder="Image"
            onChange={(e) => handleChange("img")(e.target.value)}
            className="block w-full p-3 bg-slate-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#faad86]"
          />
          {error.img && <p className="text-red-500 text-sm">{error.img}</p>}
          <input
            type="text"
            value={pack.catagory?.join(", ")}
            placeholder="Category"
            onChange={(e) =>
              handleChange("catagory")(e.target.value.split(", "))
            }
            className="block w-full p-3 bg-slate-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#faad86]"
          />
          {error.catagory && (
            <p className="text-red-500 text-sm">{error.catagory}</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {pack.desc?.map((content, index) => (
            <div key={index} className="flex items-center gap-2">
              <Textarea
                rows={5}
                placeholder={`Description ${index + 1}`}
                value={content}
                onChange={(e) =>
                  handleChange("desc")(e.target.value.split("\n"))
                }
                className="block w-full p-3 bg-slate-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#faad86]"
                style={{ resize: "none" }}
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
          {error.desc && <p className="text-red-500 text-sm">{error.desc}</p>}
          <button
            type="button"
            onClick={handleAddMoreContent}
            className=" w-[250px] p-2 rounded-md border-[1px] border-slate-50/20 flex items-center gap-2 text-slate-500 mt-2"
          >
            <FaPlusCircle />
            Add Description
          </button>
        </div>
        <button
          type="submit"
          className="w-[150px] p-3 bg-slate-800 text-white rounded-md mt-4 hover:bg-slate-700 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
}

