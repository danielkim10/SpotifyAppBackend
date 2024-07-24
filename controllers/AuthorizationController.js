require('dotenv').config()
const request = require('request')

const generateRandomString = (length) => {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

const calculateExpiryTime = (expires_in) => {
    return Date.now() + (expires_in * 1000)
}
  
const stateKey = 'spotify_auth_state'

const login = (req, res) => {
    var state = generateRandomString(16)
    var scope = 'ugc-image-upload playlist-modify-private playlist-modify-public'
    res.cookie(stateKey, state)

    var searchParams = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: 'http://localhost:5000/api/auth/callback',
        state: state
    })
    res.redirect('https://accounts.spotify.com/authorize?' + searchParams.toString())
}

const callback = (req, res) => {
    var code = req.query.code || null
    var state = req.query.state || null
    var storedState = req.cookies ? req.cookies[stateKey] : null

    if (state === null || state !== storedState) {
        var error = new URLSearchParams({
            
        })
        res.redirect('/#' + error.toString())
    } 
    else {
        res.clearCookie(stateKey)
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: 'http://localhost:5000/api/auth/callback',
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
            },
            json: true
        }
        
        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                
                res.cookie('access_token', body.access_token)
                res.cookie('expiry_time', calculateExpiryTime(body.expires_in))
                res.cookie('refresh_token', body.refresh_token)
                res.redirect('http://localhost:3000/home')
            }
            else {
                console.log(`error ${response.statusCode}`)
                res.redirect('http://localhost:3000')
            }
        })
    }
}

const refreshToken = (req, res) => {
    var refresh_token = req.params.refresh_token
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 
            'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')) 
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    }

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.status(200).json({ new_access_token: body.access_token, new_expiry_time: calculateExpiryTime(body.expires_in) })
        }
        else {
            res.status(response.statusCode).json({ new_access_token: "", new_expiry_time: 0})
        }
    })
}

module.exports = {
    login,
    callback,
    refreshToken
}