// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"MemoryGame.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MemoryGame =
/*#__PURE__*/
function () {
  function MemoryGame() {
    _classCallCheck(this, MemoryGame);

    this.suits = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008'];
    this.newSuits = this.mixSuits(this.suits);
    this.memory = document.getElementById('memory');
    this.winText = document.getElementById('winText');
    this.firstCard = null;
    this.secondCard = null;
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.countTries = 0;
    this.countPairs = 0;

    var _that = this;

    this.flipCard = function () {
      if (_that.lockBoard) return;
      if (this === _that.firstCard) return;
      this.classList.add('flip');

      if (_that.hasFlippedCard == false) {
        _that.hasFlippedCard = true;
        _that.firstCard = this;
        return;
      }

      _that.secondCard = this;

      _that.matchCard();
    };
  }

  _createClass(MemoryGame, [{
    key: "mixSuits",
    value: function mixSuits(suits) {
      return suits.sort(function () {
        return .5 - Math.random();
      });
    }
  }, {
    key: "createCards",
    value: function createCards() {
      var _this = this;

      this.newSuits.map(function (newSuits, i) {
        var card = document.createElement('div');
        var img_front = document.createElement('img');
        var img_back = document.createElement('img');
        card.className = 'card';
        card.addEventListener('click', _this.flipCard);
        card.id = "".concat(i);
        card.name = "".concat(newSuits);
        memory.prepend(card);
        img_back.className = 'back';
        img_back.src = "https://raw.githubusercontent.com/Boardonly/images/master/images/".concat(newSuits, ".jpg");
        img_front.className = 'front';
        img_front.src = "https://raw.githubusercontent.com/Boardonly/images/master/images/back.jpg";
        card.prepend(img_back, img_front);
      });
    } // flipCard () {
    //   if (this.lockBoard) return;
    //   if (this === this.firstCard) return;
    //   this.classList.add('flip');
    //   console.log(this);
    //   if (this.hasFlippedCard == false) {
    //     this.hasFlippedCard = true;
    //     this.firstCard = this;
    //     console.log(this.firstCard);
    //     return;
    //   }
    //   this.secondCard = this;
    //   console.log(this.secondCard, 2);
    //   () => matchCard();
    // }

  }, {
    key: "unflipCard",
    value: function unflipCard() {
      var _this2 = this;

      this.lockBoard = true;
      setTimeout(function () {
        _this2.firstCard.classList.remove('flip');

        _this2.secondCard.classList.remove('flip');

        _this2.reset();
      }, 750);
    }
  }, {
    key: "matchCard",
    value: function matchCard() {
      this.countTries += 1;

      if (this.firstCard.name === this.secondCard.name) {
        this.disableCards();
      } else {
        this.unflipCard();
      }
    }
  }, {
    key: "disableCards",
    value: function disableCards() {
      this.firstCard.removeEventListener('click', this.flipCard);
      this.secondCard.removeEventListener('click', this.flipCard);
      this.countPairs += 1;
      this.win();
      this.reset();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.hasFlippedCard = false;
      this.lockBoard = false;
      this.firstCard = null;
      this.secondCard = null;
    }
  }, {
    key: "win",
    value: function win() {
      if (this.countPairs === 8) {
        this.winText.innerHTML = "\u0423\u0440\u0430. \u042D\u0442\u043E \u041F\u043E\u0431\u0435\u0434\u0430 \u0437\u0430 ".concat(this.countTries, " ").concat(this.ends(), "!!!");
      }
    }
  }, {
    key: "ends",
    value: function ends() {
      var count = this.countTries % 100;

      if (count >= 5 && count <= 20) {
        this.txt = 'ходов';
      } else {
        count = count % 10;

        if (count == 1) {
          this.txt = 'ход';
        } else if (count >= 2 && count <= 4) {
          this.txt = 'хода';
        }
      }

      return this.txt;
    }
  }]);

  return MemoryGame;
}();

var q = new MemoryGame();
q.createCards();
},{}],"C:/Users/user/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51276" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:/Users/user/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","MemoryGame.js"], null)
//# sourceMappingURL=/MemoryGame.bb3a8e26.map