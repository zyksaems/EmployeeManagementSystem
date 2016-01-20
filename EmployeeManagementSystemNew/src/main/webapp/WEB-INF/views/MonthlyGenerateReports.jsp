<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>EMS</title>
<link rel="shortcut icon" type="image/x-icon"
	href="./images/caprus logo.png" />
<script src="./jquery/jquery-2.1.4.js"></script>
  <script src="./jquery/jquery-ui.js"></script>
<script src="./JS/MonthlyGenerateReoprts.js"></script>
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
	<jsp:include page="AdminTemplate.jsp"></jsp:include>
	<div class="row generateposition" id="monthly-report-select-div">
		<label>select type:</label> <select id="select"
			onchange="getDisable()">
			<option title="" value="">--Select--</option>
			<option value="single">Single</option>
			<option value="all">All</option>
		</select>&nbsp;&nbsp;&nbsp; <input type="text" id="id" maxlength="6"  placeholder="enter id">&nbsp;&nbsp;
		Month: <input type="month" id="month">&nbsp;&nbsp;
		<button class="btn btn-primary" id="monthreports">submit</button>
	</div>
	<div class="row generateposition1">
		<div id="printdiv">
		<h3 id="title" align="center">
				<font color="#6495ed">Caprus IT Monthly Attendance Reports
			</h3>
			
			<div id="Employee_Details">
			Employee ID :&nbsp;&nbsp;<span id="emp_id"></span><br />
			Employee Name :&nbsp;&nbsp;<span id="emp_name"></span><br />
			Employee Designation :&nbsp;&nbsp;<span id="emp_designation"></span>
			</div>
			 <table id="table" border='2' class="table table-bordered table-striped">
				<thead>
					<tr>
						<th>empId</th>
						<th>Date</th>
						<th>StartTime</th>
						<th>EndTime</th>
						<th>WorkHours</th>
						<th>DayIndicator</th>
					</tr>
				</thead>
			</table>
			
				 <table id="table1" border='2' class="table table-bordered table-striped">
				<thead>
					<tr>
						<th>Date</th>
						<th>StartTime</th>
						<th>EndTime</th>
						<th>WorkHours</th>
						<th>DayIndicator</th>
					</tr>
				</thead>
			</table>
		</div>
		<font color="red"><p aling="center" id="res"></p></font> <br /> <br />
		<button id="print" class='btn btn-primary'
			onclick="PrintDiv('printdiv')">print</button>
	</div>
</body>
</html>