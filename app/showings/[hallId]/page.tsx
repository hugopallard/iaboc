import AddShowingRow from "@/app/components/AddShowingRow";
import ShowingRow from "@/app/components/ShowingRow";
import { Hall, Movie, Showing } from "@prisma/client";
import Link from "next/link";

async function getShowings(hallId: number) {
  const response = await fetch(`http://localhost:3000/api/showings/${hallId}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(
      `[API MESSAGE] ${await response.text()} (Status: ${response.status} | ${
        response.statusText
      })`
    );
    return [];
  }
  console.log("[API MESSAGE] Retrieved showings successfully:", {
    status: response.status + " " + response.statusText,
  });
  return (await response.json()) as Showing[];
}

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

async function getHalls() {
  const response = await fetch("http://localhost:3000/api/halls", {
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
  console.log("[API MESSAGE] Retrieved halls successfully:", {
    status: response.status + " " + response.statusText,
  });

  return (await response.json()) as Hall[];
}

export default async function Showings({
  params,
}: {
  params: { hallId: number };
}) {
  const showings = await getShowings(params.hallId);
  const movies = await getMovies();
  const halls = await getHalls();

  return (
    <main className="px-2">
      <div className="text-2xl font-bold flex justify-center my-4">
        Showings of hall:&nbsp;
        <span className="font-bold">{params.hallId}</span>
      </div>
      <div className="grid w-full">
        <div className="p-2 grid grid-cols-8 auto-cols-auto bg-slate-900 text-white w-full">
          <div>Id</div>
          <div>Hall</div>
          <div>Date</div>
          <div>Movie</div>
          <div>Sold tickets</div>
        </div>
        {showings.map((showing, key) => (
          <ShowingRow
            key={key}
            showing={showing}
            movies={movies}
            halls={halls}
          />
        ))}
        <AddShowingRow movies={movies} halls={halls} />
      </div>
      <Link className="text-xl font-bold rounded-2xl" href={"/"}>
        Go to the Hall list
      </Link>
    </main>
  );
}
