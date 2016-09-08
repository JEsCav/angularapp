angular.module("FinalApp")
.factory("PostResource", function($resource){
return $resource("https://jsonplaceholder.typicode.com/posts/:id", {id:"@id"},{update:{method:"PUT"}});
});
//se creo esta porque es mejor que tener todo en controllers ademas hubieramos tenido que hacer muchas modificaciones y con
//esto solo se hacen las modificaciones aqui y queda listo