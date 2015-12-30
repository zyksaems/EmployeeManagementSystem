
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta charset="utf-8">
<title>EMS AttendancePage</title>
<script src="jquery/jquery-2.1.4.js"></script>
<link href="./bootstrap/bootstrap.min.css" rel="stylesheet">
<script src="./bootstrap/bootstrap.min.js"></script>
 <!-- setting icon to page -->
  <link rel="shortcut icon" type="image/x-icon" href="images/caprus logo.png"/>
<!-- style sheet -->
<style>

.mainContainer{

    font-family: verdana;
}
/* .attendanceForm {
	margin-left: 45%;
} */

.employeeIdTextBOx_default {

	box-shadow: 0px 1px 20px lightblue;
	text-align: center;
}

.employeeIdTextBOx_ok {
	/*     border-color: green;
       width: 150px;
       height:150px;
       color: green;	
       text-align: center; */
	box-shadow: 0px 1px 20px lightgreen;
	text-align: center;
}

.employeeIdTextBOx_error {
	/*  border-color: orange;
       height: 50px;
       width:200px;
       color:red;
       text-align: right; */
	box-shadow: 0px 1px 20px red;
	text-align: center;
}

.employeePassword{

   text-align: center;
}
.AttendanceDiv{

  background-color: lightblue;
  border-radius: 15px;
  margin-top: 5%;
  
}

.employeeLoginSuccessMsg{

     text-align: center;
}
.attendanceForm{
     margin-top: 3%;
}
.attendanceHeading{

     margin-top: 3%;
     font-size: 20px;
     text-align: center;
}


/*  --------------  css for employeee change password------------- */

.changePasswordHeading{
  text-align: center;
}

.changePasswordSuccessMsg{

     text-align: center;
     font-size: 20px;
}

