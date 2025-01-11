// 'use client'

// import { useState } from 'react'
// import { submitContactForm } from '@/actions/contacts'
// import { toast } from 'sonner'

// export default function ContactPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [data, setData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   })
//   const [submitMessage, setSubmitMessage] = useState('')

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     setIsSubmitting(true)
//     setSubmitMessage('')
//     try {
//       await submitContactForm(data)
//       setSubmitMessage('Thank you for your submission!')
//       setData({
//         name: '',
//         email: '',
//         message: ''
//       })
//     } catch (error) {
//       setSubmitMessage('An error occurred. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setData({
//       ...data,
//       [event.target.name]: event.target.value
//     })
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

//       <form onSubmit={handleSubmit} className="mb-8">
//         <div className="mb-4">
//           <label htmlFor="name" className="block mb-2">Name</label>
//           <input type="text" id="name" name="name" required className="w-full p-2 border rounded" onChange={handleChange} />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block mb-2">Email</label>
//           <input type="email" id="email" name="email" required className="w-full p-2 border rounded" onChange={handleChange} />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="message" className="block mb-2">Message</label>
//           <textarea id="message" name="message" required className="w-full p-2 border rounded" onChange={handleChange} />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? 'Submitting...' : 'Submit'}
//         </button>
//       </form>

//       {submitMessage && (
//         <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
//           {submitMessage}
//         </div>
//       )}
//     </div>
//   )
// }


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen px-24">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 mb-20">
        <div className="text-center mb-6">
          <h1 className="text-4xl text-btnblue mb-4">Contact Us</h1>
          <p className="text-[#717171]">Any question or remarks? Just write us a message !</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 bg-white p-5">
          {/* Contact Information */}
          <div className="bg-[#011C2B] text-white p-8 rounded-lg">
            <h2 className="text-2xl mb-6">Contact Information</h2>
            <p className="text-gray-300 mb-8">Say something to start a live chat!</p>

            <div className="space-y-12 mt-32">
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5" />
                <span>+910000000000</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5" />
                <span>mrmard11233@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5" />
                <span>Bengaluru, India</span>
              </div>
            </div>

            <div className="flex gap-4 mt-40">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20">
                <span className="sr-only">Facebook</span>
                <div className="w-6 h-6 bg-yellow rounded-full" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20">
                <span className="sr-only">Instagram</span>
                <div className="w-6 h-6 bg-white rounded-full" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20">
                <span className="sr-only">Twitter</span>
                <div className="w-6 h-6 bg-yellow rounded-full" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6 pt-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="First Name" className="border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-[#1a2642] px-0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Last Name" className="border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-[#1a2642] px-0" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Email" className="border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-[#1a2642] px-0" />
              </div>
              <div className="space-y-5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 012 3456 789" className="border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-[#1a2642] px-0" />
              </div>
            </div>

            <div className="space-y-5">
              <Label>Select Subject?</Label>
              <RadioGroup defaultValue="general1" className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general1" id="general1" />
                  <Label htmlFor="general1">General Inquiry</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general2" id="general2" />
                  <Label htmlFor="general2">General Inquiry</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general3" id="general3" />
                  <Label htmlFor="general3">General Inquiry</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general4" id="general4" />
                  <Label htmlFor="general4">General Inquiry</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write your message.."
                className="min-h-[120px] border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-[#1a2642] px-0"
              />
            </div>
            <div className="flex items-end justify-end">
              <Button className="w-full md:w-auto bg-btnblue text-white mt-10 ">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}


