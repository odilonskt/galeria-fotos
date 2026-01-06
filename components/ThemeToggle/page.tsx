"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialize = () => {
      setMounted(true);
    };
    initialize();
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Alternar tema"
        className="
          p-2 rounded-lg
          border border-gray-300
          bg-gray-100
          w-10 h-10
          animate-pulse
        "
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  // Usar resolvedTheme para obter o tema real
  const currentTheme = resolvedTheme || theme;

  return (
    <button
      aria-label="Alternar tema"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="
        p-2 rounded-lg
        border border-gray-300 dark:border-gray-600
        hover:bg-gray-100 dark:hover:bg-gray-800
        bg-white dark:bg-gray-900
        text-gray-700 dark:text-gray-300
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
      "
    >
      {currentTheme === "dark" ? (
        <FiSun className="w-5 h-5" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </button>
  );
}
