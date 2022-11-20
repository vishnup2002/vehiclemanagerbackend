module.exports.SELECT = (tname) => `select * from ${tname}`;
module.exports.SELECTCON = (tname, con) => {
  let cq = "";
  for (const key in con) {
    cq += `${key} = '${con[key]}' and `;
  }
  cq = cq.slice(0, -4);

  return this.SELECT(tname) + " where " + cq;
};
