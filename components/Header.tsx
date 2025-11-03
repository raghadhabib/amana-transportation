import { AiOutlineMenu } from "react-icons/ai";
import ThemeToggle from "./ThemeToggle"; // 🚨 NEW: Import the toggle component

export default function Header() {
  return (
    <header className="w-full">
      {/* 1. Dark Navbar Section (Logo, Menu & Theme Toggle) */}
      <nav className="flex justify-between items-center h-14 bg-gray-900 text-white px-4 sm:px-8">
        {/* Logo */}
        <div className="text-xl font-bold tracking-widest">
          Amana Logo
        </div>
        
        {/* 🚨 NEW: Container for Menu and Toggle */}
        <div className="flex items-center space-x-4"> 
          {/* Theme Toggle */}
          <ThemeToggle /> 

          {/* Hamburger Menu (Placeholder) */}
          <button 
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            aria-label="Menu"
          >
            <AiOutlineMenu className="w-6 h-6" /> 
          </button>
        </div>
      </nav>

      {/* 2. Green Title Banner Section */}
      <div className="bg-green-400 text-white p-4 sm:p-6 text-center shadow-lg ">
        <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
          Amana Transportation
        </h1>
        <p className="mt-1 text-sm font-medium text-black sm:text-base">
          Proudly Servicing Malaysian Bus Riders Since 2019!
        </p>
      </div>
    </header>
  );
}
