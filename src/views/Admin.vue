<template>
    <div class="wrapper">
        <CollapsedCard :title="blockTitle" />
        <div class="admin-page-nav">
            <div
                class="tittle"
                v-for="title in titleSections" 
                :key='title'>
            <span>{{title}}</span>
        </div>
        </div>

        <div class="admin-page-content">
            <Table :usersArray="usersArray_JSON"/>
        </div>
    </div>
</template>

<script>
// TODO: Закинуть в компонент другой компонент....?
import userService from '@/services/user.service';
import Table from '@/UI/Table';
import CollapsedCard from '@/UI/CollapsedCard';
import {infoUsersSections} from '@/_config';

export default {
    data () {
        return {
            blockTitle: 'BlockName',
            titleSections: infoUsersSections,
            usersArray_JSON: [],

        }
    },

    async mounted(){
            const users = await userService.getUsersList()
            this.usersArray_JSON = users

    },
    components: {Table, CollapsedCard},
 
}
</script>