<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<jsp:include page="EmployeeLeftMenu.jsp"></jsp:include>

   <script src="./JS/EmployeeApplyForLeave.js"></script>
   <script src="./jquery/jquery-ui.multidatespicker.js"></script>
    
   <link rel="stylesheet" href="./CSS/employeeDashboard.css">  

          <div class="col-sm-10">
          
          		<!-- <p id="logged-in-employee-name"  class="name-heading">Hi </p> -->
          		<br>
          		<p align="center">
          			<span style="color:blue; font-size: 200%;">Leave Application</span><br><br>
          		</p>
          		<p></p>
            <div class="row" ><!--  id="ApplyLeavePadding" -->
                    <div class="col-sm-1"></div>             	                                  	
                	<div class="col-sm-8">
                         <div class="form-group">
                              <label><b>Subject:</b></label>
      						  <input type="text" class="form-control" id="leave-subject" placeholder="Add a Subject">
   						 </div> 
   						  <div class="form-group">
   						     <label><b>Message:</b></label>
      						 <textarea class="form-control" rows="10" id="text-for-leave" placeholder="Text Here"></textarea><br />
      						 
      						 <div align="left">
      						     <button type="button" class="btn btn-primary"  id="apply-leave-button">Apply</button>
      						     <button type="reset" class="btn btn-warning" id="employee-leave-reset-button">Reset All</button>
      						 </div>
      						 <div class="row text-center text-danger"> <b id="leave-success-message" class="text-center"></b></div>
   						 </div> 
                	</div>
          		     <div class="col-sm-2">
          		            <div class="row text-center"> <h4>Select leave dates</h4></div>
          		            <div id="leave-dates-multi-date-picker"></div>
          		     </div>                	
              </div> 
              <!-- Modal for apply lave confirm message -->
              <div class="modal fade" id="confirm-leave-modal" role="dialog">
				  <div class="modal-dialog">				
					 <div class="modal-content">
						 <div class="modal-header" style="padding: 35px 50px;">
							 <button type="button" class="close" data-dismiss="modal">&times;</button>
							 <h4 class="modal-title">
								 <p class="text-center"><b >Confirm</b></p>
							 </h4>
							 <div><div><b id="selected-dates-message"></b></div></div>
							 <div class="row text-center text-danger">
							      <br>
							      <b><p id="apply-leave-message"></p></b>
							 </div>
						 </div>
						 <div class="modal-footer" align="center">	
						        <div class="row">
						            <div class="col-sm-4"></div>
						            <div class="col-sm-4">
						                 <button class="btn btn-default btn-success active" id="apply-leave-confirm-button">
									          <span class="glyphicon"></span>submit
								         </button>
								          <button class="btn btn-default btn-danger active" data-dismiss="modal">
									          <span class="glyphicon"></span>cancel
								         </button>
						            </div>
						            <div class="col-sm-4">
						                 <button class="btn btn-default btn-warning active" data-dismiss="modal">
									          <span class="glyphicon"></span>close
								         </button>
						            </div>
						        </div>							
								
						 </div>
					</div>
				</div>
			</div>
			<!-- Modal to show successfully applied for leave message -->
			<div class="modal fade" id="leave-successfully-appplied-modal" role="dialog">
					<div class="modal-dialog">				
					 <div class="modal-content">
						 <div class="modal-header" style="padding: 35px 50px;">
							  <h4 class="modal-title">
								 <p class="text-center"><b >Successfully applied for leave</b></p>
							 </h4>		
						 </div>
						 <div class="modal-footer" align="center">	
						        <div class="row">
						            <div class="col-sm-4"></div>
						            <div class="col-sm-4"></div>
						            <div class="col-sm-4">
						                 <button class="btn btn-default btn-warning active" data-dismiss="modal">
									          <span class="glyphicon"></span>close
								         </button>
						            </div>
						        </div>															
						  </div>
					</div>
				</div>																				
			</div>
          			
    </div>
<!---------------------------------------------------------------  write all code above this line   -------------------------------------------------------------- -->
     </div>  <!-- End of  "row" -->
 
     
   </div> <!-- End of  "container-fluid" -->
   <!-- Modal -->
			<div class="modal fade" id="showMessageModal" role="dialog">
				<div class="modal-dialog">				
					<div class="modal-content">
						<div class="modal-header" style="padding: 35px 50px;">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							<h4 class="modal-title">
								 <b>Your message</b>
							</h4>
						</div>
						<div class="modal-body">
							<form role="form" id="frm"  autocomplete="off" >
      							<label>Message</label>
							    <textarea class="form-control" rows="10" id="message-of-employee"></textarea>
							</form>
						 </div>
						 <div class="modal-footer" align="center">								
								<button type="submit" class="btn btn-default btn-warning active" data-dismiss="modal">
									<span class="glyphicon"></span>Back
								</button>
						 </div>
					</div>
				</div>
			</div>
			
 </body>
 
 </html>