import { useEffect, useState } from 'react';
import API from '../utils/api';
import ImportTable from '../components/ImportTable';
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Home() {
  const [logs, setLogs] = useState([]);
  console.log(logs)
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchLogs = async (page) => {
    try {
      const res = await API.get(`/imports?page=${page}&limit=10`);
      setLogs(res.data.logs);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Error fetching logs:', err.message);
    }
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="p-6 font-sans max-w-4xl mx-auto mt-10 rounded bg-[#d4b9d9]">
      <ImportTable logs={logs} />

      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-200 px-4 py-1 cursor-pointer flex justify-between items-center gap-3 rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <FaArrowCircleLeft /> Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="bg-gray-200 flex justify-between items-center gap-3 px-4 py-1 cursor-pointer rounded disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next <FaArrowCircleRight />
        </button>
      </div>
    </div>
  );
}


// Final UI