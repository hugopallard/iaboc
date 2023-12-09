"use client";
import { useState } from "react";
import { Movie } from "@prisma/client";
import { useRouter } from "next/navigation";

async function deleteMovie(id: number) {
  const response = await fetch(`http://localhost:3000/api/movie/${id}`, {
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
  console.log("[API MESSAGE] Deleted movie successfully:", {
    status: response.status + " " + response.statusText,
  });
}

export default function MovieRow({ movie }: { movie: Movie }) {
  // Should display a form like structure, making us able to edit the given showing
  const [isEditing, setIsEditing] = useState(false);

  const [newMovie, setNewMovie] = useState<Movie>({
    id: movie.id,
    title: movie.title,
    duration: movie.duration,
  });

  const router = useRouter();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    // Should send a put request
    await fetch(`http://localhost:3000/api/movie/${movie.id}`, {
      method: "PUT",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="px-2 grid grid-cols-5 auto-cols-auto bg-slate-500 h-12 items-center"
    >
      <div>{movie.id}</div>
      <input
        className="mr-4"
        type="text"
        disabled={!isEditing}
        defaultValue={movie.title}
        onChange={(e) => {
          setNewMovie({
            ...newMovie,
            title: e.target.value,
          });
        }}
      />
      <input
        className="mr-4"
        type="number"
        maxLength={3}
        disabled={!isEditing}
        defaultValue={movie.duration}
        onChange={(e) => {
          setNewMovie({
            ...newMovie,
            duration: e.target.value,
          });
        }}
      />

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
          deleteMovie(movie.id);
          router.refresh();
        }}
      >
        Delete
      </button>
    </form>
  );
}
