import { prisma } from "@/prisma/prisma";
import { Movie } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // We gather the body of the request, to then update each field.
  const newMovie: Movie = await request.json();
  await prisma.movie.create({
    data: {
      title: newMovie.title,
      duration: newMovie.duration,
    },
  });
  // And return a success response
  return NextResponse.json("[API MESSAGE] Movie created successfully !", {
    status: 200,
  });
}
