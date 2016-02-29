package com.caprusit.ems.service;

public interface IEmployeeLeaveService {

	String getEmployeeLeaveCount(int employeeId);
	String getLeaveDates(int employeeId); 
	String getMonthLeaveDates(int employeeId,String month); 
}
  