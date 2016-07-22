/*  This file name: EmployeeViewLeaveStatus.js */

$('document').ready(function() {

	var leaveStatusTable_id = "#employee-leave-status-table";
	var leaveStatusTableDiv_id = "#employee-leave-table-division";

	var leaveAppliedMonth_id = "#leave-applied-month";
	var viewStatusButton_id = "#view-leave-status-button";
	var leaveStatusMessage_id = "#view-leave-status-success-message";
	
	/*variables to store success and error messages*/
	var wait_msg="Please wait..";
	var noRecords_msg="No records found!";
	var invalidMonth_msg="Invalid month";
	var problem_msg="Problem occured try again !";
	
	/*variables to store requests*/
	   var urlPattern=".do";
	   var applicationName="/EmployeeManagementSystemNew";
	   var homePageRequest="/home"+urlPattern;
	   var viewLeavesStatusRequest="/verifyEmployeeLeaveStatus"+urlPattern;
	   
	   var employeeId_param="employeeId";
	   var appliedMonth_param="leaveAppliedMonth";
	   
	   var employeeId=localStorage.getItem("loggedInEmployeeId");
	   var appliedMonth;
	   var leaveStatusTable=null;
	   var tableDrawnCount=0;
	  
      // hide table division
	   $(leaveStatusTableDiv_id).hide();
	   
	   $("#accordion").accordion({
			 active: 1
		});
	   
	/**
	 * function for click view status button
	 */
	$(viewStatusButton_id).click(function() {
		printMessage("");
		appliedMonth=$(leaveAppliedMonth_id).val();
		console.log("month length: "+appliedMonth.length);
		if(appliedMonth.length != 7){
			printMessage(invalidMonth_msg);
		}
		else{
			makeAjaxCallToGetLeaveStatus();
		}

	});
	
	/*variables to store requests*/
	   var urlPattern=".do";
	   var applicationName="/EmployeeManagementSystemNew";
	   var homePageRequest="/home"+urlPattern;
	   var viewLeavesStatusRequest="/verifyEmployeeLeaveStatus"+urlPattern;
	   
	   var employeeId_param="employeeId";
	   var appliedMonth_param="leaveAppliedMonth";
	   /**
	    *  this function is to update leave status as approved or dis-approved
	    */
	   function makeAjaxCallToGetLeaveStatus(){
		   printMessage(wait_msg);
		   console.log("now making call  to update status");
		   var request = $.ajax({
				  url: applicationName + viewLeavesStatusRequest+"?"+employeeId_param+"="+employeeId+"&"+appliedMonth_param+"="+appliedMonth,
				  method: "post",
				  dataType: "json"
				});
		   request.done(function(data){
			   console.log("data returned fromm server: "+data);
			   if (data == -1){
				   window.location.href= applicationName + homePageRequest;
			   }
			   else if(data.length > 0) {
				   printMessage("");
				   setDataToDataTable(data);
				   hideTable(false);
			   }
			   else{
				   console.log("no data received")
				   hideTable(true);
				   printMessage(noRecords_msg);
			   }
			   
				  
		   });
		   request.fail(function( jqXHR, textStatus ) {
			   console.log("internal problem occured");
			   printMessage(problem_msg);
		   });
		   
	   };// END -- makeAjaxCallToUpdateLeaveStatus(leaveStatus)
	
	
	   /**
	    *  function to hide table
	    */
	    function hideTable(flag){
	    	if(flag)
	    	  $(leaveStatusTableDiv_id).hide();
	    	else
	    		$(leaveStatusTableDiv_id).show();
	    	
	    }; // END -- hideTable()
	    
	/**
	 * function for printing message
	 */
	function printMessage(msg){
		if(msg != "")
			setTimeout(printMessage,7000,"");
		$(leaveStatusMessage_id).text(msg);
		
	}// END -- printMessage(msg)
	
	/**
	    *  function to set data to data table
	    */
	   function setDataToDataTable(data){
		   //employeeId name
		   var length=data.length;
		   leaveDatesArray=new Array(data.length);
		   var leaveDetails=new Array(length);
		   for(var i=0; i< length ;i++){
			   leaveDetails [i]=new Array(4);			  	
			   leaveDetails [i][0]=data[i].date_of_apply;  
			   leaveDetails [i][1]=data[i].subject;   
			   leaveDetails [i][2]=data[i].setOfLeaveDates.length;  			   					   
			   leaveDatesArray[i]=getLeaveDatesInAscendinOrder(data[i].setOfLeaveDates);  	
			   leaveDetails [i][3]=leaveDatesArray[i];
			   leaveDetails [i][4]=data[i].isApproved;
			   
		   }// EDN -- for 
		   if(tableDrawnCount == 0){
			   
			   leaveStatusTable=$(leaveStatusTable_id).DataTable({
                 data: leaveDetails,
                 "lengthMenu": [[5,-1], [5, "All"]],
                 columns: [

                     { title: "Applied date" },                           
                     { title: "Subject","orderable": false },
                     { title: "Num of Days","orderable": false },
                     { title: "Leave dates"},   // ,"orderable": false 
                     { title: "Status","orderable": false  },

                  ]
         });
			   
			    tableDrawnCount ++;
		   }
		   else{
			   leaveStatusTable.clear().draw();
			   leaveStatusTable.rows.add(leaveDetails).draw();
		   }
		
		   
	   }; // END -- setDataToDataTable(data)
	   
	   /**
	    *  function to get leave dates in ascending order
	    */
	   function getLeaveDatesInAscendinOrder(leaveDatesArray){
		   var datesArray;
		   var sortedArray=[];
		   var stringDate;
		   datesArray=new Array(leaveDatesArray.length);
	       for(var j=0;j< leaveDatesArray.length;j++){
	    	   //console.log("type of leave date : "+ typeof leaveDatesArray[j].leaveDate)
	    	   datesArray.push(new Date(leaveDatesArray[j].leaveDate));
		    }
	       datesArray.sort(function (a,b){ return (a > b) ? 1 : -1;});
	       
	       for(var j=0;j< leaveDatesArray.length;j++){
	    	    stringDate=datesArray[j].getDate()+"/"+(datesArray[j].getMonth()+1)+"/"+datesArray[j].getFullYear();
	    	   //leaveDetails [i][4][j]=(datesArray[j]+"").substring(0,15);
	    	    sortedArray.push(stringDate);
	       }
	       
	       return sortedArray;
	       
	   }; // END --  getLeaveDatesInAscendinOrder(leaveDatesArray)
	

}); // END -- $('document').ready(function())
