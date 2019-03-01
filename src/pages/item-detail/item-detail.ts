import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items } from '../../providers';
import { Materials } from '../../providers';
import { HttpServiceProvider } from '../../providers/api/soap-service';
import { Api } from '../../providers';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  loading;
  selectedPO: any;
  currentItems: Item[]=[];
  allItems: Item[]=[];
  poHeader: any;
  isApproved: boolean = false;
  constructor(public navCtrl: NavController, navParams: NavParams, public loadingCtrl: LoadingController, public items: Items,public api2: HttpServiceProvider, public modalCtrl: ModalController,public alertController: AlertController,public api: Api) {
    this.selectedPO = navParams.get('item') || items.defaultItem;
    this.poHeader = this.selectedPO.Ebeln;
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: false
    });
    this.loadPOItemData();
  }

  async loadPOItemData()
  {
    this.showSpinner();
    if(this.selectedPO.Status == "A")
      this.isApproved = true;
    let sapData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ZsusrPOItemData xmlns="http://podemosap.azurewebsites.net/saplogon.asmx"><Ponumber>${this.selectedPO.Ebeln}</Ponumber></ZsusrPOItemData></soap:Body></soap:Envelope>`;
    //this.presentAlert("Request Data: " + sapData);
    var returnData = await this.api2.makePostSoapRequest('ZsusrPOItemData', sapData);
    let retDataStr= returnData as string;
    //this.presentAlert("Response Data: " + retDataStr);
    if(retDataStr=="")
    {
     this.presentAlert("Request error !");
      return;
    }
    else
    {
      let parser = new DOMParser();
      let doc = parser.parseFromString(retDataStr, "application/xml");
      // var rsObj=doc.getElementsByTagName("soap:Envelope")[0].getElementsByTagName("soap:Body")[0] as HTMLElement;
      var listPOs = Array.from(doc.getElementsByTagName("Poitem")[0].childNodes);
      // var listPOCount = doc.getElementsByTagName("Poitem")[0].childNodes.length;
      var i=0;
      listPOs.forEach(function (poObj) {
        if(i==0)
        {
          i++;
          return;
        }
        var Ebeln = poObj.childNodes[0].textContent as string;
        var Ebelp = poObj.childNodes[1].textContent as string;
        var Knttp = poObj.childNodes[2].textContent as string;
        var Matnr = poObj.childNodes[3].textContent as string;
        var Maktg = poObj.childNodes[4].textContent as string;
        var Menge = poObj.childNodes[5].textContent as string;
        var Meins = poObj.childNodes[6].textContent as string;
        var Eindt = poObj.childNodes[7].textContent as string;
        var Netpr = poObj.childNodes[8].textContent as string;
        var itemJson ={
          "Ebelp": Ebelp,
          "Ebeln": Ebeln,
          "Knttp": Knttp,
          "Matnr": Matnr,
          "Maktg": Maktg,
          "Menge": Menge,
          "Meins": Meins,
          "Eindt": Eindt,
          "Netpr": Netpr
        };
  
        var item = new Item(itemJson);
        this.allItems.push(item);
      }.bind(this));
      this.currentItems = this.allItems;
      this.hideSpinner();
    }
  }

  public showSpinner() {
    this.loading.present();
  }

  public hideSpinner() {
    this.loading.dismiss();
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: false
    });
  }

  presentAlert(info) {
    let alert = this.alertController.create({
      title: 'Alert',
      subTitle: info,
      buttons: ['OK']
    });
    alert.present();
  }
  async doApprove(ponum:string,actionStr:string) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.showSpinner();
    let sapData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ZsusrPOApproveData xmlns="http://podemosap.azurewebsites.net/saplogon.asmx"><Apprej>${actionStr}</Apprej><Ponumber>${ponum}</Ponumber></ZsusrPOApproveData></soap:Body></soap:Envelope>`;
    //this.presentAlert("Request Data: " + sapData);
    var returnData = await this.api2.makePostSoapRequest('ZsusrPOApproveData', sapData);
    let retDataStr= returnData as string;
    //this.presentAlert("Response Data: " + retDataStr);
    if(retDataStr=="")
    {
     this.presentAlert("Request error !");
    }
    else
    {
      let parser = new DOMParser();
      let doc = parser.parseFromString(retDataStr, "application/xml");
      // var rsObj=doc.getElementsByTagName("soap:Envelope")[0].getElementsByTagName("soap:Body")[0] as HTMLElement;
      var statusObj = doc.getElementsByTagName("Status")[0] as HTMLElement;
      // alert(statusObj);
      if(statusObj != null)
      {
        var statusTxt= statusObj.textContent;
        if(statusTxt != "")
        {
          if(actionStr == "1")
          {
            this.isApproved = true;
           this.presentAlert("Approve succeed !");
          }
          if(actionStr == "2")
           this.presentAlert("Reject succeed !");
        }
        else
        {
          // var msgObj = doc.getElementsByTagName("Item")[0].getElementsByTagName("Message")[0].textContent as string;
          alert(`PO ${this.selectedPO.Ebeln} Already Approved`);
          
        }
      } 
    }
    this.hideSpinner();
  }
}
