<script>
    $("#confirmationCode").hover(function(){
       $("#confirmationCode div ul").addClass("on");
    }, function(){
       $("#confirmationCode div ul").removeClass("on");
    });
 </script>

 <script>
    $("#emailerrormessagespan").hide();
    $("#confirmationCode").hide();
    $("#confirmationCodeerrormessagespan").hide();
 </script>

 <script>
    function CheckEmail()
    {
       var inputEmail = $('#email').val()
       if(inputEmail){
          $.ajax({
             url : "{{ route('checkemailaccountget') }}",
             type : "POST",
             dataType:"json",
             data:{
                _token:"{{csrf_token()}}",
                email: inputEmail
             },
             }).done(function(response){
                $("#emailerrormessagespan").show();
                $("#email").attr('class', 'opacityNot js-notSyncValidate active');
                $('#emailerrormessagespan').text(response.msg);
                if(response.code != 200){
                  $("#confirmationCode").show();
                }
             }).fail(function(xhr, status, error){

                var errors = JSON.parse(xhr.responseText)

                // $.each(errors, function(key, value){
                //    console.log(value[0])
                // });

                // $('*[id*=errormessage]:visible').each(function(i, item) {
                   
                // });
                $("#emailerrormessagespan").show();
                $("#email").attr('class', 'opacityNot js-notSyncValidate input-validation-error active');
                $('#emailerrormessagespan').text(errors.msg);

             }).always(function(){

             });
       }
    }
 </script>

<script>
   function ConfirmAccount()
   {
      var inputEmail = $('#email').val()
      var inputAuthKey = $('#authKey').val()
      if(inputEmail){
         $.ajax({
            url : "{{ route('confirmaccountpost') }}",
            type : "POST",
            dataType:"json",
            data:{
               _token:"{{csrf_token()}}",
               email: inputEmail,
               authKey: inputAuthKey
            },
            }).done(function(response){
               $("#confirmationCodeerrormessagespan").show();
               $("#authKey").attr('class', 'opacityNot js-notSyncValidate active');
               $('#confirmationCodeerrormessagespan').text(response.msg);
               $("#emailerrormessagespan").hide();
            }).fail(function(xhr, status, error){

               var errors = JSON.parse(xhr.responseText)

               // $.each(errors, function(key, value){
               //    console.log(value[0])
               // });

               // $('*[id*=errormessage]:visible').each(function(i, item) {
                  
               // });
               $("#confirmationCodeerrormessagespan").show();
               $("#authKey").attr('class', 'opacityNot js-notSyncValidate input-validation-error active');
               $('#confirmationCodeerrormessagespan').text(errors.msg);

            }).always(function(){

            });
      }
   }
</script>