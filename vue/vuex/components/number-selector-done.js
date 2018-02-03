Vue.component('number-selector', {
    template: `<div class="number-selector">
        <button @click="less()">&lt;</button>
        <div>{{value}}</div>
        <button @click="more()">&gt;</button>
    </div>`,
    computed: {
        value: function () {
            const value = this.$store.state[this.name];
            let val = value;
            if (this.max !== undefined && this.max < value) val = this.max;
            if (this.min !== undefined && this.min > value) val = this.min;
            if (val !== value) {
                this.$store.commit('set', {
                    name: this.name,
                    value: val
                });
            }
            return val;
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        max: Number,
        min: Number
    },
    methods: {
        less: function() {
            if (this.min === undefined || this.value > this.min) {
                this.$store.commit('decrement', this.name);
            }
        },
        more: function() {
            if (this.max === undefined || this.value < this.max) {
                this.$store.commit('increment', this.name);
            }
        }
    }
})