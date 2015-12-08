package com.caprusit.ems.service;

import java.util.Date;
import java.util.List;

public interface IReportGenerationService {

	List<Object> getEmployeeReport(int employeeId, Date attendanceDate);

	List<Object> getAllEmployeeReport(int employeeId, Date fromDate, Date toDate);

	public List<Object> getEmployees(int employeeId);

	public List<Object> getAllEmployees();

	List<Object> login(int employeeId);

}
