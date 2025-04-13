import UserPage from '@/component/userpage'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "DevFinder",
    description:
      "Learn about Silkroutex's mission to simplify logistics and innovate global supply chains in the freight industry.",
  };


function page() {
  return (
    <div>
        <UserPage />
    </div>
  )
}

export default page