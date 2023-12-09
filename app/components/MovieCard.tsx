import { Movie } from "@prisma/client";

export default function MovieCard({ movie }: { movie: Movie }) {

  return (
    <div>
      <div className="h-fit w-fit p-4 bg-red-500">
        <div>
          <div>Title: {movie.title}</div>
          <div>Duration: {movie.duration}</div>
        </div>
      </div>
      
    </div>
  );
}
