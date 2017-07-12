var refreshIntervalId;
var refreshIntervalSearchProviderId;
var globalManufName;
function getURL()         
 
            {
//             return 'http://www.be1worldservices.com/maxima/';
             return 'http://bike.lmsis.com.br/ws/';
         
    } 	



function loginUsr()         
            {
                $("#message-login").html("<center>Finding email information....</center>");
                var $email = document.getElementById('repEmail').value;
                var $password = document.getElementById('repPwd').value;
                console.log($email);
                $.ajax({
                    type: "GET",
                    url: getURL()+"login.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"email":$email, "password":$password},
                    success: function (result, jqXHR) {
					   var userData = JSON.parse(result);
                       console.log(result);
                       if (userData.MESSAGE == "OK"){
							$("#iduser").val(userData.ID);
                            $("#todaysdate").val(userData.TODAYSDATE);                            
							$("#username").html('<center><p style="margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:22pt;color:white;">'+userData.NAME+'</center>');
                            var item = "<br><br><table align='center' border='0' width='95%'  style='background-color:black; color:#fff;'>";
                                item = item + '<tr><td><img class="img-circle" src="'+userData.IMG+'" width="100" /></td>';
                                item = item + "<td style='padding-left:10px;'><p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 1vh);'>"+userData.NAME+"";
                                item = item + "</td></tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2>&nbsp;</td></tr><tr><td colspan=2>&nbsp;</td></tr></table>";
                                item = item + "<p>";
                            $("#repPictName4").html(item);
                            $("#repPictName3").html(item);
                           $("#repPictName2").html(item);
                           $("#repPictName1").html(item);
                           $("#skype1").html('<i class="fa fa-skype button-icon-left icone-margin" data-position="left" style="padding-top:4px"></i>&nbsp;&nbsp;&nbsp;<a href="skype:'+userData.SKYPE+'?userinfo" " ><font color="#fff">Link to my profile</a>');
                           $("#skype2").html('<i class="fa fa-skype button-icon-left icone-margin" data-position="left" style="padding-top:4px"></i>&nbsp;&nbsp;&nbsp;<a href="skype:'+userData.SKYPE+'?userinfo" " ><font color="#fff">Link to my profile</a>');
                           $("#skype3").html('<i class="fa fa-skype button-icon-left icone-margin" data-position="left" style="padding-top:4px"></i>&nbsp;&nbsp;&nbsp;<a href="skype:'+userData.SKYPE+'?userinfo" " ><font color="#fff">Link to my profile</a>');
                           $("#skype4").html('<i class="fa fa-skype button-icon-left icone-margin" data-position="left" style="padding-top:4px"></i>&nbsp;&nbsp;&nbsp;<a href="skype:'+userData.SKYPE+'?userinfo" " ><font color="#fff">Link to my profile</a>');
//							listClassVideos();                           
							videosShowPage();
                            $("#message-login").html("");

                       }
                       else
                       {
                           $("#message-login").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-login").html("<center>Server busy try again later...  "+status+"</center>");
                        console.log(jqXHR.responseText);
                        console.log(jqXHR.status);
 
                    },
                });
         
    }
function getUserDetails()         

            {
         
                var uid = document.getElementById('iduser').value;
                console.log(getURL());
                $.ajax({
                    type: "GET",
                    url: getURL()+"get-userdetail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":uid},
                    success: function (result, jqXHR) {
					   var userData = JSON.parse(result);
                       if (userData.MESSAGE == "OK"){
							$("#app-address").val(userData.ADDRESS);
                       }
                       else
                       {
                           $("#app-address").val('');

                       }                   
         
                        $("#message-login").html("<center>Found "+userData.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        // error message...
                        $("#app-address").val("");
 
                    },
                });
         
    }
   function onDemandSidebarFilter()         
{

        uib_sb.toggle_sidebar($(".uib_w_130"));


}
   function onDemandSidebarSort()         
{

        uib_sb.toggle_sidebar($(".uib_w_71"));  

}

    function onDemandShowPage()         
{
     listOndemand();
     $("#returnplay").val("onDemandShowPage");
     activate_page("#pg-ondemand");

}

    function videosShowPage()         
{
    listByCategory();
    listFirst4Schedule();
    activate_page("#pg-videos");

}

    function scheduleShowPage()         
{
    var todaysdate = document.getElementById('todaysdate').value;
    listDatesSchedule(todaysdate);
    listSchedule(todaysdate);
    activate_page("#pg-schedule");

}

    function scheduleSelect(id)         
{
    if (document.getElementById('mark').checked)
    {
        addUserWatchClass(id);
    }
    else
    {
        deleteUserWatchClass(id);
    }    
 
}



    function ondemandDetail(id)         
{

    listOndemandDetail(id);
    activate_page("#pg-video-detail");

}

    function playOndemand()         
{
    console.log('playOndemand');
    var id = document.getElementById('idvideo').value;    
    playOndemandVideo(id);
    showWorkoutProgress();   
    activate_page("#pg-workout");

}

    function returnFromPlay()         
{
    console.log('returnFromPlay');
    var returnTo = document.getElementById('returnplay').value;    
    window[returnTo]();
    console.log("return:"+returnTo);

}


   function listDatesSchedule(date)         

            {
                // clean list div...
//                $("#menuDaysSchedule").empty();
                $("#menuDaysScheduleNew").empty();
                var iduser = document.getElementById('iduser').value;


                console.log ('listDatesSchedule : ' + date);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-dates-schedule.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser, "date": date},
                    success: function (result, jqXHR) {
         
                        var dates = JSON.parse(result);
                        $.each(dates,function(i, date){
                            
//                            var item = "<div onclick='listSchedule();'>" + date.WEEKDAY + "<p>&nbsp;&nbsp;" + date.DAY + "</div>";
//                            console.log("ITEM:"+item);
//                            $("#menuDaysSchedule").append(item); 
                            var item1 = "<a href='#' onclick='listSchedule(\""+ date.DATE +"\");'>" + date.WEEKDAY + "<p>&nbsp;&nbsp;" + date.DAY + "</a";
                            
                            $("#menuDaysScheduleNew").append(item1); 
                        });
         
                        
         
                    },
                    error: function (jqXHR, status) {
                        $("#scheduleContent").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

   function listFirst4Schedule()         

            {
                // clean list div...
                $("#scheduleTime").empty();
                var iduser = document.getElementById('iduser').value;
                var classnow,datenow,timenow;

                console.log ('listFirst4Schedule');
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-time-schedule.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser},
                    success: function (result, jqXHR) {
         
                        var dates = JSON.parse(result);
 
                        $.each(dates,function(i, date){
                            
                            var item1 =  "<a href='#' onclick='showFeaturedClass(\""+ date.CLASSID +"\",\""+date.DATE+"\",\""+date.TIME+"\");' style='width=25%;'>" + date.TIME  + "</td>";
                            item1 = item1 + "&nbsp;&nbsp;&nbsp;&nbsp;";
                            
                            $("#scheduleTime").append(item1); 
                            classnow = date.CLASSNOW;
                            timenow = date.TIMENOW;
                            datenow = date.DATENOW;
                        });
                      ;  
                      showFeaturedClass(classnow,datenow,timenow);          
         
                    },
                    error: function (jqXHR, status) {
                        $("#scheduleTime").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

   function showFeaturedClass(classid, date, time)         

            {
                // clean list div...
 //               $("#featuredClass").empty();
                var iduser = document.getElementById('iduser').value;


                console.log ('showfeaturedclass'+classid + date+time);
               $.ajax({
                    type: "GET",
                    url: getURL()+"show-featured-class.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser, "classid": classid},
                    success: function (result, jqXHR) {
         
                        var featured = JSON.parse(result);
                        
                        $.each(featured,function(i, feat){
                                  
                            var item = "<table onclick='ondemandDetail("+ feat.ID + ");' align='center' border='0' width='95%' height='160px' style='background: url("+feat.IMG+") no-repeat center center ; border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr  style='background: rgba(0,0,0,0.2);'>";
                                item = item + "<td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'>";
                                item = item + '<p><button class="btn widget uib_w_161 d-margins button-round" style="width:120px;font-size:12px;" data-uib="twitter%20bootstrap/button" data-ver="1" id="playOndemandFeatured"><i class="glyphicon glyphicon-play button-icon-left" data-position="left"></i>JOIN CLASS</button></p>';
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>"+feat.DESCRIPTION+"";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(1vw + 1vh);'>"+feat.INSTRUCTOR;
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(1.5vw + 1.5vh);'>"+date+"/"+time+"</td></tr></table>";
                                item = item + "<p>";


                            $("#featuredClass").html(item); 
                        });
         
                              
         
                    },
                    error: function (jqXHR, status) {
                        $("#featuredClass").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

   function listSchedule(date)         

            {
                // clean list div...
                $("#scheduleContent").empty();
                var iduser = document.getElementById('iduser').value;


                console.log ('listSchedule: ' + date);
                var wdate = "";
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-schedule.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser, "date": date},
                    success: function (result, jqXHR) {
         
                        var schedule = JSON.parse(result);
                        $.each(schedule,function(i, sched){
                            console.log(sched.DATE + "time:"+ sched.TIME);
                            if (sched.DATE != wdate)
                            {
                                $("#scheduleContent").append('<p style="font-size:19px;font-weight:bold;color:white;" >'+ sched.WEEKDAY + '</p'); 
                                wdate = sched.DATE;
                            }
                            var item = "<table  align='center' border='0' width='95%' height='50px' style='border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr  style='background: rgba(0,174,239,0.7);'>";
                                item = item + "<td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>"+sched.TIME+"</td>";
                                item = item + "<td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>"+sched.DESCRIPTION+"";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(1vw + 1vh);'>"+sched.INSTRUCTOR;
                                item = item + "</td>";
                                item = item + "<td><input type='checkbox' name='mark' id='mark' onchange='scheduleSelect(\""+ sched.ID +"\")'></td>";
                                item = item + "</tr></table>";
                                item = item + "<p>";
                            $("#scheduleContent").append(item); 
                        });
         
                        
         
                    },
                    error: function (jqXHR, status) {
                        $("#scheduleContent").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 



   function showWorkoutProgress()         

            {
                // clean list div...
                $("#workoutDisplay").empty();
                var iduser = document.getElementById('iduser').value;


                console.log ('workout-progress: ' );
                var wdate = "";
                var item = "<table  align='center' border='0' width='95%' height='50px' style='border-spacing:0; border-collapse:collapse; color:#fff;'>";
                    item = item + "<tr  style='background: rgba(0,174,239,0.7);'>";
                    item = item + "<td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>Distance: <p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>13M</p></td>";
                    item = item + "<td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>Calories: <p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>200</p></td>";
                    item = item + "<td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>SPEED:</p> <p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>30 MPH</p></td>";
                    item = item + "</tr></table>";
                    item = item + "<p>";
                $("#workoutDisplay").append(item); 
         
    } 





   function listOndemand()         

            {
                // clean list div...
                $("#listOndemands").empty();
				var iduser = document.getElementById('iduser').value;


				console.log ('listOndemands');
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-ondemand.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser},
                    success: function (result, jqXHR) {
         
                        var videos = JSON.parse(result);
                        var qty = 0;
                        $.each(videos,function(i, video){
                                qty = video.QTY;
                            console.log(video.IMG + "qty:"+ qty);
                            var item = "<table onclick='ondemandDetail("+ video.ID + ");' align='center' border='0' width='95%' height='150px' style='background: url("+video.IMG+") no-repeat center center ; background-size: cover;  border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr  style='background: rgba(0,174,239,0.7);'><td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>"+video.NAME+"";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(1vw + 1vh);'>"+video.INSTRUCTOR;
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(1.5vw + 1.5vh);'>"+video.DATE+"/"+video.TIME+"</td></tr></table>";
                                item = item + "<p>";
                            $("#listOndemands").append(item); 
                        });
         
                $("#ondemandtitle").empty();
                $("#ondemandtitle").html("Showing " + qty + " classes"); 
                        
         
                    },
                    error: function (jqXHR, status) {
                        $("#listOndemands").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

   function listByCategory()         

            {
                // clean list div...
                $("#videoGallery1").empty();
                var iduser = document.getElementById('iduser').value;
                addDivScroll();

                console.log ('listByCategory');
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-by-category.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":iduser},
                    success: function (result, jqXHR) {
         
                        var videos = JSON.parse(result);
                        var category = "";
                        var nrdiv = 1;
                        $.each(videos,function(i, video){
                            
                            if (category != video.CATEGORY){
                               var item = '<p style="font-size:14px;font-weight:bold;color:#000;background-color:#d3d3d3" >'+ video.CATEGORY + '</p>'; 

                                $("#catscroll" + nrdiv).append(item); 
                                nrdiv+=nrdiv;
                                category = video.CATEGORY;
                            }
                            var item = "<table onclick='ondemandDetail("+ video.ID + ");' align='center' border='0' width='95%' height='150px' style='background: url("+video.IMG+") no-repeat center center ; border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr  style='background: rgba(0,90,90,0.7);'><td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>"+video.NAME+"</p>";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(1vw + 1vh);'>"+video.INSTRUCTOR+"</p>";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(1.5vw + 1.5vh);'>"+video.DATE+"/"+video.TIME+"</p></td></tr></table>";
                            
                            $("#scroll" + nrdiv).append(item); 
                            
                        });
                         
                    
                    },
                    error: function (jqXHR, status) {
                        $("#videoGallery1").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

   function addDivScroll()         
   {
        for (i=1;i<100;i++){
             var item = '<div class="scrollmenu" id="scroll'+i+'" ></div>';
             var item = '<div class="col-xs-12" id="catscroll'+i+'" ></div>'; 
              
             $("#videoGallery1").append(item);
             var item = '<div class="scrollmenu" id="scroll'+i+'" ></div>';
             $("#videoGallery1").append(item);

        }
 
    }                            

   function listOndemandDetail(id)         

            {
                // clean list div...
                $("#videoImage").empty();
                $("#difRating").empty();
                $("#videoDescription").empty();
                var iduser = document.getElementById('iduser').value;
                $("#idvideo").val(id);


                console.log ('listOndemandDetail:' + id);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-ondemand-detail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":id},
                    success: function (result, jqXHR) {
         
                        var videos = JSON.parse(result);
                        $.each(videos,function(i, video){
                            console.log(video.IMG + "/" + video.RATE );
                            var item = "<table align='center' border='0' width='95%' height='250px' style='background: url("+video.IMG+") no-repeat center center ; border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr  style='background: rgba(0,174,239,0.7);'><td style='vertical-align:top;padding-left:10px;padding-top:0px;' onclick='onDemandShowPage();'><p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(4vw + 4vh);'><</td></tr>";
                                item = item + "<tr  style='background: rgba(0,174,239,0.7);'><td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>"+video.NAME+"";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(1vw + 1vh);'>"+video.INSTRUCTOR;
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(1.5vw + 1.5vh);'>"+video.DATE+"/"+video.TIME+"</td></tr></table>";
                                item = item + "<p>";
                            $("#videoImage").append(item); 
                                item = "<table  align='center' border='0' width='95%' style='border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr  style='background: rgba(0,174,239,0.7);'><td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'><p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>Difficulty/Rating";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(1.5vw + 1.5vh);'>"+video.DIFFICULTY+"/"+video.RATE+"%</td></tr></table>";
                                item = item + "<p>";
                            $("#difRating").append(item); 
                                item = "<table  align='center' border='0' width='95%'  style='border-spacing:0; border-collapse:collapse; color:#fff;'>";
                                item = item + "<tr><td style='vertical-align:bottom;padding-left:10px;padding-bottom:0px;'>";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(1.5vw + 1.5vh);color:black;'>"+video.DESCRIPTION;
                                item = item + "</td></tr></table>";
                                item = item + "<p>";
                                console.log(video.DESCRIPTION);
                            $("#videoDescription").append(item); 
                        });
         

                        
         
                    },
                    error: function (jqXHR, status) {
                        $("#listOndemands").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 








   function showFeatured()         

            {
                // clean list div...
                $("#featuredProd").empty();
                var iduser = document.getElementById('iduser').value;
                
                console.log('showFeatured');
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"get-featured.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":iduser},
                    success: function (result, jqXHR) {
         
                        var products = JSON.parse(result);
         
                     console.log(result);   
                    $.each(products,function(i, product){    
                                console.log(product.IMG);
                            var item = "<table  class='bgimgprod' border='0' width='100%'  style='min-height:200px;background-size:auto; background:url("+product.IMG+") no-repeat center center;-webkit-background-size: 100% 100%;-moz-background-size: 100% 100%;-o-background-size: 100% 100%; background-size: 100% 100%;'  onclick='showProductDetail("+product.ID+")'>";
                                item = item + "<tr height='90%' ><td colspan=2></td></tr>";
                                item = item + "<tr height='10%' style='max-height:30px;background:rgba(0,0,0,0.7);color:#fff;'>"; 
                                item = item + "<td style='max-height:30px;vertical-align:center; padding-left:10px;'>";
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'>"+product.FEATURED;
                                item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size: calc(2vw + 1vh);'>"+product.BRIEF+"</td>";
                                item = item + "<td align='center' style='max-height:30px; padding: 15px 15px 0 0;'><table border='0'  width='20%' style='background-color:black; color:#fff;font-family:arial narrow;'>";
                                item = item + "<tr style='font-family: Oswald Light;font-size:12px;'><td  align='center' >MAP -&nbsp;</td><td  align='center'> MSRP</td ></tr>";
                                item = item + "<tr><td bgcolor='#FFFFFF' align='center' colspan=2><font color='black' style='font-family: Oswald Light;font-size:13px;'><b>$"+product.MAP+" - $"+product.MSRP+"</td></tr>";
                                
                                item = item + "<tr><td  align='right' style='font-family: Oswald Light;font-size:10px;'>Wholesale:</td><td align='right'><font color='yellow'>$"+product.WHOLESALE+"</font></td></tr></table>";
                                item = item + "</td></table>";
                                item = item + "<p>";
                            $("#featuredProd").append(item); 
                        
                         });
                        
                    },
                    error: function (jqXHR, status) {
                        $("#msgListManuf").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 




   function playOndemandVideo(id)         

            {
                var iduser = document.getElementById('iduser').value;
    
                
                console.log('playOndemandVideo:' + id);
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-ondemand-detail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id":id},
                    success: function (result, jqXHR) {
         
                        var videos = JSON.parse(result);
         
                       
                    $.each(videos,function(i, video){    
                            console.log(video.USERIMG);
                            var item = "<table  border='0' width='100%' style='min-height:100px;' >";
                            item = item + "<tr  style='height:30px;background:rgba(0,0,0,0.7);color:#fff;'><td colspan=2>&nbsp;&nbsp;&nbsp;&nbsp;LEADERBOARD</td></tr>"; 
                            item = item + "<tr  style='max-height:30px;background:white;color:#808080;'>"; 
                            item = item + "<td style='max-height:30px;vertical-align:center; padding-left:10px;'>";
                            item = item + "<p style='margin-top: 0em; margin-bottom: 0em;font-family: Oswald Light;font-size:calc(2vw + 2vh);'><img class='img-circle' width='100' src='"+video.USERIMG+"'></td>";
                            item = item + "<td align='center' style='max-height:30px; padding: 15px 15px 0 0;'>";
                            item = item + "<p>"+video.USERNAME+"</p><p>Total Output</p>";
                            item = item + "<p style='color:lightgreen;font-weight:bold;font-size:20px;'>"+video.TOTALWATT+" watts </p></td ></tr>";
                            
                            item = item + "</table>";
                           
                                
                             $("#leaderBoard").html(item);  

                            showVideoOndemand(video.VIDEO,video.VIDEOOGG,video.VIDEOWEBM);                  
 
                        
                         });


                        
                    },
                    error: function (jqXHR, status) {
                        $("#msgListManuf").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });
         
    } 

 function showVideoOndemand(videoProd,videoogg,videowebm)  {       

    var video = document.getElementById('ondemandvideo');
    var sources = video.getElementsByTagName('source');
    console.log(videoProd);
    sources[0].src = videoProd;
    sources[1].src = videoogg;
    sources[2].src = videowebm;
    video.load();

}

 function videostartstop(videoProd,videoogg,videowebm)  {       

    var video = document.getElementById('ondemandvideo');
    var sources = video.getElementsByTagName('source');
    console.log("videostartstop");
    if (video.paused){
        console.log('play video paused');
        video.play();
    } 
    else
     if (video.ended){
        console.log('play video ended');
        video.play();
     }
     else
       video.pause(); 
    

}

 function videostop()  {       

    var video = document.getElementById('myvideo');
    var sources = video.getElementsByTagName('source');
    console.log("videostop");
    video.pause(); 
    

}



    function addUserWatchClass(schedid)         
{
    console.log('addUserWatchClass');
    var iduser = document.getElementById('iduser').value;    
                

               $.ajax({
                    type: "GET",
                    url: getURL()+"add-user-watch-class.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id": iduser, "sched":schedid},
                    success: function (result, jqXHR) {
         
                       
                        
                    },
                    error: function (jqXHR, status) {
                        $("#msgListManuf").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });


}


    function deleteUserWatchClass(schedid)         
{
    console.log('addUserWatchClass');
    var iduser = document.getElementById('iduser').value;    

               $.ajax({
                    type: "GET",
                    url: getURL()+"del-user-watch-class.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"id": iduser, "sched":schedid},
                    success: function (result, jqXHR) {
         
                        
                        
                    },
                    error: function (jqXHR, status) {
                        $("#msgListManuf").html("<center>Server Busy try later...  "+status+"</center>");
                    },
                });




}


 	


	function addUser()         

            {
				
					var email = document.getElementById('emailuser').value;
					var mobile = document.getElementById('mobileuser').value;
					var pwd = document.getElementById('passworduser').value;
					var error = true;
					console.log('addUser');
                $.ajax({
                    type: "GET",
                    url: getURL()+"articles/add-user.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"email": email, "mobile":mobile, "pwd":pwd},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#iduser").val(userData.UID);
						   $("#message-signup1").html('<center><b>'+userData.MESSAGE+'</center>');
						   activate_page("#signup2");
						   error = true;
                       }
                       else
                       {
                           $("#message-signup1").html('<center><b>'+userData.MESSAGE+'</center>');
                           error = false;
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center>Server busy try again later... "+status+"</center>");
                        error = false;
					
					},
                });
				
				return error;
         
    } 	
  function updateUser()         

            {
				
					var uid = document.getElementById('iduser').value;
					var name = document.getElementById('name').value;
					var address = document.getElementById('address').value;
					var gender = document.getElementById('gender').value;
					var height = document.getElementById('height').value;
					var weight = document.getElementById('weight').value;
					console.log('addUser');
                $.ajax({
                    type: "GET",
                    url: getURL()+"update-user.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"uid": uid, "name":name, "address":address , "gender":gender, "height":height, "weight":weight},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#uid").val(userData.UID);
						   $("#message-signup-2").html('<center><b>'+userData.MESSAGE+'</center>');
                           sendText(userData.UID);
						   activate_page("#signup2");
                       }
                       else
                       {
                           $("#message-signup-2").html('<center><b>'+userData.MESSAGE+'</center>');
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center>Server busy try again later... "+status+"</center>");
					
					},
                });
				
         
    }	

	
	
  function sendText(uid)         

            {
				
					console.log('sendText');
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-text.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"uid": uid},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       $("#message-signup-3").html('<center><b>'+userData.MESSAGE+'</center>');
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-signup-3").html("<center>Server busy try again later... "+status+"</center>");
					
					},
                });
				
         
    }	
	
	
	
function profile()         
            {
                $("#message-profile").html("<center>Finding profile information....</center>");
                var $uid = document.getElementById('iduser').value;
                $.ajax({
                    type: "GET",
                    url: getURL()+"profile.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":$uid},
                    success: function (result, jqXHR) {
                       console.log(result);
						var userData = JSON.parse(result);
                       
                       
                       if (userData.MESSAGE == "OK"){
							$("#message-profile").html('<center><b>PROFILE</center>');
							$("#profileName").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Name:</b></td><td class="text-left">'+userData.NAME.trim()+'</td></tr></table>');
							$("#profileEmail").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Email: </b></td><td  class="text-left"">'+userData.EMAIL.trim()+'</td></tr></table>');
							$("#profileMobile").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Mobile: </b></td><td  class="text-left">'+userData.MOBILE.trim()+'</td></tr></table>');
							$("#profileAddress").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Address: </b></td><td  class="text-left">'+userData.ADDR.trim()+'</td></tr></table>');
							$("#profileGender").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Gender: </b></td><td  class="text-left">'+userData.GENDER.trim()+'</td></tr></table>');
							$("#profileHeight").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Height: </b></td><td  class="text-left">'+userData.HEIGHT.trim()+'</td></tr></table>');
							$("#profileWeight").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Weight: </b></td><td  class="text-left">'+userData.WEIGHT.trim()+'</td></tr></table>');
							activate_page("#profile");
                       }
                       else
                       {
                           $("#message-profile").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
//                        $("#message-login").html("<center>Foram encontrado "+drivers.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-login").html("<center>Server busy try again later...  "+status+"</center>");
                        console.log(jqXHR.responseText);
                        console.log(jqXHR.status);
 
                    },
                });
         
    }

	
	
function sendEmail()         
            

            {
                $("#messageReturnEmail").html("<center></center>");
                $("#message-signup").html("<center></center>");
                var uid = document.getElementById('iduser').value; 
                var manuf = document.getElementById('idmanufacturer').value; 
                var typeEmail = document.getElementById('typeEmail').value; 
                var subject = document.getElementById('emailSubject').value; 
                var message = document.getElementById('emailText').value; 
                console.log('sendEmail to:'+manuf+'type:'+typeEmail);
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-emailcontact.php",
                    timeout: 8000,
					data: {"uid": uid,"subject": subject,"message": message,"manuf": manuf,"typeemail": typeEmail},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
                        console.log('RESULT EMAIL:'+result);
                        var retemail = JSON.parse(result);
                        console.log('RESULT EMAIL:'+result);
                        $("#messageReturnEmail").html("<center>Message Sent.</center>");
                        $("#message-signup").html("<center>Message Sent.</center>");

						//activate_page("#pg-services");
         
                    },
                    error: function (jqXHR, status) {
                        $("#messageReturnEmail").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 

function sendEmailSignup()         
            

            {
                $("#message-signup").html("<center></center>");
                var signupemail = document.getElementById('signupemail').value; 
                var nome = document.getElementById('signupname').value; 
                var typeEmail = document.getElementById('typeEmail').value; 
                var subject = document.getElementById('signupsubject').value; 
                var message = document.getElementById('signupmessage').value; 
                console.log('type:'+typeEmail);
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-emailcontact.php",
                    timeout: 8000,
                    data: {"signupemail": signupemail,"signupname": nome, "signupsubject": subject,"signupmessage": message,"typeemail": typeEmail},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
                        console.log('RESULT EMAIL:'+result);
                        var retemail = JSON.parse(result);
                        console.log('RESULT EMAIL:'+result);
                        $("#message-signup").html("<center>Message Sent.</center>");

                        //activate_page("#pg-services");
         
                    },
                    error: function (jqXHR, status) {
                        $("#messageReturnEmail").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 



function showEmailPage(typeEmail)         
            {
        if (typeEmail == 'DPG'){  
            $("#typeEmail").val(typeEmail);      
            activate_page("#email-DPG");
        }

        if (typeEmail == 'MANUF'){  
            $("#typeEmail").val(typeEmail);     
            var manuf = document.getElementById('idmanufacturer').value;
            if (manuf != ''){  
            activate_page("#email-DPG");
            }
            else
            {alert('Select Manufacturer First.')}
        }

        if (typeEmail == 'SIGNUP'){  
            $("#typeEmail").val(typeEmail);      
            activate_page("#email-signup");
        }

        } 

