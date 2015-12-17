<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html ng-app="myApp">
<head>
<title>Employee Details</title>



<script src="<c:url value='/resources/angular.js'/>"></script>
<script src="<c:url value='/resources/jquery-2.1.4.js'/>"></script>
<script src="<c:url value='/resources/app.js' />"></script>
<script src="<c:url value='/resources/bootstrap/js/bootstrap.js' />"></script>
 <script src="<c:url value='/resources/service/user_service.js' />"></script>
<script src="<c:url value='/resources/controller/user_controller.js' />"></script>
<script src="<c:url value='/resources/angular-animate.js'/>"></script>
<script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.14.3.js"></script>

<link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap.css'/>">
<link rel="stylesheet" href="<c:url value='/resources/bootstrap/css/bootstrap-theme.css'/>">
<link rel="stylesheet" href="<c:url value='/resources/app.css'/>">
<link rel="stylesheet" href="<c:url value='/resources/bootstrap/font-awesome.min.css'/>">

<!-- <script src="./resources/angular.js"></script>
    <script src="./resources/ui-bootstrap-tpls-0.14.3.min.js"></script>
    <script src="./resources/angular-animate.js"></script>https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-animate.min.js
    <script src="./resources/ui-attendanceForm.js"></script>
    
     
    <link href="./resources/bootstrap.min.css" rel="stylesheet">
    <link href="./resources/AdminDashboard.css" rel="stylesheet">
    <link href="./resources/AdminLogin.css" rel="stylesheet">
    <link href="./resources/AttendanceForm.css" rel="stylesheet">
     <link href="./resources/alert.css" rel="stylesheet">
    <link rel="shortcut icon" type="image/x-icon" href="images/faviconlogo.png"/>
    
    
    <link rel="stylesheet" href="./resources/Admin_addEmployeeDetails.css">
    
    for data tables 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.js"></script>
    <script src="./resources/jquery.dataTables.min.js"></script>
    <script src="angularJs/angular-resource.min.js"></script>
    <script src="./resources/angular-datatables.min.js"></script>
    <script src="./resources/angular-datatables.bootstrap.min.js"></script>
    <script src="./resources/bootstrap.min.js"></script> 
    <script src="./resources/alert.js"></script>
    <link rel="stylesheet" href="./resources/datatables.bootstrap.min.css"> -->
	
	
