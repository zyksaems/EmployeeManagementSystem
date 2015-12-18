<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Caprus IT Employee Attendance Records</title>
<script data-require="angular.js@1.3.9" data-semver="1.3.9"
	src="https://code.angularjs.org/1.3.9/angular.js"></script>
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css" />
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.js"></script>
<script
	src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular-animate.js"></script>
<script
	src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.14.3.js"></script>
<!--  <script src="example.js"></script> -->
<link
	href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"
	rel="stylesheet">
<script src="angularJs/angular.js"></script>	
<link rel="stylesheet" type="text/css" href="css/GenerateReport.css">
<script src="js/GenerateReport.js"></script>

<%
	Integer id = (Integer) request.getSession().getAttribute("employeeId");
%>

<%
	String name = (String) request.getSession().getAttribute("EmployeeName");
%>

<%
	String designation = (String) request.getSession().getAttribute("designation");
%>


</head>
<body ng-app="myapp" ng-controller="myctrl as my">
	<div id="d1">
		<h2>Caprus IT Staff Attendance Report</h2>
	</div>
	<div id="searchcriteria">
		<h4>
			<b>Search criteria</b>
		</h4>
	</div>
	<br>
	<label class='control-label'>Select type :</label>
	<select ng-model="sel" ng-change="getDis()" placeholder="select">
		<option title="" value="">--Select--</option>
		<option value="single">Single</option>
		<option value="all">All</option>
	</select>&nbsp;&nbsp;
	<input type="text" ng-model="id"
		uib-typeahead="state for state in employeeids |filter:id"
		placeholder="search employee by id/name" ng-disabled="f1"
		ng-keyup="my.getCheck()">&nbsp;&nbsp;
	<label class='control-label'>Select Report type :</label>
	<select ng-model="sel1" ng-change="getStatu()">
		<option title="" value="">--Select Report Type--</option>
		<option value="none">Total Records</option>
		<option value="day">Day</option>
		<!-- <option value="week">Week</option>
		<option value="month">Month</option>
		<option value="annual">Annual</option> -->
		<option value="dates">Select From and To Date</option>
	</select>&nbsp;
	<p ng-hide="hide11">From Date</p>
	<input type="date" ng-model="from" ng-hide="hide11">&nbsp;
	<p ng-hide="hide12">To Date</p>
	<input type="date" ng-model="to" ng-hide="hide12">
	<button class='btn btn-primary' ng-click="my.getAttendance()">submit</button>
	<div  id="fixed" class="btn-group"  uib-dropdown uib-keyboard-nav>
	<p  id="simple-btn-keyboard-nav" uib-dropdown-toggle><b>Productivity Info</b></p>
	<p id="production"  class="uib-dropdown-menu" role="menu" aria-labelledby="simple-btn-keyboard-nav">
	user : Admin,EMS<br />
	Total Company Worked Hours: {{totalhours}} hr<br />
	Worked Hours : {{selectedhours}} hr  
	</p>
	</div>
	<div id="searchcriteria">
		<h4>
			<b>Search Results</b>
		</h4>
	</div>
	<div id="main">
		<p ng-hide="hide4" align="center"><font size='4' color={{color1}}>No Matches Found</font></p>
		<div id="pdiv">
			<div ng-hide="res">
				<font color="red">{{result}}</font>
			</div>
			<div ng-hide="hide1" id="nameofemp">
				<ul>
					<li>Employee Id</li>
					<li>Employee Name</li>
					<li>Employee Designation</li>
				</ul>
			</div>
			<div ng-hide="hide1" id="nameofemp1">
				<ul id="ul1">
					<li>:&nbsp;&nbsp;<i><%=id %></i></li>
					<li>:&nbsp;&nbsp;<i><%=name %></i></li>
					<li>:&nbsp;&nbsp;<i><%=designation %></i></li>
				</ul>
			</div>
			<div id="resultperpage">
				<label ng-hide="newhide1">Results Per Page</label><select ng-model="viewby"
					ng-change="setItemsPerPage(viewby)" ng-hide="newhide1">
					<option>5</option>
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
				</select>
			</div>
			<div ng-hide="hide2">
				<table class="table table-striped table-condensed table-hover"
					border='2'>
					<thead>
						<tr>

							<th>Date</th>
							<th>StartTime</th>
							<th>EndTime</th>
							<th>WorkingHours</th>
							<th>DayIndicator</th>
						</tr>
					</thead>

					<tbody>
						<tr
							ng-repeat="at in ats.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage))">
							<td>{{at.attendanceDate | date:'dd-MM-yyyy'}}</td>
							<td>{{at.startTime | date:'h:mm a'}}</td>
							<td>{{at.endTime | date :'h:mm a'}}</td>
							<td>{{at.workingHours}}</td>
							<td>{{at.dayIndicator}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div ng-hide="hide3">
				<table class="table table-striped table-condensed table-hover"
					border='2'>
					<thead>
						<tr>
							<th>EmpId</th>
							<th>Date</th>
							<th>StartTime</th>
							<th>EndTime</th>
							<th>WorkHours</th>
							<th>DayIndicator</th>
						</tr>
					</thead>

					<tbody>
						<tr
							ng-repeat="at1 in ats1.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage))"">
							<td>{{at1.employeeId}}</td>
							<td>{{at1.attendanceDate | date:'dd-MM-yyyy'}}</td>
							<td>{{at1.startTime  | date:'h:mm a'}}</td>
							<td>{{at1.endTime | date:'h:mm a'}}</td>
							<td>{{at1.workingHours}}</td>
							<td>{{at1.dayIndicator}}</td>
						</tr>
					</tbody>
				</table>
				
			</div>

			<p align="right" ng-hide="newhide1">Page: {{currentPage}} /
				{{numPages}}</p>
		</div>
			<div ng-hide="newhide1" align="center">
			<pagination total-items="totalItems" ng-model="currentPage"
				max-size="maxSize" class="pagination-sm" boundary-links="true"
				rotate="false" num-pages="numPages" items-per-page="itemsPerPage"></pagination>
		   </div>
	</div>
	<div id="printbtn">
		<br>
		<button class='btn btn-primary' ng-click="printDiv('pdiv');">print</button>
	</div>
</body>
</html>