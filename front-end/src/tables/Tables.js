import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";
import FinishTable from "./FinishTable";

function Tables({ date, loadDashboard }) {
  const [tables, setTables] = useState([]);
   function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
   }
   useEffect(loadTables, []);
    const tablesMap = tables.map((table, index) => {
      let occupied = false;
  
      if (table.reservation_id != null) {
        
        occupied = true;
      }
      
  
      return (
        <div className="p-1 justify-content-center col-lg-5" key={index}>
        <div
          key={index}
          className={`card  text-white ${
            occupied ? " bg-dark" : "bg-success"
          }  align-self-center `}
        >
          <div className="card-body">
            <h5 className="card-title text-center">{table.table_name}</h5>
            <h4 className="card-text text-center">Capacity: {table.capacity}</h4>
            <h4
              className="card-text text-center"
              data-table-id-status={table.table_id}
            >
              {occupied ? "occupied" : "free"}
            </h4>
          </div>
          <div className="text-center w-100">
            <FinishTable table={table} occupied={occupied} setTables={setTables} loadTables={loadTables} loadDashboard={loadDashboard}/>
            
            
          </div>
        </div>
        </div>
      );
    });
  
  
  
  return (
      <div className="row mx-2 justify-content-center">{tablesMap}</div>
  );
}

export default Tables;
