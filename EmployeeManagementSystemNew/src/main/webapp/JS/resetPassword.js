$(document).ready(function(){
	
	$("#resetPasswordButton").click(
			function(){
				resetPasswordFunction();
			}
	);
	
	function resetPasswordFunction() {
		    
	      var newPwd=$("#newPassword").val();   
	      var confirmPwd=$("#confirmPassword").val();
	      
	      if(newPwd.length < 5 && confirmPwd.length  >= 5 ){
	    	  $("#resetPasswordSuccessMsg").text("New  password too short . ");
	      }
	      else if(newPwd.length  >= 5 && confirmPwd.length < 5 ){
	    	  $("#resetPasswordSuccessMsg").text("Confirm  password too short .");
	      }
	      else if(newPwd.length < 5 &&  confirmPwd.length < 5) {
	    	  $("#resetPasswordSuccessMsg").text("Both New  password  & Confirm Password are too short.");
	      }
	      else if(newPwd != confirmPwd){
	    	  $("#resetPasswordSuccessMsg").text("Both New  password  & Confirm Password Should be same.");
	      }
	      else{
	    	  $("#resetPasswordSuccessMsg").text("Successfuly Reset Password .");
	      }
	}

});
