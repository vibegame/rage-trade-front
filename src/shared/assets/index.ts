import { arbitrum, optimism } from "viem/chains";
import arbitrumLogo from "./arbitrum.png";
import optimismLogo from "./optimism.png";
import usdtLogo from "./usdt.png";
import usdcLogo from "./usdc.png";
import uniLogo from "./uniswap.png";
import wbtcLogo from "./wbtc.png";
import wethLogo from "./weth.png";
import linkLogo from "./link.png";
import ethLogo from "./eth.png";
import { StaticImageData } from "next/image";

export const chainLogoMap: Record<number, StaticImageData> = {
  [arbitrum.id]: arbitrumLogo,
  [optimism.id]: optimismLogo
};

export const tokensLogoMap: Record<string, StaticImageData> = {
  USDT: usdtLogo,
  USDC: usdcLogo,
  UNI: uniLogo,
  WBTC: wbtcLogo,
  WETH: wethLogo,
  LINK: linkLogo,
  OP: optimismLogo,
  ARB: arbitrumLogo,
  ETH: ethLogo
};
