const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(bodyParser.json())


app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173",
    clientId: '73499b550f734e619afc7854b1a6f0ea',
    clientSecret: '83c5e08dc3ac4edbb22d912e7dedae1b'
  })
  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  }).catch(err => {
    res.sendStatus(400)
  })
})

app.listen(3001)