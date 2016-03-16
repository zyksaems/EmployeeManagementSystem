<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html ng-app="ui.ems.app">
 <head>
 
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> 
  
  <!-- AngularJS main script(library) file -->
  <script src="./angularJs/angular.js"></script>
  <script src="./angularJs/angular-animate.js"></script>
  
  <!-- setting icon to page -->
  <link rel="shortcut icon" type="image/x-icon" href="images/faviconlogo.png"/>
  
  <!--  Jars for enabling  I18N -->
  <script src="https://rawgithub.com/PascalPrecht/bower-angular-translate/master/angular-translate.min.js"></script>
  
   <!--  Jars to include external JSON files for I18N -->
  <script src="https://rawgithub.com/PascalPrecht/bower-angular-translate-loader-static-files/master/angular-translate-loader-static-files.js"></script>
  
  <script src="./jquery/jquery-2.1.4.js"></script>
  
  <!-- Bootstrap main script(library) file -->
  <link href="./bootstrap/bootstrap.min.css" rel="stylesheet">
  <script src="./bootstrap/bootstrap.min.js"></script> 
  <script src="./ui-bootstrap/ui-bootstrap-tpls-0.14.3.min.js"></script>
  
  
 <c:choose>
    <c:when test="${errorMsg != null}">
       <script src="./JS/admin_resetPassword.js"></script>
       <link href="./css/admin_ResetPassword.css" rel="stylesheet">
    </c:when>
    <c:when test="${resetPasswordAdminId != null}">
       <script src="./JS/admin_resetPassword.js"></script>
       <link href="./css/admin_ResetPassword.css" rel="stylesheet">
    </c:when>
    <c:otherwise>
       <!--  for charts script-->
       <script src="./chartJS/Chart.js"></script>  
        
       <script src="./JS/ui-attendanceForm.js"></script>  
       <script src="./alertJS/alert.js"></script>       
     
       <link href="./css/Admin_Login.css" rel="stylesheet">
       <link href="./css/AttendanceForm.css" rel="stylesheet">
       <link href="./alertJS/alert.css" rel="stylesheet">
       <link  href="./css/header.css"  rel="stylesheet">
       <link href="./css/Admin_changePassword.css" rel="stylesheet">
       <link href="./css/Admin_ViewOrEditEmployee.css" rel="stylesheet">
       <link rel="stylesheet" href="./css/Admin_addEmployeeDetails.css">
       <link rel="stylesheet" href="css/generateReport.css">
       
    </c:otherwise>
</c:choose>

    
    
  </head>
   
  <body>

  <div class="container-fluid" ng-controller="ValidController">
  
  <!-- EMS  Header -->
  
<div class="well-lg well-custom">
  <div class="container text-center">
    <h1><b><label  translate='EMS_Title'></label></b></h1>      
  </div>
</div>
  
  
 <!--  <div class="row headerDiv"> 
    <uib-carousel interval="myInterval" no-wrap="noWrapSlides">
      <uib-slide ng-repeat="slide in slides" active="slide.active">
        <img ng-src="{{slide.image}}" style="margin: auto"> style="margin:auto;"
        <div class="carousel-caption">
        </div>
      </uib-slide>
    </uib-carousel>
 -->
  
 
  
  <c:choose>
    <c:when test="${errorMsg != null}">
        <p class="linkErrorMsg">${errorMsg}</p>
    </c:when>
    <c:when test="${resetPasswordAdminId != null}">
       
         <!-- Divison to reset admin password -->
  
  <div class="row">
    <p>${errorMsg}</p>
	    <p ng-init="adminIdForNewPassword=${resetPasswordAdminId}"></p>	    
		<div class="row" ng-show="showAdminResetPasswordDiv">
		    <p class="adminResetPasswordHeading" translate="Reset_Your_Password"></p>
			<div class="col-sm-4"></div>
			<div class="col-sm-4 adminResetPasswordDiv">
				<div class="row usernameText">your username:{{adminIdForNewPassword}}</div>
				<div class="row">
				<form class="form-horizontal" role="form">
				    <div class="col-sm-3"></div>
				    <div class="col-sm-6">
					<div class="form-group">						    
					    <input type="password" class="form-control passwordTextBox"  ng-model="adminNewPassword" placeholder="Enter new Password">
					</div>
					<div class="form-group">
						<input type="password" class="form-control passwordTextBox" ng-model="adminConfirmNewPassword" placeholder="Confirm  new Password">
					</div>
					<div class="form-group">
						<button type="submit" ng-click="setAdminNewPassword()" class=" btn btn-info" translate='RESET_PASSWORD'></button>
					</div>
					</div>
					<div class="col-sm-3"></div>
				</form>
				</div>
				<div class="row adminResetPasswordSuccessMsg"><p>{{adminSetNewPasswordSuccessMsg | translate}}</p></div>
			</div>
			<div class="col-sm-4"></div>
		</div>
		<div class="row" ng-hide="showAdminResetPasswordDiv">
		     <p class="resetSuccesmsg">{{adminSetNewPasswordSuccessMsg | translate}}</p>
		</div>
	
