'use strict';

define("ember-quickstart/tests/integration/components/day-word-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | day-word', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <DayWord />
      */
      {
        id: "8bpDNQsN",
        block: "{\"symbols\":[],\"statements\":[[5,\"day-word\",[],[[],[]]]],\"hasEval\":false}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <DayWord>
              template block text
            </DayWord>
          
      */
      {
        id: "mzlfBqpe",
        block: "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[5,\"day-word\",[],[[],[]],{\"statements\":[[0,\"\\n        template block text\\n      \"]],\"parameters\":[]}],[0,\"\\n    \"]],\"hasEval\":false}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("ember-quickstart/tests/integration/components/letter-box-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | letter-box', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <LetterBox />
      */
      {
        id: "S1JFDev8",
        block: "{\"symbols\":[],\"statements\":[[5,\"letter-box\",[],[[],[]]]],\"hasEval\":false}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <LetterBox>
              template block text
            </LetterBox>
          
      */
      {
        id: "yMXxijtF",
        block: "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[5,\"letter-box\",[],[[],[]],{\"statements\":[[0,\"\\n        template block text\\n      \"]],\"parameters\":[]}],[0,\"\\n    \"]],\"hasEval\":false}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("ember-quickstart/tests/integration/components/main-game-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | main-game', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <MainGame />
      */
      {
        id: "KjonUDWh",
        block: "{\"symbols\":[],\"statements\":[[5,\"main-game\",[],[[],[]]]],\"hasEval\":false}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <MainGame>
              template block text
            </MainGame>
          
      */
      {
        id: "mfZd1LE3",
        block: "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[5,\"main-game\",[],[[],[]],{\"statements\":[[0,\"\\n        template block text\\n      \"]],\"parameters\":[]}],[0,\"\\n    \"]],\"hasEval\":false}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("ember-quickstart/tests/integration/components/word-row-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | word-row', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        <WordRow />
      */
      {
        id: "5UiQajlU",
        block: "{\"symbols\":[],\"statements\":[[5,\"word-row\",[],[[],[]]]],\"hasEval\":false}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template(
      /*
        
            <WordRow>
              template block text
            </WordRow>
          
      */
      {
        id: "dVecOopN",
        block: "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[5,\"word-row\",[],[[],[]],{\"statements\":[[0,\"\\n        template block text\\n      \"]],\"parameters\":[]}],[0,\"\\n    \"]],\"hasEval\":false}",
        meta: {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("ember-quickstart/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/day-word.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/day-word.js should pass ESLint\n\n');
  });
  QUnit.test('components/letter-box.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/letter-box.js should pass ESLint\n\n');
  });
  QUnit.test('components/main-game.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/main-game.js should pass ESLint\n\n10:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n87:5 - Unexpected console statement. (no-console)');
  });
  QUnit.test('components/word-row.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/word-row.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
});
define("ember-quickstart/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('ember-quickstart/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-quickstart/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('ember-quickstart/templates/components/day-word.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-quickstart/templates/components/day-word.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('ember-quickstart/templates/components/letter-box.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-quickstart/templates/components/letter-box.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('ember-quickstart/templates/components/main-game.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-quickstart/templates/components/main-game.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('ember-quickstart/templates/components/word-row.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'ember-quickstart/templates/components/word-row.hbs should pass TemplateLint.\n\n');
  });
});
define("ember-quickstart/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('integration/components/day-word-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/day-word-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/letter-box-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/letter-box-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/main-game-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/main-game-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/word-row-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/word-row-test.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
define("ember-quickstart/tests/test-helper", ["ember-quickstart/app", "ember-quickstart/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define('ember-quickstart/config/environment', [], function() {
  var prefix = 'ember-quickstart';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('ember-quickstart/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
