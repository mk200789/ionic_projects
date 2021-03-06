angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('myImagesCtrl', function($scope, $ionicModal, $ionicHistory, $firebaseArray, $cordovaCamera){
  //create and load add image modal
  $ionicModal.fromTemplateUrl('add-new-image.html', function(modal){
      $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  //show modal
  $scope.add_img = function(){
    $scope.taskModal.show();
  }

  //remove modal
  $scope.closeAddImg = function(){
    $scope.taskModal.hide();
  }


})


.controller('testCtrl', function($scope, $state, $ionicModal, $ionicHistory, $firebaseAuth, $firebaseArray, $cordovaCamera, $cordovaSocialSharing){

  $ionicHistory.clearHistory();
  $scope.images = [];
  $scope.image = '';

  console.log(fb);

  var fbouth = $firebaseAuth(fb);
  fbouth.$authWithPassword({
    email: 'yyyy',
    password: 'xxxxx'
  }).catch(function(error){
    console.error("ERROR: " + error);
  });
  
  var fbAuth = fb.getAuth();
  if (fbAuth){
    console.log('auth');
    var userReference = fb.child("users/"+fbAuth.uid);
    var syncArray = $firebaseArray(userReference.child("images"));
    $scope.images = syncArray
  }
  else{
    console.log("no");
    $state.go("app.test");
  }

  //create and load add image modal
  $ionicModal.fromTemplateUrl('add-new-image.html', function(modal){
      $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  //show modal
  $scope.add_img = function(){
    $scope.taskModal.show();
  }

  //remove modal
  $scope.closeAddImg = function(){
    $scope.taskModal.hide();
  }

  //add image with description and title
  $scope.addImg = function(img){
    syncArray.$add({name: img.name, description: img.description, image: $scope.image});
    img.name, img.description, $scope.image = "", "","";
    $scope.taskModal.hide();

  }

  $scope.upload = function() {
      var options = {
          quality : 75,
          destinationType : Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.image = imageData;
      }, function(error) {
        console.error(error);
      });
  }

/**
  $scope.upload = function() {
      var options = {
          quality : 75,
          destinationType : Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.image = imageData;
          syncArray.$add({image: imageData}).then(function() {
              alert("Image has been uploaded!");
          });
      }, function(error) {
          console.error(error);
      });
  }


  $scope.shareViaTwitter = function() {
      $cordovaSocialSharing.shareViaTwitter("Check out this cool app I'm using called IonicProject for ");
  }
  **/

});

