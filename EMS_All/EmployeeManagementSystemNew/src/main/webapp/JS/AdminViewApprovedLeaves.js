
  /* This file name: AdminViewApprovedLeaves.js */

  /**
    *  fucntion executes when page is loaded
    */
   $('document').ready(function(){
	   
	   
	   // set accordion
	   $("#accordion").accordion({
			 active: 1
		});
	   
	   var vlewApprovedLeavesButton_id="#view-approved-leaves--button";
	   var leaveMonth_id="#leave-month";
	   var approvedLeavesDivision_id="#approved-leaves-division";
	   var noApprovedLeavesDivision_id="#no-approved-leaves-division";
	   var approvedLeavesTable_id="#approved-leaves-table";
	   var approvedLeavesMessage_id="#view-approved-leaves-success-message";
	   var noApprovedLeavesMessage_id="#no-approved-leaves-message";
	   var approvedLeavesText_id="#approved-leaves-text";
	   
	   /*variables to store requests*/
	   var urlPattern=".do";
	   var applicationName="/EmployeeManagementSystemNew";
	   var homePageRequest="/home"+urlPattern;
	   var viewApprovedLeavesRequest="/getApprovedLeavesByMonth"+urlPattern;
	   
	   var month_param="month";
	   
	   /*variables to store success/error messages*/
	   var invalidMonth_msg="Invalid month";
	   var wait_msg="Please wait...";
	   var noApprovedLeaves_msg="No approved leaves in ";
	   var approvedLeaves_msg="Approved leaves in "
	   
	   var leaveMonth;
	   var selectedMonth;
	   var approvedDatatable=null;
	   var tableDrawnCount=0;
	   var monthsArray= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	   
	   //first hide two divisions
	   $(noApprovedLeavesDivision_id).hide();
	   $(approvedLeavesDivision_id).hide();
	  
	   
	   /**
	    * function for button click
	    */
	   $(vlewApprovedLeavesButton_id).click(function(){
		   
		   leaveMonth=$(leaveMonth_id).val();
		   selectedMonth=(parseInt(leaveMonth.split('-').pop()))-1;
		   console.log("month arry selected month: "+selectedMonth); 
		   console.log("month selected: "+leaveMonth+"   length: "+leaveMonth.length);
		   if(leaveMonth.length == 7){
			   console.log("now making ajax call ");
			   printMessage(wait_msg);
			   makeAjaxCallTogetApprovedLeaves();
		   }
		   else{
			   console.log("invalid month ");
			   printMessage(invalidMonth_msg);
			   $(noApprovedLeavesDivision_id).hide();
			   $(approvedLeavesDivision_id).hide();
		   }
		   
		   
	   });// END -- $(vlewApprovedLeavesButton_id).click(function())
	   
	   /**
	    *  function to rpint error/success message
	    */
	   function printMessage(msg){
		   if(msg != "")
			   setTimeout(printMessage,7000,"");		   
		   $(approvedLeavesMessage_id).text(msg);
		   
	   };// END -- printMessage(msg)
	   
	   /**
	    *  this function is to update leave status as approved or dis-approved
	    */
	   function makeAjaxCallTogetApprovedLeaves(){
		   console.log("now making call  to get approved leaves");
		   var request = $.ajax({
				  url: applicationName + viewApprovedLeavesRequest+"?"+month_param+"="+leaveMonth,
				  method: "post",
				  dataType: "json"
				});
		   request.done(function(data){
			   console.log("data returned fromm server: "+data);
			   console.log("data returned fromm server:(str) "+JSON.stringify(data));
			   if(data == -1){
				   console.log("session expired!!");
				  window.location.href= applicationName + homePageRequest;
				   		   
			   }
			   else if (data.length > 0){
				   console.log("");
				   $(approvedLeavesText_id).text(approvedLeaves_msg + monthsArray[selectedMonth]);
				   setDataToDataTable(data);
				   printMessage("");
				   $(noApprovedLeavesDivision_id).hide();
				   $(approvedLeavesDivision_id).show();
			   }
			   else{
				   printMessage(noApprovedLeaves_msg + monthsArray[selectedMonth]);
				   $(noApprovedLeavesMessage_id).text(noApprovedLeaves_msg + monthsArray[selectedMonth]);
				   $(noApprovedLeavesDivision_id).show();
				   $(approvedLeavesDivision_id).hide();
			   }
			   
				  
		   });
		   request.fail(function( jqXHR, textStatus ) {
			   console.log("internal problem occured");
		   });
		   
	   };// END -- makeAjaxCallToUpdateLeaveStatus(leaveStatus)

	   /**
	    *  fucntion to set data to dataTable
	    */
       function setDataToDataTable(data){ 
    		   if(tableDrawnCount == 0){
    			   
    			   approvedDatatable=$(approvedLeavesTable_id).DataTable({
                        data: data,
                        "lengthMenu": [[5,-1], [5, "All"]],
                        columns: [

                            { title: "Employee ID" },
                            { title: "Employee Name" },
                            { title: "leave date" },                                                      

                         ]
                });
    			   
    			    tableDrawnCount ++;
    		   }
    		   else{
    			   approvedDatatable.clear().draw();
    			   approvedDatatable.rows.add(data).draw();
    		   }		
       };
   
   }); // END -- $('document').ready(function())
   