</div>
  
  <!-- END- Divison to reset admin password  --- END ---->
       
    </c:when>
    <c:otherwise>
        
               <!-- for showing admin login modal -->
  <script type="text/ng-template" id="AdminLogin.html"> 
     <div style="background-color: #858585">
       <div class="modal-header AdminLoginHeader" ng-show="!showforgotPasswordDiv">
          <div class="row"> 
            <div class="col-sm-2"></div>
            <div class="col-sm-8">
              <h3 class="AdminLoginFormHeading" ><label translate='Admin_Login'></label></h3>
            </div>
            <div class="col-sm-2"></div>
          </div>
          <div class="modal-body AdminLoginBody">
             <div class="row"><div class="col-sm-12"><p>  </p></div> </div>
             <div class="row"><div class="col-sm-12"><p>  </p></div> </div>
             <div class="row"><div class="col-sm-12"><p>  </p></div> </div>
         <div class="row"> 
            <div class="col-sm-2"></div>
            <div class="col-sm-8">
              <form role="form">
                  <div class="form-group">                      
                     <!-- <label for="email">Admin ID:</label> -->
                     <input type="text" maxlength="15" class="form-control" placeholder="Please Enter AdminId" 
                        uib-popover="{{userNamePropoverMsg | translate}}" popover-is-open="enableUsernamePropover" ng-change="AdminIdValidation()" ng-model="Admin.userName">
                  </div>
                  <div class="form-group">
                     <!-- <label for="pwd">Password:</label> -->
                     <input type="{{adminPasswordType}}" maxlength="30" class="form-control" placeholder="Please Enter Password" 
                          uib-popover="{{passwordPropoverMsg | translate}}"  popover-is-open="enablePasswordPropover" ng-change="passwordValidation()" ng-model="Admin.password">
                  </div>
                  <div class="form-group">
                     <div class="row">
                         <div class="col-sm-6">
                              <input type="checkbox" ng-model="showPassword" ng-click="showAdminPassword()"><label translate="SHOW_PASSWORD"></label>
                         </div>
                         <div class="col-sm-6 te">
                              <a href="" class="forgotPassword text-right" ng-click="adminForgotPassword()"><label translate="FORGOT_PASSWORD"></label></a>
                         </div>
                     </div>
                  </div>
                  <div class="row">
                      <div class="col-sm-2"></div>
                      <div class="col-sm-4">
                         <button class="btn btn-info btn-Text btn-Primary-Color" ng-disabled="loginButtonDisable" ng-click="AdminLogin()" translate='SIGN_IN'></button>
                      </div>
                      <div class="col-sm-6">
                          
                         <button class="btn btn-danger btn-Text" " ng-click="closeModal()" translate='CANCEL'></button>
                      </div> 
                 </div>                                 
              </form>
              <div class="row"><div class="col-sm-12"><p class="text-center adminLoginValidationMsg">{{adminLoginSuccessMsg | translate}}</p></div></div>
             </div>
            <!-- <div class="col-sm-12"><button class="btn btn-sm btn-danger btn-Text" style="float:right;" ng-click="closeModal()">cancel</button></div> -->
         </div>
              <!-- <div class="row adminLoginValidationMsgDiv">
                <p class="adminLoginValidationMsg">{{adminLoginValidationMsg}}</p>
              </div> -->
          </div>
          <!-- <div class="modal-footer AdminLoginFooter">                      
                <button class="btn btn-sm btn-danger" ng-click="closeModal()">cancel</button>                                             
           </div> -->
        </div>
        

          <div class="jumbotron" id="jumbotron1"	 ng-show="showforgotPasswordDiv">
                         <p align="center"><font color="green">{{successmsg | translate}}</font></p>
			<form role="form" ng-submit="getForgotPassword()">
				<div id="forgotDiv1" ng-hide="hide1">
					<img
						src="http://s30.postimg.org/5mqz3osvl/Forgot_Password_icon.png"
						width="90" height="120">
				</div>
                
				<div class="form-group" >
                           <div id="forgotDiv2" ng-hide="hide1">
					<h2>{{'FORGOT_PASSWORD'| translate}}</h2><br />
                      <p><font color="red">{{failedmsg}}</font></p>
               <div class="row" ng-class="{'has-error' : !adminid}">
                    <div class="col-xs-9">
					<label class='control-label' translate='ENTER_ID'></label>
                     <input type="number" ng-model="adminid" class="form-control" 
                            placeholder="enter id" uib-tooltip="please enter valid 6 digits id" 
                         tooltip-placement="bottom" tooltip-trigger="mouseenter" size="6"
						tooltip-enable="!adminid" minlength="6" maxlength="6" 
                        required><br />
                     </div>
                </div>
                   <div class="row" ng-class="{'has-error' : !email}">
					<div class="col-xs-9">
					<label class='control-label' translate='ENTER_EMAIL_ADDRESS'></label>
					<input type="email" ng-model="email" class="form-control"
						placeholder="enter your email address"
						uib-tooltip="please enter valid email address"
						tooltip-placement="bottom" tooltip-trigger="mouseenter"
						tooltip-enable="!email"
						ng-pattern="/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/"
						required /></div><br />
                       </div>
					<br /><br />
					<button id="btn1" type="submit" class="btn btn-primary" ng-disabled="!email || !adminid"  translate='SUBMIT'></button>
</div>					
 <br /><a href=""  ng-click="adminForgotPassword()" translate='BACK_TO'></a>		
          </div>
			</form>
		</div>
         
