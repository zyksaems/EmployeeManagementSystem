     
     /* variables to store regular expressions */
      var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
      var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$","g");
      var enoughRegex = new RegExp("(?=.{6,}).*", "g");

      /*variables to store css classes*/
      var weakPassword_cls="weak-password";
      var mediumPassword_cls="medium-password";
      var strongPassword_cls="strong-password";
      
      /*variables to store messages to display*/
      var weakPassword_msg="weak password";
      var mediumPassword_msg="medium password";
      var strongPassword_msg="strong password";
      
     /**
       * This function is to measure password strength whether it is strong or medium
       * or weak
       */
       function measurePasswordStrength(passwordToTest,element_id) {
    	   console.log("value of password for test :"+ passwordToTest+"  pasword lngth:"+passwordToTest.length);
    	   //console.log("enough reg "+enoughRegex.test(passwordToTest));
    	   if(passwordToTest.length == 0){
    		   console.log("in password length 0");
     		  /* function call to set text and class*/
     		  setTextAndClass(element_id,"","");
    	   }
    	   else if(enoughRegex.test(passwordToTest)){
    		   console.log("in enough reg");
    		  /* function call to set text and class*/
    		  setTextAndClass(element_id,weakPassword_msg,weakPassword_cls);
    	   }
    	   else if(mediumRegex.test(passwordToTest)){
    		   console.log("in medium reg");
    		   /* function call to set text and class*/
     		  setTextAndClass(element_id,mediumPassword_msg,mediumPassword_cls);
    	   }
    	   else if(strongRegex.test(passwordToTest)){
    		   console.log("in strong reg");
    		   /* function call to set text and class*/
      		  setTextAndClass(element_id,strongPassword_msg,strongPassword_cls);  
    	   }
    	   

       };
       
      /**
       * This function is to set text and class to given field
       */
      function setTextAndClass(field_id,textToSet,classToset){
    	  console.log("in set text and class  ");
    	    $(field_id).text(textToSet);
     	    $(field_id).removeClass(mediumPassword_cls).removeClass(strongPassword_cls).removeClass(weakPassword_cls).addClass(classToset);
     	    $("#employee-new-password-strength-span").val();
      };
      
       
       
       /*$(changePasswordEmployeeNewPass_id).keyup(function(e) {
		     var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
		     var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		     var enoughRegex = new RegExp("(?=.{6,}).*", "g");
		   // console.log("This value: "+$(this).val());
		     
		     if (false == enoughRegex.test($(this).val())) {
  	 			$(initialMsg_Id).show();
  	 			// $(initial_Id).text("HHHHHHHHHHHHHHJ");
  	 		
				 * $(weakMsg_Id).hide(); $(mediumMsg_Id).hide();
				 * $(strongMsg_Id).hide();
				 
  	 			
  	 			$(initial_Id).text('Password is too short');
  		    
   } else if (strongRegex.test($(this).val())) {
					
					 * $(strongMsg_Id).show(); $(initialMsg_Id).hide();
					 * $(weakMsg_Id).hide(); $(mediumMsg_Id).hide();
					 
  
  	 			$(initial_Id).className = 'ok';
  	 			$(initial_Id).text('Password is Strong');
  		    	
   } else if (mediumRegex.test($(this).val())) {
  	 			
					 * $(mediumMsg_Id).show(); $(strongMsg_Id).hide();
					 * $(initialMsg_Id).hide(); $(weakMsg_Id).hide();
					 
  	 			
  	 			$(initial_Id).className = 'alert';
  	 			$(initial_Id).text(' Password is Medium');
   } else {
  				
					 * $(weakMsg_Id).show(); $(mediumMsg_Id).hide();
					 * $(strongMsg_Id).hide(); $(initialMsg_Id).hide();
					 
  	 			
  	 			$(initial_Id).className = 'error';
  	 			$(initial_Id).text('Password is Weak');
   }
		     
		     
		  
		  }
*/