</style>
<!-- java  script -->
<script type="text/javascript">
	$("document").ready(
			function() {
				
				/*  variables  declaring  */
				
				/* variable for storing all employee ids along with name (json object array) */
				var allEmployeeIdsArray=[];
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

			   /* 
				* function for setting default values to attendance form 
				*/
				function setDefaultVales(){
					
					$("#employeeID").val("");
					$("#employeePassword").val("");
					$("#employeeAttendanceButton").text(login);
					$( "#employeeAttendanceButton" ).prop( "disabled", true );
					$("#employeeID").removeClass(employeeIdCssOkClass).addClass(employeeIdCssDefaultClass);
					$("#employeePassword").removeClass(employeeIdCssOkClass).addClass(employeeIdCssDefaultClass);
					loggedInstatus=false;
					loggedOutstatus=false;
					employeeIdFlag=false;
					employeePasswordFlag=false;
					
				}// END--setDefaultVales()
				
				
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
				$("#employeeID").keyup(function() {

					var employeeIdLength = $("#employeeID").val().length;
					$("#employeeID").removeClass(employeeIdCssDefaultClass);
					/* function call to change css class function */
					changeCssClassOfEmpIdTextBox(employeeIdLength);

				});// END -- $("#employeeID").keyup()
				
				
				/*  function for employee password text box
                 *  This function calls when keyup - employee password text box
                 */
				$("#employeePassword").keyup(function() {
					/* employeePasswordMinLength */
					var empPasswordLength = $("#employeePassword").val().length;
					$("#employeePassword").removeClass(employeeIdCssDefaultClass);
					/* function call to change css class function */
					changeCssClassOfEmpPasswordTextBox(empPasswordLength);

				});// END -- $("#employeePassword").keyup()
				
				/*  function for login/logout button
	             *  This function calls when button clicks
	             */			
				$("#employeeAttendanceButton").click(function(){
					
					console.log("button clicked??");
					console.log("logged out status: "+loggedOutstatus);
					console.log("logged in status: "+loggedInstatus);
					employeePassword=$("#employeePassword").val();
					employeeId=$("#employeeID").val();
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
					
				});//END -- $("#employeeAttendanceButton").click()

				
				
				
				/* Function for changing csss class
				 * This function changes css class of employee id text box 
				 */
				function changeCssClassOfEmpIdTextBox(empIdLength) {

					if (empIdLength == employeeIdMinLength) {
						 employeeId=$("#employeeID").val();
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
							$("#employeeID").removeClass(employeeIdCssErrorClass).addClass(employeeIdCssOkClass);
							$("#employeeLoginSuccessMsg").text((buttonText == invalid)? attendancePostedMsg: "");
							$( "#employeeAttendanceButton" ).text(buttonText);
							/* function call to deisable or enable button */
							disableOrEnableAttendanceButton();
						}
						else{
							employeeIdFlag=false;
							/* function call to disable or enable button */
							disableOrEnableAttendanceButton();
							console.log("employee not --	 found");
							$("#employeeLoginSuccessMsg").text(invalidIdMsg);
						}
						
						/* $("#employeeLoginSuccessMsg").text("okk"); */
					}
					else {
						console.log(" error ");
						employeeIdFlag=false;
					    $("#employeeLoginSuccessMsg").text(""); 
						$("#employeeID").removeClass(employeeIdCssOkClass).addClass(employeeIdCssErrorClass);
						/* function call to disable or enable button */
						disableOrEnableAttendanceButton();
					}
					
				 };// END --changeCssClassOfEmpIdTextBox(empIdLength)
				 
				 /* Function for disable / enable button
			      * This function disables/enables the login button 
				  */
				 function disableOrEnableAttendanceButton(){
					 /* $( "#employeeAttendanceButton" ).prop( "disabled",(buttonText == invalid && employeePasswordFlag== false && employeeIdFlag == false)? true: false ); */
					 
					  if(buttonText == invalid || employeePasswordFlag == false || employeeIdFlag == false ){
						  $( "#employeeAttendanceButton" ).prop( "disabled",true );
					  }
					  else{
						  $( "#employeeAttendanceButton" ).prop( "disabled",false );
					  }
				 };// END --disableOrEnableAttendanceButton()
				 
				 /* Function for changing csss class
			      * This function changes css class of employee password text box 
				  */
				 function changeCssClassOfEmpPasswordTextBox(empPasswordLength){
					 
					  if(empPasswordLength < employeePasswordMinLength ){
					    $("#employeePassword").removeClass(employeeIdCssOkClass).addClass(employeeIdCssErrorClass);
					    employeePasswordFlag=false;
					    disableOrEnableAttendanceButton();
					  }
					  else{
						  $("#employeePassword").removeClass(employeeIdCssErrorClass).addClass(employeeIdCssOkClass);
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
					  console.log("attendance url: "+"/"+applicationName+"/"+sendAttendanceRequest);
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
						        	$("#employeeLoginSuccessMsg").text((attendanceObject.type == attendanceLoginType)? inTimeSuccessMsg : outTimeSuccessMsg );
						        	(attendanceObject.type == attendanceLoginType)?loggedInEmployeeIdsArray.push(employeeId):loggedOutEmployeeIdsArray.push(employeeId);
						        	/* function call to set default values */
						        	setDefaultVales();
						        }
						        else if(result == 0){
						        	$("#employeeLoginSuccessMsg").text(passwordIncorrectMsg );
						        	/* function call to passwordWrong() */
						        	passwordWrong();
						        	
						        }
						        else{
						        	$("#employeeLoginSuccessMsg").text((attendanceObject.type == attendanceLoginType)? inTimeErrorMsg : outTimeErrorMsg );
						        }
						     },
					      error: function(data){
					    	  setDefaultVales();
					    	  $("#employeeLoginSuccessMsg").text(internalServerProblem);
					      }
						}); 
					   console.log("retult: "+result);
				  };// END -- postAttendance(attendance)
				  
			   /*
				* function to set some default values when password is wrong
				*/
				function passwordWrong() {
					
					$("#employeePassword").val("");
					employeePasswordFlag=false;
					$("#employeePassword").removeClass(employeeIdCssOkClass).addClass(employeeIdCssDefaultClass);
					$( "#employeeAttendanceButton" ).prop( "disabled", true );

				};// END -- passwordWrong()
				 
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
				
				
	/* ---------------------- employee change password functionality -------------------------------*/	
	
	            $("#changePasswordemployeeID").val("");
	            $("#employeeCurrentPassword").val("");
	            $("#employeeNewPassword").val("");
	            $("#employeeConfirmPassword").val("");
	            
	            
	            /* declaring variables */
	            
	            /* variable for storing  change password employee id (String) */
	            var changePasswordEmpoyeeId;
	            /* variable for storing  current employee password (String) */
	            var employeeCurrentPassword;
	            /* variable for storing  empoyee new password (String) */
	            var employeeNewPassword;
	            /* variable for storing  employee confirm password (String) */
	            var employeeConfirmPassword;
	            /* variable for storing  change password employee if flag  (boolean) */
	            var changePasswordEmpoyeeIdFlag;
	            
	            
	            /* creating variables for error or success messages to display on browser */
	            
	            /* variable to display short employee id error message  (string) */
	            var shortEmployeeIdMsg="Empoyee ID is short";
	            /* variable to display employee id is wrong error message  (string) */
	            var invalidChangePassEmployeeIdMsg="Invalid employee ID";
	            /* variable to display current password is short error message  (string) */
	            var shortCurrentPasswordMsg="Current password is short";
	            /* variable to display new password is short error message  (string) */
	            var shortNewPasswordMsg="New password is short";
	            /* variable to display new password and confirm password not mateched error message  (string) */
	            var newPasswordConfimPassNotMatchedMsg="New password and confirm password not matched";
	            
	            
	            
	
	            /*
	             * This function is called when employee clicks change 
	             * employee password button.
	             * This function hides attendance division and shows
	             * change password division
	             */
	            $("#showChangePasswordDivButton").click(function (){
	            	
	            	/* $("#changePasswordDivision").hide(); */
	            	/* $("#attendanceDivision").show(); */
	            	$("#changePasswordDivision").toggle();
	            	
	            });// END -- $("#employeeChangePasswordButton").click()
		
	            /*  function for change password employee button
                 *  This function validates input details and displays
                 *  success/error message
                 */
				$("#changeEmployeePasswordButton").click(function() {

					var changePasswordemployeeIdLength = $("#changePasswordemployeeID").val().length;
					if(changePasswordemployeeIdLength == employeeIdMinLength){
						changePasswordEmpoyeeId= $("#changePasswordemployeeID").val();
						employeeCurrentPassword=$("#employeeCurrentPassword").val();
						employeeNewPassword=$("#employeeNewPassword").val();
						employeeConfirmPassword=$("#employeeConfirmPassword").val();
						changePasswordEmpoyeeIdFlag=serachInJsonObjectArray(changePasswordEmpoyeeId, allEmployeeIdsArray);
						/* function call to validate details entered by employee */
						var correctDetailsFlag=validateChangePasswordDetails();
					    console.log("correct details flag: "+correctDetailsFlag);
					    if(correctDetailsFlag){
					    	/* function call to make ajax call for changing password */
					    	makeAjaxCallToChangePassword();
					    }
					    else{
					    	
					    }
				     }
					else{
						$("#changeEmployeePasswordSuccessMsg").text(shortEmployeeIdMsg);
					}
					/* function call to search employee id in all employee details array */
					

				});// END -- $("#employeeID").keyup()
				
				/*  function for validating change password details
                 *  This function validates all details and displays
                 *  success/error message
                 */
				function validateChangePasswordDetails(){
					var errorMessage="";
					errorMessage=(employeeNewPassword.length < employeePasswordMinLength)?shortNewPasswordMsg : errorMessage;
					errorMessage=(employeeNewPassword != employeeConfirmPassword)?newPasswordConfimPassNotMatchedMsg : errorMessage;
					errorMessage=(employeeCurrentPassword.length < employeePasswordMinLength)? shortCurrentPasswordMsg : errorMessage;
					errorMessage=(changePasswordEmpoyeeIdFlag)? errorMessage : invalidChangePassEmployeeIdMsg;					
					$("#changeEmployeePasswordSuccessMsg").text(errorMessage);
					return (errorMessage == "")? true : false;
				};
				
				
				/*  function for make ajax call to change password
                 *  
                 */
				function makeAjaxCallToChangePassword(){
					$.ajax ({
					    url: "/EmployeeManagementSystem/changeEmployeePassword.do",
					    type: "POST",
					    data: JSON.stringify(attendanceObject),
					    dataType: "json",
					    contentType: "application/json; charset=utf-8",
					    success: function(data){
					    	console.log("data: "+data);
					    	result=data;
					        if(result == 1 || result == 2){
					        	$("#employeeLoginSuccessMsg").text((attendanceObject.type == attendanceLoginType)? inTimeSuccessMsg : outTimeSuccessMsg );
					        	(attendanceObject.type == attendanceLoginType)?loggedInEmployeeIdsArray.push(employeeId):loggedOutEmployeeIdsArray.push(employeeId);
					        	/* function call to set default values */
					        	setDefaultVales();
					        }
					        else if(result == 0){
					        	$("#employeeLoginSuccessMsg").text(passwordIncorrectMsg );
					        	/* function call to passwordWrong() */
					        	passwordWrong();
					        	
					        }
					        else{
					        	$("#employeeLoginSuccessMsg").text((attendanceObject.type == attendanceLoginType)? inTimeErrorMsg : outTimeErrorMsg );
					        }
					     },
				      error: function(data){
				    	  setDefaultVales();
				    	  $("#employeeLoginSuccessMsg").text(internalServerProblem);
				      }
					}); 
				};
				
				
	            
	
	/* END---------------------- employee change password functionality ------------------------------- END */	
			   
				
				
			});/*  END -- ready() */
