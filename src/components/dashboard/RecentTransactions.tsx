
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      type: "buy",
      name: "Microsoft Corp",
      symbol: "MSFT",
      amount: "$3,500.00",
      date: "Aug 15, 2025",
    },
    {
      id: 2,
      type: "sell",
      name: "Tesla Inc",
      symbol: "TSLA",
      amount: "$2,800.00",
      date: "Aug 12, 2025",
    },
    {
      id: 3,
      type: "buy",
      name: "NVIDIA Corp",
      symbol: "NVDA",
      amount: "$4,200.00",
      date: "Aug 10, 2025",
    },
    {
      id: 4,
      type: "buy",
      name: "Vanguard Total Stock ETF",
      symbol: "VTI",
      amount: "$5,000.00",
      date: "Aug 05, 2025",
    },
    {
      id: 5,
      type: "sell",
      name: "Amazon.com Inc",
      symbol: "AMZN",
      amount: "$1,950.00",
      date: "Aug 01, 2025",
    },
  ];

  return (
    <Card className="bg-black bg-opacity-20 border-wealth-dark-green">
      <CardHeader>
        <CardTitle className="text-wealth-light-green">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-wealth-dark-green">
                <th className="text-left py-3 text-sm font-medium text-gray-400">Type</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Asset</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Symbol</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Amount</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr 
                  key={transaction.id}
                  className="border-b border-wealth-dark-green hover:bg-wealth-dark-green hover:bg-opacity-30 transition-colors"
                >
                  <td className="py-3">
                    <span className="flex items-center">
                      {transaction.type === "buy" ? (
                        <ArrowDownIcon className="h-4 w-4 mr-1 text-wealth-light-green" />
                      ) : (
                        <ArrowUpIcon className="h-4 w-4 mr-1 text-red-400" />
                      )}
                      <span className={transaction.type === "buy" ? "text-wealth-light-green" : "text-red-400"}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </span>
                  </td>
                  <td className="py-3">{transaction.name}</td>
                  <td className="py-3 font-mono text-sm">{transaction.symbol}</td>
                  <td className="py-3 font-medium">{transaction.amount}</td>
                  <td className="py-3 text-gray-400">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
