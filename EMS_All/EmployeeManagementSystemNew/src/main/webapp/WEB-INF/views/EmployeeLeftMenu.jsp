<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Employee DashBoard</title>

   <script src="./jquery/jquery-2.1.4.js"></script>
  
   <script src="./jquery/jquery-ui.js"></script>
   <link rel="stylesheet"  href="./jquery/jquery-ui.css">
   
   <script src="./bootstrap/bootstrap.min.js"></script>   
   <link rel="stylesheet"  href="./bootstrap/bootstrap.min.css">
  
  
  <link rel="stylesheet" href="./CSS/AdminTemplete.css">
   <link rel="stylesheet" href="./CSS/EmployeeDashBoardCss.css">  
  <link rel="stylesheet" type="text/css" href="./CSS/style.css"> 
  
  <link rel="shortcut icon" type="image/x-icon" href="./images/caprus logo.png" />
    
  <script src="./JS/Admin_logout.js"></script>  
  
  <script src="./JS/EmployeeLinksControll.js "></script>
  <script src="./JS/MakeLinkAsActive.js "></script> 
  <link rel="stylesheet" type="text/css" href="./CSS/LinkStyle.css ">
  <script src="https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js"></script>
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.11/css/jquery.dataTables.min.css">
  
 	<style>
     .uploader {width:300px;height:350px;background:#f3f3f3;border:2px dashed #e8e8e8;}
    </style>
	<script>
	
	var img;
	$(document).ready(function(){
		
		var imageLoader = document.getElementById('filePhoto');
		imageLoader.addEventListener('change', handleImage,true);
		
		function handleImage(e) {
			var reader = new FileReader();
			 reader.onload = function (event) {
				img=event.target.result;
				$('.uploader').html( '<img width="300px" height="350px" src="'+img+'"/>');
					
			}
			 var imgFile=e.target.files[0];
			 reader.readAsDataURL(imgFile);
		}
	});
	
	function  setProfilePicture(){
		var profileImage={employeeId:null,imageString:null};
		
		console.log("Button clicked");
		console.log(img);
		var id=localStorage.getItem('loggedEmployeeID');
		console.log("id "+id);
		 profileImage={employeeId:id,imageString:img};
		 $.ajax({
	        type: "POST",
	        url: "/EmployeeManagementSystemNew/setProfilePic.do",
	        data:profileImage,
	        success: function(msg) {
	         	window.location.reload();
	        },
	        error: function(msg) {
	        	
	        }
	    });	
	}
	</script>
</head>
<body>

     <div class="container-fluid ">
      	<div class="row headpart">
		     <div class="col-sm-2 icon" id="pro-img">
                  <img src="./images/caprus logo.png" width="65px" height="65px">
		     </div>
			 <div class="col-sm-7 title_menu text-center">
				<h1 ><b>Employee Management System</b></h1>
			 </div>
			<div class="col-sm-3" id="loggedout_div">
				<div class="employee_dropdown">
				<a href="#">
					<img id="p-image" class="img-circle" width="50" height="50" data-toggle="modal" data-target="#myModal" id="profile-img" alt="Profile pic">
				</a>
				<br> 
					<span class="logged_out_name_css"
						data-toggle="dropdown"><p id="loggedout_employee-name" class="glyphicon glyphicon-collapse-down"></p></span>
					<ul class="dropdown-menu" id="dropdown_emp">
						<!-- <li><a href="#" id="admin-profile-link">Profile</a></li> -->
						<li><a href="/EmployeeManagementSystemNew/getEmployeeChangePasswordPage.do">Change password</a></li>
						<li><a href="#" id="admin-logout-link">Logout</a></li>
					</ul>
				</div>
			 </div>
		 </div>
		 <div class="row">
		
		     <!-- This division is the division on left for display links -->
			<div class="col-sm-2 sidebar">
			
			       <div id="accordion">
			           <h3 style="">Attendance</h3>
	    	           <div>
	    	               <ul>	    	            
	    	                  <li ><a href="#" id="view-employee-weekly-attendance-link">View weekly attendance details</a></li>
	    	                  <li><a href="#" id="view-employee-monthly-attendance-link">View monthly attendance details</a></li>
	    	                  <li><a href="#" id="view-employee-annual-attendance-link">View annual attendance details</a></li>
	    	               </ul>
			            </div>
			            <h3>Leave</h3>
			            <div>
						    <ul>
						     <li><a href="#/EmployeeManagementSystemNew/viewEmployeeLeave.do" id="employee-view-leaves-link">View leaves</a></li>
							   <li><a href="#/EmployeeManagementSystemNew/applyForLeave.do" id="employee-apply-leave-link">Apply for leave</a></li>					    
 						       <li><a href="#" id="employee-view-leave-status-link">View leave status</a></li>												       												      
						   </ul>
					</div>
		
			       </div>   <!-- accordion  end -->
	
			  </div>
<!-- two divisions are opened close those two -->

<!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">
    
      <!-- Modal content-->
      <div class="modal-content" align="center">
        <div class="modal-header" >
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><strong>Change Profile Picture</strong></h4>
        </div>
        <div class="modal-body">
              	<div class="uploader" onclick="$('#filePhoto').click()"> 
						Click here your images for preview and set as user profile picture. 
				</div>
       			<input type="file" name="userprofile_picture"  id="filePhoto" style="display:block;width:300px;"  />
    
            
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default btn-info" onclick="setProfilePicture();">Set Profile Picture</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
  
