<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="adminLeftMenu.jsp"></jsp:include>

        <script src="./JS/AdminViewDisapprovedLeaves.js"></script>
        
       <!--  <div class="row"> -->
            <div class="row" id="disapproved-leaves-division">
               <div class="col-sm-11 col-sm-offset-1">
                   <div class="alert alert-info text-center"><h3>All Disapproved leaves</h3></div>
                   <div class="table-responsive">
                         <table id="disapproved-leaves-table" class="table table-hover"></table>
                   </div> 
                </div>                 
            </div>
            <div class="row" id="no-disapproves-leaves-division">
                  <br><br>
                   <h2 class="text-center text-danger">No disapproved leaves</h2>
            </div>
        
      <!--   </div> -->
             <div class="modal fade" id="confirmLeaveModal" role="dialog">
	<div class="modal-dialog">

		<div class="modal-content">
			<div class="modal-header" style="padding: 35px 50px;">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">
					<b>Message From <span id="employee-name-id"
						style="color: maroon;"></span> ( Id :<span id="employee-id-id"
						style="color: maroon;"></span> )
					</b>
				</h4>
			</div>
			<div class="modal-body">
				<form role="form" id="frm" autocomplete="off" action="#" onsubmit="return false;">


					<label>Subject</label>
					<textarea class="form-control" rows="1" id="subject-of-employee" readonly="readonly"></textarea>

					<label>Message</label>
					<textarea class="form-control" rows="10" id="message-of-employee" readonly="readonly"></textarea>

                     <div class="row">
                        <div class="col-sm-1"></div>
                        <div class="col-sm-11">
                           <p id="leave-dates-section"></p><br>
                           <p id="employee-leave-status"></p>
                        </div>
                     </div>
				</form>
				
			</div>
			<div class="modal-footer">
				<div align="center">
					<button class="btn btn-default  btn-success active" id="approve-leave-button">
						<span class="glyphicon glyphicon-ok"></span>Approve
					</button>
					<button type="submit" class="btn btn-default btn-warning active"
						data-dismiss="modal">
						<span class="glyphicon"></span>Back
					</button>
				</div>
				<div class="row text-center text-danger"><br><b><p id="admin-approve-leave-message"></p></b></div>
			</div>
		</div>

	</div>
</div>
      
<!-- Modal to approve/disapprove leave-->
<div class="modal fade" id="update-success-modal" role="dialog">
	<div class="modal-dialog">

		<div class="modal-content">
			<div class="modal-header" ><!--  style="padding: 35px 50px;" -->			  
				<button type="button" class="close text-danger" data-dismiss="modal">&times;</button>
				<br>
				<h4 class="modal-title text-center">
					Operation successful
				</h4>
				<br>
			</div>
		</div>

	</div>
</div>

<jsp:include page="footer.jsp"></jsp:include>