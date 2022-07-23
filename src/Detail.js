import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCharData } from "./utils/request";

function Detail() {
  let { charId } = useParams();
  const [charDetail, setCharDetail] = useState([]);

  useEffect(() => {
    (async () => {
      debugger;
      const response = await fetchCharData(charId);
      if (response) {
        setCharDetail(response);
      }
    })();
  }, []);

  return (
    <div>
      <h1>{charDetail.name}</h1>
    </div>
  );
}

export default Detail;
