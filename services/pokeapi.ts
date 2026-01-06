const BASE_URL = "https://pokeapi.co/api/v2";

// Classe de erro personalizada
export class PokemonApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public pokemonName?: string
  ) {
    super(message);
    this.name = "PokemonApiError";
  }
}

export async function getPokemon(name: string) {
  const res = await fetch(`${BASE_URL}/pokemon/${name}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null; // Retorna null em vez de throw
    }

    const errorMessages: Record<number, string> = {
      400: "Requisição inválida",
      429: "Limite de requisições excedido",
      500: "Erro interno do servidor",
      502: "Bad Gateway",
      503: "Serviço indisponível",
      504: "Timeout do gateway",
    };

    const message =
      errorMessages[res.status] || `Erro ${res.status}: Falha na requisição`;
    throw new Error(message);
  }

  return res.json();
}

export async function getPokemonList(limit = 20) {
  // Validação simples
  if (limit < 1) limit = 20;
  if (limit > 100) limit = 100;

  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorMessages: Record<number, string> = {
      400: "Parâmetros inválidos na busca",
      404: "Não foi possível encontrar a lista de Pokémon",
      429: "Muitas requisições. Aguarde um momento.",
      500: "Problema no servidor. Tente novamente mais tarde.",
    };

    const message =
      errorMessages[res.status] ||
      `Erro ${res.status}: Falha ao carregar lista`;
    throw new PokemonApiError(message, res.status);
  }

  return res.json();
}
