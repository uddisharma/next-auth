import Link from 'next/link'
import { Check } from 'lucide-react'

export default function SuccessPage() {
  return (
    <main  className="flex justify-center items-center px-4 py-12 h-[85vh]">
      <div className="w-full max-w-md bg-white border border-btnblue rounded-lg p-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full border-[#C2CDE0] border-[7px] flex items-center justify-center mb-2">
            <Check className="w-10 h-10 text-btnblue" />
          </div>

          <h1 className="text-[32px] font-medium text-btnblue">
            Successfully
          </h1>

          <p className="text-gray-500 mb-6">
            Contact number verified
          </p>

          <button
            className="w-full bg-btnblue text-white py-3.5 rounded-lg hover:bg-btnblue transition-colors"
          >
            Continue Sign up
          </button>
        </div>
      </div>
    </main>
  )
}

