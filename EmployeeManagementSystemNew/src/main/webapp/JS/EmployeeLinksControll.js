
   /*This file name:  EmployeeLinksControll.js  */

   /* This file is to manage employee clicked links to show as active links*/
      

   $('document').ready(function (){
	   
	     /*variables to store employee left menu link ids*/
	     var employeeViewWeeklyAttendance_link_id="#view-employee-weekly-attendance-link";
	     var employeeViewMonthlyAttendance_link_id="#view-employee-monthly-attendance-link";
	     var employeeViewAnnualAttendance_link_id="#view-employee-annual-attendance-link";
	     
	     
	    /* variables to store request url */
	     var applicationName="/EmployeeManagementSystemNew";
	     var urlPattern=".do";
	     var viewEmployeeWeeklyAttendanceRequest="/getEmployeeWeeklyGenerationPage"+urlPattern;
	     var viewEmployeeMonthlyAttendanceRequest="/getEmployeeMonthlyReportGenerationPage"+urlPattern;
	     var viewEmployeeAnualAttendanceRequest="/getEmployeeAnnualReportGenerationPage"+urlPattern;
	     
	    // function call This function is in MakeLinkAsActive.js file
	     setLinkClassAsActive();
	     
	     /**
	      * This function executes  when "employeeViewWeeklyAttendance_link_id" is clicked
	      */
	     $(employeeViewWeeklyAttendance_link_id).click(function(){
	    	 alert("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(employeeViewWeeklyAttendance_link_id);
	    	 
	    	 window.location.href=applicationName+viewEmployeeWeeklyAttendanceRequest;
	    	 
	     });
	     
	     /**
	      * This function executes when "employeeViewMonthlyAttendance_link_id" is clicked
	      */
	     $(employeeViewMonthlyAttendance_link_id).click(function(){
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 alert("employee monthly attendance link clicked");
	    	 setActiveLinkInLocalStorage(employeeViewMonthlyAttendance_link_id);
	    	 
	    	 window.location.href=applicationName+viewEmployeeMonthlyAttendanceRequest;
	     });
	     
	     /**
	      * This function executes when "employeeViewAnnualAttendance_link_id" is clicked
	      */
	     $(employeeViewAnnualAttendance_link_id).click(function(){
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(employeeViewAnnualAttendance_link_id);
	    	 
	    	 window.location.href=applicationName+viewEmployeeAnualAttendanceRequest;
	     });	 
	   
	    
   }); // END -- $('document').ready(function ())