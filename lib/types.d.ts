type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  blogs: BlogType[];
}

type BlogType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  createdAt: Date;
  updatedAt: Date;
}