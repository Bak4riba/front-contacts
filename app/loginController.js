app.controller("LoginController", function($rootScope, $scope, $http, $location) {
    $scope.email = "";
    $scope.senha = "";
    $scope.error = "";

    $scope.login = function() {
        $scope.error = "";

        $http.post("http://127.0.0.1:8888/api/v1/login", { email: $scope.email, senha: $scope.senha })
        .then((response) => {
            localStorage.setItem("loggedUser", response.data.token);
            $rootScope.loggedUser = response.data.token;
            $location.path( "/contacts" );
        })
        .catch((err) => {
            $scope.error = err.data;
        });
    }
});
