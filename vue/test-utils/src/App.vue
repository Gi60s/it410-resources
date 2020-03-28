<template>
  <div id="app">
    <h1>Number Selector</h1>

    <div>
      <label>Low Value</label>
      <number-selector :value="low" v-on:value-change="lowChanged" data-cy-number-selector data-cy="low"></number-selector>
    </div>

    <div>
      <label>High Value</label>
      <number-selector :value="high" v-on:value-change="highChanged" data-cy-number-selector data-cy="high"></number-selector>
    </div>

    <div>
      <label>Select a Number</label>
      <number-selector :value="value" :min="low" :max="high" v-on:value-change="valueChanged" data-cy-number-selector data-cy="value"></number-selector>
    </div>
  </div>
</template>

<script>
import NumberSelector from './components/NumberSelector.vue'

export default {
  name: 'App',
  components: {
    NumberSelector
  },
  data () {
    return {
      low: 0,
      high: 10,
      value: 0
    }
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
}
</script>

<style>
body {
    padding: 15px;
    font-family: Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: 1rem;
}

#app > div {
  margin-bottom: 16px;
}

#app label {
    display: block;
    margin-bottom: 3px;
}
</style>
