import React from "react";

interface Photo {
    id: string;
    urls: {
        small: string;
    };
    description: string | null;
    user: {
        name: string;
    };
}

interface PhotoGridProps {
    photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="rounded overflow-hidden shadow-lg">
          <img
            src={photo.urls.small}
            alt={photo.description || "Unsplash photo"}
            className="w-full h-48 object-cover"
          />
          <div className="px-4 py-2">
            <p className="text-gray-700 text-sm truncate">
              {photo.description ? photo.description : "No description"}
            </p>
            <p className="text-gray-500 text-xs">by {photo.user.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

