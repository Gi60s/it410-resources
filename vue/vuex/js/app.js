(function() {

    // (1) build out the store
    const store = new Vuex.Store({
        
        // (2) take data properties and store here
        state: {

        },

        // (4) define mutations
        mutations: {
            // decrement - takes name in payload
            // increment - takes name in payload
            // set - takes object with name and value in payload
        }
    })

    const app = new Vue({
        el: "#app",

        // (3) replace data properties with computed properties
        data: {
            low: 0,
            high: 10,
            value: 0
        }
    });
})();