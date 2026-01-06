export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="
        mt-auto border-t
        bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-700
        text-gray-600 dark:text-gray-400
      "
    >
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm">
        <p className="text-center">
          © {currentYear} Galeria de Fotos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
