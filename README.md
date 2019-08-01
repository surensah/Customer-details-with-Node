# Customer-details-with-Node

Initially created a datastore with (kind) "customer" with few attributes like customerId, email, name, phoneNumber

By using nodejs and express framework:

## Created 3 apis:
/customers - api to fetch customers details from datastore

/customer?id-value - api to fetch specific customer detail from datastore

/addCustomer - api to create new customer detail into datastore


Local Usage: Prerequisite: Node modules should be installed on local machine

npm init //It creates package.json file

For dependencies add

npm i --save module-name (express,body-parser)

npm install //to add all dependencies

npm start //command to run locally

GCloud SDK Usage: Initialized gcloud sdk before deploying application into app engine

$gcloud auth login

$gcloud config set project projectId

Used app engine "standard environment" to deploy the application for deploying use command

$gcloud app deploy(google sdk)

$gcloud app browse

Application "Hello World" Endpoint: https://skilled-curve-247615.appspot.com/

API endpoints:

/customers endpoint: https://skilled-curve-247615.appspot.com/customers

/customer?id=value endpoint with sample customer id's:

Customer with id: https://skilled-curve-247615.appspot.com/customer?id=103

Customer with id: https://skilled-curve-247615.appspot.com/customer?id=110

To Add New Customer into Datastore using Postman:

/customer endpoint: https://skilled-curve-247615.appspot.com/customer

Sample input for add new customer {	"customerId":"107",	"name":"Bob",	"email":"bob@bcci.com",	"phoneNumber":"+900219087" }
