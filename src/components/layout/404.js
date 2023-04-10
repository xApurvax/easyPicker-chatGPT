/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const NotFound = () => {
  return (
    <main class="h-screen w-full flex flex-col justify-center items-center bg-primary">
      <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <h2 class="bg-secondaryYellow px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </h2>
      <button class="mt-5">
        <a
          href="#"
          class="relative inline-block text-sm font-medium text-seconbg-secondaryYellow group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-secondaryYellow group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <a href="/">Go Home</a>
          </span>
        </a>
      </button>
    </main>
  )
}

export default NotFound
