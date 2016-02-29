	
      /*variables to store id of elements( specially for forgot password)*/
          var forgotpassword_id="#empid";
          var forgotpassword_email_div="#forgot_password_email_div";
          var forgotpassword_email="#email1";
          var forgotpassword_email_span_id="#forgotpassword-email-span";
          var forgotpassword_div="#Forgot_password_div";          
          var forgotpassword_span_id="#forgotpassword-id-span";
          
      	/*variables for storing bootstrap css classes*/
			var successClass="has-success";
			var glyphiconOk="glyphicon-ok";
			var errorCalss="has-error" ;
			var glyphiconError="glyphicon-remove";
      

         /**
	       * This function is to set default values to forgot password default values
	       */
	        function setForgotPasswordDefaulValues()
	        {
	            	  $(forgotpassword_id).val("");
	            	  $(forgotpassword_email).val("");
	            	  $(forgotpassword_div).removeClass(successClass).removeClass(errorCalss);
		              $(forgotpassword_span_id).removeClass(glyphiconOk).removeClass(glyphiconError);
	            	  $(forgotpassword_email_div).removeClass(successClass).removeClass(errorCalss);
		              $(forgotpassword_email_span_id).removeClass(glyphiconOk).removeClass(glyphiconError);
		              $("#res").text("");
	        };
	        
	        /*variables to store ids of employee change password functionality*/
			
	           
	           var changePasswordEmployeeId_id="#change-password-employee-id-val";	  
	           var changePasswordEmployeeIdDiv_id = "#change-password-employee-id-div";
	           var changePasswordEmployeeIdSpan_id="#change-password-employee-id-span";
	           
	           var changePasswordEmployeeCurrentPass_id="#change-password-employee-current-password-val";
	           var changePasswordEmployeeNewPass_id="#change-password-employee-new-password-val";
	           var changePasswordEmployeeConfirmPass_id="#change-password-employee-confirm-password-val";
	           var employeeChangePasswordSuccessMsg_id="#employee-change-password-success-message";
	           
	           /**
	             * This function sets default values to text fleds (Employee change password)
	             */
	            function setEmployeeChangePasswordDefaultValues(){
	                $(changePasswordEmployeeId_id).val("");
	                $(changePasswordEmployeeCurrentPass_id).val("");
	                $(changePasswordEmployeeNewPass_id).val("");
	                $(changePasswordEmployeeConfirmPass_id).val("");
	                
	                /*reomve all success classes from text boxes*/
	                 //$(changePasswordEmployeeCurrentPassDiv_id).removeClass(errorCalss).removeClass(successClass);
	                // $(changePasswordEmployeeNewPassDiv_id).removeClass(errorCalss).removeClass(successClass);
	                 //$(changePasswordEmployeeConfirmPassDiv_id).removeClass(errorCalss).removeClass(successClass);
	                 $(changePasswordEmployeeIdDiv_id).removeClass(errorCalss).removeClass(successClass);		                 
					 $(changePasswordEmployeeIdSpan_id).removeClass(glyphiconError).removeClass(glyphiconOk);
					// $(changePasswordEmployeeCurrentPassSpan_id).removeClass(glyphiconOk); 
					// $(changePasswordEmployeeNewPassSpan_id).removeClass(glyphiconOk); 
					// $(changePasswordEmployeeConfirmPassSpan_id).removeClass(glyphiconOk); 
					 $(employeeChangePasswordSuccessMsg_id).text("");
	                
	                
	            };// END -- setEmployeeChangePasswordDefaultValues()

