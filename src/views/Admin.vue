<template>
    <div class="wrapper">
        <div
            class="card"
            v-for="card in cards"
            :key="card.title"
            >
            <CollapsedCard :title="card.title">
                <Table :titles="tableHeaders[card.body]" :dataArray="array[card.body]"/>
            </CollapsedCard>
        </div>
    </div>
</template>

<script>
// TODO: Закинуть в компонент другой компонент....?
import userService from '@/services/user.service';
import Table from '@/UI/Table';
import CollapsedCard from '@/components/CollapsedCard';
import {
    usersTableHeader,
    cardsShowList,
    accountsTableHeader,
    transactionsTableHeader
} from '@/_config';

export default {
    data() {
        return{
            tableHeaders: {
                users: usersTableHeader,
                accounts: accountsTableHeader,
                transactions: transactionsTableHeader,
            },
            cards: cardsShowList,
            array: {
                users: '',
                accounts: ['1', '2'],
                transactions: ['1', '2'],
            },
            userArray_JSON: [],

        }
    },

    async mounted(){
            const users = await userService.getUsersList()
            this.array.users = users
        },
    components: {Table, CollapsedCard},
 
}
</script>