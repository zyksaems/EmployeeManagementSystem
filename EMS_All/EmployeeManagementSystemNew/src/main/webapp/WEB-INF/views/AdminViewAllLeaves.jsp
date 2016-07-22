
<jsp:include page="header.jsp"></jsp:include>
<jsp:include page="adminLeftMenu.jsp"></jsp:include>

<script src="./JS/AdminViewAllLeaves.js"></script>


     <div>
         <div class="col-sm-10"> 
               <div id="leaves-table-division" class="table-responsive">
                     <div class="alert alert-info text-center"> 
	                      <b><span style="font-size: 200%" id="employee-leave-details-heading">Employee Leave Details</span></b>
                     </div>
                      <hr>
	                 <table id="admin-leaves-table" class="table table-hover"></table>
                </div>
                <br><br><br>
                <div class="row" id="nodata-leave-message-div">
                     <div class="col-sm-5"></div>
                     <div class="col-sm-4">
                         <h2 class="text-danger">No leaves found</h2>
                      </div>
                </div>
         </div>
         <div class="col-sm-2">
                <br>
                <div class="row" ><b><marquee direction="left" id="showing-message" scrollamount="3" onmouseover="this.stop()" onmouseout="this.start()">Employee leave details</marquee></b></div>
                <br><br>
                <div class="row text-center"> 
                     <!-- <div class="c"></div> -->
                     <button class="btn btn-sm btn-primary" id="all-leaves-button">view all leaves</button>
                     <button class="btn btn-sm btn-primary" id="month-leaves-button">view month wise leaves </button>
                </div>
                <div class="row" id="slect-month-division">
                    <br><br>
                    <div class="row text-center text-danger"><b>Month wise leaves</b></div>
                    <br>
                    <label><b>Select month:</b></label>
                    <input type="month" class="form-control" id="select-month-field"/>
                    <br>
                    <div class="text-center">
                        <button class="btn btn-sm btn-primary" id="view-selected-cmonth-leaves-button">View leaves</button>
                    </div>
                    <div class="text-center text-danger"><br><b><p id="view-leaves-message"></p></b></div>
                </div>
         </div>
    </div>
    


<!-- 
<div class="abtlikebox" style="right: -268px;">
	<button id="fixed1">Productivity info</button>
	<div>
		user : Admin,EMS<br /> Company total Worked Hours: <span
			id="company_work_hours"></span> hr<br /> Employee Worked Hours : <span
			id="emp_work_hours"></span> hr

	</div>
</div> -->


<!-- Modal -->
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
					<button type="submit" class="btn btn-default  btn-danger active" id="disapprove-leave-button">
						<span class="glyphicon glyphicon-remove"></span>Disapprove
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



<jsp:include page="footer.jsp"></jsp:include>
