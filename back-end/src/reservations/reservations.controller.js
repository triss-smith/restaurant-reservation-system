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
const statusIsOkayForPost = (req,res,next) => {
  const reservation = req.body.data;
  if(reservation.status == "seated") {
    return next({status:400, message:"seated"})
  }
  if(reservation.status == "finished") {
    return next({status:400, message:"finished"})
  }
  res.locals.reservation = reservation;
  next();
}
async function  reservationExists(req,res,next) {
  const reservation = await service.read(req.params.reservation_id)
  if(!reservation) {
     return next({status:404, message:req.params.reservation_id})

    
    
  }
  res.locals.reservation = reservation;
    res.locals.status = req.body.data.status;
  console.log("passed")
  next();
}
async function isNotUnknownOrFinishedForPut(req,res,next) {
  const reservation = res.locals.reservation
  const status = res.locals.status;
  console.log("isNotUnknownForPut", reservation)
  if(status === "unknown") {
    return next({status:400,message:"unknown"})
  }
  if(reservation.status == "finished") {
    return next({status:400, message: "finished"})
  }
  
  next();
}
async function list(req, res) {
if(req.query.mobile_number != null) {
    const response = await service.search(req.query.mobile_number);
    const filteredReservations = response.filter(element => element.status != "finished")
  const sortedReservation = filteredReservations.sort((a, b) =>
    a.reservation_time < b.reservation_time
      ? -1
      : a.reservation_time > b.reservation_time
      ? 1
      : 0
  );
  console.log( req.query.mobile_number)
  res.json({
    data: sortedReservation,
  });
  }
  if(!req.query.mobile_number){
    const response = await service.list(req.query.date);

  const filteredReservations = response.filter(element => element.status != "finished")
  const sortedReservation = filteredReservations.sort((a, b) =>
    a.reservation_time < b.reservation_time
      ? -1
      : a.reservation_time > b.reservation_time
      ? 1
      : 0
  );
  console.log(sortedReservation)
  res.json({
    data: sortedReservation,
  });
}
  
}
async function create(req, res, next) {
  try {
    const response = await service.create(req.body.data);
    res.status(201).json({ data: response });
  } catch (error) {
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
async function update(req,res,next) {
  
}

async function statusUpdate(req,res,next) {
  const reservation = res.locals.reservation;
  const newStatus = res.locals.status;
  const updatedReservation = {...reservation, status: newStatus}
  //console.log(newStatus, updatedReservation);
  console.log("statusUpdate")
  const response = await service.update(updatedReservation.reservation_id, updatedReservation)
  console.log(response)
  res.status(200).json({data: {status: response[0]}})
}
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    hasCorrectData,
    dateIsNotInPast,
    dateisDateOpen,
    timeIsValid,
    statusIsOkayForPost,
    asyncErrorBoundary(create),
  ],
  read,
  updateStatus: [reservationExists, isNotUnknownOrFinishedForPut, asyncErrorBoundary(statusUpdate)]
};
