import Image from "next/image";

interface ProcessCardProps {
  number: number;
  title: string;
  heading: string;
  content: string[];
  imageSrc: string;
  imageAlt: string;
  bgColor?: "bg-yellow" | "";
}

export default function ProcessCard({
  number,
  title,
  heading,
  content,
  imageSrc,
  imageAlt,
  bgColor = number % 2 === 1 ? "" : "bg-yellow",
}: ProcessCardProps) {
  const isWhiteBackground = bgColor === "";

  return (
    <div
      className={`rounded-[50px] md:rounded-[100px] p-8 ${bgColor} mb-8 md:px-20`}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div
          className={`${isWhiteBackground ? "order-1" : "order-2 md:order-1"}`}
        >
          {isWhiteBackground ? (
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  height={300}
                  width={450}
                  className="h-[300px] max-h-[300px] md:h-[450px] md:max-h-[450px] w-[450px] rounded-[50px] md:rounded-[100px]"
                />
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-4">
                {number}. {title}
              </h3>
              <p className="pb-3 text-btnblue">{heading}</p>
              <ul className="space-y-2 ml-4">
                {content.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div
          className={`${isWhiteBackground ? "order-2" : "order-1 md:order-2"}`}
        >
          {isWhiteBackground ? (
            <div className="bg-white h-full p-8 rounded-[50px]">
              <h3 className="text-xl font-semibold mb-4">
                {number}. {title}
              </h3>
              <p className="pb-3 text-gray-700">{heading}</p>
              <ul className="space-y-2 ml-4">
                {content.map((item, index) => (
                  <li key={index} className="text-btnblue">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  height={300}
                  width={450}
                  className="h-[300px] max-h-[300px] md:h-[450px] md:max-h-[450px] w-[450px] rounded-[50px] md:rounded-[100px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
