<!DOCTYPE html>
<html lang="en">
<head>
<title>EMS Admin page</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<script src="FormValidation(js)/jquery.min.js"></script>
<script src="FormValidation(js)/bootstrap.min.js"></script>
<script src="FormValidation(js)/bootstrap.js"></script>
<script src="FormValidation(js)/jquery-ui.js"></script>


<link rel="stylesheet" href="FormValidation(css)/bootstrap.css">
<link rel="stylesheet" href="FormValidation(css)/jquery-ui.css">
<link rel="stylesheet" href="FormValidation(css)/font-awesome.min.css">
<link rel="shortcut icon" type="image/x-icon" href="images/caprus logo.png" />
<link rel="stylesheet" href="./jquery/jquery-ui.css">
<link rel="stylesheet" href="./CSS/style.css">

<!-- custom css -->
<script src="./JS/Admin_logout.js"></script>
<link rel="stylesheet" href="./CSS/homepage.css">
<link rel="stylesheet" href="./CSS/header2.css">
<link rel="stylesheet" href="./CSS/footer.css">

    <script src="./JS/AdminLinkControll.js"></script>
  
   <script src="./JS/MakeLinkAsActive.js "></script>
   <link rel="stylesheet" type="text/css" href="./CSS/LinkStyle.css ">

<script type="text/javascript">
var noticeData;
var modifiedString="";
var count=0;
var eachNoticeIndex;
$(document).ready(function(){
	display();
	getAllNotices();
	
	$("#delete-notice").click(function(){
		deleteNotice(eachNoticeIndex);
	});
	
	$("#set-notice").click(function(){
		setNotice();
	});
	
});

function getNoticeId(index){
	eachNoticeIndex=index;
}

function deleteNotice(index){
	var noticeObject={notice:null};
	console.log("delete button clicked");
	console.log("notice data "+noticeData[index].notice);
	var result=noticeData[index].notice;
	
	noticeObject={notice:result};
	
	$.ajax({
        type: "POST",
        url: "/EmployeeManagementSystemNew/deleteNotice.do",
        data:noticeObject,
        success: function(msg) {
          /*  alert("Updated");*/
        },
        error: function(msg) {
    
        
        }
    });
	
}

function setNotice(){
	
	console.log("in setNotice");
	
	var noticeObject={notice:null};
	var result=document.getElementById("notice").value;
	/* alert("result="+result); */
	console.log("result ="+result);
	
	noticeObject={notice:result};
	
	 $.ajax({
        type: "POST",
        url: "/EmployeeManagementSystemNew/setNotice.do",
        data:noticeObject,
        success: function(msg) {
         
        },
        error: function(msg) {
    
        
        }
    });
	 
	
}


	function display(){
		var str=document.getElementById("notice").value;
		console.log("From textarea= "+str);
		var inc=1;
		if(str!=""){
					
			document.getElementById("post-show").innerHTML="<p>"+inc+". "+str+"</p><p>"+modifiedString+"</p>";
		}
	}
	 
    
	  function getAllNotices(){
		  console.log("......getAllNotices()......");
		  var request = $.ajax({
			  url: "/EmployeeManagementSystemNew/allNotices.do",
			  method: "GET",
			 
			});
			 
			request.done(function(data) {
				console.log("Notices came");
				noticeData=data;
				
				var len=data.length;
				var string="";
				var string1="";
				if(len>0){
					for(var i=0;i<len;i++){
						var k=i+2;
						var j=i+1;
						var string1=string1+"<p>"+k+". "+noticeData[i].notice;
				
						 string += " <tr id="+i+"><td>"+j+"</td><td>"
                         +noticeData[i].notice
                         +"</td><td><button type='button' class='btn btn-info active' onclick='getNoticeId("+i+")' " +
                 		"data-toggle='modal' data-target='#deleteNoticeModal'>Delete</button></td><tr>";
					}
				}
				/* $("#myTable").append("<tbody id='tablebody'>"+string+"</tbody>"); */
				if(string!=""){
				$("#myTable").append("<tbody id='tablebody'>"+string+"</tbody>");
				}else{
					$("#myTable thead").hide();
					$("#table-div").html("No notice available");
				}
				
				modifiedString=string1;
				console.log("modifiedString="+modifiedString);
				count=j;
				/* document.getElementById("pre-show").innerHTML="<p>"+noticeData[1].notice+"</p>"; */
				
				});
			
			request.fail(function(jqXHR, textStatus ) {
				  console.log("failed to retrieve notices");
				});	
			}
	  
	  
	  function clearReviewNotice(){
		  document.getElementById("post-show").innerHTML=""; 
		  
	  }
  
	
</script>	







</head>
<body>

