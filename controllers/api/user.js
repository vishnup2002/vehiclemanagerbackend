const con = require("../../config/mysql");

module.exports.addVehicle = (req, res) => {
  const { regNo, vType, year } = req.body;
  const cid = req.user.id;

  let query = `insert into Vehicle(regNo,cid,vType,year) values (${regNo},${cid},'${vType}',${year})`;
  con.query(query, (err, results) => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.status(200).json({
      message: "Vehicle added",
    });
  });
};

module.exports.viewVehicles = (req, res) => {
  const cid = req.user.id;
  let query = `select * from Vehicle where cid = ${cid}`;
  con.query(query, (err, results) => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.status(200).json({
      data: results,
    });
  });
};

module.exports.bookService = (req, res) => {
  const { vid, date } = req.body;
  let query = `insert into Service(date,vid,status) values ('${date}',${vid},"pending")`;
  con.query(query, (err, results) => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.status(200).json({
      message: "service booked",
    });
  });
};

module.exports.viewServiceReq = (req, res) => {
  const cid = req.user.id;

  let query = `select * from Service where vid in (select id from Vehicle where cid=${cid})`;

  con.query(query, (err, results) => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.status(200).json({
      data: results,
    });
  });
};
