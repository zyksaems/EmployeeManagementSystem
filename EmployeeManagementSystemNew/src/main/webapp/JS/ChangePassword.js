$("document").ready(
			function() {
				
				var employeePasswordMinLength = 6;
				
				var successClass="has-success";
				var glyphiconOk="glyphicon-ok";
				var errorCalss="has-error" ;
				var glyphiconError="glyphicon-remove";
				
function setTextBoxClassOk(divId,spanId){
					
					$(divId).removeClass(errorCalss).addClass(successClass);
					$(spanId).removeClass(glyphiconError).addClass(glyphiconOk);
					
				}

function setTextBoxClassError(divId,spanId){
	
	$(divId).removeClass(successClass).addClass(errorCalss);
	$(spanId).removeClass(glyphiconOk).addClass(glyphiconError); 
	
}  

var changePasswordEmployeeCurrentPassDiv_id="#change-password-admin-current-password-div";  
var changePasswordEmployeeCurrentPass_id="#change-password-admin-current-password-val";
var changePasswordEmployeeCurrentPassSpan_id="#change-password-admin-current-password-span";

var changePasswordEmployeeNewPassDiv_id="#change-password-admin-new-password-div";
var changePasswordEmployeeNewPass_id="#change-password-admin-new-password-val";
var changePasswordEmployeeNewPassSpan_id="#change-password-admin-new-password-span";

var changePasswordEmployeeConfirmPassDiv_id="#change-password-admin-confirm-password-div";
var changePasswordEmployeeConfirmPass_id="#change-password-admin-confirm-password-val";
var changePasswordEmployeeConfirmPassSpan_id="#change-password-admin-confirm-password-span";

var changeEmployeePasswordButton_id="#change-admin-password-button";

var employeeChangePasswordSuccessMsg_id="#admin-change-password-success-message";

var employeeChangePasswordSuccessMsg_id1="#admin-change-password-success-message1";
var shortCurrentPasswordMsg="Current password is short";
/* variable to display new password is short error message  (string) */
var shortNewPasswordMsg="New password is short";
/* variable to display new password and confirm password not mateched error message  (string) */
var newPasswordConfimPassNotMatchedMsg="New password and confirm password not matched";
/* variable to display employee password successfully changed message  (string) */
var changePasswordSuccessMsg="Password successfully changed!";
/* variable to display current password is not corrent error message  (string) */
var changePasswordCurrentPassNotMatchedMsg="Entered current password is wrong try again";
 /* variable to display internal problem in change password error message  (string) */
var changePasswordInternalErrorMsg="Some problem occured try again !!";

var currentPasswordMatchedMsg="Current password should not match with new password";
/* variable for storing  current employee password (String) */
var adminCurrentPassword;
/* variable for storing  empoyee new password (String) */
var adminNewPassword;
/* variable for storing  employee confirm password (String) */
var adminConfirmPassword;
/* variable for storing  change password employee if flag  (boolean) */
var changePasswordEmpoyeeIdFlag;


function setChangePasswordDefaultValues(){
   
    $(changePasswordEmployeeCurrentPass_id).val("");
    $(changePasswordEmployeeNewPass_id).val("");
    $(changePasswordEmployeeConfirmPass_id).val("");
  
    /*reomve all success classes from text boxes*/
     $(changePasswordEmployeeCurrentPassDiv_id).removeClass(successClass);
     $(changePasswordEmployeeNewPassDiv_id).removeClass(successClass);
     $(changePasswordEmployeeConfirmPassDiv_id).removeClass(successClass);
     
	 $(changePasswordEmployeeCurrentPassSpan_id).removeClass(glyphiconOk); 
	 $(changePasswordEmployeeNewPassSpan_id).removeClass(glyphiconOk); 
	 $(changePasswordEmployeeConfirmPassSpan_id).removeClass(glyphiconOk); 
  
    
};// END -- setChangePasswordDefaultValues()

/* function call to set default values */
setChangePasswordDefaultValues();

var currentflag=false; 

$(changePasswordEmployeeCurrentPass_id).keyup(function(){
	var length=$(changePasswordEmployeeCurrentPass_id).val().length;
	if(length < employeePasswordMinLength){
		setTextBoxClassError(changePasswordEmployeeCurrentPassDiv_id,changePasswordEmployeeCurrentPassSpan_id);
	}
	else{
		
		currentflag=true;
		setTextBoxClassOk(changePasswordEmployeeCurrentPassDiv_id,changePasswordEmployeeCurrentPassSpan_id);
	}
	
});// END -- $(changePasswordEmployeeId_id).keyup()

/*  function calls when change password employee new password key up
 *  This function validates input details and displays
 *  success/error message
 */
var newflag=false;
$(changePasswordEmployeeNewPass_id).keyup(function(){
	var length=$(changePasswordEmployeeNewPass_id).val().length;
	if(length >= employeePasswordMinLength && $(changePasswordEmployeeNewPass_id).val()!=$(changePasswordEmployeeCurrentPass_id).val()){
		newflag=true;
		setTextBoxClassOk(changePasswordEmployeeNewPassDiv_id,changePasswordEmployeeNewPassSpan_id);
	}
	else{
		setTextBoxClassError(changePasswordEmployeeNewPassDiv_id,changePasswordEmployeeNewPassSpan_id);
		
	}
	
});// END -- $(changePasswordEmployeeId_id).keyup()

/*  function calls when change password employee confirm password key up
 *  This function validates input details and displays
 *  success/error message
 */
var confirmflag=false;
$(changePasswordEmployeeConfirmPass_id).keyup(function(){
	var confirmPassword=$(changePasswordEmployeeConfirmPass_id).val();
	var newPassword=$(changePasswordEmployeeNewPass_id).val();
	if(newPassword.length >= employeePasswordMinLength && confirmPassword == newPassword){
		setTextBoxClassOk(changePasswordEmployeeConfirmPassDiv_id,changePasswordEmployeeConfirmPassSpan_id);
		confirmflag=true;
	}
	else{
		setTextBoxClassError(changePasswordEmployeeConfirmPassDiv_id,changePasswordEmployeeConfirmPassSpan_id);
	}
	
});

$(changeEmployeePasswordButton_id).click(function() {
    console.log("button clicked");
    alert("ok");
    var flag=true;
	if(flag){
		employeeCurrentPassword=$(changePasswordEmployeeCurrentPass_id).val();
		employeeNewPassword=$(changePasswordEmployeeNewPass_id).val();
		employeeConfirmPassword=$(changePasswordEmployeeConfirmPass_id).val();
		
		/* function call to validate details entered by employee */
		var correctDetailsFlag=validateChangePasswordDetails();
	    console.log("correct details flag: "+correctDetailsFlag);
	    if(correctDetailsFlag){
	        var changePasswordObject={currentPassword:employeeCurrentPassword,newPassword:employeeNewPassword};
	    	/* function call to make ajax call for changing password */
	    	makeAjaxCallToChangePassword(changePasswordObject);
	    }
	    else{
	    	
	    }
    }
	else{
		$(employeeChangePasswordSuccessMsg_id).text("all field should meet requirement");
	}
	/* function call to search employee id in all employee details array */
	

});// END -- $("#employeeID").keyup()

/*  function for validating change password details
*  This function validates all details and displays
*  success/error message
*/
function validateChangePasswordDetails(){
	var errorMessage="";
	errorMessage=(employeeNewPassword == employeeCurrentPassword)?currentPasswordMatchedMsg : errorMessage;
	errorMessage=(employeeNewPassword != employeeConfirmPassword)?newPasswordConfimPassNotMatchedMsg : errorMessage;
	errorMessage=(employeeNewPassword.length < employeePasswordMinLength)?shortNewPasswordMsg : errorMessage;
	errorMessage=(employeeCurrentPassword.length < employeePasswordMinLength)? shortCurrentPasswordMsg : errorMessage;			
	$(employeeChangePasswordSuccessMsg_id).text(errorMessage);
	return (errorMessage == "")? true : false;
	
};// END -- validateChangePasswordDetails()


/*  function for make ajax call to change password
*  
*/
function makeAjaxCallToChangePassword(changePasswordObject){
	$.ajax ({
	    url: "/EmployeeManagementSystemNew/changePassword.do",
	    type: "POST",
	    data: JSON.stringify(changePasswordObject),
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: function(data){
	    	console.log("data: "+data);
	    	var result=data;
	    	var displayResult="";
	        if(result == 1){
	            /* function call to set default values */
	            setChangePasswordDefaultValues();
	            $(employeeChangePasswordSuccessMsg_id1).text(changePasswordSuccessMsg);  
	        }
	        else if(result == 0){
	        	
	        	displayResult=changePasswordCurrentPassNotMatchedMsg; 
	        	/* function call to employeeEnteredWrongPassword() */
	        	employeeEnteredWrongPassword(); 
	        }
	        else{
	        	displayResult=changePasswordInternalErrorMsg;
	        	/* function call to set default values */
	            setChangePasswordDefaultValues(); 
	        }
	        $(employeeChangePasswordSuccessMsg_id).text(displayResult);
	     },
     error: function(data){
   	  setDefaultVales();
   	  $(employeeChangePasswordSuccessMsg_id).text(internalServerProblem);
     }
	}); 
};// END -- makeAjaxCallToChangePassword(changePasswordObject)


/*  
*  function to set default values when password is wrong
*/
function employeeEnteredWrongPassword(){
	
        /*remove all success classes from text boxes*/
        $(changePasswordEmployeeCurrentPassDiv_id).removeClass(successClass);		                 
		 $(changePasswordEmployeeCurrentPassSpan_id).removeClass(glyphiconOk); 
};

			});