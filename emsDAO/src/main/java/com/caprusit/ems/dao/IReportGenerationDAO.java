package com.caprusit.ems.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.caprusit.ems.domain.Attendance;

public interface IReportGenerationDAO {
	
	List<Attendance> getEmployeeReport(int employeeId, Date attendanceDate);

	List<Attendance> getAllEmployeeReport(int employeeId, Date fromDate, Date toDate);

	public List<Attendance> getEmployees(int employeeId);

	List<Attendance> getAllEmployees();

	List<Object> login(int employeeId);

	List<Attendance> getAllEmployeesReport(Date attendanceDate);

	List<Attendance> getEmployeesReport(Date fromDate, Date toDate);

	List<Object> login(String firstName, String lastName);

	List<Object> getReportByName(int employeeId);

	List<Object> getReportByDay(int employeeId, Date attendanceDate);

	List<Object> getReportByNameDates(int employeeId, Date fromDate, Date toDate);

	List<Integer> getAutoCompleteInfo(int employeeId);

	List<String> getAutoCompleteInfo(String employeeId);
	
    List<Attendance> getTodayAttendance();
    
    int getNumberOfEmployees();
    
    Map<String,Object> getDailyReportIndividual(int employeeId, Date attendanceDate);

}
