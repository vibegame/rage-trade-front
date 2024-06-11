import Image from "next/image";
import { appLogo } from "shared/assets";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import HeaderNavigation from "./header-navigation";
import HeaderAccount from "./header-account";

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  return (
    <div
      className={twMerge(
        "flex h-[60px] items-center px-2 bg-gray-12",
        className
      )}
    >
      <Link href="/">
        <Image src={appLogo} alt="Rage Trade Logo" height={24} width={112} />
      </Link>
      <HeaderNavigation className="ml-24" />
      <HeaderAccount className="ml-auto" />
    </div>
  );
}
