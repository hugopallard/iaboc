"use client";
import { Showing, Movie, Hall } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddShowingRow({
  movies,
  halls,
}: {
  movies: Movie[];
  halls: Hall[];
}) {
  const [isShowing, setIsShowing] = useState(false);
  const [showMovies, setShowMovies] = useState(false);

  const [newShowing, setNewShowing] = useState<Showing>({
    id: 0,
    date: new Date(),
    soldTickets: 0,
    movieId: movies[0].id,
    hallId: halls[0].id,
    freeSeats: halls[0].capacity,
  });

  const router = useRouter();

  const onSubmit = async (event: any) => {
    event.preventDefault();

    // Should send a POST request
    await fetch(`http://localhost:3000/api/showing/`, {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShowing),
    });
    setIsShowing(!isShowing);
    router.refresh();
  };

  if (isShowing) {
    return (
      <div className="grid">
        <form
          onSubmit={onSubmit}
          className="px-2 grid grid-cols-8 auto-cols-auto bg-slate-500 h-12 items-center"
        >
          <select
            className="mr-4 col-start-2"
            required
            defaultValue={newShowing.hallId}
            onChange={(e) => {
              const selectedHall = halls.filter(
                (hall) => hall.id === Number(e.target.value)
              )[0];
              setNewShowing({
                ...newShowing,
                hallId: selectedHall.id,
                freeSeats: selectedHall.capacity,
              });
            }}
          >
            {halls.map((hall, key) => {
              return (
                <option
                  value={hall.id}
                  onClick={() => {
                    setShowMovies(!showMovies);
                  }}
                  key={key}
                >
                  {hall.id}
                </option>
              );
            })}
          </select>
          <input
            type="date"
            className="mr-4"
            defaultValue={new Date().toLocaleDateString('en-CA')}
            onChange={(e) => {
              setNewShowing({
                ...newShowing,
                date: new Date(e.target.value),
              });
            }}
          />
          <select
            className="mr-4"
            defaultValue={newShowing.movieId}
            onChange={(e) => {
              setNewShowing({
                ...newShowing,
                movieId: movies.filter(
                  (movie) => movie.id === Number(e.target.value)
                )[0].id,
              });
            }}
          >
            {movies.map((movie, key) => {
              return (
                <option
                  value={movie.id}
                  onClick={() => {
                    setShowMovies(!showMovies);
                  }}
                  key={key}
                >
                  {movie.title}
                </option>
              );
            })}
          </select>

          <div>{newShowing.soldTickets}</div>
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
        Add a Showing
      </button>
    </div>
  );
}
