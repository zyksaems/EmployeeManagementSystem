<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Reset password page</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<script  src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script  src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script> -->

 <script src="./jquery/jquery-2.1.4.js"></script>
 <script src="./bootstrap/bootstrap.min.js"></script> 
 <link rel="stylesheet"  href="./bootstrap/bootstrap.min.css">

<script src="./JS/PasswordStrength.js"></script>

<link rel="shortcut icon" type="image/x-icon" href="images/caprus logo.png" />

<link rel="stylesheet" href="./CSS/header.css">

 <link rel="stylesheet" href="./CSS/PasswordStrength.css">


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
				<div class="row"><h2 id="reset-message" class="text-center"></h2></div>
				
				<div class="row">
                      <div class="intime-margin col-md-12" id="">
                          <form action="#hhh" class="form col-sm-12" id="reset-password-form">
                                 <h1 class="form-inTime-heading text-center"><span class="glyphicon glyphicon-lock"></span>Reset Your Password</h1><br>
                                 
                                 <div class="row">
                                     <div class="col-sm-5"></div>
                                     <div class="col-md-2">
                                            <!-- textBox for new Password -->
			                                <div class="form-group  has-feedback ">
				                                  <label>New Password</label> 
				                                  <input type="password" class="form-control text-center" id="newPassword" autocomplete="off" required />				      
			                                </div>
                                       </div>
                                      <div class="col-sm-4"><p class="password-strength-top-margin" id="resetPassword-strength-span"></p></div>			   
			                       </div>
			                       <div class="row">
                                     <div class="col-sm-5"></div>
                                     <div class="col-md-2">
                                            <!-- textBox for confirm Password -->
			                                <div class="form-group  has-feedback ">
				                                  <label>Confirm Password</label> 
				                                  <input type="password" class="form-control text-center" id="confirmPassword" autocomplete="off" required />				      
			                                </div>
                                       </div>
                                      <div class="col-sm-4"></div>			   
			                       </div>
			                       <div class="row">
                                     <div class="col-sm-5"></div>
                                     <div class="col-md-2">
                                           <button type="submit" class="btn btn-primary" id="resetPasswordButton">Reset Password</button>
								           &nbsp;&nbsp; &nbsp;&nbsp;
								            <button type="reset" class="btn btn-primary">Clear</button>     
                                      </div>
                                      <div class="col-sm-4"></div>			   
			                       </div>
				           </form>
				           </div>
				           <div class="row"><br><p id="resetPasswordSuccessMsg" class="text-center"></p></div>
				  </div>      
			
			</c:when>
			
		</c:choose>


	</div> <!-- container -->


</body>
</html>
