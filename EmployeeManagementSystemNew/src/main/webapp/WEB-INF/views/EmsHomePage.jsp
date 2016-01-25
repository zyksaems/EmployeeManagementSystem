<!DOCTYPE html>
<html lang="en">
<head>
<title>EMS home page</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- JQuery  -->
<script src="./jquery/jquery-2.1.4.js"></script>

<!-- bootstrap javascript file -->
<script src="./bootstrap/bootstrap.min.js"></script>

<!-- custom javascript file with jQuery code-->
<script src="./JS/homepage.js"></script>
<!-- <script src="./testHome/js/AttendanceForm.js"></script> -->
<!-- <script src="./testHome/js/Admin_AdminSignin.js"></script>  -->
<script src="./JS/AttendanceForm.js"></script>
<script src="./JS/Admin_login.js"></script>
<link rel="shortcut icon" type="image/x-icon" href="images/caprus logo.png" />
<!-- boottrap css-->
<link rel="stylesheet" href="./bootstrap/bootstrap.min.css">

<!--  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> -->
<!-- custom css -->
<link rel="stylesheet" href="./CSS/homepage.css">
<link rel="stylesheet" href="./CSS/header.css">
<link rel="stylesheet" href="./CSS/footer.css">
<link rel="stylesheet" href="./CSS/intime.css">
<link rel="stylesheet" href="./CSS/signin.css">
<link rel="stylesheet" href="./CSS/aboutUs.css">
<link rel="stylesheet" href="./CSS/contactUs.css">
<script>
  function DisableBackButton() {
		window.history.forward()
	}
	DisableBackButton();
	window.onload = DisableBackButton;
	window.onpageshow = function(evt) {
		if (evt.persisted)
			DisableBackButton()
	}
	window.onunload = function() {
		void (0)
	}
  </script>



