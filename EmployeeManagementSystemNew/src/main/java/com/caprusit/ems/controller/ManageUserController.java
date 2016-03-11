package com.caprusit.ems.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.caprusit.ems.controller.utility.HttpSessionUtility;
import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.domain.JsonEmployee;
import com.caprusit.ems.domain.Notice;
import com.caprusit.ems.service.IManageUserService;

@Controller
public class ManageUserController {

	@Autowired
	private IManageUserService manageUserService;
	
	private static final String EXCEL_REFERENCE_TEMPLATE_FILE="AddEmployeeExcelReferenceTemplate.xls";
	
	private Logger logger=Logger.getLogger(ManageUserController.class);
	
	/**
	 * This method is to send all employee details to 
	 * front-end in json object array format
	 * */
	@RequestMapping(value="/getAllEmployeeDetails",method=RequestMethod.GET)
	public @ResponseBody String getAllEmployeeDetails(){
		logger.info("inside ManageUserController getAllEmployee()");	
		return manageUserService.getEmployees();
	}
	
	/**
	 * This method is to return add employee page if admin is logged in
	 * otherwise returns homepage
	 */
	@RequestMapping(value="/getAddEmployeePage",method=RequestMethod.GET)
	public String getAddEmployeePage(HttpServletRequest request){
		logger.info("inside ManageUserController getAddEmployeePage()");	
		// verify admin is logged in or not
		return (HttpSessionUtility.verifySession(request,"adminId"))? "AddEmployee" :  "EmsHomePage";
	}
	
	@RequestMapping(value = "/getExcel", method = RequestMethod.GET)
	 ModelAndView getExcel(HttpServletRequest request,HttpServletResponse response) throws Exception {
	  logger.info("Calling generateExcel()...");
	  ModelAndView modelAndView;
	  if(HttpSessionUtility.verifySession(request,"adminId")){
		  List<Employee> employees =manageUserService.getAllEmployee();	  
		  logger.info("in controller employee list : "+ employees);
		  modelAndView= new ModelAndView("excelView", "employees",employees);
	  }
	  else{
		  modelAndView= new ModelAndView("EmsHomePage");
	  }
	  
	  logger.info("modelAndView   "+ modelAndView);
	  return modelAndView;
	}
	
	/**
	 * This method is for handling upload excel file(Employee details excel file )  request
	 * returns  success or error details to front-end
	 * */
	@RequestMapping(value = "/uploadEmployeeDetailsExcelFile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public @ResponseBody String uploadEmployeeDetailsExcelFile(MultipartHttpServletRequest request) {

		logger.info("inside uploadEmployeeDetailsExcelFile()");
		Iterator<String> itr = request.getFileNames();
		MultipartFile file = request.getFile(itr.next());
		String result = "";
		try {
			result = manageUserService.uploadEmployeeDetailsExcelFile(file.getInputStream(), file.getOriginalFilename());
		} catch (IOException e) {

			e.printStackTrace();
		}
		;
		logger.info("result : " + result);
		return result;
	}
	
	/**
	 * This method is to add single employee 
	 * Takes employee object as request body
	 * If session expired returns -1*/
	@RequestMapping(value = "/addSingleEmployee", method = RequestMethod.POST)
	public @ResponseBody Integer addSingleEmployee(HttpServletRequest request,@RequestBody Employee emp,
			@RequestParam("dob") String milliSeconds) {

		if(!HttpSessionUtility.verifySession(request,"adminId"))
			return -1;
		else
		    return manageUserService.addSingleEmployee(emp, milliSeconds);

	}
	
