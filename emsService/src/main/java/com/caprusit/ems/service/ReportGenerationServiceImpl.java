package com.caprusit.ems.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caprusit.ems.dao.IManageUserDAO;
import com.caprusit.ems.dao.IReportGenerationDAO;
import com.caprusit.ems.domain.Attendance;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.utility.JsonUtility;

@Service
public class ReportGenerationServiceImpl implements IReportGenerationService {
	@Autowired
	private IReportGenerationDAO reportGenerationDAO;
	
	@Autowired
	private IManageUserDAO manageUserDAO;
	
	private Logger logger = Logger.getLogger(ReportGenerationServiceImpl.class);

	public List<Integer> getAutoCompleteInfo(int employeeId) {
		logger.info("Inside ReportGenerationServiceImpl getAutoCompleteInfo() method ");
		List<Integer> result = reportGenerationDAO.getAutoCompleteInfo(employeeId);
		logger.info("info list in sevice: " + result);
		return result;
	}

	public List<String> getAutoCompleteInfo(String employeeId) {
		logger.info("Inside ReportGenerationServiceImpl getAutoCompleteInfo(String) method ");
		List<String> result = reportGenerationDAO.getAutoCompleteInfo(employeeId);
		logger.info("info list in sevice: " + result);
		return result;
	}

	public List<Attendance> getEmployees(int employeeId) {
		logger.info("inside ReportGenerationServiceImpl getEmployees()");
		List<Attendance> employeeList = reportGenerationDAO.getEmployees(employeeId);

		return employeeList;
	}

	public List<Attendance> getEmployeeReport(int employeeId, Date attendanceDate) {
		logger.info("Inside ReportGenerationServiceImpl getEmployeeReport() method ");
		List<Attendance> result = reportGenerationDAO.getEmployeeReport(employeeId, attendanceDate);

		return result;
	}

	public List<Attendance> getAllEmployeeReport(int employeeId, Date fromDate, Date toDate) {
		logger.info("Inside ReportGenerationServiceImpl getAllEmployeeReport() method ");
		List<Attendance> result = reportGenerationDAO.getAllEmployeeReport(employeeId, fromDate, toDate);

		return result;
	}

	public List<Object> login(int employeeId) {
		logger.info("inside ReportGenerationServiceImpl login()");
		List<Object> empData = reportGenerationDAO.login(employeeId);

		return empData;
	}

	public List<Object> login(String firstName, String lastName) {
		logger.info("inside ReportGenerationServiceImpl login()");
		List<Object> empData = reportGenerationDAO.login(firstName, lastName);

		return empData;
	}

	public List<Object> getReportByName(int employeeId) {
		logger.info("Inside ReportGenerationServiceImpl getReportByName(empId) method ");
		List<Object> result = reportGenerationDAO.getReportByName(employeeId);
		logger.info("info list in sevice: " + result);

		return result;
	}

	public List<Object> getReportByDay(int employeeId, Date attendanceDate) {
		logger.info("Inside ReportGenerationServiceImpl getReportByDay(empId) method ");
		List<Object> result = reportGenerationDAO.getReportByDay(employeeId, attendanceDate);
		logger.info("info list in sevice: " + result);

		return result;
	}

	public List<Object> getReportByNameDates(int employeeId, Date fromDate, Date toDate) {
		logger.info("Inside ReportGenerationServiceImpl getReportByNameDates() method ");
		List<Object> result = reportGenerationDAO.getReportByNameDates(employeeId, fromDate, toDate);
		logger.info("info list in sevice: " + result);

		return result;
	}

	public List<Attendance> getAllEmployees() {
		logger.info("inside ReportGenerationServiceImpl getAllEmployees()");
		List<Attendance> employeeList = reportGenerationDAO.getAllEmployees();

		return employeeList;
	}

	public List<Attendance> getAllEmployeesReport(Date attendanceDate) {
		logger.info("inside ReportGenerationServiceImpl getAllEmployeesReport()");
		List<Attendance> empData = reportGenerationDAO.getAllEmployeesReport(attendanceDate);

		return empData;
	}

	public List<Attendance> getEmployeesReport(Date fromDate, Date toDate) {
		logger.info("inside ReportGenerationServiceImpl getEmployeesReport()");
		List<Attendance> empData = reportGenerationDAO.getEmployeesReport(fromDate, toDate);

		return empData;
	}

	public String getTodayReport() {

        List<Attendance> todayPresentiesList = reportGenerationDAO.getTodayAttendance();

		List<Employee> employeeDetailsList=manageUserDAO.getEmployees();
		
		logger.info("employee details list: "+employeeDetailsList);
		
		int totalNoOfEmployees=reportGenerationDAO.getNumberOfEmployees();
		
		Map<String,Object>  toDayReportMap=new HashMap<String,Object>();
		toDayReportMap.put("noOfPresenties",todayPresentiesList.size());
		toDayReportMap.put("totalEmployees", totalNoOfEmployees);
		toDayReportMap.put("presentiesList",todayPresentiesList);
		toDayReportMap.put("employeeDetails",employeeDetailsList);
		
		logger.info("final String after adding :"+JsonUtility.convertToJson(toDayReportMap));
		
		return JsonUtility.convertToJson(toDayReportMap);
		
	}
}
