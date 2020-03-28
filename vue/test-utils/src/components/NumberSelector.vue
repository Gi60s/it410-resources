<template>
  <div class="number-selector">
    <button @click="less()">&lt;</button>
    <div>{{value}}</div>
    <button @click="more()">&gt;</button>
  </div>
</template>

<script>
export default {
  name: 'NumberSelector',
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
}
</script>

<style scoped>
.number-selector {
    display: flex;
    width: 300px;
}
.number-selector > * {
    border: 1px solid #888;
    padding: 6px;
}
.number-selector > button {
    width: 30px;
    cursor: pointer;
}
.number-selector > div {
    border-right: none;
    border-left: none;
    flex: 1;
    width: auto;
}
</style>