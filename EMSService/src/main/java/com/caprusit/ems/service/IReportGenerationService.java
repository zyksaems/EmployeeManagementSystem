package com.caprusit.ems.service;

import java.util.Date;
import java.util.List;

public interface IReportGenerationService {

	String getEmployeeWorkingDetailsById(int employeeId);
	
	String getEmployeeWorkingDetailsByIdAndDate(int employeeId, Date attendanceDate);

	String getEmployeeWorkingDetailsByDates(int employeeId, Date fromDate, Date toDate);

	String getAllEmployeesWorkingDetails();

	String  getSingleEmployeeDetailsById(int employeeId);

	String getAllEmployeesReportByDate(Date date);

	String getEmployeesReportBetweenDates(Date fromDate, Date toDate);

	String getSingleEmployeeDetailsByEmpName(String employeeId);

	String getReportByName(String employeeid);

	String getReportByDay(String employeeId, Date attendanceDate);

	String getReportByNameDates(String employeeId, Date fromDate, Date toDate);
	
	String getTodayReport();
	
    String getDailyReportOfIndividual(int employeeId, Date attendanceDate) ;
    
    String getEmployeeMonthlyProductivity(int employeeId,int year) ;
    
    String getAllEmployeeMonthlyProductivity(int year) ;
	
	List<Integer> getAutoCompleteInfo(int empid);

	List<String> getAutoCompleteInfo(String employeeId);

	String getEmployeeReportForWeekByIdAndWeekDate(int employeeId, String weekDate) throws Exception;
	
	String getAllEmployeeReportForWeekByWeekDate(String weekDate) throws Exception;

	String getEmployeeReportForMonthByIdAndMonth(int employeeId, String month);

	String getAllEmployeeReportForMonthByMonth(String month);

	String getEmployeeReportForYearByIdAndYear(int employeeId, String year);

	String getAllEmployeeReportForYearByYearDate(String yearDate);
}
