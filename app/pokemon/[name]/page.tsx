/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPokemon } from "@/services/pokeapi";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiHome } from "react-icons/fi";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function PokemonPage({ params }: PageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  if (!pokemon) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Botão de voltar para home */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <Link
          href="/"
          className="
            inline-flex items-center gap-2
            px-3 py-2 sm:px-4 sm:py-2
            rounded-lg
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-700
            border border-gray-300 dark:border-gray-700
            shadow-sm
            transition-all duration-200
            hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            dark:focus:ring-offset-gray-900
            group
            text-sm sm:text-base
          "
          aria-label="Voltar para a galeria de Pokémon"
        >
          <FiArrowLeft
            className="
              w-4 h-4 sm:w-5 sm:h-5
              group-hover:-translate-x-1
              transition-transform duration-200
            "
          />
          <span className="font-medium">Voltar para Galeria</span>
        </Link>
      </div>

      <article
        aria-labelledby="pokemon-name"
        className="
          container mx-auto
          bg-white dark:bg-gray-800
          rounded-2xl shadow-xl
          p-4 sm:p-6 md:p-8
          mb-6
        "
      >
        <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-8">
          {/* Imagem do Pokémon */}
          <div
            className="
            flex-shrink-0
            bg-gradient-to-br from-blue-50 to-gray-100
            dark:from-gray-700 dark:to-gray-900
            rounded-2xl p-4 sm:p-6
            shadow-inner
            w-full lg:w-auto
            mx-auto
            max-w-sm
          "
          >
            <div className="relative">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={`Sprite frontal do Pokémon ${pokemon.name}`}
                  fill
                  priority
                  className="
                    drop-shadow-lg
                    object-contain
                  "
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 288px"
                />
              </div>

              {/* Botão home flutuante (mobile) */}
              <Link
                href="/"
                className="
                  lg:hidden
                  absolute top-2 right-2
                  p-2
                  rounded-full
                  bg-white/90 dark:bg-gray-800/90
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  border border-gray-300 dark:border-gray-700
                  shadow-lg
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  z-10
                  backdrop-blur-sm
                "
                aria-label="Voltar para home"
              >
                <FiHome className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </div>
          </div>

          {/* Informações */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
              <div className="flex-1 min-w-0">
                <h1
                  id="pokemon-name"
                  className="
                    text-2xl sm:text-3xl md:text-4xl font-bold capitalize
                    text-gray-900 dark:text-white
                    break-words
                  "
                >
                  {pokemon.name}
                </h1>

                <div
                  className="
                  inline-block px-3 py-1 mt-2
                  bg-blue-100 dark:bg-blue-900
                  text-blue-800 dark:text-blue-200
                  rounded-full text-sm font-medium
                "
                >
                  #{pokemon.id.toString().padStart(3, "0")}
                </div>
              </div>

              {/* Botão home desktop */}
              <Link
                href="/"
                className="
                  hidden lg:flex
                  items-center gap-2
                  px-4 py-2
                  rounded-lg
                  bg-gray-100 dark:bg-gray-700
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-200 dark:hover:bg-gray-600
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  shrink-0
                  self-start
                "
                aria-label="Voltar para galeria"
              >
                <FiHome className="w-4 h-4" />
                <span className="text-sm font-medium">Galeria</span>
              </Link>
            </div>

            <section className="mt-6 md:mt-8">
              <h2 className="sr-only">Informações do Pokémon</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div
                  className="
                  p-4 rounded-xl
                  bg-gray-50 dark:bg-gray-700
                "
                >
                  <h3
                    className="
                    text-xs sm:text-sm font-semibold uppercase
                    text-gray-500 dark:text-gray-400
                    mb-2
                  "
                  >
                    Características
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        ID:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white text-sm md:text-base">
                        {pokemon.id}
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Altura:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white text-sm md:text-base">
                        {pokemon.height / 10}m
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Peso:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white text-sm md:text-base">
                        {pokemon.weight / 10}kg
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Tipos do Pokémon */}
                <div
                  className="
                  p-4 rounded-xl
                  bg-gray-50 dark:bg-gray-700
                "
                >
                  <h3
                    className="
                    text-xs sm:text-sm font-semibold uppercase
                    text-gray-500 dark:text-gray-400
                    mb-2
                  "
                  >
                    Tipos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.types.map((typeInfo: any) => (
                      <span
                        key={typeInfo.type.name}
                        className="
                          px-3 py-1
                          rounded-full text-xs sm:text-sm font-medium
                          bg-gradient-to-r from-blue-500 to-blue-600
                          text-white
                          capitalize
                          shadow-sm
                        "
                      >
                        {typeInfo.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="mt-6 md:mt-8">
              <h3
                className="
                text-lg md:text-xl font-bold mb-4
                text-gray-900 dark:text-white
              "
              >
                Estatísticas
              </h3>
              <div className="space-y-3 md:space-y-4">
                {pokemon.stats.map((statInfo: any) => (
                  <div key={statInfo.stat.name} className="space-y-1">
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-700 dark:text-gray-300 capitalize">
                        {statInfo.stat.name.replace("-", " ")}:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {statInfo.base_stat}
                      </span>
                    </div>
                    <div
                      className="
                      h-2 md:h-3 rounded-full
                      bg-gray-200 dark:bg-gray-700
                      overflow-hidden
                    "
                    >
                      <div
                        className="
                          h-full rounded-full
                          bg-gradient-to-r from-blue-500 to-blue-600
                          transition-all duration-500
                        "
                        style={{
                          width: `${Math.min(statInfo.base_stat, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Botão de voltar no final da página (mobile) */}
            <div className="mt-8 lg:hidden">
              <Link
                href="/"
                className="
                  w-full
                  flex items-center justify-center gap-2
                  px-6 py-3
                  rounded-xl
                  bg-gradient-to-r from-blue-500 to-blue-600
                  text-white
                  hover:from-blue-600 hover:to-blue-700
                  shadow-lg hover:shadow-xl
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  font-medium
                  text-sm sm:text-base
                "
              >
                <FiArrowLeft className="w-5 h-5" />
                Voltar para Galeria
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
