




   $('document').ready(function(){
	   
	   /*variables to store requests*/
	   var urlPattern=".do";
	   var applicationName="EmployeeManagementSystemNew";
	   var  todayAttendanceStatusRequest="getReportByIdAndDate"+urlPattern;
	   
	   var employeeId_reqParam="employeeId";
	   var attendanceDate_reqParam="attendanceDate";
	   
	   var todayDate=new Date();
	   
   	   var employeeReport;
   	   
   	   /*variables to store field ids*/
   	   var employeeName_id="#logged-in-employee-name";
   	   var employeeDesignation_id="#logged-in-employee-designation";
   	   var employeeLofginTime_id="#logged-in-employee-loginTime";
   	   
   	  /*variables to store success/errpe messages*/
   	   var todayNotLoggedIn_msg="Today  you are not logged-in  plese login";
   	   
   	  $(employeeName_id).append("Employee name");
   	$(employeeLofginTime_id).append("you logged in at10:30 AM");
   	$(employeeDesignation_id).append("designation ");
	   
	   //makeAjaxCallToKnowTodayAttendanceStatus(111111,todayDate.getTime());
	   
	   /**
	    * This function is to make ajax call to know the employee is logged in today or not
	    */
	   function makeAjaxCallToKnowTodayAttendanceStatus(employeeId,attendanceDateMills){
		    console.log("in  makeAjaxCallToKnowTodayAttendanceStatus(employeeId,attendanceDateMills)");
		    
			$.ajax({
    	        url:"/"+applicationName+"/"+todayAttendanceStatusRequest+"?"+employeeId_reqParam+"="+employeeId+'&'+attendanceDate_reqParam+'='+attendanceDateMills,
    	        type: 'POST',
    	        dataType: "json",
    		    contentType: "application/json; charset=utf-8",
    	        success: function(data)
    	        {
    	        	console.log("data returned from server for today attendance status :"+ data);
    	        	console.log("data returned from server for today attendance status  (Stringify):"+ JSON.stringify(data));
    	        	employeeReport=data.employeeReport;
    	        	$(employeeName_id).append(data.empName);
    	        	$(employeeDesignation_id).text(data.empDesignation);
    	        	if(employeeReport.length==0){
    	        		console.log("today employee is not logged in");
    	        		$(employeeLofginTime_id).text(todayNotLoggedIn_msg);
    	        	}
    	        	
    	        	         
                 
    	        },
    	        error: function(jqXHR, textStatus, errorThrown)
    	        {
    	            
    	            console.log('ERRORS: ' + textStatus);
    	            // STOP LOADING SPINNER
    	            //$(addEmployeeSuccessMsg_id).text(internalProblem_msg);
    	        }
    	        
    	    });//END -- $.ajax()
			
	   }// END  -- makeAjaxCallToKnowTodayAttendanceStatus(employeeId,attendanceDateMills)
	   
	   
	   
   });  // END  -- $('document').ready(function())