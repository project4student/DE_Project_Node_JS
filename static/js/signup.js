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

const validate = (whose, what) => {
	if (what == "valid") {
		whose.classList.remove("error");
		submit.classList.remove("disabled");
		submit.removeAttribute("disabled");
	}
	else {
		whose.classList.add("error");
		submit.classList.add("disabled");
		submit.setAttribute("disabled", "disabled");
	}
}

const fname = document.querySelector("input[name='fname']");
fname.addEventListener("focusout", () => {
	isValid = validator.isAlpha(fname.value.trim(), "en-US", { ignore: " " });
	isValid ? validate(fname, "valid") : validate(fname, "invalid");
});



const email = document.querySelector("input[name='email']");
email.addEventListener("focusout", () => {
	isValid = validator.isEmail(email.value.trim());
	isValid ? validate(email, "valid") : validate(email, "invalid");
});



const mobile = document.querySelector("input[name='mobile']") || document.querySelector("input[name='tel']");
mobile.addEventListener("focusout", () => {
	isValid = validator.isMobilePhone(mobile.value.trim(), "en-IN");
	isValid ? validate(mobile, "valid") : validate(mobile, "invalid");
});



const dob = document.querySelector("input[name='dob']");
if (dob) {
	dob.addEventListener("focusout", () => {
		isValid = validator.isBefore(dob.value.trim(), maxdob);
		isValid ? validate(dob, "valid") : validate(dob, "invalid");
	});
}



const address = document.querySelector("textarea[name='address']");
if (address) {
	address.addEventListener("focusout", () => {
		isValid = validator.isEmpty(address.value.trim());
		isValid ? validate(address, "valid") : validate(address, "invalid");
	});
}





const bloodGrp = document.querySelector("select[name='bloodGrp']");
if (bloodGrp) {
	bloodGrp.addEventListener("focusout", () => {
		if (bloodGrp.value.trim() != "select") {
			isValid = true;
			validate(bloodGrp, "valid");
		}
		else {
			isValid = false;
			validate(bloodGrp, "invalid");
		}
	});
}


const city = document.querySelector("select[name='city']");
if (city) {
	city.addEventListener("focusout", () => {
		if (city.value.trim() != "select") {
			isValid = true;
			validate(city, "valid");
		}
		else {
			isValid = false;
			validate(city, "invalid")
		}
	});
}




const password = document.querySelector("input[name='password']");
password.addEventListener("focusout", () => {
	isValid = validator.isStrongPassword(password.value.trim());
	isValid ? validate(password, "valid") : validate(password, "invalid");
});




const cpassword = document.querySelector("input[name='cpassword']");
cpassword.addEventListener("focusout", () => {
	isValid = validator.isStrongPassword(cpassword.value.trim());
	if (password.value.trim() !== cpassword.value.trim()) {
		validate(cpassword, "invalid");
		document.querySelector("#err").innerHTML = "Password Must Match With Confirm Password";
	}
	else if (isValid) {
		validate(cpassword, "valid");
		document.querySelector("#err").innerHTML = "";
	}
	else {
		validate(cpassword, "invalid");
		document.querySelector("#err").innerHTML = "";
	}
});



const gender = document.querySelectorAll("input[name='gender']");
const category = document.querySelectorAll("input[name='category']");


form.addEventListener("submit", e => {
	if (gender && !gender[0].checked && !gender[1].checked) {
		isValid = false;
	}
	else if (category && !category[0].checked && !category[1].checked) {
		isValid = false;
	}
	if (!isValid) {
		e.preventDefault();
		document.querySelector(".err").innerHTML = "Enter Details prperly !!";
	}
	else {
		document.querySelector(".err").innerHTML = "";
	}
});