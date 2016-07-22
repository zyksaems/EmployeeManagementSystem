<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="adminLeftMenu.jsp"></jsp:include>

        <script src="./JS/AdminViewApprovedLeaves.js"></script>

       
           <div class="row">   
              <div class="col-sm-10">
                      <div class="col-sm-2"></div> 
                      <div class="col-sm-8">
                             <br><br>
                             <div class="row" id="approved-leaves-division">
                                   <div class="alert alert-info"><h3 class="text-center" id="approved-leaves-text"></h3></div>
                                    <div class="table-responsive">
                                            <table class="table table-hover" id="approved-leaves-table"></table>
                                     </div>
                             </div>
                             <div class="row" id="no-approved-leaves-division">
                                 <h2 class="text-danger text-center" id="no-approved-leaves-message"></h2>
                             </div> 
                       </div>                       
                      <div class="col-sm-2"></div> 
              </div> 
               <div class="col-sm-2" >
                  <div class="row">
                          <br>
                          <div class="text-center">
                              <h3>View Approved Leaves</h3>    
                          </div>                                                 
                          <br>
                          <div id="monthly-leave-form">
                               <label class="form-group"><b>Enter month:</b> </label>
                               <input type="month" class="form-control" placeholder="Enter month" id="leave-month">
                          </div>                            
                          <br>
                          <div class="text-center">
                              <button id="view-approved-leaves--button" class="btn btn-md btn-primary">View Status</button>
                          </div>
                                                   
                    </div>    
                    <div class="row text-center text-danger">
                         <br>
                         <b><p id="view-approved-leaves-success-message"></p></b>
                    </div>    
               </div>
           </div>  

<jsp:include page="footer.jsp"></jsp:include>