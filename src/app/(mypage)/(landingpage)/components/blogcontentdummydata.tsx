import React from "react";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  authors: { name: string }[];
  formats: { [key: string]: string };
}

export default function BlogContentDummyData() {
  const books: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      authors: [{ name: "F. Scott Fitzgerald" }],
      formats: { "text/html": "https://example.com/gatsby.html" },
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      authors: [{ name: "Harper Lee" }],
      formats: { "text/html": "https://example.com/to-kill-a-mockingbird.html" },
    },
    {
      id: 3,
      title: "1984",
      authors: [{ name: "George Orwell" }],
      formats: { "text/html": "https://example.com/1984.html" },
    },
  ];
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {books.map((book) => (
        <Link href={book.formats["text/html"]} key={book.id}>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h1 className="text-xl font-bold">{book.title}</h1>
            <p className="text-sm">{book.authors[0].name}</p>
            <p className="text-sm">{book.formats["text/html"]}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

