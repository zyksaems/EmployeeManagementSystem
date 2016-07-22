
var app = angular.module('ui.ems.app', ['ngAnimate', 'ui.bootstrap']);
	app.controller('ValidController', function($scope, $http,$window,$uibModal, $log) {
		
		
		 /*for slides*/
		  $scope.myInterval = 0;
		  var slides = $scope.slides = [];
		  function addSlide(i) {
		    slides.push({
		      image: 'images/'+i+'.png',
		      });
		  };
		  for (var i=1; i<=1; i++) {
		    addSlide(i);
		  }
		  
		  
        var adminNewPasswordMinLength=5;
		$scope.showAdminResetPasswordDiv=true;
		$scope.adminNewPassword='';
		$scope.adminConfirmNewPassword='';
		$scope.adminSetNewPasswordSuccessMsg='';
		
		$scope.setAdminNewPassword=function(){
			if($scope.adminNewPassword.length < adminNewPasswordMinLength){
		      	$scope.adminSetNewPasswordSuccessMsg="Password  too  short";
			}
			else if($scope.adminNewPassword != $scope.adminConfirmNewPassword){
				
				$scope.adminSetNewPasswordSuccessMsg="New password and Confirm password not matched";
				
			}
			else{
				/*$scope.adminSetNewPasswordSuccessMsg="going to service";*/
				var adminObj={adminId:$scope.adminIdForNewPassword,password:$scope.adminConfirmNewPassword};
				$http.post('/EmployeeManagementSystem/setNewAdminPassword.do',adminObj)
				.success(function(data, status, headers, config) {
					if(data == 1){
						$scope.showAdminResetPasswordDiv=false;
						$scope.adminSetNewPasswordSuccessMsg="Password sucessfully changed please Login";
					}
						
			     })
			     .error(function(data, status, headers, config) {
				        alert("failure message: " + JSON.stringify({
					       data : data
				        }));
			      });
			
				
			}
		};
	
	});