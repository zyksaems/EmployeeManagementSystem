<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>

   <!-- <link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"> 
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

   <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>  -->
  
  <link rel="stylesheet" type="text/css" href="./CSS/style.css">
  
   <script src="./jquery/jquery-2.1.4.js"></script>
  <!-- <script src="./js1/jquery-1.3.2.min.js"></script> -->
  <script src="./jquery/jquery-ui.js"></script>
   <script src="./bootstrap/bootstrap.min.js"></script> 
  <link rel="stylesheet"  href="./bootstrap/bootstrap.min.css">
  <link rel="stylesheet"  href="./jquery/jquery-ui.css">
  
  <!-- css and js for add employee through excel and manually -->
  <script src="./JS/Admin_addEmployee.js"></script>
  <link rel="stylesheet" href="./CSS/Admin_addEmployee.css">
  
  <!-- js for admin division hide and show functionality -->
    <script src="./JS/Admin_leftMenuControll.js"></script>
  <script src="./JS/Admin_logout.js"></script>


 <!-- Chart.Js library  -->
  <script src="./chartJS/Chart.js"></script>
  
    <!-- custom css -->
  <link rel="stylesheet" href="./CSS/chart.css">
  
  
  <!-- custom javascript file -->
  <script src="./JS/showGraphs.js"></script>
  
  <link rel="shortcut icon" type="image/x-icon" href="./images/caprus logo.png"/>
  
  
<style>
.headpart {
	width: auto;
	height: 100px;
	color: white;
	background-color: #3c8dbc;
}

.sidebar {
	width: 200px;
	height: 575px;
	left: 0px;
	background-color: #3c8dbc;
}

.icon-setting {
	font-size: 25px;
	top: 60px;
	left: 55px;
}

ul {
	padding: 0px;
	margin: 0px;
}

.title_menu {
	right: 10px;
}
a:hover {
    color: hotpink;
}
span:HOVER {
	color: hotpink;
}
#dropdown{
 max-width: 160px ;
    min-width: 100px ;
    top: 100px;
    width: 200px;
    border-radius: 4px;
    -webkit-border-radius: 4px;
}
.icon{
top: 15px;
left: 45px;
}
</style>

<script>
  $(function() {
    $( "#accordion" ).accordion();
  });

  $(function() {
      $( "#datepicker" ).datepicker();
    });

  </script>
  
