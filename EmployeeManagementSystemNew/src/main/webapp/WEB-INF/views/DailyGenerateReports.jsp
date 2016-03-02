 <jsp:include page="AdminTemplate.jsp"></jsp:include>
<script src="./JS/DailyGenerateReports.js"></script>

    <div class="row">
	<div class="row generateposition" id="daily-attendance-div">
	<h3 align="center"><b>Daily Attendance Reports</b></h3>
	<div id="searchcriteria">
		<h4>
			<b>Search criteria</b>
		</h4>
	</div><br /><br />
		<label>select type:</label> <select id="select"
			onchange="getDisable()">
			<option title="" value="">--Select--</option>
			<option value="single">Single</option>
			<option value="all">All</option>
		</select>&nbsp;&nbsp;&nbsp; <input type="text" id="id" maxlength="6" placeholder="enter id">&nbsp;&nbsp;
		Date: <input type="text" id="datepicker">&nbsp;&nbsp;
		<button class="btn btn-primary" id="dayreports">submit</button>
	</div>
	</div>
	<div class="row generateposition1">
	<div id="searchcriteria">
		<h4>
			<b>Search Results</b>
		</h4>
	</div>
	<div id="main">
	<div id="back_div">
		<div id="printdiv">
		<h3 id="title" align="center">
				<font color="#6495ed">Caprus IT Daily Attendance Reports
			</h3>
		<div id="Employee_Details">
			Employee ID :&nbsp;&nbsp;<span id="emp_id"></span><br />
			Employee Name :&nbsp;&nbsp;<span id="emp_name"></span><br />
			Employee Designation :&nbsp;&nbsp;<span id="emp_designation"></span>
			</div>
			<div id="page_div">
			 <table id="table" border='2' class="table table-bordered table-striped">
			</table>
			</div>
			 <table id="table1" border='2' class="table table-bordered table-striped">
				<thead>
					<tr>
						<th>Date</th>
						<th>StartTime</th>
						<th>EndTime</th>
						<th>WorkHours</th>
					</tr>
				</thead>
			</table>
		</div>
		</div>
		<font color="red"><p aling="center" id="res"></p></font> </div><br />
		<br />
		<button id="back" class='btn btn-primary'>back</button>
		<button id="print" class='btn btn-primary'
			onclick="PrintDiv('printdiv');">print</button>
	</div>
	</div>