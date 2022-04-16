const customer = require('../models/customer.js');

exports.index = (req, res) => {
    res.send('<h1>Customer Apps</h1><hr /><a href="/api/customer">รายชื่อลูกค้า</a>');
}

exports.create = (req, res) => {
    const c = new customer(req.body);
    
    c.save()
        .then(data => {
            res.json(data)
        }).catch(err => {
            return res.status(500).json({
                msg: "ไม่สามารถเพิ่มข้อมูลลูกค้าได้เนื่องจาก : " + err.message
            });
        });
    };

exports.findAll = (req, res) => {
    customer.find()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
    };

exports.findById = (req, res) => {
    customer.findById(req.params.customerId)
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    msg: "ไม่พบลูกค้ารหัส : " + req.params.customerId
                });
            }
            res.json(data);
        }).catch(err => {
            return res.status(500).json({
                msg: "เกิดข้อผิดพลาดเนื่องจาก : " + err.message
            });
        });
    };

exports.update = (req, res) => {
    customer.findByIdAndUpdate(req.params.customerId, { $set: req.body }, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    msg: "ไม่พบลูกค้ารหัส : " + req.params.customerId
                });
            }
            res.json(data);
        }).catch(err => {
            return res.status(500).json({
                msg: "ไม่สามารถอัพเดตข้อมูลลูกค้าได้ เนื่องจาก : " + err.message
            });
        });
    };

exports.delete = (req, res) => {
    customer.findByIdAndRemove(req.params.customerId)
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    msg: "ไม่พบลูกค้ารหัส : " + req.params.customerId
                });
            }
            res.json({ msg: "ลบข้อมูลเรียบร้อยแล้ว!!!" });
        }).catch(err => {
            return res.status(500).json({
                msg: "ไม่สามรถลบข้อมูลลูกค้าได้ เนื่องจาก : " + err.message
            });
        });
    };