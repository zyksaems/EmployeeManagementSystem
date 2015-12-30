package com.caprusit.ems.service;

import com.caprusit.ems.domain.EmployeeAttendanceRequest;

public interface IAttendanceService {
	int logInOrLogOut(EmployeeAttendanceRequest attendanceRequest);

	int EmployeeLogInOrLogOut(EmployeeAttendanceRequest attendanceRequest);
}
