
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const AssetAllocation = () => {
  const data = [
    { name: "Stocks", value: 45 },
    { name: "Fixed Deposits", value: 20 },
    { name: "Mutual Funds", value: 25 },
    { name: "Bonds", value: 10 },
  ];

  const COLORS = ["#00cc44", "#d4af37", "#0088FE", "#00C49F"];

  return (
    <Card className="bg-black bg-opacity-20 border-wealth-dark-green h-full">
      <CardHeader>
        <CardTitle className="text-wealth-light-green">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Allocation']}
                contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid #004d25' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetAllocation;
