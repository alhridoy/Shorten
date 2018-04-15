
 $(document).ready(function(){
   
   $("#shorten").click(function() {
    var longUrl = $("#shortenURL").val();
    $.ajax({
        url: 'https://www.googleapis.com/urlshortener/v1/url?&key=AIzaSyCnibvuj2xdGGnSJrHS54NJ56kKFnWTsVo',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: '{longUrl:"' + longUrl + '"}',
        success: function(response) {
            console.log(response["id"]);

            $("#result").html(response["id"]);
            bootbox.alert("Shortened url: <a href=" + response["id"] + " target=_BLANK >" + response["id"] + "</a>");
        }
    });
});
    
});
   

    
