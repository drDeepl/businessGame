<template>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                <th 
                    v-for="tittle in table.thTable" 
                    :key="tittle"
                    scope="col">
                {{tittle}}
                </th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="userJSON in usersArray" :key="userJSON.id">
                    <td v-for="userAttr in Object.keys(table.thTable)"
                        :key="userAttr">
                        <span v-if="userAttr != 'id '">{{userJSON[userAttr]}}</span>
                    </td>
                    
                </tr>
            </tbody>
        </table>
      </div>
</template>

<script>

import {
    userAttr,
} from '@/_config';
// TODO: Настроить отображение таблицы пользователей
export default {
    data(){
        return{
            table:{
                thTable: userAttr,
                }
        }
    },
    props:{
        usersArray: {
            type: Array,
            required: true,
        },
    },
  
};
</script> 