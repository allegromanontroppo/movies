import { connectToDatabase } from 'util/mongodb';
import { ObjectID } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const {
    query: { id },
  } = req;

  const movies = await db
    .collection('movies')
    .find({ _id: ObjectID(id) })
    .toArray();

  res.json(movies[0]);
};
