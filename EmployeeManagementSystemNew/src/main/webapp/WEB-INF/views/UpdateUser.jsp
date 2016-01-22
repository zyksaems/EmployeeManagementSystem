<!DOCTYPE html>
<html lang="en">
<head>
<title>EMS home page</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<script src="FormValidation(js)/jquery.min.js"></script>
<script src="FormValidation(js)/bootstrap.min.js"></script>
<script src="FormValidation(js)/formValidation.js"></script>
<script src="FormValidation(js)/bootstrap.js"></script>
<script src="FormValidation(js)/updateUser.js"></script>
<script src="FormValidation(js)/jquery.tablesorter.min.js"></script>
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


<!-- custom css -->

<link rel="stylesheet" href="./CSS/homepage.css">
<link rel="stylesheet" href="./CSS/header2.css">
<link rel="stylesheet" href="./CSS/footer.css">



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
				<h1 align="right">EMPLOYEE MANAGEMENT SYSTEM</h1>
			</div>
			<div class="col-sm-2">
				<div class="dropdown">
					<span class="glyphicon glyphicon-cog icon-setting"
						data-toggle="dropdown"></span>
					<ul class="dropdown-menu dropdown-menu-right" id="dropdown">
						<li><a href="#" id="admin-profile-link">Profile</a></li>
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
						<li><a href="/EmployeeManagementSystemNew/getAddEmployeePage.do" id="admin-add-employee-link">Add Employee</a></li>
						<li><a href="/EmployeeManagementSystemNew/ViewUser.do"
							id="admin-add-employee-link">View/Update Employee</a></li>
					</ul>
				</div>
				<h3>Reports</h3>
				<div>
					<ul>
						<li><a href="/EmployeeManagementSystemNew/getDailyReportGenerationPage.do">Daily Reports</a></li>
					</ul>
					<ul>
						<li><a href="/EmployeeManagementSystemNew/getWeeklyReportGenerationPage.do">Weekly Reports</a></li>
					</ul>
					<ul>
						<li><a href="/EmployeeManagementSystemNew/getMonthlyReportGenerationPage.do">Monthly Reports</a></li>
					</ul>
					<ul>
						<li><a href="/EmployeeManagementSystemNew/getAnnuallyReportGenerationPage.do">annually Reports</a></li>
					</ul>
				
				</div>
				<h3>View Attendance</h3>
				<div>
					<ul>
						<li><a href="/EmployeeManagementSystemNew/getTodayAttendancePage.do" id="daily-attendance-link">Daily
								Attendance</a></li>
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
			<a href="/EmployeeManagementSystemNew/getAnnualProductivityPage.do"  id="anual-productivity-link">Annually Productivity</a></li>
					</ul>
				</div>
			</div>
		</div>
		
		<div style="overflow-x: auto;" class="table-responsive">
			<div class="empdetail" align="center">
				<h2>Employee Details</h2>
				</div>
				<hr>
				<nav  role="navigation" title="Search">

					<div class="col-sm-11 col-md-11" align="left">
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
					</div><button id="printButton" class="btn btn-default btn-info active">Print</button>
				</nav>
				<div id="printTable">
				<table id="table"  border="1"  class="tablesorter ws_data_table table table-hover" >
					<thead  style="color:balck">
						<tr>
							<th><b>EMPLOYEE ID</b></th>
							<th><b>FIRST NAME</b></th>
							<th><b>LAST NAME</b></th>
							<th><b>DATE OF BIRTH</b></th>
							<th><b>MOBILE NO</b></th>
							<th><b>EMAIL ID</b></th>
							<th><b>DESIGNATION</b></th>
							<th><b>ROLE ID</b></th>
							<th><b>STATUS</b></th>
							<th><b>DEPARTMANT ID</b></th>
							<th><b>ACTION</b></th>
						</tr>
					</thead>
				</table>
				</div>
				<div class="col-md-12 text-center">
					<ul class="pagination pagination-lg pager" id="myPager"></ul>
				</div>
				
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
													<input type="text" class="form-control" name="designation"
														id="employee-designation" />
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>Role Id</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													<input type="text" class="form-control" name="rollid"
														id="employee-rollid" />
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td>Status</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													<input type="text" class="form-control" name="status"
														id="employee-status" />
												</div>
											</div>

										</td>
									</tr>
									<tr>
										<td>Department</td>
										<td>
											<div class="form-group">
												<div class="col-sm-14">
													<input type="text" class="form-control" name="deptid"
														id="employee-deptid" />
												</div>
											</div>

										</td>
									</tr>
								</table>
								<br><br>
								<div class="modal-footer">
								<div align="center">
									<button type="submit"
										class="btn btn-default  btn-info active"
										id="save-eidit-employee">
										<span class="glyphicon glyphicon-off"></span>Save Changes
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

		<!-- footer -->
		<!-- <footer class="container-fluid text-center navbar-fixed-bottom">
			<p>Footer Text</p>
		</footer> -->
		<!-- <footer class="main-footer ems-footer"><div>Copyright © 2005 - 2015 CaprusIT</div><div></footer> -->

		<!-- </div> -->
		</div>
</body>
</html>
