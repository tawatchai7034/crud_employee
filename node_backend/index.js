const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const employeeRouter = require("./routes/employee");
const authRouter = require("./routes/auth");

app.use(cors());

app.use(express.json({ limit: "50mb" }));


app.use("/employee", employeeRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
