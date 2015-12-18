var app = angular.module('myapp', [ 'ngAnimate', 'ui.bootstrap' ]);

app
		.controller(
				'myctrl',
				[
						'$scope',
						'userservice',
						function($scope, userservice) {
							var self = this;
							$scope.totalItems = 0;
							$scope.viewby = 5;
							$scope.currentPage = 1;
							$scope.itemsPerPage = $scope.viewby;
							$scope.maxSize = 5; // Number of pager buttons to
							// show
							var total = 0;
							var selected = 0;
							$scope.employeeids = [];
							$scope.hide1 = true;
							$scope.hide2 = true;
							$scope.hide3 = true;
							$scope.hide11 = true;
							$scope.hide12 = true;
							$scope.newhide1 = true;
							self.getCheck = function() {
								if ($scope.id.length == 0) {
									$scope.employeeids = [];
								}
								if ($scope.id.length == 1
										&& $scope.employeeids.length == 0) {
									userservice
											.getCheck($scope.id)
											.then(
													function(data) {
														angular
																.forEach(
																		data,
																		function(
																				value,
																				key) {
																			$scope.employeeids
																					.push(value
																							+ "");
																		});
													},
													function(error) {
														$scope.result = "error occured due to internal problem in auto search  please try again auto. ";
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

							self.getAttendance = function() {
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
												userservice
														.getAttendanceSingle(
																$scope.id)
														.then(
																function(data) {
																	if (data.length != 0) {
																		$scope.hide1 = false;
																		$scope.hide2 = false;
																		$scope.newhide1 = false;
																		$scope.hide4 = true;
																		$scope.res = true;
																		$scope.hide3 = true;
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
																		$scope.ats = data;
																	} else {
																		$scope.color1 = "red";
																		$scope.hide1 = true;
																		$scope.hide2 = true;
																		$scope.hide4 = false;
																		$scope.res = true;
																		$scope.hide3 = true;
																		$scope.newhide1 = true;
																	}

																},
																function(error) {
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
												userservice
														.getAttendanceSingleDay(
																$scope.id,
																$scope.from
																		.getTime())
														.then(
																function(data) {
																	if (data.length != 0) {
																		$scope.hide1 = false;
																		$scope.hide2 = false;
																		$scope.newhide1 = false;
																		$scope.hide4 = true;
																		$scope.res = true;
																		$scope.hide3 = true;
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
																		$scope.ats = data;
																	} else {
																		$scope.color1 = "red";
																		$scope.hide1 = true;
																		$scope.hide2 = true;
																		$scope.hide4 = false;
																		$scope.res = true;
																		$scope.hide3 = true;
																		$scope.newhide1 = true;
																	}
																},
																function(error) {
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
												userservice
														.getAttendanceSingleDates(
																$scope.id,
																$scope.from
																		.getTime(),
																$scope.to
																		.getTime())
														.then(
																function(data) {
																	if (data.length != 0) {
																		$scope.hide1 = false;
																		$scope.hide2 = false;
																		$scope.newhide1 = false;
																		$scope.hide4 = true;
																		$scope.res = true;
																		$scope.hide3 = true;
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
																		$scope.ats = data;
																	} else {
																		$scope.color1 = "red";
																		$scope.hide1 = true;
																		$scope.hide2 = true;
																		$scope.hide4 = false;
																		$scope.res = true;
																		$scope.hide3 = true;
																		$scope.newhide1 = true;
																	}
																},
																function(error) {
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
												userservice
														.getAttendanceSingleByName(
																$scope.id)
														.then(
																function(data) {
																	if (data.length != 0) {
																		$scope.hide1 = false;
																		$scope.hide2 = false;
																		$scope.newhide1 = false;
																		$scope.hide4 = true;
																		$scope.res = true;
																		$scope.hide3 = true;
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
																		$scope.ats = data;
																	} else {
																		$scope.color1 = "red";
																		$scope.hide1 = true;
																		$scope.hide2 = true;
																		$scope.hide4 = false;
																		$scope.res = true;
																		$scope.hide3 = true;
																		$scope.newhide1 = true;
																	}

																},
																function(error) {
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
												userservice
														.getAttendanceSingleDayByName(
																$scope.id,
																$scope.from
																		.getTime())
														.then(
																function(data) {
																	if (data.length != 0) {
																		$scope.hide1 = false;
																		$scope.hide2 = false;
																		$scope.newhide1 = false;
																		$scope.hide4 = true;
																		$scope.res = true;
																		$scope.hide3 = true;
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
																		$scope.ats = data;
																	} else {
																		$scope.color1 = "red";
																		$scope.hide1 = true;
																		$scope.hide2 = true;
																		$scope.hide4 = false;
																		$scope.res = true;
																		$scope.hide3 = true;
																		$scope.newhide1 = true;
																	}

																},
																function(error) {
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
												userservice
														.getAttendanceSingleDatesByName(
																$scope.id,
																$scope.from
																		.getTime(),
																$scope.to
																		.getTime())
														.then(
																function(data) {
																	if (data.length != 0) {
																		$scope.hide1 = false;
																		$scope.hide2 = false;
																		$scope.newhide1 = false;
																		$scope.hide4 = true;
																		$scope.res = true;
																		$scope.hide3 = true;
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
																		$scope.ats = data;
																	} else {
																		$scope.color1 = "red";
																		$scope.hide1 = true;
																		$scope.hide2 = true;
																		$scope.hide4 = false;
																		$scope.res = true;
																		$scope.hide3 = true;
																		$scope.newhide1 = true;
																	}

																},
																function(error) {
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
										userservice
												.getAttendanceAll()
												.then(
														function(data) {
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

														},
														function(error) {
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
										userservice
												.getAttendanceAllDay(
														$scope.from.getTime())
												.then(
														function(data) {
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

														},
														function(error) {
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
										userservice
												.getAttendanceAllDates(
														$scope.from.getTime(),
														$scope.to.getTime())
												.then(
														function(data) {
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

														},
														function(error) {
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

							$scope.printDiv = function(pdiv) {
								var printContents = document
										.getElementById("pdiv").innerHTML;
								var originalContents = document.body.innerHTML;
								document.body.innerHTML = printContents;
								window.print();
								document.body.innerHTML = originalContents;

							};
						} ]);
app.service('userservice', [
		'$http',
		'$q',
		function($http, $q) {
			return {
				getCheck : function(id) {

					return $http
							.post('getAutoCompleteInfo.do?employeeId=' + id)
							.then(function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error while creating user');
								return $q.reject(errResponse);
							});

				},

				getAttendanceSingle : function(id) {
					return $http.post('getReportById.do?employeeId=' + id)
							.then(function(response) {
								return response.data;
							}, function(errResponse) {
								// console.error('Error while creating user');
								return $q.reject(errResponse);
							});

				},

				getAttendanceSingleDay : function(id, from) {
					return $http.post(
							'getReportByIdAndDate.do?employeeId=' + id
									+ '&attendanceDate=' + from).then(
							function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error while creating user');
								return $q.reject(errResponse);
							});

				},

				getAttendanceSingleDates : function(id, from, to) {
					return $http.post(
							'getReportByIdFromDateToDate.do?employeeId=' + id
									+ '&fromDate=' + from + '&toDate=' + to)
							.then(function(response) {
								return response.data;
							}, function(errResponse) {
								// console.error('Error while creating user');
								return $q.reject(errResponse);
							});

				},
				/* service for name */
				getAttendanceSingleByName : function(id) {
					return $http.post('getReportByName.do?employeeId=' + id)
							.then(function(response) {
								return response.data;
							}, function(errResponse) {
								// console.error('Error while creating user');
								return $q.reject(errResponse);
							});

				},

				getAttendanceSingleDayByName : function(id, from) {
					return $http.post(
							'getReportByNameDay.do?employeeId=' + id
									+ '&attendanceDate=' + from).then(
							function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error while creating user');
								return $q.reject(errResponse);
							});

				},

				getAttendanceSingleDatesByName : function(id, from, to) {
					return $http.post(
							'getReportByNameBetweenDates.do?employeeId=' + id
									+ '&fromDate=' + from + '&toDate=' + to)
							.then(function(response) {
								return response.data;
							}, function(errResponse) {
								// console.error('Error while creating user');
								return $q.reject(errResponse);
							});
				},
				/* service for All selection */
				getAttendanceAll : function() {
					return $http.post('getAllEmployees.do').then(
							function(response) {
								return response.data;
							}, function(errResponse) {
								console.error('Error while creating user');
								return $q.reject(errResponse);
							});

				},

				getAttendanceAllDay : function(from) {
					return $http.post(
							'getAllEmployeesReportByDate.do?attendanceDate='
									+ from).then(function(response) {
						return response.data;
					}, function(errResponse) {
						// console.error('Error while creating user');
						return $q.reject(errResponse);
					});

				},

				getAttendanceAllDates : function(from, to) {
					return $http.post(
							'getEmployeesReportBetweenDates.do?fromDate='
									+ from + '&toDate=' + to).then(
							function(response) {
								return response.data;
							}, function(errResponse) {
								// console.error('Error while creating user');
								return $q.reject(errResponse);
							});

				}

			}
		} ]);
