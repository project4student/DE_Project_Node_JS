

const pub = document.querySelector("#pub");
const hosbld = document.querySelector("#hosbld");
const pubbtn = document.querySelector("#pubbtn");
const hosbldbtn = document.querySelector("#hosbldbtn");
hosbld.style.display = "none";
pubbtn.addEventListener("click",()=>{
	pub.style.display = "block";
	hosbld.style.display = "none";
});
hosbldbtn.addEventListener("click",()=>{
	pub.style.display = "none";
	hosbld.style.display = "block";
});
