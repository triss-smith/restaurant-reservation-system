/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasCorrectData = (req,res,next) => {
  const data = req.body.data;
  if(data.first_name 
    && data.last_name
    && data.mobile_number
    && data.reservation_date
    && data.reservation_time
    && data.people ) {
      return next()
    }
}

async function list(req, res) {
  console.log(req.query.date, req.query,  "query statement");
  
  const response = await service.list(req.query.date);
  res.json({
    data: response,
  });
}
async function create(req,res,next) {
  const response = await service.create(req.body.data)
  res.json({data:response})
}
module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasCorrectData, asyncErrorBoundary(create)]
};
