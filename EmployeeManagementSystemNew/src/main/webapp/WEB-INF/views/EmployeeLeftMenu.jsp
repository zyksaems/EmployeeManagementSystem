<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Employee DashBoard</title>

   <script src="./jquery/jquery-2.1.4.js"></script>
  
   <script src="./jquery/jquery-ui.js"></script>
   <link rel="stylesheet"  href="./jquery/jquery-ui.css">
   
   <script src="./bootstrap/bootstrap.min.js"></script>   
   <link rel="stylesheet"  href="./bootstrap/bootstrap.min.css">
  
  
  <link rel="stylesheet" href="./CSS/AdminTemplete.css"> 
  <link rel="stylesheet" type="text/css" href="./CSS/style.css"> 
  
  <link rel="shortcut icon" type="image/x-icon" href="./images/caprus logo.png" />
    
  <script src="./JS/Admin_logout.js"></script>  
  <script src="./JS/EmployeeDetails.js"></script>  

</head>
<body>

     <div class="container-fluid ">
      	<div class="row headpart">
		     <div class="col-sm-2 icon">
                 <img src="./images/caprus logo.png" width="65px" height="65px">
		     </div>
			 <div class="col-sm-8 title_menu text-center">
				 <h1 align="center">EMPLOYEE MANAGEMENT SYSTEM</h1>
			 </div>
			 <div class="col-sm-2">
				<div class="dropdown">
					<span class="glyphicon glyphicon-cog icon-setting"
						data-toggle="dropdown"></span>
					<ul class="dropdown-menu dropdown-menu-right" id="dropdown">
						<!-- <li><a href="#" id="admin-profile-link">Profile</a></li> -->
						<li><a href="/EmployeeManagementSystemNew/getChangePasswordPage.do">Change password</a></li>
						<li><a href="#" id="admin-logout-link">Logout</a></li>
					</ul>
				</div>
			 </div>
		 </div>
		 <div class="row">
		
		     <!-- This division is the division on left for display links -->
			<div class="col-sm-2 sidebar">
			
			       <div id="accordion">
			           <h3 style="">Attendance</h3>
	    	           <div>
	    	               <ul>
	    	                  <li><a href="#/EmployeeManagementSystemNew/getAddEmployeePage.do" id="admin-add-employee-link">View Attendance details</a></li>	    	     
	    	               </ul>
			            </div>
			            <h3>Leave</h3>
			            <div>
						    <ul>
							   <li><a href="#/EmployeeManagementSystemNew/getDailyReportGenerationPage.do">Apply for leave</a></li>						    
 						       <li><a href="#/EmployeeManagementSystemNew/getWeeklyReportGenerationPage.do">View leave status</a></li>												       												      
						   </ul>
					</div>
		
			       </div>   <!-- accordion  end -->
	
			  </div>
<!-- two divisions are opened close those two -->