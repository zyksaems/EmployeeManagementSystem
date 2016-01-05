<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Employee Management System</title>
<script src="./jquery/jquery-2.1.4.js"></script>
<script src="./jquery/jquery-ui.js"></script>

 <script type="text/javascript">
$(function() {
var employeeids=[];
    $("#id").autocomplete({
  	  source :function(request, response) {
    				$.ajax({
            			url : "<%=request.getContextPath()%>/AutoCompleteId",
					type : "GET",
					data : {
						term : request.term
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
	function getReports()
	{
		 $("#remove").remove();
        
		var empId = $( "#id" ).val();
		var day1=$("#datepicker").val();
		
		if($( "#select" ).val()=="single" && empId!="" && day1!="")
		{
		var request = $.ajax({
		  url: "<%=request.getContextPath()%>/AttendanceDay",
		  method: "GET",
		  data: { id : empId,day:day1},
		  dataType: "json"
		});
		 
		request.done(function( data ) {
			
                var len = data.length;
                var txt = "";
                if(len > 0){
                	$("#tbody").show();
                	$( "#res" ).hide();
                	txt+="<tbody id='remove'>"
                    for(var i=0;i<len;i++){
                        
                            txt += "<tr><td></td><td>"+data[i].attendanceDate+"</td><td>"+data[i].startTime+"</td><td>"+data[i].endTime+"</td><td>"+data[i].workingHours+"</td><td>"+data[i].dayIndicator+"</td></tr>";
                        
                    }
                	txt+="</tbody>";
                    if(txt != ""){
                        $("#table").append(txt);
                    }
                }
			else{
				$( "#res" ).show();
				document.getElementById("res").innerHTML="NO MATCH FOUND";
			}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
			$( "#res" ).show();
			document.getElementById("res").innerHTML="Error occured due to some internal problem.please try again.";
		});
	}
		else if($( "#select" ).val()=="all" && day1!="")
			{
			var request = $.ajax({
				  url: "<%=request.getContextPath()%>/AttendanceSrv",
				  method: "GET",
				  data: { day :day1},
				  dataType: "json"
				});
				 
				request.done(function(data) {
					
					 var len = data.length;
		                var txt = "";
		                if(len > 0){
		                	txt+="<tbody id='remove'>"
		                    for(var i=0;i<len;i++){
		                        
		                            txt += "<tr><td>"+data[i].employeeId+"</td><td>"+data[i].attendanceDate+"</td><td>"+data[i].startTime+"</td><td>"+data[i].endTime+"</td><td>"+data[i].workingHours+"</td><td>"+data[i].dayIndicator+"</td></tr>";
		                        
		                    }
		                	txt+="</tbody>";
		                    if(txt != ""){
		                        $("#table").append(txt);
		                    }
		                }
					else{
						$( "#res" ).show();
						document.getElementById("res").innerHTML="NO MATCH FOUND";
					}
				});
				 
				request.fail(function( jqXHR, textStatus ) {
					$( "#res" ).show();
					document.getElementById("res").innerHTML="Please try again.";

				});
			}
		else{
			$( "#res" ).show();
			document.getElementById("res").innerHTML="field should not be empty.";
		}
	}
</script> 

<style>
.generatereportheder{
border: 1px solid #bebebe;
}
.generatereportmain{
border: 1px solid black;
}
table, td, th {
 
    border: 1px solid green;
}
th,td{
width:130px;
height: 30px;
}

th {
   height: 40px;
    background-color: green;
    color: white;
}
.generateposition{

width:auto;
height:60px;
left: 22%;
	top: 17%;
	position: absolute;
	padding-top: 13px;
	background-color:#F5F5F5;
	padding-left: 10px;
	padding-right: 10px;
}
.generateposition1{

width:auto;
height:auto;
left: 22%;
	top: 28%;
	position: absolute;
	padding-top: 13px;
	padding-left: 10px;
	padding-right: 10px;
}
input {
	font-size: 20px;
	 width: 180px;
	 height: 28px;
	 border-radius: 5px;
	 
}
select {
 width: 100px;
 height: 28px;
 border-radius: 5px;
}
</style>

</head>
<body>
<jsp:include page="AdminTemplate.jsp"></jsp:include>
<div class="row generateposition">
<label>select type:</label>
         <select id="select" onchange="getDisable()">
		<option title="" value="">--Select--</option>
		<option value="single">Single</option>
		<option value="all">All</option>
	</select>&nbsp;&nbsp;&nbsp;
	<input  type="text" id="id" placeholder="enter id" >&nbsp;&nbsp;
	Date: <input type="text" id="datepicker">&nbsp;&nbsp;
	<button class="btn btn-primary" onclick="getReports()">submit</button>
</div>
<div class="row generateposition1">
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
				
		<font color="red"><p aling="center" id="res"></p></font>
</div>
</body>
</html>