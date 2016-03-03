<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<jsp:include page="EmployeeLeftMenu.jsp"></jsp:include>

        <script src="./JS/EmployeeMonthlyGenerateReport.js"></script>
        
         <!-- custom CSS for setting data table  --> 
        <link rel="stylesheet" href="./CSS/EmployeeReportGeneration.css"> 
        
         <!-- CDN for pagination and data table  -->
 			<script src="https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js"></script>
 			<link rel="stylesheet" href="https://cdn.datatables.net/1.10.11/css/jquery.dataTables.min.css">
       
          <div  class="row">   
                  <br>      
                  <div class="col-sm-8">
                     <div id="employee-monthly-report-div">
                        <div class="alert alert-info text-center"><strong>Monthly Report</strong></div>

                        <div id="Employee_Details">
							Employee ID :&nbsp;&nbsp;<span id="emp_id"></span><br />
							Employee Name :&nbsp;&nbsp;<span id="emp_name"></span><br />
							Employee Designation :&nbsp;&nbsp;<span id="emp_designation"></span>
						</div>
						<br/>
						<div id="table_pag_div" >
							 <table id="data-found-table" border='2' class="table table-bordered table-striped text-center" >
							</table>
						</div>
						
						<table id="data-not-found-table" border='2' class="table table-bordered table-striped alert alert-info text-center"></table>
						
                      </div>
                  </div>
                  <div class="col-sm-2">
                         <form class="form-vertical" role="form" ng-show="!showIndividualMonthlyForm" id="employee-monthly-report-form">
                              <div class="form-group " style="color: red" >              
                                  <b><p class=" col-sm-12 control-label text-center">Monthly Attendance</p></b>
                              </div>         
                              <div class="form-group ">
                                  <label class=" col-sm-12 control-label" >Enter Month</label>
                                  <div class="col-sm-12">
                                     <input type="month" class="form-control"  id="employee-monthly-report-month-val" />
                                  </div>
                              </div>                        
                              <div class="form-group">
                                 <div class="col-sm-12">
                                    <br>
                                    <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  id="show-employeee-monthly-report-button">Show</button>
                                 </div>
                             </div>
                             <div class="form-group ">
                                    <div class="col-sm-12">
                                        <br>
                                        <b><p class="text-center text-danger monthlyErrorMsg" id="employee-monthly-report-msg"></p></b>
                                     </div>
                             </div>
            
                         </form>
                  </div>                             

<!---------------------------------------------------------------  write all code above this line   -------------------------------------------------------------- -->
     </div>  <!-- End of  "row" -->
   
 </body>
 
 </html>