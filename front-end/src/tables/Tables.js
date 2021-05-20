import React from 'react';

function Tables({tables}) {
    const tablesMap = tables.map((table,index) => {
        let occupied = false;
        if(table.reservation_id != null) {
            occupied = true;
        }

       return (
            <div key={index}>
               
                <div className="card m-2 pb-3 text-white bg-dark card-width align-self-center col-lg-5" key={index}>
          <div className="card-body">
            
            <h5 className="card-title text-center">{table.table_name}</h5>
            <p className="card-text text-center">{table.capacity}</p>
            <p className="card-text text-center" data-table-id-status={table.table_id}>{occupied ? "Occupied" : "Free"}</p>
          </div>
          
        </div>
            </div>
        )
    })
    return (
        <div>
            {tablesMap}
        </div>
    );
}

export default Tables;