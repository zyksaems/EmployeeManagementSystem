package com.caprusit.ems.dao;

import java.util.Date;
import java.util.List;

public interface IReportGenerationDAO {

	List<Object> getEmployeeReport(int employeeId, Date attendanceDate);

	List<Object> getAllEmployeeReport(int employeeId, Date fromDate, Date toDate);

	public List<Object> getEmployees(int employeeId);

	List<Object> getAllEmployees();

	List<Object> login(int employeeId);
}
