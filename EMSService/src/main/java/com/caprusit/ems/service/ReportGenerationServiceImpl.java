package com.caprusit.ems.service;

import java.text.DateFormatSymbols;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caprusit.ems.conditions.EmsConditions;
import com.caprusit.ems.dao.IAttendanceDAO;
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
	
	@Autowired
	private IAttendanceDAO attendanceDAO;
	
	 private int workingHoursPerDay=EmsConditions.WORKING_HOURS_PER_DAY,daysPerMonth=EmsConditions.WORKING_DAYS_PER_MONTH;
      
	
	private Logger logger = Logger.getLogger(ReportGenerationServiceImpl.class);

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public List<Integer> getAutoCompleteInfo(int employeeId) {
		logger.info("Inside ReportGenerationServiceImpl getAutoCompleteInfo() method ");
		List<Integer> result = reportGenerationDAO.getAutoCompleteInfo(employeeId);
		logger.info("info list in sevice: " + result);
		return result;
	}

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public List<String> getAutoCompleteInfo(String employeeId) {
		logger.info("Inside ReportGenerationServiceImpl getAutoCompleteInfo(String) method ");
		List<String> result = reportGenerationDAO.getAutoCompleteInfo(employeeId);
		logger.info("info list in sevice: " + result);
		return result;
	}
	
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
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

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
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

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
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

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getSingleEmployeeDetailsById(int employeeId) {
		logger.info("inside ReportGenerationServiceImpl login()");
		List<Object> empData = reportGenerationDAO.getSingleEmployeeDetailsById(employeeId);

		return JsonUtility.convertToJson(empData);
	}

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
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

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
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

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
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

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
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

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getAllEmployeesWorkingDetails() {
		logger.info("inside ReportGenerationServiceImpl getAllEmployeesWorkingDetails()");
		List<Attendance> employeeList = reportGenerationDAO.getAllEmployeesWorkingDetails();

		return JsonUtility.convertToJson(employeeList);
	}

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getAllEmployeesReportByDate(Date attendanceDate) {
		logger.info("inside ReportGenerationServiceImpl getAllEmployeesReport()");
		List<Attendance> empData = reportGenerationDAO.getAllEmployeesReportByDate(attendanceDate);

		return  JsonUtility.convertToJson(empData);
	}

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getEmployeesReportBetweenDates(Date fromDate, Date toDate) {
		logger.info("inside ReportGenerationServiceImpl getEmployeesReportBetweenDates()");
		List<Attendance> empData = reportGenerationDAO.getEmployeesReportBetweenDates(fromDate, toDate);

		return  JsonUtility.convertToJson(empData);
	}

	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getTodayReport() {

        List<Attendance> todayPresentiesList = reportGenerationDAO.getTodayPresentAttendance();
        List<Attendance> todayLeavesList = reportGenerationDAO.getTodayLeaveAttendance();
        // add leaves + presnties
        todayPresentiesList.addAll(todayLeavesList);
        
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
	/**
	 * This method is to get today attendance details like absentees and
	 * Presenties details
	 */
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getTodayAttendanceDetails() {
		
		List<Object> absentDetailsList= attendanceDAO.getAbsentEmployeeDetails();
		List<Attendance> presentiesList = reportGenerationDAO.getTodayPresentAttendance();
		List<Attendance> leavesList = reportGenerationDAO.getTodayLeaveAttendance();
		Map<String,Object>  toDayReportMap=new HashMap<String,Object>();		
		toDayReportMap.put("presentiesList",presentiesList);
		toDayReportMap.put("absenteesList",absentDetailsList);
		toDayReportMap.put("leavesList",leavesList);
		return JsonUtility.convertToJson(toDayReportMap);
	}
	
	 @SuppressWarnings("unchecked")
	 @Transactional(rollbackFor=HibernateException.class,readOnly=true)
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
     * annual productivity based on given year
     */
	 @Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getEmployeeAnnualProductivity(int employeeId, int year) {

		  logger.info("inside ReportGenerationServiceImpl getEmployeeMonthlyProductivity(-,-) method");
		  
        Calendar calendar=Calendar.getInstance();        
        String employeeName = null,employeeDesignation = null;
        calendar.set(year, 0, 1);
        Date YearstartDate=calendar.getTime();
        calendar.set(year, 11,31);
        Date yearEndDate=calendar.getTime();
        int endIndex=verifyEndDateAndMeasureEndIndex(yearEndDate, 2);
        
        yearEndDate=(endIndex == -1)?yearEndDate:Calendar.getInstance().getTime();	
		endIndex =( endIndex == -1 )? 12 : endIndex;
		
		double [] workingHoursArray=new double[endIndex];
		double [] nonWorkingHoursArray=new double[endIndex];
        int listSize;
        double actualWorkingHours=daysPerMonth*workingHoursPerDay;
        
        logger.info("employee monthly report year start date : "+YearstartDate+"  year end date: "+yearEndDate);
        List<Attendance> employeeMonthlyData=reportGenerationDAO.getEmployeeWorkingDetailsByDates(employeeId,YearstartDate,yearEndDate);
        listSize=employeeMonthlyData.size();
        logger.info("attendance details received for monthly individual employee results: "+employeeMonthlyData);
        logger.info("monthly employee report data size: "+listSize);
        
        //calculate working hours  pass 2 as parameter for month wise calculation
	    calculateWorkingHours(workingHoursArray, employeeMonthlyData,2);
	    //calculate non working hours 
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
     * annual productivity based on given year
     */
	 @Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getAllEmployeeAnnualProductivity(int year) {
		
		 logger.info("inside ReportGenerationServiceImpl getAllEmployeeMonthlyProductivity(-) method");
         int noOfEmployees=reportGenerationDAO.getNumberOfActiveEmployees();
         double actualWorkingHours=daysPerMonth*workingHoursPerDay*noOfEmployees;
         
		 Calendar calendar=Calendar.getInstance();
		 calendar.set(year, 0, 1);
	     Date yearstartDate=calendar.getTime();
	     calendar.set(year, 11,31);
	     Date yearEndDate=calendar.getTime();	  
	     
	     int endIndex=verifyEndDateAndMeasureEndIndex(yearEndDate, 2);
	     
	     yearEndDate =(endIndex == -1)?yearEndDate:Calendar.getInstance().getTime();		
		 endIndex =( endIndex == -1 )? 12 : endIndex;
		 
		 double [] workingHoursArray=new double[endIndex];
		 double [] nonWorkingHoursArray=new double[endIndex];
	     List<Attendance> allEmployeeMonthlyData= reportGenerationDAO.getEmployeesReportBetweenDates(yearstartDate,yearEndDate);
	     //calculate working hours  pass 2 as parameter for month wise calculation
	     calculateWorkingHours(workingHoursArray, allEmployeeMonthlyData,2);
	     //calculate non working hours
	     calculateNonWorkingHours(nonWorkingHoursArray, actualWorkingHours, workingHoursArray);
	     Map<String,Object> allEmployeeMonthlyReportMap=new HashMap<String, Object>(); 
	     allEmployeeMonthlyReportMap.put("workingHoursArray", workingHoursArray);
	     allEmployeeMonthlyReportMap.put("nonWorkingHoursArray", nonWorkingHoursArray);
		 return JsonUtility.convertToJson(allEmployeeMonthlyReportMap);
	}
	 
	/**
	 * This method is to calculate monthly/weekly working hours
	 * @param workedHoursArray  double type array to store calculated worked hours of employee
	 * @param attendanceDetailsList  List of attendance from which we can calculate worked hours
	 * @param typeOfCalculation  It defines type of calculation either month or week. For week calculation pass 1
	 *    and for month  pass 2
	 */
	private void calculateWorkingHours(double[] workedHoursArray,List<Attendance> attendanceDetailsList,int typeOfCalculation){
		int listSize=attendanceDetailsList.size();
		Attendance attendanceObj;
		Calendar calendar = Calendar.getInstance();
		
		for(int i=0;i<listSize;i++){
        	attendanceObj=attendanceDetailsList.get(i);
        	calendar.setTime(attendanceObj.getAttendanceDate());
        	logger.info("date  : "+ calendar.getTime());
        	if(typeOfCalculation == 1)      {
        		workedHoursArray[calendar.get(Calendar.DAY_OF_WEEK)-1]+=attendanceObj.getWorkingHours();     
        	}
        	else if(typeOfCalculation == 2)      		
        	   workedHoursArray[calendar.get(Calendar.MONTH)]+=attendanceObj.getWorkingHours();      
        }
	}
	/**
	 * This method is to calculate employee non working hours from given worked hours and actual work hours values
	 * 
	 * @param nonWorkingHoursArray  double type array to store calculated non working hours
	 * @param actualWorkHours  actual work hours of employee
	 * @param workedHoursArray double type array worked hours from which we can calculate non working hours
	 */
	private void calculateNonWorkingHours(double[] nonWorkingHoursArray,double actualWorkHours,double[] workedHoursArray){
		double workedHours;
		int length=nonWorkingHoursArray.length;
        for(int i=0;i<length;i++){
        	workedHours=actualWorkHours-workedHoursArray[i];
        	if(workedHours > 0)
        	  nonWorkingHoursArray[i]=workedHours;
        	else
        	  nonWorkingHoursArray[i]=0.0;        	
        }
	}

	/**
     * getEmployeeReportForWeekByIdAndWeekDate(-,-) method takes integer employeeId and  string weekDate as parameters.
     * call getEmployeeReportForWeekByIdAndWeekDate(-,-) method to get fromDate , toDate and 
     * call EmployeeReportGenerationDAO getEmployeeWorkingDetailsByDates(-,-,-) method 
     * to get employee working details for particular week.
     */
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getEmployeeReportForWeekByIdAndWeekDate(int employeeId, String weekDate) throws Exception {
		
		logger.info("inside ReportGenerationServiceImpl getEmployeeReportForWeekByIdAndWeekDate(-,-) method");
		
		  String employeeName=null,employeeDesignation=null;
			Date startDate=null,endDate=null;
		
		 List<Object> employeeDetails=reportGenerationDAO.getSingleEmployeeDetailsById(employeeId);
	        logger.info("employee details: "+employeeDetails);
	        if(employeeDetails.get(0)!= null ){
	        	Object[] details=(Object[])employeeDetails.get(0);
	        	employeeDesignation=(String)details[3];
	        	employeeName=details[1]+" "+details[2];
	        }
		
		/*Calling  getFromDateAndToDateFromWeekDate(-) method to get fromDate and toDate based on given string weekDate*/
		   
		Map<String,Date> dateValues= getFromDateAndToDateFromWeekDate(weekDate);

		startDate= dateValues.get("startDate");
		endDate=dateValues.get("endDate");

		List<Attendance> weeklyWorkingDetails=reportGenerationDAO.getEmployeeWorkingDetailsByDates(employeeId, startDate, endDate);
		
		  Map<String,Object> employeeWeeklyReportMap=new HashMap<String, Object>(); 
		  employeeWeeklyReportMap.put("weeklyWorkingDetails", weeklyWorkingDetails);
		  employeeWeeklyReportMap.put("employeeName",employeeName );
		  employeeWeeklyReportMap.put("employeeDesignation", employeeDesignation);
		logger.info("Weelkly details:"+employeeWeeklyReportMap);
		  
		return JsonUtility.convertToJson(employeeWeeklyReportMap);
	}
	
	/**
     * getAllEmployeeReportForWeekByWeekDate(-,-) method take string weekDate as parameters.
     * call getEmployeeReportForWeekByIdAndWeekDate(-) method to get fromDate , toDate and 
     * call EmployeeReportGenerationDAO getEmployeesReportBetweenDates(-,-) method 
     * to get employee working details for particular week.
     */
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getAllEmployeeReportForWeekByWeekDate(String weekDate) throws Exception {
		
		logger.info("Inside ReportGenerationServiceImpl getAllEmployeeReportForWeekByWeekDate(-) method	"); 
		
		Date startDate=null,endDate=null;
		
		/*Calling  getFromDateAndToDateFromWeekDate(-) method to get fromDate and toDate based on given string weekDate*/
		   
		Map<String,Date> dateValues= getFromDateAndToDateFromWeekDate(weekDate);

		startDate= dateValues.get("startDate");	
		endDate=dateValues.get("endDate");
		
		return JsonUtility.convertToJson(reportGenerationDAO.getEmployeesReportBetweenDates(startDate, endDate));
	}
	
	/**
     * getEmployeeReportForMonthByIdAndMonth(-,-) method takes int employeeId and  string month as parameters ,
     * and we will convert String month to  java.util.Date and send to EmployeeReportGenerationDAO getEmployeeWorkingDetailsByDates(-,-)
     * method  to get employee working details for particular month.
     */
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getEmployeeReportForMonthByIdAndMonth(int employeeId, String month) {
		
		logger.info("Inside ReportGenerationServiceImpl getEmployeeReportForMonthByIdAndMonth(-,-) method	");
		
		 String monthdate[]=month.split("-");
	     String month_year=monthdate[0];
	     String month_monthnumber=monthdate[1];
	     
		 String employeeName=null,employeeDesignation=null;
	     
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
	     
	     List<Object> employeeDetails=reportGenerationDAO.getSingleEmployeeDetailsById(employeeId);
	        logger.info("employee details: "+employeeDetails);
	        if(employeeDetails.get(0)!= null ){
	        	Object[] details=(Object[])employeeDetails.get(0);
	        	employeeDesignation=(String)details[3];
	        	employeeName=details[1]+" "+details[2];
	        }
	        List<Attendance> monthlyWorkingDetails=reportGenerationDAO.getEmployeeWorkingDetailsByDates(employeeId, fromDate, toDate);
			
			  Map<String,Object> employeeMonthlyReportMap=new HashMap<String, Object>(); 
			  employeeMonthlyReportMap.put("monthlyWorkingDetails", monthlyWorkingDetails);
			  employeeMonthlyReportMap.put("employeeName",employeeName );
			  employeeMonthlyReportMap.put("employeeDesignation", employeeDesignation);
			  
			logger.info("Monthly details:"+employeeMonthlyReportMap);
			  
			return JsonUtility.convertToJson(employeeMonthlyReportMap);
		
	}
	
	
	
	/**
     * getAllEmployeeReportForMonthByMonth(-) method take string month as parameters ,
     * and we will convert String month to  java.util.Date and send to EmployeeReportGenerationDAO getEmployeesReportBetweenDates(-,-)
     * method  to get employee working details for particular month.
     */
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
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
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getEmployeeReportForYearByIdAndYear(int employeeId, String year) {
		
			logger.info("Inside ReportGenerationServiceImpl getEmployeeReportForYearByIdAndYear(-,-) method	");
			logger.info("Employee ID:"+employeeId);
		
			int yearDate= Integer.parseInt(year);
			logger.info("Entered Year: "+yearDate);
		
			String employeeName=null,employeeDesignation=null;
			
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
		    
		    List<Object> employeeDetails=reportGenerationDAO.getSingleEmployeeDetailsById(employeeId);
	        logger.info("employee details: "+employeeDetails);
	        if(employeeDetails.get(0)!= null ){
	        	Object[] details=(Object[])employeeDetails.get(0);
	        	employeeDesignation=(String)details[3];
	        	employeeName=details[1]+" "+details[2];
	        }
	        List<Attendance> annuallyWorkingDetails=reportGenerationDAO.getEmployeeWorkingDetailsByDates(employeeId, startDate, endDate);
			
			  Map<String,Object> employeeAnnuallyReportMap=new HashMap<String, Object>(); 
			  employeeAnnuallyReportMap.put("annuallyWorkingDetails", annuallyWorkingDetails);
			  employeeAnnuallyReportMap.put("employeeName",employeeName );
			  employeeAnnuallyReportMap.put("employeeDesignation", employeeDesignation);
			  
			logger.info("Annual Report details:"+employeeAnnuallyReportMap);
			  
			return JsonUtility.convertToJson(employeeAnnuallyReportMap);
	}
	
	/**
     * getAllEmployeeReportForYearByYearDate(-) method take string yearDate as parameters ,
     * and we will convert String yearDate to  java.util.Date and send to EmployeeReportGenerationDAO getEmployeesReportBetweenDates(-,-)
     * method  to get employee working details for particular month.
     */
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
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

	/**
     * This  method is to calculate individual employee productivity for given week
     * @param employeeId employee id for productivity
     * @param weekDate week in string format like: 2016-W09
	 * @throws ParseException if unable to parse given week
	 * @return String JSON string of Map object
     */	
	@SuppressWarnings("unchecked")
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getWeeklyProductivityOfEmployeeByIdAndWeek(int employeeId, String weekDate) throws ParseException {
	
		logger.info("inside ReportGenerationServiceImpl getWeeklyProductivityOfEmployeeByIdAndWeek(-,-) method");
		//logger.info("week received: "+weekDate);
		Date weekStartDate=null, weekEndDate=null;
		Map<String,Date> dateValues= getFromDateAndToDateFromWeekDate(weekDate);
		weekStartDate= dateValues.get("startDate");
		weekEndDate=dateValues.get("endDate");
		int endIndex=verifyEndDateAndMeasureEndIndex(weekEndDate, 1);
		weekEndDate=( endIndex == -1) ? weekEndDate : Calendar.getInstance().getTime();		
		endIndex =( endIndex == -1 )? 7 : endIndex;
		double [] weekWorkedHours=new double[endIndex];
		double [] weekNonWorkedHours=new double[endIndex];
		double actucalWorhHrsPerDay=(double)EmsConditions.WORKING_HOURS_PER_DAY;
		
		String dayNames[] = {"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"};
			
		if(weekStartDate.compareTo(Calendar.getInstance().getTime())  >  0){
			logger.info("invalid  week     ====================================== ");
			return JsonUtility.convertToJson("0");
		}
		 List<Attendance> workingDetails=reportGenerationDAO.getEmployeeWorkingDetailsByDates(employeeId, weekStartDate, weekEndDate);

		 //calculate working hours  pass 2 as parameter for month wise calculation
	     calculateWorkingHours(weekWorkedHours, workingDetails,1);
	     // calculate non working hours
		 calculateNonWorkingHours(weekNonWorkedHours,actucalWorhHrsPerDay , weekWorkedHours);
		 
		 Map<String,Object> weeklyProductivityMap= new HashMap<String, Object>();
		 weeklyProductivityMap.put("workedHours",weekWorkedHours);
		 weeklyProductivityMap.put("nonWorkedHours",weekNonWorkedHours);
		 weeklyProductivityMap.put("dayNames", dayNames);

		 return JsonUtility.convertToJson(weeklyProductivityMap);
	}
	
	/**
	 * This method is to calculate all employee weekly productivity of given week
	 * @param weekDate string format of week like like: 2016-W09
	 * @return String JSON string of Map object
	 */
	@SuppressWarnings("unchecked")
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getWeeklyProductivityOfAllEmployeeByWeek(String weekDate) {
	
		logger.info("inside ReportGenerationServiceImpl getWeeklyReportOfAllEmployeeByWeek(-,-) method");
		Date startDate=null, endDate=null;
		Map<String,Date> dateValues= getFromDateAndToDateFromWeekDate(weekDate);
		startDate= dateValues.get("startDate");
		endDate= dateValues.get("endDate");
		int endIndex=verifyEndDateAndMeasureEndIndex(endDate, 1);
		endDate=( endIndex == -1) ? endDate : Calendar.getInstance().getTime();		
		endIndex =( endIndex == -1 )? 7 : endIndex;
		 double [] weekWorkedHours=new double[endIndex];
		 double [] weekNonWorkedHours=new double[endIndex];
		String dayNames[] = {"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"};

		logger.info(" start date of week: "+startDate+"    end date of week "+endDate);
		if(startDate.compareTo(Calendar.getInstance().getTime())  >  0){
			logger.info("invalid  week     ====================================== ");
			return JsonUtility.convertToJson("0");
		}
		int employeeCount=reportGenerationDAO.getNumberOfActiveEmployees();
		List<Attendance> workingDetails=reportGenerationDAO.getEmployeesReportBetweenDates(startDate, endDate);
		double actualWorkHours=(double) employeeCount * EmsConditions.WORKING_HOURS_PER_DAY ;		
		
		 //calculate working hours  pass 1 as parameter for week wise calculation
	     calculateWorkingHours(weekWorkedHours, workingDetails,1);
	     // calculate non working hours
		 calculateNonWorkingHours(weekNonWorkedHours,actualWorkHours , weekWorkedHours);		   
		 Map<String,Object> weekProductivityMap= new HashMap<String, Object>();
		 weekProductivityMap.put("workedHours", weekWorkedHours);
		 weekProductivityMap.put("nonWorkedHours", weekNonWorkedHours);
		 weekProductivityMap.put("dayNames", dayNames);		 
		
		 return JsonUtility.convertToJson(weekProductivityMap);
	}
	
	
	
	/**
     * This getFromDateAndToDateFromWeekDate(-) method provides fromDate and toDate in java.util.Date format
     *  based on given weekDate of String type.
     */
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public Map<String, Date> getFromDateAndToDateFromWeekDate(String weekDate) {
		
		 logger.info("inside ReportGenerationServiceImpl getFromDateAndToDateFromWeekDate(-) method");
		 
		 String weekdate[]=weekDate.split("-");
	     String week_year=weekdate[0];
	     String week_weeknumber=weekdate[1];
	     String week_weeknumber_remove=week_weeknumber.substring(1, week_weeknumber.length());
	     
	     int week_parseyear=Integer.parseInt(week_year);
	     int week_parseweeknumber=Integer.parseInt(week_weeknumber_remove);
	     int week_parseweeknumberstart=week_parseweeknumber+1;
	   
	     // Get calendar, clear it and set week number and year.
	     Calendar calendar = Calendar.getInstance();
	     calendar.clear();
	     calendar.set(Calendar.WEEK_OF_YEAR, week_parseweeknumberstart);
	     calendar.set(Calendar.YEAR, week_parseyear);

	     // Now get the first day of week.
	     Date startdate = calendar.getTime();
	     
	     Calendar last = (Calendar) calendar.clone();
	     last.add(Calendar.DAY_OF_YEAR, 6);
	     
	     Date endDate=last.getTime();
	     
	    Map<String,Date> dates= new HashMap<String, Date>();
	    dates.put("startDate", startdate);
	    dates.put("endDate", endDate);
	    
	    return dates;
	}
	
	
	/*
 	 *  getMonthlyProductivityOfEmployeeByIdAndMonth(-,-) method  will take employeeId, month as parameters 
 	 *  and based on given month , we calculate firstDate and lastDate of the month.
 	 *  By passing employeeId, firstDate, lastDate to the getEmployeeWorkingDetailsByDates(-,-,-) method 
 	 *  get the working details of an employee.
	 */
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getMonthlyProductivityOfEmployeeByIdAndMonth(int employeeId, String month) {
		logger.info("Inside ReportGenerationServiceImpl getMonthlyProductivityOfEmployeeByIdAndMonth(-,-) method	");
		
		 String monthdate[]=month.split("-");
	     String month_year=monthdate[0];
	     String month_monthnumber=monthdate[1];
	     int listSize;
	     double actualWorkingHours=daysPerMonth*workingHoursPerDay;
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
	     
	     String monthName=new SimpleDateFormat("MMMM").format(fromDate);
	     
	     logger.info(" getMonthlyProductivityOfEmployeeByIdAndMonth From Date is :" +fromDate);
	     logger.info(" getMonthlyProductivityOfEmployeeByIdAndMonth   To date is:"+toDate);
	     logger.info(" getMonthlyProductivityOfEmployeeByIdAndMonth   Month Name is:"+monthName);

	     List<Attendance> employeeMonthlyData=reportGenerationDAO.getEmployeeWorkingDetailsByDates(employeeId,fromDate,toDate);
        listSize=employeeMonthlyData.size();
        logger.info("attendance details received for monthly individual employee results: "+employeeMonthlyData);
        logger.info("monthly employee report data size: "+listSize);
        
		Attendance attendanceObj;	
		double TotalWorkingHours=0.0;
		for(int i=0;i<listSize;i++){
        	attendanceObj=employeeMonthlyData.get(i);
        	TotalWorkingHours+=attendanceObj.getWorkingHours();
        }        
        Map<String,Object> employeeMonthlyReportMap=new HashMap<String, Object>(); 
        employeeMonthlyReportMap.put("workingHours", TotalWorkingHours);
        employeeMonthlyReportMap.put("nonWorkingHours", actualWorkingHours-TotalWorkingHours);
        employeeMonthlyReportMap.put("monthName",monthName);
        
		return JsonUtility.convertToJson(employeeMonthlyReportMap);
		
	}

	
	/*
 	 *  getMonthlyProductivityOfAllEmployeeByMonth(-,-) method  will take  month as parameter
 	 *  and based on given month , we calculate firstDate and lastDate of the month.
 	 *  By passing  firstDate, lastDate to the getEmployeesReportBetweenDates(-,-) method 
 	 *  get the working details of all employee.
	 */
	@Transactional(rollbackFor=HibernateException.class,readOnly=true)
	public String getMonthlyProductivityOfAllEmployeeByMonth(String month) {
		logger.info("Inside ReportGenerationServiceImpl getMonthlyProductivityOfAllEmployeeByMonth(-,-) method	");
		
		 String monthdate[]=month.split("-");
	     String month_year=monthdate[0];
	     String month_monthnumber=monthdate[1];
	     int listSize;
	     int noOfEmployees=reportGenerationDAO.getNumberOfActiveEmployees();
	     double actualWorkingHours=daysPerMonth*workingHoursPerDay*noOfEmployees;
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
	     
	     String monthName=new SimpleDateFormat("MMMM").format(fromDate);
	     
	     logger.info(" getMonthlyProductivityOfEmployeeByIdAndMonth From Date is :" +fromDate);
	     logger.info(" getMonthlyProductivityOfEmployeeByIdAndMonth   To date is:"+toDate);
	     logger.info(" getMonthlyProductivityOfEmployeeByIdAndMonth   Month Name is:"+monthName);

	     List<Attendance> employeeMonthlyData=reportGenerationDAO.getEmployeesReportBetweenDates(fromDate,toDate);
       listSize=employeeMonthlyData.size();
       logger.info("attendance details received for monthly all employee results: "+employeeMonthlyData);
       logger.info("monthly all employee report data size: "+listSize);
       
		Attendance attendanceObj;	
		double TotalWorkingHours=0.0;
		for(int i=0;i<listSize;i++){
       	attendanceObj=employeeMonthlyData.get(i);
       	TotalWorkingHours+=attendanceObj.getWorkingHours();
       }        
       Map<String,Object> employeeMonthlyReportMap=new HashMap<String, Object>(); 
       employeeMonthlyReportMap.put("workingHours", TotalWorkingHours);
       employeeMonthlyReportMap.put("nonWorkingHours", actualWorkingHours-TotalWorkingHours);
       employeeMonthlyReportMap.put("monthName",monthName);
       
		return JsonUtility.convertToJson(employeeMonthlyReportMap);
	}

	
	private int  getArrayIndexOfDate(int indexType,Date sourceDate){
		Calendar cal=Calendar.getInstance();
		cal.setTime(sourceDate);
		if(indexType == 1)
			return (cal.get(Calendar.DAY_OF_WEEK)-1);
		else if(indexType == 2)
			return cal.get(Calendar.MONTH);
		else
			return -1;
	}
	/**
	 * This method is to verify end date is greater than current date,if true find outs array index of week/months array
	 * based on given date
	 * @param typeOfIndex type if index we want to calculate  for week array pass 1
	 *         and for months array pass 2
	 * @param endDate date,from which we can get index(if given endDate is > current date).
	 * @return index of given end date,based on given typeOfIndex 1/2. if we pass other than 1/2 for typeOfIndex 
	 *     returns -2 and if endDate is less than current date returns -1 
	 */
    private int verifyEndDateAndMeasureEndIndex(Date endDate,int typeOfIndex){
	     Calendar cal=Calendar.getInstance();
	     Date todayDate=cal.getTime();
	     int endIndex=-1;
	     if(endDate.compareTo(todayDate) > 0){
		     logger.info("end date: "+endDate +"  > current date");
		     if(typeOfIndex == 1)
			     endIndex= (cal.get(Calendar.DAY_OF_WEEK));
		     else if(typeOfIndex == 2)
			     endIndex= cal.get(Calendar.MONTH)+1;
		     else		    	 
		    	 endIndex=-2;
	     }
	     logger.info("end index calculated: "+endIndex);
	     return endIndex;
	}
	
	
}
