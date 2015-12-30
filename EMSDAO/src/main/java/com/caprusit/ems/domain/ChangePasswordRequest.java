package com.caprusit.ems.domain;

import java.io.Serializable;

public class ChangePasswordRequest implements Serializable {

	private int userName;
	private String currentPassword;
	private String newPassword;

	public int getUserName() {
		return userName;
	}

	public void setUserName(int userName) {
		this.userName = userName;
	}

	public String getCurrentPassword() {
		return currentPassword;
	}

	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	@Override
	public String toString() {
		return "ChangePasswordRequest [userName=" + userName + ", currentPassword=" + currentPassword + ", newPassword="
				+ newPassword + "]";
	}

}
