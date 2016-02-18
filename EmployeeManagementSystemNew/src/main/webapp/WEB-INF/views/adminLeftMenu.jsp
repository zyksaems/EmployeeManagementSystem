
  <title>EMS</title>

   <script src="./jquery/jquery-2.1.4.js"></script>
   <script src="./jquery/jquery-ui.js"></script>
   <script src="./bootstrap/bootstrap.min.js"></script> 
   
  <link rel="stylesheet"  href="./bootstrap/bootstrap.min.css">
  <link rel="stylesheet"  href="./jquery/jquery-ui.css">
  
  <link rel="stylesheet" href="./CSS/AdminTemplete.css"> 
  <link rel="stylesheet" type="text/css" href="./CSS/style.css">
  
  <link rel="shortcut icon" type="image/x-icon" href="./images/caprus logo.png" />
    
  <script src="./JS/Admin_logout.js"></script>
  <script src="./JS/autoCompleteEmployeeId.js"></script>
  <script src="./JS/AdminTemplete.js"></script>
 

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
			<h3 style="">Manage Employee</h3>
	    	<div>
	    	<ul>
	    	<li><a href="/EmployeeManagementSystemNew/getAddEmployeePage.do" id="admin-add-employee-link">Add Employee</a></li>
	    	<li><a href="/EmployeeManagementSystemNew/ViewUser.do" id="admin-view-update-emp-link">View/Update Employee</a></li>
	    	</ul>
			</div>
			<h3>Reports</h3>
			<div>
						<ul>
							<li><a href="/EmployeeManagementSystemNew/getDailyReportGenerationPage.do">Daily Reports</a></li>
						</ul>
						<li><a href="/EmployeeManagementSystemNew/getWeeklyReportGenerationPage.do">Weekly Reports</a></li>
						</ul>
						<li><a href="/EmployeeManagementSystemNew/getMonthlyReportGenerationPage.do">Monthly Reports</a></li>
						</ul>
						<li><a href="/EmployeeManagementSystemNew/getAnnuallyReportGenerationPage.do">Annual Reports</a></li>
						</ul>
					</div>
			<h3>View Attendance</h3>
			<div>
			<ul>
			<li>
			<a href="/EmployeeManagementSystemNew/getTodayAttendancePage.do" id="daily-attendance-link">Daily Attendance</a></li>
			<!-- <li>
			<a href="#" id="weekly-productivity-link">Weekly Attendance</a></li>
			<li>
			<a href="#" id="monthly-productivity-link">Monthly Attendance</a></li> -->
			</ul>
			</div>
			<h3>Productivity</h3>
			<div>
			<ul>
			<li>
			<a href="/EmployeeManagementSystemNew/getWeeklyProductivityPage.do" id="weekly-productivity-link">Weekly Productivity</a></li>
			<li>
			<a href="/EmployeeManagementSystemNew/getMonthlyProductivityPage.do" id="monthly-productivity-link">Monthly Productivity</a></li>
			<li>
			<a href="/EmployeeManagementSystemNew/getAnnualProductivityPage.do"  id="anual-productivity-link">Annual Productivity</a></li>
			</ul>
			</div>
			</div> 
	<!-- </div> -->
			</div>
			<!-- This division is the division on right for display content to show (Right division)-->
			<div class="col-sm-10">