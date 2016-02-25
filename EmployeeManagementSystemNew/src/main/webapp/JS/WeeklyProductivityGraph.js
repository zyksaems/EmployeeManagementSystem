$(document).ready(function(){
	$("#accordion").accordion({
		 active: 3
	});
		console.log("Inside MonthlyProductivityGraph function");
		var overAllProductivityButton_id="#overAll-weekly-productivity-button";
		var individualProductivityButton_id="#individual-weekly-productivity-button";
		var overAllProductivityForm_id="#over-all-weekly-productivity-form";
		var individualProductivityForm_id="#individual-weekly-productivity-form";
		var weeklyReportEmployeeId_id="#weekly-productivity-employeeId";
		var individualReportWeekly_id="#individual-weekly-productivity";
		var overAllproductivityWeekly_id="#over-all-weekly-productivity";
		var lineChart_div_id="#line-holder";
		
		var showIndividualWeeklyReportButton_id="#show-individual-weekly-productivity-button";
		var showOverAllWeeklyReportButton_id="#show-over-all-weekly-productivity-button";
		
		var individualWeeklyProductivityMsg_id="#individual-weekly-productivity-msg";
		var overAllWeeklyProductivityMsg_id="#over-all-weekly-productivity-msg";
		
		var productivityTypeMsg_id="#weekly-productivity-type-msg";
		
		var invalidEmployeeId_msg="Invalid employee ID";
		var shortEmployeeId_msg="short employee ID";
		var invalidWeek_msg="Invalid week";
		
		var employeeId;
		var employeeIdLength=6;

		
		var appplicationName="EmployeeManagementSystemNew";
		var individualProductivity_url="getWeeklyReportOfEmployeeByIdAndWeek.do";
		var overAllProductivity_url="getWeeklyReportOfAllEmployeeByWeek.do";
		var employeeIdReqParam="employeeId";
		var weekReqParam="week";
		
		/*first hide chart*/ 
		$(lineChart_div_id).hide();
		 $("#lineLegend").hide();
		
		/*function call to apply auto complete functionality to employee id text field*/ 
		autoFillDataToTextField(weeklyReportEmployeeId_id,3);

		
		/*This function to show individual productivity graph*/
		 $(showIndividualWeeklyReportButton_id).click(function(){
			 $(productivityTypeMsg_id).text("Individual Productivity");
			 employeeId=$(weeklyReportEmployeeId_id).val();
			 week=$(individualReportWeekly_id).val();
			 console.log("week (weekly )"+week);
			 console.log("week length (weekly )"+week.length);
			 if(employeeId.length < employeeIdLength){
				 $(individualWeeklyProductivityMsg_id).text(shortEmployeeId_msg);
				 $(lineChart_div_id).hide();
				 $("#lineLegend").hide();
			   	 
			 }
			 else if( !validateEmployeeId(employeeId)){
				 $(individualWeeklyProductivityMsg_id).text(invalidEmployeeId_msg);
				 $(lineChart_div_id).hide();
				 $("#lineLegend").hide();
	         }
			 else if( week == undefined || week.length < 8){
			    $(individualWeeklyProductivityMsg_id).text(invalidWeek_msg);
			    $(lineChart_div_id).hide();
			    $("#lineLegend").hide();
			 }
		     else{
		    	 $(individualWeeklyProductivityMsg_id).text("");
			      var url="/"+appplicationName+"/"+individualProductivity_url+"?"+
			                             employeeIdReqParam+"="+employeeId+"&"+weekReqParam+"="+week;
		    	/* var url="/"+appplicationName+"/"+individualProductivity_url+"?"+yearReqParam+"="+year;*/
		    	  makeAjaxCallToGetWeeklyProductivity(url);
		     }
			 
		 });//END -- $(showIndividualWeeklyReportButton_id).click()
		 
		 /*This function to show over all  productivity graph*/
		 $(showOverAllWeeklyReportButton_id).click(function(){
			 $(productivityTypeMsg_id).text("OverAll Productivity");
			 week=$(overAllproductivityWeekly_id).val();
			 console.log("Week over all: "+week);
			 if(week == undefined || week.length < 8){
			    $(overAllWeeklyProductivityMsg_id).text(invalidWeek_msg);
			    $(lineChart_div_id).hide();
			    $("#lineLegend").hide();
			 }
		     else{
		    	 $(overAllWeeklyProductivityMsg_id).text("");
		    	  var url="/"+appplicationName+"/"+overAllProductivity_url+"?"+weekReqParam+"="+week;
		    	  makeAjaxCallToGetWeeklyProductivity(url);
		     }
			 
		 });//END -- $(showOverAllWeeklyReportButton_id).click()
		
		  /*first hide these forms*/
		  $(overAllProductivityForm_id).show();
		  setDefaultValues();
		  $(individualProductivityForm_id).hide();
		 
		 /*This function to show over all monthly productivity form*/
		 $(overAllProductivityButton_id).click(function(){
			 console.log("over all button clicked");
			 setDefaultValues();
			 $(overAllProductivityForm_id).show();
			 $(individualProductivityForm_id).hide();
			 
		 });//END -- $(anualProductivity_link_id).click()
		 
		 /*This function to show individual monthly productivity form*/
		 $(individualProductivityButton_id).click(function(){
			 console.log("individual button clicked");
			 setDefaultValues();
			 $(overAllProductivityForm_id).hide();
			 $(individualProductivityForm_id).show();
			 
		 });//END -- $(anualProductivity_link_id).click()
		 
		 /*This function is to stop reloading page on submit*/
		 $(individualProductivityForm_id).submit(function(){
			 
			 return false;
		 });
		 
		 /*This function is to stop reloading page on submit*/
		 $(overAllProductivityForm_id).submit(function(){
			 
			 return false;
		 });
		 
		  /**
		   * This function to make ajax call to get weekly productivity details
		   */
		  function  makeAjaxCallToGetWeeklyProductivity(url){
			   
			   $.ajax({
	  	        url:url,
	  	        type: 'POST',
	  	        dataType: "json",
	  		    contentType: "application/json; charset=utf-8",
	  	        success: function(data)
	  	        {
	  	        	console.log("data returned from server for add single emoloyee:"+ JSON.stringify(data));
	  	        	
	  	        	 var weeklyData=data;
					   displayLine(weeklyData);
	  	        
	  	        },
	  	        error: function(jqXHR, textStatus, errorThrown)
	  	        {
	  	            
	  	            console.log('ERRORS: ' + textStatus);
	  	            // STOP LOADING SPINNER
	  	            
	  	        }
	  	        
	  	    });//END -- $.ajax()
			   
		   }; //END -- makeAjaxCallToGetWeeklyProductivity(url)
		   
		   /**
			 * This function is to set default values
		     */
		   function setDefaultValues(){
			   
				 $(weeklyReportEmployeeId_id).val("");
				 $(individualReportWeekly_id).val("");
				 $(overAllproductivityWeekly_id).val("");
				 $(overAllWeeklyProductivityMsg_id).text("");
				 $(individualWeeklyProductivityMsg_id).text("");
				 $(lineChart_div_id).hide();
				 $("#lineLegend").hide();
				 
			 }; //END -- setDefaultValues()
		   
			  /*function to display line chart*/
			  function displayLine(data){
			 	 
			 	 console.log("Inside  displayLine()  method");  
			 	$(lineChart_div_id).show();
			 	$("#lineLegend").show();
			 	
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
							fillColor : "rgb(255,179,179)",
							strokeColor:"rgb(230,0,0)",
							pointColor : "#b30000",
							pointStrokeColor :"	#804d4d",
							pointHighlightFill : "#FFFFFF",
							pointHighlightStroke : "#660033",
							data : total1
						},
						{
							label: "Working hours",														
							fillColor : "#CCF2FF",  
							strokeColor : "#1ac4ff",
							pointColor : "#0085b3",
							pointStrokeColor : "#005f80",
							pointHighlightFill : "#FFFFFF",
							pointHighlightStroke : "#000000",
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
				//document.getElementById('lineLegend').innerHTML = myLine.generateLegend();
				/*legend = Line.generateLegend();*/

			}; // End of -  displayLine(data)
		 
		
	  });//END -- $(document).ready(function())
	   