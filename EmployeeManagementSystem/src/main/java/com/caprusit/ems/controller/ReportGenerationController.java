package com.caprusit.ems.controller;

import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.caprusit.ems.service.IReportGenerationService;
import com.caprusit.ems.utility.JsonUtility;

@Controller
public class ReportGenerationController {
	@Autowired
	private IReportGenerationService reportGenerationService;

	private Logger logger = Logger.getLogger(ReportGenerationController.class);

	/**
	 * getReportGenerationPage(-) method will display the ReportGeneration page.
	 */
	@RequestMapping(value = "/generateReportHome", method = RequestMethod.GET)
	public String getReportGenerationPage(HttpServletRequest request) {
		logger.info("inside generateReportHome()");
		return "GenerateReport";
	}

	/**
	 * getAutoCompleteInfo(-) method take employeeId as a input and display all
	 * employeeId's or employeeName's in the search box based on the user
	 * supplied values.
	 */
	@RequestMapping(value = "/getAutoCompleteInfo", method = RequestMethod.POST)
	public @ResponseBody
	String getAutoCompleteInfo(@RequestParam("employeeId") String employeeId) {
		String pattern = "^[0-9]$";

		List<Integer> infolist = null;
		Pattern p = Pattern.compile(pattern);
		Matcher m = p.matcher(employeeId);
		if (m.find()) {
			logger.info("Integer:" + employeeId);
			logger.info("inside ReportGenerationController getAutoCompleteInfo()");
			logger.info("received employee id: " + employeeId);
			int empid = Integer.parseInt(employeeId);
			infolist = reportGenerationService.getAutoCompleteInfo(empid);
			logger.info("info list in controller:" + infolist);

			return JsonUtility.convertToJson(infolist);
		} else {
			logger.info("String:" + employeeId);
			List<String> data = reportGenerationService
					.getAutoCompleteInfo(employeeId);
			return JsonUtility.convertToJson(data);
		}
	}

