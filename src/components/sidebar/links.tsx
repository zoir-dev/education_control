import {
  Book,
  GraduationCap,
  LayoutDashboard,
  Table,
  UsersRound,
} from "lucide-react";

export const links: LinkType[] = [
  {
    name: "Dashboard",
    link: "/",
    icon: <LayoutDashboard className="w-5 " />,
  },
  {
    name: "Teachers",
    link: "/teachers",
    icon: <GraduationCap className="w-5 " />,
  },
  {
    name: "Students",
    link: "/students",
    icon: <UsersRound className="w-5 " />,
  },
  {
    name: "Subject Table",
    link: "/subject_table",
    icon: <Table className="w-5 " />,
  },
  {
    name: "Classes",
    link: "/classes",
    icon: <GraduationCap className="w-5 " />,
  },
  {
    name: "Subjects",
    link: "/subjects",
    icon: <Book className="w-5 " />,
  },
];

export interface LinkType {
  name: string;
  link: string;
  icon: any;
  img?: any;
}
