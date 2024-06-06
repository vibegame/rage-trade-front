import Image from "next/image";
import logo from "shared/assets/logo.svg";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import HeaderNavigation from "./header-navigation";
import ConnectWalletButton from "./connect-wallet-button";
import { useState } from "react";
import HeaderAccount from "./header-account";

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const [connected, setConnected] = useState(true);

  return (
    <div
      className={twMerge(
        "flex h-[60px] items-center px-2 bg-gray-12",
        className
      )}
    >
      <Link href="/">
        <Image src={logo} alt="Rage Trade Logo" height={24} width={112} />
      </Link>
      <HeaderNavigation className="ml-24" />
      {connected ? (
        <HeaderAccount className="ml-auto" />
      ) : (
        <ConnectWalletButton className="ml-auto" />
      )}
    </div>
  );
}
