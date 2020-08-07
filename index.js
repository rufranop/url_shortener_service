require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
const app = express()
const port = process.env.PORT

// Connect to database
connectDB()

const whitelist = [process.env.FRONTEND_URL]

app.use(
  express.json(),
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true)
      if (whitelist.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this origin doesn't allow access from the particular origin."
        return callback(new Error(message), false)
      }
      return callback(null, true)
    },
  })
)

// Define Routes
app.use("/", require("./routes/index"))
app.use("/api/url", require("./routes/url"))

app.listen(port, () => console.log(`Server running on port ${port}`))
