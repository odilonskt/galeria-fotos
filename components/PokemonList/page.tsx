"use client";

import { useMemo, useState } from "react";
import CardPhoto from "../CardPhoto/page";
import SearchInput from "../SearchInput/page";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemons: PokemonListItem[];
}

export default function PokemonList({ pokemons }: PokemonListProps) {
  const [search, setSearch] = useState("");

  const filteredPokemons = useMemo(() => {
    const query = search.toLowerCase();
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query)
    );
  }, [search, pokemons]);

  const suggestions = useMemo(() => {
    if (!search) return [];
    return filteredPokemons.slice(0, 5).map((p) => p.name);
  }, [filteredPokemons, search]);

  return (
    <section aria-labelledby="section-title" className="w-full">
      <div className="flex justify-center mb-6 md:mb-8 px-4">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
          <SearchInput
            value={search}
            onChange={setSearch}
            suggestions={suggestions}
          />
        </div>
      </div>

      <div className="flex justify-center px-4">
        {filteredPokemons.length > 0 ? (
          <ul
            className="
              grid grid-cols-2 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              xl:grid-cols-5
              gap-3 sm:gap-4 md:gap-5 lg:gap-6
              w-full max-w-7xl
            "
          >
            {filteredPokemons.map((pokemon) => {
              const id = pokemon.url.split("/").at(-2);

              return (
                <li key={pokemon.name} className="w-full">
                  <CardPhoto
                    name={pokemon.name}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-8 md:py-12 px-4">
            <p
              role="status"
              aria-live="polite"
              className="
                text-gray-600 dark:text-gray-400
                text-lg md:text-xl font-medium
                mb-2
              "
            >
              Nenhum Pokémon encontrado.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm md:text-base">
              Tente buscar por outro nome
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
