let table = document.getElementById("grid");

for (let i = 0; i < 100; i++) {
	let row = table.insertRow(-1);
	for (let ii = 0; ii < 100; ii++) {
		let cell = row.insertCell(-1);
		let num = ((i * 100) + ii) + "";
		cell.setAttribute("id", `${num}`);
		cell.setAttribute("class", `click-me`);
	}
}


let devices = [];
let networks = [];
let results = [];

function calc() {
	let devicesNum = document.querySelector('#devices').value;
	let networksNum = document.querySelector('#networks').value;


	devices = [];
	networks = [];
	results = [];


	let c = document.getElementById("myCanvas");
	let ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height)


	if (devicesNum > 10000 || networksNum > 10000) {
		alert("Maximum value is 10000 due to the size of the grid");
	} else {

		for (let i = 0; i < 100; i++) {
			for (let ii = 0; ii < 100; ii++) {
				let cellNum = (i * 100) + ii;
				let cell = document.getElementById(cellNum);
				cell.classList.remove('network');
				cell.classList.remove('device');
			}
		}

		for (let i = 0; i < devicesNum; i++) {
			let temp = [0];
			temp[0] = getRandomInt(99);
			temp[1] = getRandomInt(99);
			devices.push(temp);
		}
		for (let i = 0; i < networksNum; i++) {
			let temp = [0];
			temp[0] = getRandomInt(100);
			temp[1] = getRandomInt(100);
			temp[2] = getRandomInt(15);
			networks.push(temp);
		}

		devices.forEach( (device, i) => {
			let res = [0];

			let cellNum = (device[1] * 100) + device[0];
			let cell = document.getElementById(cellNum);
			cell.classList.add('device');
			cell.setAttribute("dindex", `${i}`);

			networks.forEach ( (network, ii) => {
				let cellNum2 = (network[1] * 100) + network[0];
				let cell2 = document.getElementById(cellNum2);
				cell2.classList.add('network');
				cell2.setAttribute("nindex", `${ii}`);

				let x = Math.abs(device[0] - network[0]);
				let y = Math.abs(device[1] - network[1]);
				let d = Math.sqrt(x ** 2 + y ** 2);
				if (d <= network[2]) {
					let s = (network[2] - d) ** 2;
					if (res[0] < s) {
						res = [s, ii];
					}
				}
			})
			results.push(res);
		})
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

$('.click-me').click(function (event) {
	event.preventDefault();
	if (event.target.matches('.device')) {
		let cell = event.target;
		let index = cell.getAttribute("dIndex");
		if (results[index][0] === 0) {
			alert("No available network for this device");
			return;
		}


		let device = devices[index];
		let network = networks[results[index][1]];
		console.log(device);
		console.log(network);

		let x1 = (device[0] * 9) + 4;
		let y1 = (device[1] * 9) + 4;

		let x2 = (network[0] * 9) + 4;
		let y2 = (network[1] * 9) + 4;


		let c = document.getElementById("myCanvas");
		let ctx = c.getContext("2d");

		ctx.beginPath();
		ctx.lineWidth="5";
		ctx.strokeStyle="green";
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();
	}
	if (event.target.matches('.network')) {
		let cell = event.target;
		let index = cell.getAttribute("nindex");
		let network = networks[index];
		alert(`The radius of this network node is ${network[2]}`);
	}




});


alert("Please use a monitor with the minimum width of 1302px and height of 902px to use this site")
alert("This site was made in a hurry and for fun.\n" +
	"I made no effort to cleanup the code on this website.\n" +
	"This website is meant to be simply a visualization\n" +
	"Please use the main script (run.js) on the github page instead")
