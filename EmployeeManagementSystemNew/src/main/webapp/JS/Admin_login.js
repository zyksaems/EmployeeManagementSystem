
$("document").ready(function(){
	
	/*variables for storing ids*/
	
	var adminLogin_link_id="#admin-sign-in-link";
	var attendance_form_id="#attendance-form";
	var adminId_div_id="#admin-login-adminid-div";
	var adminId_val_id="#admin-login-adminid-val";
	var adminId_span_id="#admin-login-adminid-span";
	
	var adminPass_div_id="#admin-login-adminpass-div";
	var adminPass_val_id="#admin-login-adminpass-val";
	var adminPass_span_id="#admin-login-adminpass-span";
	
	var admin_show_pass_id="#admin-login-show-adminpass";
	var admin_login_button_id="#admin-login-submit-button";
	var admin_login_errorMsg_id="#admin-login-success-msg";	
	
	var adminLoginModal_id="#myModal";
	var adminLoginForm_id="#admin-login-form";
	var adminForgotPasswordLink_id="#admin-login-forgot-password";
	var employeeForgotPasswordLink_Id="#employee-login-forgot-password";
	var forgotPasswordForm_id="#forgot-password-form";
	var backToLogin_id="#back-to-login";
	var forgotPassword_button_id="#forgotpassword_button";
	var adminID_id="#empid";
	var email_id="#email1";
	var forgotPassword_msg_id="#validation_res";
	
	
	/* variable for employee id length (number) */
	var adminIdMinLength = 6;
	/* variable for password length (number) */
	var employeePasswordMinLength = 6;
	
	/*variables for storing bootstrap css classes*/
	var successClass="has-success";
	var glyphiconOk="glyphicon-ok";
	var errorCalss="has-error" ;
	var glyphiconError="glyphicon-remove";
	
	/*variables to store request url and app name*/
	var applicationName="EmployeeManagementSystemNew";
	var adminLoginRequest="adminLogin.do";
	var adminHomePageRequest="adminHomePage.do";
	
	/*variables to store success/error messages*/
	var shortAdminPass_msg="Password is short";
	var shortAdminId_msg="Admin ID should contain 6 digits";
	var invalidAdminId_msg="Invalid admin ID";
	var wrongPassword_msg="Wrong password ";
	var internalProblem_msg="Some internal problem occured";
	/*variables to store flags of text fields*/
	var adminIdFlag=false;
	var adminPassFlag=false;
	
	/*variables to store credentilals*/
	var adminLoginId="";
	var adminLoginPass="";
	
	var userGlyphicon_class="glyphicon-user";
	var lockGlyphicon_class="glyphicon-lock";
	
	var modalHeader_id="#model-header";

	var employeeModalHeader_id="#employee-model-header";
	
	/*
	 * This function for setting default values
	 */
	function setDefaultValues(){
		
		//console.log("in  set default values");
		
		adminIdFlag=false;
		adminPassFlag=false;
		$(adminId_val_id).val("");	
		$(adminPass_val_id).val("");
		//$("#forgotpasshref").hide();	
		$(adminId_div_id).removeClass(errorCalss).removeClass(successClass);
		$(adminId_span_id).removeClass(glyphiconError).removeClass(glyphiconOk);
		
		$(adminPass_div_id).removeClass(errorCalss).removeClass(successClass);
		$(adminPass_span_id).removeClass(glyphiconError).removeClass(glyphiconOk);
		
		$(adminPass_val_id).prop('type',"password");
		$(admin_show_pass_id).prop('checked',false);		
		$("#res").text("");
		
	}; // END -- setDefaultValues()
	
	/*function call to hide modals*/
	hideModals();
	
	function hideModals(){
		
	    $(forgotPasswordForm_id).hide();
	    $(adminLoginForm_id).show();
	   /* function call to set modal heading as sign in*/
	    setModalHeaderAsSignIn();
	    $(backToLogin_id).hide();
	
	};
	
	/**
	 * This function called when admin clicks login link
	 */
	$(adminLogin_link_id).click(function(){
		/*function call to set default values*/
		setDefaultValues();
		$(admin_login_errorMsg_id).text("");
		$(adminLoginModal_id).modal('show');
       $(forgotPasswordForm_id).hide();
       $(adminLoginForm_id).show();
      /*  function call to set modal  header text as sign in*/
       setModalHeaderAsSignIn();
       //set default values  to forms
       setEmployeeChangePasswordDefaultValues();//This function is in attendanceForm.
       setDefaultVales();//This function is in attendanceForm.
	}); // END  --  
	
	
	/*
	 * This function executes when keyup(admin Id)
	 */
	$(adminId_val_id).keyup(function(){
		$(admin_login_errorMsg_id).text("");
		var adminId=$(adminId_val_id).val();
		var length=adminId.length;
		if(length != adminIdMinLength || !adminId.match(/^[0-9]*$/)){
			setTextBoxClassError(adminId_div_id	,adminId_span_id);
			adminIdFlag=false;
		}
		else{
			setTextBoxClassOk(adminId_div_id,adminId_span_id);
			adminIdFlag=true;
			adminLoginId=$(adminId_val_id).val();
		}
			
		
	});// END -- $(adminId_val_id).keyup()
	
	/*
	 * This function executes when keyup(admin password)
	 */
	$(adminPass_val_id).keyup(function(){
		
		$(admin_login_errorMsg_id).text("");
		var length=$(adminPass_val_id).val().length;
		if(length < employeePasswordMinLength){
			//setTextBoxClassError(adminPass_div_id,adminPass_span_id);
			adminPassFlag=false;
		}
		else{
			//setTextBoxClassOk(adminPass_div_id,adminPass_span_id);
			adminPassFlag=true;
			adminLoginPass=$(adminPass_val_id).val();
		}
					
	});// END -- $(adminId_val_id).keyup()
	
	/*
	 * This function executes when sign in button clicks
	 */
	$(admin_login_button_id).click(function(){
		var result_msg="";
		result_msg=(adminPassFlag)? result_msg: shortAdminPass_msg;
		result_msg=(adminIdFlag)? result_msg : shortAdminId_msg;
		
		if( adminIdFlag ==true && adminPassFlag== true){
			
			var adminObj={adminId:adminLoginId,password:adminLoginPass};
			
			/*function call to make ajax call for admin login*/
			makeAjaxCallToAdminLogin(adminObj);
			
		 }
		else{
			
			$(admin_login_errorMsg_id).text(result_msg);
		}
		
	
	});// END -- $(admin_show_pass_id).click()
	
	/*
	 * This function executes when show password check box clicks
	 */
	$(admin_show_pass_id).click(function(){
		var isChecked=$(admin_show_pass_id).prop('checked');
		if(isChecked){
			
			$(adminPass_val_id).prop('type',"text");
		}
		else{
			$(adminPass_val_id).prop('type',"password");
		}

		
	});// END -- $(admin_show_pass_id).click()
		
	
	 /*
	 * This function to stop reloading page
	 * on form submit
	 */
    $(adminLoginForm_id).submit(function(){

         return false;
         
     }); // END -- $(adminLoginForm_id).submit()
	
	/*
	 * This function tomake ajax call for admin login
	 */
	function makeAjaxCallToAdminLogin(adminObj){
		
		$.ajax ({
		    url: "/"+applicationName+"/"+adminLoginRequest,
		    type: "POST",
		    data: JSON.stringify(adminObj),
		    dataType: "json",
		    contentType: "application/json; charset=utf-8",
		    success: function(data){
		    	console.log("data returned from server: "+data);
		    	result=data;
		        if(result == 1){
		        	$(admin_login_errorMsg_id).text("");
		        	/* function call to set default values */
		        	setDefaultValues();	
		        	$(adminLoginModal_id).modal("hide");
		        	/*function call to get admin home page*/
		        	getAdminHomePage();
		        	
		        }
		        else if(result == 0){
		        	$(admin_login_errorMsg_id).text(wrongPassword_msg );
		        	/* function call to adminpasswordWrong() */
		        	adminPasswordWrong();
		        	
		        }
		        else if(result==2)
	        	{
	        	$(admin_login_errorMsg_id).text("you can't access please check your mail.");
	        	/*$(adminLoginModal_id).hide();*/
	        	alert("sorry your account is blocked due to three wrong attempts . please check your mail .");
	        	}
		        else{
		        	$(admin_login_errorMsg_id).text(invalidAdminId_msg);
		        	/*function call to set default values*/
		        	setDefaultValues();
		        }
		     },
	      error: function(data){
	    	  $(admin_login_errorMsg_id).text(internalProblem_msg);
	    	  setDefaultValues();
	      }
		}); // END ---- $.ajax()
		
	};// END ---- makeAjaxCallToAdminLogin(adminObj)
	
	/*
	 * This function for setting some values when password is wrong
	 */
	function adminPasswordWrong(){
		
		adminPassFlag=false;
		$(adminPass_val_id).val("");
		$(adminPass_div_id).removeClass(successClass);
		$(adminPass_span_id).removeClass(glyphiconOk);
		
		$(adminPass_val_id).prop('type',"password");
		$(admin_show_pass_id).prop('checked',false);
		
	}; // END -- adminPasswordWrong()
	/*
	 * This function is to set text box is ok (correct input)
	 */
	function setTextBoxClassOk(divId,spanId){
		
		$(divId).removeClass(errorCalss).addClass(successClass);
		$(spanId).removeClass(glyphiconError).addClass(glyphiconOk);
		
	};// END -- setTextBoxClassOk(divId,spanId)
	
	/*
	 * This function is to set text box is wrong (incorrect input)
	 */
    function setTextBoxClassError(divId,spanId){
    	
    	$(divId).removeClass(successClass).addClass(errorCalss);
		$(spanId).removeClass(glyphiconOk).addClass(glyphiconError);
		
	}// END -- setTextBoxClassError(divId,spanId)
    
    /*
	 * This function is get the admin home page
	 */
    function getAdminHomePage(){
    	console.log("request to get admin home page");
    	window.location.href="/"+applicationName+"/"+adminHomePageRequest;
		
	};// END -- getAdminHomePage()
	
	

	/*forgot password functionality code*/
	
    $(forgotPasswordForm_id).submit(function(){
		
		return false;
		
	});
  /**
   * This function executes when admin clicks on forgot password link
   */
	$(adminForgotPasswordLink_id).click(function(){
		
		console.log("admin forgot password");
		
		$(adminLoginForm_id).hide();
		$(forgotPasswordForm_id).show();
		$(backToLogin_id).show();
		$(forgotPassword_msg_id).text("");
		/*function call to set header as forgot password*/
		setModalHeaderAsForgotPassword();
		/*function call to set default values for  forgot password*/
		setForgotPasswordDefaulValues();// this function is in Attendanceform.js
		
	});
	
	/**
	 * This function is to set modal heading as sign-in 
	 */
	function setModalHeaderAsSignIn(){
        $(modalHeader_id).removeClass(lockGlyphicon_class).addClass(userGlyphicon_class); 
        $(modalHeader_id).text("Admin signin");
	};
	
	/**
	 * This function is to set modal heading as forgot password
	 */
	function setModalHeaderAsForgotPassword(){
		$(modalHeader_id).removeClass(userGlyphicon_class).addClass(lockGlyphicon_class);
		$(modalHeader_id).text("forgot Password");
	};
	
	
	 /**
	   * This function executes when employee clicks forgot password link
	   */
   $(employeeForgotPasswordLink_Id).click(function(){
		
	
		$(adminLoginModal_id).modal('show');
		$(forgotPasswordForm_id).show();
		$(backToLogin_id).hide();
		$(adminLoginForm_id).hide();
		$(forgotPasswordForm_id).show();
		$(forgotPassword_msg_id).text("");
		/*function call to set modal heading as forgot password*/
		setModalHeaderAsForgotPassword();
		/*function call to set default values for  forgot password*/
		setForgotPasswordDefaulValues();// this function is in Attendanceform.js
		setDefaultVales(); // this function is in Attendanceform.js
		
	});
	
	$(backToLogin_id).click(function(){
		    $(forgotPasswordForm_id).hide();
		    $(adminLoginForm_id).show();
		    $(backToLogin_id).hide();
		    $("#res").hide();
		  /* function call to set modal header as sign in*/
		    setModalHeaderAsSignIn();
	});
	
	$(forgotPassword_button_id).click(function(){
		
		var id=$(adminID_id).val();
		var email=$(email_id).val();
		
		if(id !="" && email !=""){
			$(forgotPassword_msg_id).text("Please wait...");
		 $.ajax({
	        type: 'POST',
	        url: 'forgotPasswordHome.do',
	        data:{id:id,email:email} ,
	        success: function (data) {
	       if(data==1)
		   {
	        	$(forgotPassword_msg_id).text("");
	        	$(forgotPasswordForm_id).hide();
	        	$("#res").show();
	        	$("#res").text("Reset password page link sent to  your mail, please check your mail");
	        	
		   }
	       else if(data==0)
		   {
		 
     	     $(forgotPassword_msg_id).text("Entered wrong email id, please enter valid mail id");
		   }
	       else{
		
		      $(forgotPassword_msg_id).text("Incorrect admin id.please enter valid admin id");
	        }
	        },
	        error: function (Response, Status, Error) {
	        
	        	$(forgotPassword_msg_id).text("please try again");  }
	    });
		}
		else
			{
			$(forgotPassword_msg_id).text("fields should not be empty");
			}
	});
	/*end of forgot password page*/
	
});// END -- $("document").ready(function())