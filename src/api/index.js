import axios from "@/request/http";
const baseUrl = "/splunk-integration-app";
export default {
  /**
   * 获取实例列表数据
   * @param {Object} params
   * @param {Number} params.offset 分页偏移量
   * @param {Number} params.count 分页每页条数
   * @param {String} params.keyword 关键字搜索
   */
  getList(params) {
    return axios.post(`${baseUrl}/splunk`, params);
  },
  /**
   * 实例新增/编辑
   * @param {Array} params
   * @param {String} params.sourceIp 数据源IP
   * @param {String} params.sourceHost 数据源HOST
   * @param {String} params.index 指定索引
   * @param {String} params.spl spl语句
   * @param {String} params.secretId splunk账号
   * @param {String} params.secretKey splunk密码
   * @param {String} params.startime 起始时间
   * @param {String} params.endtime 结束时间
   */
  saveInfo(params) {
    return axios.put(`${baseUrl}/splunk`, params);
  },
  /**
   * 获取Edge下拉列表
   */
  getEdgeList() {
    return axios.get(`${baseUrl}/splunk/nodes`);
  },
  /**
   * 获取实例信息
   * @param {Object} params
   * @param {String} params.id 实例id
   */
  getInstanceInfo(params) {
    return axios.get(`${baseUrl}/splunk/${params.id}`);
  },
  /**
   * 删除实例
   * @param {Object} params
   * @param {String} params.id 实例id
   */
  deleteInstanceId(params) {
    return axios.delete(`${baseUrl}/splunk/${params.id}`);
  },
};
