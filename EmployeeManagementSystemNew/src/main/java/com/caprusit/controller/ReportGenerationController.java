package com.caprusit.controller;

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
	String getReportById(@RequestParam("employeeId") int employeeId) {
		logger.info("inside ReportGenerationController getReportById()");
		
		return reportGenerationService.getEmployeeWorkingDetailsById(employeeId);
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

		return reportGenerationService.getEmployeeWorkingDetailsByIdAndDate(employeeId,new Date(Long.valueOf(attendanceDate)));
	}

	/**
	 * getReportByIdFromDateToDate(-,-,-) method takes employeeId , fromDate,
	 * toDate as a inputs and display the working details of an employee during
	 * given period of time.
	 */
	@RequestMapping(value = "/getReportByIdFromDateToDate", method = RequestMethod.GET)
	public @ResponseBody String getReportByIdFromDateToDate(@RequestParam("employeeId") int employeeId,@RequestParam("fromDate") String fromDate,
			@RequestParam("toDate") String toDate) {
		logger.info("inside ReportGenerationController getReportByIdFromDateToDate()");

		return reportGenerationService.getEmployeeWorkingDetailsByDates(employeeId,
				new Date(Long.valueOf(fromDate)),new Date(Long.valueOf(toDate)));
	}

	/**
	 * getReportByName(-) take input as employeeId (String) and 
	 * display the total working details of an employee.
	 */
	@RequestMapping(value = "/getReportByName", method = RequestMethod.POST)
	public @ResponseBody
	String getReportByName(@RequestParam("employeeId") String employeeId) {
		logger.info("inside ReportGenerationController getReportByName()");
		
		return reportGenerationService.getReportByName(employeeId);
	}

	/**
	 * getReportByNameDay(-,-) method takes employeeId, attendanceDate as a
	 * inputs and display the working details of an employee on the specified
	 * date.
	 */
	@RequestMapping(value = "/getReportByNameDay", method = RequestMethod.POST)
	public @ResponseBody
	String getReportByDay(@RequestParam("employeeId") String employeeId,
			@RequestParam("attendanceDate") String attendanceDate) {
		logger.info("inside ReportGenerationController getReportByDay()");
		
		return reportGenerationService.getReportByDay(employeeId, new Date(Long.valueOf(attendanceDate)));
	}

	/**
	 * getReportByNameDates(-,-,-) takes employeeId, fromDate, toDate as a
	 * inputs and display the working details of an employee on given period of
	 * time.
	 */
	@RequestMapping(value = "/getReportByNameBetweenDates", method = RequestMethod.POST)
	public @ResponseBody
	String getReportByNameDates(@RequestParam("employeeId") String employeeId,
			@RequestParam("fromDate") String fromDate,
			@RequestParam("toDate") String toDate) {
		logger.info("inside ReportGenerationController getReportByNameDates()");

		return reportGenerationService.getReportByNameDates(employeeId, new Date(Long.valueOf(fromDate)),
				new Date(Long.valueOf(toDate)));
	}

	/**
	 * getAllEmployeesWorkingDetails() method will display working details of all employees.
	 */
	@RequestMapping(value = "/getAllEmployeesWorkingDetails", method = RequestMethod.POST)
	public @ResponseBody
	String getAllEmployeesWorkingDetails() {
		logger.info("inside ReportGenerationController getAllEmployeesWorkingDetails()");
		
		return reportGenerationService.getAllEmployeesWorkingDetails();
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

		return reportGenerationService
				.getAllEmployeesReportByDate(new Date(Long.valueOf(attendanceDate)));
	}

	/**
	 * getEmployeesReportBetweenDates(-,-) method takes fromDate, toDate as a
	 * inputs and displays all employees working details during given period of
	 * time.
	 */
	@RequestMapping(value = "/getEmployeesReportBetweenDates", method = RequestMethod.POST)
	public @ResponseBody
	String getEmployeesReportBetweenDates(@RequestParam("fromDate") String fromDate,
			@RequestParam("toDate") String toDate) {
		logger.info("inside ReportGenerationController getEmployeesReportBetweenDates()");

		return reportGenerationService
				.getEmployeesReportBetweenDates(new Date(Long.valueOf(fromDate)), new Date(Long.valueOf(toDate)));
	}
    
	/**
	 * This method returns today attendance details as Json object array to front-end
	 * */
	@RequestMapping(value = "/getTodayReport", method = RequestMethod.GET)
	public @ResponseBody String getDayWiseReport() {
		logger.info("in ReportGenerationController getDayWiseReport()");

		String reportDetails = reportGenerationService.getTodayReport();

		return reportDetails;
	}

	
	 @RequestMapping(value = "/getDailyReportGraphOfIndividual", method = RequestMethod.POST)
	  public @ResponseBody String getDailyReportOfIndividual(@RequestParam("employeeId") int employeeId,
	    @RequestParam("attendanceDate") String attendanceDate) {
	   logger.info("inside ReportGenerationController getDailyReportOfIndividual()");

	   return reportGenerationService.getDailyReportOfIndividual(employeeId, new Date(Long.valueOf(attendanceDate)));
	  }
}
