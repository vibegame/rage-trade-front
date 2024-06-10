import Image from "next/image";
import { twMerge } from "tailwind-merge";

type DataItem = {
  wallet: {
    name: string;
    logo: string;
  };
  percentage: number;
  chain: {
    name: string;
    logo: string;
  };
  asset: {
    logo: string;
    name: string;
  };
  balance: {
    token: {
      count: number;
    };
    value: {
      usd: number;
    };
  };
};

type TableBalancesProps = {
  data: DataItem[];
};

type TableColumn = {
  title: string;
  render: (row: DataItem) => React.ReactNode;
  width?: string;
  minWidth?: string;
};

const columns: TableColumn[] = [
  {
    title: "Wallet",
    render: (row: DataItem) => (
      <div className="flex items-center gap-2">
        <Image src={row.wallet.logo} width={24} height={24} alt="Wallet Logo" />
        <span>{row.wallet.name}</span>
      </div>
    )
  },
  {
    title: "100%",
    render: (row: DataItem) => (
      <div className="inline-block rounded-full bg-gray-11 px-3 py-1 text-xs font-semibold text-gray-5 transition-colors group-hover:bg-gray-9 group-hover:text-gray-1">
        {row.percentage}%
      </div>
    )
  },
  {
    title: "Chain",
    render: (row: DataItem) => (
      <Image src={row.chain.logo} width={24} height={24} alt="Chain Logo" />
    )
  },
  {
    title: "Asset",
    render: (row: DataItem) => (
      <div className="flex items-center gap-2">
        <Image src={row.asset.logo} width={24} height={24} alt="Asset Logo" />
        <span className="text-xs font-semibold text-gray-1">
          {row.asset.name}
        </span>
      </div>
    )
  },
  {
    title: "Balance",
    render: (row: DataItem) => (
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-gray-1">
          {row.balance.token.count} {row.asset.name}
        </span>
        <span className="text-xs font-semibold text-gray-5">
          {row.balance.value.usd}$
        </span>
      </div>
    )
  },
  {
    title: "Transfer",
    render: (row: DataItem) => (
      <button className="text-xs font-semibold text-purple">Transfer</button>
    )
  }
];

export default function TableBalances({ data }: TableBalancesProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-10">
          {columns.map((column, index) => (
            <th
              key={index}
              className={twMerge(
                "py-3 text-left text-gray-5 font-semibold text-xs",
                index === 0 && "pl-8"
              )}
              style={{
                width: column.width,
                minWidth: column.minWidth
              }}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            className="group border-b border-b-gray-10 transition-colors hover:bg-gray-10"
          >
            {columns.map((column, index) => (
              <td
                key={index}
                className={twMerge("py-3", index === 0 && "pl-8")}
                style={{
                  width: column.width,
                  minWidth: column.minWidth
                }}
              >
                {column.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
