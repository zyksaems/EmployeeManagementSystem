<jsp:include page="header.jsp"></jsp:include> 
<jsp:include page="adminLeftMenu.jsp"></jsp:include>
<link rel="stylesheet" href="FormValidation(css)/updateUser.css">
			
<script>

var currentRow;
var allLeaveData;
var currentEmployeeLeaveId;
function holdRowNo(index){
	currentRow=index;
	currentEmployeeLeaveId=allLeaveData[currentRow].leaveId;
	var isApproveStatus=allLeaveData[currentRow].isApproved;
	
	alert(isApproveStatus);
	
	if(isApproveStatus!="Pending"){
		$("#do-approve-id").hide();
		$("#do-disapprove-id").hide();
	}else{
		$("#do-approve-id").show();
		$("#do-disapprove-id").show();
		
	}
	
	
	$("#subject-of-employee").html(allLeaveData[currentRow].subject);
	$("#message-of-employee").html(allLeaveData[currentRow].message);
	$("#employee-name-id").html(allLeaveData[currentRow].name);
	$("#employee-id-id").html(allLeaveData[currentRow].employeeId);
	
}



function doapprove(index){
	
	var approveObject=null;
	approveObject=allLeaveData[currentRow];
	alert(approveObject.leaveId);
	
	 $.ajax({
        type: "POST",
        url: "/EmployeeManagementSystemNew/doApprove.do",
        data:approveObject,
        success: function(msg){
            window.location.reload();
        },
        error: function(msg) {
    
        
        }
    }); 
}

function disapprove(index){
	
	var disApproveObject=null;
	disApproveObject=allLeaveData[currentRow];
	alert(disApproveObject.leaveId);
	
	 $.ajax({
        type: "POST",
        url: "/EmployeeManagementSystemNew/disApprove.do",
        data:disApproveObject,
        success: function(msg){
            window.location.reload();
        },
        error: function(msg) {
    
        
        }
    }); 
}

$(document).ready(function(){
	
	getAllLeavesOfEmployee();
	
	$("#do-approve-id").click(function(){
		alert("doapprove(currentRow)");
		doapprove(currentRow);
	});
	

	$("#do-disapprove-id").click(function(){
		alert("disapprove(currentRow)");
		disapprove(currentRow);
	});
	
	
	$("#frm").submit(function(){
		
		return false;
	});

	
});

function getAllLeavesOfEmployee(){
	
	console.log(".........getting all leaves details.......");
	
	 var request = $.ajax({
		  url: "/EmployeeManagementSystemNew/getAllLeave.do",
		  method: "GET",
		  dataType: "json"
		});
		 
		request.done(function(data){
			
			console.log("......All leave Details......."+data);
			allLeaveData=data;
			 var len = data.length;
			 for(var i=0;i<len;i++){
				 console.log(data[i]);
			 }
			 console.log(len);
			 
			 var txt = "";
			 
               if(len > 0){
                   for(var i=0;i<len;i++){
                           txt += " <tr id="+i+"><td>"
                           +data[i].employeeId+"</td><td>"
                           +data[i].name+"</td><td>"
                           +data[i].date_of_apply+"</td><td>"
                           +data[i].isApproved+"</td><td>"
                           +"<button type='button' class='btn btn-default btn-info active'onclick='holdRowNo("+i+")'" +
                           		"data-toggle='modal' data-target='#confirmLeaveModal'>Click</button></td><tr>";	                            
                       }
                   	if(txt != ""){
                   		$("#leave-table-details").append("<tbody id='tablebody'>"+txt+"</tbody");
                   		$("button").click(function(){
                   			console.log("button clicked");
                   		});
                   	}
                   }
               	else{
               		alert("No Match Found");
               	}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  alert("failed all");
		});
  
	
}
</script>


<p align="center"><span style="font-size:200%">Employee Leave Details</span> </p>			   
<hr>

<div>

	<table id="leave-table-details">
					<thead >
						<tr>
							<th height="50" align="center">EMPLOYEE ID</th>
							<th height="50" align="center">EMPLOYEE NAME</th>
							<th height="50" align="center">APPLIED DATE</th>
							<th height="50" align="center">STATUS</th>
							<th height="50" align="center">VIEW MESSAGE</th>
						</tr>
					</thead>
	</table>

</div>



<div class="abtlikebox" style="right: -268px;">
      <button id="fixed1" >Productivity info </button>
     <div>
     user : Admin,EMS<br />
	Company total Worked Hours: <span id="company_work_hours"></span> hr<br />
	Employee Worked Hours : <span id="emp_work_hours"></span> hr 
     
     </div>  
 </div>
 

			<!-- Modal -->
			<div class="modal fade" id="confirmLeaveModal" role="dialog">
				<div class="modal-dialog">

					Modal content
					<div class="modal-content">
						<div class="modal-header" style="padding: 35px 50px;">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							<h4 class="modal-title">
								<b>Message From <span id="employee-name-id" style="color: maroon;"></span> ( Id :<span id="employee-id-id" style="color: maroon;"></span> )</b>
							</h4>
						</div>
						<div class="modal-body">
							<form role="form" id="frm"  autocomplete="off" >
								
								
								<label>Subject</label>
      							<textarea class="form-control" rows="1" id="subject-of-employee"></textarea>
      							
      							<label>Message</label>
							    <textarea class="form-control" rows="10" id="message-of-employee"></textarea>
									
								
								</form>
							</div>
							 <div class="modal-footer">
								<div align="center">
									 <button type="submit"
										class="btn btn-default  btn-success active"
										id="do-approve-id">
										<span class="glyphicon glyphicon-ok"></span>Approve
									</button>
									<button type="submit"
										class="btn btn-default  btn-danger active"
										id="do-disapprove-id">
										<span class="glyphicon glyphicon-remove"></span>Disapprove
									</button>
									<button type="submit" class="btn btn-default btn-warning active"
										data-dismiss="modal">
										<span class="glyphicon"></span>Back
									</button>
									</div>
							</div>
					</div>

				</div>
			</div>
			
			
			
<jsp:include page="footer.jsp"></jsp:include> 