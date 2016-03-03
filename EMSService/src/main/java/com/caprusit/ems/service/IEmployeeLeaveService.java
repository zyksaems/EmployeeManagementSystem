package com.caprusit.ems.service;

import java.util.List;

import com.caprusit.ems.domain.EmployeeLeave;

public interface IEmployeeLeaveService {

	String getEmployeeLeaveCount(int employeeId);
	String getLeaveDates(int employeeId); 
	String getMonthLeaveDates(int employeeId,String month); 
	
	public void applyLeave(EmployeeLeave employeeLeave);
	public List<EmployeeLeave> getEmployeeLeaveNotification(int employeeId);
	public List<EmployeeLeave> getEmployeeLeaveDetails();
	public int doApprove(int employeeLeaveId);
	public int disApproveLeaves(int leaveId);
}
  