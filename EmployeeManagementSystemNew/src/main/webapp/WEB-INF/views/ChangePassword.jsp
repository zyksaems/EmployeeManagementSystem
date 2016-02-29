<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="adminLeftMenu.jsp"></jsp:include>

     <script src="./JS/ChangePassword.js"></script>
     <script src="./JS/PasswordStrength.js"></script>
     <link rel="stylesheet" href="./CSS/PasswordStrength.css">

<div class="row"><!-- generateposition2 -->
<div class="intime-margin col-md-12" id="admin-change-passowrd-div">

		<form action="#changePassword" class="form col-sm-12" id="admin-change-password-form">
			<h2 class="form-inTime-heading text-center"><span class="glyphicon glyphicon-pencil"></span>Change Password</h2><br>
			
			<div class="row">
             <div class="col-sm-5"></div>
             <div class="col-md-2">
                    <!-- textBox for employee current Password -->
			      <div class="form-group  has-feedback " id="change-password-admin-current-password-div">
				       <label>Current Password</label> 
				       <input type="password" class="form-control text-center" id="change-password-admin-current-password-val" autocomplete="off" required />
				      <span class="glyphicon  form-control-feedback" id="change-password-admin-current-password-span"></span>
			     </div>
             </div>
             <div class="col-sm-4"></div>			   
			</div>
			<div class="row">
             <div class="col-sm-5"></div>
             <div class="col-md-2">
                  <!-- textBox for employee new  Password -->
			      <div class="form-group  has-feedback " id="change-password-admin-new-password-div">
				       <label>New Password</label> 
				       <input type="password" class="form-control text-center" id="change-password-admin-new-password-val" autocomplete="off" required />
				      <span class="glyphicon  form-control-feedback" id="change-password-admin-new-password-span"></span>
			     </div>
             </div>
             <div class="col-sm-4"><p class="password-strength-top-margin" id="admin-new-password-strength-span"></p></div>			   
			</div>
			<div class="row">
             <div class="col-sm-5"></div>
             <div class="col-md-2">
                  <!-- textBox for employee confirm Password -->
			      <div class="form-group  has-feedback " id="change-password-admin-confirm-password-div">
				       <label>Confirm Password</label> 
				       <input type="password" class="form-control text-center" id="change-password-admin-confirm-password-val" autocomplete="off" required />
				      <span class="glyphicon  form-control-feedback" id="change-password-admin-confirm-password-span"></span>
			     </div>
             </div>
             <div class="col-sm-4"></div>			   
			</div>
			<div class="row">
             <div class="col-sm-5"></div>
               <div class="col-md-2">
                  <button class="btn btn-lg btn-primary btn-block " type="submit" id="change-admin-password-button">Change Password</button>
			      <font color="red"><h4 class="text-center" id="admin-change-password-success-message"></h4></font>
			      <font color="green"><h4 class="text-center" id="admin-change-password-success-message1"></h4></font>
			    </div>
             </div>
             <div class="col-sm-4"></div>
			   
			</div>
          
            
            			
			
		</form>
</div>
</div>
</body>
</html>