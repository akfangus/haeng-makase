import { cn } from "@/shared/lib/utils";
import { ShoppingBag } from "lucide-react";

interface LoadingShibaProps {
  className?: string;
  message?: string;
}

export function LoadingShiba({ className, message = "맛있는 쇼핑 정보를 가져오고 있어요!" }: LoadingShibaProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 space-y-4 text-center animate-in fade-in zoom-in duration-300", className)}>
      <div className="relative">
        {/* Placeholder for Shiba Image */}
        <div className="w-32 h-32 rounded-full bg-wood-secondary/30 flex items-center justify-center relative overflow-hidden">
             <span className="text-4xl">🐕</span>
             <ShoppingBag className="absolute bottom-6 right-6 size-6 text-wood-primary animate-bounce" />
        </div>
      </div>
      <p className="text-wood-text-muted font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
}
