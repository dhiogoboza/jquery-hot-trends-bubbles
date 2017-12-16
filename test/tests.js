// test if jQuery is available
QUnit.test("jQuery test if exists", function(assert) {
  assert.ok(jQuery, "jQuery window object exists");
  assert.ok($, "jQuery's dollar object exists");
  assert.ok($.fn, "jQuery's dollar fn function exists");
});

// test if $.fn.timeline is available
QUnit.test("$.fn.hotTrendsBubbles jquery function test if exists", function(assert) {
  assert.ok($.fn.hotTrendsBubbles, "$.fn.hotTrendsBubbles exists");
});

QUnit.todo("$.fn.hotTrendsBubbles test", function(assert) {
});
