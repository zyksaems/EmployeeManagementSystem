<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Reset password page</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

<link rel="shortcut icon" type="image/x-icon"
	href="images/caprus logo.png" />

<link rel="stylesheet" href="./CSS/header.css">


  <c:choose>	
	  <c:when test="${resetPasswordAdminId != null}">
		  <!-- custom CSS -->
		  <link rel="stylesheet" href="./CSS/resetPasswordPage.css">
		  <!-- custom JavaScript file with jQuery code-->
		  <script src="./JS/resetPassword.js"></script>
	  </c:when>
  </c:choose>

</head>
<body>

	<div class="container-fluid">
	
	    	<div class="well-lg well-custom">
					<div class="container text-center">
						<h1>
							<b class="heading-ems">Employee Management System</b>
						</h1>
					</div>
		 </div>

		<c:choose>
			<c:when test="${errorMsg != null}">
				<div class="row" id="expired-msg-div">
					<h2 align="center">${errorMsg}</h2>
				</div>
			</c:when>
			<c:when test="${resetPasswordAdminId != null}">
			
				<div>
					<input type="hidden" value="${resetPasswordAdminId}"
						id="reset-password-admin-id">
				</div>

				<div class="row">
					<div class="col-sm-4"></div>
					<div id="reset-password-form" class="col-sm-4">
						<h1>
							<span class="glyphicon glyphicon-lock"> </span> Reset Your
							Password
						</h1>
						<div id="resetPassword">
							<form role="form" action="#">

								<div class="form-group">
									<label for="newPassword">New Password:</label> <input
										type="password" class="form-control" id="newPassword"
										placeholder="Enter New Password" required maxlength="10">
								</div>
								<div class="form-group">
									<label for="confirmPassword">Confirm Password:</label> <input
										type="password" class="form-control" id="confirmPassword"
										placeholder="Enter Confirm Password" required maxlength="10">
								</div>
								<button type="submit" class="btn btn-default"
									id="resetPasswordButton">Reset Password</button>
								&nbsp;&nbsp; &nbsp;&nbsp;
								<button type="reset" class="btn btn-default">Clear</button>
							</form>
						</div>
						<br><p id="resetPasswordSuccessMsg"></p>
					</div>
					<div class="row"><h3 id="reset-message" class="text-center"></h3></div>
					<div class="col-sm-4"></div>
				</div>

			</c:when>
			
		</c:choose>


	</div>


</body>
</html>