</script>
</head>
<body>

	<div class="container-fluid mainContainer">
		<div class="row">
			<div class="logo">
				<img src="" alt="logoImage" height="150px" width="100%" />
			</div>
		</div>
		<!-- <div class="row">Attendace</div> -->
		<div class="row" id="attendanceDivision">  
			<div class="col-sm-4"></div>
			<div class="col-sm-4">
				<div class="row AttendanceDiv">
				    <div class="col-sm-2"></div>
					<div class="col-sm-8">
					    <div class="row attendanceHeading">Post Attendance</div>
						<form action="#" class="form-horizontal attendanceForm">
							<input type="text" placeholder="Enter employee ID" class="form-control" maxlength="6" id="employeeID" autocomplete="off"><br> 
							<input type="password" placeholder="Enter employee Password" class="form-control employeePassword" maxlength="30" id="employeePassword" /> <br>
						    <button class="btn btn-group-justified btn-primary" id="employeeAttendanceButton"></button>
						</form>
						<div class="row employeeLoginSuccessMsg"><p id="employeeLoginSuccessMsg"></p></div>
					</div>
					<div class="col-sm-2">
					     
					</div>
				</div>
			</div>
		    <div class="col-sm-1">
		        <button class="btn btn-block btn-warning" id="showChangePasswordDivButton">change</button>
		    </div>

		</div>
		
		<!-- This Division for employee hange password -->
		<div class="row" id="changePasswordDivision">
			<div class="col-sm-4"></div>
			<div class="col-sm-4">
				<div class="row ">
				    <div class="col-sm-2"></div>
					<div class="col-sm-8">
					    <div class="row changePasswordHeading">Change password</div>
						<form action="#" class="form-horizontal">
						    <label >Employee ID:</label>
							<input type="text" placeholder="Enter employee ID" class="form-control" maxlength="6" id="changePasswordemployeeID" autocomplete="off"><br> 
							<label >Current password:</label>
							<input type="password" placeholder="Enter Current password" class="form-control" maxlength="30" id="employeeCurrentPassword"><br> 
							<label >New passwod:</label>
							<input type="password" placeholder="Enter New Password" class="form-control" maxlength="30" id="employeeNewPassword" /> <br>
							<label >Confirm new password:</label>
							<input type="password" placeholder="Confirm New Password" class="form-control" maxlength="30" id="employeeConfirmPassword" /> <br> 
						    <button class="btn  btn-primary" id="changeEmployeePasswordButton">change Password</button>
						    <button class="btn  btn-primary" id="cancelButton">cancel</button>
						</form>
						<div class="row"><p class="changePasswordSuccessMsg" id="changeEmployeePasswordSuccessMsg"></p></div>
					</div>
					<div class="col-sm-2">
					     
					</div>
				</div>
			</div>
		    <div class="col-sm-4"></div>

		</div>
		
		<!--  This division just for know employee login/logout details -->
   <div class="row">
      <!-- <div class="right" id="allEmployeeArray">All employee array</div>
      <div class="right" id="loggedInEmpArray">All logged in employee array</div>
      <div class="right" id="loggedOutEmpArray">All logged out employee array</div> -->
   </div>

	</div>
	<!--END -- main division -->

   
</body>
</html>