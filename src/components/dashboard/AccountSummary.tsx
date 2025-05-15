
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const AccountSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-black bg-opacity-20 border-wealth-dark-green">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Total Net Worth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-wealth-accent-gold">$1,284,500.00</div>
          <p className="flex items-center text-sm text-wealth-light-green mt-2">
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span>+5.2% from last month</span>
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-black bg-opacity-20 border-wealth-dark-green">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Investment Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-wealth-accent-gold">$876,320.00</div>
          <p className="flex items-center text-sm text-wealth-light-green mt-2">
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span>+3.8% from last month</span>
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-black bg-opacity-20 border-wealth-dark-green">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">Cash Reserves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-wealth-accent-gold">$408,180.00</div>
          <p className="flex items-center text-sm text-gray-400 mt-2">
            <ArrowDownIcon className="h-4 w-4 mr-1" />
            <span>-1.2% from last month</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSummary;
