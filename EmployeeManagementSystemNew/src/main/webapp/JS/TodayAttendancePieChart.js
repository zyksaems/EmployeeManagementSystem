var todayAttendanceDetails;
	var activePoints=[];
	
	/*creating variables to store division id's */
	var  pieChartDiv="#pie-holder";
	var barChartDiv="#bar-holder";
	var lineChartDiv="#line-holder";
	var showChartDiv="#showChart";
	var validationMsg='#validationMsg';
	var showTableDetails='#showTableDetails';
	var backButton_one_id="#show-piechart-back-button";
	var backButton_two_id="#show-piechart-back-button2";
	
	
	
	/*variable to store mouse event of pie chart*/
	var pieMouseEvent;
	
	var myPieChart ;
	
	var clickOnPieChart="#clickOnPieChart";
		
	/*var dailyAttendance_link_id="#daily-attendance-div";*/
	var dailyAttendance_link_id="#daily-attendance-link";
	var weeklyAttendance_link_id="#weekly-attendance-graph-link";
	var monthlyAttendance_link_id="#monthly-attendance-graph-link";
	
	function setDefaultValues(){
		console.log("in set default values method()")
		$("#bar-holder").hide();
		$("#barLegend").hide();
		$("#line-holder").hide();
		$("#lineLegend").hide();
	    $("#pie-holder").hide();
		$("#pieLegend").hide();
		$("#showLineChartForm").hide();
		$("#showTableDetails").hide();
		$("#showAbsentDetails").hide();
		$("#validationMsg").hide();
	}
	
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
					    	        	
					    	        	$("#listName") .text("Present Employees Details");
					    	        	
					    	        	 $("#showAbsentDetails").hide();
					    	        	
					    	        	$(pieChartDiv).hide() ;
					    				 $("#pieLegend").hide();
					    				 $("#showTableDetails").show();

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
					   				

					   			    	$("#showTableDetails").hide();
					    				 
					    				 $("#showAbsentDetails").show();
					    				 
					    				 $("#listName1") .text(" Absent Employees Details");
					    				 
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
	
	setDefaultValues();
	console.log("called set default values function");
	displayTodayAttendance();
	
	
	/*	for display pie chart  for daily attendance*/
   function displayTodayAttendance() {
			
	$(showTableDetails).hide();
	
	 $("#showAbsentDetails").hide();
	
	 /*function call to display one division*/
	 displayOnlyOneDivision(pieChartDiv);
	 
			 $(pieChartDiv).show() ;
			 $("#pieLegend").show();
			 
			 $(lineChartDiv).hide();
		
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
    		    
    			console.log("data from method: "+todayAttendance);
    			console.log("no of presenties: "+todayAttendance.noOfPresenties);
    			console.log("employee details:"+todayAttendance.employeeDetails[1].firstName );
    			console.log("total employee :"+todayAttendance.totalEmployees );
    			
    		    
    		   /*	function call for showing pie chart*/    			
    			displayPieChart(numberOfPresentiesForPie,numberOfAbsentiesForPie);
                
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
               console.log("Error occured while displayPieChart() method");
              $("#pieLegend").text(" some internal problem occured try  gain");
            }
            
        });//END -- $.ajax()
		
         console.log("out side the function static values");
		 console.log("presenties out side: ------------------"+numberOfPresentiesForPie);
		 console.log("absenties for pie out side--------: "+numberOfAbsentiesForPie);
	
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
   	   $("#showTableDetails").hide();
   	   $("#showAbsentDetails").hide();
   };// END -- hideTables()

/*function for displaying pie chart*/
function displayPieChart(numberOfPresentiesForPie,numberOfAbsentiesForPie){
	
	
	$("#showLineChartForm").hide();
	
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
	var options = {}
	  if(window.myPie!=null){
		    consol.log("pie graph destroying");
	    	 window.myPie.destroy();
	     }
	
	var ctx = document.getElementById("pieChart").getContext("2d");

	 myPieChart = new Chart(ctx).Pie(pieData,options);

	document.getElementById('pieLegend').innerHTML = myPieChart.generateLegend();

	legend = myPieChart.generateLegend();
	
   var activePoints =myPieChart.getSegmentsAtEvent(event);

   
/* After clicking on pie chart  */
	
	$("#pieChart").click(function(event){
		
		$(pieChartDiv).hide();
		
				console.log("Inside onClickOnPieChart () function");
				 
					   var activePoints = myPieChart.getSegmentsAtEvent(event);
					  
					   
					   alert("Active Points RAHUL:"+activePoints[0].value);
								   
								   console.log("new points......1 "+activePoints[0].value);
								   console.log("new points......1 "+activePoints[0].label);
								
								
								   console.log("new points......2 "+activePoints[0].value);
								   console.log("new points......2 "+activePoints[0].label);
								
							
								
							   
								$scope.sortType = 'name'; // set the default sort type
								$scope.sortReverse  = false;  // set the default sort order
								$scope.search= '';     // set the default search/filter term
								
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