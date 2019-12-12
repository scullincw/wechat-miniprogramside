var base64 = require("../images/base64");
Page({
    onLoad: function(){
        this.setData({
            icon: base64.icon20,
            slideButtons: [{
              text: '删除',
              extClass: 'delete'
            },{
              text: '测试测试',
              extClass: 'test'
            }],
        });
    },
    slideButtonTap(e) {
        console.log('slide button tap', e.detail)
    }
});
