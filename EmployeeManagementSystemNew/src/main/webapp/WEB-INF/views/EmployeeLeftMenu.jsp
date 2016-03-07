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
   <link rel="stylesheet" href="./CSS/EmployeeDashBoardCss.css">  
  <link rel="stylesheet" type="text/css" href="./CSS/style.css"> 
  
  <link rel="shortcut icon" type="image/x-icon" href="./images/caprus logo.png" />
    
  <script src="./JS/Admin_logout.js"></script>  
  
  <script src="./JS/EmployeeLinksControll.js "></script>
  <script src="./JS/MakeLinkAsActive.js "></script> 
  <link rel="stylesheet" type="text/css" href="./CSS/LinkStyle.css ">

</head>
<body>

     <div class="container-fluid ">
      	<div class="row headpart">
		     <div class="col-sm-2 icon">
                 <img src="./images/caprus logo.png" width="65px" height="65px">
		     </div>
			 <div class="col-sm-7 title_menu text-center">
				<h1 ><b>Employee Management System</b></h1>
			 </div>
			<div class="col-sm-3" id="loggedout_div">
				<div class="employee_dropdown">
					<span class="logged_out_name_css"
						data-toggle="dropdown"><p id="loggedout_employee-name" class="glyphicon glyphicon-collapse-down"></p></span>
					<ul class="dropdown-menu dropdown-menu-right" id="dropdown_emp">
						<!-- <li><a href="#" id="admin-profile-link">Profile</a></li> -->
						<li><a href="/EmployeeManagementSystemNew/getEmployeeChangePasswordPage.do">Change password</a></li>
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
	    	                  <li ><a href="#" id="view-employee-weekly-attendance-link">View weekly attendance details</a></li>
	    	                  <li><a href="#" id="view-employee-monthly-attendance-link">View monthly attendance details</a></li>
	    	                  <li><a href="#" id="view-employee-annual-attendance-link">View annual attendance details</a></li>
	    	               </ul>
			            </div>
			            <h3>Leave</h3>
			            <div>
						    <ul>
						     <li><a href="/EmployeeManagementSystemNew/viewEmployeeLeave.do">View leaves</a></li>
							   <li><a href="/EmployeeManagementSystemNew/applyForLeave.do">Apply for leave</a></li>					    
 						       <li><a href="#/EmployeeManagementSystemNew/getWeeklyReportGenerationPage.do">View leave status</a></li>												       												      
						   </ul>
					</div>
		
			       </div>   <!-- accordion  end -->
	
			  </div>
<!-- two divisions are opened close those two -->