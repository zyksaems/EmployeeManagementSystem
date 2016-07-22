
   /*This file name:  EmployeeLinksControll.js  */

   /* This file is to manage employee clicked links to show as active links*/
      

   $('document').ready(function (){
	   
	     /*variables to store employee left menu link ids*/
	     var employeeViewWeeklyAttendance_link_id="#view-employee-weekly-attendance-link";
	     var employeeViewMonthlyAttendance_link_id="#view-employee-monthly-attendance-link";
	     var employeeViewAnnualAttendance_link_id="#view-employee-annual-attendance-link";
	     var employeeeViewLeaveStatus_link_id ="#employee-view-leave-status-link";
	     var employeeViewLeaves_link_id="#employee-view-leaves-link";
	     var employeeApplyForLeave_link_id="#employee-apply-leave-link";
	     
	     
	    /* variables to store request url */
	     var applicationName="/EmployeeManagementSystemNew";
	     var urlPattern=".do";
	     var viewEmployeeWeeklyAttendanceRequest="/getEmployeeWeeklyGenerationPage"+urlPattern;
	     var viewEmployeeMonthlyAttendanceRequest="/getEmployeeMonthlyReportGenerationPage"+urlPattern;
	     var viewEmployeeAnualAttendanceRequest="/getEmployeeAnnualReportGenerationPage"+urlPattern;
	     var viewLeaveStatusRequest="/viewEmployeeLeaveStatus"+urlPattern;
	     var viewLeavesRequest="/viewEmployeeLeave"+urlPattern;
	     var employeeApplyForLeaveRequest="/applyForLeave"+urlPattern;
	     
	     
	    // function call This function is in MakeLinkAsActive.js file
	     setLinkClassAsActive();
	     
	     /**
	      * This function executes  when "employeeApplyForLeave_link_id" is clicked
	      */
	     $(employeeApplyForLeave_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(employeeApplyForLeave_link_id);
	    	 
	    	 window.location.href= applicationName + employeeApplyForLeaveRequest;
	    	 
	     });
	     
	     /**
	      * This function executes  when "employeeViewLeaves_link_id" is clicked
	      */
	     $(employeeViewLeaves_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(employeeViewLeaves_link_id);
	    	 
	    	 window.location.href=applicationName+viewLeavesRequest;
	    	 
	     });
	     
	     /**
	      * This function executes  when "employeeViewWeeklyAttendance_link_id" is clicked
	      */
	     $(employeeViewWeeklyAttendance_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(employeeViewWeeklyAttendance_link_id);
	    	 
	    	 window.location.href=applicationName+viewEmployeeWeeklyAttendanceRequest;
	    	 
	     });
	     
	     /**
	      * This function executes when "employeeViewMonthlyAttendance_link_id" is clicked
	      */
	     $(employeeViewMonthlyAttendance_link_id).click(function(){
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 console.log("employee monthly attendance link clicked");
	    	 setActiveLinkInLocalStorage(employeeViewMonthlyAttendance_link_id);
	    	 
	    	 window.location.href=applicationName+viewEmployeeMonthlyAttendanceRequest;
	     });
	     
	     /**
	      * This function executes when "employeeViewAnnualAttendance_link_id" is clicked
	      */
	     $(employeeViewAnnualAttendance_link_id).click(function(){
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 console.log("employee annual attendance link clicked");
	    	 setActiveLinkInLocalStorage(employeeViewAnnualAttendance_link_id);
	    	 
	    	 window.location.href=applicationName+viewEmployeeAnualAttendanceRequest;
	     });	
	     
	     /**
	      * This function executes when "employeeeViewLeaveStatus_link_id" is clicked
	      */
	     $(employeeeViewLeaveStatus_link_id).click(function(){
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 console.log("employee view leave status link clicked");
	    	 setActiveLinkInLocalStorage(employeeeViewLeaveStatus_link_id);
	    	 
	    	 window.location.href=applicationName + viewLeaveStatusRequest;
	     });
	     
	   
	    
   }); // END -- $('document').ready(function ())