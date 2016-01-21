package com.caprusit.ems.controller;

import java.text.ParseException;
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
	 *  getDailyReportGenerationPage() method will display DailyReportGenerationPage when we click 
	 *  on DailyReports link in Report Generation Functionality.
	 */	
	@RequestMapping(value = "/getDailyReportGenerationPage", method = RequestMethod.GET)
	public String getDailyReportGenerationPage() {
		logger.info("inside ReportGenerationController getDailyReportGenerationPage()");
		
		return "DailyGenerateReports";
	}
	
	/**
	 * This method returns weekly productivity page
	 */	
	@RequestMapping(value = "/getWeeklyProductivityPage", method = RequestMethod.GET)
	public String getWeeklyProductivityPage() {
		logger.info("inside ReportGenerationController getWeeklyProductivityPage()");		
		return "WeeklyProductivityGraph";
	}
	
	/**
	 * This method returns monthly productivity page
	 */	
	@RequestMapping(value = "/getMonthlyProductivityPage", method = RequestMethod.GET)
	public String getMonthlyProductivityPage() {
		logger.info("inside ReportGenerationController getMonthlyProductivityPage()");		
		return "MonthlyProductivityGraph";
	}
	
	/**
	 * This method returns Today attendance page
	 */	
	@RequestMapping(value = "/getTodayAttendancePage", method = RequestMethod.GET)
	public String getTodayAttendancePage() {
		logger.info("inside ReportGenerationController getTodayAttendancePage()");		
		return "TodayAttendanceGraph";
	}
	
	/**
	 * This method returns annual productivity page
	 */	
	@RequestMapping(value = "/getAnnualProductivityPage", method = RequestMethod.GET)
	public String getAnualProductivityPage() {
		logger.info("inside ReportGenerationController getAnualProductivityPage()");		
		return "AnnualProductivityGraph";
	}
	
	
	/**
	 *  getWeeklyReportGenerationPage() method will display WeeklyReportGenerationPage when we click 
	 *  on WeeklyReports link in Report Generation Functionality.
	 */
	
	@RequestMapping(value = "/getWeeklyReportGenerationPage", method = RequestMethod.GET)
	public String getWeeklyReportGenerationPage() {
		logger.info("inside ReportGenerationController getWeeklyReportGenerationPage()");
		
		return "WeeklyGenerateReports";
	}
	
	/**
	 *  getMonthlyReportGenerationPage() method will display MonthlyReportGenerationPage when we click 
	 *  on MonthlyReports link in Report Generation Functionality.
	 */
	
	@RequestMapping(value = "/getMonthlyReportGenerationPage", method = RequestMethod.GET)
	public String getMonthlyReportGenerationPage() {
		logger.info("inside ReportGenerationController getMonthlyReportGenerationPage()");
		
		return "MonthlyGenerateReports";
	}
	
	/**
	 *  getAnnuallyReportGenerationPage() method will display AnnuallyReportGenerationPage when we click 
	 *  on AnnualyReports link in Report Generation Functionality.
	 */
	
	@RequestMapping(value = "/getAnnuallyReportGenerationPage", method = RequestMethod.GET)
	public String getAnnuallyReportGenerationPage() {
		logger.info("inside ReportGenerationController getAnnuallyReportGenerationPage()");
		
		return "AnnuallyReportGenerationPage";
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

	/**
	 * getDailyReportGraphOfIndividual(-) method display the working details of an employee using line chart.
	 * */
	 @RequestMapping(value = "/getDailyReportGraphOfIndividual", method = RequestMethod.POST)
	  public @ResponseBody String getDailyReportOfIndividual(@RequestParam("employeeId") int employeeId,
	    @RequestParam("attendanceDate") String attendanceDate) {
	   logger.info("inside ReportGenerationController getDailyReportOfIndividual()");

	   return reportGenerationService.getDailyReportOfIndividual(employeeId, new Date(Long.valueOf(attendanceDate)));
	  }
	 
	 
	 /**
		 * getWeeklyReportOfEmployeeByIdAndWeek(-) method display the working details of an employee for a week using line chart.
		 * @throws ParseException 
		 * */
		 @RequestMapping(value = "/getWeeklyReportOfEmployeeByIdAndWeek", method = RequestMethod.POST)
		  public @ResponseBody String getWeeklyReportOfEmployeeByIdAndWeek(@RequestParam("employeeId") int employeeId,
		    @RequestParam("week") String week) throws ParseException {
		   logger.info("inside ReportGenerationController getWeeklyReportOfEmployeeByIdAndWeek()");

		   return reportGenerationService.getWeeklyReportOfEmployeeByIdAndWeek(employeeId, week);
		  }
	 
		 
		 /**
			 * getWeeklyReportOfAllEmployeeByWeek(-) method display the working details of an employee for a week using line chart.
			 * @throws ParseException 
			 * */
			 @RequestMapping(value = "/getWeeklyReportOfAllEmployeeByWeek", method = RequestMethod.POST)
			  public @ResponseBody String getWeeklyReportOfAllEmployeeByWeek(@RequestParam("week") String week) throws ParseException {
			   logger.info("inside ReportGenerationController getWeeklyReportOfEmployeeByIdAndWeek()");

			   return reportGenerationService.getWeeklyReportOfAllEmployeeByWeek(week);
			  }
	 
	 /**
		 * getEmployeeReportForWeekByIdAndWeekDate(-,-) method takes employeeId,weekDate as a
		 * inputs and displays employee working details during given period of
		 * time.
		 * @throws Exception 
		 */
		@RequestMapping(value = "/getEmployeeReportForWeekByIdAndWeekDate", method = RequestMethod.POST)
		public @ResponseBody
		String getEmployeeReportForWeekByIdAndWeekDate(@RequestParam("employeeId") int employeeId,
				@RequestParam("weekDate") String weekDate) throws Exception {
			logger.info("inside ReportGenerationController getEmployeeReportForWeekByIdAndWeekDate()");
			
			logger.info("Employee ID:"+employeeId);
			
			logger.info("Date: "+weekDate);
			
			return reportGenerationService
					.getEmployeeReportForWeekByIdAndWeekDate(employeeId,weekDate);
		}
	 
		/**
		 * getAllEmployeeReportForWeekByWeekDate(-) method takes month as a
		 * inputs and displays all employees working details during given period of
		 * time.
		 * @throws Exception 
		 */
		@RequestMapping(value = "/getAllEmployeeReportForWeekByWeekDate", method = RequestMethod.POST)
		public @ResponseBody
		String getAllEmployeeReportForWeekByWeekDate(@RequestParam("weekDate") String weekDate) throws Exception {
			logger.info("inside ReportGenerationController getAllEmployeeReportForWeekByWeekDate()");
			
			logger.info("Date in getAllEmployeeReportForWeekByWeekDate : "+weekDate);
			
			return reportGenerationService
					.getAllEmployeeReportForWeekByWeekDate(weekDate);
		}
		
		
		 /**
		 * getEmployeeReportForMonthByIdAndMonth(-,-) method takes employeeId,month as a
		 * inputs and displays employee working details during given period of
		 * time.
		 * @throws Exception 
		 */
		@RequestMapping(value = "/getEmployeeReportForMonthByIdAndMonth", method = RequestMethod.POST)
		public @ResponseBody
		String getEmployeeReportForMonthByIdAndMonth(@RequestParam("employeeId") int employeeId,
				@RequestParam("month") String month) throws Exception {
			logger.info("inside ReportGenerationController getEmployeeReportForMonthByIdAndMonth()");
			
			logger.info("Employee ID:"+employeeId);
			
			logger.info("Month: "+month);
			
			return reportGenerationService
					.getEmployeeReportForMonthByIdAndMonth(employeeId,month);
		}
		
		
		/**
		 * getAllEmployeeReportForMonthByMonth(-) method takes month as a
		 * inputs and displays all employees working details during given period of
		 * time.
		 * @throws Exception 
		 */
		@RequestMapping(value = "/getAllEmployeeReportForMonthByMonth", method = RequestMethod.POST)
		public @ResponseBody
		String getAllEmployeeReportForMonthByMonth(@RequestParam("month") String month) throws Exception {
			logger.info("inside ReportGenerationController getAllEmployeeReportForMonthByMonth()");
			
			logger.info("Month in getAllEmployeeReportForMonthByMonth : "+month);
			
			return reportGenerationService
					.getAllEmployeeReportForMonthByMonth(month);
		}	
		
		
		 /**
		 * getEmployeeReportForYearByIdAndYear(-,-) method takes employeeId,year as a
		 * inputs and displays employee working details during given particular
		 * year.
		 */
		@RequestMapping(value = "/getEmployeeReportForYearByIdAndYear", method = RequestMethod.POST)
		public @ResponseBody
		String getEmployeeReportForYearByIdAndYear(@RequestParam("employeeId") int employeeId,
				@RequestParam("year") String year) throws Exception {
			logger.info("inside ReportGenerationController getEmployeeReportForYearByIdAndYear()");
			
			    
			    return reportGenerationService.getEmployeeReportForYearByIdAndYear(employeeId,year);
		}
		
		/**
		 * getAllEmployeeReportForMonthByMonth(-) method takes month as a
		 * inputs and displays all employees working details during given period of
		 * time.
		 * @throws Exception 
		 */
		@RequestMapping(value = "/getAllEmployeeReportForYearByYearDate", method = RequestMethod.POST)
		public @ResponseBody
		String getAllEmployeeReportForYearByYearDate(@RequestParam("yearDate") String yearDate) throws Exception {
			logger.info("inside ReportGenerationController getAllEmployeeReportForYearByYearDate()");
			
			logger.info("Year in getAllEmployeeReportForYearByYearDate : "+yearDate);
			
			return reportGenerationService
					.getAllEmployeeReportForYearByYearDate(yearDate);
		}	
		
		
		/**
		 * getMonthlyProductivityOfEmployeeByIdAndMonth(-) method takes emoployeeId, month as a
		 * inputs and displays all employees working details during given period of
		 * time.
		 * @throws Exception 
		 */
		@RequestMapping(value = "/getMonthlyProductivityOfEmployeeByIdAndMonth", method = RequestMethod.POST)
		public @ResponseBody String getMonthlyProductivityOfEmployeeByIdAndMonth(@RequestParam("employeeId") int employeeId,@RequestParam("month") String month){
			logger.info("inside ReportGenerationController getMonthlyProductivityOfEmployeeByIdAndMonth()");
			
			logger.info("Month in getMonthlyProductivityOfEmployeeByIdAndMonth : "+month);
			
			return reportGenerationService
					.getMonthlyProductivityOfEmployeeByIdAndMonth(employeeId,month);
		}	
		
		/**
		 * getAllEmployeeReportForMonthByMonth(-) method takes month as a
		 * inputs and displays all employees working details during given period of
		 * time.
		 * @throws Exception 
		 */
		@RequestMapping(value = "/getMonthlyProductivityOfAllEmployeeByMonth", method = RequestMethod.POST)
		public @ResponseBody String getMonthlyProductivityOfAllEmployeeByMonth(@RequestParam("month") String month){
			logger.info("inside ReportGenerationController getMonthlyProductivityOfAllEmployeeByMonth()");
			
			logger.info("Month in getMonthlyProductivityOfAllEmployeeByMonth : "+month);
			
			return reportGenerationService
					.getMonthlyProductivityOfAllEmployeeByMonth(month);
		}	
		
		
		
		
		/**
		  * This method is to find individual employee productivity 
		  * for given year  
		  */
		 @RequestMapping(value = "/getEmployeeAnnualProductivity", method = RequestMethod.POST)
		  public @ResponseBody String getEmployeeAnnualProductivity(@RequestParam("employeeId") int employeeId,
		    @RequestParam("year") int year) 
		 {
		   logger.info("inside ReportGenerationController getEmployeeAnnualProductivity()");
		   logger.info("data received: employee id: "+employeeId+"  year: "+year);
		   
		   return reportGenerationService.getEmployeeAnnualProductivity(employeeId, year);
		   
		  }
		 
		 /**
		  * This method is to find all employee productivity 
		  * for given year  
		  */
		 @RequestMapping(value = "/getAllEmployeeAnnualProductivity", method = RequestMethod.POST)
		  public @ResponseBody String getAllEmployeeAnnualProductivity(@RequestParam("year") int year) 
		 {
		   logger.info("inside ReportGenerationController getAllEmployeeAnnualProductivity()");
		   logger.info("data received:  year: "+year);
		   
		   return reportGenerationService.getAllEmployeeAnnualProductivity(year);
		   
		  }
}
