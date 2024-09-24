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