	/**
	 * This method is to update employee details
	 * Takes employee object as request body
	 * returns 1 on successful update
	 * */
	@RequestMapping(value="/updateEmployee" , method=RequestMethod.POST)
	public @ResponseBody int updateEmployee(@RequestBody Employee emp,@RequestParam("dob") String dobMillisecods){
		
		logger.info("inside manageUser controller updateEmployee()");
		emp.setDob(new Date(Long.parseLong(dobMillisecods)));
		logger.info("employee object received for update: "+emp);
		
		return manageUserService.updateEmployee(emp);
	}
	/**
	 * This method is to redirect the UpdateUser view page
	 * Here all employee details are displayed and updating each employee details.
	 */
	@RequestMapping(value = "ViewUser")
	public String  updateUser(HttpServletRequest request) {
		 // verify admin is logged in or not
		return (HttpSessionUtility.verifySession(request,"adminId")) ? "UpdateUser" : "EmsHomePage";

		
	}
	/**
	 * This method is to collect all employees data 
	 * */
	@RequestMapping(value = "getAllEmployeeData")
	public @ResponseBody List<JsonEmployee>  getAllEmployeeData( ) {
		
		List<JsonEmployee> employees=manageUserService.getAllEmployeesData();
		
		return employees;
		
	}
	/**
	 * This method is to send selected employee details into service for storing into database 
	 * */
	@RequestMapping(value = "sendObject", method = RequestMethod.POST)
	public @ResponseBody String  sendEmployeeJson(@ModelAttribute JsonEmployee employeeJson,HttpServletRequest request) throws ParseException {
		String message=null;
		if(HttpSessionUtility.verifySession(request,"adminId")){
			Employee employee=new Employee();
			
			employee.setEmployeeId(Integer.parseInt(employeeJson.getEmployeeId()));
			employee.setFirstName(employeeJson.getFirstName());
			employee.setLastName(employeeJson.getLastName());
			
			DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
			Date d2 = df2.parse(employeeJson.getDob());
		    java.sql.Date sqlDate = new java.sql.Date(d2.getTime());
		      
			employee.setDob(sqlDate);
			
			employee.setMobileNo(employeeJson.getMobileNo());
			employee.setEmailId(employeeJson.getEmailId());
			employee.setDesignation(employeeJson.getDesignation());
			employee.setRollId(Integer.parseInt(employeeJson.getRollId()));
			employee.setStatus(employeeJson.getStatus());
			employee.setDeptId(Integer.parseInt(employeeJson.getDeptId()));
			
		 message=manageUserService.updateEmployeeData(employee);
		}
		return message;	
	}
	
	/*
	 *This method is to download a Excel Reference Template file from server
	 *  which is located in resources folder.
	 */
	@RequestMapping(value="/downloadExcelReferenceTemplate.do", method = RequestMethod.GET)
	public void downloadFile(HttpServletResponse response,HttpServletRequest request) throws IOException {
		
		if(HttpSessionUtility.verifySession(request,"adminId")){
			
			File file = null;
			
			if(file== null){
				
				file = new ClassPathResource(EXCEL_REFERENCE_TEMPLATE_FILE).getFile();
				logger.info("File name:"+file);
			}
			
			if(!file.exists()){
				String errorMessage = "Sorry. The file you are looking for does not exist";
				logger.info(errorMessage);
				OutputStream outputStream = response.getOutputStream();
				outputStream.write(errorMessage.getBytes(Charset.forName("UTF-8")));
				outputStream.close();
				return;
			}

			String mimeType="application/excel";
			
	        response.setContentType(mimeType);
	        
	        /* "Content-Disposition : attachment" will download the files [like PDF/text/excel anything] to our system*/
	        response.setHeader("Content-Disposition", String.format("attachment; filename=\"" + file.getName() +"\""));

	        response.setContentLength((int)file.length());

			InputStream inputStream = new BufferedInputStream(new FileInputStream(file));

	        /*Copy bytes from source to destination(output stream in this example), closes both streams.*/
	        FileCopyUtils.copy(inputStream, response.getOutputStream());
		}
	
	}
	@RequestMapping(value="/updateNotice")
	public String updateNotice(HttpServletRequest request){
		
		return (HttpSessionUtility.verifySession(request,"adminId")) ? "NoticeBoard" : "EmsHomePage";
	}
	
	@RequestMapping(value = "/allNotices")
	public @ResponseBody List<Notice> getNotice(){
		List<Notice> notices=manageUserService.getNotice();
		Iterator<Notice> iterate=notices.iterator();
		
		while(iterate.hasNext()){
			Notice notice=(Notice)iterate.next();
			System.out.println(notice);
		}
		
		return notices;
	}
	@RequestMapping(value = "/deleteNotice",method = RequestMethod.POST)
	public @ResponseBody void deleteNotice(@ModelAttribute Notice noticeData,HttpServletRequest request){
		
		System.out.println("in deleteNotice() "+noticeData.getNotice());
		manageUserService.deleteNotice(noticeData);
		
	}
	@RequestMapping(value = "/setNotice",method = RequestMethod.POST)
	public @ResponseBody void setNotice(@ModelAttribute Notice noticeData,HttpServletRequest request){
		
		System.out.println("in home controller"+noticeData.getNotice());
		manageUserService.setNotice(noticeData);
		
	}

}

