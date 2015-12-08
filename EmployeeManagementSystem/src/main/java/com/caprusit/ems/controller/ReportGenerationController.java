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

	/*@RequestMapping(value = "/getEmployeeReport", method = RequestMethod.GET)
	public @ResponseBody List<Object> getAllEmployeeReport(@RequestParam("employeeId") int employeeId,@RequestParam("fromDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate,@RequestParam("toDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate) {
		logger.info("inside ReportGenerationController getAllEmployeeReport()");
		return reportGenerationService.getEmployeeReport(employeeId,fromDate,toDate);
	}*/
	
	/*@RequestMapping(value = "/getEmployeeReport", method = RequestMethod.GET)
	public @ResponseBody List<Object> getAllEmployeeReport(@RequestParam("employeeId") int employeeId,@RequestParam("attendanceId") int attendanceId) {
		logger.info("inside ReportGenerationController getAllEmployeeReport()");
		return reportGenerationService.getEmployeeReport(employeeId,attendanceId);
	}*/
	
	@RequestMapping(value = "/generateReportHome", method = RequestMethod.GET)
	public String getForgotPasswordPage(HttpServletRequest request) {
		logger.info("inside generateReportHome()");
		return "GenerateReport";
	}
	
	@RequestMapping(value = "/generateReportPage", method = RequestMethod.POST)
	public @ResponseBody List<Object> getAllEmployeeReport(@RequestParam("employeeId") int employeeId,@RequestParam("fromDate") String fromDate ,@RequestParam("toDate") String  toDate) {
		logger.info("inside ReportGenerationController getAllEmployeeReport()");
		logger.info("employeID :"+employeeId);
		logger.info("From Date:"+fromDate);
		logger.info("to Date:"+toDate);
		return reportGenerationService.getAllEmployeeReport(employeeId,new Date(Long.valueOf(fromDate)),new Date(Long.valueOf(toDate)));
	}
	
	
	@RequestMapping(value = "/generateReport", method = RequestMethod.POST)
	public @ResponseBody List<Object> getEmployeeReport(@RequestParam("employeeId") int employeeId,@RequestParam("attendanceDate") String attendanceDate) {
		logger.info("inside ReportGenerationController getEmployeeReport()");
		
		List<Object> empData= reportGenerationService.login(employeeId);
		if (empData != null){
			Object[] data = (Object[])empData.get(0);
			if(data!=null && data.length>0){
			int count=data.length;
			logger.info("Size of data :"+count);
			//if(count>0 ){
			logger.info("EmployeeID:"+employeeId);
			logger.info("Employee name:"+(String)data[0]+" "+(String)data[1]);
			logger.info("Designation:"+(String)data[2]);
			}
			}
		return reportGenerationService.getEmployeeReport(employeeId,new Date(Long.valueOf(attendanceDate)));
	}
	/*
	 private String getJsonArray(Object obj) {
		  Gson gson = new Gson();
		  return gson.toJson(obj);

		 }*/
	
	@RequestMapping(value="/getAllEmployeeReport",method=RequestMethod.POST)
	public @ResponseBody List<Object> getAllEmployee(@RequestParam("employeeId") int employeeId, HttpServletRequest request){
		logger.info("inside ReportGenerationController getAllEmployee()");	
		
		List<Object> empData= reportGenerationService.login(employeeId);
		if (empData != null){
			Object[] data = (Object[])empData.get(0);
			if(data!=null && data.length>0){
			int count=data.length;
			logger.info("Size of data :"+count);
			//if(count>0 ){
			logger.info("EmployeeID:"+employeeId);
			logger.info("Employee name:"+(String)data[0]+" "+(String)data[1]);
			logger.info("Designation:"+(String)data[2]);
		//	logger.info("Start time:"+result.get(1));
				
			request.getSession().setAttribute("employeeId1",employeeId);
			request.getSession().setAttribute("EmployeeName",(String)data[0]+(String)data[1]);
			request.getSession().setAttribute("designation",(String)data[2]);	
		}
		}
		return reportGenerationService.getEmployees(employeeId);
	}
	
	@RequestMapping(value="/getAllEmployees",method=RequestMethod.POST)
	public @ResponseBody List<Object> getAllEmployees(){
		logger.info("inside ReportGenerationController getAllEmployees()");	
		return reportGenerationService.getAllEmployees();
	}
}
