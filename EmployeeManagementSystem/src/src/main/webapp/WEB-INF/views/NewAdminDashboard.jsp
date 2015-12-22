

<html ng-app="ui.ems.app">
 <head>
    <script src="./resources/angular.js"></script>
    <script src="./resources/ui-bootstrap-tpls-0.14.3.min.js"></script>
    <script src="./resources/angular-animate.js"></script><!-- https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-animate.min.js -->
    <script src="./resources/ui-attendanceForm.js"></script>
    
     
    <link href="./resources/bootstrap.min.css" rel="stylesheet">
    <link href="./resources/AdminDashboard.css" rel="stylesheet">
    <link href="./resources/AdminLogin.css" rel="stylesheet">
    <link href="./resources/AttendanceForm.css" rel="stylesheet">
    <link href="./resources/alert.css" rel="stylesheet">
    <link href="./resources/Admin_changePassword.css" rel="stylesheet">
    <link href="./resources/Admin_ViewOrEditEmployee.css" rel="stylesheet">
    <link rel="shortcut icon" type="image/x-icon" href="images/faviconlogo.png"/>
    
    
    <link rel="stylesheet" href="./resources/Admin_addEmployeeDetails.css">
    
    <!--for data tables  -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.js"></script>
    <script src="./resources/jquery.dataTables.min.js"></script>
    <script src="./resources/angular-resource.js"></script>
    <script src="./resources/angular-datatables.min.js"></script>
    <script src="./resources/angular-datatables.bootstrap.min.js"></script>
    <script src="./resources/bootstrap.min.js"></script> 
    <script src="./resources/alert.js"></script>
    <link rel="stylesheet" href="./resources/datatables.bootstrap.min.css">
    
   <!--  for charts -->
    <script src="./resources/Chart.js"></script>  

  </head>
   
  <body>

  <div class="container-fluid" ng-controller="ValidController">
  
  <!-- Header  Part-->
  <div class="row headerDiv"> 
    <uib-carousel interval="myInterval" no-wrap="noWrapSlides">
      <uib-slide ng-repeat="slide in slides" active="slide.active">
        <img ng-src="{{slide.image}}" style="margin: auto"> <!-- style="margin:auto;" -->
        <div class="carousel-caption">
        </div>
      </uib-slide>
    </uib-carousel>

  
  </div>
  <!-- for showing admin login modal -->
  <script type="text/ng-template" id="AdminLogin.html"> 
     <div style="background-color: #858585">
       <div class="modal-header AdminLoginHeader" ng-show="!showforgotPasswordDiv">
          <div class="row"> 
            <div class="col-sm-2"></div>
            <div class="col-sm-8">
              <h3 class="AdminLoginFormHeading" >Admin Login</h3>
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
                     <input type="text" maxlength="6" class="form-control" placeholder="Please Enter AdminId" 
                        uib-popover="{{userNamePropoverMsg}}" popover-is-open="enableUsernamePropover" ng-change="AdminIdValidation()" ng-model="Admin.userName">
                  </div>
                  <div class="form-group">
                     <!-- <label for="pwd">Password:</label> -->
                     <input type="{{adminPasswordType}}" maxlength="30" class="form-control" placeholder="Please Enter Password" 
                          uib-popover="{{passwordPropoverMsg}}"  popover-is-open="enablePasswordPropover" ng-change="passwordValidation()" ng-model="Admin.password">
                  </div>
                  <div class="form-group">
                     <div class="row">
                         <div class="col-sm-6">
                              <input type="checkbox" ng-model="showPassword" ng-click="showAdminPassword()">Show password
                         </div>
                         <div class="col-sm-6 te">
                              <a href="" class="forgotPassword text-right" ng-click="adminForgotPassword()">Forgot password?</a>
                         </div>
                     </div>
                  </div>
                  <div class="row">
                      <div class="col-sm-2"></div>
                      <div class="col-sm-4">
                         <button class="btn btn-info btn-Text btn-Primary-Color" ng-disabled="loginButtonDisable" ng-click="AdminLogin()">sign-In</button>
                      </div>
                      <div class="col-sm-6">
                          
                         <button class="btn btn-danger btn-Text" " ng-click="closeModal()">cancel</button>
                      </div> 
                 </div>                                 
              </form>
              <div class="row"><div class="col-sm-12"><p class="text-center adminLoginValidationMsg">{{adminLoginSuccessMsg}}</p></div></div>
             </div>
            <!-- <div class="col-sm-12"><button class="btn btn-sm btn-danger btn-Text" style="float:right;" ng-click="closeModal()">cancel</button></div> -->
         </div>
             
          </div>
        </div>       
          <div class="jumbotron"	 ng-show="showforgotPasswordDiv">
			<form role="form" ng-submit="my.getPassword()" novalidate>
				<div id="div2">
					<img
						src="http://s30.postimg.org/5mqz3osvl/Forgot_Password_icon.png"
						width="90" height="120">
				</div>
				<div class="form-group" ng-class="{'has-error' : !email}">
					<h2>Forgot your password?</h2>
					<b>please enter your email and we'll send reset password page
						link to your email.you can reset your password.</b><br /><br />
					<div class="col-xs-8">
					<label class='control-label'>ENTER EMAIL ADDRESS</label>
					<input type="email" ng-model="email" class="form-control"
						placeholder="enter your email address"
						uib-tooltip="please enter valid email address"
						tooltip-placement="bottom" tooltip-trigger="mouseenter"
						tooltip-enable="!email"
						ng-pattern="/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/"
						required /></div><br />
					<br /><br />
					<button type="submit" class="btn btn-primary" ng-disabled="!email" ng-click=""submitDetails()>submit</button>
					<br /> <a href="#">back to login</a>
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
                <button class="btn btn-sm btn-danger" ng-click="closeModal()">close</button>                                             
           </div>
         
       </div>
   </script> 
     
     
  
  <!-- Top menu -->
  <div class="row" > 
  
    <div class="col-sm-10" ></div>
    <div class="col-sm-2" >
       <button type="button" ng-show="showAdminLoginButton"  class="btn-group-justified btn btn-info btn-Text btn-Primary-Color"  ng-click="showAdminLoginModal()">Admin Login</button>  <!-- style="margin-left: 69%"  -->
     </div>
     <!-- <div class="col-sm-1"></div>  -->
  </div>
 
  <!-- form to take employee Attendance -->
  <div class="row" style="margin-top: 150px" ng-show="!showAdminDashBoard">  <!-- ng-show="!showAdminDashBoard" -->
  
  
       <form role="form" class="form-horizontal  attendanceDiv" name="myForm" ng-submit="redirect(empId)" method="post" novalidate align="center">
           <div class="form-group">			
				<p class="enterText" ng-model="employeeIdLength">Enter Employee ID</p>			
		   </div>
		   <div class="form-group">			
				<input type="text" ng-class="cssClass" name="empId" ng-model="empId" autocomplete="off"
					ng-keyup="validateData()" maxlength="6"
					placeholder="Please Enter Employee ID" required>			
		   </div>
		   <div class="form-group msgDiv">			
				<p class="msg" ng-sipt
				how="showInvalidMsg">{{invalidMsg}}</p>			
		   </div>
		   <div class="form-group ">			
				<Button  class="btn btn-info btn-Text btn-Primary-Color" ng-disabled="buttonDisable">{{buttonText}}</Button>  <!-- id="loginButton" -->			
		   </div>
         
		 </form>
		 <div class="row"> <div class="col-sm-12"></div> </div>
		 <div class="row"> <div class="col-sm-12"></div> </div>
		 <div class="row"> <p class="errorOrSuccessMessageOnPage">{{errorOrSuccessMessageOnPage}}</div>
		 
		 <div class="row" ng-hide="true"><p>  all empIds: {{jsondata}}</p>
		
		           <p>Loggedin empIds :  {{loggedInIds}}</p>
		
		           <p> LoggedOut empIds : {{jsonLoggedOut}}</p>
		 </div>
  
  </div>
 
 <!--Admin-Dashboard after successful login  -->
  <div class="row" ng-show="showAdminDashBoard"> <!-- ng-show="showAdminDashBoard" -->
    <div class="col-sm-2" >
      <uib-accordion close-others="oneAtATime">
        <uib-accordion-group class="panel-heading panelBG" heading="Manage Employee" is-Open="true"  >
            <div><a href="" class="linkColor" ng-click="addEmployeeDetails()"> Add Employee</a> </div><br> 
            <div><a href="" class="linkColor" ng-click="viewOrUpdateEmployee()">View / Update Employee</a></div>
        </uib-accordion-group>
        <uib-accordion-group class="panel-heading panelBG" heading="Reports"  >
            <uib-accordion close-others="oneAtATime">
               <div><a href="" class="linkColor" ng-click="redirectToGenerateReportPAge()">Generate Report</a></div>
            </uib-accordion>
       </uib-accordion-group>
       
        <uib-accordion-group class="panel-heading panelBG " heading="View Attendance" ><!-- is-open="!showInitialAccordion" -->
            <div ><a href="" class="linkColor" ng-click="showPie()">Daily Attendance</a></div>
        </uib-accordion-group>
        <uib-accordion-group class="panel-heading panelBG " heading="Productivity" ><!-- is-open="!showInitialAccordion" -->
            <div ><a href="" class="linkColor" ng-click="showLineForm()">Weekly Productivity</a></div>
            <div ><a href="" class="linkColor" ng-click="showBar()">Monthly Productivity</a></div>
        </uib-accordion-group>
                              
                              
        <uib-accordion-group class="panel-heading panelBG " heading="Settings" ><!-- is-open="!showInitialAccordion" -->
            <div><a href="" class="linkColor" ng-click="adminChangePasswordDivEnable()">Change Password</a> </div><br> 
            <!-- <div><a href="" class="linkColor" ng-click="addNewAdministratorDivEnable()">Add Administrator</a> </div><br>  -->
            <div ><a href="" class="linkColor" ng-click="logOut()">Logout</a></div>
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
                  <p class="AddEmpText">Add employee(s)</p>   <!-- id="AddEmpText" -->           
                  <Button class="btn btn-md btn-warning"ng-click="showFromExcelDiv()">From excel</Button>  <!--  id="excelbutton" -->
                  <button class="btn btn-md btn-warning" ng-click="showAddEmployeeDiv()">Manually</button>   <!-- id="manualButton" -->
             </div>
            <div class="col-sm-4"></div>   
        </div>
        <div class="row" ng-show="showExcelDiv">   <!-- id="fromExcelDiv" -->
        
            <div class="col-md-4"></div>
            <div class="col-sm-4  selectExcelFileDiv">
                  <p class="excelDivText" >Select Excel file location</p>  <!-- id="excelDivText" -->
                  <input type="file" class="btn btn-md btn-default"  ng-model="excelFilePath" onchange="angular.element(this).scope().file_changed(this)" value="Browse" />              
                  <button  class="btn btn-md btn-info info" ng-click="uploadFile()">upload</button>   <!-- id="uploadButton" -->
                  <p class="EmployeeSuccessMsg">{{fileUploadSuccessMsg}}</p>
             </div>
            <div class="col-sm-5"></div>   
        </div>
        <div class="row manuallyEnterEmployeeDiv" ng-show="showManuallyEnterDiv">  <!--  id="ManuallyEnterDiv" -->
            <div class="row">
                <div class="col-sm-1"> </div>
                <div class="col-sm-3 addSingleEmployeeDiv">                  
                    <form role="form">
                      <div class="form-group">
                         <label for="email">Employee Id:</label>
                         <input type="text" class="form-control" ng-model="empId" required >
                      </div>
                      <div class="form-group">
                         <label for="pwd">First Name:</label>
                         <input type="text" class="form-control" ng-model="empFirstName" required>
                      </div>
                      <div class="form-group">
                         <label for="pwd">Last Name:</label>
                         <input type="text" class="form-control" ng-model="empLastName" required>
                      </div>
                   
               </div>
               <div class="col-sm-3 addSingleEmployeeDiv">
                       
                      <div class="form-group">
                         <label for="email">Date of Birth:</label>
                         <input type="date" class="form-control" ng-model="DOB" required >
                      </div>
                      <div class="form-group">
                         <label for="pwd">Mobile No:</label>
                         <input type="text" class="form-control" ng-model="mobile" required>
                      </div>
                      <div class="form-group">
                         <label for="pwd">Email ID:</label>
                         <input type="text" class="form-control" ng-model="emailId" required>
                      </div>
               </div>
              <div class="col-sm-3 addSingleEmployeeDiv">
                      <div class="form-group">
                         <label for="email">Designation:</label>
                         <input type="text" class="form-control" ng-model="designation" required >
                      </div>
                      <div class="form-group">
                         <label for="pwd">Role ID:</label>
                         <select class="form-control" ng-model="roleId" required>
                            <option ng-repeat="role in roleArray" value="{{role.roleId}}">{{role.roleId}} ( {{role.roleType}} )</option> 
                         </select>
                      </div>
                      <div class="form-group">
                         <label for="pwd">Department ID:</label>
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
                      <button type="submit" class="btn btn-info" ng-click="addEmployee()" >Save Employee</button> 
                   </div>                                 
                   <div class="row">
                       <span id="EmployeeSuccessMsg">{{addEmployeeSuccessMsg}}</span>   
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
          <label>Search:</label>
          <input type="text" ng-model="search" placeholder="search Employee"  class="form-control" ng-disabled="disableSearchBoxForEmployee">
       </div>
       <div class="col-sm-1"></div>
       <div class="col-sm-3">
             <label>Number of rows  per page:</label><select class="form-control" ng-model="itemsPerPage" ng-change="changePaginationDisplayResults()">
                 <option value="10" selected>10</option>
                 <option value="25">25</option>
                 <option value="50">50</option>
            </select>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-4">
          <uib-pagination total-items="totalPaginationEmployeesCount" ng-model="currentPaginationPage" ng-change="chanePagination()" 

                   max-size="4" class="pagination-md" boundary-links="true" rotate="false" num-pages="numberOfPaginationPages"></uib-pagination>
       
        </div>        
    </div>
    <div class="table-responsive" id="viewEmployeeDetails">
    <table  class="table row-border table-bordered table-hover">
    <thead>
    <tr class="danger">
          <th ng-click="sort('id')" class="info" >Emp Id <span
      class="glyphicon sort-icon" ng-show="sortKey=='id'"
      ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
     </th>
     <th ng-click="sort('first_name')" class="warning">First Name <span
      class="glyphicon sort-icon" ng-show="sortKey=='first_name'"
      ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
     </th>
     <th ng-click="sort('last_name')" class="success">Last Name <span
      class="glyphicon sort-icon" ng-show="sortKey=='last_name'"
      ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
     </th>
     <th ng-click="sort('dob')" class="info">Date Of Birth <span
      class="glyphicon sort-icon" ng-show="sortKey=='dob'"
      ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
     </th>
     <th ng-click="sort('mob')" class="warning">Mobile No <span
      class="glyphicon sort-icon" ng-show="sortKey=='mob'"
      ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
     </th>
     <th ng-click="sort('email')" class="success">Email Id <span
      class="glyphicon sort-icon" ng-show="sortKey=='email'"
      ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
     </th>
     <th ng-click="sort('des')" class="info">Designation <span
      class="glyphicon sort-icon" ng-show="sortKey=='des'"
      ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
     </th>
     <th ng-click="sort('role')" class="warning">Role Id <span
      class="glyphicon sort-icon" ng-show="sortKey=='role'"
      ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
     </th>
     <th ng-click="sort('status')" class="success">Status <span
      class="glyphicon sort-icon" ng-show="sortKey=='status'"
      ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
     </th>
     <th ng-click="sort('dept')" class="info">Dept Id <span
      class="glyphicon sort-icon" ng-show="sortKey=='dept'"
      ng-class="{'glyphicon-chevron-up':reverse,'glyphicon-chevron-down':!reverse}"></span>
     </th>
        <!--  <th>Index</th> -->
        <th class="active">edit/save</th>
    </tr>
    </thead>
    <tbody>
   <tr  ng-class-even="'success'" ng-class-odd="'active'" ng- ng-repeat="employee in AllEmployees | filter:search	| orderBy:sortKey:reverse"> 
       
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
              <button class="btn btn-sm btn-danger" ng-if="buttonTextArray[$index]=='Save'" ng-click="cancelEditEmployee(employee.employeeId,$index)">cancel</button>
          </td> 
    
       </tbody>
    </table>

