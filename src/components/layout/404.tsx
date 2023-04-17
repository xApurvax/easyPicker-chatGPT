/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const NotFound = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-primary">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <h2 className="bg-secondaryYellow px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </h2>
      <button className="mt-5">
        <a
          href="#"
          className="relative inline-block text-sm font-medium text-secondary bg-secondary Yellow group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-secondaryYellow group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <a href="/">Go Home</a>
          </span>
        </a>
      </button>
    </main>
  )
}

export default NotFound
