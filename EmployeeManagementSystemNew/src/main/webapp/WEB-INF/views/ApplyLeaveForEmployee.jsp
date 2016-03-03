<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<jsp:include page="EmployeeLeftMenu.jsp"></jsp:include>


<script src="./JS/employeeDashBoard.js"></script>



           <link rel="stylesheet" href="./CSS/employeeDashboard.css">
          
          
          <form>
          
          		<!-- <p id="logged-in-employee-name"  class="name-heading">Hi </p> -->
          		<br>
          		<p align="center">
          			<span style="color:blue; font-size: 200%;">Leave Application</span><br><br>
          		
          		</p>
          		<p></p>
            <div class="row">   
            	       
                
                  <!-- <div class="col-sm-10">
                       <div class="form-group">
      						<input type="text" class="form-control" id="to" placeholder="To">
   						 </div> 
                	</div>
                	
                	<div class="col-sm-10">
                       <div class="form-group">
      						<input type="text" class="form-control" id="cc" placeholder="CC">
   						 </div> 
                	</div> -->
                	
                	<div class="col-sm-10">
                       <div class="form-group">
      						<input type="text" class="form-control" id="subject" placeholder="Add a Subject">
   						 </div> 
                	</div>
                	
                	<div class="col-sm-10">
                       <div class="form-group">
      						 <textarea class="form-control" rows="10" id="text-for-leave" placeholder="Text Here"></textarea>
      						 <div align="left">
      						 <button type="button" class="btn btn-primary" onclick="sendMail();">Apply</button>
      						  <button type="reset" class="btn btn-warning">Reset All</button>
      						 </div>
   						 </div> 
                	</div>
          			<div class="col-sm-10">
          				<table id="leave-table" class="table">
          					<thead>
          						<tr>
          							<th>Date of Applied</th>
          							<th>Subject</th>
          							<th>Status</th>
          							<th>See Message</th>
          						</tr>
          					</thead>
          				</table>
          			
          			</div>
            


<!---------------------------------------------------------------  write all code above this line   -------------------------------------------------------------- -->
     </div>  <!-- End of  "row" -->
     </form>
     
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
								
									<button type="submit" class="btn btn-default btn-warning active"
										data-dismiss="modal">
										<span class="glyphicon"></span>Back
									</button>
							</div>
							</div>
					</div>

				</div>
			
 </body>
 
 </html>