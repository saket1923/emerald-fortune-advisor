
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a mock login for demo purposes
    // In a real app, you would connect to your authentication service
    setTimeout(() => {
      if (email && password) {
        // Mock successful login
        localStorage.setItem("isAuthenticated", "true");
        toast({
          title: "Login successful",
          description: "Welcome back to your Wealth Dashboard.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-wealth p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white text-shadow">WealthGuard</h1>
          <p className="text-wealth-light-green mt-2">Personal Wealth Management</p>
        </div>
        
        <Card className="border-wealth-accent-gold border-opacity-50 bg-black bg-opacity-30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-wealth-light-green">Sign In</CardTitle>
            <CardDescription className="text-gray-300">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black bg-opacity-40 border-wealth-medium-green text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black bg-opacity-40 border-wealth-medium-green text-white pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full bg-wealth-medium-green hover:bg-wealth-dark-green text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="text-sm text-center space-y-2">
                <a href="#" className="text-wealth-light-green hover:underline block">Forgot password?</a>
                <p className="text-gray-300">
                  Don't have an account?{" "}
                  <a href="#" className="text-wealth-light-green hover:underline">
                    Create one
                  </a>
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} WealthGuard. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
