	
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
		
		$("#table").hide();
		 $("#table1").hide();
		 
		$("#company_work_hours").text(0);
		$("#emp_work_hours").text(0);
		
		$("#print").click(function(){
			
			   var divToPrint=document.getElementById("printdiv");
			   newWin= window.open("");
			   newWin.document.write(divToPrint.outerHTML);
			   newWin.print();
			   newWin.close();
			});
		
		$("#accordion").accordion();
	
		$("#datepicker").datepicker();
		
		$("#print").hide();
		$("#title").hide();
		$("#Employee_Details").hide();
		 
		   var ref=0;
		$( "#fixed1" ).click(function() {
			if(ref==0)
				{
		  $( ".abtlikebox" ).animate({ right: "+0px" }, 200);
				ref=1;
				}
			else
					{
				$( ".abtlikebox" ).animate({ right: "-268px" }, 200);
				       ref=0;
					}
		});
		
	});