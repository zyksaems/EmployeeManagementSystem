package com.caprusit.ems.utility;

import org.apache.log4j.Logger;

public class ValidatePasswordUtility {
	
	private static Logger logger=Logger.getLogger(ValidatePasswordUtility.class);

	/**
	 * This method takes plain password and encrypted password
	 * if plain password is correct returns true
	 * otherwise returns false 
	 */
	public static boolean validatePassword(String plainPassword,byte [] encryptedPassword){
		logger.info("inside ValidatePasswordUtility class -- validatePassword(String plainPassword,byte [] encryptedPassword)");
		String password=EncryptionUtility.decryptPassword(plainPassword,encryptedPassword);
		if(password != null){
			logger.info("password ok -proceed");
			return true;
		}
		else{
			logger.info("password wrong  - try again");
		}
		
		return false;
	}
}
