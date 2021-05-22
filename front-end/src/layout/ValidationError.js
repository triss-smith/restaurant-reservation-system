import React from "react";

function ValidationError({errors, setErrors}) {

    if(errors){ 
        const errorMap = errors.map((element,index) => {
            return (<div key={index} className="alert alert-danger">
                <p>{element}</p>
            </div>)
        })
       /* function timeOutDiv() {
            setErrors([])
        }
       setTimeout(timeOutDiv, 10000)*/
   return (<div id="reservation_error">{errorMap}</div>)
    }
    return null
}

export default ValidationError;