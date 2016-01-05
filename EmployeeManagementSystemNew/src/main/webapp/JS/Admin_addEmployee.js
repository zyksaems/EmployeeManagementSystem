
$("document").ready(function(){
	
      var addEmployeeMainDiv_id="#add-employee-main-division";
  
      /*creating variables for storing ids*/
      var addEmployeeByExcelButton_id="#add-employee-excel-button";
      var addEmployeeByManualButton_id="#add-employee-manual-button";
      
      var addEmployeeExcelDiv_id="#add-employee-excel-div";
      var addEmployeeManualDiv_id="#add-employee-manual-div";
      
      var filePath_id="#excel-file-path";
      var excelUploadButton_id="#excel-upload-button";
      var excelFileSuccessMsg_id="#excel-file-uplaod-success-msg";
      
      /*variables to diaplay success/error messages*/
      var notExcelFileMsg="Not a Excel file, Please select Excel file";
      var excelErrorMsg="some internal pro=blem occured";
      var uploadSuccessMsg="File uploadesd successfully";
      var excelWaitMsg="please wait ...";
      var plsSelectFile_msg="Please select File";
      
      /*variable to store file list*/
      var  excelFile;
      
      var allowedFileExtension1="xlsx";
	  var allowedFileExtension2="xls";
      
      /* variable for storing request url's for making ajax calls*/
  	  /* variable for storing application name (String) */
  	  var applicationName="EmployeeManagementSystemNew";
      var uplaodExceFileRequest="uploadEmployeeDetailsExcelFile.do";
      var addSingleEmployeeRequest="addSingleEmployee.do";
      
      /*variable to store query param names*/
      var employeeDobParam="dob";
      
     
      
      
      
      /* first hide the divisions (by default)*/
      $(addEmployeeManualDiv_id).hide();
      $(addEmployeeExcelDiv_id).hide();
      
      /* 
       *  This function shows add emoployee excel div 
       *  hides manual div
       */
      $(addEmployeeByExcelButton_id).click(function(){
    	  
    	  $(addEmployeeManualDiv_id).hide();
    	  $(addEmployeeExcelDiv_id).show();
    	  
      });// END -- addEmployeeByExcelButton_id.click()
      
      /* 
       *  This function shows add emoployee manual div 
       *  hides excel div
       */
      $(addEmployeeByManualButton_id).click(function(){
    	  
    	  $(addEmployeeManualDiv_id).show();
    	  $(addEmployeeExcelDiv_id).hide();
    	  
      });// END -- $(addEmployeeByManualButton_id).click()
      
      /* 
       *  This function shows add emoployee manual div 
       *  hides excel div
       */
      $(excelUploadButton_id).click(function(){
    	  console.log("excel file length: "+excelFile);
    	  if(excelFile == undefined){
    		  console.log("file not selected");
    		  $(excelFileSuccessMsg_id).text(plsSelectFile_msg);
    	  }
    	  /*function call to check file type*/
    	  else if(checkFileType()){
            	var formData=new FormData();
            	formData.append("file", excelFile[0]);
            	/*function call to upload excel file */
          	   makeAjaxCallToUploadFile(formData);
    	    }
    	    else{
    		  
    	    	$(excelFileSuccessMsg_id).text(notExcelFileMsg);
    	    }
    	  
    	  
      });// END -- $(addEmployeeByManualButton_id).click()
  
      /* 
       *  This function executes when file changes
       *  
       */
      $(filePath_id).on('change',function(event){
    	  
    	   excelFile=event.target.files;
    	   $(excelFileSuccessMsg_id).text("");
    	  /*console.log("file in event "+excelFile);*/
    	  
    	  
      });// END -- $(filePath_id).on(change())
  
      /* 
       *  This function make ajax call to upload file
       */
      function makeAjaxCallToUploadFile(formData){
    	  console.log("");
    	  $(excelFileSuccessMsg_id).text(excelWaitMsg);
    	  $.ajax({
    	        url:"/"+applicationName+"/"+uplaodExceFileRequest,
    	        type: 'POST',
    	        data: formData,
    	        cache: false,
    	        dataType: 'json',
    	        processData: false, // Don't process the files
    	        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
    	        success: function(data)
    	        {
    	        	console.log('data returned: ' + data);
    	        	var resArray=data.split('.');
    	        	var resultMsg;
                   /* console.log("array length : "+resArray.length);*/
                    if(resArray.length == 2 && resArray[0]=="0" && resArray[1]== "0")
                    	resultMsg=uploadSuccessMsg;
                    else if (resArray.length == 2) 	                    	
                    	resultMsg="In excel file Row Number:"+resArray[0]+" Column Number:"+resArray[1]+"  DOB is wrong";						
                    else
                    	resultMsg="In excel file Row Number: "+data+" contains invalid data";
                    
                    $(excelFileSuccessMsg_id).text(resultMsg);
    	        },
    	        error: function(jqXHR, textStatus, errorThrown)
    	        {
    	            // Handle errors here
    	            console.log('ERRORS: ' + textStatus);
    	            // STOP LOADING SPINNER
    	            $(excelFileSuccessMsg_id).text(excelErrorMsg);
    	        }
    	        
    	    });//END -- $.ajax()
    	  
    	  
      }// END -- makeAjaxCallToUploadFile(formData)
      
      /* 
       *  This function is to check file is excel or not
       *  if type is excel returns true else false
       */
      function checkFileType(){
    	  var filExtension=excelFile[0].name.split('.').pop();
    	  console.log("file extension: "+filExtension);
    	  return (filExtension == allowedFileExtension1 || filExtension == allowedFileExtension2)? true : false;
    
      }// END -- checkFileType()
      
      
      /*------------------------------------------Employee manual-----------------------------------------*/
      
      
      /*variables for storing add single employee ids*/
      var employeeId_id="#add-employee-employee-id-val";
      var employeeFirstName_id="#add-employee-employee-firstname-val";
      var  employeeLastName_id="#add-employee-employee-lastname-val";
      var employeeDob_id="#add-employee-employee-dob-val";
      var employeeMobile_id="#add-employee-employee-mobile-val";
      var employeeEmail_id="#add-employee-employee-email-val";
      var employeeDesgnation_id="#add-employee-employee-designation-val";
      var empployeeRole_id="#add-employee-employee-role-val";
      var employeeDept_id="#add-employee-employee-dept-val";
      
      var addEmployeeSubmitButton_id="#add-employee-submit-button";
      var addEmployeeSuccessMsg_id="#add-employee-success-message";
      
      /*varibles to store employee details*/
      var employeeId="";
      var employeeFirstName="";
      var emplyeeLastName="";
      var employeeDob="";
      var employeeMobile="";
      var employeeEmail="";
      var employeeDesignation="";
      var employeeRole="";
      var employeeDept="";
      
      
      
      /*variables to store success or error messages*/
      var inavalidMobileNoMsg="Invalid Mobile Number";
      var invalidDobMsg="Invalid Date of Birth";
      var invalidEmailMsg="Invalid Email ID";
      var inavalidEmployeeDetailsMsg="Invalid employee details";
      
      var sessionExpired_msg="Your Session Expired..";
	  var employeeAddedSuccess_msg="Employee Successfully Added!";
	  var internalProblem_msg="Internal problem occured try again";
      
      /* 
       *  This function to set employee default details
       */
	   function employeeDefaultDetails(){
			
		   $(employeeId_id).val("");
		   $(employeeFirstName_id).val("");
		   $(employeeLastName_id).val("");
		   $(employeeDob_id).val("");
		   $(employeeMobile_id).val("");
		   $(employeeEmail_id).val("");
		   $(employeeDesgnation_id).val("");
		   $(empployeeRole_id).val("");
		   $(employeeDept_id).val("");
			
		};// END -- employeeDefaultDetails()
		
		/*function call to set employee default values*/
		employeeDefaultDetails();
		
		/* 
	     *  This function excutes when employee clicks add employee button
	     */
		$(addEmployeeSubmitButton_id).click(function (){
	
			   employeeId=$(employeeId_id).val();
		       employeeFirstName=$(employeeFirstName_id).val();
		       emplyeeLastName=$(employeeLastName_id).val();
		       employeeDob=$(employeeDob_id).val();
		       employeeMobile=$(employeeMobile_id).val();
		       employeeEmail=$(employeeEmail_id).val();
		       employeeDesignation=$(employeeDesgnation_id).val();
		       employeeRole=$(empployeeRole_id).val();
		       employeeDept=$(employeeDept_id).val();
		       
		      
			   /*function call to valiate employee details*/
			   validateEmployeeDetails();
			
		});// END -- (addEmployeeSubmitButton_id).click()
		
		/* 
	     *  This function excutes when employee id entering(key up)
	     */
		$(employeeId_id).keyup(function(){
			
			$(addEmployeeSuccessMsg_id).text(""); 
			
		}); // END -- $(employeeId_id).keyupclick()
		/*
		 * This functuion is to validate  employee details 
		 */
		function validateEmployeeDetails(){
		      
		    if(employeeDob.length < 6 || new Date(employeeDob) > new Date()){
		    	
				$(addEmployeeSuccessMsg_id).text(invalidDobMsg); 
			}  
			else if((employeeMobile.length != 10) || !employeeMobile.match(/^[0-9]*$/)){
				/*console.log("invalid mobile"+$scope.mobile.length+"||"+$scope.mobile.match(/^[0-9]*$/));*/
				$(addEmployeeSuccessMsg_id).text(inavalidMobileNoMsg);
			}			
			/*function call to validate email*/   
			else if( !validateEmail(employeeEmail)){
				$(addEmployeeSuccessMsg_id).text(invalidEmailMsg); 
			}
			else if(employeeId.length > 4 && employeeFirstName.length > 2 && emplyeeLastName.length >= 1 && employeeDept.length >= 1 
					&& employeeRole.length >= 1 && employeeDesignation.length >= 2 ){
		
					/*console.log("emp dob: "+$scope.empId+" "+$scope.empFirstName+" "+$scope.empLastName+" "+$scope.DOB);*/
				$(addEmployeeSuccessMsg_id).text("please wait..");
					var empObject={employeeId:employeeId,firstName:employeeFirstName,lastName:emplyeeLastName,dob:null,mobileNo:employeeMobile,
							emailId:employeeEmail,designation:employeeDesignation,rollId:employeeRole,status:1,deptId:employeeDept};
					dateOfBirth=employeeDob;
					
					/*function call to add single emoployee*/
					 makeAjaxCallToAddEmployee(empObject);
			
			}
			else{
				
				console.log("invalid employee details");
				$(addEmployeeSuccessMsg_id).text(inavalidEmployeeDetailsMsg); 
				
			}
			
			
			
		};// END -- validateEmployeeDetails()
		
	    /* 
	     *  This function is to validate email address
	     *  if email correct returns true
	     *  otherwise returns false 
	     */
		function validateEmail(emailId){
			
			 var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			 return re.test(emailId);
			 
		};// END -- validateEmail(emailId)
		
		/* 
	     *  This function is to make ajax call 
	     *  to save emoployee object into database
	     */
		function makeAjaxCallToAddEmployee(employeeObj){
			console.log("employee object to pass: "+ JSON.stringify(employeeObj));
			var employeeDobMillis=new Date(employeeDob).getTime();
			$.ajax({
    	        url:"/"+applicationName+"/"+addSingleEmployeeRequest+"?"+employeeDobParam+"="+employeeDobMillis,
    	        type: 'POST',
    	        data: JSON.stringify(employeeObj),
    	        dataType: "json",
    		    contentType: "application/json; charset=utf-8",
    	        success: function(data)
    	        {
    	        	console.log("data returned from server for add single emoloyee:"+ data);
    	        	if(data == 1){
    	        		$(addEmployeeSuccessMsg_id).text(employeeAddedSuccess_msg);
    	        		employeeDefaultDetails();
    	        	}
    	        	else if(data == -1){
    	        		$(addEmployeeSuccessMsg_id).text(sessionExpired_msg);
    	        		employeeDefaultDetails();
    	        	}
    	        	else{
    	        		$(addEmployeeSuccessMsg_id).text(internalProblem_msg);
    	        	}                    
                 
    	        },
    	        error: function(jqXHR, textStatus, errorThrown)
    	        {
    	            
    	            console.log('ERRORS: ' + textStatus);
    	            // STOP LOADING SPINNER
    	            $(addEmployeeSuccessMsg_id).text(internalProblem_msg);
    	        }
    	        
    	    });//END -- $.ajax()
			
		}; //END -- makeAjaxCallToAddEmployee(employeeObj)
	
});// END -- document.ready(function())