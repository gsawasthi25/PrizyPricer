describe('Info Pack Controller', function() {

	var $scope, httpBackendVar, state;

	var mockInfoPackResponse = [ {
		meetingId : "261114",
		companyName : "SAI OEF 8/10/14 BUS VAL TEST",
		meetingDate : "2016-05-04 08:00:00.000000 +01:00",
		infoPackStatus : "Available",
		hostCorpId : "a510786",
		hostName : "Patel, Nishant",
		coordinatorCorpId : "a510786",
		meetingAttendee : "a510786",
		regionCode : "EUR",
		countryCode : "UK",
		infopackList : [ {
			name : "Book List for Analyts.xlsx"
		}, {
			name : "test.txt"
		}, {
			name : "stdOut.txt"
		} ]
	} ];

	beforeEach(function() {

		module('mercuryAnywhere');

		inject(function($controller, $httpBackend, $rootScope, $state) {
			httpBackendVar = $httpBackend;
			$scope = $rootScope.$new();
			state = $state;
			httpBackendVar.when('GET', 'partials/meetingsView.html').respond(
					200);
			httpBackendVar.when('GET', 'partials/infoPackData.html').respond(
					200);
			httpBackendVar.when('GET', 'partials/infoPackView.html').respond(
					200);
			httpBackendVar.when('GET', 'partials/noMeeting.html').respond(200);
			spyOn(state, 'go');
			$controller('infoPackCtrl', {
				'$scope' : $scope,
				'$state' : state,
			});

		});
	});

	afterEach(function() {
		httpBackendVar.verifyNoOutstandingExpectation();
		httpBackendVar.verifyNoOutstandingRequest();
	});
	
	function setDefaultExpectation(){
		httpBackendVar.when('GET', '../MercuryServices/infopacks').respond(
				mockInfoPackResponse, {});
		httpBackendVar.flush();
	}
	
	it('should load infopack data template when infopack data is available', function() {
		setDefaultExpectation();
		expect(state.go).toHaveBeenCalledWith('infoPack.infoPackData');
	});
	
	it('should fetch infopack', function() {
		setDefaultExpectation();
		var expectedInfoPackResponse = {
			meetingId : "261114",
			companyName : "SAI OEF 8/10/14 BUS VAL TEST",
			meetingDate : "2016-05-04 08:00:00.000000 +01:00",
			infoPackStatus : "Available",
			hostCorpId : "a510786",
			hostName : "Patel, Nishant",
			coordinatorCorpId : "a510786",
			meetingAttendee : "a510786",
			regionCode : "EUR",
			countryCode : "UK",
			infopackList : [ {
				name : "Book List for Analyts.xlsx"
			}, {
				name : "test.txt"
			}, {
				name : "stdOut.txt"
			} ]
		};
		
		expect($scope.infoPackmeetings[0]).toEqual(expectedInfoPackResponse);
		expect($scope.infoPackmeetings.length).toEqual(1);
	});
	

	it('should load no meetings template when no info pack data is available', function() {
		var noMeetings = [];
		httpBackendVar.when('GET', '../MercuryServices/infopacks').respond(noMeetings, {});
		httpBackendVar.flush();
		expect(state.go).toHaveBeenCalledWith('infoPack.noData');
	});

	it('should load error template when error fetching info Pack data', function() {
		httpBackendVar.when('GET', '../MercuryServices/infopacks').respond(500, {});
		httpBackendVar.flush();
		expect(state.go).toHaveBeenCalledWith('error');
	});
});
