const PORT = Number(process.env.PORT) || 3000;
const express = require('express');
const bodyParser = require('body-parser');
var Datastore = require('@google-cloud/datastore');

const app = express();
app.enable('trust proxy');

app.use(express.json());
app.use(bodyParser.json());

const router = express.Router();
app.use(router);

const datastore = new Datastore();
const tbCustomer = 'customer';
const customerKey = datastore.key([tbCustomer]);

app.get('/', (req, res) => {
    res.send('Oh Hi There!');
});

router.get("/customers", async (req, res, next) => {
    try {
        const query = datastore.createQuery(tbCustomer);
        const [customers] = await datastore.runQuery(query);
        const allCustomers = customers.map((customer) => ({
            id: customer[datastore.KEY].id,
            ...customer
        }));

        res.json(allCustomers);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/customer", async (req, res, next) => {
    try {
        if (req.query.id == null) {
            res.status(400).json({
                "resString": "Bad Request Please provide Customer ID"
            });
        } else {
            const query = datastore
                .createQuery(tbCustomer)
                .filter('customerId', '=', req.query.id);
            const [customers] = await datastore.runQuery(query);
            if (customers.length == 0) {
                res.json({
                    "resString": "No Customer found for this ID"
                });
            } else {
                res.json(customers[0]);
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post('/customer', async (req, res, next) => {
    try {
        const customer = {
            key: customerKey,
            data: req.body,
        };

        await datastore.save(customer);
        res.status(201).json("Record created successfully");
    } catch (error) {
        res.status(400).json(error);
    }
});

app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});