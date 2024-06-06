"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const navList = [
  { label: "Trade", path: "/trade" },
  { label: "Account", path: "/", icon: <FaUser size={16} /> },
  { label: "Competitions", path: "/competitions" },
  { label: "Stats", path: "/stats" }
];

type Props = {
  className?: string;
};

export default function HeaderNavigation({ className }: Props) {
  const pathname = usePathname();

  return (
    <ul className={twMerge("flex gap-6 items-center", className)}>
      {navList.map((item, index) => {
        const isActive = item.path === pathname;

        return (
          <li key={index}>
            <Link
              href={item.path}
              className={twMerge(
                "flex gap-2 items-center font-semibold",
                isActive && "text-purple"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
