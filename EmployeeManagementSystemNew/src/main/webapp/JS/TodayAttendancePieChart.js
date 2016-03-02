    	
   
	
$("document").ready(function(){
	
	$("#accordion").accordion({
		 active: 2
	});
	
	    var todayAttendanceDetails;
		var  todayDateString=(""+new Date()+"").substr(4,12);
		console.log("date string: "+todayDateString);
		/*creating variables to store division id's */
		var  pieChartCanvas_id="#pieChart";
		var pieChartCanvas="pieChart";
		
		var attendanceChartDiv_id="#daily-attendance-chart-div";
		var attendanceDetailsTable_id="#attendance-details-tables";
		var printButton_id="#print-attendance-button";
		var presentTable_id="#present-table";
		var absentTable_id="#absent-table";
        var leaveTable_id="#leave-table";
		var presentTableDiv_id="#present-table-div";
		var absentTableDiv_id="#absent-table-div";
		var leaveTableDiv_id="#leaves-table-div";
		var buttonsDiv_id="#daily-attendance-buttons-div";
		
		var backButton_id="#show-piechart-back-button";
		

		var todayAttendanceHeading_id="#today-attendance-heading";
		var todayAttendanceInfoDetails_id="#today-attendance-info-detils";
		var detailsHeading_id="#details-type-heding";
		
		/*variables tto store error/success messages*/
		var absentDetailsHeading_msg="Employees Absent on "+todayDateString;
		var presentDetailsHeading_msg="Employees Present on "+todayDateString;
		var leaveDetailsHeading_msg="Leaves on "+todayDateString;
		var stillWorking_msg="working still";
		var leave_msg="on leave";
		
		//var dailyAttendance_legend_id="#daily-attendance-legend-div";	
		
		var myPieChart ;
		var absentiesTable=null;
		var presentiesTable=null;
		var leavesTable=null;
		var presentTableCount=0;
		var absentTableCount=0;
		var leaveTableCount=0;

	
	//console.log("called set default values function");
	displayTodayAttendance();
	hideTables();
	
	
	/*	for display pie chart  for daily attendance*/
   function displayTodayAttendance() {
	
	$(todayAttendanceHeading_id).text("Attendance Date: "+todayDateString);
	
	//console.log("in displayTodayAttendance()");
	 $("#showAbsentDetails").hide();		 
	 
		
		var todayAttendance;
		var numberOfPresentiesForPie;
		var numberOfAbsentiesForPie;
		var numberOfLeavesForPie;
		//console.log("going to get data");
		
		/*make AJAX call to get data*/
		$.ajax({
            url:"/EmployeeManagementSystemNew/getTodayReport.do",
            type: 'GET',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(data)
            {
			   // console.log("reply from get today attendance: "+ JSON.stringify(data));
			    $("#pieLegend").text(" ");
    		    todayAttendanceDetails=todayAttendance= data;   		    
    		    //console.log("presenties: "+data.noOfPresenties);
    		    
    		    numberOfPresentiesForPie=todayAttendance.presentiesList.length;
    		    //console.log("presenties in  pie: "+numberOfPresentiesForPie);
    		    numberOfAbsentiesForPie=todayAttendance.absenteesList.length;
    		    numberOfLeavesForPie=todayAttendance.leavesList.length;
    		    //console.log("absenties for pie: "+numberOfAbsentiesForPie);
    		    $(todayAttendanceInfoDetails_id).html("<b>Number of presenties: "+numberOfPresentiesForPie+
    		    		   "<br>Number of absenties: "+numberOfAbsentiesForPie+"<br>Number of Leaves: "+numberOfLeavesForPie+"</b>");
   		    
    		   /*	function call for showing pie chart*/    			
    			displayPieChart(numberOfPresentiesForPie,numberOfAbsentiesForPie,numberOfLeavesForPie);
                
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
               //console.log("Error occured while displayPieChart() method");
              $("#pieLegend").text(" some internal problem occured try  gain");
            }
            
        });//END -- $.ajax()
	
	}; // END -- $(dailyAttendance_link_id).click()

	/*function for back button */
   $(backButton_id).click(function(){
	   //console.log("back button clicked");
	   hideTables();	   
   }); // END -- $(dailyAttendance_link_id).click() show-piechart-back-button2
   
  
   /**
    * function to hide tables 
    */
   function hideTables(){
	   //console.log("in hide tables fun");
	   $(attendanceChartDiv_id).show();
	   $(attendanceDetailsTable_id).hide();
	   $(buttonsDiv_id).hide();
	 
   };// END -- hideTables()
   
   /**
    * function to show tables
    */
    function  showTables(label){
    	//console.log("in shoe table  lable received: "+label);
    	if(label == "Absent"){
    		$(detailsHeading_id).text(absentDetailsHeading_msg);  
    		// display absent table
    		displayOneTable(absentTableDiv_id);
    		if(absentTableCount == 0){
    			 absentTableCount=1;
    		     displayAbsentEmployeeData();
    		     // table.clear().draw();
    		     //table.rows.add(dataSet).draw();
    		}
    	}
    	else if(label == "Present"){
    		// display present table
    		displayOneTable(presentTableDiv_id);
    		$(detailsHeading_id).text(presentDetailsHeading_msg);
    		if(presentTableCount == 0){
    			presentTableCount=1;
   			    displayPresentEmployeeData();
   		    }    		
    	}
    	else{
    		$(detailsHeading_id).text(leaveDetailsHeading_msg);  
    		// display present table
    		displayOneTable(leaveTableDiv_id);
    		if(leaveTableCount == 0){
    			leaveTableCount=1;
    			displayLeavesEmployeeData();
   		    } 
    	}
    	$(attendanceChartDiv_id).hide();
 	    $(attendanceDetailsTable_id).show();
 	    $(buttonsDiv_id).show();
 	   
    }; // END --  showTables(label)
    
    /**
     *  This function is to display one table at a time
     *  among leave, absent and presenties tables
     */
    function displayOneTable(tableDivId){
    	 //console.log("in displayOneTable(tableDivId) id received: "+tableDivId);
    	(tableDivId == presentTableDiv_id) ? $(presentTableDiv_id).show() : $(presentTableDiv_id).hide();
    	(tableDivId == absentTableDiv_id) ? $(absentTableDiv_id).show() : $(absentTableDiv_id).hide();
    	(tableDivId == leaveTableDiv_id) ? $(leaveTableDiv_id).show() : $(leaveTableDiv_id).hide();
		
    }// END -- displayOneTable(tableDivId)
    
    /**
     * This function is to display present employee data
     */
    function displayPresentEmployeeData(){
    	var presentData=todayAttendanceDetails.presentiesList;
    	var presentArray=new Array(presentData.length);
    	for(var i=0;i< presentData.length;i++){
    		presentArray[i]=new Array(5);
    		presentArray[i][0]=presentData[i].employeeId;
    		presentArray[i][1]=presentData[i].attendanceDate;    		  			
    		presentArray[i][2]=presentData[i].startTime.substr(12,24);
        	if(presentData[i].endTime == undefined)
        		presentArray[i][3]=stillWorking_msg;    		
        	else
        	   presentArray[i][3]=presentData[i].endTime.substr(12,24);  
        	presentArray[i][4]=presentData[i].workingHours;
    		
    	}
 
        presentiesTable=$(presentTable_id).DataTable( {
       	        data: presentArray,
       	     "lengthMenu": [[5,10, -1], [5,10, "All"]],
       	        columns: [
        
       	            { title: "Employee ID" },
       	            { title: "Attendance Date","orderable": false},
       	            { title: "Login Time"},
       	            { title: "Logout Time"},
       	            { title: "Worked Hours" },
       	           
       	          
                 ]
       	    } );
    	
    	
    };// END -- displayPresentEmployeeData()
    
    /**
     * This function is to display absent employee data
     */
    function displayAbsentEmployeeData(){
    	var absentData=todayAttendanceDetails.absenteesList;
    	var dataArray=new Array(absentData.length);
    	for(var i=0;i<absentData.length;i++){
    		dataArray[i]=new Array(3);
    		dataArray[i][0]=absentData[i][0];
    		dataArray[i][1]=absentData[i][1];
    		dataArray[i][2]=absentData[i][2];
    		
    	}
    	///console.log("absent table  (before): "+absentiesTable);    
    		
       absentiesTable=$(absentTable_id).DataTable( {
       	        data: dataArray,
       	     "lengthMenu": [[5,10, -1], [5,10, "All"]],
       	        columns: [
        
       	            { title: "Employee ID" },
       	            { title: "First name" },
       	            { title: "Last Name" },
       	            //{ title: "WorkHours","orderable": false },
       	          
                 ]
       	    } ); 
       
    	//console.log("absent table  after data table added: "+absentiesTable);
    	//console.log("absent table  after data table added(stringify): "+JSON.stringify(absentiesTable));
    	
    };// END -- displayAbsentEmployeeData()
    
    /**
     * This function is to display present employee data
     */
    function displayLeavesEmployeeData(){
    	var leavesData=todayAttendanceDetails.leavesList;
    	var leavesArray=new Array(leavesData.length);
    	for(var i=0;i< leavesData.length;i++){
    		leavesArray[i]=new Array(2);
    		leavesArray[i][0]=leavesData[i].employeeId;
    		leavesArray[i][1]=leavesData[i].attendanceDate;	
    		
    	}
 
    	leavesTable=$(leaveTable_id).DataTable( {
       	        data: leavesArray,
       	     "lengthMenu": [[5, -1], [5, "All"]],
       	        columns: [
        
       	            { title: "Employee ID" },       	       
       	            { title: "Leave Date","orderable": false}       	           
       	          
                 ]
       	    } );
    	
    	
    };// END -- displayLeavesEmployeeData()
    
   /*function for displaying pie chart*/
   function displayPieChart(numberOfPresentiesForPie,numberOfAbsentiesForPie,numberOfleaves){			
	//console.log("in display pie chart");
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
					},
					{
						value:numberOfleaves,
						color:"#D7DF01",
						highlight: "#FFFF00",
						label: "Leave",
						name:"a"
					}
				   ];
	   var options = {};
	  if(window.myPie!=null){
		    consol.log("pie graph destroying");
	    	 window.myPie.destroy();
	     }
	
	var ctx = document.getElementById(pieChartCanvas).getContext("2d");

	 myPieChart = new Chart(ctx).Pie(pieData,options);

   }; // END --   displayPieChart(numberOfPresentiesForPie,numberOfAbsentiesForPie)
	 
   
    /* After clicking on pie chart  */	
	$(pieChartCanvas_id).click(function(event){  
		
			//console.log("Inside onClickOnPieChart () function");				 
			var activePoints = myPieChart.getSegmentsAtEvent(event);	//pieMouseEvent	
			if(activePoints.length != 0){						   
					console.log("selected lable: "+activePoints[0].label);												
					showTables(activePoints[0].label);
			}
			else{
				console.log("selected lable: is wromg");
			}
				
	 }); // END -- $("#pieChart").click()
	
	/**
	 *  Function for print button
	 */
	$(printButton_id).click(function(){
		
		//showingTable_id
	});



});// End of -  $("document").ready()