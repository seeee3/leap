import { Button } from "@/components/ui/button";

export const AuthButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="outline" 
        className="h-10 px-6 bg-transparent border border-orange-500 text-white hover:bg-orange-500/10 hover:border-orange-400"
      >
        Signup
      </Button>
      <Button 
        variant="outline" 
        className="h-10 px-6 bg-transparent border border-orange-500 text-white hover:bg-orange-500/10 hover:border-orange-400"
      >
        Login
      </Button>
    </div>
  );
};
