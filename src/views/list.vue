<template>
  <div class="list-content-wrapper">
    <div class="title-content">
      <div class="app-info">
        <img class="app-logo" src="../assets/icon.png" />
        <div class="app-content">
          <span class="app-name">Splunk to Arcana 迁移</span>
          <p class="app-en-name">由@arcana提供v1.0</p>
        </div>
        <p class="app-description">
          此应用程序可帮助您深入了解MySQL服务器的运行状况，及跟踪缓慢的查询，并有助于在问题变成严重问题之前对其进行故障排除。
        </p>
      </div>
      <div class="filter">
        <a-input-search
          v-model="requestParams.keyword"
          style="width: 264px"
          placeholder="搜索实例"
          allow-clear
          @search="handlerSearch"
        />
        <a-button type="primary" @click="handlerAdd">新增实例</a-button>
      </div>
    </div>
    <a-table
      :columns="tableData.columns"
      :data-source="tableData.body"
      style="margintop: 20px"
      :pagination="pagination"
      :loading="showLoading"
      bordered
      :row-key="(record, index) => index + 1"
      @change="handleTableChange"
    >
      <template slot="formatTime" slot-scope="text">
        {{ text | formatTime }}
      </template>
    </a-table>
  </div>
</template>

<script>
import PageContent from "@/components/page-content";
import TableContent from "@/components/table-content";
import dayjs from "dayjs";
import {
  defaultPagination,
  defaultRequestParams,
  parseRequestParams,
} from "@/utils/table-helper";
export default {
  components: {
    PageContent,
    TableContent,
  },
  data() {
    return {
      showLoading: false,
      tableData: {
        columns: [
          {
            title: "来源主机",
            customRender: (text, row, index) => {
              return {
                children: (
                  // <a onclick={() => this.handleGoto(row)}>{row.sourceIp}</a>
                  <span>{row.sourceIp}</span>
                ),
                attrs: {
                  rowSpan: this.tableData.merges[index],
                },
              };
            },
          },
          {
            title: "存放索引",
            dataIndex: "index",
            customRender: (text, row, index) => {
              return {
                children: text,
                attrs: {
                  rowSpan: this.tableData.merges[index],
                },
              };
            },
          },
          {
            title: "实体添加时间",
            dataIndex: "createTime",
            scopedSlots: {
              customRender: "formatTime",
            },
          },
          {
            title: "数据最后更新时间",
            dataIndex: "updateTime",
            scopedSlots: {
              customRender: "formatTime",
            },
          },
          {
            title: "操作",
            dataIndex: "action",
            width: 140,
            customRender: (text, row, index) => {
              return {
                children: (
                  <span class="table-action">
                    <a onclick={() => this.handleEdit(row)}>编辑</a> |{" "}
                    <a onclick={() => this.handleView(row)}>详情</a> |{" "}
                    <a onclick={() => this.handleDel(row)}>删除</a>
                  </span>
                ),
                attrs: {
                  rowSpan: this.tableData.merges[index],
                },
              };
            },
          },
        ],
        body: [],
        merges: [],
      },
      requestParams: {
        ...defaultRequestParams,
        keyword: "",
      },
      pagination: {
        ...defaultPagination,
      },
    };
  },
  filters: {
    formatTime(text) {
      return text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "- -";
    },
  },
  methods: {
    // 搜索实例
    handlerSearch() {
      this.feachData();
    },
    handleTableChange(pagination, filters, sorter) {
      //解析请求参数
      let queryParams = parseRequestParams(pagination, filters, sorter);
      //合并请求参数
      this.requestParams = Object.assign(this.requestParams, queryParams);
      this.pagination = pagination;
      //请求数据
      this.feachData();
    },
    handleGoto(row) {
      this.$router.push({
        name: "Example",
        query: {
          host: row.sourceIp,
        },
      });
    },
    // 删除实例
    handleDel(row) {
      this.$confirm({
        content: "确定删除？",
        okText: "删除",
        cancelText: "取消",
        okType: "danger",
        onOk: () => {
          this.$api
            .deleteInstanceId({
              id: row.id,
            })
            .then((res) => {
              if (res.code === 0) {
                this.$message.success("删除成功");
                this.feachData();
              } else {
                this.$message.error(res.message || "删除失败");
              }
            });
        },
        onCancel() {},
      });
    },
    // 编辑实例
    handleEdit(row) {
      this.$router.push({
        name: "Edit",
        params: {
          id: row.id,
        },
      });
    },
    // 查看详情
    handleView(row) {
      this.$router.push({
        name: "View",
        params: {
          id: row.id,
        },
      });
    },
    // 添加实例
    handlerAdd() {
      this.$router.push({
        name: "Add",
      });
    },
    //请求数据
    feachData() {
      this.showLoading = true;
      this.$api
        .getList(this.requestParams)
        .then((data) => {
          this.showLoading = false;
          if (data.rows && data.rows.length) {
            let rowMerge = [];
            let rowsInfo = [];
            data.rows.forEach((item, index) => {
              let rowInfo = JSON.stringify({
                sourceHost: item.sourceHost,
                sourceIp: item.sourceIp,
                index: item.index,
              });
              if (rowsInfo.includes(rowInfo)) {
                let lastIndex = rowsInfo.indexOf(rowInfo);
                if (rowMerge[lastIndex] + lastIndex === index) {
                  rowMerge[index] = 0;
                  rowMerge[lastIndex] += 1;
                }
              } else {
                rowMerge[index] = 1;
                rowsInfo[index] = rowInfo;
              }
            });
            this.tableData.body = data.rows;
            this.tableData.merges = rowMerge;
            this.pagination.total = data.total;
          } else {
            this.tableData.body = [];
            this.pagination.total = 0;
          }
        })
        .catch(() => {
          this.showLoading = false;
        });
    },
  },
  mounted() {
    this.feachData();
    console.log(this.tableData);
  },
};
</script>
<style lang="less" scoped>
.list-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}
.title-content {
  margin-bottom: 24px;
}
.app-info {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  margin-top: 10px;
  .app-logo {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  .app-content {
    margin-left: 15px;

    .app-name {
      font-size: 14px;
      color: #000000;
      opacity: 0.85;
      line-height: 22px;
      margin-top: 105px;
      font-weight: 500;
    }
    .app-en-name {
      font-size: 14px;
      color: #000000;
      opacity: 0.45;
      line-height: 22px;
      margin-top: 8px;
    }
  }
  .app-description {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    margin-top: 10px;
    line-height: 20px;
    width: 100%;
  }
}
.filter {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
// .table-container /deep/ .table-body {
//     padding: 0 !important;
// }
/deep/ .ant-table {
  .ant-table-thead {
    th {
      font-weight: 700;
    }
  }
}
</style>
