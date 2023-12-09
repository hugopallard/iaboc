import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const movies = await prisma.movie.createMany({
    data: [
      { title: "Interstellar", duration: "200" },
      { title: "Avatar", duration: "600" },
    ],
  });
  const halls = await prisma.hall.createMany({
    data: [
      { capacity: 75, spectators: 0 },
      { capacity: 25, spectators: 0 },
    ],
  });
  const showing = await prisma.showing.create({
    data: {
      date: new Date(),
      hall: { connect: { id: 1 } },
      movie: { connect: { id: 1 } },
      soldTickets: 65,
      freeSeats: 10,
    },
  });
  const showing1 = await prisma.showing.create({
    data: {
      date: new Date(),
      hall: { connect: { id: 2 } },
      movie: { connect: { id: 2 } },
      soldTickets: 20,
      freeSeats: 5,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
