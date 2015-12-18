angular.module('adminDash', ['ngAnimate', 'ui.bootstrap']);
angular.module('adminDash').controller('adminDashCtrl', function ($scope,$log) {
  $scope.oneAtATime = true;

 
  /*for slides*/
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  function addSlide(i) {
    slides.push({
      image: 'images/'+i+'.jpg',
      });
  };
  for (var i=1; i<=3; i++) {
    addSlide(i);
  }
  
  
  $scope.showAdminDas=true;
  
 $scope.showAdmin=function(){
	  
	  $scope.showAdminDas=false;
  }
  
  
  
});