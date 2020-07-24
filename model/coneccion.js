const mysql = require('mysql');
//const { promisify } = require('util');
const config = require('../config/config.js');

class Database {
	constructor() {
		this.connection = mysql.createConnection({
			host: config.MYSQL_BD.HOST_BD,
			user: config.MYSQL_BD.USER_BD,
			password: config.MYSQL_BD.PASS_BD,
			database: config.MYSQL_BD.NAME_BD,
			multipleStatements: true
		});	
	}

	query(sql, args) {
		return new Promise((resolve, reject) => {
			this.connection.query(sql, args, (err, rows) => {
				if (err) return reject(err);
				resolve(rows);
			});
		});
	}
	close() {
		return new Promise((resolve, reject) => {
			this.connection.end((err) => {
				if (err) return reject(err);
				resolve();
			});
		});
    }
}
module.exports = new Database();
    /*
	beginTransaction() {
		return new Promise((resolve, reject) => {
			this.connection.beginTransaction((err) => {
				if (err) return reject(err);
				resolve();
			});
		});
	}
	rollback() {
		return new Promise((resolve, reject) => {
			this.connection.rollback((err) => {
				if (err) return reject(err);
				resolve();
			});
		});
	}
	commit() {
		return new Promise((resolve, reject) => {
			this.connection.commit((err) => {
				if (err) return reject(err);
				resolve();
			});
		});
    }
    */
