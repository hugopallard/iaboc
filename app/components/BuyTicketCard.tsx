"use client";
import { useState } from "react";
import { FullShowing } from "../types";
import { useRouter } from "next/navigation";

export default function BuyTicketCard({ showing }: { showing: FullShowing }) {
  const [error, setError] = useState("");
  let [numberOfTicket, setNumberOfTicket] = useState(0);
  const router = useRouter()
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-12 px-4 bg-slate-500 rounded-2xl mb-4 gap-x-4 items-center">
        <p>Buy tickets: {numberOfTicket}</p>
        <button
          className="font-bold text-2xl"
          onClick={() => {
            setNumberOfTicket(numberOfTicket + 1);
            if (
              numberOfTicket > showing.hall.capacity - 1 ||
              numberOfTicket > showing.freeSeats - 1
            ) {
              setError("More tickets than available, buy less tickets");
            } else {
              setError("");
            }
          }}
        >
          +
        </button>
        <button
          className="font-bold text-2xl"
          onClick={() => {
            setNumberOfTicket(numberOfTicket - 1);
            if (numberOfTicket < 1) {
              setError("Can't buy a negative number of tickets");
            } else {
              setError("");
            }
          }}
        >
          -
        </button>
      </div>

      <button
        className="h-12 px-4 bg-green-500 rounded-2xl mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={error ? true : false}
        onClick={async () => {
          if (!error) {
            await fetch(`http://localhost:3000/api/showing/${showing.id}`, {
              method: "PATCH",
              cache: "no-store",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(numberOfTicket),
            });
            router.push(`/showings/${showing.hallId}`)
            router.refresh()
          }
        }}
      >
        Valider
      </button>
      {error ? (
        <button className="h-12 bg-red-500 rounded-2xl px-4">{error}</button>
      ) : null}
    </div>
  );
}
