package com.caprusit.ems.dao;

import java.util.Date;
import java.util.List;

import com.caprusit.ems.domain.EmployeeLeave;

public interface IEmployeeLeaveDAO {

	List<Long> getEmployeeLeaveCount(int employeeId);

	List<Object> getLeaveDates(int employeeId);

	List<Object> getMonthLeaveDates(int employeeId, String month);

	List<EmployeeLeave> getEmployeeLeaveDetails(int employeeId, Date startDate,Date endDate);

	int updateLeaveStatus(int employeeLeaveId, String leaveStatus);

	public int applyLeave(EmployeeLeave employeeLeave);

	public List<EmployeeLeave> getEmployeeLeaveNotification(int employeeId);

	public List<EmployeeLeave> getEmployeeLeaveDetails();
	
	EmployeeLeave getEmployeeLeaveDetaisByLeaveId(int leaveId);
	
    public Long getNewNotificationCount();
	
	public List<EmployeeLeave> getNewNotificationData();


}
