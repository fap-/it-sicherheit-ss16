L_H_APP = "MSN+Hotmail";
H_URL_BASE = "http://help.msn.com/EN_US";
H_CONFIG = "MSN_Hotmail_PIMv9.ini";
bSearch = false;var L_SignInAB_Text="Sign in"
var L_SignInABcont_Text="Sign In to Messenger"
var L_IsOnline_Text="Online"
var L_IsOffline_Text="Offline"
var L_IsBusy_Text= "Busy"
var L_IsAway_Text="Away"
var L_IsBRB_Text="Be Right Back"
var L_IsOnThePhone_Text="On The Phone"
var L_IsOutToLunch_Text="Out To Lunch"
var L_UseWithMSNmessenger_Text="Use with MSN Messenger"
var L_DloadMess_Text="Download MSN Messenger"
var L_DloadMessCont_Text=" to see who is online, exchange instant messages, and more!"
var AddMessengerContact=LocalUserEmail=""
function MsngrCreateObj() {
MsngrObj=new ActiveXObject("MSNMessenger.HotmailControl");
LocalUserEmail=HMname.innerText.replace(/\s+/g,"");
}
function MsngrIsStateOnline(state)
{
return ",2,6,10,14,18,34,50,66,".indexOf(","+state+",") != (-1)
}
function MsngrGetContact(eM,loc)
{
var ret;
var img;
var msg;
var CS=MsngrObj.GetUserStatus(eM);
switch (CS)
{
case 1:
img=1
msg=L_IsOffline_Text
break;
case 2:
img=0
msg=L_IsOnline_Text
break;
case 10:
img=3
msg=L_IsBusy_Text
break;		
case 14:
img=2
msg=L_IsBRB_Text
break;	
case 18:
case 34:
img=2
msg=L_IsAway_Text
break;
case 50:
img=3
msg=L_IsOnThePhone_Text
break;		
case 66:
img=2
msg=L_IsOutToLunch_Text
break;
}
if (loc=="InBox")
ret='<A HREF="JavaScript:MIM(%22' + eM + '%22)"><IMG alt="" src="http://65.54.244.24/icon_messenger'+img+'.gif" border=0></a>';
else if (loc=="AddressBookList")
{
if (CS==1)
ret='&nbsp;&nbsp;&nbsp;<A href="#" onclick="DC();return false;"><IMG alt="" src="http://65.54.244.24/icon_messenger'+img+'.gif" border=0></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
else
ret='&nbsp;&nbsp;&nbsp;<A HREF="JavaScript:MIM(%22' + eM + '%22)"><IMG alt="" src="http://65.54.244.24/icon_messenger'+img+'.gif" border=0></a>&nbsp;&nbsp;&nbsp;&nbsp;';
}
return ret;
}
function MIM(eM)
{
if (MsngrIsStateOnline(MsngrObj.GetLocalUserStatus()) && MIU())
{
if ( MsngrIsStateOnline(MsngrObj.GetUserStatus(eM)) && (LocalUserEmail != eM))
MsngrObj.InstantMessage(eM);
else
MsngrObj.ShowContactList();
}
else
MsngrObj.Signin(LocalUserEmail);
}
function MCont() {
CA(1);  
var DTa=document.all.ListTable;
var Tms=IsMessengerMigrated?L_SignInAB_Text:L_SignInABcont_Text;
if (MsngrIsStateOnline(MsngrObj.GetLocalUserStatus()) && MIU())
{
for (i=2; i<DTa.rows.length+-1; i++)
{
var TC=DTa.rows[i].cells[1];
if (DTa.rows[i].name)
{
var E=DTa.rows[i].name.toLowerCase();
if (MsngrObj.GetUserStatus(E)!=0)
TC.innerHTML=MsngrGetContact(E,"AddressBookList");
}
}
}
else
document.all.MEP.innerHTML="<a href='JavaScript:MsngrObj.Signin(\""+LocalUserEmail+"\");'>"+Tms+"</a>";
}
function MContPROMO()
{
CA(1);  
var DTa=document.all.ListTable;
DTa.rows[0].cells[0].innerHTML="<a href='http://g.msn.com/1HM9EN/144??PS=??PS="+HMPS+"'>"+L_DloadMess_Text+"</a>"+L_DloadMessCont_Text;
}
function MIB()
{
CA(1); 
var DTa;
if (MsngrIsStateOnline(MsngrObj.GetLocalUserStatus()))
{
DTa=document.all.MsgTable;
for (i=1; i<DTa.rows.length; i++)
{
if (DTa.rows[i].cells.length>=6)
{
for (n=0;n<DTa.rows[i].cells.length;n++)
{
if (DTa.rows[i].cells[n].innerHTML.indexOf("href")!=-1)
DTa.rows[i].cells[n].children[0].href = DTa.rows[i].cells[n].children[0].href.replace(/javascript:G\(\'|\'\)/ig,"")+"&"+_UM;
}
var E=DTa.rows[i].name;
E=E.replace(/\s+/g,"");
if (MsngrIsStateOnline(MsngrObj.GetUserStatus(E)))
DTa.rows[i].cells[MessengerCell].innerHTML=MsngrGetContact(E,"InBox");
}
}
}
else
BFX();
}
function MIR()
{
if (MsngrIsStateOnline(MsngrObj.GetLocalUserStatus()) && MIU() && MsngrIsStateOnline(MsngrObj.GetUserStatus(document.all.FromText.value.toLowerCase())) )
{
var TableData=document.all.HMTB.rows[1].children[0].children[0];
var SC=TableData.rows[0].insertCell(2);
var DC=TableData.rows[0].insertCell(3);
SC.style.paddingLeft="1px";
SC.innerHTML='|';
DC.className="P";
DC.onclick=IR;
DC.onmouseover=OMO;
DC.onmouseout=OMOU;
DC.innerHTML='<img src="http://65.54.244.24/i.p.instantreply.gif" border=0 align="absmiddle" hspace="1"> Instant Reply';
}
}
function IR()
{MIM(document.all.FromText.value.toLowerCase());}
function OMO()
{
if (window.event.srcElement.tagName == "IMG")
event.srcElement.parentElement.className="T";
else
event.srcElement.className="T";
}
function OMOU()
{
if (window.event.srcElement.tagName == "IMG")
event.srcElement.parentElement.className="T";
else
event.srcElement.className="P";
}
function MECo()
{
document.addr.alias.focus();
var strIM=document.addr.addrim.value.toLowerCase();
if ( ( (IsABmigrationComplete!="0") && (ContactType!="messenger") && (isMessengerMigrated=="0") ) || ( (IsABmigrationComplete!="0") && (isMessengerMigrated=="1") ) && MsngrIsStateOnline(MsngrObj.GetLocalUserStatus()))
{
var DataCell=document.all.MsngrCell;
if (ValidateEmail(strIM) && MsngrObj.GetUserStatus(strIM) &&  IsManagedRestrictedUser!="1")
DataCell.innerHTML="<input type='checkbox' name='msngr' checked> <font color='#000000'><input type='hidden' name='msngrVisible' value='1'>"+L_UseWithMSNmessenger_Text+"</font>";
else if (ValidateEmail(strIM) && IsManagedRestrictedUser!="1")
DataCell.innerHTML="<input type='checkbox' name='msngr'> <font color='#000000'><input type='hidden' name='msngrVisible' value='1'>"+L_UseWithMSNmessenger_Text+"</font>";
else if (IsManagedRestrictedUser=="1")
{
DataCell.innerHTML="<input type='checkbox' name='msngr' disabled> <font color='#8D8D8D'><input type='hidden' name='msngrVisible' value='1'>"+L_UseWithMSNmessenger_Text+"</font>";
if (MsngrObj.GetUserStatus(strIM))
document.addr.msngr.checked=true;
}
else
DataCell.innerHTML="<input type='checkbox' name='msngr' disabled> <font color='#8D8D8D'><input type='hidden' name='msngrVisible' value='1'>"+L_UseWithMSNmessenger_Text+"</font>";
document.addr.addrim.readOnly=false;
document.addr.alias.focus();
}
}
function MAd()
{
if ("undefined" != typeof(MsngrObj) && MsngrIsStateOnline(MsngrObj.GetLocalUserStatus()) && MsngrObj.GetUserStatus(AddMessengerContact) == 0)
MsngrObj.AddContact(LocalUserEmail,AddMessengerContact);
}
function MIU()
{
return MsngrObj.IsUser(LocalUserEmail);
}var MOL=new Array(); 
function MenuObj(_A,_B,_C,_D,_E,_F,_G,_H,_I)
{
this.name=_A;
this.bOn=_E;
this.bOf=_F;
this.bA=_G;
this.SBS=SBS;
this.showing=false;
this.TM=TM;
document.onclick=MCH;
this.Direction=_I;
MOL[MOL.length]=this;
this.divObj=eval('document.all.' + _B);
this.divStyleObj=eval('document.all.' + _B + '.style');
this.refTDObj=eval('document.all.' + _C);
if (_D)
this.DdTDObj=eval('document.all.' +  _D);
this.frmObj=eval('document.all.' +  _H);
this.strShow='visible';
this.strHide='hidden';
}
function ROP(ObjRef)
{
var theObj=null;
if (ObjRef)
{
if (typeof ObjRef != 'object')
theObj=eval(ObjRef);
else
theObj=ObjRef;
return theObj;
}
else
return false;
}
function TM()
{
if (!this.showing)
{
var RelObjCords=getXY(this.refTDObj);
if (this.Direction)
{
this.divStyleObj.top = this.frmObj.style.top = RelObjCords.top + -this.divObj.offsetHeight;
this.divStyleObj.left = this.frmObj.style.left = RelObjCords.left;
}
else
{
this.divStyleObj.top = this.frmObj.style.top = RelObjCords.top + 18;
this.divStyleObj.left = this.frmObj.style.left = RelObjCords.left;
}
this.frmObj.style.height=this.divObj.offsetHeight;
this.frmObj.style.width=this.divObj.offsetWidth;
var pCurrMenuObj=ROP(this);
CM(this);
this.SBS('clicked');
this.divStyleObj.visibility = this.frmObj.style.visibility = this.strShow;
this.showing=true;
}
else
{
this.divStyleObj.visibility = this.frmObj.style.visibility = this.strHide;
this.showing=false;
this.SBS();
}
}
function CM(callerObj)
{
for (aIndex=0;aIndex < MOL.length; aIndex++)
{
if ((callerObj) && (callerObj.name != MOL[aIndex].name))
{	
if (MOL[aIndex].showing)
{
MOL[aIndex].TM();
MOL[aIndex].SBS();
}
}
else
{
if (MOL[aIndex].showing)
{
MOL[aIndex].TM();
MOL[aIndex].SBS();
}
}
}
}
function MCH(e, srcObj, srcIsMenuDiv)
{
var srcElem;
if (!e)
var e=window.event;
e.cancelBubble=true;
if (srcObj)
{
var pCurrMenuObj=ROP(srcObj); 
if (!srcIsMenuDiv)
pCurrMenuObj.divObj.onclick="MCH(event,"+srcObj+",true)";
pCurrMenuObj.TM();
}
else
CM();
}
function MME(e, srcObj)
{
try
{
if (!e) 
var e=window.event;
var pCurrMenuObj=ROP(srcObj);
if (!pCurrMenuObj.showing)
{
if (e.type == 'mouseover')
pCurrMenuObj.SBS('on');
else if ((e.type == 'mouseout') || (e.type == 'blur'))
pCurrMenuObj.SBS();
}
}
catch(e){}
}
function SBS(wS)
{
if (typeof this.refTDObj != "undefined")
{
if (wS == 'on')
{
if (this.bOn)
{
if (typeof this.DdTDObj != "undefined")
this.DdTDObj.className=this.bOn;
this.refTDObj.className=this.bOn;
}
}
else if (wS == 'clicked')
{
if (this.bA)
{
if (typeof this.DdTDObj != "undefined")
this.DdTDObj.className=this.bA;
this.refTDObj.className=this.bA;
}
}
else
{
if (this.bOf)
{
if (typeof this.DdTDObj != "undefined")
this.DdTDObj.className=this.bOf;
this.refTDObj.className=this.bOf;
}
}
}
}
function getXY(Obj) 
{
for (var sumTop=0,sumLeft=0;Obj!=document.body;sumTop+=Obj.offsetTop,sumLeft+=Obj.offsetLeft, Obj=Obj.offsetParent);
return {left:sumLeft,top:sumTop}
}
function MO(e)
{
if (!e)
var e=window.event;
var S=e.srcElement;
while (S.tagName!="TD")
{S=S.parentElement;}
S.className="T";
}
function MU(e)
{
if (!e)
var e=window.event;
var S=e.srcElement;
while (S.tagName!="TD")
{S=S.parentElement;}
S.className="P";
}
function MOD(e)
{
if (!e)
var e=window.event;
var S=e.srcElement;
while (S.tagName!="TD")
{S=S.parentElement;}
S.className="S";
}
function MUD(e)
{
if (!e)
var e=window.event;
var S=e.srcElement;
while (S.tagName!="TD")
{S=S.parentElement;}
S.className="R";
}
function MO_D(e)
{
if (!e)
var e=window.event;
var S=e.srcElement;
while (S.tagName!="TD")
{S=S.parentElement;}
S.className="X";
}
function MU_D(e)
{
if (!e)
var e=window.event;
var S=e.srcElement;
while (S.tagName!="TD")
{S=S.parentElement;}
S.className="W";
}
function MOD_D(e)
{
if (!e)
var e=window.event;
var S=e.srcElement;
while (S.tagName!="TD")
{S=S.parentElement;}
S.className="Y";
}
function MUD_D(e)
{
if (!e)
var e=window.event;
var S=e.srcElement;
while (S.tagName!="TD")
{S=S.parentElement;}
S.className="Y";
}function DoHL()
{
var e=window.event.srcElement;
while (e.tagName!="TR"){e=e.parentElement;}
if (e.className!='SL') e.className='HL';
}
function DoLL()
{
var e=window.event.srcElement;
while (e.tagName!="TR"){e=e.parentElement;}
if (e.className!='SL')	e.className='';
}
function DoSL()
{
var TB=e=window.event.srcElement;
while (TB.tagName!="TABLE")
{TB=TB.parentElement;}
for (var i=0;i<TB.rows.length;i++){TB.rows[i].className='';}
while (e.tagName!="TR"){e=e.parentElement;}
e.className='SL';
}function DoEmpty(){
if (Err("150995663",true))
G("http://by1fd.bay1.hotmail.msn.com/cgi-bin/HoTMaiL?DoEmpty=1");
}
function Subm(act,first,dosub,e)
{
if (act=='delete')
{
if (!e)	var e=window.event;
e.cancelBubble=true;
}
if (act=='notbulkmail')
frm.action="/cgi-bin/notbulk";
else if (act=='blocksender')
{
frm.action="/cgi-bin/kill";
frm.ReportLevel.value="0";
}
else if (act=='report')
{
frm.action="/cgi-bin/kill";
frm.ReportLevel.value="1";
}
else if (act=='report_n_block')
{
frm.action="/cgi-bin/kill";
frm.ReportLevel.value="2";
}
num=((first) ? slct1st(frm) : numChecked(frm));
if (num>0)
{
frm._HMaction.value=act;
if (dosub)
frm.submit();
}
else
Err("150995653");
}
function PI(act,first,dosub,selValue)
{
if(selValue=="CreateFolder")
G("/cgi-bin/dofolders?Create.x=Create&from=inbox");
else
{
frm.tobox.value=selValue;
Subm(act,first,dosub);
}
}
function numChecked()
{
j=0;
for(i=0;i<frm.length;i++)
{
e=frm.elements[i];
if (e.type=='checkbox' && e.name != 'allbox' && e.checked)
j++;		
}
return j;
}
function slct1st()
{
j=0;
for(i=0;i<frm.length;i++)
{
e=frm.elements[i];
if (e.type=='checkbox' && e.name != 'allbox' && e.checked)
if(j==1) e.checked=false;
else j=1;
}
return j;
}function Mail(strCmd,e)
{
EncFields();
switch (strCmd)
{
case "Send":
if (!e)	var e = window.event;
e.cancelBubble = true;
if (e.stopPropagation) e.stopPropagation();
Send();
break;
case "Cancel":
Cancel();
break;
case "Save":
Save();
break;
case "AttachFile":
case "AttachContact":
case "RemoveFile":
Attachment(strCmd);
break;
case "Bcc":
ShowBcc();
break;
case "High":
case "Low":
Importance(strCmd);
break;
case "AddOrigonalText":
AOT();
break;
case "SpellChk":
case "Dictionary":
case "Thesaurus":
LangTool(strCmd);
break;
case "RTE":
TogRTE();
break;
}
}
function Importance(strCmd)
{
var HighDataTD = document.all.HighTD;
var LowDataTD = document.all.LowTD;
if (strCmd=="High")
{
if (IStatus=="" || IStatus=="L")
{
HighDataTD.className='T';
LowDataTD.className='P';
IStatus=frm.importance.value="H";
}
else
{
HighDataTD.className='P';
IStatus=frm.importance.value="";
}
}
else
{
if (IStatus=="" || IStatus=="H")
{
LowDataTD.className='T';
HighDataTD.className='P';
IStatus=frm.importance.value="L";
}
else
{
LowDataTD.className='P';
IStatus=frm.importance.value="";
}
}
}
function SIG()
{
if (frm.sigflag.value && document.hiddentext.sigtext.value.length > 0)
{
if (document.hiddentext.sigtext.value.match(/<html>/)!=null)
{
var _frame = XformFrame.document;
_frame.designMode="on";
_frame.open("text/html","replace");
_frame.write(document.hiddentext.sigtext.value);
_frame.close();
frm.body.value += '\r\n\r\n';
frm.body.value += _frame.body.innerText;
_frame.body.innerHTML="";
}
else
{
frm.body.value = '\r\n\r\n'+document.hiddentext.sigtext.value+'\r\n\r\n'+frm.body.value;
}
}
}
function DRFT()
{
if (document.hiddentext.drafttext.value.match(/<html>/)!=null)
{
var _frame = document.XformFrame.document;
_frame.designMode="on";
_frame.open("text/html","replace");
_frame.write(document.hiddentext.drafttext.value);
_frame.close();
frm.body.value += _frame.body.innerText;
_frame.body.innerHTML="";
}
else
{
frm.body.value += document.hiddentext.drafttext.value;
}
}
function FTF() 
{
iCount = 0;
if (document.activeElement != frm.to) 
{
if (iCount >= 0 && iCount < 10) 
{
frm.to.focus();
iCount++;
}
setTimeout("FTF()",0)
}
}
function setIt(H)
{
qF=H;
document.ToInd.src = document.CcInd.src = document.BccInd.src = 'http://65.54.244.24/spacer.gif';
if (H=="to")
document.ToInd.src = 'http://65.54.244.24/i.p.toarrow.gif';
if (H=="cc")
document.CcInd.src ='http://65.54.244.24/i.p.toarrow.gif';
if (H=="bcc")
document.BccInd.src = 'http://65.54.244.24/i.p.toarrow.gif';
}
function MIT(qaName){
if (frm.elements[qF].value.length == 0 || frm.elements[qF].value.indexOf(qaName) == -1) 
{
if (frm.elements[qF].value.length != 0 && frm.elements[qF].value.charAt(frm.elements[qF].value.length - 1) != ",")
frm.elements[qF].value += ",";
frm.elements[qF].value += qaName;
}
}var aCh="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var dCh="0123456789";
var asCh=aCh + dCh + "!\"#$%&'()*+,-./:;<=>?@[\]^_`{}~";
var folderID="";
ie=document.all?1:0
function G(UR)
{
if (!e)
var e=window.event;
if (e)
e.cancelBubble=true;
if(UR)
location.href=UR+"&"+_UM;
}
function CallPaneHelp(a,b){CPH(a,b)}
function CPH(T,TD) {
if (T.indexOf(".htm")<0) {
bSearch=true;
H_KEY=T;
L_H_TEXT=TD;
} else { 
bSearch=false;
H_TOPIC=T;
}
DoHelp();
}
function isAlphaNum(S){
var AlphaNum=aCh + dCh;
for (var i=0; i < S.length; i++)
{
if (AlphaNum.indexOf(S.charAt(i)) == -1)
return false;
}
return true;
}
function isASCII(S){
for (var i=0; i < S.length; i++)
{
if (asCh.indexOf(S.charAt(i)) == -1)
return false;
}
return true;
}
function ValidateEmail(S)
{
var R=false;
if (typeof(S) != "undefined")
{
if (/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(S))
R=S;
}
return R;
}
function ValidateLooseEmail(S){
var resultS=S.replace(/ /gi, "");
var atIndex  =resultS.indexOf("@");
var dotIndex =resultS.lastIndexOf(".");
if( resultS == "" || !isASCII(resultS) || dotIndex == -1)
return "";
if ( resultS.lastIndexOf("@") != atIndex || resultS.charAt(atIndex+1) == ".")
return "";
if ( atIndex <= 0 || dotIndex < atIndex ||  dotIndex >= resultS.length-1)
return "";
return resultS;
}
function ValidateDomain(S){
var resultS=S.replace(/ /gi, "");
var atIndex  =resultS.indexOf("@");
var dotIndex =resultS.lastIndexOf(".");
if( resultS=="" || !isASCII(resultS) || dotIndex == -1)
return "";
if ( atIndex > 0 || resultS.charAt(atIndex+1) == "." || dotIndex >= resultS.length-1 )
return "";
return resultS.replace(/@/i, "");
}
function isEmail(S) {
var pass=0;
if (window.RegExp) {
var tempS="a";
var tempReg=new RegExp(tempS);
if (tempReg.test(tempS)) pass=1;
}
if (!pass)
return (S.indexOf(".") > 2) && (S.indexOf("@") > 0);
var r1=new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
var r2=new RegExp("^[a-zA-Z0-9\\.\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\}\\~]*[a-zA-Z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\}\\~]\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
return (!r1.test(S) && r2.test(S));
}
function BFX()
{
DTa=document.all.MsgTable;	
for (i=1;i<DTa.rows.length;i++)
{
for (n=0;n<DTa.rows[i].cells.length;n++)
{
if (DTa.rows[i].cells[n].innerHTML.indexOf("href")!=-1)
DTa.rows[i].cells[n].children[0].href = DTa.rows[i].cells[n].children[0].href.replace(/javascript:G\(\'|\'\)/ig,"")+"&"+_UM;
}
}
}
function CA(isO,noHL){
var trk=0;
for (var i=0;i<frm.elements.length;i++)
{
var e=frm.elements[i];
if ((e.name != 'allbox') && (e.type=='checkbox'))
{
if (isO != 1)
{
trk++;
e.checked=frm.allbox.checked;
var NotBulkButton=document.all.NotBulkB;
if (frm.allbox.checked)
{
if (!noHL)
hL(e);
if ((folderID == "F000000005") && (trk > 1))
{
NotBulkButton.className='R';
NotBulkButton.children[0].src="http://65.54.244.24/i.p.notjunk.d.gif";
IsNotBulkEnabled=false;
}
}
else
{
if (!noHL)
dL(e);
if (folderID == "F000000005")
{
NotBulkButton.className='P';
NotBulkButton.children[0].src="http://65.54.244.24/i.p.notjunk.gif";
IsNotBulkEnabled=true;
}
}
}
else
{
e.tabIndex=i;
if (folderID != "")
{
var ee=e;
while (ee.tagName!="TR")
{ee=ee.parentElement;}
ee.children[ColspanSize].children[0].tabIndex=i;
}
if (!noHL)
{
if (e.checked)
hL(e);
else
dL(e);
}
}
}
}
}
function CCA(CB,noHL){
if (!noHL)
{
if (CB.checked)
hL(CB);
else
dL(CB);
}
var TB=TO=0;
for (var i=0;i<frm.elements.length;i++)
{
var e=frm.elements[i];
if ((e.name != 'allbox') && (e.type=='checkbox'))
{
TB++;
if (e.checked)
TO++;
}
}
if (folderID == "F000000005")
{
var NotBulkButton=NotBulkButton1=document.all.NotBulkB;
NotBulkButton.className=(TO>1)?'R':'P';
NotBulkButton.children[0].src=(TO>1)?"http://65.54.244.24/i.p.notjunk.d.gif":"http://65.54.244.24/i.p.notjunk.gif";
IsNotBulkEnabled=(TO>1)?false:true;
}
frm.allbox.checked=(TO==TB)?true:false;
}
function doTabIndex(tbleColl)
{
if (tbleColl != null)
{
for (var z=0;z<tbleColl.length;z++)
{
if ((tbleColl.item(z).tagName=='A') || ((tbleColl.item(z).tagName=='INPUT') && (tbleColl.item(z).type!='hidden')) || (tbleColl.item(z).tagName=='SELECT'))
tbleColl.item(z).tabIndex=5;
}
}
}
function Err(Err,bC,EP)
{
bC=bC?1:0;
if (!EP)
EP="";
var UR="http://by1fd.bay1.hotmail.msn.com/cgi-bin/dasp/error_modalshell.asp?Err="+Err+"&IsConf="+bC+"&"+EP;
var RV=OW("Error","399","217","","","no","no","no","no","no",UR,"modal");
if ( !RV.help && !RV.url )
return RV.state;
if (RV.help)
CPH(RV.help);
if (RV.url)
{
if ('undefined' != typeof(DoSaveMSG) )
DoSaveMSG(RV.url);
else
location.href=RV.url;
}
}
function DE(D)
{
var R="";
for (var i=0;i<D.length;i++)
{
if (D.charCodeAt(i)>=128)
R += "&#"+D.charCodeAt(i)+";";
else
R += D.charAt(i);
}
return R;
}
function OW(strName,iW,iH,TOP,LEFT,R,S,SC,T,TB,URL,TYPE,dArg)
{
if (TYPE=="modal" || TYPE=="modalIframe")
{
var sF=""
var _rv
sF+=T?'unadorned:'+T+';':'';
sF+=TB?'help:'+TB+';':'';
sF+=S?'status:'+S+';':'';
sF+=SC?'scroll:'+SC+';':'';
sF+=R?'resizable:'+R+';':'';
sF+=iW?'dialogWidth:'+iW+'px;':'';
sF+=iH?'dialogHeight:'+iH+'px;':'';
sF+=TOP?'dialogTop:'+TOP+'px;':'';
sF+=LEFT?'dialogLeft:'+LEFT+'px;':'';
if (TYPE=="modal")
_rv=window.showModalDialog(URL+"&r="+Math.round(Math.random()*1000000),dArg?dArg:"",sF);
else
{
var da=new Object()
da.w=iW;
da.h=iH;
da.url=URL;
_rv=window.showModalDialog("/cgi-bin/dasp/ModalIframe.asp?r="+Math.round(Math.random()*1000000),da,sF);
}
if ("undefined" != typeof(_rv) )
return _rv;
}
else
{
var sF=""
sF += iW?'width='+iW+',':'';
sF+=iH?'height='+iH+',':'';
sF+=R?'resizable='+R+',':'';
sF+=S?'status='+S+',':'';
sF+=SC?'scrollbars='+SC+',':'';
sF+=T?'titlebar='+T+',':'';
sF+=TB?'toolbar='+TB+',':'';
sF+=TB?'menubar='+TB+',':'';
sF+=TOP?'top='+TOP+',':'';
sF+=LEFT?'left='+LEFT+',':'';
var HMW=window.open(URL?URL:'about:blank',strName?strName:'',sF);
if ( (document.window != null) && (!HMW.opener) )
HMW.opener=document.window;
HMW.focus();
}
}
function hL(E){
while (E.tagName!="TR")
{E=E.parentElement;}
E.className="H";
}
function dL(E){
while (E.tagName!="TR")
{E=E.parentElement;}
E.className="";
}
