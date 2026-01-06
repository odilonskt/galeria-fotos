import { Footer } from "../components/Footer/page";
import Header from "../components/Header/page";
import PokemonList from "../components/PokemonList/page";
import { getPokemonList } from "../services/pokeapi";

export default async function Home() {
  const data = await getPokemonList(20);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <PokemonList pokemons={data.results} />
      </main>
      <Footer />
    </div>
  );
}
