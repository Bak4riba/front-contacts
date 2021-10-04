app.controller("ContactsController", function($scope, $http) {
    $scope.search = "";
    $scope.contact = {};
    $scope.contacts = [];
    $scope.saved = false;
    $scope.error = "";

    $http.defaults.headers.common["x-access-token"] = localStorage.getItem("loggedUser");

    $http.get("http://localhost:8888/api/v1/contacts")
        .then((response) => {
            $scope.contacts = response.data;
        })
        .catch((err) => {});

    $scope.removeContact = function(contact) {
        $http.delete(`http://localhost:8888/api/v1/contacts/${contact._id}`)
            .then((response) => {
                const index = $scope.contacts.indexOf(contact);
                $scope.contacts.splice(index, 1);
            })
            .catch((err) => {});
    }

    $scope.createContact = function(contact) {
        $http.post("http://localhost:8888/api/v1/contacts", contact)
            .then((response) => {
                $scope.contacts.push(response.data);
                $scope.saved = true;
            })
            .catch((err) => {
                $scope.error = err.data;
            })
    }

    $scope.updateContact = function(contact) {
        $http.put(`http://localhost:8888/api/v1/contacts/${contact._id}`, contact)
            .then((response) => {
                const found = $scope.contacts.find(item => item._id === contact._id);
                const index = $scope.contacts.indexOf(found);
                $scope.contacts[index] = Object.assign(found, response.data);
                $scope.saved = true;
            })
            .catch((err) => {
                $scope.error = err.data;
            })
    }

    $scope.newContact = function() {
        $("#contactForm").modal("show");
        $scope.contact = {};
        $scope.saved = false;
        $scope.error = "";
    }

    $scope.closeForm = function() {
        $("#contactForm").modal("hide");
        $scope.contact = {};
        $scope.saved = false;
        $scope.error = "";
    }

    $scope.editContact = function(contact) {
        $("#contactForm").modal("show");
        $scope.newContact();
        $scope.contact = Object.assign({}, contact);
    }

    $scope.submitForm = function() {
        $scope.saved = false;
        $scope.error = "";
        $scope.contact._id ? $scope.updateContact($scope.contact) : $scope.createContact($scope.contact);
    }
})
