    
    var todayAttendanceDetails;
	var activePoints=[];
	var  todayDateString=(""+new Date()+"").substr(4,12);
	console.log("date string: "+todayDateString);
	/*creating variables to store division id's */
	var  pieChartDiv="#pie-holder";
	
	var showTableDetails='#showTableDetails';
	var backButton_one_id="#show-piechart-back-button";
	var backButton_two_id="#show-piechart-back-button2";
	
	
	
	/*variable to store mouse event of pie chart*/
	var pieMouseEvent;
	
	var myPieChart ;
	
	var clickOnPieChart="#clickOnPieChart";
		
	/*var dailyAttendance_link_id="#daily-attendance-div";*/
	
	
	
	
	/*first display showChart division as default division*/
	/*function call to hide remaining divisions*/
	
	function clickPieChart(event){
		  console.log("chart -- pie chart clicked and event: "+event);
		  pieMouseEvent=event;
		  $("#remove").remove();
			console.log("Inside onClickOnPieChart () function");
			 
			   var activePoints = myPieChart.getSegmentsAtEvent(pieMouseEvent);
			  
						   console.log("new points......1 "+activePoints[0].value);
						   console.log("new points......1 "+activePoints[0].label);
						
						
						   console.log("new points......2 "+activePoints[0].value);
						   console.log("new points......2 "+activePoints[0].label);
						
					
						var presentiesList=todayAttendanceDetails.presentiesList;
						var empDetails= todayAttendanceDetails.employeeDetails;
						
						var todayAttendancePieDetails=[];
						var allAbsentEmpData=[];
						var empId;
						var foundIndex;
						var presetiesIndexList=[];
						for(var i=0;i<presentiesList.length;i++) {
							empId=presentiesList[i].employeeId;
						   for(var j=0;j<empDetails.length;j++){
								
								
								if(empDetails[j].employeeId==empId){
									console.log("found at index : "+j);
									foundIndex=j;
									presetiesIndexList.push(j);
									
								}
						   }
							console.log("Index after search:="+foundIndex);
							console.log("employee details: new ="+ empDetails[foundIndex].firstName);
							if(presentiesList[i].endTime==undefined){
								presentiesList[i].endTime="still working";
							}
							var detailsObject= { employee_id: empDetails[foundIndex].employeeId, 
									           first_name: empDetails[foundIndex].firstName, 
									           last_name : empDetails[foundIndex].lastName,
									           In_time : presentiesList[i].startTime ,
									           Out_time :presentiesList[i].endTime,
									           workingHours:presentiesList[i].workingHours
									           };
							todayAttendancePieDetails.push(detailsObject);
							
						}
					    var numberOfAbsentiesForPie=todayAttendanceDetails.totalEmployees- todayAttendanceDetails.noOfPresenties;

						for(var k=0;k<empDetails.length;k++){
							var count=0;
							for(var l=0;l<presetiesIndexList.length;l++){
							
								if(presetiesIndexList[l]==k){
									count=1;
									
							}
								
							}
							if(count == 0){
								
								var absentEmpData={
										 employee_id: empDetails[k].employeeId,
										first_name:empDetails[k].firstName,
										last_name : empDetails[k].lastName
										};
								allAbsentEmpData.push(absentEmpData);
							}
							
						}
						
				   /*	printing absents list on console*/
						
						function makeListOfAbsentEmp(j){
						 
							 
							var absentEmpData={
									 employee_id: empDetails[j].employeeId,
									first_name:empDetails[j].firstName,
									last_name : empDetails[j].lastName
									};
							console.log("absent data prepared: "+absentEmpData);
							allAbsentEmpData.push(absentEmpData);
							
						}
							   
					    	        if(activePoints[0].label=='Present'){
					    	        	
					    	        	console.log("selected label   present");
					    	        	
					    	        	$("#listName") .text("Employees Present on "+todayDateString);
					    	        	
					    	        	 $("#showAbsentDetails").hide();
					    	        	
					    	        	$(pieChartDiv).hide() ;
					    				 $("#pieLegend").hide();
					    				 $(showTableDetails).show();

					    				 var len = todayAttendancePieDetails.length;
					    	                var txt = "";
					    	                if(len > 0){
					    	              
					    	                 txt+="<tbody id='remove'>"
					    	                    for(var i=0;i<len;i++){
					    	                        
					    	                            txt += "<tr><td>"+todayAttendancePieDetails[i].employee_id+"</td><td>"+todayAttendancePieDetails[i].first_name+"</td><td>"+todayAttendancePieDetails[i].last_name+"</td><td>"+todayAttendancePieDetails[i].In_time+"</td><td>"+todayAttendancePieDetails[i].Out_time+"</td><td>"+todayAttendancePieDetails[i].workingHours+"</td></tr>";
					    	                        
					    	                    }
					    	                 txt+="</tbody>";
					    	                    if(txt != ""){
					    	                        $("#daily-present-table").append(txt);
					    	                    }
					    	                }
					   		
					   			    }
					   			    if(activePoints[0].label=='Absent'){
					   			    	
					   			    	console.log("selected lable absent");	
					   			    	
					   			     $("#pie-holder").hide();
					   				$("#pieLegend").hide();
					   				

					   			    	$(showTableDetails).hide();
					    				 
					    				 $("#showAbsentDetails").show();
					    				 
					    				 $("#listName1") .text("Employees Absent on "+todayDateString);
					    				 
					    				  var len = allAbsentEmpData.length;
					    	                var txt = "";
					    	                if(len > 0){
					    	              
					    	                 txt+="<tbody id='remove'>"
					    	                    for(var i=0;i<len;i++){
					    	                    	
					    	                        if(allAbsentEmpData[i]!=undefined){
					    	                            txt += "<tr><td>"+allAbsentEmpData[i].employee_id+"</td><td>"+allAbsentEmpData[i].first_name+"</td><td>"+allAbsentEmpData[i].last_name+"</td></tr>";
					    	                        }
					    	                    }
					    	                 txt+="</tbody>";
					    	                    if(txt != ""){
					    	                        $("#daily-absent-table").append(txt);
					    	                    }
					    	                }
					   			    	
					   			    }		
	} // END -- clickPieChart() 
	
