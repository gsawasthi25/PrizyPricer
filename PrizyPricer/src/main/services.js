(function() {

	'use strict';
	angular.module('mercuryAnywhere').factory('mercuryAnywhereServices',
			[ '$http' , '$q', '$window','$timeout', mercuryAnywhereServices ]);

	angular.module('mercuryAnywhere').factory('jQuery',
			[ '$window', function($window) {
				return $window.jQuery;
			} ]);

	function mercuryAnywhereServices($http, $q, $window, $timeout) {
		var userPromise, userDetailPromise, userPreferencePromise, meetingsPromise, saveUserPreferencePromise, saveUserDeviceInfoPromise, countriesPromise, infoPackMeetingsPromise, infoPackDocumentPromise, updateMeetingStatusPromise;
		var serviceObj = {
			timeoutConfig : {
				timeout : 30000
			},

			getUser : function() {
				if (!userPromise) {
					userPromise = $http.get('user').then(function(response) {
						return response.data;
					});
				}
				return userPromise;
			},

			getUserDetails : function(id) {
				if (!userDetailPromise) {
					userDetailPromise = $http.get(
							'http://inda211241.in.fid-intl.com:8090/MercuryServices/user/' + id,
							serviceObj.timeoutConfig).then(function(response) {
						return response.data;
					});
				}
				return userDetailPromise;
			},

			getUserPreference : function(id) {
				if (!userPreferencePromise) {
					userPreferencePromise = $http.get(
							'http://inda211241.in.fid-intl.com:8090/MercuryServices/preference/' + id,
							serviceObj.timeoutConfig).then(function(response) {
						return response.data;
					});
				}
				return userPreferencePromise;
			},

			saveUserPreference : function(userPreference) {
				saveUserPreferencePromise = $http.post(
						'http://inda211241.in.fid-intl.com:8090/MercuryServices/savePreference', userPreference,
						serviceObj.timeoutConfig).then(function(response) {
					return response;
				});
				return saveUserPreferencePromise;
			},

			getMeetings : function(id) {
				meetingsPromise = $http.get('http://inda211241.in.fid-intl.com:8090/MercuryServices/meetings',
						serviceObj.timeoutConfig).then(function(response) {
					return response.data;
				});
				return meetingsPromise;
			},
			
			getInfoPackMeetings : function(id) {
				infoPackMeetingsPromise = $http.get('http://inda211241.in.fid-intl.com:8090/MercuryServices/infopacks',
						serviceObj.timeoutConfig).then(function(response) {
					return response.data;
				});
				return infoPackMeetingsPromise;
			},
			
			getInfoPackDocument : function(documentName, documentId, meetingId, requestType, target) {
				 var defer = $q.defer();
                 $timeout(function() {
                         $window.open('http://inda211241.in.fid-intl.com:8090/MercuryServices/infopacks/' +documentName +'/' +documentId +'/' +meetingId + '?requestType=' +requestType, target);
                     }, 100)
                     .then(function() {
                         defer.resolve('success');
                     }, function() {
                         defer.reject('error');
                     });
                 return defer.promise;
			},
			
			logUserDeviceInformation : function(id) {
				saveUserDeviceInfoPromise = $http.post(
						'http://inda211241.in.fid-intl.com:8090/MercuryServices/logUsage/MercuryAnywhere/' + id,
						serviceObj.timeoutConfig).then(function(response) {
					return response.data;
				});
				return saveUserDeviceInfoPromise;
			},
			getCountries : function() {
				countriesPromise = $http.get('http://inda211241.in.fid-intl.com:8090/MercuryServices/getCountries')
						.then(function(response) {
							return response.data;
						});
				return countriesPromise;
			},
			updateMeetingStatus : function(meetingStatus) {
				updateMeetingStatusPromise = $http.post(
						'../MercuryServices/meetingStatus', meetingStatus,
						serviceObj.timeoutConfig).then(function(response) {
					return response;
				});
				return updateMeetingStatusPromise;
			},
		};
		return serviceObj;
	}

}());
