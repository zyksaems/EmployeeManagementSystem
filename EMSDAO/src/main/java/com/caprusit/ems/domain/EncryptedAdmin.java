package com.caprusit.ems.domain;

import java.io.Serializable;
import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PRAKASH.ADMINISTRATOREMS_TABLE")
public class EncryptedAdmin implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "adminid")
	private int adminId;

	@Column(name = "password")
	private byte[] password;
	
	@Column
	private int locked;
	public int getLocked() {
		return locked;
	}

	public void setLocked(int locked) {
		this.locked = locked;
	}

	public int getAttemptcount() {
		return attemptcount;
	}

	public void setAttemptcount(int attemptcount) {
		this.attemptcount = attemptcount;
	}

	@Column
	private int attemptcount;
	
	public EncryptedAdmin(){}

	public EncryptedAdmin(int adminId) {
		super();
		this.adminId = adminId;
	}

	public int getAdminId() {
		return adminId;
	}

	public void setAdminId(int adminId) {
		this.adminId = adminId;
	}

	public byte[] getPassword() {
		return password;
	}

	public void setPassword(byte[] password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "EncryptedAdmin [adminId=" + adminId + ", password="
				+ Arrays.toString(password) + "]";
	};

	
}