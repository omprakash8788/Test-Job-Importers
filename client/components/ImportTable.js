const ImportTable = ({ logs }) => {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-md">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">ImportDateTime</th>
            <th className="p-2">Total</th>
            <th className="p-2">New</th>
            <th className="p-2">Updated</th>
            <th className="p-2">Failed</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td className="p-2 text-center" colSpan="5">
                No logs found
              </td>
            </tr>
          ) : (
            logs.map((log, index) => (
              <tr key={index} className="border-t">
                {/* <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td> */}
                <td className="p-2">
                  {new Date(log.timestamp).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </td>
                <td className="p-2">{log.totalFetched}</td>
                <td className="p-2 text-green-700">{log.newJobs}</td>
                <td className="p-2 text-yellow-700">{log.updatedJobs}</td>
                <td className="p-2 text-red-600">{log.failedJobs}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ImportTable;
