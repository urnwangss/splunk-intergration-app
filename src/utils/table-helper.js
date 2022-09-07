/**
 * @description 表格辅助类
 * @author liuhaiyang */

//默认分页组件的参数
export const defaultPagination = {
  showSizeChanger: true,
  showQuickJumper: true,
  total: 0,
  pageSize: 20,
  defaultPageSize: 20,
  showTotal: (total) => `共 ${total} 条`,
};

//默认查询参数
export const defaultRequestParams = {
  offset: 0,
  count: 20,
  sortField: "",
  sortDirection: 0,
};

/**
 * 解析查询参数-表格发生变化时需要重新组装和计算查询参数
 * @param {*} pagination
 * @param {*} filters
 * @param {*} sorter
 */
export function parseRequestParams(pagination, filters, sorter) {
  let queryParameters = {};
  queryParameters.offset = (pagination.current - 1) * pagination.pageSize;
  queryParameters.count = pagination.pageSize;

  if (sorter.field && sorter.order) {
    queryParameters.sortField = sorter.field;
    queryParameters.sortDirection = sorter.order == "ascend" ? 1 : -1;
  } else {
    queryParameters.sortField = "";
    queryParameters.sortDirection = 0;
  }
  return queryParameters;
}
