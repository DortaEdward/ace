import { connectToDatabase } from '../../utils/mongodb';

export default async (req,res) => {
  const { db } = await connectToDatabase();

  const slug = req.query['slug'];

  if(!slug || typeof slug !== 'string'){
    res.statusCode = 404;
    res.json({message:'Invalid Slug'})
    return;
  };

  const data = await db.collection('urls').findOne({shorten:slug});

  if(!data){
    res.statusCode = 404;
    res.json({message:'Slug does not exists'})
    return;
  }

  res.setHeader("Content-Type","application/json");
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Cache-Control","s-maxage=1000000000, stale-while-revalidate")

  return res.redirect(data.originalUrl);

}