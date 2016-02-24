 $(function() {
	 var x=0;
	 var x1=0;
		var tableclear=null;
		var tableclear1=null;
	//Start of Weekly Generate Reports functionality code
	$("#weekreports").click(function()
	{
		 $("#table").hide();
		 $("#table1").hide();
		 
		 $("#table_pag_div").hide();
		 $("#table1_pag_div").hide();
		 
		 $( "#print" ).hide();
		 $("#back_div").show();
		 $("#back").hide();
		$("#title").hide();
		$("#Employee_Details").hide();
		$( "#res" ).hide();
		
		$("#company_work_hours").text(0);
		$("#emp_work_hours").text(0);
		 $("#remove").remove();
        
		var empId = $( "#id" ).val();
		var day1=$("#week").val();
		$("#emp_id").text(empId);
		
		 if( !validateEmployeeId(empId) && $("#select").val()=="single"){
			         $("#back_div").hide();
				$("#res").text("Invalid Employee ID");
				$( "#res" ).show();
				console.log("break statement executing ");
				
	         }
		//Result search by single employee id
		 else if($( "#select" ).val()=="single" && empId!="" && day1!="")
		 {
			var request = $.ajax({
		  url: "/EmployeeManagementSystemNew/getEmployeeReportForWeekByIdAndWeekDate.do",
		  method: "POST",
		  data: { employeeId : empId,weekDate:day1},
		  dataType: "json"
		});
		 
		request.done(function( data ) {
			var dataSet=[];
			var data1=data;
			var data=data.weeklyWorkingDetails;
			
			var empName=data1.employeeName;
			var empDesignation=data1.employeeDesignation;
			console.log("Emp Name:"+empName);
			console.log("Emp Designation:"+empDesignation);
			
			$("#emp_name").text(empName);
            
            $("#emp_designation").text(empDesignation);
			
			var companyproduct=0;
			var empproduct=0;
                var len = data.length;
               
                if(len > 0){
                	if(x!=0)
	            	{
        	  
	            tableclear.clear().draw();
		             }
	              dataSet=new Array(len);
                	
                	$("#title").show();
            		$("#Employee_Details").show();
            		$("#table1_pag_div").show();
                	$("#table1").show();
                	$( "#print" ).show();
                	$("#back").show();
                	
                    for(var i=0;i<len;i++){
                        
                    	var endTime=(data[i].endTime == undefined)?"Not Logged Out":data[i].endTime.substr(12,23);
                    	
                    	dataSet[i]=new Array(5);
                    	dataSet[i][0]=data[i].attendanceDate;
                    	dataSet[i][1]=data[i].startTime.substr(12,23);
                    	dataSet[i][2]=endTime;
                    	dataSet[i][3]=data[i].workingHours;
                    	dataSet[i][4]=data[i].dayIndicator;
                    	
                            companyproduct=companyproduct+9;
                            empproduct=empproduct+data[i].workingHours;
                    }
                	
                    $("#company_work_hours").text(companyproduct);
                	$("#emp_work_hours").text(empproduct);
                	
                	if(x==0)
                	{
             	tableclear=$('#table1').DataTable( {
           	        data: dataSet,
           	     "lengthMenu": [[5, -1], [5, "All"]],
           	        columns: [
            
           	            { title: "Date" },
           	            { title: "StartTime" },
           	            { title: "EndTime" },
           	            { title: "WorkHours","orderable": false },
           	            { title: "DayIndicator","orderable": false  }
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
				document.getElementById("res").innerHTML="NO MATCHES FOUND";
			}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
			$("#back_div").hide();
			$( "#res" ).show();
			document.getElementById("res").innerHTML="Error occured due to some internal problem.please try again.";
		});
	}//End of single search
			//Result search for all Employees in weekly generate report page
		else if($( "#select" ).val()=="all" && day1!="")
			{
				var request = $.ajax({
				  url: "/EmployeeManagementSystemNew/getAllEmployeeReportForWeekByWeekDate.do",
				  method: "POST",
				  data: {weekDate :day1},
				  dataType: "json"
				});
				request.done(function(data) {
					var dataSet=[];
					
					var companyproduct=0;
					var empproduct=0;
					 var len = data.length;
		               
		                if(len > 0){
		                	if(x1!=0)
        	            	{
    	        	  
        	            tableclear1.clear().draw();
        		             }
        	              dataSet=new Array(len);
		                	
		                	$("#title").show();
		                	$("#table_pag_div").show();
		                	$("#table").show();
		                	$( "#print" ).show();
		                	$("#back").show();
		                	
		                    for(var i=0;i<len;i++){
		                        
		                    	var endTime=(data[i].endTime == undefined)?"Not Logged Out":data[i].endTime.substr(12,23);
		                    	
		                    	dataSet[i]=new Array(6);
		                    	
		                    	dataSet[i][0]=data[i].employeeId;
		                    	dataSet[i][1]=data[i].attendanceDate;
		                    	dataSet[i][2]=data[i].startTime.substr(12,23);
		                    	dataSet[i][3]=endTime;
		                    	dataSet[i][4]=data[i].workingHours;
		                    	dataSet[i][5]=data[i].dayIndicator;
		                    	
		                            companyproduct=companyproduct+9;
		                            empproduct=empproduct+data[i].workingHours;
		                    }
		                	
		                    $("#company_work_hours").text(companyproduct);
		                	$("#emp_work_hours").text(empproduct);
		                	
		                	 if(x1==0)
		                    	{
		                 	tableclear1=$('#table').DataTable( {
		               	        data: dataSet,
		               	     "lengthMenu": [[5,10, 25, 50,100, -1], [5,10, 25, 50,100, "All"]],
		               	        columns: [
                             
		               	            { title: "empId"},
		               	            { title: "Date" },
		               	            { title: "StartTime" },
		               	            { title: "EndTime" },
		               	            { title: "WorkHours","orderable": false },
		               	            { title: "DayIndicator","orderable": false  }
		                         ]
		               	    } );
		                    	}
		                    else{
		                    
		                    	tableclear1.rows.add(dataSet).draw();
		                    }
		                   
		                   x1= x1+1;
		                  
	                }
				else{
					$("#back_div").hide();
						$( "#res" ).show();
						document.getElementById("res").innerHTML="NO MATCHES FOUND";
					}
				});
				 
				request.fail(function( jqXHR, textStatus ) {
					$("#back_div").hide();
					$( "#res" ).show();
					document.getElementById("res").innerHTML="Error occured Please try again.";

				});
			}
		else{
			$("#back_div").hide();
			$( "#res" ).show();
			document.getElementById("res").innerHTML="field should not be empty.";
		}//END of Weekly Generate Reports functionality
	});
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
