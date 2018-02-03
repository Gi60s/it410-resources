Vue.component('number-selector', {
    template: `<div class="number-selector">
        <button @click="less()">&lt;</button>
        <div>{{value}}</div>
        <button @click="more()">&gt;</button>
    </div>`,
    data: function() {
        return {}
    },
    props: {
        max: Number,
        min: Number,
        value: {
            type: Number,
            validate: function(value) {
                return value > this.min && value <= this.max
            }
        }
    },
    methods: {
        less: function() {
            if (this.min === undefined || this.value > this.min) {
                this.$emit('value-change', this.value - 1);
            }
        },
        more: function() {
            if (this.max === undefined || this.value < this.max) {
                this.$emit('value-change', this.value + 1);
            }
        }
    }
})