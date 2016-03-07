<!DOCTYPE html>
<html lang="en">
<head>
<title>EMS Admin page</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<script src="FormValidation(js)/jquery.min.js"></script>
<script src="FormValidation(js)/bootstrap.min.js"></script>
<script src="FormValidation(js)/formValidation.js"></script>
<script src="FormValidation(js)/bootstrap.js"></script>
<script src="FormValidation(js)/updateUser.js"></script>
<!-- <script src="FormValidation(js)/jquery.tablesorter.min.js"></script> -->
<script src="FormValidation(js)/jquery-ui.js"></script>


<link rel="stylesheet" href="FormValidation(css)/bootstrap.css">
<link rel="stylesheet" href="FormValidation(css)/formValidation.css">
<link rel="stylesheet" href="FormValidation(css)/updateUser.css">
<link rel="stylesheet" href="FormValidation(css)/jquery-ui.css">
<link rel="stylesheet" href="FormValidation(css)/font-awesome.min.css">
<link rel="shortcut icon" type="image/x-icon" href="images/caprus logo.png" />


<link rel="stylesheet" href="./jquery/jquery-ui.css">
<script src="./jquery/jquery-ui.js"></script>
<link rel="stylesheet" href="./CSS/style.css">


<link rel="stylesheet" href="./sorting/theme.blue.min.css">
<link rel="stylesheet" href="./sorting/theme.default.min.css">
<link rel="stylesheet" href="./sorting/bootstrap.css">


<script src="./sorting/jquery.tablesorter.min.js"></script>
<!-- custom css -->
<script src="./JS/Admin_logout.js"></script>
<link rel="stylesheet" href="./CSS/homepage.css">
<link rel="stylesheet" href="./CSS/header2.css">
<link rel="stylesheet" href="./CSS/footer.css">

  <script src="./JS/AdminLinkControll.js"></script>
  <script src="./JS/MakeLinkAsActive.js "></script>
  <link rel="stylesheet" type="text/css" href="./CSS/LinkStyle.css ">



<script>
	$(function() {
		$("#accordion").accordion();
		$("#printButton").click(function(){
			var divToPrint=document.getElementById("printTable");
			   newWin= window.open("");
			   newWin.document.write("<div style='text-align:center;font-size: 20px'><b>EMPLOYEE DETAILS</b></div>");
			   newWin.document.write("<br><br>");
			   newWin.document.write(divToPrint.outerHTML);
			   newWin.print();
			   newWin.close();
		});
	});
	
