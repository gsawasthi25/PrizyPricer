(function() {

	'use strict';
	angular.module('mercuryAnywhere').controller(
			'appController',
			[ '$scope', '$rootScope', '$state', '$interval', '$timeout', '$templateCache',
					'jQuery', 'mercuryAnywhereServices','moment', appCtrl ]);

	function appCtrl($scope, $rootScope, $state, $interval, $timeout, $templateCache,
			jQuery, mercuryAnywhereServices,moment) {
		$rootScope.dataInconsistent = false;
		var vm = $scope;
		$templateCache
				.put(
						'partials/timeoutError.html',
						"<div class='mv-nomeetings'><h4>Request timed out. Please try again.</h4></div>");
		$templateCache
				.put(
						'partials/error.html',
						"<div class='mv-nomeetings'><h4>Unexpected application error occurred. Please contact administrator.</h4></div>");
		vm.theme = 'default';
		vm.statusUpdater = false;
		vm.menuToggled = true;
		vm.timeout = mercuryAnywhereServices.timeoutConfig.timeout;
		vm.regionLabel = 'All Regions';
		vm.selectedRegion = '';
		vm.selectedCountry = '';
		vm.lastSelectedIndex = -1;
		vm.selectedState = $state;
		vm.onRegionSelect = function(region) {
			if (region.regionCode == '') {
				vm.selectedRegion = region.regionCode;
				vm.selectedCountry = "";
				vm.regionLabel = region.regionDescription;
			}
		}

		vm.isSelected = function(region) {
			return vm.selectedRegion === region.regionCode;
		}

		vm.onCountrySelect = function(country, region) {
			vm.selectedRegion = region.regionCode;
			vm.selectedCountry = country.countryCode;
			vm.regionLabel = country.countryCode == '' ? region.regionDescription
					: country.countryDescription;
		}

		vm.isCountrySelected = function(country, region) {
			return (vm.selectedCountry === country.countryCode && vm.selectedRegion === region.regionCode);
		}

		vm.selectedfilterType = '';
		vm.filterLabel = 'All Meetings';
		vm.selectedCordinatorCorpId = '';
		vm.selectedHostCorpId = '';
		vm.selectedMeetingAttendee = '';
		vm.userId = '';
		vm.filterList = [ {
			filterValue : 'coordinatorCorpId',
			filterLabel : 'Created by me'
		}, {
			filterValue : 'hostCorpId',
			filterLabel : 'Hosted by me'
		}, {
			filterValue : 'meetingAttendee',
			filterLabel : 'My meetings'
		}, {
			filterValue : '',
			filterLabel : 'All Meetings'
		} ];

		vm.searchMeetings = {
			filterValue : 'searchMeetings',
			filterLabel : 'Search: '
		};

		vm.onfilterTypeSelect = function(filterType, event) {
			vm.selectedCordinatorCorpId = '';
			vm.selectedHostCorpId = '';
			vm.selectedMeetingAttendee = '';
			vm.searchText = '';
			if (filterType.filterValue == 'coordinatorCorpId') {
				vm.selectedCordinatorCorpId = vm.userId;
			} else if (filterType.filterValue == 'hostCorpId') {
				vm.selectedHostCorpId = vm.userId;
			} else if (filterType.filterValue == 'meetingAttendee') {
				vm.selectedMeetingAttendee = vm.userId;
			} else if (filterType.filterValue == 'searchMeetings') {
				event.stopPropagation();
			}

			vm.selectedfilterType = filterType.filterValue;
			vm.filterLabel = filterType.filterLabel;
		}

		vm.isfilterTypeSelected = function(filterType) {
			return vm.selectedfilterType === filterType.filterValue;
		}

		vm.onRefresh = function() {
			$state.transitionTo($state.current.name.indexOf('infoPack') > -1 ? 'infoPack': 'meetings', {}, {
				reload : true,
				inherit : false,
				notify : true
			});
		}

		vm.successFlag = '';

		vm.onClose = function() {
			vm.successFlag = 'N';
		}

		vm.savePreference = function() {
			var userPreference = {
				"id" : vm.userId,
				"theme" : vm.theme,
				"region" : vm.selectedRegion,
				"meetingFilter" : vm.selectedfilterType,
				"countryCode" : vm.selectedCountry
			};
			var startTime = new Date().getTime();
			mercuryAnywhereServices.saveUserPreference(userPreference).then(
					function(response) {
						if (response.status == 200) {
							vm.successFlag = 'Y';
							$timeout(function() {
								vm.successFlag = 'N';
							}, 1500);
						}
					}, function(error) {
						vm.showError(startTime);
					});
		}

		vm.switchTheme = function() {
			if (vm.theme === 'default') {
				vm.theme = 'black';
			} else {
				vm.theme = 'default';
			}
		}

		vm.showError = function(startTime) {
			var responseTime = new Date().getTime() - startTime;
			if (responseTime > vm.timeout) {
				$state.go('timeoutError');
			} else {
				$state.go('error');
			}
		}

		authenticateUser();

		function authenticateUser() {
			mercuryAnywhereServices.getUser().then(function(data) {
				vm.userId = data.id;
				fetchCountries();
				fetchUserDetails();
				logUserDeviceInformation();
			}, function(error) {
				$state.go('error');
			});
		}

		function fetchUserDetails() {
			var startTime = new Date().getTime();
			mercuryAnywhereServices.getUserDetails(vm.userId).then(
					function(response) {
						vm.userName = response.displayName;
						vm.statusUpdater = response.meetingStatusUpdater == 'Y' ? true : false;
					}, function(error) {
						vm.showError(startTime);
					});
		}

		function fetchUserPreference() {
			var startTime = new Date().getTime();
			mercuryAnywhereServices.getUserPreference(vm.userId).then(
					function(response) {
						setRegionFilter(response.region, response.countryCode);
						setMeetingFilter(response.meetingFilter);
						setTheme(response.theme);
					}, function(error) {
						vm.showError(startTime);
					});
		}

		function fetchCountries() {
			var startTime = new Date().getTime();
			mercuryAnywhereServices.getCountries().then(function(response) {
				transformRegion(response);
				$timeout(function() {
					jQuery('[data-submenu]').submenupicker();
					fetchUserPreference();
				}, 400);
			}, function(error) {
				vm.showError(startTime);
			});
		}

		function setRegionFilter(region, country) {
			for ( var regionObj in vm.regions) {
				if (vm.regions[regionObj].regionCode == region) {
					vm.selectedRegion = region;
					vm.regionLabel = vm.regions[regionObj].regionDescription;

					for ( var countryObj in vm.regions[regionObj].countries) {
						if (vm.regions[regionObj].countries[countryObj].countryCode == country) {
							vm.selectedCountry = country;
							vm.regionLabel = vm.regions[regionObj].countries[countryObj].countryDescription;
							return true;
						}
					}
					return true;
				}
			}
		}

		function setMeetingFilter(meetingFilter) {
			for ( var meetingFilterObj in vm.filterList) {
				if (vm.filterList[meetingFilterObj].filterValue == meetingFilter) {
					vm.selectedfilterType = meetingFilter;
					vm.filterLabel = vm.filterList[meetingFilterObj].filterLabel;

					if (meetingFilter == 'coordinatorCorpId') {
						vm.selectedCordinatorCorpId = vm.userId;
					} else if (meetingFilter == 'hostCorpId') {
						vm.selectedHostCorpId = vm.userId;
					} else if (meetingFilter == 'meetingAttendee') {
						vm.selectedMeetingAttendee = vm.userId;
					}
					return true;
				}
			}
		}

		function setTheme(theme) {
			if (!theme) {
				vm.theme = 'default';
			} else {
				vm.theme = theme;
			}
		}

		function logUserDeviceInformation() {
			mercuryAnywhereServices.logUserDeviceInformation(vm.userId);
		}

		function transformRegion(result) {
			var allCountry = {
				countryCode : "",
				countryDescription : "All"
			};
			var allRegion = {
				regionCode : "",
				regionDescription : "All Regions",
				countries : null
			};

			result.forEach(function(region) {
				region.countries.unshift(allCountry);
			});

			result.push(allRegion);
			vm.regions = result;
		}

		vm.convertToDate = function(regionCode, dateTime, format) {
			var date = new moment(dateTime, 'YYYY-MM-DD HH:mm:ss.SSSSSS Z');
			var convertedDate = "";
			switch (regionCode) {
			case "EUR":
				convertedDate = date.tz("GB").format(format);
				break;
			case "APxJ":
				convertedDate = date.tz("Hongkong").format(format);
				break;
			case "JP":
				convertedDate = date.tz("Japan").format(format);
				break;
			}
			return convertedDate;
		}

		vm.toggleSideBar = function($event) {
			$event.preventDefault();
			vm.menuToggled = !vm.menuToggled;
		}

		vm.changeState = function(stateVal) {
			var currentState = $state.current.name;
			if (currentState.indexOf(stateVal) == -1) {
				$state.go(stateVal);
			}
			vm.menuToggled = true;
		};
		
		vm.getDateForDay = function(selectedWeek, dayOfWeek) {
			//moment.tz.setDefault("Asia/Hong_Kong");
			//moment.tz.setDefault("Asia/Tokyo");
			moment.tz.setDefault("Europe/London");
			return moment().add(selectedWeek, 'weeks').isoWeekday(dayOfWeek).format('Do MMMM');
		}
		
		vm.disableCarousel = function(){
			jQuery('.carousel').carousel({
				  interval: false
				});
			
		}
		
		
		
		vm.$watch('refreshInterval', function(refreshIntervalVal) {
			if (refreshIntervalVal) {
				$interval(vm.onRefresh, refreshIntervalVal);
			}
		});
		
		vm.closeStatusAlert = function()
		{
			$rootScope.dataInconsistent = false;
		}

	}
}());
