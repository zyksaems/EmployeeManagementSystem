 /*This file name is : EmployeeMonthlyGenerateReport.js */

$('document').ready(function(){
	   
	   /*variables to store ids of fields*/
	   var employeeMonthlyReportMonth_id="#employee-monthly-report-month-val";
	   var emplopyeeMonthlyReportButton_id="#show-employeee-monthly-report-button";
	   var emplopyeeMonthlyReprtMsg_id="#employee-monthly-report-msg";
	   var employeeMonthlyReportForm_id="#employee-monthly-report-form";
	   var monthlyReportTable_id="#employee-monthly-report-table";
	   var employeReportDiv_id="#employee-monthly-report-div";
	   var employeeDetailsDiv_id="#Employee_Details";
	   var paginationDiv_Id="#table_pag_div";
	   var tableId="#data-found-table";
	   var tableId1="#data-not-found-table";
	   
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
	   var absent_msg="You are absent .. ";
	   var onLeave_msg="You are on leave";
	   var noReports_msg="No records found";
	   
	   var month="";
	   var employeeId="";
	   var monthlyReportData=0;
	   var clearTable=null;

	   
	   //console.log("in employee monthly report.js file");
	   
	   /*first hide employee report div*/
	   $(employeReportDiv_id).hide();
	   $(employeeDetailsDiv_id).hide();
	   $(paginationDiv_Id).hide();
	   $(tableId1).hide();
	   
	   /**
	    * This function is to stop reloading page on form submit
	    */
	     $(employeeMonthlyReportForm_id).submit(function(){
	    	 console.log("employee monthly report form submitting returning false");
	    	 return false;
	    	 
	     }); // END -- $(employeeMonthlyReportForm_id).submit()
	   
	   /**
	    * This function executes when click on show button
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
			   $(employeeDetailsDiv_id).hide();
			   $(paginationDiv_Id).hide();
			   $(tableId1).hide();
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
   	        		var empId=employeeId;
					var empName=data.employeeName;
					var empDesignation=data.employeeDesignation;
					
					$("#emp_id").text(empId);
					$("#emp_name").text(empName);
		            $("#emp_designation").text(empDesignation);
   	        	
		            if(data.monthlyWorkingDetails.length!=0){
		            // function call
		        	appendDataToTable(data.monthlyWorkingDetails);
	   	        	$(employeReportDiv_id).show();
	   	        	$(employeeDetailsDiv_id).show();
	   	        	$(paginationDiv_Id).show();
	   	        	$(tableId1).hide();
		            }
	   	        	else{
				   		$(employeReportDiv_id).show();
		   	        	$(employeeDetailsDiv_id).show();
				   		$(paginationDiv_Id).hide();
				   		$(tableId1).show();
				   		
				   		$(tableId1).html("<tr><td><b>"+noReports_msg+"</b></td></tr>");
				   		setValidationMessage(noReports_msg);
			   }
   	        },
   	        error: function(jqxHR, textStatus, errorThrown)
   	        {
   	            
   	            console.log('ERRORS: ' + textStatus);
   	            setValidationMessage(internalProblem_msg);
   	            $(employeReportDiv_id).hide();
   	            $(employeeDetailsDiv_id).hide();
   	            $(paginationDiv_Id).hide();
   	            // STOP LOADING SPINNER
   	            //$(addEmployeeSuccessMsg_id).text(internalProblem_msg);
   	        }
   	        
   	    });//END -- $.ajax()
		   
	   }; // END -- makeAjaxCallForMonthlyReport(month)
	   
	   /**
	    * This function is to append data to employee monthly report table
	    */
	   function appendDataToTable(data){
		  
		   console.log("in appendDataToTable data received: "+data);
		   var length=data.length;
		   var workedHours;
		   var startTime=null;
		   var endTime=null;

		   if(length >0){		
			   
			   if(monthlyReportData!=0)
			   {
				   clearTable.clear().draw();
			   }
             dataSet=new Array(length);
			   
			   
    		   for(var i=0;i<length;i++){
    			   
    			   /*function call for converting working hours in hours and minute format*/
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
				   
				   	dataSet[i]=new Array(4);
					dataSet[i][0]=data[i].attendanceDate;
               		dataSet[i][1]=startTime;
               		dataSet[i][2]=endTime;
               		dataSet[i][3]=workedHours;
    			
               		
    			   if(data[i].dayIndicator == 1){
   						dataSet[i][0]=data[i].attendanceDate;
                  		dataSet[i][1]=startTime;
                  		dataSet[i][2]=endTime;
                  		dataSet[i][3]=workedHours;
    				  }
    			   else if(data[i].dayIndicator == 0){
    				   	dataSet[i][0]=data[i].attendanceDate;
   						dataSet[i][1]=" ";
   						dataSet[i][2]=absent_msg;
                   		dataSet[i][3]=" ";
    			   }
    			   else{
    				   	dataSet[i][0]=data[i].attendanceDate;
  						dataSet[i][1]=" ";
  						dataSet[i][2]=onLeave_msg;
                  		dataSet[i][3]=" ";
    			   }
    		   }
    			
           	 if(monthlyReportData==0)
              	{
           	clearTable=$(tableId).DataTable( {
         	        data: dataSet,
         	     "lengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]],
         	     "columnDefs": [
              									{ 
              										className: "dt-head-center", "targets": [ 0 ] 
              									}
              								],
         	        columns:		 [
          
         	                		  			{ title: "Date" },
         	                		  			{ title: "StartTime" },
         	                		  			{ title: "EndTime" },
         	                		  			{ title: "WorkHours (hh:mm)","orderable": false }
         	           
         	                		  	    ]
           							} );
              	}
           	 else{
           		 	clearTable.rows.add(dataSet).draw();
           	 		}
           	 		monthlyReportData= monthlyReportData+1;
		   }
		   
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
			   return workedHours+" "+":"+" "+workedMinutes;
		   
	   }; // END -- convertWorkingHours()
	   
	   
   }); // END -- $('document').ready(function())
