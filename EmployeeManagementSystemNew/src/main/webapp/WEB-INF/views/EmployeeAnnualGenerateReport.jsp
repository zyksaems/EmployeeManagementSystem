<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<jsp:include page="EmployeeLeftMenu.jsp"></jsp:include>

        <script src="./JS/EmployeeAnnualGenerateReport.js"></script>
        
          <div  class="row">   
                  <br>      
                  <div class="col-sm-8">
                     <div id="employee-annual-report-div">
                        <div class="alert alert-info text-center"><strong>Annual Report</strong></div>
                        <table id="employee-annual-report-table" class="table table-striped text-center" align="center">                      
                                            
                        </table>
                      </div>
                  </div>
                  <div class="col-sm-2">
                         <form class="form-vertical" role="form" ng-show="!showIndividualAnnualForm" id="employee-annual-report-form">
                              <div class="form-group " style="color: red" >              
                                  <b><p class=" col-sm-12 control-label text-center">Annual Attendance</p></b>
                              </div>         
                              <div class="form-group ">
                                  <label class=" col-sm-12 control-label" >Enter Year</label>
                                  <div class="col-sm-12">
                                     <input type="year" class="form-control"  id="employee-annual-report-year-val" />
                                  </div>
                              </div>                        
                              <div class="form-group">
                                 <div class="col-sm-12">
                                    <br>
                                    <button class=" form-control btn btn-info btn-Text btn-Primary-Color "  id="show-employeee-annual-report-button">Show</button>
                                 </div>
                             </div>
                             <div class="form-group ">
                                    <div class="col-sm-12">
                                        <br>
                                        <b><p class="text-center text-danger annualErrorMsg" id="employee-annual-report-msg"></p></b>
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