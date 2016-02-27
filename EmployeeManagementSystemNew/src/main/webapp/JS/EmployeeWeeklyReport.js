
   /*This file name: EmployeeWeeklyReport.js  */


   $('document').ready(function(){
	   
	   /*variables to store ids of fields*/
	   var employeeWeeklyRportWeek_id="#employee-weekly-report-week-val";
	   var emplopyeeWeeklyReportButton_id="#show-employeee-weekly-report-button";
	   var emplopyeeWeeklyReprtMsg_id="#employee-weekly-report-msg";
	   var employeeWeeklyReportForm_id="#employee-weekly-report-form";
	   var weeklyReportTable_id="#employee-wekly-report-table";
	   var employeReportDiv_id="#employee-weekly-report-div";
	   
	   /*variables to store requests*/
	   var applicationName="EmployeeManagementSystemNew";
	   var urlPattern=".do";
	   var employeeWeeklyReportRequest="/getEmployeeReportForWeekByIdAndWeekDate"+urlPattern;
	   var employeeId_param="employeeId";
	   var week_param="weekDate";
	   
	   /*variables to store error/success messages*/
	   var invalidWeek_msg="Invalid week";
	   var intValueernalProblem_msg="Some problem occured try again";
	   var wait_msg="Please wait..";
	   var absent_msg="you are absent .. ";
	   var onLeave_msg="You are on leave";
	   var noReports_msg="No records found";
	   
	   var week="";
	   var employeeId="";

	   
	   //console.log("in employee weekly report.js file");
	   
	   /*first hide employee report div*/
	   $(employeReportDiv_id).hide();
	   
	   /**
	    * This function is to stop reloading page on form submit
	    */
	     $(employeeWeeklyReportForm_id).submit(function(){
	    	 console.log("employee weekly report form submitting returning false");
	    	 return false;
	    	 
	     }); // END -- $(employeeWeeklyReportForm_id).submit()
	   
	   /**
	    * This function excutes when click on show button
	    */
	   $(emplopyeeWeeklyReportButton_id).click(function(){
		   
		   week=$(employeeWeeklyRportWeek_id).val();
		   employeeId=localStorage.getItem("loggedInEmployeeId");
		   //console.log("week entered: "+week);
		   //console.log("week entered length: "+week.length);
		   if(week.length == 8){
			   console.log("setting wait message");
			   setValidationMessage(wait_msg);
			   makeAjaxCallForWeeklyReport();
		   }
		   else{
			   setValidationMessage(invalidWeek_msg);
			   $(employeReportDiv_id).hide();
		   }	   
		   
	   }); //  END -- $(emplopyeeWeeklyReportButton_id).click)
	   
	   /**
	    * This function is to set error/success message 
	    */
	   function setValidationMessage(msg){
		   
		   $(emplopyeeWeeklyReprtMsg_id).text(msg);
		   
	   }; // END -- setValidationMessage(msg)
	   
	   /**
	    * This function is to make call to controller
	    */
	   function makeAjaxCallForWeeklyReport(){
		   
		   // console.log("in makeAjaxCallForWeeklyReport(week)");
		   $.ajax({
   	        url:"/"+applicationName+"/"+employeeWeeklyReportRequest+"?"+employeeId_param+"="+employeeId+"&"+week_param+"="+week,
   	        type: 'post',
   	        dataType: "json",
   		    contentType: "application/json; charset=utf-8",
   	        success: function(data)
   	        {
   	        	setValidationMessage("");
   	        	console.log("data returned from server for today attendance status :"+ data);
   	        	console.log("data returned from server for today attendance status  (Stringify):"+ JSON.stringify(data));   
   	        	// function call
   	        	appendDataToTable(data.weeklyWorkingDetails);
   	        	$(employeReportDiv_id).show();
   	        		        	         
   	        },
   	        error: function(jqXHR, textStatus, errorThrown)
   	        {
   	            
   	            console.log('ERRORS: ' + textStatus);
   	            setValidationMessage(intValueernalProblem_msg);
   	            $(employeReportDiv_id).hide();
   	            // STOP LOADING SPINNER
   	            //$(addEmployeeSuccessMsg_id).text(intValueernalProblem_msg);
   	        }
   	        
   	    });//END -- $.ajax()
		   
	   }; // END -- makeAjaxCallForWeeklyReport(week)
	   /**
	    * This function is to append data to employee weekly report table
	    */
	   function appendDataToTable(data){
		  
		   //console.log("in appendDataToTable data received: "+data);
		   var length=data.length;
		   var workedHours;
		   //console.log("data length: "+length);
		   if(length >= 1){			   
			   var tableHeader="<tr><th class='text-center'>Attendance date</th><th class='text-center'>Login time</th><th class='text-center'>Logout time</th><th class='text-center'>Working hours (h:m)</th></tr>";
               $(weeklyReportTable_id).html(tableHeader);
               $(weeklyReportTable_id).append("<tbody>");
    		   for(var i=0;i<length;i++){
    			   if(data[i].dayIndicator == 1){
    				    // function call
    				   workedHours=convertWorkingHours(data[i].workingHours);
    				   //console.log("minutes in floatValue"+hour);
    				   $(weeklyReportTable_id).append("<tr><td>"+data[i].attendanceDate+"</td><td>"+data[i].startTime.substring(12,24)+
    						   "</td><td>"+data[i].endTime.substring(12,24)+"</td><td>"+workedHours+"</td></tr>");
    			   }
    			   else if(data[i].dayIndicator == 0){
    				   //console.log("indicator is  0: ");
    				   $(weeklyReportTable_id).append("<tr><td>"+data[i].attendanceDate+"</td><td colspan='3'>"+absent_msg+"</td></tr>");
    			   }
    			   else{
    				   $(weeklyReportTable_id).append("<tr><td>"+data[i].attendanceDate+"</td><td colspan='3'>"+onLeave_msg+"</td></tr>");
    			   }
    			   
    			   
    		   }
    		   $(weeklyReportTable_id).append("</tbody>");			   
		   }
		   else{
			   $(weeklyReportTable_id).html("<tr><td><b>"+noReports_msg+"</b></td></tr>");
			   setValidationMessage(noReports_msg);
		   }
		  
		   
		   console.log("table data: "+$(weeklyReportTable_id).val());
		   //$(weeklyReportTable_id).append();
		   
	   }; // END -- appendDataToTable(data)
	   
	   
	   /*variables for converting working hours into minutes*/
	   var workedHours;
	   var workedMinutes;
	   
	   /**
	    * This function is to convert working hour into minutes
	    */
	   function convertWorkingHours(wHours){
		       //console.log("in convertWorkingHours(wHours)");
			   workedHours=parseInt(wHours, 10);
			   workedMinutes=Math.round((wHours-workedHours)*60);			
			   //console.log("calculated worked hours: "+workedHours+" "+workedMinutes);
			   return workedHours+":"+workedMinutes
		   
	   }; // END -- convertWorkingHours()
	   
	   
   }); // END -- $('document').ready(function())