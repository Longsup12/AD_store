type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  blog: ProductType[];
}

type ProductType = {
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