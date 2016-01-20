$(function() {
	
	$("#dayreports").click(function()
	{

		 $("#table").hide();
		 $("#table1").hide();
		 $( "#print" ).hide();
		$("#title").hide();
		$("#Employee_Details").hide();
		$( "#res" ).hide();
		
		$("#company_work_hours").text(0);
		$("#emp_work_hours").text(0);
		
		 $("#remove").remove();
        
		var empId = $( "#id" ).val();
		var day1=$("#datepicker").val();
		var newday=new Date(day1);
		var newdayMilli=newday.getTime();
	    console.log("emp id: "+empId+"    dtae: "+newday);
	    
	    $("#emp_id").text(empId);
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
			var companyproduct=0;
			var empproduct=0;
			
			console.log("response : "+data);
			   console.log("response for  getReportByIdAndDate"+JSON.stringify(data));
                var len = data.employeeReport.length;
                
                console.log("data length: "+len);
                var txt = "";
                if(len > 0){
                	$("#table1").show();
       			   $("#title").show();
         		   $("#Employee_Details").show();
       			 	
                	var report= data.employeeReport[0];
                	var endTime=(report.endTime == undefined)?"Not Logged Out":report.endTime;
                	$( "#print" ).show();
                	$("#tbody").show();
                	txt+="<tbody id='remove'>"
                        
                            txt += "<tr><td>"+report.attendanceDate+"</td><td>"+report.startTime+"</td><td>"+endTime+"</td><td>"+report.workingHours+"</td><td>"+report.dayIndicator+"</td></tr>";
                            companyproduct=companyproduct+9;
                            empproduct=empproduct+report.workingHours;
                	txt+="</tbody>";
                    if(txt != ""){
                        $("#table1").append(txt);
                    }
                    $("#company_work_hours").text(companyproduct);
                	$("#emp_work_hours").text(empproduct);
                }
			else{
				$( "#res" ).show();
					$("#res").text("NO MATCHES FOUND");
			}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
			$( "#res" ).show();
			$("#res").text("Error occured Please try again.");
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
					
					var companyproduct=0;
					var empproduct=0;
					console.log("Response come from  getAllEmployeesReportByDate() method "+JSON.stringify(data));
					
					 var len = data.length;
		                var txt = "";
		                if(len > 0){
		                	$("#table").show();
		                	$("#title").show();
		                	$( "#print" ).show();
		                	$("#tbody").show();
		                	txt+="<tbody id='remove'>"
		                    for(var i=0;i<len;i++){
		                    	var endTime=(data[i].endTime == undefined)?"Not Logged Out":data[i].endTime;
		                    	
		                            txt += "<tr><td>"+data[i].employeeId+"</td><td>"+data[i].attendanceDate+"</td><td>"+data[i].startTime+"</td><td>"+endTime+"</td><td>"+data[i].workingHours+"</td><td>"+data[i].dayIndicator+"</td></tr>";
		                            companyproduct=companyproduct+9;
		                            empproduct=empproduct+data[i].workingHours;
		                    }
		                	txt+="</tbody>";
		                    if(txt != ""){
		                        $("#table").append(txt);
		                    }
		                    $("#company_work_hours").text(companyproduct);
		                	$("#emp_work_hours").text(empproduct);
		                }
					else{
						$( "#res" ).show();
						
						 $("#res").text("NO MATCHES FOUND");
					}
				});
				 
				request.fail(function( jqXHR, textStatus ) {
					$( "#res" ).show();
					$("#res").text("Error occured Please try again.");

				});
			}
		else{
			$( "#res" ).show();
			$("#res").text("field should not be empty.");
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