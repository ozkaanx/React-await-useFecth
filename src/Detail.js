import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "./utils/request";

function Detail() {
  let { charId } = useParams();
  const [charDetail, setCharDetail] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchData(charId);
      response && setCharDetail(response);
    })();
  }, [charId]);

  return (
    <div>
      <h1>{charDetail.name}</h1>
    </div>
  );
}

export default Detail;
