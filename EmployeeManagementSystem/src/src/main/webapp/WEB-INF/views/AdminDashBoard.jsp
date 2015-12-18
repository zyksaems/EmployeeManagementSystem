<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html ng-app="AdminDashBoard">
<head>

<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.js"></script>
<script
	src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular-animate.js"></script>
<script
	src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.14.3.js"></script>
<!--  <script src="/EmployeeManagementSystem/js/example.js"></script> -->
<link
	href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"
	rel="stylesheet">
<!-- <script type="text/javascript" src="js/dirPagination.js"></script> -->


<script type="text/javascript" src="angularJs/angular.js"></script>
<script type="text/javascript" src="js/AdminDashBoard.js"></script>
<link rel="stylesheet" href="css/ADminDashBoard.css">
<link rel="stylesheet" href="css/Admin_addEmployeeDetails.css">
<title>Admin Dash Board</title>
<style type="text/css">
.tbl {
	width: 940px;
}

.tbl tr {
	background-color: white;
	height: 10px
}

.tbl tr:hover {
	background-color: #c8c8c8;
}

table, td, th {
	border: 1px solid green;
}

th {
	background-color: green;
	color: white;
}
</style>


</head>

<body ng-controller="AdminDashBoardController">
	<div id="container">
		<div id="header">
			<h1>Admin Dashboard</h1>
		</div>
		<div id="nav">
			<li>Manage Employee <nav id="nav1">
				<ul id="manageUserList">
					<a href="" ng-click="addEmployeeDetails()">Add Employee</a>
					<br>
					<br>
					<a href="" ng-click="viewUser()">View User</a>
				</ul>
				</nav>
			</li>
			<li>Reports</li>
			<li><a href="">All</a></li>
			<nav id="nav1">
			<li>Single User</li>
			<nav id="nav1">
			<ul>
				<li><a href="">Daily</a></li>
				<br>
				<li><a href="">Weekly</a></li>
				<br>
				<li><a href="">Monthly</a></li>
				<br>
				<li><a href="">Annually</a></li>
				<br>
			</ul>
			<li><button ng-click="getChange()">Change Password</button></li>
			<br>
			<br>
			<li><button ng-click="logout()">Sign-out</button></li>
			</nav> </nav>
		</div>
	</div>

	<div id="" aling="left">
		<a href="/EmployeeManagementSystem/generateReportHome.do">GenerateReport</a>
	</div>

	<div id="section" ng-show="showAddEmployeeMainDiv">
		<div id="importEmployeeDataDiv">
			<p id="AddEmpText">Add Employee(s)</p>
			<Button id="excelbutton" ng-click="showFromExcelDiv()">From
				Excel File</Button>
			<Button id="manualButton" ng-click="showAddEmployeeDiv()">By
				Single User</Button>
		</div>

		<div id="fromExcelDiv" ng-show="showExcelDiv">

			<p id="excelDivText">Select Excel File Location</p>
			<input type="file" ng-model="excelFilePath"
				onchange="angular.element(this).scope().file_changed(this)"
				id="excelFile" value="Browse" />
			<button id="uploadButton" ng-click="uploadFile()">Upload</button>
			<p id="EmployeeSuccessMsg">{{fileUploadSuccessMsg}}</p>
		</div>

		<div id="ManuallyEnterDiv" ng-show="showManuallyEnterDiv">
			<p id="excelDivText">Enter Employee Details</p>
			<form id="addEmployeeForm">


				<label id="empText">Employee Id:</label><br> <input type="text"
					id="empTextBox" autocomplete="off" ng-model="empId" required>
				<span id="star">*</span><br> <label id="empText">First
					Name:</label><br> <input type="text" id="empTextBox"
					ng-model="empFirstName" required><span id="star">*</span><br>
				<label id="empText">Last Name:</label><br> <input type="text"
					id="empTextBox" ng-model="empLastName" required><span
					id="star">*</span><br> <label id="empText">Date of
					Birth:</label><br> <input type="date" id="empTextBox" ng-model="DOB"
					required><span id="star">*</span><br> <label
					id="empText">Mobile No:</label><br> <input type="text"
					id="empTextBox" ng-model="mobile" required><span id="star">*</span><br>
				<label id="empText">Email ID:</label><br> <input type="email"
					id="empTextBox" ng-model="emailId" required><span id="star">*</span><br>
				<label id="empText">Designation:</label><br> <input type="text"
					id="empTextBox" ng-model="designation" required><br> <label
					id="empText">Role ID:</label><br> <input type="text"
					id="empTextBox" ng-model="roleId" required><br> <label
					id="empText">Department ID:</label><br> <input type="text"
					id="empTextBox" ng-model="deptId" required><span id="star">*</span><br>

				<button id="submitButton" ng-click="addEmployee()">Add
					Employee</button>
			</form>
			<span id="EmployeeSuccessMsg">{{addEmployeeSuccessMsg}}</span>
		</div>
	</div>
	<div id="tableSection" ng-show="viewUserDetails">
		<!-- <center>
			<input type="text" ng-model="search" class="form-control">
		</center>

		<div align="center">
			<span style="color: black"><h3>User Details</h3></span>
		</div>
		show:<select ng-model="itemsPerPage"
			         ng-change="changePaginationDisplayResults()">
			<option selected="true">3</option>
			<option>25</option>
			<option>50</option>
		</select> -->
		<form class="form-inline">
			<div class="form-group">
				<label>Search</label> <input type="text" ng-model="search"
					class="form-control" placeholder="Search">
			</div>
		</form>

		View <select ng-model="viewby" ng-change="setItemsPerPage(viewby)">
			<option>5</option>
			<option>10</option>
			<option>20</option>
			<option>30</option>
			<option>40</option>
			<option>50</option>
		</select> records at a time.



		<table class="tbl">
			<thead>
				<tr>
					<th ng-click="sort('id')">Employee Id <span
						class="glyphicon sort-icon" ng-show="sortKey=='id'"
						ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
					</th>
					<th ng-click="sort('first_name')">First Name <span
						class="glyphicon sort-icon" ng-show="sortKey=='first_name'"
						ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
					</th>
					<th ng-click="sort('last_name')">Last Name <span
						class="glyphicon sort-icon" ng-show="sortKey=='last_name'"
						ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
					</th>
					<th ng-click="sort('dob')">Date Of Birth <span
						class="glyphicon sort-icon" ng-show="sortKey=='dob'"
						ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
					</th>
					<th ng-click="sort('mob')">Mobile No <span
						class="glyphicon sort-icon" ng-show="sortKey=='mob'"
						ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
					</th>
					<th ng-click="sort('email')">Email Id <span
						class="glyphicon sort-icon" ng-show="sortKey=='email'"
						ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
					</th>
					<th ng-click="sort('des')">Designation <span
						class="glyphicon sort-icon" ng-show="sortKey=='des'"
						ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
					</th>
					<th ng-click="sort('role')">Role Id <span
						class="glyphicon sort-icon" ng-show="sortKey=='role'"
						ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
					</th>
					<th ng-click="sort('status')">Status <span
						class="glyphicon sort-icon" ng-show="sortKey=='status'"
						ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
					</th>
					<th ng-click="sort('dept')">Department Id <span
						class="glyphicon sort-icon" ng-show="sortKey=='dept'"
						ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
					</th>
				</tr>
			</thead>

			<!-- <tr dir-paginate="emp in allEmpData|filter:search|orderBy:sortKey:reverse|itemsPerPage:5"> -->
			<tr
				ng-repeat="emp in allEmpData.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage)) | filter:search|orderBy:sortKey:reverse"">
				<td>{{emp.employeeId}}</td>
				<td>{{emp.firstName}}</td>
				<td>{{emp.lastName}}</td>
				<td>{{emp.dob | date:'mm/dd/yyyy'}}</td>
				<td>{{emp.mobileNo}}</td>
				<td>{{emp.emailId}}</td>
				<td>{{emp.designation}}</td>
				<td>{{emp.rollId}}</td>
				<td>{{emp.status}}</td>
				<td>{{emp.deptId}}</td>
			</tr>
		</table>

	</div>
	<!--  <dir-pagination-controls max-size="5" 
															direction-links="true"
															boundary-links="true"> </dir-pagination-controls> -->
	<pagination total-items="totalItems" ng-model="currentPage"
		max-size="maxSize" class="pagination-sm" boundary-links="true"
		rotate="false" num-pages="numPages" items-per-page="itemsPerPage"></pagination>
	<p>Page: {{currentPage}} / {{numPages}}</p>



	<button id="submitExcelButton" ng-click="showExcel()">Excel
		View</button>



	<!-- <br> <input type=button value="Export Table"
			onClick="TableToExcel()">
	
	<script Language="javascript">

		function TableToExcel() {
			var strCopy = document.getElementById("tableSection").innerHTML;
			console.log ( strCopy );

			window.clipboardData.setData("Text", strCopy);
			var objExcel = new ActiveXObject("Excel.Application");
			objExcel.visible = true;
			/* var excBook = objWorksheet.Workbooks.open("f:\\test.xls"); */
			var objWorkbook = objExcel.Workbooks.Add;
			var objWorksheet = objWorkbook.Worksheets(1);
			objWorksheet.Paste;
			
		}
	</script> -->


	<div id="footer">Copyright © caprusit.com</div>

</body>
</html>