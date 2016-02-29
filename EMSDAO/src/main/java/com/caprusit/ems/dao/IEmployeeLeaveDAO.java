package com.caprusit.ems.dao;

import java.util.Date;
import java.util.List;

public interface IEmployeeLeaveDAO {

	List<Long> getEmployeeLeaveCount(int employeeId);
	List<Object> getLeaveDates(int employeeId);  
	List<Object> getMonthLeaveDates(int employeeId,String month);
}
