import TableBalances from "./table-balances";
import TopBalances from "./top-balances";

export default function Content() {
  return (
    <div className="size-full max-h-full overflow-y-auto bg-gray-12">
      <TopBalances />
      <TableBalances />
    </div>
  );
}
