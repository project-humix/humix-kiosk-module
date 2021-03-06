angular.module('humix-kiosk', [])
	.controller('mainController', ['$scope', function($scope) {
		$scope.displayType= 'clock';
		$scope.displayValue = '';
		$scope.loading = true;

		var socket = io.connect();

		socket.on('connect',function(){

                    console.log('socket connected');
		});

		socket.on('update', function(data){

		    console.log('receive update:'+JSON.stringify(data));
		    $scope.displayType = data.type;
		    $scope.displayValue = data.value;
		    $scope.$apply();
		})

		$scope.Show = function (type) {
		    console.log('request type:'+type);
		    return type === $scope.displayType && $scope.displayValue != '';
		};

	}]);
