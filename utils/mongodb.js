import { MongoClient } from 'mongodb';

const { MONGOURI_URI, MONGOURI_DB } = process.env;

if (!MONGOURI_URI) {
  throw new Error('Please Define the MONGOURI_URI enviornment variable');
}
if (!MONGOURI_DB) {
  throw new Error('Please Define the MONGOURI_DB enviornment variable');
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    cached.promise = MongoClient.connect(MONGOURI_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGOURI_DB)
      }
    })

    cached.conn = await cached.promise;
    return cached.conn
  }
}