</head>
<body class="ng-cloak">
	<div class="generic-container" ng-controller="UserController as ctrl">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead"><b><center>Employee Registration Block</center></b></span>
			</div>
			<div class="formcontainer">
				<form ng-submit="ctrl.submit()" name="myForm" class="form-horizontal">
					<input type="hidden" ng-model="ctrl.user.employeeId" />

						<div class="row">
							<div class="form-group col-md-12">
								<label class="col-md-2 control-lable" for="file">Employee Id</label>
									<div class="col-md-7">
										<input type="text" ng-model="ctrl.user.employeeId"
												ng-readonly="ctrl.user.employeeId" name="employeeId"
												class="form-control input-sm"
												placeholder="Enter Your EmployeeId" maxlength="6" />
									</div>
							</div>
						</div>



					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-lable" for="file">First
								Name</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.firstName"
									name="firstName" class="username form-control input-sm"
									placeholder="Enter Your First name" required maxlength="50" />
								<!-- <div class="has-error" ng-show="myForm.$dirty">
                                      <span ng-show="myForm.uname.$error.required">This is a required field</span>
                                      <span ng-show="myForm.uname.$error.minlength">Minimum length required is 3</span>
                                      <span ng-show="myForm.uname.$invalid">This field is invalid </span>
                                  </div> -->
							</div>
						</div>
					</div>



					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-lable" for="file">Last
								Name</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.lastName" name="lastName"
									class="username form-control input-sm"
									placeholder="Enter Your Last Name" required maxlength="50" />
								<!-- <div class="has-error" ng-show="myForm.$dirty">
                                      <span ng-show="myForm.uname.$error.required">This is a required field</span>
                                      <span ng-show="myForm.uname.$error.minlength">Minimum length required is 3</span>
                                      <span ng-show="myForm.uname.$invalid">This field is invalid </span>
                                  </div> -->
							</div>
						</div>
					</div>

					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-lable" for="file">D.O.B.</label>
							<div class="col-md-7">
								<input type="date" ng-model="ctrl.user.dob" name="dob"
									class="form-control input-sm" placeholder="Enter Your DOB."
									required />
							</div>
						</div>
					</div>

					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-lable" for="file">Mobile
								No</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.mobileNo" name="mobileNo"
									class="form-control input-sm"
									placeholder="Enter Your Mobile No" maxlength="10" />
							</div>
						</div>
					</div>

					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-lable" for="file">Email</label>
							<div class="col-md-7">
								<input type="email" ng-model="ctrl.user.emailId" name="emailId"
									class="email form-control input-sm"
									placeholder="Enter Your Email" required maxlength="50" />
								<div class="has-error" ng-show="myForm.$dirty">
									<span ng-show="myForm.email.$error.required">This is a
										required field</span> <span ng-show="myForm.email.$invalid">This
										field is invalid </span>
								</div>
							</div>
						</div>
					</div>


					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-lable" for="file">Designation</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.designation"
									name="designation" class="form-control input-sm"
									placeholder="Enter Your Designation" maxlength="30" />
							</div>
						</div>
					</div>


					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-lable" for="file">Role Id</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.rollId" name="rollId"
									class="form-control input-sm" placeholder="Enter Your Role Id"
									maxlength="2" />
							</div>
						</div>
					</div>

					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-lable" for="file">Status</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.status" name="status"
									class="form-control input-sm" placeholder="Enter Your Status"
									maxlength="1" />
							</div>
						</div>
					</div>

					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-lable" for="file">Department
								Id</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.deptId" name="deptId"
									class="form-control input-sm"
									placeholder="Enter Your Department Id" maxlength="6" />
							</div>
						</div>
					</div>

					<div class="row">
						<div class="form-actions floatRight">
							<input type="submit"
								value="{{!ctrl.user.employeeId ? 'Update' : 'Update'}}"
								class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid">
							<button type="button" ng-click="ctrl.reset()"
								class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset
								Form</button>
						</div>
					</div>
				</form>
			</div>
		</div>

		<div>

			<input type="search" ng-model="id" class="form-control"
				placeholder="Search"> <img src="images/search_1.png"
				width="32" height="32">

		</div>


		<div class="panel panel-default">
			<!-- Default panel contents -->
			<div class="panel-heading">
				<span class="lead"><b><center>List of Employees</center></b> </span>
				
				<br>
				<div style="text-align:left">
				<b>View</b> 
				<select ng-model="viewby" ng-change="setItemsPerPage(viewby)">
					<option>5</option>
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
				</select><b>Records<b>
				</div>
				<div style="text-align: right">
				<uib-pagination total-items="totalItems" ng-model="currentPage"
					max-size="maxSize" class="pagination-sm" boundary-links="true"
					rotate="false" num-pages="numPages" items-per-page="itemsPerPage">
				</uib-pagination>
				</div>
			</div>

			<div class="tablecontainer" id="printview">

				<table class="table table-hover">
					<thead>
						<tr>
							<th ng-click="sort('employeeId')">Employee Id <span
								class="glyphicon sort-icon" ng-show="sortKey=='employeeId'"
								ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
							</th>
							<th ng-click="sort('firstName')">First Name <span
								class="glyphicon sort-icon" ng-show="sortKey=='firstName'"
								ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
							</th>
							<th ng-click="sort('lastName')">Last Name <span
								class="glyphicon sort-icon" ng-show="sortKey=='lastName'"
								ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
							</th>
							<th ng-click="sort('dob')">Date Of Birth <span
								class="glyphicon sort-icon" ng-show="sortKey=='dob'"
								ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
							</th>
							<th ng-click="sort('mobileNo')">Mobile No <span
								class="glyphicon sort-icon" ng-show="sortKey=='mobileNo'"
								ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
							</th>
							<th ng-click="sort('emailId')">Email Id <span
								class="glyphicon sort-icon" ng-show="sortKey=='emailId'"
								ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
							</th>
							<th ng-click="sort('designation')">Designation <span
								class="glyphicon sort-icon" ng-show="sortKey=='designation'"
								ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
							</th>
							<th ng-click="sort('rollId')">Role Id <span
								class="glyphicon sort-icon" ng-show="sortKey=='rollId'"
								ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
							</th>
							<th ng-click="sort('status')">Status <span
								class="glyphicon sort-icon" ng-show="sortKey=='status'"
								ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
							</th>
							<th ng-click="sort('deptId')">Department Id <span
								class="glyphicon sort-icon" ng-show="sortKey=='deptId'"
								ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="u in ctrl.users.slice(((currentPage-1)*itemsPerPage),((currentPage)*itemsPerPage)) |orderBy:sortKey:reverse| filter:id ">
							<td><span>{{u.employeeId}}</span></td>
							<td><span>{{u.firstName}}</span></td>
							<td><span>{{u.lastName}}</span></td>
							<td><span>{{u.dob| date:'MM/dd/yyyy'}}</span></td>
							<td><span>{{u.mobileNo}}</span></td>
							<td><span>{{u.emailId}}</span></td>
							<td><span>{{u.designation}}</span></td>
							<td><span>{{u.rollId}}</span></td>
							<td><span>{{u.status}}</span></td>
							<td><span>{{u.deptId}}</span></td>
							<td>
									<button type="button" ng-click="ctrl.edit(u.employeeId)"
										class="btn btn-success custom-width">Edit
									</button>
							</td>
						</tr>
					</tbody>
				</table>
				<p>Page: {{currentPage}} / {{numPages}}</p>
				<div align="center">
				 	<button class="btn btn-primary btn-sm custom-width" ng-click="printDiv('printview');">Print</button>
					<button class="btn btn-primary btn-sm custom-width" ng-click="goBack()">Go Back</button>
				<div>
			</div>
		</div>
	</div>
</div>
</div>
</body>
</html>