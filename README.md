# React Shop - SPA 
CRUD app built with MERN stack. 

Status: **IN PROGRESS**
 
## Built With

* [React](https://reactjs.org/) - Frontend framework
* [Express](https://expressjs.com/) - used to create API
* [Node.js](https://nodejs.org/en/) - used to create API
* [MongoDB](https://www.mongodb.com/cloud/atlas) - database

## Getting Started

In order to run and see actual version of this App locally on your computer you need to follow steps below.

### Prerequisites
- (unless you have already installed) - Install [Node.js](https://nodejs.org/en/) **LTS** version (has not been tested with current node version but it should work too). 
- 
### Installing

In order to run this App locally you need to:
1. Clone this repository 
```
git clone https://github.com/mdziadkowiec95/react-shop-app.git
```
2. install both **SERVER and CLIENT dependencies:**
- via npm scripts (from root repository directory)
```
npm install && npm client-install
``` 
or
- manually (from root repository directory)
```
npm install && cd client && npm install
```
3. Create [MongoDB database](https://www.mongodb.com/cloud/atlas) 
4. Create `.env` file inside root directory and set up MongoDB config data in the file as below:
```javascript
MONGO_DB_USER=username
MONGO_DB_PASSWORD=userpassword
MONGO_DB_URI=your-app-uri.mongodb.net/test?retryWrites=true&w=majority
```

## Running the tests
```
npm test
```
it should run some tests for API endpoints

## Deployment

```
npm run heroku-postbuild
```
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

