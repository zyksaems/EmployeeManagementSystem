$(function() {
	
	$("#accordion").accordion({
		 active: 1
	});
	
	var x=0;
	var tableclear=null;
	
	 var employeeLeaveStatus = 0 ;
	 var employeeAbsentStatus = 2 ;
	 var employeePresentStatus = 1 ;
	 
	 var employeeLeave_msg=" on Leave";
     var employeeAbsent_msg=" Absent";
	    
	//Start of Daily Generate Reports functionality code
	$("#dayreports").click(function()
	{
		var empId = $( "#id" ).val();
		 $("#table").hide();
		 $( "#page_div" ).show();
		 $("#back_div").show();
		 $("#table1").hide();
		 $( "#print" ).hide();
		 $("#back").hide();
		 $("#title").hide();
		 $("#Employee_Details").hide();
		 $( "#res" ).hide();
		$("#company_work_hours").text(0);
		$("#emp_work_hours").text(0);	
		 $("#remove").remove();
		var day1=$("#datepicker").val();
		var newday=new Date(day1);
		var newdayMilli=newday.getTime();
	    console.log("emp id: "+empId+"    dtae: "+newday);
	    
	    $("#emp_id").text(empId);
	  
	    if( !validateEmployeeId(empId) && $("#select").val()=="single"){
	    	$("#back_div").hide();
			$("#res").text("Invalid Employee ID");
			$( "#res" ).show();
			console.log("break statement executing ");
			
         }
	  //Result search for single employee in Daily generate report page
	    else if($( "#select" ).val()=="single" && empId!="" && day1!="")
		{
	    	$( "#page_div" ).hide();
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
                var empName=data.empName;
                var empDesignation=data.empDesignation;
                
                console.log("Emp Name:"+empName);
                console.log("Emp Designation:"+empDesignation);
                
                $("#emp_name").text(empName);
                
                $("#emp_designation").text(empDesignation);
                
                console.log("data length: "+len);
                var txt = "";
                if(len > 0){
                	$("#table1").show();
       			   $("#title").show();
         		   $("#Employee_Details").show();
       			 	
                	var report= data.employeeReport[0];
                	var endTime=(report.endTime == undefined)?"Not Logged Out":report.endTime.substr(12,23);
                	$( "#print" ).show();
                	$("#back").show();
                	$("#tbody").show();
                	txt+="<tbody id='remove'>"
                           if(report.dayIndicator == employeePresentStatus )
                                txt += "<tr><td>"+report.attendanceDate+"</td><td>"+report.startTime.substr(12,23)+"</td><td>"+endTime+"</td><td>"+report.workingHours+"</td></tr>";
                           else if(report.dayIndicator == employeeAbsentStatus)
                        	   txt += "<tr><td>"+report.attendanceDate+"</td><td>"+employeeAbsent_msg +"</td><td>"+employeeAbsent_msg +"</td><td>"+employeeAbsent_msg +"</td></tr>";
                           else
                        	   txt += "<tr><td>"+report.attendanceDate+"</td><td>"+employeeLeave_msg  +"</td><td>"+employeeLeave_msg  +"</td><td>"+employeeLeave_msg  +"</td></tr>";
                	
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
				$("#back_div").hide();
				$( "#res" ).show();
					$("#res").text("NO MATCHES FOUND");
			}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
			$("#back_div").hide();
			$( "#res" ).show();
			$("#res").text("Error occured Please try again.");
		});
	}//End of Single
		//Result search for All employee in Daily generate report page
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
					var dataSet=[];
					var companyproduct=0;
					var empproduct=0;
					console.log("Response come from  getAllEmployeesReportByDate() method "+JSON.stringify(data));
					
					 var len = data.length;
		                var txt = "";
		                if(len > 0){
		                	if(x!=0)
			            	{
		        	  
			            tableclear.clear().draw();
				             }
			              dataSet=new Array(len);
		                	
		                	$("#table").show();
		                	$("#title").show();
		                	$( "#print" ).show();
		                	$("#back").show();
		                	 $( "#page_div" ).show();
		                    for(var i=0;i<len;i++){
		                    	var endTime=(data[i].endTime == undefined)?"Not Logged Out":data[i].endTime.substr(12,23);
		                    	
		                          /*  txt += "<tr><td>"+data[i].employeeId+"</td><td>"+data[i].attendanceDate+"</td><td>"+data[i].startTime.substr(12,23)+"</td><td>"+endTime+"</td><td>"+data[i].workingHours+"</td><td>"+data[i].dayIndicator+"</td></tr>";*/
		                          
		                    	dataSet[i]=new Array(5);
		                    	
		                    	dataSet[i][0]=data[i].employeeId;
		                    	dataSet[i][1]=data[i].attendanceDate;
		                    	if(data[i].dayIndicator == employeePresentStatus ){
		                    		dataSet[i][2]=data[i].startTime.substr(12,23);
			                    	dataSet[i][3]=endTime;
			                    	dataSet[i][4]=convertWorkingHours(data[i].workingHours); // This function is in ConverWorkingHours.js file
		                    	}
		                    	else if(data[i].dayIndicator == employeeAbsentStatus ){
		                    		dataSet[i][2]= employeeAbsent_msg ;
			                    	dataSet[i][3]=employeeAbsent_msg ;
			                    	dataSet[i][4]=employeeAbsent_msg ;
		                    	}
		                    	else{
		                    		dataSet[i][2]= employeeLeave_msg  ;
			                    	dataSet[i][3]=employeeLeave_msg  ;
			                    	dataSet[i][4]=employeeLeave_msg  ;
		                    	}
		                    	
		                    	companyproduct=companyproduct+9;
		                            empproduct=empproduct+data[i].workingHours;
		                    }
		                	
		                    $("#company_work_hours").text(companyproduct);
		                	$("#emp_work_hours").text(empproduct);
		                	
		                	 if(x==0)
		                    	{
		                 	tableclear=$('#table').DataTable( {
		               	        data: dataSet,
		               	     "lengthMenu": [[5,10, 25, 50,100, -1], [5,10, 25, 50,100, "All"]],
		               	        columns: [
                             
		               	            { title: "empId"},
		               	            { title: "Date","orderable": false },
		               	            { title: "StartTime" },
		               	            { title: "EndTime" },
		               	            { title: "Worked Hours(H:M)" }
		               	           
		                         ]
		               	    } );
		                    	}
		                    else{
		                    
		                    	tableclear.rows.add(dataSet).draw();
		                    }
		                   
		                   x= x+1;
		                }
					else{
						$("#back_div").hide();
						$( "#res" ).show();
						
						 $("#res").text("NO MATCHES FOUND");
					}
				});
				 
				request.fail(function( jqXHR, textStatus ) {
					$("#back_div").hide();
					$( "#res" ).show();
					$("#res").text("Error occured Please try again.");

				});
			}
		else{
			$("#back_div").hide();
			$( "#res" ).show();
			$("#res").text("field should not be empty.");
		}
	});//End of Daily Generate Reports functionality 
	
});
//disable and enable of Employee id field
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
	
	
