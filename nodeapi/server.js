const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
//따로 {check를 안불러와도 사용가능}
const expressValidator = require('express-validator');
const app = express();


dotenv.config();

//DB
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection Error: ${err.message}`)
});

//Bring Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

// api docs
app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if(err) {
            res.status(400).json({
                error: err
            })
        };
        const docs = JSON.parse(data);
        res.json(docs);
    })
})

//middleware => route 보다 먼저 선언
app.use(morgan('dev')); // check the connection status
app.use(bodyParser.json()); // for Json Parser
app.use(cookieParser());
app.use(cors()); // For cross-site HTTP
app.use(expressValidator()); // validation all I inputs


//Routes
app.use('/', authRoutes);
app.use('/', postRoutes);
app.use('/', userRoutes);
app.use(function (err, req, res, next) { // middleware를 check(signin or not) 해야 하기때문에 auth와 postRoute 뒤에 붙여준다 
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: '당신은 등록된 사용자가 아닙니다'
        })
    };
})

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server Listen ${port}`));
