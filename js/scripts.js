var triangularTheoryOfLove = (function (d) {
    "use strict";

	var updateLoveComponents = (function () {
		// Closure - These values are only accesible from the following
		// function, they are not global.
		var passion = 0;
		var	intimacy = 0; 
		var	commitment = 0;
		console.log("Starting values: " + JSON.stringify({passion: passion, intimacy: intimacy, commitment: commitment}));
		return function (values) {
			if(typeof values !== 'undefined') {
				// I should check if the range of number is between 1 and 100
				if (validComponentValue(values["passion"])) {
					passion = values["passion"];
				}
				if (validComponentValue(values["intimacy"])) {
					intimacy = values["intimacy"];
				}
				if (validComponentValue(values["commitment"])) {
					commitment = values["commitment"];
				}
			}
			return {passion: passion, intimacy: intimacy, commitment: commitment};
		};
	})();
	function validComponentValue (number) {
		return ((typeof number !== 'undefined') && (/^\d+$/.test(number)) && (number >= 0) && (number <= 100));
	}
	function updateLoveComponentFromHash () {
		console.log("Hash: " + JSON.stringify(window.location.hash));
		if (window.location.hash !== 'undefined') {
		// if (window.location.hash !== 'undefined' && window.location.hash !== "") {
			var values = window.location.hash.substring(1).split(",");
			console.log("Hash: " + JSON.stringify({passion: values[0], intimacy: values[1], commitment: values[2]}));
			updateLoveComponents({passion: values[0], intimacy: values[1], commitment: values[2]});
		}
	}

	function updateHash (values) {
		window.location.hash = '#' + values["passion"] + ',' + values["intimacy"] + ',' + values["commitment"];	
	}
	function updateSliders (values) {
		d.getElementById("passion-slider").value = values["passion"];
		d.getElementById("intimacy-slider").value = values["intimacy"];
		d.getElementById("commitment-slider").value = values["commitment"];
	}
	function updateText (values) {
	  document.getElementById("passion_text").innerHTML = values["passion"];
	  document.getElementById("intimacy_text").innerHTML = values["intimacy"];
	  document.getElementById("commitment_text").innerHTML = values["commitment"];
	}
	function onSliderUpdates (values) {
		updateLoveComponents(values);
		updateHash(updateLoveComponents());
		updateText(updateLoveComponents());
	}
	function onLoadingThePage (values) {
		updateLoveComponents({passion: 0, intimacy: 0, commitment: 0});
		updateLoveComponentFromHash();
		updateSliders(updateLoveComponents());
		updateText(updateLoveComponents());
	}

	onLoadingThePage();
	//updateLoveComponents({passion: 23});
	//updateLoveComponents({passion: 22, intimacy: 3});
	//updateLoveComponents({passion: 22, intimacy: 3, commitment: 100});
	console.log(JSON.stringify(updateLoveComponents()));
	//updateHash(updateLoveComponents());
    return {
        // Exposing public methods for Unit Testing with Jasmine
        onSliderUpdates: onSliderUpdates
    };
}(document));