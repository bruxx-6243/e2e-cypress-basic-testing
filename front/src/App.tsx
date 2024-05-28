import { useState, Suspense } from "react";

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
    return response.data;
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
    <div>
      <button
        onClick={handleInitialFetchData}
        disabled={loading || dataFetched}
      >
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      <Suspense fallback={<div>Loading...</div>}>
        <div>
          {data.map((item) => (
            <p key={item.id}>
              {item.first_name} - {item.last_name}
            </p>
          ))}
        </div>
      </Suspense>

      {dataFetched && (
        <button onClick={handleFetchMoreData} disabled={loading}>
          {loading ? "Loading more..." : "More"}
        </button>
      )}
    </div>
  );
}
