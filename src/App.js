import { useEffect, useState } from "react";
import { fetchData } from "./utils/request";
import "./style.scss";
import { Link } from "react-router-dom";

export default function App() {
  const [isdata, setIsdata] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchData();
      response && setIsdata(response)
    })();
  }, []);

  return (
    <div className="list-box">
      {Array.isArray(isdata) &&
        isdata.map((item) => (
          <Link to={`detail/${item.id}`} key={item.id}>
            <div className="list-box-item">{item.name}</div>
          </Link>
        ))}
    </div>
  );
}
