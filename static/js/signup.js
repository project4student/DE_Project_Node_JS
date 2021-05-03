let maxdob = new Date();
if (document.querySelector("#dob")) {
	let year = maxdob.getFullYear();
	let day = maxdob.getDate() - 1;
	let month = maxdob.getMonth() + 1;
	day = day.toString().length == 1 ? "0" + day : day;
	month = month.toString().length == 1 ? "0" + month : month;
	maxdob = `${year - 18}-${month}-${day}`;
	document.querySelector("#dob").setAttribute("max", maxdob);
}

const submit = document.querySelector("input[type='submit']");
const form = document.querySelector("form");

let isValid = false;


const fname = document.querySelector("input[name='fname']");
fname.addEventListener("focusout", () => {
	isValid = validator.isAlpha(fname.value.trim(), "en-US", { ignore: " " });
	if (isValid) {
		fname.classList.remove("error");
		submit.classList.remove("disabled");
		submit.removeAttribute("disabled");
	}
	else {
		fname.classList.add("error");
		submit.classList.add("disabled");
		submit.setAttribute("disabled", "disabled");
	}
});



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



const mobile = document.querySelector("input[name='mobile']") || document.querySelector("input[name='tel']");
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



const dob = document.querySelector("input[name='dob']");
if (dob) {
	dob.addEventListener("focusout", () => {
		isValid = validator.isBefore(dob.value.trim(), maxdob);
		if (isValid) {
			dob.classList.remove("error");
			submit.classList.remove("disabled");
			submit.removeAttribute("disabled");
		}
		else {
			dob.classList.add("error");
			submit.classList.add("disabled");
			submit.setAttribute("disabled", "disabled");
		}
	});
}



const address = document.querySelector("textarea[name='address']");
if (address) {
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
}





const bloodGrp = document.querySelector("select[name='bloodGrp']");
if (bloodGrp) {
	bloodGrp.addEventListener("focusout", () => {
		if (bloodGrp.value.trim() != "select") {
			isValid = true;
			bloodGrp.classList.remove("error");
			submit.classList.remove("disabled");
			submit.removeAttribute("disabled");
		}
		else {
			isValid = false;
			bloodGrp.classList.add("error");
			submit.classList.add("disabled");
			submit.setAttribute("disabled", "disabled");
		}
	});
}


const city = document.querySelector("select[name='city']");
if (city) {
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
}




const password = document.querySelector("input[name='password']");
password.addEventListener("focusout", () => {
	isValid = validator.isStrongPassword(password.value.trim());
	if (isValid) {
		password.classList.remove("error");
		submit.classList.remove("disabled");
		submit.removeAttribute("disabled");
	}
	else {
		password.classList.add("error");
		submit.classList.add("disabled");
		submit.setAttribute("disabled", "disabled");
	}
});




const cpassword = document.querySelector("input[name='cpassword']");
cpassword.addEventListener("focusout", () => {
	isValid = validator.isStrongPassword(cpassword.value.trim());
	if (password.value.trim() !== cpassword.value.trim()) {
		cpassword.classList.add("error");
		submit.classList.add("disabled");
		submit.setAttribute("disabled", "disabled");
		document.querySelector("#err").innerHTML = "Password Must Match With Confirm Password";
	}
	else if (isValid) {
		cpassword.classList.remove("error");
		submit.classList.remove("disabled");
		submit.removeAttribute("disabled");
		document.querySelector("#err").innerHTML = "";
	}
	else {
		cpassword.classList.add("error");
		submit.classList.add("disabled");
		submit.setAttribute("disabled", "disabled");
		document.querySelector("#err").innerHTML = "";
	}
});



const gender = document.querySelectorAll("input[name='gender']");
const category = document.querySelectorAll("input[name='category']");


form.addEventListener("submit", e => {
	if (gender && !gender[0].checked && !gender[1].checked) {
		isValid = false;
	}
	else if(category && !category[0].checked && !category[1].checked) {
		isValid = false;
	}
	else {
		isValid = true;
	}
	if (!isValid) {
		e.preventDefault();
		document.querySelector(".err").innerHTML = "Enter Details prperly !!";
	}
	else {
		document.querySelector(".err").innerHTML = "";
	}
});