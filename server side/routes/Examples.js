
// for allow cross origin node.js (in app.js) 

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// --------------------------------------------

var mysql = require('promise-mysql');  // import promise-mysql for index.js ------

//----obj Access to DB

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    //database: '',
    connectionLimit: 10
});

//xammp username:root password:''
//workbench username:root password:root

//---- sql query end connect & exsit from DB

router.get('/....', async (req, res) => {

    var example = await pool.query('SELECT * from ....');

});

//--- or:

router.get('/....', async (req, res) => {

    pool.query('SELECT * from ....')
        .then(data => {

        })
        .catch(err => console.log(err));

});

//----------- create DB 

router.get('/createdb', async (req, res) => {

    await pool.query(`CREATE DATABASE Name_DB`);

    res.send("DB Created!")

});

//---------- create Table in DB 

router.get('/createtable', async (req, res) => {

    let tableQ =
        `CREATE TABLE DB_name.table_name (
            ID int NOT NULL AUTO_INCREMENT,
            Column1 varchar(255),
            Column2 int,
            PRIMARY KEY (ID)
        ); ` ;

    await pool.query(tableQ);

    res.send("Table Created!");

});

//---- add order to table in DB 

router.post('/addorder', async (req, res) => {

    let insertQ = `INSERT INTO  DB_name.table_name (Column1, Column2) 
    VALUES ('${req.body}', ${req.body}) 
    `;

    await pool.query(insertQ);

    res.send("thank you");

});

//---- for read or write fils ------------------------------------------------------------

var fs = require('fs');

fs.readFile(`C:\\Users\\Public\\....`, function (err, data) {

    if (err) {
        res.json({ msg: "try again" });
    }

    console.log(data.toString());

});

fs.writeFile(`C:\\Users\\Public\\....`, req.query, function (err, data) {

    if (err) {
        res.json({ msg: "try again" });
    }

    res.json({ msg: req.query });

});

//------  sokets -------------------------------------------------------------------------

// npm i socket.io --save // for install

// socket for server side: (in app.js)

var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(8888);

io.on('connection', function (socket) {

});

// socket for clinet side: 

<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>

var socket;

socket = io("localhost:8888");

socket.on("connect", function () {

});

// socekt function:

socket.on("Channel name for listening", function (data) { // for listening to Channel 

});

socket.emit("Channel name to send", "Information to send"); //send to this socket

io.emit("Channel name to send", "Information to send"); //send to all sockets

//----------------------------------------------------------------------------------------

// express-session 

// npm i express-session --save // for install

var session = require('express-session'); //for server side: (in app.js)

app.use(session({
    secret: 'ssss',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

req.session.example = true;

//----------------------------------------------------------------------------------------

// sequelize    

// npm i sequelize --save // for install

// npm i mysql2 --save // for install

const Sequelize = require('sequelize'); // in index.js

const sequelize = new Sequelize('data_base', 'user_name', 'password', {  // for settings sequelize
    host: 'localhost',
    dialect: 'mysql'
});

//xammp username:root password:''
//workbench username:root password:root

const Table_name = sequelize.define('Table_name', { //  for settings table
    Column1: Sequelize.INTEGER,
    Column2: Sequelize.STRING
});

// examples :

sequelize.sync()
    .then(() => Table_name.findAll({}))
    .then(data => res.json(data));

// or async function...

await sequelize.sync();

let name_Table = await table.findAll({});

// Option c-r-u-d

Table_name.findAll()

Table_name.create()

Table_name.destroy()

Table_name.update()

//----------------------------------------------------------------------------------------