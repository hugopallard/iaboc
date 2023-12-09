import { prisma } from "@/prisma/prisma";
import { Showing } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // We gather the body of the request, to then update each field.
    const newShowing: Showing = await request.json();
    // We try to find the showing and update in the DB with the given id
    await prisma.showing.create({
      data: {
        hallId: newShowing.hallId,
        date: newShowing.date,
        movieId: newShowing.movieId,
        soldTickets: newShowing.soldTickets,
        freeSeats: newShowing.freeSeats
      },
    });
    // And return a success response
    return NextResponse.json("[API MESSAGE] Showing created successfully !", {
      status: 200,
    });
  }