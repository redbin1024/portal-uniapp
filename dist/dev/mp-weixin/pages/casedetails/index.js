"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const api_activity = require("../../api/activity.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "CaseDetails",
  data() {
    return {
      richText: "",
      loading: false,
      error: null,
      activityId: null
    };
  },
  onLoad(options) {
    this.activityId = "1951194533574815746";
    this.loadActivityDetail();
  },
  methods: {
    loadActivityDetail() {
      return __async(this, null, function* () {
        try {
          this.loading = true;
          this.error = null;
          const response = yield api_activity.getActivityDetail(this.activityId);
          if (response && response.data) {
            const content = response.data.content || response.data.detail || "";
            this.processContent(content);
          } else {
            throw new Error("获取活动详情失败");
          }
        } catch (err) {
          console.error("获取活动详情失败:", err);
          this.error = err.message || "获取活动详情失败，请稍后重试";
          this.setDefaultContent();
        } finally {
          this.loading = false;
        }
      });
    },
    processContent(content) {
      this.richText = content.replace(/<img[^>]*>/gi, function(match, capture) {
        return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
      }).replace(
        /\<img/gi,
        '<img style="width:100%;height:auto;display:block;"'
      );
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.loading
  }, $data.loading ? {} : $data.error ? {
    c: common_vendor.t($data.error)
  } : {
    d: $data.richText
  }, {
    b: $data.error
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-49e065b9"]]);
wx.createPage(MiniProgramPage);
