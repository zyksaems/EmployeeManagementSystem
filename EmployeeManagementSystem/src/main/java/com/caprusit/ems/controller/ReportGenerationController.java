package com.caprusit.ems.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.caprusit.ems.service.IReportGenerationService;

@Controller
public class ReportGenerationController {
	@Autowired
	private IReportGenerationService reportGenerationService;

	private Logger logger = Logger.getLogger(ReportGenerationController.class);

	@RequestMapping(value = "/generateReportHome", method = RequestMethod.GET)
	public String getReportGenerationPage(HttpServletRequest request) {
		logger.info("inside generateReportHome()");
		return "GenerateReport";
	}

	@RequestMapping(value = "/getAllEmployeeReport", method = RequestMethod.POST)
	public @ResponseBody List<Object> getAllEmployee(@RequestParam("employeeId") int employeeId,
			HttpServletRequest request) {
		logger.info("inside ReportGenerationController getAllEmployee()");

		List<Object> empData = reportGenerationService.login(employeeId);
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				request.getSession().setAttribute("employeeId", employeeId);
				request.getSession().setAttribute("EmployeeName", (String) data[0] + " " + (String) data[1]);
				request.getSession().setAttribute("designation", (String) data[2]);
			}
		}
		return reportGenerationService.getEmployees(employeeId);
	}

	@RequestMapping(value = "/generateReport", method = RequestMethod.POST)
	public @ResponseBody List<Object> getEmployeeReport(@RequestParam("employeeId") int employeeId,
			@RequestParam("attendanceDate") String attendanceDate, HttpServletRequest request) {
		logger.info("inside ReportGenerationController getEmployeeReport()");

		List<Object> empData = reportGenerationService.login(employeeId);
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				request.getSession().setAttribute("employeeId", employeeId);
				request.getSession().setAttribute("EmployeeName", (String) data[0] + " " + (String) data[1]);
				request.getSession().setAttribute("designation", (String) data[2]);
			}
		}
		return reportGenerationService.getEmployeeReport(employeeId, new Date(Long.valueOf(attendanceDate)));
	}

	@RequestMapping(value = "/generateReportPage", method = RequestMethod.POST)
	public @ResponseBody List<Object> getAllEmployeeReport(@RequestParam("employeeId") int employeeId,
			@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate,
			HttpServletRequest request) {
		logger.info("inside ReportGenerationController getAllEmployeeReport()");

		List<Object> empData = reportGenerationService.login(employeeId);
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				request.getSession().setAttribute("employeeId", employeeId);
				request.getSession().setAttribute("EmployeeName", (String) data[0] + " " + (String) data[1]);
				request.getSession().setAttribute("designation", (String) data[2]);
			}
		}
		return reportGenerationService.getAllEmployeeReport(employeeId, new Date(Long.valueOf(fromDate)),
				new Date(Long.valueOf(toDate)));
	}

	@RequestMapping(value = "/getAllEmployees", method = RequestMethod.POST)
	public @ResponseBody List<Object> getAllEmployees() {
		logger.info("inside ReportGenerationController getAllEmployees()");
		return reportGenerationService.getAllEmployees();
	}
	
	/*@RequestMapping(value = "/getAllEmployeesReport", method = RequestMethod.GET)
	public @ResponseBody List<Object> getAllEmployeesReport(@RequestParam("attendanceDate") String attendanceDate) {
		logger.info("inside ReportGenerationController getAllEmployeesReport()");
		return reportGenerationService.getAllEmployeesReport(new Date(Long.valueOf(attendanceDate)));
	}*/
}
