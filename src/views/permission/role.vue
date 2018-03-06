<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                账号管理
            </p>
            <Row>
                <Input v-model="searchConName2" @on-change="handleSearch2" icon="search" placeholder="请输入姓名搜搜..." style="width: 200px" />
                <Input v-model="searchConTel2" @on-change="handleSearch2" icon="search" placeholder="请输入手机号搜搜..." style="width: 200px" />
            </Row>
            <Row class="margin-top-10 searchable-table-con1">
                <Table :columns="columns1" :data="data2"></Table>
            </Row>
        </Card>    </div>
</template>

<script>
export default {
    name: 'searchable-table',
    data () {
        return {
            searchConName1: '',
            searchConName2: '',
            searchConTel2: '',
            searchConName3: '',
            data1: [],
            initTable1: [],
            data2: [],
            initTable2: [],
            data3: [],
            initTable3: []
        };
    },
    methods: {
        init () {
          
        },
        search (data, argumentObj) {
            let res = data;
            let dataClone = data;
            for (let argu in argumentObj) {
                if (argumentObj[argu].length > 0) {
                    res = dataClone.filter(d => {
                        return d[argu].indexOf(argumentObj[argu]) > -1;
                    });
                    dataClone = res;
                }
            }
            return res;
        },
        handleSearch1 () {
            this.data1 = this.initTable1;
            this.data1 = this.search(this.data1, {name: this.searchConName1});
        },
        handleSearch2 () {
            this.data2 = this.initTable2;
            this.data2 = this.search(this.data2, {name: this.searchConName2, tel: this.searchConTel2});
        },
        handleSearch3 () {
            this.data3 = this.initTable3;
            this.data3 = this.search(this.data3, {name: this.searchConName3});
        },
        handleCancel3 () {
            this.data3 = this.initTable3;
        }
    },
    mounted () {
        this.init();
    }
};
</script>
