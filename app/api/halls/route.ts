import { prisma } from "@/prisma/prisma";
import { Hall } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  // We try to find the list of hall in the DB
  let halls: Hall[] = await prisma.hall.findMany();
  // If the list of hall has been found, we return a successfull response
  if (halls.length) {
    return NextResponse.json(halls, { status: 200 });
  }
  // Else, we return an error
  return NextResponse.json("Error retrieving the list of halls", {
    status: 400,
  });
}
