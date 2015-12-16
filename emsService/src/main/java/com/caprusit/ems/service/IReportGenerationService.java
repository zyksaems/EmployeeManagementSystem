package com.caprusit.ems.service;

import java.util.Date;
import java.util.List;

import com.caprusit.ems.domain.Attendance;

public interface IReportGenerationService {

	List<Attendance> getEmployeeReport(int employeeId, Date attendanceDate);

	List<Attendance> getAllEmployeeReport(int employeeId, Date fromDate, Date toDate);

	public List<Attendance> getEmployees(int employeeId);

	public List<Attendance> getAllEmployees();

	List<Object> login(int employeeId);

	List<Attendance> getAllEmployeesReport(Date date);

	List<Attendance> getEmployeesReport(Date fromDate, Date toDate);

	List<Integer> getAutoCompleteInfo(int empid);

	List<Object> login(String fistName, String lastName);

	List<Object> getReportByName(int employeeid);

	List<Object> getReportByDay(int employeeId, Date attendanceDate);

	List<Object> getReportByNameDates(int employeeId, Date fromDate, Date toDate);

	List<String> getAutoCompleteInfo(String employeeId);

}
