/**
 *Commodity module: Commodity specification selection, add to favorites, change quantity
 */
define('module/item', function(require, exports, module){

  'use strict';

  var user = require('user'),
      cart = require('cart'),
      common = require('common');
  require('jquery.superslide');

  var item = {
    sku_choose_size: 0,
    sku_selected_size: 0,
    spc_data_info: '',
    init: function(spc_data_info, seckill,nowTime){
      var _self = this,
          fixed_navbar = $('#J_fixed_navbar');
  
      //Event binding
      $('.J_item_add2cart').on('click', function(){
        //Need to go back to the top in the case of fixed_navbar
        if(fixed_navbar.hasClass('show')){
          $('#J_goto_top').trigger('click');
        }
        //Determine whether all specifications have been selected
        if(_self.checkSpecSelect() == 1){
          _self.removeSpecAttention();
          cart.add();
        }else{
          _self.addSpecAttention();
          return false;
        }
      });

      //seckill
      _self.seckill(seckill,nowTime);
      
      $('.J_item_buynow').on('click', function(){
        //Determine whether all specifications have been selected
        if(_self.checkSpecSelect() == 1){
          _self.removeSpecAttention();
          cart.add(1);
        }else{
          _self.addSpecAttention();
          return false;
        }
      });
      //Add to Favorites
      $('.J_add_fav').on('click', function(){
        $(this).blur();
        _self.addFav($(this).data('id'));
      });
      
      $('.J_quantity_act').on('click', function(){
        $(this).blur();
        var option = $(this).data('option');
        _self.quantity(option);
      });
      $('#J_item_quantity').on('keyup ', function(){
        _self.quantity();
      });
      
      //initialization
      _self.sku_choose_size = $('.J_sku_box').size();
      _self.spc_data_info = spc_data_info;

      //Product color and size selection
      $('.J_sku_box li.J_sale_prop').not('.out-of-stock').click(function(){
        //Style control of selected specifications
        $(this).addClass('select').siblings('.J_sale_prop').removeClass('select');
        //Obtain the corresponding price and inventory quantity according to the code combination of the specifications selected by the user on the current page. Reset the price and inventory displayed on the page.
        var data_code = $(this).attr('data-code'),
            spec_selected = $('.J_spec_item li.select'),
            spec_all_code = '',
            is_second = $('#J_item_stock').attr('data-stock'),
            spec_all_args = '';

        _self.sku_selected_size = spec_selected.size();

        //Judge whether the user chooses all specifications
        if((_self.sku_choose_size > 0) && (_self.sku_selected_size == _self.sku_choose_size)){
          //Delete specification selection prompt style
          _self.removeSpecAttention();
          var i = 0;
          $.each(spec_selected, function(k, v){
            if(i == 0){
              spec_all_code = $(v).attr('data-code');
              spec_all_args = $(v).attr('args');
            }else{
              spec_all_code = spec_all_code + '-' + $(v).attr('data-code');
              spec_all_args = spec_all_args + '&' + $(v).attr('args');
            }
            i++;
          });

          var price = 0;
          var quantity = 0;
          var spec_data = new Array();

          if(_self.spc_data_info){
            var spec_data_info = $.parseJSON(_self.spc_data_info);
            if(!$.isEmptyObject(spec_data_info)){
              $.each(spec_data_info, function(k, spec){
                spec_data[spec.spc_code] = new Array();
                spec_data[spec.spc_code]['price'] = spec.price;
                spec_data[spec.spc_code]['quantity'] = spec.quantity;
              });
            }

            //Get the price and inventory quantity corresponding to the specification combination selected by the current user
            if(spec_data[spec_all_code]){
              price = spec_data[spec_all_code]['price'];
              quantity = spec_data[spec_all_code]['quantity'];
              

              //Set the price and inventory quantity displayed on the page
              $('.J_spec_price').html(price);
              $('.J_spec_quantity').html(quantity);
              $('#J_item_price').val(price);
              //Added dynamic calculation of gift card deduction
              var card_rate = $("#card_rate").html();
              var card_money = parseInt(price*card_rate/100);
              var cash_money = price-card_money;
              $("#card_money").html(card_money);
              $("#cash_money").html(cash_money);
            //The second discount is limited to 2
              if(is_second == 2){
                  quantity = 2;
              }
              $('#J_item_stock').val(quantity);
            }
          }
          
          //Control the number of purchases
          _self.quantity();
          //Determine whether the product selected by the user is still in stock
          if($('#J_item_stock').val() <= 0){
            $('.buy .btn').addClass('disabled');
            $('.J_item_add2cart').last().addClass('disabled');
            $.ui.alert('sorry', 2000);
            return false;
          }else{
            $('.buy .btn').removeClass('disabled');
            $('.J_item_add2cart').last().removeClass('disabled');
            //Hide specification selection prompt
            _self.removeSpecAttention();
          }
          
          $('#J_item_spec').val(spec_all_args);
          $('#J_item_code').val(spec_all_code);
        }
      });

      //Turn off specification selection reminder
      $('#J_skubox_close').on('click', function(){
        _self.removeSpecAttention();
      });

      //Initialize product picture slideshow
      _self.initPicSlide();

      //Show or hide floating buy button
      _self.toggleNavbar();
    },
    
    /*seckill*/
    seckill : function(seckill,nowTime){
      if(seckill){
        // var now = new Date().getTime()/1000;
          var now = nowTime;
          if(now > seckill.expire_time){
          //Expired
          return;
        }else{
          if(now < seckill.start_time){
            //Not yet started
            $('.J_seckill_time').html('To the start of the spike<br/><span class="text-danger day">00</span>day<span class="text-danger hour">00</span>hour<span class="text-danger minute">00</span>minute<span class="text-danger second">00</span>second');
            this.countDown(this.unix_to_msec(seckill.start_time), ".J_seckill_time");
            $('.J_seckill_btn').removeClass('disabled').addClass('J_item_buynow');
          }else{
            //processing
            $('.J_seckill_time').html('To the end of the spike<br/><span class="text-danger day">00</span>day<span class="text-danger hour">00</span>hour<span class="text-danger minute">00</span>minute<span class="text-danger second">00</span>second');
            this.countDown(this.unix_to_msec(seckill.expire_time), ".J_seckill_time");
            $('.J_seckill_btn').removeClass('disabled').addClass('J_item_buynow');
          }
        }
      }
    },
    /*
    * Seconds to milliseconds
    */
    unix_to_msec:function (unix) {
        return unix * 1000;
    },
    /*
     * mestamp to string
     * return 2015-10-16 15:10:32
     */
    unix_to_datetime : function(unix) {
        var now = new Date(parseInt(unix) * 1000);
        return now.toISOString().substring(0, 10) + ' ' + now.toTimeString().substring(0, 8);
    },

    /*Countdown*/
    countDown : function(time, id){
      var day_elem = $(id).find('.day');
      var hour_elem = $(id).find('.hour');
      var minute_elem = $(id).find('.minute');
      var second_elem = $(id).find('.second');
      var end_time = new Date(time).getTime(),//Month is the actual month-1
      sys_second = (end_time - new Date().getTime())/1000;
        var timer = setInterval(function(){
        if (sys_second > 1) {
          sys_second -= 1;
          var day = Math.floor((sys_second / 3600) / 24);
          var hour = Math.floor((sys_second / 3600) % 24);
          var minute = Math.floor((sys_second / 60) % 60);
          var second = Math.floor(sys_second % 60);
          day_elem && $(day_elem).text(day);//Counting days
          $(hour_elem).text(hour<10 ? "0" + hour : hour);//Counting hours
          $(minute_elem).text(minute < 10 ? "0" + minute : minute);//Counting mins
          $(second_elem).text(second < 10 ? "0" + second : second);//Counting secs
        } else { 
          clearInterval(timer);
          common.reload();
        }
      }, 1000);
    },
    
    /*Initialize product picture slideshow*/
    initPicSlide: function(){
      $('#J_item_slider').slide({
        mainCell: '.bd ul',
        prevCell: 'a.prev',
        nextCell: 'a.next'
      });
    },
    /*Determine whether to select all specifications*/
    checkSpecSelect: function(){
      var _self = this;
      return (_self.sku_selected_size < _self.sku_choose_size) ? 0 : 1;
    },
    /*Add specification selection prompt*/
    addSpecAttention: function(){
      $('#J_skubox_lists').addClass('attention');
    },
    /*Delete specification selection prompt*/
    removeSpecAttention: function(){
      $('#J_skubox_lists').removeClass('attention');
    },
    /*Show or hide floating buy button*/
    toggleNavbar: function(){
      var _body = document.body,
          tab_height = $('#J_item_navtabs').offset().top,
          fixed_navbar = $('#J_fixed_navbar');
      document.addEventListener('scroll', function(){
        if(_body.scrollTop > tab_height){
          fixed_navbar.addClass('show');
        }else{
          fixed_navbar.removeClass('show');
        }
      });
    },
    /*Add to Favorites*/
    addFav: function(id){
      if(C.UID <= 0){
        window.location.href = $.U('User/login');
        return false;
      }
      if($('#J_item_'+id).find('.icon').hasClass('icon-like-fill')){
        $.ui.error('Already favorited!');
        return false;
      }
      $.ajax({
        type: 'POST',
        url: $.U('/Fav/add'),
        data: {id: id},
        dataType: 'json',
        success: function(res){
          if(res.status == 1){
            $.ui.success(res.info);
            $('#J_item_' + id).html('<i class="icon icon-like-fill"></i> favorited');
          }else if(res.status === 0){
            $.ui.error(res.info);
          }
        }
      });
    },
    /*Delete favorites*/
    removeFav: function(id){
      $.ui.confirm('Are you sure to remove from favorites?', function(){
        $.ajax({
          type: 'POST',
          url: $.U('/Fav/remove'),
          data: {id: id},
          dataType: 'json',
          success: function(res){
            if(res.status === 1){
              $.ui.success(res.info);
              $('#J_favitem_' + id).fadeOut(500, function(){
                $(this).remove();
                if($('.J_item').size() === 0){
                  $('.J_item_list').html('<p class="list-empty">You currently have no favorites!</p>');
                }
              });
            }else if(res.status === 0){
              $.ui.error(res.info);
            }
          }
        });
      });
    },
    /*Change the quantity*/
    quantity: function(op){
      var quantity = $('#J_item_quantity').val(),
          new_quantity = 1,
          stock = parseInt($('#J_item_stock').val()),
          quota = $('.J_quota_num').size() === 1 ? parseInt($('.J_quota_num').text()) : stock;
          stock = quota < stock? quota : stock;
          
      if(typeof op === 'undefined'){
        new_quantity = quantity;
      }else{
        new_quantity = (op === 'plus') ? (parseInt(quantity) + 1) : (parseInt(quantity) - 1);
      }
      $('.minus, .plus').removeClass('disabled');
      
      new_quantity =  parseInt(new_quantity);
      if(new_quantity < 1){
        new_quantity = 1;
      }
      if(new_quantity > stock){
        new_quantity = stock;
      }
      new_quantity = isNaN(new_quantity) ? 1 : new_quantity;
      //Style processing
      if(new_quantity <= 1){
        $('.minus').addClass('disabled');
      }
      if(new_quantity >= stock){
        $('.plus').addClass('disabled');
      }
      $('#J_item_quantity').val(new_quantity);
    },
      /*Select product page*/
      selectItem: function (){
          $(document).on('click', '.Z_item_add', function (){
              var _obj = $(this),
                  itemid = _obj.data('itemid');

              $.ajax({
                  type: 'POST',
                  url: $.U('Shop/addItem'),
                  dataType: 'json',
                  data: {itemid: itemid},
                  success: function (res){
                    if(res.status == 1){
                          $.ui.success(res.info);
                        _obj.find('i').addClass('icon-jianhao').removeClass('icon-jiahao1');
                        _obj.addClass('Z_item_delete').removeClass('Z_item_add');
                        _obj.parent().addClass('button-delate');
                        _obj.find('span').html("Remove shop owner recommendation");
                      }else{
                          $.ui.error(res.info);
                      }
                  }
              });
          });
    },
    /*Distribution user login, delete distribution products*/
    deleteSpdItem: function(){
      $(document).on('click','.Z_item_delete',function(){
        var _obj = $(this),
           item_id = _obj.data('itemid');
        var doRemoveItem = function(){
          if(!item_id){
            return false;
          }else{
            $.ajax({
              type:'POST',
              url: $.U('Shop/removeItem'),
              data:{itemid:item_id},
              dataType: 'json',
              success:function(res){
                if(res.status == 1){
                    $.ui.success(res.info);
                    _obj.find('i').addClass('icon-jiahao').removeClass('icon-jianhao');
                    _obj.addClass('Z_item_add').removeClass('Z_item_delete');
                    _obj.parent().removeClass('button-delate');
                    _obj.find('span').html('Join the owners recommendation');
                }else{
                    $.ui.error(res.info);
                }
              }
            });
          }
        };
        $.ui.confirm('Are you sure to delete this product?', doRemoveItem);
      })
    }
  }

  module.exports = item;
});
