<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Продажа продуктовых наборов</h5> 
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Продавец</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Размещён</th>
                            <th scope="col">Статус</th>
                            <th scope="col">Продуктовый набор</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(data, id) in myJson_s"
                            :key="id"
                        >
                            <td scope="row">{{ data.id }}</td>
                            <td scope="row">{{ data.trader }}</td>
                            <td scope="row">{{ data.price }}</td>
                            <td scope="row">{{ data.timestamp }}</td>
                            <td scope="row">{{ data.state }}</td>
                            <td scope="row">{{ data.product_kit }}</td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="btn btn-success" @click="showCreateS = true">Разместить предложение</button>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Продажа продуктов</h5> 
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Продавец</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Размещён</th>
                            <th scope="col">Статус</th>
                            <th scope="col">Продукт</th>
                            <th scope="col">Количество</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(data, id) in myJson_p"
                            :key="id"
                        >
                            <td scope="row">{{ data.id }}</td>
                            <td scope="row">{{ data.trader }}</td>
                            <td scope="row">{{ data.price }}</td>
                            <td scope="row">{{ data.timestamp }}</td>
                            <td scope="row">{{ data.state }}</td>
                            <td scope="row">{{ data.product }}</td>
                            <td scope="row">{{ data.count }}</td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="btn btn-success" @click="showCreateP = true">Разместить предложение</button>
            </div>
        </div>

        <div v-if="showCreateS">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog modal-dialog-scrollable" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Разместить предложение о продаже продуктового набора</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="showCreateS = false">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label for="price">Цена</label>
                                    <input
                                        v-model="newS.price"
                                        label="price"
                                        type="text"
                                        class="form-control"
                                        name="price"
                                    />
                                    <label for="product_kit_id">Продуктовый набор</label>
                                    <input
                                        v-model="newS.product_kit_id"
                                        label="product_kit_id"
                                        type="text"
                                        class="form-control"
                                        name="product_kit_id"
                                    />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showCreateS = false">Отмена</button>
                                    <button type="button" class="btn btn-success" @click="createS()">Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <div v-if="showCreateP">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Разместить предложение о продаже продуктов</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="showCreateP = false">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label for="price">Цена</label>
                                    <input
                                        v-model="newP.price"
                                        label="price"
                                        type="text"
                                        class="form-control"
                                        name="price"
                                    />
                                    <label for="count">Количество</label>
                                    <input
                                        v-model="newP.count"
                                        label="count"
                                        type="text"
                                        class="form-control"
                                        name="count"
                                    />
                                    <label for="product_id">Продукт</label>
                                    <input
                                        v-model="newP.product_id"
                                        label="product_id"
                                        type="text"
                                        class="form-control"
                                        name="product_id"
                                    />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showCreateP = false">Отмена</button>
                                    <button type="button" class="btn btn-success" @click="createP()">Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <div v-if="showError">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Ошибка!</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="showError = false">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    {{ message }}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showError = false">ОК</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
    data () {
        return {
            myJson_s: [],
            myJson_p: [],

            s: null,
            p: null,

            newS: {
                price: '',
                product_kit_id: '',
            },
            newP:{
                price: '',
                count: '',
                product_id: ''
            },

            editingIndex: null,

            showCreateS: false,

            showCreateP: false,
            
            showError: false,

            message: ''
        }
    },
    methods: {
        createS(){
            UserService.createSale(this.newS).then(
                response => {
                    if (response.status === 200) {
                        this.showCreateP = false
                        window.location.reload()
                    }
                })
                .catch(
                        error => {
                            this.showError = true
                            this.message = error
                        }
                    )
        },
        createP(){
            UserService.createPurchase(this.newP).then(
                response => {
                    if (response.status === 200) {
                        this.showCreateP = false
                        window.location.reload()
                    }
                })
                .catch(
                        error => {
                            this.showError = true
                            this.message = error
                        }
                    )
        }
    },
    mounted() {
        UserService.getSaleList().then(
            response => {
                this.myJson_s = response.data
            }
        ),
        UserService.getPurchaseList().then(
            response => {
                this.myJson_p = response.data
            }
        )
    }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>