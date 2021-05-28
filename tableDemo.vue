<template>
  <div>
    <el-table
      :data="tableData"
      ref="tableRef"
      @select-all="handleTableSelectAll"
      @selection-change="handleTableSelect"
      @expand-change="handleExpand"
    >
      <el-table-column type="expand">
        <template slot-scope="scope" v-if="0 in scope.row.childTableData">
          <el-table :ref="'childTableRef' + scope.row.id" :data="scope.row.childTableData" :show-header="false" @select="handleChildSelect">
            <el-table-column width="45px"></el-table-column>
            <el-table-column width="45px">
              <template slot-scope="sco">
                <el-checkbox @change="handleChildChange(scope.row.childCheckBox, scope.row, sco.$index, $event)" v-model="scope.row.childCheckBox[sco.$index]"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="角色名称" prop="name"></el-table-column>
            <el-table-column prop="age" label="角色年龄"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="age" label="角色年龄"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        tableData: [],
        cacheIndex: [],
        cacheSelect: []
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        let data = [
          {
            id: 1,
            name: '小明',
            age: 12
          },
          {
            id: 2,
            name: '小刚',
            age: 14,
            hasChildren: true
          }
        ]
        // this.tableData = data
        this.tableData = data.map(item => {
          item.childTableData = []
          item.childCheckBox = []
          return item
        })
        console.log(this.tableData)
      },
      load (tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
          {
            id: 3,
            name: 'xiaogang',
            age: 11
          }
            ])
        }, 1000)
      },
      handleExpand(row, rows) {
        let i = null
        this.tableData.forEach((item, inde) => {
          if (item.id === row.id) {
            i = inde
          }
        })
        if (row.name === '小明') {
          let data = [{
                id: 3,
                name: '嘻嘻嘻',
                age: 12
              }, {
                id: 4,
                name: '哈哈哈',
                age: 13
              }]
              data.forEach((ite, index) => {
                this.$set(this.tableData[i].childCheckBox, index, false)
              })
          row.childTableData = data
        } else {
          let data = [
          {
            id: 5,
            name: '小丽',
            age: 18
          }
          ]
          data.forEach((ite, index) => {
            this.$set(this.tableData[i].childCheckBox, index, false)
          })
          row.childTableData = data
        }
      },
      // handleChildTableSelectAll (selection) {
      //   console.log(selection)
      // },
      handleTableSelectAll (selection) {
        // console.log(selection)
        this.tableData.forEach(item => {
          // console.log(item)
          // console.log(this.$refs['childTableRef' + item.id])
          this.$refs['childTableRef' + item.id] && this.$refs['childTableRef' + item.id].toggleAllSelection()
        })
        console.log(this.tableData)
        // this.handleChildTableSelectAll()
      },
      handleChildChange (row, pRow, cIndex, e) {
        console.log(row, pRow, cIndex, e)
        if (0 in row && row.every(item => item === true)) {
          this.$refs.tableRef.toggleRowSelection(pRow)
        } else {
          this.$refs.tableRef.toggleRowSelection(pRow, false)
        }
      },
      handleChildSelect (row, selection, row1, row2) {
        console.log(row, selection, row1, row2)
      },
      handleTableSelect (selection) {
        if (this.cacheSelect.length < selection.length) {
          this.cacheSelect = selection
          selection.forEach(item => {
            if (item.childCheckBox.length) {
              item.childCheckBox.forEach((ite, index) => {
                this.$set(item.childCheckBox, index, true)
              })
            }
          })
        } else {
          this.cacheSelect.forEach(item => {
            if (item.childCheckBox.length) {
              console.log(item.childCheckBox)
              item.childCheckBox.every(item => item === true) && item.childCheckBox.forEach((ite, index) => {
                this.$set(item.childCheckBox, index, false)
              })
            }
          })
          this.cacheSelect = selection
          selection.forEach(item => {
            if (item.childCheckBox.length) {
              item.childCheckBox.forEach((ite, index) => {
                this.$set(item.childCheckBox, index, true)
              })
            }
          })
        }
      }
    }
  }
</script>

<style lang='less' scoped>
  
</style>