</head>
<body>
	<!--  <div class="container-fluid">  -->

	<!-- header -->
	<div class="well-lg well-custom">
		<div class="container text-center">
			<h1>
				<b>Employee Management System</b>
			</h1>
		</div>
	</div>
	<!-- top menu -->
	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target="#myNavbar"></button>
				<a class="navbar-brand" href="#">EMS</a>
			</div>
			<div class="collapse navbar-collapse" id="myNavbar">
				<ul class="nav navbar-nav">
					<li class="" id="home-li"><a href="#" id="home-link"><span
							class="glyphicon glyphicon-home"></span> Home</a></li>
					<li class="" id="show-Employee-Cahange-password-div"><a
						href="#" id=""><span class="glyphicon glyphicon-pencil"></span>
							Change Password</a></li>
					<li id="about-li"><a href="#"><span
							class="glyphicon glyphicon-info-sign"></span>About</a></li>
					<li id="contact-li"><a href="#"><span
							class="glyphicon glyphicon-phone"></span>Contact</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li id="admin-login-li"><a href="#" id="sign-in-link"
						data-toggle="modal" data-target="#myModal"><span
							class="glyphicon glyphicon-log-in"></span> Admin Login</a></li>
				</ul>
			</div>
		</div>
	</nav>

	<!-- In-Time form -->
	<div class="container intime-margin" id="in-time-form">

		<form action="#attendanceForm.do" class="form-inTime"
			id="attendance-form">
			<h2 class="form-inTime-heading ">
				<span class="glyphicon glyphicon-pencil"></span>Enter Employee Id
			</h2>
			<!--text box for Employee id  -->
			<div class="form-group  has-feedback" id="employee-id-div">
				<label>Employee id</label> <input type="text"
					class="form-control text-center " id="employee-id-val"
					autocomplete="off"> <span
					class="glyphicon  form-control-feedback" id="employee-id-span"></span>
			</div>
			<!-- textBox for employee Password -->
			<div class="form-group has-feedback " id="employee-password-div">
				<label>Password</label> <input type="password"
					class="form-control text-center " id="employee-password-val"
					required> <span class="glyphicon form-control-feedback"
					id="employee-password-span"></span>
			</div>
			<button class="btn btn-lg btn-primary btn-block "
				id="employeeAttendanceButton">In-Time</button>
			<h4 class="text-center" id="employeeLoginSuccessMsg"></h4>
		</form>

	</div>

	</div>
	<!--End of In Time Form  -->
	<!-- Employee change password division -->
	<div class="container intime-margin" id="employee-change-passowrd-div">

		<form action="#EmployeeChangePassword.do" class="form-inTime"
			id="emp-change-pass-form">
			<h2 class="form-inTime-heading ">
				<span class="glyphicon glyphicon-pencil"></span>Change Password
			</h2>

			<!--text box for Employee id  -->
			<div class="form-group  has-feedback "
				id="change-password-employee-id-div">
				<label>Employee Id</label> <input type="text"
					class="form-control text-center "
					id="change-password-employee-id-val" autocomplete="off" required>
				<span class="glyphicon  form-control-feedback"
					id="change-password-employee-id-span"></span>
			</div>
			<!-- textBox for employee current Password -->
			<div class="form-group has-feedback "
				id="change-password-employee-current-password-div">
				<label>Cuurent Password</label> <input type="password"
					class="form-control text-center "
					id="change-password-employee-current-password-val" required>
				<span class="glyphicon form-control-feedback"
					id="change-password-employee-current-password-span"></span>
			</div>
			<!-- textBox for employee new  Password -->
			<div class="form-group has-feedback "
				id="change-password-employee-new-password-div">
				<label>New Password</label> <input type="password"
					class="form-control text-center "
					id="change-password-employee-new-password-val" required> <span
					class="glyphicon form-control-feedback"
					id="change-password-employee-new-password-span"></span>
			</div>
			<!-- textBox for employee confirm Password -->
			<div class="form-group has-feedback "
				id="change-password-employee-confirm-password-div">
				<label>Confirm Password</label> <input type="password"
					class="form-control text-center "
					id="change-password-employee-confirm-password-val" required>
				<span class="glyphicon form-control-feedback"
					id="change-password-employee-confirm-password-span"></span>
			</div>
			<button class="btn btn-lg btn-primary btn-block "
				id="change-employee-password-button">Change Password</button>
			<h4 class="text-center" id="employee-change-password-success-message"></h4>
		</form>
	</div>
	<!--End of employee change password div  -->
	<!--  About Us div -->
	<div class="container" id="about-us-div">
		<div id="about" class="text-center">
			<h1 class="aboutHeading">About Employee Management System !</h1>
			<br>
			<p class="aboutDescription">
				Employee Management System is an automated system for maintaining
				employee attendance details for any organization efficiently.<br>
				It provides an environment to keep track of user attendance details
				to produce productivity.
			</p>
		</div>
	</div>
	<!--  Contact Us div -->
	<div id="contact-us-div" class="text-center">
		<h1 class="contactUsHeading">Registered Office :</h1>
		<p class="contactUsDescription">
			New Mark House <br> Patrika Nagar, Madhapur <br> Hyderabad
			- 81 <br> India . <br> +91-40-66201101 <br>
			+91-40-40171448 <br>
		</p>
	</div>
	<!-- Sign-IN form Modal -->

	<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h2 class="modal-title form-signin-heading text-center">
						<span id="model-header" class="glyphicon"></span> <span id="modal-header-text"></span>
					</h2>
				</div>
				<div class="modal-body">
					<div id="sign-in-form">

						<form  action="#adminLogin.do" class="form-signin"
							id="admin-login-form">
							<!-- text box for admin id -->
							<div class="form-group  has-feedback "
								id="admin-login-adminid-div">
								<label>Admin ID</label> <input type="text"
									class="form-control text-center " id="admin-login-adminid-val"
									autocomplete="off" required> <span
									class="glyphicon form-control-feedback"
									id="admin-login-adminid-span"></span>
							</div>
							<!-- text box for admin password -->
							<div class="form-group  has-feedback "
								id="admin-login-adminpass-div">
								<label>Password</label> <input type="password"
									class="form-control text-center "
									id="admin-login-adminpass-val" required> <span
									class="glyphicon  form-control-feedback"
									id="admin-login-adminpass-span"></span>
							</div>
							<div class="checkbox form-group">
								<label> <input type="checkbox" class=""
									id="admin-login-show-adminpass"> Show Password
								</label> <label> <a herf="" class="text-danger"
									id="admin-login-forgot-password">forgot password?</a>
								</label>
							</div>

							<div class="form-group">
								<button class="btn btn-lg btn-primary btn-block"
									id="admin-login-submit-button">Sign in</button>
							</div>

							<div class="form-group-lg text-center">
								<label class="text-danger" id="admin-login-success-msg"></label>
							</div>
						</form>
						<!-- forgot password form -->
						   <font color="green"><p id="res"></p></font> 
						<form class="form" action="#" id="forgot-password-form">
						<fieldset>
							<div class="form-group has-feedback" id="Forgot_password_div">
								<label>Admin ID</label> <input type="text"
									class="form-control text-center" id="empid"
									placeholder="admin id" title="please enter valid 6 digits."
									autocomplete="off"> <span
									class="glyphicon  form-control-feedback"
									id="forgotpassword-id-span"></span>
							</div>
							<div class="form-group has-feedback"
								id="forgot_password_email_div" >
                                 <label>Email Address</label>
								<div class="input-group" >
						
									<span class="input-group-addon"><i
										class="glyphicon glyphicon-envelope color-blue email_symbal"></i></span>
										<input
										id="email1" placeholder="email address"
										class="form-control text-center" type="email"
										autocomplete="off"> <span
										class="glyphicon  form-control-feedback"
										id="forgotpassword-email-span"></span>
								</div>
							</div>
							
								<button class="btn btn-primary" align="center" id="forgotpassword_button">send</button>
						
						</fieldset>
					</form>
					</div>
					<font color="red"><p id="validation_res"></p></font>
				</div>
				<div class="modal-footer ">
				<a id="forgotpasshref" href="#">back to login</a>
					<button type="button" class="btn btn-warning " data-dismiss="modal">Close</button>
				</div>
			</div>  <!-- Content -->
		</div>
	</div>
	<!-- footer -->
	<footer class="container-fluid text-center navbar-fixed-bottom">
		<p>Footer Text</p>
	</footer>
	<!-- <footer class="main-footer ems-footer"><div>Copyright © 2005 - 2015 CaprusIT</div><div></footer> -->

	<!-- </div> -->
</body>
</html>
