     
     /* variables to store regular expressions */
      var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
      var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$","g");
      var enoughRegex = new RegExp("(?=.{6,}).*", "g");

      /*variables to store css classes*/
      var weakPassword_cls="weak-password";
      var mediumPassword_cls="medium-password";
      var strongPassword_cls="strong-password";
      
      /*variables to store messages to display*/
      var weakPassword_msg="Weak password";
      var mediumPassword_msg="Medium password";
      var strongPassword_msg="Strong password";
      
     /**
       * This function is to measure password strength whether it is strong or medium
       * or weak
       */
       function measurePasswordStrength(passwordToTest,element_id) {
    	   //console.log("value of password for test :"+ passwordToTest+"  pasword lngth:"+passwordToTest.length);
    	   //console.log("enough reg "+enoughRegex.test(passwordToTest));
    	   if(passwordToTest.length == 0){
    		   //console.log("in password length 0");
     		  /* function call to set text and class*/
     		  setTextAndClass(element_id,"","");
    	   }
    	   else if(enoughRegex.test(passwordToTest)){
    		   //console.log("in enough reg");
    		  /* function call to set text and class*/
    		  setTextAndClass(element_id,weakPassword_msg,weakPassword_cls);
    	   }
    	   else if(mediumRegex.test(passwordToTest)){
    		   //console.log("in medium reg");
    		   /* function call to set text and class*/
     		  setTextAndClass(element_id,mediumPassword_msg,mediumPassword_cls);
    	   }
    	   else if(strongRegex.test(passwordToTest)){
    		   //console.log("in strong reg");
    		   /* function call to set text and class*/
      		  setTextAndClass(element_id,strongPassword_msg,strongPassword_cls);  
    	   }
    	   

       };//  END  -- measurePasswordStrength(passwordToTest,element_id)
       
      /**
       * This function is to set text and class to given field
       */
      function setTextAndClass(field_id,textToSet,classToset){
    	    //console.log("in set text and class  ");
    	    //function call
    	    setPasswordStrengthMessage(field_id,textToSet);
    	    setTimeout(setPasswordStrengthMessage,5000,field_id,"");
     	    $(field_id).removeClass(mediumPassword_cls).removeClass(strongPassword_cls).removeClass(weakPassword_cls).addClass(classToset);
     	    $("#employee-new-password-strength-span").val();
     	    
      };//  END  -- setTextAndClass(field_id,textToSet,classToset)
      
      /**
       * This function is to set messasge to given field
       */
        function setPasswordStrengthMessage(field_id,msg){
        	//console.log(" in setPasswordStrengthMessage(field_id,msg) method");
        	$(field_id).text(msg);
        };//  END  -- setPasswordStrengthMessage(field_id,msg)
      
       
       
      