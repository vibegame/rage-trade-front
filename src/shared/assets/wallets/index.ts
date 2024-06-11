import { default as hyperliquid } from "./hyperliquid.svg";
import { StaticImageData } from "next/image";

export const walletsLogoMap = {
  hyperliquid: hyperliquid as StaticImageData
} satisfies Record<string, StaticImageData>;
