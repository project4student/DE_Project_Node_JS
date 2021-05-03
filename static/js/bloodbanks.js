const container = document.querySelector(".container");
const tableContainer = document.querySelector(".table");
const city = document.querySelector("#city");
const fetchBtn = document.querySelector("#fetch");
const animation = document.querySelector(".animation");



const fetchBloodBanks = city => {


	animation.classList.add("loader");
	tableContainer.innerHTML = "";
	document.querySelector(".err").innerText = "";


	fetch(`/fetchBB?city=${city}`)
		.then(res => res.text())
		.then(resultJson => {


			animation.classList.remove("loader");
			const bbs = JSON.parse(resultJson);


			if (!Object.hasOwnProperty.call(bbs, "error")) {
				let table = document.createElement("table");
				table.id = "bloodBanks";
				table.classList.add("display");
				table.style.width = "100%";


				let thead = document.createElement("thead");

				let tr = document.createElement("tr");
				let ths = ["Name", "Address", "Phone", "Email", "Category"];
				ths.forEach(field => {
					let th = document.createElement("th");
					th.innerText = field;
					tr.appendChild(th);
				});


				thead.appendChild(tr);
				table.appendChild(thead);


				let tbody = document.createElement("tbody");
				bbs.forEach(bb => {
					let tr = document.createElement("tr");
					for (const field in bb) {
						let td = document.createElement("td");
						td.innerText = bb[field];
						tr.appendChild(td);
					}
					tbody.appendChild(tr);
				});


				table.appendChild(tbody);
				tableContainer.appendChild(table);


				$('#bloodBanks').DataTable({
					responsive: true
				});
			}
			else {
				document.querySelector(".err").innerText = bbs.error;
			}
		})
		.catch(err => {
			animation.classList.remove("loader");
			document.querySelector(".err").innerText = err.message;
		});
}

fetchBtn.addEventListener("click", () => {
	if (city.value !== "select") {
		fetchBloodBanks(city.value);
	}
	else {
		document.querySelector(".err").innerText = "Please Select City !!!";
	}
});