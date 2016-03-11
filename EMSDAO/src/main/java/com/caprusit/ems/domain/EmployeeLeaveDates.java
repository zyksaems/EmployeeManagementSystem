package com.caprusit.ems.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="PRAKASH.Employee_Leave_Dates_TABLE")
public class EmployeeLeaveDates implements Serializable{

	private static final long serialVersionUID = 5597122696995096806L;

	@Id
	@GenericGenerator(name="incrementGenerator",strategy="increment")
	@GeneratedValue(generator="incrementGenerator")
	private int serialNumber;
	
	@Temporal(TemporalType.DATE)
	private Date leaveDate;	
	
	// default constructor
	public EmployeeLeaveDates (){
		
	}
	
	// date parameterized constructor
	public EmployeeLeaveDates (Date leaveDate){
		
		this.leaveDate=leaveDate;
	}

	public int getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(int serialNumber) {
		this.serialNumber = serialNumber;
	}

	public Date getLeaveDate() {
		return leaveDate;
	}

	public void setLeaveDate(Date leaveDate) {
		this.leaveDate = leaveDate;
	}
	
	@Override
	public String toString() {
		return "EmployeeLeaveDates [serialNumber=" + serialNumber
				+ ", leaveDate=" + leaveDate + "]";
	}

}
