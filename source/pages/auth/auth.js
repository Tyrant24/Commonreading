import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import { MemberApi } from '../../apis/member.api';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = true;
    this.Base.setMyData({ isgrantuser: false });
    this.Base.setMyData({ isgrantphonenumber: false, mobile: "" });
  }
  onMyShow() {
    var that = this;
  }
  checkPermission() {

  }

  getUserInfo(e) {
    //wx.redirectTo({
    //  url: '/pages/home/home',
    //});
    //open-type="getUserInfo" bindgetuserinfo="getUserInfo"
    AppBase.UserInfo.openid = undefined;
    wx.reLaunch({
      url: '/pages/home/home',
    })
  }
  phonenoCallback(phoneno, e) {
    console.log(phoneno);
    this.Base.setMyData({ isgrantphonenumber: true, mobile: phoneno });
  }
  gotoLogin() {
    var data = this.Base.getMyData();
    var memberapi = new MemberApi();
    memberapi.updatemobile({ mobile: data.mobile }, () => {
      
    })
    //updatemobile
    AppBase.UserInfo.openid=undefined;
    wx.reLaunch({
      url: '/pages/home/home',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getUserInfo = content.getUserInfo;
body.gotoLogin = content.gotoLogin;
Page(body)