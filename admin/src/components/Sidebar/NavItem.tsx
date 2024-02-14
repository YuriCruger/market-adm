import { NAV_ICON } from "@/constants/NavIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  title: string;
  minimizeSidebar: boolean;
}

export function NavItem({ title, minimizeSidebar }: NavItemProps) {
  const pathname = usePathname().toLowerCase().replace(/^\//, "");

  return (
    <Link href={title.toLowerCase()}>
      <button
        className={`easy-in-out flex w-full cursor-pointer items-center p-3 transition duration-200 hover:bg-grayHover max-2xl:justify-center ${pathname === title.toLowerCase() ? "bg-grayHover" : ""} ${minimizeSidebar && " justify-center"}`}
      >
        {NAV_ICON[title as keyof typeof NAV_ICON]}
        {!minimizeSidebar && (
          <h3 className="ml-3 font-bold max-2xl:hidden">{title}</h3>
        )}
      </button>
    </Link>
  );
}
