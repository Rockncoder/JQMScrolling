"use strict";

var $, iScroll, window, alert;

var RocknCoder = RocknCoder || {};
RocknCoder.Pages = RocknCoder.Pages || {};

RocknCoder.Pages.Kernel = function (event) {
	var that = this,
		eventType = event.type,
		pageName = $(this).attr("data-rockncoder-jspage");
	if (RocknCoder && RocknCoder.Pages && pageName && RocknCoder.Pages[pageName] && RocknCoder.Pages[pageName][eventType]) {
		RocknCoder.Pages[pageName][eventType].call(that);
	}
};

RocknCoder.Pages.Events = (function () {
	$("div[data-rockncoder-jspage]").on(
		'pagebeforecreate pagecreate pagebeforeload pagebeforeshow pageshow pagebeforechange pagechange pagebeforehide pagehide pageinit',
		RocknCoder.Pages.Kernel
	);
}());

RocknCoder.Dimensions = (function () {
	var width, height, headerHeight, footerHeight, contentHeight,

		getContentHeight = function () {
			return contentHeight;
		},
		init = function () {
			width = $(window).width();
			height = $(window).height();
			headerHeight = $("header", $.mobile.activePage).height();
			footerHeight = $("footer", $.mobile.activePage).height();
			contentHeight = height - headerHeight - footerHeight;
		};
	return {
		init: init,
		getContentHeight: getContentHeight
	};
}());

RocknCoder.Pages.homePage = (function () {
	var pageinit = function () {
		},
		pageshow = function () {
			RocknCoder.Dimensions.init();
			var height = RocknCoder.Dimensions.getContentHeight();
			// determine the height dynamically
			$("#horizontalWrapper").css('height', height);
			$("#verticalWrapper").css('height', height);
			//alert("height = "+screen.height);
		},
		pagehide = function () {
		};
	return {
		pageinit: pageinit,
		pageshow: pageshow,
		pagehide: pagehide
	};
}());

RocknCoder.Pages.verticalPage = (function () {
	var myScroll,

		pageinit = function () {
		},
		pageshow = function () {
			myScroll = new iScroll('verticalWrapper');

		},
		pagehide = function () {
			myScroll.destroy();
			myScroll = null;
		};
	return {
		pageinit: pageinit,
		pageshow: pageshow,
		pagehide: pagehide
	};
}());

RocknCoder.Pages.horizontalPage = (function () {
	var myScroll,

		pageinit = function () {
		},
		pageshow = function () {
			myScroll = new iScroll('horizontalWrapper');
		},
		pagehide = function () {
			myScroll.destroy();
			myScroll = null;
		};
	return {
		pageinit: pageinit,
		pageshow: pageshow,
		pagehide: pagehide
	};
}());