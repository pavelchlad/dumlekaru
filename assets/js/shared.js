function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/* Loop through a collection of all HTML elements: */
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			/* Make an HTTP request using the attribute value as the file name: */
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) { elmnt.innerHTML = this.responseText; }
					if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
					/* Remove the attribute, and call this function once more: */
					elmnt.removeAttribute("w3-include-html");
					includeHTML();
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			/* Exit the function: */
			return;
		}
	}
}

function toogle() {
	var x = document.getElementById("myTopnav");
	var y = document.getElementById("myIcon");
	var z = document.getElementById("myToggle");
	if (x.className === "topnav") {
		x.className += " responsive";
		z.className += " responsive";
		y.className = "fa fa-plus";
	} else {
		x.className = "topnav";
		z.className = "toggle";
		y.className = "fa fa-bars";
	}
}
window.onscroll = function () {
	document.getElementById("myTopnav").className = "topnav";
	document.getElementById("myIcon").className = "fa fa-bars";
	document.getElementById("myToggle").className = "toggle";
}

function adjustHelperDivs() {
	const viewportWidth = window.innerWidth;
	const container = document.getElementById('about-content');
	const containerWidth = container.offsetWidth;
	const helperWidth = (viewportWidth - containerWidth) / 2 - 24;

	document.getElementById('left-helper').style.minWidth = helperWidth + 'px';
	document.getElementById('right-helper').style.minWidth = helperWidth + 'px';
}

function updateArrows() {
	const container = document.getElementById('slider-container');
	const prevArrow = document.getElementById('left-slider-arrow');
	const nextArrow = document.getElementById('right-slider-arrow');

	if (container.scrollLeft === 0) {
		prevArrow.classList.add('hidden');
	} else {
		prevArrow.classList.remove('hidden');
	}

	if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
		nextArrow.classList.add('hidden');
	} else {
		nextArrow.classList.remove('hidden');
	}
}

function createModals() {
	const modalButtons = document.querySelectorAll('button[data-modal]');
	const closeButtons = document.querySelectorAll('.modal-close');

	// Open modal on button click
	modalButtons.forEach(button => {
		button.addEventListener('click', () => {
			const modalId = button.getAttribute('data-modal');
			const modal = document.getElementById(modalId);
			if (modal) modal.style.display = 'flex';
		});
	});

	// Close modal on 'X' button click or when clicking outside the modal content

	closeButtons.forEach(button => {
		button.addEventListener('click', () => {
			const modal = button.closest('.modal');
			if (modal) modal.style.display = 'none';
		});
	});

	window.addEventListener('click', event => {
		if (event.target.classList.contains('modal')) {
			event.target.style.display = 'none';
		}
	});
}

// Poskytovana pece - taby
function openTab(evt, tabName, userInitiated = false) {
	const isMobile = window.matchMedia("(max-width: 750px)").matches;
	const tabContents = document.getElementsByClassName("tabcontent");
	const tabs = document.getElementsByClassName("tab");
	const clickedTab = evt.currentTarget;
	const content = document.getElementById(tabName);
	const alreadyActive = clickedTab.classList.contains("active");

	if (isMobile) {
		// Toggle behavior on mobile
		if (alreadyActive && userInitiated) {
			clickedTab.classList.remove("active");
			content.style.display = "none";
			return;
		}

		for (let i = 0; i < tabContents.length; i++) {
			tabContents[i].style.display = "none";
		}
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].classList.remove("active");
		}

		content.style.display = "block";
		clickedTab.classList.add("active");

		clickedTab.insertAdjacentElement("afterend", content);

		if (userInitiated) {
			setTimeout(() => {
				clickedTab.scrollIntoView({ behavior: "smooth", block: "start" });
			}, 100);
		}

	} else {
		// Desktop: prevent closing the current tab
		if (alreadyActive && userInitiated) return;

		for (let i = 0; i < tabContents.length; i++) {
			tabContents[i].style.display = "none";
		}
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].classList.remove("active");
		}
		content.style.display = "block";
		clickedTab.classList.add("active");

		clickedTab.parentElement.insertAdjacentElement("afterend", content);
	}
}


function initCarousel() {
	// Swiper
	const progressCircle = document.querySelector(".autoplay-progress svg");
	const progressContent = document.querySelector(".autoplay-progress span");
		var swiper = new Swiper(".mySwiper", {
		loop: true,
		autoplay: {
			delay: 10000,
			disableOnInteraction: false
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		on: {
			autoplayTimeLeft(s, time, progress) {
			progressCircle.style.setProperty("--progress", 1 - progress);
			progressContent.textContent = `${Math.ceil(time / 1000)}s`;
			}
		}
	});
}