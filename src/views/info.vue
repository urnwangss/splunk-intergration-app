<template>
  <page-content
    :title="
      isEdit
        ? '编辑splunk to arcana实例 - 参数配置'
        : '新建splunk to arcana实例 - 参数配置'
    "
  >
    <a-form-model :model="form" :rules="rules" ref="form">
      <a-card title="通用信息" :bordered="false">
        <a-form-model-item label="splunk_IP/splunk_ip" prop="sourceIp">
          <a-input v-model="form.sourceIp" allow-clear></a-input>
        </a-form-model-item>
        <a-form-model-item label="端口/port" prop="sourcePort">
          <a-input v-model="form.sourcePort" ></a-input>
        </a-form-model-item>
        <a-form-model-item label="指定索引/index" prop="index">
          <a-input v-model="form.index" allow-clear></a-input>
        </a-form-model-item>
        <a-form-model-item label="socketIp" prop="socketIp">
          <a-input v-model="form.socketIp" allow-clear></a-input>
        </a-form-model-item>
        <a-form-model-item label="scoketPort" prop="scoketPort">
          <a-input v-model="form.scoketPort" allow-clear></a-input>
        </a-form-model-item>
      </a-card>
      <a-card title="配置信息" :bordered="false">
        <a-form-model-item label="splunkaccount(splunk)" prop="splunkaccount">
          <a-input v-model="form.splunkaccount" allow-clear></a-input>
        </a-form-model-item>
        <a-form-model-item label="splunkpaasword(splunk)" prop="splunkpaasword">
          <a-input v-model="form.splunkpaasword" allow-clear></a-input>
        </a-form-model-item>
        <a-form-model-item label="SPL语句" prop="spl">
          <a-textarea
            placeholder="search index=_internal"
            v-model="form.spl"
            :auto-size="{ minRows: 5 }"
            allow-clear
          ></a-textarea>
        </a-form-model-item>
        <a-form-model-item label="时间选择/Time_selection">
          <a-date-picker
            v-model="startValue"
            :disabled-date="disabledStartDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Start"
            @openChange="handleStartOpenChange"
          />
          <a-date-picker
            v-model="endValue"
            :disabled-date="disabledEndDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="End"
            :open="endOpen"
            @openChange="handleEndOpenChange"
          />
        </a-form-model-item>
        <a-form-model-item label="Edge" prop="edgeId">
          <a-input v-model="form.edgeId" allow-clear placeholder="Edge"></a-input>
          <!-- <a-select v-model="form.edgeId">
            <a-select-option
              v-for="(item, index) in edgeList"
              :key="index"
              :value="item.value"
              >{{ item.label }}</a-select-option
            >
          </a-select> -->
        </a-form-model-item>
      </a-card>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" :loading="isLoading" @click="handleConfirm">
        确定
      </a-button>
    </template>
  </page-content>
</template>
<script>
import PageContent from "@/components/page-content";
import Moment from "moment";

export default {
  components: {
    PageContent,
  },
  props: {
    type: {
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      isLoading: false,
      // 选择日期
      startValue: null,
      endValue: null,
      endOpen: false,
      // form: {
      //   sourceIp: "",
      //   sourcePort: "",
      //   index: "",
      //   socketIp: "",
      //   scoketPort: "",
      //   splunkaccount: "",
      //   splunkpaasword: "",
      //   spl: "",
      //   edgeId: null,
      // },
      form: {
        sourceIp: "192.168.1.237",
        sourcePort: "8089",
        index: "splunk",
        socketIp: "192.168.1.235",
        scoketPort: "8001",
        splunkaccount: "admin",
        splunkpaasword: "admin123",
        spl: "search index=_internal",
        edgeId: null,
      },
      rules: {
        sourceIp: {
          required: true,
          message: "请输入数据源IP",
        },
        sourcePort: {
          required: true,
          message: "请输入Port",
        },
        index: {
          required: true,
          message: "请输入索引/index",
        },
        socketIp: {
          required: true,
          message: "请输入socketIp",
        },
        scoketPort: {
          required: true,
          message: "请输入scoketPort",
        },
        splunkaccount: {
          required: true,
          message: "请输入splunkaccount",
        },
        splunkpaasword: {
          required: true,
          message: "请输入splunkpaasword",
        },
        spl: {
          required: true,
          message: "请输入SPL",
        },
        timeSelection: {
          required: true,
          message: "请选择时间",
        },
        edgeId: {
          required: true,
          message: "请选择Edge",
        },
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
    // 确定提交表单
    handleConfirm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false;
        this.isLoading = true;
        // 时间默认为当前
        if (this.endValue === null) {
          this.form.startime = Math.round(new Date().getTime() / 1000);
          this.form.endtime = Math.round(new Date().getTime() / 1000);
        } else {
          this.form.startime = this.startValue.unix();
          this.form.endtime = this.endValue.unix();
        }

        this.$api
          .saveInfo([
            {
              ...this.form,
              id: this.$route.params.id,
            },
          ])
          .then((res) => {
            console.log(res);
            this.isLoading = false;
            if (res.code === 0) {
              this.$message.success("保存成功");
              this.$router.push({
                name: "List",
              });
            } else {
              this.$message.error(res.message || "保存失败");
            }
          })
          .catch(() => {
            this.isLoading = false;
          });
      });
    },
    // 获取编辑信息
    getInfo() {
      console.log(this.$route.params.id);
      console.log("this.$route.params.id");
      this.$api
        .getInstanceInfo({
          id: this.$route.params.id,
        })
        .then((res) => {
          if (res.code === 0 && res.data.length) {
            const resendtime = parseInt(res.data[0].endtime);
            const resstartime = parseInt(res.data[0].startime);
            this.startValue = Moment(resstartime * 1000);
            this.endValue = Moment(resendtime * 1000);

            this.form = {
              sourceIp: res.data[0].sourceIp || "",
              sourcePort: res.data[0].sourcePort || "",
              index: res.data[0].index || "",
              socketIp: res.data[0].socketIp || "",
              scoketPort: res.data[0].scoketPort || "",
              splunkaccount: res.data[0].splunkaccount || "",
              splunkpaasword: res.data[0].splunkpaasword || "",
              spl: res.data[0].spl || "",
              edgeId: res.data[0].edgeId || "",
            };
          }
        });
    },
    // 选择edge的列表
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
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
  },
  created() {
    this.getEdgeList();
    if (this.isEdit) {
      this.$nextTick(() => {
        this.getInfo();
      });
    }
  },
  watch: {
    // startValue(val) {
    //   console.log("startValue", val);
    // },
    // endValue(val) {
    //   console.log("endValue", val);
    // },
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
.ant-input-affix-wrapper {
  ::v-deep .ant-input {
    resize: none;
  }
}
</style>
