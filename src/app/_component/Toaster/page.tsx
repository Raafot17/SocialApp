'use client'

import { Toaster } from 'sonner' // أو react-hot-toast أو غيره

export default function ToasterProvider() {
  return <Toaster position="top-center" richColors />
}
