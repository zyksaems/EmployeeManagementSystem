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
	
	/*first display attendance divisiion as default divsision*/
	/*functionc all to hide remaining divisions*/
	diplayOnlyOneDivision(attendanceForm_id);
	

	
	/*
     * This function is to show attendance division when button clicks
     */
	$(homeLink_id).click(function(){
		
		/*functionc all to hide remaining divisions*/
		diplayOnlyOneDivision(attendanceForm_id);
		
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
 	   
    });// END -- $(changePasswordLink_id).click()
	
	/*
	 * This functtion is to idsplay only one division and hides remaining divisions
	 * This function diplays division which you sent as parameter
	 */
	function diplayOnlyOneDivision(divId){
		
		console.log("hide/show page divisions");
		(divId == employeeChangePasswordDiv_id)? $(employeeChangePasswordDiv_id).show():$(employeeChangePasswordDiv_id).hide();
		(divId == attendanceForm_id)? $(attendanceForm_id).show():$(attendanceForm_id).hide();
		(divId == aboutUsDiv_id)? $(aboutUsDiv_id).show():$(aboutUsDiv_id).hide();
		(divId == contactUsDiv_id)? $(contactUsDiv_id).show():$(contactUsDiv_id).hide();
		
	};// END -- diplayOnlyOneDivision(divId)
	
	
	
});