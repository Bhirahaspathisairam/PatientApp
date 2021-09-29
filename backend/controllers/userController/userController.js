const connection = require("../../config/database");

exports.loginUser = (req, res, next) => {
  const username = req.body.userName;
  const password = req.body.Password;
  console.log(username);
  console.log(password);
  const sql = `SELECT * from User WHERE userName= ?`;
  const data = [username];
  connection.query(sql, data, (err, rows) => {
    console.log(rows);
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
  const sql = `SELECT state,paytyp,pop from patients_info;`;
  const paytyp = [];
  const pop = [];
  connection.query(sql, (err, rows) => {
    rows.map((row) => {
      if (paytyp.indexOf(row.paytyp) == -1) {
        paytyp.push(row.paytyp);
      }
      if (pop.indexOf(row.pop) == -1) {
        pop.push(row.pop);
      }
    });
    res.status(200).json({
      success: true,
      rows: rows.slice(0, 10),
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
      disease: rows[0].slice(0, 5),
      treatment: rows[1].slice(0, 5),
    });
  });
};

// exports.getPatientDetails = (req, res, next) => {
//   const sql = `SELECT name,label_val from label_info where label_type='treatment';`;
//   connection.query(sql, (err, rows) => {
//     console.log(rows);
//     res.status(200).json({
//       success: true,
//       rows: rows.slice(0, 10),
//     });
//   });
// };