$("document").ready(function(){
	
	
	var dailyAttendance_legend_id="#daily-attendance-legend-div";
	var todayAttendanceHeading_id="#today-attendance-heading";
	var todayAttendanceInfoDetails_id="#today-attendance-info-detils";
	
	console.log("called set default values function");
	displayTodayAttendance();
	
	
	/*	for display pie chart  for daily attendance*/
   function displayTodayAttendance() {
			
	$(showTableDetails).hide();
	$(dailyAttendance_legend_id).show();
	
	$(todayAttendanceHeading_id).text("Attendance Date: "+todayDateString);
	
	console.log("in displayTodayAttendance()");
	 $("#showAbsentDetails").hide();		 
	 
		
		var todayAttendance;
		var numberOfPresentiesForPie;
		var numberOfAbsentiesForPie;
		console.log("going to get data");
		
		/*make AJAX call to get data*/
		$.ajax({
            url:"/EmployeeManagementSystemNew/getTodayReport.do",
            type: 'GET',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data)
            {
			    console.log("reply from get today attendance: "+ JSON.stringify(data));
			    $("#pieLegend").text(" ");
    		    todayAttendanceDetails=todayAttendance= data;
    		    
    		    console.log("presenties: "+data.noOfPresenties);
    		    
    		    numberOfPresentiesForPie=todayAttendance.noOfPresenties;
    		    console.log("presenties in  pie: "+numberOfPresentiesForPie);
    		    numberOfAbsentiesForPie=todayAttendance.totalEmployees- numberOfPresentiesForPie;
    		    console.log("absenties for pie: "+numberOfAbsentiesForPie);
    		    $(todayAttendanceInfoDetails_id).html("<b>Number of presenties: "+numberOfPresentiesForPie+"<br> Number of absenties: "+numberOfAbsentiesForPie+"</b>");
   		    
    		   /*	function call for showing pie chart*/    			
    			displayPieChart(numberOfPresentiesForPie,numberOfAbsentiesForPie);
                
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
               console.log("Error occured while displayPieChart() method");
              $("#pieLegend").text(" some internal problem occured try  gain");
            }
            
        });//END -- $.ajax()
	
	}; // END -- $(dailyAttendance_link_id).click()

	/*function for back button */
   $(backButton_one_id).click(function(){
	   hideTables();	   
   }); // END -- $(dailyAttendance_link_id).click() show-piechart-back-button2
   
   /*function for back button */
   $(backButton_two_id).click(function(){
   	   hideTables();	   
   }); // END -- $(dailyAttendance_link_id).click() 
   
   /*function to hide tables */
   function hideTables(){
	   $("#pie-holder").show();		
	   $(dailyAttendance_legend_id).show();
   	   $(showTableDetails).hide();
   	   $("#showAbsentDetails").hide();
   };// END -- hideTables()

   /*function for displaying pie chart*/
   function displayPieChart(numberOfPresentiesForPie,numberOfAbsentiesForPie){			
	console.log("in display pie chart");
	var pieData = [
					{
						value:numberOfPresentiesForPie,
						color:"#33CCFF",
						highlight: " #A6E9FF",
						label: "Present",
						name:"a"
					},
					{
						value: numberOfAbsentiesForPie,
						color: "#FF3366",
						highlight: "#FF6666",
						label: "Absent",
						name:"a"
					}
				   ];
	var options = {};
	  if(window.myPie!=null){
		    consol.log("pie graph destroying");
	    	 window.myPie.destroy();
	     }
	
	var ctx = document.getElementById("pieChart").getContext("2d");

	 myPieChart = new Chart(ctx).Pie(pieData,options);

	 
	 $(dailyAttendance_legend_id).show();


   
/* After clicking on pie chart  */
	
	$("#pieChart").click(function(event){
		//$("#daily-attendance-legend-div").hide();
		$(pieChartDiv).hide();
		$(dailyAttendance_legend_id).hide();
		$("#daily-absent-table").prop({border:1});
		$("#daily-present-table").prop({border:1});
		
				console.log("Inside onClickOnPieChart () function");
				 
					   var activePoints = myPieChart.getSegmentsAtEvent(event);							 
								
								var presentiesList=todayAttendanceDetails.presentiesList;
								var empDetails= todayAttendanceDetails.employeeDetails;
								
								var todayAttendancePieDetails=[];
								var allAbsentEmpData=[];
								var empId;
								var foundIndex;
								var presetiesIndexList=[];
								for(var i=0;i<presentiesList.length;i++) {
									empId=presentiesList[i].employeeId;
								   for(var j=0;j<empDetails.length;j++){
										
										
										if(empDetails[j].employeeId==empId){
											console.log("found at index : "+j);
											foundIndex=j;
											presetiesIndexList.push(j);
											
										}else{
											
											makeListOfAbsentEmp(j);
										}
										
								   }
									console.log("Index after search:="+foundIndex);
									console.log("employee details: new ="+ empDetails[foundIndex].firstName);
									if(presentiesList[i].endTime==undefined){
										presentiesList[i].endTime="still working";
									}
									var detailsObject= { employee_id: empDetails[foundIndex].employeeId, 
											           first_name: empDetails[foundIndex].firstName, 
											           last_name : empDetails[foundIndex].lastName,
											           In_time : presentiesList[i].startTime ,
											           Out_time :presentiesList[i].endTime,
											           workingHours:presentiesList[i].workingHours
											           };
									todayAttendancePieDetails.push(detailsObject);
									
								}
							    var numberOfAbsentiesForPie=todayAttendanceDetails.totalEmployees- todayAttendanceDetails.noOfPresenties;

								for(var k=0;k<empDetails.length;k++){
									var count=0;
									for(var l=0;l<presetiesIndexList.length;l++){
									
										if(presetiesIndexList[l]==k){
											count=1;
											
									}
										
									}
									if(count == 0){
										
										var absentEmpData={
												 employee_id: empDetails[k].employeeId,
												first_name:empDetails[k].firstName,
												last_name : empDetails[k].lastName
												};
										allAbsentEmpData.push(absentEmpData);
									}
									
								}
								
						   /*	printing absents list on console*/
								
								function makeListOfAbsentEmp(j){
									 
									var absentEmpData={
											 employee_id: empDetails[j].employeeId,
											first_name:empDetails[j].firstName,
											last_name : empDetails[j].lastName
											};
									allAbsentEmpData.push(absentEmpData);
									
								}
									   
							    	        if(activePoints[0].label=='Present'){
							    	        	$("#showChart").hide();
							    	        	$("#daily-absent-table").hide();	
							    	        	
							    	        	$.showTableDetails=true;
							    	        	$.listName="Present Employees";
							    	        	$.persons=todayAttendancePieDetails;
							    	        	
							   		
							   			    }
							   			    if(activePoints[0].label=='Absent'){
							   			 	
							   			 	$("#showChart").hide();
							   			 	
						    	        	$("#daily-absent-table").show();	
							   			    }
				
			} ); // END -- $("#pieChart").click()
	
}; // END --   displayPieChart(numberOfPresentiesForPie,numberOfAbsentiesForPie)

});// End of -  $("document").ready()