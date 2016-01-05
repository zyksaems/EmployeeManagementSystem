

$(document).ready(function(){
	
	/*variables to store division ids*/
	var addEmployee_div_id="#add-employee-main-division";
	var viewUpdate_div_id="#admin-view-update-emp-link";
	
	
	/*variables to store link ids*/
	var addEmployee_link_id="#admin-add-employee-link";
	var viewUpdate_link_id="#admin-view-update-emp-link";
	
	console.log("in admin div controll script");
	
	/* This funcion is hits when
	 *  add employee link clicks
	 */
	$(addEmployee_link_id).click(function(){
		
		hideOrShowDivisions(addEmployee_div_id);
		
	}); // END --$(addEmployee_link_id).click()
	
	/* This funcion is hits when
	 *  view/update employee link clicks
	 */
    $(viewUpdate_link_id).click(function(){
		
		hideOrShowDivisions(viewUpdate_div_id);
		
	});// END -- $(viewUpdate_link_id).click()
	
    
    /* This funcion is to show only one division at a time
	 *  it shows division which comes as parameter
	 */
	function hideOrShowDivisions(divId){
		
		(divId == addEmployee_div_id)? $(addEmployee_div_id).show():  $(addEmployee_div_id).hide();
		
	};// END --  hideOrShowDivisions(divId)
	
});