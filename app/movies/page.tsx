import { Movie } from "@prisma/client";
import React from "react";
import MovieRow from "../components/MovieRow";
import Link from "next/link";
import AddMovieRow from "../components/AddMovieRow";

async function getMovies() {
  const response = await fetch(`http://localhost:3000/api/movies`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(
      `[API MESSAGE] ${await response.text()} (Status: ${response.status} | ${
        response.statusText
      })`
    );
  }
  console.log("[API MESSAGE] Retrieved movies successfully:", {
    status: response.status + " " + response.statusText,
  });
  return (await response.json()) as Movie[];
}

export default async function Movies() {
  const movies = await getMovies();

  return (
    <main className="px-2">
      <div className="text-2xl font-bold flex justify-center my-4">
        Your cinema's movies
      </div>
      <div className="grid w-full">
        <div className="p-2 grid grid-cols-5 auto-cols-auto bg-slate-900 text-white w-full">
          <div>Id</div>
          <div>Title</div>
          <div>Duration</div>
        </div>
        {movies.map((movie, key) => (
          <MovieRow key={key} movie={movie} />
        ))}
        <AddMovieRow />
      </div>
      <Link className="text-xl font-bold rounded-2xl" href={"/"}>
        Go to the Hall list
      </Link>
    </main>
  );
}
