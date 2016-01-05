

$(document).ready(function(){
	
	/*variables to store division ids*/
	var addEmployee_div_id="#add-employee-main-division";
	var viewUpdate_div_id="#";
	
	
	/*variables to store link ids*/
	var addEmployee_link_id="#admin-add-employee-link";
	var viewUpdate_link_id="#admin-view-update-emp-link";
	
	console.log("in admin div controll script");
	
	
	$(addEmployee_link_id).click(function(){
		
		hideOrShowDivisions(addEmployee_div_id);
		
	});
	
    $(viewUpdate_link_id).click(function(){
		
		hideOrShowDivisions(viewUpdate_div_id);
		
	});
	
	function hideOrShowDivisions(divId){
		
		(divId == addEmployee_div_id)? $(addEmployee_div_id).show():  $(addEmployee_div_id).hide();
		
	};
	
});