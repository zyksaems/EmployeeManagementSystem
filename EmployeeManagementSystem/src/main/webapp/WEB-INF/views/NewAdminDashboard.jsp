<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
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
    <link rel="shortcut icon" type="image/x-icon" href="images/faviconlogo.png"/>
    
    
    <link rel="stylesheet" href="./resources/Admin_addEmployeeDetails.css">
    
    <!--for data tables  -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.js"></script>
    <script src="./resources/jquery.dataTables.min.js"></script>
    <script src="angularJs/angular-resource.min.js"></script>
    <script src="./resources/angular-datatables.min.js"></script>
    <script src="./resources/angular-datatables.bootstrap.min.js"></script>
    <script src="./resources/bootstrap.min.js"></script> 
    <script src="./resources/alert.js"></script>
    <link rel="stylesheet" href="./resources/datatables.bootstrap.min.css">
    
   <!--  for charts -->
    <script src="./resources/Chart.js"></script>
    
   
   

  </head>
   
  <body>

  <div class="container-fluid" ng-controller="ValidController" >
  
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
       <div class="modal-header AdminLoginHeader">
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
                              <a href="#_forgotPassword" class="forgotPassword text-right" ng-click="AdminForgotPassword()">Forgot password?</a>
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
              <!-- <div class="row adminLoginValidationMsgDiv">
                <p class="adminLoginValidationMsg">{{adminLoginValidationMsg}}</p>
              </div> -->
          </div>
          <!-- <div class="modal-footer AdminLoginFooter">                      
                <button class="btn btn-sm btn-danger" ng-click="closeModal()">cancel</button>                                             
           </div> -->
        </div>
</div>
    </script>
  
  <!-- Top menu -->
  <div class="row" > 
  
    <div class="col-sm-10" ></div>
    <div class="col-sm-2" >
       <button type="button" ng-show="showAdminLoginButton" class="btn-group-justified btn btn-info btn-Text btn-Primary-Color"  ng-click="showAdminLoginModal()">Admin Login</button>  <!-- style="margin-left: 69%"  -->
     </div>
     <!-- <div class="col-sm-1"></div>  -->
  </div>
 
  <!-- form to take admin Id -->
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
  
  </div>
 
 <!--Admin-Dashboard after successful login  -->
  <div class="row" ng-show="showAdminDashBoard"> <!-- ng-show="showAdminDashBoard" -->
    <div class="col-sm-2" >
      <uib-accordion close-others="oneAtATime">
        <uib-accordion-group class="panel-heading panelBG" heading="Manage User" style="background-color:;" >
            <div><a href="" class="linkColor" ng-click="addEmployeeDetails()"> Add User</a> </div><br> 
            <div><a href="" class="linkColor" ng-click="viewUser()">View/Update User</a></div>
        </uib-accordion-group>
        <uib-accordion-group class="panel-heading panelBG" heading="Reports" is-Open="true" >
            <uib-accordion close-others="oneAtATime">
                <!--  <uib-accordion-group class="panel-heading panelBG" heading="Single User" > 
                  <div><a href="" class="linkColor">Daily </a></div>
                  <div><a href="" class="linkColor">Weekly</a></div>
                  <div><a href="" class="linkColor">Monthly</a></div>
                  <div><a href="" class="linkColor">Yearly</a></div>
                
                </uib-accordion-group> -->
               <!-- <uib-accordion-group class="panel-heading panelBG" heading="All User"  is-Open="">
                  <div><a href="" class="linkColor" >Daily</a></div>
                  <div><a href="" class="linkColor" >Weekly</a></div>
                  <div><a href="" class="linkColor" >Monthly</a></div>
                  <div><a href="" class="linkColor">Yearly</a></div>
                </uib-accordion-group> -->
               
                  
                  <div><a href="" class="linkColor" ng-click="redirectToGenerateReportPAge()">Generate Report</a></div>
                
             </uib-accordion>
       </uib-accordion-group>
       
        <uib-accordion-group class="panel-heading panelBG " heading="View Attendance" ><!-- is-open="!showInitialAccordion" -->
            <div ><a href="" class="linkColor" ng-click="showPie()">Daily Attendance</a></div>
            <div ><a href="" class="linkColor" ng-click="showLine()">Weekly Attendance</a></div>
        </uib-accordion-group>
        <uib-accordion-group class="panel-heading panelBG " heading="Productivity" ><!-- is-open="!showInitialAccordion" -->
            <div ><a href="" class="linkColor" ng-click="showLine()">Weekly Productivity</a></div>
            <div ><a href="" class="linkColor" ng-click="showBar()">Monthly Productivity</a></div>
            <div ><a href="" class="linkColor">Yearly Productivity</a></div>
        </uib-accordion-group>
                              
                              
        <uib-accordion-group class="panel-heading panelBG " heading="Settings" ><!-- is-open="!showInitialAccordion" -->
            <div><a href="" class="linkColor">Change Password</a> </div><br> 
            <div ><a href="" class="linkColor" ng-click="logOut()">Logout</a></div>
        </uib-accordion-group>
     </uib-accordion>
   </div>
   
  <!--Middle container   -->
   <div class="col-sm-10 " >
    <!-- Tables for Report contents -->
   <div ng-show="false">
  <div class="row"> Daily Report </div>
   <div class="row">
   <div><input type="text" class="form-control" ng-model="searchBox"> </div>
  <div class="table-bordered">          
  <table class="table">
    <thead>
      <tr>
        <th ></th>
       
      </tr>
    </thead>
    <tbody>
      <tr class=success>
        <td>1001</td>
        <td>Amit</td>
        <td>patel</td>
        <td>9:30</td>
        <td>7:30</td>
        
      </tr>
      <tr class=danger>
        <td>1002</td>
        <td>Rhul</td>
        <td>Nichal</td>
        <td>8:30</td>
        <td>...</td>
        
      </tr>
    </tbody>
  </table>
  </div>
  </div>
  
  </div>
  
  
 <!--  Division for Adding single and multiple employees through excel file -->
 
      <!-- Add employee Division -->
   <div id="section" ng-show="showAddEmployeeMainDiv" > <!-- ng-show="showAddEmployeeMainDiv" -->
         <div id="importEmployeeDataDiv">
              <p id="AddEmpText" >Add employee(s)</p>              
              <Button class="btn btn-sm btn-warning"ng-click="showFromExcelDiv()">From excel</Button>  <!--  id="excelbutton" -->
              <button class="btn btn-sm btn-warning" ng-click="showAddEmployeeDiv()">Manually</button>   <!-- id="manualButton" -->
                
        </div>
        <div id="fromExcelDiv" ng-show="showExcelDiv">
        
              <p id="excelDivText">Select Excel file location</p>
              <input type="file" ng-model="excelFilePath" onchange="angular.element(this).scope().file_changed(this)" id="excelFile" value="Browse" />              
              <button id="uploadButton" ng-click="uploadFile()">upload</button>
              <p id="EmployeeSuccessMsg">{{fileUploadSuccessMsg}}</p>
        </div>
         <div id="ManuallyEnterDiv" ng-show="showManuallyEnterDiv">
             <p id="excelDivText">Enter Employee Details</p>
             <form id="addEmployeeForm">
             
                 <label id="empText">Employee Id:</label><br><input type="text" id="empTextBox" autocomplete="off" ng-model="empId" required><span id="star">*</span><br>
                 <label id="empText">First Name:</label><br><input type="text" id="empTextBox" ng-model="empFirstName" required><span id="star">*</span><br>
                 <label id="empText">Last Name:</label><br><input type="text" id="empTextBox" ng-model="empLastName" required><span id="star">*</span><br>
                 <label id="empText">Date of Birth:</label><br><input type="date" id="empTextBox" ng-model="DOB" required><span id="star">*</span><br>
                 <label id="empText">Mobile No:</label><br><input type="text" id="empTextBox" ng-model="mobile" required><span id="star">*</span><br>
                 <label id="empText">Email ID:</label><br><input type="email" id="empTextBox" ng-model="emailId" required><span id="star">*</span><br>
                 <label id="empText">Designation:</label><br><input type="text" id="empTextBox" ng-model="designation" required><span id="star">*</span><br>
                 <label id="empText">Role ID:</label><br> 
                 <select id="dropDown" ng-model="roleId" required>
                          <option ng-repeat="role in roleArray" value="{{role.roleId}}">{{role.roleId}} ( {{role.roleType}} )</option>                          
                </select><span id="star">*</span><br>
                 <label id="empText">Department ID:</label><br>
                 <select id="dropDown" ng-model="deptId" required>
                          <option ng-repeat="dept in deptArray" value="{{dept.deptId}}">{{dept.deptId}} ( {{dept.deptName}} )</option>                          
                </select><span id="star">*</span><br>                
                 <button id="submitButton" class="btn btn-sm btn-info"  ng-click="addEmployee()" >Add Employee</button>
             </form>
             <span id="EmployeeSuccessMsg">{{addEmployeeSuccessMsg}}</span></div>
             
   </div>
   
   
   <!-- END ------ Division for Adding single and multiple employees through excel file ------ END  -->
	
	
