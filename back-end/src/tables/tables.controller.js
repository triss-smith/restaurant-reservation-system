const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req,res,next) {
    const response = await service.list();
    const sortedResponse = response.sort(function(a, b){
        if(a.table_name < b.table_name) { return -1; }
        if(a.table_name > b.table_name) { return 1; }
        return 0;
    })
    res.json({data: sortedResponse})
}

module.exports = {
    list: asyncErrorBoundary(list),
}