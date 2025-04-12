import { searchPhotos } from "@/lib/unsplash";
import SearchForm from "@/component/SearchForm";
import PhotoGrid from "@/component/PhotoGrid";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "nature";
  const { results } = await searchPhotos(query, 1, 12);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6"> Search</h1>
      <SearchForm initialQuery={query} />
      <PhotoGrid photos={results} />
    </div>
  );
}
