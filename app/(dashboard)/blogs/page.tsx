"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/blogs/BlogColumns";

const Blogs = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  const getBlogs = async () => {
    try {
      const res = await fetch("/api/blogs", {
        method: "GET",
      });
      const data = await res.json();
      setBlogs(data);
      setLoading(false);
    } catch (err) {
      console.log("[blogs_GET]", err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Blogs</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/blogs/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Blog
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={blogs} searchKey="title" />
    </div>
  );
};

export default Blogs;
