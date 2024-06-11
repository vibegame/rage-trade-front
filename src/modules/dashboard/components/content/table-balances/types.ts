import { AccountToken, HyperliquidToken } from "modules/web3/tokens";
import { ReactNode } from "react";

export type TableColumn = {
  key: string;
  title: ReactNode;
  render: (token: AccountToken | HyperliquidToken) => React.ReactNode;
  width?: string;
  minWidth?: string;
};
