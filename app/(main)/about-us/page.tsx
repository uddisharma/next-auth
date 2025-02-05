import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="text-black md:mx-24">
      <main className="container mx-auto px-4 py-2 md:py-6">
        <h2 className="text-[35px] md:text-[40px] text-center mb-8">
          The Mr. Mard Story
        </h2>
        <h2 className="text-[28px] mb-8">Who is Mr. Mard?</h2>

        {/* First Section */}
        <section className="mb-12">
          <p className="mb-4">
            The world is not Hogwarts for transformation to happen the next
            moment under one magic spell. Grooming requires persistent efforts
            and current knowledge awareness.
          </p>
          <p className="mb-4">
            Mr. Mard offers you deep-rooted knowledge that addresses hair care
            and skin care and simplifies wellness for men amidst other
            exaggerating counterparts. We do not sugarcoat to promote products
            but reveal the truth about how they serve you well. We ensure
            fairness and look for a 1% improvement to meet your demands.
            <br />
            Grooming is not a sprint. It's a marathon. Stamina to sustain.
          </p>

          <p className="mb-8">
            To feel confident in their own skin. Yes, it's not easy. But it's
            not impossible either. With personalized recommendations powered by
            an expertly designed chatbot, exclusive guidance from medical
            experts, and a curated selection of accurate products, we will help
            you fix your hair and skin issues.
          </p>

          <p>
            When your father and uncles start balding, you think it's old age.
            But when your cousins and friends start balding, you start sweating
            and brace for the worst. That’s what happened with us, too. Except,
            as the mards at Mr. Mard, we did something about it.
          </p>
        </section>

        {/* Founders Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 align-middle justify-center items-center">
            <div className="md:w-1/2">
              <Image
                src="/about-us.webp"
                alt="Founders"
                width={550}
                height={300}
                className="rounded-lg"
              />
              {/* <h3 className="text-center w-full mt-4 bg-yellow py-2">Santhosh and Naveen</h3> */}
            </div>
            <div className="md:w-1/2">
              <h2 className="text-[28px] mb-8">Who is Mr. Mard?</h2>
              <p className="mb-4">
                We (Naveen and Santhosh) met when we were colleagues at Swiggy
                in 2019.
              </p>
              <p className="mb-4">
                Naveen's love for food met his passion for program management
                when he joined Swiggy. Santhosh found his way to Swiggy at the
                same time, too, with a background in Business Analytics.
              </p>
              <p>
                Over time, we found common ground in our discussions about men's
                grooming and hair health.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Sections */}
        <section className="mb-12">
          <p className="mb-8">
            We knew men's grooming and wellness was still an underground topic
            in India. Our conversations led us to realize that, right now, men
            are spending more than they get in return. There isn’t a space where
            they can be honest about their wellness. We wanted to create a space
            where they will not be judged for their deficiencies. And together,
            we birthed Mr. Mard—a brand that would help Indian men focus on
            their hair, skin, and overall wellness.
          </p>

          <p className="mb-4">
            It’s straightforward, really. But we know it’s easier said than
            done. We know that men's wellness goes beyond their physical health.
            Hair care or skin care are just two pieces of the puzzle. The real
            success lies in instilling a sense of confidence that will impact
            the mental and emotional well-being of men.
          </p>
          <p className="mb-4">
            Yes, appearance matters in today’s world. And feeling good about
            your appearance will only make you confident about yourself.
          </p>
          <p className="pb-16">
            We want to foster a community where men can come together and invest
            in their well-being. So that, one day, men will wear caps as a cover
            against sunlight, and not against insecurity.
          </p>
        </section>
      </main>
    </div>
  );
}
