import { Request } from "../useFetch";
import { awaitHandler } from "../awaitHandler";

const { get } = Request();
export const fetchData = async () => {
  try {
    const result = await awaitHandler(
      get(`https://rickandmortyapi.com/api/character`)
    );
    if (result.err) {
      throw new Error(result.err.message);
    }
    return result?.res?.data?.results;
  } catch (error) {
    console.log("Unable to fetch datas");
    return false;
  }
};

export const fetchCharData = async (charId) => {
  try {
    const result = await awaitHandler(
      get(`https://rickandmortyapi.com/api/character/${charId}`)
    );
    if (result.err) {
      throw new Error(result.err.message);
    }
    return result?.res?.data;
  } catch (error) {
    console.log("Unable to fetch datas");
    return false;
  }
};
