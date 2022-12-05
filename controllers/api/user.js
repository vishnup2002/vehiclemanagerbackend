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

module.exports.removeVehicle = (req, res) => {
  const { vid } = req.body;
  let query1 = `delete from Service where vid = ${vid}`;
  let query2 = `delete from Vehicle where id = ${vid}`;
  con.query(query1, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ err });
    }
    con.query(query2, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ err });
      }
      return res.status(200).json({
        message: "Vehicle removed",
      });
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

module.exports.viewUserDetails = (req, res) => {
  return res.status(200).json({ data: req.user });
};

module.exports.modifyName = (req, res) => {
  const cid = req.user.id;
  const { name } = req.body;
  let query = `update Customer set name = '${name}' where id = ${cid}`;
  con.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ err });
    }
    return res.status(200).json({
      message: "name modified",
    });
  });
};
