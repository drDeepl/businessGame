<template>
    <div class="wrapper">
        <div class="admin-page-nav">
            <div
                class="tittle"
                v-for="title in titleSections" 
                :key='title'>
            <span>{{title}}</span>
        </div>
        </div>

        <div class="admin-page-content">
            <button @click.prevent="showUsersList">Запрос на список пользователей</button>  
            <Table :usersArray="usersArray_JSON"/>
        </div>
    </div>
</template>

<script>

import userService from '@/services/user.service'
import Table from '@/UI/Table'
import {infoUsersSections} from '@/_config';

export default {
    data () {
        return {
            titleSections: infoUsersSections,
            usersArray_JSON: [],

        }
    },

    components: {Table},
    methods: {
        async showUsersList(){
            const users = await userService.getUsersList()
            this.usersArray_JSON = users
        }
    }
}
</script>