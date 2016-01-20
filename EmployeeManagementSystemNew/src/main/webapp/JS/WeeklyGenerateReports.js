 $(function() {
	$("#weekreports").click(function()
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
		var day1=$("#week").val();
		$("#emp_id").text(empId);
		if($( "#select" ).val()=="single" && empId!="" && day1!="")
		{
			var request = $.ajax({
		  url: "/EmployeeManagementSystemNew/getEmployeeReportForWeekByIdAndWeekDate.do",
		  method: "POST",
		  data: { employeeId : empId,weekDate:day1},
		  dataType: "json"
		});
		 
		request.done(function( data ) {
			var companyproduct=0;
			var empproduct=0;
                var len = data.length;
                var txt = "";
                if(len > 0){
                	
                	$("#title").show();
            		$("#Employee_Details").show();
                	$("#table1").show();
                	$( "#print" ).show();
                	$("#tbody").show();
                	txt+="<tbody id='remove'>"
                    for(var i=0;i<len;i++){
                        
                    	var endTime=(data[i].endTime == undefined)?"Not Logged Out":data[i].endTime;
                    	
                            txt += "<tr><td>"+data[i].attendanceDate+"</td><td>"+data[i].startTime+"</td><td>"+endTime+"</td><td>"+data[i].workingHours+"</td><td>"+data[i].dayIndicator+"</td></tr>";
                            companyproduct=companyproduct+9;
                            empproduct=empproduct+data[i].workingHours;
                    }
                	txt+="</tbody>";
                    if(txt != ""){
                        $("#table1").append(txt);
                    }
                    $("#company_work_hours").text(companyproduct);
                	$("#emp_work_hours").text(empproduct);
                }
			else{
				$( "#res" ).show();
				document.getElementById("res").innerHTML="NO MATCHES FOUND";
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
				  url: "/EmployeeManagementSystemNew/getAllEmployeeReportForWeekByWeekDate.do",
				  method: "POST",
				  data: {weekDate :day1},
				  dataType: "json"
				});
				 
				request.done(function(data) {
					
					var companyproduct=0;
					var empproduct=0;
					 var len = data.length;
		                var txt = "";
		                if(len > 0){
		                	$("#title").show();
		                	$("#table").show();
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
						document.getElementById("res").innerHTML="NO MATCHES FOUND";
					}
				});
				 
				request.fail(function( jqXHR, textStatus ) {
					$( "#res" ).show();
					document.getElementById("res").innerHTML="Error occured Please try again.";

				});
			}
		else{
			$( "#res" ).show();
			document.getElementById("res").innerHTML="field should not be empty.";
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
