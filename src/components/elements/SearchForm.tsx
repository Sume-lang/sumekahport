"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

interface SearchFormProps {
  initialQuery?: string;
}

export default function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="search"
        name="query"
        defaultValue={initialQuery}
        placeholder="Search for photos..."
        className="px-4 py-2 border rounded-l"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
