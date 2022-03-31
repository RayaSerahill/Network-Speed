console.time("script");
const networks = [[0, 0, 9], [20, 20, 6], [10, 0, 12], [5, 5, 13], [99, 25, 2]];
const devices = [[0, 0], [100, 100], [15, 10], [18, 18], [13, 13], [25, 99]];
let results = [];

console.time("calculations");

for (let i = 0; i < devices.length; i++) {
	let res = [];
	res[0] = 0;
	for (let ii = 0; ii < networks.length; ii++) {
		let x = Math.abs(devices[i][0] - networks[ii][0]);
		let y = Math.abs(devices[i][1] - networks[ii][1]);
		let d = Math.sqrt(x**2+y**2);
		if (d <= networks[ii][2]) {
			let s = (networks[ii][2] - d)**2;
			if (res[0] < s) {
				res[0] = s;
				res[1] = ii;
			}
		}
	}
	results.push(res);
}

console.timeEnd("calculations");

for (let p = 0; p < results.length; p++) {
	if (results[p][0] === 0) {
		console.log(`No network station within reach for point ${devices[p][0]},${devices[p][1]}`);
	} else {
		console.log(`Best network station for point ${devices[p][0]},${devices[p][1]} is ${networks[results[p][1]][0]},${networks[results[p][1]][1]} with speed ${results[p][0]}`);
	}
}
console.timeEnd("script");
