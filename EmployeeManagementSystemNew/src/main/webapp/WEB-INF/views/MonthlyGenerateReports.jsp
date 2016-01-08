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
	$("document").ready(
			function() {
	$("#monthreports").click(function()
	{
	
		 $("#remove").remove();
        
		var empId = $( "#id" ).val();
		var day1=$("#month").val();
	
		
		if($( "#select" ).val()=="single" && empId!="" && day1!="")
		{
		var request = $.ajax({
		  url: "<%=request.getContextPath()%>/AttendanceMonth",
		  method: "POST",
		  data: { id : empId,month:day1},
		  dataType: "json"
		});
		 
		request.done(function( data ) {
			
                var len = data.length;
                var txt = "";
                if(len > 0){
                	$( "#print" ).show();
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
			var request = $.ajax({
				  url: "<%=request.getContextPath()%>/AttendanceSrv",
				  method: "GET",
				  data: { month :day1},
				  dataType: "json"
				});
				 
				request.done(function(data) {
					
					 var len = data.length;
		                var txt = "";
		                if(len > 0){
		                	$( "#print" ).show();
		                	$("#tbody").show();
		                	$( "#res" ).hide();
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
						$( "#print" ).hide();
						$( "#res" ).show();
						document.getElementById("res").innerHTML="NO MATCHES FOUND";
					}
				});
				 
				request.fail(function( jqXHR, textStatus ) {
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
		</select>&nbsp;&nbsp;&nbsp; <input type="text" id="id" placeholder="enter id">&nbsp;&nbsp;
		Month: <input type="month" id="month">&nbsp;&nbsp;
		<button class="btn btn-primary" id="monthreports">submit</button>
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
		<font color="red"><p aling="center" id="res"></p></font> <br /> <br />
		<button id="print" class='btn btn-primary'
			onclick="PrintDiv('printdiv')">print</button>
	</div>
</body>
</html>