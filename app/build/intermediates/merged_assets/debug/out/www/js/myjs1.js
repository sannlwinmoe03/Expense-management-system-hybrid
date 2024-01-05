
function onBodyLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    //alert("Device Ready");
    //successDB();
 }

function bookStoreDB()
{
    var db=window.openDatabase("bookDB","1.0","Book DB",1000000);
    db.transaction(addBook,errorDB,successDB);
}
function addBook(tx)
{
    tx.executeSql("create table if not exists book(bid integer primary key autoincrement,bname varchar,price integer)");
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
        st += ""+(i+1)+"&nbsp;&nbsp;&nbsp;";
        //st += results.rows.item(i).bid+" ";
        st += results.rows.item(i).bname+"&nbsp;&nbsp;";
        st += results.rows.item(i).price+"&nbsp;&nbsp;&nbsp;";
        st += "<input type='button' id='"+results.rows.item(i).bid+"' value='Delete' onclick='deleteBook(this.id)'/>&nbsp;&nbsp;&nbsp;";
        st += "<input type='button' id='"+results.rows.item(i).bid+"' value='Update' onclick='updateBook(this.id)'/>";
        st += "<hr/>";
     }
     $("#bookInfo").html("Book Results: <br/>"+st);
}

function deleteBook(clicked_id)
{
    if(confirm("Are you sure you want to delete?")){
            var delete_bid=clicked_id;
            window.localStorage.setItem("delete_bid",delete_bid);

            var db=window.openDatabase("bookDB","1.0","Book DB",1000000);
            db.transaction(deleteBookDB,errorDB);
    }
}
function deleteBookDB(tx)
{
    var delete_bid=0;
    delete_bid=window.localStorage.getItem("delete_bid");
    window.localStorage.clear();

    tx.executeSql("delete from book where bid=?",[delete_bid],successDelete,errorDB);
}
function successDelete()
{
    alert("Successfully deleted!!");
    successDB(); //show all books
}
function updateBook(clicked_id)
{
    //alert("Clicked id: "+clicked_id);
    var edit_bid=clicked_id;
    window.localStorage.setItem("edit_bid",edit_bid);

    var db=window.openDatabase("bookDB","1.0","Book DB",1000000);
    db.transaction(updateBookQuery,errorDB);
}
function updateBookQuery(tx)
{
     var edit_bid=0;
     edit_bid=window.localStorage.getItem("edit_bid");

     window.localStorage.clear();

    tx.executeSql("select * from book where bid=?",
                   [edit_bid],queryResultToUpdate, errorDB);
}

function queryResultToUpdate(tx, results)
{
    var bookid=results.rows.item(0).bid; //first row
    var bname=results.rows.item(0).bname;
    var price=results.rows.item(0).price;

    $("#bid").val(bookid);//setting value  // $("#bid").val(); //getting value
    $("#bname").val(bname);
    $("#price").val(price);
}

function updateBookDB()
{
    var db=window.openDatabase("bookDB","1.0","Book DB",1000000);
    db.transaction(updateBookAction,errorDB);
}
function updateBookAction(tx)
{
    tx.executeSql("update book set bname=?, price=? where bid=?",
                  [$("#bname").val(), $("#price").val(),$("#bid").val()],
                  successUpdate,errorDB);
}

function successUpdate()
{
    alert("Successfully updated!!");
    successDB(); //show all books
}

function searchBookDB()
{
    var db=window.openDatabase("bookDB","1.0","Book DB",1000000);
    db.transaction(querySearchBook,errorDB);
}
function querySearchBook(tx)
{
    tx.executeSql("select * from book where price<=?",[$("#price1").val()],querySearchSuccess,errorDB);
    //tx.executeSql("select * from book where bname=?",[$("#bname1").val()],querySearchSuccess,errorDB);
}

function querySearchSuccess(tx, results)
{
    var len=results.rows.length;
    var st="";
    for(var i=0;i<len;i++)
    {
        st += results.rows.item(i).bname+"<br/>";
        st += results.rows.item(i).price+"<hr/>";
    }
    if(len==0)$("#bookInfo1").html("No Books for your searched price!<br/>");
    else $("#bookInfo1").html("Searched Book: <br/>"+st);
}