</div>
     </script>
     
     
     <script type="text/ng-template" id="AlredyEditingEmployee.html"> 

       <div class="modal-header">
      
          <div class="modal-body">
             <div class="row">
                  <div class="col-sm-12">
                        <b>You are currently editing Emp ID: {{currentlyEditingEmployee}}<br> please save changes </b>
                   </div>                     
             </div>
             
          </div>
          <div class="modal-footer">                      
                <button class="btn btn-sm btn-danger" ng-click="closeModal()" translate='ClOSE'></button>                                             
           </div>
         
       </div>
   </script> 
     
    
  
  <!-- Top menu -->
  <div class="row" > 
  
    <div class="col-sm-10" ></div>
    <div class="col-sm-2" >
       <button type="button" ng-show="showAdminLoginButton"  class="btn-group-justified btn btn-info btn-Text btn-Primary-Color"  ng-click="showAdminLoginModal()" translate="Admin_Login"></button>  <!-- style="margin-left: 69%"  -->
     </div>
     <!-- <div class="col-sm-1"></div>  -->
  </div>
 
 
  <!-- form to take employee Attendance -->
  <div class="row" style="margin-top: 150px" ng-show="!showAdminDashBoard">  <!-- ng-show="!showAdminDashBoard" -->
  
  
       <form role="form" class="form-horizontal  attendanceDiv" name="myForm" ng-submit="redirect(empId)" method="post" novalidate align="center">
           <div class="form-group">			
				<p class="enterText" ng-model="employeeIdLength" translate="ENTER_EMPLOYEE_ID"></p>			
		   </div>
		   <div class="form-group">			
				<input type="text" ng-class="cssClass" name="empId" ng-model="empId" autocomplete="off"
					ng-keyup="validateData()" maxlength="6"
					placeholder="Please Enter Employee ID" required>			
		   </div>
		   <div class="form-group msgDiv">			
				<p class="msg" ng-sipt
				how="showInvalidMsg">{{invalidMsg | translate}}</p>			
		   </div>
		   <div class="form-group ">			
				<Button  class="btn btn-info btn-Text btn-Primary-Color" ng-disabled="buttonDisable">{{buttonText | translate}}</Button>  <!-- id="loginButton" -->			
		   </div>
         
		 </form>
		 <div class="row"> <div class="col-sm-12"></div> </div>
		 <div class="row"> <div class="col-sm-12"></div> </div>
		 <div class="row"> <p class="errorOrSuccessMessageOnPage">{{errorOrSuccessMessageOnPage | translate}}</div>
		 
		 <div class="row" ng-hide="true"><p>  all empIds: {{jsondata}}</p>
		
		           <p>Loggedin empIds :  {{loggedInIds}}</p>
		
		           <p> LoggedOut empIds : {{jsonLoggedOut}}</p>
		 </div>
  
  </div>
 
 <!--Admin-Dashboard after successful login  -->
  <div class="row" ng-show="showAdminDashBoard"> <!-- ng-show="showAdminDashBoard" -->
    <div class="col-sm-2" >
      <uib-accordion close-others="oneAtATime">
        <uib-accordion-group class="panel-heading panelBG"   is-Open="true"  >
        <uib-accordion-heading >
        <p translate="Manage_Employee"></p>
        </uib-accordion-heading>
            <div><a href="" class="linkColor" ng-click="addEmployeeDetails()" translate="ADD_EMPLOYEE"> </a> </div><br> 
            <div><a href="" class="linkColor" ng-click="viewOrUpdateEmployee()" translate="VIEW_UPDATE_EMPLOYEE"></a></div>
           <!--  <div><a href="getExcel.do" class="linkColor" ng-click="viewOrUpdateEmplo" >download excel file</a></div> -->
        </uib-accordion-group>
        <uib-accordion-group class="panel-heading panelBG" >
         <uib-accordion-heading >
        <p translate="REPORTS"></p>
        </uib-accordion-heading>
            <uib-accordion close-others="oneAtATime">
               <div><a href="" class="linkColor" ng-click="redirectToGenerateReportPAge()" translate="GENERATE_REPORT"></a></div>
            </uib-accordion>
       </uib-accordion-group>
       
        <uib-accordion-group class="panel-heading panelBG " ><!-- is-open="!showInitialAccordion" -->
         <uib-accordion-heading >      
        <p translate="View_Attendance"></p>
        </uib-accordion-heading>
            <div ><a href="" class="linkColor" ng-click="showPie()" translate="DAILY_ATTENDANCE"></a></div>
        </uib-accordion-group>
        <uib-accordion-group class="panel-heading panelBG " ><!-- is-open="!showInitialAccordion" -->
         <uib-accordion-heading >
        <p translate="PRODUCTIVITY"></p>
        </uib-accordion-heading>
            <div ><a href="" class="linkColor" ng-click="showLineForm()"></a></div>
            <div ><a href="" class="linkColor" ng-click="showLineForm()" translate="WEEKLY_PRODUCTIVITY"></a></div>
            <div ><a href="" class="linkColor" ng-click="showBar()" translate="ANNUAL_PRODUCTIVITY"></a></div>
        </uib-accordion-group>
                       <uib-accordion-group class="panel-heading panelBG "  ><!-- is-open="!showInitialAccordion" -->
         <uib-accordion-heading >
        <p translate="SETTINGS"></p>
        </uib-accordion-heading>
            <div><a href="" class="linkColor" ng-click="adminChangePasswordDivEnable()" translate="CHANGE_PASSWORD"></a> </div><br> 
            <!-- <div><a href="" class="linkColor" ng-click="addNewAdministratorDivEnable()">Add Administrator</a> </div><br>  -->
            <div ><a href="" class="linkColor" ng-click="logOut()" translate="LOGOUT"></a></div>
        </uib-accordion-group>
     </uib-accordion>
   </div>
   
  <!--Middle container Division  -->
   <div class="col-sm-10">

  
  
 <!--  Division for Adding single and multiple employees through excel file -->
 
      <!-- Add employee Division -->
   <div  class="row addEmployeeMainDivision" ng-show="showAddEmployeeMainDiv" > <!-- ng-show="showAddEmployeeMainDiv"       id="section" -->
         <div class="row" >  <!--  id="importEmployeeDataDiv" -->
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                  <p class="AddEmpText" translate='ADD_EMPLOYEE'></p>   <!-- id="AddEmpText" -->           
                  <Button class="btn btn-md btn-warning"ng-click="showFromExcelDiv()" translate='FROM_EXCEL'></Button>  <!--  id="excelbutton" -->
                  <button class="btn btn-md btn-warning" ng-click="showAddEmployeeDiv()" translate='MANUALLY'></button>   <!-- id="manualButton" -->
             </div>
            <div class="col-sm-4"></div>   
        </div>
        <div class="row" ng-show="showExcelDiv">   <!-- id="fromExcelDiv" -->
        
            <div class="col-md-4"></div>
            <div class="col-sm-4  selectExcelFileDiv">
                  <p class="excelDivText" translate='Select_Excel'></p>  <!-- id="excelDivText" -->
                  <input type="file" class="btn btn-md btn-default"  ng-model="excelFilePath" onchange="angular.element(this).scope().file_changed(this)" value="Browse" />              
                  <button  class="btn btn-md btn-info info" ng-click="uploadFile()" translate='UPLOAD'></button>   <!-- id="uploadButton" -->
                  <p class="EmployeeSuccessMsg">{{fileUploadSuccessMsg | translate}}</p>
             </div>
            <div class="col-sm-5"></div>   
        </div>
        <div class="row manuallyEnterEmployeeDiv" ng-show="showManuallyEnterDiv">  <!--  id="ManuallyEnterDiv" -->
            <div class="row">
                <div class="col-sm-1"> </div>
                <div class="col-sm-3 addSingleEmployeeDiv">                  
                    <form role="form">
                      <div class="form-group">
                         <label for="email" translate="EMPLOYEE_ID"></label>
                         <input type="text" class="form-control" ng-model="empId" required >
                      </div>
                      <div class="form-group">
                         <label for="pwd" translate="FNAME"></label>
                         <input type="text" class="form-control" ng-model="empFirstName" required>
                      </div>
                      <div class="form-group">
                         <label for="pwd" translate="LNAME"></label>
                         <input type="text" class="form-control" ng-model="empLastName" required>
                      </div>
                   
               </div>
               <div class="col-sm-3 addSingleEmployeeDiv">
                       
                      <div class="form-group">
                         <label for="email" translate="DOB"></label>
                         <input type="date" class="form-control" ng-model="DOB" required >
                      </div>
                      <div class="form-group">
                         <label for="pwd" translate="MOB"></label>
                         <input type="text" class="form-control" ng-model="mobile" required>
                      </div>
                      <div class="form-group">
                         <label for="pwd" translate="EMAIL"></label>
                         <input type="text" class="form-control" ng-model="emailId" required>
                      </div>
               </div>
              <div class="col-sm-3 addSingleEmployeeDiv">
                      <div class="form-group">
                         <label for="email" translate="DESIGNATION"></label>
                         <input type="text" class="form-control" ng-model="designation" required >
                      </div>
                      <div class="form-group">
                         <label for="pwd" translate="ROLE"></label>
                         <select class="form-control" ng-model="roleId" required>
                            <option ng-repeat="role in roleArray" value="{{role.roleId}}">{{role.roleId}} ( {{role.roleType}} )</option> 
                         </select>
                      </div>
                      <div class="form-group">
                         <label for="pwd" translate="DEPARTMENT"></label>
                         <select class="form-control" ng-model="deptId" required>
                            <option ng-repeat="dept in deptArray" value="{{dept.deptId}}">{{dept.deptId}} ( {{dept.deptName}} )</option>  
                         </select>        
                      </div>               
               </div>   
               <div class="col-sm-2"> </div>
          </div>
          <div class="row">
              <div class="col-sm-4"></div>
              <div class="col-sm-4">
                  <div class="row">
                      <button type="submit" class="btn btn-info" ng-click="addEmployee()" translate="Save"></button> 
                   </div>                                 
                   <div class="row">
                       <span id="EmployeeSuccessMsg">{{addEmployeeSuccessMsg|translate}}</span>   
                    </div>                
              </div>             
              <div class="col-sm-4"></div>    
         </div>            
      </div>         
   </div>
   <!-- END ------ Division for Adding single and multiple employees through excel file ------ END  -->
   <!-- BEGIN  --- Division for View or update employee details -- BEGIN -->   
   <div class="row editOrUpdateEmployeeDivision" ng-show="showViewOrUpdateEmployeeDiv">
    <div class="row">
       <div class="col-sm-3">
          <label>{{"SEARCH"|translate}}</label>
          <form>
            <input type="text" ng-model="search" placeholder="search Employee"  class="form-control" ng-disabled="disableSearchBoxForEmployee">
          </form>
       </div>
       <div class="col-sm-1"></div>
       <div class="col-sm-3">
       <form>
             <label>{{"PAGE"|translate}}</label><select class="form-control" ng-model="itemsPerPage" ng-change="changePaginationDisplayResults()">
                 <option value="10" selected>10</option>
                 <option value="25">25</option>
                 <option value="50">50</option>
            </select>
           </form>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-4">
          <uib-pagination total-items="totalPaginationEmployeesCount" ng-model="currentPaginationPage" ng-change="chanePagination()" 

                   max-size="4" class="pagination-md" boundary-links="true" rotate="false" num-pages="numberOfPaginationPages"></uib-pagination>
       
        </div>        
    </div>
    <div id="viewEmployeeDetails">
    <div class="table-responsive">
    <table  class="table row-border table-bordered table-hover">
    <thead>
    <tr>
          <th ng-click="sort('employeeId')" class="hand"  title="click to sort">Emp Id <span class="glyphicon" ng-show="sortKey=='employeeId'" ng-class="{'glyphicon-sort-by-attributes-alt':reverse,'glyphicon-sort-by-attributes':!reverse}"></span>
     </th>
     <th title="click to sort" ng-click="sort('firstName')" class="hand" >First Name <span
      class="glyphicon" ng-show="sortKey=='firstName'"
      ng-class="{'glyphicon-sort-by-attributes-alt':reverse,'glyphicon-sort-by-attributes':!reverse}"></span>
     </th>
     <th ng-click="sort('lastName')" class="hand"  title="click to sort">Last Name <span
      class="glyphicon" ng-show="sortKey=='lastName'"
      ng-class="{'glyphicon-sort-by-attributes-alt':reverse,'glyphicon-sort-by-attributes':!reverse}"></span>
     </th>
     <th ng-click="sort('dob')" class="hand"  title="click to sort" >Date Of Birth <span
      class="glyphicon" ng-show="sortKey=='dob'"
      ng-class="{'glyphicon-sort-by-attributes-alt':reverse,'glyphicon-sort-by-attributes':!reverse}"></span>
     </th>
     <th>Mobile No <!-- ng-click="sort('mobileNo')"  -->
     <span class="glyphicon" ng-show="sortKey=='mobileNo'"
      ng-class="{'glyphicon-sort-by-attributes-alt':reverse,'glyphicon-sort-by-attributes':!reverse}"></span>
     </th>
     <th >Email Id <!-- ng-click="sort('emailId')" -->
     <span class="glyphicon" ng-show="sortKey=='emailId'"
      ng-class="{'glyphicon-sort-by-attributes-alt':reverse,'glyphicon-sort-by-attributes':!reverse}"></span>
     </th>
     <th ng-click="sort('designation')" class="hand"  title="click to sort">Designation <span
      class="glyphicon sort-icon" ng-show="sortKey=='designation'"
      ng-class="{'glyphicon-sort-by-attributes-alt':reverse,'glyphicon-sort-by-attributes':!reverse}"></span>
     </th>
     <th ng-click="sort('rollId')" class="hand"  title="click to sort">Role Id <span
      class="glyphicon" ng-show="sortKey=='rollId'"
      ng-class="{'glyphicon-sort-by-attributes-alt':reverse,'glyphicon-sort-by-attributes':!reverse}"></span>
     </th>
     <th ng-click="sort('status')" class="hand"  title="click to sort">Status <span
      class="glyphicon" ng-show="sortKey=='status'"
      ng-class="{'glyphicon-sort-by-attributes-alt':reverse,'glyphicon-sort-by-attributes':!reverse}"></span>
     </th>
     <th ng-click="sort('deptId')" class="hand"  title="click to sort">Dept Id <span
      class="glyphicon" ng-show="sortKey=='deptId'"
      ng-class="{'glyphicon-sort-by-attributes-alt':reverse,'glyphicon-sort-by-attributes':!reverse}"></span>
     </th>
     <th>edit/save</th>
    </tr>
    </thead>
    <tbody>
 
   <tr  ng-class-even="'success'" ng-class-odd="'active'" ng- ng-repeat="employee in AllEmployees | orderBy:sortKey:reverse | filter:search "> 
       
         <td> {{ employee.employeeId }}<input type="text" ng-hide="true" ng-model="editEmp[$index].employeeId"></td>
         <td ng-hide="showdecisonArray[$index]">{{ employee.firstName }}</td> <td ng-hide="!showdecisonArray[$index]">
                 <input class="form-control editTextBoxMedium" type="text" ng-model="editEmp[$index].firstName" placeholder="First Name"></td>
          <td ng-hide="showdecisonArray[$index]">{{ employee.lastName }}</td> <td ng-hide="!showdecisonArray[$index]">
                  <input class="form-control editTextBoxMedium" type="text" ng-model="editEmp[$index].lastName" placeholder="Last Name"></td>
                  
          <td ng-hide="showdecisonArray[$index]">{{ employee.dob | date: "dd-MM-yyyy"}}</td> <td ng-hide="!showdecisonArray[$index]">
                 <input class="form-control editTextBoxDOB" type="date" ng-model="editEmp[$index].dob"></td>
          <td ng-hide="showdecisonArray[$index]">{{ employee.mobileNo }}</td> <td ng-hide="!showdecisonArray[$index]">
                  <input class="form-control editTextBoxMedium" type="text" ng-model="editEmp[$index].mobileNo" placeholder="Mobile Number"></td>
          <td ng-hide="showdecisonArray[$index]">{{ employee.emailId }}</td> <td ng-hide="!showdecisonArray[$index]">
                 <input class="form-control editTextBoxLarge" type="text" ng-model="editEmp[$index].emailId" placeholder="Email ID"></td>
          <td ng-hide="showdecisonArray[$index]">{{ employee.designation }}</td> <td ng-hide="!showdecisonArray[$index]">
                  <input class="form-control editTextBoxDesignation" type="text" ng-model="editEmp[$index].designation" placeholder="Designation"></td>
                  
          <td ng-hide="showdecisonArray[$index]">{{ employee.rollId }}</td> <td ng-hide="!showdecisonArray[$index]">
                 <input class="form-control editTextBoxSmall" type="text" ng-model="editEmp[$index].rollId" placeholder="Role ID"></td>
          <td ng-hide="showdecisonArray[$index]">{{ employee.status }}</td> <td ng-hide="!showdecisonArray[$index]">
                  <input class="form-control editTextBoxSmall" type="text" ng-model="editEmp[$index].status" placeholder="status "></td>
          <td ng-hide="showdecisonArray[$index]">{{ employee.deptId }}</td> <td ng-hide="!showdecisonArray[$index]">
                  <input class="form-control editTextBoxSmall" type="text" ng-model="editEmp[$index].deptId" placeholder="Department ID "></td>
                  
         <!--  <td>{{$index}}</td> -->
          <td>
              <button class="btn btn-sm btn-info" ng-click="editEmployee(employee.employeeId,$index)">{{buttonTextArray[$index]}}</button><br>
              <button class="btn btn-sm btn-danger" ng-if="buttonTextArray[$index]=='Save'" ng-click="cancelEditEmployee(employee.employeeId,$index)" translate="CANCEL"></button>
          </td> 
    
       </tbody>
      
    </table>
    </div>
    <!-- This division for print  view employee division -->
    <div ng-hide="true" id="print-view-employee-div"> 
             
          <p align="center"><b>Employee Details</b></p>
          <table border="1">
           <thead>
             <tr>
              <th >Emp Id </th>
              <th  >First Name</th>
              <th>Last Name</th>
              <th>Date Of Birth</th>
              <th>Mobile No</th>
              <th>Email Id</th>
              <th>Designation </th>
              <th>Role Id </th>
              <th >Status</th>
              <th>Dept Id </th>
            </tr>
        </thead>
        <tbody>
           <tr ng-repeat="employee in AllEmployees | filter:search	| orderBy:sortKey:reverse">       
              <td> {{ employee.employeeId }}</td>
              <td>{{ employee.firstName }}</td>                 
              <td>{{ employee.lastName }}</td>                   
              <td >{{ employee.dob | date: "dd-MM-yyyy"}}</td> 
              <td >{{ employee.mobileNo }}</td> 
              <td >{{ employee.emailId }}</td> 
              <td >{{ employee.designation }}</td>                  
              <td>{{ employee.rollId }}</td> 
              <td >{{ employee.status }}</td> 
              <td>{{ employee.deptId }}</td> 
           </tr>    
       </tbody>
       
     </table>
      <p align="right" ng-if="numberOfPaginationPages <= 1">page 1 0f 1 </p>
      <p align="right" ng-if="numberOfPaginationPages > 1">page {{currentPaginationPage}} 0f {{numberOfPaginationPages}} </p>     
    </div> <!--  END -- print view employee div -->

