package com.caprusit.ems.dao;

import java.util.List;

import com.caprusit.ems.domain.EmployeeLeave;

public interface IEmployeeLeaveDAO {

	List<Long> getEmployeeLeaveCount(int employeeId);
	List<Object> getLeaveDates(int employeeId);  
	List<Object> getMonthLeaveDates(int employeeId,String month);
	
	public void applyLeave(EmployeeLeave employeeLeave);
	
	public List<EmployeeLeave> getEmployeeLeaveNotification(int employeeId);
	
	public List<EmployeeLeave> getEmployeeLeaveDetails();
	
	public int doApprove(int employeeLeaveId);
	
	public int disApproveLeaves(int leaveId);
	
	
}
