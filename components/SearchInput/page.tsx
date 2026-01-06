"use client";

import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  suggestions,
  placeholder = "Buscar Pokémon pelo nome",
}: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Fecha ao clicar fora */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Teclado */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && suggestions.length > 0) {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((prev) =>
        prev === null || prev === suggestions.length - 1 ? 0 : prev + 1
      );
    }

    if (e.key === "ArrowUp" && suggestions.length > 0) {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev === null || prev === 0 ? suggestions.length - 1 : prev - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (activeIndex !== null) {
        const selected = suggestions[activeIndex];
        onChange(selected);
        onSearch?.(selected);
      } else if (value.trim()) {
        onSearch?.(value.trim());
      }

      setIsOpen(false);
      setActiveIndex(null);
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(null);
    }
  };

  const handleSearchClick = () => {
    if (!value.trim()) return;
    onSearch?.(value.trim());
    setIsOpen(false);
    setActiveIndex(null);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative max-w-md w-full">
      <label htmlFor="search" className="sr-only">
        Buscar Pokémon
      </label>

      <div className="relative flex items-center">
        <input
          ref={inputRef}
          id="search"
          type="text"
          role="combobox"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setActiveIndex(null);
          }}
          onFocus={() => value && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="
            w-full pl-10 pr-12 py-3
            rounded-lg border
            bg-white dark:bg-gray-800
            border-gray-300 dark:border-gray-700
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2
            focus:ring-blue-500 dark:focus:ring-blue-600
            focus:border-transparent
            transition-colors duration-200
          "
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          aria-expanded={isOpen && suggestions.length > 0} // ADICIONE ESTA LINHA
          aria-activedescendant={
            activeIndex !== null ? `option-${activeIndex}` : undefined
          }
          aria-label="Buscar Pokémon"
          aria-haspopup="listbox"
        />

        {/* Botão de busca */}
        <button
          type="button"
          onClick={handleSearchClick}
          disabled={!value.trim()}
          aria-label="Pesquisar Pokémon"
          title="Pesquisar Pokémon"
          className={`
            absolute right-2
            p-2 rounded-md
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-blue-500 dark:focus:ring-blue-600
            dark:focus:ring-offset-gray-800
            ${
              value.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }
          `}
        >
          <FiSearch size={18} />
        </button>
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          id="autocomplete-list"
          role="listbox"
          aria-label="Sugestões de Pokémon"
          className="
            absolute z-10 mt-2 w-full
            rounded-lg shadow-lg overflow-hidden
            bg-white dark:bg-gray-800
            border border-gray-300 dark:border-gray-700
            max-h-60 overflow-auto
          "
        >
          {suggestions.map((name, index) => (
            <li
              key={name}
              id={`option-${index}`}
              role="option"
              aria-selected={activeIndex === index}
              className={`
                px-4 py-3 cursor-pointer capitalize
                border-b border-gray-100 dark:border-gray-700
                last:border-b-0
                text-gray-900 dark:text-gray-100
                transition-colors duration-150
                ${
                  activeIndex === index
                    ? "bg-blue-100 dark:bg-blue-900 font-medium"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(name);
                onSearch?.(name);
                setIsOpen(false);
                setActiveIndex(null);
                inputRef.current?.focus();
              }}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
