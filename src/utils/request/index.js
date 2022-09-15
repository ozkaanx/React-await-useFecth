import { Request } from "../useFetch";
import { awaitHandler } from "../awaitHandler";

const { get } = Request();

// const createParams = (params = {}) => {
//   let result = "";
//   for (let key in params) {
//     result += `&${key}=${params[key]}`;
//   }
//   return console.log(result);
// };

export const fetchData = async (charId) => {
  let endPoint = "https://rickandmortyapi.com/api/character";
  let id = charId ?? ``;
  try {
    const result = await awaitHandler(get(`${endPoint}/${id}`));
    if (result.err) {
      throw new Error(result.err.message);
    }
    return charId ? result?.res?.data : result?.res?.data?.results;
  } catch (error) {
    console.log("Unable to fetch datas");
    return false;
  }
};

// export const fetchCharData = async (charId) => {
//   try {
//     const result = await awaitHandler(
//       get(`https://rickandmortyapi.com/api/character/${charId}`)
//     );
//     if (result.err) {
//       throw new Error(result.err.message);
//     }
//     return result?.res?.data;
//   } catch (error) {
//     console.log("Unable to fetch datas");
//     return false;
//   }
// };