</div>

 <div class="row">
    
   <!--  <div class="col-sm-5"> <button class="btn btn-primary btn-sm custom-width" ng-click="showExcelView()" >excel view</button>  translate='Excel_View'</div> -->
 
    <div class="text-center">
    					<!-- <button class="btn btn-primary btn-sm custom-width" ng-click="showExcel()" translate='Excel_View'></button> -->
                       <button class="btn btn-primary btn-md custom-width" ng-click="printViewEmployeeDiv('print-view-employee-div')" ><span class="glyphicon glyphicon-print"> {{"PRINT" | translate}}</span></button>
                       <!-- <button class="btn btn-primary btn-sm custom-width" ng-click="showExcelView()" translate='Excel_View'></button> -->
       
    </div>
 </div>
 <!-- <uib-pagination total-items="totalPaginationEmployeesCount" ng-model="currentPaginationPage" ng-change="chanePagination()" 

        max-size="4" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numberOfPaginationPages"></uib-pagination> -->
  
 <!-- <p>total pages: {{totalPaginationEmployeesCount}}/{{numberOfPaginationPages}}</p>  

  <p>items per page: {{itemsPerPage}}</p>  

 <p>editing firstName: {{editEmp.FirstName}} lastName: {{editEmp.LastName}} </p> -->
  <!-- <p>edit emp array length: {{editEmp}}</p>
  <p>original array: {{test}}</p> -->
