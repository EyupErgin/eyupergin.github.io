// FORUMLAR ICIN KULLANILAN MODUL!
function Global(){
    Breached();
    ExploitIn();
    XssIs();
    CracKing();
    SinisterLy();
}

function Turkish(){
    ImhaTimi();
    SpyHackerz();
    Siberdeyiz();
    Hacktivizm();
    CrackTurkey();
    Koswog();
}

function AllBlacklist(){
    MxDomain();
}

function Alllookup(){
    MxDmarc();
    Mxmxlookup();
    MxDns()
}

function Breached(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://breached.to/search.php?action=do_search&keywords="+encodeURIComponent(finalQuery);
    window.open(url);
}
function ExploitIn(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://forum.exploit.in/search/?q="+encodeURIComponent(finalQuery);
    window.open(url);
}
function XssIs(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://xss.is/search/search/?keywords="+encodeURIComponent(finalQuery);
    window.open(url);
}
function ImhaTimi(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://imthack.com/forum/search/search/?keywords="+encodeURIComponent(finalQuery);
    window.open(url);
}
function Hacktivizm(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://www.hacktivizm.org/search/search/?keywords="+encodeURIComponent(finalQuery);
    window.open(url);
}
function CrackTurkey(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://crackturkey.com/search/search/?keywords="+encodeURIComponent(finalQuery);
    window.open(url);
}
function SpyHackerz(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://spyhackz.com/forum/search/search/?keywords="+encodeURIComponent(finalQuery);
    window.open(url);
}
function Siberdeyiz(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://siberdeyiz.com/search/search/?keywords="+encodeURIComponent(finalQuery);
    window.open(url);
}
function Koswog(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://forum.koswog.com/search/search/?keywords="+encodeURIComponent(finalQuery);
    window.open(url);
}
function CracKing(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://cracking.org/search/search/?keywords="+encodeURIComponent(finalQuery);
    window.open(url);
}
function SinisterLy(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://sinister.ly/search.php?action=do_search&keywords="+encodeURIComponent(finalQuery);
    window.open(url);
}
// BLACKLIST ICIN KULLANILAN MODUL!
function MxDomain(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://mxtoolbox.com/SuperTool.aspx?action=blacklist%3a"+encodeURIComponent(finalQuery);
    window.open(url);
}
// BLACKMARKET ICIN KULLANILAN MODUL!
function Genesis(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://genesis.market/client/bots/index?BotsSearch%5BallResources%5D="+encodeURIComponent(finalQuery);
    window.open(url);
}
function Russian(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://russianmarket.to/logs?links="+encodeURIComponent(finalQuery);
    window.open(url);
}
// MAIL ICIN KULLANILAN MODUL!
function IntelX(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://intelx.io/?s="+encodeURIComponent(finalQuery);
    window.open(url);
}
function Dehashed(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://www.dehashed.com/search?query=domain%3A"+encodeURIComponent(finalQuery);
    window.open(url);
}
// LOOKUP ICIN KULLANILAN MODUL!
function MxDmarc(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://mxtoolbox.com/SuperTool.aspx?action=dmarc%3a"+encodeURIComponent(finalQuery);
    window.open(url);
}
function Mxmxlookup(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://mxtoolbox.com/SuperTool.aspx?action=mx%3a"+encodeURIComponent(finalQuery);
    window.open(url);
}
function MxDns(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://mxtoolbox.com/SuperTool.aspx?action=a%3a"+encodeURIComponent(finalQuery);
    window.open(url);
}
// RANSOMWARE ICIN KULLANILAN MODUL!
function Ransomware(){
    var url = "https://privtools.github.io/ransomposts/";
    window.open(url);
}

// CODE LEAK ICIN KULLANILAN MODUL!
function LeakCode(){
    var query  = document.myform.query.value;
    var finalQuery= query+"";
    var url = "https://searchcode.com/?q="+encodeURIComponent(finalQuery);
    window.open(url);
}


//BLOCK SCRIPT
function disableselect(e)
{
return false
}
function reEnable()
{
return true
}
//if IE4+
document.onselectstart=new Function ("return false")
 
//if NS6
if (window.sidebar)
{
document.onmousedown=disableselect
}

