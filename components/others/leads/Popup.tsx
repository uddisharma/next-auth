'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { SubscriptionForm } from './Form'

export function SubscriptionPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasClosedPopup = localStorage.getItem('popupClosed') === 'true'
    if (!hasClosedPopup) {
      const timer = setTimeout(() => setIsOpen(true), 5000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('popupClosed', 'true')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <SubscriptionForm setIsOpen={setIsOpen}/>
      </div>
    </div>
  )
}
