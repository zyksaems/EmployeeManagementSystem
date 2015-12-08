<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
 <script data-require="angular.js@1.3.9" data-semver="1.3.9" src="https://code.angularjs.org/1.3.9/angular.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css" />
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
<script src= "angularJs/angular.js"></script>
<link rel="stylesheet" type="text/css" href="css/GenerateReport.css">
<script src="js/GenerateReport.js"></script>
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<% String str=(String)session.getAttribute("EmployeeName");%>
</head>
<body ng-app="myapp" ng-controller="myctrl" >

Select type:
<select ng-model="sel" ng-selected="getDis()">
<option value="single" selected>Single</option>
<option value="all" >All</option>
</select>&nbsp;&nbsp;

<input type="text" ng-model="id" id="auto1" placeholder="search by employee Id/name" ng-disabled="f1" ng-change="getCheck()">&nbsp;&nbsp;
Report type:
<select ng-model="sel1" ng-selected="getStatu()">
<option value="none"  selected>None</option>
<option value="day" >Day</option>
<option value="week" >Week</option>
<option value="month" >Month</option>
<option value="annual" >Annual</option>
<option value="dates" >Select From and To Date</option>
</select>&nbsp;
<p ng-hide="hide11">From Date</p><input type="date" ng-model="from" ng-hide="hide11">&nbsp;<p ng-hide="hide12"> To Date</p><input type="date" ng-model="to" ng-hide="hide12">
<div ng-model="div1"></div><br>
<button ng-click="getAttendance()">submit</button>
<br>
<hr>
<div id="pdiv">
<div id="d1">
<h1>Caprus IT</h1>
<h2>Staff Attendance Report</h2>
</div>
<div ng-hide="res"><font color="red">{{result}}</font></div>
<div ng-hide="hide1">
<ul>
<li>
Employee Id:<i ng-model="p1"></i></li>
<li>
Employee Name<i ng-model="p2"></i></li><%=str %>
<li>
Employee Designation<i ng-model="p3"></i></li>
</ul>
<hr>
</div>
<div ng-hide="hide5">
</div>
<div ng-hide="hide2">
<p ng-if="ats[0] == 'No record Found during given period' ">No Record found during given period</p>
<table class="table table-striped table-condensed table-hover" border='2'  ng-if="ats[0] != 'No record Found during given period'">
                <thead>
                    <tr>
                     
                        <th >Date</th>
                        <th >StartTime</th>
                        <th >EndTime</th>
                        <th >WorkingHours</th>
                        <th >DayIndicator</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr ng-repeat="at in ats">
                        <td>{{at.attendanceDate}}</td>
                        <td>{{at.startTime}}</td>
                        <td>{{at.endTime}}</td>
                        <td>{{at.workingHours}}</td>
                        <td>{{at.dayIndicator}}</td>
                    </tr>
                </tbody>
            </table> 
            </div>
            <div ng-hide="hide3">
          <table class="table table-striped table-condensed table-hover" border='2'>
                <thead>
                    <tr>
                      <th>EmpId</th>
                        <th >Date</th>
                        <th >StartTime</th>
                        <th >EndTime</th>
                        <th >WorkHours</th>
                        <th >DayIndicator</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr ng-repeat="at1 in ats1">
                       <td>{{at1.employeeId}}</td>
                        <td>{{at1.attendanceDate}}</td>
                        <td>{{at1.startTime}}</td>
                        <td>{{at1.endTime}}</td>
                        <td>{{at1.workingHours}}</td>
                        <td>{{at1.dayIndicator}}</td>
                    </tr>
                </tbody>
            </table> 
            </div>
            </div>
            <div ng-hide="hide4">
            <br>
            <button id="btn" ng-click="printDiv('pdiv');">print</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button id="btn">save</button>
            </div>
</body>
</html>