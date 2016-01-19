
  $("document").ready(function(){
	
	  console.log("Admin left menu controller");
	  
	  /*variables to store  link ids*/
	 var anualProductivity_link_id="#anual-productivity-link";
	 var monthlyProductivity_link_id="#monthly-productivity-link";
	 var dailyAttendance_link_id="#daily-attendance-link";
	 var weeklyProductivity_link_id="#weekly-productivity-link";	 
	 var addEmployee_link_id="#admin-add-employee-link";
	 var viewUpdate_link_id="#admin-view-update-emp-link";
	 
	 /*variables to store  division ids*/
	 var anualReportSelect_div_id="#anual-report-select-div"
	 var monthlyReportSelect_div_id="#monthly-report-select-div";
	 var dailyAttendance_div_id="#daily-attendance-div";
	 var weeklyAttendance_div_id="#weekly-productivity-div";
	 var addEmployeeMainDiv_id="#add-employee-main-division";	 
	 var addEmployee_div_id="#add-employee-main-division";
	 var viewUpdate_div_id="#admin-view-update-emp-link";
	 
	 /*variables for stoting reports div id's */
	 var dailyReportDiv_id="#daily-attendance-div";
	

	
	 //showOneDivision(addEmployee_div_id);
		
	 /*
	  * This method executes when click on weekly productivity link
	  */
	 $(weeklyProductivity_link_id).click(function(){
		 
		/*function call to hide remaining division*/
		 showOneDivision(weeklyProductivity_link_id);
		 
	 });//END --  $(weeklyProductivity_link_id).click()
	 
	 /*
	  * This method executes when click on daily attendance link
	  */
	 $(dailyAttendance_link_id).click(function(){
		 
		/*function call to hide remaining division*/
		 showOneDivision(dailyAttendance_link_id);
		 
	 });//END --  $(dailyAttendance_link_id).click()
	 
	 /*
	  * This method executes when click on anual productivity link
	  */
	 $(anualProductivity_link_id).click(function(){
		 
		/*function call to hide remaining division*/
		 showOneDivision(anualProductivity_link_id);
		 
	 });//END -- $(anualProductivity_link_id).click()
	 
	 /* This funcion is hits when
		 *  add employee link clicks
		 */
		$(addEmployee_link_id).click(function(){
			
			showOneDivision(addEmployee_link_id);
			
		}); // END --$(addEmployee_link_id).click()
		
		/* This function is hits when
		 *  view/update employee link clicks
		 */
	  $(viewUpdate_link_id).click(function(){
			
		  showOneDivision(viewUpdate_link_id);
			
		});// END -- $(viewUpdate_link_id).click()
	 
	 /**
	  * This function to display only one
	  * division at a time
	  */
	 function showOneDivision(link_id){
		 console.log("hiding divisions ");
		// (link_id == anualProductivity_link_id)?$(anualReportSelect_div_id).show():$(anualReportSelect_div_id).hide();
		// (link_id == monthlyProductivity_link_id)?$(monthlyReportSelect_div_id).show():$(monthlyReportSelect_div_id).hide();
		 (link_id == dailyAttendance_link_id)?$(dailyAttendance_div_id).show():$(dailyAttendance_div_id).hide();
		 (link_id == weeklyProductivity_link_id)?$(weeklyAttendance_div_id).show():$(weeklyAttendance_div_id).hide();
		 (link_id == addEmployee_link_id)?$(addEmployee_div_id).show():$(addEmployee_div_id).hide();
		 (link_id == viewUpdate_link_id)?$(viewUpdate_div_id).show():$(viewUpdate_div_id).hide();
		 $(dailyReportDiv_id).hide();
		 
	 };//END -- function showOneDivision(link_id)
	 
	 
	
  });//END -- $(document).ready(function())
  
  
 