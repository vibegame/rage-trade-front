import { StaticImageData } from "next/image";
import arbitrumLogo from "./arbitrum.png";
import optimismLogo from "./optimism.png";
import { arbitrum, optimism } from "wagmi/chains";

export const chainLogoMap: Record<number, StaticImageData> = {
  [arbitrum.id]: arbitrumLogo,
  [optimism.id]: optimismLogo
};
