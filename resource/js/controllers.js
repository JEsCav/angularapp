angular.module("FinalApp")
.controller("MainController", function($scope, $resource,PostResource){
	//para usar resource primero tenemos que configurarlo y eso se hace de la siguiente manera
	
	//como update no viene por defecto tengo que hacerlo con acciones personalizadas
	User=$resource("https://jsonplaceholder.typicode.com/users/:id", {id:"@id"});
	//el :id es un parametro opcional que representa el id del elemento, este parametro puede o no puede ir
	//el :id es un parametro que el usuario va a definir
	$scope.posts=PostResource.query();
	//en lugar de hacer el http.post,http.get etc uso query
	//query lo que hace es hacer el ger de los post y devuelve un arreglo de posts
	//mi api debe devolver un arreglo de cosas cuando le hago un query
	//porque resource esta configurado para que le des un arreglo
	$scope.users=User.query();
	$scope.removePost=function(post){
PostResource.delete({id: post.id},function(data){
	console.log(data);
	//si se hace pero no lo borra por la misma seguridad que tiene la api como mucha gente lo usa no es conveniente que se borre
	//la otra seria que actualizaramos el front end para que refleje que el post se borro
	//si en una api normal osea donde si puedas borrar las cosas solo bastaria con esto
	//$scope.posts=Post.query();
	//te traeria el arreglo sin el post que acabas de borrar, pero para esta se haria de otra manera

});
$scope.posts=$scope.posts.filter(function(element){
return element.id!==post.id;
//cuando el return da falso el elemento del arreglo se quita y los verdaderos los conserva en el arreglo

});

	}
})
.controller("PostController", function($scope,PostResource,$routeParams, $location){
	$scope.title="Editar Post"
$scope.post=PostResource.get({id: $routeParams.id});
$scope.savePost=function(){
PostResource.update({id: $scope.post.id},{data: $scope.post}, function(data){
	console.log(data);
	$location.path("/post/"+$scope.post.id);
});//sirve para crear nuevos post
//para poder crear el post debes mandarlos dentro de un objeto llamado data
//asi como el api no nos permite eliminar tampoco nos permite crear
}
})//este espera recibir un objeto json
//con get me traigo uno en especifico
//y ese id lo obtengo con routeParams
//lo que va despues del punto es el nombre del parametro que nos queremos traer
//este es el segundo metodo restful que tiene resource

.controller("NewController", function($scope,PostResource, $location){
//location nos sirve para redirigir la pagina cuando estamos usando ng-route
$scope.post={};
$scope.title="Crear Post";
$scope.savePost=function(){
PostResource.save({data: $scope.post}, function(data){
	console.log(data);
	$location.path("/");
});//sirve para crear nuevos post
//para poder crear el post debes mandarlos dentro de un objeto llamado data
//asi como el api no nos permite eliminar tampoco nos permite crear
}
});
