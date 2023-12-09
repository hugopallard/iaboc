import { FullShowing } from "@/app/types";
import { prisma } from "@/prisma/prisma";
import { Showing } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // We gather the id from the route
  const params = request.url.split("/");
  const showingId = params[params.length - 1];
  if (isNaN(Number(showingId))) {
    return NextResponse.json(
      `[API MESSAGE] The id must be a number: ${showingId}`,
      {
        status: 400,
      }
    );
  }
  // We try to find the list of showing in the DB
  let showing: FullShowing | null = await prisma.showing.findUnique({
    where: { id: Number(showingId) },
    include: { movie: true, hall: true },
  });
  // If the list of showing has been found, we return a successfull response
  if (showing) {
    return NextResponse.json(showing, { status: 200 });
  }
  // Else, we return an error
  return NextResponse.json("Error retrieving a showing", {
    status: 400,
  });
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
  const newShowing: Showing = await request.json();
  // We try to find the showing and update in the DB with the given id
  try {
    await prisma.showing.update({
      where: {
        id: Number(id),
      },
      data: {
        hallId: newShowing.hallId,
        date: newShowing.date,
        movieId: newShowing.movieId,
      },
    });
    // And return a success response
    return NextResponse.json("[API MESSAGE] Showing updated successfully !", {
      status: 200,
    });
  } catch (error) {
    // Else, no showing has been found, we return an error
    return NextResponse.json(
      `[API MESSAGE] The showing doesnt exist exist with the given id: ${id}`,
      { status: 404 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  // We gather the id from the route
  const params = request.url.split("/");
  const id = params[params.length - 1];
  if (isNaN(Number(id))) {
    return NextResponse.json(`[API MESSAGE] The id must be a number: ${id}`, {
      status: 400,
    });
  }
  // We gather the body of the request, to then update each field.
  const numberOfTicket: number = await request.json();
  // We try to find the showing and update in the DB with the given id
  try {
    await prisma.showing.update({
      where: {
        id: Number(id),
      },
      data: {
        soldTickets: { increment: numberOfTicket },
        freeSeats: {decrement: numberOfTicket}
      },
    });
    // And return a success response
    return NextResponse.json("[API MESSAGE] Showing patched successfully !", {
      status: 200,
    });
  } catch (error) {
    // Else, no showing has been found, we return an error
    return NextResponse.json(
      `[API MESSAGE] The showing doesnt exist exist with the given id: ${id}`,
      { status: 404 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // We gather the id from the route
  const params = request.url.split("/");
  const id = params[params.length - 1];
  if (isNaN(Number(id))) {
    return NextResponse.json(`[API MESSAGE] The id must be a number: ${id}`, {
      status: 400,
    });
  }
  // We try to find the showing and update in the DB with the given id
  await prisma.showing.delete({
    where: {
      id: Number(id),
    },
  });
  // And return a success response
  return NextResponse.json("[API MESSAGE] Showing deleted successfully !", {
    status: 200,
  });
}
