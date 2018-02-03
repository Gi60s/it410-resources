(function() {
    const app = new Vue({
        el: "#app",
        data: {
            low: 0,
            high: 10,
            value: 0
        },
        methods: {
            lowChanged: function(value) {
                this.low = value;
                if (this.value < value) this.value = value;
            },
            highChanged: function(value) {
                this.high = value;
                if (this.value > value) this.value = value;
            },
            valueChanged: function(value) {
                this.value = value;
            }
        }
    });
})();