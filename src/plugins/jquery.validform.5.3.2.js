/*
    
    Validform version 5.3.1
  By sean during April 7, 2010 - February 21, 2013
  For more information, please visit http://validform.rjboy.cn
  Validform is available under the terms of the MIT license.
  
  Demo:
  $(".demoform").Validform({//$(".demoform")Indicate which form needs to be validated, and the name needs to be added on the form form;
    btnSubmit:"#btn_sub", //#btn_sub is the button to be bound to click the submit form event under the form; if the form contains a submit button, this parameter can be omitted;
    btnReset:".btn_reset",//The optional .btn_reset is the button to be bound to click the reset form event under the form;
    tiptype:1, //The optional 1=>pop box,2=>side tip(parent.next.find; with default pop),3=>side tip(siblings; with default pop),4=>side tip(siblings; none pop)，The default is 1, you can also pass in a function function to customize the display mode of the prompt information (you can achieve any effect you want, see the demo page for details);
    ignoreHidden:false,//The optional true | false The default is false, when it is true, the hidden form element will not be validated;
    dragonfly:false,//The optional true | false The default is false, when it is true, no verification is done when the value is empty;
    tipSweep:true,//The optional true | false The default is false, the detection is only triggered when the form is submitted, the blur event will not trigger the detection (real-time verification will be performed in the background, and the detection result will not be displayed);
    label:".label",//The optional selector, search for the prompt text to be displayed when nullmsg is not bound, the default is to search for the text under ".Validform_label";
    showAllError:false,//The optional true | false, true: All error messages will be displayed when the form is submitted, false: the detection of the following elements will be stopped as soon as the verification fails, and only the error information of the element will be displayed;
    postonce:true, //Optional. Whether the form can only be submitted once, true is turned on, if not filled, it will be closed by default;
    ajaxPost:true, //Use ajax to submit form data, the default is false, the submission address is the address specified by the action;
    datatype:{//Pass in a custom datatype type, which can be a regular or a function (a parameter will be passed in the function);
      "*6-20": /^[^\s]{6,20}$/,
      "z2-4": /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
      "username":function(gets,obj,curform,regxp){
        //The parameter gets is the obtained form element value, obj is the current form element, curform is the currently validated form, and regxp is a reference to some built-in regular expressions;
        var reg1=/^[\w\.]{4,16}$/,
          reg2=/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,8}$/;
          
        if(reg1.test(gets)){return true;}
        if(reg2.test(gets)){return true;}
        return false;
        
        /Note that return can return true or false or a string literal, true means verification passed, return string means verification failed, string will be displayed as an error prompt, return false will use errmsg or the default error prompt;
      },
      "phone":function(){
        // After version 5.0, to achieve the verification effect of choosing one of the two, the name of the datatype does not need to start with "option_";
      }
    },
    usePlugin:{
      swfupload:{},
      datepicker:{},
      passwordstrength:{},
      jqtransform:{
        selector:"select,input"
      }
    },
    beforeCheck:function(curform){
      //The function executed before the form is submitted and validated. The curform parameter is the current form object.
      //If it is clear that return false here, the verification operation will not continue;
    },
    beforeSubmit:function(curform){
      //After the verification is successful, the function executed before the form is submitted, the curform parameter is the current form object.
      //If it is clear here that return false, the form will not be submitted;
    },
    callback:function(data){
      //The returned data data is in json format, {"info":"demo info","status":"y"}
      //info: output prompt information;
      //status: Returns the status of the submitted data, whether the submission is successful. For example, you can use "y" to indicate a successful submission, and "n" to indicate a failed submission. The custom character in the returned data in the ajax_post.php file is mainly used in the callback function to perform the corresponding callback operation according to the value;
      //You can also return more information in the ajax_post.php file to get it here and perform corresponding operations;
      //Ajax will also execute a callback when it encounters a server-side error. At this time, the data is {status:**, statusText:**, readyState:**, responseText:** };
      
      //Perform the callback operation here;
      //Note: If the form is not submitted in ajax mode, pass in the callback, then the data parameter is the current form object, the callback function will be executed after the form verification is all passed, and then judge whether to submit the form, if the callback clearly returns false, then the form Will not submit, if return true or no return, the form will be submitted.
    }
  });
  
  Methods and properties of the Validform object:
  tipmsg: Customize the prompt message, by modifying this attribute value of the Validform object to allow different forms on the same page to use different prompt text;
  dataType: Get some built-in regularities;
  eq(n): Get the nth element of the Validform object;
  ajaxPost(flag,sync,url): Submit the form in ajax mode. When flag is true, skip verification and submit directly. When sync is true, ajax submission will be performed synchronously. When the url address is passed in, the form will be submitted to this address;
  abort(): Terminate the submission of ajax;
  submitForm(flag,url): Submit the form by the method set in the parameters. When the flag is true, skip the verification and submit directly. When the url address is passed in, the form will be submitted to this address;
  resetForm(): reset the form;
  resetStatus(): Reset the submission status of the form. If the postonce parameter is passed in, the status will be set to "posted" after the form is successfully submitted, and resetting the submission status will allow the form to continue to be submitted;
  getStatus(): Get the submission status of the form, normal: not submitted, posting: submitting, posted: submitted successfully;
  setStatus(status): Set the submission status of the form. You can set the normal, posting, and posted three statuses. If no parameters are passed, the status will be set to posting. This status form can be verified but cannot be submitted;
  ignore(selector): Ignore the verification of the selected object;
  unignore(selector): regain the verification effect of the object that is ignored by the ignore method;
  addRule(rule): This method of the Validform object can be used to bind validation rules to form elements;
  check(bool, selector): Validate the specified object (validate the current entire form by default), by returning true, otherwise it will return false (bind to the object for real-time validation, return true when the format meets the requirements, and will not wait for the return result of ajax ), when bool is true, only verify and not display prompt information;
  config(setup): This method can be used to specify the submission address of the form, and set parameters in the form ajax and real-time verification ajax;
*/

