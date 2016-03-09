package com.caprusit.ems.service;

import com.caprusit.ems.domain.EmployeeLeave;

public interface IEmployeeLeaveService {

	String getEmployeeLeaveCount(int employeeId);

	String getLeaveDates(int employeeId);

	String getMonthLeaveDates(int employeeId, String month);

	String verifyEmployeeLeaveStatus(int employeeId, String month);

	public int applyLeave(EmployeeLeave employeeLeave, String leaveDates);

	public String getEmployeeLeaveNotification(int employeeId);

	public String getEmployeeLeaveDetails();

	public int updateLeaveStatus(int employeeLeaveId, int leaveStatus);
	
    public int getNewNotificationCount();
	
	public String getNewNotificationData();

}
