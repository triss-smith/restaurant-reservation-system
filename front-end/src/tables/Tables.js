import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";
//import { finishTable } from "../utils/api";
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
        <div className="p-1 justify-content-center  col-lg-6" key={index}>
        <div
          key={table.table_id}
          className={`card  align text-white ${
            occupied ? "unique-color-dark" : "unique-color"
          }  align-self-center `}
        >
          <div className="card-body">
            <h5 className="card-title text-center white-text">{table.table_name}</h5>
            <h4 className="card-text text-center white-text">Capacity: {table.capacity}</h4>
            <h4
              className="card-text text-center white-text"
              data-table-id-status={table.table_id}
            >
              {occupied ? "occupied" : "free"}
            </h4>
          </div>
          <div className="text-center w-100 white-text py-3">
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
