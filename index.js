const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const heroesRoutes = require("./routes/heroes")
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))

app.get("/", (req, res) => {
  res.json("Super Heroes API")
})
app.use("/heroes", heroesRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
