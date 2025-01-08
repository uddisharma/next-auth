'use client'

import { Droplets, Moon, Sparkles, Zap } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { HairChart } from '@/components/hair-chart'
import { LifestyleCard } from '@/components/lifestyle-card'
import { MealCard } from '@/components/meal-card'
import { ProductCard } from '@/components/product-card'
import { ProgressCircle } from '@/components/progress-circle'

export default function Dashboard() {
    return (
        <div className="min-h-screen">

            <main className="container mx-auto px-4 py-8">
                {/* Title Banner */}
                <div className="bg-yellow rounded-full px-8 py-3 text-center mb-8">
                    <h1 className="text-xl font-semibold">Hair Health Report</h1>
                </div>

                <p className='text-black text-[20px] text-center font-medium'>Your Personalised Hair Analysis</p>

                <p className="text-center text-gray-600 mb-8 mx-auto my-5">
                    Our AI-powered Hair Analysis Tool provides you with a comprehensive evaluation of your hair health. By analyzing your images and input data, we
                    generate actionable insights and recommendations to help you achieve your hair goals.
                </p>

                {/* Analysis Section */}
                <div className='bg-[#F2F2F2] rounded-3xl p-8'>
                    <div style={{ border: '1px solid red', borderRadius: '10px', padding: '20px' }} className="grid md:grid-cols-2 gap-6 mb-12 mx-40">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold mb-4">General Hair Health</h2>
                                <div className="flex items-center justify-center">
                                    <ProgressCircle value={75} max={100} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid gap-6">
                            <div className='grid grid-cols-2 gap-6'>
                                <Card>
                                    <CardContent className="p-6">
                                        <h2 className="text-lg font-semibold mb-4">Total Hair Count</h2>
                                        <div className="text-4xl font-bold text-center">95,675</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6">
                                        <h2 className="text-lg font-semibold mb-4">Hair Type</h2>
                                        <div className="flex justify-center gap-4">
                                            <button className="w-8 h-8 rounded-full bg-gray-200" />
                                            <button className="w-8 h-8 rounded-full bg-gray-400" />
                                            <button className="w-8 h-8 rounded-full bg-gray-800" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>


                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <Card>
                        <CardContent className="p-6">
                            <HairChart
                                title="Hair Loss Analysis"
                                labels={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
                                data={[65, 59, 80, 81, 56]}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <HairChart
                                title="Hair Growth Cycle"
                                labels={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
                                data={[30, 45, 60, 70]}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Diet Plan */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-center mb-2">Tailored Diet Plan</h2>
                    <p className="text-center text-gray-600 mb-6">
                        Nourish Your Hair from Within
                    </p>

                    <Tabs defaultValue="veg" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="veg">For Vegetarians</TabsTrigger>
                            <TabsTrigger value="nonveg">For Non Vegetarians</TabsTrigger>
                        </TabsList>
                        <TabsContent value="veg">
                            <div className="bg-[#1E2A4A] rounded-3xl p-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <MealCard
                                        image="/placeholder.svg?height=96&width=96"
                                        title="Breakfast"
                                        description="Spinach smoothie with chia seeds and almonds"
                                    />
                                    <MealCard
                                        image="/placeholder.svg?height=96&width=96"
                                        title="Lunch"
                                        description="Lentil soup with quinoa salad"
                                    />
                                    <MealCard
                                        image="/placeholder.svg?height=96&width=96"
                                        title="Dinner"
                                        description="Paneer with whole-grain roti and a side of almonds"
                                    />
                                    <MealCard
                                        image="/placeholder.svg?height=96&width=96"
                                        title="Snacks"
                                        description="Pumpkin seeds, walnuts, or trail bowl"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="nonveg">
                            <div className="bg-[#1E2A4A] rounded-3xl p-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <MealCard
                                        image="/placeholder.svg?height=96&width=96"
                                        title="Breakfast"
                                        description="Boiled eggs with avocado toast"
                                    />
                                    <MealCard
                                        image="/placeholder.svg?height=96&width=96"
                                        title="Lunch"
                                        description="Grilled chicken with brown rice and sautéed greens"
                                    />
                                    <MealCard
                                        image="/placeholder.svg?height=96&width=96"
                                        title="Dinner"
                                        description="Salmon with sweet potatoes and asparagus"
                                    />
                                    <MealCard
                                        image="/placeholder.svg?height=96&width=96"
                                        title="Snacks"
                                        description="Greek yogurt with honey and nuts"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </section>

                {/* Lifestyle Changes */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-center mb-2">
                        Lifestyle Changes for Healthy Hair
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Small Habits, Big Impact
                    </p>

                    <div className="bg-[#1E2A4A] rounded-3xl p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <LifestyleCard
                                icon={Droplets}
                                title="Stay Hydrated"
                                description="Drink at least 2-3 liters of water daily"
                            />
                            <LifestyleCard
                                icon={Sparkles}
                                title="Stress Management"
                                description="Practice yoga, meditation, and deep breathing"
                            />
                            <LifestyleCard
                                icon={Moon}
                                title="Sleep Routine"
                                description="Ensure 7-8 hours of quality sleep"
                            />
                            <LifestyleCard
                                icon={Zap}
                                title="Avoid Heat Styling"
                                description="Minimize the use of heat styling tools"
                            />
                        </div>
                    </div>
                </section>

                {/* Product Recommendations */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-center mb-2">
                        Recommended Hair Care Products
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Personalized Products for Your Hair Type
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <ProductCard
                            image="/placeholder.svg?height=200&width=200"
                            title="Shampoos"
                            description={[
                                "Protein and Biotin-rich formulation",
                                "Keratin Spray cleanses without stripping natural oils"
                            ]}
                        />
                        <ProductCard
                            image="/placeholder.svg?height=200&width=200"
                            title="Hair Oils"
                            description={[
                                "Natural blend of essential oils",
                                "Regular Eugenics shine gel provides deep nourishment"
                            ]}
                        />
                    </div>
                </section>

                {/* FAQs */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-center mb-8">FAQs</h2>
                    <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is Mr. Mard?</AccordionTrigger>
                            <AccordionContent>
                                Mr. Mard is an AI-powered hair analysis and recommendation platform.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How does Mr. Mard work?</AccordionTrigger>
                            <AccordionContent>
                                We use advanced AI technology to analyze your hair health and provide personalized recommendations.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Do you store images of your faces?</AccordionTrigger>
                            <AccordionContent>
                                We prioritize your privacy and security in handling all data.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

                <div className="text-center">
                    <Button className="bg-[#1E2A4A] hover:bg-[#2A3B66]">
                        Buy Now
                    </Button>
                </div>
            </main>

        </div>
    )
}

