let n;
let resp;
let nItems;
let currentPage;

var req = new XMLHttpRequest();

req.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
req.send();

req.onload = function () {
    var data = JSON.parse(this.response);
    var len = data.length;
    var count;

    if(len%10==0)
        count = len/10;
    else
        count = (len/10)+1;

    setRespValue(data,count);
    createTable(1);
  };

function setRespValue(respval,cnt)
{
    resp =respval
    nItems =cnt;
}

function createTable(pageNumContent){
    currentPage = pageNumContent;
    var tblObj = document.getElementById('newTable')
    var pgnObj = document.getElementById('pgn')
    if(tblObj!=null && pgnObj!=null)
    {    tblObj.remove();
         pgnObj.remove();
    }

var table =document.createElement('table');

table.id='newTable'
table.className='table table-bordered';

var thead=document.createElement('thead');
thead.className='thead-dark';
var tr1=document.createElement('tr');
var th1=createtrth('th','ID');
var th2=createtrth('th','Name');
var th3=createtrth('th','Email');
tr1.append(th1,th2,th3);
thead.append(tr1);


var tbody=document.createElement('tbody');

for(var j=((+pageNumContent*10)-10); j<=((+pageNumContent*10)-1);j++)
{
    var tr=document.createElement('tr');
    var td1=createtrth('td',resp[j].id);
    var td2=createtrth('td',resp[j].name);
    var td3=createtrth('td',resp[j].email)
    tr.append(td1,td2,td3);
    tbody.append(tr);
}

table.append(thead,tbody);
document.body.append(table);
createPagination(nItems);

function createtrth(name,val=''){
    var td=document.createElement(name);
    td.innerHTML=val;
    return td;
}

}
function createPagination(len)
{
  n =len
  var ulist = document.createElement('ul');
  ulist.setAttribute('class','pagination');
  ulist.setAttribute('id','pgn')

  function createList(pageNum){
  var listitem = document.createElement('li');
  listitem.setAttribute('class','page-item')
  var alink = document.createElement('a');
  if(+pageNum==(+n+1))
  {
    alink.innerHTML='First'
    pageNum=1;
  }
  else if (+pageNum==(+n+2))
  {
    alink.innerHTML='Last'
    pageNum=n;
  }
  else if (+pageNum==(+n+3))
  {
    alink.innerHTML='Prev'
    if(currentPage==1)
        pageNum=1
    else
        pageNum=currentPage-1
  }
  else{
    alink.innerHTML=pageNum
  }

  alink.setAttribute('class','page-link')
  alink.setAttribute('href','#');
  alink.setAttribute('onclick','createTable('+pageNum+')')
  listitem.append(alink)
  ulist.append(listitem)
  }

  for(var i=1;i<=(+n+3);i++)
  {
      createList(i)
  }

document.body.append(ulist)
}

