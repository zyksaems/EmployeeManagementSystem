package com.caprusit.ems.service;

import java.text.DateFormat;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
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
	
	 private int workingHoursPerDay=9,daysPerMonth=26;
      
	
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

	public String getEmployeeWorkingDetailsById(int employeeId) {
		logger.info("inside ReportGenerationServiceImpl getEmployeeWorkingDetailsById(-)");
		
		List<Object> empData =reportGenerationDAO.getSingleEmployeeDetailsById(employeeId);
			int empId=0;
		  String employeeName=null,employeeDesignation=null;
		  if (empData != null) {
		   Object[] data = (Object[]) empData.get(0);
		   if (data != null && data.length > 0) {
		    logger.info("Emp name:" + (String) data[1] + "  "+ (String) data[2]);    
		    empId=(Integer)data[0];
		    employeeName=(String) data[1]+ (String) data[2];
		    employeeDesignation=(String)data[3];
		   }
		  }
		  List<Attendance> listOfEmpReport= reportGenerationDAO.getEmployeeWorkingDetailsById(empId);
		  Map<Object,Object> employeeReportMap=new HashMap<Object, Object>();
		  employeeReportMap.put("empId",empId);
		  employeeReportMap.put("empName", employeeName);
		  employeeReportMap.put("empDesignation", employeeDesignation);
		  employeeReportMap.put("employeeReport", listOfEmpReport);
		  logger.info("single employee report detais on map: "+employeeReportMap);
		  
		  return JsonUtility.convertToJson(employeeReportMap);
		 }

	public String getEmployeeWorkingDetailsByIdAndDate(int employeeId, Date attendanceDate) {
		logger.info("Inside ReportGenerationServiceImpl getEmployeeWorkingDetailsByIdAndDate(-,-) method ");
		
		List<Object> empData =reportGenerationDAO.getSingleEmployeeDetailsById(employeeId);
		  String employeeName=null,employeeDesignation=null;
		  int empId=0;
		  if (empData != null) {
		   Object[] data = (Object[]) empData.get(0);
		   if (data != null && data.length > 0) {
		    logger.info("Emp name:" + (String) data[1] + "  "+ (String) data[2]);   
		    empId=(Integer)data[0];
		    employeeName=(String) data[1]+ (String) data[2];
		    employeeDesignation=(String)data[3];
		   }
		  }
		  List<Attendance> listOfEmpReport= reportGenerationDAO.getEmployeeWorkingDetailsByIdAndDate(empId, attendanceDate);
		  Map<String,Object> employeeReportMap=new HashMap<String, Object>();
		  employeeReportMap.put("empId",empId);
		  employeeReportMap.put("empName", employeeName);
		  employeeReportMap.put("empDesignation", employeeDesignation);
		  employeeReportMap.put("employeeReport", listOfEmpReport);
		  logger.info("single employee report detais on map: "+employeeReportMap);
		  
		  return JsonUtility.convertToJson(employeeReportMap);
	}

	public String getEmployeeWorkingDetailsByDates(int employeeId, Date fromDate, Date toDate) {
		logger.info("Inside ReportGenerationServiceImpl getAllEmployeeReport() method ");
		
		List<Object> empData =reportGenerationDAO.getSingleEmployeeDetailsById(employeeId);
		
		  String employeeName=null,employeeDesignation=null;
		  int empId=0;
		  if (empData != null) {
		   Object[] data = (Object[]) empData.get(0);
		   if (data != null && data.length > 0) {
		    logger.info("Emp name:" + (String) data[1] + "  "+ (String) data[2]);   
		    empId=(Integer)data[0];
		    employeeName=(String) data[1]+ (String) data[2];
		    employeeDesignation=(String)data[3];
		   }
		  }
		  List<Attendance> listOfEmpReport= reportGenerationDAO.getEmployeeWorkingDetailsByDates(empId, fromDate, toDate);
		  Map<String,Object> employeeReportMap=new HashMap<String, Object>();
		  employeeReportMap.put("empId",empId);
		  employeeReportMap.put("empName", employeeName);
		  employeeReportMap.put("empDesignation", employeeDesignation);
		  employeeReportMap.put("employeeReport", listOfEmpReport);
		  logger.info("single employee report detais on map: "+employeeReportMap);
		  
		  return JsonUtility.convertToJson(employeeReportMap);
	}

	public String getSingleEmployeeDetailsById(int employeeId) {
		logger.info("inside ReportGenerationServiceImpl login()");
		List<Object> empData = reportGenerationDAO.getSingleEmployeeDetailsById(employeeId);

		return JsonUtility.convertToJson(empData);
	}

	public String getSingleEmployeeDetailsByEmpName(String employeeId) {
		logger.info("inside ReportGenerationServiceImpl getEmployeeWorkingDetailsByName()");
		
		String string = employeeId;
		String[] parts = string.split(",");
		String firstName = parts[0];
		String lastName = parts[1];
		logger.info("FirstName:" + firstName);
		logger.info("lastname:" + lastName);
		
		List<Object> empData = reportGenerationDAO.getSingleEmployeeDetailsByEmpName(firstName, lastName);

		return JsonUtility.convertToJson(empData);
	}

	public String getReportByName(String  employeeId) {
		logger.info("Inside ReportGenerationServiceImpl getReportByName(empId) method ");
		
		String string = employeeId;
		 int empId=0;
		String employeeName=null,employeeDesignation=null;
		String[] parts = string.split(",");
		String firstName = parts[0];
		String lastName = parts[1];
		logger.info("FirstName:" + firstName);
		logger.info("lastname:" + lastName);

		List<Object> empData = reportGenerationDAO.getSingleEmployeeDetailsByEmpName(firstName,lastName);
		
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				logger.info("Emp name:" + firstName + "  "+ lastName);    
				 	empId=(Integer)data[0];
				    employeeName=(String) data[1]+ (String) data[2];
				    employeeDesignation=(String)data[3];
				   }
			}
		
		 List<Attendance> listOfEmpReport= reportGenerationDAO.getReportByName(empId);
		  Map<String,Object> employeeReportMap=new HashMap<String, Object>();
		  employeeReportMap.put("empId",empId);
		  employeeReportMap.put("empName", employeeName);
		  employeeReportMap.put("empDesignation", employeeDesignation);
		  employeeReportMap.put("employeeReport", listOfEmpReport);
		  logger.info("single employee report detais on map: "+employeeReportMap);
		  
		  return JsonUtility.convertToJson(employeeReportMap);
	}

	public String  getReportByDay(String employeeId, Date attendanceDate) {
		logger.info("Inside ReportGenerationServiceImpl getReportByDay(empId) method ");
		String string = employeeId;
		 int empId=0;
		String employeeName=null,employeeDesignation=null;
		String[] parts = string.split(",");
		String firstName = parts[0];
		String lastName = parts[1];
		logger.info("FirstName:" + firstName);
		logger.info("lastname:" + lastName);

		List<Object> empData = reportGenerationDAO.getSingleEmployeeDetailsByEmpName(firstName,lastName);
		
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				logger.info("Emp name:" + firstName + "  "+ lastName);    
				 	empId=(Integer)data[0];
				    employeeName=(String) data[1]+ (String) data[2];
				    employeeDesignation=(String)data[3];
				   }
			}
		
		 List<Attendance> listOfEmpReport= reportGenerationDAO.getReportByDay(empId,attendanceDate);
		  Map<String,Object> employeeReportMap=new HashMap<String, Object>();
		  employeeReportMap.put("empId",empId);
		  employeeReportMap.put("empName", employeeName);
		  employeeReportMap.put("empDesignation", employeeDesignation);
		  employeeReportMap.put("employeeReport", listOfEmpReport);
		  logger.info("single employee report detais on map: "+employeeReportMap);
		  
		  return JsonUtility.convertToJson(employeeReportMap);
	}

	public String getReportByNameDates(String employeeId, Date fromDate, Date toDate) {
		logger.info("Inside ReportGenerationServiceImpl getReportByNameDates() method ");
		
		String string = employeeId;
		 int empId=0;
		String employeeName=null,employeeDesignation=null;
		String[] parts = string.split(",");
		String firstName = parts[0];
		String lastName = parts[1];
		logger.info("FirstName:" + firstName);
		logger.info("lastname:" + lastName);

		List<Object> empData = reportGenerationDAO.getSingleEmployeeDetailsByEmpName(firstName,lastName);
		
		if (empData != null) {
			Object[] data = (Object[]) empData.get(0);
			if (data != null && data.length > 0) {
				logger.info("Emp name:" + firstName + "  "+ lastName);    
				 	empId=(Integer)data[0];
				    employeeName=(String) data[1]+ (String) data[2];
				    employeeDesignation=(String)data[3];
				   }
			}
		
		 List<Attendance> listOfEmpReport= reportGenerationDAO.getReportByNameDates(empId,fromDate, toDate);
		  Map<String,Object> employeeReportMap=new HashMap<String, Object>();
		  employeeReportMap.put("empId",empId);
		  employeeReportMap.put("empName", employeeName);
		  employeeReportMap.put("empDesignation", employeeDesignation);
		  employeeReportMap.put("employeeReport", listOfEmpReport);
		  logger.info("single employee report detais on map: "+employeeReportMap);
		  
		  return JsonUtility.convertToJson(employeeReportMap);
	}

	public String getAllEmployeesWorkingDetails() {
		logger.info("inside ReportGenerationServiceImpl getAllEmployeesWorkingDetails()");
		List<Attendance> employeeList = reportGenerationDAO.getAllEmployeesWorkingDetails();

		return JsonUtility.convertToJson(employeeList);
	}

	public String getAllEmployeesReportByDate(Date attendanceDate) {
		logger.info("inside ReportGenerationServiceImpl getAllEmployeesReport()");
		List<Attendance> empData = reportGenerationDAO.getAllEmployeesReportByDate(attendanceDate);

		return  JsonUtility.convertToJson(empData);
	}

	public String getEmployeesReportBetweenDates(Date fromDate, Date toDate) {
		logger.info("inside ReportGenerationServiceImpl getEmployeesReportBetweenDates()");
		List<Attendance> empData = reportGenerationDAO.getEmployeesReportBetweenDates(fromDate, toDate);

		return  JsonUtility.convertToJson(empData);
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
	
	 @SuppressWarnings("unchecked")
	public String getDailyReportOfIndividual(int employeeId, Date attendanceDate) {
		    logger.info("inside ReportGenerationServiceImpl getDailyReportOfIndividual()");
		    Date lastDate=null;
		    Double workingHours=0.0,totalAvailableHours=0.0;
		    int onDayHours=workingHoursPerDay;
		    Double totalWorkingHours=0.0;
		    String dayNames[] = new DateFormatSymbols().getWeekdays();
		      
		    Calendar cal = Calendar.getInstance();
		    
		    List<Attendance> attendanceDetails= new ArrayList<Attendance>(); 
		    
		    Map<String,Object> allMap = reportGenerationDAO.getDailyReportOfIndividual(employeeId, attendanceDate);
		    attendanceDetails=(List<Attendance>) allMap.get("ListOfLine");
		    lastDate =(Date) allMap.get("LastDate");
		    logger.info("Attednace List is:"+attendanceDetails);
		  
		    Map<String,Double> dayAndWork=new HashMap<String, Double>();
		    
		    cal.setTime(attendanceDate);
		     String startDay=dayNames[cal.get(Calendar.DAY_OF_WEEK)];
		     cal.setTime(lastDate);
		     String lastDay=dayNames[cal.get(Calendar.DAY_OF_WEEK)];
		              
		     List<String> presentDays=new ArrayList<String>();
		     
		    for(int i=0; i<attendanceDetails.size();i++){
		    attendanceDate=attendanceDetails.get(i).getAttendanceDate();
		     cal.setTime(attendanceDate);

		     workingHours=attendanceDetails.get(i).getWorkingHours();
		     dayAndWork.put(dayNames[cal.get(Calendar.DAY_OF_WEEK)],workingHours);
		     presentDays.add(dayNames[cal.get(Calendar.DAY_OF_WEEK)]);
		     
		     totalWorkingHours+=workingHours;
		       
		     totalAvailableHours+=onDayHours;    
		      }
		   
		    Map<String,Object> graphDetails= new HashMap<String, Object>();
		    graphDetails.put("dayAndWork",dayAndWork);
		    graphDetails.put("totalWorkingHours",totalWorkingHours);
		    graphDetails.put("oneDayHours",onDayHours);
		    graphDetails.put("totalAvailableHours",totalAvailableHours);
		    graphDetails.put("startDay",startDay);
		    graphDetails.put("lastDay",lastDay);
		    graphDetails.put("presentDays", presentDays);
		    return JsonUtility.convertToJson(graphDetails);
		   }
    /**
     * This method is to calculate individual employee 
     * monthly productivity based on given year
     */
	public String getEmployeeMonthlyProductivity(int employeeId, int year) {

		  logger.info("inside ReportGenerationServiceImpl getEmployeeMonthlyProductivity(-,-) method");
		  
        Calendar calendar=Calendar.getInstance();
        double[] workingHoursArray=new double[12];
        double[] nonWorkingHoursArray=new double[12];
        int listSize;
        double actualWorkingHours=daysPerMonth*workingHoursPerDay;
        
        String employeeName = null,employeeDesignation = null;
        calendar.set(year, 0, 1);
        Date YearstartDate=calendar.getTime();
        calendar.set(year, 11,31);
        Date yearEndDate=calendar.getTime();
        logger.info("employee monthly report year start date : "+YearstartDate+"  year end date: "+yearEndDate);
        List<Attendance> employeeMonthlyData=reportGenerationDAO.getEmployeeWorkingDetailsByDates(employeeId,YearstartDate,yearEndDate);
        listSize=employeeMonthlyData.size();
        logger.info("attendance details received for monthly individual employee results: "+employeeMonthlyData);
        logger.info("monthly employee report data size: "+listSize);
        
        
        calculateWorkingHours(workingHoursArray, employeeMonthlyData);
        
        calculateNonWorkingHours(nonWorkingHoursArray, actualWorkingHours, workingHoursArray);
        
        List<Object> employeeDetails=reportGenerationDAO.getSingleEmployeeDetailsById(employeeId);
        logger.info("employee details: "+employeeDetails);
        if(employeeDetails.get(0)!= null ){
        	Object[] details=(Object[])employeeDetails.get(0);
        	employeeDesignation=(String)details[3];
        	employeeName=details[1]+" "+details[2];
        }
        Map<String,Object> employeeMonthlyReportMap=new HashMap<String, Object>(); 
        employeeMonthlyReportMap.put("workingHoursArray", workingHoursArray);
        employeeMonthlyReportMap.put("nonWorkingHoursArray", nonWorkingHoursArray);
        employeeMonthlyReportMap.put("employeeName",employeeName );
        employeeMonthlyReportMap.put("employeeDesignation", employeeDesignation);
        
		return JsonUtility.convertToJson(employeeMonthlyReportMap);
	}
	
	/**
     * This method is to calculate All employee 
     * monthly productivity based on given year
     */
	public String getAllEmployeeMonthlyProductivity(int year) {
		
		 logger.info("inside ReportGenerationServiceImpl getAllEmployeeMonthlyProductivity(-) method");
		
		 double[] workingHoursArray=new double[12];
         double[] nonWorkingHoursArray=new double[12];
         double actualWorkingHours=daysPerMonth*workingHoursPerDay;
         
		 Calendar calendar=Calendar.getInstance();
		 calendar.set(year, 0, 1);
	     Date yearstartDate=calendar.getTime();
	     calendar.set(year, 11,31);
	     Date yearEndDate=calendar.getTime();	        
	     List<Attendance> allEmployeeMonthlyData= reportGenerationDAO.getEmployeesReportBetweenDates(yearstartDate,yearEndDate);
	     //calculate working hours
	     calculateWorkingHours(workingHoursArray, allEmployeeMonthlyData);
	     //calculate non working hours
	     calculateNonWorkingHours(nonWorkingHoursArray, actualWorkingHours, workingHoursArray);
	     Map<String,Object> allEmployeeMonthlyReportMap=new HashMap<String, Object>(); 
	     allEmployeeMonthlyReportMap.put("workingHoursArray", workingHoursArray);
	     allEmployeeMonthlyReportMap.put("nonWorkingHoursArray", nonWorkingHoursArray);
		 return JsonUtility.convertToJson(allEmployeeMonthlyReportMap);
	}
	/*This method is to calculate monthly working hours*/
	private void calculateWorkingHours(double[] workingHoursArray,List<Attendance> attendanceDetailsList){
		int listSize=attendanceDetailsList.size(),month;
		Attendance attendanceObj;
		Calendar calendar = Calendar.getInstance();
		for(int i=0;i<listSize;i++){
        	attendanceObj=attendanceDetailsList.get(i);
        	calendar.setTime(attendanceObj.getAttendanceDate());
        	month=calendar.get(Calendar.MONTH);
        	workingHoursArray[month]+=attendanceObj.getWorkingHours();
       
        }
	}
	/*This method is to calculate monthly non working hours*/
	private void calculateNonWorkingHours(double[] nonWorkingHoursArray,double workingHoursPerMonth,double[] workingHoursArray){
		
        for(int i=0;i<12;i++){
        	
        	nonWorkingHoursArray[i]=workingHoursPerMonth-workingHoursArray[i];
        	
        }
	}

	/**
     * getEmployeeReportForWeekByIdAndWeekDate(-,-) method takes int employeeId and  string weekDate as parameters ,
     * and we will convert String weekDate to  java.util.Date and send to EmployeeReportGenerationDAO getEmployeeWorkingDetailsByDates(-,-,-)
     *  method to get employee working details for particular week.
     */
	public String getEmployeeReportForWeekByIdAndWeekDate(int employeeId, String weekDate) throws Exception {
		
		logger.info("inside ReportGenerationServiceImpl getEmployeeReportForWeekByIdAndWeekDate(-,-) method");
		
	     String weekdate[]=weekDate.split("-");
	     
	     String week_year=weekdate[0];
	     String week_weeknumber=weekdate[1];
	     
	     String week_weeknumber_remove=week_weeknumber.substring(1, week_weeknumber.length());
	     
	     int week_parseyear=Integer.parseInt(week_year);
	     int week_parseweeknumber=Integer.parseInt(week_weeknumber_remove);
	     
	     int week_parseweeknumberstart=week_parseweeknumber+1;
	    
	     logger.info(week_parseyear);
	     logger.info(week_parseweeknumber);
	     
	   
	     // Get calendar, clear it and set week number and year.
	     Calendar calendar = Calendar.getInstance();
	     calendar.clear();
	     calendar.set(Calendar.WEEK_OF_YEAR, week_parseweeknumberstart);
	     calendar.set(Calendar.YEAR, week_parseyear);

	     // Now get the first day of week.
	     Date startdate = calendar.getTime();
	     
	     Calendar last = (Calendar) calendar.clone();
	     last.add(Calendar.DAY_OF_YEAR, 6);

	     // print the result
	     SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	     
	     
	     logger.info(df.format(startdate.getTime()) + " -> " + 
	                        df.format(last.getTime()));
	     logger.info(startdate);
	     
	     String startDatestr=df.format(startdate.getTime());
	     String endDatestr=df.format(last.getTime());
	     
	     DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	     
	     Date fromDate = (Date)formatter.parse(startDatestr);
	     Date toDate = (Date)formatter.parse(endDatestr);
	     
	     logger.info("From Date is :" +fromDate);
		
	     logger.info("To date is:"+toDate);
		
		return JsonUtility.convertToJson(reportGenerationDAO.getEmployeeWorkingDetailsByDates(employeeId, fromDate, toDate));
	}
	
	/**
     * getEmployeeReportForWeekByIdAndWeekDate(-,-) method take string weekDate as parameters ,
     * and we will convert String weekDate to  java.util.Date and send to EmployeeReportGenerationDAO getEmployeesReportBetweenDates(-,-) method
     *  to get the working details of all employee between particular week.
     */
	public String getAllEmployeeReportForWeekByWeekDate(String weekDate) throws Exception {
		
		logger.info("Inside ReportGenerationServiceImpl getAllEmployeeReportForWeekByWeekDate(-) method	"); 
		String weekdate[]=weekDate.split("-");
	     
	     String week_year=weekdate[0];
	     String week_weeknumber=weekdate[1];
	     
	     String week_weeknumber_remove=week_weeknumber.substring(1, week_weeknumber.length());
	     
	     int week_parseyear=Integer.parseInt(week_year);
	     int week_parseweeknumber=Integer.parseInt(week_weeknumber_remove);
	     
	     int week_parseweeknumberstart=week_parseweeknumber+1;
	    
	     logger.info(week_parseyear);
	     logger.info(week_parseweeknumber);
	     
	   
	     // Get calendar, clear it and set week number and year.
	     Calendar calendar = Calendar.getInstance();
	     calendar.clear();
	     calendar.set(Calendar.WEEK_OF_YEAR, week_parseweeknumberstart);
	     calendar.set(Calendar.YEAR, week_parseyear);

	     // Now get the first day of week.
	     Date startdate = calendar.getTime();
	     
	     Calendar last = (Calendar) calendar.clone();
	     last.add(Calendar.DAY_OF_YEAR, 6);

	     // print the result
	     SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	     
	     
	     logger.info(df.format(startdate.getTime()) + " -> " + 
	                        df.format(last.getTime()));
	     logger.info(startdate);
	     
	     String startDatestr=df.format(startdate.getTime());
	     String endDatestr=df.format(last.getTime());
	     
	     DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	     
	     Date fromDate = (Date)formatter.parse(startDatestr);
	     Date toDate = (Date)formatter.parse(endDatestr);
	     
	     logger.info("From Date in getAllEmployeeReportForWeekByWeekDate :" +fromDate);
		
	     logger.info("To date in getAllEmployeeReportForWeekByWeekDate:"+toDate);
		
		return JsonUtility.convertToJson(reportGenerationDAO.getEmployeesReportBetweenDates(fromDate, toDate));
	}
	
	/**
     * getEmployeeReportForMonthByIdAndMonth(-,-) method takes int employeeId and  string month as parameters ,
     * and we will convert String month to  java.util.Date and send to EmployeeReportGenerationDAO getEmployeeWorkingDetailsByDates(-,-)
     * method  to get employee working details for particular month.
     */
	public String getEmployeeReportForMonthByIdAndMonth(int employeeId, String month) {
		
		logger.info("Inside ReportGenerationServiceImpl getEmployeeReportForMonthByIdAndMonth(-,-) method	");
		
		 String monthdate[]=month.split("-");
	     String month_year=monthdate[0];
	     String month_monthnumber=monthdate[1];
	     
	     int month_parseyear=Integer.parseInt(month_year);
	     int month_parsemonthnumber=Integer.parseInt(month_monthnumber);
	     
	     Calendar calendar = Calendar.getInstance();
	     calendar.clear();
	     calendar.set(Calendar.DAY_OF_MONTH, 1);
	     calendar.set(Calendar.MONTH, month_parsemonthnumber-1);
	     calendar.set(Calendar.YEAR, month_parseyear);

	     Date fromDate = calendar.getTime();
	     calendar.set(Calendar.DAY_OF_MONTH,
	    		  calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
	     
	     Date toDate=calendar.getTime();
	     logger.info("From Date is :" +fromDate);
	     logger.info("To date is:"+toDate);
		
		return JsonUtility.convertToJson(reportGenerationDAO.getEmployeeWorkingDetailsByDates(employeeId, fromDate, toDate));
	}
	
	
	
	/**
     * getAllEmployeeReportForMonthByMonth(-) method take string month as parameters ,
     * and we will convert String month to  java.util.Date and send to EmployeeReportGenerationDAO getEmployeesReportBetweenDates(-,-)
     * method  to get employee working details for particular month.
     */
	public String getAllEmployeeReportForMonthByMonth(String month) {
		
		logger.info("Inside ReportGenerationServiceImpl getAllEmployeeReportForMonthByMonth(-) method	");
		
		 String monthdate[]=month.split("-");
	     String month_year=monthdate[0];
	     String month_monthnumber=monthdate[1];
	     
	     int month_parseyear=Integer.parseInt(month_year);
	     int month_parsemonthnumber=Integer.parseInt(month_monthnumber);
	     
	     Calendar calendar = Calendar.getInstance();
	     calendar.clear();
	     calendar.set(Calendar.DAY_OF_MONTH, 1);
	     calendar.set(Calendar.MONTH, month_parsemonthnumber-1);
	     calendar.set(Calendar.YEAR, month_parseyear);

	     Date fromDate = calendar.getTime();
	     calendar.set(Calendar.DAY_OF_MONTH,
	    		  calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
	     
	     Date toDate=calendar.getTime();
	     logger.info("From Date in getAllEmployeeReportForMonthByMonth  :" +fromDate);
	     logger.info("To date in getAllEmployeeReportForMonthByMonth:"+toDate);
		
		return JsonUtility.convertToJson(reportGenerationDAO.getEmployeesReportBetweenDates(fromDate, toDate));
	}

	
	
	/**
     * getEmployeeReportForYearByIdAndYear(-,-) method takes int employeeId and  string year as parameters ,
     * and we will convert String year to  java.util.Date and send to EmployeeReportGenerationDAO getEmployeeWorkingDetailsByDates(-,-,-)
     * method  to get employee working details for particular month.
     */
	public String getEmployeeReportForYearByIdAndYear(int employeeId, String year) {
		
			logger.info("Inside ReportGenerationServiceImpl getEmployeeReportForYearByIdAndYear(-,-) method	");
			logger.info("Employee ID:"+employeeId);
		
			int yearDate= Integer.parseInt(year);
			logger.info("Entered Year: "+yearDate);
		
		    Calendar calendarStart=Calendar.getInstance();
		    calendarStart.set(Calendar.YEAR,yearDate);
		    
		    calendarStart.set(Calendar.MONTH,0);
		    
		    calendarStart.set(Calendar.DAY_OF_MONTH,1);
		    
		    // returning the first date
		    Date startDate=calendarStart.getTime();
		    logger.info("First Day of the Year:" + startDate);

		    Calendar calendarEnd=Calendar.getInstance();
		    calendarEnd.set(Calendar.YEAR,yearDate);
		    calendarEnd.set(Calendar.MONTH,11);
		    calendarEnd.set(Calendar.DAY_OF_MONTH,31);

		    // returning the last date
		    Date endDate=calendarEnd.getTime();
		    logger.info("End Date:"+endDate);
		
		    return JsonUtility.convertToJson(reportGenerationDAO.getEmployeeWorkingDetailsByDates(employeeId, startDate, endDate));
	}
	
	/**
     * getAllEmployeeReportForYearByYearDate(-) method take string yearDate as parameters ,
     * and we will convert String yearDate to  java.util.Date and send to EmployeeReportGenerationDAO getEmployeesReportBetweenDates(-,-)
     * method  to get employee working details for particular month.
     */
	
	public String getAllEmployeeReportForYearByYearDate(String yearDate) {
		
		logger.info("Inside ReportGenerationServiceImpl getEmployeeReportForYearByIdAndYear(-,-) method	");
		
		int year= Integer.parseInt(yearDate);
		logger.info("Entered Year: "+year);
	
	    Calendar calendarStart=Calendar.getInstance();
	    calendarStart.set(Calendar.YEAR,year);
	    
	    calendarStart.set(Calendar.MONTH,0);
	    
	    calendarStart.set(Calendar.DAY_OF_MONTH,1);
	    
	    // returning the first date
	    Date startDate=calendarStart.getTime();
	    logger.info("First Day of the Year:" + startDate);

	    Calendar calendarEnd=Calendar.getInstance();
	    calendarEnd.set(Calendar.YEAR,year);
	    calendarEnd.set(Calendar.MONTH,11);
	    calendarEnd.set(Calendar.DAY_OF_MONTH,31);

	    // returning the last date
	    Date endDate=calendarEnd.getTime();
	    logger.info("End Date:"+endDate);
	
	    return JsonUtility.convertToJson(reportGenerationDAO.getEmployeesReportBetweenDates(startDate, endDate));
	}
}
