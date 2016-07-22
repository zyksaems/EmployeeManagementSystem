<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
   
   <jsp:include page="EmployeeLeftMenu.jsp"></jsp:include>
      
       <script src="./JS/EmployeeViewLeaveStatus.js"></script>
       <script src="https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js"></script>
       <link rel="stylesheet" href="https://cdn.datatables.net/1.10.11/css/jquery.dataTables.min.css">
       
   
         <div class="row">     
                <div class="col-sm-1"></div>    
                <div class="col-sm-6">
                       <div class="row"  id="employee-leave-table-division">
                            <br><br>
                            <div class="row">
                                <div class=row"><div class="alert alert-info text-center"><strong>Employee Leave Status</strong></div></div>
                                <div class=row">
                                     <table id="employee-leave-status-table"></table>
                                </div>
                        
                            </div>
                       </div>
                </div>    
                <div class="col-sm-1"></div>          
                <div class="col-sm-2">
                    <div class="row">
                          <br>
                          <div class="text-center">
                              <h3>View Leave Status</h3>    
                          </div>                                                 
                          <br>
                          <div id="monthly-leave-form">
                               <label class="form-group"><b>Enter leave applied month:</b> </label>
                               <input type="month" class="form-control" placeholder="Enter leave applied month" id="leave-applied-month">
                          </div>                            
                          <br>
                          <div class="text-center">
                              <button id="view-leave-status-button" class="btn btn-md btn-primary">View Status</button>
                          </div>
                                                   
                    </div>    
                    <div class="row text-center text-danger">
                         <br>
                         <b><p id="view-leave-status-success-message"></p></b>
                    </div>                  
                </div>         
         </div>
   <!---------------------------------------------------------------  write all code above this line   -------------------------------------------------------------- -->
     </div>  <!-- End of  "row" -->
     
   </div> <!-- End of  "container-fluid" -->
   
 </body>
 
 </html>