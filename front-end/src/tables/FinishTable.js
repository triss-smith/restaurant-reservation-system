import React from "react";
import { finishTable } from "../utils/api";

function FinishTable({ table, occupied, loadTables, loadDashboard }) {

  function freeTable() {
      const confirm = window.confirm("Is this table ready to seat new guests?")
      if(confirm) {
      finishTable(table.table_id, table.reservation_id).then(loadTables).then(loadDashboard).catch(console.log("failed"));
      }
  }

  return (
    
      
          <button
              className={`btn btn-danger w-100 align-self-center ${
                occupied ? "" : "invisible"
              }`}
              data-table-id-finish={table.table_id}            
              onClick={freeTable}
            >
              Finish
            </button>
    
    
  );
}

export default FinishTable;
