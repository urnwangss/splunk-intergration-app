<template>
  <page-content title="splunk to arcana实例 - 查看详情">
    <a-form-model :model="form" ref="form">
      <a-card title="通用信息" :bordered="false">
        <a-form-model-item label="splunk_IP/splunk_ip" prop="sourceIp">
          <a-input v-model="form.sourceIp" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item label="端口/port" prop="sourceHost">
          <a-input v-model="form.sourceHost"></a-input>
        </a-form-model-item>
        <a-form-model-item label="指定索引/index" prop="index">
          <a-input v-model="form.index" disabled></a-input>
        </a-form-model-item>
      </a-card>
      <a-card title="配置信息" :bordered="false">
        <a-form-model-item label="SecretId(splunk)" prop="secretId">
          <a-input v-model="form.secretId" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item label="SecretKey(splunk)" prop="secretKey">
          <a-input v-model="form.secretKey" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item label="SPL语句" prop="spl">
          <a-textarea
            v-model="form.spl"
            :auto-size="{ minRows: 5 }"
            disabled
          ></a-textarea>
        </a-form-model-item>
        <a-form-model-item label="时间选择/Time_selection" prop="timeSelection">
          <dm-date-picker
            v-model="form.timeSelection"
            disabled
          ></dm-date-picker>
        </a-form-model-item>
        <a-form-model-item label="选择Edge" prop="edgeId">
          <a-select v-model="form.edgeId" disabled>
            <a-select-option
              v-for="(item, index) in edgeList"
              :key="index"
              :value="item.value"
              >{{ item.label }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
      </a-card>
    </a-form-model>
    <template slot="footer">
      <a-button type="primary" @click="handleCancel">关闭</a-button>
    </template>
  </page-content>
</template>
<script>
import PageContent from "@/components/page-content";
export default {
  components: {
    PageContent,
  },
  data() {
    return {
      form: {
        sourceIp: "",
        sourceHost: "",
        index: "",
        spl: "",
        secretId: "",
        secretKey: "",
        timeSelection: [],
        edgeId: null,
      },
      edgeList: [],
    };
  },
  computed: {
    isEdit() {
      return this.type === "edit";
    },
  },
  methods: {
    handleCancel() {
      this.$router.push({
        name: "List",
      });
    },
    getEdgeList() {
      this.$api.getEdgeList().then((data) => {
        if (data.rows && data.rows.length) {
          this.edgeList = data.rows.map((item) => ({
            value: item.id,
            label: item.name,
            instanceId: item.instanceId,
            host: item.host,
          }));
        }
      });
    },
    getInfo() {
      this.$api
        .getInstanceInfo({
          id: this.$route.params.id,
        })
        .then((res) => {
          if (res.code === 0 && res.data.length) {
            let { startime, endtime, ...form } = res.data;
            this.form = {
              ...form,
              timeSelection: [startime, endtime],
            };
          }
        });
    },
  },
  created() {
    this.getEdgeList();
    this.getInfo();
  },
};
</script>
<style lang="less" scoped>
.ant-card {
  &:not(:first-child) {
    margin-top: 24px;
  }
}
.page-content {
  padding-bottom: 80px;
  ::v-deep .page-footer {
    background: #ffffff;
    padding: 24px;
    text-align: right;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
  }
}
.ant-btn + .ant-btn {
  margin-left: 16px;
}
.ant-form-item {
  ::v-deep .ant-form-item-control {
    width: 480px;
  }
}
</style>
