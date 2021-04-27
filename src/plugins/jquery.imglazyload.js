/*!
 * jquery.imgLazyLoad.js
 */
((function (factory){
  if(typeof define === 'function'){
    // If define has been defined, modular code
    define('jquery.imglazyload', ['jquery'], function (require, exports, moudles){
      factory(require('jquery')); // Initialize the plugin
      return jQuery; // Return to jQuery
    });
  }else{
    // If define is not defined, execute jQuery normally
    factory(jQuery);
  }
}(function ($){
  $.extend({
    imgLazyLoad: function (options){
      
      var config = {
        container: 'body',
        tabItemSelector: '',
        carouselItemSelector: '',
        attrName: 'data-url',
        diff: 0
      };
      $.extend(config, options || {});

      var $container = $(config.container),
              offsetObj = $container.offset(),
              compareH = $(window).height() + $(window).scrollTop(),
              // Determine whether the container is a body child element
              bl = $.contains(document.body, $container.get(0)),
              // Filter the pictures in the cache container
              notImgSelector = jQuery.imgLazyLoad.selectorCache ? ':not(' + jQuery.imgLazyLoad.selectorCache + ')' : '',
              imgSelector = 'img[' + config.attrName + ']:visible' + notImgSelector,
              $filterImgs = $container.find(imgSelector),
              // Used to prevent event processing
              isStopEventHandle = false,
              // Whether to automatically lazy load, when true, bind scroll events
              isAutoLazyload = false;

      // The cache container is the image selector of the body child element
      jQuery.imgLazyLoad.selectorCache = bl ? (jQuery.imgLazyLoad.selectorCache ? (jQuery.imgLazyLoad.selectorCache + ',' + config.container + ' img') : config.container + ' img') : jQuery.imgLazyLoad.selectorCache;

      function handleImgLoad(idx){
        if(isStopEventHandle){
          return;
        }
        /**         
        Processing Tab switching, picture carousel, when processing $filterImgs, there is no filter img:not(.img-loaded), because it is only in one panel,
        There are other panels. If triggered again, $filterImgs.length may be 0, so the filter image length can only be judged in the peripheral container  
         */
        if($container.find('img:not(.img-loaded)').length === 0){
          isStopEventHandle = true;
        }

        var itemSelector = config.tabItemSelector || config.carouselItemSelector || '';
        if(itemSelector){
          if(typeof idx !== undefined && idx >= 0){
            $filterImgs = $container.find(itemSelector).eq(idx).find('img');
          }
          else{
            if(itemSelector === config.carouselItemSelector){
              $filterImgs = $container.find(itemSelector).eq(0).find('img');
            }
            else{
              $filterImgs = $container.find(itemSelector + ':visible').find('img');
            }
          }
        }
        else{
          $filterImgs = $filterImgs.not('.img-loaded'); // Automatic lazy loading, filter the loaded pictures
          isAutoLazyload = true;
        }

        // When the position of the outer container changes, it needs to be updated
        offsetObj = $container.offset();

        if($filterImgs.length > 0){
          $filterImgs.each(function (idx, elem){
            var $target = $(elem),
                    targetTop = $target.offset().top,
                    viewH = $(window).height() + $(window).scrollTop() + config.diff;

            if(bl){
              $target.attr('src', $target.attr(config.attrName)).removeAttr(config.attrName).addClass('img-loaded');
            }
            // Content in window
            if(viewH > targetTop){
              $target.attr('src', $target.attr(config.attrName)).removeAttr(config.attrName).addClass('img-loaded');
            }
          });
        }
        else{
          // Handling scroll events
          isStopEventHandle = true;
          $(window).unbind('resize scroll', handleImgLoad);
        }
      }

      handleImgLoad();
      if(isAutoLazyload){
        $(window).bind('resize scroll', handleImgLoad);
      }

      // Provide event handler
      return {
        handleImgLoad: handleImgLoad
      }
    }
  });

  // Save the image selector under the non-body child element container
 // jQuery.scrollLoading.selectorCache = '';
})));