$(document).ready(function(){
	
	
	/*creating variables for links in UI*/
	var aboutLink_id="#about-li";
	var contactLink_id="#contact-li";
	var changePasswordLink_id="#show-Employee-Cahange-password-div";
	var homeLink_id="#home-li";
	
	
	/*creating variablesto store division ids */
	var employeeChangePasswordDiv_id="#employee-change-passowrd-div";
	var aboutUsDiv_id="#about-us-div";
	var attendanceForm_id="#in-time-form";
	var contactUsDiv_id="#contact-us-div";
	
	/*variables to store css classes*/
	var active="active";
	
	/*first display attendance divisiion as default divsision*/
	/*functionc all to hide remaining divisions*/
	diplayOnlyOneDivision(attendanceForm_id);
	

	
	/*
     * This function is to show attendance division when button clicks
     */
	$(homeLink_id).click(function(){
		// reload the page
		 location.reload();
		/*functionc all to hide remaining divisions*/
		//diplayOnlyOneDivision(attendanceForm_id);
		
	});// END -- $(homeLink_id).click()
	
	/*
     * This function is to show about us division when button clicks
     */
	$(aboutLink_id).click(function(){
		/*functionc all to hide remaining divisions*/
		diplayOnlyOneDivision(aboutUsDiv_id);		  
		
	});// END -- $(aboutLink_id).click()
	
	/*
     * This function is to show contact us division when button clicks
     */
	$(contactLink_id).click(function(){
		/*functionc all to hide remaining divisions*/
		diplayOnlyOneDivision(contactUsDiv_id);		  
		
	});// END -- $(contactLink_id).click()
	
	/*
     * This function is to show employee change password division when button clicks
     */
    $(changePasswordLink_id).click(function(){
 	   /*functionc all to hide remaining divisions*/
 	  diplayOnlyOneDivision(employeeChangePasswordDiv_id);
 	 /* function call to set default vlaues */
 	 setEmployeeChangePasswordDefaultValues();
 	   
    });// END -- $(changePasswordLink_id).click()
	
	/*
	 * This functtion is to idsplay only one division and hides remaining divisions
	 * This function diplays division which you sent as parameter
	 */
	function diplayOnlyOneDivision(divId){
		
		//console.log("hide/show page divisions");
		(divId == employeeChangePasswordDiv_id)? $(employeeChangePasswordDiv_id).show()&& $(changePasswordLink_id).addClass(active) :$(employeeChangePasswordDiv_id).hide()&& $(changePasswordLink_id).removeClass(active);
		(divId == attendanceForm_id)? $(attendanceForm_id).show()&& $(homeLink_id).addClass(active):$(attendanceForm_id).hide()&& $(homeLink_id).removeClass(active);
		(divId == aboutUsDiv_id)? $(aboutUsDiv_id).show()&& $(aboutLink_id).addClass(active):$(aboutUsDiv_id).hide()&& $(aboutLink_id).removeClass(active);
		(divId == contactUsDiv_id)? $(contactUsDiv_id).show()&& $(contactLink_id).addClass(active):$(contactUsDiv_id).hide()&& $(contactLink_id).removeClass(active);
		
	};// END -- diplayOnlyOneDivision(divId)
	
	
	
});