const con = require("../../config/mysql");

module.exports.viewServiceReq = (req, res) => {
  let query =
    "select * from Service INNER JOIN Vehicle ON Service.vid = Vehicle.id INNER JOIN Customer ON Vehicle.cid = Customer.id";
  con.query(query, (err, results) => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.status(200).json({
      data: results,
    });
  });
};
