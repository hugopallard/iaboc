import { Hall } from "@prisma/client";
import HallCard from "./components/HallCard";
import Link from "next/link";
import ShowingsDisplayer from "./components/ShowingsDisplayer";
import { FullShowing } from "./types";

async function getShowings(date: Date) {
  const response = await fetch(
    `http://localhost:3000/api/showings?date=${date.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
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
  return (await response.json()) as FullShowing[];
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

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  // Should fetch all of our cinema's hall

  const date = searchParams?.date;
  const showings = await getShowings(date ? new Date(date) : new Date());
  const halls = await getHalls();

  return (
    <main className="grid gap-y-4 ml-4 mt-4">
      <div className="text-2xl font-bold">Welcome to your cinema</div>
      <div className="text-xl font-bold">Please choose a hall</div>
      <div className="flex gap-x-4">
        {halls.map((hall, key) => (
          <HallCard key={key} hall={hall} />
        ))}
      </div>
      <div>
        <div className="mb-2 text-xl font-bold">
          Showings of today and beyond:
        </div>
        <ShowingsDisplayer showings={showings} />
      </div>
      <Link className="text-xl font-bold rounded-2xl" href={"/movies"}>
        See all movies
      </Link>
    </main>
  );
}
