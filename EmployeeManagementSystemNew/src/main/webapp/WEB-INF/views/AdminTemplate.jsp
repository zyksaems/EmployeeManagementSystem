<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>

   <!-- <link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"> 
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

   <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>  -->
  
  <link rel="stylesheet" type="text/css" href="./CSS/style.css">
   <script src="./jquery/jquery-2.1.4.js"></script>
  <!-- <script src="./js1/jquery-1.3.2.min.js"></script> -->
  <script src="./jquery/jquery-ui.js"></script>
   <script src="./boostrap/bootstrap.min.js"></script> 
  <link rel="stylesheet"  href="./boostrap/bootstrap.min.css">
  <link rel="stylesheet"  href="./jquery/jquery-ui.css">
  
<style>
.headpart {
	width: auto;
	height: 100px;
	color: white;
	background-color: #3c8dbc;
}

.sidebar {
	width: 200px;
	height: 575px;
	left: 0px;
	background-color: #3c8dbc;
}

.icon-setting {
	font-size: 25px;
	top: 60px;
	left: 55px;
}

ul {
	padding: 0px;
	margin: 0px;
}

.title_menu {
	right: 10px;
}
a:hover {
    color: hotpink;
}
span:HOVER {
	color: hotpink;
}
#dropdown{
 max-width: 160px ;
    min-width: 100px ;
    top: 100px;
    width: 200px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
}
.icon{
top: 15px;
left: 45px;
}
</style>

<script>
  $(function() {
    $( "#accordion" ).accordion();
  });

  $(function() {
      $( "#datepicker" ).datepicker();
    });

  </script>
  
</head>
<body>
	<div class="container-fluid ">
		<div class="row headpart">
		<div class="col-sm-2 icon">
<img src="./js1/caprus_icon.png" width="65px" height="65px">
		</div>
			<div class="col-sm-8 title_menu text-center">
				<h1 align="right">EMPLOYEE MANAGEMENT SYSTEM</h1>
			</div>
			<div class="col-sm-2">
				<div class="dropdown">
					<span class="glyphicon glyphicon-cog icon-setting"
						data-toggle="dropdown"></span>
					<ul class="dropdown-menu dropdown-menu-right" id="dropdown">
						<li><a href="#">Profile</a></li>
						<li><a href="#">Change password</a></li>
						<li><a href="#">Logout</a></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="row">
		
			<div class="col-sm-2 sidebar">
			
			 <div id="accordion">
			<h3>Manage Employee</h3>
	    	<div>
	    	<ul>
	    	<li><a href="#">Add Employee</a></li>
	    	<li><a href="#">View/Update Employee</a></li>
	    	</ul>
			</div>
			<h3>Reports</h3>
			<div>
			<ul>
			<li>
			<a href="./DailyGenerateReports.jsp">Daily Reports</a></li></ul>
			<li>
			<a href="#">Weekly Reports</a></li></ul>
			<li>
			<a href="#">Monthly Reports</a></li></ul>
			<li>
			<a href="#">annually Reports</a></li></ul>
			</div>
			<h3>View Attendance</h3>
			<div>
			<ul>
			<li>
			<a href="#">Daily Attendance</a></li>
			<li>
			<a href="#">Weekly Attendance</a></li>
			<li>
			<a href="#">Monthly Attendance</a></li>
			</ul>
			</div>
			<h3>Productivity</h3>
			<div>
			<ul>
			<li>
			<a href="#">Daily Productivity</a></li>
			<li>
			<a href="#">Weekly Productivity</a></li>
			<li>
			<a href="#">Monthly Productivity</a></li>
			<li>
			<a href="#">Annually Productivity</a></li>
			</ul>
			</div>
			</div> 
			
			</div>

			<div class="col-sm-10">
			
			</div>

		</div>
	</div>
</body>
</html>