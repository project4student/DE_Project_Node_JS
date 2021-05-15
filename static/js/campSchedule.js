const container = document.querySelector(".container");
const tableContainer = document.querySelector(".table");
const city = document.querySelector("#city");
const fetchBtn = document.querySelector("#fetch");
const animation = document.querySelector(".animation");



const fetchCampSchedule = city => {


	animation.classList.add("loader");
	tableContainer.innerHTML = "";
	document.querySelector(".err").innerText = "";


	fetch(`/fetchSchedule?city=${city}`)
		.then(res => res.text())
		.then(resultJson => {


			animation.classList.remove("loader");
			const campScheduleArr = JSON.parse(resultJson);


			if (!Object.hasOwnProperty.call(campScheduleArr, "error")) {
				let table = document.createElement("table");
				table.id = "campScheduleTable";
				table.classList.add("display");
				table.style.width = "100%";


				let thead = document.createElement("thead");

				let tr = document.createElement("tr");
				let ths = ["Email", "Primary Phone", "Secondary Phone", "Date", "Address", "Time", "Apply"];
				ths.forEach(field => {
					let th = document.createElement("th");
					th.innerText = field;
					tr.appendChild(th);
				});


				thead.appendChild(tr);
				table.appendChild(thead);


				let tbody = document.createElement("tbody");
				campScheduleArr.forEach(camp => {
					let tr = document.createElement("tr");
					for (const field in camp) {
						if (field == "date") {
							let campDate = new Date(parseInt(camp["date"]));
							let day = campDate.getDate();
							let year = campDate.getFullYear();
							let month = getmonth(campDate.getMonth());
							let td = document.createElement("td");
							td.innerText = `${day}th ${month} ${year}`;
							tr.appendChild(td);
						}
						else {
							let td = document.createElement("td");
							td.innerText = camp[field];
							tr.appendChild(td);
						}
					}
					let td = document.createElement("td");
					td.innerHTML = `<a href="apply?id=${camp["email"]}&date=${camp["date"]}">Apply Now</a>`;
					tr.appendChild(td);
					tbody.appendChild(tr);
				});


				table.appendChild(tbody);
				tableContainer.appendChild(table);


				$('#campScheduleTable').DataTable({
					responsive: true
				});
			}
			else {
				document.querySelector(".err").innerText = campScheduleArr.error;
			}
		})
		.catch(err => {
			animation.classList.remove("loader");
			document.querySelector(".err").innerText = err.message;
		});
}

fetchBtn.addEventListener("click", () => {
	if (city.value !== "select") {
		fetchCampSchedule(city.value);
	}
	else {
		document.querySelector(".err").innerText = "Please Select City !!!";
	}
});


const getmonth = month => {
	switch (month) {
		case 0:
			return "January";
		case 1:
			return "Fabruary";
		case 2:
			return "March";
		case 3:
			return "April";
		case 4:
			return "May";
		case 5:
			return "June";
		case 6:
			return "July";
		case 7:
			return "August";
		case 8:
			return "September";
		case 9:
			return "October";
		case 10:
			return "November";
		case 11:
			return "December";
	}
}