
/*  This file name:  AdminViewLeavesApplications.js */

     var  totalLeaveData;
     var leaveDatesArray;
     var currentIndex;
     
     var leaveSubject_id="#subject-of-employee";
     var leaveMessage_id="#message-of-employee";
     var employeeName_id="#employee-name-id";
     var employeeId_id="#employee-id-id";
     var leaveDatesSection_id="#leave-dates-section";
     var approveLeaveButton_id="#approve-leave-button";
	 var disApproveLeaveButton_id="#disapprove-leave-button";
	 var approveLeaveMessage_id="#admin-approve-leave-message";
	 var leaveStatus_id="#employee-leave-status";
     
     var approved="Approved";
     var pending="Pending";
     var disapproved="Disapproved";
     
    /**
     * This function is to get given index details 
     */
     function getRowAtIndex(index){
    	 currentIndex=index;
    	 showLeaveConfirmModal(index);
    	   
     }; // END -- getRowAtIndex(index)
     
     /**
	   *  function to set modal details to confirm leave
	   */
	   function showLeaveConfirmModal(index){
		   
		   var approvedStatus=totalLeaveData[index].isApproved;
		   console.log("selected leave status: "+approvedStatus);
 	    
 	    if(approvedStatus== pending ){
 	    	$(disApproveLeaveButton_id).show();
 	    	$(approveLeaveButton_id).show();
 		}else if (approvedStatus== approved){
 			hideApproveButton(true);			
 		}
 		else{
 			hideApproveButton(false);
 		}
 	    $(approveLeaveMessage_id).text("");
 		$(leaveSubject_id).html(totalLeaveData[index].subject);
 		$(leaveMessage_id).html(totalLeaveData[index].message);
 		$(employeeName_id).html(totalLeaveData[index].name);
 		$(employeeId_id).html(totalLeaveData[index].employeeId);

 		var details="<br><b> Number of days: </b><mark class='text-danger'><strong> "+totalLeaveData[index].setOfLeaveDates.length
 		                       +"</strong></mark><br><br><b>Leave dates:</b><mark class='text-danger'><strong> "+leaveDatesArray[index]+"</strong></mark>";
 		$(leaveDatesSection_id).html(details);
 		$(leaveStatus_id).html("<b>Leave Status: </b><mark class='text-danger'><strong>"+approvedStatus+"</strong></mark>");
		   
	   };// END -- showLeaveConfirmModal(index)
	   
	   /**
	    *  function to hide and show approve or disapprove buttons
	    *  pass true to hide approve button,and to show disapprove button
	    *  pass false to show approve button,and to hide disapprove button
	    */
	   function hideApproveButton(flag){
		   if(flag){
			   $(approveLeaveButton_id).hide();
			   $(disApproveLeaveButton_id).show();
		   }
		   else{
			   $(disApproveLeaveButton_id).hide();
			   $(approveLeaveButton_id).show();
			   
		   }
	   }; // END -- hideApproveButton(flag)

