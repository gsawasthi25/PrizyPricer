describe(
		'App Controller',
		function() {

			var $scope, timeout, httpBackendVar, state, interval;
			var mockUserResponse = {
				"id" : "aXXXXXX"
			};
			var mockUserNameResponse = {
				"displayName" : "LAST, FIRST",
				"id" : "aXXXXXX"
			};

			var mockUserPreferenceResponse = {
				"id" : "aXXXXXX",
				"theme" : "default",
				"region" : "EUR",
				"meetingFilter" : "hostCorpId",
				"countryCode":"null"
			}
			
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

			beforeEach(function() {

				module('mercuryAnywhere');

				inject(function($controller, $httpBackend, $rootScope, $state,
						$interval, $timeout) {

					httpBackendVar = $httpBackend;
					$scope = $rootScope.$new();
					state = $state;
					interval = $interval;
					timeout = $timeout;
					spyOn(state, 'go');
					httpBackendVar.when('GET', 'partials/meetingsView.html')
							.respond(200);
					$controller('appController', {
						'$scope' : $scope,
						'$state' : state,
						'$interval' : interval,
						'$timeout'  : $timeout
					});

				});
			});

			afterEach(function() {
				httpBackendVar.verifyNoOutstandingExpectation();
				httpBackendVar.verifyNoOutstandingRequest();
			});

			function setDefaultExpectations() {
				httpBackendVar.when('GET', 'user')
						.respond(mockUserResponse, {});
				httpBackendVar.when('GET', '../MercuryServices/user/aXXXXXX')
						.respond(mockUserNameResponse, {});
				httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
						.respond(mockUserPreferenceResponse, {});
				httpBackendVar.when('GET', '../MercuryServices/getCountries')
						.respond(mockRegions, {});
				httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
				.respond(200, {});
				httpBackendVar.flush();
			}

			it('should fetch user name', function() {
				setDefaultExpectations();
				expect($scope.userName).toEqual('LAST, FIRST');
			});

			it('should load error template when error fetching user id',
					function() {
						httpBackendVar.when('GET', 'user').respond(500, {});
						httpBackendVar.flush();
						expect(state.go).toHaveBeenCalledWith('error');
					});

			it('should load error template when error fetching user name',
					function() {
						httpBackendVar.when('GET', 'user').respond(
								mockUserResponse, {});
						httpBackendVar.when('GET',
								'../MercuryServices/user/aXXXXXX').respond(500,
								{});
						httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
								.respond(200, {});
						httpBackendVar.when('GET', '../MercuryServices/getCountries')
								.respond(mockRegions, {});
						httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
								.respond(200, {});
						httpBackendVar.flush();
						expect(state.go).toHaveBeenCalledWith('error');
					});

			it('should select All region from drop down',
					function() {
						setDefaultExpectations();
						var expectedRegion = {
								regionCode : "",
								regionDescription : "All",
								countries :null
							};

						$scope.onRegionSelect(expectedRegion);
						expect($scope.selectedRegion).toEqual(expectedRegion.regionCode);
						expect($scope.selectedCountry).toEqual('');
						expect($scope.regionLabel).toEqual(
								expectedRegion.regionDescription);
			});

			it('should select country and region from drop down',
					function() {
						setDefaultExpectations();
						var expectedRegion = {
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
							};
						

						$scope.onRegionSelect(expectedRegion);
						$scope.onCountrySelect(expectedRegion.countries[0], expectedRegion);
						expect($scope.selectedRegion).toEqual(expectedRegion.regionCode);
						expect($scope.selectedCountry).toEqual(expectedRegion.countries[0].countryCode);
						expect($scope.regionLabel).toEqual(expectedRegion.countries[0].countryDescription);
						expect($scope.isCountrySelected(expectedRegion.countries[0], expectedRegion)).toEqual(true);
			});

			
			it('should select All regions and mark it as selected if user Preference not found',
					function() {
							httpBackendVar.when('GET', 'user').respond(
									mockUserResponse, {});
							httpBackendVar.when('GET',
									'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
									{});
							httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
									.respond({}, {});
							httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
									.respond(200, {});
							httpBackendVar.when('GET', '../MercuryServices/getCountries')
									.respond(mockRegions, {});
							httpBackendVar.flush();
							
						var expectedRegion = {
								regionCode : "",
								regionDescription : "All Regions",
								countries : null
							};
						expect($scope.isSelected(expectedRegion)).toEqual(true);
			});
			
			it('should show region label and region  as per saved user Preference',
					function() {
							httpBackendVar.when('GET', 'user').respond(
									mockUserResponse, {});
							httpBackendVar.when('GET',
									'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
									{});
							httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
									.respond({"id":"a571300","theme":"B","region":"EUR","meetingFilter":"null", "countryCode":"null"}, {});
							httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
									.respond(200, {});
							httpBackendVar.when('GET', '../MercuryServices/getCountries')
									.respond(mockRegions, {});
							httpBackendVar.flush();
							
							var expectedRegion = {
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
								};
							timeout(function(){
								expect($scope.selectedRegion).toEqual(
									expectedRegion.regionCode);
								expect($scope.regionLabel).toEqual(
									expectedRegion.regionDescription);
								expect($scope.regionLabel).toEqual(
									expectedRegion.regionDescription);
							}, 400);
			});

			it('should change meeting label to Created by me on selecting Created by me from drop down',
					function() {
						setDefaultExpectations();
						var expectedFilter = {
							filterValue : 'coordinatorCorpId',
							filterLabel : 'Created by me'
						};

						$scope.onfilterTypeSelect(expectedFilter);
						expect($scope.filterLabel).toEqual(
								expectedFilter.filterLabel);
						expect($scope.selectedfilterType).toEqual(
								expectedFilter.filterValue);
					});

			it('should display meetings created by logged in user on selecting Created by me from drop down',
					function() {
						setDefaultExpectations();
						var expectedFilter = {
							filterValue : 'coordinatorCorpId',
							filterLabel : 'Created by me'
						};

						$scope.onfilterTypeSelect(expectedFilter);
						expect($scope.selectedCordinatorCorpId).toEqual(
								'aXXXXXX');
						expect($scope.selectedHostCorpId).toEqual('');
						expect($scope.selectedMeetingAttendee).toEqual('');
					});

			it('should display meetings hosted by logged in user on selecting Hosted by me from drop down',
					function() {
						setDefaultExpectations();
						var expectedFilter = {
							filterValue : 'hostCorpId',
							filterLabel : 'Hosted by me'
						};

						$scope.onfilterTypeSelect(expectedFilter);
						expect($scope.selectedCordinatorCorpId).toEqual('');
						expect($scope.selectedHostCorpId).toEqual('aXXXXXX');
						expect($scope.selectedMeetingAttendee).toEqual('');
					});

			it('should display meetings attended by logged in user on selecting My meetings from drop down',
					function() {
						setDefaultExpectations();
						var expectedFilter = {
							filterValue : 'meetingAttendee',
							filterLabel : 'My meetings'
						};

						$scope.onfilterTypeSelect(expectedFilter);
						expect($scope.selectedCordinatorCorpId).toEqual('');
						expect($scope.selectedHostCorpId).toEqual('');
						expect($scope.selectedMeetingAttendee).toEqual(
								'aXXXXXX');
					});

			it('should display all meetings on selecting All Meetings from drop down',
					function() {
						setDefaultExpectations();
						var hostedByMeFilter = {
							filterValue : 'hostCorpId',
							filterLabel : 'Hosted by me'
						};

						var expectedFilter = {
							filterValue : '',
							filterLabel : 'All Meetings'
						};

						$scope.onfilterTypeSelect(hostedByMeFilter);
						$scope.onfilterTypeSelect(expectedFilter);
						expect($scope.selectedCordinatorCorpId).toEqual('');
						expect($scope.selectedHostCorpId).toEqual('');
					});

			it('should not close popup on selecting Search Meetings from drop down',
					function() {
						setDefaultExpectations();
						var expectedFilter = {
							filterValue : 'searchMeetings',
							filterLabel : 'Search Meetings '
						};

						var event = jasmine.createSpyObj('event',
								[ 'stopPropagation' ]);
						$scope.onfilterTypeSelect(expectedFilter, event);
						expect(event.stopPropagation).toHaveBeenCalled();
					});

			it('should empty search meetings on selecting anything from filter drop down',
					function() {
						setDefaultExpectations();
						var expectedFilter = {
							filterValue : 'hostCorpId',
							filterLabel : 'Hosted by me'
						};

						$scope.onfilterTypeSelect(expectedFilter);
						expect($scope.searchText).toEqual('');
				});

			it('should select all meetings and mark it as selected if user Preference is not found',
					function() {
						
						httpBackendVar.when('GET', 'user').respond(
								mockUserResponse, {});
						httpBackendVar.when('GET',
								'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
								{});
						httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
								.respond({}, {});
						httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
								.respond(200, {});
						httpBackendVar.when('GET', '../MercuryServices/getCountries')
								.respond(mockRegions, {});
						httpBackendVar.flush();
						var expectedFilter = {
							filterValue : '',
							filterLabel : 'All Meetings'
						};
						expect($scope.isfilterTypeSelected(expectedFilter))
								.toEqual(true);
			});
			
			
			it('should select all meetings and mark it as selected if user Preference has all meetings as meeting filter',
					function() {
						
						httpBackendVar.when('GET', 'user').respond(
								mockUserResponse, {});
						httpBackendVar.when('GET',
								'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
								{});
						httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
								.respond({"id":"a571300","theme":"default","region":"EUR","meetingFilter":"null","countryCode":"null"}, {});
						httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
								.respond(200, {});
						httpBackendVar.when('GET', '../MercuryServices/getCountries')
								.respond(mockRegions, {});
						httpBackendVar.flush();
						var expectedFilter = {
							filterValue : '',
							filterLabel : 'All Meetings'
						};
						expect($scope.isfilterTypeSelected(expectedFilter))
								.toEqual(true);
			});
			
			it('should display meetings attended by logged in user if user Preference has My meetings as meeting filter',
					function() {
						
						httpBackendVar.when('GET', 'user').respond(
								mockUserResponse, {});
						httpBackendVar.when('GET',
								'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
								{});
						httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
								.respond({"id":"aXXXXXX","theme":"default","region":"EUR","meetingFilter":"meetingAttendee","countryCode":"FRAN"}, {});
						httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
								.respond(200, {});
						httpBackendVar.when('GET', '../MercuryServices/getCountries')
								.respond(mockRegions, {});
						httpBackendVar.flush();
						timeout(function(){
							expect($scope.selectedCordinatorCorpId).toEqual('');
							expect($scope.selectedHostCorpId).toEqual('');
							expect($scope.selectedMeetingAttendee).toEqual(
									'aXXXXXX');
						}, 600);
			});
			
			
			it('should display meetings hosted by logged in user if user Preference has Hosted by me as meeting filter',
					function() {
						
						httpBackendVar.when('GET', 'user').respond(
								mockUserResponse, {});
						httpBackendVar.when('GET',
								'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
								{});
						httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
								.respond({"id":"aXXXXXX","theme":"default","region":"EUR","meetingFilter":"hostCorpId", "countryCode":"FRAN"}, {});
						httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
								.respond(200, {});
						httpBackendVar.when('GET', '../MercuryServices/getCountries')
								.respond(mockRegions, {});
						httpBackendVar.flush();
						timeout(function(){
							expect($scope.selectedCordinatorCorpId).toEqual('');
							expect($scope.selectedHostCorpId).toEqual('aXXXXXX');
							expect($scope.selectedMeetingAttendee).toEqual('');
						}, 600);
			});
			
			it('should display meetings created by logged in user if user Preference has Created by me as meeting filter',
					function() {
						
						httpBackendVar.when('GET', 'user').respond(
								mockUserResponse, {});
						httpBackendVar.when('GET',
								'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
								{});
						httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
								.respond({"id":"aXXXXXX","theme":"default","region":"EUR","meetingFilter":"coordinatorCorpId", "countryCode":"FRAN"}, {});
						httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
								.respond(200, {});
						httpBackendVar.when('GET', '../MercuryServices/getCountries')
								.respond(mockRegions, {});
						httpBackendVar.flush();
						timeout(function(){
							expect($scope.selectedCordinatorCorpId).toEqual('aXXXXXX');
							expect($scope.selectedHostCorpId).toEqual('');
							expect($scope.selectedMeetingAttendee).toEqual('');
						}, 600);
			});
			

			it('should auto refresh meetings data on specified interval',
					function() {
						setDefaultExpectations();
						spyOn($scope, 'onRefresh');
						$scope.refreshInterval = 10;
						$scope.$digest();
						interval.flush(20);
						expect($scope.onRefresh).toHaveBeenCalled();
						interval.flush(30);
						expect($scope.onRefresh).toHaveBeenCalled();
						interval.flush(40);
						expect($scope.onRefresh).toHaveBeenCalled();
			});

			
			it('should show error page if fails to save user preferences',
					function() {
				httpBackendVar.when('GET', 'user').respond(
						mockUserResponse, {});
				httpBackendVar.when('GET',
						'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
						{});
				httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
						.respond(200, {});
				httpBackendVar.when('GET', '../MercuryServices/getCountries')
						.respond(mockRegions, {});
				httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
						.respond({"id":"aXXXXXX","theme":"default","region":"EUR","meetingFilter":"coordinatorCorpId","countryCode":"FRAN"}, {});
				httpBackendVar.when('POST',
						'../MercuryServices/savePreference', {
							"id" : "aXXXXXX",
							"theme" : "default",
							"region" : "EUR",
							"meetingFilter" : "coordinatorCorpId",
							"countryCode":"FRAN"
						}).respond(500);
				$scope.userId = "aXXXXXX";
				$scope.selectedRegion = "EUR";
				$scope.selectedCountry = "FRAN";
				$scope.selectedfilterType = "coordinatorCorpId";
				$scope.savePreference();
				httpBackendVar.flush();
				timeout(function(){
					expect(state.go).toHaveBeenCalledWith('error');
				}, 600);
			});
			
			it('should show success message on save user preferences',
					function() {
				httpBackendVar.when('GET', 'user').respond(
						mockUserResponse, {});
				httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
						.respond(200, {});
				httpBackendVar.when('GET', '../MercuryServices/getCountries')
						.respond(mockRegions, {});
				httpBackendVar.when('GET',
						'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
						{});
				httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
						.respond({"id":"aXXXXXX","theme":"default","region":"EUR","meetingFilter":"coordinatorCorpId","countryCode":"FRAN"}, {});
				httpBackendVar.when('POST',
						'../MercuryServices/savePreference', {
							"id" : "aXXXXXX",
							"theme" : "default",
							"region" : "EUR",
							"meetingFilter" : "coordinatorCorpId",
							"countryCode":"FRAN"	
						}).respond(200);
				$scope.userId = "aXXXXXX";
				$scope.selectedRegion = "EUR";
				$scope.selectedCountry = "FRAN";
				$scope.selectedfilterType = "coordinatorCorpId";
				$scope.savePreference();
				httpBackendVar.flush();
				timeout(function(){
					expect($scope.successFlag).toEqual('Y');
					timeout(function(){
						expect($scope.successFlag).toEqual('N');
			         }, 1501);
					timeout.flush();
				 },600);
				
			});
			
			
			it('should change theme if theme switched from user preferences',
					function() {
				setDefaultExpectations();
				expect($scope.theme).toEqual('default');
				$scope.switchTheme();
				expect($scope.theme).toEqual('black');
				$scope.switchTheme();
				expect($scope.theme).toEqual('default');
			});
			
			it('should show default theme if user Preference is not found',
					function() {
						
						httpBackendVar.when('GET', 'user').respond(
								mockUserResponse, {});
						httpBackendVar.when('GET',
								'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
								{});
						httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
								.respond({}, {});
						httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
								.respond(200, {});
						httpBackendVar.when('GET', '../MercuryServices/getCountries')
								.respond(mockRegions, {});
						httpBackendVar.flush();
						expect($scope.theme).toEqual('default');
			});
			
			it('should show default theme if user Preference has saved theme default',
					function() {
						
						httpBackendVar.when('GET', 'user').respond(
								mockUserResponse, {});
						httpBackendVar.when('GET',
								'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
								{});
						httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
								.respond({"id":"aXXXXXX","theme":"default","region":"EUR","meetingFilter":"coordinatorCorpId","countryCode":"FRAN"}, {});
						httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
								.respond(200, {});
						httpBackendVar.when('GET', '../MercuryServices/getCountries')
								.respond(mockRegions, {});
						httpBackendVar.flush();
						timeout(function() {
							expect($scope.theme).toEqual('default');
						}, 600);
			});
			
			it('should show black theme if user Preference has saved theme black',
					function() {
						
						httpBackendVar.when('GET', 'user').respond(
								mockUserResponse, {});
						httpBackendVar.when('GET',
								'../MercuryServices/user/aXXXXXX').respond(mockUserNameResponse,
								{});
						httpBackendVar.when('GET', '../MercuryServices/preference/aXXXXXX')
								.respond({"id":"aXXXXXX","theme":"black","region":"EUR","meetingFilter":"coordinatorCorpId","countryCode":"IND"}, {});
						httpBackendVar.when('POST', '../MercuryServices/logUsage/MercuryAnywhere/aXXXXXX')
								.respond(200, {});
						httpBackendVar.when('GET', '../MercuryServices/getCountries')
								.respond(mockRegions, {});
						httpBackendVar.flush();
						timeout(function() {
							expect($scope.theme).toEqual('black');
						}, 600);
			});
			
			it('should show timeout error if error callback happens after set timeout',
					function() {
				setDefaultExpectations();
				var startTime = new Date().getTime() - 32000;
				$scope.showError(startTime);
				expect(state.go).toHaveBeenCalledWith('timeoutError');
			});
			
			it('should show server error if error callback happens before set timeout',
					function() {
				setDefaultExpectations();
				var startTime = new Date().getTime();
				$scope.showError(startTime);
				expect(state.go).toHaveBeenCalledWith('error');
			});
		});
