"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ItineraryItems, Itinerary } from "@/type/threehighplus/itinerary";
import {
  createItinerary,
  updateItinerary,
  getAllItinerary,
  deleteItinerary,
} from "@/context/threehighplus/getItinarary";
export { Textarea } from "@/components/ui/textarea";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface TourPackageFormProps {
  initialData?: Itinerary;
  onSuccess?: () => void;
}

export default function TourItineraryForm({
  initialData,
  onSuccess,
}: TourPackageFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Itinerary>({
    defaultValues: initialData || {
      category: "adventure",
      itineraries: [],
    },
  });

  const [itineraries, setItineraries] = useState<ItineraryItems[]>(
    initialData?.itineraries || [{ day: 1, title: "", desc: "" }]
  );
  const [itineraryData, setItineraryData] = useState<Itinerary[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItineraryId, setCurrentItineraryId] = useState<string | null>(
    null
  );

  const fetchItineraryData = async () => {
    try {
      const data = await getAllItinerary();
      setItineraryData(data);
    } catch (error) {
      console.error("Error fetching itinerary data:", error);
    }
  };

  useEffect(() => {
    fetchItineraryData();
  }, []);
  const addDay = () => {
    const newDay: ItineraryItems = {
      day: itineraries.length + 1,
      title: "",
      desc: "",
    };
    setItineraries([...itineraries, newDay]);
  };

  const removeDay = (index: number) => {
    const updated = [...itineraries];
    updated.splice(index, 1);
    setItineraries(updated.map((day, idx) => ({ ...day, day: idx + 1 })));
  };

  const updateDay = (
    index: number,
    field: keyof ItineraryItems,
    value: string
  ) => {
    const updated = [...itineraries];
    updated[index] = { ...updated[index], [field]: value };
    setItineraries(updated);
  };

  const handleEdit = (itinerary: Itinerary) => {
    setIsEditing(true);
    setCurrentItineraryId(itinerary.id || null);
    reset(itinerary);
    setItineraries(itinerary.itineraries || [{ day: 1, title: "", desc: "" }]);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItinerary(id);
      await fetchItineraryData();
      if (currentItineraryId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  const resetForm = () => {
    reset();
    setItineraries([{ day: 1, title: "", desc: "" }]);
    setIsEditing(false);
    setCurrentItineraryId(null);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const onSubmit = async (data: Itinerary) => {
    try {
      const packageData = {
        ...data,
        itineraries,
        day: itineraries.length,
        night: Math.max(1, itineraries.length - 1),
      };

      if (isEditing && currentItineraryId) {
        await updateItinerary(currentItineraryId, packageData);
      } else {
        await createItinerary(packageData);
      }

      resetForm();
      await fetchItineraryData();
      onSuccess?.();
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2 lg:min-h-scren"
    >
      <section className="p-1">
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit" : "Create"} Your{" "}
          <span className="text-slate-300">Itinerary</span>
        </h1>
      </section>
      <section className="p-1 lg:h-[55vh] h-auto rounded-md w-full flex lg:flex-row flex-col gap-2">
        {/* Create Your Informations Base */}
        <div className="bg-slate-800 lg:p-8 p-4 lg:w-1/3 h-auto w-full rounded-md flex flex-col">
          <div className="border-b-[1px] border-slate-50/10">
            <h1>Create Your Informations Base</h1>
          </div>
          <div className="mt-5">
            <input
              placeholder="Insert Title"
              {...register("title", { required: "Title is required" })}
              className="w-full h-12 p-2 rounded-md border-[1px] border-slate-50/10 font-light"
            />
            {errors.title && (
              <p className="text-red-500 font-light text-[12px]">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <textarea
              placeholder="Insert Description"
              {...register("desc", { required: "Description is required" })}
              rows={9}
              className="w-full p-2 rounded-md border-[1px] border-slate-50/10 font-light"
            />
            {errors.desc && (
              <p className="text-red-500 font-light text-[12px]">
                {errors.desc.message}
              </p>
            )}
          </div>
          <div className="mt-1">
            <input
              {...register("slug", { required: "Slug is required" })}
              placeholder="Insert Slug"
              className="w-full h-12 p-2 rounded-md border-[1px] border-slate-50/10 font-light"
            />
            {errors.slug && (
              <p className="text-red-500 font-light text-[12px]">
                {errors.slug.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <input
              {...register("img", { required: "Image URL is required" })}
              placeholder="Insert Image Name"
              className="w-full h-12 p-2 rounded-md border-[1px] border-slate-50/10 font-light"
            />
            {errors.img && (
              <p className="text-red-500 font-light text-[12px]">
                {errors.img.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <input
              {...register("contentImage", {
                required: "Image URL is required",
              })}
              placeholder="Insert Content Image Name"
              className="w-full h-12 p-2 rounded-md border-[1px] border-slate-50/10 font-light"
            />
            {errors.contentImage && (
              <p className="text-red-500 font-light text-[12px]">
                {errors.contentImage.message}
              </p>
            )}
          </div>
          <div className="border-b-[1px] border-slate-50/10 mt-5">
            <h1>Create Price Expenses</h1>
          </div>
          <div className="mt-2">
            <input
              type="number"
              {...register("price", { required: "Price is required", min: 0 })}
              placeholder="Insert Price"
              className="w-full h-12 p-2 rounded-md border-[1px] border-slate-50/10 font-light"
            />
            {errors.price && (
              <p className="text-red-500 font-light text-[12px]">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>
        <div className="bg-slate-800 lg:p-8 p-4 h-full lg:w-1/2 w-full rounded-md flex flex-col">
          <div className="border-b-[1px] border-slate-50/10">
            <h1>Create Itinerary Details</h1>
          </div>
          <div className="mt-5 flex flex-col h-[650px]">
            {" "}
            {/* Fixed height container */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Itinerary Days</h3>
              <button
                type="button"
                onClick={addDay}
                className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors duration-300 ease-linear border-slate-50/10 border-[1px]"
              >
                + Add Day
              </button>
            </div>
            <div className="overflow-y-auto flex-grow max-h-[600px]">
              {" "}
              {/* Scrollable area */}
              <div className="space-y-4 lg:pr-2">
                {itineraries.map((day, index) => (
                  <div key={index} className="rounded-md bg-slate-700 p-3">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold">Day {day.day}</h4>
                      <button
                        type="button"
                        onClick={() => removeDay(index)}
                        className="px-3 py-1 bg-slate-600 text-white rounded-md hover:bg-slate-800 transition-colors duration-300 ease-linear border-slate-50/10 border-[1px]"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <input
                          value={day.title}
                          placeholder="Title"
                          onChange={(e) =>
                            updateDay(index, "title", e.target.value)
                          }
                          className="w-full h-10 p-2 rounded-md border-[1px] border-slate-50/10 bg-slate-800 font-light"
                          required
                        />
                      </div>
                      <div>
                        <textarea
                          value={day.desc}
                          placeholder="Description"
                          onChange={(e) =>
                            updateDay(index, "desc", e.target.value)
                          }
                          rows={4}
                          className="w-full p-2 rounded-md border-[1px] border-slate-50/10 bg-slate-800 font-light"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Create Additional Notes */}
        <div className="bg-slate-800 lg:p-8 p-4 h-full lg:w-1/4 w-full rounded-md flex flex-col">
          <div className="">
            <div className="border-b-[1px] border-slate-50/10">
              <h1>Create Additional Notes</h1>
            </div>
            <div className="mt-2">
              <textarea
                placeholder="Insert additional note"
                {...register("additionalnote", {
                  required: "additionalnote is required",
                })}
                rows={15}
                className="w-full p-2 rounded-md border-[1px] border-slate-50/10 font-light"
              />
              {errors.additionalnote && (
                <p className="text-red-500 font-light text-[12px]">
                  {errors.additionalnote.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-2 flex justify-end bg-slate-800 rounded-md gap-2">
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 ease-linear border-slate-50/10 border-[1px]"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors duration-300 ease-linear border-slate-50/10 border-[1px]"
            >
              {isEditing ? "Update Itinerary" : "Create Itinerary"}
            </button>
          </div>
        </div>
      </section>
      <section className="w-full p-1">
        <Table className="boder-[1px] border-slate-50/10 bg-slate-800 rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Image Content</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="p-10">
            {itineraryData.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell>
                  <Link href={`/threehighplus/detailitinararies/${pkg.id}`}>
                    {pkg.id}
                  </Link>
                </TableCell>
                <TableCell>{pkg.title}</TableCell>
                <TableCell>USD {pkg.price}</TableCell>
                <TableCell>{pkg.img}</TableCell>
                <TableCell>{pkg.contentImage}</TableCell>
                <TableCell>{pkg.day}</TableCell>
                <TableCell>{pkg.desc.slice(0, 150)}...</TableCell>
                <TableCell className="flex gap-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id!)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </form>
  );
}
