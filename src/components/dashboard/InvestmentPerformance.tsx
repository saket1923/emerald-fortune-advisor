
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const InvestmentPerformance = () => {
  const data = [
    { name: "Jan", stocks: 3.2, mutualFunds: 4.1, fixedDeposit: 0.5 },
    { name: "Feb", stocks: -1.4, mutualFunds: -0.3, fixedDeposit: 0.5 },
    { name: "Mar", stocks: 2.1, mutualFunds: 1.8, fixedDeposit: 0.5 },
    { name: "Apr", stocks: 1.7, mutualFunds: 2.3, fixedDeposit: 0.5 },
    { name: "May", stocks: 2.8, mutualFunds: 2.2, fixedDeposit: 0.5 },
    { name: "Jun", stocks: -0.5, mutualFunds: 0.2, fixedDeposit: 0.5 },
    { name: "Jul", stocks: 4.2, mutualFunds: 3.1, fixedDeposit: 0.5 },
    { name: "Aug", stocks: 2.3, mutualFunds: 1.7, fixedDeposit: 0.5 },
  ];

  return (
    <Card className="bg-black bg-opacity-20 border-wealth-dark-green">
      <CardHeader>
        <CardTitle className="text-wealth-light-green">Investment Performance (% Return)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#cccccc" tick={{ fill: '#cccccc' }} />
              <YAxis 
                stroke="#cccccc" 
                tick={{ fill: '#cccccc' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Return']}
                contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid #004d25' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="stocks" 
                stroke="#00cc44" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="mutualFunds" 
                stroke="#d4af37" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="fixedDeposit" 
                stroke="#0088FE" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentPerformance;
