const express = require('express')
const path 	  = require('path')
const axios   = require('axios')

const app = express()

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// An api endpoint that returns a list of Event by Owner and Repo name
app.get('/api/getEvents/:userName/:repoName', (req,res, next) => {
	const {userName, repoName} = req.params
     axios.get(`https://api.github.com/repos/${userName}/${repoName}/events`)
     .then(response => {
       res.send(response.data)
     })
     .catch(next)
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);