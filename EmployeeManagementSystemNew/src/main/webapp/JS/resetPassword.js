$(document).ready(function(){
	
	var resetPasswlrd_form_id="#reset-password-form";
	var resetPasswordAdminId_id="#reset-password-admin-id";
	var resetPasswordButton_id="#resetPasswordButton";
	
	var newPassword_id="#newPassword";
	var confirmPassword_id="#confirmPassword";
	var success_msg_id="#resetPasswordSuccessMsg";
	var reset_msg_id="#reset-message";
	
	var resetPasswordStrengthSpan_id="#resetPassword-strength-span";
	
	var applicationName="EmployeeManagementSystemNew";
	/* variable for storing get all employee ids request (String) */
	var resetPasswordRequest="setNewAdminPassword.do";
	
	var adminId="";
	var adminObject={adminId:"",password:""};
	
	/*function call to checkAdminId()*/
	setforgotPasswordDefaultValues();
	
	/**
	 * function to set default values
	 */
	function setforgotPasswordDefaultValues(){
		
	    adminId=$(resetPasswordAdminId_id).val();
	    console.log("reet admin id length: "+adminId.length);
	    
	    $(newPassword_id).val("");   
	    $(confirmPassword_id).val("");
	    $(success_msg_id).text("");
	    $(reset_msg_id).text("");
	  
	}
	/**
	 * This function is to stop reloading page on submit
	 */
	$(resetPasswlrd_form_id).submit(function (){
	
		return false;
		
	});
	
	/**
	 * This function is executing when entering
	 * value in new password text box
	 */
	$(newPassword_id).keyup(function(){
		
		measurePasswordStrength($(this).val(),resetPasswordStrengthSpan_id) ;
	});
	
	
	/**
	 * function executes when reset password button is clicked
	 */
	$(resetPasswordButton_id).click(function(){
		
				resetPasswordFunction();
			
	});
	/**
	 * Function to verify fileds
	 */
	function resetPasswordFunction() {
		    
	      var newPwd=$(newPassword_id).val();   
	      var confirmPwd=$(confirmPassword_id).val();
	      console.log("new pass: "+newPwd);
	      console.log("confirm pass: "+confirmPwd);
	      
	      if(newPwd.length < 5 && confirmPwd.length  >= 5 ){
	    	  $(success_msg_id).text("New  password too short . ");
	      }
	      else if(newPwd.length  >= 5 && confirmPwd.length < 5 ){
	    	  $(success_msg_id).text("Confirm  password too short .");
	      }
	      else if(newPwd.length < 5 &&  confirmPwd.length < 5) {
	    	  $(success_msg_id).text("Both New  password  & Confirm Password are too short.");
	      }
	      else if(newPwd != confirmPwd){
	    	  $(success_msg_id).text("Both New  password  & Confirm Password Should be same.");
	      }
	      else{
	    	  var id=$(resetPasswordAdminId_id).val();
	    	  $(success_msg_id).text("please wait..");
	    	  adminObject={adminId:id,password:newPwd};
	    	  makeAjaxCallToResetPassword(adminObject);
	      }
	};
	/**
	 * Function to call backend for reset password
	 */
	function makeAjaxCallToResetPassword(adminObject){
		console.log("object for reset password: "+JSON.stringify(adminObject));
		$.ajax ({
		    url: "/"+applicationName+"/"+resetPasswordRequest,
		    type: "POST",
		    data: JSON.stringify(adminObject),
		    dataType: "json",
		    contentType: "application/json; charset=utf-8",
		    success: function(data){
		    	console.log("data: "+data);
		    	var result=data;
		    	var displayResult="";
		        if(result == 1){
		            /* function call to set default values */
		            setforgotPasswordDefaultValues();
		            $(resetPasswlrd_form_id).hide();
		        	$(reset_msg_id).text("Password successfully updated, Login now !");  
		        }
		        else{		        	
		        	$(success_msg_id).text("Some internal problem occured try again !!");  
		        }
		        
		     },
	      error: function(data){
	    	  $(success_msg_id).text("Some internal problem occured try again !!");  
	      }
		}); 
		
		
	}

});
