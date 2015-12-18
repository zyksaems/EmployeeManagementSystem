'use strict';

App.controller('UserController', ['$scope','UserService', function($scope, UserService) {
          var self = this;
          self.user={employeeId:null,firstName:'',lastName:'',dob:null,mobileNo:'',emailId:'',designation:'',rollId:null,status:null,deptId:null};
          self.users=[];
          $scope.totalItems=[];   
          
          $scope.viewby =20;
    	  $scope.currentPage = 1;
    	  $scope.itemsPerPage = $scope.viewby;
    	  $scope.maxSize = 5;
    	  $scope.setItemsPerPage = function(num) {
			  $scope.itemsPerPage = num;
			  $scope.currentPage = 1; //reset to first paghe
			};
			
          self.fetchAllUsers = function(){
              UserService.fetchAllUsers()
                  .then(
      					       function(d) {
      					    	   console.log(d);
      					    	   $scope.totalItems=d.length;
      					    	   for(var i=0;i<d.length;i++){
      					    		   
      					    		   var milliseconds=d[i].dob;
      					    		   var date=new Date(milliseconds);
      					    		   d[i].dob=date;
      					    		  
      					    	   }
      					    	   $scope.totalItems=d.length;
      						        self.users = d;
      						        
      					       },
            					function(errResponse){
            						console.error('Error while fetching Currencies');
            					}
      			       );
          };
          self.fetchAllUsers();
          
          $scope.sort = function(keyname){
              $scope.sortKey = keyname;   //set the sortKey to the param passed
              $scope.reverse = !$scope.reverse; //if true make it false and vice versa
          };
           
          self.createUser = function(user){
              UserService.createUser(user)
		              .then(
                      self.fetchAllUsers, 
				              function(errResponse){
					               console.error('Error while creating User.');
				              }	
                  );
          };

         self.updateUser = function(user, employeeId){
              UserService.updateUser(user, employeeId)
		              .then(
				              self.fetchAllUsers, 
				              function(errResponse){
					               console.error('Error while updating User.');
				              }	
                  );
          };

         self.deleteUser = function(employeeId){
              UserService.deleteUser(employeeId)
		              .then(
				              self.fetchAllUsers, 
				              function(errResponse){
					               console.error('Error while deleting User.');
				              }	
                  );
          };

        

          self.submit = function() {
              if(self.user.employeeId==null){
                  console.log('Saving New User', self.user);    
                  self.createUser(self.user);
              }else{
                  self.updateUser(self.user, self.user.employeeId);
                  console.log('User updated with employeeId ', self.user.employeeId);
              }
              self.reset();
          };
              
          self.edit = function(employeeId){
              console.log('employeeId to be edited', employeeId);
              for(var i = 0; i < self.users.length; i++){
                  if(self.users[i].employeeId == employeeId) {
                     self.user = angular.copy(self.users[i]);
                     break;
                  }
              }
          };
              
          self.remove = function(employeeId){
              console.log('employeeId to be deleted', employeeId);
              for(var i = 0; i < self.users.length; i++){
                  if(self.users[i].employeeId == employeeId) {
                     self.reset();
                     break;
                  }
              }
              self.deleteUser(employeeId);
          };

          
          self.reset = function(){
              self.user={employeeId:null,firstName:'',lastName:'',dob:null,mobileNo:'',emailId:'',designation:'',rollId:null,status:null,deptId:null};
              $scope.myForm.$setPristine(); //reset Form
          };
          
          $scope.goBack=function() {
        	    window.history.back();
          };
          
        $scope.printDiv = function(divName) {
    	    var printContents = document.getElementById(divName).innerHTML;
    	    var originalContents = document.body.innerHTML;
    	            document.body.innerHTML = printContents;
    	    window.print();
    	    document.body.innerHTML = originalContents;
    	};
          
         
      }]);
