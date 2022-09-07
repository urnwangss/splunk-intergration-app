<template>
  <div class="table-container">
    <div class="table-filter" v-if="$slots['filter']">
      <slot name="filter"></slot>
    </div>
    <div
      class="table-body"
      :style="{ paddingTop: $slots['filter'] ? '0px' : '24px' }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.table-container {
  background-color: #fff;
  border-radius: 4px;
  .table-filter {
    height: 64px;
    // line-height: 64px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    > * {
      width: 200px;
      margin-right: 8px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .table-body {
    padding: 0 24px 24px;
    ::v-deep .ant-table-wrapper {
      .ant-table-thead {
        tr {
          th {
            font-weight: 600;
            background: rgba(0, 0, 0, 0.02);
            &.ant-table-column-has-actions.ant-table-column-has-actions {
              &:hover {
                background: rgba(0, 0, 0, 0.02);
              }
            }
            .ant-table-header-column {
              .ant-table-column-sorters {
                &:hover {
                  &::before {
                    background: none;
                  }
                }
              }
            }
          }
        }
      }
      .ant-table-tbody {
        tr {
          td {
            .clickable {
              color: rgba(0, 0, 0, 0.65);
              &:hover {
                cursor: pointer;
                color: #705ada;
                text-decoration: underline;
              }
            }
            .action-column {
              color: red;
              a {
                padding-right: 8px;
                margin-right: 8px;
                position: relative;
                &::after {
                  content: "";
                  position: absolute;
                  height: 0.9em;
                  top: 50%;
                  right: 0;
                  width: 1px;
                  margin-top: -0.45em;
                  vertical-align: middle;
                  background: #e8e8e8;
                }
                &:last-child {
                  padding-right: 0px;
                  margin-right: 0px;
                  &::after {
                    width: 0;
                  }
                }

                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
