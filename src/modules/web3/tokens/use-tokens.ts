import { useContext } from "react";
import { TokensContext } from "./tokens-context";

export default function useTokens() {
  return useContext(TokensContext);
}
