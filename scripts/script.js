const form = document.getElementsByTagName('form')[0];
const error_icons = document.getElementsByClassName("error_icon");
const error_messages = document.getElementsByClassName("error_message");
const empty_error = "Sorry, empty field";
const invalid_format_error = "Sorry, invalid format";


form.addEventListener("submit", async function(e){
	e.preventDefault();
	const formdata = new FormData(form);
	if(!validate_form()){
		return
	}
	try {
		const response = await fetch("../cgi-bin/submit-form.py", {
			method: "post",
			body: formdata,
		});

		if (response.ok) {
			const responseData = await response.json();
			console.log(responseData.message);
			reset_form();
		}
		else {
			console.error("Form submission failed: ", response.statusText);
		}
	} catch (error) {
		console.error("Error submitting form: ", error);
	}
})


function validate_name() {
	if (!form.name.value){
		return false
	}
	return true
}

function validate_message() {
	if (!form.message.value) {
		return false
	}
	return true
}

function validate_email() {
	if (!form.email.value) {
		return 0 
	}
	else if(!valid_email(form.email.value)){
		return 1
	}
	else {
		return 2
	}
}

function valid_email(text){
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)){
		return true
	}
	return false
}

function validate_form() {
	let valid = true;
	if (!validate_name()){
		form.name.style.borderBottom = '1px solid red';
		error_icons[0].style.display = "block";
		error_messages[0].innerText = empty_error;
		valid = false;
	}
	switch (validate_email()) {
		case 0 :
			form.email.style.borderBottom = '1px solid red';
			error_icons[1].style.display = "block";
			error_messages[1].innerText = empty_error;
			valid = false;
			break
		
		case 1 :
			form.email.style.borderBottom = '1px solid red';
			error_icons[1].style.display = "block";
			error_messages[1].innerText = invalid_format_error;
			valid = false;
			break
		case 2 :
	}
	if (!validate_message()){
		form.message.style.borderBottom = '1px solid red';
		error_icons[2].style.display = "block";
		error_messages[2].innerText = empty_error;
		valid = false;
	}
	return valid
}

function reset_form (){
	form.name.style.borderBottom = '1px solid hsl(0, 0%, 85%)';
	form.email.style.borderBottom = '1px solid hsl(0, 0%, 85%)';
	form.message.style.borderBottom = '1px solid hsl(0, 0%, 85%)';
	error_icons[0].style.display = "none";
	error_icons[1].style.display = "none";
	error_icons[2].style.display = "none";

	error_messages[0].innerText = "";
	error_messages[1].innerText = "";
	error_messages[2].innerText = "";
}