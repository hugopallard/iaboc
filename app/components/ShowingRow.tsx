"use client";
import { useState } from "react";
import { Hall, Movie, Showing } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

async function deleteShowing(id: number) {
  const response = await fetch(`http://localhost:3000/api/showing/${id}`, {
    method: "DELETE",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    console.error(
      `[API MESSAGE] ${await response.text()} (Status: ${response.status} | ${
        response.statusText
      })`
    );
  }
  console.log("[API MESSAGE] Deleted showing successfully:", {
    status: response.status + " " + response.statusText,
  });
}

export default function ShowingRow({
  showing,
  movies,
  halls,
}: {
  showing: Showing;
  movies: Movie[];
  halls: Hall[];
}) {
  // Should display a form like structure, making us able to edit the given showing
  const [isEditing, setIsEditing] = useState(false);
  const [showMovies, setShowMovies] = useState(false);

  const [newShowing, setNewShowing] = useState<Showing>({
    id: showing.id,
    date: showing.date,
    soldTickets: showing.soldTickets,
    movieId: showing.movieId,
    hallId: showing.hallId,
    freeSeats: showing.freeSeats,
  });

  const router = useRouter();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    // Should send a put request
    await fetch(`http://localhost:3000/api/showing/${newShowing.id}`, {
      method: "PUT",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShowing),
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="px-2 grid grid-cols-8 auto-cols-auto bg-slate-500 h-12 items-center"
    >
      <div>{showing.id}</div>
      <select
        className="mr-4"
        required
        name="hallId"
        disabled={!isEditing}
        defaultValue={newShowing.hallId}
        onChange={(e) => {
          setNewShowing({
            ...newShowing,
            hallId: halls.filter(
              (hall) => hall.id === Number(e.target.value)
            )[0].id,
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
        disabled={!isEditing}
        defaultValue={newShowing.date.toString().split("T")[0]}
        onChange={(e) => {
          setNewShowing({
            ...newShowing,
            date: new Date(e.target.value),
          });
        }}
      />
      <select
        disabled={!isEditing}
        className="mr-4"
        defaultValue={showing.movieId}
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

      <div>
        {showing.soldTickets} /{" "}
        {halls.filter((hall) => hall.id === showing.hallId)[0].capacity}
      </div>
      <button
        type={isEditing ? "button" : "submit"}
        onClick={() => {
          // End of editing should trigger a validation, and make the appropriate api call.
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? "Update" : "Edit"}
      </button>
      <button
        onClick={async () => {
          deleteShowing(showing.id);
          router.refresh();
        }}
      >
        Delete
      </button>
      <Link href={`/buy/ticket?showing=${showing.id}`}>Buy Tickets</Link>
    </form>
  );
}
