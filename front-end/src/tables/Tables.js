import React from "react";

function Tables({ tables }) {
  const tablesMap = tables.map((table, index) => {
    let occupied = false;
    if (table.reservation_id != null) {
      occupied = true;
    }

    return (
      <div
        key={index}
        className={`card m-1 pb-3 text-white ${occupied ? " bg-dark" : "bg-success"}  card-width align-self-center col-lg-5`}
        
      >
        <div className="card-body">
          <h5 className="card-title text-center">{table.table_name}</h5>
          <h4 className="card-text text-center">Capacity: {table.capacity}</h4>
          <h4
            className="card-text text-center"
            data-table-id-status={table.table_id}
          >
            {occupied ? "Occupied" : "Free"}
          </h4>
        </div>
      </div>
    );
  });
  return (
    <div className="container d-flex-2">
      <div className="row justify-content-center">{tablesMap}</div>
    </div>
  );
}

export default Tables;
