<template>
  <div class="example-wrapper">
    <a-radio-group
      v-model="activeKey"
      @change="handleChange"
      v-if="list && list.length > 1"
    >
      <a-radio-button
        v-for="item in list"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </a-radio-button>
    </a-radio-group>
    <iframe
      :src="`${baseUrl}${fullUrl}`"
      frameborder="0"
      style="height: 100%; width: 100%"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl:
        process.env.NODE_ENV === "production"
          ? ""
          : "http://arcana-dev.pscsoft.cn",
      activeKey: "",
      list: APP_CONFIG.example,
      url: "",
    };
  },
  computed: {
    activePath() {
      return this.activeKey
        ? this.list.find((item) => item.value === this.activeKey).path
        : "";
    },
    fullUrl() {
      let { type, ...query } = this.$route.query;
      return `${this.url}?${Object.entries(query)
        .map((item) => item[0] + "=" + item[1])
        .join("&")}`;
    },
  },
  methods: {
    handleChange(e) {
      this.url = this.list.find((item) => item.value === e.target.value).path;
      this.$router.replace({
        name: this.$route.name,
        query: { ...this.$route.query, type: this.activeKey },
      });
    },
  },
  mounted() {
    if (
      this.$route.query.type &&
      this.list.find((item) => item.value === this.$route.query.type)
    ) {
      this.activeKey = this.$route.query.type;
      this.url = this.list.find(
        (item) => item.value === this.$route.query.type
      ).path;
    } else {
      this.activeKey = this.list[0].value;
      this.url = this.list[0].path;
    }
  },
};
</script>
<style lang="less" scoped>
.example-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;

  iframe {
    margin-top: 24px;
    flex: 1;
  }
}
</style>
