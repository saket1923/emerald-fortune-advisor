
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PortfolioSummary = () => {
  const data = [
    {
      name: "Jan",
      value: 783000,
    },
    {
      name: "Feb",
      value: 798000,
    },
    {
      name: "Mar",
      value: 815000,
    },
    {
      name: "Apr",
      value: 826000,
    },
    {
      name: "May",
      value: 842000,
    },
    {
      name: "Jun",
      value: 856000,
    },
    {
      name: "Jul",
      value: 869000,
    },
    {
      name: "Aug",
      value: 876000,
    },
  ];

  return (
    <Card className="bg-black bg-opacity-20 border-wealth-dark-green">
      <CardHeader>
        <CardTitle className="text-wealth-light-green">Portfolio Value</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="#cccccc" 
                tick={{ fill: '#cccccc' }}
              />
              <YAxis 
                stroke="#cccccc" 
                tick={{ fill: '#cccccc' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid #004d25' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Bar dataKey="value" fill="#00cc44" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
