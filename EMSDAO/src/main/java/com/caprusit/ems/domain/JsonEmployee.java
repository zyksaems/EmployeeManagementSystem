package com.caprusit.ems.domain;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class JsonEmployee implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	 
	private String employeeId;
	private String firstName;
	private String lastName;
	private String dob;
	private String mobileNo;
	private String emailId;
	private String designation;
	private String rollId;
	private String status;
	private String deptId;
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
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
	public String getRollId() {
		return rollId;
	}
	public void setRollId(String rollId) {
		this.rollId = rollId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDeptId() {
		return deptId;
	}
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	@Override
	public String toString() {
		return "JsonEmployee [employeeId=" + employeeId + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", dob=" + dob + ", mobileNo=" + mobileNo + ", emailId=" + emailId + ", designation=" + designation
				+ ", rollId=" + rollId + ", status=" + status + ", deptId=" + deptId + "]";
	}
	
}
