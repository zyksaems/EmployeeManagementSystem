package com.caprusit.ems.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
@Table(name="PRAKASH.EMPLOYEE_LEAVE_TABLE")
public class EmployeeLeave implements Serializable{
	
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
	@Temporal(TemporalType.DATE)
	private Date date_of_apply;
	
	@Column(name="isapproved")
	private String isApproved;
	
	@Column(name="subject")
	private String subject;
	
	@Column(name="message")
	private String message;
	
	@Column(name="NOTIFY_STATUS")
	private int notifyStatus;
	
	@OneToMany
	@Fetch(FetchMode.SUBSELECT)
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade(CascadeType.ALL)
	@JoinColumn(name="leaveId_fk")
    private Set<EmployeeLeaveDates> setOfLeaveDates;
	
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
	

	public Set<EmployeeLeaveDates> getSetOfLeaveDates() {
		return setOfLeaveDates;
	}

	public void setSetOfLeaveDates(Set<EmployeeLeaveDates> setOfLeaveDates) {
		this.setOfLeaveDates = setOfLeaveDates;
	}

	public int getNotifyStatus() {
		return notifyStatus;
	}

	public void setNotifyStatus(int notifyStatus) {
		this.notifyStatus = notifyStatus;
	}

}
