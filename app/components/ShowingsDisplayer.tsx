"use client";
import { FullShowing } from "../types";
import ShowingCard from "./ShowingCard";
import { useRouter } from "next/navigation";

export default function ShowingsDisplayer({
  showings,
}: {
  showings: FullShowing[];
}) {
  const router = useRouter();
  console.log(new Date())
  return (
    <div>
      <form className="mb-4">
        <input
          type="date"
          className="mr-4"
          defaultValue={new Date().toLocaleDateString('en-CA')}
          onChange={(e) => {
            router.push(`?date=${e.target.value}`);
            router.refresh();
          }}
        />
      </form>
      <div className="flex gap-x-4">
        {showings.map((showing, key) => (
          <ShowingCard key={key} showing={showing} />
        ))}
      </div>
    </div>
  );
}
