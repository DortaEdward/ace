// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const data = await db.collection('urls').find({}).toArray();
  res.status(200).json({ urls: data })
}
