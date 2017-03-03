class commentFormController{
  constructor(firebaseService, userData, $location) {
    this.firebaseService = firebaseService;
    this.userData = userData;
    this.$location = $location;

    this.commentText = '';
  }
  $onInit(){
    this.isReply = this.isReply || false;

    if(this.commentNesting){
      this.pageLocations = this.getPageLocations() || '';
      this.pageLocations += this.commentNesting;
    }else{
      this.pageLocations = this.getPageLocations() || '';
    }
  }
  submitComment(text){
    if(text){
      this.userData.setComment(
        this.pageLocations,
        text,
        this.isReply
      )
      .then(() => {
        this.refresh();
        // TODO success Sun 29 Jan 2017 19:48:40 UTC
      })
      .catch(err => {
        // TODO fail Sun 29 Jan 2017 19:48:44 UTC
      });
    }else{
      console.error('comment is empty')
    }
    this.commentText = '';
  }
  signIn(){
    this.showSignIn = true;
  }
  closeSignIn(){
    this.showSignIn = false;
  }
  getPageLocations(){
    let url = this.$location.absUrl();
    let arr = url.split('/');

    for(let i = arr.length-1; i >= 0; i--){
      if(arr[i] === '' || arr[i] === '#!'){
        arr.splice(i, 1);
      }
    }

    let newArr = [arr[arr.length - 2], arr[arr.length - 1], ''];

    return newArr.join('/');
  }
}

commentFormController.$inject = ['firebaseService', 'userData', '$location'];

export default commentFormController;
