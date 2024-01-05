$(document).ready(function()
{
    var meDB;//global

    var tripID=0;

    document.addEventListener("deviceReady", onDeviceReady, false);

    function onDeviceReady()
    {
        $("#deleteAll").show();
        $("#showTrip").show();
        $("#updateTrip").hide();
        $("#addTrip").hide();
        $("#home").hide()

        meDB=window.openDatabase("tripDB","1.0","Trip List",10000000); //bytes


//        meDB.transaction(function(me)
//        {
//            me.executeSql("drop table if exists TRIP",[],function(me, result){ alert("Table Dropped");}, null);
//        });//table drop


        meDB.transaction(function(me)
        {
            var createSql="create table if not exists TRIP(tid integer primary key autoincrement, tripName varchar, destinaTion varchar, tripDate varchar, risK varchar, descripTion varchar, timE varchar, eCount integer)";
            me.executeSql(createSql,[],
            function(me, result)
            {
//                alert("Table created!");
            },
            function(error)
            {
                alert("error!");
            });
        });//table create
        showTrip();
    }//deviceReady

    $("#btnAddTrip").click(function()
    {
        $("#deleteAll").hide();
        $("#showTrip").hide();
        $("#addTrip").show();
        $("#home").show()
    });//btn Add Book

    $("#btnSave").click(function()
    {
          var tripName=$("#trip_name").val();
          var destinaTion=$("#destination").val();
          var tripDate=$("#trip_date").val();
          var risK=$(":radio:checked").val();
          var descripTion=$("#description").val();
          var timE=$("#time").val();
          var eCount=$("#e_count").val();

          if(tripName == 0){alert("Please Fill The Trip Name");}else{
          if(destinaTion == 0){alert("Please Fill The Destination");}else{
          if(tripDate == 0){alert("Please Fill The Trip Date");}else{
          if(!risK){alert("Please Fill Risk Assessment");}else{
          if(timE == 0){alert("Please Fill The Trip Time");}else{
          if(eCount == 0){alert("Please Fill The Employee Count");}
          else
          {
                meDB.transaction(function(me)
                {
                    var insertSql="insert into TRIP(tripName, destinaTion, tripDate, risK, descripTion, timE, eCount) values(?,?,?,?,?,?,?)";
                    me.executeSql(insertSql,[tripName,destinaTion,tripDate,risK,descripTion,timE,eCount],
                    function(me,result)
                    {
                        alert("Trip Have Been Summited!");
                        showTrip();
                    },
                    function(error)
                    {
                        alert("Summiting error!");
                    });
                });
          }}}}}}
    });//btn Save

    function showTrip()
    {
        $("#showTrip").html("Trip List<br/>");

        meDB.transaction(function(me)
        {
            var selectSql="select * from TRIP";
            me.executeSql(selectSql,[],
            function(me,results)
            {
            var len=results.rows.length; //no of rows (records)
            var i;
            for(i=0;i<len;i++)
            {
                $("#showTrip").append(
                (i+1)+": "+
                results.rows.item(i).tripName+", "+
                results.rows.item(i).destinaTion+", "+
                results.rows.item(i).tripDate+", "+
                results.rows.item(i).risK+", "+
                results.rows.item(i).descripTion+", "+
                results.rows.item(i).timE+", "+
                results.rows.item(i).eCount+"."+
                 "<a href='#' id='"+results.rows.item(i).tid+"' class='btnUpdate'>Update</a>"+"   "+
                "<a href='#' id='"+results.rows.item(i).tid+"' class='btnDelete'>Delete</a><br/>");
            }},
            null);
        });
    }//delete TRIP

$(document.body).on('click','.btnUpdate', function()

    {
        $("#deleteAll").hide();
        $("#showTrip").hide();
        $("#addTrip").hide();
        $("#updateTrip").show();
        $("#home").show()
var tid=this.id;
tripID=tid



meDB.transaction(function(me){
                    var executeQuery="select * from TRIP where tid=?";
                    me.executeSql(executeQuery,[tid], function(me, results){
                            var len=results.rows.length;



                            if(len>0){
                                $("#utrip_name").val(results.rows.item(0).tripName);
                                $("#udestination").val(results.rows.item(0).destinaTion);
                                $("#utrip_date").val(results.rows.item(0).tripDate);
                                $(":radio:checked").val(results.rows.item(0).risK);
                                $("#udescription").val(results.rows.item(0).descripTion);
                                $("#utime").val(results.rows.item(0).timE);
                                $("#ue_count").val(results.rows.item(0).eCount);
                            }

                    }, null);
                 });

    });

$(document.body).on('click','.ubtnSave', function()

        {



              var tripName=$("#utrip_name").val();
              var destinaTion=$("#udestination").val();
              var tripDate=$("#utrip_date").val();
              var risK=$(":radio:checked").val();
              var descripTion=$("#udescription").val();
              var timE=$("#utime").val();
              var eCount=$("#ue_count").val();








              if(!risK){alert("Please Fill Risk Assessment");}else{

                    meDB.transaction(function(me)
                    {

                        var updateSql="UPDATE TRIP SET tripName = ?, destinaTion = ?, tripDate = ?, risK = ?, descripTion = ?, timE = ?, eCount = ?  WHERE tid = ? ";
                        me.executeSql(updateSql,[tripName,destinaTion,tripDate,risK,descripTion,timE,eCount,tripID],
                        function(me,result)
                        {
                            alert("Trip Have Been Updated!");
                            showTrip();
                        },
                        function(error)
                        {
                            alert("Updating error!");
                        });
                    });

}
        }); //update


    $(document.body).on('click','.btnDelete', function()
    {
        var tid=this.id;

        if(confirm("Are you sure you want to delete this trip ?"))
        {
            meDB.transaction(function(me)
            {
                var deleteSql="delete from TRIP where tid=?";
                me.executeSql(deleteSql,[tid],
                function(me,result)
                {
                    alert("Successfully Deleted!");
                    showTrip();
                },
                function(error)
                {
                    alert("error!");
                });
            });
        }
    }); //btn Delete

    $("#deleteAll").click(function()
    {
        if(confirm("Are you sure you want to delete all data ?"))
        {
            meDB.transaction(function(me)
            {
                var deleteSql="delete from TRIP";
                me.executeSql(deleteSql,[],
                function(me,result)
                {
                    alert("Deleted successfully!");
                    showTrip();
                },
                function(error)
                {
                    alert("Deletion error!");
                });
            });
        }
    });//delete All

 }); //document ready