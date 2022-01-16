const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url =
	"mongodb+srv://admin:admin@funixlab-nodejs.n4ini.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let _db;

const mongoConnect = (callback) => {
	MongoClient.connect(url)
		.then((client) => {
			console.log("Connected");
			_db = client.db();
			callback();
		})
		.catch((err) => console.log(err));
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
