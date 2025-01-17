import { type LucideIcon } from "lucide-react";

interface LifestyleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function LifestyleCard({
  icon: Icon,
  title,
  description,
}: LifestyleCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
        <Icon className="w-8 h-8 text-[#1E2A4A]" />
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
