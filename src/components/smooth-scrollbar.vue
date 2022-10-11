<template>
  <div class="smooth-scrollbar-wrapper" ref="scrollbar">
    <slot></slot>
  </div>
</template>
<script>
import Scrollbar from "smooth-scrollbar";
export default {
  data() {
    return {
      scrollbarEl: null,
    };
  },
  mounted() {
    this.initScrollbar();
  },
  methods: {
    initScrollbar() {
      this.scrollbarEl = Scrollbar.init(this.$refs.scrollbar, {
        alwaysShowTracks: true,
      });
    },
    setPosition(x, y) {
      this.scrollbarEl.setPosition(x, y);
    },
  },
};
</script>
<style lang="less" scoped>
.smooth-scrollbar-wrapper {
  width: 100%;
  height: 100%;

  /deep/ .scrollbar-track {
    background: transparent;

    .scrollbar-thumb {
      background: #dddddd;
      width: 6px;
    }
  }
}
</style>
