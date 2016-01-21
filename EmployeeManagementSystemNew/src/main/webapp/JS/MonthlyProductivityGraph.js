
  $(document).ready(function(){
	console.log("Inside MonthlyProductivityGraph function");
	var overAllProductivityButton_id="#overAll-monthly-productivity-button";
	var individualProductivityButton_id="#individual-monthly-productivity-button";
	var overAllProductivityForm_id="#over-all-monthly-productivity-form";
	var individualProductivityForm_id="#individual-monthly-productivity-form";
	var monthlyReportEmployeeId_id="#monthly-productivity-employeeId";
	var individualReportMonthly_id="#individual-monthly-productivity";
	var overAllproductivityMonthly_id="#over-all-monthly-productivity";
	
	var showIndividualMonthlyReportButton_id="#show-individual-monthly-productivity-button";
	var showOverAllMonthlyReportButton_id="#show-over-all-monthly-productivity-button";
	
	var individualMonthlyProductivityMsg_id="#individual-monthly-productivity-msg";
	var overAllMonthlyProductivityMsg_id="#over-all-monthly-productivity-msg";
	
	var invalidEmpoyeeId_msg="Invalid employee ID";
	var invalidMonth_msg="Invalid month"; 
	
	var productivityTypeMsg_id="#monthly-productivity-type-msg";
	
	var employeeId;
	var employeeIdLength=6;
	var year;
	
	var appplicationName="EmployeeManagementSystemNew";
	var individualProductivity_url="getMonthlyProductivityOfEmployeeByIdAndMonth.do";
	var overAllProductivity_url="getMonthlyProductivityOfAllEmployeeByMonth.do";
	var employeeIdReqParam="employeeId";
	var monthReqParam="month";
	
	
	/*This function to show individual productivity graph*/
	 $(showIndividualMonthlyReportButton_id).click(function(){
		 $(productivityTypeMsg_id).text("Individual Productivity");
		 employeeId=$(monthlyReportEmployeeId_id).val();
		 month=$(individualReportMonthly_id).val();
		 if(employeeId.length != employeeIdLength){
			 $(individualMonthlyProductivityMsg_id).text(invalidEmpoyeeId_msg);
			 $("#bar-holder").hide();
		   	 $("#barLegend").hide();
		 }
		 else if(month > new Date().getMonth() || month < 11 || month == undefined){
		    $(individualMonthlyProductivityMsg_id).text(invalidMonth_msg);
		    $("#bar-holder").hide();
		   	$("#barLegend").hide();
		 }
	     else{
	    	 $(individualMonthlyProductivityMsg_id).text("");
		      var url="/"+appplicationName+"/"+individualProductivity_url+"?"+
		                             employeeIdReqParam+"="+employeeId+"&"+monthReqParam+"="+month;
	    	/* var url="/"+appplicationName+"/"+individualProductivity_url+"?"+yearReqParam+"="+year;*/
	    	  makeAjaxCallToGetMonthlyProductivity(url);
	     }
		 
	 });//END -- $(showOverAllMonthlyReportButton_id).click()
	 
	 /*This function to show over all  productivity graph*/
	 $(showOverAllMonthlyReportButton_id).click(function(){
		 $(productivityTypeMsg_id).text("OverAll Productivity");
		 month=$(overAllproductivityMonthly_id).val();
		 console.log("Month over all: "+month);
		 if(month > new Date().getMonth() || month < 11 || month == undefined){
		    $(overAllMonthlyProductivityMsg_id).text(invalidMonth_msg);
		    $("#bar-holder").hide();
		   	$("#barLegend").hide();
		 }
	     else{
	    	 $(overAllMonthlyProductivityMsg_id).text("");
	    	  var url="/"+appplicationName+"/"+overAllProductivity_url+"?"+monthReqParam+"="+month;
	    	  makeAjaxCallToGetMonthlyProductivity(url);
	     }
		 
	 });//END -- $(showOverAllMonthlyReportButton_id).click()
	
	  /*first hide these forms*/
	  $(overAllProductivityForm_id).show();
	  setDefaultValues();
	  $(individualProductivityForm_id).hide();
	 
	 /*This function to show over all monthly productivity form*/
	 $(overAllProductivityButton_id).click(function(){
		 console.log("over all button clivked");
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
	   * This function to make ajax call to get productivity details
	   */
	  function  makeAjaxCallToGetMonthlyProductivity(url){
		   
		   $.ajax({
  	        url:url,
  	        type: 'POST',
  	        dataType: "json",
  		    contentType: "application/json; charset=utf-8",
  	        success: function(data)
  	        {
  	        	console.log("data returned from server for add single emoloyee:"+ JSON.stringify(data));

  	        	  var workingHours =[data.workingHours];
  	              var nonWorkingHours=[data.nonWorkingHours];

  	              printBarChart(workingHours,nonWorkingHours,data.monthName);
  	        },
  	        error: function(jqXHR, textStatus, errorThrown)
  	        {
  	            
  	            console.log('ERRORS: ' + textStatus);
  	            // STOP LOADING SPINNER
  	            
  	        }
  	        
  	    });//END -- $.ajax()
		   
	   }; //END -- makeAjaxCallToGetMonthlyProductivity(url)
	   
	   /**
		 * This function is to set default values
	     */
	   function setDefaultValues(){
			 $(monthlyReportEmployeeId_id).val("");
			 $(individualReportMonthly_id).val("");
			 $(overAllproductivityMonthly_id).val("");
			 $(overAllMonthlyProductivityMsg_id).text("");
			 $(individualMonthlyProductivityMsg_id).text("");
			 $("#bar-holder").hide();
		   	 $("#barLegend").hide();
			 
		 }; //END -- setDefaultValues()
	   
		/*function to print bar chart*/
		function printBarChart(presentData,absentData,monthName){
   		console.log("data received for monthly graph  present: "+presentData+"  absentdata: "+absentData+" mon name: "+monthName);
   		$("#bar-holder").show();
   		$("#barLegend").show();
   		var barChartData = {
   				labels : [monthName],
   				datasets :[	{
   						label:"Working Hours",
   						fillColor : "#0085b3",
   						strokeColor : "#002633",
   						highlightFill: "#4dd1ff",
   						highlightStroke: "#005f80",
   						data:presentData
   					},
   					{   label:"Non working Hours",
   						fillColor : "#b30000",
   						strokeColor : "#800000",
   						highlightFill : "#cc0000",
   						highlightStroke : "#330000",
   						data : absentData
   					}
   				]

   			};
   		
   		if(window.myBar!=null){
   			 console.log("destroying bar graph");
		    	 window.myBar.destroy();
		}
   		var ctx = document.getElementById("barChartMonthly").getContext("2d");
   		window.myBar = new Chart(ctx).Bar(barChartData, {
   			responsive : true
   		});
   		
   		//document.getElementById('barLegend').innerHTML = myBar.generateLegend();
   		//$scope.legend = Bar.generateLegend();
   		$("#barLegend").html( myBar.generateLegend());
   		
   		$("#bar-holder").show();
   		$("#barLegend").show();

		}; // END -- printBarChart(presentData,absentData)
	 
	
  });//END -- $(document).ready(function())
    