
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, PieChart, LineChart, HomeIcon, SettingsIcon } from "lucide-react";
import AssetAllocation from "@/components/dashboard/AssetAllocation";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import InvestmentPerformance from "@/components/dashboard/InvestmentPerformance";
import AccountSummary from "@/components/dashboard/AccountSummary";
import Chatbot from "@/components/chatbot/Chatbot";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-wealth text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-20 border-b border-wealth-dark-green">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <HomeIcon className="text-wealth-accent-gold" />
            <h1 className="text-xl font-bold text-wealth-light-green">WealthGuard</h1>
          </div>
          <div className="flex space-x-4 items-center">
            <Button 
              variant="ghost" 
              className="text-wealth-light-green hover:text-white hover:bg-wealth-dark-green"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <span className="flex items-center">
                <span className="mr-2">Financial Advisor</span>
                <span className={`w-2 h-2 rounded-full ${isChatOpen ? 'bg-wealth-accent-gold' : 'bg-wealth-light-green'}`}></span>
              </span>
            </Button>
            <Button 
              variant="ghost"
              size="icon"
              className="text-wealth-light-green hover:text-white hover:bg-wealth-dark-green"
            >
              <SettingsIcon size={20} />
            </Button>
            <Button 
              variant="outline" 
              className="border-wealth-accent-gold text-wealth-accent-gold hover:bg-wealth-dark-green"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">Welcome back, Alex</h2>
          <p className="text-gray-300">Here's the current status of your portfolio</p>
        </div>

        {/* Account Summary */}
        <AccountSummary />

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="bg-black bg-opacity-20 border border-wealth-dark-green">
            <TabsTrigger value="overview" className="data-[state=active]:bg-wealth-dark-green">
              <span className="flex items-center">
                <PieChart className="w-4 h-4 mr-2" />
                Overview
              </span>
            </TabsTrigger>
            <TabsTrigger value="investments" className="data-[state=active]:bg-wealth-dark-green">
              <span className="flex items-center">
                <BarChart className="w-4 h-4 mr-2" />
                Investments
              </span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-wealth-dark-green">
              <span className="flex items-center">
                <LineChart className="w-4 h-4 mr-2" />
                Performance
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <PortfolioSummary />
              </div>
              <div>
                <AssetAllocation />
              </div>
            </div>
            <RecentTransactions />
          </TabsContent>

          <TabsContent value="investments" className="mt-6">
            <Card className="bg-black bg-opacity-20 border-wealth-dark-green">
              <CardHeader>
                <CardTitle className="text-wealth-light-green">Investment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Detailed investment information will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <InvestmentPerformance />
          </TabsContent>
        </Tabs>
      </main>

      {/* Chatbot */}
      {isChatOpen && (
        <div className="fixed bottom-0 right-0 mb-6 mr-6 w-96 h-[500px] bg-black bg-opacity-80 border border-wealth-dark-green rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <Chatbot onClose={() => setIsChatOpen(false)} />
        </div>
      )}

      <footer className="py-6 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} WealthGuard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
