<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Продукты</h5> 
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Название</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(data, id) in myJson_p"
                            :key="id"
                        >
                            <td scope="row">{{ data.id }}</td>
                            <td scope="row"><a href="javascript:void(0)" @click="editP(data.id)">{{ data.name }}</a></td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="btn btn-success" @click="showCreateP = true">Создать</button>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Продуктовые Наборы</h5> 
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Продукт</th>
                            <th scope="col">Количество</th>
                            <th scope="col">Время производства</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(data, id) in myJson_pk"
                            :key="id"
                        >
                            <td scope="row">{{ data.id }}</td>
                            <td scope="row"><a href="javascript:void(0)" @click="editPK(data.id)">{{ data.product }}</a></td>
                            <td scope="row">{{ data.count }}</td>
                            <td scope="row">{{ data.time }}</td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="btn btn-success" @click="showCreatePK = true">Создать</button>
            </div>
        </div>

        <div v-if="editModalP">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">{{ p.name }}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="editModalP = false, p = null">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label for="id">ID</label>
                                    <input
                                        v-model="p.id"
                                        label="id"
                                        type="text"
                                        class="form-control"
                                        name="id"
                                        readonly
                                    />
                                    <label for="name">Название</label>
                                    <input
                                        v-model="p.name"
                                        label="name"
                                        type="text"
                                        class="form-control"
                                        name="name"
                                    />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="editModalP = false, p = null">Отмена</button>
                                    <button type="button" class="btn btn-success" @click="updateP">Сохранить</button>
                                    <button type="button" class="btn btn-danger" @click="showDeleteP = true">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        
        <div v-if="showDeleteP">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Вы уверены?</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="showDelete = false">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showDeleteP = false">Отмена</button>
                                    <button type="button" class="btn btn-danger" @click="deleteP(p.id)">Удалить</button>
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
                        <div class="modal-dialog modal-dialog-scrollable" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Создать продукт</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="showCreateP = false">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label for="name">Название</label>
                                    <input
                                        v-model="newP.name"
                                        label="name"
                                        type="text"
                                        class="form-control"
                                        name="name"
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

        <div v-if="editModalPK">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog modal-dialog-scrollable" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Продуктовый набор "{{ pk.product }}"</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="editModalPK = false, pk = null">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label for="id">ID</label>
                                    <input
                                        v-model="pk.id"
                                        label="id"
                                        type="text"
                                        class="form-control"
                                        name="id"
                                        readonly
                                    />
                                    <label for="product">Продукт</label>
                                    <div>
                                        <select class="form-control" name="product" v-model="pk.product">
                                            <option v-for="(data, key) in myJson_p" 
                                            :key="key">{{ data.name }}</option>
                                        </select>
                                    </div>
                                    <label for="count">Количество</label>
                                    <input
                                        v-model="pk.count"
                                        label="count"
                                        type="text"
                                        class="form-control"
                                        name="count"
                                    />
                                    <label for="time">Время производства</label>
                                    <input
                                        v-model="pk.time"
                                        label="time"
                                        type="text"
                                        class="form-control"
                                        name="time"
                                    />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="editModalPK = false, pk = null">Отмена</button>
                                    <button type="button" class="btn btn-success" @click="updatePK">Сохранить</button>
                                    <button type="button" class="btn btn-danger" @click="showDeletePK = true">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        
        <div v-if="showDeletePK">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Вы уверены?</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="showDelete = false">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showDeletePK = false">Отмена</button>
                                    <button type="button" class="btn btn-danger" @click="deletePK(pk.id)">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <div v-if="showCreatePK">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Создать продуктовый набор</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="showCreatePK = false">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <label for="product">Продукт</label>
                                    <div>
                                        <select class="form-control" name="product" v-model="newPK.product">
                                            <option v-for="(data, key) in myJson_p" 
                                            :key="key">{{ data.name }}</option>
                                        </select>
                                    </div>
                                    <label for="count">Количество</label>
                                    <input
                                        v-model="newPK.count"
                                        label="count"
                                        type="text"
                                        class="form-control"
                                        name="count"
                                    />
                                    <label for="time">Время производства</label>
                                    <input
                                        v-model="newPK.time"
                                        label="time"
                                        type="text"
                                        class="form-control"
                                        name="time"
                                    />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="showCreatePK = false">Отмена</button>
                                    <button type="button" class="btn btn-success" @click="createPK()">Сохранить</button>
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
            myJson_p: [],
            myJson_pk: [],
            myJson_pkWithP: [],

            p: null,
            pk: null,

            newP: {
                name: '',
            },
            newPK:{
                count: '',
                time: '',
                product: ''
            },

            editingIndex: null,

            editModalP: false,
            showDeleteP: false,
            showCreateP: false,

            editModalPK: false,
            showDeletePK: false,
            showCreatePK: false,
            
            showError: false,

            message: ''
        }
    },
    methods: {
        editP(id){
            var index = this.myJson_p.findIndex(e => e.id === id)
            if (index > -1)
            {
                this.editingIndex = index
                this.p = JSON.parse(JSON.stringify(this.myJson_p[index]))
                this.editModalP = true
            }
        },
        updateP(){
            UserService.updateP(this.p).then(
                response => {
                    if (response.status === 200) {
                        this.editModalP = false
                        window.location.reload()
                    }
                }
            )
            .catch(
                        error => {
                            this.showError = true
                            this.message = error
                        }
                    )
        },
        deleteP(id){
            var index = this.myJson_p.findIndex(e => e.id === id)
            if (index > -1)
            {
                this.editingIndex = index
                this.p = JSON.parse(JSON.stringify(this.myJson_p[index]))
                UserService.deleteP(this.p.id).then(
                    response => {
                        if (response.status === 204) {
                        this.showDeleteP = false
                        this.editModalP = false
                        window.location.reload()
                        }
                    })
                    .catch(
                        error => {
                            this.showDeleteP = false
                            this.showError = true
                            this.message = error
                        }
                    )
            }
        },
        createP() {
            UserService.createP(this.newP).then(
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

        editPK(id){
            var index = this.myJson_pk.findIndex(e => e.id === id)
            if (index > -1)
            {
                this.editingIndex = index
                this.pk = JSON.parse(JSON.stringify(this.myJson_pk[index]))

                var index_product = this.myJson_p.findIndex(e => e.id === this.pk.product)
                if (index > -1)
                {
                    var p = JSON.parse(JSON.stringify(this.myJson_p[index_product]))
                    this.pk.product = p.name
                }

                this.editModalPK = true
            }
        },
        updatePK(){
            var index = this.myJson_p.findIndex(e => e.name === this.pk.product)
            if (index > -1)
            {
                var p = JSON.parse(JSON.stringify(this.myJson_p[index]))
                this.pk.product = p.id
            }
            UserService.updatePK(this.pk).then(
                response => {
                    if (response.status === 200) {
                        this.editModalPK = false
                        window.location.reload()
                    }
                }
            )
            .catch(
                        error => {
                            this.showError = true
                            this.message = error
                        }
                    )
        },
        deletePK(id){
            var index = this.myJson_pk.findIndex(e => e.id === id)
            if (index > -1)
            {
                this.editingIndex = index
                this.pk = JSON.parse(JSON.stringify(this.myJson_pk[index]))
                UserService.deletePK(this.pk.id).then(
                    response => {
                        if (response.status === 204) {
                        this.showDeletePK = false
                        this.editModalPK = false
                        window.location.reload()
                        }
                    })
                    .catch(
                        error => {
                            this.showDeletePK = false
                            this.showError = true
                            this.message = error
                        }
                    )
            }
        },
        createPK() {
            var index = this.myJson_p.findIndex(e => e.name === this.newPK.product)
            if (index > -1)
            {
                var p = JSON.parse(JSON.stringify(this.myJson_p[index]))
                this.newPK.product = p.id
            }
            UserService.createPK(this.newPK).then(
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
        UserService.getPList().then(
            response => {
                this.myJson_p = response.data
            }
        ),
        UserService.getPKList().then(
            response => {
                this.myJson_pk = response.data
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