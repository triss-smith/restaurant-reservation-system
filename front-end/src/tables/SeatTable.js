import React, { useState, useEffect } from 'react';
import { listTables, seatTable } from "../utils/api"
import { useParams, useHistory } from "react-router-dom"
import ValidationError from "../layout/ValidationError"


function SeatTable({date, setDate}) {
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
          return null;
        }   
        if(occupied === false) {
        return (          
            <option key={index} value={table.table_id}>{table.table_name} - {table.capacity}</option>
        );
        }
        else{return null}
      });
      function handleChange({target}) {
          const tableId = target.value;
          console.log(tableId)
          setTableForSeating({table_id: tableId});
      }

       function submitHandler(event) {
          event.preventDefault();
            console.log(tableForSeating)
            seatTable(tableForSeating.table_id,reservationId)
            .then(() => {
                setDate(date);
                history.push(`/dashboard?date=${date}`)
            })
                //history.push("/dashboard"))
            
      }
    return (
        <div className="py-3">
            <h1 className="display-4">Seat Reservation</h1>
            <ValidationError error={tableError} setError={setTableError} />
             <form onSubmit={submitHandler}>
            <select name="table_id" className="custom-select custom-select-lg mb-3" onChange={handleChange} >
            <option value=""></option>
            {tablesMap}
            </select>
            <button type="submit" className="btn btn-primary">submit</button>
            </form>
            
        </div>
    );
}

export default SeatTable;