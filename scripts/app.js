
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
    isIPhone = (/iphone/gi).test(navigator.appVersion),
    iPhoneHeight = (isIPhone ?  60 : 0);
	return {
		init: function () {
      width = $(window).width();
      height = $(window).height();
      headerHeight = $("header", $.mobile.activePage).height();
      footerHeight = $("footer", $.mobile.activePage).height();
      contentHeight = height - headerHeight - footerHeight + iPhoneHeight;
    },
		getContent: function () {
      return {
        width: width,
        height: contentHeight
      };
    }
	};
}());

RocknCoder.Pages.homePage = (function () {
	return {
		pageshow: function () {
      RocknCoder.Dimensions.init();
      // determine the height dynamically
      var dim = RocknCoder.Dimensions.getContent();
      $("#horizontalWrapper").css('height', dim.height);
      $("#verticalWrapper").css('height', dim.height);
    }
	};
}());

RocknCoder.Pages.verticalPage = (function () {
	var myScroll;
	return {
		pageshow: function () {
      myScroll = new iScroll('verticalWrapper');
    },
		pagehide: function () {
      myScroll.destroy();
      myScroll = null;
    }
	};
}());

RocknCoder.Pages.horizontalPage = (function () {
	var myScroll;
	return {
		pageshow: function () {
      myScroll = new iScroll('horizontalWrapper');
    },
		pagehide: function () {
      myScroll.destroy();
      myScroll = null;
    }
	};
}());




RocknCoder.Pages.twoWayPage = (function () {
  var verticalScroller, horizontalScroller;
  return {
    pageshow: function () {
      RocknCoder.Dimensions.init();
      // determine the height dynamically
      var dim = RocknCoder.Dimensions.getContent();
      $("#vWrapper").css('height', dim.height);
      verticalScroller = new iScroll('vWrapper');
      horizontalScroller = new iScroll('hWrapper');
    },
    pagehide: function () {
      verticalScroller.destroy();
      verticalScroller = null;
      horizontalScroller.destroy();
      horizontalScroller = null;
    }
  };
}());