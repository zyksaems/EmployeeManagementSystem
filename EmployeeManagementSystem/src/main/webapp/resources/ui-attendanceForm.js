

var app = angular.module('ui.ems.app', ['ngAnimate', 'ui.bootstrap']);
	app.controller('ValidController', function($scope, $http,$window,$uibModal, $log) {
		
		
		/*error or success message after specific functions*/
		$scope.errorOrSuccessMessageOnPage="";
		
		
		/*setting values for hiding all divisions*/				
		$scope.showAdminDashBoard=false;
		$scope.showAdminLoginButton=true;
		
		
		/*divisions inside Admin dash board*/		
		$scope.showAddEmployeeMainDiv=false;
		$scope.showAdminChangePasswordDiv=false;
		$scope.showTableDetails=false;
		$scope.showCharts=true;
		$scope.showGenerateReportDiv=false;
		/*$scope.showAddNewAdminDiv=false;*/
		
		
	  /*function for showing and hiding divisions*/
		
		function showOrHideRemainingDivisions(divName){
			
			$scope.showAddEmployeeMainDiv=(divName=="showAddEmployeeMainDiv") ? true:false;			
			$scope.showAdminChangePasswordDiv=(divName=="showAdminChangePasswordDiv") ? true:false;
			$scope.showTableDetails=(divName=="showTableDetails") ? true:false;
			$scope.showViewOrUpdateEmployeeDiv=(divName == "showViewOrUpdateEmployeeDiv") ? true:false;
			$scope.showGenerateReportDiv=(divName == "showGenerateReportDiv") ? true:false;
			
			if(divName =="showCharts"){
				$("#showChart").show();
			}else{
				$("#showChart").hide();
				
			}
		}
		
		
		
	  /*END -----  function for showing and hiding divisions    --- END	*/
		
		
		/*  start of change password function */
		
		$scope.getConfirm=function()
	       {
			if($scope.password.length==0)
				{
				 $scope.pwd=false;
				}
			else if($scope.currentpassword==$scope.password)
	       		 {
	       		  $scope.pwd=false;
	       		 }
	       	 else{
	       		 $scope.pwd=true;
	       	 }
	       };
	       
	       $scope.getConfirm1=function()
	       {
	    	   if($scope.repassword.length==0)
			{
				 $scope.repwd=false;
				}
	    	   
	    	   else if($scope.password==$scope.repassword)
	       		  {
	       		  $scope.repwd=true;
	       		  }
	       	  else{
	       		  $scope.repwd=false;
	       	  }
	       };
	       
	       $scope.getClear=function(){
	    	   
	    	   $scope.currentpassword=undefined;
	    	   $scope.password='';
	    	   $scope.repassword='';
	    	   $scope.pwd=undefined;
	    	   $scope.repwd=undefined;
	       };
	
	       $scope.getChangePassword= function(){
	   							$http({
	   							method : 'POST',
	   							url :'changePassword.do?cpwd='+$scope.currentpassword+'&&npwd='+$scope.password
	   	            
	   	            
	   					}).success(function(data, status, headers, config) {
	   	                    if(data==1)
	   	                    	{
	   	                    	
	   							alert("password has been successfully changed.please login newly");
	   							$scope.showAdminDashBoard=false;
	   						  $scope.showAdminLoginButton=false;
	   						  var modalInstance = $uibModal.open({
	   						        animation: true,
	   						        templateUrl: 'AdminLogin.html',
	   						        controller: 'AdminLoginController',
	   						        size: 'md',
	   						        resolve: {
	   						         //admin:function(){ return $scope.Admin}
	   						        }
	   						      });
	   						 modalInstance.result.then(function (result) {
	   						     
	   					        $scope.showAdminDashBoard = result;
	   					    	$scope.showTable=true;
	   					    	$scope.showInitialAccordion=true;
	   					        $scope.showCharts=true;
	   					        $("#canvas-holder").hide();
	   							$("#pieLegend").hide();
	   							
	   							$("#bar-holder").hide();
	   							$("#barLegend").hide();
	   							
	   							$("#line-holder").hide();
	   							$("#lineLegend").hide();
	   					      }, function () {
	   					    	  $scope.showAdminLoginButton=true;
	   					        $log.info('Modal dismissed at: ' + new Date());
	   					      });
	   	                    	}else
	   	                    		{
	   	                    		$scope.msg1="current password and old password must same.";
	   	                    		}
	   	     }).error(function(data, status, headers, config) {
	   	    	   $scope.msg1="Some internal problem occured try again.";
	   	    	   
	   	     });
	   							showOrHideRemainingDivisions("");
	       }

	       /* end of change password function */
		
		  /*for accordion*/
		  $scope.oneAtATime = true;
          
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
		  
		  /*for show-hide home page/admin page */
		  $scope.showAdminDashBoard=false;	
		  $scope.showAdminLoginButton=true;
		  /*This function is to show admin login as modal(ui bootstrap)*/
		  $scope.showAdminLoginModal=function(){
			  
			  $scope.showAdminDashBoard=false;
			  $scope.showAdminLoginButton=false;
			  var modalInstance = $uibModal.open({
			        animation: true,
			        templateUrl: 'AdminLogin.html',
			        controller: 'AdminLoginController',
			        size: 'md',
			        resolve: {
			         //admin:function(){ return $scope.Admin}
			        }
			      });

			      modalInstance.result.then(function (result) {
			     
			        $scope.showAdminDashBoard = result;
			    	$scope.showTable=true;
			    	$scope.showInitialAccordion=true;
			        $scope.showAdminLoginButton=false;
			        $scope.showCharts=true;
			        $("#pie-holder").hide();
					$("#pieLegend").hide();
					
					$("#bar-holder").hide();
					$("#barLegend").hide();
					
					$("#line-holder").hide();
					$("#lineLegend").hide();
			      }, function () {
			    	  $scope.showAdminLoginButton=true;
			        $log.info('Modal dismissed at: ' + new Date());
			      });
		 };//showAdminLoginModal()--close

			 
		  
		  
		/*creating variables for employee intime/out time functionality*/

		var employeeIdLength = 6;
		var json = [];
		var jsonLoggedIn = [];
		var jsonLoggedOut = [];
		var EmployeeName="kk";
		var loginSuccess=1;
		var logoutSuccess=2;
		var status=10;

		/* set initial values */
		function defaultValues() {
			$scope.empId = '';
			$scope.invalidMsg = "";
			$scope.showInvalidMsg = false;
			$scope.showAttendanceForm=true;
			$scope.cssClass = "first";
			$scope.buttonDisable = true;
			$scope.buttonText = "In-Time";
		}

		/* set default values  */
		defaultValues();

		/* function calls to get Employee Ids  */
	    getAllEmpIds();
		getLoggedInEmpIds();
		getLoggedOutEmpIds();
		

		/* function to get all employeeIds from jsp as array */
		function getAllEmpIds() {

			var response = $http.post('/EmployeeManagementSystem/getAllEmpIds.do');
			response.success(function(data, status, headers, config) {
				$scope.jsondata = data;
				json = data;

			});
			response.error(function(data, status, headers, config) {
				alert("failure message: " + JSON.stringify({
					data : data
				}));
			});

		}

		/* function to get loggedIn empIds from jsp as array */
		function getLoggedInEmpIds() {
			var loggedInusers = $http.post('/EmployeeManagementSystem/getLoggedInEmpIds.do');
			loggedInusers.success(function(data, status, headers, config) {
				jsonLoggedIn = data;
				$scope.loggedInIds = data;

			});
			loggedInusers.error(function(data, status, headers, config) {
				alert("failure message: " + JSON.stringify({
					data : data
				}));
			});

		}
		/*function to get logout employee Ids as jsonArray */
		function getLoggedOutEmpIds() {

			var loggedOut = $http.post('/EmployeeManagementSystem/getLoggedOutEmpIds.do');
			loggedOut.success(function(data, status, headers, config) {
				$scope.jsonLoggedOut = data;
				jsonLoggedOut = data;
				console.log("logged out ids: "+data);

			});
			loggedOut.error(function(data, status, headers, config) {
				alert("failure message: " + JSON.stringify({
					data : data
				}));
			});

		}

		$scope.validateData = function() {

			$scope.successMessage = "";
			if ($scope.empId.length == employeeIdLength) {
			  if(serachInJsonObjectArray($scope.empId, json)){
				  
				  if (serachInArray($scope.empId, jsonLoggedOut)) {
						$scope.invalidMsg = "Today your attendance posted";
						$scope.showInvalidMsg = true;
						$scope.cssClass = "error";
						$scope.buttonDisable = true;
						$scope.buttonText = "invalid";
					
					} else if (serachInArray($scope.empId, jsonLoggedIn)) {
						$scope.invalidMsg = "";
						$scope.showInvalidMsg = false;
						$scope.cssClass = "ok";
						$scope.buttonDisable = false;
						$scope.buttonText = "Out-Time";
						status=1;

					} else if ($scope.empId.length == employeeIdLength) {
						if (serachInJsonObjectArray($scope.empId, json)) {

							$scope.invalidMsg = "";
							$scope.showInvalidMsg = false;
							$scope.cssClass = "ok";
							$scope.buttonDisable = false;
							$scope.buttonText = "In-Time";
							status=0;

						} else {
							
							$scope.invalidMsg = "Invalid Employee Id";
							$scope.showInvalidMsg = true;
							$scope.cssClass = "error";
							$scope.buttonDisable = true;
							$scope.buttonText = "In-Time";

						}

					}
				  
			  }else{
				  
				    $scope.invalidMsg = "Invalid Employee Id";
					$scope.showInvalidMsg = true;
					$scope.cssClass = "error";
					$scope.buttonDisable = true;
					$scope.buttonText = "In-Time";
				  
			  }
				

			} else {
				$scope.cssClass = "error";
				$scope.showInvalidMsg = false;
				$scope.buttonDisable = true;
				$scope.invalidMsg = "Invalid Employee Id";

			}

		};

		/* function for redirect*/
		$scope.redirect = function(empId) {
			
			if(status == 0){
				swal({
					title :EmployeeName ,
					text : "Are You continue to log-In",
					imageUrl: "images/welcome4.jpg",
					showCancelButton : true,
					confirmButtonColor : "green",
					confirmButtonText : "Yes",
					cancelButtonText : "No",
					cancelButtonColor :"green",
					closeOnConfirm : false,
					closeOnCancel : false
				}, function(isConfirm) {
					if (isConfirm) {
						var object={id:empId,type:"login"};
						var sendId = $http.post("/EmployeeManagementSystem/login.do",object);
						sendId.success(function(data, status, headers, config) {
					              var res = data;						             
					              console.log("returned value: "+res);
					              console.log("is numer if res: "+angular.isNumber(res));
					              if(res == loginSuccess){
					            	  jsonLoggedIn[jsonLoggedIn.length] = empId;
								      $scope.loggedInIds = jsonLoggedIn;
					            	  swal("OK", "Success fully Logged-in", "success");
					              }
					              else
					            	  swal("Problem occured!","Try Again","error");

					       });
					       sendId.error(function(data, status, headers, config) {
					       alert("failure message: " + JSON.stringify({
					         data : data
					        }));
					        //swal("Problem Occured ","Try Again","error");
					       });
						
						
						
					} else 
						swal("You are rejected !", "try Again", "error");
					
				});
				
				console.log("in");
			}
			else{
				console.log("emp name now logging out : "+EmployeeName);
				swal({
					title : EmployeeName ,
					text : "Are You Continue To Logout",
					imageUrl: "images/bye2.jpg",
					showCancelButton : true,
					confirmButtonColor : "green",
					confirmButtonText : "Yes",
					cancelButtonText : "No",
					closeOnConfirm : false,
					closeOnCancel : false
				}, function(isConfirm) {
					if (isConfirm) {
						var object={id:empId,type:"logout"};
						var sendId = $http.post("/EmployeeManagementSystem/login.do",object);
						sendId.success(function(data, status, headers, config) {
					              var res = data;						             
					              console.log("returned value: "+res);
					              console.log("is numer if res: "+angular.isNumber(res));
					              if(res == logoutSuccess){
					            	 jsonLoggedOut[jsonLoggedOut.length] = empId;
									$scope.jsonLoggedOut = jsonLoggedOut;
					            	  swal("OK", "Success fully Logged-out", "success");
					              }
					              else
					            	  swal("Problem occured!","Try Again","error");

					       });
					       sendId.error(function(data, status, headers, config) {
					       alert("failure message: " + JSON.stringify({
					         data : data
					        }));
					        //swal("Problem occured!","Try Again","error");
					       });
						
						
					} else {
						swal("You are rejected !", "", "error");
					}
				});

				console.log("out");
				
			}
			
			defaultValues();
		};
		
		

		/* function for searching element in JsonObjectArray */
		function serachInJsonObjectArray(key, arr) {
			var length = arr.length;
			for (var i = 0; i < length; i++) {
				if (key == arr[i].empId){					
					EmployeeName=arr[i].empName;
					console.log("emp name: "+EmployeeName);
					return true;
				}
			}
			return false;

		}
		
		/* function for searching element in JsonArray */
		function serachInArray(key, arr) {
			var length = arr.length;
			for (var i = 0; i < length; i++) {
				if (key == arr[i]){
					return true;
				}
			}
			return false;

		}

		
		/* function to check admin values (length)
		function adminValidation(){
			
			var empId=parseInt($scope.adminId);
			console.log("parse int: "+empId );
			if($scope.adminId.length > 2 && $scope.adminId.length < 20 &&$scope.adminPassword.length >2 && $scope.adminPassword.length < 20 && empId >= 100){
				$scope.adminInvalidMsg="";
				console.log("inside if");
				
				return true;
			}
			else{
				$scope.adminInvalidMsg="Invalid Details";
				$scope.adminPassword='';
				console.log("inside else(adminvalidation())");
				return false;
			}
			
		};*/
		
		
		/* fuction to check credentials of admin  
		$scope.redirectToAdminHome=function(){
			if(adminValidation()){
			    var admin={adminId:$scope.adminId,password:$scope.adminPassword};
			    console.log("admin object "+admin);
			    var adminHome = $http.post('/EmployeeManagementSystem/adminHome.do',admin);
			    adminHome.success(function(data, status, headers, config) {
				
			    	if(data == 1){
			    		console.log("login success");
			    		$window.location.href = '/EmployeeManagementSystem/adminHomePage.do';
			    	
			    	}
			    	else{
			            
						$scope.adminPassword='';
						$scope.adminInvalidMsg=(data == 0)? "Invalid Password" : "Invalid AdminID & password";
			    	}
				    console.log("reply from admin login: "+data);

			    });
			    adminHome.error(function(data, status, headers, config) {
			    	$scope.adminPassword='';
				    alert("failure message: " + JSON.stringify({
					    data : data
				    }));
				    alert("invalid AdminID");
				    $scope.adminInvalidMsg="Invalid AdminID";
			    });
			}
			
			
		};*/
		
		/*logOut function */
		$scope.showCharts=true;
		$scope.showTable=true;
		$scope.logOut=function(){
			
			var adminLogout = $http.get('/EmployeeManagementSystem/adminLogout.do');
			adminLogout.success(function(data, status, headers, config) {
			
		    	if(data == 1){
		    		$scope.errorOrSuccessMessageOnPage="";
		    		console.log("log out success");
		    		
		    	
		    	}
		    	else{
		        console.log("logout failed");    
				}
			    console.log("reply from admin logout: "+data);

		    });
			adminLogout.error(function(data, status, headers, config) {
		    	$scope.adminPassword='';
			    alert("failure message: " + JSON.stringify({
				    data : data
			    }));
			   /* alert("invalid AdminID");*/
			    $scope.adminInvalidMsg="Invalid AdminID";
		    });
			
			
			
			
			 console.log("log out functionccallled");
			$scope.showAdminDashBoard=false;
			$scope.showTable=false;
			$scope.showAdminLoginButton=true;
			$scope.showCharts=false;
			
			
			
		}
		
		var todayAttendanceDetails;
		var activePoints=[];
		
	/*	for display pie charts*/
		$scope.showPie=function(){
			
			showOrHideRemainingDivisions("showCharts");
			
			var todayAttendance;
			var numberOfPresetiesForPie;
			var numberOfAbsentiesForPie;
			console.log("going to get data");
			var getTodayAttendance = $http.get('/EmployeeManagementSystem/getTodayReport.do');
		    getTodayAttendance.success(function(data, status, headers, config) {
			
		    		    console.log("reply from get today attendance: "+data);
		    		    todayAttendanceDetails=todayAttendance= data;
		    		    
		    		    /*console.log("presenties: "+data.noOfPresenties);*/
		    		    
		    		    numberOfPresetiesForPie=todayAttendance.noOfPresenties;
		    		    console.log("presenties in  pie: "+numberOfPresetiesForPie);
		    		    numberOfAbsentiesForPie=todayAttendance.totalEmployees- numberOfPresetiesForPie;
		    		    console.log("absenties for pie: "+numberOfAbsentiesForPie);
		    		    
		    			console.log("data from method: "+todayAttendance);
		    			console.log("no of presenties: "+todayAttendance.noOfPresenties);
		    			console.log("employee details:"+todayAttendance.employeeDetails[1].firstName );
		    			console.log("tital employee :"+todayAttendance.totalEmployees );
		    			
		    		    
		    			/*function call for showing pie chart*/
		    			displayPieChart(numberOfPresetiesForPie,numberOfAbsentiesForPie);
		    });
			getTodayAttendance.error(function(data, status, headers, config) {
		    
			});
	         console.log("out side the function static values");
			 console.log("presenties out side: ------------------"+numberOfPresetiesForPie);
 		    console.log("absenties for pie out side--------: "+numberOfAbsentiesForPie);

			
		
		}
		
		/*function for click on pie for showing details*/
		$scope.clickOnPie = function(event){
   var activePoints = myPie.getSegmentsAtEvent(event);
			   
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
						
						//makeListOfAbsentEmp(j);
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
			
		/*	printing abseties klist on consile*/
	
		
	   /*	printing abseties klist on consile*/
			
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
		    	        	
		    	        	$scope.showTableDetails=true;
		    	        	$scope.listName="Present Employees"
		    	        	$scope.persons=todayAttendancePieDetails;
		    	        	
		   		
		   			    }
		   			    if(activePoints[0].label=='Absent'){
		   			 	$("#showChart").hide();
	    	        	$scope.showTableDetails=true;
	    	        	$scope.listName="Absent Employees"
		   			    	$scope.persons=allAbsentEmpData;	
		   			    	
		   			    }			   
		   			   		
		   			  
		    
			}	
		
		
		/*function for displaying pie chart*/
		function displayPieChart(numberOfPresetiesForPie,numberOfAbsentiesForPie){
			
			showOrHideRemainingDivisions("showCharts");

    		$scope.showLineChartForm=false;
    		$scope.showLineChartInlineForm=false;
			$("#bar-holder").hide();
    		$("#barLegend").hide();
    		$("#line-holder").hide();
    		$("#lineLegend").hide();
		    $("#pie-holder").show();
			$("#pieLegend").show();
			
    		var pieData = [
    						{
    							value:numberOfPresetiesForPie,
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
 		    	 window.myPie.destroy();
 		     }
    		var ctx = document.getElementById("pieChart").getContext("2d");
    		window.myPie = new Chart(ctx).Pie(pieData,options);
    		document.getElementById('pieLegend').innerHTML = myPie.generateLegend();
    		$scope.legend = Pie.generateLegend();
   
    		var activePoints = myPie.getSegmentsAtEvent(event);
    		
			
		};
		
		
		
		
		/*for display Bar chart*/
		$scope.showBar=function(){
		    /*
			$scope.showTableDetails=false;	
			$scope.showTable=false;*/
			showOrHideRemainingDivisions("showCharts")
			$("#pie-holder").hide();
			$("#pieLegend").hide();
			$("#line-holder").hide();
    		$("#lineLegend").hide();
    		

    		$scope.showLineChartForm=false;
    		$scope.showLineChartInlineForm=false;
			$("#showChart").show();
    		$("#bar-holder").show();
    		$("#barLegend").show();
    		
    		
    		var barChartData = {
    				labels : ["January","February","March","April","May","June","July","Aug","Sep","Oct","Nov","Des"],
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
    		$scope.legend = Bar.generateLegend();

		}
		
            
$scope.showLineForm=function(){
			
			
	
	showOrHideRemainingDivisions("showCharts");
			
			$("#pie-holder").hide();
			$("#pieLegend").hide();
			
    		$("#bar-holder").hide();
    		$("#barLegend").hide();
    		
    	
    	
    		$("#line-holder").hide();
    		$("#lineLegend").hide();
			
			$scope.showLineChartForm=false;
			$scope.showLineChartInlineForm=true;

			
			
		}
		
		  var maxLength=6,minLength=5;
		  
		  function checkId(id){
			  var msgAndId={msg:"",status:0};
			  if(id.length<=maxLength && id.length>minLength){
				  msgAndId.msg="";
				  if(id.match(/^[0-9]*$/)){
					  msgAndId.msg="";
					  msgAndId.status=1;	  
					  
				  }else{
					  msgAndId.status=0;
					  msgAndId.msg="only digits are allowed "
				  }
			  }else{
				  
				  msgAndId.status=0;
				  msgAndId.msg="Id length must be 6 "
			  }
			  
			  return msgAndId;
		  }
		/*for display Line chart*/
		$scope.showLine=function(){
			
			var msgAndId=checkId($scope.employeeId);
			
    		if(msgAndId.status==1){
			var idAndDate={id:$scope.employeeId,date:$scope.weeklyDate};
			var getWeeklyData = $http.post("/EmployeeManagementSystem/getDailyReportGraphOfIndividual.do?employeeId="+idAndDate.id+"&attendanceDate="+idAndDate.date.getTime())
			 getWeeklyData.success(function(data, status, headers, config) {
				 
				 var weeklyData=data;
				 displayLine(weeklyData);
				 
			 });
		     getWeeklyData.error(function(data, status, headers, config) {});
		       
		      
		     function displayLine(data){
    	     
		    	    
				
					
		    	 showOrHideRemainingDivisions("showCharts");
		    	 
					$("#pie-holder").hide();
					$("#pieLegend").hide();
					
		    		$("#bar-holder").hide();
		    		$("#barLegend").hide();
		    		
		    		
		    		$scope.showLineChartForm=true;
		    		$scope.showLineChartInlineForm=false;
		    		$("#line-holder").show();
		    		$("#lineLegend").show();
		    		
		    		
		    	 var weeklyData = JSON.parse(data);
		    	 console.log(data);  
		    	 
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
   		$scope.legend = Line.generateLegend();
   		
       }			
		}else{
			
			$scope.validationMsg = msgAndId.msg;
		}			

			
		}
		
		
		/*functionality for adding single employee or multiple employees through excel file*/
		
		/*creating variables for adding employees*/
		var file=null;
		var allowedFileExtension1="xlsx";
		var allowedFileExtension2="xls";
		var dateOfBirth=null;
		
		/*fonction to set default values*/
		function setDefaultValues(){
			
			$scope.showAddEmployeeMainDiv=false;	
			$scope.showExcelDiv = false;
			$scope.showManuallyEnterDiv=false;
			$scope.showChangePasswodDivValue=false;
			$scope.fileUploadSuccessMsg="";
		}
		
		/*function call to set default values*/
		setDefaultValues();
		
		
		/*function to show add Employee Details division */
		$scope.addEmployeeDetails=function(){
			console.log("in addEmployeeDetails()()");
			/*setting change password division to hide mode*/
			/*$scope.showChangePasswodDivValue=false;
			$scope.showAddEmployeeMainDiv= !$scope.showAddEmployeeMainDiv;
			console.log("show add user div: "+$scope.showAddEmployeeMainDiv);*/
			
			showOrHideRemainingDivisions("showAddEmployeeMainDiv");
		};
		
		/*function to show add emplyee manually div*/
		$scope.showAddEmployeeDiv=function(){
			console.log("called");
			$scope.showManuallyEnterDiv=!$scope.showManuallyEnterDiv;
			if($scope.showManuallyEnterDiv == true){
				var roleId = $http.post('/EmployeeManagementSystem/getRoleIds.do');
				roleId.success(function(data, status, headers, config) {	
					$scope.roleArray=data;
		    		
			    });
				roleId.error(function(data, status, headers, config) {
				     alert("failure message: " + JSON.stringify({
					    data : data
				    }));
			  });
				
				var deptId = $http.post('/EmployeeManagementSystem/getDeptIds.do');
				deptId.success(function(data, status, headers, config) {	
					$scope.deptArray=data;
		    		
			    });
				deptId.error(function(data, status, headers, config) {
				     alert("failure message: " + JSON.stringify({
					    data : data
				    }));
			  });
				
			}
			$scope.showExcelDiv=false;
			$scope.fileUploadSuccessMsg="";
			$scope.addEmployeeSuccessMsg="";
		};
		
		/* function to show Add employees By Excel file division */
		$scope.showFromExcelDiv = function() {
			
			console.log("in showFromExcelDiv()");
			$scope.fileUploadSuccessMsg="";
			$scope.addEmployeeSuccessMsg="";
			$scope.showExcelDiv = !$scope.showExcelDiv;
			$scope.showManuallyEnterDiv	=false;

		};
		/*function for file_change()*/
		$scope.file_changed = function(element) {		
			file=element.files[0];
		    element=null;
		    $scope.fileUploadSuccessMsg='';
			console.log("file extension:: "+ getFileExtension(file));
		    	
		};
		/*function to get file extension*/
		function getFileExtension(fileObject){
			
			return fileObject.name.split('.').pop();
			
		};
		
		/*function to check file extension*/
		function checkFileExtension(extensionName){
			
			return ((extensionName == allowedFileExtension1) ||(extensionName == allowedFileExtension2) )? true: false ;
			
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
		                    if(data == "sessionExpired!"){
		                    	console.log("inside session expired if condition");
		                    	$window.location.href = '/EmployeeManagementSystem/sessionExpired.do';
		                    }
		                    else{
		                        var resArray=data.split('.');
		                        console.log("array length : "+resArray.length);
		                        if(resArray.length == 2 && resArray[0]=="0" && resArray[1]== "0")
		                	        $scope.fileUploadSuccessMsg="uploaded success fully";
		                        else if (resArray.length == 2) 	                    	
		                    	    $scope.fileUploadSuccessMsg="In excel file Row Number:"+resArray[0]+" Column Number:"+resArray[1]+"  DOB is wrong";						
		                        else
		                    	    $scope.fileUploadSuccessMsg="In excel file Row Number: "+data+" contains invalid data";
		                    }
		                    
		                }).error(function(data, status) {
		                    console.log("Error ... data: " +data+" status: "+status);
		                    $scope.fileUploadSuccessMsg="Problem ocuured!";
		            });
			   }
			   else{
				   $scope.fileUploadSuccessMsg="file Extension must be ."+allowedFileExtension1+" or ."+allowedFileExtension2+"(Excel File)";
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
			$scope.emailId="";
			$scope.DOB=null;
			$scope.mobile="";
			$scope.designation="";
			$scope.roleId="";
			$scope.deptId="";
			
		}
		
		/*function call to set employee default values*/
		employeeDefaultDetails();
		
		/*function to add single employee details*/
		$scope.addEmployee=function(){
			console.log("email: "+$scope.emailId);
			console.log("emp data entered: "+$scope.empId+" "+$scope.empFirstName+" "+$scope.empLastName+" "+$scope.emailId+" "+$scope.mobile+" "+$scope.designation);
			console.log("condition 1 length >: "+($scope.empId.length > 4 && $scope.empFirstName.length > 2 && $scope.roleId.length >= 1 && $scope.deptId.length >= 1 
					&& $scope.empLastName.length >= 2 && $scope.mobile.length == 10 && $scope.designation.length >= 2 ));
			console.log("too long: "+!($scope.empId.length < 30 && $scope.empFirstName.length <30 && $scope.roleId.length <30 && $scope.deptId.length <30
			&& $scope.empLastName.length <30 && $scope.mobile.length < 30 && $scope.designation.length < 30));
			console.log("mobile len: "+$scope.mobile.length);
			if(($scope.mobile.length != 10) || !$scope.mobile.match(/^[0-9]*$/)){
				console.log("invalid mobile"+$scope.mobile.length+"||"+$scope.mobile.match(/^[0-9]*$/));
				$scope.addEmployeeSuccessMsg="Invalid Mobile Number";
			}
			else if($scope.DOB > new Date() || $scope.DOB == null){
				$scope.addEmployeeSuccessMsg="Invalid Date of Birth";
			}
			else if($scope.empId.length > 4 && $scope.empFirstName.length > 2 && $scope.roleId.length >= 1 && $scope.deptId.length >= 1 
					&& $scope.empLastName.length >= 2 && $scope.designation.length >= 2 ){
			
				if($scope.empId.length < 30 && $scope.empFirstName.length <30 && $scope.roleId.length <30 && $scope.deptId.length <30
						&& $scope.empLastName.length <30 && $scope.mobile.length < 30 && $scope.designation.length < 30 ){
					/*console.log("emp dob: "+$scope.empId+" "+$scope.empFirstName+" "+$scope.empLastName+" "+$scope.DOB);*/
					$scope.addEmployeeSuccessMsg="ok";
					var empObject={employeeId:$scope.empId,firstName:$scope.empFirstName,lastName:$scope.empLastName,dob:null,mobileNo:$scope.mobile,emailId:$scope.emailId,designation:$scope.designation,rollId:$scope.roleId,status:1,deptId:$scope.deptId};
					dateOfBirth=$scope.DOB;
					console.log("date string millies: "+dateOfBirth.getTime());
					if(empObject.emailId != null){
					     var response = $http.post('/EmployeeManagementSystem/addSingleEmployee.do?dob='+$scope.DOB.getTime(),empObject);
				    	 response.success(function(data, status, headers, config) {
				         if(data == -1 ){
				        	 console.log("your session expired--");
				        	 $scope.errorOrSuccessMessageOnPage="Your Session Expired.. Please login again";								   
							  $scope.showAdminDashBoard=false;
							  $scope.showAdminLoginButton=true;
				         }
				    	 else if(data == 1){
				    			 employeeDefaultDetails();
				    			 $scope.addEmployeeSuccessMsg="Employee Successfully Added!";
				    		 }
				    		 else{
				    			 $scope.addEmployeeSuccessMsg="failed! Try Again";
				    		 }

					    });
					    response.error(function(data, status, headers, config) {
						     alert("failure message: " + JSON.stringify({
							    data : data
						    }));
					  });
				}
				else
					 $scope.addEmployeeSuccessMsg="Invalid emailId!";
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
			
			console.log("manually add emp : add emp()");
			
		};
		
		/* ---------- END of  functionality for adding single employee or multiple employees through excel file-----------*/
		
		
	/*	function for redirect to report generation page*/
		$scope.redirectToGenerateReportPAge=function(){
			/*$scope.showAddEmployeeMainDiv=false;	
			$scope.showExcelDiv = false;
			$scope.showManuallyEnterDiv=false;
			$scope.showChangePasswodDivValue=false;
			$scope.showTableDetails=false;	
			$scope.showCharts=false;
			$scope.showAdminChangePasswordDiv=false;
			console.log("redirecting to generate ");
			$scope.showGenerateReportDiv = !$scope.showGenerateReportDiv;
			$scope.showGenerateReportDiv*/
			showOrHideRemainingDivisions("showGenerateReportDiv");
			
			/*$window.location.href="/EmployeeManagementSystem/generateReportHome.do";*/
		}
		
		
		/*function for view/update employeee*/
		$scope.viewOrUpdateEmployee=function(){
			console.log("in viewUser()");
			showOrHideRemainingDivisions("showViewOrUpdateEmployeeDiv");
			/*$scope.viewUserDetails= !$scope.viewUserDetails;*/
			console.log("show view user div: "+$scope.viewUserDetails);
			//$window.location.href="/EmployeeManagementSystem/getAllEmployee";
			
			
			  var totalPersonsArray;
			  var tempArray=[];
			  var paginationStartIndex=0;
			  var paginationStopIndex=10;
			  var numberOfItemsPerPage=10;
			  
			  var editDecisionArray; /* storing show/hide decision for edit */
				 
			  var buttonTextArray; /* storing button text values in this array */
			  
			  var employeeEditArray; /* array for for editing emplyee details */
			  
			  var currentlyEditingEmployeeIndex;
			  
			  /*  variables creation for validation */
			  var editingEmployee=false;
			  var editingEmployeeIndex=-1;
			  
			  /* var employeeObject={employeeId:'121',firstName:'1212',lastName:'1212',dob:'21212',mobileNo:'1212',emailId:'1',designation:'1',rollId:'1',status:'1',deptId:'1'}; */
			  var employeeObject={employeeId:'',firstName:'',lastName:'',dob:'',mobileNo:'',emailId:'',designation:'',rollId:'',status:'',deptId:''};
			  $scope.itemsPerPage=numberOfItemsPerPage;
			  
			  
			  /*  url for data  http://l-lin.github.io/angular-datatables/data.json */
			  /* url for alle employee details  http://localhost:8080//EmployeeManagementSystem/getAllEmployee.do  */
			  var allEmployeeDetails = $http.get('/EmployeeManagementSystem/getAllEmployeeDetails.do');
			  allEmployeeDetails.success(function(data, status, headers, config) {
				    var persons=data;
				    console.log("all emp received: "+persons);
				    totalPersonsArray = persons;
					  $scope.test=persons;
					  $scope.totalPaginationEmployeesCount=persons.length;
					  
					  /* default values for showing text boxes for edit */
				      editDecisionArray=new Array(persons.length);
				      editDecisionArray.fill(false);
				      
				      buttonTextArray=new Array(persons.length);
				      buttonTextArray.fill("Edit");
				      
				      employeeEditArray=new Array(persons.length);
				      employeeEditArray.fill(employeeObject);
				  
				      
				      $scope.editEmp=employeeEditArray;
				      
				      $scope.buttonTextArray=buttonTextArray;
				      
				      $scope.showdecisonArray=editDecisionArray;
					  
					  var stop=(persons.length >= 10) ? 10: persons.length;
					 
					  for(var i=0;i< stop;i++){
						  totalPersonsArray[i].dob=new Date(Date.parse(totalPersonsArray[i].dob));
						 // console.log(" dob: "+totalPersonsArray[i].dob);
						  tempArray[i] = totalPersonsArray[i];
					  }
					  $scope.AllEmployees=tempArray;
					  $scope.numberOfPaginationPages=(persons.length)/$scope.itemsPerPage;
				  
			     });
			  allEmployeeDetails.error(function(data, status, headers, config) {
				     alert("failure message: " + JSON.stringify({
					     data : data
				     }));
			     });
			  
			  /* $resource('http://localhost:8080//EmployeeManagementSystem/getAllEmployee.do').query().$promise.then(function(persons) {
				  totalPersonsArray = persons;
				  $scope.test=persons;
				  $scope.totalPaginationEmployeesCount=persons.length;
				  
				   default values for showing text boxes for edit 
			      editDecisionArray=new Array(persons.length);
			      editDecisionArray.fill(false);
			      
			      buttonTextArray=new Array(persons.length);
			      buttonTextArray.fill("Edit");
			      
			      employeeEditArray=new Array(persons.length);
			      employeeEditArray.fill(employeeObject);
			  
			      
			      $scope.editEmp=employeeEditArray;
			      
			      $scope.buttonTextArray=buttonTextArray;
			      
			      $scope.showdecisonArray=editDecisionArray;
				  
				  var stop=(persons.length >= 10) ? 10: persons.length;
				 
				  for(var i=0;i< stop;i++){
					  totalPersonsArray[i].dob=new Date(Date.parse(totalPersonsArray[i].dob));
					 // console.log(" dob: "+totalPersonsArray[i].dob);
					  tempArray[i] = totalPersonsArray[i];
				  }
				  $scope.AllEmployees=tempArray;
				  $scope.numberOfPaginationPages=(persons.length)/$scope.itemsPerPage;
			  });*/
			 

			/*   $scope.pageChanged = function() {
			    $log.log('Page changed to: ' + $scope.bigCurrentPage);
			  }; */

			  $scope.currentPaginationPage=1;
			  
			  var paginationCurrentPage=1;
			  $scope.chanePagination=function(){
				 
				  if( editingEmployee == true){
					  $scope.currentPaginationPage=paginationCurrentPage;
					  openModalOfEditingEmployee();
				
				  }
				  else if($scope.currentPaginationPage > paginationCurrentPage){
					  paginationCurrentPage=$scope.currentPaginationPage;
					 
					  
					  paginationStartIndex=($scope.currentPaginationPage-1)*$scope.itemsPerPage;
					  paginationStopIndex=$scope.currentPaginationPage*$scope.itemsPerPage;
					  getPaginationNextPage(paginationStartIndex,paginationStopIndex);
					  
				  }
				  else{
					 
					  paginationCurrentPage=$scope.currentPaginationPage;
					  paginationStartIndex=($scope.currentPaginationPage-1)*$scope.itemsPerPage;
					  paginationStopIndex=$scope.currentPaginationPage*$scope.itemsPerPage;
					  getPaginationNextPage(paginationStartIndex,paginationStopIndex);
				
				  }
				  
			  };
			  
			  /* function for getting next pagination page */
			  function getPaginationNextPage(start,stop){
				      console.log("next pagination page preparing ")
				      var pos=0;
				      tempArray=[];

				      stop=(stop <= totalPersonsArray.length)? stop: totalPersonsArray.length;
				      for(var i=start;i<stop;i++){
				    	  totalPersonsArray[i].dob=new Date(Date.parse(totalPersonsArray[i].dob));
					      tempArray[pos++] = totalPersonsArray[i];
				      }
				  

				     $scope.AllEmployees=tempArray;
				     
				  
				  
			  };
			  

			  /* function for number of results per page */
			  $scope.changePaginationDisplayResults=function(){
				  if(editingEmployee == true){
					  $scope.itemsPerPage=numberOfItemsPerPage;
					  openModalOfEditingEmployee();
				  }
				  else{
					  
					  numberOfItemsPerPage=$scope.itemsPerPage;
				      paginationStartIndex=0;
				      paginationStopIndex=$scope.itemsPerPage;
				      $scope.currentPaginationPage=1;
				      $scope.numberOfPaginationPages=(totalPersonsArray.length)/$scope.itemsPerPage;
				      $scope.totalPaginationEmployeesCount=$scope.numberOfPaginationPages*10;
				      getPaginationNextPage(paginationStartIndex,paginationStopIndex);
				      
				  }
				  	  
			  };
			  
			  
			  /* function for edit emplyee */
			  $scope.editEmployee=function(empId,index){
				  
			  	if( editingEmployee == false && editingEmployeeIndex == -1 ){
			  	   editingEmployee = true;
			  	   $scope.disableSearchBoxForEmployee=true;
			  	   editingEmployeeIndex=empId;
			  	   $scope.showdecisonArray[index]= true;
			  	   $scope.buttonTextArray[index]= "Save";
			  	   setEmployeeDetaisForEdit(empId,index);
			  	}
			  	else if( editingEmployee == true && editingEmployeeIndex == empId){
			  		
			  		$scope.disableSearchBoxForEmployee=false;
			  		editingEmployee = false;
			  		editingEmployeeIndex=-1;
			  		$scope.showdecisonArray[index]= false;
			    	$scope.buttonTextArray[index]= "Edit";
			    	var emp=$scope.editEmp[index];
			    	console.log("equal or not: "+angular.equals(emp,totalPersonsArray[currentlyEditingEmployeeIndex]));
			    	totalPersonsArray[currentlyEditingEmployeeIndex]=emp;   
			    	
			    	if(angular.equals(emp,totalPersonsArray[currentlyEditingEmployeeIndex])){   		
			    		var milliseconds=emp.dob.getTime();
			        	emp.dob=emp.dob.getTime();
			        	
			    	    var updateEmployee = $http.post('/EmployeeManagementSystem/updateEmployee.do?dob='+milliseconds,emp);
			    	    updateEmployee.success(function(data, status, headers, config) {
						    $log.info("received data: "+data);
						    emp.dob=new Date(milliseconds);
					     });
			    	     updateEmployee.error(function(data, status, headers, config) {
						     alert("failure message: " + JSON.stringify({
							     data : data
						     }));
					      });
			    	     
			    	}
			     
			    	getPaginationNextPage(paginationStartIndex,paginationStopIndex);
			    	
			  	}
			  	else{
			  		
			  		$scope.disableSearchBoxForEmployee=true;
			  		
			  		openModalOfEditingEmployee();

			  	}//else -close

			  };//edit employee --close
			  
			  
			  /* function for cancel edit employee */
			  $scope.cancelEditEmployee=function(employeeId,index){
				    console.log("cancel editing  index: "+index);
				    $scope.disableSearchBoxForEmployee=false;
					editingEmployee = false;
					editingEmployeeIndex=-1;
					$scope.showdecisonArray[index]= false;
			  	    $scope.buttonTextArray[index]= "Edit";

			  }

			  
			  
			  /* functions for sorting */
			  
			  $scope.sort = function(keyname){
			      $scope.sortKey = keyname;   //set the sortKey to the param passed
			      $scope.reverse = !$scope.reverse; //if true make it false and vice versa
			  };
			  
			  
			  /* function  for prinnting view Employee division */
			  
			  $scope.printViewEmployeeDiv=function(){	  
				
				  console.log("print function called..");
				  if( editingEmployee == true){
					  openModalOfEditingEmployee();
				  }
				  else{
				      var printContents = document.getElementById("viewEmployeeDetails").innerHTML;
			          var originalContents = document.body.innerHTML;
			          document.body.innerHTML = printContents;
			          window.print();
			          document.body.innerHTML = originalContents;
			      
				  }
			      
			  };
			  
			  
			  
			 /*  function for showing modal for currently editing employee */
			  function openModalOfEditingEmployee(){
				  
				  
				  var modalInstance = $uibModal.open({
				        animation: true,
				        templateUrl: 'AlredyEditingEmployee.html',
				        controller: 'CurrentlyEditingEmployeeController',
				        size: 'sm',
				        resolve: {
				          currentEmployeeId :function(){ 
				        	 
				        	  return totalPersonsArray[currentlyEditingEmployeeIndex].employeeId}
				        }
				      });

				      modalInstance.result.then(function (result) {
				    	 console.log("successs");
				      }, function (val) {
				 
				        $log.info('Modal dismissed at: ' + new Date());
				      });
			  };
			  
			  /* function to set edit employee details */
			  function setEmployeeDetaisForEdit(empId,index){
			 
				 currentlyEditingEmployeeIndex=getEmployeeDetailsForEdit(paginationStartIndex,paginationStopIndex,empId);
				 var emp=totalPersonsArray[currentlyEditingEmployeeIndex];
				 var employeeObject={employeeId:emp.employeeId,firstName:emp.firstName,
						 lastName:emp.lastName,dob:emp.dob,mobileNo:emp.mobileNo,emailId:emp.emailId,designation:emp.designation,rollId:emp.rollId,status:emp.status,deptId:emp.deptId};
				 $scope.editEmp[index]=employeeObject;  	
			      
			  };
			  
			  /* function to get employee details for edit */
			  function getEmployeeDetailsForEdit(start,stop,empId){
				  
				  stop=(stop <= totalPersonsArray.length)? stop: totalPersonsArray.length;
				  for(var i=start;i< stop;i++){
					  
					  if(totalPersonsArray[i].employeeId == empId){
						  
						  return i;
					  }
				  }
				  
			  };

			
		};
		
		/*function for admin change password*/
		$scope.adminChangePasswordDivEnable=function(){
			
			$scope.showAdminChangePasswordDiv=!$scope.showAdminChangePasswordDiv;
			$scope.showCharts=false;
			   $scope.currentpassword=undefined;
			   $scope.password=undefined;
			   $scope.repassword=undefined;
			   $scope.pwd=false;
	    	   $scope.repwd=false;
			showOrHideRemainingDivisions("showAdminChangePasswordDiv");
		}
		
		/* $scope.changeAdminPassword=function(){
			
			if($scope.cpwd!=null  && $scope.npwd!=null && $scope.rpwd!=null)
			{
				if($scope.cpwd.length < 3 || $scope.npwd.length < 3 || $scope.rpwd.length < 3 ){
					$scope.changePasswordSuccessMsg="Please fill all fields with minimum 3 characters";
				}
				else if($scope.cpwd!=$scope.npwd)
				{
					if($scope.npwd==$scope.rpwd )
					{
		               console.log(" ok -changing password");
						$scope.changePasswordSuccessMsg="";
							$http({
							method : 'POST',
							url : 'changePassword.do?cpwd='+$scope.cpwd+'&&npwd='+$scope.npwd	            	            
						   }).success(function(data, status, headers, config) {	     
								//$scope.hide=true;
							   console.log("data returned from change password:"+data);
							   if(data == "sessionExpired!"){
								   $scope.errorOrSuccessMessageOnPage="Your Session Expired.. Please login again";								   
								   $scope.showAdminDashBoard=false;
								   $scope.showAdminLoginButton=true;
								   $scope.cpwd="";
								   $scope.npwd='';
								   $scope.rpwd='';
                                   console.log(" session expired -- login again--");
							   }
							   else if(data == 1){
								   $scope.errorOrSuccessMessageOnPage="Password Successfully changed .. Please login with new Password";
								   $scope.showAdminChangePasswordDiv=false;
								   $scope.showAdminDashBoard=false;
								   $scope.showAdminLoginButton=true;
								   $scope.cpwd="";
								   $scope.npwd='';
								   $scope.rpwd='';
								   console.log(" password changed  -- login again--");
							   }
							   else{
								  $scope.changePasswordSuccessMsg=(data == 0)? "Your Current password is wrong":"problem occured try again!" ;
								  console.log("password change response:"+data);
								  $scope.cpwd="";
								  $scope.npwd='';
								  $scope.rpwd='';
						      }
								//$scope.msg=request.getParametersByName("status") ;	    	    	
		                   }).error(function(data, status, headers, config) {
		    	              $scope.hide=true;
		    	              $scope.msg1="Some internal problem occured try again.";
		    	   
		                  });
				}
			    else{
				  $scope.changePasswordSuccessMsg="new password and confirm password must Match";
			    }
		     }
			 else{
				$scope.changePasswordSuccessMsg="current password and new password should not be same";
			}
		 }
		else
		{
			$scope.changePasswordSuccessMsg="fields should not be empty";
		}
		}
		*/
		
	  /* END -----  function for admin change password    --- END */
		
		//generate report js code
		$scope.totalItems = 0;
		$scope.viewby = 5;
		$scope.currentPage = 1;
		$scope.itemsPerPage = $scope.viewby;
		$scope.maxSize = 5;
		
		var total = 0;
		var selected = 0;
		$scope.employeeids = [];
		$scope.hide1 = true;
		$scope.hide2 = true;
		$scope.hide3 = true;
		$scope.hide11 = true;
		$scope.hide12 = true;
		$scope.newhide1 = true;
		$scope.getCheck = function() {
			if ($scope.id.length == 0) {
				$scope.employeeids = [];
			}
			if ($scope.id.length == 1
					&& $scope.employeeids.length == 0) {
				$http({
		             method : 'POST',
		             url : 'getAutoCompleteInfo.do?employeeId='+$scope.id
		                  
		     }).success(function(data, status, headers, config) {
		    	 angular.forEach(data, function(value, key){
		    		  $scope.employeeids.push(value+"");
		    		 
		    	 });
	  }).error(function(data, status, headers, config) {
	 	 $scope.result ="error occured due to internal proble please try again id auto" ;
	 	 });
			}
		};

		$scope.getDis = function() {
			if ($scope.sel == "all") {

				$scope.f1 = true;
			} else {
				$scope.f1 = false;
			}
		};

		/* selecting report type */

		$scope.getStatu = function() {
			if ($scope.sel1 == "none") {
				$scope.hide12 = true;
				$scope.hide11 = true;

			} else if ($scope.sel1 == "day") {
				$scope.hide12 = true;
				$scope.hide11 = false;
			} else if ($scope.sel1 == "dates") {
				$scope.hide11 = false;
				$scope.hide12 = false;

			}
		};

		$scope.setItemsPerPage = function(num) {
			$scope.itemsPerPage = num;
			$scope.currentPage = 1; // reset to first paghe
		};

		$scope.getAttendance = function() {
			/*
			 * select "Single" employee records based on
			 * conditions
			 */
			if ($scope.sel == "single") {

				if ($scope.id != null) {

					/* if we search employee by id */
					if ($scope.id.match(/^[0-9]*$/)) {

						/*
						 * when you select "Total Records"
						 * it will select all records of
						 * single employee (search type is
						 * id)
						 */
						if ($scope.sel1 == "none") {
							total=0;
				            selected=0;
				            
						 $http({
				             method : 'POST',
				             url : 'getReportById.do?employeeId='+$scope.id
				          
				            
				     }).success(function(data, status, headers, config) {
												if (data.length != 0) {
													$scope.singleEmpReportEmpId=data.empId;
										             $scope.singleEmpReportEmpName=data.empName;
										             $scope.singleEmpReportEmpDesignation=data.empDesignation;
										             var attendanceDetails=data.employeeReport;
													$scope.hide1 = false;
													$scope.hide2 = false;
													$scope.newhide1 = false;
													$scope.hide4 = true;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.totalItems = attendanceDetails.length;
													for (var i = 0; i < attendanceDetails.length; i++) {

														var milliseconds = attendanceDetails[i].attendanceDate;
														var milliseconds1 = attendanceDetails[i].startTime;
														var milliseconds2 = attendanceDetails[i].endTime;
														var date = new Date(
																milliseconds);
														var date1 = new Date(
																milliseconds1);
														var date2 = new Date(
																milliseconds2);
														attendanceDetails[i].attendanceDate = date;
														attendanceDetails[i].startTime = date1;
														attendanceDetails[i].endTime = date2;
														total = total + 9;
														selected = selected
																+ attendanceDetails[i].workingHours;
													}
													$scope.totalhours = total;
													$scope.selectedhours = selected;
													$scope.ats = attendanceDetails;
												} else {
													$scope.color1 = "red";
													$scope.hide1 = true;
													$scope.hide2 = true;
													$scope.hide4 = false;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.newhide1 = true;
												}

											
							 }).error(function(data, status, headers, config) {
												$scope.hide1 = true;
												$scope.hide2 = true;
												$scope.hide3 = true;
												$scope.res = false;
												$scope.newhide1 = true;
												$scope.result = "error occured due to some internal problem please try again none.";
											});
						}/* Total Records */

						/*
						 * when you select "Day" it will
						 * select that particular day
						 * records of specified employee
						 * (search type is id)
						 */
						else if ($scope.sel1 == "day") {
							total=0;
				            selected=0;
				            $http({
						           method : 'POST',
						             url :'getReportByIdAndDate.do?employeeId=' + $scope.id+ '&attendanceDate=' +$scope.from.getTime()
				            }).success(function(data, status, headers, config) {
												if (data.length != 0) {
													 $scope.singleEmpReportEmpId=data.empId;
										             $scope.singleEmpReportEmpName=data.empName;
										             $scope.singleEmpReportEmpDesignation=data.empDesignation;
										             var attendanceDetails=data.employeeReport;
													$scope.hide1 = false;
													$scope.hide2 = false;
													$scope.newhide1 = false;
													$scope.hide4 = true;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.totalItems = attendanceDetails.length;
													for (var i = 0; i < attendanceDetails.length; i++) {

														var milliseconds = attendanceDetails[i].attendanceDate;
														var milliseconds1 = attendanceDetails[i].startTime;
														var milliseconds2 = attendanceDetails[i].endTime;
														var date = new Date(
																milliseconds);
														var date1 = new Date(
																milliseconds1);
														var date2 = new Date(
																milliseconds2);
														attendanceDetails[i].attendanceDate = date;
														attendanceDetails[i].startTime = date1;
														attendanceDetails[i].endTime = date2;
														total = total + 9;
														selected = selected
																+ attendanceDetails[i].workingHours;

													}
													$scope.totalhours = total;
													$scope.selectedhours = selected;
													$scope.ats = attendanceDetails;
												} else {
													$scope.color1 = "red";
													$scope.hide1 = true;
													$scope.hide2 = true;
													$scope.hide4 = false;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.newhide1 = true;
												}
				            }).error(function(data, status, headers, config) {
												$scope.hide1 = true;
												$scope.hide2 = true;
												$scope.hide3 = true;
												$scope.res = false;
												$scope.newhide1 = true;
												$scope.hide4 = true;
												$scope.result = "error occured due to some internal problem please try again day.";
											});

						}/* end of day */

						/*
						 * when you select "From and To
						 * date" it will select that
						 * particular day records of
						 * specified employee (search type
						 * is id)
						 */
						else if ($scope.sel1 == "dates") {
							total=0;
				            selected=0;
				            $http({
					             method : 'GET',
					             url : 'getReportByIdFromDateToDate.do?employeeId='+$scope.id+'&fromDate='+$scope.from.getTime()+'&toDate='+$scope.to.getTime()
				            }).success(function(data, status, headers, config) {
												if (data.length != 0) {
													 $scope.singleEmpReportEmpId=data.empId;
										             $scope.singleEmpReportEmpName=data.empName;
										             $scope.singleEmpReportEmpDesignation=data.empDesignation;
										             var attendanceDetails=data.employeeReport;
													$scope.hide1 = false;
													$scope.hide2 = false;
													$scope.newhide1 = false;
													$scope.hide4 = true;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.totalItems = attendanceDetails.length;
													for (var i = 0; i < attendanceDetails.length; i++) {

														var milliseconds = attendanceDetails[i].attendanceDate;
														var milliseconds1 = attendanceDetails[i].startTime;
														var milliseconds2 = attendanceDetails[i].endTime;
														var date = new Date(
																milliseconds);
														var date1 = new Date(
																milliseconds1);
														var date2 = new Date(
																milliseconds2);
														attendanceDetails[i].attendanceDate = date;
														attendanceDetails[i].startTime = date1;
														attendanceDetails[i].endTime = date2;
														total = total + 9;
														selected = selected
																+ attendanceDetails[i].workingHours;

													}
													$scope.totalhours = total;
													$scope.selectedhours = selected;
													$scope.ats = attendanceDetails;
												} else {
													$scope.color1 = "red";
													$scope.hide1 = true;
													$scope.hide2 = true;
													$scope.hide4 = false;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.newhide1 = true;
												}
				            }).error(function(data, status, headers, config) {
												$scope.hide1 = true;
												$scope.hide2 = true;
												$scope.hide3 = true;
												$scope.res = false;
												$scope.newhide1 = true;
												$scope.hide4 = true;
												$scope.result = "error occured due to some internal problem please try again dates.";
											});

						}/* end of from date and to date */

					}/* end of Id */

					/* if select employee by name */
					else {

						/*
						 * when you select Total Records it
						 * will select all records of single
						 * employee (search type is name)
						 */
						if ($scope.sel1 == "none") {
							total=0;
				            selected=0;
				            $http({
					             method : 'POST',
					             url : 'getReportByName.do?employeeId='+$scope.id
				            }).success(function(data, status, headers, config) {
												if (data.length != 0) {
													 $scope.singleEmpReportEmpId=data.empId;
										             $scope.singleEmpReportEmpName=data.empName;
										             $scope.singleEmpReportEmpDesignation=data.empDesignation;
										             var attendanceDetails=data.employeeReport;
													$scope.hide1 = false;
													$scope.hide2 = false;
													$scope.newhide1 = false;
													$scope.hide4 = true;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.totalItems = attendanceDetails.length;
													for (var i = 0; i < attendanceDetails.length; i++) {

														var milliseconds = attendanceDetails[i].attendanceDate;
														var milliseconds1 = attendanceDetails[i].startTime;
														var milliseconds2 = attendanceDetails[i].endTime;
														var date = new Date(
																milliseconds);
														var date1 = new Date(
																milliseconds1);
														var date2 = new Date(
																milliseconds2);
														attendanceDetails[i].attendanceDate = date;
														attendanceDetails[i].startTime = date1;
														attendanceDetails[i].endTime = date2;
														total = total + 9;
														selected = selected
																+ attendanceDetails[i].workingHours;

													}
													$scope.totalhours = total;
													$scope.selectedhours = selected;
													$scope.ats = attendanceDetails;
												} else {
													$scope.color1 = "red";
													$scope.hide1 = true;
													$scope.hide2 = true;
													$scope.hide4 = false;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.newhide1 = true;
												}

				            }).error(function(data, status, headers, config) {
												$scope.hide1 = true;
												$scope.hide2 = true;
												$scope.hide3 = true;
												$scope.res = false;
												$scope.newhide1 = true;
												$scope.hide4 = true;
												$scope.result = "error occured due to some internal problem please try again none.";
											});
						}/* none */

						/*
						 * when you select Day it will
						 * select that particular day
						 * records of specified employee
						 * (search type is name)
						 */
						else if ($scope.sel1 == "day") {
							total=0;
				            selected=0;
				            $http({
					             method : 'POST',
					             url : 'getReportByNameDay.do?employeeId=' + $scope.id+ '&attendanceDate=' + $scope.from.getTime()
				            }).success(function(data, status, headers, config) {
												if (data.length != 0) {
													 $scope.singleEmpReportEmpId=data.empId;
										             $scope.singleEmpReportEmpName=data.empName;
										             $scope.singleEmpReportEmpDesignation=data.empDesignation;
										             var attendanceDetails=data.employeeReport;
													$scope.hide1 = false;
													$scope.hide2 = false;
													$scope.newhide1 = false;
													$scope.hide4 = true;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.totalItems = attendanceDetails.length;
													for (var i = 0; i < attendanceDetails.length; i++) {

														var milliseconds = attendanceDetails[i].attendanceDate;
														var milliseconds1 = attendanceDetails[i].startTime;
														var milliseconds2 = attendanceDetails[i].endTime;
														var date = new Date(
																milliseconds);
														var date1 = new Date(
																milliseconds1);
														var date2 = new Date(
																milliseconds2);
														attendanceDetails[i].attendanceDate = date;
														attendanceDetails[i].startTime = date1;
														attendanceDetails[i].endTime = date2;
														total = total + 9;
														selected = selected
																+ attendanceDetails[i].workingHours;

													}
													$scope.totalhours = total;
													$scope.selectedhours = selected;
													$scope.ats = attendanceDetails;
												} else {
													$scope.color1 = "red";
													$scope.hide1 = true;
													$scope.hide2 = true;
													$scope.hide4 = false;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.newhide1 = true;
												}

				            }).error(function(data, status, headers, config) {
												$scope.hide1 = true;
												$scope.hide2 = true;
												$scope.hide3 = true;
												$scope.res = false;
												$scope.newhide1 = true;
												$scope.hide4 = true;
												$scope.result = "error occured due to some internal problem please try again day.";
											});

						}/* day */

						/*
						 * when you select From and To Date
						 * it will select the records with
						 * in mentioned date of particular
						 * employee (search type is name)
						 */
						else if ($scope.sel1 == "dates") {
							total=0;
				            selected=0;
				            $http({
					             method : 'POST',
					             url : 'getReportByNameBetweenDates.do?employeeId=' + $scope.id+ '&fromDate=' + $scope.from.getTime() + '&toDate=' + $scope.to.getTime()
				            }).success(function(data, status, headers, config) {
												if (data.length != 0) {
													 $scope.singleEmpReportEmpId=data.empId;
										             $scope.singleEmpReportEmpName=data.empName;
										             $scope.singleEmpReportEmpDesignation=data.empDesignation;
										             var attendanceDetails=data.employeeReport;
													$scope.hide1 = false;
													$scope.hide2 = false;
													$scope.newhide1 = false;
													$scope.hide4 = true;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.totalItems = attendanceDetails.length;
													for (var i = 0; i < attendanceDetails.length; i++) {

														var milliseconds = attendanceDetails[i].attendanceDate;
														var milliseconds1 = attendanceDetails[i].startTime;
														var milliseconds2 = attendanceDetails[i].endTime;
														var date = new Date(
																milliseconds);
														var date1 = new Date(
																milliseconds1);
														var date2 = new Date(
																milliseconds2);
														attendanceDetails[i].attendanceDate = date;
														attendanceDetails[i].startTime = date1;
														attendanceDetails[i].endTime = date2;
														total = total + 9;
														selected = selected
																+ attendanceDetails[i].workingHours;

													}
													$scope.totalhours = total;
													$scope.selectedhours = selected;
													$scope.ats = attendanceDetails;
												} else {
													$scope.color1 = "red";
													$scope.hide1 = true;
													$scope.hide2 = true;
													$scope.hide4 = false;
													$scope.res = true;
													$scope.hide3 = true;
													$scope.newhide1 = true;
												}

				            }).error(function(data, status, headers, config) {
												$scope.hide1 = true;
												$scope.hide2 = true;
												$scope.hide3 = true;
												$scope.hide4 = true;
												$scope.res = false;
												$scope.newhide1 = true;
												$scope.result = "error occured due to some internal problem please try again dates.";
											});

						}

					}

				}/* not null */
				else {
					$scope.hide1 = true;
					$scope.hide2 = true;
					$scope.hide3 = true;
					$scope.newhide1 = true;
					$scope.res = false;
					$scope.result = "if you select single id field should not be empty.";
				}
			}

			/*
			 * when Select Type is "ALL" it will select the
			 * records of all employee based on conditions
			 */
			// ALL
			else {

				/*
				 * when you select "Total Records" it will
				 * select all records of all employees
				 */
				if ($scope.sel1 == "none") {
					total=0;
		            selected=0;
		            $http({
			             method : 'POST',
			             url : 'getAllEmployeesWorkingDetails.do'
		            }).success(function(data, status, headers, config) {
										if (data.length != 0) {
											$scope.hide1 = true;
											$scope.hide2 = true;
											$scope.hide4 = true;
											$scope.res = true;
											$scope.hide3 = false;
											$scope.newhide1 = false;
											$scope.totalItems = data.length;
											for (var i = 0; i < data.length; i++) {

												var milliseconds = data[i].attendanceDate;
												var milliseconds1 = data[i].startTime;
												var milliseconds2 = data[i].endTime;
												var date = new Date(
														milliseconds);
												var date1 = new Date(
														milliseconds1);
												var date2 = new Date(
														milliseconds2);
												data[i].attendanceDate = date;
												data[i].startTime = date1;
												data[i].endTime = date2;
												total = total + 9;
												selected = selected
														+ data[i].workingHours;

											}
											$scope.totalhours = total;
											$scope.selectedhours = selected;
											$scope.ats1 = data;
										} else {
											$scope.color1 = "red";
											$scope.hide1 = true;
											$scope.hide2 = true;
											$scope.hide4 = false;
											$scope.res = true;
											$scope.hide3 = true;
											$scope.newhide1 = true;
										}

		            }).error(function(data, status, headers, config) {
										$scope.hide1 = true;
										$scope.hide2 = true;
										$scope.hide3 = true;
										$scope.hide4 = true;
										$scope.res = false;
										$scope.newhide1 = true;
										$scope.result = "error occured due to some internal problem please try again all none.";
									});

				}/* end of Total Records */

				/*
				 * when you select "Day" it will select that
				 * particular day records of all employees
				 */
				else if ($scope.sel1 == "day") {
					total=0;
		            selected=0;
		            $http({
			             method : 'POST',
			             url : 'getAllEmployeesReportByDate.do?attendanceDate='+ $scope.from.getTime()
		            }).success(function(data, status, headers, config) {
										if (data.length != 0) {
											$scope.hide1 = true;
											$scope.hide2 = true;
											$scope.hide4 = true;
											$scope.res = true;
											$scope.hide3 = false;
											$scope.newhide1 = false;
											$scope.totalItems = data.length;
											for (var i = 0; i < data.length; i++) {

												var milliseconds = data[i].attendanceDate;
												var milliseconds1 = data[i].startTime;
												var milliseconds2 = data[i].endTime;
												var date = new Date(
														milliseconds);
												var date1 = new Date(
														milliseconds1);
												var date2 = new Date(
														milliseconds2);
												data[i].attendanceDate = date;
												data[i].startTime = date1;
												data[i].endTime = date2;
												total = total + 9;
												selected = selected
														+ data[i].workingHours;

											}
											$scope.totalhours = total;
											$scope.selectedhours = selected;
											$scope.ats1 = data;
										} else {
											$scope.color1 = "red";
											$scope.hide1 = true;
											$scope.hide2 = true;
											$scope.hide4 = false;
											$scope.res = true;
											$scope.hide3 = true;
											$scope.newhide1 = true;
										}

		            }).error(function(data, status, headers, config) {
										$scope.hide1 = true;
										$scope.hide2 = true;
										$scope.hide3 = true;
										$scope.hide4 = true;
										$scope.res = false;
										$scope.newhide1 = true;
										$scope.result = "error occured due to some internal problem please try again all day.";
									});
				}/* day */

				/*
				 * when you select "From and To Date" it
				 * will select the records with in mentioned
				 * date of all employees
				 */
				else if ($scope.sel1 == "dates") {
					total=0;
		            selected=0;
		            $http({
			             method : 'POST',
			             url : 'getEmployeesReportBetweenDates.do?fromDate='+ $scope.from.getTime() + '&toDate=' + $scope.to.getTime()
		            }).success(function(data, status, headers, config) {
										if (data.length != 0) {
											$scope.hide1 = true;
											$scope.hide2 = true;
											$scope.hide4 = true;
											$scope.res = true;
											$scope.hide3 = false;
											$scope.newhide1 = false;
											$scope.totalItems = data.length;
											for (var i = 0; i < data.length; i++) {

												var milliseconds = data[i].attendanceDate;
												var milliseconds1 = data[i].startTime;
												var milliseconds2 = data[i].endTime;
												var date = new Date(
														milliseconds);
												var date1 = new Date(
														milliseconds1);
												var date2 = new Date(
														milliseconds2);
												data[i].attendanceDate = date;
												data[i].startTime = date1;
												data[i].endTime = date2;
												total = total + 9;
												selected = selected
														+ data[i].workingHours;

											}
											$scope.totalhours = total;
											$scope.selectedhours = selected;
											$scope.ats1 = data;
										} else {
											$scope.color1 = "red";
											$scope.hide1 = true;
											$scope.hide2 = true;
											$scope.hide4 = false;
											$scope.res = true;
											$scope.hide3 = true;
											$scope.newhide1 = true;
										}

		            }).error(function(data, status, headers, config) {
										$scope.hide1 = true;
										$scope.hide2 = true;
										$scope.hide3 = true;
										$scope.hide4 = true;
										$scope.res = false;
										$scope.newhide1 = true;
										$scope.result = "error occured due to some internal problem please try again dates all dates.";
									});
				}
			}
		};
		
		
		/*function for adding new Administrator
		
		$scope.addNewAdministratorDivEnable=function(){
			
			
		}*/
		
		/*  END--- function for adding new Administrator ---- END*/

	});// end of main controlller --
	
	

	/* controller to display Date and Time */
	app.controller('timeController', [ '$scope', function($scope) {
		$scope.format = 'd/M/yy h:mm:ss a';
	} ]);

	app.directive("myCurrentTime", function(dateFilter) {
		return function(scope, element, attrs) {
			var format;

			scope.$watch(attrs.myCurrentTime, function(value) {
				format = value;
				updateTime();
			});

			function updateTime() {
				var dt = dateFilter(new Date(), format);
				element.text(dt);
			}

			function updateLater() {
				setTimeout(function() {
					updateTime(); // update DOM
					updateLater(); // schedule another update
				}, 1000);
			}

			updateLater();
		}
	});// END of controller to display Date and Time
	
	
	
	/*this controlller is for showing admin login page as modal*/
	angular.module('ui.ems.app').controller('AdminLoginController', function ($scope,$http, $uibModalInstance) {
		 
		 var usernameFlag;	 
		 var passwordFlag;	
		 var adminIdLength=6;
		 var passwordLength=4;
		 
		 $scope.showforgotPasswordDiv=false;
		 
		 $scope.adminForgotPassword=function(){
			 console.log(" forgot password : ");
			 $scope.showforgotPasswordDiv=!$scope.showforgotPasswordDiv;
		 }
		 
		 /* function to set default values */
		 function setDefaultValues(){
			 
		     usernameFlag =false;
		     passwordFlag =false;
		     $scope.loginButtonDisable=true;
		     $scope.adminPasswordType="password";

		     $scope.showPassword=false;
		  
		     $scope.userNamePropoverMsg="";
		     $scope.passwordPropoverMsg="";
		     
		 }
		 
		 /* function call to set default values */
		  setDefaultValues();
		 
		 /* function for show password */
		  $scope.showAdminPassword=function(){
			  
			  $scope.adminPasswordType=($scope.showPassword)?"text":"password";
		  };
		  
		  /* function for admin id validation */
		  $scope.AdminIdValidation=function(){
			  $scope.enablePasswordPropover=false;
			  if($scope.Admin.userName.match(/^[0-9]*$/)){
			     if($scope.Admin.userName.length != adminIdLength){
			       $scope.enableUsernamePropover=true;
			       $scope.userNamePropoverMsg="Admin Id length must be "+adminIdLength;
			       $scope.loginButtonDisable=true;
			       usernameFlag=false;
			     }
			     else {
			    	 usernameFlag=true;
			    	 $scope.enableUsernamePropover=false;
			    	 $scope.userNamePropoverMsg="ok";
				    
			     }
			  }
			  else{
		
				  usernameFlag=false;
				  $scope.loginButtonDisable=true;
				  $scope.enableUsernamePropover=true;
			      $scope.userNamePropoverMsg="Only Digits allowed";
			      
			      
			  }
			  if( usernameFlag==true && passwordFlag==true){
				  $scope.loginButtonDisable=false;
			  }
		  };
		  
		  /* function for validation admin password */
		  $scope.passwordValidation=function(){
			  $scope.enableUsernamePropover=false;
			if($scope.Admin.password.length < passwordLength){
				$scope.passwordPropoverMsg="password contains atleast "+passwordLength+" charecters";
				$scope.enablePasswordPropover=true;
				$scope.loginButtonDisable=true;
				passwordFlag=false;
				
			}
			else{
				$scope.enablePasswordPropover=false;
				$scope.passwordPropoverMsg="ok";
				passwordFlag=true;
			}
			if( usernameFlag== true && passwordFlag== true){
				  $scope.loginButtonDisable=false;
			  }
			console.log("$scope.enablePasswordPropover=:  "+$scope.enablePasswordPropover);
		  };
		  
		 /*  function for reset password button */
		 $scope.resetAdminLogin=function(){

			   $scope.Admin.userName='';
		       $scope.Admin.password='';
	           setDefaultValues();
	           
		 } ;//resetAdminLogin()--close
		 
		/*  function for forgot password hyper link
		 $scope.AdminForgotPassword=function(){
			 
			 console.log("forgot password function");
		 };*/
		 
		/* function for admin login button */ 
		$scope.AdminLogin=function(){
			
			var adminObj={adminId:$scope.Admin.userName,password:$scope.Admin.password};
			var adminLogin = $http.post('/EmployeeManagementSystem/adminLogin.do',adminObj);
			adminLogin.success(function(data, status, headers, config) {
				if(data == 1){
					console.log("successfully logged in");
					$uibModalInstance.close(true);
				}
				else{
					$scope.adminLoginSuccessMsg=(data == -1)? "Invalid AdminId":"Wrong Password";
					console.log("loginn failed");
				}
			});
			adminLogin.error(function(data, status, headers, config) {
				alert("failure message: " + JSON.stringify({
					data : data
				}));
			});
			
		};//admonLogin()--close
		
		/*function to close modal*/
		$scope.closeModal=function(){
			
			$uibModalInstance.dismiss('cancel');
		}
		
	/*	function for Admin forgot Password */
		
		$scope.submitDetails=function(){
			
			console.log("email entered: "+$scope.email);
			
			
		}
		
		/* code for forgot password page function */
		
		$scope.getForgotPassword=function()
		{
			alert("forgot");
			$http(
					{
						method : 'post',
						url : 'forgotPasswordHome.do?id='
								+ $scope.adminid + "&email="
								+ $scope.email

					})
					.success(
							function(data, status, headers,	config) {
								if(data=="Password sent to  your mail, please check your mail"){
								$scope.hide1=true;
								$scope.successmsg =data;
								}
								else{
									$scope.failedmsg=data;
								}
							})
					.error(
							function(data, status, headers,
									config) {

								$scope.failedmsg = "Some internal problem occured try again.";
	   	      	});
			
		}; 

		  /**  
		   * Function to show all employees detail in excel sheet format
		   */
		  $scope.showExcel=function(){
				console.log("in showExcel()");
				$window.location.href="/EmployeeManagementSystem/getExcel";
		  };
		
	/*  END ---	function for forgot Password ------END ---*/
		  /*function  for prinnting view Employee division*/
		     
		     $scope.printViewEmployeeDiv=function(){   
		    
		      console.log("print function called..");
		      if( editingEmployee == true){
		       openModalOfEditingEmployee();
		      }
		      else{
		          var printContents = document.getElementById("viewEmployeeDetails").innerHTML;
		             var originalContents = document.body.innerHTML;
		             document.body.innerHTML = printContents;
		             window.print();
		             document.body.innerHTML = originalContents;
		         
		      }
		         
		     };
		
		
	/*  END ---	function for forgot Password ------END ---*/
		
		
 });//ModalInstanceCtrl   for Admin Login--close
	
app.controller('CurrentlyEditingEmployeeController', function ($scope, $uibModalInstance,currentEmployeeId) {
		
		$scope.currentlyEditingEmployee=currentEmployeeId;
		$scope.closeModal=function(){
		
		   $uibModalInstance.close(true);
		}
		
	});