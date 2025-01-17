import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  description: string[];
}

export function ProductCard({ image, title, description }: ProductCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 text-center">
      <div className="w-48 h-48 mx-auto mb-4">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <ul className="text-sm text-gray-600 mb-4">
        {description.map((item, index) => (
          <li key={index} className="mb-1">
            • {item}
          </li>
        ))}
      </ul>
      <Button className="w-full bg-[#1E2A4A] hover:bg-[#2A3B66]">
        Learn More
      </Button>
    </div>
  );
}
