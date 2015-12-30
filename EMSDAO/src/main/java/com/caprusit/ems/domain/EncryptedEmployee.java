package com.caprusit.ems.domain;

import java.io.Serializable;
import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PRAKASH.employeePassword_table")
public class EncryptedEmployee implements Serializable{

	@Id
	int employeeId;
	
	@Column(name="password")
	byte[] encryptedPassword;

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public byte[] getEncryptedPassword() {
		return encryptedPassword;
	}

	public void setEncryptedPassword(byte[] encryptedPassword) {
		this.encryptedPassword = encryptedPassword;
	}

	@Override
	public String toString() {
		return "EncryptedEmployee [employeeId=" + employeeId + ", encryptedPassword="
				+ Arrays.toString(encryptedPassword) + "]";
	}
	
}
