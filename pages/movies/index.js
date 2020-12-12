import { useState } from 'react';
import { connectToDatabase } from 'util/mongodb';
import Image from 'next/image';
import Link from 'next/link';

export default function Movies({ movies }) {
  // const [count, setCount] = useState(20);

  // setInterval(() => {
  //   setCount(count + 1);
  // }, 1000);

  return (
    <div>
      <h1>Top 200 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h2>
              <Link
                href={{
                  pathname: '/movies/[id]',
                  query: { id: movie._id },
                }}
              >
                {movie.title}
              </Link>
            </h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
            <Image src={movie.poster} alt={movie.title} width={150} height={200} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const movies = await db.collection('movies').find({}).sort({ metacritic: -1 }).limit(20).toArray();

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}