</div>

 <div class="row">
    
    <div class="col-sm-5"> </div>
 
    <div class="col-sm-7">
    
       <button class="btn btn-warning btn-sm" ng-click="printViewEmployeeDiv('viewEmployeeDetails')">Print</button>
       
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
	 
	     <div class="col-sm-3"> </div>
=	    
	     <div class="col-sm-3  changePasswordMainDiv" >
	         <div class="row" id="changePassImgDiv">
		      	<img src="http://s11.postimg.org/89jw5zva7/editicon.png" width="90" height="120">		        
			     <p class="changePassText">Change your password</p>
	         </div>
	         
	         <form  role="form">
               <div class="form-group">
                    <label for="email">Current Password:</label>
                    <input type="password" class="form-control"  ng-model="cpwd">
                </div>
                <div class="form-group">
                    <label for="pwd">New Password:</label>
                    <input type="password" class="form-control" ng-model="npwd">
                </div>
                <div class="form-group">
                  <label for="pwd">Confirm Password:</label>
                  <input type="password" class="form-control" ng-model="rpwd" >
               </div>
                <button type="submit" class="btn btn-primary"  ng-click="changeAdminPassword()">save Password</button>
             </form>
		     <div class="row"><p class="changePasswordSuccessMsg"> {{changePasswordSuccessMsg}}</p></div>
		    
		  
		  </div>
		  <div class="col-sm-6"> </div>
		      	
	    
 
	 </div><!-- Change password division close-->
	 
	  <!-- END ------ Division for changing adminstrator password ------ END  -->
	
	
