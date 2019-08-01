const PORT = Number(process.env.PORT) || 3000;
const express = require('express');
const bodyParser = require('body-parser');
var Datastore = require('@google-cloud/datastore');

const app = express();
app.enable('trust proxy');

app.use(bodyParser.json());

const datastore = new Datastore();
const tableName = 'customer';
const customerKey = datastore.key([tableName]);

app.get('/', (req, res) => {
    res.send('Oh Hi There!');
});

app.get("/customers", async (req, res, next) => {
    try {
        const query = datastore.createQuery(tableName);
        const [customers] = await datastore.runQuery(query);
        const allCustomers = customers.map((customer) => ({
            id: customer[datastore.KEY].id,
            ...customer
        }));

        res.json(allCustomers);
    } catch (error) {
        res.status(400).json({
            "errMessage": error
        });
    }
});

app.get("/customer", async (req, res, next) => {
    try {
        if (req.query.id == null) {
            res.status(400).json({
                "errMessage": "Bad Request Please provide Customer ID"
            });
        } else {
            const query = datastore
                .createQuery(tableName)
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
        res.status(400).json({
            "errMessage": error
        });
    }
});

app.post('/addCustomer', async (req, res, next) => {
    try {
        const customerData = {
            key: customerKey,
            data: req.body,
        };

        await datastore.save(customerData);
        res.json({
            "resString": "Record created successfully"
        });
    } catch (error) {
        res.status(400).json({
            "errMessage": error
        });
    }
});

app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});