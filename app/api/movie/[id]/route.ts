import { prisma } from "@/prisma/prisma";
import { Movie } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  /* We gather the id from the path params. The given URL should end with /id. Example:
    https://localhost:3000/api/movie/1 */
  let params = request.url.split("/");
  let id = params[params.length - 1];

  // We try to find the movie in the DB with the given id
  let movie = await prisma.movie.findFirst({
    where: {
      id: Number(id),
    },
  });
  if (movie) {
    // If a movie has been found, we return a successfull response
    return NextResponse.json(movie, { status: 200 });
  }
  // Else, we return an error
  return NextResponse.json(
    `No movie have been found with the given id: ${id}`,
    { status: 400 }
  );
}

export async function PUT(request: NextRequest) {
  // We gather the id from the route
  const params = request.url.split("/");
  const id = params[params.length - 1];
  if (isNaN(Number(id))) {
    return NextResponse.json(`[API MESSAGE] The id must be a number: ${id}`, {
      status: 400,
    });
  }
  // We gather the body of the request, to then update each field.
  const newMovie: Movie = await request.json();
  // We try to find the movie and update in the DB with the given id
  try {
    await prisma.movie.update({
      where: {
        id: Number(id),
      },
      data: {
        title: newMovie.title,
        duration: newMovie.duration,
      },
    });
    // And return a success response
    return NextResponse.json("[API MESSAGE] Movie updated successfully !", {
      status: 200,
    });
  } catch (error) {
    // Else, no movie has been found, we return an error
    return NextResponse.json(
      `[API MESSAGE] The movie doesnt exist exist with the given id: ${id}`,
      { status: 404 }
    );
  }
}
