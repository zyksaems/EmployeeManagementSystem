
  /* This file name is: EmployeeApplyForLeave.js */

  
    $('document').ready(function(){
    	
    	var allEemployeeData;
    	
    	/*variables to store requests*/
 	   var urlPattern=".do";
 	   var applicationName="/EmployeeManagementSystemNew";
 	   var applyLeaveRequest="/employeeApplyForLeave"+urlPattern;
 	   var homePageRequest="/home"+urlPattern;
 	   var employeeId_param="employeeId";
 	   var leavedates_param="leaveDates";
 	 	   
 	   var loggedInEmployeeId=localStorage.getItem("loggedInEmployeeId");
 	   
 	   /*variables to store ids of fields*/
 	   var leaveSubject_id="#leave-subject";
 	   var leaveMessage_id="#text-for-leave";
 	   /*buttons ids*/
 	   var leaveButton_id="#apply-leave-button";
 	   var confirmApplyleaveButton_id="#apply-leave-confirm-button";
 	   var resetButton_id="#employee-leave-reset-button";
 	   
 	   var selectedDates_msg_id="#selected-dates-message";
 	   var successMessage_id="#leave-success-message"; 	   
 	   var leaveDatePicker_id="#leave-dates-multi-date-picker";
 	   var leaveSuccessMessage_id="#apply-leave-message";
 	  
 	   /*modal ids*/
 	   var leaveSuccessfullyApplied_modal_id="#leave-successfully-appplied-modal";
 	   var confirmModal_id="#confirm-leave-modal";
 	   
 	   var leaveSubject="";
 	   var leaveMessage="";
 	   var leaveDates=[]; 
 	   var showCalendarDays=60;
 	   
 	  /* variables to store success/error messages*/
 	   var shortSubject_msg="Please enter proper subject for leaave";
 	   var shortText_msg="Please enter proper leave message";
 	   var selectDates_msg="Please select leave dates";
 	   var internalProblem_msg="Some problem occured try again !";
	   var pleaseWait_msg="please wait...";
 	  
 	   var loggedEmployeeId=localStorage.getItem("loggedInEmployeeId");
 	   var loggedInEmployeeName=localStorage.getItem("loggedEmployeeName");
 	  
    	 // set accordion first tab to enable
 	   $("#accordion").accordion({
 			 active: 1
 		});
 	   
 	   /**
 	    *  Function for multi date picker
 	    */
 	   function getDatepicker(){
 		   
 		  $(leaveDatePicker_id).multiDatesPicker({dateFormat: "dd/mm/yy",minDate: 0,maxDate: showCalendarDays});
 		  //$("#ui-datepicker-div").hide();
 	   };
 	   
 	  getDatepicker();
 	  
 	  /**
 	   *  function to show given  modal and hides another modal
 	   */
 	  function showModal(modalId){
 		  if(leaveSuccessfullyApplied_modal_id == modalId){
 			 $(confirmModal_id).modal('hide');			  			 
 		  }
 		  else{
 			 $(leaveSuccessfullyApplied_modal_id).modal('hide'); 			  
 		  }
 		  $(modalId).modal('show');
 		 
 	  }; //END -- showModal(modalId)
 	  
 	   
 	   /**
 	    *  functon for apply for leave button
 	    */
 	   $(leaveButton_id).click(function(){
 		   console.log("apply for leave button clicked");
 		   leaveSubject=$(leaveSubject_id).val();
 		   leaveMessage=$(leaveMessage_id).val();
 		   leaveDates = $(leaveDatePicker_id).multiDatesPicker('getDates');
 		   var  numberOfDays = leaveDates.length;
 		   console.log("leave subject: "+leaveSubject);
 		   console.log("leave message: "+leaveMessage);		
 		   console.log("leave dates: "+leaveDates);
 		   if(validateLeaveApplication()){
 			  console.log("appplication is ok  ");
 			  PrintMessage("");
 			  $(selectedDates_msg_id).html("You are applying for <code>"+numberOfDays+"</code> day(s) leave  <br> on <code>"+leaveDates+"</code>"); 
 			  $(leaveSuccessMessage_id).text("");
 			  showModal(confirmModal_id); 			 
 			
 		   }
 		 
 	
 	   });// END -- $(leaveButton_id).click)
 	   
 	  /**
		*  This fuinction is to confirm apply leave button
		*/
	   $(confirmApplyleaveButton_id).click(function(){
			 
			nmakeAjaxCAllToapplyForLeave();
			 
		});// END --  $(confirmApplyleaveButton_id).click()
 	   
 	   /**
 	    *  Function to print error/success message
 	    */
 	   function PrintMessage(msg){
 		   
 		  $(successMessage_id).text(msg);
 		  if(msg != "")
 		     setTimeout(PrintMessage,5000,"");
 		  
 	   }; // END -- PrintMessage()
 	   
 	  /**
 	    *  This function is to validate leave application fields
 	    *  if all fields are correctly filled then returns true
 	    *  otherwise returns false
 	    */
 	   function validateLeaveApplication(){
 		    
 		    if(leaveSubject.length == 0 || leaveSubject.length < 4){
 		    	PrintMessage(shortSubject_msg);
 		    	return false;
 		    }
 		    else if(leaveMessage.length == 0 || leaveMessage.length < 10 ){
 		    	PrintMessage(shortText_msg);
 		    	return false;
 		    }
 		    else if(leaveDates.length == 0){
 		    	PrintMessage(selectDates_msg);
 		    	return false;
 		    }
 		    else{
 		    	return true;
 		    }
 		   
 	   }; // END -- validateLeaveApplication()
    	
    	/**
    	 *  function to show message
    	 */
    	function showMessage(index){
    		var message=allEemployeeData[index].message;
    		
    		$("#message-of-employee").html(message);
    		
    	}; // END -- showMessage(index)
    	
    	/**
    	 *  function to set default values
    	 */
    	function setDefaltValues(){
    		
    		PrintMessage("");
    		$(leaveSubject_id).val("");
  		    $(leaveMessage_id).val("");
  		    $(leaveDatePicker_id).multiDatesPicker('resetDates');
    		
    	}; // END -- setDefaltValues()
    	
    	/**
    	 *  function to reset leave application
    	 */
    	$(resetButton_id).click(function(){
    		
    		setDefaltValues();
    		
    	});// END -- $(resetButton_id).click(function())
    	

    	   
    	   /**
    	    *  Function to apply for leave
    	    */
    	   function nmakeAjaxCAllToapplyForLeave(){
    				
    			//console.log("subject :"+subject);
    			//console.log("text_content :"+text_content);
    		   $(leaveSuccessMessage_id).text(pleaseWait_msg);
    		   
    			var leaveObject={employeeId:loggedEmployeeId,name:loggedInEmployeeName,subject:leaveSubject,message:leaveMessage};
    			
    			$.ajax({
    		        type: "POST", 
    		        url: applicationName + applyLeaveRequest+"?"+leavedates_param+"="+leaveDates,
    		        data:leaveObject,
    		        success: function(data) {
    		        	console.log("data returnes form server(for leave application): "+data);
    		        	//  show meaage
    		        	//$("#leave-appy-success-msg").text("Successfully applied");
    		        	// call call back functon
    		        	if(data == 1){
    		        		$(leaveSuccessMessage_id).text("");
    		        		 showModal(leaveSuccessfullyApplied_modal_id);
    		        		 setDefaltValues();
    		        	}
    		        	 
    		        	else if(data == 0){
    		        		console.log("error in appplying leave");    		        		
    		        		$(leaveSuccessMessage_id).text(internalProblem_msg);
    		        		
    		        	}    		        		
    		        	else
    		        		window.location.href=applicationName + homePageRequest;
    		        	
    		            //setTimeout(reloadPage,1000);
    		        },
    		        error: function(msg) {
    		    
    		        	//$("#leave-appy-success-msg").text("failed  try again");
    		        	alert("Not applied successfully");
    		        
    		        }
    		    }); // END -- $ajax()
    			
    			
    		}; // END -- nmakeAjaxCAllToapplyForLeave()
    		
    		/**
    		 *  Function to reload page
    		 */
    		function reloadPage(){
    			   window.location.reload();
    		};
    	
    	
    }); // END -- $('document').ready(function())