<!--Div for pie charts  -->

<div ng-show="showCharts" id="showChart" >
<div class="row">
  <div class="col-sm-9">
     
     <div  id="canvas-holder" style="margin-top:5%">
    
           <div class="row pageHeading" style="margin-bottom: 2%">Daily Report</div>
		   <canvas id="pieChart" width="400" height="400" ng-click="clickOnPie($event)" style="margin-left: 25%"></canvas>
			
    </div>
    
    
    
    <div style="width: 100% ;margin-left: 5%;margin-top:5%;" id="line-holder">
            <div class="row pageHeading" >Weekly Productivity</div>
			<div>
				<canvas id="canvas" height="450" width="600"></canvas>
			</div>
			 
		</div>
		
		<div style="width: 100% ;margin-left: 5%;margin-top:5%;" id="bar-holder">
			<div class="row pageHeading">Monthly Productivity</div>
			<canvas id="barChart" height="450" width="600"></canvas>
		 	  
    </div> 
  </div>
  <div class="col-sm-3" >
  
  <div id="pieLegend" class="chart-legend"></div>
  <div id="barLegend" class="chart-legend" ></div>
  <div id="lineLegend" class="chart-legend" ></div>
  
  </div>  
</div>

</div>

 <!-- END   ---- Division for Adding single and multiple employees through excel file  ----- END  -->

<div ng-show="showTableDetails">

<div class="alert alert-info pageHeading">
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
          In-time 
            <span ng-show="sortType == 'itime' && !sortReverse" ></span>
            <span ng-show="sortType == 'itime' && sortReverse" ></span>
          </a>
        </td>
        <td>
          <a href="#" ng-click="sortType = 'otime'; sortReverse = !sortReverse">
          Out-time
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
  </div>
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