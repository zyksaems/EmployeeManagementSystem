 /*This file name is : EmployeeAnnualGenerateReport.js */

$('document').ready(function(){
	   
	   /*variables to store ids of fields*/
	   var employeeAnnualReportYear_id="#employee-annual-report-year-val";
	   var emplopyeeAnnualReportButton_id="#show-employeee-annual-report-button";
	   var emplopyeeAnnualReprtMsg_id="#employee-annual-report-msg";
	   var employeeAnnualReportForm_id="#employee-annual-report-form";
	   var annualReportTable_id="#employee-annual-report-table";
	   var employeReportDiv_id="#employee-annual-report-div";
	   
	   /*variables to store requests*/
	   var applicationName="EmployeeManagementSystemNew";
	   var urlPattern=".do";
	   var employeeAnnualReportRequest="/getEmployeeReportForYearByIdAndYear"+urlPattern;
	   var employeeId_param="employeeId";
	   var year_param="year";
	   
	   /*variables to store error/success messages*/
	   var invalidYear_msg="Invalid year";
	   var internalProblem_msg="Some problem occured try again";
	   var wait_msg="Please wait..";
	   var absent_msg="you are absent .. ";
	   var onLeave_msg="You are on leave";
	   var noReports_msg="No records found";
	   
	   var year="";
	   var employeeId="";
	   var clearTable=null;
	   var annualReportData=0;

	   
	   //console.log("in employee annual report.js file");
	   
	   /*first hide employee report div*/
	   $(employeReportDiv_id).hide();
	   
	   /**
	    * This function is to stop reloading page on form submit
	    */
	     $(employeeAnnualReportForm_id).submit(function(){
	    	 console.log("employee annual report form submitting returning false");
	    	 return false;
	    	 
	     }); // END -- $(employeeAnnualReportForm_id).submit()
	   
	   /**
	    * This function excutes when click on show button
	    */
	   $(emplopyeeAnnualReportButton_id).click(function(){
		   
		   year=$(employeeAnnualReportYear_id).val();
		   employeeId=localStorage.getItem("loggedInEmployeeId");
		   //console.log("year entered: "+year);
		   //console.log("year entered length: "+year.length);
		   console.log("Year is "+year);
		   if(year.length == 4){
			   console.log("setting wait message");
			   setValidationMessage(wait_msg);
			   makeAjaxCallForAnnualReport();
		   }
		   else{
			   setValidationMessage(invalidYear_msg);
			   $(employeReportDiv_id).hide();
		   }	   
		   
	   }); //  END -- $(emplopyeeAnnualReportButton_id).click)
	   
	   /**
	    * This function is to set error/success message 
	    */
	   function setValidationMessage(msg){
		   
		   $(emplopyeeAnnualReprtMsg_id).text(msg);
		   
	   }; // END -- setValidationMessage(msg)
	   
	   /**
	    * This function is to make call to controller
	    */
	   function makeAjaxCallForAnnualReport(){
		   
		   // console.log("in makeAjaxCallForAnnualReport(year)");
		   $.ajax({
   	        url:"/"+applicationName+"/"+employeeAnnualReportRequest+"?"+employeeId_param+"="+employeeId+"&"+year_param+"="+year,
   	        type: 'post',
   	        dataType: "json",
   		    contentType: "application/json; charset=utf-8",
   	        success: function(data)
   	        {
   	        	setValidationMessage("");
   	        	console.log("data returned from server for today attendance status :"+ data);
   	        	console.log("data returned from server for today attendance status  (Stringify):"+ JSON.stringify(data));   
   	        	// function call
   	        	appendDataToTable(data.annuallyWorkingDetails);
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
		   
	   }; // END -- makeAjaxCallForAnnualReport(year)
	   /**
	    * This function is to append data to employee annual report table
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
               $(annualReportTable_id).html(tableHeader);
               $(annualReportTable_id).append("<tbody>");
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
    				   $(annualReportTable_id).append("<tr><td>"+data[i].attendanceDate+"</td><td>"+startTime+
    						   "</td><td>"+endTime+"</td><td>"+workedHours+"</td></tr>");
    			   		}
    			   else if(data[i].dayIndicator == 0){
    				   //console.log("indicator is  0: ");
    				   $(annualReportTable_id).append("<tr><td>"+data[i].attendanceDate+"</td><td colspan='3'>"+absent_msg+"</td></tr>");
    			   }
    			   else{
    				   $(annualReportTable_id).append("<tr><td>"+data[i].attendanceDate+"</td><td colspan='3'>"+onLeave_msg+"</td></tr>");
    			   }
    			   
    			   
    		   }
    		   $(annualReportTable_id).append("</tbody>");			   
		   }
		   else{
			   $(annualReportTable_id).html("<tr><td><b>"+noReports_msg+"</b></td></tr>");
			   setValidationMessage(noReports_msg);
		   }
		  
		   
		   console.log("table data: "+$(annualReportTable_id).val());
		   //$(annualReportTable_id).append();
		   
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
