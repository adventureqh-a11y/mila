import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,schedule,dueCards,validState,dateKey} from '../model.js';
test('starter decks contain 12 valid cards each',()=>{const s=initialState();assert.ok(validState(s));assert.equal(dueCards(s,'he').length,12);assert.equal(dueCards(s,'en').length,12);});
test('known answers progress through intervals and cap at 60 days',()=>{let c=initialState().cards[0];for(const days of [1,3,7,14,30,60,60]){c=schedule(c,true,1000);assert.equal(c.due,1000+days*86400000);}assert.equal(c.stage,6);assert.equal(c.reviews,7);});
test('forgotten card resets and returns exactly after one minute',()=>{const c=schedule({...initialState().cards[0],stage:4},false,1000);assert.equal(c.stage,0);assert.equal(c.due,61000);const s={cards:[c]};assert.equal(dueCards(s,'he',60999).length,0);assert.equal(dueCards(s,'he',61000).length,1);assert.equal(schedule(c,true,61000).due,61000+86400000);});
test('backup round trip and invalid data rejection',()=>{const s=initialState();assert.ok(validState(JSON.parse(JSON.stringify(s))));for(const bad of [null,{}, {...s,version:2},{...s,cards:[s.cards[0],s.cards[0]]},{...s,cards:[{...s.cards[0],stage:99}]},{...s,cards:[{...s.cards[0],word:' '}]},{...s,history:[{time:0,known:'yes',deck:'he'}]}])assert.equal(validState(bad),false);});
test('scheduling is immutable and dates use local calendar',()=>{const c=initialState().cards[0];schedule(c,true);assert.equal(c.reviews,0);assert.equal(dateKey(new Date(2026,10,2,23,59)), '2026-11-2');});
