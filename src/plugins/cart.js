/*=============================================================*/

 function getUrlParam(key) {
                var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
                var result = window.location.search.substr(1).match(reg);
                return result ? decodeURIComponent(result[2]) : null;
            }
    var pricetal = getUrlParam('pricetal') || 0;
    var user = getUrlParam('userName') || 0;
    console.log(user,'user')
    if(user){
        $('.container .right').addClass('none');
    }

$('.checkCss').click(function(){
    totalPrice();
    console.log(this)
})

/*=============================================================*/
                     
/*=============================================================*/
$('.del').click(function(){
    $(this).parent().remove()
    totalPrice();
   namber();
})
/*=============================================================*/
                 
/*=============================================================*/                                                                                                                                                                                                                                                                                      
$('.reduceCss').click(function(){
    $(this).next().val(parseInt($(this).next().val())-1)
        if ($(this).next().val()<1) {
                $(this).next().val(1);}
    $(this).parent().next().find("input").val($(this).parent().prev().text()*$(this).next().val())
        totalPrice();
        var num= $(this).next().val();
       // namber(num);
})

/*=============================================================*/
                
/*=============================================================*/
$('.qwe').click(function(){
    $(this).prev().val(parseInt($(this).prev().val())+1)
    $(this).parent().next().find("input ").val($(this).parent().prev().text()*$(this).prev().val())
    totalPrice();
    var num = $(this).prev().val();
   // namber(num);
})

/*=============================================================*/
            
function namber(num){
    console.log(num);
    $('#countTotal').text(num);
};

/*=============================================================*/
function totalPrice(){
    var select = 0;
    var num = 0;
     $('.checkCss').each(function(){
         console.log(this)
         if(this.checked==true){
            select = $(this).parent().parent().find('#inputCountCss1').val()
             var b = $(this).parent().parent().find('#stotal1').val()
             //console.log(b)
             num += Number(b);
     //        console.log(num)     
         }
         $('.totalPrice').text(num) ;
         namber(select);
     })
}

$('#btnOrder').click(function(){
    var pricetal = $('.pricetal').text();
    if(pricetal>0){
        window.location.href ='settleAccount.html?pricetal='+pricetal;
    }else{
        alert('Please select the item to pay!')
    }
    
})

$('.next').click(function(){
    var cardNum = $('#cardNum').val().length;
    var cardholder = $('#cardholder').val().length;
    var safetyCode = $('#safetyCode').val().length;
    if(cardNum<6 || cardNum>30){
        var html = '<p style="color:red;">Account number is 6-30 digits!</p>'
       $('.cardNum-checktip').html(html)
    }else{
        $('.cardNum-checktip').html('')
    }
    if(cardholder==0){
        var html = '<p style="color:red;">Please fill in the name of the cardholder of this credit card.</p>'
       $('.cardholder-checktip').html(html)
    }else{
        $('.cardholder-checktip').html('')
    }
    if(safetyCode!=3){
        var html = '<p style="color:red;">Please fill in the three digits on the back of the card.</p>'
       $('.safetyCode-checktip').html(html)
    }else{
        $('.safetyCode-checktip').html('')
    }
    if(cardNum>6 &&cardNum<30 && cardholder>0 && safetyCode==3){
        window.location.href ="payment.html?pricetal="+pricetal
    }
    
})

$('#cardNaccountum').val(pricetal);

$('.payment').click(function(){
    var password = $('#paymentPassword').val().length;
    if(password>0){
        alert('Payment successful!');
         window.location.href ="../index.html"
    }
})

$('.Passwordlogin').click(function(){

     var phoneNum = $('#mobile').val().length;
    var password = $('#password').val().length;
    if(phoneNum>0){
        var html = '<p style="color:red;">Please input your phone number!</p>'
       $('.mobile-checktip').html(html)
    }else{
        $('.mobile-checktip').html('')
    }
    if(password==0){
        var html = '<p style="color:red;">Please input your phone password!</p>'
       $('.password-checktip').html(html)
    }else{
        $('.cpassword-checktip').html('')
    }

    if(phoneNum>0 && password>0){
        window.location.href ="../index.html?userName=2"
    }
})