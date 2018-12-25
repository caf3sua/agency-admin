(function () {
    'use strict';
    // EDIT THIS FILE TO SETUP PROJECT
    angular
        .module('app')
        .constant('VERSION', "0.0.1-SNAPSHOT")
        .constant('DEBUG_INFO_ENABLED', true)
        .constant('BUILD_TIMESTAMP', "")
        .constant('API_SERVICE_PREFIX', "api,management")
        .constant('CONSTANT_REMINDER_RANGER_DATE', "30")
        .constant('PAGINATION_CONSTANTS', {
        	"itemsPerPage" : 10
        })
        .constant('API_SERVICE_URL', "https://appuat.baoviet.com.vn:7778")
//        .constant('API_SERVICE_URL', "https://esb.baoviet.com.vn:8005")
//        .constant('API_SERVICE_URL', "http://localhost:9090")	
//        .constant('API_SERVICE_URL', "http://172.29.3.89:8080")
;
})();

var chartIncomeOptions = {
        		grid : {
            		backgroundColor: 'rgba(120,120,120,0.1)'
            	},
        		color: [
        	        '#518FDA','#6FD4D0','#99d2dd','#88b0bb',
        	        '#1c7099','#038cc4','#75abd0','#afd6dd'
        	    ],
        	    tooltip : {
                	backgroundColor: 'rgba(0,0,0,0.5)',
                    axisPointer : {            
                        type : 'line',         
                        lineStyle : {          
                            color: '#1790cf',
                            type: 'dashed'
                        },
                        crossStyle: {
                            color: '#1790cf'
                        },
                        shadowStyle : {
                            color: 'rgba(200,200,200,0.3)'
                        }
                    },
                    trigger: 'axis'
                },
                legend: {
                    data:['Của tôi','Của đại lý']
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : []
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'Của tôi',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[]
                    },
                    {
                        name:'Của đại lý',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[]
                    }
                ]
                    
};

var chartCommissionOptions = {
    	grid : {
    		backgroundColor: 'rgba(120,120,120,0.1)'
    	},
		color: [
			'#518FDA','#6FD4D0','#99d2dd','#88b0bb',
	        '#1c7099','#038cc4','#75abd0','#afd6dd'
	    ],
        tooltip : {
        	backgroundColor: 'rgba(0,0,0,0.5)',
            axisPointer : {            // åæ ‡è½´æŒ‡ç¤ºå™¨ï¼Œåæ ‡è½´è§¦å‘æœ‰æ•ˆ
                type : 'line',         // é»˜è®¤ä¸ºç›´çº¿ï¼Œå¯é€‰ä¸ºï¼š'line' | 'shadow'
                lineStyle : {          // ç›´çº¿æŒ‡ç¤ºå™¨æ ·å¼è®¾ç½®
                    color: '#1790cf',
                    type: 'dashed'
                },
                crossStyle: {
                    color: '#1790cf'
                },
                shadowStyle : {                     // é˜´å½±æŒ‡ç¤ºå™¨æ ·å¼è®¾ç½®
                    color: 'rgba(200,200,200,0.3)'
                }
            },
            trigger: 'axis'
        },
        legend: {
            data:['Thời gian trước','Dự tính']
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'Thời gian trước',
                type:'bar',
                data:[0, 0, 0, 0, 0, 0, 0],
//                markPoint : {
//                    data : [
//                        {type : 'max', name: 'Max'},
//                        {type : 'min', name: 'Min'}
//                    ]
//                },
                markLine : {
                    data : [
                        {type : 'average', name: 'Average'}
                    ]
                }
            },
            {
                name:'Dự tính',
                type:'bar',
                data:[0, 0, 0, 0, 0, 0, 0],
//                markPoint : {
//                    data : [
//                        {name : 'Max', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
//                        {name : 'Min', value : 2.3, xAxis: 11, yAxis: 3}
//                    ]
//                },
                markLine : {
                    data : [
                        {type : 'average', name : 'Average'}
                    ]
                }
            }
        ]
  };