</script>
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
				<span class="glyphicon glyphicon-bell"></span>&nbsp;&nbsp;
					<span class="glyphicon glyphicon-cog icon-setting"
						data-toggle="dropdown"></span>
					<ul class="dropdown-menu dropdown-menu-right" id="dropdown">
						<li><a href="/EmployeeManagementSystemNew/getChangePasswordPage.do">Change password</a></li>
						<li><a href="#" id="admin-logout-link">Logout</a></li>
					</ul>
				</div>
			</div>
		</div>

	<!--  Table Body Part -->

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
		</div>
		<div class="col-sm-10">
		<div class="row">
		<div  class="table-responsive">
			<div class="empdetail" align="center">
				<h2>Employee Details</h2>
				</div>
				<hr>
				
				<nav  role="navigation" title="Search">
				<div class="wrapper" >
					<div class="col-sm-4" id="search_div" align="left">
						<form class="navbar-form" role="search">
							<div class="input-group">
								<input type="text" class="form-control" placeholder="Search"
									name="searchFor" id="search">
								<div class="input-group-btn">
									<button class="btn btn-default" type="submit">
										<i class="glyphicon glyphicon-search"></i>
									</button>
								</div>
							</div>
						</form>
					</div>
					<div align="right" id="pagination_div">
				<span class="pagination pagination-lg" id="myPager"></span>
				</div>
					</div>
				</nav> 
				
				
				
				<div id="printTable">
				<table id="table"  border="1"  class="tablesorter ws_data_table table table-hover" >
					<thead  style="color:black" align="left">
						<tr>
							<th height="50">EMPLOYEE ID</th>
							<th height="50">FIRST NAME</th>
							<th height="50">LAST NAME</th>
							<th height="50" data-sorter="false">DATE OF BIRTH</th>
							<th height="50" data-sorter="false">MOBILE NO</th>
							<th height="50" data-sorter="false">EMAIL ID</th>
							<th height="50">DESIGNATION</th>
							<th height="50">ROLE</th>
							<th height="50" data-sorter="false">STATUS</th>
							<th height="50" data-sorter="false">DEPARTMENT</th>
							<th height="50" data-sorter="false">ACTION</th>
						</tr>
					</thead>
				</table>
				</div>
				<div align="center">
				<button id="printButton" class="btn btn-default btn-info active">Print</button>
				</div>
				
				<!-- <div class="col-md-12 text-center">
					<ul class="pagination pagination-lg" id="myPager"></ul>
				</div> -->
				
			</div>
		



			<!-- Modal -->
			<div class="modal fade" id="editEmployeeModal" role="dialog">
				<div class="modal-dialog">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header" style="padding: 35px 50px;">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							<h4 class="modal-title">
								<b>Update Employee of Id</b><br><b><span id="employee-id-header"></span></b>
							</h4>
						</div>
						<div class="modal-body" align="center">
							<form role="form" id="frm" method="post" autocomplete="off" >
								<table>
									<tr>
										<td></td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													<input type="hidden" class="form-control" id="employee-id" />
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>First Name</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													<input type="text" class="form-control" name="firstName"
														id="employee-fname" />
												</div>
											</div>
										</td>

									</tr>
									<tr>
										<td>Last Name</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													<input type="text" class="form-control" name="lastName"
														id="employee-lname" />
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>Date Of Birth</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													<input type="date" class="form-control" name="dob"
														id="employee-dob" />
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>Mobile No</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													<input type="text" class="form-control" name="mobileno"
														id="employee-mobileno" />
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>Email Id</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													<input type="text" class="form-control" name="emailid"
														id="employee-emailid" />
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>Designation</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													<!-- <input type="text" class="form-control" name="designation"
														id="employee-designation" /> -->
														
														<select class="form-control" id="employee-designation">
														
															<option value="Project Manager">Project Manager</option>
														  	<option value="Software Engineer">Software Engineer</option>
														  	<option value="System Architect">System Architect</option>
														   	<option value="Design Engineer">Design Engineer</option>
														   	<option value="Team Lead">Team Lead</option>
														   	<option value="Network Engineer">Network Engineer</option>
														   	<option value="Technical Consultant">Technical Consultant</option>
														   	<option value="Test Lead">Test Lead</option>
														  	<option value="Application Developer">Application Developer</option>
														  	<option value="Software Tester">Software Tester</option>
														  
														</select>
														
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>Role</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													
														<!-- <select id="employee-rollid">
														  <option value="1">Software Engineer</option>
														  <option value="2" >System Analyst</option>
														   <option value="3" >Business Analyst</option>
														   <option value="4" >Technical Support</option>
														   <option value="5" >Network Engineer</option>
														   <option value="6" >Technical Consultant</option>
														   <option value="7" >Technical Sales</option>
														  <option value="8">Web Developer</option>
														  <option value="9">Software Tester</option>
														</select> -->
														
														<select class="form-control" id="employee-rollid">
														 <option value="Admin">Admin</option>
														  <option value="Software Engineer">Software Engineer</option>
														  <option value="System Analyst" >System Analyst</option>
														   <option value="Business Analyst" >Business Analyst</option>
														   <option value="Technical Support" >Technical Support</option>
														   <option value="Network Engineer" >Network Engineer</option>
														   <option value="Technical Consultant" >Technical Consultant</option>
														   <option value="Technical Sales" >Technical Sales</option>
														  <option value="Web Developer">Web Developer</option>
														  <option value="Software Tester">Software Tester</option>
														</select>
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>Status</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
														
														<select class="form-control" id="employee-status">
														  <option value="0">Inactive</option>
														  <option value="1"  selected>Active</option>
														  
														</select>
												</div>
											</div>

										</td>
									</tr>
									<tr>
										<td>Department</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													
														<select class="form-control" id="employee-deptid">
														
														  <!-- <option value="10" selected>Production</option>
														  <option value="11" >Development</option>
														  <option value="12">Testing</option>
														  <option value="13">Sales</option>
														  <option value="14">HRM</option> -->
														   
														   <option value="Production" selected>Production</option>
														  <option value="Development" >Development</option>
														  <option value="Testing">Testing</option>
														  <option value="Sales">Sales</option>
														  <option value="HRM">HRM</option>
														  
														</select>
												</div>
											</div>
											 
											<!-- <div class="form-group">
											      <select class="form-control" id="sel1">
											        <option>1</option>
											        <option>2</option>
											        <option>3</option>
											        <option>4</option>
											      </select>
											   </div> -->


										</td>
									</tr>
								</table>
								<br><br>
								<div class="modal-footer">
								<div align="center">
									<!-- <button type="submit"
										class="btn btn-default  btn-warning active"
										id="">
										<span class="glyphicon glyphicon-lock"></span>Change Password
									</button> -->
									<button type="submit"
										class="btn btn-default  btn-success active"
										id="save-eidit-employee">
										<span class="glyphicon glyphicon-ok"></span>Save Changes
									</button>
									<button type="submit" class="btn btn-default btn-danger active"
										data-dismiss="modal">
										<span class="glyphicon glyphicon-remove"></span>Cancel
									</button>
									</div>
								</div>
							</form>
						</div>

					</div>

				</div>
			</div>
			</div>

           </div>
		</div>

		<!-- footer -->
		<!-- <footer class="container-fluid text-center navbar-fixed-bottom">
			<p>Footer Text</p>
		</footer> -->
		<!-- <footer class="main-footer ems-footer"><div>Copyright © 2005 - 2015 CaprusIT</div><div></footer> -->

		<!-- </div> -->
		</div>
</body>
</html>
