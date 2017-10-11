'use strict';
const events = require('events');
const child_prcess = require('child_process');
const parser = require('xml2json').toJSON;
const isReachable = require('is-reachable');

/*
 * show the gateway nodes
 * poll the node state
 * control nodes / scene
 */

module.exports = Zwave = {};

Zwave.createConnection = function (setting, callback) {
	this.setting = setting;
	let path = 'http://' + setting.ip + ':5000';
	isReachable(path).then((reachable) => {
		var err = null;
		if (!reachable) err = new Error("Can't create connection to " + path + ' . Please check the network of the gateway.');
		callback(err);
	});

	return this;
}

Zwave.poll = function (node, callback) {
	let poll = (nodeId) => {
		let cmd = 'curl --digest -u ' + this.setting.acc + ':' + this.setting.password + ' ' + this.setting.ip + ':5000/node_detail.cgi -d "fun=load&id=' + nodeId + '"';
		child_process.exec(cmd, function (err, stdout) {
			let json = parser(stdout, {object: true});
			callback(err, json);
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

/* EXAMPLE */

const zwave = require('zwave');

let myGateway = new zwave.createConnection({
	acc:'admin',
	pwd: '123456',
	ip: '10.10.1.251'
}, function (err) {
	console.log(err);
});
