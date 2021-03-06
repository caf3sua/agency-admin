/**
 * @ngdoc function
 * @name app.controller:AppCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */

(function() {
    'use strict';
    angular
      .module('app')
      .controller('AppCtrl', AppCtrl);

      AppCtrl.$inject  = ['$scope', '$localStorage', '$location', '$rootScope', '$anchorScroll', '$timeout', '$window', 'Auth', '$state', 'Principal', 'ContactCommonDialogService'];

      function AppCtrl($scope, $localStorage, $location, $rootScope, $anchorScroll, $timeout, $window, Auth, $state, Principal, ContactCommonDialogService) {
        var vm = $scope;
        vm.isIE = isIE();
        vm.isSmart = isSmart();
        
        // Account
        vm.account;
        vm.isAuthenticated = Principal.isAuthenticated;
        
        // menu
        vm.asideMenu = {
        		"dashboard" : {
        			"level" : "root",
        			"ui-sref" : "root",
        		},
        };
        
        getAccount();
        
        // config
        vm.app = {
          name: 'Bảo Việt Admin',
          version: '0.1',
          // for chart colors
          color: {
            'primary':      '#0cc2aa',
            'accent':       '#a88add',
            'warn':         '#fcc100',
            'info':         '#6887ff',
            'success':      '#6cc788',
            'warning':      '#f77a99',
            'danger':       '#f44455',
            'white':        '#ffffff',
            'light':        '#f1f2f3',
            'dark':         '#2e3e4e',
            'black':        '#2a2b3c'
          },
          setting: {
            theme: {
              //primary: 'primary',
              primary: 'blue',
              //accent: 'accent',
              accent: 'indigo',
              //warn: 'warn'
              warn: 'primary'
            },
            folded: false,
            boxed: false,
            container: false,
            themeID: 6,
            bg: 'dark pace-done'
          }
        };
        
        // Menu
        // Properties & function declare
  		vm.menuProducts = [
  			{
  				"id": 1,
  				"code": "CAR",
  				"name" : "Bảo hiểm ô tô",
  				"sref": "product.car"
  			},
  			{
  				"id": 2,
  				"code": "BVP",
  				"name" : "Bảo hiểm bảo việt an gia",
  				"sref": "product.bvp"
  			},
  			{
  				"id": 3,
  				"code": "KCARE",
  				"name" : "Bảo hiểm bệnh ung thư",
  				"sref": "product.kcare"
  			},
  			{
  				"id": 4,
  				"code": "TVC",
  				"name" : "Bảo hiểm du lịch quốc tế",
  				"sref": "product.tvc"
  			},
  			{
  				"id": 5,
  				"code": "TVI",
  				"name" : "Bảo hiểm du lịch Việt Nam",
  				"sref": "product.tvi"
  			},
  			{
  				"id": 6,
  				"code": "MOTO",
  				"name" : "Bảo hiểm xe máy",
  				"sref": "product.moto"
  			},
  			{
  				"id": 7,
  				"code": "HOME",
  				"name" : "Bảo hiểm nhà tư nhân",
  				"sref": "product.home"
  			},
  			{
  				"id": 8,
  				"code": "KHC",
  				"name" : "Bảo hiểm kết hợp con người",
  				"sref": "product.khc"
  			},
  			{
  				"id": 9,
  				"code": "TNC",
  				"name" : "Bảo hiểm tai nạn con người",
  				"sref": "product.tnc"
  			},
  			{
  				"id": 10,
  				"code": "HHVC",
  				"name" : "Bảo hiểm Hàng hóa vận chuyển nội địa",
  				"sref": "product.hhvc"
  			},
  		];
  		
  		$scope.$on('authenticationSuccess', function() {
  			getAccount();
        });
  		
  		function getAccount() {
  			Principal.identity().then(function(account) {
  				console.log('AppCtrl, get Account' + account);
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
  		}
  		

        var setting = vm.app.name+'-Setting';
        // save settings to local storage
        if ( angular.isDefined($localStorage[setting]) ) {
          vm.app.setting = $localStorage[setting];
        } else {
          $localStorage[setting] = vm.app.setting;
        }
        // watch changes
        $scope.$watch('app.setting', function(){
          $localStorage[setting] = vm.app.setting;
        }, true);

        getParams('bg') && (vm.app.setting.bg = getParams('bg'));

        vm.setTheme = setTheme;
        setColor();
        
        function setTheme(theme){
          vm.app.setting.theme = theme.theme;
          setColor();
          if(theme.url){
            $timeout(function() {
              $window.location.href = theme.url;
            }, 100, false);
          }
        };

        function setColor(){
          vm.app.setting.color = {
            primary: getColor(vm.app.setting.theme.primary),
            accent: getColor(vm.app.setting.theme.accent),
            warn: getColor(vm.app.setting.theme.warn)
          };
        };

        function getColor(name){
          return vm.app.color[ name ] ? vm.app.color[ name ] : palette.find(name);
        };

        $rootScope.$on('$stateChangeSuccess', openPage);

        function openPage() {
          // goto top
          $location.hash('content');
          $anchorScroll();
          $location.hash('');
          // hide open menu
          $('#aside').modal('hide');
          $('body').removeClass('modal-open').find('.modal-backdrop').remove();
          $('.navbar-toggleable-sm').collapse('hide');
        };

        vm.goBack = function () {
          $window.history.back();
        };

        function isIE() {
          return !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
        }

        function isSmart(){
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        function getParams(name) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
              results = regex.exec(location.search);
          return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        
        vm.toogleSettingFolded = function() {
        		console.log('toogleSettingFolded');
        		vm.app.setting.folded = !vm.app.setting.folded;
        }
        
        vm.logout = function() {
    		console.log('logout');
//            Auth.logout();
//            vm.isAuthenticated = null;
//            $rootScope.$broadcast('logoutSuccess');
            $state.go('access.signin');
        }

        vm.openAddContact = function() {
        	console.log('openAddContact');
        	//ContactCommonDialogService.openAddDialog();
        	$state.go('app.contact-new');
        }
      }
})();
