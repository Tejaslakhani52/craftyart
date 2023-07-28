const express = require("express");
const geoip = require("geoip-lite");
const cors = require("cors");

const app = express();
const port = 5000; // Choose a port number for your backend

app.use(express.json());
app.use(cors());

app.post("/api/getCountryCode", (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: "IP address not provided." });
  }

  const geo = geoip.lookup(ip);

  if (geo && geo.country) {
    res.json({ countryCode: geo.country });
  } else {
    res.status(404).json({ error: "Other Country IP address." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
