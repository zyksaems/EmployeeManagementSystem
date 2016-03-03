package com.caprusit.ems.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.caprusit.ems.domain.Attendance;

public interface IReportGenerationDAO {
	
	public List<Attendance> getEmployeeWorkingDetailsById(int employeeId);
	
	List<Attendance> getEmployeeWorkingDetailsByIdAndDate(int employeeId, Date attendanceDate);

	List<Attendance> getEmployeeWorkingDetailsByDates(int employeeId, Date fromDate, Date toDate);

	List<Attendance> getAllEmployeesWorkingDetails();

	List<Object> getSingleEmployeeDetailsById(int employeeId);

	List<Attendance> getAllEmployeesReportByDate(Date attendanceDate);

	List<Attendance> getEmployeesReportBetweenDates(Date fromDate, Date toDate);

	List<Object> getSingleEmployeeDetailsByEmpName(String firstName, String lastName);

	List<Attendance> getReportByName(int empId);

	List<Attendance> getReportByDay(int employeeId, Date attendanceDate);

	List<Attendance> getReportByNameDates(int employeeId, Date fromDate, Date toDate);

	List<Integer> getAutoCompleteInfo(int employeeId);

	List<String> getAutoCompleteInfo(String employeeId);
	
    List<Attendance> getTodayPresentAttendance();
    
    List<Attendance> getTodayLeaveAttendance();
    
    int getNumberOfEmployees();
    
    int getNumberOfActiveEmployees();
    
    Map<String,Object> getDailyReportOfIndividual(int employeeId, Date attendanceDate);

}
