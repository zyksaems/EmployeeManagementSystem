

 /* This file name: AdminLinkControll.js  */


   $('document').ready(function(){
	   
	   /*variables to store ids of links*/
	   
	   var adminAddEmployee_link_id="#admin-add-employee-link";	   
	   var adminViewEmployee_link_id="#admin-view-update-emp-link";	   
	   var adminAddNotice_link_id="#notice-add-link";
	   
	   var employee_leave_details_link_id="#employee-leave-details-link";
	   var employeePendingLeaves_link_id="#employee-pending-leave-details-link";
	   var approvedLeaves_link_id="#employee-approved-leave-details-link";
	   var disApprovedLeaves_link_id="#employee-disapproved-leave-details-link";
	   
	   var adminDailyReport_link_id="#admin-view-daily-report-link";
	   var adminWeeklyReport_link_id="#admin-view-weekly-report-link";
	   var adminMonthlyReport_link_id="#admin-view-monthly-report-link";
	   var adminAnnualReport_link_id="#admin-view-anual-report-link";
	   
	   var adminTodayAttendance_link_id="#admin-view-today-attendance-link";
	   
	   var adminWeeklyProductivity_link_id="#weekly-productivity-link";
	   var adminMonthlyProductivity_link_id="#monthly-productivity-link";
	   var adminAnnualProductivity_link_id="#anual-productivity-link";
	   
	   /*variables to requests*/
	   var applicationName="/EmployeeManagementSystemNew";
	   var urlPattern=".do";
	   
	   var adminAddEmployeeRequest="/getAddEmployeePage"+urlPattern;
	   var adminViewEmployeeRequest="/ViewUser"+urlPattern;	   
	   var adminAddNoticeRequest="/updateNotice"+urlPattern;
	   
	   var adminAllLeaveRequest="/getEmployeeLeaveView"+urlPattern;
	   var adminPendingLeaveRequest="/getPendingLeavesPage"+urlPattern; 
	   var adminApprovedLeaveRequest="/getApprovedLeavesPage"+urlPattern; 
	   var adminDisApprovedLeaveRequest="/getDisApprovedLeavesPage"+urlPattern;
	   
	   var adminDailyReportRequest="/getDailyReportGenerationPage"+urlPattern;
	   var adminWeeklyReportRequest="/getWeeklyReportGenerationPage"+urlPattern;	   
	   var adminMonthlyReportRequest="/getMonthlyReportGenerationPage"+urlPattern;
	   var adminAnnualReportRequest="/getAnnuallyReportGenerationPage"+urlPattern;
	   
	   var adminTodayAttendanceRequest="/getTodayAttendancePage"+urlPattern;
	   
	   var adminWeeklyProductivityRequest="/getWeeklyProductivityPage"+urlPattern;
	   var adminMonthlyProductivityRequest="/getMonthlyProductivityPage"+urlPattern;
	   var adminAnnualProductivityRequest="/getAnnualProductivityPage"+urlPattern;
	   
	   /**
	      * This function executes on click
	      */
	     $(disApprovedLeaves_link_id).click(function(){
	    	 console.log("admin approved leaves clicked");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(disApprovedLeaves_link_id);
	    	 
	    	 window.location.href=applicationName + adminDisApprovedLeaveRequest;
	    	 
	     });
	   
	    /**
	      * This function executes on click
	      */
	     $(approvedLeaves_link_id).click(function(){
	    	 console.log("admin approved leaves clicked");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(approvedLeaves_link_id);
	    	 
	    	 window.location.href=applicationName + adminApprovedLeaveRequest;
	    	 
	     });
	     
	    /**
	      * This function executes on click
	      */
	     $(employeePendingLeaves_link_id).click(function(){
	    	 console.log("admin pending leaves clicked");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(employeePendingLeaves_link_id);
	    	 
	    	 window.location.href=applicationName + adminPendingLeaveRequest;
	    	 
	     });
	   
	    /**
	      * This function executes on click
	      */
	     $(adminAnnualProductivity_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(adminAnnualProductivity_link_id);
	    	 
	    	 window.location.href=applicationName + adminAnnualProductivityRequest;
	    	 
	     });
	     
	   /**
	      * This function executes on click
	      */
	     $(adminMonthlyProductivity_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(adminMonthlyProductivity_link_id);
	    	 
	    	 window.location.href=applicationName + adminMonthlyProductivityRequest;
	    	 
	     });
	   
	   /**
	      * This function executes on click
	      */
	     $(adminWeeklyProductivity_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(adminWeeklyProductivity_link_id);
	    	 
	    	 window.location.href=applicationName + adminWeeklyProductivityRequest;
	    	 
	     });
	   
	   /**
	      * This function executes on click
	      */
	     $(adminTodayAttendance_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(adminTodayAttendance_link_id);
	    	 
	    	 window.location.href=applicationName + adminTodayAttendanceRequest;
	    	 
	     });
	   
	   /**
	      * This function executes on click
	      */
	     $(adminAnnualReport_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(adminAnnualReport_link_id);
	    	 
	    	 window.location.href=applicationName + adminAnnualReportRequest;
	    	 
	     });
	     
	   /**
	      * This function executes on click
	      */
	     $(adminMonthlyReport_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(adminMonthlyReport_link_id);
	    	 
	    	 window.location.href=applicationName + adminMonthlyReportRequest;
	    	 
	     });
	   
	   /**
	      * This function executes on click
	      */
	     $(adminWeeklyReport_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(adminWeeklyReport_link_id);
	    	 
	    	 window.location.href=applicationName + adminWeeklyReportRequest;
	    	 
	     });
	   
	   /**
	      * This function executes on click
	      */
	     $(adminDailyReport_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(adminDailyReport_link_id);
	    	 
	    	 window.location.href=applicationName + adminDailyReportRequest;
	    	 
	     });
	     
	     
	    /**
	      * This function executes on click
	      */
	     $(adminAddEmployee_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(adminAddEmployee_link_id);
	    	 
	    	 window.location.href=applicationName + adminAddEmployeeRequest;
	    	 
	     });
	     
	     /**
	      * This function executes on click
	      */
	     $(adminViewEmployee_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(adminViewEmployee_link_id);
	    	 
	    	 window.location.href=applicationName + adminViewEmployeeRequest;
	    	 
	     });
	     
	     /**
	      * This function executes on click
	      */
	     $(adminAddNotice_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(adminAddNotice_link_id);
	    	 
	    	 window.location.href=applicationName + adminAddNoticeRequest;
	    	 
	     });
	     /**
	      * This function executes on click to get all leave details
	      */
	     $(employee_leave_details_link_id).click(function(){
	    	 console.log("employee weekly attendance clikced");
	    	 // function call This function is in MakeLinkAsActive.js file
	    	 setActiveLinkInLocalStorage(employee_leave_details_link_id);
	    	 
	    	 window.location.href=applicationName + adminAllLeaveRequest;
	    	 
	     });
	
   }); // END --   $('document').ready(function())