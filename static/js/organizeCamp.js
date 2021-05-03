let mindate = new Date();
let year = mindate.getFullYear();
let day = mindate.getDate() + 1;
let month = mindate.getMonth() + 1;
day = day.toString().length == 1 ? "0" + day : day;
month = month.toString().length == 1 ? "0" + month : month;
mindate = `${year}-${month}-${day}`;
document.querySelector("#date").setAttribute("min", mindate);


const submit = document.querySelector("input[type='submit']");
const form = document.querySelector("form");

let isValid = false;

const email = document.querySelector("input[name='email']");
email.addEventListener("focusout", () => {
	isValid = validator.isEmail(email.value.trim());
	if (isValid) {
		email.classList.remove("error");
		submit.classList.remove("disabled");
		submit.removeAttribute("disabled");
	}
	else {
		email.classList.add("error");
		submit.classList.add("disabled");
		submit.setAttribute("disabled", "disabled");
	}
});

const mobiles = document.querySelectorAll("input[type='number']");
mobiles.forEach(mobile => {
	mobile.addEventListener("focusout", () => {
		isValid = validator.isMobilePhone(mobile.value.trim(), "en-IN");
		if (isValid) {
			mobile.classList.remove("error");
			submit.classList.remove("disabled");
			submit.removeAttribute("disabled");
		}
		else {
			mobile.classList.add("error");
			submit.classList.add("disabled");
			submit.setAttribute("disabled", "disabled");
		}
	});
});

const date = document.querySelector("input[name='date']");
date.addEventListener("focusout", () => {
	isValid = validator.isAfter(date.value.trim(), mindate);
	if (isValid) {
		date.classList.remove("error");
		submit.classList.remove("disabled");
		submit.removeAttribute("disabled");
	}
	else {
		date.classList.add("error");
		submit.classList.add("disabled");
		submit.setAttribute("disabled", "disabled");
	}
});

const address = document.querySelector("textarea");
address.addEventListener("focusout", () => {
	isValid = validator.isEmpty(address.value.trim());
	if (!isValid) {
		address.classList.remove("error");
		submit.classList.remove("disabled");
		submit.removeAttribute("disabled");
	}
	else {
		address.classList.add("error");
		submit.classList.add("disabled");
		submit.setAttribute("disabled", "disabled");
	}
});

const city = document.querySelector("select[name='city']");
city.addEventListener("focusout", () => {
	if (city.value.trim() != "select") {
		isValid = true;
		city.classList.remove("error");
		submit.classList.remove("disabled");
		submit.removeAttribute("disabled");
	}
	else {
		isValid = false;
		city.classList.add("error");
		submit.classList.add("disabled");
		submit.setAttribute("disabled", "disabled");
	}
});

const from = document.querySelector("#from");
const to = document.querySelector("#to");
to.addEventListener("focusout", () => {
	let fromHours = parseInt(from.value.split(":")[0]);
	let fromMinutes = parseInt(from.value.split(":")[1]);
	let toHours = parseInt(to.value.split(":")[0]);
	let toMinutes = parseInt(to.value.split(":")[1]);
	let diffMinutes = toMinutes - fromMinutes;
	let diffHours = diffMinutes < 0 ? toHours - 1 - fromHours : toHours - fromHours;
	diffMinutes = diffMinutes < 0 ? diffMinutes + 60 : diffMinutes;
	diffTime = diffHours + diffMinutes * 100 / 60 / 100
	if (diffTime < 0) {
		isValid = false;
		to.classList.add("error");
		submit.classList.add("disabled");
		submit.setAttribute("disabled", "disabled");
	}
	else {
		isValid - true;
		to.classList.remove("error");
		submit.classList.remove("disabled");
		submit.removeAttribute("disabled");
	}
});