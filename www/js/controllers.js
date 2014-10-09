angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope,MD5,SHA1,$ionicPopup,$window,connection_db) {
	
	$scope.crypt	= {};
	$scope.crypt.md5_oringine	= "";
	$scope.crypt.md5_encrypt	= "";
	
//	$scope.md5_oringine	= MD5.decrypt("toto");
	if ($window.openDatabase)
		connection_db.openDb();
	
	$scope.convert_str	= function (){
		if ($scope.crypt.md5_oringine != ""){
			$scope.crypt.resultat	= MD5.crypt($scope.crypt.md5_oringine);
			if ($window.openDatabase)
			{
				connection_db.getCrypteList($scope.crypt.md5_oringine,"MD5").then(function(result){}
					,function (error){
						if (error == "empty"){
							connection_db.insertData($scope.crypt.md5_oringine,$scope.crypt.resultat,'MD5');
						}
				});
			}	
		}
		else if ($scope.crypt.sha1_oringine != ""){
			$scope.crypt.resultat	= SHA1.crypt($scope.crypt.sha1_oringine);
			
			if ($window.openDatabase)
			{
				connection_db.getCrypteList($scope.crypt.sha1_oringine,"SHA1").then(function(result){}
					,function (error){
						if (error == "empty"){
							connection_db.insertData($scope.crypt.sha1_oringine,$scope.crypt.resultat,'SHA1');
						}
				});
			}	
		}
		else{
			$ionicPopup.alert({
			     title: 'Don\'t do that!',
			     template: 'please put something in the case'
			   });
		}
		
	}
	
})

.controller('FriendsCtrl', function($scope,MD5,SHA1, $window,$ionicPopup,connection_db) {

	$scope.crypt	= {};
	$scope.crypt.sha1_oringine	= "";
	$scope.crypt.sha1_encrypt	= "";
	
	if ($window.openDatabase)
		connection_db.openDb();
	
	$scope.convert_str	= function (){
		
		if ($scope.crypt.md5_encrypt != "" && $scope.crypt.md5_encrypt != undefined){
			if ($window.openDatabase)
			{
				connection_db.getCrypteList($scope.crypt.md5_encrypt,"MD5","D").then(function(result){
					$scope.crypt.resultat	= result.origine;
				}
				,function (error){
					
					if (error == "empty"){
						
						var resultReturn 		= MD5.decrypt($scope.crypt.md5_encrypt);
						if (resultReturn == undefined)
							$scope.crypt.resultat	= "please try later";
						else
							$scope.crypt.resultat	= resultReturn;
						//connection_db.insertData($scope.crypt.resultat,$scope.crypt.md5_encrypt,'MD5');
					}
				});
			}
				
		}
		else if ($scope.crypt.sha1_encrypt != "" && $scope.crypt.sha1_encrypt != undefined ){
			
			//9062ff4fb860c9c664ac7380b471f2a44c038238
			if ($window.openDatabase)
			{
				connection_db.getCrypteList($scope.crypt.sha1_encrypt,"SHA1","D").then(function(result){
					$scope.crypt.resultat	= result.origine;
				}
				,function (error){
					if (error == "empty"){
						var resultReturn	= SHA1.decrypt($scope.crypt.sha1_encrypt);
						if (resultReturn == undefined)
							$scope.crypt.resultat	= "please try later";
						else
							$scope.crypt.resultat	= resultReturn;
						//connection_db.insertData($scope.crypt.resultat,$scope.crypt.sha1_encrypt,'SHA1');
					}
				});
			}
			
			
		}
		else{
			$ionicPopup.alert({
			     title: 'Don\'t do that!',
			     template: 'please put something in the case'
			   });
		}
		
	}

})
.controller("ContentController", function ($scope, $ionicSideMenuDelegate){
	
	$scope.doSomething	= function(){
		alert("toto");
	};
	$scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	  };
})
.controller("listCtrl", function ($scope){
	
	$scope.items	= [{title:"History",description:"history"}]
	
})
.controller("HistoryCtrl", function ($scope,$stateParams,$window,connection_db,$location){
	
	$scope.list	= null;
	if ($window.openDatabase){
		connection_db.openDb();
		connection_db.getCrypteList().then(function(result){
			$scope.list	= result;
        });
	}
	
	if ($stateParams.type== "dash"){
		$scope.title  = "history crypte";
	}	
	
	$scope.goBack	= function(){
		$location.path('/tab/dash');
	}
	
});