console.time("script");


// I decided to use arrays to represent both devices and networks
// For devices the syntax is [z, y].
// Networks use the same syntax, but the 3rd value in networks is for reach [x, y, reach].

const networks = [[0, 0, 9], [20, 20, 6], [10, 0, 12], [5, 5, 13], [99, 25, 2]];
const devices = [[0, 0], [100, 100], [15, 10], [18, 18], [13, 13], [25, 99]];
let results = [];



// I ended up using forEach due to it being cleaner and easier to follow
// as opposed to alternatives like 'for'. I would use 'for' if we had a larger dataset,
// but at this scale the slower 'forEach' makes no difference

// [0] = x
// [1] = y
// [2] = reach

devices.forEach( device => {
	let res = [0];
	networks.forEach ( (network, i) => {
		// Calculating distance
		let x = Math.abs(device[0] - network[0]);
		let y = Math.abs(device[1] - network[1]);
		let d = Math.sqrt(x ** 2 + y ** 2);
		// Ignore networks which are out of range
		if (d <= network[2]) {
			// Calculating connection speed
			let s = (network[2] - d) ** 2;
			if (res[0] < s) res = [s, i];
		}
	})
	results.push(res);
})

results.forEach( (result, i) => {

	// I decided to declare a 'shorthand' variables here to avoid using too long variables
	// such as networks[results[1]][0] in middle of a message builder
	let device = devices[i];
	let network = networks[result[1]];

	let msg = result[0] === 0
		? `No network station within reach for point ${device[0]},${device[1]}`
		: `Best network station for point ${device[0]},${device[1]} is ${network[0]},${network[1]} with speed ${result[0]}`
	console.log(msg);

})

console.timeEnd("script");
