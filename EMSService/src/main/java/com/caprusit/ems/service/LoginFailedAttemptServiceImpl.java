package com.caprusit.ems.service;

import java.sql.SQLException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.caprusit.ems.dao.LoginFailedAttemptsDAO;
import com.caprusit.ems.utility.EmailUtility;

@Service
public class LoginFailedAttemptServiceImpl implements ILoginFailedAttemptsService{

	@Autowired
	private LoginFailedAttemptsDAO dao;
	@Autowired
	private EmailUtility emailUtility;
	
	private Logger logger = Logger.getLogger(LoginFailedAttemptServiceImpl.class);
	
	@Transactional(rollbackFor=SQLException.class,readOnly=true)
	public int checkAttemptsCount(int adminId) {
		logger.info("in side checkLoginAttempts Methode() serviceImpl ");
		int res=dao.checkAttemptsCount(adminId);
		return res;
	}

	@Transactional(rollbackFor=SQLException.class)
	public void incrementAttemptCount(int adminId) {
		logger.info("in side incrementAttemptCount Methode() serviceImle");
		dao.incrementAttemptCount(adminId);
	}
	
	@Transactional(rollbackFor=SQLException.class)
	public int LockUser(int adminId,String url) {
		logger.info("in side LockUser Methode() serviceImpl");
		int res=dao.LockUser(adminId);
		String message="\n\n\n \t your account has been blocked due to wrong password attemps. you can change your password through forgot password link  " + url;
		String subject="For Reset Password";
		
		String str[]=dao.getMailID(adminId);
		
		String firstName=str[0];
		String lastName=str[1];
		String emailId=str[2];
		emailUtility.sendMail(emailId, message, firstName+ " " + lastName,subject);
		return res;
	}

	@Transactional(rollbackFor=SQLException.class)
	public int setDefualtAttemptCount(int adminId) {
		logger.info("in side setDefualtAttemptCount Methode() serviceImpl");
		return dao.setDefualtAttemptCount(adminId);
	}
	
}
