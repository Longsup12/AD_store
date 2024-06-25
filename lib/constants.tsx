import {
  LayoutDashboard,
  Shapes,
  Tag,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/collections",
    icon: <Shapes />,
    label: "Collections",
  },
  {
    url: "/blogs",
    icon: <Tag />,
    label: "Blogs",
  },
];
