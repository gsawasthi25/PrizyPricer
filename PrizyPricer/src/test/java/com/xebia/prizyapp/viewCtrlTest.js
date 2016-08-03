describe('Meeting View Controller', function() {

	var $scope, httpBackendVar, state , window;

	var mockRegions = [ {
		regionCode : "APxJ",
		regionDescription : "Asia Pacific",
		countries : [ {
			countryCode : "ASTL",
			countryDescription : "AUSTRALIA"
		}, {
			countryCode : "HOKO",
			countryDescription : "HONG KONG"
		}, {
			countryCode : "IND",
			countryDescription : "INDIA"
		}, {
			countryCode : "KOR",
			countryDescription : "KOREA (SOUTH)"
		}, {
			countryCode : "SING",
			countryDescription : "SINGAPORE"
		} ]
	}, {
		regionCode : "EUR",
		regionDescription : "Europe",
		countries : [ {
			countryCode : "FRAN",
			countryDescription : "FRANCE"
		}, {
			countryCode : "GERW",
			countryDescription : "GERMANY"
		}, {
			countryCode : "ITAL",
			countryDescription : "ITALY"
		}, {
			countryCode : "UK",
			countryDescription : "UNITED KINGDOM"
		} ]
	}, {
		regionCode : "JP",
		regionDescription : "Japan",
		countries : [ {
			countryCode : "JAPA",
			countryDescription : "JAPAN"
		} ]
	}];
	
	var mockMeetingsResponse = [ {
		meetingStatus : "On Time",
		meetingDelayedBy : 0,
		region : "EUR",
		hostCorpId : "a557188",
		hostDisplayName : "Madaan, Deepak",
		hostNumber : "N/A",
		coordinatorCorpId : "a569592",
		coordinatorDisplayName : "Pahwa, Prashant",
		coordinatorNumber : "N/A",
		meetingRoom : "3A",
		meetingStartTime : "2016-04-14 07:29:31.000000 +01:00",
		meetingCaption : "Credit Suisse Bank (SEPHD)",
		ticker : " ",
		meetingSubtype:"Investor/Capital Market Days",
		dialInPin:"77773434",
		dialInNumber:"234-185-241",
		meetingLink:"http://mecwdev1.uk.fid-intl.com:15000/Mercury/action/viewWebLinkCompanyMeetingDetails?fromWebLink=Company&mID=258482",
		meetingAttendee:"a571300,a568234",
		location:"LDN 3B",
		countryCode:"UK"
	}, {
		meetingStatus : "Arrived",
		meetingDelayedBy : 0,
		region : "EUR",
		hostCorpId : "a557188",
		hostDisplayName : "Dominic Rossi",
		hostNumber : "N/A",
		coordinatorCorpId : "a569592",
		coordinatorDisplayName : "Pahwa, Prashant",
		coordinatorNumber : "N/A",
		meetingRoom : "D",
		meetingStartTime : "11:00",
		meetingCaption : "Credit Suisse Bank (SEPHD)",
		ticker : " ",
		meetingSubtype:"Investor/Capital Market Days",
		dialInPin:"77773434",
		dialInNumber:"234-185-241",
		meetingLink:"http://mecwdev1.uk.fid-intl.com:15000/Mercury/action/viewWebLinkCompanyMeetingDetails?fromWebLink=Company&mID=258482",
		meetingAttendee:"a571300,a568234",
		location:"LDN 3B",
		countryCode:"UK"
	}, {
		meetingStatus : "Cancelled",
		meetingDelayedBy : 0,
		region : "EUR",
		hostCorpId : "a557188",
		hostDisplayName : "Madaan, Deepak",
		hostNumber : "N/A",
		coordinatorCorpId : "a569592",
		coordinatorDisplayName : "Pahwa, Prashant",
		coordinatorNumber : "N/A",
		meetingRoom : "D",
		meetingStartTime : "11:00",
		meetingCaption : "Credit Suisse Bank (SEPHD)",
		ticker : " ",
		meetingSubtype:"Investor/Capital Market Days",
		dialInPin:"77773434",
		dialInNumber:"234-185-241",
		meetingLink:"http://mecwdev1.uk.fid-intl.com:15000/Mercury/action/viewWebLinkCompanyMeetingDetails?fromWebLink=Company&mID=258482",
		meetingAttendee:"a571300,a568234",
		location:"LDN 3B",
		countryCode:"UK"
	}, {
		meetingStatus : "Delayed",
		meetingDelayedBy : 10,
		region : "EUR",
		hostCorpId : "a557188",
		hostDisplayName : "Madaan, Deepak",
		hostNumber : "N/A",
		coordinatorCorpId : "a569592",
		coordinatorDisplayName : "Pahwa, Prashant",
		coordinatorNumber : "N/A",
		meetingRoom : "3A",
		meetingStartTime : "11:00",
		meetingCaption : "HDFC Bank (HDFC)",
		ticker : " ",
		meetingSubtype:"Investor/Capital Market Days",
		dialInPin:"77773434",
		dialInNumber:"234-185-241",
		meetingLink:"http://mecwdev1.uk.fid-intl.com:15000/Mercury/action/viewWebLinkCompanyMeetingDetails?fromWebLink=Company&mID=258482",
		meetingAttendee:"a571300,a568234",
		location:"LDN 3B",
		countryCode:"UK"
	} ];

	beforeEach(function() {

		module('mercuryAnywhere');

		inject(function($controller, $httpBackend, $rootScope, $state, $window) {

			httpBackendVar = $httpBackend;
			$scope = $rootScope.$new();
			state = $state;
			window = $window;
			httpBackendVar.when('GET', 'partials/meetingsView.html').respond(200);
			httpBackendVar.when('GET', 'partials/meetingsData.html').respond(200);
			httpBackendVar.when('GET', 'partials/noMeeting.html').respond(200);
			spyOn(state, 'go');
			$controller('meetingViewCtrl', {
				'$scope' : $scope,
				'$state' : state,
				'$window': window
			});

		});
	});

	afterEach(function() {
		httpBackendVar.verifyNoOutstandingExpectation();
		httpBackendVar.verifyNoOutstandingRequest();
	});
	
	function setDefaultExpectation(){
		httpBackendVar.when('GET', '../MercuryServices/meetings').respond(
				mockMeetingsResponse, {});
		httpBackendVar.flush();
		$scope.regions = mockRegions;
	}

	it('should fetch meetings', function() {
		setDefaultExpectation();
		var expectedMeeting = {
			meetingStatus : "On Time",
			meetingDelayedBy : 0,
			region : "EUR",
			hostCorpId : "a557188",
			hostDisplayName : "Madaan, Deepak",
			hostNumber : "N/A",
			coordinatorCorpId : "a569592",
			coordinatorDisplayName : "Pahwa, Prashant",
			coordinatorNumber : "N/A",
			meetingRoom : "3A",
			meetingStartTime : "2016-04-14 07:29:31.000000 +01:00",
			meetingCaption : "Credit Suisse Bank (SEPHD)",
			ticker : " ",
			meetingSubtype:"Investor/Capital Market Days",
			dialInPin:"77773434",
			dialInNumber:"234-185-241",
			meetingLink:"http://mecwdev1.uk.fid-intl.com:15000/Mercury/action/viewWebLinkCompanyMeetingDetails?fromWebLink=Company&mID=258482",
			meetingAttendee:"a571300,a568234",
			location:"LDN 3B",
			countryCode:"UK"
		};
		expect($scope.meetings[0]).toEqual(expectedMeeting);
		expect($scope.meetings.length).toEqual(4);
	});
	
	it('should load meetings data template when meetings data is available', function() {
		setDefaultExpectation();
		expect(state.go).toHaveBeenCalledWith('meetings.meetingsData');
	});
	
	it('should load no meetings template when no meetings data is available', function() {
		var noMeetings = [];
		httpBackendVar.when('GET', '../MercuryServices/meetings').respond(noMeetings, {});
		httpBackendVar.flush();
		expect(state.go).toHaveBeenCalledWith('meetings.noMeeting');
	});

	it('should load error template when error fetching meetings data', function() {
		httpBackendVar.when('GET', '../MercuryServices/meetings').respond(500, {});
		httpBackendVar.flush();
		expect(state.go).toHaveBeenCalledWith('error');
	});

	it('should toggle the chevron icon for selected meeting row when clicked for the first time', function(){
		setDefaultExpectation();
		$scope.setSelectedIndex(1);
		expect($scope.selectedIndex).toEqual(1);
	});
	
	it('should toggle the chevron icon when same row clicked for the second time', function(){
		setDefaultExpectation();
		
		$scope.setSelectedIndex(1);
		expect($scope.selectedIndex).toEqual(1);
		
		$scope.setSelectedIndex(1);
		expect($scope.selectedIndex).toEqual(-1);
	});
	
	it('should toggle the chevron icon when same row clicked for the third time', function(){
		setDefaultExpectation();
		
		$scope.setSelectedIndex(1);
		expect($scope.selectedIndex).toEqual(1);
		
		$scope.setSelectedIndex(1);
		expect($scope.selectedIndex).toEqual(-1);
		
		$scope.setSelectedIndex(1);
		expect($scope.selectedIndex).toEqual(1);

	});

	it('should toggle the chevron icon when a different meeting row clicked after any other meeting row is clicked', function(){
		setDefaultExpectation();
		
		$scope.setSelectedIndex(1);
		expect($scope.selectedIndex).toEqual(1);
		
		$scope.setSelectedIndex(2);
		expect($scope.selectedIndex).toEqual(2);

	});
	
	it( 'should test window open event on click of link', function() {
		setDefaultExpectation();
		
        spyOn( window, 'open' ).and.callFake( function() {
            return true;
        } );
        
        var url = "http://localhost:8080/Mercury?abc=a"
        $scope.openLinkInWindow(url);
        expect( window.open ).toHaveBeenCalled();
        expect( window.open ).toHaveBeenCalledWith(url +'&extAppFlag=Y', 'RoomBooking', 'width=1050,height=700,left=100,top=100,scrollbars=yes,status=yes,resizable=yes');
    });
	
	it('should get Country name', function(){
		setDefaultExpectation();
		expect( $scope.getCountryName('EUR', 'UK') ).toEqual('UNITED KINGDOM');
	});
});
