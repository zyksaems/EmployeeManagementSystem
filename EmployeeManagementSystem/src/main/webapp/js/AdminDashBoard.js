
/*this file name: AdminDashBoard.js */

var app = angular.module('AdminDashBoard', []);

app.controller('AdminDashBoardController', function($scope, $http, $window) {
	
	/*creating variables */
	var file=null;
	var allowedFileExtension="xl";
	
	/*fonction to set default values*/
	function setDefaultValues(){
		
		$scope.showAddEmployeeMainDiv=false;	
		$scope.showExcelDiv = false;
		$scope.showManuallyEnterDiv=false;
		$scope.fileUploadSuccessMsg="";
	}
	
	/*function call to set default values*/
	setDefaultValues();
	
	
	/*function to show add Employee Details division */
	$scope.addEmployeeDetails=function(){
		console.log("in addEmployeeDetails()()");
		$scope.showAddEmployeeMainDiv= !$scope.showAddEmployeeMainDiv;
		console.log("show add user div: "+$scope.showAddEmployeeMainDiv);
	};
	/*function to show add emplyee manually div*/
	$scope.showAddEmployeeDiv=function(){
		console.log("called");
		$scope.showManuallyEnterDiv=!$scope.showManuallyEnterDiv;
		$scope.showExcelDiv=false;
	};
	
	/* function to show Add employees By Excel file division */
	$scope.showFromExcelDiv = function() {
		
		console.log("in showFromExcelDiv()");
		$scope.fileUploadSuccessMsg="";
		$scope.showExcelDiv = !$scope.showExcelDiv;
		$scope.showManuallyEnterDiv	=false;

	};
	/*function for file_change()*/
	$scope.file_changed = function(element) {		
		file=element.files[0];
	    element=null;
		console.log("file extension:: "+ getFileExtension(file));
	    	
	};
	/*function to get file extension*/
	function getFileExtension(fileObject){
		
		return fileObject.name.split('.').pop().substring(0,2);
		
	};
	
	/*function to check file extension*/
	function checkFileExtension(extensionName){
		
		return (extensionName == allowedFileExtension)? true: false ;
		
	};
	 /*function to upload file*/
	 $scope.uploadFile=function (){ 
	  if(file != null){
	     if(checkFileExtension(getFileExtension(file))){
	  
	        var formData=new FormData();
	           formData.append("file",file);
	           console.log("file:  "+file);
	           $http.post('/EmployeeManagementSystem/uploadEmployeeDetailsExcelFile.do', formData, {
	                 transformRequest: function(data, headersGetterFunction) {
	                     return data;
	                 },
	                 headers: { 'Content-Type': undefined }
	                 }).success(function(data, status) {                       
	                     console.log("Success ... response: " + data);
	                     var resArray=data.split('.');
	                     console.log("array length : "+resArray.length);
	                     if(resArray.length == 2 && resArray[0]=="0" && resArray[1]== "0")
	                      $scope.fileUploadSuccessMsg="uploaded success fully";
	                     else if (resArray.length == 2)                       
	                      $scope.fileUploadSuccessMsg="In excel file Row Number:"+resArray[0]+" Column Number:"+resArray[1]+"  DOB is wrong";      
	                     else
	                      $scope.fileUploadSuccessMsg="In excel file Row Number: "+data+" contains invalid data";
	                     
	                 }).error(function(data, status) {
	                     console.log("Error ... data: " +data+" status: "+status);
	                     $scope.fileUploadSuccessMsg="Problem ocuured!";
	             });
	     }
	     else{
	      $scope.fileUploadSuccessMsg="file Extension must be ."+allowedFileExtension1+" or ."+allowedFileExtension2;
	      $scope.excelFilePath="";
	     }
	  }
	  else{
	   $scope.fileUploadSuccessMsg="Please select file ";
	  }
	   
	  
	 };
	/*function to set employee default details*/
	function employeeDefaultDetails(){
		
		$scope.empId="";
		$scope.empFirstName="";
		$scope.empLastName="";
		/*$scope.DOB=new Date();*/
		
	}
	
	/*function call to set employee default values*/
	employeeDefaultDetails();
	
	/*function to add single employee details*/
	$scope.addEmployee=function(){
		
		if($scope.empId.length > 4 && $scope.empFirstName.length > 2 && $scope.empLastName > 2 &&  $scope.DOB < new Date()){
			if($scope.empId.length < 20 && $scope.empFirstName.length < 30 && $scope.empLastName < 30 ){
				
				console.log("emp data: "+$scope.empId+" "+$scope.empFirstName+" "+$scope.empLastName+" "+$scope.DOB);
			}
			else{
				
				console.log("bad request");
				$scope.addEmployeeSuccessMsg="Request too long !";
			}
			
		}
		else{
			
			console.log("invalid employee details");
			$scope.addEmployeeSuccessMsg="Invalid employee details";
		}
			
		/*$scope.empFirstName="fn";
		$scope.empLastName="ln";
		$scope.DOB=new Date();*/
		
		console.log("manually add emp : add emp()");
		
	};
	
	/*function to show View User division */
	$scope.viewUser=function(){
		console.log("in viewUser()");
		$scope.viewUserDetails= !$scope.viewUserDetails;
		console.log("show view user div: "+$scope.viewUserDetails);
		var response = $http.get('/EmployeeManagementSystem/getAllEmployee.do');
		response.success(function(data, status, headers, config) {
			$scope.allEmpData = data;
			
		});
		response.error(function(data, status, headers, config) {
			alert("failure message: " + JSON.stringify({
				data : data
			}));
		});
	};
	
	/*function to logout button*/
	$scope.logout=function(){
		
		console.log("in logout()");
		$window.location.href = '/EmployeeManagementSystem/adminLogout.do';
		
	};
	
	$scope.getChange=function(){
		  
		  console.log("in  getChange()");
		  $window.location.href = '/EmployeeManagementSystem/changePasswordPage.do';
		  
		 };
});//end app.controlller