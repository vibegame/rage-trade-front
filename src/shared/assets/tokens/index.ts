import { StaticImageData } from "next/image";
import arbitrumLogo from "./arbitrum.png";
import optimismLogo from "./optimism.png";
import usdtLogo from "./usdt.png";
import usdcLogo from "./usdc.png";
import uniLogo from "./uniswap.png";
import wbtcLogo from "./wbtc.png";
import wethLogo from "./weth.png";
import linkLogo from "./link.png";
import ethLogo from "./eth.png";

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
