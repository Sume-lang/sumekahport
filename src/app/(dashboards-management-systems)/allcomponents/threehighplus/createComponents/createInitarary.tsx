"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiTrash2, FiEdit2, FiChevronDown } from "react-icons/fi";
import { ItineraryItems, Itinerary } from "@/type/threehighplus/itinerary";
import {
  createItinerary,
  updateItinerary,
  getAllItinerary,
  deleteItinerary,
} from "@/context/threehighplus/getItinarary";
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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Itinerary>({
    defaultValues: initialData || {
      title: "",
      desc: "",
      img: "",
      contentImage: "",
      price: 0,
      additionalnote: "",
      category: "adventure",
      itineraries: [],
    },
  });

  const [itineraries, setItineraries] = useState<ItineraryItems[]>(
    initialData?.itineraries || []
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
    const updated = itineraries.filter((_, i) => i !== index);
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
    setItineraries(itinerary.itineraries || []);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItinerary(id);
      await fetchItineraryData();
      if (currentItineraryId === id) resetForm();
    } catch (error) {
      console.error("Error deleting itinerary:", error);
    }
  };

  const resetForm = () => {
    reset();
    setItineraries([]);
    setIsEditing(false);
    setCurrentItineraryId(null);
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-200">
          {isEditing ? "Edit Itinerary" : "Create New Itinerary"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 border border-slate-600 rounded-md text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="itinerary-form"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save Itinerary"}
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form
        id="itinerary-form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-lg font-medium text-slate-300 mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <input
                  {...register("title", { required: "Title is required" })}
                  placeholder="Itinerary title"
                  className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  {...register("desc", { required: "Description is required" })}
                  placeholder="Brief description"
                  rows={4}
                  className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
                {errors.desc && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.desc.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("slug", { required: "Slug is required" })}
                    placeholder="URL slug"
                    className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.slug && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.slug.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    {...register("price", {
                      required: "Price is required",
                      min: 0,
                    })}
                    placeholder="Price"
                    className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary Days Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-slate-300">
                Itinerary Days
              </h2>
              <button
                type="button"
                onClick={addDay}
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                <FiPlus /> Add Day
              </button>
            </div>

            <div className="space-y-4">
              {itineraries.map((day, index) => (
                <div
                  key={index}
                  className="group relative bg-slate-750 border border-slate-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-slate-300">
                      Day {day.day}
                    </h3>
                    <button
                      type="button"
                      aria-label="Remove Day"
                      onClick={() => removeDay(index)}
                      className="text-slate-500 hover:text-red-500"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <input
                        value={day.title}
                        onChange={(e) =>
                          updateDay(index, "title", e.target.value)
                        }
                        placeholder="Day title"
                        className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <textarea
                        value={day.desc}
                        onChange={(e) =>
                          updateDay(index, "desc", e.target.value)
                        }
                        placeholder="Day description"
                        rows={4}
                        className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Media Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-lg font-medium text-slate-300 mb-4">Media</h2>
            <div className="space-y-4">
              <div>
                <input
                  {...register("img", { required: "Image is required" })}
                  placeholder="Cover image URL"
                  className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.img && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.img.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("contentImage", {
                    required: "Content image is required",
                  })}
                  placeholder="Content image URL"
                  className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.contentImage && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.contentImage.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Notes Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-lg font-medium text-slate-300 mb-4">
              Additional Notes
            </h2>
            <textarea
              {...register("additionalnote")}
              placeholder="Any special notes..."
              rows={6}
              className="w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Category Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-lg font-medium text-slate-300 mb-4">
              Category
            </h2>
            <div className="relative">
              <select
                {...register("category")}
                className="appearance-none w-full bg-slate-750 border border-slate-600 rounded-md py-2 px-3 text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="adventure" className="bg-slate-800">
                  Adventure
                </option>
                <option value="family" className="bg-slate-800">
                  Family
                </option>
                <option value="luxury" className="bg-slate-800">
                  Luxury
                </option>
              </select>
              <FiChevronDown className="absolute right-3 top-2.5 text-slate-400" />
            </div>
          </div>
        </div>
      </form>

      {/* Itineraries Table */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-slate-200 mb-4">
          Your Itineraries
        </h2>
        <div className="bg-slate-800 border border-slate-700 rounded-lg">
          <Table>
            <TableHeader className="bg-slate-750">
              <TableRow>
                <TableHead className="text-slate-300">ID</TableHead>
                <TableHead className="text-slate-300">Title</TableHead>
                <TableHead className="text-slate-300">Price</TableHead>
                <TableHead className="text-slate-300">Days</TableHead>
                <TableHead className="text-slate-300">Image Cover</TableHead>
                <TableHead className="text-slate-300">Content Image</TableHead>
                <TableHead className="text-slate-300">Description</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itineraryData.map((itinerary) => (
                <TableRow key={itinerary.id} className="hover:bg-slate-750">
                  <TableCell className="text-slate-300">
                    {itinerary.id}
                  </TableCell>
                  <TableCell className="font-medium text-slate-300">
                    <Link
                      href={`/threehighplus/detailitinararies/${itinerary.id}`}
                    >
                      {itinerary.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    ${itinerary.price}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {itinerary.day}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {itinerary.img}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {itinerary.contentImage}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {itinerary.desc.slice(0, 50)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(itinerary)}
                        aria-label="Edit"
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(itinerary.id!)}
                        aria-label="Delete"
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
