  <jsp:include page="AdminTemplate.jsp"></jsp:include>
 <script src="./JS/MonthlyGenerateReoprts.js"></script>
     <script src="./JS/ConverWorkingHours.js"></script>
     <div class="row">
 <!--   <div class="col-sm-1"></div> -->
   <div class="col-sm-12 generatereport_align">
    <div class="col-sm-12">
   <div class="col-sm-2"></div>
	<div class="col-sm-8 generateposition" id="monthly-report-select-div">
	<h3 align="center"><b>Monthly Attendance Reports</b></h3>
	<div id="searchcriteria">
		<h4>
			<b>Search criteria</b>
		</h4>
	</div><br />
		<label>select type:</label> <select id="select"
			onchange="getDisable()">
			<option title="" value="">--Select--</option>
			<option value="single">Single</option>
			<option value="all">All</option>
		</select>&nbsp;&nbsp;&nbsp; <input type="text" id="id" maxlength="6"  placeholder="enter id">&nbsp;&nbsp;
		Month: <input type="month" id="month">&nbsp;&nbsp;
		<button class="btn btn-primary" id="monthreports">submit</button>
	</div>
	<div class="col-sm-2"></div>
	</div>
	<div class="col-sm-12">
	<div class="col-sm-2"></div>
	<div class="col-sm-8 generateposition1">
	<div id="searchcriteria">
		<h4>
			<b>Search Results</b>
		</h4>
	</div>
	<div id="main">
	<div id="back_div">
		<div id="printdiv">
		<h3 id="title" align="center">
				<font color="#6495ed">Caprus IT Monthly Attendance Reports
			</h3>
			
			<div id="Employee_Details">
			Employee ID :&nbsp;&nbsp;<span id="emp_id"></span><br />
			Employee Name :&nbsp;&nbsp;<span id="emp_name"></span><br />
			Employee Designation :&nbsp;&nbsp;<span id="emp_designation"></span>
			</div>
			<div id="table_pag_div">
			 <table id="table" border='2' class="table table-bordered table-striped">
			</table>
			</div>
			<div id="table1_pag_div">
				 <table id="table1" border='2' class="table table-bordered table-striped">
			</table>
			</div>
		</div>
		</div>
		<font color="red"><p aling="center" id="res"></p></font></div> <br />
		<button id="back" class='btn btn-primary'>back</button>
		<button id="print" class='btn btn-primary'
			onclick="PrintDiv('printdiv')">print</button><br /> <br />
			
		
	</div>
	<div class="col-sm-2"></div>
	</div>
  	</div>
</div>
	</div>
	<!-- <div class="col-sm-1"></div> -->
	</body>
	</html>