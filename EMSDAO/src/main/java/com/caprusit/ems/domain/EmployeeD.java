package com.caprusit.ems.domain;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class EmployeeD implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int employeeId; 
	private String firstName;
	private String lastName;
	private String dob;
	private String mobileNo;
	private String emailId;
	private String designation;
	private int rollId;
	private String status;
	private int deptId;
	public int getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public int getRollId() {
		return rollId;
	}
	public void setRollId(int rollId) {
		this.rollId = rollId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getDeptId() {
		return deptId;
	}
	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}
	@Override
	public String toString() {
		return "EmployeeD [employeeId=" + employeeId + ", firstName=" + firstName + ", lastName=" + lastName + ", dob="
				+ dob + ", mobileNo=" + mobileNo + ", emailId=" + emailId + ", designation=" + designation + ", rollId="
				+ rollId + ", status=" + status + ", deptId=" + deptId + "]";
	}
	
	
	
}
