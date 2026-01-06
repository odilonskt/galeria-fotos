export default function Header() {
  return (
    <header
      role="banner"
      className="
        w-full border-b
        bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-700
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          px-4 py-4
          flex items-center justify-center gap-4
        "
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
          Galeria de Fotos
        </h1>
      </div>
    </header>
  );
}
