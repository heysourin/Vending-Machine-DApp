import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Vending Machine Dapp</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-300 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3a3 3 0 013-3h14a3 3 0 013 3v1a3 3 0 01-3 3H3a3 3 0 01-3-3V3zm0 7a3 3 0 013-3h14a3 3 0 013 3v1a3 3 0 01-3 3H3a3 3 0 01-3-3v-1zm0 7a3 3 0 013-3h14a3 3 0 013 3v1a3 3 0 01-3 3H3a3 3 0 01-3-3v-1z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white"
          >
            Contact
          </Link>
        </div>
        <div>
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
