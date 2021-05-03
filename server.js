const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, "static");
const viewsPath = path.join(__dirname, "views");
app.use(express.static(staticPath));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', viewsPath);

// mongodb://localhost:27017/OnlineBloodBank

mongoose.connect("mongodb+srv://student4project:DE@53241716@ramc.izilq.mongodb.net/OnlineBloodBank?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: true
}).then(() => console.log(`connected to db successfully`)).catch((err) => console.log(err));

const hbSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true
	},
	phone: Number,
	address: String,
	category: String,
	city: String,
	password: String,
	tokens: [{
		token: {
			type: String
		}
	}]
});
const publicSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true
	},
	mobile: Number,
	dob: String,
	gender: String,
	bloodGroup: String,
	password: String,
	tokens: [{
		token: {
			type: String
		}
	}]
});
const campSchema = new mongoose.Schema({
	email: String,
	primaryPhone: String,
	secondaryPhone: String,
	date: String,
	address: String,
	city: String,
	time: String
});

const HB = new mongoose.model("hbuser", hbSchema);
const Public = new mongoose.model("publicuser", publicSchema);
const Camp = new mongoose.model("camp", campSchema);

const createToken = async user => {
	try {
		const token = jwt.sign({ _id: user._id.toString() }, "CHINTAN@MIHIR@AYAJ@RUSHIKESH");
		user.tokens = user.tokens.concat({ token });
		await user.save();
		return token;
	}
	catch (e) {
		console.log(e);
	}
}



app.get('/', (req, res) => {
	try {
		const token = req.cookies.jwt;
		const type = req.cookies.type;
		const result = jwt.verify(token, "CHINTAN@MIHIR@AYAJ@RUSHIKESH");
		res.render("loggedInHome", { type });
	}
	catch (err) {
		res.render("index");
	}
});

app.get("/bloodbanks", (req, res) => {
	try {
		const token = req.cookies.jwt;
		const type = req.cookies.type;
		const result = jwt.verify(token, "CHINTAN@MIHIR@AYAJ@RUSHIKESH");
		res.render("bloodbanks", { type });
	}
	catch (err) {
		res.render("bloodbanks", { type: "else" });
	}
});

app.get("/fetchBB", async (req, res) => {
	try {
		const bloodBanks = await HB.find({ city: req.query["city"] });
		if (bloodBanks.length > 0) {
			const bbs = [];
			bloodBanks.forEach(bb => {
				bbs.push({
					name: bb.name,
					address: bb.address,
					phone: bb.phone,
					email: bb.email,
					category: bb.category
				});
			});
			res.send(bbs);
		}
		else {
			throw new Error(`There is no Blood Bank in ${req.query["city"]} !!`);
		}
	}
	catch (err) {
		res.send({ "error": err.message });
	}
});

app.get('/signup', (req, res) => {
	let queryParams = req.query;
	res.render('signup', { option: queryParams["signup"] });
});

app.post("/signup", async (req, res) => {
	try {
		const query = req.query;
		if (query["type"] == "public") {
			const name = req.body.fname.trim();
			const email = req.body.email.trim();
			const mobile = req.body.mobile.trim();
			const dob = new Date(req.body.dob.trim()).getTime();
			const gender = req.body.gender;
			const bloodGroup = req.body.bloodGrp.trim();
			const password = req.body.password.trim();
			const cpassword = req.body.cpassword.trim();
			if (password != cpassword) {
				throw new Error("Enter Valid Credentials !!");
			}
			const result = await Public.findOne({ email });
			if (result) {
				throw new Error("Email is  already registered !!");
			}
			else {
				const passwordHashed = await bcrypt.hash(password, 10);
				publicSch = { name, email, mobile, dob, gender, bloodGroup, password: passwordHashed };
				const pub = new Public(publicSch);
				const r = await pub.save();
				if (r) {
					res.render("signup", { option: "Public", suc: "Successfully Registered !" });
				}
			}
		}
		if (query["type"] == "hb") {
			const name = req.body.fname.trim();
			const email = req.body.email.trim();
			const phone = req.body.tel.trim();
			const address = req.body.address.trim();
			const category = req.body.category;
			const city = req.body.city.trim();
			const password = req.body.password.trim();
			const cpassword = req.body.cpassword.trim();
			if (password != cpassword) {
				throw new Error("Enter Valid Credentials !!");
			}
			const result = await HB.findOne({ email });
			if (result) {
				throw new Error("Email is  already registered !!");
			}
			else {
				const passwordHashed = await bcrypt.hash(password, 10);
				hbSch = { name, email, phone, address, category, city, password: passwordHashed };
				const hb = new HB(hbSch);
				const r = await hb.save();
				if (r) {
					res.render("signup", { option: "Hospital / Bloodbank", suc: "Successfully Registered !" });
				}
			}
		}

	}
	catch (e) {
		res.render("signup", { option: "Public", err: e.message });
	}
});

