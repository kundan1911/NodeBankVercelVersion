// modules required to setup an server 
const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

// customer data 


mongoose.connect("mongodb+srv://admin-kundan:Kundan%4019@cluster0.0qyqn.mongodb.net/BankDB?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
function populateDB() {
    const cust1 = {
        first: "Kundan",
        last: "Baniya",
        email: "baniya023@gmail.com",
        Balance: 5000
    }
    const cust2 = {
        first: "Dhiraj",
        last: "Shinde",
        email: "dshinde045@gmail.com",
        Balance: 10000
    }
    const cust3 = {
        first: "Aanand",
        last: "Thakur",
        email: "aanand99@gmail.com",
        Balance: 20000
    }
    const cust4 = {
        first: "Rahul",
        last: "Chouhan",
        email: "rahulC34@gmail.com",
        Balance: 7000
    }
    const cust5 = {
        first: "Nitesh",
        last: "Damodar",
        email: "damunitesh56@gmail.com",
        Balance: 1500
    }
    const cust6 = {
        first: "Jitendar",
        last: "Shukla",
        email: "shuklaji55@gmail.com",
        Balance: 35000
    }
    const cust7 = {
        first: "Santosh",
        last: "Prajapati",
        email: "psantosh100@gmail.com",
        Balance: 40000
    }
    const cust8 = {
        first: "Pradeep",
        last: "Sawant",
        email: "Pradeep77@gmail.com",
        Balance: 50000
    }
    const cust9 = {
        first: "Saurav",
        last: "Dhubey",
        email: "dtsaurav101@gmail.com",
        Balance: 30000
    }
    const cust10 = {
        first: "Satish",
        last: "Dhawan",
        email: "dhawans04@gmail.com",
        Balance: 15000
    }
    Bank.insertMany([cust1, cust2, cust3, cust4, cust5, cust6, cust7, cust8, cust9, cust10])
}
const bankSchema = {
    first: String,
    last: String,
    email: String,
    Balance: Number
}

const transferTableSchema = {
    date: String,
    time: String,
    sender: String,
    receipent: String,
    amount: Number
}
const Bank = mongoose.model("Bank", bankSchema)
const transferTable = mongoose.model("alltranfer", transferTableSchema)

Bank.count(function (err, count) {
    if (!err && count === 0) {
        populateDB();
    }
});
app.route("/")
    .get(function (req, res) {
        res.sendFile(__dirname + "/index.html")
    })


app.route("/customers")
    .get(function (req, res) {
        Bank.find({}, function (err, customer) {
            if (!err) {
                res.render("home", { customers: customer });
            }
        })

    })
    .post(function (req, res) {
        console.log(req.body)
        let Sender = req.body.sender;
        let Receiver = req.body.receiver;
        let Amount = parseInt(req.body.amount);
        console.log(typeof (Amount))
        let pastamount = 0;
        if (Amount !== NaN) {
            Bank.findOne({ first: Sender }, function (err, customer) {
                if (!err) {
                    pastamount = customer.Balance;
                    customer.Balance = pastamount - Amount;
                    customer.save((err, updated) => {
                        if (!err) {
                            console.log(updated)
                        }
                    })
                }

            })
            Bank.findOne({ first: Receiver }, function (err, customer) {
                if (!err) {
                    pastamount = customer.Balance;
                    customer.Balance = pastamount + Amount;
                    customer.save((err, updated) => {
                        if (!err) {
                            console.log(updated)
                        }
                    })
                }

            })
            let today = new Date()
            const transferDetail = new transferTable({
                date: today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
                time: (today.getHours()) + ":" + (today.getMinutes()),
                sender: Sender,
                receipent: Receiver,
                amount: Amount
            })
            transferDetail.save();


        }
        res.redirect("/customers")


    })

app.get("/transderhistory", function (req, res) {
    transferTable.find({}, function (err, history) {
        if (!err) {
            res.render("history", { alltransactions: history });
        }
    })
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function (err) {
    console.log("server established and listening port 3000")
})




























