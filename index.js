const express = require('express');
const app = express();
const path = require('path');
const data = require('./data.json');
const file = require('fs');
const port = 3000;

app.use(express.urlencoded({extended: false}));

app.use('/views', express.static('views'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {data});
});

app.get('/person/:id', (req, res) => {
    let person = data[req.params.id -1];
    res.render('popup.ejs', {person});
});

app.get('/new', (req, res) => {
    let id = data.length;
    res.render('new.ejs', {id});
});

app.post('/new', (req, res) => {
    let input = req.body;
    data.push(input);
    file.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
        if(err){
            console.log('error writing json file', err);
        } else {
            console.log('writing files successfull!');
        }
        res.redirect('/');
    })
})

app.post('/update', (req, res) => {
    let input = req.body;
    let id = input.id - 1;
    file.readFile('./data.json', 'utf-8', (err, alldata) => {
        if (err){
            console.log('error reading data', err);
        } else {
            let data = JSON.parse(alldata);
        }
    })

    data[id].fname = input.fname;
    data[id].mobile = input.mobile;
    data[id].requirments = input.requirments;
    data[id].type = input.type;
    data[id].budget = input.budget;
    data[id].location = input.location;
    data[id].date = input.date;
    data[id].time = input.time;
    data[id].remarks = input.remarks;
    data[id].status = input.status;

    file.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
        if(err){
            console.log('error writing json file', err);
        } else {
            console.log('writing files successfull!');
        }
        res.redirect('/');
    })

    // res.redirect('/');
    
})

app.listen(port, ()=> console.log(`running server at ${port}`));