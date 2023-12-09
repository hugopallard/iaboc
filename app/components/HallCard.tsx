"use client";
import Link from "next/link";
import { Hall } from "@prisma/client";

export default function HallCard({ hall }: { hall: Hall }) {
  return (
    <div className="grid w-fit">
      <div className="bg-slate-500 rounded-t-2xl p-4">
        <div>Hall: {hall.id}</div>
        <div>Capacity: {hall.capacity}</div>
      </div>
      <Link
        className="flex justify-center text-xl text-white items-center h-12 bg-green-500 px-4 rounded-b-2xl"
        href={`/showings/${hall.id}`}
      >
        See showings
      </Link>
    </div>
  );
}
