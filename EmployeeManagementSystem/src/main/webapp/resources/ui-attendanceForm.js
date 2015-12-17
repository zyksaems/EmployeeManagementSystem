

var app = angular.module('ui.ems.app', ['ngAnimate', 'ui.bootstrap']);
	app.controller('ValidController', function($scope, $http,$window,$uibModal, $log) {
		
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
		 };//showAdminLoginModal()--close

			 
		  
		  
		/*creating variables for employee intime/out time functionality*/

		var employeeIdLength = 6;
		var json = [{empId:111111}];
		var jsonLoggedIn = [];
		var jsonLoggedOut = [];
		var EmployeeName="hhhhhhh";
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

			} else {
				$scope.cssClass = "error";
				$scope.showInvalidMsg = false;
				$scope.buttonDisable = true;

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

		/*  function to click the admin-login button */
		$scope.AdminButton = function() {
		
			/*$scope.showAttendanceForm=false;
			$scope.adminId='';
			$scope.adminPassword='';	*/	
			$window.location.href="/EmployeeManagementSystem/adminLogin.do";

		};
		
		/* function to check admin values (length)*/
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
			
		};
		
		
		/* fuction to check credentials of admin  */
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
				   /* alert("invalid AdminID");*/
				    $scope.adminInvalidMsg="Invalid AdminID";
			    });
			}
			
			
		};
		
		/*logOut function */
		$scope.showCharts=true;
		$scope.showTable=true;
		$scope.logOut=function(){
			
			var adminLogout = $http.get('/EmployeeManagementSystem/adminLogout.do');
			adminLogout.success(function(data, status, headers, config) {
			
		    	if(data == 1){
		    		console.log("log out success");
		    		
		    	
		    	}
		    	else{
		        console.log("logout failed");    
				}
			    console.log("reply from admin login: "+data);

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
		for(var i=0;i<allAbsentEmpData.length;i++){
			console.log("  absent "+i+"  details: "+allAbsentEmpData[i].employee_id);
			
		}
		for(var i=0;i<allAbsentEmpData.length;i++){
			console.log("  absent "+i+"  details: "+allAbsentEmpData[i].employee_id);
			
		}
		
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
		    	        	$scope.listName="Present Employees";
		    	        	$scope.persons=todayAttendancePieDetails;				   
		   		
		   			    }
		   			    if(activePoints[0].label=='Aubsent'){
		   			 	$("#showChart").hide();
	    	        	$scope.showTableDetails=true;
	    	        	$scope.listName="Absent Employees";
		   			    	$scope.persons=allAbsentEmpData;	
		   			    	
		   			    }			   
		   			   		
		   			  
		    
			}	
		
		
		/*function for displaying pie chart*/
		function displayPieChart(numberOfPresetiesForPie,numberOfAbsentiesForPie){
			
			$scope.showTableDetails=false;	
			$scope.showTable=false;
			$("#showChart").show();
		
			$("#canvas-holder").show();
			$("#pieLegend").show();
			
    		$("#bar-holder").hide();
    		$("#barLegend").hide();
    		
    		$("#line-holder").hide();
    		$("#lineLegend").hide();
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
    							label: "Aubsent",
    							name:"a"
    						}
    					   ];
    		var options = {}
    		
    		var ctx = document.getElementById("pieChart").getContext("2d");
    		window.myPie = new Chart(ctx).Pie(pieData,options);
    		document.getElementById('pieLegend').innerHTML = myPie.generateLegend();
    		$scope.legend = Pie.generateLegend();
    		
    		var activePoints = myPie.getSegmentsAtEvent(event);
    		
			
		};
		
		
		
		
		/*for display Bar chart*/
		$scope.showBar=function(){
			
			$scope.showTable=false;
			$scope.showCharts=true;
			
			$("#canvas-holder").hide();
			$("#pieLegend").hide();
			
    		$("#bar-holder").show();
    		$("#barLegend").show();
    		
    		$("#line-holder").hide();
    		$("#lineLegend").hide();
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
    					{   label:"aubsent",
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
		
		/*for display Line chart*/
		$scope.showLine=function(){
			$scope.showTable=false;
			$scope.showCharts=true;
			
			$("#canvas-holder").hide();
			$("#pieLegend").hide();
			
    		$("#bar-holder").hide();
    		$("#barLegend").hide();
    		
    		$("#line-holder").show();
    		$("#lineLegend").show();
    		
			
			var lineChartData = {
				labels : ["Monday","Tuseday","Wednesday","Thrusday","Friday","Saturday","Sunday"],
				datasets : [
					{
						label: "Present",
						fillColor : "#CCF2FF",
						strokeColor : "#1ac4ff",
						pointColor : "#0085b3",
						pointStrokeColor : "#005f80",
						pointHighlightFill : "#FFFFFF",
						pointHighlightStroke : "#000000",
						data : [70,80,85,65,55,90,0]
					},
					{
						label: "Aubsent",
						fillColor : "rgb(255,179,179)",
						strokeColor:"rgb(230,0,0)",
						pointColor : "#b30000",
						pointStrokeColor :"	#804d4d",
						pointHighlightFill : "#FFFFFF",
						pointHighlightStroke : "#660033",
						data : [3,8,8,6,5,9,0]
					}
				]

			}

		
			var ctx = document.getElementById("canvas").getContext("2d");
			window.myLine = new Chart(ctx).Line(lineChartData, {
				responsive: true
			});
		    
			document.getElementById('lineLegend').innerHTML = myLine.generateLegend();
    		$scope.legend = Line.generateLegend();


			
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
			$scope.showChangePasswodDivValue=false;
			$scope.showAddEmployeeMainDiv= !$scope.showAddEmployeeMainDiv;
			console.log("show add user div: "+$scope.showAddEmployeeMainDiv);
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
				        	 $window.location.href = '/EmployeeManagementSystem/sessionExpired.do';
				         }
				    	 else if(data == 1){
				    			 employeeDefaultDetails();
				    			 $scope.addEmployeeSuccessMsg="successfully Added!";
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
			
			console.log("redirecting to generate ");
			
			$window.location.href="/EmployeeManagementSystem//generateReportHome.do";
		}
		
		
		/*function for view/update employeee*/
		$scope.viewUser=function(){
			console.log("in viewUser()");
			$scope.viewUserDetails= !$scope.viewUserDetails;
			console.log("show view user div: "+$scope.viewUserDetails);
			$window.location.href="/EmployeeManagementSystem/getAllEmployee";
			
		};
		
		
		

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
	});
	
	/*this controlller is for showing admin login page as modal*/
	angular.module('ui.ems.app').controller('AdminLoginController', function ($scope,$http, $uibModalInstance) {
		 
		 var usernameFlag;	 
		 var passwordFlag;	
		 var adminIdLength=6;
		 var passwordLength=4;
		 
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
		 
		 /* function for forgot password hyper link*/
		 $scope.AdminForgotPassword=function(){
			 
			 console.log("forgot password function");
		 };
		 
		/* function for admin login button */ 
		$scope.AdminLogin=function(){
			
			var adminObj={adminId:$scope.Admin.userName,password:$scope.Admin.password};
			var adminLogin = $http.post('/EmployeeManagementSystem/adminHome.do',adminObj);
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

			 /* console.log("login clicked!");
			 console.log("Admin uname:"+$scope.Admin.userName);
	   	     console.log("admin password: "+$scope.Admin.password);
	   	     $scope.adminLoginValidationMsg="wrong username"; */
	   	    // $scope.showAdminHome=true;
	   	 // $uibModalInstance.close( $scope.showAdminHome);
	   	//$uibModalInstance.close(true);
	   	     console.log("adminhome status: "+$scope.showAdminHome);
			
		};//admonLogin()--close
		
		$scope.closeModal=function(){
			
			$uibModalInstance.dismiss('cancel');
		}
 });//ModalInstanceCtrl--close