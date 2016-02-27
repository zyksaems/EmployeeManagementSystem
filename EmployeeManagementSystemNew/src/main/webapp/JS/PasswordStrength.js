     
     /* variables to store regular expressions */
      var lowerAndUpperCaseCharactersCombination= new RegExp(/([a-z].*[A-Z])|([A-Z].*[a-z])/);
      var lowerAndUpperCaseCharacters =  new RegExp(/([a-zA-Z])/);
      var numbers=  new RegExp(/([0-9])/);
      var oneSpecialCharacter=  new RegExp(/([!,%,&,@,#,$,^,*,?,_,~])/);
      var twoSpecialCharacters=   new RegExp(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/);

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
    	   var strength=0;
    	   console.log("received pass length: "+passwordToTest.length );
    	   if (passwordToTest.length  <= 3) {
    		       /* function call to set text and class*/
      		       setPasswordStrengthMessage(element_id,"");
    	   }
    	   else{
    		   if (passwordToTest.length > 2) strength += 1;
               // If password contains both lower and upper case characters, increase strength value.
               if (passwordToTest.match(lowerAndUpperCaseCharactersCombination)) strength += 1;
               // If it has numbers and characters, increase strength value.
               if (passwordToTest.match(lowerAndUpperCaseCharacters) && passwordToTest.match(numbers)) strength += 1;
               // If it has one special character, increase strength value.
               if (passwordToTest.match(oneSpecialCharacter)) strength += 1;
               // If it has two special characters, increase strength value.
               if (passwordToTest.match(twoSpecialCharacters)) strength += 1;
               // Calculated strength value, we can return messages
               // If value is less than 4
               if (strength < 4) {
            		  /* function call to set text and class for weak password*/
           		  setTextAndClass(element_id,weakPassword_msg,weakPassword_cls);
               } else if (strength == 4) {
            	   /* function call to set text and class for medium password*/
          		  setTextAndClass(element_id,mediumPassword_msg,mediumPassword_cls);
               } else {
            	   /* function call to set text and class fro strong password*/
           		  setTextAndClass(element_id,strongPassword_msg,strongPassword_cls);  
               }
    	   }
    	   
    	  

       };//  END  -- measurePasswordStrength(passwordToTest,element_id)
       
      /**
       * This function is to set text and class to given field
       */
      function setTextAndClass(field_id,textToSet,classToset){
    	    setPasswordStrengthMessage(field_id,textToSet);
    	    setTimeout(setPasswordStrengthMessage,100000,field_id,"");
     	    $(field_id).removeClass(mediumPassword_cls).removeClass(strongPassword_cls).removeClass(weakPassword_cls).addClass(classToset);
     	    $("#employee-new-password-strength-span").val();
     	    
      };//  END  -- setTextAndClass(field_id,textToSet,classToset)
      
      /**
       * This function is to set message to given field
       */
        function setPasswordStrengthMessage(field_id,msg){
        	$(field_id).text(msg);
        };//  END  -- setPasswordStrengthMessage(field_id,msg)
      
       
       
      