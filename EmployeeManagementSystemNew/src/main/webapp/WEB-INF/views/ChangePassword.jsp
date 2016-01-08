<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>EMS</title>
<link rel="shortcut icon" type="image/x-icon" href="./js1/caprus logo.png"/>
<link rel="stylesheet" type="text/css" href="style.css">
   <script src="./js1/jquery-2.1.4.js"></script>
<script src="./JS/ChangePassword.js"></script>
<style>
.generateposition2{

width:30%; 
height:60px;
left: 28%;
	top: 17%;
	position: absolute;
	padding-top: 13px;
	padding-left: 10px;
	padding-right: 10px;
}
#admin-change-passowrd-div{
width: 400px;
height: auto;
}
</style>
</head>
<body>
<jsp:include page="AdminTemplate.jsp"></jsp:include>

<div class="row generateposition2">
<div class="container intime-margin" id="admin-change-passowrd-div">

		<form action="" class="form">
			<h2 class="form-inTime-heading "><span class="glyphicon glyphicon-pencil"></span>Change Password</h2><br>
			
           <!-- textBox for employee current Password -->
			<div class="form-group has-feedback " id="change-password-admin-current-password-div">
			    <label>Cuurent Password</label>
                <input type="password" class="form-control text-center " id="change-password-admin-current-password-val" required >
                <span class="glyphicon form-control-feedback" id="change-password-admin-current-password-span"></span>
            </div>
            <!-- textBox for employee new  Password -->
			<div class="form-group has-feedback " id="change-password-admin-new-password-div">
			    <label>New Password</label>
                <input type="password" class="form-control text-center " id="change-password-admin-new-password-val" required >
                <span class="glyphicon form-control-feedback" id="change-password-admin-new-password-span"></span>
            </div>
            <!-- textBox for employee confirm Password -->
			<div class="form-group has-feedback " id="change-password-admin-confirm-password-div">
			    <label>Confirm Password</label>
                <input type="password" class="form-control text-center " id="change-password-admin-confirm-password-val" required >
                <span class="glyphicon form-control-feedback" id="change-password-admin-confirm-password-span"></span>
            </div>
            			
			<button class="btn btn-lg btn-primary btn-block " type="submit" id="change-admin-password-button">Change Password</button>
			<font color="red"><h4 class="text-center" id="admin-change-password-success-message"></h4></font>
			<font color="green"><h4 class="text-center" id="admin-change-password-success-message1"></h4></font>
		</form>
</div>
</div>
</body>
</html>