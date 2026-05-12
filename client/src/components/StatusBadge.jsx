import React from "react";

function StatusBadge({ status }) {
  const statusStyles = {
    pending: "bg-yellow-500/20 text-yellow-600 border-yellow-600/30",
    progress: "bg-blue-600/20 text-blue-400 border-blue-600/30",
    completed: "bg-green-500/20 text-green-600 border-green-600/30",
  };

  return (
    <p
      className={`border px-2 py-1 rounded-full text-xs font-medium ${
        statusStyles[status?.toLowerCase()] || ""
      }`}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase()}
    </p>
  );
}

export default StatusBadge;
