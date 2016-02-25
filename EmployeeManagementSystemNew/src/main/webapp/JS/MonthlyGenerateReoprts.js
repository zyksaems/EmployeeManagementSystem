$(function() {
	
	$("#accordion").accordion({
		 active: 1
	});

	var x=0;
	var x1=0;
	var tableclear=null;
	var tableclear1=null;
	//Start of Monthly Generate Reports functionality code
	$("#monthreports").click(function()
	{	
		$("#back_div").show();
		 $("#table").hide();
		 
		 $("#table_pag_div").hide();
		 $("#table1_pag_div").hide();
		 
		 $("#table1").hide();
		 $( "#print" ).hide();
		$("#title").hide();
		$("#Employee_Details").hide();
		$( "#res" ).hide();
		$("#back").hide();
		$("#company_work_hours").text(0);
		$("#emp_work_hours").text(0);
		 $("#remove").remove();
		var empId = $( "#id" ).val();
		var day1=$("#month").val();
		$("#emp_id").text(empId);
		 if( !validateEmployeeId(empId) && $("#select").val()=="single"){
			        $("#back_div").hide();
				$("#res").text("Invalid Employee ID");
				$( "#res" ).show();
				console.log("break statement executing ");
	     }
		//Result search for single employee in Monthly generate report page
		else if($( "#select" ).val()=="single" && empId!="" && day1!="")
		{
			var request = $.ajax({
		  url: "/EmployeeManagementSystemNew/getEmployeeReportForMonthByIdAndMonth.do",
		  method: "POST",
		  data: { employeeId : empId,month:day1},
		  dataType: "json"
		});
		 
		request.done(function( data ) {
			
			console.log("Data in monthly productivity:"+JSON.stringify(data));
			var dataSet=[];
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
                        	
                               /* txt += "<tr><td>"+data[i].attendanceDate+"</td><td>"+data[i].startTime.substr(12,23)+"</td><td>"+endTime+"</td><td>"+data[i].workingHours+"</td><td>"+data[i].dayIndicator+"</td></tr>";*/
                                
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
	               	     "lengthMenu": [[5,10, 25, 50,100, -1], [5,10, 25, 50,100, "All"]],
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
				 $("#res").text("NO MATCHES FOUND");
			}
		});
		 
		request.fail(function( jqXHR, textStatus ) {
			$("#back_div").hide();
			$( "#res" ).show();
			$("#res").text("Error occured due to some internal problem.please try again.");
		});
	}//End of single
			//Result search for all employee in monthly generate page
		else if($( "#select" ).val()=="all" && day1!="")
			{
				var request = $.ajax({
				  url: "/EmployeeManagementSystemNew/getAllEmployeeReportForMonthByMonth.do",
				  method: "POST",
				  data: { month :day1},
				  dataType: "json"
				});
				 
				request.done(function(data) {
					
					var dataSet=[];
					console.log(JSON.stringify(data));
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
		                	$("#table").show();
		                	 $("#table_pag_div").show();
		                	$( "#print" ).show();
		                	$("#back").show();
		                	
		                	
			                    for(var i=0;i<len;i++){
			                      	
			         	var endTime=(data[i].endTime == undefined)?"Not Logged Out":data[i].endTime.substr(12,23);
			                    	
			             /* txt += "<tr><td>"+data[i].employeeId+"</td><td>"+data[i].attendanceDate+"</td><td>"+data[i].startTime.substr(12,23)+"</td><td>"+endTime+"</td><td>"+data[i].workingHours+"</td><td>"+data[i].dayIndicator+"</td></tr>";*/
			                          
			   /* dataSet.push(data[i].employeeId+"",data[i].attendanceDate+"",data[i].startTime.substr(12,23)+"",data[i].endTime+"",data[i].workingHours+"",data[i].dayIndicator+"");*/
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
					
						 $("#res").text("NO MATCHES FOUND");
					}
				});
				 
				request.fail(function( jqXHR, textStatus ) {
					$("#back_div").hide();
					$( "#res" ).show();
					$("#res").text("Error occured due to some internal problem.please try again.");

				});
			}//End of all
		else{
			$("#back_div").hide();
			$( "#res" ).show();
			$("#res").text("field should not be empty.");
		}//End of Monthly Generate Reports functionality 
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