<!--Div for pie charts  -->

<div ng-show="showCharts" id="showChart" >
<div class="row">
  <div class="col-sm-9">
     
     <div  id="pie-holder" style="margin-top:%">
    
           <div class="row pageHeading alert alert-info" style="margin-bottom: 2%">Daily Attendance</div>
		   <canvas id="pieChart" width="400" height="400" ng-click="clickOnPie($event)" style="margin-left: 25%"></canvas>
			
    </div>
    
    <div style="width: auto ;" id="bar-holder">
			<div class="row  pageHeading alert alert-info">Monthly Productivity</div>
			<canvas id="barChart" height="auto" width="auto" style="margin-left: 5%"></canvas>
		 	  
    </div> 
      <div style="width: auto" ; id="line-holder">
            <div class="row pageHeading alert alert-info" >Weekly Productivity</div>
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
            
            <div class="form-group">
                <label class=" col-sm-12 control-label" >Enter EmployeeId</label> 
              <div class="col-sm-12">
                     <input type="text" class="form-control" id="" ng-model="employeeId">
              </div>
            </div>
            
            <div class="form-group "  >
                 <label class=" col-sm-12 control-label" >select Date</label>
              <div class="col-sm-12">
                     <input type="date" class="form-control"  ng-model="weeklyDate">
              </div>
            </div>
            
            
            <div class="form-group "  >
              <div class="col-sm-12">
                     <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  ng-click="showLine()">Show</button>
              </div>
            </div>
            
       </form>
     </div>
  
  </div>  
