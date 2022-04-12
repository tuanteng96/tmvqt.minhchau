import React from "react";
import {
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
} from "framework7-react";

import { getUser, removeUserStorage, setUserStorage } from "../constants/user";
import UserService from "../service/user.service";
import { setNotiID, getNotiID } from "./../constants/user";

import routes from "../js/routes";
import { NAME_APP } from "../constants/config";
import { CLOSE_APP } from "../constants/prom21";

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      // Framework7 Parameters
      f7params: {
        name: NAME_APP, // App name
        theme: "auto", // Automatic theme detection
        id: "vn.minhchaubeauty",
        // App routes
        routes: routes,
        on: {
          init: function () {
            const infoUser = getUser();
            if (infoUser) {
              UserService.getInfo().then((response) => {
                if (response.data.error) {
                  removeUserStorage();
                } else {
                  const data = response.data;
                  setUserStorage(data.token, data);
                }
              });
            }
            //console.log("Lần đầu mở App");
          },
          pageInit: function () {
            //console.log("Khi quay lại");
          },
        },
        view: {
          allowDuplicateUrls: true,
          routesBeforeEnter: function (to, from, resolve, reject) {
            resolve();
          },
        },
      },
    };
  }
  render() {
    return (
      <App params={this.state.f7params}>
        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />
      </App>
    );
  }

  notiDefault = (evt) => {
    if (Number(getNotiID()) !== Number(evt.data.id)) {
      setNotiID(evt.data.id);
      this.$f7.views.main.router.navigate(`/notification/${evt.data.id}`);
    }
  };

  notiCateProdID = (evt) => {
    this.$f7.views.main.router.navigate(`/shop/list/794/${evt.data.id}`);
  };

  notiProdID = (evt) => {
    this.$f7.views.main.router.navigate(`/shop/detail/${evt.data.id}`);
  };

  notiArtID = (evt) => {
    this.$f7.views.main.router.navigate(`/news/detail/${evt.data.id}`);
  };

  notiVoucher = (evt) => {
    this.$f7.views.main.router.navigate(`/voucher/`);
  };

  ToBackBrowser = () => {
    const { history } = this.$f7.views.main.router;
    if (history.length === 1 && history[0] === "/") {
      CLOSE_APP();
    } else {
      this.$f7.views.main.router.back();
    }
  };

  componentDidMount() {
    window.percent = 99;
    window.APP_READY = true;

    document.body.addEventListener("noti_click.go_noti", this.notiDefault);
    document.body.addEventListener("noti_click.prod_id", this.notiProdID);
    document.body.addEventListener("noti_click.art_id", this.notiArtID);
    document.body.addEventListener(
      "noti_click.cate_prod_id",
      this.notiCateProdID
    );
    document.body.addEventListener("noti_click.voucher_id", this.notiVoucher);
    window.ToBackBrowser = this.ToBackBrowser;
  }

  componentWillUnmount() {
    document.body.removeEventListener("noti_click.go_noti", this.notiDefault);
    document.body.removeEventListener("noti_click.prod_id", this.notiProdID);
    document.body.removeEventListener("noti_click.art_id", this.notiArtID);
    document.body.removeEventListener(
      "noti_click.cate_prod_id",
      this.notiCateProdID
    );
    document.body.removeEventListener(
      "noti_click.voucher_id",
      this.notiVoucher
    );
  }
}
