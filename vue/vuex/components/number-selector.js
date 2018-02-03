Vue.component('number-selector', {
    template: `<div class="number-selector">
        <button @click="less()">&lt;</button>
        <div>{{value}}</div>
        <button @click="more()">&gt;</button>
    </div>`,

    // (6) add computed property "value" that pulls from the store, validates
    // that it is within max and min, and commits a "set" event if
    // the value needs to be changed
    computed: {

    },

    // we've added a required name property
    props: {
        name: {
            type: String,
            required: true
        },
        max: Number,
        min: Number
    },

    // (5) have less and more commit events
    methods: {
        less: function() {
            if (this.min === undefined || this.value > this.min) {
                // commit "decrement" event with name in payload
            }
        },
        more: function() {
            if (this.max === undefined || this.value < this.max) {
                // commit "increment" event with name in payload
            }
        }
    }
})