import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import NumberSelector from '@/components/NumberSelector.vue'

describe('NumberSelector.vue', () => {

  it('renders value when passed in as property', () => {
    // https://vue-test-utils.vuejs.org/api/#shallowmount
    const wrapper = shallowMount(NumberSelector, {
      propsData: {
        value: 1
      }
    })
    expect(wrapper.text()).to.include('1')
  })

  it('has two buttons', () => {
    const wrapper = shallowMount(NumberSelector, {})

    // find all buttons
    // https://vue-test-utils.vuejs.org/api/wrapper/#findall
    const buttons = wrapper.findAll('button')
    expect(buttons.length).to.equal(2)
  })

  it('emits decremented value when left button clicked', () => {
    const value = 1
    const wrapper = shallowMount(NumberSelector, {
      propsData: {
        value
      }
    })

    // get first button
    // https://vue-test-utils.vuejs.org/api/wrapper/#findall
    const button = wrapper.findAll('button').at(0)

    // click button
    // https://vue-test-utils.vuejs.org/api/wrapper/#trigger
    button.trigger('click')

    // see what events were emitted
    // https://vue-test-utils.vuejs.org/api/wrapper/#emitted
    const emitted = wrapper.emitted()['value-change']
    expect(emitted.length).to.equal(1)

    const firstEventValues = emitted[0]
    expect(firstEventValues[0]).to.equal(value - 1)
  })


})
