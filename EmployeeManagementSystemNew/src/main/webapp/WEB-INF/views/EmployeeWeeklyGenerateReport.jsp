<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<jsp:include page="EmployeeLeftMenu.jsp"></jsp:include>

        <script src="./JS/EmployeeWeeklyReport.js"></script>
        <script src="./JS/ConverWorkingHours.js"></script>
        
          <div  class="row">   
                  <br>      
                  <div class="col-sm-8">
                     <div id="employee-weekly-report-div">
                        <div class="alert alert-info text-center"><strong>Weekly Report</strong></div>
                        <table id="employee-wekly-report-table" class="table table-striped text-center" align="center">                      
                                            
                        </table>
                      </div>
                  </div>
                  <div class="col-sm-2">
                         <form class="form-vertical" role="form" ng-show="!showIndividualWeeklyForm" id="employee-weekly-report-form">
                              <div class="form-group " style="color: red" >              
                                  <b><p class=" col-sm-12 control-label text-center">Weekly Attendance</p></b>
                              </div>         
                              <div class="form-group ">
                                  <label class=" col-sm-12 control-label" >Enter Week</label>
                                  <div class="col-sm-12">
                                     <input type="week" class="form-control"  id="employee-weekly-report-week-val" />
                                  </div>
                              </div>                        
                              <div class="form-group">
                                 <div class="col-sm-12">
                                    <br>
                                    <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  id="show-employeee-weekly-report-button">Show</button>
                                 </div>
                             </div>
                             <div class="form-group ">
                                    <div class="col-sm-12">
                                        <br>
                                        <b><p class="text-center text-danger weeklyErrorMsg" id="employee-weekly-report-msg"></p></b>
                                     </div>
                             </div>
            
                         </form>
                  </div>                             
            </div>


<!---------------------------------------------------------------  write all code above this line   -------------------------------------------------------------- -->
     </div>  <!-- End of  "row" -->
     
   </div> <!-- End of  "container-fluid" -->
   
 </body>
 
 </html>