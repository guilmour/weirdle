'use strict';



;define("ember-quickstart/app", ["exports", "ember-quickstart/resolver", "ember-load-initializers", "ember-quickstart/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("ember-quickstart/components/day-word", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = Ember.Component.extend({
    dayWord: "Hi",
    init() {
      this._super(...arguments);
      this.getWords();
    },
    async getWords() {
      let randomNumber = Math.floor(Math.random() * 340);
      const response = await fetch('https://challenge.trio.dev/api/v1/wordle-words');
      let words = await response.json();
      this.set('dayWord', words[randomNumber]);
    }
  });
  _exports.default = _default;
});
;define("ember-quickstart/components/letter-box", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = Ember.Component.extend({
    letter: null,
    dayWord: null,
    index: null,
    init() {
      this._super(...arguments);
    },
    get isLetterContained() {
      return !this.isLetterOnRightPlace && this.dayWord?.includes(this.letter);
    },
    get isLetterOnRightPlace() {
      return this.dayWord ? this.dayWord[this.index] === this.letter : null;
    },
    get boxColor() {
      if (this.isLetterOnRightPlace) {
        return 'green';
      } else if (this.isLetterContained) {
        return 'orange';
      }
      return 'blue';
    }
  });
  _exports.default = _default;
});
;define("ember-quickstart/components/main-game", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = Ember.Component.extend({
    dayWord: null,
    shortcutKey: null,
    inputWord: '',
    triesCount: [],
    saveRow: false,
    MAX_ATTEMPTS: 6,
    isGameFinished: false,
    notificationMessage: "",
    init() {
      this._super(...arguments);
      this.getWords();
      let self = this;
      addEventListener('keydown', function () {
        self.didKeyPress(event);
      });
      this.showNotification(Ember.String.htmlSafe('Write with your keyboard and use Enter to submit. <br> <br> 🟢 Green is right letter on the right place. <br> 🟠 Orange is for a present letter but on the wrong position.'), 5);
      this.triesCount.push(1);
    },
    isGameFinishedRight: Ember.computed('inputWord', function () {
      return this.inputWord === this.dayWord;
    }),
    isGameFinishedWrong: Ember.computed('triesCount.length', function () {
      return this.triesCount.length > this.MAX_ATTEMPTS;
    }),
    notEnoughLetters: Ember.computed('inputWord.length', function () {
      return this.inputWord.length <= 4;
    }),
    didKeyPress(event) {
      if (this.isGameFinishedRight || this.isGameFinishedWrong) {
        this.set('isGameFinished', true);
      }
      if (!this.isGameFinished) {
        const key = event.key;
        const typedChar = String.fromCharCode(event.keyCode);

        // https://stackoverflow.com/questions/9906885/detect-backspace-and-del-on-input-event
        if (key === 'Backspace' || key === 'Delete') {
          this.set('inputWord', this.inputWord.slice(0, -1));
        }
        if (key === 'Enter' && this.triesCount.length <= this.MAX_ATTEMPTS) {
          if (this.notEnoughLetters) {
            this.showNotification('Not enough letters ❌', 1.5);
          } else {
            this.triesCount.pushObject(1);
            Ember.run.later(this, function () {
              this.set('inputWord', '');
            }, 500);
          }
        } else if (this.notEnoughLetters && this.isLetter(typedChar)) {
          this.set('inputWord', this.inputWord + typedChar);
        }
      }
    },
    isLetter(str) {
      // https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
      return str.length === 1 && str.match(/[a-z]/i);
    },
    async getWords() {
      let randomNumber = Math.floor(Math.random() * 340);
      const response = await fetch('https://challenge.trio.dev/api/v1/wordle-words');
      let words = await response.json();
      this.set('dayWord', words[randomNumber]);
      console.log('the correct word is: ' + words[randomNumber]);
    },
    showNotification(message, seconds) {
      this.set('notificationMessage', message);
      Ember.run.later(this, function () {
        this.set('notificationMessage', '');
      }, seconds * 1000);
    }
  });
  _exports.default = _default;
});
;define("ember-quickstart/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("ember-quickstart/components/word-row", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = Ember.Component.extend({
    inputWordProxy: null,
    inputWord: null,
    isSavedRow: false,
    isGameFinished: null,
    notEnoughLetters: null,
    init() {
      this._super(...arguments);
      let self = this;
      addEventListener('keydown', function () {
        self.didKeyPress(event);
      });
      this.set('inputWord', '');
    },
    typedLettersArray: Ember.computed('inputWord', function () {
      if (!this.isSavedRow) {
        return [this.inputWord[0], this.inputWord[1], this.inputWord[2], this.inputWord[3], this.inputWord[4]];
      }
      return [this.inputWordProxy[0], this.inputWordProxy[1], this.inputWordProxy[2], this.inputWordProxy[3], this.inputWordProxy[4]];
    }),
    didKeyPress(event) {
      if (!this.isGameFinished) {
        const key = event.key;
        if (key === 'Enter' && !this.isSavedRow && !this.notEnoughLetters) {
          this.set('inputWordProxy', this.inputWord);
          this.set('isSavedRow', true);
          removeEventListener('keydown', function () {
            self.didKeyPress(event);
          });
        }
      }
    }
  });
  _exports.default = _default;
});
;define("ember-quickstart/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (_exports, _and) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "and", {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
});
;define("ember-quickstart/helpers/app-version", ["exports", "ember-quickstart/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;
  function appVersion(_) {
    let hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;
    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }
  var _default = Ember.Helper.helper(appVersion);
  _exports.default = _default;
});
;define("ember-quickstart/helpers/eq", ["exports", "ember-truth-helpers/helpers/eq"], function (_exports, _eq) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _eq.default;
    }
  });
  Object.defineProperty(_exports, "equal", {
    enumerable: true,
    get: function () {
      return _eq.equal;
    }
  });
});
;define("ember-quickstart/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (_exports, _gt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(_exports, "gt", {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
;define("ember-quickstart/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (_exports, _gte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(_exports, "gte", {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
;define("ember-quickstart/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (_exports, _isArray) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(_exports, "isArray", {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
;define("ember-quickstart/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (_exports, _isEmpty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
;define("ember-quickstart/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (_exports, _isEqual) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(_exports, "isEqual", {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
;define("ember-quickstart/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (_exports, _lt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(_exports, "lt", {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
;define("ember-quickstart/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (_exports, _lte) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(_exports, "lte", {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
;define("ember-quickstart/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-eq"], function (_exports, _notEq) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _notEq.default;
    }
  });
  Object.defineProperty(_exports, "notEqualHelper", {
    enumerable: true,
    get: function () {
      return _notEq.notEqualHelper;
    }
  });
});
;define("ember-quickstart/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (_exports, _not) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(_exports, "not", {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
;define("ember-quickstart/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (_exports, _or) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(_exports, "or", {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
;define("ember-quickstart/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("ember-quickstart/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("ember-quickstart/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (_exports, _xor) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(_exports, "xor", {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
;define("ember-quickstart/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "ember-quickstart/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }
  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("ember-quickstart/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',
    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
  _exports.default = _default;
});
;define("ember-quickstart/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (_exports, _setupContainer, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    ```app/services/store.js
    import DS from 'ember-data';
  
    export default DS.Store.extend({
      adapter: 'custom'
    });
    ```
  
    ```app/controllers/posts.js
    import { Controller } from '@ember/controller';
  
    export default Controller.extend({
      // ...
    });
  
    When the application is initialized, `ApplicationStore` will automatically be
    instantiated, and the instance of `PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("ember-quickstart/initializers/export-application-global", ["exports", "ember-quickstart/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }
      var value = _environment.default.exportApplicationGlobal;
      var globalName;
      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }
      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }
  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("ember-quickstart/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
  _exports.default = _default;
});
;define("ember-quickstart/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("ember-quickstart/router", ["exports", "ember-quickstart/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {});
  var _default = Router;
  _exports.default = _default;
});
;define("ember-quickstart/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = Ember.HTMLBars.template({
    "id": "txIBzRNF",
    "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[5,\"main-game\",[],[[],[]]],[0,\"\\n\"],[0,\"\\n\"],[1,[22,\"outlet\"],false]],\"hasEval\":false}",
    "meta": {
      "moduleName": "ember-quickstart/templates/application.hbs"
    }
  });
  _exports.default = _default;
});
;define("ember-quickstart/templates/components/day-word", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = Ember.HTMLBars.template({
    "id": "vi5DqqEm",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[8],[0,\"\\n  \"],[1,[23,0,[\"dayWord\"]],false],[0,\"\\n\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "ember-quickstart/templates/components/day-word.hbs"
    }
  });
  _exports.default = _default;
});
;define("ember-quickstart/templates/components/letter-box", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = Ember.HTMLBars.template({
    "id": "cAYDgxM5",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[11,\"class\",[29,[\"letter-box \",[23,0,[\"boxColor\"]]]]],[8],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"letter\"],[8],[0,\"\\n    \"],[1,[23,0,[\"letter\"]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "ember-quickstart/templates/components/letter-box.hbs"
    }
  });
  _exports.default = _default;
});
;define("ember-quickstart/templates/components/main-game", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = Ember.HTMLBars.template({
    "id": "fqmvt0Fm",
    "block": "{\"symbols\":[\"try\",\"index\"],\"statements\":[[7,\"div\",true],[10,\"class\",\"main-area\"],[8],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"title\"],[8],[0,\"\\n    \"],[7,\"h1\",true],[8],[0,\"weirdle. 🧑‍🎤\"],[9],[0,\"\\n    \"],[7,\"h6\",true],[8],[0,\"just another wordle game.\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"game\"],[8],[0,\"\\n\"],[4,\"each\",[[23,0,[\"triesCount\"]]],null,{\"statements\":[[4,\"if\",[[28,\"lte\",[[23,2,[]],5],null]],null,{\"statements\":[[0,\"        \"],[5,\"word-row\",[],[[\"@dayWord\",\"@inputWord\",\"@isGameFinished\",\"@notEnoughLetters\"],[[23,0,[\"dayWord\"]],[23,0,[\"inputWord\"]],[23,0,[\"isGameFinished\"]],[23,0,[\"notEnoughLetters\"]]]]],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1,2]},null],[0,\"  \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[23,0,[\"isGameFinishedRight\"]]],null,{\"statements\":[[0,\"    \"],[7,\"h3\",true],[8],[0,\"Congratulations, you got the word right! 🥳 \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[23,0,[\"isGameFinishedWrong\"]]],null,{\"statements\":[[0,\"    \"],[7,\"h3\",true],[8],[0,\"Oops, it seems you do not got the right word! 😢 \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"notifications\"],[8],[0,\"\\n    \"],[1,[23,0,[\"notificationMessage\"]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"footer\"],[8],[0,\"\\n    \"],[7,\"small\",true],[8],[0,\"\\n      by guilmour\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "ember-quickstart/templates/components/main-game.hbs"
    }
  });
  _exports.default = _default;
});
;define("ember-quickstart/templates/components/word-row", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = Ember.HTMLBars.template({
    "id": "CINgAFYA",
    "block": "{\"symbols\":[\"letter\",\"index\"],\"statements\":[[7,\"div\",true],[10,\"class\",\"word-row\"],[8],[0,\"\\n\"],[4,\"each\",[[23,0,[\"typedLettersArray\"]]],null,{\"statements\":[[0,\"    \"],[5,\"letter-box\",[],[[\"@letter\",\"@dayWord\",\"@index\"],[[23,1,[]],[23,0,[\"dayWord\"]],[23,2,[]]]]],[0,\"\\n\"]],\"parameters\":[1,2]},null],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "ember-quickstart/templates/components/word-row.hbs"
    }
  });
  _exports.default = _default;
});
;

;define('ember-quickstart/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("ember-quickstart/app")["default"].create({"name":"ember-quickstart","version":"0.0.0+e453f602"});
          }
        
//# sourceMappingURL=ember-quickstart.map