</div>

<!--inline form for line chart  -->
<div class="col-sm-4"></div>
<div ng-show="showLineChartInlineForm" class="col-sm-4">

<form class="form-vertical" role="form">
            
            <div class="form-group">
                <label class=" col-sm-12 control-label" >Enter EmployeeId</label> 
              <div class="col-sm-12">
                     <input type="text" class="form-control" id="" ng-model="employeeId">
              </div>
            </div>
            
            <div class="form-group "  >
                 <label class=" col-sm-12 control-label" >select Date</label>
              <div class="col-sm-12">
                     <input type="date" class="form-control"  ng-model="weeklyDate">
              </div>
            </div>
            
            
            <div class="form-group "  >
              <div class="col-sm-12">
                     <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  ng-click="showLine()">Show</button>
              </div>
            </div>
     
</div>
<div class="col-sm-4"></div>


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
  
  
  
  <!--footer Part  -->
  <!-- <div class="row" style=" margin-top: 300px;">
    <div  style=" background-color: #333333; max-height: 50px; " >  class=" navbar-fixed-bottom"
           <div class="col-sm-4 footerText" ><h4>© Copyright Caprus IT</h4></div>
           <div class="col-sm-4 "><img src="images/footer_logo.jpg" alt="footer logo" class="img-responsive"></div>
           <div class="col-sm-4 footerText text-right ">re-defining IT culture</div>
   </div> -->
</div>
  </div> 
  
  
  
 
 

  </body>
</html>

