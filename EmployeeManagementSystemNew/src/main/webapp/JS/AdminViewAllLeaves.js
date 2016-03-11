
/*  This file name:  AdminViewAllLeavesApplications.js.js */

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
	   var viewAllLeavesRequest="/getAllLeave"+urlPattern;
	   var homePageRequest="/home"+urlPattern;
	   var updateLeaveStatusRequest="/updateEmployeeLeaveStatus"+urlPattern;
	   var viewMonthLeavesRequest="/getAllLeavesforMonth"+urlPattern;
	   
	   var leaveId_param="leaveId";
	   var status_param="status";
	   var month_param="month";
	   
	   /*variables to store ids of fields*/
	   var leavesTable_id="#admin-leaves-table";	 
	   var leavesTableDiv_id="#leaves-table-division";
	   var noLeavesDiv_id="#nodata-leave-message-div";
	   var allLeavesButton_id="#all-leaves-button";
	   var monthLeavesButton_id="#month-leaves-button";
	   var selectMonthDivision_id="#slect-month-division";
	   var showingMessage_id="#showing-message";
	   var viewSlectedMonthLeavesButton_id="#view-selected-cmonth-leaves-button";
	   var selectMonth_id="#select-month-field";
	   var viewLeavesMessage_id="#view-leaves-message";
	   var heading_id="#employee-leave-details-heading";
	   
	   /*variables to store success or error messages*/
	   var approveSuccess_msg="Leave success fully approved !";
	   var disapproveSuccess_msg="Leave success fully Disapproved !";	  
	   var disApproveError_msg="Problem occured try again ";
	   var allLeavesMarquee_msg="Now you are watching all leaves.";
	   var monthLeavesMarquee_msg="Now you are watching Month wise leaves.";
	   var allLeavesHeading_msg="All Leave Details";
	   var monthHeading_msg="All leave details applied in ";
	   var invalidMonth_msg="Invalid month";
	   var wait_msg="Please wait...";
	   
	   var tableDrawnCount=0;
	   var LeavesDataTable; 
	   var slectedMonth;
	   var selectedMonthIndex;
	   var monthArray= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	  
	  //hide no leaves division
	   $(noLeavesDiv_id).hide();
	   // first display all employee leave details
	   getAllLeaves();
	  
	   // set accordion
	   $("#accordion").accordion({
			 active: 1
		});
	   	
	   /**
	    *  function for all leaves button
	    */
	   $(allLeavesButton_id).click(function(){
		   
		  //console.log("all leaves button clicked");		   
		   getAllLeaves();
		   
	   });// END --  $(allLeavesButton_id).click()
	   
	   /**
	    * function to get all leave details
	    */
	   function getAllLeaves(){
		   $(noLeavesDiv_id).hide();
		   $(selectMonthDivision_id).hide();
		   var url=applicationName + viewAllLeavesRequest;
		   makeAjaxCallForEmployeeLeaveDetails(url);
		   setHeadingAndMarquee(allLeavesHeading_msg,allLeavesMarquee_msg);
		   
	   };// END -- getAllLeaves()
	   
	   /**
	    *  function for month leaves button
	    */
	   $(monthLeavesButton_id).click(function(){
		   //console.log("month leaves button clicked");
		   $(leavesTableDiv_id).hide();
		   $(selectMonthDivision_id).show();
		   
	   });// END --  $(allLeavesButton_id).click()
	   
	   $(viewSlectedMonthLeavesButton_id).click(function(){
		   //console.log("view selected month leaves buttton clicked");
		   printErrorMessage("");
		   slectedMonth=$(selectMonth_id).val();

		   if(slectedMonth.length == 7){
			   selectedMonthIndex=parseInt(slectedMonth.split('-').pop())-1;
			   var url= applicationName + viewMonthLeavesRequest+"?"+month_param+"="+slectedMonth ;
			   makeAjaxCallForEmployeeLeaveDetails(url);
			   setHeadingAndMarquee(monthHeading_msg+monthArray[selectedMonthIndex],monthLeavesMarquee_msg);
		   }
		   else{			   			   
			   //console.log("in  else");			   
			   printErrorMessage(invalidMonth_msg);
		   }
	   });// END -- $(viewSlectedMonthLeavesButton_id).click()
	   
	   /**
	    * function to print error/success message
	    */
	   function printErrorMessage(msg){
		   console.log("in printmessage() message received: "+msg);
		   if(msg != "")
			   setTimeout(printErrorMessage,7000,"");
		   $(viewLeavesMessage_id).text(msg);
		   
	   };
	   
	   
	   /**
	    * function to set heading and mqrquee
	    */
	   function setHeadingAndMarquee(headingMsg,marqueeMsg){
		  // console.log("in setHeading() ");
		  // console.log("heading received: "+headingMsg +"   marquee message received: "+marqueeMsg);		   
			   $(showingMessage_id).text(marqueeMsg);
			   $(heading_id).text(headingMsg);		 
		   
	   };// END --setHeadingAndMarquee()
	  
	   
	   	/**
	   	 *  Function to make call to back-end and to get employee leaves based on
	   	 *  
	   	 */
	   	function makeAjaxCallForEmployeeLeaveDetails(requestUrl){
	   		
	   		printErrorMessage(wait_msg);
	   		   console.log("n makeAjaxCallForEmployeeLeavedetails(url) url received: "+requestUrl);
	   			  var request = $.ajax({
	   				  url: requestUrl,
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
	   						printErrorMessage("");
	   						totalLeaveData=data;
	   					   // function call to set data to table
	   	   					setDataToDataTable(data);   	   		
	   					}
	   					else{
	   					    console.log("no leave details found ");
	   					    $(noLeavesDiv_id).show();
							$(leavesTableDiv_id).hide();
							printErrorMessage("");
	   					}
	   					
	   					
	   				});
	   				 
	   				request.fail(function( jqXHR, textStatus ) {
	   				  //alert("failed all");
	   					console.log("problem occured !!");
	   					
	   				});
	   		   
	   		   
	   	   }; // END -- makeAjaxCallForEmployeeLeave()
	   
	   
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
					   $(approveLeaveMessage_id).text(approveSuccess_msg);
					   hideApproveButton(true);
					   totalLeaveData[currentIndex].isApproved=approved;
					   setDataToDataTable(totalLeaveData);
					   $(leaveStatus_id).html(">");
					   $(leaveStatus_id).html("<b>Leave Status: </b><mark class='text-danger'><strong>"+approved+"</strong></mark>");
				   }else{
					   $(approveLeaveMessage_id).text(disapproveSuccess_msg);
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
				   $(approveLeaveMessage_id).text(disApproveError_msg);   
			   }
				  
		   });
		   request.fail(function( jqXHR, textStatus ) {
			   console.log("internal problem occured");
			   $(approveLeaveMessage_id).text(disApproveError_msg); 
		   });
		   
	   };// END -- makeAjaxCallToUpdateLeaveStatus(leaveStatus)
	   	   	   
	   
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
	    	    stringDate=datesArray[j].getDate()+"/"+(datesArray[j].getMonth()+1)+"/"+datesArray[j].getFullYear(); new Date().g
	    	   //leaveDetails [i][4][j]=(datesArray[j]+"").substring(0,15);
	    	    sortedArray.push(stringDate);
	       }
	       
	       return sortedArray;
	       
	   }; // END --  getLeaveDatesInAscendinOrder(leaveDatesArray)

});// END -- $('document').ready(function)
