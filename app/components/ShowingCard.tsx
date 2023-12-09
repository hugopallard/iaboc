import Link from "next/link";
import { FullShowing } from "../types";

export default async function ShowingCard({
  showing,
}: {
  showing: FullShowing;
}) {
  return (
    <div className="grid w-fit">
      <div className="bg-slate-500 rounded-t-2xl p-4">
        <div>Showing's date: {showing.date.toString().split("T")[0]}</div>
        <div>Movie title: {showing.movie.title}</div>
        <div>Movie duration: {showing.movie.duration}</div>
        <div>Hall: {showing.hallId}</div>
      </div>
      <Link
        className="flex justify-center text-xl text-white items-center h-12 bg-green-500 px-4 rounded-b-2xl"
        href={`/buy/ticket?showing=${showing.id}`}
      >
        Buy Tickets
      </Link>
    </div>
  );
}
