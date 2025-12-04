import { useApi } from "../composables/useApi";

const { get } = useApi();

export async function getAnimeById(id) {
  // Petición directa al ID. Ejemplo: /anime/21
  const respuesta = await get(`/anime/${id}`);
  return respuesta.data.data;
}

export async function getTopAnime() {
  const respuesta = await get("/top/anime");
  return respuesta.data.data;
}

export async function getSeasonNow() {
  const respuesta = await get("/seasons/now");
  return respuesta.data.data;
}
