import { FullShowing } from "@/app/types";
import { prisma } from "@/prisma/prisma";
import { Showing } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // We gather the id from the route
  const params = request.url.split("/");
  const hallId = params[params.length - 1];
  if (isNaN(Number(hallId))) {
    return NextResponse.json(`[API MESSAGE] The id must be a number: ${hallId}`, {
      status: 400,
    });
  }
  // We try to find the list of showing in the DB
  let showings: Showing[] = await prisma.showing.findMany({
    where: { hallId: Number(hallId) },
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
