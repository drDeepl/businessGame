<template>
    <div>{{titles}}</div>
    <!-- <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                <th 
                    v-for="title in titles" 
                    :key="title"
                    scope="col">
                {{tittle}}
                </th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="dataJSON in dataArray" :key="dataJSON.id">
                    <td v-for="dataAttr in Object.keys(titles)"
                        :key="dataAttr">
                        <span v-if="dataAttr != 'id '">{{dataJSON[dataAttr]}}</span>
                    </td>
                    
                </tr>
            </tbody>
        </table>
      </div> -->
</template>

<script>

// TODO: Настроить отображение таблицы пользователей
export default {

    props:{
        titles: {
            type: Object,
            required: true
        },
        dataArray: {
            type: Array,
            required: true,
        },
    },
  
};
</script> 