</head>
<body>
	<div class="container-fluid ">
		<div class="row headpart">
		<div class="col-sm-2 icon">
            <img src="./images/caprus logo.png" width="65px" height="65px">
		</div>
			<div class="col-sm-8 title_menu text-center">
				<h1 align="right">EMPLOYEE MANAGEMENT SYSTEM</h1>
			</div>
			<div class="col-sm-2">
				<div class="dropdown">
					<span class="glyphicon glyphicon-cog icon-setting"
						data-toggle="dropdown"></span>
					<ul class="dropdown-menu dropdown-menu-right" id="dropdown">
						<li><a href="#" id="admin-profile-link">Profile</a></li>
						<li><a href="#" id="admin-change-pass-link">Change password</a></li>
						<li><a href="#" id="admin-logout-link">Logout</a></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="row">
		
		     <!-- This division is the division on left for display links -->
			<div class="col-sm-2 sidebar">
			
			 <div id="accordion">
			<h3 style="">Manage Employee</h3>
	    	<div>
	    	<ul>
	    	<li><a href="#" id="admin-add-employee-link">Add Employee</a></li>
	    	<li><a href="#" id="admin-view-update-emp-link">View/Update Employee</a></li>
	    	</ul>
			</div>
			<h3>Reports</h3>
			<div>
			<ul>
			<li>
			<a href="./DailyGenerateReports.jsp">Daily Reports</a></li></ul>
			<li>
			<a href="#">Weekly Reports</a></li></ul>
			<li>
			<a href="#">Monthly Reports</a></li></ul>
			<li>
			<a href="#">annually Reports</a></li></ul>
			</div>
			<h3>View Attendance</h3>
			<div>
			<ul>
			<li>
			<a href="#" id="daily-attendance-link">Daily Attendance</a></li>
			<!-- <li>
			<a href="#" >Weekly Attendance</a></li>
			<li>
			<a href="#">Monthly Attendance</a></li> -->
			</ul>
			</div>
			<h3>Productivity</h3>
			<div>
			<ul>
			<li>
			<!-- <a href="#">Daily Productivity</a></li> -->
			<li>
			<a href="#" id="weekly-productivity-link">Weekly Productivity</a></li>
			<li>
			<a href="#" >Monthly Productivity</a></li>
			<li>
			<a href="#" id="anual-productivity-link">Annually Productivity</a></li>
			</ul>
			</div>
			</div> 
			
			</div>

             <!-- This division is the division on right for display content to show (Right division)-->
			<div class="col-sm-10">
			         <!-- This division for add employee manually and through excel file-->
			        <div  class="row addEmployeeMainDivision" id="add-employee-main-division" > 
                         <div class="row" >  <!--  id="importEmployeeDataDiv" -->
                              <div class="col-sm-4"></div>
                              <div class="col-sm-4"> 
                                <div class="row"><p class="AddEmpHeadingText">Add employee(s)</p></div> 
                                <div class="row">
                                  <div class="col-sm-1"></div> 
                                  <div class="col-sm-10">
                                     <Button class="btn btn-md btn-primary excelButtton" id="add-employee-excel-button">From excel</Button>
                                     <button class="btn btn-md btn-primary" id="add-employee-manual-button">Manually</button>
                                  </div> 
                                  <div class="col-sm-1">  </div> 
                                </div>                                                                       
                              </div>
                             <div class="col-sm-4"></div>   
                        </div>
                        <!-- Add employee Excel division -->
                        <div  class="row" id="add-employee-excel-div">          
                          <div class="col-md-5"></div>
                          <div class="col-sm-4  selectExcelFileDiv"><br><br>
                                <div class="row"><p class="excelDivHeadingText" >Select Excel file location</p></div> 
                                <div class="row">  
                                     <input type="file" class="btn btn-md btn-default"  id="excel-file-path" value="Browse" />                                     
                                </div> 
                                <div class="row">
                                   <br>
                                   <div class="col-sm-1"></div>
                                   <div class="col-sm-10"><button  class="btn btn-md btn-primary info" id="excel-upload-button">upload</button></div>
                                   <div class="col-sm-1"></div>                                   
                                </div>
                                <div class="row">                              
                                   <p class="ExcelEmployeeSuccessMsg text-danger" id="excel-file-uplaod-success-msg"></p><!-- </div> -->                                  
                                </div>
                            </div>
                            <div class="col-md-3"></div>  
                          <!-- <div class="col-sm-3"></div>  -->  
                        </div> <!--END -- Add employee Excel division -->
                        <br><br>
                        <!-- Add employee manual division -->
                        <div class="row manuallyEnterEmployeeDiv" id="add-employee-manual-div">  
                           <div class="row">
                             <div class="col-sm-1"> </div>
                             <div class="col-sm-3 addSingleEmployeeDiv">                  
                               <!-- <form role="form" action="#"> -->
                               <div class="form-group">
                                  <label for="email">Employee Id:</label>
                                  <input type="text" class="form-control" id="add-employee-employee-id-val" maxlength="30" autocomplete="off" aurequired >
                               </div>
                               <div class="form-group">
                                  <label for="pwd">First Name:</label>
                                  <input type="text" class="form-control" id="add-employee-employee-firstname-val" maxlength="30" autocomplete="off" required>
                               </div>
                               <div class="form-group">
                                  <label for="pwd">Last Name:</label>
                                  <input type="text" class="form-control" id="add-employee-employee-lastname-val" maxlength="30" autocomplete="off" required>
                              </div>                   
                             </div>
                             <div class="col-sm-3 addSingleEmployeeDiv">                      
                                <div class="form-group">
                                  <label for="email">Date of Birth:</label>
                                  <input type="date" class="form-control" id="add-employee-employee-dob-val" maxlength="30" autocomplete="off" required >
                                </div>
                                <div class="form-group">
                                  <label for="pwd">Mobile No:</label>
                                  <input type="text" class="form-control" id="add-employee-employee-mobile-val" maxlength="10" autocomplete="off"  required>
                                </div>
                                <div class="form-group">
                                  <label for="pwd">Email ID:</label>
                                  <input type="email" class="form-control" id="add-employee-employee-email-val" maxlength="30" required>
                                </div>
                             </div>
                             <div class="col-sm-3 addSingleEmployeeDiv">
                                <div class="form-group">
                                  <label for="email">Designation:</label>
                                  <input type="text" class="form-control" id="add-employee-employee-designation-val" maxlength="30" autocomplete="off" required >
                                </div>
                                <div class="form-group">
                                  <label for="pwd">Role ID:</label>
                                  <select class="form-control" id="add-employee-employee-role-val" required>
                                     <option  value="4">4 (SE)</option> 
                                     <option  value="1">1 (MD)</option> 
                                     <option  value="2">2 (TL)</option> 
                                     <option  value="3">3 (SSE)</option>                             
                                  </select>
                                </div>
                                <div class="form-group">
                                  <label for="pwd">Department ID:</label>
                                  <select class="form-control" id="add-employee-employee-dept-val" required>
                                    <option value="10">10 (production)</option>                              
                                  </select>        
                                </div>               
                             </div>   
                             <div class="col-sm-2"> </div>
                          </div>
                          <div class="row">
                             <div class="col-sm-4"></div>
                             <div class="col-sm-4">
                               <div class="row">
                                  <button type="submit" class="btn btn-primary" id="add-employee-submit-button">Save Employee</button> 
                               </div>                                 
                               <div class="row">
                                  <p class="ManualEmployeeSuccessMsg text-danger"  id="add-employee-success-message"></p>   
                                </div>                
                             </div>             
                             <div class="col-sm-4"></div>    
                          </div>            
                    </div>  <!--  END -- Add employee manual division -->       
                </div> <!-- END -- add employee main division -->
			
			    <!-- division for charts and graphs -->
			   
			           <!-- daily attendance div -->
			           <div  id="showChart" >
			           <div class="row">
  					  <div class="col-sm-9">
			           <div class="row" id="daily-attendance-div">
			       
			         
			         <div  id="pie-holder"  style="margin-top:%">
    
                    <!-- <div class="row pageHeading alert alert-info" style="margin-bottom: 2%" > </div> -->
		              <canvas id="pieChart" width="400px" height="400px"  style="margin-left: 25%" onclick="clickPieChart(event)"></canvas>
			
		            	</div>
                     </div>
			            
			            
			            <div id="pieLegend" class="chart-legend"> </div>
  						<div id="barLegend" class="chart-legend" > </div>
  						<div id="lineLegend" class="chart-legend" > </div>
  						
  						
  					<!-- Showing present employee details  -->
 						<div id="showTableDetails">

						<div class="alert alert-info pageHeading" >
			
  						<p id="listName" class="presentEmployeeDetails"></p>
  						</div>
  
						  <table class="table table-bordered table-striped" id="daily-present-table">
    
    					<thead>
      								<tr>
      									 <td>Employee Id</td>
        
        								<td>First Name</td>
        
     									 <td> Last Name  </td>
        
        								<td> In-Time </td>
        
        								<td>Out-Time </td>
        
        								<td>Working-Hours</td>
      							</tr>
    				</thead>  
  					</table>

					</div>

 							<!-- Showing absent employee details  -->
					<div id="showAbsentDetails">

				<div class="alert alert-info pageHeading" >
  				<p id="listName1" class="AbsentEmployeeDetails"></p>
 				 </div>
  
    			<table class="table table-bordered table-striped" id="daily-absent-table">
    				<thead>
      							<tr>
       								<td>Employee Id</td>
        
      								 <td>First Name</td>
        
        							<td> Last Name  </td>
        
      							</tr>
    			</thead>  
  				</table>
  				</div>
			               
			    </div> <!-- END -- daily attendance div -->
			         
			         <!-- weekly attendance div -->
			         <div class="row" id="weekly-productivity-div">
                              <div style="width: auto;"  id="line-holder">
                                      <div class="row pageHeading alert alert-info" >Weekly Productivity</div> 
			                         <div>
				                           <canvas id="lineChart" height="auto" width="auto" style="margin-left: 5%"></canvas>
			                         </div>			 
		                       </div>
		                       <div>
		                                        <form class="form-vertical" role="form" action="#">
                                              <div class="form-group">
                <label class=" col-sm-10 control-label" >Enter EmployeeId</label> 
              <div class="col-sm-10">
                     <input type="text" class="form-control" id="employeeId">
              </div>
            </div>
            
            <div class="form-group "  >
                 <label class=" col-sm-10 control-label" >select Date</label>
              <div class="col-sm-10">
                     <input type="date" class="form-control"  id="weeklyDate">
              </div>
            </div>
            
            
            <div class="form-group "  >
              <div class="col-sm-10">
                     <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  id="showLine">Show</button>
              </div>
              
              <div class="form-group " style="color: red" >
               <label class=" col-sm-10 control-label" id="validationMsg"></label>
           </div>
              
            </div>
            
       </form>
		                       </div>
			         </div> <!-- END -- weekly attendance div -->
			                  
			    
			    </div><!-- END -- division for charts and graphs -->
			
			</div> <!-- END -- (Right division) -->

		</div>
	</div>
</body>
</html>