(function(factory){
  if (typeof define === 'function') {
    // If define has been defined, modular code
    define('jquery.validform',['jquery'], function(require, exports, moudles){
      factory(require('jquery')); // Initialize the plugin
      return jQuery; // Return to jQuery
    });
  }else{
    // If define is not defined, execute jQuery normally
    factory(jQuery);
  }
}(function($,win,undef){
  var errorobj=null,//Indicates the form element that currently fails validation  ;
    msgobj=null,//pop box object 
    msghidden=true;//msgbox hidden?

  var tipmsg={//Default prompt text;
    tit: "Prompt Information",
    w:{
      "*":"Can not be empty!",
      "*6-16": "Please fill in any characters from 6 to 16 characters!",
      "n":"Please fill in the number!",
      "n6-16":"Please fill in 6-16 digits!",
      "s": "Cannot enter special characters!",
      "s6-18":"Please fill in 6 to 18 characters!",
      "p":"Please fill in the postal code!",
      "m":"Please fill in your mobile phone number!",
      "e": "The email address format is wrong!",
      "url":"Please fill in the URL!"
    },
    def: "Please fill in the correct information!",
    undef: "datatype is not defined!",
    reck: "The contents of the two input are not consistent!",
    r:"",
    c: "Detecting information...",
    s: "Please {fill in|select}{0|information}!",
    v: "The information you filled in has not been verified, please wait...",
    p: "Submitting data..."
  }
  $.Tipmsg=tipmsg;
  
  var Validform=function(forms,settings,inited){
    var settings=$.extend({},Validform.defaults,settings);
    settings.datatype && $.extend(Validform.util.dataType,settings.datatype);
    
    var brothers=this;
    brothers.tipmsg={w:{}};
    brothers.settings=settings;
    brothers.forms=forms;
    brothers.objects=[];
    
    //No longer bind events when creating child objects;
    if(inited===true){
      return false;
    }
    
    forms.each(function(){
      //Skip when the event has been bound to avoid repeated binding of the event;
      if(this.validform_inited=="inited"){return true;}
      this.validform_inited="inited";
      
      var $this=$(this);
      
      //Prevent the form button from double-clicking and submitting twice;
      this.validform_status="normal"; //normal | posting | posted;
      
      //label, find the prompt text to be displayed when there is no input;
      this.validform_label=settings.label;
      
      //Let each Validform object be able to customize tipmsg;  
      $this.data("tipmsg",brothers.tipmsg);

      //bind the blur event;
      $this.delegate("[datatype]","blur",function(){
      //Determine whether it is a verification request triggered when the form is submitted;
        var subpost=arguments[1];
        Validform.util.check.call(this,$this,brothers,subpost);
      });
      
      //Click the form element, the default text disappears effect;
      //Enhanced information prompt when comparing form element values;
      //Radio, checkbox prompt information enhancement;
      //External adjustment plugin initialization;
      Validform.util.enhance.call($this,settings.tiptype,settings.usePlugin,settings.tipSweep);
      
      settings.btnSubmit && $this.find(settings.btnSubmit).bind("click",function(){
        $this.trigger("submit");
        return false;
      });
            
      $this.submit(function(){
        var subflag=Validform.util.submitForm.call($this,settings);
        subflag === undef && (subflag=true);
        return subflag;
      });
      
      $this.find("[type='reset']").add($this.find(settings.btnReset)).bind("click",function(){
        Validform.util.resetForm.call($this);
      });
      
    });
    
    //Pre-create pop box;
    if( settings.tiptype==1 || (settings.tiptype==2 || settings.tiptype==3) && settings.ajaxPost ){   
      creatMsgbox();
    }
  }
  
  // Initial configuration
  Validform.defaults={
    tiptype:3,
    tipSweep:false,
    showAllError:true,
    postonce:false,
    ajaxPost:false
  }
  
  Validform.util={
    dataType:{
      "*":/[\w\W]+/,
      "*6-16":/^[\w\W]{6,16}$/,
      "n":/^\d+$/,
      "n6-16":/^\d{6,16}$/,
      "s":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
      "s6-18":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
      "p":/^[0-9]{6}$/,
      "m":/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/,
      "e":/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      "url":/^(\w+:\/\/)?\w+(\.\w+)+.*$/
    },
    
    toString:Object.prototype.toString,
    
    isEmpty:function(val){
      return val==="" || val===$.trim(this.attr("tip"));
    },
    
    getValue:function(obj){
      var inputval,
        curform=this;
        
      if(obj.is(":radio")){
        inputval=curform.find(":radio[name='"+obj.attr("name")+"']:checked").val();
        inputval= inputval===undef ? "" : inputval;
      }else if(obj.is(":checkbox")){
        inputval="";
        curform.find(":checkbox[name='"+obj.attr("name")+"']:checked").each(function(){ 
          inputval +=$(this).val()+','; 
        })
        inputval= inputval===undef ? "" : inputval;
      }else{
        inputval=obj.val();
      }
      inputval=$.trim(inputval);
      
      return Validform.util.isEmpty.call(obj,inputval) ? "" : inputval;
    },
    
    enhance:function(tiptype,usePlugin,tipSweep,addRule){
      var curform=this;
      
      //When there is no prompt information label on the page, it will be created automatically;
      curform.find("[datatype]").each(function(){
        if(tiptype==2){
          if($(this).parent().next().find(".validform-checktip").length==0){
            $(this).parent().next().append("<div class='validform-checktip' />");
          }
        }else if(tiptype==3 || tiptype==4){
          if($(this).siblings(".validform-checktip").length==0){
            $(this).parent().append("<div class='validform-checktip' />");
          }
        }
      });

      //Enhanced information prompt when comparing form element values;
      curform.find("input[recheck]").each(function(){
        //Skip when the event has been bound;
        if(this.validform_inited=="inited"){return true;}
        this.validform_inited="inited";
        
        var _this=$(this);
        var recheckinput=curform.find("input[name='"+$(this).attr("recheck")+"']");
        recheckinput.bind("keyup",function(){
          if(recheckinput.val()==_this.val() && recheckinput.val() != ""){
            if(recheckinput.attr("tip")){
              if(recheckinput.attr("tip") == recheckinput.val()){return false;}
            }
            _this.trigger("blur");
          }
        }).bind("blur",function(){
          if(recheckinput.val()!=_this.val() && _this.val()!=""){
            if(_this.attr("tip")){
              if(_this.attr("tip") == _this.val()){return false;} 
            }
            _this.trigger("blur");
          }
        });
      });
      
      //hasDefaultText;
      curform.find("[tip]").each(function(){//tip is the default prompt information of the form element, which is the effect of clicking to clear;
        //Skip when the event has been bound;
        if(this.validform_inited=="inited"){return true;}
        this.validform_inited="inited";
        
        var defaultvalue=$(this).attr("tip");
        var altercss=$(this).attr("altercss");
        $(this).focus(function(){
          if($(this).val()==defaultvalue){
            $(this).val('');
            if(altercss){$(this).removeClass(altercss);}
          }
        }).blur(function(){
          if($.trim($(this).val())===''){
            $(this).val(defaultvalue);
            if(altercss){$(this).addClass(altercss);}
          }
        });
      });
      
      //enhance info feedback for checkbox & radio;
      curform.find(":checkbox[datatype],:radio[datatype]").each(function(){
        //Skip when the event has been bound;
        if(this.validform_inited=="inited"){return true;}
        this.validform_inited="inited";
        
        var _this=$(this);
        var name=_this.attr("name");
        curform.find("[name='"+name+"']").filter(":checkbox,:radio").bind("click",function(){
          //Avoid the value lag problem when multiple events are bound;
          setTimeout(function(){
            _this.trigger("blur");
          },0);
        });
        
      });
      
      //select multiple;
      curform.find("select[datatype][multiple]").bind("click",function(){
        var _this=$(this);
        setTimeout(function(){
          _this.trigger("blur");
        },0);
      });
      
      //plugins here to start;
      Validform.util.usePlugin.call(curform,usePlugin,tiptype,tipSweep,addRule);
    },
    
    usePlugin:function(plugin,tiptype,tipSweep,addRule){
      /*
        plugin:settings.usePlugin;
        tiptype:settings.tiptype;
        tipSweep:settings.tipSweep;
        addRule: Whether to trigger when addRule;
      */
      
      var curform=this,
        plugin=plugin || {};
      //swfupload;
      if(curform.find("input[plugin='swfupload']").length && typeof(swfuploadhandler) != "undefined"){
        
        var custom={
            custom_settings:{
              form:curform,
              showmsg:function(msg,type,obj){
                Validform.util.showmsg.call(curform,msg,tiptype,{obj:curform.find("input[plugin='swfupload']"),type:type,sweep:tipSweep});  
              } 
            } 
          };

        custom=$.extend(true,{},plugin.swfupload,custom);
        
        curform.find("input[plugin='swfupload']").each(function(n){
          if(this.validform_inited=="inited"){return true;}
          this.validform_inited="inited";
          
          $(this).val("");
          swfuploadhandler.init(custom,n);
        });
        
      }
      
      //datepicker;
      if(curform.find("input[plugin='datepicker']").length && $.fn.datePicker){
        plugin.datepicker=plugin.datepicker || {};
        
        if(plugin.datepicker.format){
          Date.format=plugin.datepicker.format; 
          delete plugin.datepicker.format;
        }
        if(plugin.datepicker.firstDayOfWeek){
          Date.firstDayOfWeek=plugin.datepicker.firstDayOfWeek; 
          delete plugin.datepicker.firstDayOfWeek;
        }

        curform.find("input[plugin='datepicker']").each(function(n){
          if(this.validform_inited=="inited"){return true;}
          this.validform_inited="inited";
          
          plugin.datepicker.callback && $(this).bind("dateSelected",function(){
            var d=new Date( $.event._dpCache[this._dpId].getSelected()[0] ).asString(Date.format);
            plugin.datepicker.callback(d,this);
          });
          $(this).datePicker(plugin.datepicker);
        });
      }
      
      //passwordstrength;
      if(curform.find("input[plugin*='passwordStrength']").length && $.fn.passwordStrength){
        plugin.passwordstrength=plugin.passwordstrength || {};
        plugin.passwordstrength.showmsg=function(obj,msg,type){
          Validform.util.showmsg.call(curform,msg,tiptype,{obj:obj,type:type,sweep:tipSweep});
        };
        
        curform.find("input[plugin='passwordStrength']").each(function(n){
          if(this.validform_inited=="inited"){return true;}
          this.validform_inited="inited";
          
          $(this).passwordStrength(plugin.passwordstrength);
        });
      }
      
      //jqtransform;
      if(addRule!="addRule" && plugin.jqtransform && $.fn.jqTransSelect){
        var jqTransformHideSelect = function(oTarget){
          var ulVisible = $('.jqTransformSelectWrapper ul:visible');
          ulVisible.each(function(){
            var oSelect = $(this).parents(".jqTransformSelectWrapper:first").find("select").get(0);
            //do not hide if click on the label object associated to the select
            if( !(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0)) ){$(this).hide();}
          });
        };
        
        /* Check for an external click */
        var jqTransformCheckExternalClick = function(event) {
          if ($(event.target).parents('.jqTransformSelectWrapper').length === 0) { jqTransformHideSelect($(event.target)); }
        };
        
        var jqTransformAddDocumentListener = function (){
          $(document).mousedown(jqTransformCheckExternalClick);
        };
        
        if(plugin.jqtransform.selector){
          curform.find(plugin.jqtransform.selector).filter('input:submit, input:reset, input[type="button"]').jqTransInputButton();
          curform.find(plugin.jqtransform.selector).filter('input:text, input:password').jqTransInputText();      
          curform.find(plugin.jqtransform.selector).filter('input:checkbox').jqTransCheckBox();
          curform.find(plugin.jqtransform.selector).filter('input:radio').jqTransRadio();
          curform.find(plugin.jqtransform.selector).filter('textarea').jqTransTextarea();
          if(curform.find(plugin.jqtransform.selector).filter("select").length > 0 ){
             curform.find(plugin.jqtransform.selector).filter("select").jqTransSelect();
             jqTransformAddDocumentListener();
          }
          
        }else{
          curform.jqTransform();
        }
        
        curform.find(".jqTransformSelectWrapper").find("li a").click(function(){
          $(this).parents(".jqTransformSelectWrapper").find("select").trigger("blur");  
        });
      }

    },
    
    getNullmsg:function(curform){
      var obj=this;
      var reg=/[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z\s]+/g;
      var nullmsg;
      
      var label=curform[0].validform_label || ".Validform_label";
      label=obj.siblings(label).text() || obj.siblings().find(label).text() || obj.parent().siblings(label).text() ||  obj.parent().siblings().find(label).text();
      label=label.match(reg) || [""];
      
      reg=/\{(.+)\|(.+)\}/;
      nullmsg=curform.data("tipmsg").s || tipmsg.s;
      label=label[0].replace(/\s(?![a-zA-Z])/g,"");
      
      if(label != ""){
        nullmsg=nullmsg.replace(/\{0\|(.+)\}/,label);
        if(obj.attr("recheck")){
          nullmsg=nullmsg.replace(/\{(.+)\}/,"");
          obj.attr("nullmsg",nullmsg);
          return nullmsg;
        }
      }else{
        nullmsg=obj.is(":checkbox,:radio,select") ? nullmsg.replace(/\{0\|(.+)\}/,"") : nullmsg.replace(/\{0\|(.+)\}/,"$1");
      }
      nullmsg=obj.is(":checkbox,:radio,select") ? nullmsg.replace(reg,"$2") : nullmsg.replace(reg,"$1");
      
      obj.attr("nullmsg",nullmsg);
      return nullmsg;
    },
    
    getErrormsg:function(curform,datatype,recheck){
      var obj=this;
      var regxp=/^(.+?)((\d+)-(\d+))?$/,
        regxp2=/^(.+?)(\d+)-(\d+)$/,
        regxp3=/(.*?)\d+(.+?)\d+(.*)/,
        mac=datatype.match(regxp),
        temp,str;
      
      //If the value is different, an error will be reported;
      if(recheck=="recheck"){
        str=curform.data("tipmsg").reck || tipmsg.reck;
        return str;
      }
      
      //If there is, directly display the prompt information of the item;
      if(mac[0] in tipmsg.w){
        return curform.data("tipmsg").w[mac[0]] || tipmsg.w[mac[0]];
      }
      
      //If not, look for similarity in the prompt object;
      for(var name in tipmsg.w){
        if(name.indexOf(mac[1])!=-1 && regxp2.test(name)){
          str=(curform.data("tipmsg").w[name] || tipmsg.w[name]).replace(regxp3,"$1"+mac[3]+"$2"+mac[4]+"$3");
          tipmsg.w[mac[0]]=str;
          
          return str;
        }
        
      }
      
      return curform.data("tipmsg").def || tipmsg.def;
    },

    _regcheck:function(datatype,gets,obj,curform){
      var curform=curform,
        info=null,
        passed=false,
        reg=/\/.+\//g,
        regex=/^(.+?)(\d+)-(\d+)$/,
        type=3;//default set to wrong type, 2,3,4;
        
      //datatype has three cases: regular, function and directly bound regular;
      
      //Directly regular;
      if(reg.test(datatype)){
        var regstr=datatype.match(reg)[0].slice(1,-1);
        var param=datatype.replace(reg,"");
        var rexp=RegExp(regstr,param);

        passed=rexp.test(gets);

      //function;
      }else if(Validform.util.toString.call(Validform.util.dataType[datatype])=="[object Function]"){
        passed=Validform.util.dataType[datatype](gets,obj,curform,Validform.util.dataType);
        if(passed === true || passed===undef){
          passed = true;
        }else{
          info= passed;
          passed=false;
        }
      
      //Custom regular;  
      }else{
        //Automatically expand datatype;
        if(!(datatype in Validform.util.dataType)){
          var mac=datatype.match(regex),
            temp;
            
          if(!mac){
            passed=false;
            info=curform.data("tipmsg").undef||tipmsg.undef;
          }else{
            for(var name in Validform.util.dataType){
              temp=name.match(regex);
              if(!temp){continue;}
              if(mac[1]===temp[1]){
                var str=Validform.util.dataType[name].toString(),
                  param=str.match(/\/[mgi]*/g)[1].replace("\/",""),
                  regxp=new RegExp("\\{"+temp[2]+","+temp[3]+"\\}","g");
                str=str.replace(/\/[mgi]*/g,"\/").replace(regxp,"{"+mac[2]+","+mac[3]+"}").replace(/^\//,"").replace(/\/$/,"");
                Validform.util.dataType[datatype]=new RegExp(str,param);
                break;
              } 
            }
          }
        }
        
        if(Validform.util.toString.call(Validform.util.dataType[datatype])=="[object RegExp]"){
          passed=Validform.util.dataType[datatype].test(gets);
        }
          
      }
      
      
      if(passed){
        type=2;
        info=obj.attr("sucmsg") || curform.data("tipmsg").r||tipmsg.r;
        
        //After the rule is verified, the value of the object bound to recheck needs to be compared;
        if(obj.attr("recheck")){
          var theother=curform.find("input[name='"+obj.attr("recheck")+"']:first");
          if(gets!=theother.val()){
            passed=false;
            type=3;
            info=obj.attr("errormsg")  || Validform.util.getErrormsg.call(obj,curform,datatype,"recheck");
          }
        }
      }else{
        info=info || obj.attr("errormsg") || Validform.util.getErrormsg.call(obj,curform,datatype);
        
        //When the verification fails and is empty;
        if(Validform.util.isEmpty.call(obj,gets)){
          info=obj.attr("nullmsg") || Validform.util.getNullmsg.call(obj,curform);
        }
      }
      
      return{
          passed:passed,
          type:type,
          info:info
      };
      
    },
    
    regcheck:function(datatype,gets,obj){
      /*
        datatype:datatype;
        gets:inputvalue;
        obj:input object;
      */
      var curform=this,
        info=null,
        passed=false,
        type=3;//default set to wrong type, 2,3,4;
        
      //ignore;
      if(obj.attr("ignore")==="ignore" && Validform.util.isEmpty.call(obj,gets)){       
        if(obj.data("cked")){
          info="";  
        }
        
        return {
          passed:true,
          type:4,
          info:info
        };
      }

      obj.data("cked","cked");//do nothing if is the first time validation triggered;
      
      var dtype=Validform.util.parseDatatype(datatype);
      var res;
      for(var eithor=0; eithor<dtype.length; eithor++){
        for(var dtp=0; dtp<dtype[eithor].length; dtp++){
          res=Validform.util._regcheck(dtype[eithor][dtp],gets,obj,curform);
          if(!res.passed){
            break;
          }
        }
        if(res.passed){
          break;
        }
      }
      return res;
      
    },
    
    parseDatatype:function(datatype){
      /*
        The string can only contain one regular expression;
        The Datatype name must be composed of letters, numbers, underscores or *;
        datatype="/regexp/|phone|tel,s,e|f,e";
        ==>[["/regexp/"],["phone"],["tel","s","e"],["f","e"]];
      */

      var reg=/\/.+?\/[mgi]*(?=(,|$|\||\s))|[\w\*-]+/g,
        dtype=datatype.match(reg),
        sepor=datatype.replace(reg,"").replace(/\s*/g,"").split(""),
        arr=[],
        m=0;
        
      arr[0]=[];
      arr[0].push(dtype[0]);
      for(var n=0;n<sepor.length;n++){
        if(sepor[n]=="|"){
          m++;
          arr[m]=[];
        }
        arr[m].push(dtype[n+1]);
      }
      
      return arr;
    },

    showmsg:function(msg,type,o,triggered){
      /*
        msg: prompt text;
        type: How to display the prompt information;
        o: (obj: current object, type:1=>detecting | 2=>pass, sweep:true | false),
        triggered: In the verification triggered by blur or form submission, there are some situations where you don't need to display the prompt text, such as customizing the display method of the pop-up prompt box, you don't need to pop up the prompt immediately every time you blur;
        
        Tiptype: 1\2\3 when there is a hole, a custom prompt box will pop up
        tiptype: 1 does not pop up when triggered bycheck
        tiptype: 2\3 pops up when in ajax
        When tipSweep is true, showmsg will not be triggered when triggered bycheck, but it should be prompted when ajax error occurs
      */

      //If msg is undefined, then there is no need to perform the following operations, ignore this may happen;
      if(msg==undef){return;}
      
      //When tipSweep is true and it is not currently in an error state, the blur event does not trigger the information display;
      if(triggered=="bycheck" && o.sweep && (o.obj && !o.obj.is(".validform-error") || typeof type == "function")){return;}

      $.extend(o,{curform:this});
        
      if(typeof type == "function"){
        type(msg,o,Validform.util.cssctl);
        return;
      }
      
      if(type==1 || triggered=="byajax" && type!=4){
        msgobj.find(".Validform_info").html(msg);
      }
      
      //tiptypt=1, blur triggers showmsg, and the box does not pop up if the verification is passed. If the form is submitted, the box will pop up as long as there is an error in the verification;
      if(type==1 && triggered!="bycheck" && o.type!=2 || triggered=="byajax" && type!=4){
        msghidden=false;
        msgobj.find(".iframe").css("height",msgobj.outerHeight());
        msgobj.show();
        setCenter(msgobj,100);
      }

      if(type==2 && o.obj){
        o.obj.parent().next().find(".validform-checktip").html('<span>'+ msg +'</span>');
        Validform.util.cssctl(o.obj.parent().next().find(".validform-checktip"),o.type);
      }
      
      if((type==3 || type==4) && o.obj){
        o.obj.siblings(".validform-checktip").html('<span>'+ msg +'</span>');
        Validform.util.cssctl(o.obj.siblings(".validform-checktip"),o.type);
      }

    },

    cssctl:function(obj,status){
      switch(status){
        case 1:
          obj.removeClass("validform-right validform-wrong").addClass("validform-checktip validform-loading");//checking;
          break;
        case 2:
          obj.removeClass("validform-wrong validform-loading").addClass("validform-checktip validform-right");//passed;
          break;
        case 4:
          obj.removeClass("validform-right validform-wrong validform-loading").addClass("validform-checktip");//for ignore;
          break;
        default:
          obj.removeClass("validform-right validform-loading").addClass("validform-checktip validform-wrong");//wrong;
      }
    },
    
    check:function(curform,brothers,subpost,bool){
      /*
        Detect a single form element;
        If the verification is passed, it returns true, otherwise it returns false, and the real-time verification return value is ajax;
        bool, if true is passed in, only the detection will not display the prompt information;
      */
      var settings=brothers.settings;
      var subpost=subpost || "";
      var inputval=Validform.util.getValue.call(curform,$(this));
      
      //The form object that hides or binds dataIgnore is not validated;
      if(settings.ignoreHidden && $(this).is(":hidden") || $(this).data("dataIgnore")==="dataIgnore"){
        return true;
      }
      
      //When dragonfly=true, ignore is not bound, and the value is empty without verification, but the verification fails;
      if(settings.dragonfly && !$(this).data("cked") && Validform.util.isEmpty.call($(this),inputval) && $(this).attr("ignore")!="ignore"){
        return false;
      }
      
      var flag=Validform.util.regcheck.call(curform,$(this).attr("datatype"),inputval,$(this));
      
      //If the value has not changed, no detection will be performed. At this time, consider the recheck situation;
      //Not ajax validation triggered when the form is submitted;
      if(inputval==this.validform_lastval && !$(this).attr("recheck") && subpost==""){
        return flag.passed ? true : false;
      }

      this.validform_lastval=inputval;//Store the current value;
      
      var _this;
      errorobj=_this=$(this);
      
      if(!flag.passed){
        //Cancel the ongoing ajax verification;
        Validform.util.abort.call(_this[0]);
        
        if(!bool){
          //Pass in "bycheck" to indicate that it is currently called in the check method. When tiptype=1, the blur event will not trigger the display of the error message;
          Validform.util.showmsg.call(curform,flag.info,settings.tiptype,{obj:$(this),type:flag.type,sweep:settings.tipSweep},"bycheck");
          
          !settings.tipSweep && _this.addClass("validform-error");
        }
        return false;
      }
      
      //If the verification is passed, if there is ajaxurl bound, ajax detection must be performed;
      //When ignore="ignore", the null value can pass the verification, then no ajax detection is required;
      var ajaxurl=$(this).attr("ajaxurl");
      if(ajaxurl && !Validform.util.isEmpty.call($(this),inputval) && !bool){
        var inputobj=$(this);

        //When the form is submitted, an item in the form is already performing ajax detection, then you need to let the item continue to submit the form after the ajax ends;
        if(subpost=="postform"){
          inputobj[0].validform_subpost="postform";
        }else{
          inputobj[0].validform_subpost="";
        }
        
        if(inputobj[0].validform_valid==="posting" && inputval==inputobj[0].validform_ckvalue){return "ajax";}
        
        inputobj[0].validform_valid="posting";
        inputobj[0].validform_ckvalue=inputval;
        Validform.util.showmsg.call(curform,brothers.tipmsg.c||tipmsg.c,settings.tiptype,{obj:inputobj,type:1,sweep:settings.tipSweep},"bycheck");
        
        Validform.util.abort.call(_this[0]);
        
        var ajaxsetup=curform[0].validform_config || {};
        ajaxsetup=ajaxsetup.ajaxurl || {};
                
        var localconfig={
          type: "POST",
          cache:false,
          url: ajaxurl,
          data: "param="+encodeURIComponent(inputval)+"&name="+encodeURIComponent($(this).attr("name")),
          success: function(data){
            if($.trim(data.status)==="y"){
              inputobj[0].validform_valid="true";
              data.info && inputobj.attr("sucmsg",data.info);
              Validform.util.showmsg.call(curform,inputobj.attr("sucmsg") || brothers.tipmsg.r||tipmsg.r,settings.tiptype,{obj:inputobj,type:2,sweep:settings.tipSweep},"bycheck");
              _this.removeClass("validform-error");
              errorobj=null;
              if(inputobj[0].validform_subpost=="postform"){
                curform.trigger("submit");
              }
            }else{
              inputobj[0].validform_valid=data.info;
              Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:inputobj,type:3,sweep:settings.tipSweep});
              _this.addClass("validform-error");
            }
            _this[0].validform_ajax=null;
          },
          error: function(data){
            if(data.status=="200"){
              if(data.responseText=="y"){
                ajaxsetup.success({"status":"y"});
              }else{
                ajaxsetup.success({"status":"n","info":data.responseText}); 
              }
              return false;
            }
            
            //When the detection is in progress, the data to be detected changes, and the current ajax should be terminated at this time. If the ajax error is not caused by this situation, then display the relevant error message;
            if(data.statusText!=="abort"){
              var msg="status: "+data.status+"; statusText: "+data.statusText;
            
              Validform.util.showmsg.call(curform,msg,settings.tiptype,{obj:inputobj,type:3,sweep:settings.tipSweep});
              _this.addClass("validform-error");
            }
            
            inputobj[0].validform_valid=data.statusText;
            _this[0].validform_ajax=null;
            
            //localconfig.error returns true to indicate that temp_err needs to be executed;
            return true;
          }
        }
        
        if(ajaxsetup.success){
          var temp_suc=ajaxsetup.success;
          ajaxsetup.success=function(data){
            localconfig.success(data);
            temp_suc(data,inputobj);
          }
        }
        
        if(ajaxsetup.error){
          var temp_err=ajaxsetup.error;
          ajaxsetup.error=function(data){
            //localconfig.error returns false to indicate that temp_err does not need to be executed;
            localconfig.error(data) && temp_err(data,inputobj);
          } 
        }

        ajaxsetup=$.extend({},localconfig,ajaxsetup,{dataType:"json"});
        _this[0].validform_ajax=$.ajax(ajaxsetup);
        
        return "ajax";
      }else if(ajaxurl && Validform.util.isEmpty.call($(this),inputval)){
        Validform.util.abort.call(_this[0]);
        _this[0].validform_valid="true";
      }
      
      if(!bool){
        Validform.util.showmsg.call(curform,flag.info,settings.tiptype,{obj:$(this),type:flag.type,sweep:settings.tipSweep},"bycheck");
        _this.removeClass("validform-error");
      }
      errorobj=null;
      
      return true;
    
    },
    
    submitForm:function(settings,flg,url,ajaxPost,sync){
      /*
        If flg===true, skip verification and submit directly;
        ajaxPost==="ajaxPost" indicates that the current form is submitted by ajax;
      */
      var curform=this;
      
      //When the form is being submitted, clicking the submit button does not respond;
      if(curform[0].validform_status==="posting"){return false;}
      
      //When the request can only be submitted once;
      if(settings.postonce && curform[0].validform_status==="posted"){return false;}
      
      var beforeCheck=settings.beforeCheck && settings.beforeCheck(curform);
      if(beforeCheck===false){return false;}
      
      var flag=true,
        inflag;
        
      curform.find("[datatype]").each(function(){
        //Skip verification;
        if(flg){
          return false;
        }
        
        //The form object that hides or binds dataIgnore is not validated;
        if(settings.ignoreHidden && $(this).is(":hidden") || $(this).data("dataIgnore")==="dataIgnore"){
          return true;
        }
        
        var inputval=Validform.util.getValue.call(curform,$(this)),
          _this;
        errorobj=_this=$(this);
        
        inflag=Validform.util.regcheck.call(curform,$(this).attr("datatype"),inputval,$(this));
        
        if(!inflag.passed){
          Validform.util.showmsg.call(curform,inflag.info,settings.tiptype,{obj:$(this),type:inflag.type,sweep:settings.tipSweep});
          _this.addClass("validform-error");
          
          if(!settings.showAllError){
            _this.focus();
            flag=false;
            return false;
          }
          
          flag && (flag=false);
          return true;
        }
        
        //When ignore="ignore", the null value can be verified, and no ajax detection is required at this time;
        if($(this).attr("ajaxurl") && !Validform.util.isEmpty.call($(this),inputval)){
          if(this.validform_valid!=="true"){
            var thisobj=$(this);
            Validform.util.showmsg.call(curform,curform.data("tipmsg").v||tipmsg.v,settings.tiptype,{obj:thisobj,type:3,sweep:settings.tipSweep});
            _this.addClass("validform-error");
            
            thisobj.trigger("blur",["postform"]);//continue the form post;
            
            if(!settings.showAllError){
              flag=false;
              return false;
            }
            
            flag && (flag=false);
            return true;
          }
        }else if($(this).attr("ajaxurl") && Validform.util.isEmpty.call($(this),inputval)){
          Validform.util.abort.call(this);
          this.validform_valid="true";
        }

        Validform.util.showmsg.call(curform,inflag.info,settings.tiptype,{obj:$(this),type:inflag.type,sweep:settings.tipSweep});
        _this.removeClass("validform-error");
        errorobj=null;
      });
      
      if(settings.showAllError){
        curform.find(".validform-error:first").focus();
      }

      if(flag){
        var beforeSubmit=settings.beforeSubmit && settings.beforeSubmit(curform);
        if(beforeSubmit===false){return false;}
        
        curform[0].validform_status="posting";
        
        var config=curform[0].validform_config || {}
        
        if(settings.ajaxPost || ajaxPost==="ajaxPost"){
          //Get configuration parameters;
          var ajaxsetup=config.ajaxpost || {};
          //It may be necessary to dynamically change the submission address, so set the URL level specified by the action to the lowest level;
          ajaxsetup.url=url || ajaxsetup.url || config.url || curform.attr("action");
          
          //byajax: when ajax, tiptye is 1, 2 or 3, a prompt box needs to be popped up;
          //If the success or error method has been customized in setup, no prompt message will be displayed here;
          ajaxsetup.success || ajaxsetup.error || Validform.util.showmsg.call(curform,curform.data("tipmsg").p||tipmsg.p,settings.tiptype,{obj:curform,type:1,sweep:settings.tipSweep},"byajax");

          //The priority in the method is higher;
          //There is undefined situation;
          if(sync){
            ajaxsetup.async=false;
          }else if(sync===false){
            ajaxsetup.async=true;
          }
          
          if(ajaxsetup.success){
            var temp_suc=ajaxsetup.success;
            ajaxsetup.success=function(data){
              settings.callback && settings.callback(data);
              curform[0].validform_ajax=null;
              if($.trim(data.status)==="y"){
                curform[0].validform_status="posted";
              }else{
                curform[0].validform_status="normal";
              }
              
              temp_suc(data,curform);
            }
          }
          
          if(ajaxsetup.error){
            var temp_err=ajaxsetup.error;
            ajaxsetup.error=function(data){
              settings.callback && settings.callback(data);
              curform[0].validform_status="normal";
              curform[0].validform_ajax=null;
              
              temp_err(data,curform);
            } 
          }
          
          var localconfig={
            type: "POST",
            async:true,
            data: curform.serializeArray(),
            success: function(data){
              if($.trim(data.status)==="y"){
                //Successfully submitted;
                curform[0].validform_status="posted";
                Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:curform,type:2,sweep:settings.tipSweep},"byajax");
              }else{
                //Submit error;
                curform[0].validform_status="normal";
                Validform.util.showmsg.call(curform,data.info,settings.tiptype,{obj:curform,type:3,sweep:settings.tipSweep},"byajax");
              }
              
              settings.callback && settings.callback(data);
              curform[0].validform_ajax=null;
            },
            error: function(data){
              var msg="status: "+data.status+"; statusText: "+data.statusText;
                  
              Validform.util.showmsg.call(curform,msg,settings.tiptype,{obj:curform,type:3,sweep:settings.tipSweep},"byajax");
              
              settings.callback && settings.callback(data);
              curform[0].validform_status="normal";
              curform[0].validform_ajax=null;
            }
          }
          
          ajaxsetup=$.extend({},localconfig,ajaxsetup,{dataType:"json"});
          
          curform[0].validform_ajax=$.ajax(ajaxsetup);

        }else{
          if(!settings.postonce){
            curform[0].validform_status="normal";
          }
          
          var url=url || config.url;
          if(url){
            curform.attr("action",url);
          }
          
          return settings.callback && settings.callback(curform);
        }
      }
      
      return false;
      
    },
    
    resetForm:function(){
      var brothers=this;
      brothers.each(function(){
        this.reset();
        this.validform_status="normal";
      });
      
      brothers.find(".validform-right").text("");
      brothers.find(".passwordStrength").children().removeClass("bgStrength");
      brothers.find(".validform-checktip").removeClass("validform-wrong validform-right validform-loading");
      brothers.find(".validform-error").removeClass("validform-error");
      brothers.find("[datatype]").removeData("cked").removeData("dataIgnore").each(function(){
        this.validform_lastval=null;
      });
      brothers.eq(0).find("input:first").focus();
    },
    
    abort:function(){
      if(this.validform_ajax){
        this.validform_ajax.abort();  
      }
    }
    
  }
  
  $.Datatype=Validform.util.dataType;
  
  Validform.prototype={
    dataType:Validform.util.dataType,
    
    eq:function(n){
      var obj=this;
      
      if(n>=obj.forms.length){
        return null;  
      }
      
      if(!(n in obj.objects)){
        obj.objects[n]=new Validform($(obj.forms[n]).get(),obj.settings,true);
      }
      
      return obj.objects[n];

    },
    
    resetStatus:function(){
      var obj=this;
      $(obj.forms).each(function(){
        this.validform_status="normal"; 
      });
      
      return this;
    },
    
    setStatus:function(status){
      var obj=this;
      $(obj.forms).each(function(){
        this.validform_status=status || "posting";  
      });
      
      return this;
    },
    
    getStatus:function(){
      var obj=this;
      var status=$(obj.forms)[0].validform_status;
      
      return status;
    },
    
    ignore:function(selector){
      var obj=this;
      var selector=selector || "[datatype]"
      
      $(obj.forms).find(selector).each(function(){
        $(this).data("dataIgnore","dataIgnore").removeClass("validform-error");
      });
      
      return this;
    },
    
    unignore:function(selector){
      var obj=this;
      var selector=selector || "[datatype]"
      
      $(obj.forms).find(selector).each(function(){
        $(this).removeData("dataIgnore");
      });
      
      return this;
    },
    
    addRule:function(rule){
      /*
        rule => [{
          ele:"#id",
          datatype:"*",
          errormsg:"Error prompt text!",
          nullmsg:"Prompt text when empty！",
          tip:"Prompt text displayed by default",
          altercss:"gray",
          ignore:"ignore",
          ajaxurl:"valid.php",
          recheck:"password",
          plugin:"passwordStrength"
        },{},{},...]
      */
      var obj=this;
      var rule=rule || [];
      
      for(var index=0; index<rule.length; index++){
        var o=$(obj.forms).find(rule[index].ele);
        for(var attr in rule[index]){
          attr !=="ele" && o.attr(attr,rule[index][attr]);
        }
      }
      
      $(obj.forms).each(function(){
        var $this=$(this);
        Validform.util.enhance.call($this,obj.settings.tiptype,obj.settings.usePlugin,obj.settings.tipSweep,"addRule");
      });
      
      return this;
    },
    
    ajaxPost:function(flag,sync,url){
      var obj=this;
      
      //Create pop box;
      if( obj.settings.tiptype==1 || obj.settings.tiptype==2 || obj.settings.tiptype==3 ){
        creatMsgbox();
      }
      
      Validform.util.submitForm.call($(obj.forms[0]),obj.settings,flag,url,"ajaxPost",sync);
      
      return this;
    },
    
    submitForm:function(flag,url){
      /*Submit without verification when flag===true*/
      

      var obj=this;
      
      //Let the first form of the object be submitted;
      var subflag=Validform.util.submitForm.call($(obj.forms[0]),obj.settings,flag,url);
      subflag === undef && (subflag=true);
      if(subflag===true){
        obj.forms[0].submit();
      }
      
      return this;
    },
    
    resetForm:function(){
      var obj=this;
      Validform.util.resetForm.call($(obj.forms));
      
      return this;
    },
    
    abort:function(){
      var obj=this;
      $(obj.forms).each(function(){
        Validform.util.abort.call(this);
      });
      
      return this;
    },
    
    check:function(bool,selector){
      /*
        bool：Pass in true, only detect and not display prompt information;
      */
      
      var selector=selector || "[datatype]",
        obj=this,
        curform=$(obj.forms),
        flag=true;
      
      curform.find(selector).each(function(){
        Validform.util.check.call(this,curform,obj,"",bool) || (flag=false);
      });
      
      return flag;
    },
    
    config:function(setup){
    /*
      config={
        url:"ajaxpost.php",//After the url is specified, the data will be submitted to this address;
        ajaxurl:{
          timeout:1000,
          ...
        },
        ajaxpost:{
          timeout:1000,
          ...
        }
      }
    */
      var obj=this;
      setup=setup || {};
      $(obj.forms).each(function(){
        this.validform_config=$.extend(true,this.validform_config,setup);
      });
      
      return this;
    }
  }

  $.fn.Validform=function(settings){
    return new Validform(this,settings);
  };
  
  function setCenter(obj,time){
    var left=($(window).width()-obj.outerWidth())/2,
      top=($(window).height()-obj.outerHeight())/2,
      
    top=(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)+(top>0?top:0);

    obj.css({
      left:left
    }).animate({
      top : top
    },{ duration:time , queue:false });
  }
  
  function creatMsgbox(){
    if($("#Validform_msg").length!==0){return false;}
    msgobj=$('<div id="Validform_msg"><div class="Validform_title">'+tipmsg.tit+'<a class="Validform_close" href="javascript:void(0);">&chi;</a></div><div class="Validform_info"></div><div class="iframe"><iframe frameborder="0" scrolling="no" height="100%" width="100%"></iframe></div></div>').appendTo("body");//提示信息框;
    msgobj.find("a.Validform_close").click(function(){
      msgobj.hide();
      msghidden=true;
      if(errorobj){
        errorobj.focus().addClass("validform-error");
      }
      return false;
    }).focus(function(){this.blur();});

    $(window).bind("scroll resize",function(){
      !msghidden && setCenter(msgobj,400);
    });
  };
  
  //Public method display & close information prompt box;
  $.Showmsg=function(msg){
    creatMsgbox();
    Validform.util.showmsg.call(win,msg,1,{});
  };
  
  $.Hidemsg=function(){
    msgobj.hide();
    msghidden=true;
  };
}));