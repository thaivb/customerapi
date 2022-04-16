const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbConfig = require('./config/mongodb.config.js');
const Customer = require('./models/customer.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
    .then(() => {
        Customer.deleteMany({}, (err) => {
            if (err) {
                process.exit();
            }
            console.log('ลบคอลเล็กชัน customer ออกแล้ว');
            initCustomer();
        });
    }).catch(err => {
        console.log('ไม่สามารถเชื่อมต่อกับฐานข้อมูล MongoDB');
        process.exit();
    });

// const corsOptions = {
//     origin: 'http://localhost:8000',
//     optionsSuccessStatus: 200   
// };

app.use(cors());
require('./routes/customer.route.js')(app);

const port = process.env.PORT;
if (port == null || port == ''){
    port = 4000;
}

app.listen(port, () => {
    console.log('4000');
})

function initCustomer() {
    let data = [
        {
            CustomerId: 1001,
            FullName: "ศุภชัย สมพานิช",
            Address: "กทม"
        },
        {
            CustomerId: 1002,
            FullName: "สมใจ เกรียงชัย",
            Address: "เลย"
        },
        {
            CustomerId: 1003,
            FullName: "ศักดิ์ชัย กิจอนันตชัยเมฆ",
            Address: "เชียงราย"
        }
    ]

    for (let i = 0;i < data.length;i++) {
        const c = new Customer(data[i]);
        c.save();
    }
}