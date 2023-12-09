import { Prisma } from "@prisma/client";

const fullShowing = Prisma.validator<Prisma.ShowingDefaultArgs>()({
  include: {
    movie: true,
    hall: true,
  },
});
export type FullShowing = Prisma.ShowingGetPayload<typeof fullShowing>;
