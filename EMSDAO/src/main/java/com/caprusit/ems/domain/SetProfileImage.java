package com.caprusit.ems.domain;

import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="PRAKASH.PROFILE_IMAGE_TABLE")
public class SetProfileImage {

	@Id
	@Column(name="employeeid")
	private int employeeId;
	
	@Column(name="image")
	private byte[] imagebytes;

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public byte[] getImagebytes() {
		return imagebytes;
	}

	public void setImagebytes(byte[] imagebytes) {
		this.imagebytes = imagebytes;
	}

	@Override
	public String toString() {
		return "SetProfileImage [employeeId=" + employeeId + ", imagebytes=" + Arrays.toString(imagebytes) + "]";
	}

	
	
	
}
