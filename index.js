'use strict';
const events = require('events');
const child_process = require('child_process');
const parser = require('xml2json').toJson;
const isReachable = require('is-reachable');

/*
 * show the gateway nodes
 * poll the node state
 * control nodes / scene
 */

function Zwave () {}

exports.createConnection = function (setting) {
	let zwave = new Zwave();
	zwave.setting = setting;
	return zwave;
}

Zwave.prototype.connect = function (callback) {
	let path = this.setting.ip + ':5000';
	isReachable(path).then((reachable) => {
		var err = null;
		if (!reachable) err = new Error("Can't create connection to " + path + ' . Please check the network of the gateway.');
		callback(err);
	});
}

Zwave.prototype.pollNode = function (node, callback) {
	let poll = (nodeId) => {
		let cmd = 'curl --digest -u ' + this.setting.acc + ':' + this.setting.pwd + ' ' + this.setting.ip + ':5000/node_detail.cgi -d "fun=load&id=' + nodeId + '"';
		child_process.exec(cmd, function (err, stdout) {
			let json = parser(stdout, {object: true});
			callback(err, json.node_detail.node);
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