app.get('/login', (req, res) => {
	try {
		const token = req.cookies.jwt;
		const result = jwt.verify(token, "CHINTAN@MIHIR@AYAJ@RUSHIKESH");
		res.render("loggedInHome")
	}
	catch (err) {
		res.render('login');
	}
});

app.post("/login", async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const user = await Public.findOne({ email }) || await HB.findOne({ email });
		if (user) {
			const type = "category" in user ? "HB" : "Public";
			const originalPass = user.password;
			const verified = await bcrypt.compare(password, originalPass);
			if (verified) {
				const token = await createToken(user);
				res.cookie("name", `${user.name}`);
				res.cookie("email", `${user.email}`);
				res.cookie("type", `${type}`);
				res.cookie("jwt", token);
				res.redirect("/");
			}
			else {
				throw new Error("Enter Valid Credentials !!");
			}
		}
		else {
			throw new Error("Enter Valid Credentials !!");
		}
	} catch (e) {
		res.render("login", { err: e.message });
	}
});

app.get("/organize", (req, res) => {
	try {
		const token = req.cookies.jwt;
		const type = req.cookies.type;
		const result = jwt.verify(token, "CHINTAN@MIHIR@AYAJ@RUSHIKESH");
		if (type != "HB")
			throw new Error();
		res.render("organizeCamp");
	}
	catch (err) {
		res.render('login');
	}
});

app.post("/organize", async (req, res) => {
	try {
		const email = req.body.email.trim();
		const r = await HB.findOne({ email });
		if (r) {
			const primaryPhone = req.body.primaryPhone.trim();
			const secondaryPhone = req.body.secondaryPhone.trim();
			const address = req.body.address.trim();
			const city = req.body.city.trim();
			const from = req.body.from;
			const to = req.body.to;
			let fromHours = parseInt(from.split(":")[0]);
			let fromMinutes = from.split(":")[1];
			let toHours = parseInt(to.split(":")[0]);
			let toMinutes = to.split(":")[1];
			let totime, fromtime;
			if (toHours > 12) {
				toHours = (toHours - 12) < 10 ? "0" + (toHours - 12) : toHours - 12;
				totime = `${toHours} : ${toMinutes} PM`;
			}
			else {
				toHours = toHours < 10 ? "0" + toHours : toHours;
				totime = `${toHours} : ${toMinutes} AM`;
			}
			if (fromHours > 12) {
				fromHours = (fromHours - 12) < 10 ? "0" + (fromHours - 12) : fromHours - 12;
				fromtime = `${fromHours} : ${fromMinutes} PM`;
			}
			else {
				fromHours = fromHours < 10 ? "0" + fromHours : fromHours;
				fromtime = `${fromHours} : ${fromMinutes} AM`;
			}
			let time = `${fromtime} To ${totime}`;
			const date = new Date(req.body.date).getTime();
			const campDetails = { email, primaryPhone, secondaryPhone, date, address, city, time };
			const newCamp = new Camp(campDetails);
			const result = await newCamp.save();
			if (result) {
				res.render("organizeCamp", { suc: "Successfully organized camp !!" });
			}
		}
		else {
			throw new Error("This Email can't be used to organize camp !!!");
		}
	}
	catch (e) {
		console.log(e);
		res.render("organizeCamp", { err: e.message });
	}
});

app.get("/logout", async (req, res) => {
	try {
		const token = req.cookies.jwt;
		const result = jwt.verify(token, "CHINTAN@MIHIR@AYAJ@RUSHIKESH");
		const user = await Public.findOne({ email: req.cookies.email }) || await HB.findOne({ email: req.cookies.email });
		if (user) {
			user.tokens = user.tokens.filter(currentToken => currentToken.token !== token);
			await user.save();
			res.clearCookie("jwt");
			res.clearCookie("name");
			res.clearCookie("email");
			res.clearCookie("type");
			res.redirect("/");
		}
	} catch (err) {
		res.redirect("/login");
	}
});

app.get("*", (req, res) => {
	res.status(404).send("This Page Couldn't Be Found");
});


app.listen(port, () => console.log(`http://localhost:${port}`));


/*
	mongodb+srv://student4project:DE@53241716@ramc.izilq.mongodb.net/OnlineBloodBank?retryWrites=true&w=majority
*/