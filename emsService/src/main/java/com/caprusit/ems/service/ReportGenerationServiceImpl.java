package com.caprusit.ems.service;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caprusit.ems.dao.IReportGenerationDAO;
import com.google.gson.Gson;

@Service
public class ReportGenerationServiceImpl implements IReportGenerationService {
	@Autowired
	private IReportGenerationDAO reportGenerationDAO;
	private Logger logger = Logger.getLogger(ReportGenerationServiceImpl.class);

	public static String convertToJson(Object obj) {
		Gson gson = new Gson();
		return gson.toJson(obj);
	}

	public List<Object> getEmployeeReport(int employeeId, Date attendanceDate) {
		logger.info("Inside ReportGenerationServiceImpl getEmployeeReport() method ");
		List<Object> result = reportGenerationDAO.getEmployeeReport(employeeId, attendanceDate);

		return result;
	}

	public List<Object> getAllEmployeeReport(int employeeId, Date fromDate, Date toDate) {
		logger.info("Inside ReportGenerationServiceImpl getAllEmployeeReport() method ");
		List<Object> result = reportGenerationDAO.getAllEmployeeReport(employeeId, fromDate, toDate);

		return result;
	}

	public List<Object> getEmployees(int employeeId) {
		logger.info("inside ReportGenerationServiceImpl getEmployees()");
		List<Object> employeeList = reportGenerationDAO.getEmployees(employeeId);

		return employeeList;
	}

	public List<Object> getAllEmployees() {
		logger.info("inside ReportGenerationServiceImpl getAllEmployees()");
		List<Object> employeeList = reportGenerationDAO.getAllEmployees();

		return employeeList;
	}

	public List<Object> login(int employeeId) {
		List<Object> empData = reportGenerationDAO.login(employeeId);
		logger.info("inside ReportGenerationServiceImpl login()");

		return empData;
	}
}
