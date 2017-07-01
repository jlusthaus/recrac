angular.module('App')
  .controller('eventController', function ($scope, $stateParams, userService, $state, mappingTools, $http) {
    userService
      .authenticate()
      .then(function (user) { 
        $scope.user = user; 
      });
    $scope.id = $stateParams.eventId;
    //$scope.event = $state.params.event
    $scope.event = {};
    $scope.messages = [];
      
    mappingTools.getEvent($scope.id).then(function(data) {
      $scope.event = data;
    });

    mappingTools.getMessages($scope.id).then(function(data) {
      $scope.messages = data;
    });
      
    $scope.save = function() {
      mappingTools.saveEvent($scope.event, $scope.id).then(function() {
        alert('TEST SAVE');
      });
    };
      

    $scope.saveMessage = function() {
      $http.post('/message', {event: $scope.id, user: '', text: $scope.message.text}, {contentType: 'application/json'})
        .then(function (response) {
          console.log('Post Successful: ', response);  
        })
        .catch(function (err) {
          console.error('Post Failed: ', err);
        });
    };

    $scope.saveRating = function() {
      $http.put('/events/' + $scope.id, {event: $scope.id, user: '', rating: $scope.rating}, {contentType: 'application/json'})
        .then(function (response) {
          console.log('Rating Successful: ', response);
          $scope.event = response.data;
          if (response.status === 200) {
            alert('Thanks for rating this event!');
          } else if (response.status === 400) {
            alert('You already rated this event');
          }
          else if (response.status === 401) {
            alert('Only confirmed users can rate this !');
          }
        })
        .catch(function(err) {
          console.error('Post Failed: ', err);
        });
    };

    $scope.showData = function(eventId, participantName ) {
      console.log('dnwbuiy');
      $http.put('/confirmParticipant', {eventId: eventId, participantName: participantName}, {contentType: 'application/json'})
        .then(function (response) {
          console.log('Put Successful: ', response);
        })
        .catch(function (err) {
          console.error('Post Failed: ', err);
        });
    };
  });