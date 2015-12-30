package com.caprusit.ems.domain;

public class EmployeeAttendanceRequest {
	private int id;
	private String type;
	private String password;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "EmployeeAttendanceRequest [id=" + id + ", type=" + type
				+ ", password=" + password + "]";
	}

}
