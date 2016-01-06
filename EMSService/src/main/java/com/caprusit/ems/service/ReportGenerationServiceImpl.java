package com.caprusit.ems.service;

import java.text.DateFormatSymbols;
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
		    int onDayHours=9;
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

	public String getEmployeeMonthlyProductivity(int employeeId, int year) {

        Calendar calendar=Calendar.getInstance();
        double[] workingHoursArray=new double[12];
        double[] nonWorkingHoursArray=new double[12];
        int workingHoursPerDay=9;
        int daysPerMonth=26,month,listSize;
        Attendance attendanceObj;
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
        for(int i=0;i<listSize;i++){
        	attendanceObj=employeeMonthlyData.get(i);
        	calendar.setTime(attendanceObj.getAttendanceDate());
        	month=calendar.get(Calendar.MONTH);
        	workingHoursArray[month]+=attendanceObj.getWorkingHours();
        
        }
        for(int i=0;i<12;i++){
        	
        	nonWorkingHoursArray[i]=actualWorkingHours-workingHoursArray[i];
        	
        }
        /*for(double val:workingHoursArray){
        	System.out.print(" "+val);
        }*/
        List<Object> employeeDetails=reportGenerationDAO.getSingleEmployeeDetailsById(employeeId);
        logger.info("employee details: "+employeeDetails);
        if(employeeDetails.get(0)!= null ){
        	Object[] details=(Object[])employeeDetails.get(0);
        	employeeDesignation=(String)details[3];
        	employeeName=details[1]+""+details[2];
        }
        Map<String,Object> employeeMonthlyReportMap=new HashMap<String, Object>(); 
        employeeMonthlyReportMap.put("workingHoursArray", workingHoursArray);
        employeeMonthlyReportMap.put("nonWorkingHoursArray", nonWorkingHoursArray);
        employeeMonthlyReportMap.put("employeeName",employeeName );
        employeeMonthlyReportMap.put("employeeDesignation", employeeDesignation);
        
		return JsonUtility.convertToJson(employeeMonthlyReportMap);
	}
}
