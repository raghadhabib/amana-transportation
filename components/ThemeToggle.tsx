"use client";

import { useThemeContext } from '@/context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa'; // Icons for the toggle

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeContext();

    // Determine the icon to show and the label for accessibility
    const isDark = theme === 'dark';
    const Icon = isDark ? FaSun : FaMoon;
    const label = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-white bg-gray-700 hover:bg-gray-600 transition-colors"
            aria-label={label}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
}