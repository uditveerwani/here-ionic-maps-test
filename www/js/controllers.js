angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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
  },

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

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('MapCtrl', function($scope, $ionicLoading){

  function init(){
    console.log('yo yo honey singh');

    nokia.Settings.set("app_id", "TlbaFAtlFjyoXQccrn5i");
    nokia.Settings.set("app_code", "Z0WHPsdC2wae8exM5rT_ig");

    // Get the DOM node to which we will append the map
    var mapContainer = document.getElementById("mapContainer");
    // Create a map inside the map container DOM node
    var map = new nokia.maps.map.Display(mapContainer, {
      // initial center and zoom level of the map
      components:[new nokia.maps.map.component.Behavior()],
      center: [52.51, 13.4],
      zoomLevel: 5
    });

    $scope.map = map;
  }
  init();


  $scope.locateMe = function(){
    console.log('Locating now ... ');

    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      // $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $ionicLoading.hide();
      console.log(pos.coords.latitude + ' , ' +pos.coords.longitude);

      accuracyCircle = new nokia.maps.map.Circle(pos.coords, pos.coords.accuracy);
      $scope.map.objects.addAll([accuracyCircle]);

      $scope.map.zoomTo(accuracyCircle.getBoundingBox(), false, "default");
      $scope.map.setZoomLevel(17);

    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  }

})
