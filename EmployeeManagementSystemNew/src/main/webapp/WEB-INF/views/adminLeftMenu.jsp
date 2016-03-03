
  <title>EMS</title>

   <script src="./jquery/jquery-2.1.4.js"></script>
   <script src="https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js"></script>
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.11/css/jquery.dataTables.min.css">
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
  
  <script src="./JS/AdminLinkControll.js"></script>
  <script src="./JS/MakeLinkAsActive.js "></script>
  <link rel="stylesheet" type="text/css" href="./CSS/LinkStyle.css ">
 
<style>
#page_result_div {
	float: right;
}

#select_div {
	float: right;
}
</style>
</head>
<body>
	<div class="container-fluid ">
		<div class="row headpart">
		<div class="col-sm-2 icon">
            <img src="./images/caprus logo.png" width="65px" height="65px">
		</div>
			<div class="col-sm-8 title_menu text-center">
				<h1 ><b>Employee Management System</b></h1>
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
				
				<div class="modal fade" id="myAlertModel" role="dialog">
			<div class="modal-dialog">
 
				<!-- Modal content-->
 				<div class="modal-content">
 					<!-- <div class="modal-header" style="padding: 35px 50px;"></div> -->
 						<div class="modal-body">
                                     <font color="black"><h3>You did some changes in this page. Do you want to continue...?</h3></font>
                                               </div>
 							<div class="modal-footer">
 								<div align="center">
 									<button 
 										class="btn btn-default  btn-success active"
 									data-dismiss="modal">
 										<span class="glyphicon glyphicon-ok"></span>Yes
 									</button>
 										<button  id="logout_alert_button"
 											class="btn btn-default btn-danger active"
 										>
 										<span class="glyphicon glyphicon-remove"></span>No
 										</button>
 									</div>
 								</div>
 			</div>
 			</div>
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
	    	<li><a  href="#" id="admin-add-employee-link">Add Employee</a></li>
	    	<li><a href="#" id="admin-view-update-emp-link">View/Update Employee</a></li>
	    	<li><a href="#" id="notice-add-link">Update Notice</a></li>
	    	<li><a href="#" id="employee-leave-details-link">Employee Leave Details</a></li>
	    	</ul>
			</div>
			<h3>Reports</h3>
			<div>
						<ul>
							<li><a href="#" id="admin-view-daily-report-link">Daily Reports</a></li>
						</ul>
						<li><a  href="#" id="admin-view-weekly-report-link">Weekly Reports</a></li>
						</ul>
						<li><a  href="#" id="admin-view-monthly-report-link">Monthly Reports</a></li>
						</ul>
						<li><a  href="#" id="admin-view-anual-report-link">Annual Reports</a></li>
						</ul>
					</div>
			<h3>View Attendance</h3>
			<div>
			<ul>
			<li>
			 <a  href="#" id="admin-view-today-attendance-link">Daily Attendance</a></li>
			</ul>
			</div>
			<h3>Productivity</h3>
			<div>
			<ul>
			<li>
			<a  href="#" id="weekly-productivity-link">Weekly Productivity</a></li>
			<li>
			<a href="#" id="monthly-productivity-link">Monthly Productivity</a></li>
			<li>
			<a  href="#"  id="anual-productivity-link">Annual Productivity</a></li>
			</ul>
			</div>
			</div> 
	<!-- </div> -->
			</div>
			<!-- This division is the division on right for display content to show (Right division)-->
			<div class="col-sm-10">