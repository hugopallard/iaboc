import { prisma } from "@/prisma/prisma";
import { Movie } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  // We try to find the list of movie in the DB
  let movie: Movie[] = await prisma.movie.findMany();
  // If the list of movie has been found, we return a successfull response
  if (movie.length) {
    return NextResponse.json(movie, { status: 200 });
  }
  // Else, we return an error
  return NextResponse.json("Error retrieving the list of movie", {
    status: 400,
  });
}
