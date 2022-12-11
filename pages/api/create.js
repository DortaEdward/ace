import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection('urls').insertOne(req.body);
    res.status(200).json({ message:'Created' })
  } catch (error) {
    res.status(500);
    res.json({error:error.message})
  }
}
