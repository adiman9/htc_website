import controller from './lessonPage.controller';

const LessonPage = {
  controller,
  bindings: {
    lessonMetaData: '<',
    lessonData: '<'
  },
  template: `
    <h1 class="lesson-title">{{::$ctrl.lessonMetaData.title}}</h1>
    <h3 class="course-title">{{::$ctrl.lessonMetaData.course}}</h3>
    <div ng-if="$ctrl.lessonData">
      <state-change></state-change>
      <lesson-video
        video-src="{{$ctrl.videoUrl}}"
        next-video="$ctrl.nextLesson()"
        lesson-complete="$ctrl.lessonComplete()">
      </lesson-video>
      <lesson-content
        article="$ctrl.lessonData.article"
        resources="$ctrl.lessonData.resources"
        next-lesson="$ctrl.nextLesson()"
        lesson-is-complete="$ctrl.lessonService.isLessonComplete($ctrl.lessonData.lesson)"
        lesson-complete="$ctrl.lessonComplete()">
      </lesson-content>
    </div>
    <div ng-if="!$ctrl.lessonData">
      <htc-sign-in
        forgot-pass="$ctrl.forgotPass()"
        ng-if="!$ctrl.forgotPassword">
      </htc-sign-in>
      <div class="forgot-container"
        ng-if="$ctrl.forgotPassword">
          <htc-forgot-pass
            close-modal="$ctrl.closeForgot()"
            text="Sign In">
          </htc-forgot-pass>
      </div>
    </div>
  `
};

export default LessonPage;
