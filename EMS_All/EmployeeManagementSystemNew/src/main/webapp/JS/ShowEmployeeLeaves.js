$("document").ready(
			function() {
				$("#accordion").accordion({
					 active: 1
				});
                var allleave=0;
              /*  var monthleave=0;*/
				$("#res").hide();
				$("#month_leave_div").hide();
				$("#month_leave_table").hide();
				$("#all_leave_table").hide();
				$("#all_leave_title").hide();
				
				var applicationName="EmployeeManagementSystemNew";
	        	
	        	var getLeaveCount="getLoggedEmployeeLeaveCount.do";
				
				getLoggedEmployeeLeaveCount();
                function getLoggedEmployeeLeaveCount(){
					
					$.post("/"+applicationName+"/"+getLeaveCount, function( data ) {
						console.log(data.length);
						//var leaveObj=JSON.stringify(data);
						console.log(data[1]);
						console.log(data[0]);
						console.log(data[2]);
						
						   $("#Nonwork_days_count").text(data[0]);
						   $("#absebts_count").text(data[1]);
						   $("#leaves_count").text(data[2]);
						},"json");
				}

                $("#month_leave_button").click(function(){
                	
                	$("#res").hide();
                	$("#month_leave_div").show();
                	$("#month_leaves_input").val("");
                	$("#month_leave_table").hide();
                	$("#all_leave_table").hide();
                	$("#all_leave_title").hide();
                });
                
                $("#all_leave_button").click(function(){
                	
                	$("#res").hide();
                	 $("#month_leave_div").hide();
                  	$("#month_leave_table").hide();
                 
                	if(allleave==0)
                		{
                	 var request = $.ajax({
           			  url: "/EmployeeManagementSystemNew/getLoggedEmployeeAlleaveDates.do",
           			  method: "POST",
           			  dataType: "json"
           			});
           			 
           			request.done(function(data) {
           				
           				allEmployeeDetais=data;
           			     console.log(data);
           				 var len = data.length;
           				 
           				 console.log(len);
           	                var txt = "";
           	                
           	                if(len > 0){
           	                	$("#all_leave_title").show();
           	              	$("#all_leave_table").show();
           	                    for(var i=0;i<len;i++){
           	                    	 
           	                        
           	                         txt += " <tr><td>"+i+"</td><td>" +data[i][0]+"</td><td>"+data[i][1]+"</td></tr>";
           	                            
           	                    }
           	                    if(txt != ""){
           	                        $("#all_leave_table").append("<tbody id='tablebody'>"+txt+"</tbody");
           	                    }
                             
           	              	  
                         	allleave=allleave+1;
           	                }
           				else{
           					$("#all_leave_table").hide();
           					$("#res").show();
           					document.getElementById("res").innerHTML="NO MATCH FOUND";
           				
           				}
           			});
           			 
           			request.fail(function( jqXHR, textStatus ) {
           				$("#all_leave_table").hide();
           				$("#res").show();
           				document.getElementById("res").innerHTML="INTERNAL PROBLEM PLEASE TRY AGAIN.";
           			});
                		}
                	else{
                		$("#all_leave_title").show();
                		$("#all_leave_table").show();
                	}
                });//ALL DATE Closed
                
                
                // Month Leave Date Start
                $("#month_leave_submit").click(function(){
               	        $("#removeBody").remove();
                	$("#res").hide();
                	$("#all_leave_table").hide();
                	var month=$("#month_leaves_input").val();
                	if(month!="")
            		{
            	 var request = $.ajax({
       			  url: "/EmployeeManagementSystemNew/getLoggedEmployeeMonthleaveDates.do",
       			  method: "POST",
       			 data: {month:month},
       			  dataType: "json"
       			});
       			 
       			request.done(function(data) {
       				
       				allEmployeeDetais=data;
       			     console.log(data);
       				 var len = data.length;
       				 
       				 console.log(len);
       	                var txt = "";
       	                
       	                if(len > 0){
       	                	$("#month_leave_table").show();
       	                    for(var i=0;i<len;i++){
       	                    	 
       	                        
       	                         txt += " <tr><td>"+i+"</td><td>" +data[i][0]+"</td><td>"+data[i][1]+"</td></tr>";
       	                            
       	                    }
       	                    if(txt != ""){
       	                        $("#month_leave_table").append("<tbody id='removeBody'>"+txt+"</tbody");
       	                    }
                         
       	              	  
       	               /*  monthleave=monthleave+1;*/
       	                }
       				else{
       					$("#month_leave_table").hide();
       					$("#res").show();
       					document.getElementById("res").innerHTML="NO MATCH FOUND";
       				
       				}
       			});
       			 
       			request.fail(function( jqXHR, textStatus ) {
       				$("#month_leave_table").hide();
       				$("#res").show();
       				document.getElementById("res").innerHTML="INTERNAL PROBLEM PLEASE TRY AGAIN.";
       			});
            		}
            	else{
            		$("#res").show();
       				document.getElementById("res").innerHTML="Month Field is Required.";
            	}
                	
                });
                
                
			});