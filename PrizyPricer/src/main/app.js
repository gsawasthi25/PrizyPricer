(function() {
	angular.module('mercuryAnywhere', [ "ui.router" ]).config(
			function($stateProvider, $urlRouterProvider) {
				$urlRouterProvider.otherwise("meetings");

				$stateProvider.state('meetings', {
					url : "/meetings",
					templateUrl : "partials/meetingsView.html",
					controller : "meetingViewCtrl"
				}).state('meetings.meetingsData', {
					templateUrl : "partials/meetingsData.html"
				}).state('meetings.noMeeting', {
					templateUrl : "partials/noMeeting.html"
				}).state('error', {
					url : "/error",
					templateUrl : "partials/error.html",
				}).state('timeoutError', {
					url : "/timeoutError",
					templateUrl : "partials/timeoutError.html",
				}).state('infoPack', {
					url: "/infopacks",
					templateUrl : "partials/infoPackView.html",
					controller : "infoPackCtrl"
				}).state('infoPack.infoPackData', {
					templateUrl : "partials/infoPackData.html",
				}).state('infoPack.noData', {
					templateUrl : "partials/noMeeting.html",
				});

			}).constant("moment", moment).run(function() {
	});
}());
