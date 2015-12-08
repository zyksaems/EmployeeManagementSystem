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
	public String getForgotPasswordPage(HttpServletRequest request) {
		logger.info("inside generateReportHome()");
		return "GenerateReport";
	}

	@RequestMapping(value = "/generateReportPage", method = RequestMethod.POST)
	public @ResponseBody List<Object> getAllEmployeeReport(@RequestParam("employeeId") int employeeId,
			@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate) {
		logger.info("inside ReportGenerationController getAllEmployeeReport()");
		return reportGenerationService.getAllEmployeeReport(employeeId, new Date(Long.valueOf(fromDate)),
				new Date(Long.valueOf(toDate)));
	}

	@RequestMapping(value = "/generateReport", method = RequestMethod.POST)
	public @ResponseBody List<Object> getEmployeeReport(@RequestParam("employeeId") int employeeId,
			@RequestParam("attendanceDate") String attendanceDate) {
		logger.info("inside ReportGenerationController getEmployeeReport()");
		
		return reportGenerationService.getEmployeeReport(employeeId, new Date(Long.valueOf(attendanceDate)));
	}

	@RequestMapping(value = "/getAllEmployeeReport", method = RequestMethod.POST)
	public @ResponseBody List<Object> getAllEmployee(@RequestParam("employeeId") int employeeId,
			HttpServletRequest request) {
		logger.info("inside ReportGenerationController getAllEmployee()");

		return reportGenerationService.getEmployees(employeeId);
	}

	@RequestMapping(value = "/getAllEmployees", method = RequestMethod.POST)
	public @ResponseBody List<Object> getAllEmployees() {
		logger.info("inside ReportGenerationController getAllEmployees()");
		return reportGenerationService.getAllEmployees();
	}
}
