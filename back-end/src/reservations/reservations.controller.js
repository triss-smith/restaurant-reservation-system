/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moment = require("moment");
const formats = ["hh:mm AA", "hh:mm", "h:mm AA", "h:mm", "HH:mm"];
const hasData = (req, res, next) => {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "data" });
};

const hasCorrectData = (req, res, next) => {
  const data = req.body.data;
  const date = moment(data.reservation_date, "YYYY-MM-DD", true).isValid();
  const time = moment(data.reservation_time, formats, false).isValid();
  if (data === undefined) {
    return next({ status: 400, message: "data" });
  }
  if (!data.first_name || data.first_name == "") {
    return next({ status: 400, message: "first_name" });
  }
  if (!data.last_name || data.last_name == "") {
    return next({ status: 400, message: "last_name" });
  }
  if (!data.mobile_number || data.mobile_number == "") {
    return next({ status: 400, message: "mobile_number" });
  }
  if (!data.reservation_date || date == false) {
    return next({ status: 400, message: "reservation_date" });
  }
  if (!data.reservation_time || time == false) {
    return next({ status: 400, message: "reservation_time" });
  }
  if (
    !data.people ||
    data.people == 0 ||
    typeof data.people != "number"
  ) {
    return next({ status: 400, message: "people" });
  }
  console.log(data.people)
  next();
};
const dateIsNotInPast = (req, res, next) => {
  const todayDate = new Date();
  const requestDate = new Date(`${req.body.data.reservation_date}T00:00:00`);

  if (requestDate.setHours(0, 0, 0, 0) < todayDate.setHours(0, 0, 0, 0)) {
    return next({ status: 400, message: "future" });
  }
  res.locals.date = requestDate;
  next();
};
const dateisDateOpen = (req, res, next) => {
  if (res.locals.date.getDay() === 2) {
    return next({ status: 400, message: "closed" });
  }
  next();
};
const timeIsValid = (req, res, next) => {
  const openingTime = 1030;
    const closingTime = 2130;
    const reqDate = new Date(
      `${req.body.data.reservation_date} ${req.body.data.reservation_time}`
    );

    const reqDateAddable = reqDate.getHours() * 100 + reqDate.getMinutes();
    if (reqDateAddable < openingTime) {
      return next({status:400, message:"before opening time"})
      
    }
    if (reqDateAddable > closingTime) {
      return next({status:400, message:"after reservation cutoff"})
    }
    next();
};
async function list(req, res) {
  const response = await service.list(req.query.date);
  const sortedReservation = response.sort((a, b) =>
    a.reservation_time < b.reservation_time
      ? -1
      : a.reservation_time > b.reservation_time
      ? 1
      : 0
  );
  res.json({
    data: response,
  });
}
async function create(req, res, next) {
  try {
    const response = await service.create(req.body.data);
    res.status(201).json({ data: response });
  } catch (error) {
    console.log(error);
    next({ status: 400, message: { error } });
  }
}
async function read(req,res,next) {
  try {
    const response = await service.read(req.params.reservation_id);
    if(!response) {
      next({status:404, message:`Id not found: ${req.params.reservation_id}`})
    }
    res.status(200).json({data:response});
  } catch(error) {
    next({status:400, message: error})
  }
}
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    hasCorrectData,
    dateIsNotInPast,
    dateisDateOpen,
    timeIsValid,
    asyncErrorBoundary(create),
  ],
  read
};
