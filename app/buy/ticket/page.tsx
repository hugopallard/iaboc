import BuyTicketCard from "@/app/components/BuyTicketCard";
import { FullShowing } from "@/app/types";
import Link from "next/link";

async function getShowing(id: number) {
  const response = await fetch(`http://localhost:3000/api/showing/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(
      `[API MESSAGE] ${await response.text()} (Status: ${response.status} | ${
        response.statusText
      })`
    );
    return null;
  }
  console.log("[API MESSAGE] Retrieved showing successfully:", {
    status: response.status + " " + response.statusText,
  });

  return (await response.json()) as FullShowing;
}

export default async function BuyTicket({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const showing = await getShowing(Number(searchParams?.showing || 0));

  // Handle error in a more appropriate way
  if (!showing) {
    return <div>Error, no showing found</div>;
  }
  return (
    <main className="px-2">
      <div className="text-2xl flex justify-center items-center my-4">
        <p>Buy tickets for showing:&nbsp;</p>
        <span className="font-bold">{showing.movie.title}</span>
        <p>&nbsp;of&nbsp;</p>
        <span className="font-bold">
          {showing.date.toString().split("T")[0]}
        </span>
        <p>&nbsp;Max tickets: {showing.freeSeats}</p>
      </div>
      <BuyTicketCard showing={showing} />
      <Link className="text-xl font-bold rounded-2xl" href={"/"}>
        Go to the Hall list
      </Link>
    </main>
  );
}
