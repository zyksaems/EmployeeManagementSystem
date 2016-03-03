package com.caprusit.ems.utility;

import java.util.Properties;

import javax.mail.Address;
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
	
	private String recipientMailId,message,recipientName,subject;
	
	private String[] ccMailIds;
	
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

	
	/**
	 *  This method is to send mail without putting any CC
	 *  
	 * @param recipientMailId  recipient (To) mail id
	 * @param message message you want to send
	 * @param recipientName  name of recipient
	 * @param subject subject of mail
	 */
	public void sendMail(String recipientMailId, String message, String recipientName,String subject) {
		logger.info("in send mail method ");
		this.recipientMailId=recipientMailId;    
		this.message=message;
		this.recipientName=recipientName;
		this.subject=subject;
		
		// call with false  for sending without cc
	    sendEmailUsingJavaMail(false);
	
	}
	/**
	 * This method is to send mail with CC
	 * 
	 * @param recipientMailId   recipient (To) mail id
	 * @param message message  you want to send
	 * @param recipientName   name of recipient
	 * @param subject  subject of mail
	 * @param ccMailsIds  mail ids to insert in CC 
	 */
	public void sendMail(String recipientMailId, String message, String recipientName,String subject,String ... ccMailsIds ) {
		this.recipientMailId=recipientMailId;    
		this.message=message;
		this.recipientName=recipientName;
		this.subject=subject;
		this.ccMailIds=ccMailsIds;
		
		// call with true  for sending with cc
		sendEmailUsingJavaMail(true);
	}
	
	/**
	 * This method is to send mail using java mail api
	 * @param ccStatus  if it is true we are including cc  else we are not putting any cc
	 */
	private void sendEmailUsingJavaMail(boolean ccStatus){
		logger.info("in sendEmailUsingJavaMail(boolean ccStatus) method");
		Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, mailPassword);
			}
		});
		try {
			// Create a Message
			Message mimeMessage = new MimeMessage(session);
			// Set sender and receiver
			mimeMessage.setFrom(new InternetAddress(username));
			mimeMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientMailId));
			mimeMessage.setSubject(subject);
			mimeMessage.setText("Dear " + recipientName+"," + message +" \n\nRegards,\nCaprusIT Team.");
			
			if(ccStatus){
				Address [] arr=new Address[ccMailIds.length];
				//logger.info(" cc mail ids list: ");
				for( int i=0;i< ccMailIds.length;i++){					
					//logger.info(" "+ccMailIds[i]);
					arr[i]=new InternetAddress(ccMailIds[i]);					
				}
				mimeMessage.setRecipients(Message.RecipientType.CC, arr);
				
			}

			// Transmit the mail
			Transport.send(mimeMessage);
			logger.info("mail Sent");
		} catch (Exception e) {
			logger.error("in Email utility class sendmail() -- exception : "+e.getMessage()); 
			throw new RuntimeException(e);
		}
	}
}
