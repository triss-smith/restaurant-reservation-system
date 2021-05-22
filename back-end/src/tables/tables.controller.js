const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const hasData = (req, res, next) => {
  const data = req.body.data;
  if (data) {
    return next();
  }
  next({ status: 400, message: "data" });
};
const hasCorrectData = (req,res,next) => {
    const table = req.body.data;
    if(!table.table_name || table.table_name === "" || table.table_name.length <= 1) {
        return next({status:400, message:"table_name"});
    }
    if(!table.capacity || table.capacity == 0 || typeof Number(table.capacity) != "number") {
        return next({status:400, message:"capacity"});
    }
    next();
}
async function tableExists(req, res, next) {
  try {
    const table = await service.read(req.params.tableId);
    if (table) {
      res.locals.table = table;
      return next();
    }
    next({ status: 400, message: "table doesn't exist" });
  } catch (error) {
    next({ status: 400, message: error });
  }
}
const isTableOccupied = (req, res, next) => {
  const table = res.locals.table;
  if (!table.reservation_id) {
    return next();
  }
  next({ status: 400, message: "table occupied" });
};
async function hasReservationId(req, res, next) {
 
  try {
    if (!req.body.data.reservation_id) {
      return next({ status: 400, message: "reservation_id" });
    }
    const reservation = await service.getReservation(
      Number(req.body.data.reservation_id)
    );
    if (reservation) {
      res.locals.reservation = reservation;
      console.log("hasReservationId");
      return next();
    }

    next({ status: 404, message: `${req.body.data.reservation_id}` });
  } catch (error) {
    next({ status: 400, message: error });
  }
}
const capacityCheck = (req, res, next) => {
  const table = res.locals.table;
  const reservation = res.locals.reservation;

  if (table.capacity >= reservation.people) {
    console.log("capacityCheck")
    return next();
  }
  next({ status: 400, message: "capacity" });
};

async function list(req, res, next) {
  try {
    const response = await service.list();
    const sortedResponse = response.sort(function (a, b) {
      if (a.table_name < b.table_name) {
        return -1;
      }
      if (a.table_name > b.table_name) {
        return 1;
      }
      return 0;
    });
    res.json({ data: sortedResponse });
  } catch (error) {
    next({ status: 400, message: error });
  }
}

async function create(req, res, next) {
    const table = req.body.data;
    try{
        const response = await service.create(table);
        res.status(201).json({data:response[0]})
    } catch(error) {
        next({status:400, message:error})
    }
}

async function update(req, res, next) {
  const table = res.locals.table;
  const updatedTable = {
    ...table,
    reservation_id: req.body.data.reservation_id,
  };
  console.log("update");
  try {
    const response = await service.update(table.table_id, updatedTable);
    res.status(200).json({ data: response });
  } catch (error) {
    next({ status: 400, message: error });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  update: [
    hasData,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(hasReservationId),
    isTableOccupied,
    capacityCheck,
    asyncErrorBoundary(update),
  ],
  create: [hasData, hasCorrectData, create]
};