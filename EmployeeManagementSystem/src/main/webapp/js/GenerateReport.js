var app1=angular.module('myapp',[]);
app1.controller('myctrl',function($scope,$http){
	
	 $scope.hide1=true;
	 $scope.hide2=true;
	 $scope.hide3=true;
	 $scope.hide4=true;
	
	 $scope.hide11=true;
	$scope.hide12=true;
		
	$scope.getAttendance=function(){ 
		
	/* select single employee records based on conditions */
	
	if($scope.sel=="single"){
		
		if($scope.id!=null)
			{
			
			/*when you select None it will select all records of single employee */
			
			if($scope.sel1=="none")
				{
			alert($scope.id +"  none");
			 $http({
	             method : 'POST',
	             url : 'getAllEmployeeReport.do?employeeId='+$scope.id
	          
	            
	     }).success(function(data, status, headers, config) {
    	 
    	 $scope.hide1=false;
    	 $scope.hide2=false;
    	 $scope.hide4=false;
    	 $scope.res=true;
             $scope.ats=data;  
           
     }).error(function(data, status, headers, config) {
    	 
    	 $scope.hide1=true;
    	 $scope.hide2=true;
    	 $scope.hide3=true;
    	 $scope.hide4=true;
    	 $scope.res=false;
    	 $scope.result ="error occured due to some internal problem please try again none." ;
    	 });
			}/* none */
			
			/* when you select Day it will select that particular day records of specified employee */ 
			
			else if($scope.sel1=="day")
				{ 
			alert($scope.id+"  day  "+$scope.from);
				$http({
		           method : 'POST',
		             url : 'generateReport.do?employeeId='+$scope.id+'&attendanceDate='+$scope.from.getTime()
		                  
		     }).success(function(data, status, headers, config) {
	    	 
	    	 $scope.hide1=false;
	    	 $scope.hide2=false;
	    	 $scope.hide4=false;
	    	 $scope.res=true;
	             $scope.ats=data;  
		    	
	     }).error(function(data, status, headers, config) {
	    	 
	    	 $scope.hide1=true;
	    	 $scope.hide2=true;
	    	 $scope.hide3=true;
	    	 $scope.hide4=true;
	    	 $scope.res=false;
	    	 $scope.result ="error occured due to some internal problem please try again day." ;
	    	 });
				}/* day */
				
				/* when you select From and To Date it will select the records with in mentioned date of particular employee */
			
				else if($scope.sel1=="dates")
			{
			alert($scope.id+"  Ftday  "+$scope.from +"  "+$scope.to);
			 console.log("url: "+'generateReportPage.do?employeeId='+$scope.id+'&fromDate='+$scope.from.getTime()+'&toDate='+$scope.to.getTime());
			$http({
	             method : 'POST',
	             url : 'generateReportPage.do?employeeId='+$scope.id+'&fromDate='+$scope.from.getTime()+'&toDate='+$scope.to.getTime()
	            
	          
	            
	     }).success(function(data, status, headers, config) {
    	 
    	 $scope.hide1=false;
    	 $scope.hide2=false;
    	 $scope.hide4=false;
    	 $scope.res=true;
              $scope.ats=data;  
            
     }).error(function(data, status, headers, config) {
    	 
    	 $scope.hide1=true;
    	 $scope.hide2=true;
    	 $scope.hide3=true;
    	 $scope.hide4=true;
    	 $scope.res=false;
    	 $scope.result ="error occured due to some internal problem please try again dates." ;
    	 });
			}/* from date and to date */
			
			
			}/* not null */
		else
			{
			$scope.hide1=true;
			 $scope.hide2=true;
			 $scope.hide3=true;
			 $scope.hide4=true;
			 $scope.res=false;
			$scope.result ="if you select single id field should not be empty." ;
			}
	}
	
	/* when select ALL it will select the records of all employee based on conditions */
	
	else
		{
		
		$http({
            method : 'GET',
            url : 'getAllEmployees.do'
           
    }).success(function(data, status, headers, config) {
   	 
   	 $scope.hide3=false;
   	 $scope.hide4=false;
            $scope.ats1=data;     
    }).error(function(data, status, headers, config) {
    	$scope.hide1=true;
   	 $scope.hide2=true;
   	 $scope.hide3=true;
   	 $scope.hide4=true;
   	 $scope.result ="error occured due to some internal problem please try again1." ;
   	 });
	
		}
   };/* getAttendance */
   
   /* autocomplete to get employee ids or names */
  /* $scope.getCheck=function()
	{
		$http({
	           method : 'GET',
	             url : 'AutoCompleteId?s='+$scope.id
	                  
	     }).success(function(data, status, headers, config) {
	    	 $scope.employeeIds = data;
	    	
  }).error(function(data, status, headers, config) {
 	 $scope.result ="there is id like this" ;
 	 });
		
	
	}
   */
   
	$scope.getDis=function()
	{
		
		 if($scope.sel=="all")
			{
			
		$scope.f1=true;
	}
		else{
			$scope.f1=false;
		}
	};
	
	$scope.getStatu=function()
	{
		if($scope.sel1=="none")
		{
			$scope.hide12=true;
			$scope.hide11=true;
			
		}
		else if($scope.sel1=="day")
			{
			$scope.hide12=true;	
			$scope.hide11=false;
			}
		else if($scope.sel1=="dates")
			{
			$scope.hide11=false;
			$scope.hide12=false;
			
			}
		else if($scope.sel1=="week")
			{
			$scope.hide11=true;
			$scope.hide12=true;
		
			var myDate = new Date();
			var pDay = new Date(myDate);
			
			var i=pDay%7;
			var c = "<select ng-model='sel2'>";
			 for ( var j=1; j<=i; j++) {
			     
			  c = c + "<option value=week'"+j+"'>week"+ j +"</option>";
			 }
			  c = c + "</select>";
		var newDirective = angular.element();
		element.append(newDirective);
		$compile(newDirective)($scope);
			}
		else if($scope.sel1=="month")
			{
			$scope.hide11=true;
			$scope.hide12=true;
		
			}
		else if($scope.sel1=="year")
		{
		$scope.hide11=true;
		$scope.hide12=true;
		
		}
	};
	$scope.printDiv = function(pdiv) {
	    var printContents = document.getElementById("pdiv").innerHTML;
	    var originalContents = document.body.innerHTML;
	            document.body.innerHTML = printContents;
	    window.print();
	    document.body.innerHTML = originalContents;
	}
});