</div>
   
   <!-- END ------ Division for View or update employee details ------ END  -->
   
   <!--  Division for Adding new Administrator -->
   
   <!-- <div ng-show="showAddNewAdminDiv">
   
        <div class="row">
             
              <div class="form">
        
        
        </div>
        
        </div>
   
   </div> -->
   
   
   <!-- END ------ Division for Adding new Administrator ------ END  -->
   
   <!--  Division for changing adminstrator password -->
   
   <div class="row" id="changePasswordMainDiv" ng-show="showAdminChangePasswordDiv"> <!-- ng-show="showChangePasswodDiv" -->
	 
	     <div class="jumbotron" id="jumbotron2"  ng-hide="hide">
     <p><font color="red">{{msg1 | translate}}</font></p>
		<div class='row'>
			<div class="col-xs-6 col-md-4">
				<img src="http://s11.postimg.org/89jw5zva7/editicon.png" width="80"
					height="120">
			</div>
			<div class="col-xs-12 col-md-8">
				<form role="form" novalidate>
					<div class='row'>
						<div class='col-sm-12'>
							<div class="form-group"
								ng-class="{'has-error' : !currentpassword}">
								<label class='control-label' translate="Current_Password"></label> <input
									class='form-control' type='password' ng-model="currentpassword"
									type="password"
									uib-tooltip="check caps lock before enter password"
									tooltip-trigger="focus" class="form-control"
									tooltip-enable="!currentpassword" tooltip-placement="top"
									minlength="4" maxlength="20" >
							</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-sm-12'>
							<div class="form-group" ng-class="{'has-error' : !pwd}">
								<label class='control-label' translate="New_Password"></label>
								<!-- <input autocomplete='off' class='form-control' size='20' type='text'> -->
								<input ng-model="password" type="password"
									ng-change="getConfirm()"
									uib-tooltip="Your password should contain at least one digit, one capital and special symbol[ @ # $ %], should have the length from 8 to 20 symbols"
									tooltip-trigger="focus" class="form-control"
									tooltip-enable="!pwd" tooltip-placement="top"
									ng-pattern="/^(?=.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(?=.*[@#$%])/"
									minlength="8" maxlength="20" >
							</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-sm-12'>
							<div class="form-group" ng-class="{'has-error' : !repwd}">
								<label class='control-label' translate="Confirm_Password"></label> <input
									class='form-control' ng-model="repassword" type='password'
									ng-change="getConfirm1()"
									uib-tooltip="New password and confirm password must be same"
									tooltip-trigger="focus" class="form-control"
									tooltip-enable="!repwd" tooltip-placement="top" minlength="8"
									>
							</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-md-12'>
							<button class='btn btn-primary'
								ng-click="getChangePassword()"
								ng-disabled="!pwd ||!currentpassword || !repwd" translate="Save"></button>
							<button class='btn btn-primary' ng-click="getClear()" translate="Reset"></button>
						</div>
					</div>
				</form>
			</div>

		</div>
	</div>
 
	 </div><!-- Change password division close-->
	 
	  <!-- END ------ Division for changing adminstrator password ------ END  -->
	  
	<!-- < Division for generate report page  > -->
	  <div id="showGenerateReport" ng-show="showGenerateReportDiv" >
	 
	 <div id="d1">
		<h2 >{{"Caprus_IT_Staff_Attendance_Report"|translate}}</h2>
	</div>
	<div id="searchcriteria">
		<h4>
			<b><label translate='SEARCH_CRITERIA'></label></b>
		</h4>
	</div>
	<br>
	<label class='control-label'>{{"SEL_TYPE"|translate}}</label>
	<select ng-model="sel" ng-change="getDis()" >
		<option title="" value="">--Select--</option>
		<option value="single">Single</option>
		<option value="all">All</option>
	</select>&nbsp;&nbsp;
	<input id="searchid" type="text" ng-model="id"
		uib-typeahead="state for state in employeeids |filter:id"
		placeholder="search employee by id/name" ng-disabled="f1"
		ng-keyup="getCheck()">&nbsp;&nbsp;
	<label class='control-label'>{{"REPORT_TYPE"|translate}}</label>
	<select ng-model="sel1" ng-change="getStatu()">
		<option title="" value="">--Select Report Type--</option>
		<option value="none">Total Records</option>
		<option value="day">Day</option>
		<!-- <option value="week">Week</option>
		<option value="month">Month</option>
		<option value="annual">Annual</option> -->
		<option value="dates">Select From and To Date</option>
	</select>&nbsp;
	<p ng-hide="hide11">{{"FROM_DATE"|translate}}</p>
	<input id="dateid" type="date" ng-model="from" ng-hide="hide11">&nbsp;
	<p ng-hide="hide12">{{"TO_DATE"|translate}}</p>
	<input id="dateid" type="date" ng-model="to" ng-hide="hide12">
	<button class='btn btn-primary' ng-click="getAttendance()">{{"SUBMIT"|translate}}</button>
	<div  id="fixed" class="btn-group"  uib-dropdown uib-keyboard-nav>
	<p  id="simple-btn-keyboard-nav" uib-dropdown-toggle><b>Productivity Info</b></p>
	<p id="production"  class="uib-dropdown-menu" role="menu" aria-labelledby="simple-btn-keyboard-nav">
	user : Admin,EMS<br />
	Total Company Worked Hours: {{totalhours}} hr<br />
	Worked Hours : {{selectedhours}} hr  
	</p>
	</div>
	<div id="searchcriteria">
		<h4>
			<b>{{"SEARCH_RESULT"|translate}}</b>
		</h4>
	</div>
	<div id="main1">
		<p ng-hide="hide4" align="center"><font size='4' color={{color1}} translate="No_Matches_Found"></font></p>
		<div id="pdiv">
			<div ng-hide="res">
				<font color="red">{{result | translate}}{{criteria}}</font>
			</div>
			<div ng-hide="hide1" id="nameofemp">
				<ul>
					<li>{{"EMPLOYEE_ID"|translate}}</li>
					<li>{{"EMPLOYEE_NAME"|translate}}</li>
					<li>{{"EMPLOYEE_DESIG"|translate}}</li>
				</ul>
			</div>
			<div ng-hide="hide1" id="nameofemp1">
				<ul id="ul1">
					<li>:&nbsp;&nbsp;<i>{{singleEmpReportEmpId}}</i></li>
					<li>:&nbsp;&nbsp;<i>{{singleEmpReportEmpName}}</i></li>
					<li>:&nbsp;&nbsp;<i>{{singleEmpReportEmpDesignation}}</i></li>
				</ul>
			</div>
			<div id="resultperpage">
				<label ng-hide="newhide1">{{"RESULT_PER_PAGE"|translate}}</label><select ng-model="viewby"
					ng-change="setItemsPerPage(viewby)" ng-hide="newhide1">
					<option title="">5</option>
					<option>10</option>
					<option>20</option>
					<option>30</option>
					<option>40</option>
					<option>50</option>
				</select>
			</div>
			<div ng-hide="hide2">
				<table class="table table-striped table-condensed table-hover"
					border='2'>
					<thead>
						<tr>

							<th>Date</th>
							<th>StartTime</th>
							<th>EndTime</th>
							<th>WorkingHours</th>
							<th>DayIndicator</th>
						</tr>
					</thead>

					<tbody>
						<tr
							ng-repeat="at in ats.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage))">
							<td>{{at.attendanceDate | date:'dd-MM-yyyy'}}</td>
							<td>{{at.startTime | date:'h:mm a'}}</td>
							<td>{{at.endTime | date :'h:mm a'}}</td>
							<td>{{at.workingHours}}</td>
							<td>{{at.dayIndicator}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div ng-hide="hide3">
				<table class="table table-striped table-condensed table-hover"
					border='2'>
					<thead>
						<tr>
							<th>EmpId</th>
							<th>Date</th>
							<th>StartTime</th>
							<th>EndTime</th>
							<th>WorkHours</th>
							<th>DayIndicator</th>
						</tr>
					</thead>

					<tbody>
						<tr
							ng-repeat="at1 in ats1.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage))"">
							<td>{{at1.employeeId}}</td>
							<td>{{at1.attendanceDate | date:'dd-MM-yyyy'}}</td>
							<td>{{at1.startTime  | date:'h:mm a'}}</td>
							<td>{{at1.endTime | date:'h:mm a'}}</td>
							<td>{{at1.workingHours}}</td>
							<td>{{at1.dayIndicator}}</td>
						</tr>
					</tbody>
				</table>
				
			</div>

			<p align="right" ng-hide="newhide1">Page: {{currentPage}} /
				{{numPages}}</p>
		</div>
			<div ng-hide="newhide1" align="center">
			<pagination total-items="totalItems" ng-model="currentPage"
				max-size="maxSize" class="pagination-sm" boundary-links="true"
				rotate="false" num-pages="numPages" items-per-page="itemsPerPage"></pagination>
		   </div>
	</div>
	<div id="printbtn">
		<br>
		<button class='btn btn-primary' ng-click="printDiv('pdiv');" translate="PRINT"></button>
	</div>
	 
	 </div> <!-- end of generate reports -->
	
<!--Div for pie charts  -->

<div  id="showChart" >
<div class="row">
  <div class="col-sm-9">
     
     <div  id="pie-holder" style="margin-top:%">
    
           <div class="row pageHeading alert alert-info" style="margin-bottom: 2%" translate="DAILY_ATTENDANCE"></div>
		   <canvas id="pieChart" width="400" height="400" ng-click="clickOnPie($event)" style="margin-left: 25%"></canvas>
			
    </div>
    
    <!-- New Changes need to be done of annual productivity for I18N  -->
    <div style="width: auto ;" id="bar-holder">
			<div class="row  pageHeading alert alert-info">{{"ANNUAL_PRODUCTIVITY"| translate}} {{annualProductivityEmployeeName}}  {{"OF" | translate}}      {{"DESIGNATION"| translate}} {{employeeDesignation}}</div>
			<canvas id="barChart" height="auto" width="auto" style="margin-left: 5%"></canvas>
		 	  
    </div> 
      <div style="width: auto" ; id="line-holder">
            <div class="row pageHeading alert alert-info" translate="WEEKLY_PRODUCTIVITY"></div>
			<div>
				<canvas id="lineChart" height="auto" width="auto" style="margin-left: 5%"></canvas>
			</div>
			 
		</div>
  </div>
  <div class="col-sm-3" >
  
  <div id="pieLegend" class="chart-legend"></div>
  <div id="barLegend" class="chart-legend" ></div>
  <div id="lineLegend" class="chart-legend" ></div>
  
  
  
  <!--line chart form  -->
  <div ng-show="showLineChartForm">
        <form class="form-vertical" role="form">
            <div class="form-group " style="color: red" >
               
               <label class=" col-sm-12 control-label" ng-model="validationMsg">{{validationMsg}}</label>

           </div>
            
            <div class="form-group">
                <label class=" col-sm-12 control-label" >{{"ENTER_EMPLOYEE_ID"|translate}}</label> 
              <div class="col-sm-12">
                     <input type="text" class="form-control" id="" ng-model="employeeId">
              </div>
            </div>
            
            <div class="form-group "  >
                 <label class=" col-sm-12 control-label" >{{"SEL_DATE"|translate}}</label>
              <div class="col-sm-12">
                     <input type="date" class="form-control"  ng-model="weeklyDate">
              </div>
            </div>
            
            
            <div class="form-group "  >
              <div class="col-sm-12">
                     <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  ng-click="showLine()">{{"SHOW"|translate}}</button>
              </div>
            </div>
            
       </form>
     </div>
     
       <!--bar chart form (monthly report) -->
  <div ng-show="showMonthlyReportForm">
        <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
             <br>
            <button class="btn btn-primary btn-Text" ng-click="AllEmployeeMonthlyReport()">{{"OVER_ALL_REPORT" | translate}}</button>
            <button class="btn btn-primary btn-Text" ng-click="individualMonthlyReport()">{{"INDIVIDUAL_REPORT" | translate}}</button>
        </div>
        <div class="col-sm-1"></div>
              
        </div>
  
        <form class="form-vertical" role="form" ng-show="showIndividualMonthlyForm">
            <div class="form-group " style="color: red" >              
               <label class=" col-sm-12 control-label text-center" >{{"INDIVIDUAL_REPORT" | translate}}</label>
           </div>            
           <div class="form-group">
                <label class=" col-sm-12 control-label" >{{"ENTER_EMPLOYEE_ID"|translate}}</label> 
              <div class="col-sm-12">
                  <input type="text" class="form-control" id="" ng-model="MonthlyReportEmployeeId">
              </div>
            </div>            
             <div class="form-group ">
                 <label class=" col-sm-12 control-label" >{{"SEL_DATE"|translate}}</label>  <!--  modify Date to Year-->
              <div class="col-sm-12">
                     <input type="text" class="form-control"  maxlength="4" ng-model="MonthlyReportYear">
              </div>
            </div>                        
            <div class="form-group "  >
              <div class="col-sm-12">
                  <br	>
                  <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  ng-click="showEmployeeAnnualReport()">{{"SHOW"|translate}}</button>
              </div>
            </div>
            <div class="form-group "  >
              <div class="col-sm-12">
                  <br>
                  <p class="text-center text-danger monthlyErrorMsg">{{employeeMonthlyReportMsg}}</p>
              </div>
            </div>
            
       </form>
       <form class="form-vertical" role="form" ng-show="!showIndividualMonthlyForm">
              <div class="form-group " style="color: red" >              
                <label class=" col-sm-12 control-label text-center">{{"OVER_ALL_REPORT" | translate}}</label>
              </div>         
              <div class="form-group ">
                 <label class=" col-sm-12 control-label" >{{"ENTER_YEAR"|translate}}</label>
                 <div class="col-sm-12">
                     <input type="text" class="form-control"  maxlength="4" ng-model="AllMonthlyReportYear">
                 </div>
              </div>                        
              <div class="form-group "  >
                 <div class="col-sm-12">
                   <br>
                   <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  ng-click="showAllEmployeeMonthlyReport()" translate="SHOW"></button>
                 </div>
              </div>
              <div class="form-group "  >
                <div class="col-sm-12">
                  <br>
                  <p class="text-center text-danger monthlyErrorMsg">{{AllemployeeMonthlyReportMsg}}</p>
                </div>
              </div>
            
        </form>
     </div>
  
  </div>  
</div>

<!--inline form for line chart  -->

<div class="col-sm-4">


</div>
<div ng-show="showLineChartInlineForm" class="col-sm-4" >

<form class="form-vertical" role="form">
            <div class="form-group " style="color: red" >
               
               <label class=" col-sm-12 control-label" ng-model="validationMsg">{{validationMsg}}</label>

           </div>
            <div class="form-group">
                <label class=" col-sm-12 control-label" >{{"ENTER_EMPLOYEE_ID"|translate}}</label> 
              <div class="col-sm-12">
                     <input type="text" class="form-control" id="" ng-model="employeeId">
                      
              </div>
            </div>
            
            <div class="form-group "  >
                 <label class=" col-sm-12 control-label" >{{"SEL_DATE"|translate}}</label>
              <div class="col-sm-12">
                     <input type="date" class="form-control"  ng-model="weeklyDate">
              </div>
            </div>
            
            
            <div class="form-group "  >
              <div class="col-sm-12">
                     <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  ng-click="showLine()">{{"SHOW"|translate}}</button>
              </div>
           </div>
          
           </form>

</div>
<div class="col-sm-4" ></div>



</div>
 
 
 
 

<div ng-show="showTableDetails">

<div class="alert alert-info pageHeading" >
  <span ng-model="listName">{{listName}}</span>
  </div>
  
  <form>
    <div class="form-group">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search" ng-model="search">
      </div>      
    </div>
  </form>
  
  <table class="table table-bordered table-striped">
    
    <thead>
      <tr>
       <td>
          <a href="#" ng-click="sortType = 'eid'; sortReverse = !sortReverse">
            Employee Id
            <span ng-show="sortType == 'eid' && !sortReverse" ></span>
            <span ng-show="sortType == 'eid' && sortReverse" ></span>
          </a>
        </td>
        <td>
          <a href="#" ng-click="sortType = 'fname'; sortReverse = !sortReverse">
            First Name
            <span ng-show="sortType == 'fname' && !sortReverse" ></span>
            <span ng-show="sortType == 'fname' && sortReverse" ></span>
          </a>
        </td>
        <td>
          <a href="#" ng-click="sortType = 'lname'; sortReverse = !sortReverse">
          Last Name 
            <span ng-show="sortType == 'lname' && !sortReverse" ></span>
            <span ng-show="sortType == 'lname' && sortReverse" ></span>
          </a>
        </td>
        <td>
          <a href="#" ng-click="sortType = 'itime'; sortReverse = !sortReverse">
          In-Time 
            <span ng-show="sortType == 'itime' && !sortReverse" ></span>
            <span ng-show="sortType == 'itime' && sortReverse" ></span>
          </a>
        </td>
        <td>
          <a href="#" ng-click="sortType = 'otime'; sortReverse = !sortReverse">
          Out-Time
            <span ng-show="sortType == 'otime' && !sortReverse" ></span>
            <span ng-show="sortType == 'otime' && sortReverse" ></span>
          </a>
        </td>
        <td>
          <a href="#" ng-click="sortType = 'whours'; sortReverse = !sortReverse">
          Working-Hours
            <span ng-show="sortType == 'whours' && !sortReverse"></span>
            <span ng-show="sortType == 'whours' && sortReverse" ></span>
          </a>
        </td>
      </tr>
    </thead>
    
    <tbody>
      <tr ng-repeat="person in persons | orderBy:sortType:sortReverse | filter:search">
        <td>{{ person.employee_id }}</td>
        <td>{{ person.first_name }}</td>
        <td>{{ person.last_name }}</td>
        <td>{{ person.In_time }}</td>
        <td>{{ person.Out_time }}</td>
        <td>{{ person.workingHours }}</td>
      
      </tr>
    </tbody>
    
  </table>
  

</div>
 </div>
  </div>  <!--  END of Admin DashBoard Division -->
  
    </c:otherwise>
 </c:choose>
  
  
  <!--footer Part  -->
  <!-- <div class="row" style=" margin-top: 300px;">
    <div  style=" background-color: #333333; max-height: 50px; " >  class=" navbar-fixed-bottom"
           <div class="col-sm-4 footerText" ><h4>© Copyright Caprus IT</h4></div>
           <div class="col-sm-4 "><img src="images/footer_logo.jpg" alt="footer logo" class="img-responsive"></div>
           <div class="col-sm-4 footerText text-right ">re-defining IT culture</div>
   </div> -->
</div> <!-- END of container division -->


<div ng-controller="LanguageController" style="margin-left: 15px">
     <button class="btn btn-primary" ng-click="changeLanguage('de')" translate="BUTTON_TEXT_DE"></button>
     <button class="btn btn-primary" ng-click="changeLanguage('en')" translate="BUTTON_TEXT_EN"></button>
     <button class="btn btn-primary" ng-click="changeLanguage('hi')" translate="BUTTON_TEXT_HI"></button>
 
</div>
  </body>
</html>

