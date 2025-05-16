"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiTrash2, FiEdit2, FiUpload } from "react-icons/fi";
import {
  createEmployeeTour,
  updateEmployeeTour,
  deleteEmployeeTour,
  getAllEmplyeeTour,
} from "@/context/threehighplus/getEmploymentmanagements";
import {
  EmployeeTour,
  EmployementStatus,
  Position,
  GuideType,
  Status,
} from "@/type/threehighplus/hrandusers";
import Img from "next/image";
import { Select, SelectItem } from "@heroui/select";

interface EmployeeFormProps {
  initialData?: EmployeeTour;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const employmentStatusOptions: EmployementStatus[] = [
  "parttime",
  "contract",
  "permanent",
];
const positionOptions: Position[] = ["Guide", "Driver", "Porter"];
const guideTypeOptions: GuideType[] = [
  "Trekking",
  "Panorama",
  "Camping",
  "Diving",
  "Snorkling",
  "Walking Area",
];
const statusOptions: Status[] = ["active", "inactive"];

export default function EmployeeForm({
  initialData,
  onCancel,
  onSuccess,
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<EmployeeTour>({
    defaultValues: initialData || {
      id: "",
      firstname: "",
      lastname: "",
      status: "active",
      employementstatus: ["parttime"], // Changed to an array with a single value
      employemnetposition: [], // Fixed typo in property name (should be employmentposition)
      address: "",
      phone: "",
      experience: "",
      guidetype: [],
      profilepic: "",
      bio: "",
    },
  });
  const [employees, setEmployees] = useState<EmployeeTour[]>([]);
  const [isEditing, setIsEditing] = useState(!!initialData);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(
    initialData?.profilepic || ""
  );
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmplyeeTour();
        if (data) setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);
  const uploadImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/profiles", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload image. Please try again.");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      if (!file.type.match(/image\/(jpeg|png|gif)/)) {
        setUploadError("Only JPEG, PNG, or GIF images are allowed");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image size must be less than 5MB");
        return;
      }

      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setUploadError(null);
    }
  };

  const handlePositionChange = (position: Position) => {
    const currentPositions = watch("employemnetposition") || [];
    const newPositions = currentPositions.includes(position)
      ? currentPositions.filter((p) => p !== position)
      : [...currentPositions, position];
    setValue("employemnetposition", newPositions);
  };

  const handleGuideTypeChange = (type: GuideType) => {
    const currentTypes = watch("guidetype") || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];
    setValue("guidetype", newTypes);
  };
  // Fixed handleDelete function
  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    try {
      const { success, error } = await deleteEmployeeTour(id);
      if (success) {
        // Optimistically update the UI
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));

        // Show success message
        alert("Employee deleted successfully");

        // If deleting the currently edited employee, reset the form
        if (initialData?.id === id) {
          handleCancel();
        }
      } else {
        throw new Error(error || "Deletion failed");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert(
        error instanceof Error ? error.message : "Failed to delete employee"
      );
      // Refresh the list to ensure consistency
      const updatedEmployees = await getAllEmplyeeTour();
      if (updatedEmployees) setEmployees(updatedEmployees);
    }
  };

  // Fixed handleCancel function
  const handleCancel = () => {
    reset({
      id: "",
      firstname: "",
      lastname: "",
      status: "active",
      employementstatus: ["parttime"],
      employemnetposition: [],
      address: "",
      phone: "",
      experience: "",
      guidetype: [],
      profilepic: "",
      bio: "",
    });
    setPreviewImage("");
    setProfileImage(null);
    setIsEditing(false);
    setUploadError(null);
    onCancel?.();
  };

  // Fixed handleEdit function
  const handleEdit = (employee: EmployeeTour) => {
    reset(employee);
    setPreviewImage(employee.profilepic || "");
    setIsEditing(true);
    setProfileImage(null);
    setUploadError(null);
  };
  const onSubmit = async (data: EmployeeTour) => {
    if (isUploading) return;

    try {
      let imageUrl = data.profilepic;
      if (profileImage) {
        imageUrl = await uploadImage(profileImage);
      }

      const employeeData = {
        ...data,
        profilepic: imageUrl,
      };

      if (isEditing && initialData?.id) {
        await updateEmployeeTour({
          id: initialData.id,
          employeeData,
          newProfileImage: profileImage || undefined,
        });
      } else {
        await createEmployeeTour({ employeeData });
      }

      const updatedEmployees = await getAllEmplyeeTour();
      if (updatedEmployees) setEmployees(updatedEmployees);

      reset();
      setPreviewImage("");
      setProfileImage(null);
      setIsEditing(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting employee:", error);
      setUploadError(
        error instanceof Error ? error.message : "Submission failed"
      );
    }
  };
  // Fixed the guide specialization section condition
  const showGuideSpecialization = watch("employemnetposition")?.includes(
    "Guide"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-slate-50">
          {isEditing ? "Edit Employee" : "Add New Employee"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-slate-50/20 rounded-md text-slate-50 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="employee-form"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-slate-50 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Save Employee"}
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form
        id="employee-form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Picture */}
          <div className="bg-slate-800 border border-slate-50/10 rounded-lg p-6">
            <h2 className="font-medium text-slate-50 mb-4">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-slate-700 overflow-hidden">
                  {previewImage ? (
                    <Img
                      src={previewImage}
                      width={100}
                      height={100}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : initialData?.profileImageUrl ? (
                    <Img
                      src={
                        initialData.profileImageUrl.startsWith("/")
                          ? initialData.profileImageUrl
                          : "/" + initialData.profileImageUrl
                      }
                      width={100}
                      height={100}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-50">
                      No Image
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-1 -right-3 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700"
                >
                  <FiUpload size={16} />
                  <input
                    placeholder="Upload a profile picture"
                    id="profile-upload"
                    type="file"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-50 mb-2">
                  Upload a clear photo (JPEG, PNG, GIF). Max size: 5MB.
                </p>
                {uploadError && (
                  <p className="text-sm text-red-500">{uploadError}</p>
                )}
                {isUploading && (
                  <p className="text-sm text-blue-400">Uploading image...</p>
                )}
              </div>
            </div>
            <input type="hidden" {...register("profilepic")} />
          </div>

          {/* Basic Information */}
          <div className="bg-slate-800 border border-slate-50/10 rounded-lg p-6">
            <h2 className="font-medium text-slate-50 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-slate-50 mb-1"
                >
                  First Name *
                </label>
                <input
                  id="firstname"
                  {...register("firstname", {
                    required: "First name is required",
                  })}
                  className="w-full px-3 py-2 border border-slate-50/10 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-slate-800 text-slate-50"
                />
                {errors.firstname && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-slate-50 mb-1"
                >
                  Last Name *
                </label>
                <input
                  id="lastname"
                  {...register("lastname", {
                    required: "Last name is required",
                  })}
                  className="w-full px-3 py-2 border border-slate-50/10 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-slate-800 text-slate-50"
                />
                {errors.lastname && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-50 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className="w-full px-3 py-2 border border-slate-50/10 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-slate-800 text-slate-50"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-slate-50 mb-1"
                >
                  Address *
                </label>
                <input
                  id="address"
                  {...register("address", { required: "Address is required" })}
                  className="w-full px-3 py-2 border border-slate-50/10 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-slate-800 text-slate-50"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-slate-800 border border-slate-50/10 rounded-lg p-6">
            <h2 className="font-medium text-slate-50 mb-4">Bio</h2>
            <textarea
              {...register("bio")}
              rows={7}
              className="w-full px-3 py-2 border border-slate-50/10 rounded-md shadow-sm focus:outline-none bg-slate-800 text-slate-50"
              placeholder="Describe yourself..."
            />
          </div>
        </div>

        {/* Right Column - Employment Details */}
        <div className="space-y-6">
          {/* Employment Status */}
          <div className="bg-slate-800 border border-slate-50/10 rounded-lg p-6">
            <h2 className="font-medium text-slate-50 mb-4">
              Employment Details
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Status *
              </label>
              <Select
                variant="flat"
                radius="sm"
                {...register("status", { required: "Status is required" })}
                className="w-full px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-50"
              >
                {statusOptions.map((option) => (
                  <SelectItem key={option} className="">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-50 mb-1">
                Employment Status *
              </label>
              <Select
                variant="flat"
                radius="sm"
                {...register("employementstatus", {
                  required: "Employment status is required",
                })}
                className="w-full px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-50"
              >
                {employmentStatusOptions.map((option) => (
                  <SelectItem key={option} className="">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Position(s) *
              </label>
              <div className="space-y-2">
                {positionOptions.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`position-${option}`}
                      checked={watch("employemnetposition")?.includes(option)}
                      onChange={() => handlePositionChange(option)}
                      placeholder="Select positions"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded bg-slate-800"
                    />
                    <label
                      htmlFor={`position-${option}`}
                      className="ml-2 block text-sm text-slate-50"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {errors.employemnetposition && (
                <p className="mt-1 text-sm text-red-600">
                  At least one position is required
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Experience (Years) *
              </label>
              <input
                {...register("experience", {
                  required: "Experience is required",
                })}
                type="number"
                min="0"
                className="w-full px-3 py-2 border border-slate-50/10 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-slate-800 text-slate-50"
              />
              {errors.experience && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.experience.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Guide Specialization */}
        {showGuideSpecialization && (
          <div className="border border-slate-50/10 rounded-lg bg-slate-800 p-6 h-auto">
            <h2 className="font-medium text-slate-50 mb-4">
              Guide Specialization
            </h2>
            <div className="space-y-2">
              {guideTypeOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`guide-type-${option}`}
                    checked={watch("guidetype")?.includes(option)}
                    onChange={() => handleGuideTypeChange(option)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border border-slate-50/10 rounded"
                  />
                  <label
                    htmlFor={`guide-type-${option}`}
                    className="ml-2 block text-sm text-slate-300"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* Employees Table */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-slate-50 mb-4">
          Employee List
        </h2>
        <div className="bg-slate-800 border border-slate-50/10 rounded-lg overflow-hidden shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-500">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-200">
                {employees.map((employee, index) => (
                  <tr key={employee.id || index} className="hover:bg-slate-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {employee.profileImageUrl ? (
                            <Img
                              className="h-10 w-10 rounded-full"
                              src={
                                employee.profileImageUrl.startsWith("/")
                                  ? employee.profileImageUrl
                                  : employee.profileImageUrl
                              }
                              alt="Profile"
                              width={40}
                              height={40}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center text-slate-50">
                              {employee.firstname?.charAt(0)}
                              {employee.lastname?.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-50">
                            {employee.firstname} {employee.lastname}
                          </div>
                          <div className="text-sm text-slate-50">
                            {employee.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-50">
                        {Array.isArray(employee.employemnetposition)
                          ? employee.employemnetposition.join(", ")
                          : employee.employemnetposition}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.status === "active"
                            ? "text-green-800 bg-green-100"
                            : "text-red-800 bg-red-100"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-50">
                      {employee.experience} years
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3 space-x-2">
                        <button
                          type="button"
                          aria-label="Edit"
                          onClick={() => handleEdit(employee)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete"
                          disabled={isDeleting}
                          onClick={() =>
                            employee.id && handleDelete(employee.id)
                          }
                          className={`text-red-600 hover:text-red-900 ${
                            isDeleting ? "opacity-50" : ""
                          }`}
                        >
                          {isDeleting ? "Deleting..." : <FiTrash2 />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
