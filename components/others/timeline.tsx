interface TimelineStep {
    label: string
  }
  
  export function Timeline({ steps }: { steps: TimelineStep[] }) {
    return (
      <div className="flex flex-col items-center gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-xl font-medium text-[#1a1a2e]">{step.label}</span>
            {index < steps.length - 1 && (
              <div className="h-16 w-[2px] bg-[#1a1a2e] my-2 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1a1a2e]" />
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
  
  