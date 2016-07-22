
/*  This file name: AdminViewDisapprovedLeaves.js  */

     var  totalLeaveData;
     var leaveDatesArray;
     var currentIndex;
     
     /* variables to store ids of fields */
     var leaveSubject_id="#subject-of-employee";
     var leaveMessage_id="#message-of-employee";
     var employeeName_id="#employee-name-id";
     var employeeId_id="#employee-id-id";
     var leaveDatesSection_id="#leave-dates-section";
     var approveLeaveButton_id="#approve-leave-button";
	 var approveLeaveMessage_id="#admin-approve-leave-message";
	 var leaveStatus_id="#employee-leave-status";
	 
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
		   		  
	    $(approveLeaveMessage_id).text("");
		$(leaveSubject_id).html(totalLeaveData[index].subject);
		$(leaveMessage_id).html(totalLeaveData[index].message);
		$(employeeName_id).html(totalLeaveData[index].name);
		$(employeeId_id).html(totalLeaveData[index].employeeId);

		var details="<br><b> Number of days: </b><mark class='text-danger'><strong> "+totalLeaveData[index].setOfLeaveDates.length
		                       +"</strong></mark><br><br><b>Leave dates:</b><mark class='text-danger'><strong> "+leaveDatesArray[index]+"</strong></mark>";
		$(leaveDatesSection_id).html(details);
		$(leaveStatus_id).html("<b>Leave Status: </b><mark class='text-danger'><strong> Disapproved </strong></mark>");
		   
	   };// END -- showLeaveConfirmModal(index)

	   
	   
     $('document').ready(function(){
    	 
	      /*varibles to store ids of fields*/
	      var disApprovedLeavesDivision_id ="#disapproved-leaves-division";
	      var noDisapprovedLeavesDivision_id="#no-disapproves-leaves-division";
	      var disApprovedLeavesTable_id="#disapproved-leaves-table";
	      var confirmLeaveModal_id="#confirmLeaveModal";
	      var successModal_id="#update-success-modal";
	      
	      /*variables to store requests*/
		  var urlPattern=".do";
		  var applicationName="/EmployeeManagementSystemNew";
		  var allDisapprovedLeavesRequest="/getAllDisapprovedLeaves"+urlPattern;
		  var homePageRequest="/home"+urlPattern;
		  var updateLeaveStatusRequest="/updateEmployeeLeaveStatus"+urlPattern;
		  
		  var leaveId_param="leaveId";
		  var status_param="status";
		   
		  /* variables to store success.error messages */
		  var noPendingLeaves_msg="No pending leaves !";
		  var approveSuccess_msg="Leave success fully approved !";
		  var approveSuccess_msg="Leave success fully approved !";
		  var disapproveSuccess_msg="Leave success fully Disapproved !";	  
		  var disApproveError_msg="Problem occured try again ";
		  
		  var disApprovedLeaveTable;
		  var tableDrawnCount=0;
	  
		  // set accordion
		   $("#accordion").accordion({
				 active: 1
			});
		   
		   // get all disapproved leave details
		   makeAjaxCallTogetDisapprovedLeaves();
		   
		   /**
		    *  this function is to get all disapproved leave details
		    */
		   function makeAjaxCallTogetDisapprovedLeaves(){
			   console.log("now making call  to get disapproved leaves");
			   var request = $.ajax({
					  url: applicationName + allDisapprovedLeavesRequest,
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
					   $(noDisapprovedLeavesDivision_id).hide();
					   $(disApprovedLeavesDivision_id).show();
					   totalLeaveData=data;
					   setDataToDataTable(data);
				   }
				   else{
					   $(noDisapprovedLeavesDivision_id).show();
					   $(disApprovedLeavesDivision_id).hide();
					   $(noPendingLeavesMessage_id).text(noPendingLeaves_msg);
				   }
				   
					  
			   });
			   request.fail(function( jqXHR, textStatus ) {
				   console.log("internal problem occured");
			   });
			   
		   };// END -- makeAjaxCallTogetDisapprovedLeaves()
		   
		   /**
		    *  function to approve leave
		    */
		   $(approveLeaveButton_id).click(function(){
	           console.log("approve button clicked");
			   // 1 for approving leave
			   makeAjaxCallToUpdateLeaveStatus(1);
			   
		   }); // END -- $(approveLeaveButton_id).click(function())
		   
		  
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
						   printMessage(approveSuccess_msg);
						   $(leaveStatus_id).html("");
						   $(leaveStatus_id).html("<b>Leave Status: </b><mark class='text-danger'><strong>Approved</strong></mark>");
						   makeAjaxCallTogetDisapprovedLeaves();
						   showSuccessModal();
					   		   
				   }
				   else if(data == -1){
					   console.log("session expired!!");
					   window.location.href= applicationName + homePageRequest;
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
		    *  function to show success modal
		    */
		   function showSuccessModal(){
			   
			   $(confirmLeaveModal_id).modal('hide');
			   $(successModal_id).modal('show');
			   
		   }; // END -- showSuccessModal()
		   
		   /**
		    *  function to print error or success message
		    */
		   function printMessage(msg){
			   if(msg != "")
				   setTimeout(printMessage,7000,"");
			   $(approveLeaveMessage_id).text(msg);
			   
		   }; // END -- printMessage(msg)		   
		   
		   /**
		    *  function to set data to datatable
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
				   
				   disApprovedLeaveTable=$(disApprovedLeavesTable_id).DataTable({
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
				   disApprovedLeaveTable.clear().draw();
				   disApprovedLeaveTable.rows.add(leaveDetails).draw();
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
		    	    stringDate=datesArray[j].getDate()+"/"+(datesArray[j].getMonth()+1)+"/"+datesArray[j].getFullYear(); new Date().g
		    	   //leaveDetails [i][4][j]=(datesArray[j]+"").substring(0,15);
		    	    sortedArray.push(stringDate);
		       }
		       
		       return sortedArray;
		       
		   }; // END --  getLeaveDatesInAscendinOrder(leaveDatesArray)
	  
	  
	  
      }); // END -- $('document').ready(function())