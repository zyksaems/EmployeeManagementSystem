package com.caprusit.ems.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="PRAKASH.EMPLOYEE_LEAVE_TABLE")
public class EmployeeLeave implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="leaveid")
	@GenericGenerator(name="leaveGeneric" , strategy="increment")
	@GeneratedValue(generator="leaveGeneric")
	private int leaveId;
	
	@Column(name="employeeid")
	private int employeeId;
	
	@Column(name="employeename")
	private String name;
	
	@Column(name="date_of_apply")
	private Date date_of_apply;
	
	@Column(name="isapproved")
	private String isApproved;
	
	@Column(name="subject")
	private String subject;
	
	@Column(name="message")
	private String message;

	
	public int getLeaveId() {
		return leaveId;
	}

	public void setLeaveId(int leaveId) {
		this.leaveId = leaveId;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDate_of_apply() {
		return date_of_apply;
	}

	public void setDate_of_apply(Date date_of_apply) {
		this.date_of_apply = date_of_apply;
	}

	public String getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(String isApproved) {
		this.isApproved = isApproved;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "EmployeeLeave [leaveId=" + leaveId + ", employeeId=" + employeeId + ", name=" + name
				+ ", date_of_apply=" + date_of_apply + ", isApproved=" + isApproved + ", subject=" + subject
				+ ", message=" + message + "]";
	}

	
	
	
	

}
