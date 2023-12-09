import { FullShowing } from "@/app/types";
import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // We gather the body of the request, to then update each field.
  const { searchParams } = new URL(request.url);
  const wantedDate = searchParams.get("date");
  // If no date parameter, return an error
  if (!wantedDate) {
    return NextResponse.json("Please provide a date", {
      status: 400,
    });
  }
  // We try to find the list of showing in the DB
  let showings: FullShowing[] = await prisma.showing.findMany({
    where: { date: { gte: new Date(wantedDate) } },
    include: {
      movie: true,
      hall: true,
    },
  });
  // If the list of showing has been found, we return a successfull response
  if (showings.length) {
    return NextResponse.json(showings, { status: 200 });
  }
  // Else, we return an error
  return NextResponse.json("Error retrieving the list of showing", {
    status: 400,
  });
}
