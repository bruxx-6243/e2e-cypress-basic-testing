import { useState, Suspense } from "react";
import Loader from "./components/Loader";

type Data = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
};

export default function App() {
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    const request = await fetch(`http://localhost:3000/?page=${page}&limit=10`);
    const response = await request.json();
    setLoading(false);
    return await response.data;
  };

  const handleInitialFetchData = async () => {
    if (!dataFetched) {
      const newData = await fetchData(page);
      setData(newData);
      setPage((prevPage) => prevPage + 1);
      setDataFetched(true);
    }
  };

  const handleFetchMoreData = async () => {
    const newData = await fetchData(page);
    setData((prevData) => [...prevData, ...newData]);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div
      style={{
        paddingBlock: "3rem",
      }}
    >
      {!dataFetched && (
        <button
          style={{
            display: "flex",
            alignItems: "centre",
            justifyContent: "center",
            marginInline: "auto",
            minWidth: "200px",
          }}
          data-testid="fetch-data-button"
          onClick={handleInitialFetchData}
          disabled={loading || dataFetched}
        >
          {loading ? <Loader /> : "Fetch Data"}
        </button>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <ul
          data-testid="data-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            listStyle: "none",
          }}
        >
          {data.map((item) => (
            <li
              style={{
                flexShrink: 0,
                padding: "1rem",
                border: "1px solid #555",
                borderRadius: "1rem",
                flex: "0 0 300px",
              }}
              data-testid="data-item"
              key={item.id}
            >
              <div>
                <h2>
                  {item.last_name.slice(0, 1)} - {item.first_name}
                </h2>
                <p>Gender: {item.gender}</p>
                <p>Email: {item.email}</p>
                <code>IP: {item.ip_address}</code>
              </div>
            </li>
          ))}
        </ul>
      </Suspense>

      {dataFetched && (
        <button
          style={{
            display: "flex",
            alignItems: "centre",
            justifyContent: "center",
            marginInline: "auto",
            minWidth: "200px",
          }}
          data-testid="more-data-button"
          onClick={handleFetchMoreData}
          disabled={loading}
        >
          {loading ? <Loader /> : "More"}
        </button>
      )}
    </div>
  );
}
