const connection = require("../../config/database");

exports.loginUser = (req, res, next) => {
  const username = req.body.userName;
  const password = req.body.Password;
  const sql = `SELECT * from User WHERE userName= ?`;
  const data = [username];
  connection.query(sql, data, (err, rows) => {
    if (rows && rows.length == 1) {
      if (username == rows[0].UserName && password == rows[0].password) {
        res.status(200).json({
          success: true,
          userName: rows[0].UserName,
          password: rows[0].password,
        });
      }
    } else {
      console.log("Inside else");
      return res.status(400).json({
        status: "error",
        message: "Please Enter valid creds",
      });
    }
  });
};

exports.signup = (req, res, next) => {
  const username = req.body.UserName;
  const password = req.body.Password;
  const email = req.body.Email;
  var sql = `INSERT INTO User
	           (
							email,password,UserName
	           )
	           VALUES
	           (
	               ?,?,?
	           ); `;
  connection.query(sql, [email, password, username], (err, rows) => {
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        status: "error",
        message: "User Already Exist",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Registration Succesful",
      });
    }
  });
};

exports.getPatientDetails = (req, res, next) => {
  const sql = `SELECT DISTINCT state from patients_info;`;
  const paytyp = [{ name: "COM" }, { name: "MCR" }];
  const pop = [{ name: "diab" }, { name: "both" }, { name: "ckd" }];
  connection.query(sql, (err, rows) => {
    res.status(200).json({
      success: true,
      rows: rows,
      paytyp: paytyp,
      pop: pop,
    });
  });
};

exports.getMedicalDetails = (req, res, next) => {
  const sql = `SELECT name,label_val from label_info where label_type='medical_condition';SELECT name,label_val from label_info where label_type='treatment';`;

  connection.query(sql, [2, 1], (err, rows) => {
    res.status(200).json({
      success: true,
      disease: rows[0].slice(0, 20),
      treatment: rows[1].slice(0, 20),
    });
  });
};

exports.getReport = (req, res, next) => {
  const reportsql = `SELECT COUNT(*) AS ALL_DATA,
  SUM(treatment & 1) as tx_esrd,
  SUM(treatment & 2) >> 1 as tx_mi,
  SUM(treatment & 4) >> 2 as tx_stroke,
  SUM(treatment & 8) >> 3 as tx_htn,
  SUM(treatment & 16) >> 4 as tx_lpd,
  SUM(treatment & 32) >> 5 as dx_obe,
  SUM(treatment & 64) >> 6 as dx_dneu,
  SUM(treatment & 128) >> 7 as dx_dret,
  SUM(treatment & 256) >> 8 as dx_dnep,
  SUM(treatment & 512) >> 9 as dx_af,
  SUM(treatment & 1024) >> 10 as dx_cad,
  SUM(treatment & 2048) >> 11 as dx_pvd,
  SUM(treatment & 4096) >> 12 as dx_anm,
  SUM(treatment & 8192) >> 13 as dx_hyperk,
  SUM(treatment & 16384) >> 14 as dx_hypok,
  SUM(treatment & 32768) >> 15 as dx_hypon,
  SUM(treatment & 65536) >> 16 as dx_angina,
  SUM(treatment & 131072) >> 17 as dx_acs,
  POP, PAYTYP
  FROM REPORT
  GROUP BY POP, PAYTYP;`;

  const dropView = `DROP VIEW REPORT`;
  const { details, paytyp, pop, medicalCondition, treatment } =
    req.body.reportParams;
  const states = details.map((detail) => detail.state);
  const paytypValues = paytyp.map((paytyp) => paytyp.name);
  const popValues = pop.map((pop) => pop.name);
  const medicalValue = medicalCondition.reduce((total, condition) => {
    return total + condition.label_val;
  }, 0);
  const treatmentValue = treatment.reduce((total, treatment) => {
    return total + treatment.label_val;
  }, 0);

  const sql = `CREATE VIEW REPORT AS (SELECT MEDICAL_CONDITION, TREATMENT, PAYTYP, STATE, POP FROM PATIENTS_INFO WHERE STATE IN ('${states.join(
    "','"
  )}') AND PAYTYP IN ('${paytypValues.join(
    "','"
  )}') AND POP IN ('${popValues.join(
    "','"
  )}') AND (MEDICAL_CONDITION & ${medicalValue} = ${medicalValue}));`;

  connection.query(sql, (err, rows) => {
    connection.query(reportsql, (err, rows) => {
      if (rows && rows.length > 0) {
        res.status(200).json({
          success: true,
          reportData: rows[0],
        });
      }
      connection.query(dropView);
    });
  });
};
