<template>

    <div>тут должна быть карточка</div>
    <!-- <div class="card">
        <div class="card-header" id="headingOne">
        <h5 class="mb-0">
            <button :class="card.button.buttonClass"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    :aria-expanded="card.button.ariaExpanded"
                    aria-controls="collapseOne"
                    @click.prevent="OnClickButtonCard">
            <span class="card-title">{{title}}</span>
            </button>
        </h5>
        </div>

        <div id="collapseOne"
             :class="card.cardClass"
             aria-labelledby="headingOne"
             data-parent="#accordion">
        <div class="card-body">
            <slot></slot>
        </div>
        </div>
    </div> -->
</template>


<script>
// TODO: Сделать карточку
export default {
    data(){
        return{
            card: {
                button: {
                    active: false,
                    ariaExpanded: false,
                    buttonClass: 'btn btn-link collapsed',
                },
                cardClass: 'collapse'
            }
        }
    },
    props: {
        title: String,
    },
    methods: {
        OnClickButtonCard(){
            this.card.button.active = !this.card.button.active
            this.card.button.ariaExpanded = !this.card.button.ariaExpanded
            if(this.card.button.active){
                this.card.button.buttonClass = 'btn btn-link'
                this.card.cardClass = 'collapse show'
            }
            else{
                this.card.button.buttonClass = 'btn btn-link collapsed'
                this.card.cardClass = 'collapse'
            }

        }
    }
}
</script>
