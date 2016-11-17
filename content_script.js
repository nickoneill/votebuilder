// Hi, I made this because votebuilder was being a pain
// questions and comments: nick.oneill@gmail.com
// -Nick

// updates
// 0.0.2
// * always show highlighted
// * save button
// * fixes 16 list items issue
// 0.0.3
// * works on votebuilder.com
// 0.0.4
// * change color for highlight
// * next / prev button

var currentIndex = 1;
var selectedSelect = 0;
selectRow(currentIndex);

var keyDownHandler = function(e) {
	// don't capture key commands if an input is focused
	if (document.activeElement.tagName == "INPUT") {
		return;
	}

	// console.log(e.keyCode);

	// arrow keys
	if (e.keyCode == 40) {
		e.preventDefault();
		nextRow();
	} else if (e.keyCode == 39) {
		e.preventDefault();
		nextOption();
	} else if (e.keyCode == 38) {
		e.preventDefault();
		prevRow();
	} else if (e.keyCode == 37) {
		e.preventDefault();
		prevOption();
	}

	// tab (or shift-tab) between options
	if (e.keyCode == 9) {
		e.preventDefault();

		if (e.shiftKey) {
			prevOption();
		} else {
			nextOption();			
		}
	}

	// number keys for selecting values
	if (e.keyCode == 48) {
		e.preventDefault();
		pickOption(0);
	} else if (e.keyCode == 49) { 
		e.preventDefault();
		pickOption(1);
	} else if (e.keyCode == 50) {
		e.preventDefault();
		pickOption(2);
	} else if (e.keyCode == 51) {
		e.preventDefault();
		pickOption(3);
	} else if (e.keyCode == 52) {
		e.preventDefault();
		pickOption(4);
	} else if (e.keyCode == 53) {
		e.preventDefault();
		pickOption(5);
	} else if (e.keyCode == 54) {
		e.preventDefault();
		pickOption(6);
	} else if (e.keyCode == 55) {
		e.preventDefault();
		pickOption(7);
	} else if (e.keyCode == 56) {
		e.preventDefault();
		pickOption(8);
	} else if (e.keyCode == 57) {
		e.preventDefault();
		pickOption(9);
	}

	// "a" for mark not home
	if (e.keyCode == 65) {
		e.preventDefault();
		$("#ctl00_ContentPlaceHolderVANPage_ButtonMarkNotHome").click();
	}

	// "s" for save
	if (e.keyCode == 83) {
		e.preventDefault();
		hrefit("#ctl00_ContentPlaceHolderVANPage_ControlPanel_SaveButton");
	}

	// can't get b or n to work using the same method as s, no clue why, so fake it

	// "b" for back 66
	if (e.keyCode == 66) {
		e.preventDefault();
		clickit("#ctl00_ContentPlaceHolderVANPage_ControlPanel_SaveGoPreviousButton");
	}

	// "n" for next 78
	if (e.keyCode == 78) {
		e.preventDefault();
		clickit("#ctl00_ContentPlaceHolderVANPage_ControlPanel_SaveGoNextButton");
	}
}

// clickit and hrefit are different methods to fake clicks in a way that continues to use the pages' click / change handlers
// which does useful things like autofils the canvasser field
function clickit(sel) {
	var event = new MouseEvent('click', {
	    'view': window,
	    'bubbles': true,
	    'cancelable': true
	});
	$(sel)[0].dispatchEvent(event);
}

function hrefit(sel) {
	$(sel).css("backgroundColor","#3399cc");
	var href = $(sel).attr("href");
	// console.log("doing",href);
	window.location = href;
}

// unbind so we don't ever double-handle keys
$(document).unbind("keydown");
$(document).bind("keydown", keyDownHandler);

// move to the next row
function nextRow() {
	// don't count the head or foot
	var listLength = $("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr").length - 2;
	if (currentIndex >= listLength) {
		// end of list
	} else {
		currentIndex++;
		selectRow(currentIndex);		
	}
}

// move to the previous row
function prevRow() {
	if (currentIndex <= 1) {
		// start of list
	} else {
		currentIndex--;
		selectRow(currentIndex);
	}
}

// highlight the selected row at index
function selectRow(index) {
	// selectedSelect = 0

	// turn off all other selections
	$("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr").css("backgroundColor","white");
	$("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr select").css("backgroundColor","inherit");
	$("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr:eq("+index+")").css("backgroundColor","#c7dce2");

	selectSelect(selectedSelect);
}

// highlight the selected option at index in the current row
// also: move the window offset around so the option element is always in view
function selectSelect(index) {
	$("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr:eq("+currentIndex+") select:eq("+index+")").css("backgroundColor", "#f9efa4");

	// make sure select is visible
	var offset = $("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr:eq("+currentIndex+") select:eq("+index+")").offset();
	var width = $("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr:eq("+currentIndex+") select:eq("+index+")").outerWidth();
	var height = $("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr:eq("+currentIndex+") select:eq("+index+")").outerHeight();
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;

	var setWidth = null;
	var setHeight = null;
	if (offset.left + width > windowWidth+window.scrollX) {
		setWidth = offset.left-windowWidth+width;
	}
	if (offset.top + height > windowHeight+window.scrollY) {
		setHeight = offset.top-windowHeight+height;
	}

	if (setWidth != null && setHeight != null) {
		window.scrollTo(setWidth, setHeight);
	} else if (setWidth != null) {
		window.scrollTo(setWidth, window.scrollY);
	} else if (setHeight != null) {
		window.scrollTo(window.scrollX, setHeight);
	}
}

// select an option value
function pickOption(index) {
	$("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr:eq("+currentIndex+") select:eq("+selectedSelect+") option:eq("+index+")").prop("selected",true);

	var changeEvent = document.createEvent("HTMLEvents");
	changeEvent.initEvent("change", true, true);
	$("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr:eq("+currentIndex+") select:eq("+selectedSelect+")")[0].dispatchEvent(changeEvent);
}

// move to the previous option element
function prevOption() {
	if ($("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr:eq("+currentIndex+") select:eq("+(selectedSelect-1)+")").length == 0) {
		prevRow();
	} else {
		$("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr select").css("backgroundColor","inherit");

		selectedSelect--;
		selectSelect(selectedSelect);
	}

}

// move to the next option element
function nextOption() {
	if ($("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr:eq("+currentIndex+") select:eq("+(selectedSelect+1)+")").length == 0) {
		nextRow();
	} else {
		if ($("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr:eq("+currentIndex+") select:eq("+(selectedSelect+1)+")").prop("disabled") == true) {
			nextRow();
		} else {
			$("#vanContent #ctl00_ContentPlaceHolderVANPage_gvList>tbody>tr select").css("backgroundColor","inherit");

			selectedSelect++;
			selectSelect(selectedSelect);
		}
	}
}