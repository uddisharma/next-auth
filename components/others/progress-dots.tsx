interface ProgressDotsProps {
  total: number;
  current: number;
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex justify-center gap-6 md:gap-12 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-5 h-5 rounded-full border-[1px] border-btnblue ${
            i <= current ? "bg-btnblue" : "bg-white"
          }
                        }`}
          aria-current={i === current - 1 ? "step" : undefined}
        />
      ))}
    </div>
  );
}
