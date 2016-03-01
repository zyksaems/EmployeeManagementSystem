package com.caprusit.ems.utility;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;

import com.cipher.decryption.Decryption;

public class EmailUtility {
	
	private Properties props;
	private String mailPassword, username;
	
	private Logger logger=Logger.getLogger(EmailUtility.class);

	public void setUsername(String username) {
		this.username = username;
	}

	public void setMailPassword(String mailPassword) {
		this.mailPassword = Decryption.decrypt(mailPassword);
	}

	public void setProps(Properties props) {
		this.props = props;
	}

	/*
	 * sendMail() method takes mailId, password and recipient name as parameter
	 * and send a mail to given mail Id with password information
	 */
	public void sendMail(String recipientMailId, String message, String recipientName,String subject) {
		logger.info("in send mail method ");
		Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, mailPassword);
			}
		});
		//logger.info("in send mail method   2");
		try {
			// Create a Message
			Message mimeMessage = new MimeMessage(session);
			// Set sender and receiver
			mimeMessage.setFrom(new InternetAddress(username));
			mimeMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientMailId));
			mimeMessage.setSubject(subject);
			mimeMessage.setText("Dear " + recipientName+"," + message +" \n\nRegards,\nCaprusIT Team.");
			// Transmit the mail
			Transport.send(mimeMessage);
			logger.info("mail Sent");
		} catch (Exception e) {
			logger.error("in Email utility class sendmail() -- exception : "+e.getMessage()); 
			throw new RuntimeException(e);
		}
	}
}
