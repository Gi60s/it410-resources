(function() {
    const store = new Vuex.Store({
        state: {
            low: 0,
            high: 10,
            value: 0
        },
        mutations: {
            decrement: (state, payload) => {
                state[payload]--;
            },
            increment: (state, payload) => {
                state[payload]++;
            },
            set: (state, payload) => {
                state[payload.name] = payload.value;
            }
        }
    });

    const app = new Vue({
        el: "#app",
        store: store,
        computed: {
            low: function() {
                return this.$store.state.low;
            },
            high: function () { 
                return this.$store.state.high;
            },
            value: function () {
                return this.$store.state.value;
            }
        }
    });
})();