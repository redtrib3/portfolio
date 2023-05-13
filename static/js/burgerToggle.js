// Script to Toggle Burger Menu (Mobile)

const burgerIcon = document.querySelector("#burger");
const navlinks = document.querySelector("#links_Nav");


// event listener on Menu click 

burgerIcon.addEventListener('click',() => {
	burgerIcon.classList.toggle('is-active');   // Changes the Three bars to cross-symbol(X) on dropdown
 	navlinks.classList.toggle('is-active');   // Brings the Dropdown 
})

