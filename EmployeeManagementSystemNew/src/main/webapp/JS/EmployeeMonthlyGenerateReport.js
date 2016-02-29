
   /*This file name: EmployeeMonthlyGenerateReport.js  */

$('document').ready(function(){
	   
	   /*variables to store ids of fields*/
	   var employeeMonthlyReportMonth_id="#employee-monthly-report-month-val";
	   var emplopyeeMonthlyReportButton_id="#show-employeee-monthly-report-button";
	   var emplopyeeMonthlyReprtMsg_id="#employee-monthly-report-msg";
	   var employeeMonthlyReportForm_id="#employee-monthly-report-form";
	   var monthlyReportTable_id="#employee-monthly-report-table";
	   var employeReportDiv_id="#employee-monthly-report-div";
	   
	   /*variables to store requests*/
	   var applicationName="EmployeeManagementSystemNew";
	   var urlPattern=".do";
	   var employeeMonthlyReportRequest="/getEmployeeReportForMonthByIdAndMonth"+urlPattern;
	   var employeeId_param="employeeId";
	   var month_param="month";
	   
	   /*variables to store error/success messages*/
	   var invalidMonth_msg="Invalid month";
	   var internalProblem_msg="Some problem occured try again";
	   var wait_msg="Please wait..";
	   var absent_msg="you are absent .. ";
	   var onLeave_msg="You are on leave";
	   var noReports_msg="No records found";
	   
	   var month="";
	   var employeeId="";

	   
	   //console.log("in employee monthly report.js file");
	   
	   /*first hide employee report div*/
	   $(employeReportDiv_id).hide();
	   
	   /**
	    * This function is to stop reloading page on form submit
	    */
	     $(employeeMonthlyReportForm_id).submit(function(){
	    	 console.log("employee monthly report form submitting returning false");
	    	 return false;
	    	 
	     }); // END -- $(employeeMonthlyReportForm_id).submit()
	   
	   /**
	    * This function excutes when click on show button
	    */
	   $(emplopyeeMonthlyReportButton_id).click(function(){
		   
		   month=$(employeeMonthlyReportMonth_id).val();
		   employeeId=localStorage.getItem("loggedInEmployeeId");
		   //console.log("month entered: "+month);
		   //console.log("month entered length: "+month.length);
		   console.log("Month is "+month);
		   if(month.length == 7){
			   console.log("setting wait message");
			   setValidationMessage(wait_msg);
			   makeAjaxCallForMonthlyReport();
		   }
		   else{
			   setValidationMessage(invalidMonth_msg);
			   $(employeReportDiv_id).hide();
		   }	   
		   
	   }); //  END -- $(emplopyeeMonthlyReportButton_id).click)
	   
	   /**
	    * This function is to set error/success message 
	    */
	   function setValidationMessage(msg){
		   
		   $(emplopyeeMonthlyReprtMsg_id).text(msg);
		   
	   }; // END -- setValidationMessage(msg)
	   
	   /**
	    * This function is to make call to controller
	    */
	   function makeAjaxCallForMonthlyReport(){
		   
		   // console.log("in makeAjaxCallForMonthlyReport(month)");
		   $.ajax({
   	        url:"/"+applicationName+"/"+employeeMonthlyReportRequest+"?"+employeeId_param+"="+employeeId+"&"+month_param+"="+month,
   	        type: 'post',
   	        dataType: "json",
   		    contentType: "application/json; charset=utf-8",
   	        success: function(data)
   	        {
   	        	setValidationMessage("");
   	        	console.log("data returned from server for today attendance status :"+ data);
   	        	console.log("data returned from server for today attendance status  (Stringify):"+ JSON.stringify(data));   
   	        	// function call
   	        	appendDataToTable(data.monthlyWorkingDetails);
   	        	$(employeReportDiv_id).show();
   	        		        	         
   	        },
   	        error: function(jqXHR, textStatus, errorThrown)
   	        {
   	            
   	            console.log('ERRORS: ' + textStatus);
   	            setValidationMessage(internalProblem_msg);
   	            $(employeReportDiv_id).hide();
   	            // STOP LOADING SPINNER
   	            //$(addEmployeeSuccessMsg_id).text(internalProblem_msg);
   	        }
   	        
   	    });//END -- $.ajax()
		   
	   }; // END -- makeAjaxCallForMonthlyReport(month)
	   /**
	    * This function is to append data to employee monthly report table
	    */
	   function appendDataToTable(data){
		  
		   //console.log("in appendDataToTable data received: "+data);
		   var length=data.length;
		   var workedHours;
		   var startTime=null;
		   var endTime=null;
		   //console.log("data length: "+length);
		   if(length >= 1){			   
			   var tableHeader="<tr><th class='text-center'>Attendance date</th><th class='text-center'>Login time</th><th class='text-center'>Logout time</th><th class='text-center'>Working hours (h:m)</th></tr>";
               $(monthlyReportTable_id).html(tableHeader);
               $(monthlyReportTable_id).append("<tbody>");
    		   for(var i=0;i<length;i++){
    			   if(data[i].dayIndicator == 1){
    				    // function call
    				   workedHours=convertWorkingHours(data[i].workingHours);

    				   if(data[i].startTime!= undefined){
    					   startTime=data[i].startTime.substring(12,24);
    				   	}
    				   
    				   if(data[i].endTime!= undefined){
   					   		endTime=data[i].endTime.substring(12,24);
    				  	}
    				   else{
    					   	endTime="Not Logged Out";
    				   }
    				   //console.log("minutes in floatValue"+hour);
    				   $(monthlyReportTable_id).append("<tr><td>"+data[i].attendanceDate+"</td><td>"+startTime+
    						   "</td><td>"+endTime+"</td><td>"+workedHours+"</td></tr>");
    			   		}
    			   else if(data[i].dayIndicator == 0){
    				   //console.log("indicator is  0: ");
    				   $(monthlyReportTable_id).append("<tr><td>"+data[i].attendanceDate+"</td><td colspan='3'>"+absent_msg+"</td></tr>");
    			   }
    			   else{
    				   $(monthlyReportTable_id).append("<tr><td>"+data[i].attendanceDate+"</td><td colspan='3'>"+onLeave_msg+"</td></tr>");
    			   }
    			   
    			   
    		   }
    		   $(monthlyReportTable_id).append("</tbody>");			   
		   }
		   else{
			   $(monthlyReportTable_id).html("<tr><td><b>"+noReports_msg+"</b></td></tr>");
			   setValidationMessage(noReports_msg);
		   }
		  
		   
		   console.log("table data: "+$(monthlyReportTable_id).val());
		   //$(monthlyReportTable_id).append();
		   
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