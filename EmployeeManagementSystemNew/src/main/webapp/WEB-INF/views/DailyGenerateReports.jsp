<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>EMS</title>
<link rel="shortcut icon" type="image/x-icon"
	href="./js1/caprus logo.png" />
<script src="./jquery/jquery-2.1.4.js"></script>
<script src="./jquery/jquery-ui.js"></script>

<style>
#fixed {
	text-decoration: none;
	position: fixed;
	right: 0px;
	top: 102px;
	width: 110px;
	height: 30px;
	border: 3px solid #bebebe;
}
</style>
<script type="text/javascript">
$(function() {
var employeeids=[];
    $("#id").autocomplete({
  	  source :function(request, response) {
  		 var id_value=document.getElementById("id").value;
  	      
  	      if(id_value.length==1){
  	       employeeids=[];
    				$.ajax({
            			url : "/EmployeeManagementSystemNew/getAutoCompleteInfo.do",
					type : "POST",
					data : {
						employeeId : request.term
					},
					dataType : "json",
					success : function(data) {
					/* 	response(data); */
						$.each(data, function(key, value){
							employeeids.push(value+ "");
						});
						response(employeeids);
					}
				});
  	    }
  	      else{
  	     response(employeeids);
  	      }
			}
		});
	});

	function getDisable()
	{
		if($( "#select" ).val()=="all")
			{
			$( "#id" ).prop( "disabled", true );
			}
		else{
			$( "#id" ).prop( "disabled", false );
		}
		
	}
	$("document").ready(
			function() {
	$("#dayreports").click(function()
	{
		 $("#remove").remove();
        
		var empId = $( "#id" ).val();
		var day1=$("#datepicker").val();
		var newday=new Date(day1);
		var newdayMilli=newday.getTime();
	    console.log("emp id: "+empId+"    dtae: "+newday);
		if($( "#select" ).val()=="single" && empId!="" && day1!="")
		{
			console.log(" getReportByIdAndDate ");
		var request = $.ajax({
		  url: "/EmployeeManagementSystemNew/getReportByIdAndDate.do",
		  method: "POST",
		  data: { employeeId : empId,attendanceDate: newdayMilli},
		  dataType: "json"
		});
		 
		request.done(function( data ) {
			console.log("response : "+data);
			   console.log("response for  getReportByIdAndDate"+JSON.stringify(data));
                var len = data.employeeReport.length;
                
                console.log("data length: "+len);
                var txt = "";
                if(len > 0){
                	var report= data.employeeReport[0];
                	var endTime=(report.endTime == undefined)?"Not Logged Out":report.endTime;
                	$( "#print" ).show();
                	$("#tbody").show();
                	$( "#res" ).hide();
                	txt+="<tbody id='remove'>"
                        
                            txt += "<tr><td>"+empId+"</td><td>"+report.attendanceDate+"</td><td>"+report.startTime+"</td><td>"+endTime+"</td><td>"+report.workingHours+"</td><td>"+report.dayIndicator+"</td></tr>";
                        
                	txt+="</tbody>";
                    if(txt != ""){
                        $("#table").append(txt);
                    }
                }
			else{
				$( "#print" ).hide();
				$( "#res" ).show();
				document.getElementById("res").innerHTML="NO MATCHES FOUND";
			}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
			$( "#print" ).hide();
			$( "#res" ).show();
			document.getElementById("res").innerHTML="Error occured due to some internal problem.please try again.";
		});
	}
		else if($( "#select" ).val()=="all" && day1!="")
			{
				var day1=$("#datepicker").val();
				var newday=new Date(day1);
				var newdayMilli=newday.getTime();
				
				 console.log("Date: "+newday);
				
				var request = $.ajax({
				  url: "/EmployeeManagementSystemNew/getAllEmployeesReportByDate.do",
				  method: "POST",
				  data: { attendanceDate: newdayMilli},
				  dataType: "json"
				});
				 
				request.done(function(data) {
					
					console.log("Response come from  getAllEmployeesReportByDate() method "+JSON.stringify(data));
					
					 var len = data.length;
		                var txt = "";
		                if(len > 0){
		                	$( "#print" ).show();
		                	$("#tbody").show();
		                	$( "#res" ).hide();
		                	txt+="<tbody id='remove'>"
		                    for(var i=0;i<len;i++){
		                    	var endTime=(data[i].endTime == undefined)?"Not Logged Out":data[i].endTime;
		                    	
		                            txt += "<tr><td>"+data[i].employeeId+"</td><td>"+data[i].attendanceDate+"</td><td>"+data[i].startTime+"</td><td>"+endTime+"</td><td>"+data[i].workingHours+"</td><td>"+data[i].dayIndicator+"</td></tr>";
		                        
		                    }
		                	txt+="</tbody>";
		                    if(txt != ""){
		                        $("#table").append(txt);
		                    }
		                   
		                }
					else{
						$( "#print" ).hide();
						$( "#res" ).show();
						document.getElementById("res").innerHTML="NO MATCHES FOUND";
					}
				});
				 
				request.fail(function( jqXHR, textStatus ) {
					$( "#print" ).hide();
					$( "#res" ).show();
					document.getElementById("res").innerHTML="Error occured Please try again.";

				});
			}
		else{
			$( "#print" ).hide();
			$( "#res" ).show();
			document.getElementById("res").innerHTML="field should not be empty.";
		}
	});
	
	$('[data-toggle="popover"]').popover(); 
});
</script>


</head>
<body>
	<jsp:include page="AdminTemplate.jsp"></jsp:include>
	<div class="row generateposition">
		<label>select type:</label> <select id="select"
			onchange="getDisable()">
			<option title="" value="">--Select--</option>
			<option value="single">Single</option>
			<option value="all">All</option>
		</select>&nbsp;&nbsp;&nbsp; <input type="text" id="id" maxlength="6" placeholder="enter id">&nbsp;&nbsp;
		Date: <input type="text" id="datepicker">&nbsp;&nbsp;
		<button class="btn btn-primary" id="dayreports">submit</button>

		<a id="fixed" href="#" data-toggle="popover" data-placement="left"
			data-trigger="focus" data-content="user : Admin,EMS ">

			Productivity info </a>
	</div>
	<div class="row generateposition1">
		<div id="printdiv">
			<table id="table" border='2'>
				<thead>
					<tr>
						<th>empId</th>
						<th>Date</th>
						<th>StartTime</th>
						<th>EndTime</th>
						<th>WorkHours</th>
						<th>DayIndicator</th>
					</tr>
				</thead>
			</table>
		</div>
		<font color="red"><p aling="center" id="res"></p></font> <br />
		<br />
		<button id="print" class='btn btn-primary'
			onclick="PrintDiv('printdiv');">print</button>
	</div>
</body>
</html>