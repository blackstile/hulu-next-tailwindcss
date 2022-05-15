import { useRouter } from 'next/router'
import React from 'react'
import requests from '../../utils/requests'

function Nav() {
  const router = useRouter()
  return (
    <nav className="relative">
      <div className="flex py-2 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide">
        {Object.entries(requests).map(([key, { title, url }]) => (
          <h2
            key={key}
            onClick={() => router.push(`/?genre=${key}`)}
            className="last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white active:text-red-500"
          >
            {title}
          </h2>
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-hulu h-12 w-1/5 sm:w-1/12" />
      <div className="absolute top-0 left-0 bg-gradient-to-r from-hulu h-12 w-1/5 sm:w-1/12" />
    </nav>
  )
}

export default Nav
