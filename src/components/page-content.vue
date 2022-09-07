<template>
  <a-layout class="page-content">
    <smooth-scrollbar ref="scrollbar">
      <div class="page-container">
        <div
          :class="['page-header', headerClass]"
          :style="headerStyle"
          v-if="showHeader"
        >
          <div class="page-header-heading">
            <template v-if="showBackIcon">
              <a-icon type="arrow-left" class="back-icon" @click="goBack" />
            </template>
            <div class="page-title">{{ this.title }}</div>
            <div class="header-tools">
              <a-space>
                <a-button-group class="btn-tools" v-if="showPageTool">
                  <a-tooltip title="刷新">
                    <a-button @click="refresh"
                      ><svg-icon type="dm-refresh"
                    /></a-button>
                  </a-tooltip>
                  <a-tooltip title="全屏">
                    <a-button><svg-icon type="dm-arrows-alt" /></a-button>
                  </a-tooltip>
                </a-button-group>
                <slot name="header-extra"></slot>
              </a-space>
            </div>
          </div>
          <template v-if="$slots['header-content']">
            <div class="page-header-content">
              <slot name="header-content"></slot>
            </div>
          </template>
        </div>
        <div :class="['page-body', bodyClass]" :style="bodyStyle">
          <a-spin :spinning="loading">
            <slot></slot>
          </a-spin>
        </div>
      </div>
    </smooth-scrollbar>
    <div class="page-footer" ref="page-footer" v-if="$slots['footer']">
      <slot name="footer"></slot>
    </div>
  </a-layout>
</template>

<script>
import SmoothScrollbar from "@/components/smooth-scrollbar";
export default {
  components: {
    SmoothScrollbar,
  },
  props: {
    title: String,
    headerClass: String,
    headerStyle: Object,
    bodyClass: String,
    bodyStyle: Object,
    showHeader: {
      type: Boolean,
      default: true,
    },
    showBackIcon: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    footerAppendToBody: {
      type: Boolean,
      default: false,
    },
    showPageTool: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {
    if (this.footerAppendToBody) {
      document.body.appendChild(this.$refs["page-footer"]);
    }
  },
  computed: {
    scrollbar() {
      return this.$refs.scrollbar.scrollbarEl;
    },
  },
  methods: {
    //返回
    goBack() {
      if (this.$listeners["onBack"]) {
        this.$emit("onBack", event);
      } else {
        this.$router.go(-1);
      }
    },
    // 刷新按钮
    refresh() {
      this.$emit("refresh", event);
    },
  },
  //销毁前要删除浮动的footer
  beforeDestroy() {
    let footer = this.$refs["page-footer"];
    if (this.footerAppendToBody && footer && footer.parentNode) {
      footer.parentNode.removeChild(footer);
    }
  },
};
</script>

<style lang="less" scoped>
.ant-layout {
  height: 100%;
}
.smooth-scrollbar-wrapper {
  /deep/ .scroll-content {
    height: 100%;
  }
}

.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  .page-header {
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    min-height: 60px;
    .page-header-heading {
      display: flex;
      align-items: center;
      height: 60px;
      line-height: 60px;
      .back-icon {
        font-size: 16px;
        margin-right: 16px;
        color: rgba(0, 0, 0, 0.45);
        cursor: pointer;
      }
      .page-title {
        opacity: 0.85;
        font-size: 16px;
        font-weight: bold;
        color: #262626;
      }
      .header-tools {
        flex: 1;
        text-align: right;
        .btn-tools {
          .ant-btn {
            padding: 0 10px;
          }
        }
      }
    }
    .page-header-content {
      padding-top: 12px;
    }
  }
  .page-body {
    flex: 1;
    margin: 0 24px;
    padding-bottom: 24px;
    > .ant-spin-nested-loading {
      height: 100%;
      ::v-deep > .ant-spin-container {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
<style lang="less">
.full-content {
  width: 100%;
  height: 100%;
}
// a标签样式被初始化覆盖导致ant-design table里的操作按钮颜色被覆盖
a {
  color: #705ada;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}

.anticon svg {
  display: inline-block;
  vertical-align: initial;
}

.ant-form-item {
  .ant-form-item-label {
    line-height: 22px;
    font-size: 14px;
    margin-bottom: 8px;
  }
}

.ant-form-item-label-with-tooltip {
  display: inline-flex;
  align-items: center;

  .anticon {
    margin-left: 6px;
  }
}

/***数据收集样式 */
.main-form__wrapper {
  // .ant-input-affix-wrapper {
  //   max-width: 512px;
  // }
  .ant-form-item {
    max-width: 512px;

    &.ant-form-item-block {
      max-width: inherit;
    }

    .ant-form-item__inline {
      margin-bottom: 0;
    }
  }

  .ant-input-affix-wrapper {
    width: 100%;
  }

  .ant-select {
    width: 100%;
  }
  .ant-form-item__inline {
    max-width: 512px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    margin-bottom: 24px;

    &.flex-start {
      align-items: flex-start;
    }

    .flex__item {
      margin: 0;

      & + .flex__item {
        margin-left: 16px;
      }
    }

    .flex__item-space {
      flex: 1;
    }

    .ant-checkbox-wrapper {
      .ant-checkbox + span {
        padding-right: 0;
      }
    }
  }
  .ant-form-item {
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .ant-form-item__tip {
    margin: 0;
    display: block;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 22px;
    margin-top: 8px;
  }
}

.ant-select-clear-icon {
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
  cursor: pointer;
  transition: color 0.3s;
  vertical-align: 2px;
}
/***数据收集样式 */
</style>
