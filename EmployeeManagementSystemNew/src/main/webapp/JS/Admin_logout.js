
/*Admin logout functionality*/
  
$("document").ready(function(){
	
	getProPic();
	
	
	function getProPic(){
		
		var id=localStorage.getItem('loggedEmployeeID');
		  var request = $.ajax({
			  url: "/EmployeeManagementSystemNew/getProPic.do"+"?eid="+id,
			  method: "GET",
			 
			});
			 
			request.done(function(data) {
				console.log(data.employeeId);
				console.log(data.imageString);
				document.getElementById('p-image').setAttribute('src',data.imageString);
           	 	
				});
			
			request.fail(function(jqXHR, textStatus ) {
				 
				
				});	
		
			
		
	}
	
	
	
	function getNameOfLoggedEmployee(){
	var employeename=localStorage.getItem("loggedEmployeeName");
	$("#loggedout_employee-name").text(employeename);
	}
	
	 setTimeout(getNameOfLoggedEmployee,200);
	
	// apply accordian to accordian
	$("#accordion").accordion();
	
    var adminLogout_link_id="#admin-logout-link";
    
    var adminLogout_url="adminLogout.do";
    var applicationName="EmployeeManagementSystemNew";
    
    var homePage_url="home.do";
    
    $(adminLogout_link_id).click(function(){
    	console.log("admin logout");
    	
    	var flag=true;
    	var url=window.location.pathname;	
    	if(url=="/EmployeeManagementSystemNew/getChangePasswordPage.do")
    		{
    		flag=checkFieldInChangePasswordPage();
    		}
    	else if(url=="/EmployeeManagementSystemNew/getAddEmployeePage.do")
    		{
    		flag=checkFieldInAddEmployeePage();
    		}
    	/*else if(url=="/EmployeeManagementSystemNew/getDailyReportGenerationPage.do")
		{
    		flag=checkFieldInDailyReportGenerationPage();
		}
    	else if(url=="/EmployeeManagementSystemNew/getWeeklyProductivityPage.do")
		{
    		flag=checkFieldInWeeklyProductivityPage();
		}
    	else if(url=="/EmployeeManagementSystemNew/getMonthlyProductivityPage.do")
		{
    		flag=checkFieldInMonthlyProductivityPage();
		}
    	else if(url=="/EmployeeManagementSystemNew/getAnnualProductivityPage.do")
		{
    		flag=checkFieldInAnnualProductivityPage();
		}
    	else if(url=="/EmployeeManagementSystemNew/getWeeklyReportGenerationPage.do")
		{
    		flag=checkFieldInWeeklyReportGenerationPage();
		}
    	else if(url=="/EmployeeManagementSystemNew/getMonthlyReportGenerationPage.do")
		{
    		flag=checkFieldInMonthlyReportGenerationPage();
		}
    	else if(url=="/EmployeeManagementSystemNew/getAnnuallyReportGenerationPage.do")
		{
    		flag=checkFieldInAnnuallyReportGenerationPage();
		}*/
    	else
    		{
    		getLogOut();
    		}
    	console.log("admin logout");
    	/*$.get("/"+applicationName+"/"+adminLogout_url,"json");*/
    	if(flag==false)
    		{
    		
    		$("#myAlertModel").modal('show');
    		$("#logout_alert_button").click(function(){
    			
    			$("#myAlertModel").modal('hide');
    			getLogOut();
    		});
    		
    		}
    	else{
    		getLogOut();
    	  }
    	
    	
    });// END -- $(adminLogout_link_id).click()
    
    function checkFieldInChangePasswordPage(){
    	if($("#change-password-admin-current-password-val").val()=="" && $("#change-password-admin-new-password-val").val()=="" && $("#change-password-admin-confirm-password-val").val()=="")
    		{
    		return true;
    		}
    	else{
    		return false;
    	}
    	
    };
    function checkFieldInAddEmployeePage(){
    	if($("#excel-file-path").val()=="" && $("#add-employee-employee-id-val").val()=="" && $("#add-employee-employee-firstname-val").val()=="" && $("#add-employee-employee-lastname-val").val()=="" && $("#add-employee-employee-dob-val").val()=="" && $("#add-employee-employee-mobile-val").val()=="" && $("#add-employee-employee-email-val").val()=="" && $("#add-employee-employee-designation-val").val()=="")
    		{
    		return true;
    		}
    	else{
    		return false;
    	}
    	
    };
    function checkFieldInDailyReportGenerationPage(){
    	if($("#select").val()=="" && $("#id").val()=="" && $("#datepicker").val()=="")
    		{
    		return true;
    		}
    	else{
    		return false;
    	}
    	
    };
    function checkFieldInWeeklyReportGenerationPage(){
    	if($("#select").val()=="" && $("#id").val()=="" && $("#week").val()=="")
    		{
    		return true;
    		}
    	else{
    		return false;
    	}
    	
    };
    function checkFieldInMonthlyReportGenerationPage(){
    	if($("#select").val()=="" && $("#id").val()=="" && $("#month").val()=="")
    		{
    		return true;
    		}
    	else{
    		return false;
    	}
    	
    };
    function checkFieldInAnnuallyReportGenerationPage(){
    	if($("#select").val()=="" && $("#id").val()=="" && $("#year").val()=="")
    		{
    		return true;
    		}
    	else{
    		return false;
    	}
    	
    };
    function checkFieldInWeeklyProductivityPage(){
    	if($("#weekly-productivity-employeeId").val()=="" && $("#individual-weekly-productivity").val()=="" && $("#over-all-weekly-productivity").val()=="")
    		{
    		return true;
    		}
    	else{
    		return false;
    	}
    	
    };
    function checkFieldInMonthlyProductivityPage(){
    	if($("#monthly-productivity-employeeId").val()=="" && $("#individual-monthly-productivity").val()=="" && $("#over-all-monthly-productivity").val()=="")
    		{
    		return true;
    		}
    	else{
    		return false;
    	}
    	
    };
    function checkFieldInAnnualProductivityPage(){
    	if($("#monthly-productivity-employeeId").val()=="" && $("#individual-monthly-productivity-year").val()=="" && $("#over-all-monthly-productivity-year").val()=="")
    		{
    		return true;
    		}
    	else{
    		return false;
    	}
    	
    };
    
    function getLogOut(){
    	    	$.get("/"+applicationName+"/"+adminLogout_url, function( data ) {
    				   console.log("logged in  employee ids data: "+data);
    				   if(data == 1){
    					   
    					   window.location.href="/"+applicationName+"/"+homePage_url;
    				   }
    				},"json");
    }
});// END -- $("document").ready()