let app = angular.module("app", ["ngRoute"])

app.controller("AppController", function($scope, $rootScope, $location) {
    $rootScope.loggedUser = localStorage.getItem("loggedUser");

    $scope.logout = function() {
        $rootScope.loggedUser = undefined;
        localStorage.removeItem("loggedUser");
        $location.path("/login");
    }
})

app.config(["$routeProvider",
    function($routeProvider){
        $routeProvider.
        when("/login",{
            templateUrl : "/views/login.html",
            controller: "LoginController"
        }).
        when("/contacts", {
            templateUrl: "/views/contacts.html",
            controller: "ContactsController"
        }).
        otherwise("/login");
    }
])

app.run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if (!$rootScope.loggedUser) {
            if (next.templateUrl !== "/views/login.html") {
                $location.path( "/login" );
            }
        } else {
            if (next.templateUrl === "/views/login.html") {
                $location.path( "/contacts" );
            }
        }
    });
})
