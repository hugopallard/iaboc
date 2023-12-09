"use client";
import { Movie } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMovieRow() {
  const [isShowing, setIsShowing] = useState(false);

  const [newMovie, setNewMovie] = useState<Movie>({
    id: 0,
    title: "",
    duration: "",
  });

  const router = useRouter();

  const onSubmit = async (event: any) => {
    event.preventDefault();

    // Should send a POST request
    await fetch(`http://localhost:3000/api/movie`, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    });
    setIsShowing(!isShowing);
    router.refresh();
  };

  if (isShowing) {
    return (
      <div className="grid">
        <form
          onSubmit={onSubmit}
          className="px-2 grid grid-cols-5 auto-cols-auto bg-slate-500 h-12 items-center"
        >
          <input
            className="mr-4 col-start-2"
            placeholder="My movie title"
            type="text"
            required
            defaultValue={newMovie.title}
            onChange={(e) => {
              setNewMovie({
                ...newMovie,
                title: e.target.value,
              });
            }}
          />

          <input
            className="mr-4"
            required
            type="number"
            maxLength={3}
            placeholder="My movie duration"
            defaultValue={newMovie.duration}
            onChange={(e) => {
              setNewMovie({
                ...newMovie,
                duration: e.target.value,
              });
            }}
          />

          <button type="submit">Create</button>
        </form>
        <div className="grid justify-center w-full mt-4">
      <button
        className="flex justify-center text-xl text-white items-center h-12 bg-red-500 px-4 rounded-2xl"
        onClick={() => setIsShowing(!isShowing)}
      >
        Annuler
      </button>
    </div>
      </div>
    );
  }
  return (
    <div className="grid justify-center w-full mt-4">
      <button
        className="flex justify-center text-xl text-white items-center h-12 bg-green-500 px-4 rounded-2xl"
        onClick={() => setIsShowing(!isShowing)}
      >
        Add a Movie
      </button>
    </div>
  );
}
