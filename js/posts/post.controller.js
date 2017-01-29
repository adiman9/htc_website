class PostCommentController{
  constructor(firebaseService, $location, $scope) {
    this.firebaseService = firebaseService;
    this.$location = $location;
    this.$scope = $scope;

    this.comments = [];
  }
  $onInit(){
    this.getComments();
  }
  getComments(){
    let loc = this.getPageLocations() || '';

    this.firebaseService.getComments(loc)
      .then(comments => {
        this.comments = comments || [];
        this.$scope.$apply();
      });
  }
  getPageLocations(){
    let url = this.$location.absUrl();
    let arr = url.split('/');

    let newArr = arr.splice(3);

    return newArr.join('/');
  }
  getNumComments(){
    let num = this.comments.length;

    loopReplies(this.comments);

    return num;

    function loopReplies(comments){
      comments.forEach(item => {
        if(item.replies){
          num += item.replies.length;
          loopReplies(item.replies);
        }
      });
    }
  }
}

PostCommentController.$inject = ['firebaseService', '$location', '$scope'];

export default PostCommentController;