$("document").ready(
			function() {
				
				/*  variables  declaring  */
				
				/* variable for storing all employee ids along with name (json object array) */
				var allEmployeeIdsArray=[];
				/* variable for storing all lemployee ids (json array) */
				var pureEmployeeIdsArray=[];
				/* variable for storing all logged out employee ids (json array) */
				var loggedOutEmployeeIdsArray=[];
				/* variable for storing all logged in employee ids (json array) */
				var loggedInEmployeeIdsArray=[];
				/* variable for storing login status of employee (boolean) */
				var loggedOutstatus;
				/* variable for storing logout status of employee (boolean) */
				var loggedInstatus;
				/* variable for storing  employee name (String) */
				var employeeName="";
				/* variable for storing  employee id (String) */
				var employeeId="";
				/* variable for storing  employee password (String) */
				var employeePassword="";
				/* variable for storing  employee id flag (boolean) */
				var employeeIdFlag;
				/* variable for storing  employee password flag (boolean) */
				var employeePasswordFlag;
				/* variable for storing button text (string) */
				var buttonText;
				/* variable for storing attendance details  (object) */
				var attendanceObj={id:12,type:"login",password:"1212"};
				
				/* creating variables for default values */
				
				/* variable for employee id length (number) */
				var employeeIdMinLength = 6;
				/* variable for password length (number) */
				var employeePasswordMinLength = 6;
				/* variable for attendance login type (String)*/
				var attendanceLoginType="login";
				/* variable for attendance log out type (String)*/
				var attendanceLogoutType="logout";
				/* variable for showing intime for button text (String)*/
				var login="In-Time";
				/* variable for showing out time for button text (String)*/
				var logout="Out-Time";
				/* variable for showing invalid  for button text (String)*/
				var invalid="Invalid";
				/* variable for showing invalid employee id  as error or success message (String)*/
				var invalidIdMsg="Invalid employee Id";
				/* variable for showing attendance posted message (String)*/
				var attendancePostedMsg="Today your attendance posted?";
				/* variable for emp id text box css default class (String) */
				var employeeIdCssDefaultClass = "employeeIdTextBOx_default";
				/* variable for emp id text box css error class (String) */
				var employeeIdCssErrorClass = "employeeIdTextBOx_error";
				/* variable for emp id text box css ok class (String) */
				var employeeIdCssOkClass = "employeeIdTextBOx_ok";
				/* variable for showing inccorect password message (String) */
				var passwordIncorrectMsg="wrong password";
				/* variable for showing login success message (String) */
	        	var inTimeSuccessMsg="Succes fully loggedIn";
	        	/* variable for showing logout success message (String) */
	        	var outTimeSuccessMsg="successfully logged out";
	        	/* variable for showing log in error message (String) */
	        	var inTimeErrorMsg="Error in login Try again?";
	        	/* variable for showing logout error message (String) */
	        	var outTimeErrorMsg="Error in logout Try again?";
	        	/* variable for showing internal server error message (String) */
	        	var internalServerProblem="Some problem occured try again! ";
	        	
	        	/* variable for storing request url's for making ajax calls*/
	        	/* variable for storing application name (String) */
	        	var applicationName="EmployeeManagementSystemNew";
	        	/* variable for storing get all employee ids request (String) */
	        	var allEmployeeIdsRequest="getAllEmpIds.do";
	        	/* variable for storing get logged out employee ids request (String) */
	        	var loggedOutEmpIdsRequest="getLoggedOutEmpIds.do";
	        	/* variable for storing get logged in employee ids request (String) */
	        	var loggedInEmpIdsRequest="getLoggedInEmpIds.do";
	        	/* variable for storing attendance request (String) */
	        	var sendAttendanceRequest="secureLogin.do";
	        
				
				/*variables for storing id of diviions and text boxes and buttons*/
				 var employeeId_id="#employee-id-val";
				 var employeePassword_id="#employee-password-val";
				 var employeeId_div_id="#employee-id-div";
				 var employeeId_span_id="#employee-id-span";
				 var employeePassword_div_id="#employee-password-div";
				 var employeePassword_span_id="#employee-password-span";
				 var employeeAttendanceButton_id="#employeeAttendanceButton";
				 var employeeLoginSuccessMsg_id="#employeeLoginSuccessMsg";
				 
				 var attendanceForm_id="#attendance-form";

			   /* 
				* function for setting default values to attendance form 
				*/
				function setDefaultVales(){
					
					$(employeeId_id).val("");
					$(employeePassword_id).val("");
					$(employeeAttendanceButton_id).text(login);
					$(employeeAttendanceButton_id).prop( "disabled", true );					
					loggedInstatus=false;
					loggedOutstatus=false;
					employeeIdFlag=false;
					employeePasswordFlag=false;
					
					/*remove success classes for divisions and set default classes*/
					$(employeePassword_div_id).removeClass(successClass);
					$(employeePassword_span_id).removeClass(glyphiconOk);
					$(employeeId_div_id).removeClass(successClass);
					$(employeeId_span_id).removeClass(glyphiconOk);
					
					
					
				}// END--setDefaultVales()
				
				/*setting employee id text box maxlength property*/
				$(employeeId_id).prop( "maxlength", employeeIdMinLength );
				
				
				
				/* function call to set default values */
				setDefaultVales();
				
				/* function calls (ajax calls) to get validation details for attendance */
			    getAllEmpployeeIds();
				getLoggedOutEmpployeeIds();
				getLoggedInEmpployeeIds(); 

				
				
				/* This funcion will make ajax call to get 
				 *  All employee ids along with name
				 */
				function getAllEmpployeeIds(){
					
					$.post("/"+applicationName+"/"+allEmployeeIdsRequest, function( data ) {
						   console.log("All employee ids data: "+data);
						   console.log("All employee ids array length: "+data.length);
						   allEmployeeIdsArray=data;
						   $("#allEmployeeArray").text("All employees: "+JSON.stringify(allEmployeeIdsArray));
						   
						   $.map(allEmployeeIdsArray, function (value, key) {

								pureEmployeeIdsArray.push(''+value.empId);
					       });
						   /*writing pure employee ids array to local storage*/ 
						   localStorage.setItem("employeeidsarray", pureEmployeeIdsArray);
						   
						   console.log("local read"+localStorage.getItem("employeeidsarray"));
						   
						},"json");
				}//END -- getAllEmpployeeIds()
				
				/* This funcion will make ajax call to get 
				 *  logged out employee Ids
				 */
				function getLoggedOutEmpployeeIds(){
					
					$.post("/"+applicationName+"/"+loggedOutEmpIdsRequest, function( data ) {
						   console.log("logged out  employee ids data: "+data);
						   loggedOutEmployeeIdsArray=data;
						   $("#loggedOutEmpArray").text("logged-out employees: "+JSON.stringify(loggedOutEmployeeIdsArray));
						},"json");
				}//END -- getAllEmpployeeIds()
				
				/* This funcion will make ajax call to get 
				 * logged-in employee Ids
				 */
				function getLoggedInEmpployeeIds(){
					
					$.post("/"+applicationName+"/"+loggedInEmpIdsRequest, function( data ) {
						   console.log("logged in  employee ids data: "+data);
						   loggedInEmployeeIdsArray=data;
						   $("#loggedInEmpArray").text("logged-in employees: "+JSON.stringify(loggedInEmployeeIdsArray));
						},"json");
				}//END -- getAllEmpployeeIds()
				
				
				
                /*  function for employee id text box
                 *  This function calls when keyup - employee id text box
                 */
				$(employeeId_id).keyup(function() {

					var employeeIdLength = $(employeeId_id).val().length;
					$(employeeLoginSuccessMsg_id).text("");
					/* function call to change css class function */
					changeCssClassOfEmpIdTextBox(employeeIdLength);

				});// END -- $(employeeId_id).keyup()
				
				
				/*  function for employee password text box
                 *  This function calls when keyup - employee password text box
                 */
				$(employeePassword_id).keyup(function() {
					
					/*$(employeeLoginSuccessMsg_id).text("");*/
					var errorMsg=$(employeeLoginSuccessMsg_id).text();
					if(errorMsg != invalidIdMsg && errorMsg !=attendancePostedMsg){
						$(employeeLoginSuccessMsg_id).text("");
					}
					/* employeePasswordMinLength */
					var empPasswordLength = $(employeePassword_id).val().length;					
					/* function call to change css class function */
					changeCssClassOfEmpPasswordTextBox(empPasswordLength);

				});// END -- $(employeePassword_id).keyup()
				
				/*  function for login/logout button
	             *  This function calls when button clicks
	             */			
				$(employeeAttendanceButton_id).click(function(){
					
					console.log("button clicked??");
					console.log("logged out status: "+loggedOutstatus);
					console.log("logged in status: "+loggedInstatus);
					employeePassword=$(employeePassword_id).val();
					employeeId=$(employeeId_id).val();
					 if(loggedOutstatus == false && loggedInstatus == false){
						console.log("logged in - intime");
					    attendanceObj={id:employeeId,type:attendanceLoginType,password:employeePassword};
				    	/* function call to postAttendance() */
					    postAttendance(attendanceObj);
						
					}
					else if(loggedOutstatus == false && loggedInstatus == true){
						console.log("logged out - out ime");
						 attendanceObj={id:employeeId,type:attendanceLogoutType,password:employeePassword};
						 /* function call to post attendance method */
						 postAttendance(attendanceObj);
						
					}
					else{
						console.log("invalid - completed");
					
						setDefaultVales();
					} 
					
				});//END -- $(employeeAttendanceButton_id).click()

				/*
				 * This function to stop reloading page
				 * on form submit
				 */
				$(attendanceForm_id).submit(function(){
					
					return false;
					
				}); // END --$(attendanceForm_id).submit()
				
				
				/* Function for changing csss class
				 * This function changes css class of employee id text box 
				 */
				function changeCssClassOfEmpIdTextBox(empIdLength) {

					if (empIdLength == employeeIdMinLength) {
						 employeeId=$(employeeId_id).val();
						console.log(" ok");
						if(serachInJsonObjectArray(employeeId, allEmployeeIdsArray)){
							console.log("loggedInEmployeeIdsArray "+loggedInEmployeeIdsArray);
							console.log("loggedOutEmployeeIdsArray "+loggedOutEmployeeIdsArray);
							loggedOutstatus=serachInArray(employeeId, loggedOutEmployeeIdsArray);
							loggedInstatus=serachInArray(employeeId, loggedInEmployeeIdsArray);
							employeeIdFlag=true;
							buttonText=(loggedOutstatus == false && loggedInstatus == false)?login:
								 (loggedOutstatus == false && loggedInstatus == true)?logout:invalid;
							
							console.log("logged out status:- "+loggedOutstatus);
							console.log("logged in status:- "+loggedInstatus); 
	
							/*function call to set text box class to ok*/
							setTextBoxClassOk(employeeId_div_id,employeeId_span_id);
							/*$(employeeId_div_id).removeClass(errorCalss).addClass(successClass);
							$(employeeId_span_id).removeClass(glyphiconError).addClass(glyphiconOk);*/
							
							$(employeeLoginSuccessMsg_id).text((buttonText == invalid)? attendancePostedMsg: "");
							$( employeeAttendanceButton_id ).text(buttonText);
							/* function call to deisable or enable button */
							disableOrEnableAttendanceButton();
						}
						else{
							/*function call to set text box class to error*/
							setTextBoxClassError(employeeId_div_id,employeeId_span_id);
							/*$(employeeId_div_id).removeClass(successClass).addClass(errorCalss);
							$(employeeId_span_id).removeClass(glyphiconOk).addClass(glyphiconError); */
							
							employeeIdFlag=false;
							/* function call to disable or enable button */
							disableOrEnableAttendanceButton();
							console.log("employee not --	 found");
							$(employeeLoginSuccessMsg_id).text(invalidIdMsg);
						}
						
						
					}
					else {
						console.log(" error ");
						/*function call to set text box class to error*/
						setTextBoxClassError(employeeId_div_id,employeeId_span_id);
						/*$(employeeId_div_id).removeClass(successClass).addClass(errorCalss);
						$(employeeId_span_id).removeClass(glyphiconOk).addClass(glyphiconError); */
						employeeIdFlag=false;
					    $(employeeLoginSuccessMsg_id).text(""); 
						/* function call to disable or enable button */
						disableOrEnableAttendanceButton();
					}
					
				 };// END --changeCssClassOfEmpIdTextBox(empIdLength)
				 
				 /* Function for disable / enable button
			      * This function disables/enables the login button 
				  */
				 function disableOrEnableAttendanceButton(){
					 /* $( employeeAttendanceButton_id ).prop( "disabled",(buttonText == invalid && employeePasswordFlag== false && employeeIdFlag == false)? true: false ); */
					 
					  if(buttonText == invalid || employeePasswordFlag == false || employeeIdFlag == false ){
						  $( employeeAttendanceButton_id ).prop( "disabled",true );
					  }
					  else{
						  $( employeeAttendanceButton_id ).prop( "disabled",false );
					  }
				 };// END --disableOrEnableAttendanceButton()
				 
				 /* Function for changing csss class
			      * This function changes css class of employee password text box 
				  */
				 function changeCssClassOfEmpPasswordTextBox(empPasswordLength){
					 
					  if(empPasswordLength < employeePasswordMinLength ){
						  
						  /*function call to set text box class to error*/
						  //setTextBoxClassError(employeePassword_div_id,employeePassword_span_id);
					  
						  /*$(employeePassword_div_id).removeClass(successClass).addClass(errorCalss);
						  $(employeePassword_span_id).removeClass(glyphiconOk).addClass(glyphiconError);*/  
					      employeePasswordFlag=false;
					      disableOrEnableAttendanceButton();
					    
					  }
					  else{
						  /*function call to set text box class to ok*/
						 // setTextBoxClassOk(employeePassword_div_id,employeePassword_span_id);
						  /*$(employeePassword_div_id).removeClass(errorCalss).addClass(successClass);
						  $(employeePassword_span_id).removeClass(glyphiconError).addClass(glyphiconOk);*/
						  employeePasswordFlag=true;
						  /* function call to deisable or enable button */
						  disableOrEnableAttendanceButton();
					  }
				 };// END --changeCssClassOfEmpPasswordTextBox(empPasswordLength)
				
				 /*
				  * function for searching element in plain JsonArray
				  */
				  function postAttendance(attendanceObject) {
					  var result=0;
			
					   $.ajax ({
						    url: "/"+applicationName+"/"+sendAttendanceRequest,
						    type: "POST",
						    data: JSON.stringify(attendanceObject),
						    dataType: "json",
						    contentType: "application/json; charset=utf-8",
						    success: function(data){
						    	console.log("data: "+data);
						    	result=data;
						        if(result == 1 || result == 2){
						        	$(employeeLoginSuccessMsg_id).text((attendanceObject.type == attendanceLoginType)? inTimeSuccessMsg : outTimeSuccessMsg );
						        	(attendanceObject.type == attendanceLoginType)?loggedInEmployeeIdsArray.push(employeeId):loggedOutEmployeeIdsArray.push(employeeId);
						        	/* function call to set default values */
						        	setDefaultVales();
						        }
						        else if(result == 0){
						        	$(employeeLoginSuccessMsg_id).text(passwordIncorrectMsg );
						        	/* function call to attendancepasswordWrong() */
						        	attendancepasswordWrong();
						        	
						        }
						        else{
						        	$(employeeLoginSuccessMsg_id).text((attendanceObject.type == attendanceLoginType)? inTimeErrorMsg : outTimeErrorMsg );
						        }
						     },
					      error: function(data){
					    	  setDefaultVales();
					    	  $(employeeLoginSuccessMsg_id).text(internalServerProblem);
					      }
						}); 
					   console.log("retult: "+result);
				  };// END -- postAttendance(attendance)
				  
			   /*
				* function to set some default values when password is wrong
				*/
				function attendancepasswordWrong() {
					
					$(employeePassword_id).val("");
					employeePasswordFlag=false;
					$(employeePassword_div_id).removeClass(successClass);
					$(employeePassword_span_id).removeClass(glyphiconOk);
					$(employeeAttendanceButton_id).prop( "disabled", true );

				};// END -- attendancepasswordWrong()
				 
				
					
			    /*
				 * function for searching element in plain JsonArray
				 */
				function serachInArray(key, arr) {
						var length = arr.length;
						for (var i = 0; i < length; i++) {
							if (key == arr[i]){
								return true;
							}
						}
						return false;

				};// END -- serachInArray(key, arr)
				
				$("#allEmployeeArray").text(allEmployeeIdsArray);
				$("#loggedInEmpArray").text(loggedOutEmployeeIdsArray);
				$("#loggedOutEmpArray").text(loggedInEmployeeIdsArray);
				
				
/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/
				
				/*
				 * This function is to set text box is ok (correct input)
				 */
				function setTextBoxClassOk(divId,spanId){
					
					$(divId).removeClass(errorCalss).addClass(successClass);
					$(spanId).removeClass(glyphiconError).addClass(glyphiconOk);
					
				}// END -- setTextBoxClassOk(divId,spanId)
				
				/*
				 * This function is to set text box is wrong (incorrect input)
				 */
                function setTextBoxClassError(divId,spanId){
                	
                	$(divId).removeClass(successClass).addClass(errorCalss);
					$(spanId).removeClass(glyphiconOk).addClass(glyphiconError); 
					
				}// END -- setTextBoxClassError(divId,spanId
                
                /*
				 * function for searching element in JsonObjectArray 
				 */
				function serachInJsonObjectArray(key, arr) {
					 //console.log("key in search "+key);
					 //console.log("array for search :"+arr);
						var length = arr.length;
						console.log(" array length: "+length);
						for (var i = 0; i < length; i++) {
							if (key == arr[i].empId){					
								employeeName=arr[i].empName;
								console.log("emp name: "+employeeName);
								return true;
							}
							//console.log("i: "+i);
						}
						return false;

				};// END -- serachInJsonObjectArray(key, arr)
				 
				/* ---------------------- employee change password functionality -------------------------------*/	
			
				  
				
/*--------------------------------------------------------------------------------------------------------------------------------------------------------*/				
	           
			   /*variables to store ids of employee change password functionality*/
			  
	           var changePasswordEmployeeCurrentPassDiv_id="#change-password-employee-current-password-div";  	           
	           var changePasswordEmployeeCurrentPassSpan_id="#change-password-employee-current-password-span";
	           
	           var changePasswordEmployeeNewPassDiv_id="#change-password-employee-new-password-div";	         
	           var changePasswordEmployeeNewPassSpan_id="#change-password-employee-new-password-span";
	           
	           var changePasswordEmployeeConfirmPassDiv_id="#change-password-employee-confirm-password-div";	        
	           var changePasswordEmployeeConfirmPassSpan_id="#change-password-employee-confirm-password-span";
	           
	           var changeEmployeePasswordButton_id="#change-employee-password-button";	           
	           
	           var employeeChangePasswordForm_id="#emp-change-pass-form";
	           
	           var employeePasswordStrength_id="#employee-new-password-strength-span";
	                
	            /* declaring variables */
	            
	            /* variable for storing  change password employee id (String) */
	            var changePasswordEmployeeId;
	            /* variable for storing  current employee password (String) */
	            var employeeCurrentPassword;
	            /* variable for storing  employee new password (String) */
	            var employeeNewPassword;
	            /* variable for storing  employee confirm password (String) */
	            var employeeConfirmPassword;
	            /* variable for storing  change password employee if flag  (boolean) */
	            var changePasswordEmployeeIdFlag;
	            
	            
	            /* creating variables for error or success messages to display on browser */
	            
	            /* variable to display short employee id error message  (string) */
	            var shortEmployeeIdMsg="Employee ID should contain 6 digits";
	            /* variable to display employee id is wrong error message  (string) */
	            var invalidChangePassEmployeeIdMsg="Invalid employee ID";
	            /* variable to display current password is short error message  (string) */
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
	            
	            
	            /* creating variables for sending ajax requset calls */
	            
	            /* variable store employee change password request url  (string) */
	            var changePasswordRequest="changeEmployeePassword.do";
	            
	          
	           
	            
	            /* function call to set default values */
	            setEmployeeChangePasswordDefaultValues();
	
	            /* function call to set default values for forgot password */
	            setForgotPasswordDefaulValues();
	            
	            /*  function calls when change password employee id key up
                 *  This function validates input details and displays
                 *  success/error message
                 */
	            $(changePasswordEmployeeId_id).keyup(function(){
	            	console.log("change password employee id : keyup");
	            	$(employeeChangePasswordSuccessMsg_id).text("");
	            	var length=$(changePasswordEmployeeId_id).val().length;
	            	if(length == employeeIdMinLength){
	            		changePasswordEmployeeId=$(changePasswordEmployeeId_id).val();
	            		changePasswordEmployeeIdFlag=serachInJsonObjectArray(changePasswordEmployeeId, allEmployeeIdsArray);
	            		if(changePasswordEmployeeIdFlag)
	            		  setTextBoxClassOk(changePasswordEmployeeIdDiv_id,changePasswordEmployeeIdSpan_id);
	            		else
	            		  setTextBoxClassError(changePasswordEmployeeIdDiv_id,changePasswordEmployeeIdSpan_id);
	            			
	            	}
	            	else{
	            		
	            		setTextBoxClassError(changePasswordEmployeeIdDiv_id,changePasswordEmployeeIdSpan_id);
	            	}
	            	
	            });// END -- $(changePasswordEmployeeId_id).keyup()
	            
	            /*  function calls when change password employee current password key up
                 *  This function validates input details and displays
                 *  success/error message
                 */
	            $(changePasswordEmployeeCurrentPass_id).keyup(function(){
	            	$(employeeChangePasswordSuccessMsg_id).text("");
	            	var length=$(changePasswordEmployeeCurrentPass_id).val().length;
	            	/*if(length < employeePasswordMinLength){
	            		setTextBoxClassError(changePasswordEmployeeCurrentPassDiv_id,changePasswordEmployeeCurrentPassSpan_id);
	            	}
	            	else{
	            		setTextBoxClassOk(changePasswordEmployeeCurrentPassDiv_id,changePasswordEmployeeCurrentPassSpan_id);
	            	}*/
	            	
	            });// END -- $(changePasswordEmployeeId_id).keyup()
	            
	            /*  function calls when change password employee new password key up
                 *  This function validates input details and displays
                 *  success/error message
                 */
	            $(changePasswordEmployeeNewPass_id).keyup(function(){
	            	$(employeeChangePasswordSuccessMsg_id).text("");
	            	/*function call to measure passsword strength*/
	            	measurePasswordStrength($(this).val(),employeePasswordStrength_id); // This fiunction is in PasswordStrength.js file
	            	
	            	var length=$(changePasswordEmployeeNewPass_id).val().length;
	            	/*if(length < employeePasswordMinLength){
	            		setTextBoxClassError(changePasswordEmployeeNewPassDiv_id,changePasswordEmployeeNewPassSpan_id);
	            	}
	            	else{
	            		setTextBoxClassOk(changePasswordEmployeeNewPassDiv_id,changePasswordEmployeeNewPassSpan_id);
	            	}*/
	            	
	            });// END -- $(changePasswordEmployeeId_id).keyup()
	            
	            /*  function calls when change password employee confirm password key up
                 *  This function validates input details and displays
                 *  success/error message
                 */
	            $(changePasswordEmployeeConfirmPass_id).keyup(function(){
	            	$(employeeChangePasswordSuccessMsg_id).text("");
	            	var confirmPassword=$(changePasswordEmployeeConfirmPass_id).val();
	            	var newPassword=$(changePasswordEmployeeNewPass_id).val();
	            	/*if(newPassword.length >= employeePasswordMinLength && confirmPassword == newPassword){
	            		setTextBoxClassOk(changePasswordEmployeeConfirmPassDiv_id,changePasswordEmployeeConfirmPassSpan_id);
	            		
	            	}
	            	else{
	            		setTextBoxClassError(changePasswordEmployeeConfirmPassDiv_id,changePasswordEmployeeConfirmPassSpan_id);
	            	}*/
	            	
	            });// END -- $(changePasswordEmployeeId_id).keyup()
	            
	            
	            //start code of forgot password page ...
		
   $("#forgotpassword_button").prop('disabled', true);
	            
	            $(forgotpassword_id).keyup(function(){
	            	
	            	var length=$(forgotpassword_id).val().length;
	            	
	            	if($(forgotpassword_id).val().length==6 ) {
	            		setTextBoxClassOk(forgotpassword_div,forgotpassword_span_id);
	            		$("#forgotpassword_button").prop('disabled', false);
	                 }
	                 else{
	                	 
	                	 setTextBoxClassError(forgotpassword_div,forgotpassword_span_id);
	              	   $("#forgotpassword_button").prop('disabled', true);
	                 }
	            });
	            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
	            
	            $(forgotpassword_email).keyup(function(){
	            	
	            	if(testEmail.test($(forgotpassword_email).val()) ) {
	                	
	            		setTextBoxClassOk(forgotpassword_email_div,forgotpassword_email_span_id);
	            		$("#forgotpassword_button").prop('disabled', false);
	                }
	                else{
	                	setTextBoxClassError(forgotpassword_email_div,forgotpassword_email_span_id);
	                	$("#forgotpassword_button").prop('disabled', true);
	                }
	            });
	            
	            //end of forgot password page code
	            
	            
	            /*  function for change password employee button
                 *  This function validates input details and displays
                 *  success/error message
                 */
				$(changeEmployeePasswordButton_id).click(function() {
                     console.log("button clicked");
					var changePasswordemployeeIdLength = $(changePasswordEmployeeId_id).val().length;
					if(changePasswordemployeeIdLength == employeeIdMinLength){
						changePasswordEmployeeId= $(changePasswordEmployeeId_id).val();
						employeeCurrentPassword=$(changePasswordEmployeeCurrentPass_id).val();
						employeeNewPassword=$(changePasswordEmployeeNewPass_id).val();
						employeeConfirmPassword=$(changePasswordEmployeeConfirmPass_id).val();
						
						/* function call to validate details entered by employee */
						var correctDetailsFlag=validateChangePasswordDetails();
					    console.log("correct details flag: "+correctDetailsFlag);
					    if(correctDetailsFlag){
					        var changePasswordObject={userName:changePasswordEmployeeId,currentPassword:employeeCurrentPassword,newPassword:employeeNewPassword};
					    	/* function call to make ajax call for changing password */
					    	makeAjaxCallToChangePassword(changePasswordObject);
					    }
					    else{
					    	
					    }
				     }
					else{
						$(employeeChangePasswordSuccessMsg_id).text(shortEmployeeIdMsg);
					}
					/* function call to search employee id in all employee details array */
					

				});// END -- $(changeEmployeePasswordButton_id).click()
				
				/*
				 * This function to stop reloading page
				 * on form submit
				 */
                $(employeeChangePasswordForm_id).submit(function(){
					
					return false;
					
				});// END -- $(employeeChangePasswordForm_id).submit()
				
				/*  function for validating change password details
                 *  This function validates all details and displays
                 *  success/error message
                 */
				function validateChangePasswordDetails(){
					var errorMessage="";
					
					errorMessage=(employeeNewPassword != employeeConfirmPassword)?newPasswordConfimPassNotMatchedMsg : errorMessage;
					errorMessage=(employeeNewPassword.length < employeePasswordMinLength)?shortNewPasswordMsg : errorMessage;
					errorMessage=(employeeCurrentPassword.length < employeePasswordMinLength)? shortCurrentPasswordMsg : errorMessage;
					errorMessage=(changePasswordEmployeeIdFlag)? errorMessage : invalidChangePassEmployeeIdMsg;					
					$(employeeChangePasswordSuccessMsg_id).text(errorMessage);
					return (errorMessage == "")? true : false;
					
				};// END -- validateChangePasswordDetails()
				
				
				/*  function for make ajax call to change password
                 *  
                 */
				function makeAjaxCallToChangePassword(changePasswordObject){
					$.ajax ({
					    url: "/"+applicationName+"/"+changePasswordRequest,
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
					            setEmployeeChangePasswordDefaultValues();
					        	displayResult=changePasswordSuccessMsg;  
					        }
					        else if(result == 0){
					        	
					        	displayResult=changePasswordCurrentPassNotMatchedMsg; 
					        	/* function call to employeeEnteredWrongPassword() */
					        	employeeEnteredWrongPassword(); 
					        }
					        else{
					        	displayResult=changePasswordInternalErrorMsg;
					        	/* function call to set default values */
					            setEmployeeChangePasswordDefaultValues(); 
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
		                 
		        
					
				};// END -- employeeEnteredWrongPassword()
	            
	
	/* END---------------------- employee change password functionality ------------------------------- END */	
			   
				
                
				
				
				
});/*  END -- ready() */