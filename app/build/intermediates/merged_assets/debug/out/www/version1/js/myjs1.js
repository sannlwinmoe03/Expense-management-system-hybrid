
function onBodyLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
alert("name: " + device.name + "\n" +
"cordova: " + device.cordova + "\n" +
"platform: " + device.platform + "\n" +
"uuid: " + device.uuid + "\n" +
"version: " + device.version);

//Get the networkInfo DOM element
        //var element = document.getElementById('networkInfo');
       // element.innerHTML = "Ready <br/>";
        $('#networkInfo').html("Ready State <br/>");

        /*
            var db=window.openDatabase("bookDB","1.0","Book DB",1000000);
                db.transaction(
                function(tx){ tx.executeSql("DROP TABLE IF EXISTS book",
                [],
                function(tx, results){
                            alert("Dropped Table!");
                },
                function(error){
                            alert("Error: "+error.message);
                });
                });
                */

    }

function onNextInfo()
{
    $('#nextInfo').html("Hello from Next!");
}

function onShowAlert()
{
    navigator.notification.alert("Please try again!",onDoAlert,"Warning!","Done");
}
function onDoAlert()
{

}
function onShowConfirm()
{
    navigator.notification.confirm("Please choose one option!",onDoConfirm,"Ring or Vibrate","Ring,Vibrate");
}
function onDoConfirm(button)
{
    if(button=="1")
    {
        $("#nextInfo").html("You have selected Beep option!");
        navigator.notification.beep(3);
    }
    else
    {
        $("#nextInfo").html("You have selected Vibrate option!");
        navigator.notification.vibrate(1000); //1 sec
    }
}

/*
function onLoginAction()
{
    var uname=$("#uname").val();
    var pw=$("#pw").val();
     var gname=window.localStorage.getItem("name");
    if(uname==gname && pw=="12345")  //"ayeaye"
    {
        alert("Valid User!");
    }
    else
    {
        alert("Invalid User!");
    }
    window.localStorage.clear();
}

function onStoreName()
{
    var name=$("#name").val();
    window.localStorage.setItem("name",name);

    var gname=window.localStorage.getItem("name");
    $("#display_name").html("Your name is: "+gname);

}

function bookStoreDB()
{
    var db=window.openDatabase("bookDB","1.0","Book DB",1000000);
    db.transaction(addBook,errorDB,successDB);
}
function addBook(tx)
{
    tx.executeSql("create table if not exists book(bid integer primary key autoincrement,bname varchar,price varchar)");//SQL- table, data
    tx.executeSql("insert into book(bname,price) values(?,?)",[$("#bname").val(),$("#price").val()]);
}
function errorDB(err)
{
    alert("Error Message: "+err.message);
}
function successDB()
{
    //alert("Successfully added!");
    var db=window.openDatabase("bookDB","1.0","Book DB",1000000);
    db.transaction(queryBook,errorDB);
}
function queryBook(tx)
{
    tx.executeSql("select * from book",[],querySuccess,errorDB);
}
function querySuccess(tx, results)
{
     var len=results.rows.length;
     var st="";
     for(var i=0;i<len;i++)
     {
        //var b=results.rows.item(i).bid;
        //window.localStorage.setItem("bookID",b);

        st += ""+(i+1)+"  ";
        st += results.rows.item(i).bid+"  ";
        st += results.rows.item(i).bname+"   ";
        st += results.rows.item(i).price+"<br/>";
        //st += "<a href='delete2.html'>Delete</a><br/>";
        st += "<a class='delete' href='#' id='" + results.rows.item(i).Id + "'>Delete</a>";
     }
     $("#bookInfo").html("Book Results: <br/>"+st);
}

function searchBookDB()
{
    var db=window.openDatabase("bookDB","1.0","Book DB",1000000);
    db.transaction(querySearchBook,errorDB);
}
function querySearchBook(tx)
{
    tx.executeSql("select * from book where price<=?",[$("#price").val()],querySearchSuccess,errorDB);
    //tx.executeSql("select * from book where bname=?",[$("#bname").val()],querySearchSuccess,errorDB);
}

function querySearchSuccess(tx, results)
{
    var len=results.rows.length;
    var st="";
    for(var i=0;i<len;i++)
    {
        st += results.rows.item(i).bname+"<br/>";
    }
    if(len==0)$("#bookInfo").html("No Books for your searched price!<br/>");
    else $("#bookInfo").html("Searched Book: <br/>"+st);
}

$(document.body).on('click', '.delete', function () {
 if (confirm("Do you want to delete")) {

            var _id = this.id;
            deleteBook(_id);
    }
}

function deleteBook(_id)
{
    var db=window.openDatabase("bookDB","1.0","Book DB",1000000);
    db.transaction(deleteBookDB,errorDB);
}
function deleteBookDB(tx, _id)
{
    //tx.executeSql("delete from book where bid=?",[$("#bid").val()],successDelete,errorDB);
    //var bookID=window.localStorage.getItem("bookID");
    tx.executeSql("delete from book where bid=?",[_id],successDelete,errorDB);
}
function successDelete()
{
    alert("Successfully deleted!!");
    //successDB(); //show all books
}
function updateBook()
{
    var db=window.openDatabase("bookDB","1.0","Book DB",1000000);
    db.transaction(updateBookDB,errorDB);
}
function updateBookDB(tx)
{
     tx.executeSql("update book set price=? where bid=?",[$("#price").val(),$("#bid").val()],successUpdate,errorDB);
}
function successUpdate()
{
    alert("Successfully updated!!");
}
*/