import { useContext } from "react";
import { WalletsContext } from "./wallets-context";

export default function useWallets() {
  return useContext(WalletsContext);
}
