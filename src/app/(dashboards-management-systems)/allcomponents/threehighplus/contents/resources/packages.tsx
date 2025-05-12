"use client";
import { useState, useEffect } from "react";
import { getAllPackages } from "@/context/threehighplus/tourpackages";
import { Rinjani } from "@/type/threehighplus/tourpackages";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function DataBlog() {
  const [packages, setPackages] = useState<Rinjani[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packages = await getAllPackages();
        setPackages(packages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <main className="w-full">
      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell>
                  <Link href={`/threehighplus/tour-packages/${pkg.id}`}>
                    {pkg.id}
                  </Link>
                </TableCell>
                <TableCell>{pkg.title}</TableCell>
                <TableCell>{pkg.desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
