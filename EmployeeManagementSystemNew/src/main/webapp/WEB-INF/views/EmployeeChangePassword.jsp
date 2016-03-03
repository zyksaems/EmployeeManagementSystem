<jsp:include page="EmployeeLeftMenu.jsp"></jsp:include>
<script src="./JS/AttendanceForm.js"></script>
<script src="./JS/PasswordStrength.js"></script>
        <div class="col-sm-10">
		<form action="#EmployeeChangePassword.do" class="col-sm-12"  id="emp-change-pass-form"> <!-- form-inTime -->
			<h2 class="form-inTime-heading text-center">
				<span class="glyphicon glyphicon-pencil"></span>Change Password
			</h2>

          <div class="row">
             <div class="col-sm-5"></div>
             <div class="col-sm-2">
                   <!--text box for Employee id  -->
			      <div class="form-group  has-feedback " id="change-password-employee-id-div">
				       <label>Employee Id</label> 
				       <input type="text" class="form-control text-center" id="change-password-employee-id-val" autocomplete="off" required />
				      <span class="glyphicon  form-control-feedback" id="change-password-employee-id-span"></span>
			     </div>
             </div>
             <div class="col-sm-4"></div>
			   
			</div>
			<div class="row">
             <div class="col-sm-5"></div>
             <div class="col-sm-2">
                   <!-- textBox for employee current Password -->
			      <div class="form-group  has-feedback " id="change-password-employee-current-password-div">
				       <label>Current Password</label> 
				       <input type="password" class="form-control text-center" id="change-password-employee-current-password-val" autocomplete="off" />
				      <span class="glyphicon  form-control-feedback" id="change-password-employee-current-password-span"></span>
			     </div>
             </div>
             <div class="col-sm-4"></div>			   
			</div>
			<div class="row">
             <div class="col-sm-5"></div>
             <div class="col-sm-2">
                   <!-- textBox for employee new  Password -->
			      <div class="form-group  has-feedback " id="change-password-employee-new-password-div">
				       <label>New Password</label> 
				       <input type="password" class="form-control text-center" id="change-password-employee-new-password-val" autocomplete="off" required maxlength="20"/>
				      <span class="glyphicon  form-control-feedback" id="change-password-employee-new-password-span"></span>
			     </div>
             </div>
             <div class="col-sm-4"><p class="password-strength-top-margin" id="employee-new-password-strength-span"></p></div>
			   
			</div>
			<div class="row">
             <div class="col-sm-5"></div>
             <div class="col-sm-2">
                   <!-- textBox for employee confirm Password -->
			      <div class="form-group  has-feedback " id="change-password-employee-confirm-password-div">
				       <label>Confirm Password</label> 
				       <input type="password" class="form-control text-center" id="change-password-employee-confirm-password-val" autocomplete="off" required maxlength="20"/>
				      <span class="glyphicon  form-control-feedback" id="change-password-employee-confirm-password-span"></span>
			     </div>
             </div>
             <div class="col-sm-4"></div>
			   
			</div>
			<div class="row">
             <div class="col-sm-5"></div>
             <div class="col-sm-2">                 
			      <button class="btn btn-lg btn-primary btn-block " id="change-employee-password-button">Change Password</button>
			      <h4 class="text-center" id="employee-change-password-success-message"></h4>
             </div>
             <div class="col-sm-4"></div>
			   
			</div>
			
		</form>
		</div>
	<!---------------------------------------------------------------  write all code above this line   -------------------------------------------------------------- -->
     </div>  <!-- End of  "row" -->
     
   </div> <!-- End of  "container-fluid" -->
   
 </body>
 
 </html>