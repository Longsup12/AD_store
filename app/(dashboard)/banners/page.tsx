"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { columns } from "@/components/banners/BannerColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";

const Banners = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);

  const getBanners = async () => {
    try {
      const res = await fetch("/api/banners", {
        method: "GET",
      });
      const data = await res.json();
      setBanners(data);
      setLoading(false);
    } catch (err) {
      console.log("[banners_GET]", err);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Banners</p>
        <Button className="bg-blue-1 text-white" onClick={() => router.push("/banners/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Banner Set
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={banners} searchKey="title" />
    </div>
  );
};

export default Banners;
