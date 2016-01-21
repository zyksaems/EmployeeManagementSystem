$(function() {
	$("#monthreports").click(function()
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
		var day1=$("#month").val();
		$("#emp_id").text(empId);
		
		if($( "#select" ).val()=="single" && empId!="" && day1!="")
		{
			var request = $.ajax({
		  url: "/EmployeeManagementSystemNew/getEmployeeReportForMonthByIdAndMonth.do",
		  method: "POST",
		  data: { employeeId : empId,month:day1},
		  dataType: "json"
		});
		 
		request.done(function( data ) {
			
			console.log("Data in monthly productivity:"+JSON.stringify(data));
			
			var data1=data;
			var data=data.monthlyWorkingDetails;
			
			var empName=data1.employeeName;
			var empDesignation=data1.employeeDesignation;
			console.log("Emp Name:"+empName);
			console.log("Emp Designation:"+empDesignation);
			
			$("#emp_name").text(empName);
            
            $("#emp_designation").text(empDesignation);
			
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
				 $("#res").text("NO MATCHES FOUND");
			}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
			$( "#res" ).show();
			$("#res").text("Error occured due to some internal problem.please try again.");
		});
	}
		else if($( "#select" ).val()=="all" && day1!="")
			{
				var request = $.ajax({
				  url: "/EmployeeManagementSystemNew/getAllEmployeeReportForMonthByMonth.do",
				  method: "POST",
				  data: { month :day1},
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
			                        	
			                    		var endTime=(data[i].endTime == undefined)?"still working":data[i].endTime;
			                    	
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
					$("#res").text("Error occured due to some internal problem.please try again.");

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