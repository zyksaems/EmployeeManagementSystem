package com.caprusit.ems.conditions;

public class EmsConditions {
	
	// Employee working hours per day 
	public static final int WORKING_HOURS_PER_DAY = 8; 
	
	//Working days per month
	public static final int WORKING_DAYS_PER_MONTH = 26;  
	
	//Reset password link valid time in minutes
	public static final int RESET_PASSSWORD_LINK_VALID_TIME = 10; // In minutes
	
	//Employee not logout from office remind employee (every few minutes) time in minutes
	public static final int NOT_LOGOUT_REMIND_TIME = 30; // In minutes
	
	//employee present indication
	public static final int EMPLOYEE_PRESENT_STATUS = 1; 
	
	//employee absent indication
	public static final int EMPLOYEE_ABSENT_STATUS = 2; 
		
	//employee on leave  indication
	public static final int EMPLOYEE_LEAVE_STATUS = 0; 

}
