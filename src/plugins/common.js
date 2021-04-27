define('module/common', function(require, exports, module){

  'use strict';

  var $ = require('jquery');
  
  var common = {
    regx: {
      name: /^[a-zA-Z\u4e00-\u9fa5]+$/,
      number: /^[1-9]+\d*$/,
      mobile: /^(13[0-9]{9})|(18[0-9]{9})|(15[0-9]{9})|(14[57][0-9]{8})|(17[0-9]{9})$/,
      email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g,
      zipcode: /^\d{6}$/,

    },
    /*Delayed page refresh*/
    reload: function(time){
      var t = 'undefined' == typeof (time) ? 1e3 : time;
      window.setTimeout(function(){
        window.location.reload();
      }, t);
    },
    /*Delayed page jump*/
    redirect: function(url, time){
      var t = 'undefined' == typeof (time) ? 1e3 : time;
      window.setTimeout(function(){
        window.location.href = url;
      }, t);
    },
    /*Replace verification code*/
    reloadVerify: function(){
      var verifyimg = $('.J_reload_verify').attr('src');
      $('.J_reload_verify').click(function(){
        if(verifyimg.indexOf('?') > 0){
          $('.J_reload_verify').attr('src', verifyimg + '&random=' + Math.random());
        }else{
          $('.J_reload_verify').attr('src', verifyimg.replace(/\?.*$/, '') + '?' + Math.random());
        }
      });
    },
    /*Show/hide top navigation, back to top button*/
    showHeadNav: function(){
      var fixed_navbar = $('.J_fixed_navbar'),
          fixed_totop = $('.J_footer_totop'),
          _body = document.body;
      document.addEventListener('scroll', function(){
        if(_body.scrollTop > 200){
          fixed_navbar.addClass('layer-show');
          fixed_totop.fadeIn();
        }else{
          fixed_navbar.removeClass('layer-show');
          fixed_totop.fadeOut();
        }
      });
    },
    /*Show/hide product categories*/
    toggleCategory: function(is_index){
      if(!!is_index){
        $('#J_item_category').addClass('show');
      }else{
        $('#J_navbar_header').hover(function(){
          $('#J_item_category').show();
        },function(){
          $('#J_item_category').hide();
        });
      }

      $('#J_item_category li').hover(function(){
        $(this).addClass('active').find('.sub-list').fadeIn(200);
      },function(){
        $(this).removeClass('active').find('.sub-list').fadeOut(200);
      });
    },
    /*Back to top*/
    setTotop: function(){
      $('#J_qq,#J_wechat').on('click', function(){
        var id = $(this).attr('id');
        $('.slde-box').hide();
        $('.'+id+'_box').show();
      });
      $('.J_icon_close').on('click', function(){
        $('.slde-box').hide();
      });
      $('#J_goto_top').on('click', function(){
        $('html, body').animate({
          scrollTop: 0
        });
      });
      /*Add bottom judgment*/
      var wh=$(document.body).height()-$(window).height();
      var st=$(document.body).scrollTop();
      var fh=$('.footer').height()+20;
      if((wh-st)<fh){
        $('.slde-menu').css('bottom',fh-(wh-st));
      }else{
        $('.slde-menu').css('bottom',0);
      }
      $(window).scroll(function(){
        st =$(document.body).scrollTop();
        if((wh-st)<fh){
          $('.slde-menu').css('bottom',fh-(wh-st));
        }else{
          $('.slde-menu').css('bottom',0);
        }
      });
    },
    /*Adaptive container height*/
    resizeContainer: function(){
      $(window).resize(function(){
        $('#main-container').css('min-height', $(window).height() - 298);
      }).resize();
    },
    /*Page form submission*/
    formSubmit: function(){
      var _self_obj = this;
      //Form submission injects hash
      var formhash = $('meta[property="formhash"]').attr('content');
      $('.J_ajax-form').each(function(){
        var _self = $(this), formhash_size;
        formhash_size =_self.find('input[name="formhash"]').size();
        if(formhash_size === 0){
          $('<input type="hidden" name="formhash" value="'+ formhash +'"/>').appendTo(_self);
        }
        var checked = _self.data('checked_ajaxpost');
        if(!checked){
          _self.data('checked_ajaxpost', 1);
          _self.submit(function(){
            var _form = $(this);
            if(_form.data('ajax') === false){
              return true;
            }
            //Testing before submission
            if(typeof _form.attr('id') === 'string'){
              var fun = eval('$.' + _form.attr('id') + '_check');
              if(typeof fun === 'function'){
                if(fun() !== true){
                  return false;
                }
              }
            }
            $(this).find('.btn').attr('disabled', true);
            $.ajax({
              type: 'POST',
              url: $(this).attr('action'),
              data: $(this).serialize(),
              dataType: 'json',
              success: function(res){
                $.ui.alert(res.info);
                if(res.status === 1){
                  //If there is a global submission callback, the callback method is executed and destroyed
                  if(typeof $.submitCallback === 'function'){
                    $.submitCallback();
                    $.submitCallback = null;
                    return ;
                  }else{
                    if(res.url){
                      _self_obj.redirect(res.url);
                    }else{
                      _self_obj.reload();
                    }
                  }
                }else{
                  _form.find('.btn').removeAttr('disabled');
                }
              }
            });
            return false;
          });
        }
        
      });
    },
    /*Picture delay loading*/
    imgLazyLoad: function(){
      var sl = require('jquery.imglazyload');
      $.imgLazyLoad({ diff: 100 });
    },
    btnInit:function(){
      $('.Z_app_qrcode').click(function(){
        $.ui.layer.show('<span style="text-align: center; display: block;"><img src="/Public/Home/default/images/app_qrcode.png" /></span>');
      });
    },
    /*Global initialization*/
    init: function(){
      var _self = this;
      _self.resizeContainer();
      _self.setTotop();
      //Let the form support ajax submission
      _self.formSubmit();
      _self.imgLazyLoad();

      /*Commonly used button effect initialization*/
      _self.btnInit();
    }
  }

  common.init();
  
  module.exports = common;
});