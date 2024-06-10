"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastsManager } from "shared/ui/toast";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmi";
import { WalletsProvider } from "modules/web3";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ToastsManager>
          <WalletsProvider>{children}</WalletsProvider>
        </ToastsManager>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
