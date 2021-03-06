const express = require("express")
const router = express.Router()
const validUrl = require("valid-url")
const shortid = require("shortid")

const Url = require("../models/Url")

// @route POST /api/url/shorten
// @desc Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body
  const baseUrl = process.env.BASE_URL

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(422).json({ error: "Invalid base url" })
  }

  // Create url code
  const urlCode = shortid.generate()

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl })

      if (url) {
        res.json(url)
      } else {
        const shortUrl = baseUrl + "/" + urlCode

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        })

        await url.save()

        res.json(url)
      }
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: "Server error" })
    }
  }

  res.status(422).json({ error: "Invalid long url" })
})

module.exports = router
