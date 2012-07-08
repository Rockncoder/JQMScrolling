
// Next two lines for JS-Lint, first a pragma instruction, then global vars specified
"use strict";
var $, iScroll, window, alert;

// create our own namespace
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
		getDimensions = function () {
			return {
				width: width,
				height: contentHeight
			};
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
		getDimensions: getDimensions
	};
}());

RocknCoder.Pages.homePage = (function () {
	var pageshow = function () {
			RocknCoder.Dimensions.init();
			var dim = RocknCoder.Dimensions.getDimensions();
			// determine the height dynamically
			$("#horizontalWrapper").css('height', dim.height);
			$("#verticalWrapper").css('height', dim.height);
		};
	return {
		pageshow: pageshow
	};
}());

RocknCoder.Pages.verticalPage = (function () {
	var myScroll,
		pageshow = function () {
			myScroll = new iScroll('verticalWrapper');

		},
		pagehide = function () {
			myScroll.destroy();
			myScroll = null;
		};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	};
}());

RocknCoder.Pages.horizontalPage = (function () {
	var myScroll,
		pageshow = function () {
			myScroll = new iScroll('horizontalWrapper');
		},
		pagehide = function () {
			myScroll.destroy();
			myScroll = null;
		};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	};
}());