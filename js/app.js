var App = angular.module("todo", ["LocalStorageModule"]);

function changeBody(color){
    document.body.style.background = color;
}

App.controller("TodoCtrl", function ($scope, localStorageService) {

    $scope.init = function () {
        $scope.newTodo = {};
        $scope.todos = [];

            $scope.todos = localStorageService.get("todoList");
    };

    $scope.getDate = function () {
        var today = new Date();
        var mm = today.getMonth() + 1;
        var dd = today.getDate();
        var yyyy = today.getFullYear();

        var date = dd + "/" + mm + "/" + yyyy;

        return date;
    };

    $scope.addTodo = function  (todoItem) {

        if ($scope.type === undefined) {
            window.alert("The task type you provided is not supported. You can only use shopping or work.");
        }
        else if ($scope.newTodo.Name === undefined)  {
            window.alert("Bad move! Try removing the task instead of deleting its content.");
        }
        else {
        $scope.date = new Date();
        todoItem.isDone = false;
        $scope.todos.push(todoItem);
        $scope.newTodo = {};
        }
    };

    /*$scope.editTodo = function (index) {
        $scope.newTodo.Name = $scope.new[index].newTodo.Name;
      };*/

    $scope.deleteTodo = function  (index) {
        $scope.todos.splice(index, 1);
    };

    $scope.markAllDone = function () {
        $scope.todos.forEach(function (todo) {
            todo.isDone = true;
        });
    };

    $scope.uncheckAllDone = function () {
        $scope.todos.forEach(function (todo) {
            todo.isDone = false;
        });
    };

    $scope.doneCount = function () {
        var todoDone = 0;
        $scope.todos.forEach(function (todo) {
            if (todo.isDone === true) {
                todoDone += 1;
            }
        });
        return todoDone;
    };

    $scope.clearCompleted = function () {
        var kill = [];
        for (var i = 0; i < $scope.todos.length; i++) {
            if ($scope.todos[i].isDone)
                kill.push(i);
        }

        for (var i = 0; i < kill.length; i++)
            $scope.todos.splice(kill[i] - i, 1);
    };

    $scope.almostOneNotDone = function () {
        var todoDone = $scope.doneCount();
        if (todoDone < $scope.todos.length) {
            return true;
        } else
            return false;
    };

    $scope.deleteAll = function () {
        $scope.todos = [];
    };

	$scope.$watch("todos",function  (newVal,oldVal) {
	    if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
	        localStorageService.add("todoList",angular.toJson(newVal));
	    }
	},true);

});