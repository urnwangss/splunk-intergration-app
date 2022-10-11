<template>
  <page-content :show-header="false">
    <a-tabs v-model="activeTabKey" @tabClick="handleTabClick">
      <a-tab-pane v-for="item in tabList" :key="item.value" :tab="item.label">
      </a-tab-pane>
    </a-tabs>
    <router-view />
  </page-content>
</template>

<script>
import PageContent from "@/components/page-content";
export default {
  name: "Home",
  components: {
    PageContent,
  },
  data() {
    return {
      activeTabKey: "",
      tabList: [
        {
          label: "实例列表",
          value: "List",
        },
        // {
        //   label: "用户案例",
        //   value: "Example",
        // },
      ],
    };
  },
  methods: {
    handleTabClick(key) {
      this.$router.push({
        name: key,
      });
    },
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler() {
        this.activeTabKey = this.$route.name || this.tabList[0].value;
      },
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .ant-tabs {
  .ant-tabs-tab {
    &.ant-tabs-tab-active {
      font-size: 16px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .ant-tabs-ink-bar {
    border-top-left-radius: 100px;
    border-top-right-radius: 100px;
    overflow: hidden;
    height: 3px;
  }
}
</style>
