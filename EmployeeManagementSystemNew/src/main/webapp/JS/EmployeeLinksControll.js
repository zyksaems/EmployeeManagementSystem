
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
	     var viewEmployeeWeeklyAttendanceRequest="/employeeHomePage"+urlPattern;
	     var viewEmployeeMonthlyAttendanceRequest="/employeeHomePage"+urlPattern;
	     var viewEmployeeAnualAttendanceRequest="/employeeHomePage"+urlPattern;
	     
	    // function call This function is in MakeLinkAsActive.js file
	     setLinkClassAsActive();
	     
	     /**
	      * This function executes on click
	      */
	     $(employeeViewWeeklyAttendance_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(employeeViewWeeklyAttendance_link_id);
	    	 
	    	 window.location.href=applicationName+viewEmployeeWeeklyAttendanceRequest;
	    	 
	     });
	     
	     /**
	      * This function executes on click
	      */
	     $(employeeViewMonthlyAttendance_link_id).click(function(){
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(employeeViewMonthlyAttendance_link_id);
	    	 
	    	 window.location.href=applicationName+viewEmployeeMonthlyAttendanceRequest;
	     });
	     
	     /**
	      * This function executes on click
	      */
	     $(employeeViewAnnualAttendance_link_id).click(function(){
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(employeeViewAnnualAttendance_link_id);
	    	 
	    	 window.location.href=applicationName+viewEmployeeAnualAttendanceRequest;
	     });	 
	   
	    
   }); // END -- $('document').ready(function ())