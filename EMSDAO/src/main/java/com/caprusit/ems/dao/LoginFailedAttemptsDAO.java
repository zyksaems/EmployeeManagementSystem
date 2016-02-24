package com.caprusit.ems.dao;

public interface LoginFailedAttemptsDAO {
	
	int checkAttemptsCount(int adminId);
	void incrementAttemptCount(int adminId);
	int LockUser(int adminId);
	int setDefualtAttemptCount(int adminId);
	String[] getMailID(int adminId);
}
