
import Product from "../models/Product";
import Collection from "../models/Collection";
import { connectToDB } from "../mongoDB"

export const getTotalBlogs = async () => {
  await connectToDB();
  const blogs = await Product.find()
  const totalBlogs = blogs.length
  return totalBlogs
}


export const getTotalCollections = async () => {
  await connectToDB();
  const collections = await Collection.find()
  const totalCollections = collections.length
  return totalCollections
}

