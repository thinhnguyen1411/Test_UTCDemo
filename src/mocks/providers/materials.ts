import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Materials {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    
    let items = [
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
      },
      {
        "itemNo":"3",
        "accCate": "K",
        "material": "02XR45074344",
        "shortText": "Impeller",
        "quantity":"1",
        "orderUnit":"US",
        "deliverDate":"12.09.2018",
        "netPrice":"501"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
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

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
