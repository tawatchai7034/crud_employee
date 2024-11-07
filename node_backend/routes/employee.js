require("dotenv").config();
let express = require("express");
var mysql = require("mysql");
let employeeRouter = express.Router();
const jwtValidate = require("../middleware/authValidate");
const parseJwt = require("../middleware/authDecode");

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
  port: process.env.PORT,
});

con.connect(function (err) {
  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
  if (err) throw err;
  // con.query("SELECT * FROM tr_text", function (err, result, fields) {
  //   if (err) throw err;
  //   console.log(result);
  // });
});

employeeRouter.get("/getAll", jwtValidate, async (req, res) => {
  try {
    // token decoder
    // const token = req.headers["authorization"].replace("Bearer ", "");
    // console.log(parseJwt(token));

    await con.query(
      "SELECT * FROM tb_employee",
      function (err, result, fields) {
        if (err) {
          let reponse = {
            code: 400,
            message: "error",
            result: err,
          };
          res.json(reponse);
        } else {
          let reponse = {
            code: 200,
            message: "success",
            result: result,
          };
          res.json(reponse);
        }
      }
    );
    // console.log(result.rows);
  } catch (err) {
    const result = {
      success: false,
      message: err,
    };
    res.json(result);
  }
});

employeeRouter.post("/create", jwtValidate, async (req, res) => {
  try {
    var EmpNum = req.body.EmpNum;
    var EmpName = req.body.EmpName;
    var HireDate = req.body.HireDate;
    var Salary = req.body.Salary;
    var Position = req.body.Position;
    var DepNo = req.body.DepNo;
    var HeadNo = req.body.HeadNo;

    await con.query(
      `INSERT INTO tb_employee (EmpNum,EmpName,HireDate,Salary,Position,DepNo,HeadNo) VALUE('${EmpNum}','${EmpName}','${HireDate}',${Salary},'${Position}','${DepNo}','${HeadNo}')`,
      function (err, result, fields) {
        if (err) {
          let reponse = {
            code: 400,
            message: "error",
            result: err,
          };
          res.json(reponse);
        } else {
          let reponse = {
            code: 200,
            message: "success",
            result: result.insertId,
          };
          res.json(reponse);
        }
      }
    );
    // console.log(result.rows);
  } catch (err) {
    const result = {
      success: false,
      message: err,
    };
    res.json(result);
  }
});

module.exports = employeeRouter;
