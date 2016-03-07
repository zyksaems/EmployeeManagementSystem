
	var	loggedEmployeeId;
	var empName;
	var allEemployeeData;
	function showMessage(index){
		var message=allEemployeeData[index].message;
		
		$("#message-of-employee").html(message);
		
	}
	
	
   $('document').ready(function(){
	   
	  
	   
	   // set accordion first tab to enable
	   $("#accordion").accordion({
			 active: 0
		});
	   
	   /*variables to store requests*/
	   var urlPattern=".do";
	   var applicationName="EmployeeManagementSystemNew";
	   var  todayAttendanceStatusRequest="getReportByIdAndDate"+urlPattern;
	   var getLoggedInEmployeeRequest="getLoggedInEmployeeId"+urlPattern;
	   
	   var employeeId_reqParam="employeeId";
	   var attendanceDate_reqParam="attendanceDate";
	  
	   
   	   var employeeReport;
   	   var loggedInEmployeeId;
   	   
   	   /*variables to store field ids*/
   	   var employeeName_id="#logged-in-employee-name";
   	   var employeeLogoutTime_id="#logged-in-employee-logoutTime";
   	   var employeeLofginTime_id="#logged-in-employee-loginTime";
   	   
   	  /*variables to store success/errpe messages*/
   	   var todayNotLoggedIn_msg="Today  you are not logged-in, please login! ";
   	   var loginTime_msg="Today  you are logged-in  at ";
   	   var stillWorking_msg="You are Working still !";
   	   var logoutTime_msg="Today you are logged-out at ";
   	   
      
   	   // function call to get employee id
   	   makeAjaxCallTogetLoggedInEmployeeId();
   	   // execute  attendance after 500ms
	   setTimeout(makeAjaxCallToKnowTodayAttendanceStatus,100);
	   setTimeout(leaveNotificationForEmployee,500);
	  
   	
   	 /**
   	   * This function is to know logged in employee id
   	   */
	  function makeAjaxCallTogetLoggedInEmployeeId(){
		  // console.log("in makeAjaxCallTogetLoggedInEmployeeId()");
		   $.ajax({
   	        url:"/"+applicationName+"/"+getLoggedInEmployeeRequest,
   	        type: 'POST',
   	        dataType: "json",
   		    contentType: "application/json; charset=utf-8",
   	        success: function(data)
   	        {
   	        	console.log("data returned from server for today attendance status :"+ data);
   	        	console.log("data returned from server for today attendance status  (Stringify):"+ JSON.stringify(data));   	        	         
   	        	loggedInEmployeeId=data;
   	        	localStorage.setItem("loggedInEmployeeId",loggedInEmployeeId);
   	        },
   	        error: function(jqXHR, textStatus, errorThrown)
   	        {
   	            
   	            console.log('ERRORS: ' + textStatus);
   	            // STOP LOADING SPINNER
   	            //$(addEmployeeSuccessMsg_id).text(internalProblem_msg);
   	        }
   	        
   	    });//END -- $.ajax()
		   
	   }; // END  -- makeAjaxCallTogetLoggedInEmployeeId()
	   
	   
	   /**
	    * This function is to make ajax call to know the employee is logged in today or not
	    */
	   function makeAjaxCallToKnowTodayAttendanceStatus(){
		    console.log("in  makeAjaxCallToKnowTodayAttendanceStatus(employeeId,attendanceDateMills)");
		    if(loggedInEmployeeId == undefined){
		    	//console.log("logged in employee id is undefined  -- setting timeout()");
		    	setTimeout(makeAjaxCallToKnowTodayAttendanceStatus,500);
		    }
		    var attendanceDateMills=new Date().getTime();
			$.ajax({
    	        url:"/"+applicationName+"/"+todayAttendanceStatusRequest+"?"+employeeId_reqParam+"="+loggedInEmployeeId+'&'+attendanceDate_reqParam+'='+attendanceDateMills,
    	        type: 'POST',
    	        dataType: "json",
    		    contentType: "application/json; charset=utf-8",
    	        success: function(data)
    	        {
    	        	console.log("data returned from server for today attendance status :"+ data);
    	        	console.log("data returned from server for today attendance status  (Stringify):"+ JSON.stringify(data));
    	        	employeeReport=data.employeeReport;
    	        	loggedInEmployeeName=data.empName; // loggedInEmployeeName  is in EmployeeDetails.js file
    	        	loggedEmployeeId=data.empId;
    	        	empName=loggedInEmployeeName;
    	        	$(employeeName_id).append(loggedInEmployeeName);
    	        	 localStorage.setItem("loggedEmployeeName", data.empName);
    	        	if(employeeReport.length==0){
    	        		//console.log("today employee is not logged in");
    	        		$(employeeLofginTime_id).text(todayNotLoggedIn_msg);
    	        	}
    	        	else{
    	        		console.log("employee start time: "+employeeReport[0].startTime.substring(12,24));
    	        		$(employeeLofginTime_id).append(loginTime_msg+employeeReport[0].startTime.substring(12,24));
    	        		console.log("you are still working");
    	        		var logoutMsg= (employeeReport[0].endTime == undefined)? stillWorking_msg : logoutTime_msg+employeeReport[0].endTime.substring(12,24) ;
    	        		console.log("logout msg: "+logoutMsg);
    	        		
    	        		$(employeeLogoutTime_id).append(logoutMsg);
    	        	}
    	        	
    	        	         
                 
    	        },
    	        error: function(jqXHR, textStatus, errorThrown)
    	        {
    	            
    	            console.log('ERRORS: ' + textStatus);
    	            // STOP LOADING SPINNER
    	            //$(addEmployeeSuccessMsg_id).text(internalProblem_msg);
    	        }
    	        
    	    });//END -- $.ajax()
			
	   }// END  -- makeAjaxCallToKnowTodayAttendanceStatus(employeeId,attendanceDateMills)
	   
	   
	   
   });  // END  -- $('document').ready(function())
   
   function applyForLeave(){
		
		var leaveObject={employeeId:null,name:null,subject:null,message:null}; 
		
		
		var subject=document.getElementById("subject").value;
		var text_content=document.getElementById("text-for-leave").value;
		
		
		console.log("subject :"+subject);
		console.log("text_content :"+text_content);
		
		var leaveObject={employeeId:loggedEmployeeId,name:empName,subject:subject,message:text_content};
		
		$.ajax({
	        type: "POST",
	        url: "/EmployeeManagementSystemNew/applyLeave.do",
	        data:leaveObject,
	        success: function(msg) {
	        	//  show meaage
	        	//$("#leave-appy-success-msg").text("Successfully applied");
	        	// call call back functon
	        	alert("Successfully applied");
	            setTimeout(reloadPage,1000);
	        },
	        error: function(msg) {
	    
	        	//$("#leave-appy-success-msg").text("failed  try again");
	        	alert("Not applied successfully");
	        
	        }
	    });
		
		
	}
   
   function reloadPage(){
	   window.location.reload();
   };
   
   function leaveNotificationForEmployee(){
	   var dataSet=[];
	   
	   console.log("==================in leaveNotificationForEmployee()=================");
		  var request = $.ajax({
			  url: "/EmployeeManagementSystemNew/getEmployeeLeaveNotification.do"+"?employeeId="+loggedEmployeeId,
			  method: "GET",
			  dataType: "json"
			});
			 
			request.done(function(data){
				
				console.log("selected employee data"+data);
				 var len = data.length;
				 console.log(len);
				 allEemployeeData=data;
				 var txt = "";
				 
				 for(var i=0;i<len;i++){
					 txt="<button type='button' class='btn btn-default btn-info active' onclick='showMessage("+i+")' " +
	                            		"data-toggle='modal' data-target='#showMessageModal'>Click</button>";
					  dataSet[i]=new Array(4);
					  dataSet[i][0]=data[i].date_of_apply;
					  dataSet[i][1]=data[i].subject;
					  dataSet[i][2]=data[i].isApproved;
					  dataSet[i][3]=txt;
				 }
					 
				 
	                if(len >= 0){
	                	
	                    /*for(var i=0;i<len;i++){
	                            txt += " <tr id="+i+"><td>"
	                            +data[i].date_of_apply+"</td><td>"
	                            +data[i].subject+"</td><td>"
	                            +data[i].isApproved+"</td><td>"
	                            +"<button type='button' class='btn btn-default btn-info active' onclick='showMessage("+i+")' " +
	                            		"data-toggle='modal' data-target='#showMessageModal'>Click</button></td><tr>";	                            
	                        }
	                    	if(txt != ""){
	                    		$("#leave-table").append("<tbody id='tablebody'>"+txt+"</tbody");
	                    		$("button").click(function(){
	                    			console.log("button clicked");
	                    		});
	                    	}*/
	                	
	                	
	                	tableclear=$('#leave-table').DataTable({
	               	        data: dataSet,
	               	     "lengthMenu": [[5,10, 25, 50,100, -1], [5,10, 25, 50,100, "All"]],
	               	        columns: [
	                
	               	            { title: "Date of Applied" },
	               	            { title: "Subject" },
	               	            { title: "Status" },
	               	        	{ title: "See Message","orderable": false }
	               	             
	                         ]
	               	    } );
	                	
	                    }else{
	                		/*alert("No Match Found");*/
	                	}
			});
			 
			request.fail(function( jqXHR, textStatus ) {
			  alert("failed all");
			});
	   
	   
   }