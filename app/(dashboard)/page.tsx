import SalesChart from "@/components/custom ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {

  getTotalCollections,
  getTotalBlogs, 
} from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";

export default async function Home() {
  const totalBlogs = await getTotalBlogs();
  const totalCollections = await getTotalCollections();

  

  return (
    <div className="px-8 py-10">
      <p className="text-heading2-bold">Dashboard</p>
      <Separator className="bg-grey-1 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Blogs</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">$ {totalBlogs}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Collection</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalCollections}</p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
