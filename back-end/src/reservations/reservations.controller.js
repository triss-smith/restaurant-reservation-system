/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moment = require("moment");
const formats = ["hh:mm AA", "hh:mm", "h:mm AA", "h:mm", "HH:mm"]
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
    typeof Number(data.people) != "number" ||
    typeof data.people != "number"
  ) {
    return next({ status: 400, message: "people" });
  }
  next();
};
const dateIsNotInPast = (req, res, next) => {
  const todayDate = new Date();
  const requestDate = new Date(`${req.body.data.reservation_date}T00:00:00`);

  if (requestDate.setHours(0, 0, 0, 0) <= todayDate.setHours(0, 0, 0, 0)) {
    return next({ status: 400, message: "future" });
  }
  res.locals.date = requestDate;
  next();
};
const dateisDateOpen = (req, res, next) => {
  if (res.locals.date.getDay() === 2) {
    next({ status: 400, message: "closed" });
  }
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
  //const response = await service.create(req.body.data);
  res.status(201).json({ data: await service.create(req.body.data)[0] });
}
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    hasCorrectData,
    dateIsNotInPast,
    dateisDateOpen,
    asyncErrorBoundary(create),
  ],
};
