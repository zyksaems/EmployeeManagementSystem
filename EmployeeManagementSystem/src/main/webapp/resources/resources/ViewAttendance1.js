  myapp=angular.module("myApp",[]);

  myapp.controller("myController",function($scope){

	  $scope.myData = {};
      $scope.myData.showIt = true;

	  
   $scope.types=[{value:1,label:"Daily"}
	              ,{value:2,label:"Weakly"}
	              ,{value:3,label:"Monthly"}
	              ,{value:4,label:"Yearly"}];
   
   $scope.selectFun=function(){
    	if($scope.selectF.value==1){
    	      $scope.myData.showIt = true;
    		
    		var pieData = [
    						{
    							value:50,
    							color:"#F7464A",
    							highlight: "#FF5A5E",
    							label: "Aubsent",
    							name:"a"
    						},
    						{
    							value: 65,
    							color: "#46BFBD",
    							highlight: "#5AD3D1",
    							label: "Present",
    							name:"a"
    						},
    						{
    							value: 5,
    							color: "#FDB45C",
    							highlight: "#FFC870",
    							label: "Leave",
    							name:"a"
    						}

    					];
    		
    		var ctx = document.getElementById("pieChart").getContext("2d");
    		window.myPie = new Chart(ctx).Pie(pieData ,{percentageInnerCutout : 50});
    		document.getElementById('pieLegend').innerHTML = Pie.generateLegend();

    	}
    	else if($scope.selectF.value==3){
    		  $scope.myData.showIt = false;
    		var barChartData = {
    				labels : ["January","February","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"],
    				datasets : [
    					{
    						label:"present",
    						fillColor : "#46BFBD",
    						strokeColor : "rgba(220,220,220,0.8)",
    						highlightFill: "rgba(220,220,220,0.75)",
    						highlightStroke: "rgba(220,220,220,1)",
    						data : [100,150,250,90,40,140,170,120,120,200,150,170]
    					},
    					{   label:"aubsent",
    						fillColor : "#F7464A",
    						strokeColor : "rgba(151,187,205,0.8)",
    						highlightFill : "rgba(151,187,205,0.75)",
    						highlightStroke : "rgba(151,187,205,1)",
    						data : [15,18,19,12,19,15,17,14,2,4,18,12]
    					}
    				]

    			}
    		
    		var ctx = document.getElementById("barChart").getContext("2d");
    		window.myBar = new Chart(ctx).Bar(barChartData, {
    			responsive : true
    		});
    		
    		document.getElementById('barLegend').innerHTML = myBar.generateLegend();
    		
    	}
    }
   $scope.onclick = function(event){
	    var activePoints = myPie.getSegmentsAtEvent(event);
	   
	   console.log(activePoints[0].value);
	   console.log(activePoints[0].label);
	};
    
    

});


  
  
  
  
  
  
  
  
  



  
  
  
  
  
  
  
  
  
  