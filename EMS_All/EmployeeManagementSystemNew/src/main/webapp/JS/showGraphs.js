var todayAttendanceDetails;
	var activePoints=[];
	
	/*creating variables to store division id's */
	var  pieChartDiv="#pie-holder";
	var barChartDiv="#bar-holder";
	var lineChartDiv="#line-holder";
	var showChartDiv="#showChart";
	var validationMsg='#validationMsg';
	var showTableDetails='#showTableDetails';
	
	
	
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
	
	/*	for display pie chart  for daily attendance*/
$(dailyAttendance_link_id).click(function() {
			
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
	
	}); // END -- $(dailyAttendance_link_id).click()



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

	
	/*for display Bar chart*/
  $(monthlyAttendance_link_id).click( function(){
	    console.log("bar graph printing..");
		 showTableDetails=false;	
		 showTable=false;
		 /*function call to display one division*/
		 displayOnlyOneDivision(barChartDiv);
		 
		 $("#showLineChartForm").hide();
		 
			$("#showTableDetails").hide();
			
			$(lineChartDiv).hide();
			
			 $("#showAbsentDetails").hide();
		 
		$("#bar-holder").show();
		$("#barLegend").show();
		
		
		var barChartData = {
				labels : ["January","February","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"],
				datasets : [
					{
						label:"present",
						fillColor : "#0085b3",
						strokeColor : "#002633",
						highlightFill: "#4dd1ff",
						highlightStroke: "#005f80",
						data:[100,150,250,90,40,140,170,120,120,200,150,170]
					},
					{   label:"absent",
						fillColor : "#b30000",
						strokeColor : "#800000",
						highlightFill : "#cc0000",
						highlightStroke : "#330000",
						data : [15,18,19,12,19,15,17,14,2,4,18,12]
					}
				]

			}
		
		var ctx = document.getElementById("barChart").getContext("2d");
		window.myBar = new Chart(ctx).Bar(barChartData, {
			responsive : true
		});
		
		document.getElementById('barLegend').innerHTML = myBar.generateLegend();
		 legend = myBar.generateLegend();

	});// END --  $(monthlyAttendance_link_id).click()
  
	  
   /*function executes when click on weekly attendance*/
  $(weeklyAttendance_link_id).click(function(){
	  
	  /*display pieChartDiv division*/
		displayOnlyOneDivision(lineChartDiv);
		
		$("#showTableDetails").hide();
		
		 $("#showAbsentDetails").hide();
		
		$(lineChartDiv).hide();
		
		$("#showLineChartForm").show();
	  
   });// END -- $(weeklyAttendance_link_id).click()
  
  
  /*function calls when click on show button*/
  $("#showLine").click(function(){
	  
	   console.log("in show line button click function");
	   
	   var employeeId=$("#employeeId").val();
	   
		$("#showTableDetails").hide();
	   
		 $("#showAbsentDetails").hide();
		 
	   var msgAndId=checkId(employeeId);
	 /*  console.log("validation 1:"+JSON.stringify(msgAndId));*/
	   var msg=msgAndId.msg;
	   
	 /*  $("#validationMsg").text(JSON.stringify(msgAndId.msg));*/
	   
	   $("#validationMsg").text(msg);
		
		  $(validationMsg).show();
	   
		if(msgAndId.status==1){
			
			/*	var msgAndId=checkId(employeeId);*/
		   var startDate=$("#weeklyDate").val();
		   //startDate=new Date(startDate);
		
		/*after successful validation*/
		$.ajax({
            url:"/EmployeeManagementSystemNew/getWeeklyReportOfEmployeeByIdAndWeek.do?employeeId="+employeeId+"&weekDate="+startDate,
            type: 'POST',
            dataType: "json",
         contentType: "application/json; charset=utf-8",
            success: function(data)
            {
                console.log("data returned from server for add single emoloyee:"+JSON.stringify( data));
                var weeklyData=data;
			    displayLine(weeklyData);
                
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                
             /*   console.log('ERRORS: ' + textStatus);*/
                // STOP LOADING SPINNER
              
            }
        });//END -- $.ajax()
		
		} // END of if
  });
  
  /*function for validating id*/
  
  function checkId(id){
	  
	  console.log("inside checkId() function");
	  
	  var maxLength=6,minLength=5;
	  
	  var msgAndId={msg:" ",status:0};
	  
	  if(id.length<=maxLength && id.length>minLength){
		  msgAndId.msg="";
		  if(id.match(/^[0-9]*$/)){
			 
			  $("#validationMsg").hide();
			  
			  msgAndId.msg="";
			  msgAndId.status=1;	  
		  }else{
			  msgAndId.status=0;
			  msgAndId.msg="only digits are allowed ";
			  $(lineChartDiv).hide();
		  }
	  }
	  else{
		  msgAndId.status=0;
		  msgAndId.msg="Id length must be 6 ";
		  $(lineChartDiv).hide();
	  }
	  
	  console.log("validation MSG:"+JSON.stringify(msgAndId));
	  
	  return msgAndId;
  } // END --  function checkId() method
  
  
  /*function to display line chart*/
  function displayLine(data){
 	 
 	 /*display pieChartDiv division*/
		displayOnlyOneDivision(lineChartDiv);
 	 
 	/* showOrHideRemainingDivisions("showCharts");*/
 	 console.log("Inside  displayLine()  method");  
 	 
 	 $(lineChartDiv).show();
 	 $("#lineLegend").show();
 	 
 		/*showLineChartForm=true;
       showLineChartInlineForm=false;*/
 		
 		var weeklyData = data;
 	 console.log("data in  displayLine() after parsing:  "+JSON.stringify(data));  
 	 
 	 console.log("last day "+weeklyData.lastDay); 
	     console.log( typeof weeklyData); 
	     console.log("dayAndWork "+weeklyData.dayAndWork.Saturday);
	     console.log("start day "+weeklyData.startDay);
	     

	     var displayLabels=[];
	     
     days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
     
      var flag;
      var start;
      
      var work=[];
      var total=[];
      var temp;
      
      temp=weeklyData.dayAndWork.Monday;
      if(temp==undefined){
      	
      	work[0]=0.0;
      	total[0]=0.0
      }else{
      	
      	work[0]=temp;
      	total[0]=weeklyData.oneDayHours;
      }
       
      temp=weeklyData.dayAndWork.Tuesday;
      if(temp==undefined){
      	
      	work[1]=0.0;
      	total[1]=0.0
      }else{
      	
      	work[1]=temp;
      	total[1]=weeklyData.oneDayHours;
      }
       
      temp=weeklyData.dayAndWork.Wednesday;
      if(temp==undefined){
      	
      	work[2]=0.0;
      	total[2]=0.0
      }else{
      	
      	work[2]=temp;
      	total[2]=weeklyData.oneDayHours;
      }
    
      temp=weeklyData.dayAndWork.Thursday;
      if(temp==undefined){
      	
      	work[3]=0.0;
      	total[3]=0.0
      }else{
      	
      	work[3]=temp;
      	total[3]=weeklyData.oneDayHours;
      }
    
      temp=weeklyData.dayAndWork.Friday;
      if(temp==undefined){
      	
      	work[4]=0.0;
      	total[4]=0.0
      }else{
      	
      	work[4]=temp;
      	total[4]=weeklyData.oneDayHours;
      }
    
      temp=weeklyData.dayAndWork.Saturday;
      if(temp==undefined){
      	
      	work[5]=0.0;
      	total[5]=0.0
      }else{
      	
      	work[5]=temp;
      	total[5]=weeklyData.oneDayHours;
      }
    
      temp=weeklyData.dayAndWork.Sunday;
      if(temp==undefined){
      	
      	work[6]=0.0;
      	total[6]=0.0
      }else{
      	
      	work[6]=temp;
      	total[6]=weeklyData.oneDayHours;
      }
    
      
      var work1=[],total1=[];
      for(var i=0;i<7;i++){
     		 
     	 if(weeklyData.startDay==days[i]){
             start=i;
     	 }
     	 if(weeklyData.startDay==days[i]){
     		 end=i;
     	 }
      }
      
      for(var j=start; j<7;j++){
     	 displayLabels.push(days[j]);
     	 work1.push(work[j]);
     	 total1.push(total[j]);
      }
      
      for(var k=0; k<end; k++){
     	 displayLabels.push(days[k]);
     	 work1.push(work[k]);
     	 total1.push(total[k]);
      }

     lineChartData = {
		labels : displayLabels,
		datasets : [
			{
				label: "Total Hours",
				fillColor : "#CCF2FF",
				strokeColor : "#1ac4ff",
				pointColor : "#0085b3",
				pointStrokeColor : "#005f80",
				pointHighlightFill : "#FFFFFF",
				pointHighlightStroke : "#000000",
				data : total1
			},
			{
				label: "Working hours",
				fillColor : "rgb(255,179,179)",
				strokeColor:"rgb(230,0,0)",
				pointColor : "#b30000",
				pointStrokeColor :"	#804d4d",
				pointHighlightFill : "#FFFFFF",
				pointHighlightStroke : "#660033",
				data :work1
			}
		]

	}
  if(window.myLine!=null){
 	 window.myLine.destroy();
  }
	var ctx = document.getElementById("lineChart").getContext("2d");
	myLine = new Chart(ctx).Line(lineChartData, {
		responsive: true
	});

	/*myLine.removeData();*/
	document.getElementById('lineLegend').innerHTML = myLine.generateLegend();
	/*legend = Line.generateLegend();*/

}; // End of -  displayLine(data)

	  
});// End of -  $("document").ready()

/* 
 * This function is to display only one division and hides remaining divisions
 * This function displays division which you sent as parameter
 */
function displayOnlyOneDivision(divId){
	
	console.log("hide/show page divisions method ()  idv ID  receved"+divId);
	(divId == pieChartDiv)? $(pieChartDiv).show() && $("#pieLegend").show() : $(pieChartDiv).hide() && $("#pieLegend").hide();
	(divId == barChartDiv)? $(barChartDiv).show() && $("#barLegend").show(): $(barChartDiv).hide() && $("#barLegend").hide();
	(divId == lineChartDiv)? $(lineChartDiv).show() && $("#lineLegend").show(): $(barChartDiv).hide() && $("#lineLegend").hide();
	
};// END -- diplayOnlyOneDivision(divId)



