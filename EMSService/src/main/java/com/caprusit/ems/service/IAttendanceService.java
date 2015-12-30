package com.caprusit.ems.service;

import com.caprusit.ems.domain.EmployeeAttendanceRequest;

public interface IAttendanceService {
	
	public int logInOrLogOut(EmployeeAttendanceRequest test);
	
	public int EmployeeLogInOrLogOut(EmployeeAttendanceRequest test);
}
