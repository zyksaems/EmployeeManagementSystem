
  $(document).ready(function(){
	
	var overAllProductivityButton_id="#overAll-monthly-productivity-button";
	var individualProductivityButton_id="#individual-monthly-productivity-button";
	var overAllProductivityForm_id="#over-all-monthly-productivity-form";
	var individualProductivityForm_id="#individual-monthly-productivity-form";
	var monthlyReportEmployeeId_id="#monthly-productivity-employeeId";
	var individualReportYear_id="#individual-monthly-productivity-year";
	var overAllproductivityYear_id="#over-all-monthly-productivity-year";
	
	var showIndividualMonthlyReportButton_id="#show-individual-monthly-productivity-button";
	var showOverAllMonthlyReportButton_id="#show-over-all-monthly-productivity-button";
	
	var individualMonthlyProductivityMsg_id="#individual-monthly-productivity-msg";
	var overAllMonthlyProductivityMsg_id="#over-all-monthly-productivity-msg";
	
	var invalidEmpoyeeId_msg="Invalid employee ID";
	var invalidyear_msg="Invalid year"; 
	
	var productivityTypeMsg_id="#monthly-productivity-type-msg";
	
	var employeeId;
	var employeeIdLength=6;
	var year;
	
	var appplicationName="EmployeeManagementSystemNew";
	var individualProductivity_url="getEmployeeMonthlyProductivity.do";
	var overAllProductivity_url="getAllEmployeeMonthlyProductivity.do";
	var employeeIdReqParam="employeeId";
	var yearReqParam="year";
	
	
	/*This function to show individual productivity graph*/
	 $(showIndividualMonthlyReportButton_id).click(function(){
		 $(productivityTypeMsg_id).text("Individual Productivity");
		 employeeId=$(monthlyReportEmployeeId_id).val();
		 year=$(individualReportYear_id).val();
		 if(employeeId.length != employeeIdLength){
			 $(individualMonthlyProductivityMsg_id).text(invalidEmpoyeeId_msg);
			 $("#bar-holder").hide();
		   	 $("#barLegend").hide();
		 }
		 else if(year > new Date().getFullYear() || year < 2015 || year == undefined){
		    $(individualMonthlyProductivityMsg_id).text(invalidyear_msg);
		    $("#bar-holder").hide();
		   	$("#barLegend").hide();
		 }
	     else{
	    	 $(individualMonthlyProductivityMsg_id).text("");
		      var url="/"+appplicationName+"/"+individualProductivity_url+"?"+
		                             employeeIdReqParam+"="+employeeId+"&"+yearReqParam+"="+year;
	    	/* var url="/"+appplicationName+"/"+individualProductivity_url+"?"+yearReqParam+"="+year;*/
	    	  makeAjaxCallToGetMonthlyProductivity(url);
	     }
		 
	 });//END -- $(showOverAllMonthlyReportButton_id).click()
	 
	 /*This function to show over all  productivity graph*/
	 $(showOverAllMonthlyReportButton_id).click(function(){
		 $(productivityTypeMsg_id).text("OverAll Productivity");
		 year=$(overAllproductivityYear_id).val();
		 console.log("yerr over all: "+year);
		 if(year > new Date().getFullYear() || year < 2015 || year == undefined){
		    $(overAllMonthlyProductivityMsg_id).text(invalidyear_msg);
		    $("#bar-holder").hide();
		   	$("#barLegend").hide();
		 }
	     else{
	    	 $(overAllMonthlyProductivityMsg_id).text("");
	    	  var url="/"+appplicationName+"/"+overAllProductivity_url+"?"+yearReqParam+"="+year;
	    	  makeAjaxCallToGetMonthlyProductivity(url);
	     }
		 
	 });//END -- $(showOverAllMonthlyReportButton_id).click()
	
	  /*first hide these forms*/
	  $(overAllProductivityForm_id).show();
	  setDefaultValues();
	  $(individualProductivityForm_id).hide();
	 
	 /*This function to show over all productivity form*/
	 $(overAllProductivityButton_id).click(function(){
		 console.log("over all button clivked");
		 setDefaultValues();
		 $(overAllProductivityForm_id).show();
		 $(individualProductivityForm_id).hide();
		 
	 });//END -- $(anualProductivity_link_id).click()
	 
	 /*This function to show individual productivity form*/
	 $(individualProductivityButton_id).click(function(){
		 console.log("individual button clivked");
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
	   * This function to make ajax call to get productvity details
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
  	        	 if(data.employeeName == undefined){
  	        		 console.log("bname undefined");
  	        		
  	        	 }  
  	        	 else{
  	        		 console.log("name defined")
  	        	 }
  	        	printBarChart(data.workingHoursArray,data.nonWorkingHoursArray);
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
			 $(individualReportYear_id).val("");
			 $(overAllproductivityYear_id).val("");
			 $(overAllMonthlyProductivityMsg_id).text("");
			 $(individualMonthlyProductivityMsg_id).text("");
			 $("#bar-holder").hide();
		   	 $("#barLegend").hide();
			 
		 }; //END -- setDefaultValues()
	   
		/*function to print bar chart*/
		function printBarChart(presentData,absentData){
   		console.log("data received for monthly graph  present: "+presentData+"  absentdata: "+absentData);
   		$("#bar-holder").show();
   		$("#barLegend").show();
   		var barChartData = {
   				labels : ["January","February","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"],
   				datasets : [
   					{
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

   			}
   		if(window.myBar!=null){
   			 console.log("destroying bar graph");
		    	 window.myBar.destroy();
		}
   		var ctx = document.getElementById("barChart").getContext("2d");
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
    