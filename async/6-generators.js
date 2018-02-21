'use strict';

const count = function * () {
    console.log('started');
    yield 1;
    yield 2;
    return 3;
}

const t0 = Date.now();
const it = count();
console.log('generator called');

setTimeout(() => {
    let state;
    console.log(Date.now() - t0);
    
    state = it.next();
    console.log(state.value, state.done);

    state = it.next();
    console.log(state.value, state.done);

    state = it.next();
    console.log(state.value, state.done);
}, 1000);