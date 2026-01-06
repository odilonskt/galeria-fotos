import Image from "next/image";
import Link from "next/link";

interface CardPhotoProps {
  name: string;
  image: string;
}

export default function CardPhoto({ name, image }: CardPhotoProps) {
  return (
    <article className="h-full group">
      <Link
        href={`/pokemon/${name}`}
        aria-label={`Ver detalhes do Pokémon ${name}`}
        className="
          block h-full
          rounded-xl shadow-lg
          bg-white dark:bg-gray-800
          border-2 border-gray-200 dark:border-gray-700
          hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20
          hover:border-blue-500 dark:hover:border-blue-600
          hover:scale-[1.02] active:scale-[0.98]
          transition-all duration-300 ease-out
          overflow-hidden
          focus:outline-none focus:ring-3 focus:ring-blue-500
          focus:ring-offset-2 dark:focus:ring-offset-gray-900
        "
      >
        <div className="p-3 sm:p-4 flex flex-col items-center h-full">
          <div
            className="
            w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40
            flex items-center justify-center
            bg-gradient-to-br from-gray-50 to-gray-100
            dark:from-gray-700 dark:to-gray-900
            rounded-2xl
            mb-3 sm:mb-4
            p-2
            group-hover:from-blue-50 group-hover:to-blue-100
            dark:group-hover:from-blue-900/30 dark:group-hover:to-blue-800/30
            transition-all duration-300
            flex-shrink-0
          "
          >
            <Image
              src={image}
              alt={`Imagem do Pokémon ${name}`}
              width={120}
              height={120}
              className="
                object-contain
                drop-shadow-lg
                group-hover:scale-105
                transition-transform duration-300
                w-auto h-auto
                max-w-full max-h-full
              "
              priority={false}
              sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
            />
          </div>

          <div
            className="
            font-bold capitalize 
            text-base sm:text-lg
            text-gray-900 dark:text-white
            text-center
            px-3 sm:px-4 py-2
            rounded-lg
            bg-gradient-to-r from-transparent via-gray-50 to-transparent
            dark:from-transparent dark:via-gray-800 dark:to-transparent
            w-full
            group-hover:text-blue-600 dark:group-hover:text-blue-400
            transition-colors duration-300
            mt-auto
          "
          >
            {name}
          </div>

          <div
            className="
            mt-2 sm:mt-3 text-xs sm:text-sm font-medium
            text-blue-600 dark:text-blue-400
            opacity-0 group-hover:opacity-100
            transform translate-y-2 group-hover:translate-y-0
            transition-all duration-300
            flex items-center gap-1
          "
          >
            <span>Ver detalhes</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
