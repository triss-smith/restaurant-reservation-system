import React, { useState, useEffect } from 'react';
import {listTables, seatTable} from "../utils/api"
import { useParams, useHistory } from "react-router-dom"

function SeatTable() {
    const { reservationId } = useParams();
    const [tables, setTables] = useState([]);
    const [tableError, setTableError] = useState([]);
    const [tableForSeating, setTableForSeating] = useState({});
    const history = useHistory();
    function loadSeating() {
        setTableError(null)
        const abortController = new AbortController();
        listTables(abortController.signal)
        .then(setTables)
        .catch(setTableError);
    }
    useEffect(loadSeating, [])
    const tablesMap = tables.map((table, index) => {
        let occupied = false;
        if (table.reservation_id != null) {
          occupied = true;
        }   
        if(occupied === false) {
        return (          
            <option key={index} value={table.table_id}>{table.table_name} - {table.capacity}</option>
        );
        }
      });
      function handleChange({target}) {
          const tableId = target.value;
          const table = tables.find(table => table.table_id == tableId)
          setTableForSeating({...table, reservation_id: reservationId});
      }

       function submitHandler(event) {
          event.preventDefault();
            
            seatTable(tableForSeating.table_id,reservationId)
            .then(() => {
                console.log("seated");
                history.push("/dashboard")})
                //history.push("/dashboard"))
      }
    return (
        <div>

             <form onSubmit={submitHandler}>
            <select name="table_id" className="custom-select custom-select-lg mb-3" onChange={handleChange} >
            
            {tablesMap}
            </select>
            <button type="submit" className="btn btn-primary">submit</button>
            </form>
        </div>
    );
}

export default SeatTable;