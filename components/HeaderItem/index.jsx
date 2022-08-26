import React from 'react'

function HeaderItem({ title, Icon }) {
  return (
    <div className="group flex flex-col items-center cursor-pointer w-12 hover:text-white">
      <Icon className="h-8 mb-1 group-hover:animate-bounce group-hover:text-red-600" />
      <p className="opacity-0 group-hover:opacity-100 tracking-widest uppercase group-hover:font-semibold">
        {title}
      </p>
    </div>
  )
}

export default HeaderItem
