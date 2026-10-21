const projects = [
{id:'elop',name:'ELOP',subtitle:'Purchasing, equipment & logistics',color:'#7460ce',icon:'◈'},
{id:'launch',name:'LAUNCH LA',subtitle:'School orders & innovation carts',color:'#267a74',icon:'↗'},
{id:'warehouse',name:'Pico Warehouse',subtitle:'Inventory, receiving & analysis',color:'#b77730',icon:'▦'},
{id:'transfers',name:'School Transfers',subtitle:'Equipment moving between schools',color:'#487bb6',icon:'⇄'},
{id:'vr',name:'ClassVR',subtitle:'Deployment, access & device tracking',color:'#9164aa',icon:'◎'},
{id:'apps',name:'Apps & Tools',subtitle:'Scanners, lookup tools & job aids',color:'#5d718b',icon:'⌘'},
{id:'edtech',name:'EdTech Inventory',subtitle:'Asset management & school inventory',color:'#398570',icon:'▤'},
{id:'pd',name:'PD Devices',subtitle:'Professional development laptops',color:'#ac6e84',icon:'▣'},
{id:'support',name:'25th Floor Support',subtitle:'Licensing, devices & office technology',color:'#6680a2',icon:'⊞'},
{id:'its',name:'ITS Projects',subtitle:'System upgrades & infrastructure',color:'#8a8350',icon:'⚙'}
];
const resources = [];
function add(title,url,groups,category='Reference',note='',flag=''){resources.push({id:'r'+(resources.length+1),title,url,projects:groups.split(','),category,note,flag});}
function sheet(title,book,gid,groups,category='Inventory',note='',flag=''){add(title,`https://docs.google.com/spreadsheets/d/${book}/edit?gid=${gid}#gid=${gid}`,groups,category,note,flag);}
const E='1dr570VJvddxzsTAERRUUeKRuE27WSFIWttpO-rvNmo0', L='1jWrPNLyDg8dGBs95ru5GiwIWovEMeAME-10kKH09odg', A='11QIVTBS1XOscOOvDWKYEtSnTLCCPewO2qKQo8S3b5f4', V='1vHcJfBZE1wdyaxRCG9tk-9OH73kcOLIifMJYGh4yjdI', H='1ypjdDcVAtarabWLasEoWvJN3YM4k_Pe7RNnR4K4eeTw';
sheet('2023–24 ELOP Purchases',E,'1056956109','elop','Purchasing');
sheet('2024–25 ELOP Purchases','1AE2uDe7lAH5buWjJNWkWWyWkLOAr0DbtnjLP3mm6qjw','135262776','elop','Purchasing');
sheet('Warehouse Inventory',E,'28156567','elop,warehouse','Inventory');
sheet('WH Inventory · 6.29.26',E,'877900497','elop,warehouse','Inventory','ELOP workbook tab; separate from the LAUNCH LA warehouse inventory.');
sheet('Non-Beaudry Items at Pico Warehouse',E,'306051168','elop,warehouse','Inventory');
sheet('Bundling Master',E,'306739542','elop','Operations');
sheet('Scanned Serials of Returned Items',E,'1405553675','elop','Devices');
sheet('Devices to Provision at Pico WH',E,'1504267254','elop','Devices');
sheet('Devices that Need Attention',E,'2013447275','elop','Devices','Repair / salvage');
sheet('Checklist / PRN',E,'1617121443','elop','Operations');
sheet('Pallets · Request / Drop / Return',E,'1471723518','elop','Operations');
sheet('ISTE Books Inventory',E,'1918676138','elop');
sheet('Beaudry to Pico · July 2026',E,'1514714467','elop','Transfers','Sol');
sheet('BD Mail Room to Pico · July 2026',E,'362753887','elop','Transfers','Sol');
sheet('Master Lookup',L,'658953664','launch','Reference');
sheet('School List',L,'1879552878','launch','Reference');
sheet('School Template',L,'201719541','launch','Reference');
add('Launch LA E-Shop','https://sites.google.com/lausd.net/launchlashop/home','launch','Web app','Customer facing');
sheet('Launch LA Inventory',L,'0','launch,warehouse');
sheet('Launch LA Orders',L,'354757045','launch','Orders');
sheet('LAUNCHLA Dashboard',L,'1173796555','launch','Dashboard');
sheet('Launch LA Approvals / School Orders Pallet Locations',L,'1780046857','launch','Orders','Both supplied labels point to this same tab.','Confirm whether approvals and pallet locations should have different links.');
sheet('After-School Innovation Cart Application · Responses','10SCbnlQnHJXf0T-KWjzeyskcqrw_KRmjujuF7XgZJ4w','534965077','launch','Forms & responses');
sheet('Materials Received from Schools',L,'1325314964','warehouse','Transfers');
sheet('Warehouse Inventory · 6.29.26',L,'1466500137','warehouse');
sheet('Plasencia Inventory',E,'1209279419','warehouse');
add("Pico Warehouse Inventory · Isabel’s",'https://lausd.sharepoint.com/:x:/r/sites/psd/_layouts/15/Doc.aspx?sourcedoc=%7B81c6fe55-352b-4b72-9ef2-d1b0d2ae184e%7D&action=edit&activeCell=%276.29.26%27!D736','warehouse','Inventory','SharePoint workbook; session-specific parameters removed.');
sheet('Warehouse Inventory Analysis · EdTech',A,'0','warehouse,edtech','Analysis');
sheet('Warehouse Inventory Analysis · 10.6.25',A,'690869186','warehouse','Analysis');
sheet('Warehouse Inventory Analysis · 6.29.26',A,'2048925685','warehouse','Analysis');
sheet('Warehouse Inventory Analysis · Consolidated',A,'223162966','warehouse','Analysis');
add('School-to-School Equipment Transfers · Old Forms','https://drive.google.com/drive/u/0/folders/1GR9zXek2GSvt6WLInMiaKASpE9Ge_WiE','transfers','Folder','Legacy Google Forms');
sheet('ELOP Equipment Bulk Transfers','1rfd9vKtDhD4UeYtFOi1GD2Mb3osIcKTiLR3fiQlc--Y','866466855','transfers,elop','Transfers');
add('LAUSD ELOP Equipment Scanner','https://script.google.com/macros/s/AKfycby5YeTlxXEepyuRL0-mfXeiUNFwWtzeOPIJtQENDqaNSwcAZI7OhsWTFW5sVDcoWk1I/exec','transfers,apps,elop','Web app','ELOP barcode scanner and inventory application');
add('ClassVR Deployment Plan','https://docs.google.com/document/d/1o-4bo-VWzD2l2d_llvqijNGUXkJIgb5sRIMlg608N1E/edit?tab=t.0','vr','Deployment');
sheet('ClassVR MAC Addresses & Serials / Dashboard',V,'209414636','vr','Devices','Received from Avantis. “Class VR Dashboard” uses this same tab.','Confirm whether the dashboard should have a different link.');
sheet('ClassVR Report · Master Data',V,'1268037393','vr','Inventory');
add('ClassVR Tracker & Notes','https://docs.google.com/document/d/1SslKDS-8AtIrgrGlgCoUatQnMGytrLFrB6RdeZoaLHc/edit?usp=drive_link','vr','Deployment','TRR / deployment');
add('ClassVR Login','https://portal.classvr.com/classvr/login.cfm','vr','Web app');
sheet('ClassVR Access · Responses','1ctpIBR2oXiwdZPw4Uxr4QsscavE1H53uSAG1OG65lKA','1337716022','vr','Forms & responses','Repeated response links combined.');
sheet('VR Headsets · May 2026 · Form Responses',H,'1012849996','vr','Forms & responses','Sol; repeated links combined.');
sheet('ClassVR Licenses · School List','1uppYZ0sBk0eLFq_g1qG4lmagnb85Nl5c2BabnuSublk','1563957576','vr','Licensing');
add('ClassVR Access · Google Form','https://docs.google.com/forms/d/13qaL-tP8NazNQ3nSib3aighbIlY5wZPfeJ1dvCRde7k/edit?ts=6aa96817','vr','Forms & responses','Form editor');
add('LAUSD–ClassVR Shared Drive','https://drive.google.com/drive/folders/0AKOSnscohEmVUk9PVA','vr','Folder','Iben');
sheet('MAC List · ClassVR IoT','1triGQdVFPEA_s8RGgiWt_u3w82nkEYXEGjoAIIR09f8','0','vr','Devices','Iben / old: both supplied entries use the same destination.');
add('LAUSD–AreyJones Shared Drive','https://drive.google.com/drive/folders/1FOV_otrZjkSyrMhuRWMrlRNmrPUoh7tw?usp=drive_link','vr','Folder','Iben');
add('Action Items · AJ LAUSD ClassVR','https://docs.google.com/document/d/1vCikaqezcZqaA0feXyj8hGD2Cmg8LEB7YpiDEGPqLg8/edit?usp=drive_link','vr','Deployment');
sheet('VR Headsets · May 2026 · Serial Numbers',H,'2129110066','vr','Devices');
add('ClassVR MAC Address Collection','https://drive.google.com/drive/u/0/folders/1x79xz8jYCOc0nGdcmfiW6rKEKqy-3v0E','vr','Folder');
sheet('ClassVR MACs · Master Inventory Database','1sk4XYmvULx5fDtsd-UIB1z84WmVOXocMgIhCx5pyAV4','1254015524','vr','Inventory','8 stations');
add('ClassVR Scanner Application Folder','https://drive.google.com/drive/folders/1MEwz9RJI4LPZXO4qLdk2kVuIkA9-SiQg','vr,apps','Folder','MAC address extraction tool · macOS only');
add('ClassVR Scanner App','https://drive.google.com/file/d/1OqPS3KbTCMfc_AFfS5OLuxBOfbnONyq3/view?usp=drive_link','vr,apps','Download','macOS only');
add('ClassVR Scanner App · Job Aid','https://drive.google.com/file/d/13k5zEC9IKRcjPS1iUXCssBBFCy5bvg0_/view?usp=drive_link','vr,apps','Reference');
add('Platform Tools · Android SDK','https://drive.google.com/file/d/1uXoIgCQ2vb0fIlWRr2vfibgtYJRNquon/view?usp=drive_link','vr,apps','Download');
add('Pico Warehouse Inventory Lookup','https://script.google.com/a/macros/lausd.net/s/AKfycbwp17uPztYzihyUCgMsAnF0uX8fMMDlHjCBupBLWgkq9dVd9xqMIvr7_9_hojsA8J00/exec','apps,warehouse','Web app');
add('EdTech CEI','https://lausd-my.sharepoint.com/:x:/r/personal/sxa3533_lausd_net/_layouts/15/doc2.aspx?sourcedoc=%7Bce7401b2-55ae-4698-9a37-319e8ad6dfdb%7D&action=edit&activeCell=%27School%20Inventory%27!C16','edtech','Inventory','SharePoint workbook; session-specific parameters removed.');
sheet('EdTech Asset Management · Inventory (Active)','1jsrt1P1BqH82FZptT92E0FmAmBPGlujUDl6orU7wtXE','261747403','edtech');
sheet('EdTech PD Laptops','1GLPWrrP9ROwhPU3ZZJUggtvnnHPyUbvb-RUwLZ0nRlw','1943099109','pd','Devices');
sheet('Toshiba Copiers & Network Layout · 25th Floor','1mBfr3N4KsBqgSjo49a-qTRJM5LmQHVzmvIOeEUC7E4w','2072656925','support','Reference');
add('Adobe Licensing','https://drive.google.com/drive/u/0/folders/16BXxTj85YWFV4-o74oD9sovokzreycLm','support','Folder');
add('Adobe Creative Cloud License Request · DOI','https://docs.google.com/forms/d/1GmWy2kggtqOydzYF3nZe7gUFugo6tDzfXEFIDAM_zmo/edit','support','Forms & responses','Form editor');
sheet('DOI Creative Cloud Requests · Responses','1Q31KvRO9rGgxwKDtX8NhPsdZMIOBPX1PjA9aJT6nkhY','964593573','support','Forms & responses');
sheet('Salvage · 25th Floor · 2026–27','1v-U3N4rJqld4PdXd6RDtPMhnA0mhObQLqt0xH4TGk_E','1193289432','support','Devices');
sheet('DOI Device Distribution · 2025–26 Funds','1OxoAQq6hlKF-U2x7tgozycagq3QQ5A1MDBh3dHUYDM8','0','support','Devices');
sheet('Windows 10 to 22 Upgrade','1a29_1nim1Buj_2_3BB6FT0UeRi1UPckli32-HPBJKhc','556864863','its','Deployment','Title preserved from your source list.');
