package com.caprusit.ems.service;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caprusit.ems.dao.IReportGenerationDAO;
import com.google.gson.Gson;
@Service
public class ReportGenerationServiceImpl  implements IReportGenerationService{
	@Autowired
	private IReportGenerationDAO reportGenerationDAO;
	
	private  Logger logger = Logger.getLogger(ReportGenerationServiceImpl.class);
	 
	/*public List<Object> getEmployeeReport(int employeeId,int attendanceId) {
		logger.info("Inside ReportGenerationServiceImpl getEmployeeReport() method ");
		List<Object> result=reportGenerationDAO.getEmployeeReport(employeeId, attendanceId);
		logger.info("EmployeeId:"+employeeId);
		logger.info("report:"+result);
		
		Object[] data = (Object[]) result.get(0);
		if(result!=null && result.size()>0){
		int count=data.length;
		logger.info("Size of data :"+count);
		if(count>0){
		logger.info("EmployeeID:"+(Integer)data[0]);
		logger.info("Employee name:"+(String)data[1]+" "+(String)data[2]);
		logger.info("Working Hours:"+result.get(1));
		}
		}
		return result;
	}*/

public static String convertToJson(Object obj) {
		Gson gson = new Gson();
		return gson.toJson(obj);
	}


public List<Object> getEmployeeReport(int employeeId, Date attendanceDate) {
	logger.info("Inside ReportGenerationServiceImpl getEmployeeReport() method ");
	List<Object> result=reportGenerationDAO.getEmployeeReport(employeeId, attendanceDate);
	/*logger.info("EmployeeId:"+employeeId);
	logger.info("report:"+result);
	
	Object[] data = (Object[]) result.get(0);
	if(result!=null && result.size()>0){
	int count=data.length;
	logger.info("Size of data :"+count);
	if(count>0 ){
	logger.info("EmployeeID:"+(Integer)data[0]);
	logger.info("Employee name:"+(String)data[1]+" "+(String)data[2]);
	//logger.info("Working Hours:"+result.get(1));
	logger.info("Start time:"+result.get(1));
	}*/
	
	logger.info("EmployeeId:"+employeeId);
	logger.info("report:"+result);
	return result;
}

public List<Object> getAllEmployeeReport(int employeeId, Date fromDate, Date toDate) {
	logger.info("Inside ReportGenerationServiceImpl getAllEmployeeReport() method ");
	List<Object> result=reportGenerationDAO.getAllEmployeeReport(employeeId, fromDate,toDate);
	logger.info("EmployeeId:"+employeeId);
	logger.info("report:"+result);
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


public List<Object>  login(int employeeId) {
	List<Object> empData= reportGenerationDAO.login(employeeId);
	return empData;
    
	//return JsonUtility.convertToJson(empData);	
}
}
	