$('document').ready(function() {
	
	/*variables to store requests*/
	   var urlPattern=".do";
	   var applicationName="/EmployeeManagementSystemNew";
	   var viewLeavesRequest="/getAllLeave"+urlPattern;
	   var homePageRequest="/home"+urlPattern;
	   var updateLeaveStatusRequest="/updateEmployeeLeaveStatus"+urlPattern;
	   
	   var leaveId_param="leaveId";
	   var status_param="status";
	   
	   /*variables to store ids of fields*/
	   var leavesTable_id="#admin-leaves-table";	 
	   var leavesTableDiv_id="#leaves-table-division";
	   var noLeavesDiv_id="#nodata-leave-message-div";
	  
	   /*variables to store success or error messages*/
	   var approveSuccess_msg="Leave success fully approved !";
	   var disapproveSuccess_msg="Leave success fully Disapproved !";	  
	   var disApproveError_msg="Problem occured try again ";
	   
	   var tableDrawnCount=0;
	   var LeavesDataTable; 
	  
	   $(noLeavesDiv_id).hide();
	   makeAjaxCallForEmployeeLeave(); 
	  
	   // set accordion
	   $("#accordion").accordion({
			 active: 1
		});
	   	   
	   
	   /**
	    *  function to approve leave
	    */
	   $(approveLeaveButton_id).click(function(){
           console.log("approve button clicked");
		   // 1 for approving leave
		   makeAjaxCallToUpdateLeaveStatus(1);
		   
	   }); // END -- $(approveLeaveButton_id).click(function())
	   
	   /**
	    *  function to dis-approve leave
	    */
	   $(disApproveLeaveButton_id).click(function(){
		   
		   // 0 for dis-approving leave
		   makeAjaxCallToUpdateLeaveStatus(0);
		   
	   }); // END -- $(disApproveLeaveButton_id).click(function())
	   
	   /**
	    *  this function is to update leave status as approved or dis-approved
	    */
	   function makeAjaxCallToUpdateLeaveStatus(leaveStatus){
		   console.log("now making call  to update status");
		   var request = $.ajax({
				  url: applicationName + updateLeaveStatusRequest+"?"+leaveId_param+"="+totalLeaveData[currentIndex].leaveId+"&"+status_param+"="+leaveStatus,
				  method: "post",
				  dataType: "json"
				});
		   request.done(function(data){
			   console.log("data returned fromm server: "+data);
			   if(data == 1){
				   console.log("leave status successfully updated");	
				   if(leaveStatus == 1 ){
					   printMessage(approveSuccess_msg);
					   hideApproveButton(true);
					   totalLeaveData[currentIndex].isApproved=approved;
					   setDataToDataTable(totalLeaveData);
					   $(leaveStatus_id).html(">");
					   $(leaveStatus_id).html("<b>Leave Status: </b><mark class='text-danger'><strong>"+approved+"</strong></mark>");
				   }else{
					   printMessage(disapproveSuccess_msg);
					   hideApproveButton(false);
					   totalLeaveData[currentIndex].isApproved=disapproved;
					   setDataToDataTable(totalLeaveData);
					   $(leaveStatus_id).html("");
					   $(leaveStatus_id).html("<b>Leave Status: </b><mark class='text-danger'><strong>"+disapproved+"</strong></mark>");
				   }  
				   				   
			   }
			   else if(data == -1){
				   console.log("session expired!!");
			   }
			   else {
				   console.log("problem occured ");
				   printMessage(disApproveError_msg);   
			   }
				  
		   });
		   request.fail(function( jqXHR, textStatus ) {
			   console.log("internal problem occured");
		   });
		   
	   };// END -- makeAjaxCallToUpdateLeaveStatus(leaveStatus)
	   
	   /**
	    *  function to print error or success message
	    */
	   function printMessage(msg){
		   if(msg != "")
			   setTimeout(printMessage,7000,"");
		   $(approveLeaveMessage_id).text(msg);
		   
	   }; // END -- printMessage(msg)
	   
	   
   	/**
   	 *  Function to make call to back-end and to get employee leaves based on
   	 *  
   	 */
   	function makeAjaxCallForEmployeeLeave(){
   		   
   		   console.log("==================in makeAjaxCallForEmployeeLeaveStatus()=================");
   			  var request = $.ajax({
   				  url: applicationName + viewLeavesRequest,
   				  method: "post",
   				  dataType: "json"
   				});
   				 
   				request.done(function(data){
   					
   					console.log("data returned from server: "+data);
   					console.log("data returned from server: "+JSON.stringify(data));
   					if(data == -1){
   						window.location.href= applicationName + homePageRequest ;
   					}
   					if(data.length > 0){
   						$(noLeavesDiv_id).hide();
   						$(leavesTableDiv_id).show();
   						totalLeaveData=data;
   					   // function call to set data to table
   	   					setDataToDataTable(data);   	   		
   					}
   					else{
   					    console.log("no leave details found ");
   					    $(noLeavesDiv_id).show();
						$(leavesTableDiv_id).hide();
   					}
   					
   					
   				});
   				 
   				request.fail(function( jqXHR, textStatus ) {
   				  //alert("failed all");
   					console.log("problem occured !!");
   					
   				});
   		   
   		   
   	   }; // END -- makeAjaxCallForEmployeeLeave()
   	   
   	   
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
			   leaveDetails [i][0]=data[i].employeeId;
			   leaveDetails [i][1]=data[i].name;   	
			   leaveDetails [i][2]=data[i].date_of_apply;  
			   leaveDetails [i][3]=data[i].subject;   
			   leaveDetails [i][4]=data[i].setOfLeaveDates.length;  
			   leaveDetails [i][6]=data[i].isApproved;					   
			   leaveDatesArray[i]=getLeaveDatesInAscendinOrder(data[i].setOfLeaveDates);  	
			   leaveDetails [i][5]=leaveDatesArray[i];
			   
		       leaveDetails [i][7]="<button type='button' class='btn btn-default btn-info active' onclick='getRowAtIndex("+i+")'" +
                           		"data-toggle='modal' data-target='#confirmLeaveModal'>click</button>";
			   
		   }// EDN -- for 
		   if(tableDrawnCount == 0){
			   
			    LeavesDataTable=$(leavesTable_id).DataTable({
                    data: leaveDetails,
                    "lengthMenu": [[5,-1], [5, "All"]],
                    columns: [

                        { title: "Employee ID" },
                        { title: "Employee Name" },
                        { title: "Applied date" },                           
                        { title: "Subject","orderable": false },
                        { title: "Num of Days","orderable": false },
                        { title: "Leave dates"},   // ,"orderable": false 
                        { title: "Status" },
                        { title: "View message","orderable": false}

                     ]
            });
			   
			    tableDrawnCount ++;
		   }
		   else{
			   LeavesDataTable.clear().draw();
			   LeavesDataTable.rows.add(leaveDetails).draw();
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

});// END -- $('document').ready(function)
