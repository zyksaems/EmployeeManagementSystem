package com.caprusit.ems.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.caprusit.ems.domain.Employee;
import com.caprusit.ems.service.IManageUserService;
import com.google.gson.Gson;

@RestController
public class ManageUserControllerUrls {
	
	 @Autowired
	private  IManageUserService manageUserService;
	 
	 @RequestMapping(value = "/employee/", method = RequestMethod.GET)
	    public ResponseEntity<List<Employee>> listAllUsers() {
	        List<Employee> users = manageUserService.findAllUsers();
	        System.out.println("In controller user="+users);
	        return new ResponseEntity<List<Employee>>(users, HttpStatus.OK);
	    }
	 
	 public static String convertToJson(Object obj) {
			Gson gson = new Gson();
			return gson.toJson(obj);
	 }
	 
	  @RequestMapping(value = "/employee/{id}/{dob}", method = RequestMethod.PUT)
	    public ResponseEntity<Employee> updateUser(@PathVariable("id") int id,@PathVariable("dob") String dob, @RequestBody Employee user) {
	        System.out.println("Updating User " + id);
	         
	        Employee currentUser = manageUserService.findById(id);
	         
	        if (currentUser==null) {
	            System.out.println("User with id " + id + " not found");
	            return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
	        }
	        
	        System.out.println("From update user::dob="+user.getDob());
	 
	        currentUser.setFirstName(user.getFirstName());
	        currentUser.setLastName(user.getLastName());
	        currentUser.setDob(new Date(Long.parseLong(dob)));
	        currentUser.setMobileNo(user.getMobileNo());
	        currentUser.setEmailId(user.getEmailId());
	        currentUser.setDesignation(user.getDesignation());
	        currentUser.setRollId(user.getRollId());
	        currentUser.setStatus(user.getStatus());
	        currentUser.setDeptId(user.getDeptId());
	        
	         System.out.println("currentUser "+currentUser);
	        manageUserService.updateUser(currentUser);
	        return new ResponseEntity<Employee>(currentUser, HttpStatus.OK);
	    }
	 
	
}
