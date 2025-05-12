"use client";
import React, { useEffect, useState } from "react";
import SliderInOut from "@/components/reusable/sliderinout";


export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export default function Test() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/search?q=phone&limit=10")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setProducts(data.products);
        });
  }, []);
  return (
    <SliderInOut className="p-8 flex lg:flex-row flex-col items-center justify-center">
      <section className="gap-1 w-full lg:grid lg:grid-cols-3 p-2 lg:shadow-lg flex flex-col items-center justify-center rounded-md">
        {products.slice(0, 5).map((product) => (
          <div key={product.id} className="gap-1 w-full p-5 lg:shadow-lg flex flex-col items-start justify-center rounded-t-md border-[1px] border-slate-50/20">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="text-green-600">Price: ${product.price}</p>
            
          </div>
        ))}
              
      </section>
    </SliderInOut>
  );
}
