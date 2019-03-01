import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Item } from '../../models/item';
import { Api } from '../../providers';
@Injectable()
export class Items {
  items: Item[] = [];
  materials: Item[] = [];
  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor(public api: Api) {
    let items = [
      {
        "serialNo":"1",
        "name": "Purchase Order no. 1",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Burt is a Bear.",
        "status":"pending",
        "createdDate":"12.02.2019",
        "createdTime":"9:10:24 AM",
        "price":"230",
        "quantity":"11",
        "OrderUnit":"AU",
        "NetValue":"00.00.00"
      },
      {
        "serialNo":"2",
        "name": "Purchase Order no. 2",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "Charlie is a Cheetah.",
        "status":"rejected",
        "createdDate":"12.02.2019",
        "createdTime":"9:10:24 AM",
        "price":"450",
        "quantity":"43",
        "OrderUnit":"AU",
        "NetValue":"00.00.00"
      },
      {
        "serialNo":"3",
        "name": "Purchase Order no. 3",
        "profilePic": "assets/img/speakers/duck.jpg",
        "about": "Donald is a Duck.",
        "status":"pending",
        "createdDate":"12.02.2019",
        "createdTime":"9:10:24 AM",
        "price":"178",
        "quantity":"3",
        "OrderUnit":"AU",
        "NetValue":"00.00.00"
      },
      {
        "serialNo":"4",
        "name": "Purchase Order no. 4",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "Eva is an Eagle.",
        "status":"approved",
        "createdDate":"12.02.2019",
        "createdTime":"9:10:24 AM",
        "price":"654",
        "quantity":"65",
        "OrderUnit":"EU",
        "NetValue":"00.00.00"
      },
      {
        "serialNo":"5",
        "name": "Purchase Order no. 5",
        "profilePic": "assets/img/speakers/elephant.jpg",
        "about": "Ellie is an Elephant.",
        "status":"rejected",
        "createdDate":"12.02.2019",
        "createdTime":"9:10:24 AM",
        "price":"550",
        "quantity":"90",
        "OrderUnit":"AU",
        "NetValue":"00.00.00"
      },
      {
        "serialNo":"6",
        "name": "Purchase Order no. 6",
        "profilePic": "assets/img/speakers/mouse.jpg",
        "about": "Molly is a Mouse.",
        "status":"pending",
        "createdDate":"12.02.2019",
        "createdTime":"9:10:24 AM",
        "price":"1221",
        "quantity":"66",
        "OrderUnit":"VN",
        "NetValue":"00.00.00"
      },
      {
        "serialNo":"7",
        "name": "Purchase Order no. 7",
        "profilePic": "assets/img/speakers/puppy.jpg",
        "about": "Paul is a Puppy.",
        "status":"pending",
        "createdDate":"12.02.2019",
        "createdTime":"9:10:24 AM",
        "price":"874",
        "quantity":"88",
        "OrderUnit":"US",
        "NetValue":"00.00.00"
      }
    ];

    let materials = [
      {
        "itemNo":"1",
        "accCate": "K",
        "material": "02XR45019596",
        "shortText": "Impeller",
        "quantity":"1",
        "orderUnit":"AU",
        "deliverDate":"12.09.2018",
        "netPrice":"50"
      },
      {
        "itemNo":"2",
        "accCate": "H",
        "material": "02XR454569111",
        "shortText": "Impeller",
        "quantity":"15",
        "orderUnit":"EU",
        "deliverDate":"12.09.2018",
        "netPrice":"502"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }

    for (let item2 of materials) {
      this.materials.push(new Item(item2));
    }
  }

  query(usrname?:string,params?: any) {
    // var headers = new Headers();
    // headers.append("Accept", 'application/soap+xml');
    // headers.append('Content-Type', 'application/soap+xml');
    // headers.append('Authorization', 'Bearer fb66b2ae-2eb6-310d-81f9-a836cca5a65c');
    // const requestOptions = new RequestOptions({ headers: headers });
    let postData = {
      "USERNAME":'NAKKALAU'
    }
  this.api.post('poheader/1.0/', JSON.stringify(postData)).subscribe(data => {
      let strData = JSON.stringify(data);
      console.log(strData);
      this.items = data["item"];
    }, error => {
      let strErr = JSON.stringify(error);
      console.log(strErr);
    });

    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  query2(params?: any) {
    if (!params) {
      return this.materials;
    }

    return this.materials.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