	/**
	 * getReportById(-) method take employeeId (Integer) as a input and display
	 * all the working details of an employee.
	 */
	@RequestMapping(value = "/getReportById", method = RequestMethod.POST)
	public @ResponseBody
	String getReportById(@RequestParam("employeeId") int employeeId,
			HttpServletRequest request) {
		logger.info("inside ReportGenerationController getReportById()");

		List<Object> empData = reportGenerationService.login(employeeId);
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				request.getSession().setAttribute("employeeId", employeeId);
				request.getSession().setAttribute("EmployeeName",
						(String) data[0] + " " + (String) data[1]);
				logger.info("Emp name:" + (String) data[0] + " "
						+ (String) data[1]);
				request.getSession().setAttribute("designation",
						(String) data[2]);
			}
		}
		return JsonUtility.convertToJson(reportGenerationService
				.getEmployees(employeeId));
	}

	/**
	 * getReportByIdAndDate(-,-)method takes employeeId , attendanceDate as a
	 * inputs and display particular employee working details on given date if
	 * it is worked on this date.
	 */
	@RequestMapping(value = "/getReportByIdAndDate", method = RequestMethod.POST)
	public @ResponseBody
	String getReportByIdAndDate(@RequestParam("employeeId") int employeeId,
			@RequestParam("attendanceDate") String attendanceDate,
			HttpServletRequest request) {
		logger.info("inside ReportGenerationController getReportByIdAndDate()");

		List<Object> empData = reportGenerationService.login(employeeId);
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				request.getSession().setAttribute("employeeId", employeeId);
				request.getSession().setAttribute("EmployeeName",
						(String) data[0] + " " + (String) data[1]);
				logger.info("Emp name:" + (String) data[0] + " "
						+ (String) data[1]);
				request.getSession().setAttribute("designation",
						(String) data[2]);
			}
		}
		return JsonUtility.convertToJson(reportGenerationService
				.getEmployeeReport(employeeId,
						new Date(Long.valueOf(attendanceDate))));
	}

	/**
	 * getReportByIdFromDateToDate(-,-,-) method takes employeeId , fromDate,
	 * toDate as a inputs and display the working details of an employee during
	 * given period of time.
	 */
	@RequestMapping(value = "/getReportByIdFromDateToDate", method = RequestMethod.POST)
	public @ResponseBody
	String getReportByIdFromDateToDate(
			@RequestParam("employeeId") int employeeId,
			@RequestParam("fromDate") String fromDate,
			@RequestParam("toDate") String toDate, HttpServletRequest request) {
		logger.info("inside ReportGenerationController getReportByIdFromDateToDate()");

		List<Object> empData = reportGenerationService.login(employeeId);
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				request.getSession().setAttribute("employeeId", employeeId);
				request.getSession().setAttribute("EmployeeName",
						(String) data[0] + " " + (String) data[1]);
				logger.info("Emp name:" + (String) data[0] + " "
						+ (String) data[1]);
				request.getSession().setAttribute("designation",
						(String) data[2]);
			}
		}
		return JsonUtility.convertToJson(reportGenerationService
				.getAllEmployeeReport(employeeId,
						new Date(Long.valueOf(fromDate)),
						new Date(Long.valueOf(toDate))));
	}

	/**
	 * getReportByName(-) take input as employeeId (String) as a input and we
	 * extract firstName, lastName from received input string and pass
	 * firstName, lastName as a input to login(-,-) method to get employeeId
	 * related to employeeName and pass this employeeId to getReportByName(-)
	 * method of ReportGenerationService to get total records of an employee.
	 */
	@RequestMapping(value = "/getReportByName", method = RequestMethod.POST)
	public @ResponseBody
	String getReportByName(@RequestParam("employeeId") String employeeId,
			HttpServletRequest request) {
		logger.info("inside ReportGenerationController getReportByName()");
		String string = employeeId;
		String[] parts = string.split(",");
		String firstName = parts[0];
		String lastName = parts[1];
		logger.info("FirstName:" + firstName);
		logger.info("lastname:" + lastName);
		List<Object> empData = reportGenerationService.login(firstName,
				lastName);
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				request.getSession().setAttribute("employeeId",
						(Integer) data[0]);
				request.getSession().setAttribute("EmployeeName",
						firstName + " " + lastName);
				request.getSession().setAttribute("designation",
						(String) data[1]);
				empData = reportGenerationService
						.getReportByName((Integer) data[0]);
			}
		}
		return JsonUtility.convertToJson(empData);
	}

	/**
	 * getReportByNameDay(-,-) method takes employeeId, attendanceDate as a
	 * inputs and display the working details of an employee on the specified
	 * date.
	 */
	@RequestMapping(value = "/getReportByNameDay", method = RequestMethod.POST)
	public @ResponseBody
	String getReportByDay(@RequestParam("employeeId") String employeeId,
			@RequestParam("attendanceDate") String attendanceDate,
			HttpServletRequest request) {
		logger.info("inside ReportGenerationController getReportByDay()");

		String string = employeeId;
		String[] parts = string.split(",");
		String firstName = parts[0];
		String lastName = parts[1];
		logger.info("FirstName:" + firstName);
		logger.info("lastname:" + lastName);

		List<Object> empData = reportGenerationService.login(firstName,
				lastName);
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				request.getSession().setAttribute("employeeId",
						(Integer) data[0]);
				request.getSession().setAttribute("EmployeeName",
						firstName + " " + lastName);
				request.getSession().setAttribute("designation",
						(String) data[1]);
				empData = reportGenerationService.getReportByDay(
						(Integer) data[0],
						new Date(Long.valueOf(attendanceDate)));
			}
		}
		return JsonUtility.convertToJson(empData);
	}

	/**
	 * getReportByNameDates(-,-,-) takes employeeId, fromdate, toDate as a
	 * inputs and display the working details of an employee on given period of
	 * time.
	 */
	@RequestMapping(value = "/getReportByNameBetweenDates", method = RequestMethod.POST)
	public @ResponseBody
	String getReportByNameDates(@RequestParam("employeeId") String employeeId,
			@RequestParam("fromDate") String fromDate,
			@RequestParam("toDate") String toDate, HttpServletRequest request) {
		logger.info("inside ReportGenerationController getReportByNameDates()");
		String string = employeeId;
		String[] parts = string.split(",");
		String firstName = parts[0];
		String lastName = parts[1];
		logger.info("FirstName:" + firstName);
		logger.info("lastname:" + lastName);

		List<Object> empData = reportGenerationService.login(firstName,
				lastName);
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				request.getSession().setAttribute("employeeId",
						(Integer) data[0]);
				request.getSession().setAttribute("EmployeeName",
						firstName + " " + lastName);
				request.getSession().setAttribute("designation",
						(String) data[1]);
				empData = reportGenerationService.getReportByNameDates(
						(Integer) data[0], new Date(Long.valueOf(fromDate)),
						new Date(Long.valueOf(toDate)));
			}
		}
		return JsonUtility.convertToJson(empData);
	}

	/**
	 * getAllEmployees() method will display working details of all employees.
	 */
	@RequestMapping(value = "/getAllEmployees", method = RequestMethod.POST)
	public @ResponseBody
	String getAllEmployees() {
		logger.info("inside ReportGenerationController getAllEmployees()");
		return JsonUtility.convertToJson(reportGenerationService
				.getAllEmployees());
	}

	/**
	 * getAllEmployeesReportByDate(-) method take attendanceDate as a input and
	 * display all employees working details on a specified date.
	 */
	@RequestMapping(value = "/getAllEmployeesReportByDate", method = RequestMethod.POST)
	public @ResponseBody
	String getAllEmployeesReportByDate(
			@RequestParam("attendanceDate") String attendanceDate) {
		logger.info("inside ReportGenerationController getAllEmployeesReportByDate()");

		return JsonUtility.convertToJson(reportGenerationService
				.getAllEmployeesReport(new Date(Long.valueOf(attendanceDate))));
	}

	/**
	 * getEmployeesReportBetweenDates(-,-) method takes fromDate, toDate as a
	 * inputs and displays all employees working details during given period of
	 * time.
	 */
	@RequestMapping(value = "/getEmployeesReportBetweenDates", method = RequestMethod.POST)
	public @ResponseBody
	String getEmployeesReportBetweenDates(
			@RequestParam("fromDate") String fromDate,
			@RequestParam("toDate") String toDate) {
		logger.info("inside ReportGenerationController getEmployeesReportBetweenDates()");

		return JsonUtility.convertToJson(reportGenerationService
				.getEmployeesReport(new Date(Long.valueOf(fromDate)), new Date(
						Long.valueOf(toDate))));
	}
    
	/**
	 * This method returns today attendance details as json object array to front-end
	 * */
	@RequestMapping(value = "/getTodayReport", method = RequestMethod.GET)
	public @ResponseBody
	String getDayWiseReport() {

		logger.info("in ReportGenerationController--getDayWiseReport()");

		String repotrDetails = reportGenerationService.getTodayReport();

		return repotrDetails;
	}

}
