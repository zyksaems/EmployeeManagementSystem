<!DOCTYPE html>
<html lang="en">
<head>
  <title>Reset Password Page</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  
    <!-- custom JavaScript file with jQuery code-->
  <script src="./JS/resetPassword.js"></script>
  
   <!-- custom CSS -->
      <link rel="stylesheet" href="./CSS/resetPasswordPage.css"> 
  
</head>
<body>

<div class="container">
<h1>
<span class="glyphicon glyphicon-lock">  </span>
  Reset Your  Password 
</h1>
<div id="resetPassword">
  <form role="form" action="#">
    <div class="form-group">
      <label for="newPassword">New Password:</label>
      <input type="password" class="form-control" id="newPassword" placeholder="Enter New Password" required  maxlength="10">
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" class="form-control" id="confirmPassword" placeholder="Enter Confirm Password" required maxlength="10">
    </div>
    <button type="submit" class="btn btn-default"  id="resetPasswordButton">Reset Password</button> &nbsp;&nbsp; &nbsp;&nbsp;
     <button type="reset" class="btn btn-default">Clear</button>
  </form>
  
   <br><p id="resetPasswordSuccessMsg"> </p>
  
  </div>
</div>


</body>
</html>
