interface MealCardProps {
  image: string;
  title: string;
  description: string;
}

export function MealCard({ image, title, description }: MealCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
