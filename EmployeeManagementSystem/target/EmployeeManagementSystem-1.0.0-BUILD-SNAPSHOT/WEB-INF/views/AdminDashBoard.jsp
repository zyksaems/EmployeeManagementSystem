<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html ng-app="AdminDashBoard">
<head>


<script type="text/javascript" src="angularJs/angular.js"></script>
<script type="text/javascript" src="js/AdminDashBoard.js"></script>
<link rel="stylesheet" href="css/ADminDashBoard.css">
<link rel="stylesheet" href="css/Admin_addEmployeeDetails.css">
<title>Admin Dash Board</title>
<style type="text/css">

	.tbl {width: 940px;}
    .tbl tr {background-color:white; height: 10px}
    .tbl tr:hover {background-color:#c8c8c8;}

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
  <li>
  Manage Employee
   <nav id="nav1">
   <ul id="manageUserList">
    <a href="" ng-click="addEmployeeDetails()">Add Employee</a><br><br>
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
      <a href="">daily</a>
      <a href="">weekly</a>
      <a href="">monthly</a>
      <a href="">yearly</a>
      </ul>
      <div>
      <a href="/EmployeeManagementSystem/changePassword.do"><span style="color:green"><h3>change password</h3></span></a>
      </div>
      <li><button ng-click="logout()">Sign-out</button></li>
     </nav>
   </nav>  
 </div>
</div>

<div id="section" ng-show="showAddEmployeeMainDiv">
         <div id="importEmployeeDataDiv">
              <p id="AddEmpText" >Add Employee(s)</p>              
              <Button id="excelbutton" ng-click="showFromExcelDiv()">From Excel File</Button>
              <Button id="manualButton" ng-click="showAddEmployeeDiv()">By Single User</Button>       
        </div>
        
        <div id="fromExcelDiv" ng-show="showExcelDiv">
        
              <p id="excelDivText">Select Excel File Location</p>
              <input type="file" ng-model="excelFilePath" onchange="angular.element(this).scope().file_changed(this)" id="excelFile" value="Browse" />              
              <button id="uploadButton" ng-click="uploadFile()">Upload</button>
              <p id="EmployeeSuccessMsg">{{fileUploadSuccessMsg}}</p>
        </div>
        
         <div id="ManuallyEnterDiv" ng-show="showManuallyEnterDiv">
             <p id="excelDivText">Enter Employee Details</p>
             <form id="addEmployeeForm">
             
             
                 <label id="empText">Employee Id:</label><br><input type="text" id="empTextBox" autocomplete="off" ng-model="empId" required><span id="star">*</span><br>
                 <label id="empText">First Name:</label><br><input type="text" id="empTextBox" ng-model="empFirstName" required><span id="star">*</span><br>
                 <label id="empText">Last Name:</label><br><input type="text" id="empTextBox" ng-model="empLastName" required><span id="star">*</span><br>
                 <label id="empText">Date of Birth:</label><br><input type="date" id="empTextBox" ng-model="DOB" required><span id="star">*</span><br>
                 <label id="empText">Mobile No:</label><br><input type="text" id="empTextBox" ng-model="mobile" required><span id="star">*</span><br>
                 <label id="empText">Email ID:</label><br><input type="email" id="empTextBox" ng-model="emailId" required><span id="star">*</span><br>
                 <label id="empText">Designation:</label><br><input type="text" id="empTextBox" ng-model="designation" required><br>
                 <label id="empText">Role ID:</label><br><input type="text" id="empTextBox" ng-model="roleId" required><br>
                 <label id="empText">Department ID:</label><br><input type="text" id="empTextBox" ng-model="deptId" required><span id="star">*</span><br>
                 
                 <button id="submitButton" ng-click="addEmployee()">Add Employee</button>
             </form>
             <span id="EmployeeSuccessMsg">{{addEmployeeSuccessMsg}}</span></div>
        </div>
<div id="section" ng-show="viewUserDetails">

		<div align="center"><span style="color:black"><h3>User Details</h3></span></div>
		
		<table class="tbl">
			<th>Employee Id</th>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Date Of Birth</th>
			<th>mobile No</th>
			<th>Email Id</th>
			<th>Designation</th>
			<th>Role Id</th>
			<th>Status</th>
			<th>Dept. Id</th>
		<tr ng-repeat="emp in allEmpData">
			<td>{{emp.employeeId}}</td>
			<td>{{emp.firstName}}</td>
			<td>{{emp.lastName}}</td>
			<td>{{emp.dob}}</td>
			<td>{{emp.mobileNo}}</td>
			<td> {{emp.emailId}}</td>
			<td>{{emp.designation}} </td>
			<td> {{emp.rollId}}</td>
			<td> {{emp.status}} </td>
			<td> {{emp.deptId}} </td>
		</tr> 
		</table> 
	
	
	</div>
        
	</div>

	<div id="footer">
		Copyright © caprusit.com
	</div>
</div>
</body>
</html>