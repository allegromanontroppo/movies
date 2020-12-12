import { connectToDatabase } from 'util/mongodb';
import { ObjectID } from 'mongodb';
import Image from 'next/image';

import { useRouter } from 'next/router';

export default function Movie({ movie }) {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <h3>{movie.metacritic}</h3>
      <p>{movie.plot}</p>
      <Image src={movie.poster} alt={movie.title} width={150} height={200} />
    </div>
  );
}

export async function getStaticProps(context) {
  const { db } = await connectToDatabase();

  const {
    params: { id },
  } = context;

  const movies = await db
    .collection('movies')
    .find({ _id: ObjectID(id) })
    .toArray();

  if (movies.length) {
    return {
      props: {
        movie: JSON.parse(JSON.stringify(movies[0])),
      },
    };
  }

  return {
    notFound: true,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
