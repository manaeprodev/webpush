const express = require('express')
const app = express()

app.use(express.json());

let endPoints = [];

const vapidKeys = require('../myKeys.js');
const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:tony.tiryaki@gmail.com',
    'BHnUZrvLP6a06qJMSxwf0NSz4YSCeMbKCvXtg4oPFXFKlra-l-b6lZH8wbrG_yReuCCtFZqYORD9kMr8f-6FsQs',
    'TWHnVzL_ZJCMo5_ATR-u4ZcIssnxrU9vR2pgfW60npM'
)

app.get('/', function(req, res){
    res.send('Push App!');
});

app.post('/send', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    const titre = req.body.titre;
    const notif = req.body.notif;
    webpush.sendNotification(endPoints[0], JSON.stringify( {title: titre, body: notif}))
        .then((detail_req) => {
            console.log("send");
            res.send(JSON.stringify({success:true}))
        })
});

app.listen(80, function(){
    console.log('Push server start')
})

app.post('/api/save-subscription', function (req, res){

    endPoints.push(req.body);
    //console.log(req);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify( {"status" : "success"}));
    console.log(res.statusCode);
    console.log(endPoints[0])
})


app.use(express.static('..'))