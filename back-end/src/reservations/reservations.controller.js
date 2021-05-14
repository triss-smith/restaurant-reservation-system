/**
 * List handler for reservation resources
 */
const service = require("./reservations.service")
async function list(req, res) {
  const response = await service.list();
  res.json({
    data: response,
  });
}
async function create(req,res,next) {
  const response = await service.create(req.body.data)
  res.json({data:response})
}
module.exports = {
  list,
  create,
};