<div class="container-fluid ">
		<div class="row headpart">
		<div class="col-sm-2 icon">
            <img src="./images/caprus logo.png" width="65px" height="65px">
		</div>
			<div class="col-sm-8 title_menu text-center">
				<h1 ><b>Employee Management System</b></h1>
			</div>
			<div class="col-sm-2">
				<div class="dropdown">
					<span class="glyphicon glyphicon-cog icon-setting"
						data-toggle="dropdown"></span>
					<ul class="dropdown-menu dropdown-menu-right" id="dropdown">
						<li><a href="/EmployeeManagementSystemNew/getChangePasswordPage.do">Change password</a></li>
						<li><a href="#" id="admin-logout-link">Logout</a></li>
					</ul>
				</div>
			</div>
		</div>



	<div class="row">

		<!-- This division is the division on left for display links -->
		<div class="col-sm-2 sidebar">

			 <div id="accordion">
			<h3 style="">Manage Employee</h3>
	    	<div>
	    	<ul>
	    	<li><a  href="#" id="admin-add-employee-link">Add Employee</a></li>
	    	<li><a href="#" id="admin-view-update-emp-link">View/Update Employee</a></li>
	    	<li><a href="#" id="notice-add-link">Update Notice</a></li>
	    	<li><a href="#" id="employee-leave-details-link">Employee Leave Details</a></li>
	    	</ul>
			</div>
			<h3>Reports</h3>
			<div>
						<ul>
							<li><a href="#" id="admin-view-daily-report-link">Daily Reports</a></li>
					
						
						<li><a  href="#" id="admin-view-weekly-report-link">Weekly Reports</a></li>
						
						<li><a  href="#" id="admin-view-monthly-report-link">Monthly Reports</a></li>
					
						<li><a  href="#" id="admin-view-anual-report-link">Annual Reports</a></li>
						</ul>
					</div>
			<h3>View Attendance</h3>
			<div>
			<ul>
			<li>
			 <a  href="#" id="admin-view-today-attendance-link">Daily Attendance</a></li>
			</ul>
			</div>
			<h3>Productivity</h3>
			<div>
			<ul>
			<li>
			<a  href="#" id="weekly-productivity-link">Weekly Productivity</a></li>
			<li>
			<a href="#" id="monthly-productivity-link">Monthly Productivity</a></li>
			<li>
			<a  href="#"  id="anual-productivity-link">Annual Productivity</a></li>
			</ul>
			</div>
			</div> 
		</div>	
		<h2>Notice Board</h2>
		
	<div class="container-fluid">
		  <div class="row">
				    <div class="col-sm-5" style="background-color:lavender;">
				    		<h2>Previous Notice</h2>
					 		<div class="alert alert-info" id="table-div">
					 			<table  class="table" id="myTable" border="1">
					 				<thead>
										<tr>
											<th>Sn #</th>
											<th>Notices</th>
											<th>Action</th>
										</tr>
									</thead>
					 			</table>
				  			</div>
				    	<h2>Add Notices</h2>
				    	<textarea rows="5" cols="62"  id="notice"></textarea><br>
				    	<p align="center"><Button type="button" onclick="display();" class='btn btn-info active' >Review</Button></p>
				    </div>
					&nbsp;&nbsp;&nbsp;&nbsp;
				    
				    <div class="col-sm-4" style="background-color:lavenderblush;">
				    	<h2>Review Notice Board</h2>
					 		<div class="alert alert-info">
				   				<marquee width=400 direction="up" behavior="scroll" height=160 scrollamount="3" onmouseover="this.stop();" onmouseout="this.start();">
									<p id="post-show"></p>
								</marquee>
							</div>
				    	<p align="center">
				    	
				    		<button type='button' class='btn btn-info active'  data-toggle='modal' data-target='#setNoticeModal'>Set Notice</button>
				    		<button type='button' class='btn btn-info active'  onclick='clearReviewNotice()'>Clear Notice</button>
				    	</p>
				   </div>
		   	</div>
	</div>
</div>
</div>
			<!-- Modal 1 -->
			<div class="modal fade" id="deleteNoticeModal" role="dialog">
				<div class="modal-dialog">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header" style="padding: 35px 50px;">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
								<div class="modal-body" align="center">
									<form role="form" id="frm" method="post" >
										<h2>Are You Sure</h2>
											<div class="modal-footer">
												<div align="center">
														<button type="submit"
																class="btn btn-default  btn-success active"
																id="delete-notice">
																<span class="glyphicon glyphicon-ok"></span>Yes
														</button>
														<button type="submit" 
																class="btn btn-default btn-danger active"
																data-dismiss="modal">
														<span class="glyphicon glyphicon-remove"></span>No
														</button>
												</div>
										</div>
									</form>
								</div>

							</div>
					</div>
				</div>
			</div>
			
			
			<!-- Modal 2 -->
			<div class="modal fade" id="setNoticeModal" role="dialog">
				<div class="modal-dialog">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header" style="padding: 35px 50px;">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
								<div class="modal-body" align="center">
									<form role="form" id="frm" method="post" >
										<h2>Are You Sure</h2>
											<div class="modal-footer">
												<div align="center">
														<button type="submit"
																class="btn btn-default  btn-success active"
																id="set-notice">
																<span class="glyphicon glyphicon-ok"></span>Yes
														</button>
														<button type="submit" 
																class="btn btn-default btn-danger active"
																data-dismiss="modal">
														<span class="glyphicon glyphicon-remove"></span>No
														</button>
												</div>
										</div>
									</form>
								</div>

							</div>
					</div>
				</div>
			</div>
</body>
</html>
