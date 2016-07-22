

  /*  This file name  :  MakeLinkAsActive.js  */

   
         var activeClass="active-link";
        
        /**
	     * This function is to set link as active
	     */
	    function setLinkClassAsActive(){
	    	
	    	var activeLink=localStorage.getItem("activeLinkId");
	    	console.log("in set link class as active()  local value: "+activeLink);
	    	$(activeLink).addClass(activeClass);
	    	
	     }; // END -- setLinkClassAsActive()

	     
	     /**
	       * This function is to set active link id to local storage
	       */
	      function setActiveLinkInLocalStorage(linkId){
	    	  console.log("in setActiveLinkInLocalStorage(linkId)");
	    	  console.log("link id received: "+linkId);
	    	  localStorage.setItem("activeLinkId", linkId);
	    	  
	      };  // END -- setActiveLinkInLocalStorage(linkId)
	      
	      
	      
	      
	      $('document').ready(function(){
	    	  
	    	  setLinkClassAsActive();
	    	  
	      });  // END -- $('document').ready(function())
	      
	      