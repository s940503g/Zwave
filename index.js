'use strict';
const events = require('events');
<<<<<<< HEAD
const child_process = require('child_process');
const parser = require('xml2json').toJson;
=======
const child_prcess = require('child_process');
const parser = require('xml2json').toJSON;
>>>>>>> 8dff2b253e1b201a35729ae0c9af0e7be935acff
const isReachable = require('is-reachable');

/*
 * show the gateway nodes
 * poll the node state
 * control nodes / scene
 */
<<<<<<< HEAD
// var Zwave = {};

function Zwave () {}

exports.createConnection = function (setting) {
	let zwave = new Zwave();
	zwave.setting = setting;
	return zwave;
}

Zwave.prototype.connect = function (callback) {
	let path = this.setting.ip + ':5000';
=======
module.exports = Zwave = {};

Zwave.createConnection = function (setting, callback) {
	this.setting = setting;
	let path = 'http://' + setting.ip + ':5000';
>>>>>>> 8dff2b253e1b201a35729ae0c9af0e7be935acff
	isReachable(path).then((reachable) => {
		var err = null;
		if (!reachable) err = new Error("Can't create connection to " + path + ' . Please check the network of the gateway.');
		callback(err);
	});
<<<<<<< HEAD
}

Zwave.prototype.pollNode = function (node, callback) {
	let poll = (nodeId) => {
		let cmd = 'curl --digest -u ' + this.setting.acc + ':' + this.setting.pwd + ' ' + this.setting.ip + ':5000/node_detail.cgi -d "fun=load&id=' + nodeId + '"';
		child_process.exec(cmd, function (err, stdout) {
			let json = parser(stdout, {object: true});
			callback(err, json.node_detail.node);
=======

	return this;
}

Zwave.poll = function (node, callback) {
	let poll = (nodeId) => {
		let cmd = 'curl --digest -u ' + this.setting.acc + ':' + this.setting.password + ' ' + this.setting.ip + ':5000/node_detail.cgi -d "fun=load&id=' + nodeId + '"';
		child_process.exec(cmd, function (err, stdout) {
			let json = parser(stdout, {object: true});
			callback(err, json);
>>>>>>> 8dff2b253e1b201a35729ae0c9af0e7be935acff
		});
	}

	if (node instanceof Array) {
		node.forEach(function (nodeId) {
			poll(nodeId);
		});
	}else{
		poll(node);
	}
}

<<<<<<< HEAD
Zwave.prototype.pollAllNodeDetail = function (callback) {
	let cmd = 'curl --digest -u ' + this.setting.acc + ':' + this.setting.pwd + ' ' + this.setting.ip + ':5000/node_detail.cgi -d "fun=load"';

	console.log(cmd);

	child_process.exec(cmd, function (err, stdout) {
		let json = parser(stdout, {object: true});
		callback(err, json.node_detail);
	});
}

Zwave.prototype.control = function (value, callback) {
	let para = value.nodeId + '-' + value.class.replace(/\s/g, '+') + '-' + value.type + '-' + value.instance + '-' + value.index + '=' + value.input;
	let cmd = 'curl --digest -u ' + this.setting.acc + ':' + this.setting.pwd + ' ' + this.setting.ip + ':5000/valuepost.html -d "' + para + '"';

	child_process.exec(cmd, function (err, stdout) {
		console.log(stdout);
		callback(err);
	});
}
=======
/* EXAMPLE */

const zwave = require('zwave');

let myGateway = new zwave.createConnection({
	acc:'admin',
	pwd: '123456',
	ip: '10.10.1.251'
}, function (err) {
	console.log(err);
});



myGateway.poll({node: 1}, function (err, result) {

});


>>>>>>> 8dff2b253e1b201a35729ae0c9af0e7be935acff
