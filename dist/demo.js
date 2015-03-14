/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/css-selectors-demo/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		switch(typeof modules[i]) {
		case "number":
			// Module is a copy of another module
			modules[i] = modules[modules[i]];
			break;
		case "object":
			// Module can be created from a template
			modules[i] = (function(_m) {
				var args = _m.slice(1), fn = modules[_m[0]];
				return function (a,b,c) {
					fn.apply(null, [a,b,c].concat(args));
				};
			}(modules[i]));
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var AppVM, AppView, app, node;
	
	AppView = __webpack_require__(3);
	
	AppVM = __webpack_require__(4);
	
	app = new AppVM;
	
	node = AppView(app).data.node;
	
	document.body.appendChild(node);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var HTMRendererViewModel;
	
	HTMRendererViewModel = (function() {
	  function HTMRendererViewModel() {
	    this.nodeList = new nx.Collection;
	  }
	
	  HTMRendererViewModel.prototype.render = function(nodes) {
	    return this.nodeList.reset(nodes);
	  };
	
	  return HTMRendererViewModel;
	
	})();
	
	module.exports = HTMRendererViewModel;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var HTMRendererView, TagView,
	  slice = [].slice;
	
	TagView = __webpack_require__(11);
	
	__webpack_require__(13);
	
	HTMRendererView = function(vm) {
	  return nxt.Element('pre', nxt.Element.apply(nxt, ['code'].concat(slice.call(nxt.Classes('hljs xml')), [nxt.Collection(vm.nodeList, TagView)])));
	};
	
	module.exports = HTMRendererView;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var AppView, MatchRendererView;
	
	MatchRendererView = __webpack_require__(6);
	
	AppView = function(vm) {
	  return nxt.Element('main', nxt.Element('div', nxt.Class('selector-input'), nxt.Element('input', nxt.Attr('type', 'text'), nxt.Attr('placeholder', 'Type Your CSS Selector'), nxt.ValueBinding(vm.selector))), MatchRendererView(vm.matchRendererVM));
	};
	
	module.exports = AppView;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var AppViewModel, Colors, MatchRendererVM, NodesCollection, buildTree, expandAbbreviation;
	
	MatchRendererVM = __webpack_require__(5);
	
	NodesCollection = __webpack_require__(7);
	
	Colors = __webpack_require__(8);
	
	expandAbbreviation = __webpack_require__(12).expandAbbreviation;
	
	AppViewModel = (function() {
	  function AppViewModel() {
	    this.matchRendererVM = new MatchRendererVM;
	    this.nodesCollection = new nx.Cell({
	      action: (function(_this) {
	        return function(nodesCollection) {
	          return _this.matchRendererVM.render(nodesCollection);
	        };
	      })(this)
	    });
	    this.selector = new nx.Cell({
	      action: (function(_this) {
	        return function(selector) {
	          var i, id, len, markers, node, nodes;
	          _this.matchRendererVM.markers.switchOff();
	          nodes = _this.qsa(selector);
	          markers = {};
	          for (i = 0, len = nodes.length; i < len; i++) {
	            node = nodes[i];
	            id = node.__id;
	            markers[id] = {
	              color: Colors.GREEN,
	              solid: true
	            };
	          }
	          return _this.matchRendererVM.mark(markers);
	        };
	      })(this)
	    });
	    this.update();
	    window.onhashchange = this.update.bind(this);
	  }
	
	  AppViewModel.prototype.render = function(emmetString) {
	    var html;
	    if (!emmetString) {
	      return;
	    }
	    html = expandAbbreviation(emmetString);
	    this.nodesCollection.value = NodesCollection.fromHTML(html);
	    return this.dom = buildTree(this.nodesCollection.value);
	  };
	
	  AppViewModel.prototype.qsa = function(selector) {
	    var e, nodes;
	    return nodes = (function() {
	      try {
	        return this.dom.querySelectorAll(selector);
	      } catch (_error) {
	        e = _error;
	        return [];
	      }
	    }).call(this);
	  };
	
	  AppViewModel.prototype.update = function() {
	    var hash;
	    hash = window.location.hash.replace('#', '');
	    return this.render(decodeURI(hash));
	  };
	
	  return AppViewModel;
	
	})();
	
	buildTree = function(nodes) {
	  var _node, attr, currentNode, i, indent, j, len, len1, node, prevNode, prevNodeIsClosing, ref, root;
	  root = document.createDocumentFragment();
	  currentNode = root;
	  prevNode = null;
	  prevNodeIsClosing = false;
	  indent = 0;
	  for (i = 0, len = nodes.length; i < len; i++) {
	    node = nodes[i];
	    if (node.type === 'opening') {
	      prevNodeIsClosing = false;
	      _node = document.createElement(node.tagName);
	      _node.__id = node.id;
	      ref = node.attrs;
	      for (j = 0, len1 = ref.length; j < len1; j++) {
	        attr = ref[j];
	        _node.setAttribute(attr.name, attr.value);
	      }
	      if (indent < node.indent) {
	        currentNode = prevNode;
	      }
	      if (indent > node.indent) {
	        currentNode = currentNode.parentNode;
	      }
	      currentNode.appendChild(_node);
	      indent = node.indent;
	      prevNode = _node;
	    } else {
	      if (prevNodeIsClosing) {
	        indent--;
	        currentNode = currentNode.parentNode;
	      }
	      prevNodeIsClosing = true;
	    }
	  }
	  return root;
	};
	
	module.exports = AppViewModel;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var HTMRendererViewModel, MarkersCollection, MatchRendererViewModel,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	HTMRendererViewModel = __webpack_require__(1);
	
	MarkersCollection = __webpack_require__(9);
	
	MatchRendererViewModel = (function(superClass) {
	  extend(MatchRendererViewModel, superClass);
	
	  function MatchRendererViewModel() {
	    MatchRendererViewModel.__super__.constructor.apply(this, arguments);
	    this.markers = new MarkersCollection;
	  }
	
	  MatchRendererViewModel.prototype.mark = function(markers) {
	    var highlightConfig, id, results;
	    results = [];
	    for (id in markers) {
	      highlightConfig = markers[id];
	      results.push(this.markers.switchOn(this.markers.map[id], highlightConfig));
	    }
	    return results;
	  };
	
	  MatchRendererViewModel.prototype.render = function(nodeList) {
	    var i, id, ids, index, items, len;
	    ids = nodeList.filter(function(node) {
	      return node.type === 'opening' || !node.childless && node.type === 'closing';
	    }).map(function(node) {
	      return node.id;
	    });
	    items = new MarkersCollection(ids.length).items;
	    this.markers.map = {};
	    for (index = i = 0, len = ids.length; i < len; index = ++i) {
	      id = ids[index];
	      this.markers.map[id] = index;
	    }
	    this.markers.reset(items);
	    MatchRendererViewModel.__super__.render.call(this, nodeList);
	    return this;
	  };
	
	  return MatchRendererViewModel;
	
	})(HTMRendererViewModel);
	
	module.exports = MatchRendererViewModel;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var HTMRendererView, MarkerView, MatchRendererView;
	
	MarkerView = __webpack_require__(10);
	
	HTMRendererView = __webpack_require__(2);
	
	__webpack_require__(15);
	
	MatchRendererView = function(vm) {
	  return nxt.Element('div', nxt.Class('match-renderer hljs'), nxt.Element('div', nxt.Class('match-markers'), nxt.Collection(vm.markers, MarkerView)), HTMRendererView(vm));
	};
	
	module.exports = MatchRendererView;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var NodesCollection;
	
	NodesCollection = (function() {
	  function NodesCollection() {}
	
	  NodesCollection.createRoot = function() {
	    var body, df;
	    df = document.createDocumentFragment();
	    body = document.createElement('body');
	    df.appendChild(body);
	    return body;
	  };
	
	  NodesCollection.fromHTML = function(html) {
	    var nodesCollection, root;
	    root = this.createRoot();
	    root.innerHTML = html;
	    root.__level = -1;
	    root.__id = 0;
	    nodesCollection = this.map(root).slice(1, -1);
	    return nodesCollection;
	  };
	
	  NodesCollection.map = function(element) {
	    var child, elementId, i, indent, index, len, nodes, ref;
	    nodes = [];
	    indent = element.__level + 1;
	    elementId = element.__id;
	    index = 0;
	    nodes.push(this.mapElement(element, 'opening'));
	    ref = element.children;
	    for (i = 0, len = ref.length; i < len; i++) {
	      child = ref[i];
	      child.__level = indent;
	      child.__id = elementId + "." + (++index);
	      nodes = nodes.concat(this.map(child));
	    }
	    element.__level = indent - 1;
	    element.__id = "x" + elementId;
	    nodes.push(this.mapElement(element, 'closing'));
	    return nodes;
	  };
	
	  NodesCollection.mapElement = function(element, type) {
	    var attrs, index, item;
	    attrs = (function() {
	      var i, ref, results;
	      results = [];
	      for (index = i = 0, ref = element.attributes.length; 0 <= ref ? i < ref : i > ref; index = 0 <= ref ? ++i : --i) {
	        item = element.attributes.item(index);
	        results.push({
	          childless: element.children.length === 0,
	          name: item.name,
	          value: item.value
	        });
	      }
	      return results;
	    })();
	    return {
	      tagName: element.nodeName.toLowerCase(),
	      id: element.__id,
	      attrs: attrs,
	      indent: element.__level,
	      type: type,
	      childless: element.children.length === 0
	    };
	  };
	
	  return NodesCollection;
	
	})();
	
	module.exports = NodesCollection;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  RED: 1,
	  GREEN: 2
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Marker, MarkersCollection,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Marker = __webpack_require__(17);
	
	MarkersCollection = (function(superClass) {
	  extend(MarkersCollection, superClass);
	
	  function MarkersCollection(length) {
	    MarkersCollection.__super__.constructor.call(this, {
	      items: (function() {
	        var i, ref, results;
	        results = [];
	        for (i = 0, ref = length - 1; 0 <= ref ? i <= ref : i >= ref; 0 <= ref ? i++ : i--) {
	          results.push(new Marker);
	        }
	        return results;
	      })()
	    });
	  }
	
	  MarkersCollection.prototype.switchOn = function(index, highlightConfig) {
	    return this.items[index].switchOn(highlightConfig);
	  };
	
	  MarkersCollection.prototype.switchOff = function(index) {
	    if (!index && index !== 0) {
	      return this.items.forEach(function(marker) {
	        return marker.switchOff();
	      });
	    } else {
	      return this.items[index].switchOff();
	    }
	  };
	
	  MarkersCollection.prototype.switchedOn = function() {
	    return this.items.filter(function(marker) {
	      return marker.switchedOn();
	    });
	  };
	
	  return MarkersCollection;
	
	})(nx.Collection);
	
	module.exports = MarkersCollection;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var MarkerView;
	
	MarkerView = function(marker, index) {
	  return nxt.Element('div', nxt.Class('marker'), nxt.Binding(marker.switchedOn, function(switchedOn) {
	    if (switchedOn) {
	      return nxt.Class('switched-on');
	    }
	  }), nxt.Binding(marker.highlightConfig, function() {
	    var classList;
	    classList = marker.classList;
	    if (classList.length) {
	      return nxt.Class(classList);
	    }
	  }), nxt.Attr('style', "top: " + (index * 1.5) + "em"));
	};
	
	module.exports = MarkerView;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var AttrView, IndentView, TagView,
	  slice = [].slice;
	
	IndentView = __webpack_require__(18);
	
	AttrView = __webpack_require__(19);
	
	TagView = function(node) {
	  return nxt.Element('span', nxt.Class('hljs-tag'), (node.childless ? nxt.Class('childless') : void 0), nxt.If.apply(nxt, [node.type === 'opening', IndentView(node.indent), nxt.Text('<'), nxt.Element('span', nxt.Class('hljs-title'), nxt.Text("" + node.tagName))].concat(slice.call((function() {
	    var attr, i, len, ref, results;
	    ref = node.attrs;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      attr = ref[i];
	      results.push(AttrView(attr));
	    }
	    return results;
	  })()), [(function() {
	    if (node.type === 'selfclosing') {
	      return nxt.Text('/>');
	    } else {
	      return nxt.Text('>');
	    }
	  })()], [(!node.childless ? nxt.Text('\n') : void 0)])), nxt.If(node.type === 'closing', nxt.Fragment((!node.childless ? IndentView(node.indent) : void 0), nxt.Class('closing'), nxt.Text('</'), nxt.Element('span', nxt.Class('hljs-title'), nxt.Text("" + node.tagName)), nxt.Text('>\n'))));
	};
	
	module.exports = TagView;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var global = typeof self != 'undefined' ? self : this;
	
		var utils = __webpack_require__(22);
		var actions = __webpack_require__(23);
		var parser = __webpack_require__(24);
		var file = __webpack_require__(25);
	
		var preferences = __webpack_require__(26);
		var resources = __webpack_require__(27);
		var profile = __webpack_require__(28);
		var ciu = __webpack_require__(29);
		var logger = __webpack_require__(30);
	
		var sliceFn = Array.prototype.slice;
	
		/**
		 * Returns file name part from path
		 * @param {String} path Path to file
		 * @return {String}
		 */
		function getFileName(path) {
			var re = /([\w\.\-]+)$/i;
			var m = re.exec(path);
			return m ? m[1] : '';
		}
	
		/**
		 * Normalizes profile definition: converts some
		 * properties to valid data types
		 * @param {Object} profile
		 * @return {Object}
		 */
		function normalizeProfile(profile) {
			if (typeof profile === 'object') {
				if ('indent' in profile) {
					profile.indent = !!profile.indent;
				}
	
				if ('self_closing_tag' in profile) {
					if (typeof profile.self_closing_tag === 'number') {
						profile.self_closing_tag = !!profile.self_closing_tag;
					}
				}
			}
	
			return profile;
		}
		
		return {
			/**
			 * The essential function that expands Emmet abbreviation
			 * @param {String} abbr Abbreviation to parse
			 * @param {String} syntax Abbreviation's context syntax
			 * @param {String} profile Output profile (or its name)
			 * @param {Object} contextNode Contextual node where abbreviation is
			 * written
			 * @return {String}
			 */
			expandAbbreviation: function(abbr, syntax, profile, contextNode) {
				return parser.expand(abbr, {
					syntax: syntax,
					profile: profile,
					contextNode: contextNode
				});
			},
	
			/**
			 * Runs given action
			 * @param  {String} name Action name
			 * @param  {IEmmetEditor} editor Editor instance
			 * @return {Boolean} Returns true if action was performed successfully
			 */
			run: function(name) {
				return actions.run.apply(actions, sliceFn.call(arguments, 0));
			},
	
			/**
			 * Loads Emmet extensions. Extensions are simple .js files that
			 * uses Emmet modules and resources to create new actions, modify
			 * existing ones etc.
			 * @param {Array} fileList List of absolute paths to files in extensions 
			 * folder. Back-end app should not filter this list (e.g. by extension) 
			 * but return it "as-is" so bootstrap can decide how to load contents 
			 * of each file.
			 * This method requires a <code>file</code> module of <code>IEmmetFile</code> 
			 * interface to be implemented.
			 * @memberOf bootstrap
			 */
			loadExtensions: function(fileList) {
				var payload = {};
				var userSnippets = null;
				var that = this;
	
				// make sure file list contians only valid extension files
				fileList = fileList.filter(function(f) {
					var ext = file.getExt(f);
					return ext === 'json' || ext === 'js';
				});
	
				var reader = (file.readText || file.read).bind(file);
				var next = function() {
					if (fileList.length) {
						var f = fileList.shift();
						reader(f, function(err, content) {
							if (err) {
								logger.log('Unable to read "' + f + '" file: '+ err);
								return next();
							}
													
							switch (file.getExt(f)) {
								case 'js':
									try {
										eval(content);
									} catch (e) {
										logger.log('Unable to eval "' + f + '" file: '+ e);
									}
									break;
								case 'json':
									var fileName = getFileName(f).toLowerCase().replace(/\.json$/, '');
									if (/^snippets/.test(fileName)) {
										if (fileName === 'snippets') {
											// data in snippets.json is more important to user
											userSnippets = utils.parseJSON(content);
										} else {
											payload.snippets = utils.deepMerge(payload.snippets || {}, utils.parseJSON(content));
										}
									} else {
										payload[fileName] = content;
									}
									
									break;
							}
							
							next();
						});
					} else {
						// complete
						if (userSnippets) {
							payload.snippets = utils.deepMerge(payload.snippets || {}, userSnippets);
						}
						
						that.loadUserData(payload);
					}
				};
				
				next();
			},
			
			/**
			 * Loads preferences from JSON object (or string representation of JSON)
			 * @param {Object} data
			 * @returns
			 */
			loadPreferences: function(data) {
				preferences.load(utils.parseJSON(data));
			},
			
			/**
			 * Loads user snippets and abbreviations. It doesn’t replace current
			 * user resource vocabulary but merges it with passed one. If you need 
			 * to <i>replaces</i> user snippets you should call 
			 * <code>resetSnippets()</code> method first
			 */
			loadSnippets: function(data) {
				data = utils.parseJSON(data);
				
				var userData = resources.getVocabulary('user') || {};
				resources.setVocabulary(utils.deepMerge(userData, data), 'user');
			},
			
			/**
			 * Helper function that loads default snippets, defined in project’s
			 * <i>snippets.json</i>
			 * @param {Object} data
			 */
			loadSystemSnippets: function(data) {
				resources.setVocabulary(utils.parseJSON(data), 'system');
			},
	
			/**
			 * Helper function that loads Can I Use database
			 * @param {Object} data
			 */
			loadCIU: function(data) {
				ciu.load(utils.parseJSON(data));
			},
			
			/**
			 * Removes all user-defined snippets
			 */
			resetSnippets: function() {
				resources.setVocabulary({}, 'user');
			},
			
			/**
			 * Helper function that loads all user data (snippets and preferences)
			 * defined as a single JSON object. This is useful for loading data 
			 * stored in a common storage, for example <code>NSUserDefaults</code>
			 * @param {Object} data
			 */
			loadUserData: function(data) {
				data = utils.parseJSON(data);
				if (data.snippets) {
					this.loadSnippets(data.snippets);
				}
				
				if (data.preferences) {
					this.loadPreferences(data.preferences);
				}
				
				if (data.profiles) {
					this.loadProfiles(data.profiles);
				}
	
				if (data.caniuse) {
					this.loadCIU(data.caniuse);
				}
				
				var profiles = data.syntaxProfiles || data.syntaxprofiles;
				if (profiles) {
					this.loadSyntaxProfiles(profiles);
				}
			},
			
			/**
			 * Resets all user-defined data: preferences, snippets etc.
			 * @returns
			 */
			resetUserData: function() {
				this.resetSnippets();
				preferences.reset();
				profile.reset();
			},
			
			/**
			 * Load syntax-specific output profiles. These are essentially 
			 * an extension to syntax snippets 
			 * @param {Object} profiles Dictionary of profiles
			 */
			loadSyntaxProfiles: function(profiles) {
				profiles = utils.parseJSON(profiles);
				var snippets = {};
				Object.keys(profiles).forEach(function(syntax) {
					var options = profiles[syntax];
					if (!(syntax in snippets)) {
						snippets[syntax] = {};
					}
					snippets[syntax].profile = normalizeProfile(options);
				});
				
				this.loadSnippets(snippets);
			},
			
			/**
			 * Load named profiles
			 * @param {Object} profiles
			 */
			loadProfiles: function(profiles) {
				profiles = utils.parseJSON(profiles);
				Object.keys(profiles).forEach(function(name) {
					profile.create(name, normalizeProfile(profiles[name]));
				});
			},
			require: __webpack_require__(21),
	
			// expose some useful data for plugin authors
			file: file,
			preferences: preferences,
			resources: resources,
			profile: profile,
			tabStops: __webpack_require__(31),
			htmlMatcher: __webpack_require__(32),
			utils: {
				common: utils,
				action: __webpack_require__(33),
				editor: __webpack_require__(34)
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/r1zzu/w/css-selectors-demo/node_modules/css-loader/index.js!/Users/r1zzu/w/css-selectors-demo/bower_components/highlightjs/styles/github.css", function() {
			var newContent = require("!!/Users/r1zzu/w/css-selectors-demo/node_modules/css-loader/index.js!/Users/r1zzu/w/css-selectors-demo/bower_components/highlightjs/styles/github.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	exports.push([module.id, "/*\n\ngithub.com style (c) Vasily Polovnyov <vast@whiteants.net>\n\n*/\n\n.hljs {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  color: #333;\n  background: #f8f8f8;\n  -webkit-text-size-adjust: none;\n}\n\n.hljs-comment,\n.diff .hljs-header,\n.hljs-javadoc {\n  color: #998;\n  font-style: italic;\n}\n\n.hljs-keyword,\n.css .rule .hljs-keyword,\n.hljs-winutils,\n.nginx .hljs-title,\n.hljs-subst,\n.hljs-request,\n.hljs-status {\n  color: #333;\n  font-weight: bold;\n}\n\n.hljs-number,\n.hljs-hexcolor,\n.ruby .hljs-constant {\n  color: #008080;\n}\n\n.hljs-string,\n.hljs-tag .hljs-value,\n.hljs-phpdoc,\n.hljs-dartdoc,\n.tex .hljs-formula {\n  color: #d14;\n}\n\n.hljs-title,\n.hljs-id,\n.scss .hljs-preprocessor {\n  color: #900;\n  font-weight: bold;\n}\n\n.hljs-list .hljs-keyword,\n.hljs-subst {\n  font-weight: normal;\n}\n\n.hljs-class .hljs-title,\n.hljs-type,\n.vhdl .hljs-literal,\n.tex .hljs-command {\n  color: #458;\n  font-weight: bold;\n}\n\n.hljs-tag,\n.hljs-tag .hljs-title,\n.hljs-rules .hljs-property,\n.django .hljs-tag .hljs-keyword {\n  color: #000080;\n  font-weight: normal;\n}\n\n.hljs-attribute,\n.hljs-variable,\n.lisp .hljs-body {\n  color: #008080;\n}\n\n.hljs-regexp {\n  color: #009926;\n}\n\n.hljs-symbol,\n.ruby .hljs-symbol .hljs-string,\n.lisp .hljs-keyword,\n.clojure .hljs-keyword,\n.scheme .hljs-keyword,\n.tex .hljs-special,\n.hljs-prompt {\n  color: #990073;\n}\n\n.hljs-built_in {\n  color: #0086b3;\n}\n\n.hljs-preprocessor,\n.hljs-pragma,\n.hljs-pi,\n.hljs-doctype,\n.hljs-shebang,\n.hljs-cdata {\n  color: #999;\n  font-weight: bold;\n}\n\n.hljs-deletion {\n  background: #fdd;\n}\n\n.hljs-addition {\n  background: #dfd;\n}\n\n.diff .hljs-change {\n  background: #0086b3;\n}\n\n.hljs-chunk {\n  color: #aaa;\n}\n", ""]);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/r1zzu/w/css-selectors-demo/node_modules/css-loader/index.js!/Users/r1zzu/w/css-selectors-demo/node_modules/stylus-loader/index.js!/Users/r1zzu/w/css-selectors-demo/src/match-renderer/style/main.styl", function() {
			var newContent = require("!!/Users/r1zzu/w/css-selectors-demo/node_modules/css-loader/index.js!/Users/r1zzu/w/css-selectors-demo/node_modules/stylus-loader/index.js!/Users/r1zzu/w/css-selectors-demo/src/match-renderer/style/main.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	exports.push([module.id, ".match-renderer {\n  position: relative;\n  padding: 0.5em;\n}\n.match-renderer pre {\n  margin: 0;\n  margin-left: 1.5em;\n  position: relative;\n}\n.match-renderer pre code {\n  padding: 0;\n  line-height: 1.5em;\n  background: transparent;\n}\n.match-renderer pre code .hljs-tag {\n  padding-left: 0.5em;\n}\n.match-renderer pre code .hljs-tag.childless.closing {\n  padding-left: 0;\n}\n.match-renderer .match-markers .marker {\n  position: absolute;\n  height: 1.5em;\n  left: 0;\n  right: 0;\n  margin-top: 0.5em;\n}\n.match-renderer .match-markers .marker.marker-green:before {\n  border-color: #a6e22e;\n}\n.match-renderer .match-markers .marker.marker-green.marker-solid:before {\n  background: #a6e22e;\n}\n.match-renderer .match-markers .marker.marker-red:before {\n  border-color: #f92672;\n}\n.match-renderer .match-markers .marker.marker-red.marker-solid:before {\n  background: #f92672;\n}\n.match-renderer .match-markers .marker:nth-child(even) {\n  background: rgba(0,0,0,0.05);\n}\n.match-renderer .match-markers .marker.switched-on:before {\n  content: \"\";\n}\n.match-renderer .match-markers .marker:before {\n  display: block;\n  position: absolute;\n  top: 0.2em;\n  bottom: 0.2em;\n  left: 0.2em;\n  width: 0.9em;\n  border-radius: 50%;\n  border-width: 2px;\n  border-style: solid;\n  border-color: transparent;\n}\n", ""]);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Colors, Marker;
	
	Colors = __webpack_require__(8);
	
	Marker = (function() {
	  Marker.getClassList = function(config) {
	    var classList;
	    classList = [Marker.colorClassMap[config.color]];
	    if (config.solid) {
	      classList.push('marker-solid');
	    }
	    return classList.join(' ');
	  };
	
	  Marker.colorClassMap = {};
	
	  Marker.colorClassMap[Colors.RED] = 'marker-red';
	
	  Marker.colorClassMap[Colors.GREEN] = 'marker-green';
	
	  function Marker() {
	    this.switchedOn = new nx.Cell({
	      value: false
	    });
	    this.classList = '';
	    this.highlightConfig = new nx.Cell({
	      action: (function(_this) {
	        return function(config) {
	          if (config) {
	            return _this.classList = Marker.getClassList(config);
	          } else {
	            return _this.classList = '';
	          }
	        };
	      })(this)
	    });
	  }
	
	  Marker.prototype.switchOn = function(highlightConfig) {
	    this.switchedOn.value = true;
	    return this.highlightConfig.value = highlightConfig;
	  };
	
	  Marker.prototype.switchOff = function() {
	    this.switchOn.value = false;
	    return this.highlightConfig.value = null;
	  };
	
	  return Marker;
	
	})();
	
	module.exports = Marker;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var INDENT_SYMBOL, IndentView;
	
	INDENT_SYMBOL = '  ';
	
	IndentView = function(indentSize) {
	  var i, indent, ref;
	  indent = '';
	  if (indentSize > 0) {
	    for (i = 0, ref = indentSize; 0 <= ref ? i <= ref : i >= ref; 0 <= ref ? i++ : i--) {
	      indent = "" + indent + INDENT_SYMBOL;
	    }
	  }
	  return nxt.Text(indent);
	};
	
	module.exports = IndentView;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var AttrView,
	  slice = [].slice;
	
	AttrView = function(attr) {
	  return nxt.Element.apply(nxt, ['span', nxt.Element('span', nxt.Class('hljs-attribute'), nxt.Text(" " + attr.name))].concat(slice.call(nxt.Fragment(nxt.If(attr.value, nxt.Text('='), nxt.Element('span', nxt.Class('hljs-value'), nxt.Text("\"" + attr.value + "\"")))))));
	};
	
	module.exports = AttrView;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./action/balance": 43,
		"./action/balance.js": 43,
		"./action/base64": 37,
		"./action/base64.js": 37,
		"./action/editPoints": 38,
		"./action/editPoints.js": 38,
		"./action/evaluateMath": 39,
		"./action/evaluateMath.js": 39,
		"./action/expandAbbreviation": 40,
		"./action/expandAbbreviation.js": 40,
		"./action/incrementDecrement": 41,
		"./action/incrementDecrement.js": 41,
		"./action/lineBreaks": 42,
		"./action/lineBreaks.js": 42,
		"./action/main": 23,
		"./action/main.js": 23,
		"./action/mergeLines": 44,
		"./action/mergeLines.js": 44,
		"./action/reflectCSSValue": 45,
		"./action/reflectCSSValue.js": 45,
		"./action/removeTag": 46,
		"./action/removeTag.js": 46,
		"./action/selectItem": 47,
		"./action/selectItem.js": 47,
		"./action/selectLine": 48,
		"./action/selectLine.js": 48,
		"./action/splitJoinTag": 49,
		"./action/splitJoinTag.js": 49,
		"./action/toggleComment": 50,
		"./action/toggleComment.js": 50,
		"./action/updateImageSize": 51,
		"./action/updateImageSize.js": 51,
		"./action/updateTag": 53,
		"./action/updateTag.js": 53,
		"./action/wrapWithAbbreviation": 52,
		"./action/wrapWithAbbreviation.js": 52,
		"./assets/caniuse": 29,
		"./assets/caniuse.js": 29,
		"./assets/elements": 64,
		"./assets/elements.js": 64,
		"./assets/handlerList": 63,
		"./assets/handlerList.js": 63,
		"./assets/htmlMatcher": 32,
		"./assets/htmlMatcher.js": 32,
		"./assets/logger": 30,
		"./assets/logger.js": 30,
		"./assets/preferences": 26,
		"./assets/preferences.js": 26,
		"./assets/profile": 28,
		"./assets/profile.js": 28,
		"./assets/range": 36,
		"./assets/range.js": 36,
		"./assets/resources": 27,
		"./assets/resources.js": 27,
		"./assets/stringScore": 67,
		"./assets/stringScore.js": 67,
		"./assets/stringStream": 56,
		"./assets/stringStream.js": 56,
		"./assets/tabStops": 31,
		"./assets/tabStops.js": 31,
		"./assets/tokenIterator": 68,
		"./assets/tokenIterator.js": 68,
		"./editTree/base": 70,
		"./editTree/base.js": 70,
		"./editTree/css": 71,
		"./editTree/css.js": 71,
		"./editTree/xml": 72,
		"./editTree/xml.js": 72,
		"./emmet": 12,
		"./emmet.js": 12,
		"./filter/bem": 73,
		"./filter/bem.js": 73,
		"./filter/comment": 74,
		"./filter/comment.js": 74,
		"./filter/css": 75,
		"./filter/css.js": 75,
		"./filter/escape": 76,
		"./filter/escape.js": 76,
		"./filter/format": 77,
		"./filter/format.js": 77,
		"./filter/haml": 78,
		"./filter/haml.js": 78,
		"./filter/html": 79,
		"./filter/html.js": 79,
		"./filter/jade": 80,
		"./filter/jade.js": 80,
		"./filter/main": 54,
		"./filter/main.js": 54,
		"./filter/singleLine": 81,
		"./filter/singleLine.js": 81,
		"./filter/slim": 82,
		"./filter/slim.js": 82,
		"./filter/trim": 83,
		"./filter/trim.js": 83,
		"./filter/xsl": 84,
		"./filter/xsl.js": 84,
		"./generator/lorem": 57,
		"./generator/lorem.js": 57,
		"./interfaces/IEmmetEditor": 85,
		"./interfaces/IEmmetEditor.js": 85,
		"./interfaces/IEmmetFile": 86,
		"./interfaces/IEmmetFile.js": 86,
		"./parser/abbreviation": 24,
		"./parser/abbreviation.js": 24,
		"./parser/css": 87,
		"./parser/css.js": 87,
		"./parser/processor/attributes": 61,
		"./parser/processor/attributes.js": 61,
		"./parser/processor/href": 62,
		"./parser/processor/href.js": 62,
		"./parser/processor/pastedContent": 58,
		"./parser/processor/pastedContent.js": 58,
		"./parser/processor/resourceMatcher": 60,
		"./parser/processor/resourceMatcher.js": 60,
		"./parser/processor/tagName": 59,
		"./parser/processor/tagName.js": 59,
		"./parser/xml": 88,
		"./parser/xml.js": 88,
		"./plugin/file": 25,
		"./plugin/file.js": 25,
		"./resolver/css": 66,
		"./resolver/css.js": 66,
		"./resolver/cssGradient": 89,
		"./resolver/cssGradient.js": 89,
		"./resolver/gradient/linear": 90,
		"./resolver/gradient/linear.js": 90,
		"./resolver/tagName": 91,
		"./resolver/tagName.js": 91,
		"./utils/abbreviation": 55,
		"./utils/abbreviation.js": 55,
		"./utils/action": 33,
		"./utils/action.js": 33,
		"./utils/base64": 93,
		"./utils/base64.js": 93,
		"./utils/comments": 94,
		"./utils/comments.js": 94,
		"./utils/common": 22,
		"./utils/common.js": 22,
		"./utils/cssSections": 95,
		"./utils/cssSections.js": 95,
		"./utils/editor": 34,
		"./utils/editor.js": 34,
		"./utils/math": 96,
		"./utils/math.js": 96,
		"./utils/template": 97,
		"./utils/template.js": 97,
		"./vendor/almond": 98,
		"./vendor/almond.js": 98,
		"./vendor/klass": 99,
		"./vendor/klass.js": 99,
		"./vendor/stringScore": 65,
		"./vendor/stringScore.js": 65
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 21;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Common utility helper for Emmet
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var range = __webpack_require__(36);
	
		/** 
		 * Special token used as a placeholder for caret positions inside 
		 * generated output 
		 */
		var caretPlaceholder = '${0}';
		
		return {
			reTag: /<\/?[\w:\-]+(?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*\s*(\/?)>$/,
	
			defaultSyntax: function() {
				return 'html';
			},
	
			defaultProfile: function() {
				return 'plain';
			},
			
			/**
			 * Test if passed string ends with XHTML tag. This method is used for testing
			 * '>' character: it belongs to tag or it's a part of abbreviation? 
			 * @param {String} str
			 * @return {Boolean}
			 */
			endsWithTag: function(str) {
				return this.reTag.test(str);
			},
			
			/**
			 * Check if passed symbol is a number
			 * @param {String} ch
			 * @returns {Boolean}
			 */
			isNumeric: function(ch) {
				if (typeof(ch) == 'string')
					ch = ch.charCodeAt(0);
					
				return (ch && ch > 47 && ch < 58);
			},
			
			/**
			 * Trim whitespace from string
			 * @param {String} text
			 * @return {String}
			 */
			trim: (function() {
				if (String.prototype.trim) {
					return function(text) {
						return text ? text.trim() : '';
					};
				}
	
				return function(text) {
					return (text || "").replace(/^\s+|\s+$/g, "");
				}
			})(),
			
			/**
			 * Split text into lines. Set <code>remove_empty</code> to true to filter
			 * empty lines
			 * @param {String} text Text to split
			 * @param {Boolean} removeEmpty Remove empty lines from result
			 * @return {Array}
			 */
			splitByLines: function(text, removeEmpty) {
				// IE fails to split string by regexp, 
				// need to normalize newlines first
				// Also, Mozilla's Rhiho JS engine has a weird newline bug
				var nl = '\n';
				var lines = (text || '')
					.replace(/\r\n/g, '\n')
					.replace(/\n\r/g, '\n')
					.replace(/\r/g, '\n')
					.replace(/\n/g, nl)
					.split(nl);
				
				if (removeEmpty) {
					lines = lines.filter(function(line) {
						return line.length && !!this.trim(line);
					}, this);
				}
				
				return lines;
			},
			
			/**
			 * Repeats string <code>howMany</code> times
			 * @param {String} str
			 * @param {Number} how_many
			 * @return {String}
			 */
			repeatString: function(str, howMany) {
				var out = '';
				while (howMany--) {
					out += str;
				}
	
				return out;
			},
			
			/**
			 * Returns list of paddings that should be used to align passed string
			 * @param {Array} strings
			 * @returns {Array}
			 */
			getStringsPads: function(strings) {
				var lengths = strings.map(function(s) {
					return typeof s === 'string' ? s.length : +s;
				});
				
				var max = lengths.reduce(function(prev, cur) {
					return typeof prev === 'undefined' ? cur : Math.max(prev, cur);
				});
				return lengths.map(function(l) {
					var pad = max - l;
					return pad ? this.repeatString(' ', pad) : '';
				}, this);
			},
			
			/**
			 * Indents text with padding
			 * @param {String} text Text to indent
			 * @param {String} pad Padding size (number) or padding itself (string)
			 * @return {String}
			 */
			padString: function(text, pad) {
				var result = [];
				var lines = this.splitByLines(text);
				var nl = '\n';
					
				result.push(lines[0]);
				for (var j = 1; j < lines.length; j++) 
					result.push(nl + pad + lines[j]);
					
				return result.join('');
			},
			
			/**
			 * Pad string with zeroes
			 * @param {String} str String to pad
			 * @param {Number} pad Desired string length
			 * @return {String}
			 */
			zeroPadString: function(str, pad) {
				var padding = '';
				var il = str.length;
					
				while (pad > il++) padding += '0';
				return padding + str; 
			},
			
			/**
			 * Removes padding at the beginning of each text's line
			 * @param {String} text
			 * @param {String} pad
			 */
			unindentString: function(text, pad) {
				var lines = this.splitByLines(text);
				var pl = pad.length;
				for (var i = 0, il = lines.length, line; i < il; i++) {
					line = lines[i];
					if (line.substr(0, pl) === pad) {
						lines[i] = line.substr(pl);
					}
				}
				
				return lines.join('\n');
			},
			
			/**
			 * Replaces unescaped symbols in <code>str</code>. For example, the '$' symbol
			 * will be replaced in 'item$count', but not in 'item\$count'.
			 * @param {String} str Original string
			 * @param {String} symbol Symbol to replace
			 * @param {String} replace Symbol replacement. Might be a function that 
			 * returns new value
			 * @return {String}
			 */
			replaceUnescapedSymbol: function(str, symbol, replace) {
				var i = 0;
				var il = str.length;
				var sl = symbol.length;
				var matchCount = 0;
					
				while (i < il) {
					if (str.charAt(i) == '\\') {
						// escaped symbol, skip next character
						i += sl + 1;
					} else if (str.substr(i, sl) == symbol) {
						// have match
						var curSl = sl;
						matchCount++;
						var newValue = replace;
						if (typeof replace === 'function') {
							var replaceData = replace(str, symbol, i, matchCount);
							if (replaceData) {
								curSl = replaceData[0].length;
								newValue = replaceData[1];
							} else {
								newValue = false;
							}
						}
						
						if (newValue === false) { // skip replacement
							i++;
							continue;
						}
						
						str = str.substring(0, i) + newValue + str.substring(i + curSl);
						// adjust indexes
						il = str.length;
						i += newValue.length;
					} else {
						i++;
					}
				}
				
				return str;
			},
			
			/**
			 * Replaces '$' character in string assuming it might be escaped with '\'
			 * @param {String} str String where character should be replaced
			 * @param {String} value New value
			 * @return {String}
			 */
			replaceCounter: function(str, value, total) {
				var symbol = '$';
				// in case we received strings from Java, convert the to native strings
				str = String(str);
				value = String(value);
				
				if (/^\-?\d+$/.test(value)) {
					value = +value;
				}
				
				var that = this;
				
				return this.replaceUnescapedSymbol(str, symbol, function(str, symbol, pos, matchNum){
					if (str.charAt(pos + 1) == '{' || that.isNumeric(str.charAt(pos + 1)) ) {
						// it's a variable, skip it
						return false;
					}
					
					// replace sequense of $ symbols with padded number  
					var j = pos + 1;
					while(str.charAt(j) == '$' && str.charAt(j + 1) != '{') j++;
					var pad = j - pos;
					
					// get counter base
					var base = 0, decrement = false, m;
					if ((m = str.substr(j).match(/^@(\-?)(\d*)/))) {
						j += m[0].length;
						
						if (m[1]) {
							decrement = true;
						}
						
						base = parseInt(m[2] || 1, 10) - 1;
					}
					
					if (decrement && total && typeof value === 'number') {
						value = total - value + 1;
					}
					
					value += base;
					
					return [str.substring(pos, j), that.zeroPadString(value + '', pad)];
				});
			},
			
			/**
			 * Check if string matches against <code>reTag</code> regexp. This 
			 * function may be used to test if provided string contains HTML tags
			 * @param {String} str
			 * @returns {Boolean}
			 */
			matchesTag: function(str) {
				return this.reTag.test(str || '');
			},
			
			/**
			 * Escapes special characters used in Emmet, like '$', '|', etc.
			 * Use this method before passing to actions like "Wrap with Abbreviation"
			 * to make sure that existing special characters won't be altered
			 * @param {String} text
			 * @return {String}
			 */
			escapeText: function(text) {
				return text.replace(/([\$\\])/g, '\\$1');
			},
			
			/**
			 * Unescapes special characters used in Emmet, like '$', '|', etc.
			 * @param {String} text
			 * @return {String}
			 */
			unescapeText: function(text) {
				return text.replace(/\\(.)/g, '$1');
			},
			
			/**
			 * Returns caret placeholder
			 * @returns {String}
			 */
			getCaretPlaceholder: function() {
				return typeof caretPlaceholder === 'function'
					? caretPlaceholder.apply(this, arguments)
					: caretPlaceholder;
			},
			
			/**
			 * Sets new representation for carets in generated output
			 * @param {String} value New caret placeholder. Might be a 
			 * <code>Function</code>
			 */
			setCaretPlaceholder: function(value) {
				caretPlaceholder = value;
			},
			
			/**
			 * Returns line padding
			 * @param {String} line
			 * @return {String}
			 */
			getLinePadding: function(line) {
				return (line.match(/^(\s+)/) || [''])[0];
			},
			
			/**
			 * Helper function that returns padding of line of <code>pos</code>
			 * position in <code>content</code>
			 * @param {String} content
			 * @param {Number} pos
			 * @returns {String}
			 */
			getLinePaddingFromPosition: function(content, pos) {
				var lineRange = this.findNewlineBounds(content, pos);
				return this.getLinePadding(lineRange.substring(content));
			},
			
			/**
			 * Escape special regexp chars in string, making it usable for creating dynamic
			 * regular expressions
			 * @param {String} str
			 * @return {String}
			 */
			escapeForRegexp: function(str) {
				var specials = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"); // .*+?|()[]{}\
				return str.replace(specials, "\\$&");
			},
			
			/**
			 * Make decimal number look good: convert it to fixed precision end remove
			 * traling zeroes 
			 * @param {Number} num
			 * @param {Number} fracion Fraction numbers (default is 2)
			 * @return {String}
			 */
			prettifyNumber: function(num, fraction) {
				return num.toFixed(typeof fraction == 'undefined' ? 2 : fraction).replace(/\.?0+$/, '');
			},
			
			/**
			 * Replace substring of <code>str</code> with <code>value</code>
			 * @param {String} str String where to replace substring
			 * @param {String} value New substring value
			 * @param {Number} start Start index of substring to replace. May also
			 * be a <code>Range</code> object: in this case, the <code>end</code>
			 * argument is not required
			 * @param {Number} end End index of substring to replace. If ommited, 
			 * <code>start</code> argument is used
			 */
			replaceSubstring: function(str, value, start, end) {
				if (typeof start === 'object' && 'end' in start) {
					end = start.end;
					start = start.start;
				}
				
				if (typeof end === 'string') {
					end = start + end.length;
				}
				
				if (typeof end === 'undefined') {
					end = start;
				}
				
				if (start < 0 || start > str.length)
					return str;
				
				return str.substring(0, start) + value + str.substring(end);
			},
	
			/**
			 * Fills substrings in `content`, defined by given ranges,
			 * wich `ch` character
			 * @param  {String} content
			 * @param  {Array} ranges
			 * @return {String}
			 */
			replaceWith: function(content, ranges, ch, noRepeat) {
				if (ranges.length) {
					var offset = 0, fragments = [];
					ranges.forEach(function(r) {
						var repl = noRepeat ? ch : this.repeatString(ch, r[1] - r[0]);
						fragments.push(content.substring(offset, r[0]), repl);
						offset = r[1];
					}, this);
	
					content = fragments.join('') + content.substring(offset);
				}
	
				return content;
			},
			
			/**
			 * Narrows down text range, adjusting selection to non-space characters
			 * @param {String} text
			 * @param {Number} start Starting range in <code>text</code> where 
			 * slection should be adjusted. Can also be any object that is accepted
			 * by <code>Range</code> class
			 * @return {Range}
			 */
			narrowToNonSpace: function(text, start, end) {
				var rng = range.create(start, end);
				
				var reSpace = /[\s\n\r\u00a0]/;
				// narrow down selection until first non-space character
				while (rng.start < rng.end) {
					if (!reSpace.test(text.charAt(rng.start)))
						break;
						
					rng.start++;
				}
				
				while (rng.end > rng.start) {
					rng.end--;
					if (!reSpace.test(text.charAt(rng.end))) {
						rng.end++;
						break;
					}
				}
				
				return rng;
			},
			
			/**
			 * Find start and end index of text line for <code>from</code> index
			 * @param {String} text 
			 * @param {Number} from
			 */
			findNewlineBounds: function(text, from) {
				var len = text.length,
					start = 0,
					end = len - 1, 
					ch;
	
				
				// search left
				for (var i = from - 1; i > 0; i--) {
					ch = text.charAt(i);
					if (ch == '\n' || ch == '\r') {
						start = i + 1;
						break;
					}
				}
				// search right
				for (var j = from; j < len; j++) {
					ch = text.charAt(j);
					if (ch == '\n' || ch == '\r') {
						end = j;
						break;
					}
				}
				
				return range.create(start, end - start);
			},
	
			/**
			 * Deep merge of two or more objects. Taken from jQuery.extend()
			 */
			deepMerge: function() {
				var options, name, src, copy, copyIsArray, clone,
					target = arguments[0] || {},
					i = 1,
					length = arguments.length;
	
	
				// Handle case when target is a string or something (possible in deep copy)
				if (typeof target !== 'object' && typeof target !== 'function') {
					target = {};
				}
	
				for ( ; i < length; i++ ) {
					// Only deal with non-null/undefined values
					if ( (options = arguments[ i ]) !== null ) {
						// Extend the base object
						for ( name in options ) {
							src = target[ name ];
							copy = options[ name ];
	
							// Prevent never-ending loop
							if ( target === copy ) {
								continue;
							}
	
							// Recurse if we're merging plain objects or arrays
							if ( copy && ( typeof copy === 'object' || (copyIsArray = Array.isArray(copy)) ) ) {
								if ( copyIsArray ) {
									copyIsArray = false;
									clone = src && Array.isArray(src) ? src : [];
	
								} else {
									clone = src && typeof src === 'object' ? src : {};
								}
	
								// Never move original objects, clone them
								target[ name ] = this.deepMerge(clone, copy );
	
							// Don't bring in undefined values
							} else if ( copy !== undefined ) {
								target[ name ] = copy;
							}
						}
					}
				}
	
				// Return the modified object
				return target;
			},
	
			/**
			 * Dead simple string-to-JSON parser
			 * @param {String} str
			 * @returns {Object}
			 */
			parseJSON: function(str) {
				if (typeof str == 'object') {
					return str;
				}
				
				try {
					return JSON.parse(str);
				} catch(e) {
					return {};
				}
			},
	
	
			/**************************
			 * Utility belt
			 **************************/
			unique: function(arr, comparator) {
				var lookup = [];
				return arr.filter(function(item) {
					var val = comparator ? comparator(item) : item;
					if (lookup.indexOf(val) < 0) {
						lookup.push(val);
						return true;
					}
				});
			},
	
			/**
			 * Return a copy of the object, filtered to only have values for 
			 * the whitelisted keys. 
			 * @param  {Object} obj
			 * @return {Object}
			 */
			pick: function(obj) {
				var result = {};
				var keys = this.toArray(arguments, 1);
				Object.keys(obj).forEach(function(key) {
					if (~keys.indexOf(key)) {
						result[key] = obj[key];
					}
				});
				return result;
			},
	
			find: function(arr, comparator, ctx) {
				var result;
				if (ctx) {
					comparator = comparator.bind(ctx);
				}
	
				if (Array.isArray(arr)) {
					arr.some(function(item, i) {
						if (comparator(item, i)) {
							return result = item;
						}
					});
				} else {
					Object.keys(arr).some(function(key, i) {
						if (comparator(arr[key], i)) {
							return result = arr[key];
						}
					});
				}
	
				return result;
			},
	
			toArray: function(obj, sliceIx) {
				if (Array.isArray(obj) && !sliceIx) {
					return obj;
				}
				return Array.prototype.slice.call(obj, sliceIx || 0);
			},
	
			extend: function(obj) {
				for (var i = 1, il = arguments.length, a; i < il; i++) {
					a = arguments[i];
					if (a) {
						Object.keys(a).forEach(function(key) {
							obj[key] = a[key];
						});
					}
				}
				return obj;
			},
	
			defaults: function(obj) {
				for (var i = 1, il = arguments.length, a; i < il; i++) {
					a = arguments[i];
					if (a) {
						Object.keys(a).forEach(function(key) {
							if (!(key in obj)) {
								obj[key] = a[key];
							}
						});
					}
				}
				return obj;
			},
	
			flatten: function(arr, out) {
				out = out || [];
				var self = this;
				self.toArray(arr).forEach(function(item) {
					if (Array.isArray(item)) {
						self.flatten(item, out);
					} else {
						out.push(item);
					}
				});
	
				return out;
			},
	
			clone: function(obj) {
				if (Array.isArray(obj)) {
					return obj.slice(0);
				}
	
				return this.extend({}, obj);
			},
	
			without: function(arr) {
				this.toArray(arguments, 1).forEach(function(item) {
					var ix;
					while (~(ix = arr.indexOf(item))) {
						arr.splice(ix, 1);
					}
				});
				return arr;
			},
	
			last: function(arr) {
				return arr[arr.length - 1];
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Module describes and performs Emmet actions. The actions themselves are
	 * defined in <i>actions</i> folder
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
	
		// all registered actions
		var actions = {};
	
		// load all default actions
		var actionModules = {
			base64: __webpack_require__(37),
			editPoints: __webpack_require__(38),
			evaluateMath: __webpack_require__(39),
			expandAbbreviation: __webpack_require__(40),
			incrementDecrement: __webpack_require__(41),
			lineBreaks: __webpack_require__(42),
			balance: __webpack_require__(43),
			mergeLines: __webpack_require__(44),
			reflectCSSValue: __webpack_require__(45),
			removeTag: __webpack_require__(46),
			selectItem: __webpack_require__(47),
			selectLine: __webpack_require__(48),
			splitJoinTag: __webpack_require__(49),
			toggleComment: __webpack_require__(50),
			updateImageSize: __webpack_require__(51),
			wrapWithAbbreviation: __webpack_require__(52),
			updateTag: __webpack_require__(53)
		};
	
		function addAction(name, fn, options) {
			name = name.toLowerCase();
			options = options || {};
			
			if (typeof options === 'string') {
				options = {label: options};
			}
	
			if (!options.label) {
				options.label = humanizeActionName(name);
			}
			
			actions[name] = {
				name: name,
				fn: fn,
				options: options
			};
		}
		
		/**
		 * “Humanizes” action name, makes it more readable for people
		 * @param {String} name Action name (like 'expand_abbreviation')
		 * @return Humanized name (like 'Expand Abbreviation')
		 */
		function humanizeActionName(name) {
			return utils.trim(name.charAt(0).toUpperCase() 
				+ name.substring(1).replace(/_[a-z]/g, function(str) {
					return ' ' + str.charAt(1).toUpperCase();
				}));
		}
	
		var bind = function(name, method) {
			var m = actionModules[name];
			return m[method].bind(m);
		};
	
		// XXX register default actions
		addAction('encode_decode_data_url', bind('base64', 'encodeDecodeDataUrlAction'), 'Encode\\Decode data:URL image');
		addAction('prev_edit_point', bind('editPoints', 'previousEditPointAction'), 'Previous Edit Point');
		addAction('next_edit_point', bind('editPoints', 'nextEditPointAction'), 'Next Edit Point');
		addAction('evaluate_math_expression', bind('evaluateMath', 'evaluateMathAction'), 'Numbers/Evaluate Math Expression');
		addAction('expand_abbreviation_with_tab', bind('expandAbbreviation', 'expandAbbreviationWithTabAction'), {hidden: true});
		addAction('expand_abbreviation', bind('expandAbbreviation', 'expandAbbreviationAction'), 'Expand Abbreviation');
		addAction('insert_formatted_line_break_only', bind('lineBreaks', 'insertLineBreakOnlyAction'), {hidden: true});
		addAction('insert_formatted_line_break', bind('lineBreaks', 'insertLineBreakAction'), {hidden: true});
		addAction('balance_inward', bind('balance', 'balanceInwardAction'), 'Balance (inward)');
		addAction('balance_outward', bind('balance', 'balanceOutwardAction'), 'Balance (outward)');
		addAction('matching_pair', bind('balance', 'goToMatchingPairAction'), 'HTML/Go To Matching Tag Pair');
		addAction('merge_lines', bind('mergeLines', 'mergeLinesAction'), 'Merge Lines');
		addAction('reflect_css_value', bind('reflectCSSValue', 'reflectCSSValueAction'), 'CSS/Reflect Value');
		addAction('remove_tag', bind('removeTag', 'removeTagAction'), 'HTML/Remove Tag');
		addAction('select_next_item', bind('selectItem', 'selectNextItemAction'), 'Select Next Item');
		addAction('select_previous_item', bind('selectItem', 'selectPreviousItemAction'), 'Select Previous Item');
		addAction('split_join_tag', bind('splitJoinTag', 'splitJoinTagAction'), 'HTML/Split\\Join Tag Declaration');
		addAction('toggle_comment', bind('toggleComment', 'toggleCommentAction'), 'Toggle Comment');
		addAction('update_image_size', bind('updateImageSize', 'updateImageSizeAction'), 'Update Image Size');
		addAction('wrap_with_abbreviation', bind('wrapWithAbbreviation', 'wrapWithAbbreviationAction'), 'Wrap With Abbreviation');
		addAction('update_tag', bind('updateTag', 'updateTagAction'), 'HTML/Update Tag');
	
		[1, -1, 10, -10, 0.1, -0.1].forEach(function(num) {
			var prefix = num > 0 ? 'increment' : 'decrement';
			var suffix = String(Math.abs(num)).replace('.', '').substring(0, 2);
			var actionId = prefix + '_number_by_' + suffix;
			var actionMethod = prefix + suffix + 'Action';
			var actionLabel = 'Numbers/' + prefix.charAt(0).toUpperCase() + prefix.substring(1) + ' number by ' + Math.abs(num);
			addAction(actionId, bind('incrementDecrement', actionMethod), actionLabel);
		});
		
		return {
			/**
			 * Registers new action
			 * @param {String} name Action name
			 * @param {Function} fn Action function
			 * @param {Object} options Custom action options:<br>
			 * <b>label</b> : (<code>String</code>) – Human-readable action name. 
			 * May contain '/' symbols as submenu separators<br>
			 * <b>hidden</b> : (<code>Boolean</code>) – Indicates whether action
			 * should be displayed in menu (<code>getMenu()</code> method)
			 */
			add: addAction,
			
			/**
			 * Returns action object
			 * @param {String} name Action name
			 * @returns {Object}
			 */
			get: function(name) {
				return actions[name.toLowerCase()];
			},
			
			/**
			 * Runs Emmet action. For list of available actions and their
			 * arguments see <i>actions</i> folder.
			 * @param {String} name Action name 
			 * @param {Array} args Additional arguments. It may be array of arguments
			 * or inline arguments. The first argument should be <code>IEmmetEditor</code> instance
			 * @returns {Boolean} Status of performed operation, <code>true</code>
			 * means action was performed successfully.
			 * @example
			 * require('action/main').run('expand_abbreviation', editor);  
			 * require('action/main').run('wrap_with_abbreviation', [editor, 'div']);  
			 */
			run: function(name, args) {
				if (!Array.isArray(args)) {
					args = utils.toArray(arguments, 1);
				}
				
				var action = this.get(name);
				if (!action) {
					throw new Error('Action "' + name + '" is not defined');
				}
	
				return action.fn.apply(action, args);
			},
			
			/**
			 * Returns all registered actions as object
			 * @returns {Object}
			 */
			getAll: function() {
				return actions;
			},
			
			/**
			 * Returns all registered actions as array
			 * @returns {Array}
			 */
			getList: function() {
				var all = this.getAll();
				return Object.keys(all).map(function(key) {
					return all[key];
				});
			},
			
			/**
			 * Returns actions list as structured menu. If action has <i>label</i>,
			 * it will be splitted by '/' symbol into submenus (for example: 
			 * CSS/Reflect Value) and grouped with other items
			 * @param {Array} skipActions List of action identifiers that should be 
			 * skipped from menu
			 * @returns {Array}
			 */
			getMenu: function(skipActions) {
				var result = [];
				skipActions = skipActions || [];
				this.getList().forEach(function(action) {
					if (action.options.hidden || ~skipActions.indexOf(action.name))
						return;
					
					var actionName = humanizeActionName(action.name);
					var ctx = result;
					if (action.options.label) {
						var parts = action.options.label.split('/');
						actionName = parts.pop();
						
						// create submenus, if needed
						var menuName, submenu;
						while ((menuName = parts.shift())) {
							submenu = utils.find(ctx, function(item) {
								return item.type == 'submenu' && item.name == menuName;
							});
							
							if (!submenu) {
								submenu = {
									name: menuName,
									type: 'submenu',
									items: []
								};
								ctx.push(submenu);
							}
							
							ctx = submenu.items;
						}
					}
					
					ctx.push({
						type: 'action',
						name: action.name,
						label: actionName
					});
				});
				
				return result;
			},
	
			/**
			 * Returns action name associated with menu item title
			 * @param {String} title
			 * @returns {String}
			 */
			getActionNameForMenuTitle: function(title, menu) {
				return utils.find(menu || this.getMenu(), function(val) {
					if (val.type == 'action') {
						if (val.label == title || val.name == title) {
							return val.name;
						}
					} else {
						return this.getActionNameForMenuTitle(title, val.items);
					}
				}, this);
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Emmet abbreviation parser.
	 * Takes string abbreviation and recursively parses it into a tree. The parsed 
	 * tree can be transformed into a string representation with 
	 * <code>toString()</code> method. Note that string representation is defined
	 * by custom processors (called <i>filters</i>), not by abbreviation parser 
	 * itself.
	 * 
	 * This module can be extended with custom pre-/post-processors to shape-up
	 * final tree or its representation. Actually, many features of abbreviation 
	 * engine are defined in other modules as tree processors
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var tabStops = __webpack_require__(31);
		var profile = __webpack_require__(28);
		var filters = __webpack_require__(54);
		var utils = __webpack_require__(22);
		var abbreviationUtils = __webpack_require__(55);
		var stringStream = __webpack_require__(56);
	
		// pre- and post-processorcs
		var lorem = __webpack_require__(57);
		var procPastedContent = __webpack_require__(58);
		var procTagName = __webpack_require__(59);
		var procResourceMatcher = __webpack_require__(60);
		var procAttributes = __webpack_require__(61);
		var procHref = __webpack_require__(62);
	
		var reValidName = /^[\w\-\$\:@\!%]+\+?$/i;
		var reWord = /[\w\-:\$@]/;
		var DEFAULT_ATTR_NAME = '%default';
		
		var pairs = {
			'[': ']',
			'(': ')',
			'{': '}'
		};
		
		var spliceFn = Array.prototype.splice;
		
		var preprocessors = [];
		var postprocessors = [];
		var outputProcessors = [];
		
		/**
		 * @type AbbreviationNode
		 */
		function AbbreviationNode(parent) {
			/** @type AbbreviationNode */
			this.parent = null;
			this.children = [];
			this._attributes = [];
			
			/** @type String Raw abbreviation for current node */
			this.abbreviation = '';
			this.counter = 1;
			this._name = null;
			this._text = '';
			this.repeatCount = 1;
			this.hasImplicitRepeat = false;
			
			/** Custom data dictionary */
			this._data = {};
			
			// output properties
			this.start = '';
			this.end = '';
			this.content = '';
			this.padding = '';
		}
		
		AbbreviationNode.prototype = {
			/**
			 * Adds passed node as child or creates new child
			 * @param {AbbreviationNode} child
			 * @param {Number} position Index in children array where child should 
			 * be inserted
			 * @return {AbbreviationNode}
			 */
			addChild: function(child, position) {
				child = child || new AbbreviationNode();
				child.parent = this;
				
				if (typeof position === 'undefined') {
					this.children.push(child);
				} else {
					this.children.splice(position, 0, child);
				}
				
				return child;
			},
			
			/**
			 * Creates a deep copy of current node
			 * @returns {AbbreviationNode}
			 */
			clone: function() {
				var node = new AbbreviationNode();
				var attrs = ['abbreviation', 'counter', '_name', '_text', 'repeatCount', 'hasImplicitRepeat', 'start', 'end', 'content', 'padding'];
				attrs.forEach(function(a) {
					node[a] = this[a];
				}, this);
				
				// clone attributes
				node._attributes = this._attributes.map(function(attr) {
					return utils.extend({}, attr);
				});
				
				node._data = utils.extend({}, this._data);
				
				// clone children
				node.children = this.children.map(function(child) {
					child = child.clone();
					child.parent = node;
					return child;
				});
				
				return node;
			},
			
			/**
			 * Removes current node from parent‘s child list
			 * @returns {AbbreviationNode} Current node itself
			 */
			remove: function() {
				if (this.parent) {
					var ix = this.parent.children.indexOf(this);
					if (~ix) {
						this.parent.children.splice(ix, 1);
					}
				}
				
				return this;
			},
			
			/**
			 * Replaces current node in parent‘s children list with passed nodes
			 * @param {AbbreviationNode} node Replacement node or array of nodes
			 */
			replace: function() {
				var parent = this.parent;
				var ix = parent.children.indexOf(this);
				var items = utils.flatten(arguments);
				spliceFn.apply(parent.children, [ix, 1].concat(items));
				
				// update parent
				items.forEach(function(item) {
					item.parent = parent;
				});
			},
			
			/**
			 * Recursively sets <code>property</code> to <code>value</code> of current
			 * node and its children 
			 * @param {String} name Property to update
			 * @param {Object} value New property value
			 */
			updateProperty: function(name, value) {
				this[name] = value;
				this.children.forEach(function(child) {
					child.updateProperty(name, value);
				});
				
				return this;
			},
			
			/**
			 * Finds first child node that matches truth test for passed 
			 * <code>fn</code> function
			 * @param {Function} fn
			 * @returns {AbbreviationNode}
			 */
			find: function(fn) {
				return this.findAll(fn, {amount: 1})[0];
			},
			
			/**
			 * Finds all child nodes that matches truth test for passed 
			 * <code>fn</code> function
			 * @param {Function} fn
			 * @returns {Array}
			 */
			findAll: function(fn, state) {
				state = utils.extend({amount: 0, found: 0}, state || {});
	
				if (typeof fn !== 'function') {
					var elemName = fn.toLowerCase();
					fn = function(item) {return item.name().toLowerCase() == elemName;};
				}
					
				var result = [];
				this.children.forEach(function(child) {
					if (fn(child)) {
						result.push(child);
						state.found++;
						if (state.amount && state.found >= state.amount) {
							return;
						}
					}
					
					result = result.concat(child.findAll(fn));
				});
				
				return result.filter(function(item) {
					return !!item;
				});
			},
			
			/**
			 * Sets/gets custom data
			 * @param {String} name
			 * @param {Object} value
			 * @returns {Object}
			 */
			data: function(name, value) {
				if (arguments.length == 2) {
					this._data[name] = value;
				}
				
				return this._data[name];
			},
			
			/**
			 * Returns name of current node
			 * @returns {String}
			 */
			name: function() {
				return this._name;
			},
			
			/**
			 * Returns list of attributes for current node
			 * @returns {Array}
			 */
			attributeList: function() {
				return optimizeAttributes(this._attributes.slice(0));
			},
			
			/**
			 * Returns or sets attribute value
			 * @param {String} name Attribute name
			 * @param {String} value New attribute value. `Null` value 
			 * will remove attribute
			 * @returns {String}
			 */
			attribute: function(name, value) {
				if (arguments.length == 2) {
					if (value === null) {
						// remove attribute
						var vals = this._attributes.filter(function(attr) {
							return attr.name === name;
						});
	
						var that = this;
						vals.forEach(function(attr) {
							var ix = that._attributes.indexOf(attr);
							if (~ix) {
								that._attributes.splice(ix, 1);
							}
						});
	
						return;
					}
	
					// modify attribute
					var attrNames = this._attributes.map(function(attr) {
						return attr.name;
					});
					var ix = attrNames.indexOf(name.toLowerCase());
					if (~ix) {
						this._attributes[ix].value = value;
					} else {
						this._attributes.push({
							name: name,
							value: value
						});
					}
				}
				
				return (utils.find(this.attributeList(), function(attr) {
					return attr.name == name;
				}) || {}).value;
			},
			
			/**
			 * Returns index of current node in parent‘s children list
			 * @returns {Number}
			 */
			index: function() {
				return this.parent ? this.parent.children.indexOf(this) : -1;
			},
			
			/**
			 * Sets how many times current element should be repeated
			 * @private
			 */
			_setRepeat: function(count) {
				if (count) {
					this.repeatCount = parseInt(count, 10) || 1;
				} else {
					this.hasImplicitRepeat = true;
				}
			},
			
			/**
			 * Sets abbreviation that belongs to current node
			 * @param {String} abbr
			 */
			setAbbreviation: function(abbr) {
				abbr = abbr || '';
				
				var that = this;
				
				// find multiplier
				abbr = abbr.replace(/\*(\d+)?$/, function(str, repeatCount) {
					that._setRepeat(repeatCount);
					return '';
				});
				
				this.abbreviation = abbr;
				
				var abbrText = extractText(abbr);
				if (abbrText) {
					abbr = abbrText.element;
					this.content = this._text = abbrText.text;
				}
				
				var abbrAttrs = parseAttributes(abbr);
				if (abbrAttrs) {
					abbr = abbrAttrs.element;
					this._attributes = abbrAttrs.attributes;
				}
				
				this._name = abbr;
				
				// validate name
				if (this._name && !reValidName.test(this._name)) {
					throw new Error('Invalid abbreviation');
				}
			},
			
			/**
			 * Returns string representation of current node
			 * @return {String}
			 */
			valueOf: function() {
				var start = this.start;
				var end = this.end;
				var content = this.content;
				
				// apply output processors
				var node = this;
				outputProcessors.forEach(function(fn) {
					start = fn(start, node, 'start');
					content = fn(content, node, 'content');
					end = fn(end, node, 'end');
				});
				
				
				var innerContent = this.children.map(function(child) {
					return child.valueOf();
				}).join('');
				
				content = abbreviationUtils.insertChildContent(content, innerContent, {
					keepVariable: false
				});
				
				return start + utils.padString(content, this.padding) + end;
			},
	
			toString: function() {
				return this.valueOf();
			},
			
			/**
			 * Check if current node contains children with empty <code>expr</code>
			 * property
			 * @return {Boolean}
			 */
			hasEmptyChildren: function() {
				return !!utils.find(this.children, function(child) {
					return child.isEmpty();
				});
			},
			
			/**
			 * Check if current node has implied name that should be resolved
			 * @returns {Boolean}
			 */
			hasImplicitName: function() {
				return !this._name && !this.isTextNode();
			},
			
			/**
			 * Indicates that current element is a grouping one, e.g. has no 
			 * representation but serves as a container for other nodes
			 * @returns {Boolean}
			 */
			isGroup: function() {
				return !this.abbreviation;
			},
			
			/**
			 * Indicates empty node (i.e. without abbreviation). It may be a 
			 * grouping node and should not be outputted
			 * @return {Boolean}
			 */
			isEmpty: function() {
				return !this.abbreviation && !this.children.length;
			},
			
			/**
			 * Indicates that current node should be repeated
			 * @returns {Boolean}
			 */
			isRepeating: function() {
				return this.repeatCount > 1 || this.hasImplicitRepeat;
			},
			
			/**
			 * Check if current node is a text-only node
			 * @return {Boolean}
			 */
			isTextNode: function() {
				return !this.name() && !this.attributeList().length;
			},
			
			/**
			 * Indicates whether this node may be used to build elements or snippets
			 * @returns {Boolean}
			 */
			isElement: function() {
				return !this.isEmpty() && !this.isTextNode();
			},
			
			/**
			 * Returns latest and deepest child of current tree
			 * @returns {AbbreviationNode}
			 */
			deepestChild: function() {
				if (!this.children.length)
					return null;
					
				var deepestChild = this;
				while (deepestChild.children.length) {
					deepestChild = deepestChild.children[deepestChild.children.length - 1];
				}
				
				return deepestChild;
			}
		};
		
		/**
		 * Returns stripped string: a string without first and last character.
		 * Used for “unquoting” strings
		 * @param {String} str
		 * @returns {String}
		 */
		function stripped(str) {
			return str.substring(1, str.length - 1);
		}
		
		function consumeQuotedValue(stream, quote) {
			var ch;
			while ((ch = stream.next())) {
				if (ch === quote)
					return true;
				
				if (ch == '\\')
					continue;
			}
			
			return false;
		}
		
		/**
		 * Parses abbreviation into a tree
		 * @param {String} abbr
		 * @returns {AbbreviationNode}
		 */
		function parseAbbreviation(abbr) {
			abbr = utils.trim(abbr);
			
			var root = new AbbreviationNode();
			var context = root.addChild(), ch;
			
			/** @type StringStream */
			var stream = stringStream.create(abbr);
			var loopProtector = 1000, multiplier;
			var addChild = function(child) {
				context.addChild(child);
			};
	
			var consumeAbbr = function() {
				stream.start = stream.pos;
				stream.eatWhile(function(c) {
					if (c == '[' || c == '{') {
						if (stream.skipToPair(c, pairs[c])) {
							stream.backUp(1);
							return true;
						}
						
						throw new Error('Invalid abbreviation: mo matching "' + pairs[c] + '" found for character at ' + stream.pos);
					}
					
					if (c == '+') {
						// let's see if this is an expando marker
						stream.next();
						var isMarker = stream.eol() ||  ~'+>^*'.indexOf(stream.peek());
						stream.backUp(1);
						return isMarker;
					}
					
					return c != '(' && isAllowedChar(c);
				});
			};
			
			while (!stream.eol() && --loopProtector > 0) {
				ch = stream.peek();
				
				switch (ch) {
					case '(': // abbreviation group
						stream.start = stream.pos;
						if (stream.skipToPair('(', ')')) {
							var inner = parseAbbreviation(stripped(stream.current()));
							if ((multiplier = stream.match(/^\*(\d+)?/, true))) {
								context._setRepeat(multiplier[1]);
							}
							
							inner.children.forEach(addChild);
						} else {
							throw new Error('Invalid abbreviation: mo matching ")" found for character at ' + stream.pos);
						}
						break;
						
					case '>': // child operator
						context = context.addChild();
						stream.next();
						break;
						
					case '+': // sibling operator
						context = context.parent.addChild();
						stream.next();
						break;
						
					case '^': // climb up operator
						var parent = context.parent || context;
						context = (parent.parent || parent).addChild();
						stream.next();
						break;
						
					default: // consume abbreviation
						consumeAbbr();
						context.setAbbreviation(stream.current());
						stream.start = stream.pos;
				}
			}
			
			if (loopProtector < 1) {
				throw new Error('Endless loop detected');
			}
			
			return root;
		}
	
		/**
		 * Splits attribute set into a list of attributes string
		 * @param  {String} attrSet 
		 * @return {Array}
		 */
		function splitAttributes(attrSet) {
			attrSet = utils.trim(attrSet);
			var parts = [];
	
			// split attribute set by spaces
			var stream = stringStream(attrSet), ch;
			while ((ch = stream.next())) {
				if (ch == ' ') {
					parts.push(utils.trim(stream.current()));
					// skip spaces
					while (stream.peek() == ' ') {
						stream.next();
					}
	
					stream.start = stream.pos;
				} else if (ch == '"' || ch == "'") {
					// skip values in strings
					if (!stream.skipString(ch)) {
						throw new Error('Invalid attribute set');
					}
				}
			}
	
			parts.push(utils.trim(stream.current()));
			return parts;
		}
	
		/**
		 * Removes opening and closing quotes from given string
		 * @param  {String} str
		 * @return {String}
		 */
		function unquote(str) {
			var ch = str.charAt(0);
			if (ch == '"' || ch == "'") {
				str = str.substr(1);
				var last = str.charAt(str.length - 1);
				if (last === ch) {
					str = str.substr(0, str.length - 1);
				}
			}
	
			return str;
		}
	
		/**
		 * Extract attributes and their values from attribute set: 
		 * <code>[attr col=3 title="Quoted string"]</code> (without square braces)
		 * @param {String} attrSet
		 * @returns {Array}
		 */
		function extractAttributes(attrSet) {
			var reAttrName = /^[\w\-:\$@]+\.?$/;
			return splitAttributes(attrSet).map(function(attr) {
				// attribute name: [attr]
				if (reAttrName.test(attr)) {
					var value = '';
					if (attr.charAt(attr.length - 1) == '.') {
						// a boolean attribute
						attr = attr.substr(0, attr.length - 1);
						value = attr;
					}
					return {
						name: attr,
						value: value
					};
				}
	
				// attribute with value: [name=val], [name="val"]
				if (~attr.indexOf('=')) {
					var parts = attr.split('=');
					return {
						name: parts.shift(),
						value: unquote(parts.join('='))
					};
				}
	
				// looks like it’s implied attribute
				return {
					name: DEFAULT_ATTR_NAME,
					value: unquote(attr)
				};
			});
		}
		
		/**
		 * Parses tag attributes extracted from abbreviation. If attributes found, 
		 * returns object with <code>element</code> and <code>attributes</code>
		 * properties
		 * @param {String} abbr
		 * @returns {Object} Returns <code>null</code> if no attributes found in 
		 * abbreviation
		 */
		function parseAttributes(abbr) {
			/*
			 * Example of incoming data:
			 * #header
			 * .some.data
			 * .some.data#header
			 * [attr]
			 * #item[attr=Hello other="World"].class
			 */
			var result = [];
			var attrMap = {'#': 'id', '.': 'class'};
			var nameEnd = null;
			
			/** @type StringStream */
			var stream = stringStream.create(abbr);
			while (!stream.eol()) {
				switch (stream.peek()) {
					case '#': // id
					case '.': // class
						if (nameEnd === null)
							nameEnd = stream.pos;
						
						var attrName = attrMap[stream.peek()];
						
						stream.next();
						stream.start = stream.pos;
						stream.eatWhile(reWord);
						result.push({
							name: attrName, 
							value: stream.current()
						});
						break;
					case '[': //begin attribute set
						if (nameEnd === null)
							nameEnd = stream.pos;
						
						stream.start = stream.pos;
						if (!stream.skipToPair('[', ']')) {
							throw new Error('Invalid attribute set definition');
						}
						
						result = result.concat(
							extractAttributes(stripped(stream.current()))
						);
						break;
					default:
						stream.next();
				}
			}
			
			if (!result.length)
				return null;
			
			return {
				element: abbr.substring(0, nameEnd),
				attributes: optimizeAttributes(result)
			};
		}
		
		/**
		 * Optimize attribute set: remove duplicates and merge class attributes
		 * @param attrs
		 */
		function optimizeAttributes(attrs) {
			// clone all attributes to make sure that original objects are 
			// not modified
			attrs = attrs.map(function(attr) {
				return utils.clone(attr);
			});
			
			var lookup = {};
	
			return attrs.filter(function(attr) {
				if (!(attr.name in lookup)) {
					return lookup[attr.name] = attr;
				}
				
				var la = lookup[attr.name];
				
				if (attr.name.toLowerCase() == 'class') {
					la.value += (la.value.length ? ' ' : '') + attr.value;
				} else {
					la.value = attr.value;
					la.isImplied = !!attr.isImplied;
				}
				
				return false;
			});
		}
		
		/**
		 * Extract text data from abbreviation: if <code>a{hello}</code> abbreviation
		 * is passed, returns object <code>{element: 'a', text: 'hello'}</code>.
		 * If nothing found, returns <code>null</code>
		 * @param {String} abbr
		 * 
		 */
		function extractText(abbr) {
			if (!~abbr.indexOf('{'))
				return null;
			
			/** @type StringStream */
			var stream = stringStream.create(abbr);
			while (!stream.eol()) {
				switch (stream.peek()) {
					case '[':
					case '(':
						stream.skipToPair(stream.peek(), pairs[stream.peek()]); break;
						
					case '{':
						stream.start = stream.pos;
						stream.skipToPair('{', '}');
						return {
							element: abbr.substring(0, stream.start),
							text: stripped(stream.current())
						};
						
					default:
						stream.next();
				}
			}
		}
		
		/**
		 * “Un-rolls“ contents of current node: recursively replaces all repeating 
		 * children with their repeated clones
		 * @param {AbbreviationNode} node
		 * @returns {AbbreviationNode}
		 */
		function unroll(node) {
			for (var i = node.children.length - 1, j, child, maxCount; i >= 0; i--) {
				child = node.children[i];
				
				if (child.isRepeating()) {
					maxCount = j = child.repeatCount;
					child.repeatCount = 1;
					child.updateProperty('counter', 1);
					child.updateProperty('maxCount', maxCount);
					while (--j > 0) {
						child.parent.addChild(child.clone(), i + 1)
							.updateProperty('counter', j + 1)
							.updateProperty('maxCount', maxCount);
					}
				}
			}
			
			// to keep proper 'counter' property, we need to walk
			// on children once again
			node.children.forEach(unroll);
			
			return node;
		}
		
		/**
		 * Optimizes tree node: replaces empty nodes with their children
		 * @param {AbbreviationNode} node
		 * @return {AbbreviationNode}
		 */
		function squash(node) {
			for (var i = node.children.length - 1; i >= 0; i--) {
				/** @type AbbreviationNode */
				var n = node.children[i];
				if (n.isGroup()) {
					n.replace(squash(n).children);
				} else if (n.isEmpty()) {
					n.remove();
				}
			}
			
			node.children.forEach(squash);
			
			return node;
		}
		
		function isAllowedChar(ch) {
			var charCode = ch.charCodeAt(0);
			var specialChars = '#.*:$-_!@|%';
			
			return (charCode > 64 && charCode < 91)       // uppercase letter
					|| (charCode > 96 && charCode < 123)  // lowercase letter
					|| (charCode > 47 && charCode < 58)   // number
					|| specialChars.indexOf(ch) != -1;    // special character
		}
	
		// XXX add counter replacer function as output processor
		outputProcessors.push(function(text, node) {
			return utils.replaceCounter(text, node.counter, node.maxCount);
		});
	
		// XXX add tabstop updater
		outputProcessors.push(tabStops.abbrOutputProcessor.bind(tabStops));
	
		// include default pre- and postprocessors
		[lorem, procResourceMatcher, procAttributes, procPastedContent, procTagName, procHref].forEach(function(mod) {
			if (mod.preprocessor) {
				preprocessors.push(mod.preprocessor.bind(mod));
			}
	
			if (mod.postprocessor) {
				postprocessors.push(mod.postprocessor.bind(mod));
			}
		});
	
		return {
			DEFAULT_ATTR_NAME: DEFAULT_ATTR_NAME,
	
			/**
			 * Parses abbreviation into tree with respect of groups, 
			 * text nodes and attributes. Each node of the tree is a single 
			 * abbreviation. Tree represents actual structure of the outputted 
			 * result
			 * @memberOf abbreviationParser
			 * @param {String} abbr Abbreviation to parse
			 * @param {Object} options Additional options for parser and processors
			 * 
			 * @return {AbbreviationNode}
			 */
			parse: function(abbr, options) {
				options = options || {};
				
				var tree = parseAbbreviation(abbr);
				var that = this;
				
				if (options.contextNode) {
					// add info about context node –
					// a parent XHTML node in editor inside which abbreviation is 
					// expanded
					tree._name = options.contextNode.name;
					var attrLookup = {};
					tree._attributes.forEach(function(attr) {
						attrLookup[attr.name] = attr;
					});
					
					options.contextNode.attributes.forEach(function(attr) {
						if (attr.name in attrLookup) {
							attrLookup[attr.name].value = attr.value;
						} else {
							attr = utils.clone(attr);
							tree._attributes.push(attr);
							attrLookup[attr.name] = attr;
						}
					});
				}
				
				// apply preprocessors
				preprocessors.forEach(function(fn) {
					fn(tree, options, that);
				});
	
				if ('counter' in options) {
					tree.updateProperty('counter', options.counter);
				}
				
				tree = squash(unroll(tree));
				
				// apply postprocessors
				postprocessors.forEach(function(fn) {
					fn(tree, options, that);
				});
				
				return tree;
			},
	
			/**
			 * Expands given abbreviation into a formatted code structure.
			 * This is the main method that is used for expanding abbreviation
			 * @param {String} abbr Abbreviation to expand
			 * @param {Options} options Additional options for abbreviation
			 * expanding and transformation: `syntax`, `profile`, `contextNode` etc.
			 * @return {String}
			 */
			expand: function(abbr, options) {
				if (!abbr) return '';
				if (typeof options == 'string') {
					throw new Error('Deprecated use of `expand` method: `options` must be object');
				}
	
				options = options || {};
	
				if (!options.syntax) {
					options.syntax = utils.defaultSyntax();
				}
	
				var p = profile.get(options.profile, options.syntax);
				tabStops.resetTabstopIndex();
				
				var data = filters.extract(abbr);
				var outputTree = this.parse(data[0], options);
	
				var filtersList = filters.composeList(options.syntax, p, data[1]);
				filters.apply(outputTree, filtersList, p);
	
				return outputTree.valueOf();
			},
			
			AbbreviationNode: AbbreviationNode,
			
			/**
			 * Add new abbreviation preprocessor. <i>Preprocessor</i> is a function
			 * that applies to a parsed abbreviation tree right after it get parsed.
			 * The passed tree is in unoptimized state.
			 * @param {Function} fn Preprocessor function. This function receives
			 * two arguments: parsed abbreviation tree (<code>AbbreviationNode</code>)
			 * and <code>options</code> hash that was passed to <code>parse</code>
			 * method
			 */
			addPreprocessor: function(fn) {
				if (!~preprocessors.indexOf(fn)) {
					preprocessors.push(fn);
				}
			},
			
			/**
			 * Removes registered preprocessor
			 */
			removeFilter: function(fn) {
				var ix = preprocessors.indexOf(fn);
				if (~ix) {
					preprocessors.splice(ix, 1);
				}
			},
			
			/**
			 * Adds new abbreviation postprocessor. <i>Postprocessor</i> is a 
			 * functinon that applies to <i>optimized</i> parsed abbreviation tree
			 * right before it returns from <code>parse()</code> method
			 * @param {Function} fn Postprocessor function. This function receives
			 * two arguments: parsed abbreviation tree (<code>AbbreviationNode</code>)
			 * and <code>options</code> hash that was passed to <code>parse</code>
			 * method
			 */
			addPostprocessor: function(fn) {
				if (!~postprocessors.indexOf(fn)) {
					postprocessors.push(fn);
				}
			},
			
			/**
			 * Removes registered postprocessor function
			 */
			removePostprocessor: function(fn) {
				var ix = postprocessors.indexOf(fn);
				if (~ix) {
					postprocessors.splice(ix, 1);
				}
			},
			
			/**
			 * Registers output postprocessor. <i>Output processor</i> is a 
			 * function that applies to output part (<code>start</code>, 
			 * <code>end</code> and <code>content</code>) when 
			 * <code>AbbreviationNode.toString()</code> method is called
			 */
			addOutputProcessor: function(fn) {
				if (!~outputProcessors.indexOf(fn)) {
					outputProcessors.push(fn);
				}
			},
			
			/**
			 * Removes registered output processor
			 */
			removeOutputProcessor: function(fn) {
				var ix = outputProcessors.indexOf(fn);
				if (~ix) {
					outputProcessors.splice(ix, 1);
				}
			},
			
			/**
			 * Check if passed symbol is valid symbol for abbreviation expression
			 * @param {String} ch
			 * @return {Boolean}
			 */
			isAllowedChar: function(ch) {
				ch = String(ch); // convert Java object to JS
				return isAllowedChar(ch) || ~'>+^[](){}'.indexOf(ch);
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(Buffer) {/**
	 * Module for working with file. Shall implement
	 * IEmmetFile interface.
	 *
	 * Since implementation of this module depends
	 * greatly on current runtime, this module must be
	 * initialized with actual implementation first
	 * before use. E.g. 
	 * require('./plugin/file')({
	 * 	read: function() {...}
	 * })
	 *
	 * By default, this module provides Node.JS implementation
	 */
	
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
	
		// hide it from Require.JS parser
		(function(r) {
			if (false) {
				try {
					fs = r('fs');
					path = r('path');
				} catch(e) {}
			}
		})(require);
	
		// module is a function that can extend itself
		module.exports = function(obj) {
			if (obj) {
				utils.extend(module.exports, obj);
			}
		};
	
		function bts(bytes) {
			var out = [];
			for (var i = 0, il = bytes.length; i < il; i++) {
				out.push(String.fromCharCode(bytes[i]));
			}
			return out.join('');
		}
	
		function isURL(path) {
			var re = /^https?:\/\//;
			return re.test(path);
		}
	
		return utils.extend(module.exports, {
			_parseParams: function(args) {
				var params = {
					path: args[0],
					size: 0
				};
	
				args = utils.toArray(args, 1);
				params.callback = args[args.length - 1];
				args = args.slice(0, args.length - 1);
				if (args.length) {
					params.size = args[0];
				}
	
				return params;
			},
	
			_read: function(params, callback) {
				if (isURL(params.path)) {
					var req = __webpack_require__(/^https:/.test(params.path) ? 100 : 101).get(params.path, function(res) {
						var bufs = [];
						var totalLength = 0;
						var finished = false;
						res
							.on('data', function(chunk) {
								totalLength += chunk.length;
								bufs.push(chunk);
								if (params.size && totalLength >= params.size) {
									finished = true;
									callback(null, Buffer.concat(bufs));
									req.abort();
								}
							})
							.on('end', function() {
								if (!finished) {
									finished = true;
									callback(null, Buffer.concat(bufs));
								}
							});
					}).on('error', callback);
				} else {
					if (params.size) {
						var fd = fs.openSync(params.path, 'r');
						var buf = new Buffer(params.size);
						fs.read(fd, buf, 0, params.size, null, function(err, bytesRead) {
							callback(err, buf)
						});
					} else {
						callback(null, fs.readFileSync(params.path));
					}
				}
			},
	
			/**
			 * Reads binary file content and return it
			 * @param {String} path File's relative or absolute path
			 * @return {String}
			 */
			read: function(path, size, callback) {
				var params = this._parseParams(arguments);
				this._read(params, function(err, buf) {
					params.callback(err, err ? '' : bts(buf));
				});
			},
	
			/**
			 * Read file content and return it
			 * @param {String} path File's relative or absolute path
			 * @return {String}
			 */
			readText: function(path, size, callback) {
				var params = this._parseParams(arguments);
				this._read(params, function(err, buf) {
					params.callback(err, err ? '' : buf.toString());
				});
			},
			
			/**
			 * Locate <code>file_name</code> file that relates to <code>editor_file</code>.
			 * File name may be absolute or relative path
			 * 
			 * <b>Dealing with absolute path.</b>
			 * Many modern editors have a "project" support as information unit, but you
			 * should not rely on project path to find file with absolute path. First,
			 * it requires user to create a project before using this method (and this 
			 * is not very convenient). Second, project path doesn't always points to
			 * to website's document root folder: it may point, for example, to an 
			 * upper folder which contains server-side scripts.
			 * 
			 * For better result, you should use the following algorithm in locating
			 * absolute resources:
			 * 1) Get parent folder for <code>editorFile</code> as a start point
			 * 2) Append required <code>fileName</code> to start point and test if
			 * file exists
			 * 3) If it doesn't exists, move start point one level up (to parent folder)
			 * and repeat step 2.
			 * 
			 * @param {String} editorFile
			 * @param {String} fileName
			 * @return {String} Returns null if <code>fileName</code> cannot be located
			 */
			locateFile: function(editorFile, fileName) {
				if (isURL(fileName)) {
					return fileName;
				}
	
				var dirname = editorFile, f;
				fileName = fileName.replace(/^\/+/, '');
				while (dirname && dirname !== path.dirname(dirname)) {
					dirname = path.dirname(dirname);
					f = path.join(dirname, fileName);
					if (fs.existsSync(f))
						return f;
				}
				
				return '';
			},
			
			/**
			 * Creates absolute path by concatenating <code>parent</code> and <code>fileName</code>.
			 * If <code>parent</code> points to file, its parent directory is used
			 * @param {String} parent
			 * @param {String} fileName
			 * @return {String}
			 */
			createPath: function(parent, fileName, callback) {
				var stat = fs.statSync(parent);
				if (stat && !stat.isDirectory()) {
					parent = path.dirname(parent);
				}
				
				return callback(path.resolve(parent, fileName));
			},
			
			/**
			 * Saves <code>content</code> as <code>file</code>
			 * @param {String} file File's absolute path
			 * @param {String} content File content
			 */
			save: function(file, content) {
				fs.writeFileSync(file, content, 'ascii');
			},
			
			/**
			 * Returns file extension in lower case
			 * @param {String} file
			 * @return {String}
			 */
			getExt: function(file) {
				var m = (file || '').match(/\.([\w\-]+)$/);
				return m ? m[1].toLowerCase() : '';
			}
		
		});
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(102).Buffer))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Common module's preferences storage. This module 
	 * provides general storage for all module preferences, their description and
	 * default values.<br><br>
	 * 
	 * This module can also be used to list all available properties to create 
	 * UI for updating properties
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
	
		var preferences = {};
		var defaults = {};
		var _dbgDefaults = null;
		var _dbgPreferences = null;
	
		function toBoolean(val) {
			if (typeof val === 'string') {
				val = val.toLowerCase();
				return val == 'yes' || val == 'true' || val == '1';
			}
	
			return !!val;
		}
		
		function isValueObj(obj) {
			return typeof obj === 'object'
				&& !Array.isArray(obj) 
				&& 'value' in obj 
				&& Object.keys(obj).length < 3;
		}
		
		return {
			/**
			 * Creates new preference item with default value
			 * @param {String} name Preference name. You can also pass object
			 * with many options
			 * @param {Object} value Preference default value
			 * @param {String} description Item textual description
			 * @memberOf preferences
			 */
			define: function(name, value, description) {
				var prefs = name;
				if (typeof name === 'string') {
					prefs = {};
					prefs[name] = {
						value: value,
						description: description
					};
				}
				
				Object.keys(prefs).forEach(function(k) {
					var v = prefs[k];
					defaults[k] = isValueObj(v) ? v : {value: v};
				});
			},
			
			/**
			 * Updates preference item value. Preference value should be defined
			 * first with <code>define</code> method.
			 * @param {String} name Preference name. You can also pass object
			 * with many options
			 * @param {Object} value Preference default value
			 * @memberOf preferences
			 */
			set: function(name, value) {
				var prefs = name;
				if (typeof name === 'string') {
					prefs = {};
					prefs[name] = value;
				}
				
				Object.keys(prefs).forEach(function(k) {
					var v = prefs[k];
					if (!(k in defaults)) {
						throw new Error('Property "' + k + '" is not defined. You should define it first with `define` method of current module');
					}
					
					// do not set value if it equals to default value
					if (v !== defaults[k].value) {
						// make sure we have value of correct type
						switch (typeof defaults[k].value) {
							case 'boolean':
								v = toBoolean(v);
								break;
							case 'number':
								v = parseInt(v + '', 10) || 0;
								break;
							default: // convert to string
								if (v !== null) {
									v += '';
								}
						}
	
						preferences[k] = v;
					} else if (k in preferences) {
						delete preferences[k];
					}
				});
			},
			
			/**
			 * Returns preference value
			 * @param {String} name
			 * @returns {String} Returns <code>undefined</code> if preference is 
			 * not defined
			 */
			get: function(name) {
				if (name in preferences) {
					return preferences[name];
				}
				
				if (name in defaults) {
					return defaults[name].value;
				}
				
				return void 0;
			},
			
			/**
			 * Returns comma-separated preference value as array of values
			 * @param {String} name
			 * @returns {Array} Returns <code>undefined</code> if preference is 
			 * not defined, <code>null</code> if string cannot be converted to array
			 */
			getArray: function(name) {
				var val = this.get(name);
				if (typeof val === 'undefined' || val === null || val === '')  {
					return null;
				}
	
				val = val.split(',').map(utils.trim);
				if (!val.length) {
					return null;
				}
				
				return val;
			},
			
			/**
			 * Returns comma and colon-separated preference value as dictionary
			 * @param {String} name
			 * @returns {Object}
			 */
			getDict: function(name) {
				var result = {};
				this.getArray(name).forEach(function(val) {
					var parts = val.split(':');
					result[parts[0]] = parts[1];
				});
				
				return result;
			},
			
			/**
			 * Returns description of preference item
			 * @param {String} name Preference name
			 * @returns {Object}
			 */
			description: function(name) {
				return name in defaults ? defaults[name].description : void 0;
			},
			
			/**
			 * Completely removes specified preference(s)
			 * @param {String} name Preference name (or array of names)
			 */
			remove: function(name) {
				if (!Array.isArray(name)) {
					name = [name];
				}
				
				name.forEach(function(key) {
					if (key in preferences) {
						delete preferences[key];
					}
					
					if (key in defaults) {
						delete defaults[key];
					}
				});
			},
			
			/**
			 * Returns sorted list of all available properties
			 * @returns {Array}
			 */
			list: function() {
				return Object.keys(defaults).sort().map(function(key) {
					return {
						name: key,
						value: this.get(key),
						type: typeof defaults[key].value,
						description: defaults[key].description
					};
				}, this);
			},
			
			/**
			 * Loads user-defined preferences from JSON
			 * @param {Object} json
			 * @returns
			 */
			load: function(json) {
				Object.keys(json).forEach(function(key) {
					this.set(key, json[key]);
				}, this);
			},
	
			/**
			 * Returns hash of user-modified preferences
			 * @returns {Object}
			 */
			exportModified: function() {
				return utils.extend({}, preferences);
			},
			
			/**
			 * Reset to defaults
			 * @returns
			 */
			reset: function() {
				preferences = {};
			},
			
			/**
			 * For unit testing: use empty storage
			 */
			_startTest: function() {
				_dbgDefaults = defaults;
				_dbgPreferences = preferences;
				defaults = {};
				preferences = {};
			},
			
			/**
			 * For unit testing: restore original storage
			 */
			_stopTest: function() {
				defaults = _dbgDefaults;
				preferences = _dbgPreferences;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/**
	 * Parsed resources (snippets, abbreviations, variables, etc.) for Emmet.
	 * Contains convenient method to get access for snippets with respect of 
	 * inheritance. Also provides ability to store data in different vocabularies
	 * ('system' and 'user') for fast and safe resource update
	 * @author Sergey Chikuyonok (serge.che@gmail.com)
	 * @link http://chikuyonok.ru
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var handlerList = __webpack_require__(63);
		var utils = __webpack_require__(22);
		var elements = __webpack_require__(64);
		var logger = __webpack_require__(30);
		var stringScore = __webpack_require__(65);
		var cssResolver = __webpack_require__(66);
	
		var VOC_SYSTEM = 'system';
		var VOC_USER = 'user';
		
		var cache = {};
			
		/** Regular expression for XML tag matching */
		var reTag = /^<(\w+\:?[\w\-]*)((?:\s+[@\!]?[\w\:\-]+\s*=\s*(['"]).*?\3)*)\s*(\/?)>/;
			
		var systemSettings = {};
		var userSettings = {};
		
		/** @type HandlerList List of registered abbreviation resolvers */
		var resolvers = handlerList.create();
	
		function each(obj, fn) {
			if (!obj) {
				return;
			}
	
			Object.keys(obj).forEach(function(key) {
				fn(obj[key], key);
			});
		}
		
		/**
		 * Normalizes caret plceholder in passed text: replaces | character with
		 * default caret placeholder
		 * @param {String} text
		 * @returns {String}
		 */
		function normalizeCaretPlaceholder(text) {
			return utils.replaceUnescapedSymbol(text, '|', utils.getCaretPlaceholder());
		}
		
		function parseItem(name, value, type) {
			value = normalizeCaretPlaceholder(value);
			
			if (type == 'snippets') {
				return elements.create('snippet', value);
			}
			
			if (type == 'abbreviations') {
				return parseAbbreviation(name, value);
			}
		}
		
		/**
		 * Parses single abbreviation
		 * @param {String} key Abbreviation name
		 * @param {String} value Abbreviation value
		 * @return {Object}
		 */
		function parseAbbreviation(key, value) {
			key = utils.trim(key);
			var m;
			if ((m = reTag.exec(value))) {
				return elements.create('element', m[1], m[2], m[4] == '/');
			} else {
				// assume it's reference to another abbreviation
				return elements.create('reference', value);
			}
		}
		
		/**
		 * Normalizes snippet key name for better fuzzy search
		 * @param {String} str
		 * @returns {String}
		 */
		function normalizeName(str) {
			return str.replace(/:$/, '').replace(/:/g, '-');
		}
	
		function expandSnippetsDefinition(snippets) {
			var out = {};
			each(snippets, function(val, key) {
				var items = key.split('|');
				// do not use iterators for better performance
				for (var i = items.length - 1; i >= 0; i--) {
					out[items[i]] = val;
				}
			});
	
			return out;
		}
	
		utils.extend(exports, {
			/**
			 * Sets new unparsed data for specified settings vocabulary
			 * @param {Object} data
			 * @param {String} type Vocabulary type ('system' or 'user')
			 * @memberOf resources
			 */
			setVocabulary: function(data, type) {
				cache = {};
	
				// sections like "snippets" and "abbreviations" could have
				// definitions like `"f|fs": "fieldset"` which is the same as distinct
				// "f" and "fs" keys both equals to "fieldset".
				// We should parse these definitions first
				var voc = {};
				each(data, function(section, syntax) {
					var _section = {};
					each(section, function(subsection, name) {
						if (name == 'abbreviations' || name == 'snippets') {
							subsection = expandSnippetsDefinition(subsection);
						}
						_section[name] = subsection;
					});
	
					voc[syntax] = _section;
				});
				 
	
				if (type == VOC_SYSTEM) {
					systemSettings = voc;
				} else {
					userSettings = voc;
				}
			},
			
			/**
			 * Returns resource vocabulary by its name
			 * @param {String} name Vocabulary name ('system' or 'user')
			 * @return {Object}
			 */
			getVocabulary: function(name) {
				return name == VOC_SYSTEM ? systemSettings : userSettings;
			},
			
			/**
			 * Returns resource (abbreviation, snippet, etc.) matched for passed 
			 * abbreviation
			 * @param {AbbreviationNode} node
			 * @param {String} syntax
			 * @returns {Object}
			 */
			getMatchedResource: function(node, syntax) {
				return resolvers.exec(null, utils.toArray(arguments)) 
					|| this.findSnippet(syntax, node.name());
			},
			
			/**
			 * Returns variable value
			 * @return {String}
			 */
			getVariable: function(name) {
				return (this.getSection('variables') || {})[name];
			},
			
			/**
			 * Store runtime variable in user storage
			 * @param {String} name Variable name
			 * @param {String} value Variable value
			 */
			setVariable: function(name, value){
				var voc = this.getVocabulary('user') || {};
				if (!('variables' in voc))
					voc.variables = {};
					
				voc.variables[name] = value;
				this.setVocabulary(voc, 'user');
			},
			
			/**
			 * Check if there are resources for specified syntax
			 * @param {String} syntax
			 * @return {Boolean}
			 */
			hasSyntax: function(syntax) {
				return syntax in this.getVocabulary(VOC_USER) 
					|| syntax in this.getVocabulary(VOC_SYSTEM);
			},
			
			/**
			 * Registers new abbreviation resolver.
			 * @param {Function} fn Abbreviation resolver which will receive 
			 * abbreviation as first argument and should return parsed abbreviation
			 * object if abbreviation has handled successfully, <code>null</code>
			 * otherwise
			 * @param {Object} options Options list as described in 
			 * {@link HandlerList#add()} method
			 */
			addResolver: function(fn, options) {
				resolvers.add(fn, options);
			},
			
			removeResolver: function(fn) {
				resolvers.remove(fn);
			},
			
			/**
			 * Returns actual section data, merged from both
			 * system and user data
			 * @param {String} name Section name (syntax)
			 * @param {String} ...args Subsections
			 * @returns
			 */
			getSection: function(name) {
				if (!name)
					return null;
				
				if (!(name in cache)) {
					cache[name] = utils.deepMerge({}, systemSettings[name], userSettings[name]);
				}
				
				var data = cache[name], subsections = utils.toArray(arguments, 1), key;
				while (data && (key = subsections.shift())) {
					if (key in data) {
						data = data[key];
					} else {
						return null;
					}
				}
				
				return data;
			},
			
			/**
			 * Recursively searches for a item inside top level sections (syntaxes)
			 * with respect of `extends` attribute
			 * @param {String} topSection Top section name (syntax)
			 * @param {String} subsection Inner section name
			 * @returns {Object}
			 */
			findItem: function(topSection, subsection) {
				var data = this.getSection(topSection);
				while (data) {
					if (subsection in data)
						return data[subsection];
					
					data = this.getSection(data['extends']);
				}
			},
			
			/**
			 * Recursively searches for a snippet definition inside syntax section.
			 * Definition is searched inside `snippets` and `abbreviations` 
			 * subsections  
			 * @param {String} syntax Top-level section name (syntax)
			 * @param {String} name Snippet name
			 * @returns {Object}
			 */
			findSnippet: function(syntax, name, memo) {
				if (!syntax || !name)
					return null;
				
				memo = memo || [];
				
				var names = [name];
				// create automatic aliases to properties with colons,
				// e.g. pos-a == pos:a
				if (~name.indexOf('-')) {
					names.push(name.replace(/\-/g, ':'));
				}
				
				var data = this.getSection(syntax), matchedItem = null;
				['snippets', 'abbreviations'].some(function(sectionName) {
					var data = this.getSection(syntax, sectionName);
					if (data) {
						return names.some(function(n) {
							if (data[n]) {
								return matchedItem = parseItem(n, data[n], sectionName);
							}
						});
					}
				}, this);
				
				memo.push(syntax);
				if (!matchedItem && data['extends'] && !~memo.indexOf(data['extends'])) {
					// try to find item in parent syntax section
					return this.findSnippet(data['extends'], name, memo);
				}
				
				return matchedItem;
			},
			
			/**
			 * Performs fuzzy search of snippet definition
			 * @param {String} syntax Top-level section name (syntax)
			 * @param {String} name Snippet name
			 * @returns
			 */
			fuzzyFindSnippet: function(syntax, name, minScore) {
				var result = this.fuzzyFindMatches(syntax, name, minScore)[0];
				if (result) {
					return result.value.parsedValue;
				}
			},
	
			fuzzyFindMatches: function(syntax, name, minScore) {
				minScore = minScore || 0.3;
				name = normalizeName(name);
				var snippets = this.getAllSnippets(syntax);
				
				return Object.keys(snippets)
					.map(function(key) {
						var value = snippets[key];
						return {
							key: key,
							score: stringScore.score(value.nk, name, 0.1),
							value: value
						};
					})
					.filter(function(item) {
						return item.score >= minScore;
					})
					.sort(function(a, b) {
						return a.score - b.score;
					})
					.reverse();
			},
			
			/**
			 * Returns plain dictionary of all available abbreviations and snippets
			 * for specified syntax with respect of inheritance
			 * @param {String} syntax
			 * @returns {Object}
			 */
			getAllSnippets: function(syntax) {
				var cacheKey = 'all-' + syntax;
				if (!cache[cacheKey]) {
					var stack = [], sectionKey = syntax;
					var memo = [];
					
					do {
						var section = this.getSection(sectionKey);
						if (!section)
							break;
						
						['snippets', 'abbreviations'].forEach(function(sectionName) {
							var stackItem = {};
							each(section[sectionName] || null, function(v, k) {
								stackItem[k] = {
									nk: normalizeName(k),
									value: v,
									parsedValue: parseItem(k, v, sectionName),
									type: sectionName
								};
							});
							
							stack.push(stackItem);
						});
						
						memo.push(sectionKey);
						sectionKey = section['extends'];
					} while (sectionKey && !~memo.indexOf(sectionKey));
					
					
					cache[cacheKey] = utils.extend.apply(utils, stack.reverse());
				}
				
				return cache[cacheKey];
			},
	
			/**
			 * Returns newline character
			 * @returns {String}
			 */
			getNewline: function() {
				var nl = this.getVariable('newline');
				return typeof nl === 'string' ? nl : '\n';
			},
			
			/**
			 * Sets new newline character that will be used in output
			 * @param {String} str
			 */
			setNewline: function(str) {
				this.setVariable('newline', str);
				this.setVariable('nl', str);
			}
		});
	
		// XXX add default resolvers
		exports.addResolver(cssResolver.resolve.bind(cssResolver));
	
		// try to load snippets
		// hide it from Require.JS parser
		(function(r) {
			if (false) {
				try {
					var fs = r('fs');
					var path = r('path');
					
					var defaultSnippets = fs.readFileSync(path.join(__dirname, '../snippets.json'), {encoding: 'utf8'});
					exports.setVocabulary(JSON.parse(defaultSnippets), VOC_SYSTEM);
				} catch (e) {}
			}
		})(require);
		
	
		return exports;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Output profile module.
	 * Profile defines how XHTML output data should look like
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var resources = __webpack_require__(27);
		var prefs = __webpack_require__(26);
	
		prefs.define('profile.allowCompactBoolean', true, 
			'This option can be used to globally disable compact form of boolean ' + 
			'attribues (attributes where name and value are equal). With compact' +
			'form enabled, HTML tags can be outputted as <code>&lt;div contenteditable&gt;</code> ' +
			'instead of <code>&lt;div contenteditable="contenteditable"&gt;</code>');
	
		prefs.define('profile.booleanAttributes', '^contenteditable|seamless$', 
			'A regular expression for attributes that should be boolean by default.' + 
			'If attribute name matches this expression, you don’t have to write dot ' +
			'after attribute name in Emmet abbreviation to mark it as boolean.');
	
		var profiles = {};
		
		var defaultProfile = {
			tag_case: 'asis',
			attr_case: 'asis',
			attr_quotes: 'double',
			
			// Each tag on new line
			tag_nl: 'decide',
			
			// With tag_nl === true, defines if leaf node (e.g. node with no children)
			// should have formatted line breaks
			tag_nl_leaf: false,
			
			place_cursor: true,
			
			// Indent tags
			indent: true,
			
			// How many inline elements should be to force line break 
			// (set to 0 to disable)
			inline_break: 3,
	
			// Produce compact notation of boolean attribues:
			// attributes where name and value are equal.
			// With this option enabled, HTML filter will
			// produce <div contenteditable> instead of <div contenteditable="contenteditable">
			compact_bool: false,
			
			// Use self-closing style for writing empty elements, e.g. <br /> or <br>
			self_closing_tag: 'xhtml',
			
			// Profile-level output filters, re-defines syntax filters 
			filters: '',
			
			// Additional filters applied to abbreviation.
			// Unlike "filters", this preference doesn't override default filters
			// but add the instead every time given profile is chosen
			extraFilters: ''
		};
		
		/**
		 * @constructor
		 * @type OutputProfile
		 * @param {Object} options
		 */
		function OutputProfile(options) {
			utils.extend(this, defaultProfile, options);
		}
		
		OutputProfile.prototype = {
			/**
			 * Transforms tag name case depending on current profile settings
			 * @param {String} name String to transform
			 * @returns {String}
			 */
			tagName: function(name) {
				return stringCase(name, this.tag_case);
			},
			
			/**
			 * Transforms attribute name case depending on current profile settings 
			 * @param {String} name String to transform
			 * @returns {String}
			 */
			attributeName: function(name) {
				return stringCase(name, this.attr_case);
			},
			
			/**
			 * Returns quote character for current profile
			 * @returns {String}
			 */
			attributeQuote: function() {
				return this.attr_quotes == 'single' ? "'" : '"';
			},
	
			/**
			 * Returns self-closing tag symbol for current profile
			 * @returns {String}
			 */
			selfClosing: function() {
				if (this.self_closing_tag == 'xhtml')
					return ' /';
				
				if (this.self_closing_tag === true)
					return '/';
				
				return '';
			},
			
			/**
			 * Returns cursor token based on current profile settings
			 * @returns {String}
			 */
			cursor: function() {
				return this.place_cursor ? utils.getCaretPlaceholder() : '';
			},
	
			/**
			 * Check if attribute with given name is boolean,
			 * e.g. written as `contenteditable` instead of 
			 * `contenteditable="contenteditable"`
			 * @param  {String}  name Attribute name
			 * @return {Boolean}
			 */
			isBoolean: function(name, value) {
				if (name == value) {
					return true;
				}
	
				var boolAttrs = prefs.get('profile.booleanAttributes');
				if (!value && boolAttrs) {
					boolAttrs = new RegExp(boolAttrs, 'i');
					return boolAttrs.test(name);
				}
	
				return false;
			},
	
			/**
			 * Check if compact boolean attribute record is 
			 * allowed for current profile
			 * @return {Boolean}
			 */
			allowCompactBoolean: function() {
				return this.compact_bool && prefs.get('profile.allowCompactBoolean');
			}
		};
		
		/**
		 * Helper function that converts string case depending on 
		 * <code>caseValue</code> 
		 * @param {String} str String to transform
		 * @param {String} caseValue Case value: can be <i>lower</i>, 
		 * <i>upper</i> and <i>leave</i>
		 * @returns {String}
		 */
		function stringCase(str, caseValue) {
			switch (String(caseValue || '').toLowerCase()) {
				case 'lower':
					return str.toLowerCase();
				case 'upper':
					return str.toUpperCase();
			}
			
			return str;
		}
		
		/**
		 * Creates new output profile
		 * @param {String} name Profile name
		 * @param {Object} options Profile options
		 */
		function createProfile(name, options) {
			return profiles[name.toLowerCase()] = new OutputProfile(options);
		}
		
		function createDefaultProfiles() {
			createProfile('xhtml');
			createProfile('html', {self_closing_tag: false, compact_bool: true});
			createProfile('xml', {self_closing_tag: true, tag_nl: true});
			createProfile('plain', {tag_nl: false, indent: false, place_cursor: false});
			createProfile('line', {tag_nl: false, indent: false, extraFilters: 's'});
			createProfile('css', {tag_nl: true});
			createProfile('css_line', {tag_nl: false});
		}
		
		createDefaultProfiles();
		
		return  {
			/**
			 * Creates new output profile and adds it into internal dictionary
			 * @param {String} name Profile name
			 * @param {Object} options Profile options
			 * @memberOf emmet.profile
			 * @returns {Object} New profile
			 */
			create: function(name, options) {
				if (arguments.length == 2)
					return createProfile(name, options);
				else
					// create profile object only
					return new OutputProfile(utils.defaults(name || {}, defaultProfile));
			},
			
			/**
			 * Returns profile by its name. If profile wasn't found, returns
			 * 'plain' profile
			 * @param {String} name Profile name. Might be profile itself
			 * @param {String} syntax. Optional. Current editor syntax. If defined,
			 * profile is searched in resources first, then in predefined profiles
			 * @returns {Object}
			 */
			get: function(name, syntax) {
				if (!name && syntax) {
					// search in user resources first
					var profile = resources.findItem(syntax, 'profile');
					if (profile) {
						name = profile;
					}
				}
				
				if (!name) {
					return profiles.plain;
				}
				
				if (name instanceof OutputProfile) {
					return name;
				}
				
				if (typeof name === 'string' && name.toLowerCase() in profiles) {
					return profiles[name.toLowerCase()];
				}
				
				return this.create(name);
			},
			
			/**
			 * Deletes profile with specified name
			 * @param {String} name Profile name
			 */
			remove: function(name) {
				name = (name || '').toLowerCase();
				if (name in profiles)
					delete profiles[name];
			},
			
			/**
			 * Resets all user-defined profiles
			 */
			reset: function() {
				profiles = {};
				createDefaultProfiles();
			},
			
			/**
			 * Helper function that converts string case depending on 
			 * <code>caseValue</code> 
			 * @param {String} str String to transform
			 * @param {String} caseValue Case value: can be <i>lower</i>, 
			 * <i>upper</i> and <i>leave</i>
			 * @returns {String}
			 */
			stringCase: stringCase
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/**
	 * Parsed resources (snippets, abbreviations, variables, etc.) for Emmet.
	 * Contains convenient method to get access for snippets with respect of 
	 * inheritance. Also provides ability to store data in different vocabularies
	 * ('system' and 'user') for fast and safe resource update
	 * @author Sergey Chikuyonok (serge.che@gmail.com)
	 * @link http://chikuyonok.ru
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var prefs = __webpack_require__(26);
		var utils = __webpack_require__(22);
	
		prefs.define('caniuse.enabled', true, 'Enable support of Can I Use database. When enabled,\
			CSS abbreviation resolver will look at Can I Use database first before detecting\
			CSS properties that should be resolved');
		
		prefs.define('caniuse.vendors', 'all', 'A comma-separated list vendor identifiers\
			(as described in Can I Use database) that should be supported\
			when resolving vendor-prefixed properties. Set value to <code>all</code>\
			to support all available properties');
		
		prefs.define('caniuse.era', 'e-2', 'Browser era, as defined in Can I Use database.\
			Examples: <code>e0</code> (current version), <code>e1</code> (near future)\
			<code>e-2</code> (2 versions back) and so on.');
		
		var cssSections = {
			'border-image': ['border-image'],
			'css-boxshadow': ['box-shadow'],
			'css3-boxsizing': ['box-sizing'],
			'multicolumn': ['column-width', 'column-count', 'columns', 'column-gap', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-rule', 'column-span', 'column-fill'],
			'border-radius': ['border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'],
			'transforms2d': ['transform'],
			'css-hyphens': ['hyphens'],
			'css-transitions': ['transition', 'transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay'],
			'font-feature': ['font-feature-settings'],
			'css-animation': ['animation', 'animation-name', 'animation-duration', 'animation-timing-function', 'animation-iteration-count', 'animation-direction', 'animation-play-state', 'animation-delay', 'animation-fill-mode', '@keyframes'],
			'css-gradients': ['linear-gradient'],
			'css-masks': ['mask-image', 'mask-source-type', 'mask-repeat', 'mask-position', 'mask-clip', 'mask-origin', 'mask-size', 'mask', 'mask-type', 'mask-box-image-source', 'mask-box-image-slice', 'mask-box-image-width', 'mask-box-image-outset', 'mask-box-image-repeat', 'mask-box-image', 'clip-path', 'clip-rule'],
			'css-featurequeries': ['@supports'],
			'flexbox': ['flex', 'inline-flex', 'flex-direction', 'flex-wrap', 'flex-flow', 'order', 'flex'],
			'calc': ['calc'],
			'object-fit': ['object-fit', 'object-position'],
			'css-grid': ['grid', 'inline-grid', 'grid-template-rows', 'grid-template-columns', 'grid-template-areas', 'grid-template', 'grid-auto-rows', 'grid-auto-columns', ' grid-auto-flow', 'grid-auto-position', 'grid', ' grid-row-start', 'grid-column-start', 'grid-row-end', 'grid-column-end', 'grid-column', 'grid-row', 'grid-area', 'justify-self', 'justify-items', 'align-self', 'align-items'],
			'css-repeating-gradients': ['repeating-linear-gradient'],
			'css-filters': ['filter'],
			'user-select-none': ['user-select'],
			'intrinsic-width': ['min-content', 'max-content', 'fit-content', 'fill-available'],
			'css3-tabsize': ['tab-size']
		};
	
		/** @type {Object} The Can I Use database for CSS */
		var cssDB = null;
		/** @type {Object} A list of available vendors (browsers) and their prefixes */
		var vendorsDB = null;
		var erasDB = null;
	
		function intersection(arr1, arr2) {
			var result = [];
			var smaller = arr1, larger = arr2;
			if (smaller.length > larger.length) {
				smaller = arr2;
				larger = arr1;
			}
			larger.forEach(function(item) {
				if (~smaller.indexOf(item)) {
					result.push(item);
				}
			});
			return result;
		}
	
		/**
		 * Parses raw Can I Use database for better lookups
		 * @param  {String} data Raw database
		 * @param  {Boolean} optimized Pass `true` if given `data` is already optimized
		 * @return {Object}
		 */
		function parseDB(data, optimized) {
			if (typeof data == 'string') {
				data = JSON.parse(data);
			}
	
			if (!optimized) {
				data = optimize(data);
			}
	
			vendorsDB = data.vendors;
			cssDB = data.css;
			erasDB = data.era;
		}
	
		/**
		 * Extract required data only from CIU database 
		 * @param  {Object} data Raw Can I Use database
		 * @return {Object}      Optimized database
		 */
		function optimize(data) {
			if (typeof data == 'string') {
				data = JSON.parse(data);
			}
	
			return {
				vendors: parseVendors(data),
				css: parseCSS(data),
				era: parseEra(data)
			};
		}
	
		/**
		 * Parses vendor data
		 * @param  {Object} data
		 * @return {Object}
		 */
		function parseVendors(data) {
			var out = {};
			Object.keys(data.agents).forEach(function(name) {
				var agent = data.agents[name];
				out[name] = {
					prefix: agent.prefix,
					versions: agent.versions
				};
			});
			return out;
		}
	
		/**
		 * Parses CSS data from Can I Use raw database
		 * @param  {Object} data
		 * @return {Object}
		 */
		function parseCSS(data) {
			var out = {};
			var cssCategories = data.cats.CSS;
			Object.keys(data.data).forEach(function(name) {
				var section = data.data[name];
				if (name in cssSections) {
					cssSections[name].forEach(function(kw) {
						out[kw] = section.stats;
					});
				}
			});
	
			return out;
		}
	
		/**
		 * Parses era data from Can I Use raw database
		 * @param  {Object} data
		 * @return {Array}
		 */
		function parseEra(data) {
			// some runtimes (like Mozilla Rhino) does not preserves
			// key order so we have to sort values manually
			return Object.keys(data.eras).sort(function(a, b) {
				return parseInt(a.substr(1)) - parseInt(b.substr(1));
			});
		}
		
		/**
		 * Returs list of supported vendors, depending on user preferences
		 * @return {Array}
		 */
		function getVendorsList() {
			var allVendors = Object.keys(vendorsDB);
			var vendors = prefs.getArray('caniuse.vendors');
			if (!vendors || vendors[0] == 'all') {
				return allVendors;
			}
	
			return intersection(allVendors, vendors);
		}
	
		/**
		 * Returns size of version slice as defined by era identifier
		 * @return {Number}
		 */
		function getVersionSlice() {
			var era = prefs.get('caniuse.era');
			var ix = erasDB.indexOf(era);
			if (!~ix) {
				ix = erasDB.indexOf('e-2');
			}
	
			return ix;
		}
	
		// try to load caniuse database
		// hide it from Require.JS parser
		var db = null;
		(function(r) {
			if (false) {
				try {
					var fs = r('fs');
					var path = r('path');
					db = fs.readFileSync(path.join(__dirname, '../caniuse.json'), {encoding: 'utf8'});
				} catch(e) {}
			}
		})(require);
		
		if (db) {
			parseDB(db);
		}
	
		return {
			load: parseDB,
			optimize: optimize,
			
			/**
			 * Resolves prefixes for given property
			 * @param {String} property A property to resolve. It can start with `@` symbol
			 * (CSS section, like `@keyframes`) or `:` (CSS value, like `flex`)
			 * @return {Array} Array of resolved prefixes or <code>null</code>
			 * if prefixes can't be resolved. Empty array means property has no vendor
			 * prefixes
			 */
			resolvePrefixes: function(property) {
				if (!prefs.get('caniuse.enabled') || !cssDB || !(property in cssDB)) {
					return null;
				}
	
				var prefixes = [];
				var propStats = cssDB[property];
				var versions = getVersionSlice();
	
				getVendorsList().forEach(function(vendor) {
					var vendorVesions = vendorsDB[vendor].versions.slice(versions);
					for (var i = 0, v; i < vendorVesions.length; i++) {
						v = vendorVesions[i];
						if (!v) {
							continue;
						}
	
						if (~propStats[vendor][v].indexOf('x')) {
							prefixes.push(vendorsDB[vendor].prefix);
							break;
						}
					}
				});
	
				return utils.unique(prefixes).sort(function(a, b) {
					return b.length - a.length;
				});
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Simple logger for Emmet
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		return {
			log: function() {
				if (typeof console != 'undefined' && console.log) {
					console.log.apply(console, arguments);
				}
			}
		}
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Utility module for handling tabstops tokens generated by Emmet's 
	 * "Expand Abbreviation" action. The main <code>extract</code> method will take
	 * raw text (for example: <i>${0} some ${1:text}</i>), find all tabstops 
	 * occurrences, replace them with tokens suitable for your editor of choice and 
	 * return object with processed text and list of found tabstops and their ranges.
	 * For sake of portability (Objective-C/Java) the tabstops list is a plain 
	 * sorted array with plain objects.
	 * 
	 * Placeholders with the same are meant to be <i>linked</i> in your editor.
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var stringStream = __webpack_require__(56);
		var resources = __webpack_require__(27);
	
		/**
		 * Global placeholder value, automatically incremented by 
		 * <code>variablesResolver()</code> function
		 */
		var startPlaceholderNum = 100;
		var tabstopIndex = 0;
		
		var defaultOptions = {
			replaceCarets: false,
			escape: function(ch) {
				return '\\' + ch;
			},
			tabstop: function(data) {
				return data.token;
			},
			variable: function(data) {
				return data.token;
			}
		};
		
		return {
			/**
			 * Main function that looks for a tabstops in provided <code>text</code>
			 * and returns a processed version of <code>text</code> with expanded 
			 * placeholders and list of tabstops found.
			 * @param {String} text Text to process
			 * @param {Object} options List of processor options:<br>
			 * 
			 * <b>replaceCarets</b> : <code>Boolean</code> — replace all default
			 * caret placeholders (like <i>{%::emmet-caret::%}</i>) with <i>${0:caret}</i><br>
			 * 
			 * <b>escape</b> : <code>Function</code> — function that handle escaped
			 * characters (mostly '$'). By default, it returns the character itself 
			 * to be displayed as is in output, but sometimes you will use 
			 * <code>extract</code> method as intermediate solution for further 
			 * processing and want to keep character escaped. Thus, you should override
			 * <code>escape</code> method to return escaped symbol (e.g. '\\$')<br>
			 * 
			 * <b>tabstop</b> : <code>Function</code> – a tabstop handler. Receives 
			 * a single argument – an object describing token: its position, number 
			 * group, placeholder and token itself. Should return a replacement 
			 * string that will appear in final output
			 * 
			 * <b>variable</b> : <code>Function</code> – variable handler. Receives 
			 * a single argument – an object describing token: its position, name 
			 * and original token itself. Should return a replacement 
			 * string that will appear in final output
			 * 
			 * @returns {Object} Object with processed <code>text</code> property
			 * and array of <code>tabstops</code> found
			 * @memberOf tabStops
			 */
			extract: function(text, options) {
				// prepare defaults
				var placeholders = {carets: ''};
				var marks = [];
				
				options = utils.extend({}, defaultOptions, options, {
					tabstop: function(data) {
						var token = data.token;
						var ret = '';
						if (data.placeholder == 'cursor') {
							marks.push({
								start: data.start,
								end: data.start + token.length,
								group: 'carets',
								value: ''
							});
						} else {
							// unify placeholder value for single group
							if ('placeholder' in data)
								placeholders[data.group] = data.placeholder;
							
							if (data.group in placeholders)
								ret = placeholders[data.group];
							
							marks.push({
								start: data.start,
								end: data.start + token.length,
								group: data.group,
								value: ret
							});
						}
						
						return token;
					}
				});
				
				if (options.replaceCarets) {
					text = text.replace(new RegExp( utils.escapeForRegexp( utils.getCaretPlaceholder() ), 'g'), '${0:cursor}');
				}
				
				// locate tabstops and unify group's placeholders
				text = this.processText(text, options);
				
				// now, replace all tabstops with placeholders
				var buf = '', lastIx = 0;
				var tabStops = marks.map(function(mark) {
					buf += text.substring(lastIx, mark.start);
					
					var pos = buf.length;
					var ph = placeholders[mark.group] || '';
					
					buf += ph;
					lastIx = mark.end;
					
					return {
						group: mark.group,
						start: pos,
						end:  pos + ph.length
					};
				});
				
				buf += text.substring(lastIx);
				
				return {
					text: buf,
					tabstops: tabStops.sort(function(a, b) {
						return a.start - b.start;
					})
				};
			},
			
			/**
			 * Text processing routine. Locates escaped characters and tabstops and
			 * replaces them with values returned by handlers defined in 
			 * <code>options</code>
			 * @param {String} text
			 * @param {Object} options See <code>extract</code> method options 
			 * description
			 * @returns {String}
			 */
			processText: function(text, options) {
				options = utils.extend({}, defaultOptions, options);
				
				var buf = '';
				/** @type StringStream */
				var stream = stringStream.create(text);
				var ch, m, a;
				
				while ((ch = stream.next())) {
					if (ch == '\\' && !stream.eol()) {
						// handle escaped character
						buf += options.escape(stream.next());
						continue;
					}
					
					a = ch;
					
					if (ch == '$') {
						// looks like a tabstop
						stream.start = stream.pos - 1;
						
						if ((m = stream.match(/^[0-9]+/))) {
							// it's $N
							a = options.tabstop({
								start: buf.length, 
								group: stream.current().substr(1),
								token: stream.current()
							});
						} else if ((m = stream.match(/^\{([a-z_\-][\w\-]*)\}/))) {
							// ${variable}
							a = options.variable({
								start: buf.length, 
								name: m[1],
								token: stream.current()
							});
						} else if ((m = stream.match(/^\{([0-9]+)(:.+?)?\}/, false))) {
							// ${N:value} or ${N} placeholder
							// parse placeholder, including nested ones
							stream.skipToPair('{', '}');
							
							var obj = {
								start: buf.length, 
								group: m[1],
								token: stream.current()
							};
							
							var placeholder = obj.token.substring(obj.group.length + 2, obj.token.length - 1);
							
							if (placeholder) {
								obj.placeholder = placeholder.substr(1);
							}
							
							a = options.tabstop(obj);
						}
					}
					
					buf += a;
				}
				
				return buf;
			},
			
			/**
			 * Upgrades tabstops in output node in order to prevent naming conflicts
			 * @param {AbbreviationNode} node
			 * @param {Number} offset Tab index offset
			 * @returns {Number} Maximum tabstop index in element
			 */
			upgrade: function(node, offset) {
				var maxNum = 0;
				var options = {
					tabstop: function(data) {
						var group = parseInt(data.group, 10);
						if (group > maxNum) maxNum = group;
							
						if (data.placeholder)
							return '${' + (group + offset) + ':' + data.placeholder + '}';
						else
							return '${' + (group + offset) + '}';
					}
				};
				
				['start', 'end', 'content'].forEach(function(p) {
					node[p] = this.processText(node[p], options);
				}, this);
				
				return maxNum;
			},
			
			/**
			 * Helper function that produces a callback function for 
			 * <code>replaceVariables()</code> method from {@link utils}
			 * module. This callback will replace variable definitions (like 
			 * ${var_name}) with their value defined in <i>resource</i> module,
			 * or outputs tabstop with variable name otherwise.
			 * @param {AbbreviationNode} node Context node
			 * @returns {Function}
			 */
			variablesResolver: function(node) {
				var placeholderMemo = {};
				return function(str, varName) {
					// do not mark `child` variable as placeholder – it‘s a reserved
					// variable name
					if (varName == 'child') {
						return str;
					}
					
					if (varName == 'cursor') {
						return utils.getCaretPlaceholder();
					}
					
					var attr = node.attribute(varName);
					if (typeof attr !== 'undefined' && attr !== str) {
						return attr;
					}
					
					var varValue = resources.getVariable(varName);
					if (varValue) {
						return varValue;
					}
					
					// output as placeholder
					if (!placeholderMemo[varName]) {
						placeholderMemo[varName] = startPlaceholderNum++;
					}
						
					return '${' + placeholderMemo[varName] + ':' + varName + '}';
				};
			},
	
			/**
			 * Replace variables like ${var} in string
			 * @param {String} str
			 * @param {Object} vars Variable set (defaults to variables defined in 
			 * <code>snippets.json</code>) or variable resolver (<code>Function</code>)
			 * @return {String}
			 */
			replaceVariables: function(str, vars) {
				vars = vars || {};
				var resolver = typeof vars === 'function' ? vars : function(str, p1) {
					return p1 in vars ? vars[p1] : null;
				};
				
				return this.processText(str, {
					variable: function(data) {
						var newValue = resolver(data.token, data.name, data);
						if (newValue === null) {
							// try to find variable in resources
							newValue = resources.getVariable(data.name);
						}
						
						if (newValue === null || typeof newValue === 'undefined')
							// nothing found, return token itself
							newValue = data.token;
						return newValue;
					}
				});
			},
			
			/**
			 * Resets global tabstop index. When parsed tree is converted to output
			 * string (<code>AbbreviationNode.toString()</code>), all tabstops 
			 * defined in snippets and elements are upgraded in order to prevent
			 * naming conflicts of nested. For example, <code>${1}</code> of a node
			 * should not be linked with the same placehilder of the child node.
			 * By default, <code>AbbreviationNode.toString()</code> automatically
			 * upgrades tabstops of the same index for each node and writes maximum
			 * tabstop index into the <code>tabstopIndex</code> variable. To keep
			 * this variable at reasonable value, it is recommended to call 
			 * <code>resetTabstopIndex()</code> method each time you expand variable 
			 * @returns
			 */
			resetTabstopIndex: function() {
				tabstopIndex = 0;
				startPlaceholderNum = 100;
			},
	
			/**
			 * Output processor for abbreviation parser that will upgrade tabstops 
			 * of parsed node in order to prevent tabstop index conflicts
			 */
			abbrOutputProcessor: function(text, node, type) {
				var maxNum = 0;
				var that = this;
				
				var tsOptions = {
					tabstop: function(data) {
						var group = parseInt(data.group, 10);
						if (group === 0)
							return '${0}';
						
						if (group > maxNum) maxNum = group;
						if (data.placeholder) {
							// respect nested placeholders
							var ix = group + tabstopIndex;
							var placeholder = that.processText(data.placeholder, tsOptions);
							return '${' + ix + ':' + placeholder + '}';
						} else {
							return '${' + (group + tabstopIndex) + '}';
						}
					}
				};
				
				// upgrade tabstops
				text = this.processText(text, tsOptions);
				
				// resolve variables
				text = this.replaceVariables(text, this.variablesResolver(node));
				
				tabstopIndex += maxNum + 1;
				return text;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * HTML matcher: takes string and searches for HTML tag pairs for given position 
	 * 
	 * Unlike “classic” matchers, it parses content from the specified 
	 * position, not from the start, so it may work even outside HTML documents
	 * (for example, inside strings of programming languages like JavaScript, Python 
	 * etc.)
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var range = __webpack_require__(36);
	
		// Regular Expressions for parsing tags and attributes
		var reOpenTag = /^<([\w\:\-]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
		var reCloseTag = /^<\/([\w\:\-]+)[^>]*>/;
	
		function openTag(i, match) {
			return {
				name: match[1],
				selfClose: !!match[3],
				/** @type Range */
				range: range(i, match[0]),
				type: 'open'
			};
		}
		
		function closeTag(i, match) {
			return {
				name: match[1],
				/** @type Range */
				range: range(i, match[0]),
				type: 'close'
			};
		}
		
		function comment(i, match) {
			return {
				/** @type Range */
				range: range(i, typeof match == 'number' ? match - i : match[0]),
				type: 'comment'
			};
		}
		
		/**
		 * Creates new tag matcher session
		 * @param {String} text
		 */
		function createMatcher(text) {
			var memo = {}, m;
			return {
				/**
				 * Test if given position matches opening tag
				 * @param {Number} i
				 * @returns {Object} Matched tag object
				 */
				open: function(i) {
					var m = this.matches(i);
					return m && m.type == 'open' ? m : null;
				},
				
				/**
				 * Test if given position matches closing tag
				 * @param {Number} i
				 * @returns {Object} Matched tag object
				 */
				close: function(i) {
					var m = this.matches(i);
					return m && m.type == 'close' ? m : null;
				},
				
				/**
				 * Matches either opening or closing tag for given position
				 * @param i
				 * @returns
				 */
				matches: function(i) {
					var key = 'p' + i;
					
					if (!(key in memo)) {
						memo[key] = false;
						if (text.charAt(i) == '<') {
							var substr = text.slice(i);
							if ((m = substr.match(reOpenTag))) {
								memo[key] = openTag(i, m);
							} else if ((m = substr.match(reCloseTag))) {
								memo[key] = closeTag(i, m);
							}
						}
					}
					
					return memo[key];
				},
				
				/**
				 * Returns original text
				 * @returns {String}
				 */
				text: function() {
					return text;
				},
	
				clean: function() {
					memo = text = m = null;
				}
			};
		}
		
		function matches(text, pos, pattern) {
			return text.substring(pos, pos + pattern.length) == pattern;
		}
		
		/**
		 * Search for closing pair of opening tag
		 * @param {Object} open Open tag instance
		 * @param {Object} matcher Matcher instance
		 */
		function findClosingPair(open, matcher) {
			var stack = [], tag = null;
			var text = matcher.text();
			
			for (var pos = open.range.end, len = text.length; pos < len; pos++) {
				if (matches(text, pos, '<!--')) {
					// skip to end of comment
					for (var j = pos; j < len; j++) {
						if (matches(text, j, '-->')) {
							pos = j + 3;
							break;
						}
					}
				}
				
				if ((tag = matcher.matches(pos))) {
					if (tag.type == 'open' && !tag.selfClose) {
						stack.push(tag.name);
					} else if (tag.type == 'close') {
						if (!stack.length) { // found valid pair?
							return tag.name == open.name ? tag : null;
						}
						
						// check if current closing tag matches previously opened one
						if (stack[stack.length - 1] == tag.name) {
							stack.pop();
						} else {
							var found = false;
							while (stack.length && !found) {
								var last = stack.pop();
								if (last == tag.name) {
									found = true;
								}
							}
							
							if (!stack.length && !found) {
								return tag.name == open.name ? tag : null;
							}
						}
					}
	
					pos = tag.range.end - 1;
				}
			}
		}
		
		return {
			/**
			 * Main function: search for tag pair in <code>text</code> for given 
			 * position
			 * @memberOf htmlMatcher
			 * @param {String} text 
			 * @param {Number} pos
			 * @returns {Object}
			 */
			find: function(text, pos) {
				var matcher = createMatcher(text); 
				var open = null, close = null;
				var j, jl;
				
				for (var i = pos; i >= 0; i--) {
					if ((open = matcher.open(i))) {
						// found opening tag
						if (open.selfClose) {
							if (open.range.cmp(pos, 'lt', 'gt')) {
								// inside self-closing tag, found match
								break;
							}
							
							// outside self-closing tag, continue
							continue;
						}
						
						close = findClosingPair(open, matcher);
						if (close) {
							// found closing tag.
							var r = range.create2(open.range.start, close.range.end);
							if (r.contains(pos)) {
								break;
							}
						} else if (open.range.contains(pos)) {
							// we inside empty HTML tag like <br>
							break;
						}
						
						open = null;
					} else if (matches(text, i, '-->')) {
						// skip back to comment start
						for (j = i - 1; j >= 0; j--) {
							if (matches(text, j, '-->')) {
								// found another comment end, do nothing
								break;
							} else if (matches(text, j, '<!--')) {
								i = j;
								break;
							}
						}
					} else if (matches(text, i, '<!--')) {
						// we're inside comment, match it
						for (j = i + 4, jl = text.length; j < jl; j++) {
							if (matches(text, j, '-->')) {
								j += 3;
								break;
							}
						}
						
						open = comment(i, j);
						break;
					}
				}
				
				matcher.clean();
	
				if (open) {
					var outerRange = null;
					var innerRange = null;
					
					if (close) {
						outerRange = range.create2(open.range.start, close.range.end);
						innerRange = range.create2(open.range.end, close.range.start);
					} else {
						outerRange = innerRange = range.create2(open.range.start, open.range.end);
					}
					
					if (open.type == 'comment') {
						// adjust positions of inner range for comment
						var _c = outerRange.substring(text);
						innerRange.start += _c.length - _c.replace(/^<\!--\s*/, '').length;
						innerRange.end -= _c.length - _c.replace(/\s*-->$/, '').length;
					}
					
					return {
						open: open,
						close: close,
						type: open.type == 'comment' ? 'comment' : 'tag',
						innerRange: innerRange,
						innerContent: function() {
							return this.innerRange.substring(text);
						},
						outerRange: outerRange,
						outerContent: function() {
							return this.outerRange.substring(text);
						},
						range: !innerRange.length() || !innerRange.cmp(pos, 'lte', 'gte') ? outerRange : innerRange,
						content: function() {
							return this.range.substring(text);
						},
						source: text
					};
				}
			},
			
			/**
			 * The same as <code>find()</code> method, but restricts matched result 
			 * to <code>tag</code> type
			 * @param {String} text 
			 * @param {Number} pos
			 * @returns {Object}
			 */
			tag: function(text, pos) {
				var result = this.find(text, pos);
				if (result && result.type == 'tag') {
					return result;
				}
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Utility methods for Emmet actions
	 * @author Sergey Chikuyonok (serge.che@gmail.com) <http://chikuyonok.ru>
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var cssSections = __webpack_require__(95);
		var abbreviationParser = __webpack_require__(24);
		var htmlMatcher = __webpack_require__(32);
		var xmlEditTree = __webpack_require__(72);
		var range = __webpack_require__(36);
		var resources = __webpack_require__(27);
	
		return {
			mimeTypes: {
				'gif' : 'image/gif',
				'png' : 'image/png',
				'jpg' : 'image/jpeg',
				'jpeg': 'image/jpeg',
				'svg' : 'image/svg+xml',
				'html': 'text/html',
				'htm' : 'text/html'
			},
			
			/**
			 * Extracts abbreviations from text stream, starting from the end
			 * @param {String} str
			 * @return {String} Abbreviation or empty string
			 * @memberOf emmet.actionUtils
			 */
			extractAbbreviation: function(str) {
				var curOffset = str.length;
				var startIndex = -1;
				var groupCount = 0;
				var braceCount = 0;
				var textCount = 0;
				
				while (true) {
					curOffset--;
					if (curOffset < 0) {
						// moved to the beginning of the line
						startIndex = 0;
						break;
					}
					
					var ch = str.charAt(curOffset);
					
					if (ch == ']') {
						braceCount++;
					} else if (ch == '[') {
						if (!braceCount) { // unexpected brace
							startIndex = curOffset + 1;
							break;
						}
						braceCount--;
					} else if (ch == '}') {
						textCount++;
					} else if (ch == '{') {
						if (!textCount) { // unexpected brace
							startIndex = curOffset + 1;
							break;
						}
						textCount--;
					} else if (ch == ')') {
						groupCount++;
					} else if (ch == '(') {
						if (!groupCount) { // unexpected brace
							startIndex = curOffset + 1;
							break;
						}
						groupCount--;
					} else {
						if (braceCount || textCount) 
							// respect all characters inside attribute sets or text nodes
							continue;
						else if (!abbreviationParser.isAllowedChar(ch) || (ch == '>' && utils.endsWithTag(str.substring(0, curOffset + 1)))) {
							// found stop symbol
							startIndex = curOffset + 1;
							break;
						}
					}
				}
				
				if (startIndex != -1 && !textCount && !braceCount && !groupCount) 
					// found something, remove some invalid symbols from the 
					// beginning and return abbreviation
					return str.substring(startIndex).replace(/^[\*\+\>\^]+/, '');
				else
					return '';
			},
			
			/**
			 * Gets image size from image byte stream.
			 * @author http://romeda.org/rePublish/
			 * @param {String} stream Image byte stream (use <code>IEmmetFile.read()</code>)
			 * @return {Object} Object with <code>width</code> and <code>height</code> properties
			 */
			getImageSize: function(stream) {
				var pngMagicNum = "\211PNG\r\n\032\n",
					jpgMagicNum = "\377\330",
					gifMagicNum = "GIF8",
					pos = 0,
					nextByte = function() {
						return stream.charCodeAt(pos++);
					};
			
				if (stream.substr(0, 8) === pngMagicNum) {
					// PNG. Easy peasy.
					pos = stream.indexOf('IHDR') + 4;
				
					return {
						width:  (nextByte() << 24) | (nextByte() << 16) | (nextByte() <<  8) | nextByte(),
						height: (nextByte() << 24) | (nextByte() << 16) | (nextByte() <<  8) | nextByte()
					};
				
				} else if (stream.substr(0, 4) === gifMagicNum) {
					pos = 6;
				
					return {
						width:  nextByte() | (nextByte() << 8),
						height: nextByte() | (nextByte() << 8)
					};
				
				} else if (stream.substr(0, 2) === jpgMagicNum) {
					pos = 2;
				
					var l = stream.length;
					while (pos < l) {
						if (nextByte() != 0xFF) return;
					
						var marker = nextByte();
						if (marker == 0xDA) break;
					
						var size = (nextByte() << 8) | nextByte();
					
						if (marker >= 0xC0 && marker <= 0xCF && !(marker & 0x4) && !(marker & 0x8)) {
							pos += 1;
							return {
								height: (nextByte() << 8) | nextByte(),
								width: (nextByte() << 8) | nextByte()
							};
					
						} else {
							pos += size - 2;
						}
					}
				}
			},
			
			/**
			 * Captures context XHTML element from editor under current caret position.
			 * This node can be used as a helper for abbreviation extraction
			 * @param {IEmmetEditor} editor
			 * @returns {Object}
			 */
			captureContext: function(editor, pos) {
				var allowedSyntaxes = {'html': 1, 'xml': 1, 'xsl': 1};
				var syntax = editor.getSyntax();
				if (syntax in allowedSyntaxes) {
					var content = editor.getContent();
					if (typeof pos === 'undefined') {
						pos = editor.getCaretPos();
					}
	
					var tag = htmlMatcher.find(content, pos);
					if (tag && tag.type == 'tag') {
						var startTag = tag.open;
						var contextNode = {
							name: startTag.name,
							attributes: [],
							match: tag
						};
						
						// parse attributes
						var tagTree = xmlEditTree.parse(startTag.range.substring(content));
						if (tagTree) {
							contextNode.attributes = tagTree.getAll().map(function(item) {
								return {
									name: item.name(),
									value: item.value()
								};
							});
						}
						
						return contextNode;
					}
				}
				
				return null;
			},
			
			/**
			 * Find expression bounds in current editor at caret position. 
			 * On each character a <code>fn</code> function will be called and must 
			 * return <code>true</code> if current character meets requirements, 
			 * <code>false</code> otherwise
			 * @param {IEmmetEditor} editor
			 * @param {Function} fn Function to test each character of expression
			 * @return {Range}
			 */
			findExpressionBounds: function(editor, fn) {
				var content = String(editor.getContent());
				var il = content.length;
				var exprStart = editor.getCaretPos() - 1;
				var exprEnd = exprStart + 1;
					
				// start by searching left
				while (exprStart >= 0 && fn(content.charAt(exprStart), exprStart, content)) exprStart--;
				
				// then search right
				while (exprEnd < il && fn(content.charAt(exprEnd), exprEnd, content)) exprEnd++;
				
				if (exprEnd > exprStart) {
					return range([++exprStart, exprEnd]);
				}
			},
			
			/**
			 * @param {IEmmetEditor} editor
			 * @param {Object} data
			 * @returns {Boolean}
			 */
			compoundUpdate: function(editor, data) {
				if (data) {
					var sel = editor.getSelectionRange();
					editor.replaceContent(data.data, data.start, data.end, true);
					editor.createSelection(data.caret, data.caret + sel.end - sel.start);
					return true;
				}
				
				return false;
			},
			
			/**
			 * Common syntax detection method for editors that doesn’t provide any
			 * info about current syntax scope. 
			 * @param {IEmmetEditor} editor Current editor
			 * @param {String} hint Any syntax hint that editor can provide 
			 * for syntax detection. Default is 'html'
			 * @returns {String} 
			 */
			detectSyntax: function(editor, hint) {
				var syntax = hint || 'html';
				
				if (!resources.hasSyntax(syntax)) {
					syntax = 'html';
				}
				
				if (syntax == 'html' && (this.isStyle(editor) || this.isInlineCSS(editor))) {
					syntax = 'css';
				}
	
				if (syntax == 'styl') {
					syntax = 'stylus';
				}
				
				return syntax;
			},
			
			/**
			 * Common method for detecting output profile
			 * @param {IEmmetEditor} editor
			 * @returns {String}
			 */
			detectProfile: function(editor) {
				var syntax = editor.getSyntax();
				
				// get profile from syntax definition
				var profile = resources.findItem(syntax, 'profile');
				if (profile) {
					return profile;
				}
				
				switch(syntax) {
					case 'xml':
					case 'xsl':
						return 'xml';
					case 'css':
						if (this.isInlineCSS(editor)) {
							return 'line';
						}
						break;
					case 'html':
						profile = resources.getVariable('profile');
						if (!profile) { // no forced profile, guess from content
							// html or xhtml?
							profile = this.isXHTML(editor) ? 'xhtml': 'html';
						}
	
						return profile;
				}
	
				return 'xhtml';
			},
			
			/**
			 * Tries to detect if current document is XHTML one.
			 * @param {IEmmetEditor} editor
			 * @returns {Boolean}
			 */
			isXHTML: function(editor) {
				return editor.getContent().search(/<!DOCTYPE[^>]+XHTML/i) != -1;
			},
	
			/**
			 * Check if current caret position is inside &lt;style&gt; tag
			 * @param {IEmmetEditor} editor
			 * @returns {Range} Inner range of &lt;style&gt; tag
			 */
			isStyle: function(editor) {
				return !!cssSections.styleTagRange(editor.getContent(), editor.getCaretPos());
			},
	
			/**
			 * Check if given CSS dialect is supported by CSS actions
			 * @param  {String}  syntax
			 * @return {Boolean}
			 */
			isSupportedCSS: function(syntax) {
				return syntax == 'css' || syntax == 'less' || syntax == 'scss';
			},
			
			/**
			 * Check if current caret position is inside "style" attribute of HTML
			 * element
			 * @param {IEmmetEditor} editor
			 * @returns {Range} Inner range of style attribute
			 */
			isInlineCSS: function(editor) {
				return !!cssSections.styleAttrRange(editor.getContent(), editor.getCaretPos());
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Utility module used to prepare text for pasting into back-end editor
	 * @author Sergey Chikuyonok (serge.che@gmail.com) <http://chikuyonok.ru>
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var resources = __webpack_require__(27);
	
		return  {
			/**
			 * Check if cursor is placed inside XHTML tag
			 * @param {String} html Contents of the document
			 * @param {Number} caretPos Current caret position inside tag
			 * @return {Boolean}
			 */
			isInsideTag: function(html, caretPos) {
				var reTag = /^<\/?\w[\w\:\-]*.*?>/;
				
				// search left to find opening brace
				var pos = caretPos;
				while (pos > -1) {
					if (html.charAt(pos) == '<') 
						break;
					pos--;
				}
				
				if (pos != -1) {
					var m = reTag.exec(html.substring(pos));
					if (m && caretPos > pos && caretPos < pos + m[0].length)
						return true;
				}
				
				return false;
			},
			
			/**
			 * Sanitizes incoming editor data and provides default values for
			 * output-specific info
			 * @param {IEmmetEditor} editor
			 * @param {String} syntax
			 * @param {String} profile
			 */
			outputInfo: function(editor, syntax, profile) {
				// most of this code makes sense for Java/Rhino environment
				// because string that comes from Java are not actually JS string
				// but Java String object so the have to be explicitly converted
				// to native string
				profile = profile || editor.getProfileName();
				return  {
					/** @memberOf outputInfo */
					syntax: String(syntax || editor.getSyntax()),
					profile: profile || null,
					content: String(editor.getContent())
				};
			},
			
			/**
			 * Unindent content, thus preparing text for tag wrapping
			 * @param {IEmmetEditor} editor Editor instance
			 * @param {String} text
			 * @return {String}
			 */
			unindent: function(editor, text) {
				return utils.unindentString(text, this.getCurrentLinePadding(editor));
			},
			
			/**
			 * Returns padding of current editor's line
			 * @param {IEmmetEditor} Editor instance
			 * @return {String}
			 */
			getCurrentLinePadding: function(editor) {
				return utils.getLinePadding(editor.getCurrentLine());
			},
	
			/**
			 * Normalizes content according to given preferences, e.g.
			 * replaces newlines and indentation with ones defined in
			 * `options`. If options are not provided or incomplete, 
			 * values will be taken from current user environment
			 * @param {String} text
			 * @param {Object} options
			 * @return {String}
			 */
			normalize: function(text, options) {
				options = utils.extend({
					newline: resources.getNewline(),
					indentation: resources.getVariable('indentation')
				}, options);
	
				var reIndent = /^\t+/;
				var indent = function(tabs) {
					return utils.repeatString(options.indentation, tabs.length);
				};
	
				var lines = utils.splitByLines(text);
	
				// normailze indentation if it’s not tabs
				if (options.indentation !== '\t') {
					lines = lines.map(function(line) {
						return line.replace(reIndent, indent);
					});
				}
	
				// normalize newlines
				return lines.join(options.newline);
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Helper module to work with ranges
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		function cmp(a, b, op) {
			switch (op) {
				case 'eq':
				case '==':
					return a === b;
				case 'lt':
				case '<':
					return a < b;
				case 'lte':
				case '<=':
					return a <= b;
				case 'gt':
				case '>':
					return a > b;
				case 'gte':
				case '>=':
					return a >= b;
			}
		}
		
		
		/**
		 * @type Range
		 * @constructor
		 * @param {Object} start
		 * @param {Number} len
		 */
		function Range(start, len) {
			if (typeof start === 'object' && 'start' in start) {
				// create range from object stub
				this.start = Math.min(start.start, start.end);
				this.end = Math.max(start.start, start.end);
			} else if (Array.isArray(start)) {
				this.start = start[0];
				this.end = start[1];
			} else {
				len = typeof len === 'string' ? len.length : +len;
				this.start = start;
				this.end = start + len;
			}
		}
		
		Range.prototype = {
			length: function() {
				return Math.abs(this.end - this.start);
			},
			
			/**
			 * Returns <code>true</code> if passed range is equals to current one
			 * @param {Range} range
			 * @returns {Boolean}
			 */
			equal: function(range) {
				return this.cmp(range, 'eq', 'eq');
	//			return this.start === range.start && this.end === range.end;
			},
			
			/**
			 * Shifts indexes position with passed <code>delta</code>
			 * @param {Number} delta
			 * @returns {Range} range itself
			 */
			shift: function(delta) {
				this.start += delta;
				this.end += delta;
				return this;
			},
			
			/**
			 * Check if two ranges are overlapped
			 * @param {Range} range
			 * @returns {Boolean}
			 */
			overlap: function(range) {
				return range.start <= this.end && range.end >= this.start;
			},
			
			/**
			 * Finds intersection of two ranges
			 * @param {Range} range
			 * @returns {Range} <code>null</code> if ranges does not overlap
			 */
			intersection: function(range) {
				if (this.overlap(range)) {
					var start = Math.max(range.start, this.start);
					var end = Math.min(range.end, this.end);
					return new Range(start, end - start);
				}
				
				return null;
			},
			
			/**
			 * Returns the union of the thow ranges.
			 * @param {Range} range
			 * @returns {Range} <code>null</code> if ranges are not overlapped
			 */
			union: function(range) {
				if (this.overlap(range)) {
					var start = Math.min(range.start, this.start);
					var end = Math.max(range.end, this.end);
					return new Range(start, end - start);
				}
				
				return null;
			},
			
			/**
			 * Returns a Boolean value that indicates whether a specified position 
			 * is in a given range.
			 * @param {Number} loc
			 */
			inside: function(loc) {
				return this.cmp(loc, 'lte', 'gt');
	//			return this.start <= loc && this.end > loc;
			},
			
			/**
			 * Returns a Boolean value that indicates whether a specified position 
			 * is in a given range, but not equals bounds.
			 * @param {Number} loc
			 */
			contains: function(loc) {
				return this.cmp(loc, 'lt', 'gt');
			},
			
			/**
			 * Check if current range completely includes specified one
			 * @param {Range} r
			 * @returns {Boolean} 
			 */
			include: function(r) {
				return this.cmp(r, 'lte', 'gte');
	//			return this.start <= r.start && this.end >= r.end;
			},
			
			/**
			 * Low-level comparision method
			 * @param {Number} loc
			 * @param {String} left Left comparison operator
			 * @param {String} right Right comaprison operator
			 */
			cmp: function(loc, left, right) {
				var a, b;
				if (loc instanceof Range) {
					a = loc.start;
					b = loc.end;
				} else {
					a = b = loc;
				}
				
				return cmp(this.start, a, left || '<=') && cmp(this.end, b, right || '>');
			},
			
			/**
			 * Returns substring of specified <code>str</code> for current range
			 * @param {String} str
			 * @returns {String}
			 */
			substring: function(str) {
				return this.length() > 0 
					? str.substring(this.start, this.end) 
					: '';
			},
			
			/**
			 * Creates copy of current range
			 * @returns {Range}
			 */
			clone: function() {
				return new Range(this.start, this.length());
			},
			
			/**
			 * @returns {Array}
			 */
			toArray: function() {
				return [this.start, this.end];
			},
			
			toString: function() {
				return this.valueOf();
			},
	
			valueOf: function() {
				return '{' + this.start + ', ' + this.length() + '}';
			}
		};
	
		/**
		 * Creates new range object instance
		 * @param {Object} start Range start or array with 'start' and 'end'
		 * as two first indexes or object with 'start' and 'end' properties
		 * @param {Number} len Range length or string to produce range from
		 * @returns {Range}
		 */
		module.exports = function(start, len) {
			if (typeof start == 'undefined' || start === null)
				return null;
				
			if (start instanceof Range)
				return start;
			
			if (typeof start == 'object' && 'start' in start && 'end' in start) {
				len = start.end - start.start;
				start = start.start;
			}
				
			return new Range(start, len);
		};
	
		module.exports.create = module.exports;
	
		module.exports.isRange = function(val) {
			return val instanceof Range;
		};
	
		/**
		 * <code>Range</code> object factory, the same as <code>this.create()</code>
		 * but last argument represents end of range, not length
		 * @returns {Range}
		 */
		module.exports.create2 = function(start, end) {
			if (typeof start === 'number' && typeof end === 'number') {
				end -= start;
			}
			
			return this.create(start, end);
		};
	
		/**
		 * Helper function that sorts ranges in order as they
		 * appear in text
		 * @param  {Array} ranges
		 * @return {Array}
		 */
		module.exports.sort = function(ranges, reverse) {
			ranges = ranges.sort(function(a, b) {
				if (a.start === b.start) {
					return b.end - a.end;
				}
	
				return a.start - b.start;
			});
	
			reverse && ranges.reverse();
			return ranges;
		};
	
		return module.exports;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Encodes/decodes image under cursor to/from base64
	 * @param {IEmmetEditor} editor
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var file = __webpack_require__(25);
		var base64 = __webpack_require__(93);
		var actionUtils = __webpack_require__(33);
		var editorUtils = __webpack_require__(34);
		
		/**
		 * Test if <code>text</code> starts with <code>token</code> at <code>pos</code>
		 * position. If <code>pos</code> is omitted, search from beginning of text 
		 * @param {String} token Token to test
		 * @param {String} text Where to search
		 * @param {Number} pos Position where to start search
		 * @return {Boolean}
		 * @since 0.65
		 */
		function startsWith(token, text, pos) {
			pos = pos || 0;
			return text.charAt(pos) == token.charAt(0) && text.substr(pos, token.length) == token;
		}
		
		/**
		 * Encodes image to base64
		 * 
		 * @param {IEmmetEditor} editor
		 * @param {String} imgPath Path to image
		 * @param {Number} pos Caret position where image is located in the editor
		 * @return {Boolean}
		 */
		function encodeToBase64(editor, imgPath, pos) {
			var editorFile = editor.getFilePath();
			var defaultMimeType = 'application/octet-stream';
				
			if (editorFile === null) {
				throw "You should save your file before using this action";
			}
			
			// locate real image path
			var realImgPath = file.locateFile(editorFile, imgPath);
			if (realImgPath === null) {
				throw "Can't find " + imgPath + ' file';
			}
			
			file.read(realImgPath, function(err, content) {
				if (err) {
					throw 'Unable to read ' + realImgPath + ': ' + err;
				}
				
				var b64 = base64.encode(String(content));
				if (!b64) {
					throw "Can't encode file content to base64";
				}
				
				b64 = 'data:' + (actionUtils.mimeTypes[String(file.getExt(realImgPath))] || defaultMimeType) +
					';base64,' + b64;
					
				editor.replaceContent('$0' + b64, pos, pos + imgPath.length);
			});
			
			return true;
		}
	
		/**
		 * Decodes base64 string back to file.
		 * @param {IEmmetEditor} editor
		 * @param {String} data Base64-encoded file content
		 * @param {Number} pos Caret position where image is located in the editor
		 */
		function decodeFromBase64(editor, data, pos) {
			// ask user to enter path to file
			var filePath = String(editor.prompt('Enter path to file (absolute or relative)'));
			if (!filePath)
				return false;
				
			var absPath = file.createPath(editor.getFilePath(), filePath);
			if (!absPath) {
				throw "Can't save file";
			}
			
			file.save(absPath, base64.decode( data.replace(/^data\:.+?;.+?,/, '') ));
			editor.replaceContent('$0' + filePath, pos, pos + data.length);
			return true;
		}
	
		return {
			/**
			 * Action to encode or decode file to data:url
			 * @param  {IEmmetEditor} editor  Editor instance
			 * @param  {String} syntax  Current document syntax
			 * @param  {String} profile Output profile name
			 * @return {Boolean}
			 */
			encodeDecodeDataUrlAction: function(editor) {
				var data = String(editor.getSelection());
				var caretPos = editor.getCaretPos();
				var info = editorUtils.outputInfo(editor);
					
				if (!data) {
					// no selection, try to find image bounds from current caret position
					var text = info.content, m;
					while (caretPos-- >= 0) {
						if (startsWith('src=', text, caretPos)) { // found <img src="">
							if ((m = text.substr(caretPos).match(/^(src=(["'])?)([^'"<>\s]+)\1?/))) {
								data = m[3];
								caretPos += m[1].length;
							}
							break;
						} else if (startsWith('url(', text, caretPos)) { // found CSS url() pattern
							if ((m = text.substr(caretPos).match(/^(url\((['"])?)([^'"\)\s]+)\1?/))) {
								data = m[3];
								caretPos += m[1].length;
							}
							break;
						}
					}
				}
				
				if (data) {
					if (startsWith('data:', data)) {
						return decodeFromBase64(editor, data, caretPos);
					} else {
						return encodeToBase64(editor, data, caretPos);
					}
				}
				
				return false;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Move between next/prev edit points. 'Edit points' are places between tags 
	 * and quotes of empty attributes in html
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		/**
		 * Search for new caret insertion point
		 * @param {IEmmetEditor} editor Editor instance
		 * @param {Number} inc Search increment: -1 — search left, 1 — search right
		 * @param {Number} offset Initial offset relative to current caret position
		 * @return {Number} Returns -1 if insertion point wasn't found
		 */
		function findNewEditPoint(editor, inc, offset) {
			inc = inc || 1;
			offset = offset || 0;
			
			var curPoint = editor.getCaretPos() + offset;
			var content = String(editor.getContent());
			var maxLen = content.length;
			var nextPoint = -1;
			var reEmptyLine = /^\s+$/;
			
			function getLine(ix) {
				var start = ix;
				while (start >= 0) {
					var c = content.charAt(start);
					if (c == '\n' || c == '\r')
						break;
					start--;
				}
				
				return content.substring(start, ix);
			}
				
			while (curPoint <= maxLen && curPoint >= 0) {
				curPoint += inc;
				var curChar = content.charAt(curPoint);
				var nextChar = content.charAt(curPoint + 1);
				var prevChar = content.charAt(curPoint - 1);
					
				switch (curChar) {
					case '"':
					case '\'':
						if (nextChar == curChar && prevChar == '=') {
							// empty attribute
							nextPoint = curPoint + 1;
						}
						break;
					case '>':
						if (nextChar == '<') {
							// between tags
							nextPoint = curPoint + 1;
						}
						break;
					case '\n':
					case '\r':
						// empty line
						if (reEmptyLine.test(getLine(curPoint - 1))) {
							nextPoint = curPoint;
						}
						break;
				}
				
				if (nextPoint != -1)
					break;
			}
			
			return nextPoint;
		}
		
		return {
			/**
			 * Move to previous edit point
			 * @param  {IEmmetEditor} editor  Editor instance
			 * @param  {String} syntax  Current document syntax
			 * @param  {String} profile Output profile name
			 * @return {Boolean}
			 */
			previousEditPointAction: function(editor, syntax, profile) {
				var curPos = editor.getCaretPos();
				var newPoint = findNewEditPoint(editor, -1);
					
				if (newPoint == curPos)
					// we're still in the same point, try searching from the other place
					newPoint = findNewEditPoint(editor, -1, -2);
				
				if (newPoint != -1) {
					editor.setCaretPos(newPoint);
					return true;
				}
				
				return false;
			},
	
			/**
			 * Move to next edit point
			 * @param  {IEmmetEditor} editor  Editor instance
			 * @param  {String} syntax  Current document syntax
			 * @param  {String} profile Output profile name
			 * @return {Boolean}
			 */
			nextEditPointAction: function(editor, syntax, profile) {
				var newPoint = findNewEditPoint(editor, 1);
				if (newPoint != -1) {
					editor.setCaretPos(newPoint);
					return true;
				}
				
				return false;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Evaluates simple math expression under caret
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var actionUtils = __webpack_require__(33);
		var utils = __webpack_require__(22);
		var math = __webpack_require__(96);
		var range = __webpack_require__(36);
	
		return {
			/**
			 * Evaluates math expression under the caret
			 * @param  {IEmmetEditor} editor
			 * @return {Boolean}
			 */
			evaluateMathAction: function(editor) {
				var content = editor.getContent();
				var chars = '.+-*/\\';
				
				/** @type Range */
				var sel = range(editor.getSelectionRange());
				if (!sel.length()) {
					sel = actionUtils.findExpressionBounds(editor, function(ch) {
						return utils.isNumeric(ch) || chars.indexOf(ch) != -1;
					});
				}
				
				if (sel && sel.length()) {
					var expr = sel.substring(content);
					
					// replace integral division: 11\2 => Math.round(11/2) 
					expr = expr.replace(/([\d\.\-]+)\\([\d\.\-]+)/g, 'round($1/$2)');
					
					try {
						var result = utils.prettifyNumber(math.evaluate(expr));
						editor.replaceContent(result, sel.start, sel.end);
						editor.setCaretPos(sel.start + result.length);
						return true;
					} catch (e) {}
				}
				
				return false;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 'Expand abbreviation' editor action: extracts abbreviation from current caret 
	 * position and replaces it with formatted output. 
	 * <br><br>
	 * This behavior can be overridden with custom handlers which can perform 
	 * different actions when 'Expand Abbreviation' action is called.
	 * For example, a CSS gradient handler that produces vendor-prefixed gradient
	 * definitions registers its own expand abbreviation handler.  
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var handlerList = __webpack_require__(63);
		var range = __webpack_require__(36);
		var prefs = __webpack_require__(26);
		var utils = __webpack_require__(22);
		var editorUtils = __webpack_require__(34);
		var actionUtils = __webpack_require__(33);
		var cssGradient = __webpack_require__(89);
		var parser = __webpack_require__(24);
	
		/**
		 * Search for abbreviation in editor from current caret position
		 * @param {IEmmetEditor} editor Editor instance
		 * @return {String}
		 */
		function findAbbreviation(editor) {
			var r = range(editor.getSelectionRange());
			var content = String(editor.getContent());
			if (r.length()) {
				// abbreviation is selected by user
				return r.substring(content);
			}
			
			// search for new abbreviation from current caret position
			var curLine = editor.getCurrentLineRange();
			return actionUtils.extractAbbreviation(content.substring(curLine.start, r.start));
		}
	
		/**
		 * @type HandlerList List of registered handlers
		 */
		var handlers = handlerList.create();
	
		// XXX setup default expand handlers
		
		/**
		 * Extracts abbreviation from current caret 
		 * position and replaces it with formatted output 
		 * @param {IEmmetEditor} editor Editor instance
		 * @param {String} syntax Syntax type (html, css, etc.)
		 * @param {String} profile Output profile name (html, xml, xhtml)
		 * @return {Boolean} Returns <code>true</code> if abbreviation was expanded 
		 * successfully
		 */
		handlers.add(function(editor, syntax, profile) {
			var caretPos = editor.getSelectionRange().end;
			var abbr = findAbbreviation(editor);
				
			if (abbr) {
				var content = parser.expand(abbr, {
					syntax: syntax, 
					profile: profile, 
					contextNode: actionUtils.captureContext(editor)
				});
	
				if (content) {
					var replaceFrom = caretPos - abbr.length;
					var replaceTo = caretPos;
	
					// a special case for CSS: if editor already contains
					// semicolon right after current caret position — replace it too
					var cssSyntaxes = prefs.getArray('css.syntaxes');
					if (cssSyntaxes && ~cssSyntaxes.indexOf(syntax)) {
						var curContent = editor.getContent();
						if (curContent.charAt(caretPos) == ';' && content.charAt(content.length - 1) == ';') {
							replaceTo++;
						}
					}
	
					editor.replaceContent(content, replaceFrom, replaceTo);
					return true;
				}
			}
			
			return false;
		}, {order: -1});
		handlers.add(cssGradient.expandAbbreviationHandler.bind(cssGradient));
			
		return {
			/**
			 * The actual “Expand Abbreviation“ action routine
			 * @param  {IEmmetEditor} editor  Editor instance
			 * @param  {String} syntax  Current document syntax
			 * @param  {String} profile Output profile name
			 * @return {Boolean}
			 */
			expandAbbreviationAction: function(editor, syntax, profile) {
				var args = utils.toArray(arguments);
				
				// normalize incoming arguments
				var info = editorUtils.outputInfo(editor, syntax, profile);
				args[1] = info.syntax;
				args[2] = info.profile;
				
				return handlers.exec(false, args);
			},
	
			/**
			 * A special case of “Expand Abbreviation“ action, invoked by Tab key.
			 * In this case if abbreviation wasn’t expanded successfully or there’s a selecetion, 
			 * the current line/selection will be indented. 
			 * @param  {IEmmetEditor} editor  Editor instance
			 * @param  {String} syntax  Current document syntax
			 * @param  {String} profile Output profile name
			 * @return {Boolean}
			 */
			expandAbbreviationWithTabAction: function(editor, syntax, profile) {
				var sel = editor.getSelection();
				var indent = '\t';
	
				// if something is selected in editor,
				// we should indent the selected content
				if (sel) {
					var selRange = range(editor.getSelectionRange());
					var content = utils.padString(sel, indent);
					
					editor.replaceContent(indent + '${0}', editor.getCaretPos());
					var replaceRange = range(editor.getCaretPos(), selRange.length());
					editor.replaceContent(content, replaceRange.start, replaceRange.end, true);
					editor.createSelection(replaceRange.start, replaceRange.start + content.length);
					return true;
				}
		
				// nothing selected, try to expand
				if (!this.expandAbbreviationAction(editor, syntax, profile)) {
					editor.replaceContent(indent, editor.getCaretPos());
				}
				
				return true;
			},
	
			
			_defaultHandler: function(editor, syntax, profile) {
				var caretPos = editor.getSelectionRange().end;
				var abbr = this.findAbbreviation(editor);
					
				if (abbr) {
					var ctx = actionUtils.captureContext(editor);
					var content = parser.expand(abbr, syntax, profile, ctx);
					if (content) {
						editor.replaceContent(content, caretPos - abbr.length, caretPos);
						return true;
					}
				}
				
				return false;
			},
	
			/**
			 * Adds custom expand abbreviation handler. The passed function should 
			 * return <code>true</code> if it was performed successfully, 
			 * <code>false</code> otherwise.
			 * 
			 * Added handlers will be called when 'Expand Abbreviation' is called
			 * in order they were added
			 * @memberOf expandAbbreviation
			 * @param {Function} fn
			 * @param {Object} options
			 */
			addHandler: function(fn, options) {
				handlers.add(fn, options);
			},
			
			/**
			 * Removes registered handler
			 * @returns
			 */
			removeHandler: function(fn) {
				handlers.remove(fn);
			},
			
			findAbbreviation: findAbbreviation
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Increment/decrement number under cursor
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var actionUtils = __webpack_require__(33);
	
		/**
		 * Returns length of integer part of number
		 * @param {String} num
		 */
		function intLength(num) {
			num = num.replace(/^\-/, '');
			if (~num.indexOf('.')) {
				return num.split('.')[0].length;
			}
			
			return num.length;
		}
	
		return {
			increment01Action: function(editor) {
				return this.incrementNumber(editor, .1);
			},
	
			increment1Action: function(editor) {
				return this.incrementNumber(editor, 1);
			},
	
			increment10Action: function(editor) {
				return this.incrementNumber(editor, 10);
			},
	
			decrement01Action: function(editor) {
				return this.incrementNumber(editor, -.1);
			},
	
			decrement1Action: function(editor) {
				return this.incrementNumber(editor, -1);
			},
	
			decrement10Action: function(editor) {
				return this.incrementNumber(editor, -10);
			},
	
			/**
			 * Default method to increment/decrement number under
			 * caret with given step
			 * @param  {IEmmetEditor} editor
			 * @param  {Number} step
			 * @return {Boolean}
			 */
			incrementNumber: function(editor, step) {
				var hasSign = false;
				var hasDecimal = false;
					
				var r = actionUtils.findExpressionBounds(editor, function(ch, pos, content) {
					if (utils.isNumeric(ch))
						return true;
					if (ch == '.') {
						// make sure that next character is numeric too
						if (!utils.isNumeric(content.charAt(pos + 1)))
							return false;
						
						return hasDecimal ? false : hasDecimal = true;
					}
					if (ch == '-')
						return hasSign ? false : hasSign = true;
						
					return false;
				});
					
				if (r && r.length()) {
					var strNum = r.substring(String(editor.getContent()));
					var num = parseFloat(strNum);
					if (!isNaN(num)) {
						num = utils.prettifyNumber(num + step);
						
						// do we have zero-padded number?
						if (/^(\-?)0+[1-9]/.test(strNum)) {
							var minus = '';
							if (RegExp.$1) {
								minus = '-';
								num = num.substring(1);
							}
								
							var parts = num.split('.');
							parts[0] = utils.zeroPadString(parts[0], intLength(strNum));
							num = minus + parts.join('.');
						}
						
						editor.replaceContent(num, r.start, r.end);
						editor.createSelection(r.start, r.start + num.length);
						return true;
					}
				}
				
				return false;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Actions to insert line breaks. Some simple editors (like browser's 
	 * &lt;textarea&gt;, for example) do not provide such simple things
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var prefs = __webpack_require__(26);
		var utils = __webpack_require__(22);
		var resources = __webpack_require__(27);
		var htmlMatcher = __webpack_require__(32);
		var editorUtils = __webpack_require__(34);
	
		var xmlSyntaxes = ['html', 'xml', 'xsl'];
	
		// setup default preferences
		prefs.define('css.closeBraceIndentation', '\n',
				'Indentation before closing brace of CSS rule. Some users prefere ' 
				+ 'indented closing brace of CSS rule for better readability. '
				+ 'This preference’s value will be automatically inserted before '
				+ 'closing brace when user adds newline in newly created CSS rule '
				+ '(e.g. when “Insert formatted linebreak” action will be performed ' 
				+ 'in CSS file). If you’re such user, you may want to write put a value ' 
				+ 'like <code>\\n\\t</code> in this preference.');
	
		return {
			/**
			 * Inserts newline character with proper indentation. This action is used in
			 * editors that doesn't have indentation control (like textarea element) to 
			 * provide proper indentation for inserted newlines
			 * @param {IEmmetEditor} editor Editor instance
			 */
			insertLineBreakAction: function(editor) {
				if (!this.insertLineBreakOnlyAction(editor)) {
					var curPadding = editorUtils.getCurrentLinePadding(editor);
					var content = String(editor.getContent());
					var caretPos = editor.getCaretPos();
					var len = content.length;
					var nl = '\n';
						
					// check out next line padding
					var lineRange = editor.getCurrentLineRange();
					var nextPadding = '';
						
					for (var i = lineRange.end + 1, ch; i < len; i++) {
						ch = content.charAt(i);
						if (ch == ' ' || ch == '\t')
							nextPadding += ch;
						else
							break;
					}
					
					if (nextPadding.length > curPadding.length) {
						editor.replaceContent(nl + nextPadding, caretPos, caretPos, true);
					} else {
						editor.replaceContent(nl, caretPos);
					}
				}
				
				return true;
			},
	
			/**
			 * Inserts newline character with proper indentation in specific positions only.
			 * @param {IEmmetEditor} editor
			 * @return {Boolean} Returns <code>true</code> if line break was inserted 
			 */
			insertLineBreakOnlyAction: function(editor) {
				var info = editorUtils.outputInfo(editor);
				var caretPos = editor.getCaretPos();
				var nl = '\n';
				var pad = '\t';
				
				if (~xmlSyntaxes.indexOf(info.syntax)) {
					// let's see if we're breaking newly created tag
					var tag = htmlMatcher.tag(info.content, caretPos);
					if (tag && !tag.innerRange.length()) {
						editor.replaceContent(nl + pad + utils.getCaretPlaceholder() + nl, caretPos);
						return true;
					}
				} else if (info.syntax == 'css') {
					/** @type String */
					var content = info.content;
					if (caretPos && content.charAt(caretPos - 1) == '{') {
						var append = prefs.get('css.closeBraceIndentation');
						
						var hasCloseBrace = content.charAt(caretPos) == '}';
						if (!hasCloseBrace) {
							// do we really need special formatting here?
							// check if this is really a newly created rule,
							// look ahead for a closing brace
							for (var i = caretPos, il = content.length, ch; i < il; i++) {
								ch = content.charAt(i);
								if (ch == '{') {
									// ok, this is a new rule without closing brace
									break;
								}
								
								if (ch == '}') {
									// not a new rule, just add indentation
									append = '';
									hasCloseBrace = true;
									break;
								}
							}
						}
						
						if (!hasCloseBrace) {
							append += '}';
						}
						
						// defining rule set
						var insValue = nl + pad + utils.getCaretPlaceholder() + append;
						editor.replaceContent(insValue, caretPos);
						return true;
					}
				}
					
				return false;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * HTML pair matching (balancing) actions
	 * @constructor
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var htmlMatcher = __webpack_require__(32);
		var utils = __webpack_require__(22);
		var editorUtils = __webpack_require__(34);
		var actionUtils = __webpack_require__(33);
		var range = __webpack_require__(36);
		var cssEditTree = __webpack_require__(71);
		var cssSections = __webpack_require__(95);
		var lastMatch = null;
	
		function last(arr) {
			return arr[arr.length - 1];
		}
	
		function balanceHTML(editor, direction) {
			var info = editorUtils.outputInfo(editor);
			var content = info.content;
			var sel = range(editor.getSelectionRange());
			
			// validate previous match
			if (lastMatch && !lastMatch.range.equal(sel)) {
				lastMatch = null;
			}
			
			if (lastMatch && sel.length()) {
				if (direction == 'in') {
					// user has previously selected tag and wants to move inward
					if (lastMatch.type == 'tag' && !lastMatch.close) {
						// unary tag was selected, can't move inward
						return false;
					} else {
						if (lastMatch.range.equal(lastMatch.outerRange)) {
							lastMatch.range = lastMatch.innerRange;
						} else {
							var narrowed = utils.narrowToNonSpace(content, lastMatch.innerRange);
							lastMatch = htmlMatcher.find(content, narrowed.start + 1);
							if (lastMatch && lastMatch.range.equal(sel) && lastMatch.outerRange.equal(sel)) {
								lastMatch.range = lastMatch.innerRange;
							}
						}
					}
				} else {
					if (
						!lastMatch.innerRange.equal(lastMatch.outerRange) 
						&& lastMatch.range.equal(lastMatch.innerRange) 
						&& sel.equal(lastMatch.range)) {
						lastMatch.range = lastMatch.outerRange;
					} else {
						lastMatch = htmlMatcher.find(content, sel.start);
						if (lastMatch && lastMatch.range.equal(sel) && lastMatch.innerRange.equal(sel)) {
							lastMatch.range = lastMatch.outerRange;
						}
					}
				}
			} else {
				lastMatch = htmlMatcher.find(content, sel.start);
			}
	
			if (lastMatch) {
				if (lastMatch.innerRange.equal(sel)) {
					lastMatch.range = lastMatch.outerRange;
				}
	
				if (!lastMatch.range.equal(sel)) {
					editor.createSelection(lastMatch.range.start, lastMatch.range.end);
					return true;
				}
			}
			
			lastMatch = null;
			return false;
		}
	
		function rangesForCSSRule(rule, pos) {
			// find all possible ranges
			var ranges = [rule.range(true)];
	
			// braces content
			ranges.push(rule.valueRange(true));
	
			// find nested sections
			var nestedSections = cssSections.nestedSectionsInRule(rule);
	
			// real content, e.g. from first property name to
			// last property value
			var items = rule.list();
			if (items.length || nestedSections.length) {
				var start = Number.POSITIVE_INFINITY, end = -1;
				if (items.length) {
					start = items[0].namePosition(true);
					end = last(items).range(true).end;
				}
	
				if (nestedSections.length) {
					if (nestedSections[0].start < start) {
						start = nestedSections[0].start;
					}
	
					if (last(nestedSections).end > end) {
						end = last(nestedSections).end;
					}
				}
	
				ranges.push(range.create2(start, end));
			}
	
			ranges = ranges.concat(nestedSections);
	
			var prop = cssEditTree.propertyFromPosition(rule, pos) || items[0];
			if (prop) {
				ranges.push(prop.range(true));
				var valueRange = prop.valueRange(true);
				if (!prop.end()) {
					valueRange._unterminated = true;
				}
				ranges.push(valueRange);
			}
	
			return ranges;
		}
	
		/**
		 * Returns all possible selection ranges for given caret position
		 * @param  {String} content CSS content
		 * @param  {Number} pos     Caret position(where to start searching)
		 * @return {Array}
		 */
		function getCSSRanges(content, pos) {
			var rule;
			if (typeof content === 'string') {
				var ruleRange = cssSections.matchEnclosingRule(content, pos);
				if (ruleRange) {
					rule = cssEditTree.parse(ruleRange.substring(content), {
						offset: ruleRange.start
					});
				}
			} else {
				// passed parsed CSS rule
				rule = content;
			}
	
			if (!rule) {
				return null;
			}
	
			// find all possible ranges
			var ranges = rangesForCSSRule(rule, pos);
	
			// remove empty ranges
			ranges = ranges.filter(function(item) {
				return !!item.length;
			});
	
			return utils.unique(ranges, function(item) {
				return item.valueOf();
			});
		}
	
		function balanceCSS(editor, direction) {
			var info = editorUtils.outputInfo(editor);
			var content = info.content;
			var sel = range(editor.getSelectionRange());
	
			var ranges = getCSSRanges(info.content, sel.start);
			if (!ranges && sel.length()) {
				// possible reason: user has already selected
				// CSS rule from last match
				try {
					var rule = cssEditTree.parse(sel.substring(info.content), {
						offset: sel.start
					});
					ranges = getCSSRanges(rule, sel.start);
				} catch(e) {}
			}
	
			if (!ranges) {
				return false;
			}
	
			ranges = range.sort(ranges, true);
	
			// edge case: find match that equals current selection,
			// in case if user moves inward after selecting full CSS rule
			var bestMatch = utils.find(ranges, function(r) {
				return r.equal(sel);
			});
	
			if (!bestMatch) {
				bestMatch = utils.find(ranges, function(r) {
					// Check for edge case: caret right after CSS value
					// but it doesn‘t contains terminating semicolon.
					// In this case we have to check full value range
					return r._unterminated ? r.include(sel.start) : r.inside(sel.start);
				});
			}
	
			if (!bestMatch) {
				return false;
			}
	
			// if best match equals to current selection, move index
			// one position up or down, depending on direction
			var bestMatchIx = ranges.indexOf(bestMatch);
			if (bestMatch.equal(sel)) {
				bestMatchIx += direction == 'out' ? 1 : -1;
			}
	
			if (bestMatchIx < 0 || bestMatchIx >= ranges.length) {
				if (bestMatchIx >= ranges.length && direction == 'out') {
					pos = bestMatch.start - 1;
	
					var outerRanges = getCSSRanges(content, pos);
					if (outerRanges) {
						bestMatch = last(outerRanges.filter(function(r) {
							return r.inside(pos);
						}));
					}
				} else if (bestMatchIx < 0 && direction == 'in') {
					bestMatch = null;
				} else {
					bestMatch = null;
				}
			} else {
				bestMatch = ranges[bestMatchIx];	
			}
	
			if (bestMatch) {
				editor.createSelection(bestMatch.start, bestMatch.end);
				return true;
			}
			
			return false;
		}
		
		return {
			/**
			 * Find and select HTML tag pair
			 * @param {IEmmetEditor} editor Editor instance
			 * @param {String} direction Direction of pair matching: 'in' or 'out'. 
			 * Default is 'out'
			 */
			balance: function(editor, direction) {
				direction = String((direction || 'out').toLowerCase());
				var info = editorUtils.outputInfo(editor);
				if (actionUtils.isSupportedCSS(info.syntax)) {
					return balanceCSS(editor, direction);
				}
				
				return balanceHTML(editor, direction);
			},
	
			balanceInwardAction: function(editor) {
				return this.balance(editor, 'in');
			},
	
			balanceOutwardAction: function(editor) {
				return this.balance(editor, 'out');	
			},
	
			/**
			 * Moves caret to matching opening or closing tag
			 * @param {IEmmetEditor} editor
			 */
			goToMatchingPairAction: function(editor) {
				var content = String(editor.getContent());
				var caretPos = editor.getCaretPos();
				
				if (content.charAt(caretPos) == '<') 
					// looks like caret is outside of tag pair  
					caretPos++;
					
				var tag = htmlMatcher.tag(content, caretPos);
				if (tag && tag.close) { // exclude unary tags
					if (tag.open.range.inside(caretPos)) {
						editor.setCaretPos(tag.close.range.start);
					} else {
						editor.setCaretPos(tag.open.range.start);
					}
					
					return true;
				}
				
				return false;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Merges selected lines or lines between XHTML tag pairs
	 * @param {Function} require
	 * @param {Underscore} _
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var htmlMatcher = __webpack_require__(32);
		var utils = __webpack_require__(22);
		var editorUtils = __webpack_require__(34);
		var range = __webpack_require__(36);
	
		return {
			mergeLinesAction: function(editor) {
				var info = editorUtils.outputInfo(editor);
			
				var selection = range(editor.getSelectionRange());
				if (!selection.length()) {
					// find matching tag
					var pair = htmlMatcher.find(info.content, editor.getCaretPos());
					if (pair) {
						selection = pair.outerRange;
					}
				}
				
				if (selection.length()) {
					// got range, merge lines
					var text =  selection.substring(info.content);
					var lines = utils.splitByLines(text);
					
					for (var i = 1; i < lines.length; i++) {
						lines[i] = lines[i].replace(/^\s+/, '');
					}
					
					text = lines.join('').replace(/\s{2,}/, ' ');
					var textLen = text.length;
					text = utils.escapeText(text);
					editor.replaceContent(text, selection.start, selection.end);
					editor.createSelection(selection.start, selection.start + textLen);
					
					return true;
				}
				
				return false;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/**
	 * Reflect CSS value: takes rule's value under caret and pastes it for the same 
	 * rules with vendor prefixes
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var handlerList = __webpack_require__(63);
		var prefs = __webpack_require__(26);
		var cssResolver = __webpack_require__(66);
		var cssEditTree = __webpack_require__(71);
		var utils = __webpack_require__(22);
		var actionUtils = __webpack_require__(33);
		var editorUtils = __webpack_require__(34);
		var cssGradient = __webpack_require__(89);
	
		prefs.define('css.reflect.oldIEOpacity', false, 'Support IE6/7/8 opacity notation, e.g. <code>filter:alpha(opacity=...)</code>.\
			Note that CSS3 and SVG also provides <code>filter</code> property so this option is disabled by default.')
	
		/**
		 * @type HandlerList List of registered handlers
		 */
		var handlers = handlerList.create();
		
		function doCSSReflection(editor) {
			var outputInfo = editorUtils.outputInfo(editor);
			var caretPos = editor.getCaretPos();
			
			var cssRule = cssEditTree.parseFromPosition(outputInfo.content, caretPos);
			if (!cssRule) return;
			
			var property = cssRule.itemFromPosition(caretPos, true);
			// no property under cursor, nothing to reflect
			if (!property) return;
			
			var oldRule = cssRule.source;
			var offset = cssRule.options.offset;
			var caretDelta = caretPos - offset - property.range().start;
			
			handlers.exec(false, [property]);
			
			if (oldRule !== cssRule.source) {
				return {
					data:  cssRule.source,
					start: offset,
					end:   offset + oldRule.length,
					caret: offset + property.range().start + caretDelta
				};
			}
		}
		
		/**
		 * Returns regexp that should match reflected CSS property names
		 * @param {String} name Current CSS property name
		 * @return {RegExp}
		 */
		function getReflectedCSSName(name) {
			name = cssEditTree.baseName(name);
			var vendorPrefix = '^(?:\\-\\w+\\-)?', m;
			
			if ((name == 'opacity' || name == 'filter') && prefs.get('css.reflect.oldIEOpacity')) {
				return new RegExp(vendorPrefix + '(?:opacity|filter)$');
			} else if ((m = name.match(/^border-radius-(top|bottom)(left|right)/))) {
				// Mozilla-style border radius
				return new RegExp(vendorPrefix + '(?:' + name + '|border-' + m[1] + '-' + m[2] + '-radius)$');
			} else if ((m = name.match(/^border-(top|bottom)-(left|right)-radius/))) { 
				return new RegExp(vendorPrefix + '(?:' + name + '|border-radius-' + m[1] + m[2] + ')$');
			}
			
			return new RegExp(vendorPrefix + name + '$');
		}
	
		/**
		 * Reflects inner CSS properites in given value
		 * agains name‘s vendor prefix. In other words, it tries
		 * to modify `transform 0.2s linear` value for `-webkit-transition`
		 * property
		 * @param  {String} name  Reciever CSS property name
		 * @param  {String} value New property value
		 * @return {String}
		 */
		function reflectValueParts(name, value) {
			// detects and updates vendor-specific properties in value,
			// e.g. -webkit-transition: -webkit-transform
			
			var reVendor = /^\-(\w+)\-/;
			var propPrefix = reVendor.test(name) ? RegExp.$1.toLowerCase() : '';
			var parts = cssEditTree.findParts(value);
	
			parts.reverse();
			parts.forEach(function(part) {
				var partValue = part.substring(value).replace(reVendor, '');
				var prefixes = cssResolver.vendorPrefixes(partValue);
				if (prefixes) {
					// if prefixes are not null then given value can
					// be resolved against Can I Use database and may or
					// may not contain prefixed variant
					if (propPrefix && ~prefixes.indexOf(propPrefix)) {
						partValue = '-' + propPrefix + '-' + partValue;
					}
	
					value = utils.replaceSubstring(value, partValue, part);
				}
			});
	
			return value;
		}
		
		/**
		 * Reflects value from <code>donor</code> into <code>receiver</code>
		 * @param {CSSProperty} donor Donor CSS property from which value should
		 * be reflected
		 * @param {CSSProperty} receiver Property that should receive reflected 
		 * value from donor
		 */
		function reflectValue(donor, receiver) {
			var value = getReflectedValue(donor.name(), donor.value(), 
					receiver.name(), receiver.value());
			
			value = reflectValueParts(receiver.name(), value);
			receiver.value(value);
		}
		
		/**
		 * Returns value that should be reflected for <code>refName</code> CSS property
		 * from <code>curName</code> property. This function is used for special cases,
		 * when the same result must be achieved with different properties for different
		 * browsers. For example: opаcity:0.5; → filter:alpha(opacity=50);<br><br>
		 * 
		 * This function does value conversion between different CSS properties
		 * 
		 * @param {String} curName Current CSS property name
		 * @param {String} curValue Current CSS property value
		 * @param {String} refName Receiver CSS property's name 
		 * @param {String} refValue Receiver CSS property's value
		 * @return {String} New value for receiver property
		 */
		function getReflectedValue(curName, curValue, refName, refValue) {
			curName = cssEditTree.baseName(curName);
			refName = cssEditTree.baseName(refName);
			
			if (curName == 'opacity' && refName == 'filter') {
				return refValue.replace(/opacity=[^)]*/i, 'opacity=' + Math.floor(parseFloat(curValue) * 100));
			} else if (curName == 'filter' && refName == 'opacity') {
				var m = curValue.match(/opacity=([^)]*)/i);
				return m ? utils.prettifyNumber(parseInt(m[1], 10) / 100) : refValue;
			}
			
			return curValue;
		}
		
		module = module || {};
		module.exports = {
			reflectCSSValueAction: function(editor) {
				if (editor.getSyntax() != 'css') {
					return false;
				}
	
				return actionUtils.compoundUpdate(editor, doCSSReflection(editor));
			},
	
			_defaultHandler: function(property) {
				var reName = getReflectedCSSName(property.name());
				property.parent.list().forEach(function(p) {
					if (reName.test(p.name())) {
						reflectValue(property, p);
					}
				});
			},
	
			/**
			 * Adds custom reflect handler. The passed function will receive matched
			 * CSS property (as <code>CSSEditElement</code> object) and should
			 * return <code>true</code> if it was performed successfully (handled 
			 * reflection), <code>false</code> otherwise.
			 * @param {Function} fn
			 * @param {Object} options
			 */
			addHandler: function(fn, options) {
				handlers.add(fn, options);
			},
			
			/**
			 * Removes registered handler
			 * @returns
			 */
			removeHandler: function(fn) {
				handlers.remove(fn);
			}
		};
	
		// XXX add default handlers
		handlers.add(module.exports._defaultHandler.bind(module.exports), {order: -1});
		handlers.add(cssGradient.reflectValueHandler.bind(cssGradient));
	
		return module.exports;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105)(module)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Gracefully removes tag under cursor
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var editorUtils = __webpack_require__(34);
		var htmlMatcher = __webpack_require__(32);
	
		return {
			removeTagAction: function(editor) {
				var info = editorUtils.outputInfo(editor);
				
				// search for tag
				var tag = htmlMatcher.tag(info.content, editor.getCaretPos());
				if (tag) {
					if (!tag.close) {
						// simply remove unary tag
						editor.replaceContent(utils.getCaretPlaceholder(), tag.range.start, tag.range.end);
					} else {
						// remove tag and its newlines
						/** @type Range */
						var tagContentRange = utils.narrowToNonSpace(info.content, tag.innerRange);
						/** @type Range */
						var startLineBounds = utils.findNewlineBounds(info.content, tagContentRange.start);
						var startLinePad = utils.getLinePadding(startLineBounds.substring(info.content));
						var tagContent = tagContentRange.substring(info.content);
						
						tagContent = utils.unindentString(tagContent, startLinePad);
						editor.replaceContent(utils.getCaretPlaceholder() + utils.escapeText(tagContent), tag.outerRange.start, tag.outerRange.end);
					}
					
					return true;
				}
				
				return false;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Actions that use stream parsers and tokenizers for traversing:
	 * -- Search for next/previous items in HTML
	 * -- Search for next/previous items in CSS
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var range = __webpack_require__(36);
		var utils = __webpack_require__(22);
		var editorUtils = __webpack_require__(34);
		var actionUtils = __webpack_require__(33);
		var stringStream = __webpack_require__(56);
		var xmlParser = __webpack_require__(88);
		var cssEditTree = __webpack_require__(71);
		var cssSections = __webpack_require__(95);
	
		var startTag = /^<([\w\:\-]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
	
		/**
		 * Generic function for searching for items to select
		 * @param {IEmmetEditor} editor
		 * @param {Boolean} isBackward Search backward (search forward otherwise)
		 * @param {Function} extractFn Function that extracts item content
		 * @param {Function} rangeFn Function that search for next token range
		 */
		function findItem(editor, isBackward, extractFn, rangeFn) {
			var content = editorUtils.outputInfo(editor).content;
			
			var contentLength = content.length;
			var itemRange, rng;
			/** @type Range */
			var prevRange = range(-1, 0);
			/** @type Range */
			var sel = range(editor.getSelectionRange());
			
			var searchPos = sel.start, loop = 100000; // endless loop protection
			while (searchPos >= 0 && searchPos < contentLength && --loop > 0) {
				if ( (itemRange = extractFn(content, searchPos, isBackward)) ) {
					if (prevRange.equal(itemRange)) {
						break;
					}
					
					prevRange = itemRange.clone();
					rng = rangeFn(itemRange.substring(content), itemRange.start, sel.clone());
					
					if (rng) {
						editor.createSelection(rng.start, rng.end);
						return true;
					} else {
						searchPos = isBackward ? itemRange.start : itemRange.end - 1;
					}
				}
				
				searchPos += isBackward ? -1 : 1;
			}
			
			return false;
		}
		
		// XXX HTML section
		
		/**
		 * Find next HTML item
		 * @param {IEmmetEditor} editor
		 */
		function findNextHTMLItem(editor) {
			var isFirst = true;
			return findItem(editor, false, function(content, searchPos){
				if (isFirst) {
					isFirst = false;
					return findOpeningTagFromPosition(content, searchPos);
				} else {
					return getOpeningTagFromPosition(content, searchPos);
				}
			}, function(tag, offset, selRange) {
				return getRangeForHTMLItem(tag, offset, selRange, false);
			});
		}
		
		/**
		 * Find previous HTML item
		 * @param {IEmmetEditor} editor
		 */
		function findPrevHTMLItem(editor) {
			return findItem(editor, true, getOpeningTagFromPosition, function (tag, offset, selRange) {
				return getRangeForHTMLItem(tag, offset, selRange, true);
			});
		}
		
		/**
		 * Creates possible selection ranges for HTML tag
		 * @param {String} source Original HTML source for tokens
		 * @param {Array} tokens List of HTML tokens
		 * @returns {Array}
		 */
		function makePossibleRangesHTML(source, tokens, offset) {
			offset = offset || 0;
			var result = [];
			var attrStart = -1, attrName = '', attrValue = '', attrValueRange, tagName;
			tokens.forEach(function(tok) {
				switch (tok.type) {
					case 'tag':
						tagName = source.substring(tok.start, tok.end);
						if (/^<[\w\:\-]/.test(tagName)) {
							// add tag name
							result.push(range({
								start: tok.start + 1, 
								end: tok.end
							}));
						}
						break;
					case 'attribute':
						attrStart = tok.start;
						attrName = source.substring(tok.start, tok.end);
						break;
						
					case 'string':
						// attribute value
						// push full attribute first
						result.push(range(attrStart, tok.end - attrStart));
						
						attrValueRange = range(tok);
						attrValue = attrValueRange.substring(source);
						
						// is this a quoted attribute?
						if (isQuote(attrValue.charAt(0)))
							attrValueRange.start++;
						
						if (isQuote(attrValue.charAt(attrValue.length - 1)))
							attrValueRange.end--;
						
						result.push(attrValueRange);
						
						if (attrName == 'class') {
							result = result.concat(classNameRanges(attrValueRange.substring(source), attrValueRange.start));
						}
						
						break;
				}
			});
			
			// offset ranges
			result = result.filter(function(item) {
				if (item.length()) {
					item.shift(offset);
					return true;
				}
			});
	
			// remove duplicates
			return utils.unique(result, function(item) {
				return item.toString();
			});
		}
		
		/**
		 * Returns ranges of class names in "class" attribute value
		 * @param {String} className
		 * @returns {Array}
		 */
		function classNameRanges(className, offset) {
			offset = offset || 0;
			var result = [];
			/** @type StringStream */
			var stream = stringStream.create(className);
			
			// skip whitespace
			stream.eatSpace();
			stream.start = stream.pos;
			
			var ch;
			while ((ch = stream.next())) {
				if (/[\s\u00a0]/.test(ch)) {
					result.push(range(stream.start + offset, stream.pos - stream.start - 1));
					stream.eatSpace();
					stream.start = stream.pos;
				}
			}
			
			result.push(range(stream.start + offset, stream.pos - stream.start));
			return result;
		}
		
		/**
		 * Returns best HTML tag range match for current selection
		 * @param {String} tag Tag declaration
		 * @param {Number} offset Tag's position index inside content
		 * @param {Range} selRange Selection range
		 * @return {Range} Returns range if next item was found, <code>null</code> otherwise
		 */
		function getRangeForHTMLItem(tag, offset, selRange, isBackward) {
			var ranges = makePossibleRangesHTML(tag, xmlParser.parse(tag), offset);
			
			if (isBackward)
				ranges.reverse();
			
			// try to find selected range
			var curRange = utils.find(ranges, function(r) {
				return r.equal(selRange);
			});
			
			if (curRange) {
				var ix = ranges.indexOf(curRange);
				if (ix < ranges.length - 1)
					return ranges[ix + 1];
				
				return null;
			}
			
			// no selected range, find nearest one
			if (isBackward)
				// search backward
				return utils.find(ranges, function(r) {
					return r.start < selRange.start;
				});
			
			// search forward
			// to deal with overlapping ranges (like full attribute definition
			// and attribute value) let's find range under caret first
			if (!curRange) {
				var matchedRanges = ranges.filter(function(r) {
					return r.inside(selRange.end);
				});
				
				if (matchedRanges.length > 1)
					return matchedRanges[1];
			}
			
			
			return utils.find(ranges, function(r) {
				return r.end > selRange.end;
			});
		}
		
		/**
		 * Search for opening tag in content, starting at specified position
		 * @param {String} html Where to search tag
		 * @param {Number} pos Character index where to start searching
		 * @return {Range} Returns range if valid opening tag was found,
		 * <code>null</code> otherwise
		 */
		function findOpeningTagFromPosition(html, pos) {
			var tag;
			while (pos >= 0) {
				if ((tag = getOpeningTagFromPosition(html, pos)))
					return tag;
				pos--;
			}
			
			return null;
		}
		
		/**
		 * @param {String} html Where to search tag
		 * @param {Number} pos Character index where to start searching
		 * @return {Range} Returns range if valid opening tag was found,
		 * <code>null</code> otherwise
		 */
		function getOpeningTagFromPosition(html, pos) {
			var m;
			if (html.charAt(pos) == '<' && (m = html.substring(pos, html.length).match(startTag))) {
				return range(pos, m[0]);
			}
		}
		
		function isQuote(ch) {
			return ch == '"' || ch == "'";
		}
	
		/**
		 * Returns all ranges inside given rule, available for selection
		 * @param  {CSSEditContainer} rule
		 * @return {Array}
		 */
		function findInnerRanges(rule) {
			// rule selector
			var ranges = [rule.nameRange(true)];
	
			// find nested sections, keep selectors only
			var nestedSections = cssSections.nestedSectionsInRule(rule);
			nestedSections.forEach(function(section) {
				ranges.push(range.create2(section.start, section._selectorEnd));
			});
	
			// add full property ranges and values
			rule.list().forEach(function(property) {
				ranges = ranges.concat(makePossibleRangesCSS(property));
			});
	
			ranges = range.sort(ranges);
	
			// optimize result: remove empty ranges and duplicates
			ranges = ranges.filter(function(item) {
				return !!item.length();
			});
			return utils.unique(ranges, function(item) {
				return item.toString();
			});
		}
		
		/**
		 * Makes all possible selection ranges for specified CSS property
		 * @param {CSSProperty} property
		 * @returns {Array}
		 */
		function makePossibleRangesCSS(property) {
			// find all possible ranges, sorted by position and size
			var valueRange = property.valueRange(true);
			var result = [property.range(true), valueRange];
			
			// locate parts of complex values.
			// some examples:
			// – 1px solid red: 3 parts
			// – arial, sans-serif: enumeration, 2 parts
			// – url(image.png): function value part
			var value = property.value();
			property.valueParts().forEach(function(r) {
				// add absolute range
				var clone = r.clone();
				result.push(clone.shift(valueRange.start));
				
				/** @type StringStream */
				var stream = stringStream.create(r.substring(value));
				if (stream.match(/^[\w\-]+\(/, true)) {
					// we have a function, find values in it.
					// but first add function contents
					stream.start = stream.pos;
					stream.backUp(1);
					stream.skipToPair('(', ')');
					stream.backUp(1);
					var fnBody = stream.current();
					result.push(range(clone.start + stream.start, fnBody));
					
					// find parts
					cssEditTree.findParts(fnBody).forEach(function(part) {
						result.push(range(clone.start + stream.start + part.start, part.substring(fnBody)));
					});
				}
			});
	
			return result;
		}
		
		/**
		 * Tries to find matched CSS property and nearest range for selection
		 * @param {CSSRule} rule
		 * @param {Range} selRange
		 * @param {Boolean} isBackward
		 * @returns {Range}
		 */
		function matchedRangeForCSSProperty(rule, selRange, isBackward) {
			var ranges = findInnerRanges(rule);
			if (isBackward) {
				ranges.reverse();
			}
			
			// return next to selected range, if possible
			var r = utils.find(ranges, function(item) {
				return item.equal(selRange);
			});
	
			if (r) {
				return ranges[ranges.indexOf(r) + 1];
			}
	
			// find matched and (possibly) overlapping ranges
			var nested = ranges.filter(function(item) {
				return item.inside(selRange.end);
			});
	
			if (nested.length) {
				return nested.sort(function(a, b) {
					return a.length() - b.length();
				})[0];
			}
	
			// return range next to caret
			var test = 
			r = utils.find(ranges, isBackward 
				? function(item) {return item.end < selRange.start;}
				: function(item) {return item.end > selRange.start;}
			);
	
			if (!r) {
				// can’t find anything, just pick first one
				r = ranges[0];
			}
	
			return r;
		}
		
		function findNextCSSItem(editor) {
			return findItem(editor, false, cssSections.locateRule.bind(cssSections), getRangeForNextItemInCSS);
		}
		
		function findPrevCSSItem(editor) {
			return findItem(editor, true, cssSections.locateRule.bind(cssSections), getRangeForPrevItemInCSS);
		}
		
		/**
		 * Returns range for item to be selected in CSS after current caret 
		 * (selection) position
		 * @param {String} rule CSS rule declaration
		 * @param {Number} offset Rule's position index inside content
		 * @param {Range} selRange Selection range
		 * @return {Range} Returns range if next item was found, <code>null</code> otherwise
		 */
		function getRangeForNextItemInCSS(rule, offset, selRange) {
			var tree = cssEditTree.parse(rule, {
				offset: offset
			});
	
			return matchedRangeForCSSProperty(tree, selRange, false);
		}
		
		/**
		 * Returns range for item to be selected in CSS before current caret 
		 * (selection) position
		 * @param {String} rule CSS rule declaration
		 * @param {Number} offset Rule's position index inside content
		 * @param {Range} selRange Selection range
		 * @return {Range} Returns range if previous item was found, <code>null</code> otherwise
		 */
		function getRangeForPrevItemInCSS(rule, offset, selRange) {
			var tree = cssEditTree.parse(rule, {
				offset: offset
			});
	
			return matchedRangeForCSSProperty(tree, selRange, true);
		}
	
		return {
			selectNextItemAction: function(editor) {
				if (actionUtils.isSupportedCSS(editor.getSyntax())) {
					return findNextCSSItem(editor);
				} else {
					return findNextHTMLItem(editor);
				}
			},
	
			selectPreviousItemAction: function(editor) {
				if (actionUtils.isSupportedCSS(editor.getSyntax())) {
					return findPrevCSSItem(editor);
				} else {
					return findPrevHTMLItem(editor);
				}
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Select current line (for simple editors like browser's &lt;textarea&gt;)
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		return {
			selectLineAction: function(editor) {
				var range = editor.getCurrentLineRange();
				editor.createSelection(range.start, range.end);
				return true;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Splits or joins tag, e.g. transforms it into a short notation and vice versa:<br>
	 * &lt;div&gt;&lt;/div&gt; → &lt;div /&gt; : join<br>
	 * &lt;div /&gt; → &lt;div&gt;&lt;/div&gt; : split
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var resources = __webpack_require__(27);
		var matcher = __webpack_require__(32);
		var editorUtils = __webpack_require__(34);
		var profile = __webpack_require__(28);
	
		/**
		 * @param {IEmmetEditor} editor
		 * @param {Object} profile
		 * @param {Object} tag
		 */
		function joinTag(editor, profile, tag) {
			// empty closing slash is a nonsense for this action
			var slash = profile.selfClosing() || ' /';
			var content = tag.open.range.substring(tag.source).replace(/\s*>$/, slash + '>');
			
			var caretPos = editor.getCaretPos();
			
			// update caret position
			if (content.length + tag.outerRange.start < caretPos) {
				caretPos = content.length + tag.outerRange.start;
			}
			
			content = utils.escapeText(content);
			editor.replaceContent(content, tag.outerRange.start, tag.outerRange.end);
			editor.setCaretPos(caretPos);
			return true;
		}
		
		function splitTag(editor, profile, tag) {
			var caretPos = editor.getCaretPos();
			
			// define tag content depending on profile
			var tagContent = (profile.tag_nl === true) ? '\n\t\n' : '';
			var content = tag.outerContent().replace(/\s*\/>$/, '>');
			caretPos = tag.outerRange.start + content.length;
			content += tagContent + '</' + tag.open.name + '>';
			
			content = utils.escapeText(content);
			editor.replaceContent(content, tag.outerRange.start, tag.outerRange.end);
			editor.setCaretPos(caretPos);
			return true;
		}
	
		return {
			splitJoinTagAction: function(editor, profileName) {
				var info = editorUtils.outputInfo(editor, null, profileName);
				var curProfile = profile.get(info.profile);
				
				// find tag at current position
				var tag = matcher.tag(info.content, editor.getCaretPos());
				if (tag) {
					return tag.close 
						? joinTag(editor, curProfile, tag) 
						: splitTag(editor, curProfile, tag);
				}
				
				return false;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Toggles HTML and CSS comments depending on current caret context. Unlike
	 * the same action in most editors, this action toggles comment on currently
	 * matched item—HTML tag or CSS selector—when nothing is selected.
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var prefs = __webpack_require__(26);
		var range = __webpack_require__(36);
		var utils = __webpack_require__(22);
		var actionUtils = __webpack_require__(33);
		var editorUtils = __webpack_require__(34);
		var htmlMatcher = __webpack_require__(32);
		var cssEditTree = __webpack_require__(71);
	
		/**
		 * Toggle HTML comment on current selection or tag
		 * @param {IEmmetEditor} editor
		 * @return {Boolean} Returns <code>true</code> if comment was toggled
		 */
		function toggleHTMLComment(editor) {
			/** @type Range */
			var r = range(editor.getSelectionRange());
			var info = editorUtils.outputInfo(editor);
				
			if (!r.length()) {
				// no selection, find matching tag
				var tag = htmlMatcher.tag(info.content, editor.getCaretPos());
				if (tag) { // found pair
					r = tag.outerRange;
				}
			}
			
			return genericCommentToggle(editor, '<!--', '-->', r);
		}
	
		/**
		 * Simple CSS commenting
		 * @param {IEmmetEditor} editor
		 * @return {Boolean} Returns <code>true</code> if comment was toggled
		 */
		function toggleCSSComment(editor) {
			/** @type Range */
			var rng = range(editor.getSelectionRange());
			var info = editorUtils.outputInfo(editor);
				
			if (!rng.length()) {
				// no selection, try to get current rule
				/** @type CSSRule */
				var rule = cssEditTree.parseFromPosition(info.content, editor.getCaretPos());
				if (rule) {
					var property = cssItemFromPosition(rule, editor.getCaretPos());
					rng = property 
						? property.range(true) 
						: range(rule.nameRange(true).start, rule.source);
				}
			}
			
			if (!rng.length()) {
				// still no selection, get current line
				rng = range(editor.getCurrentLineRange());
				utils.narrowToNonSpace(info.content, rng);
			}
			
			return genericCommentToggle(editor, '/*', '*/', rng);
		}
		
		/**
		 * Returns CSS property from <code>rule</code> that matches passed position
		 * @param {EditContainer} rule
		 * @param {Number} absPos
		 * @returns {EditElement}
		 */
		function cssItemFromPosition(rule, absPos) {
			// do not use default EditContainer.itemFromPosition() here, because
			// we need to make a few assumptions to make CSS commenting more reliable
			var relPos = absPos - (rule.options.offset || 0);
			var reSafeChar = /^[\s\n\r]/;
			return utils.find(rule.list(), function(item) {
				if (item.range().end === relPos) {
					// at the end of property, but outside of it
					// if there’s a space character at current position,
					// use current property
					return reSafeChar.test(rule.source.charAt(relPos));
				}
				
				return item.range().inside(relPos);
			});
		}
	
		/**
		 * Search for nearest comment in <code>str</code>, starting from index <code>from</code>
		 * @param {String} text Where to search
		 * @param {Number} from Search start index
		 * @param {String} start_token Comment start string
		 * @param {String} end_token Comment end string
		 * @return {Range} Returns null if comment wasn't found
		 */
		function searchComment(text, from, startToken, endToken) {
			var commentStart = -1;
			var commentEnd = -1;
			
			var hasMatch = function(str, start) {
				return text.substr(start, str.length) == str;
			};
				
			// search for comment start
			while (from--) {
				if (hasMatch(startToken, from)) {
					commentStart = from;
					break;
				}
			}
			
			if (commentStart != -1) {
				// search for comment end
				from = commentStart;
				var contentLen = text.length;
				while (contentLen >= from++) {
					if (hasMatch(endToken, from)) {
						commentEnd = from + endToken.length;
						break;
					}
				}
			}
			
			return (commentStart != -1 && commentEnd != -1) 
				? range(commentStart, commentEnd - commentStart) 
				: null;
		}
	
		/**
		 * Generic comment toggling routine
		 * @param {IEmmetEditor} editor
		 * @param {String} commentStart Comment start token
		 * @param {String} commentEnd Comment end token
		 * @param {Range} range Selection range
		 * @return {Boolean}
		 */
		function genericCommentToggle(editor, commentStart, commentEnd, range) {
			var content = editorUtils.outputInfo(editor).content;
			var caretPos = editor.getCaretPos();
			var newContent = null;
				
			/**
			 * Remove comment markers from string
			 * @param {Sting} str
			 * @return {String}
			 */
			function removeComment(str) {
				return str
					.replace(new RegExp('^' + utils.escapeForRegexp(commentStart) + '\\s*'), function(str){
						caretPos -= str.length;
						return '';
					}).replace(new RegExp('\\s*' + utils.escapeForRegexp(commentEnd) + '$'), '');
			}
			
			// first, we need to make sure that this substring is not inside 
			// comment
			var commentRange = searchComment(content, caretPos, commentStart, commentEnd);
			if (commentRange && commentRange.overlap(range)) {
				// we're inside comment, remove it
				range = commentRange;
				newContent = removeComment(range.substring(content));
			} else {
				// should add comment
				// make sure that there's no comment inside selection
				newContent = commentStart + ' ' +
					range.substring(content)
						.replace(new RegExp(utils.escapeForRegexp(commentStart) + '\\s*|\\s*' + utils.escapeForRegexp(commentEnd), 'g'), '') +
					' ' + commentEnd;
					
				// adjust caret position
				caretPos += commentStart.length + 1;
			}
	
			// replace editor content
			if (newContent !== null) {
				newContent = utils.escapeText(newContent);
				editor.setCaretPos(range.start);
				editor.replaceContent(editorUtils.unindent(editor, newContent), range.start, range.end);
				editor.setCaretPos(caretPos);
				return true;
			}
			
			return false;
		}
		
		return {
			/**
			 * Toggle comment on current editor's selection or HTML tag/CSS rule
			 * @param {IEmmetEditor} editor
			 */
			toggleCommentAction: function(editor) {
				var info = editorUtils.outputInfo(editor);
				if (actionUtils.isSupportedCSS(info.syntax)) {
					// in case our editor is good enough and can recognize syntax from 
					// current token, we have to make sure that cursor is not inside
					// 'style' attribute of html element
					var caretPos = editor.getCaretPos();
					var tag = htmlMatcher.tag(info.content, caretPos);
					if (tag && tag.open.range.inside(caretPos)) {
						info.syntax = 'html';
					}
				}
				
				var cssSyntaxes = prefs.getArray('css.syntaxes');
				if (~cssSyntaxes.indexOf(info.syntax)) {
					return toggleCSSComment(editor);
				}
				
				return toggleHTMLComment(editor);
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Automatically updates image size attributes in HTML's &lt;img&gt; element or
	 * CSS rule
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var editorUtils = __webpack_require__(34);
		var actionUtils = __webpack_require__(33);
		var xmlEditTree = __webpack_require__(72);
		var cssEditTree = __webpack_require__(71);
		var base64 = __webpack_require__(93);
		var file = __webpack_require__(25);
	
		/**
		 * Updates image size of &lt;img src=""&gt; tag
		 * @param {IEmmetEditor} editor
		 */
		function updateImageSizeHTML(editor) {
			var offset = editor.getCaretPos();
			
			// find tag from current caret position
			var info = editorUtils.outputInfo(editor);
			var xmlElem = xmlEditTree.parseFromPosition(info.content, offset, true);
			if (xmlElem && (xmlElem.name() || '').toLowerCase() == 'img') {
				getImageSizeForSource(editor, xmlElem.value('src'), function(size) {
					if (size) {
						var compoundData = xmlElem.range(true);
						xmlElem.value('width', size.width);
						xmlElem.value('height', size.height, xmlElem.indexOf('width') + 1);
						
						actionUtils.compoundUpdate(editor, utils.extend(compoundData, {
							data: xmlElem.toString(),
							caret: offset
						}));
					}
				});
			}
		}
		
		/**
		 * Updates image size of CSS property
		 * @param {IEmmetEditor} editor
		 */
		function updateImageSizeCSS(editor) {
			var offset = editor.getCaretPos();
			
			// find tag from current caret position
			var info = editorUtils.outputInfo(editor);
			var cssRule = cssEditTree.parseFromPosition(info.content, offset, true);
			if (cssRule) {
				// check if there is property with image under caret
				var prop = cssRule.itemFromPosition(offset, true), m;
				if (prop && (m = /url\((["']?)(.+?)\1\)/i.exec(prop.value() || ''))) {
					getImageSizeForSource(editor, m[2], function(size) {
						if (size) {
							var compoundData = cssRule.range(true);
							cssRule.value('width', size.width + 'px');
							cssRule.value('height', size.height + 'px', cssRule.indexOf('width') + 1);
							
							actionUtils.compoundUpdate(editor, utils.extend(compoundData, {
								data: cssRule.toString(),
								caret: offset
							}));
						}
					});
				}
			}
		}
		
		/**
		 * Returns image dimensions for source
		 * @param {IEmmetEditor} editor
		 * @param {String} src Image source (path or data:url)
		 */
		function getImageSizeForSource(editor, src, callback) {
			var fileContent;
			if (src) {
				// check if it is data:url
				if (/^data:/.test(src)) {
					fileContent = base64.decode( src.replace(/^data\:.+?;.+?,/, '') );
					return callback(actionUtils.getImageSize(fileContent));
				}
				
				var absPath = file.locateFile(editor.getFilePath(), src);
				if (absPath === null) {
					throw "Can't find " + src + ' file';
				}
				
				file.read(absPath, function(err, content) {
					if (err) {
						throw 'Unable to read ' + absPath + ': ' + err;
					}
					
					content = String(content);
					callback(actionUtils.getImageSize(content));
				});
			}
		}
		
		return {
			updateImageSizeAction: function(editor) {
				// this action will definitely won’t work in SASS dialect,
				// but may work in SCSS or LESS
				if (actionUtils.isSupportedCSS(editor.getSyntax())) {
					updateImageSizeCSS(editor);
				} else {
					updateImageSizeHTML(editor);
				}
				
				return true;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Action that wraps content with abbreviation. For convenience, action is 
	 * defined as reusable module
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var range = __webpack_require__(36);
		var htmlMatcher = __webpack_require__(32);
		var utils = __webpack_require__(22);
		var editorUtils = __webpack_require__(34);
		var actionUtils = __webpack_require__(33);
		var parser = __webpack_require__(24);
		
		return {
			/**
			 * Wraps content with abbreviation
			 * @param {IEmmetEditor} Editor instance
			 * @param {String} abbr Abbreviation to wrap with
			 * @param {String} syntax Syntax type (html, css, etc.)
			 * @param {String} profile Output profile name (html, xml, xhtml)
			 */
			wrapWithAbbreviationAction: function(editor, abbr, syntax, profile) {
				var info = editorUtils.outputInfo(editor, syntax, profile);
				abbr = abbr || editor.prompt("Enter abbreviation");
				
				if (!abbr) {
					return null;
				}
				
				abbr = String(abbr);
				
				var r = range(editor.getSelectionRange());
				
				if (!r.length()) {
					// no selection, find tag pair
					var match = htmlMatcher.tag(info.content, r.start);
					if (!match) {  // nothing to wrap
						return false;
					}
					
					r = utils.narrowToNonSpace(info.content, match.range);
				}
				
				var newContent = utils.escapeText(r.substring(info.content));
				var result = parser.expand(abbr, {
					pastedContent: editorUtils.unindent(editor, newContent),
					syntax: info.syntax,
					profile: info.profile,
					contextNode: actionUtils.captureContext(editor)
				});
				
				if (result) {
					editor.replaceContent(result, r.start, r.end);
					return true;
				}
				
				return false;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Update Tag action: allows users to update existing HTML tags and add/remove
	 * attributes or even tag name
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var xmlEditTree = __webpack_require__(72);
		var editorUtils = __webpack_require__(34);
		var actionUtils = __webpack_require__(33);
		var utils = __webpack_require__(22);
		var parser = __webpack_require__(24);
	
		function updateAttributes(tag, abbrNode, ix) {
			var classNames = (abbrNode.attribute('class') || '').split(/\s+/g);
			if (ix) {
				classNames.push('+' + abbrNode.name());
			}
	
			var r = function(str) {
				return utils.replaceCounter(str, abbrNode.counter);
			};
	
			// update class
			classNames.forEach(function(className) {
				if (!className) {
					return;
				}
	
				className = r(className);
				var ch = className.charAt(0);
				if (ch == '+') {
					tag.addClass(className.substr(1));
				} else if (ch == '-') {
					tag.removeClass(className.substr(1));
				} else {
					tag.value('class', className);
				}
			});
	
			// update attributes
			abbrNode.attributeList().forEach(function(attr) {
				if (attr.name.toLowerCase() == 'class') {
					return;
				}
	
				var ch = attr.name.charAt(0);
				if (ch == '+') {
					var attrName = attr.name.substr(1);
					var tagAttr = tag.get(attrName);
					if (tagAttr) {
						tagAttr.value(tagAttr.value() + r(attr.value));
					} else {
						tag.value(attrName, r(attr.value));
					}
				} else if (ch == '-') {
					tag.remove(attr.name.substr(1));
				} else {
					tag.value(attr.name, r(attr.value));
				}
			});
		}
		
		return {
			/**
			 * Matches HTML tag under caret and updates its definition
			 * according to given abbreviation
			 * @param {IEmmetEditor} Editor instance
			 * @param {String} abbr Abbreviation to update with
			 */
			updateTagAction: function(editor, abbr) {
				abbr = abbr || editor.prompt("Enter abbreviation");
	
				if (!abbr) {
					return false;
				}
	
				var content = editor.getContent();
				var ctx = actionUtils.captureContext(editor);
				var tag = this.getUpdatedTag(abbr, ctx, content);
	
				if (!tag) {
					// nothing to update
					return false;
				}
	
				// check if tag name was updated
				if (tag.name() != ctx.name && ctx.match.close) {
					editor.replaceContent('</' + tag.name() + '>', ctx.match.close.range.start, ctx.match.close.range.end, true);
				}
	
				editor.replaceContent(tag.source, ctx.match.open.range.start, ctx.match.open.range.end, true);
				return true;
			},
	
			/**
			 * Returns XMLEditContainer node with updated tag structure
			 * of existing tag context.
			 * This data can be used to modify existing tag
			 * @param  {String} abbr    Abbreviation
			 * @param  {Object} ctx     Tag to be updated (captured with `htmlMatcher`)
			 * @param  {String} content Original editor content
			 * @return {XMLEditContainer}
			 */
			getUpdatedTag: function(abbr, ctx, content, options) {
				if (!ctx) {
					// nothing to update
					return null;
				}
	
				var tree = parser.parse(abbr, options || {});
	
				// for this action some characters in abbreviation has special
				// meaning. For example, `.-c2` means “remove `c2` class from
				// element” and `.+c3` means “append class `c3` to exising one.
				// 
				// But `.+c3` abbreviation will actually produce two elements:
				// <div class=""> and <c3>. Thus, we have to walk on each element
				// of parsed tree and use their definitions to update current element
				var tag = xmlEditTree.parse(ctx.match.open.range.substring(content), {
					offset: ctx.match.outerRange.start
				});
	
				tree.children.forEach(function(node, i) {
					updateAttributes(tag, node, i);
				});
	
				// if tag name was resolved by implicit tag name resolver,
				// then user omitted it in abbreviation and wants to keep
				// original tag name
				var el = tree.children[0];
				if (!el.data('nameResolved')) {
					tag.name(el.name());
				}
	
				return tag;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Module for handling filters
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var profile = __webpack_require__(28);
		var resources = __webpack_require__(27);
	
		/** List of registered filters */
		var registeredFilters = {
			html: __webpack_require__(79),
			haml: __webpack_require__(78),
			jade: __webpack_require__(80),
			slim: __webpack_require__(82),
			xsl: __webpack_require__(84),
			css: __webpack_require__(75),
			bem: __webpack_require__(73),
			c: __webpack_require__(74),
			e: __webpack_require__(76),
			s: __webpack_require__(81),
			t: __webpack_require__(83)
		};
		
		/** Filters that will be applied for unknown syntax */
		var basicFilters = 'html';
		
		function list(filters) {
			if (!filters)
				return [];
			
			if (typeof filters === 'string') {
				return filters.split(/[\|,]/g);
			}
			
			return filters;
		}
		
		return  {
			/**
			 * Register new filter
			 * @param {String} name Filter name
			 * @param {Function} fn Filter function
			 */
			add: function(name, fn) {
				registeredFilters[name] = fn;
			},
			
			/**
			 * Apply filters for final output tree
			 * @param {AbbreviationNode} tree Output tree
			 * @param {Array} filters List of filters to apply. Might be a 
			 * <code>String</code>
			 * @param {Object} profile Output profile, defined in <i>profile</i> 
			 * module. Filters defined it profile are not used, <code>profile</code>
			 * is passed to filter function
			 * @memberOf emmet.filters
			 * @returns {AbbreviationNode}
			 */
			apply: function(tree, filters, profileName) {
				profileName = profile.get(profileName);
				
				list(filters).forEach(function(filter) {
					var name = utils.trim(filter.toLowerCase());
					if (name && name in registeredFilters) {
						tree = registeredFilters[name](tree, profileName);
					}
				});
				
				return tree;
			},
			
			/**
			 * Composes list of filters that should be applied to a tree, based on 
			 * passed data
			 * @param {String} syntax Syntax name ('html', 'css', etc.)
			 * @param {Object} profile Output profile
			 * @param {String} additionalFilters List or pipe-separated
			 * string of additional filters to apply
			 * @returns {Array}
			 */
			composeList: function(syntax, profileName, additionalFilters) {
				profileName = profile.get(profileName);
				var filters = list(profileName.filters || resources.findItem(syntax, 'filters') || basicFilters);
				
				if (profileName.extraFilters) {
					filters = filters.concat(list(profileName.extraFilters));
				}
					
				if (additionalFilters) {
					filters = filters.concat(list(additionalFilters));
				}
					
				if (!filters || !filters.length) {
					// looks like unknown syntax, apply basic filters
					filters = list(basicFilters);
				}
					
				return filters;
			},
			
			/**
			 * Extracts filter list from abbreviation
			 * @param {String} abbr
			 * @returns {Array} Array with cleaned abbreviation and list of 
			 * extracted filters
			 */
			extract: function(abbr) {
				var filters = '';
				abbr = abbr.replace(/\|([\w\|\-]+)$/, function(str, p1){
					filters = p1;
					return '';
				});
				
				return [abbr, list(filters)];
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Utility functions to work with <code>AbbreviationNode</code> as HTML element
	 * @param {Function} require
	 * @param {Underscore} _
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var elements = __webpack_require__(64);
		var tabStops = __webpack_require__(31);
		var utils = __webpack_require__(22);
		var tagName = __webpack_require__(91);
	
		return {
			/**
			 * Test if passed node is unary (no closing tag)
			 * @param {AbbreviationNode} node
			 * @return {Boolean}
			 */
			isUnary: function(node) {
				if (node.children.length || node._text || this.isSnippet(node)) {
					return false;
				}
				
				var r = node.data('resource');
				return r && r.is_empty;
			},
			
			/**
			 * Test if passed node is inline-level (like &lt;strong&gt;, &lt;img&gt;)
			 * @param {AbbreviationNode} node
			 * @return {Boolean}
			 */
			isInline: function(node) {
				return node.isTextNode() 
					|| !node.name() 
					|| tagName.isInlineLevel(node.name());
			},
			
			/**
			 * Test if passed node is block-level
			 * @param {AbbreviationNode} node
			 * @return {Boolean}
			 */
			isBlock: function(node) {
				return this.isSnippet(node) || !this.isInline(node);
			},
			
			/**
			 * Test if given node is a snippet
			 * @param {AbbreviationNode} node
			 * @return {Boolean}
			 */
			isSnippet: function(node) {
				return elements.is(node.data('resource'), 'snippet');
			},
			
			/**
			 * This function tests if passed node content contains HTML tags. 
			 * This function is mostly used for output formatting
			 * @param {AbbreviationNode} node
			 * @returns {Boolean}
			 */
			hasTagsInContent: function(node) {
				return utils.matchesTag(node.content);
			},
			
			/**
			 * Test if current element contains block-level children
			 * @param {AbbreviationNode} node
			 * @return {Boolean}
			 */
			hasBlockChildren: function(node) {
				return (this.hasTagsInContent(node) && this.isBlock(node)) 
					|| node.children.some(function(child) {
						return this.isBlock(child);
					}, this);
			},
			
			/**
			 * Utility function that inserts content instead of <code>${child}</code>
			 * variables on <code>text</code>
			 * @param {String} text Text where child content should be inserted
			 * @param {String} childContent Content to insert
			 * @param {Object} options
			 * @returns {String
			 */
			insertChildContent: function(text, childContent, options) {
				options = utils.extend({
					keepVariable: true,
					appendIfNoChild: true
				}, options || {});
				
				var childVariableReplaced = false;
				text = tabStops.replaceVariables(text, function(variable, name, data) {
					var output = variable;
					if (name == 'child') {
						// add correct indentation
						output = utils.padString(childContent, utils.getLinePaddingFromPosition(text, data.start));
						childVariableReplaced = true;
						if (options.keepVariable)
							output += variable;
					}
					
					return output;
				});
				
				if (!childVariableReplaced && options.appendIfNoChild) {
					text += childContent;
				}
				
				return text;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * A trimmed version of CodeMirror's StringStream module for string parsing
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		/**
		 * @type StringStream
		 * @constructor
		 * @param {String} string Assuming that bound string should be
		 * immutable
		 */
		function StringStream(string) {
			this.pos = this.start = 0;
			this.string = string;
			this._length = string.length;
		}
		
		StringStream.prototype = {
			/**
			 * Returns true only if the stream is at the end of the line.
			 * @returns {Boolean}
			 */
			eol: function() {
				return this.pos >= this._length;
			},
			
			/**
			 * Returns true only if the stream is at the start of the line
			 * @returns {Boolean}
			 */
			sol: function() {
				return this.pos === 0;
			},
			
			/**
			 * Returns the next character in the stream without advancing it. 
			 * Will return <code>undefined</code> at the end of the line.
			 * @returns {String}
			 */
			peek: function() {
				return this.string.charAt(this.pos);
			},
			
			/**
			 * Returns the next character in the stream and advances it.
			 * Also returns <code>undefined</code> when no more characters are available.
			 * @returns {String}
			 */
			next: function() {
				if (this.pos < this._length)
					return this.string.charAt(this.pos++);
			},
			
			/**
			 * match can be a character, a regular expression, or a function that
			 * takes a character and returns a boolean. If the next character in the
			 * stream 'matches' the given argument, it is consumed and returned.
			 * Otherwise, undefined is returned.
			 * @param {Object} match
			 * @returns {String}
			 */
			eat: function(match) {
				var ch = this.string.charAt(this.pos), ok;
				if (typeof match == "string")
					ok = ch == match;
				else
					ok = ch && (match.test ? match.test(ch) : match(ch));
				
				if (ok) {
					++this.pos;
					return ch;
				}
			},
			
			/**
			 * Repeatedly calls <code>eat</code> with the given argument, until it
			 * fails. Returns <code>true</code> if any characters were eaten.
			 * @param {Object} match
			 * @returns {Boolean}
			 */
			eatWhile: function(match) {
				var start = this.pos;
				while (this.eat(match)) {}
				return this.pos > start;
			},
			
			/**
			 * Shortcut for <code>eatWhile</code> when matching white-space.
			 * @returns {Boolean}
			 */
			eatSpace: function() {
				var start = this.pos;
				while (/[\s\u00a0]/.test(this.string.charAt(this.pos)))
					++this.pos;
				return this.pos > start;
			},
			
			/**
			 * Moves the position to the end of the line.
			 */
			skipToEnd: function() {
				this.pos = this._length;
			},
			
			/**
			 * Skips to the next occurrence of the given character, if found on the
			 * current line (doesn't advance the stream if the character does not
			 * occur on the line). Returns true if the character was found.
			 * @param {String} ch
			 * @returns {Boolean}
			 */
			skipTo: function(ch) {
				var found = this.string.indexOf(ch, this.pos);
				if (found > -1) {
					this.pos = found;
					return true;
				}
			},
			
			/**
			 * Skips to <code>close</code> character which is pair to <code>open</code>
			 * character, considering possible pair nesting. This function is used
			 * to consume pair of characters, like opening and closing braces
			 * @param {String} open
			 * @param {String} close
			 * @returns {Boolean} Returns <code>true</code> if pair was successfully
			 * consumed
			 */
			skipToPair: function(open, close, skipString) {
				var braceCount = 0, ch;
				var pos = this.pos, len = this._length;
				while (pos < len) {
					ch = this.string.charAt(pos++);
					if (ch == open) {
						braceCount++;
					} else if (ch == close) {
						braceCount--;
						if (braceCount < 1) {
							this.pos = pos;
							return true;
						}
					} else if (skipString && (ch == '"' || ch == "'")) {
						this.skipString(ch);
					}
				}
				
				return false;
			},
	
			/**
			 * A helper function which, in case of either single or
			 * double quote was found in current position, skips entire
			 * string (quoted value)
			 * @return {Boolean} Wether quoted string was skipped
			 */
			skipQuoted: function(noBackup) {
				var ch = this.string.charAt(noBackup ? this.pos : this.pos - 1);
				if (ch === '"' || ch === "'") {
					if (noBackup) {
						this.pos++;
					}
					return this.skipString(ch);
				}
			},
	
			/**
			 * A custom function to skip string literal, e.g. a "double-quoted"
			 * or 'single-quoted' value
			 * @param  {String} quote An opening quote
			 * @return {Boolean}
			 */
			skipString: function(quote) {
				var pos = this.pos, len = this._length, ch;
				while (pos < len) {
					ch = this.string.charAt(pos++);
					if (ch == '\\') {
						continue;
					} else if (ch == quote) {
						this.pos = pos;
						return true;
					}
				}
	
				return false;
			},
			
			/**
			 * Backs up the stream n characters. Backing it up further than the
			 * start of the current token will cause things to break, so be careful.
			 * @param {Number} n
			 */
			backUp : function(n) {
				this.pos -= n;
			},
			
			/**
			 * Act like a multi-character <code>eat</code>—if <code>consume</code> is true or
			 * not given—or a look-ahead that doesn't update the stream position—if
			 * it is false. <code>pattern</code> can be either a string or a
			 * regular expression starting with ^. When it is a string,
			 * <code>caseInsensitive</code> can be set to true to make the match
			 * case-insensitive. When successfully matching a regular expression,
			 * the returned value will be the array returned by <code>match</code>,
			 * in case you need to extract matched groups.
			 * 
			 * @param {RegExp} pattern
			 * @param {Boolean} consume
			 * @param {Boolean} caseInsensitive
			 * @returns
			 */
			match: function(pattern, consume, caseInsensitive) {
				if (typeof pattern == "string") {
					var cased = caseInsensitive
						? function(str) {return str.toLowerCase();}
						: function(str) {return str;};
					
					if (cased(this.string).indexOf(cased(pattern), this.pos) == this.pos) {
						if (consume !== false)
							this.pos += pattern.length;
						return true;
					}
				} else {
					var match = this.string.slice(this.pos).match(pattern);
					if (match && consume !== false)
						this.pos += match[0].length;
					return match;
				}
			},
			
			/**
			 * Get the string between the start of the current token and the 
			 * current stream position.
			 * @returns {String}
			 */
			current: function(backUp) {
				return this.string.slice(this.start, this.pos - (backUp ? 1 : 0));
			}
		};
	
		module.exports = function(string) {
			return new StringStream(string);
		};
	
		/** @deprecated */
		module.exports.create = module.exports;
		return module.exports;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * "Lorem ipsum" text generator. Matches <code>lipsum(num)?</code> or 
	 * <code>lorem(num)?</code> abbreviation.
	 * This code is based on Django's contribution: 
	 * https://code.djangoproject.com/browser/django/trunk/django/contrib/webdesign/lorem_ipsum.py
	 * <br><br>
	 * Examples to test:<br>
	 * <code>lipsum</code> – generates 30 words text.<br>
	 * <code>lipsum*6</code> – generates 6 paragraphs (autowrapped with &lt;p&gt; element) of text.<br>
	 * <code>ol>lipsum10*5</code> — generates ordered list with 5 list items (autowrapped with &lt;li&gt; tag)
	 * with text of 10 words on each line.<br>
	 * <code>span*3>lipsum20</code> – generates 3 paragraphs of 20-words text, each wrapped with &lt;span&gt; element.
	 * Each paragraph phrase is unique.   
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var prefs = __webpack_require__(26);
	
		var langs = {
			en: {
				common: ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit'],
				words: ['exercitationem', 'perferendis', 'perspiciatis', 'laborum', 'eveniet',
					'sunt', 'iure', 'nam', 'nobis', 'eum', 'cum', 'officiis', 'excepturi',
					'odio', 'consectetur', 'quasi', 'aut', 'quisquam', 'vel', 'eligendi',
					'itaque', 'non', 'odit', 'tempore', 'quaerat', 'dignissimos',
					'facilis', 'neque', 'nihil', 'expedita', 'vitae', 'vero', 'ipsum',
					'nisi', 'animi', 'cumque', 'pariatur', 'velit', 'modi', 'natus',
					'iusto', 'eaque', 'sequi', 'illo', 'sed', 'ex', 'et', 'voluptatibus',
					'tempora', 'veritatis', 'ratione', 'assumenda', 'incidunt', 'nostrum',
					'placeat', 'aliquid', 'fuga', 'provident', 'praesentium', 'rem',
					'necessitatibus', 'suscipit', 'adipisci', 'quidem', 'possimus',
					'voluptas', 'debitis', 'sint', 'accusantium', 'unde', 'sapiente',
					'voluptate', 'qui', 'aspernatur', 'laudantium', 'soluta', 'amet',
					'quo', 'aliquam', 'saepe', 'culpa', 'libero', 'ipsa', 'dicta',
					'reiciendis', 'nesciunt', 'doloribus', 'autem', 'impedit', 'minima',
					'maiores', 'repudiandae', 'ipsam', 'obcaecati', 'ullam', 'enim',
					'totam', 'delectus', 'ducimus', 'quis', 'voluptates', 'dolores',
					'molestiae', 'harum', 'dolorem', 'quia', 'voluptatem', 'molestias',
					'magni', 'distinctio', 'omnis', 'illum', 'dolorum', 'voluptatum', 'ea',
					'quas', 'quam', 'corporis', 'quae', 'blanditiis', 'atque', 'deserunt',
					'laboriosam', 'earum', 'consequuntur', 'hic', 'cupiditate',
					'quibusdam', 'accusamus', 'ut', 'rerum', 'error', 'minus', 'eius',
					'ab', 'ad', 'nemo', 'fugit', 'officia', 'at', 'in', 'id', 'quos',
					'reprehenderit', 'numquam', 'iste', 'fugiat', 'sit', 'inventore',
					'beatae', 'repellendus', 'magnam', 'recusandae', 'quod', 'explicabo',
					'doloremque', 'aperiam', 'consequatur', 'asperiores', 'commodi',
					'optio', 'dolor', 'labore', 'temporibus', 'repellat', 'veniam',
					'architecto', 'est', 'esse', 'mollitia', 'nulla', 'a', 'similique',
					'eos', 'alias', 'dolore', 'tenetur', 'deleniti', 'porro', 'facere',
					'maxime', 'corrupti']
			},
			sp: {
				common: ['mujer', 'uno', 'dolor', 'más', 'de', 'poder', 'mismo', 'si'],
				words: ['ejercicio', 'preferencia', 'perspicacia', 'laboral', 'paño',
					'suntuoso', 'molde', 'namibia', 'planeador', 'mirar', 'demás', 'oficinista', 'excepción',
					'odio', 'consecuencia', 'casi', 'auto', 'chicharra', 'velo', 'elixir',
					'ataque', 'no', 'odio', 'temporal', 'cuórum', 'dignísimo',
					'facilismo', 'letra', 'nihilista', 'expedición', 'alma', 'alveolar', 'aparte',
					'león', 'animal', 'como', 'paria', 'belleza', 'modo', 'natividad',
					'justo', 'ataque', 'séquito', 'pillo', 'sed', 'ex', 'y', 'voluminoso',
					'temporalidad', 'verdades', 'racional', 'asunción', 'incidente', 'marejada',
					'placenta', 'amanecer', 'fuga', 'previsor', 'presentación', 'lejos',
					'necesariamente', 'sospechoso', 'adiposidad', 'quindío', 'pócima',
					'voluble', 'débito', 'sintió', 'accesorio', 'falda', 'sapiencia',
					'volutas', 'queso', 'permacultura', 'laudo', 'soluciones', 'entero',
					'pan', 'litro', 'tonelada', 'culpa', 'libertario', 'mosca', 'dictado',
					'reincidente', 'nascimiento', 'dolor', 'escolar', 'impedimento', 'mínima',
					'mayores', 'repugnante', 'dulce', 'obcecado', 'montaña', 'enigma',
					'total', 'deletéreo', 'décima', 'cábala', 'fotografía', 'dolores',
					'molesto', 'olvido', 'paciencia', 'resiliencia', 'voluntad', 'molestias',
					'magnífico', 'distinción', 'ovni', 'marejada', 'cerro', 'torre', 'y',
					'abogada', 'manantial', 'corporal', 'agua', 'crepúsculo', 'ataque', 'desierto',
					'laboriosamente', 'angustia', 'afortunado', 'alma', 'encefalograma',
					'materialidad', 'cosas', 'o', 'renuncia', 'error', 'menos', 'conejo',
					'abadía', 'analfabeto', 'remo', 'fugacidad', 'oficio', 'en', 'almácigo', 'vos', 'pan',
					'represión', 'números', 'triste', 'refugiado', 'trote', 'inventor',
					'corchea', 'repelente', 'magma', 'recusado', 'patrón', 'explícito',
					'paloma', 'síndrome', 'inmune', 'autoinmune', 'comodidad',
					'ley', 'vietnamita', 'demonio', 'tasmania', 'repeler', 'apéndice',
					'arquitecto', 'columna', 'yugo', 'computador', 'mula', 'a', 'propósito',
					'fantasía', 'alias', 'rayo', 'tenedor', 'deleznable', 'ventana', 'cara',
					'anemia', 'corrupto']
			},
			ru: {
				common: ['далеко-далеко', 'за', 'словесными', 'горами', 'в стране', 'гласных', 'и согласных', 'живут', 'рыбные', 'тексты'],
				words: ['вдали', 'от всех', 'они', 'буквенных', 'домах', 'на берегу', 'семантика', 
					'большого', 'языкового', 'океана', 'маленький', 'ручеек', 'даль', 
					'журчит', 'по всей', 'обеспечивает', 'ее','всеми', 'необходимыми', 
					'правилами', 'эта', 'парадигматическая', 'страна', 'которой', 'жаренные', 
					'предложения', 'залетают', 'прямо', 'рот', 'даже', 'всемогущая', 
					'пунктуация', 'не', 'имеет', 'власти', 'над', 'рыбными', 'текстами', 
					'ведущими', 'безорфографичный', 'образ', 'жизни', 'однажды', 'одна', 
					'маленькая', 'строчка','рыбного', 'текста', 'имени', 'lorem', 'ipsum', 
					'решила', 'выйти', 'большой', 'мир', 'грамматики', 'великий', 'оксмокс', 
					'предупреждал', 'о', 'злых', 'запятых', 'диких', 'знаках', 'вопроса', 
					'коварных', 'точках', 'запятой', 'но', 'текст', 'дал', 'сбить', 
					'себя', 'толку', 'он', 'собрал', 'семь', 'своих', 'заглавных', 'букв', 
					'подпоясал', 'инициал', 'за', 'пояс', 'пустился', 'дорогу', 
					'взобравшись', 'первую', 'вершину', 'курсивных', 'гор', 'бросил', 
					'последний', 'взгляд', 'назад', 'силуэт', 'своего', 'родного', 'города', 
					'буквоград', 'заголовок', 'деревни', 'алфавит', 'подзаголовок', 'своего', 
					'переулка', 'грустный', 'реторический', 'вопрос', 'скатился', 'его', 
					'щеке', 'продолжил', 'свой', 'путь', 'дороге', 'встретил', 'рукопись', 
					'она', 'предупредила',  'моей', 'все', 'переписывается', 'несколько', 
					'раз', 'единственное', 'что', 'меня', 'осталось', 'это', 'приставка', 
					'возвращайся', 'ты', 'лучше', 'свою', 'безопасную', 'страну', 'послушавшись', 
					'рукописи', 'наш', 'продолжил', 'свой', 'путь', 'вскоре', 'ему', 
					'повстречался', 'коварный', 'составитель', 'рекламных', 'текстов', 
					'напоивший', 'языком', 'речью', 'заманивший', 'свое', 'агенство', 
					'которое', 'использовало', 'снова', 'снова', 'своих', 'проектах', 
					'если', 'переписали', 'то', 'живет', 'там', 'до', 'сих', 'пор']
			}
		};
	
		
		prefs.define('lorem.defaultLang', 'en', 
			'Default language of generated dummy text. Currently, <code>en</code>\
			and <code>ru</code> are supported, but users can add their own syntaxes\
			see <a href="http://docs.emmet.io/abbreviations/lorem-ipsum/">docs</a>.');
		prefs.define('lorem.omitCommonPart', false,
			'Omit commonly used part (e.g. “Lorem ipsum dolor sit amet“) from generated text.');
		
		/**
		 * Returns random integer between <code>from</code> and <code>to</code> values
		 * @param {Number} from
		 * @param {Number} to
		 * @returns {Number}
		 */
		function randint(from, to) {
			return Math.round(Math.random() * (to - from) + from);
		}
		
		/**
		 * @param {Array} arr
		 * @param {Number} count
		 * @returns {Array}
		 */
		function sample(arr, count) {
			var len = arr.length;
			var iterations = Math.min(len, count);
			var result = [];
			while (result.length < iterations) {
				var randIx = randint(0, len - 1);
				if (!~result.indexOf(randIx)) {
					result.push(randIx);
				}
			}
			
			return result.map(function(ix) {
				return arr[ix];
			});
		}
		
		function choice(val) {
			if (typeof val === 'string')
				return val.charAt(randint(0, val.length - 1));
			
			return val[randint(0, val.length - 1)];
		}
		
		function sentence(words, end) {
			if (words.length) {
				words[0] = words[0].charAt(0).toUpperCase() + words[0].substring(1);
			}
			
			return words.join(' ') + (end || choice('?!...')); // more dots than question marks
		}
		
		/**
		 * Insert commas at randomly selected words. This function modifies values
		 * inside <code>words</code> array 
		 * @param {Array} words
		 */
		function insertCommas(words) {
			var len = words.length;
	
			if (len < 2) {
				return;
			}
	
			var totalCommas = 0;
			if (len > 3 && len <= 6) {
				totalCommas = randint(0, 1);
			} else if (len > 6 && len <= 12) {
				totalCommas = randint(0, 2);
			} else {
				totalCommas = randint(1, 4);
			}
	
			for (var i = 0, pos, word; i < totalCommas; i++) {
				pos = randint(0, words.length - 2);
				word = words[pos];
				if (word.charAt(word.length - 1) !== ',') {
					words[pos] += ',';
				}
			}
		}
		
		/**
		 * Generate a paragraph of "Lorem ipsum" text
		 * @param {Number} wordCount Words count in paragraph
		 * @param {Boolean} startWithCommon Should paragraph start with common 
		 * "lorem ipsum" sentence.
		 * @returns {String}
		 */
		function paragraph(lang, wordCount, startWithCommon) {
			var data = langs[lang];
			if (!data) {
				return '';
			}
	
			var result = [];
			var totalWords = 0;
			var words;
			
			wordCount = parseInt(wordCount, 10);
			
			if (startWithCommon && data.common) {
				words = data.common.slice(0, wordCount);
				if (words.length > 5) {
					words[4] += ',';
				}
				totalWords += words.length;
				result.push(sentence(words, '.'));
			}
			
			while (totalWords < wordCount) {
				words = sample(data.words, Math.min(randint(2, 30), wordCount - totalWords));
				totalWords += words.length;
				insertCommas(words);
				result.push(sentence(words));
			}
			
			return result.join(' ');
		}
	
		return {
			/**
			 * Adds new language words for Lorem Ipsum generator
			 * @param {String} lang Two-letter lang definition
			 * @param {Object} data Words for language. Maight be either a space-separated 
			 * list of words (String), Array of words or object with <code>text</code> and
			 * <code>common</code> properties
			 */
			addLang: function(lang, data) {
				if (typeof data === 'string') {
					data = {
						words: data.split(' ').filter(function(item) {
							return !!item;
						})
					};
				} else if (Array.isArray(data)) {
					data = {words: data};
				}
	
				langs[lang] = data;
			},
			preprocessor: function(tree) {
				var re = /^(?:lorem|lipsum)([a-z]{2})?(\d*)$/i, match;
				var allowCommon = !prefs.get('lorem.omitCommonPart');
				
				/** @param {AbbreviationNode} node */
				tree.findAll(function(node) {
					if (node._name && (match = node._name.match(re))) {
						var wordCound = match[2] || 30;
						var lang = match[1] || prefs.get('lorem.defaultLang') || 'en';
						
						// force node name resolving if node should be repeated
						// or contains attributes. In this case, node should be outputed
						// as tag, otherwise as text-only node
						node._name = '';
						node.data('forceNameResolving', node.isRepeating() || node.attributeList().length);
						node.data('pasteOverwrites', true);
						node.data('paste', function(i) {
							return paragraph(lang, wordCound, !i && allowCommon);
						});
					}
				});
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Pasted content abbreviation processor. A pasted content is a content that
	 * should be inserted into implicitly repeated abbreviation nodes.
	 * This processor powers “Wrap With Abbreviation” action
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var abbrUtils = __webpack_require__(55);
		var stringStream = __webpack_require__(56);
		var range = __webpack_require__(36);
	
		var outputPlaceholder = '$#';
		
		/**
		 * Locates output placeholders inside text
		 * @param {String} text
		 * @returns {Array} Array of ranges of output placeholder in text
		 */
		function locateOutputPlaceholder(text) {
			var result = [];
			
			var stream = stringStream.create(text);
			
			while (!stream.eol()) {
				if (stream.peek() == '\\') {
					stream.next();
				} else {
					stream.start = stream.pos;
					if (stream.match(outputPlaceholder, true)) {
						result.push(range.create(stream.start, outputPlaceholder));
						continue;
					}
				}
				stream.next();
			}
			
			return result;
		}
		
		/**
		 * Replaces output placeholders inside <code>source</code> with 
		 * <code>value</code>
		 * @param {String} source
		 * @param {String} value
		 * @returns {String}
		 */
		function replaceOutputPlaceholders(source, value) {
			var ranges = locateOutputPlaceholder(source);
			
			ranges.reverse().forEach(function(r) {
				source = utils.replaceSubstring(source, value, r);
			});
			
			return source;
		}
		
		/**
		 * Check if parsed node contains output placeholder – a target where
		 * pasted content should be inserted
		 * @param {AbbreviationNode} node
		 * @returns {Boolean}
		 */
		function hasOutputPlaceholder(node) {
			if (locateOutputPlaceholder(node.content).length)
				return true;
			
			// check if attributes contains placeholder
			return !!utils.find(node.attributeList(), function(attr) {
				return !!locateOutputPlaceholder(attr.value).length;
			});
		}
		
		/**
		 * Insert pasted content into correct positions of parsed node
		 * @param {AbbreviationNode} node
		 * @param {String} content
		 * @param {Boolean} overwrite Overwrite node content if no value placeholders
		 * found instead of appending to existing content
		 */
		function insertPastedContent(node, content, overwrite) {
			var nodesWithPlaceholders = node.findAll(function(item) {
				return hasOutputPlaceholder(item);
			});
			
			if (hasOutputPlaceholder(node))
				nodesWithPlaceholders.unshift(node);
			
			if (nodesWithPlaceholders.length) {
				nodesWithPlaceholders.forEach(function(item) {
					item.content = replaceOutputPlaceholders(item.content, content);
					item._attributes.forEach(function(attr) {
						attr.value = replaceOutputPlaceholders(attr.value, content);
					});
				});
			} else {
				// on output placeholders in subtree, insert content in the deepest
				// child node
				var deepest = node.deepestChild() || node;
				if (overwrite) {
					deepest.content = content;
				} else {
					deepest.content = abbrUtils.insertChildContent(deepest.content, content);
				}
			}
		}
	
		return {
			pastedContent: function(item) {
				var content = item.data('paste');
				if (Array.isArray(content)) {
					return content[item.counter - 1];
				} else if (typeof content === 'function') {
					return content(item.counter - 1, item.content);
				} else if (content) {
					return content;
				}
			},
	
			/**
			 * @param {AbbreviationNode} tree
			 * @param {Object} options
			 */
			preprocessor: function(tree, options) {
				if (options.pastedContent) {
					var lines = utils.splitByLines(options.pastedContent, true).map(utils.trim);
					
					// set repeat count for implicitly repeated elements before
					// tree is unrolled
					tree.findAll(function(item) {
						if (item.hasImplicitRepeat) {
							item.data('paste', lines);
							return item.repeatCount = lines.length;
						}
					});
				}
			},
	
			/**
			 * @param {AbbreviationNode} tree
			 * @param {Object} options
			 */
			postprocessor: function(tree, options) {
				var that = this;
				// for each node with pasted content, update text data
				var targets = tree.findAll(function(item) {
					var pastedContent = that.pastedContent(item);
					if (pastedContent) {
						insertPastedContent(item, pastedContent, !!item.data('pasteOverwrites'));
					}
					
					return !!pastedContent;
				});
				
				if (!targets.length && options.pastedContent) {
					// no implicitly repeated elements, put pasted content in
					// the deepest child
					insertPastedContent(tree, options.pastedContent);
				}
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Resolves tag names in abbreviations with implied name
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var tagName = __webpack_require__(91);
	
		/**
		 * Resolves implicit node names in parsed tree
		 * @param {AbbreviationNode} tree
		 */
		function resolveNodeNames(tree) {
			tree.children.forEach(function(node) {
				if (node.hasImplicitName() || node.data('forceNameResolving')) {
					node._name = tagName.resolve(node.parent.name());
					node.data('nameResolved', true);
				}
				resolveNodeNames(node);
			});
			
			return tree;
		}
	
		return {
			postprocessor: resolveNodeNames
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Processor function that matches parsed <code>AbbreviationNode</code>
	 * against resources defined in <code>resource</code> module
	 */ 
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var resources = __webpack_require__(27);
		var elements = __webpack_require__(64);
		var utils = __webpack_require__(22);
		var abbreviationUtils = __webpack_require__(55);
	
		/**
		 * Finds matched resources for child nodes of passed <code>node</code> 
		 * element. A matched resource is a reference to <i>snippets.json</i> entry
		 * that describes output of parsed node 
		 * @param {AbbreviationNode} node
		 * @param {String} syntax
		 */
		function matchResources(node, syntax, parser) {
			// do a shallow copy because the children list can be modified during
			// resource matching
			node.children.slice(0).forEach(function(child) {
				var r = resources.getMatchedResource(child, syntax);
				if (typeof r === 'string') {
					r = elements.create('snippet', r);
				}
	
				child.data('resource', r);
				var elemType = elements.type(r);
	
				if (elemType == 'snippet') {
					var content = r.data;
					var curContent = child._text || child.content;
					if (curContent) {
						content = abbreviationUtils.insertChildContent(content, curContent);
					}
	
					child.content = content;
				} else if (elemType == 'element') {
					child._name = r.name;
					if (Array.isArray(r.attributes)) {
						child._attributes = [].concat(r.attributes, child._attributes);
					}
				} else if (elemType == 'reference') {
					// it’s a reference to another abbreviation:
					// parse it and insert instead of current child
					/** @type AbbreviationNode */
					var subtree = parser.parse(r.data, {
						syntax: syntax
					});
	
					// if context element should be repeated, check if we need to 
					// transfer repeated element to specific child node
					if (child.repeatCount > 1) {
						var repeatedChildren = subtree.findAll(function(node) {
							return node.hasImplicitRepeat;
						});
	
						if (!repeatedChildren.length) {
							repeatedChildren = subtree.children
						}
						
						repeatedChildren.forEach(function(node) {
							node.repeatCount = child.repeatCount;
							node.hasImplicitRepeat = false;
						});
					}
	
					// move child‘s children into the deepest child of new subtree
					var deepestChild = subtree.deepestChild();
					if (deepestChild) {
						child.children.forEach(function(c) {
							deepestChild.addChild(c);
						});
						deepestChild.content = child.content;
					}
	
					// copy current attributes to children
					subtree.children.forEach(function(node) {
						child.attributeList().forEach(function(attr) {
							node.attribute(attr.name, attr.value);
						});
					});
					
					child.replace(subtree.children);
				}
				
				matchResources(child, syntax, parser);
			});
		}
		
		return {
			preprocessor: function(tree, options, parser) {
				var syntax = options.syntax || utils.defaultSyntax();
				matchResources(tree, syntax, parser);
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Resolves node attribute names: moves `default` attribute value
	 * from stub to real attribute.
	 *
	 * This resolver should be applied *after* resource matcher
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
	
		var findDefault = function(attr) {
			return attr.isDefault;
		};
	
		var findImplied = function(attr) {
			return attr.isImplied;
		};
	
		var findEmpty = function(attr) {
			return !attr.value;
		};
	
		function resolveDefaultAttrs(node, parser) {
			node.children.forEach(function(item) {
				var attrList = item.attributeList();
				var defaultAttrValue = item.attribute(parser.DEFAULT_ATTR_NAME);
				if (typeof defaultAttrValue !== 'undefined') {
					// remove stub attribute
					item.attribute(parser.DEFAULT_ATTR_NAME, null);
					
					if (attrList.length) {
						// target for default value:
						// 1. default attribute
						// 2. implied attribute
						// 3. first empty attribute
					
						// find attribute marked as default
						var defaultAttr = utils.find(attrList, findDefault) 
							|| utils.find(attrList, findImplied) 
							|| utils.find(attrList, findEmpty);
	
						if (defaultAttr) {
							var oldVal = item.attribute(defaultAttr.name);
							var newVal = utils.replaceUnescapedSymbol(oldVal, '|', defaultAttrValue);
							// no replacement, e.g. default value does not contains | symbol
							if (oldVal == newVal) {
								newVal = defaultAttrValue
							}
							
							item.attribute(defaultAttr.name, newVal);
						}
					}
				} else {
					// if no default attribute value, remove implied attributes
					attrList.forEach(function(attr) {
						if (attr.isImplied) {
							item.attribute(attr.name, null);
						}
					});
				}
	
				resolveDefaultAttrs(item, parser);
			});
		}
	
		return {
			/**
			 * @param  {AbbreviationNode} tree
			 * @param  {Object} options
			 * @param  {abbreviation} parser
			 */
			preprocessor: function(tree, options, parser) {
				resolveDefaultAttrs(tree, parser);
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * A preptocessor for &lt;a&gt; tag: tests wrapped content
	 * for common URL patterns and, if matched, inserts it as 
	 * `href` attribute
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var prefs = __webpack_require__(26);
		var utils = __webpack_require__(22);
		var pc = __webpack_require__(58);
	
		prefs.define('href.autodetect', true, 
			'Enables or disables automatic URL recognition when wrapping\
			text with <code>&lt;a&gt;</code> tag. With this option enabled,\
			if wrapped text matches URL or e-mail pattern it will be automatically\
			inserted into <code>href</code> attribute.');
		prefs.define('href.urlPattern', '^(?:(?:https?|ftp|file)://|www\\.|ftp\\.)(?:\\([-A-Z0-9+&@#/%=~_|$?!:,.]*\\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\\([-A-Z0-9+&@#/%=~_|$?!:,.]*\\)|[A-Z0-9+&@#/%=~_|$])', 
			'RegExp pattern to match wrapped URLs. Matched content will be inserts\
			as-is into <code>href</code> attribute, only whitespace will be trimmed.');
	
		prefs.define('href.emailPattern', '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$', 
			'RegExp pattern to match wrapped e-mails. Unlike <code>href.urlPattern</code>,\
			wrapped content will be prefixed with <code>mailto:</code> in <code>href</code>\
			attribute');
	
		return {
			/**
			 * @param {AbbreviationNode} tree
			 * @param {Object} options
			 */
			postprocessor: function(tree, options) {
				if (!prefs.get('href.autodetect')) {
					return;
				}
	
				var reUrl = new RegExp(prefs.get('href.urlPattern'), 'i');
				var reEmail = new RegExp(prefs.get('href.emailPattern'), 'i');
				var reProto = /^([a-z]+:)?\/\//i;
	
				tree.findAll(function(item) {
					if (item.name().toLowerCase() != 'a' || item.attribute('href')) {
						return;
					}
	
					var pastedContent = utils.trim(pc.pastedContent(item) || options.pastedContent);
					if (pastedContent) {
						if (reUrl.test(pastedContent)) {
							// do we have protocol?
							if (!reProto.test(pastedContent)) {
								pastedContent = 'http://' + pastedContent;
							}
	
							item.attribute('href', pastedContent);
						} else if (reEmail.test(pastedContent)) {
							item.attribute('href', 'mailto:' + pastedContent);
						}
					}
				});
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Utility module that provides ordered storage of function handlers. 
	 * Many Emmet modules' functionality can be extended/overridden by custom
	 * function. This modules provides unified storage of handler functions, their 
	 * management and execution
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		
		/**
		 * @type HandlerList
		 * @constructor
		 */
		function HandlerList() {
			this._list = [];
		}
		
		HandlerList.prototype = {
			/**
			 * Adds function handler
			 * @param {Function} fn Handler
			 * @param {Object} options Handler options. Possible values are:<br><br>
			 * <b>order</b> : (<code>Number</code>) – order in handler list. Handlers
			 * with higher order value will be executed earlier.
			 */
			add: function(fn, options) {
				// TODO hack for stable sort, remove after fixing `list()`
				var order = this._list.length;
				if (options && 'order' in options) {
					order = options.order * 10000;
				}
				this._list.push(utils.extend({}, options, {order: order, fn: fn}));
			},
			
			/**
			 * Removes handler from list
			 * @param {Function} fn
			 */
			remove: function(fn) {
				var item = utils.find(this._list, function(item) {
					return item.fn === fn;
				});
				if (item) {
					this._list.splice(this._list.indexOf(item), 1);
				}
			},
			
			/**
			 * Returns ordered list of handlers. By default, handlers 
			 * with the same <code>order</code> option returned in reverse order, 
			 * i.e. the latter function was added into the handlers list, the higher 
			 * it will be in the returned array 
			 * @returns {Array}
			 */
			list: function() {
				// TODO make stable sort
				return this._list.sort(function(a, b) {
					return b.order - a.order;
				});
			},
			
			/**
			 * Returns ordered list of handler functions
			 * @returns {Array}
			 */
			listFn: function() {
				return this.list().map(function(item) {
					return item.fn;
				});
			},
			
			/**
			 * Executes handler functions in their designated order. If function
			 * returns <code>skipVal</code>, meaning that function was unable to 
			 * handle passed <code>args</code>, the next function will be executed
			 * and so on.
			 * @param {Object} skipValue If function returns this value, execute 
			 * next handler.
			 * @param {Array} args Arguments to pass to handler function
			 * @returns {Boolean} Whether any of registered handlers performed
			 * successfully  
			 */
			exec: function(skipValue, args) {
				args = args || [];
				var result = null;
				utils.find(this.list(), function(h) {
					result = h.fn.apply(h, args);
					if (result !== skipValue) {
						return true;
					}
				});
				
				return result;
			}
		};
		
		return {
			/**
			 * Factory method that produces <code>HandlerList</code> instance
			 * @returns {HandlerList}
			 * @memberOf handlerList
			 */
			create: function() {
				return new HandlerList();
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/**
	 * Module that contains factories for element types used by Emmet
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var factories = {};
		var reAttrs = /([@\!]?)([\w\-:]+)\s*=\s*(['"])(.*?)\3/g;
	
		// register resource references
		function commonFactory(value) {
			return {data: value};
		}
	
		module = module || {};
		module.exports = {
			/**
			 * Create new element factory
			 * @param {String} name Element identifier
			 * @param {Function} factory Function that produces element of specified 
			 * type. The object generated by this factory is automatically 
			 * augmented with <code>type</code> property pointing to element
			 * <code>name</code>
			 * @memberOf elements
			 */
			add: function(name, factory) {
				var that = this;
				factories[name] = function() {
					var elem = factory.apply(that, arguments);
					if (elem)
						elem.type = name;
					
					return elem;
				};
			},
			
			/**
			 * Returns factory for specified name
			 * @param {String} name
			 * @returns {Function}
			 */
			get: function(name) {
				return factories[name];
			},
			
			/**
			 * Creates new element with specified type
			 * @param {String} name
			 * @returns {Object}
			 */
			create: function(name) {
				var args = [].slice.call(arguments, 1);
				var factory = this.get(name);
				return factory ? factory.apply(this, args) : null;
			},
			
			/**
			 * Check if passed element is of specified type
			 * @param {Object} elem
			 * @param {String} type
			 * @returns {Boolean}
			 */
			is: function(elem, type) {
				return this.type(elem) === type;
			},
	
			/**
			 * Returns type of element
			 * @param  {Object} elem
			 * @return {String}
			 */
			type: function(elem) {
				return elem && elem.type;
			}
		};
		
		/**
		 * Element factory
		 * @param {String} elementName Name of output element
		 * @param {String} attrs Attributes definition. You may also pass
		 * <code>Array</code> where each contains object with <code>name</code> 
		 * and <code>value</code> properties, or <code>Object</code>
		 * @param {Boolean} isEmpty Is expanded element should be empty
		 */
		module.exports.add('element', function(elementName, attrs, isEmpty) {
			var ret = {
				name: elementName,
				is_empty: !!isEmpty
			};
	
			if (attrs) {
				ret.attributes = [];
				if (Array.isArray(attrs)) {
					ret.attributes = attrs;
				} else if (typeof attrs === 'string') {
					var m;
					while ((m = reAttrs.exec(attrs))) {
						ret.attributes.push({
							name: m[2],
							value: m[4],
							isDefault: m[1] == '@',
							isImplied: m[1] == '!'
						});
					}
				} else {
					ret.attributes = Object.keys(attrs).map(function(name) {
						return {
							name: name, 
							value: attrs[name]
						};
					});
				}
			}
			
			return ret;
		});
		
		module.exports.add('snippet', commonFactory);
		module.exports.add('reference', commonFactory);
		module.exports.add('empty', function() {
			return {};
		});
		
		return module.exports;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105)(module)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * string_score.js: String Scoring Algorithm 0.1.10 
	 *
	 * http://joshaven.com/string_score
	 * https://github.com/joshaven/string_score
	 *
	 * Copyright (C) 2009-2011 Joshaven Potter <yourtech@gmail.com>
	 * Special thanks to all of the contributors listed here https://github.com/joshaven/string_score
	 * MIT license: http://www.opensource.org/licenses/mit-license.php
	 *
	 * Date: Tue Mar 1 2011
	*/
	
	/**
	 * Scores a string against another string.
	 *  'Hello World'.score('he');     //=> 0.5931818181818181
	 *  'Hello World'.score('Hello');  //=> 0.7318181818181818
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		return {
			score: function(string, abbreviation, fuzziness) {
				// If the string is equal to the abbreviation, perfect match.
				  if (string == abbreviation) {return 1;}
				  //if it's not a perfect match and is empty return 0
				  if(abbreviation == "") {return 0;}
	
				  var total_character_score = 0,
				      abbreviation_length = abbreviation.length,
				      string_length = string.length,
				      start_of_string_bonus,
				      abbreviation_score,
				      fuzzies=1,
				      final_score;
				  
				  // Walk through abbreviation and add up scores.
				  for (var i = 0,
				         character_score/* = 0*/,
				         index_in_string/* = 0*/,
				         c/* = ''*/,
				         index_c_lowercase/* = 0*/,
				         index_c_uppercase/* = 0*/,
				         min_index/* = 0*/;
				     i < abbreviation_length;
				     ++i) {
				    
				    // Find the first case-insensitive match of a character.
				    c = abbreviation.charAt(i);
				    
				    index_c_lowercase = string.indexOf(c.toLowerCase());
				    index_c_uppercase = string.indexOf(c.toUpperCase());
				    min_index = Math.min(index_c_lowercase, index_c_uppercase);
				    index_in_string = (min_index > -1) ? min_index : Math.max(index_c_lowercase, index_c_uppercase);
				    
				    if (index_in_string === -1) { 
				      if (fuzziness) {
				        fuzzies += 1-fuzziness;
				        continue;
				      } else {
				        return 0;
				      }
				    } else {
				      character_score = 0.1;
				    }
				    
				    // Set base score for matching 'c'.
				    
				    // Same case bonus.
				    if (string[index_in_string] === c) { 
				      character_score += 0.1; 
				    }
				    
				    // Consecutive letter & start-of-string Bonus
				    if (index_in_string === 0) {
				      // Increase the score when matching first character of the remainder of the string
				      character_score += 0.6;
				      if (i === 0) {
				        // If match is the first character of the string
				        // & the first character of abbreviation, add a
				        // start-of-string match bonus.
				        start_of_string_bonus = 1; //true;
				      }
				    }
				    else {
				  // Acronym Bonus
				  // Weighing Logic: Typing the first character of an acronym is as if you
				  // preceded it with two perfect character matches.
				  if (string.charAt(index_in_string - 1) === ' ') {
				    character_score += 0.8; // * Math.min(index_in_string, 5); // Cap bonus at 0.4 * 5
				  }
				    }
				    
				    // Left trim the already matched part of the string
				    // (forces sequential matching).
				    string = string.substring(index_in_string + 1, string_length);
				    
				    total_character_score += character_score;
				  } // end of for loop
				  
				  // Uncomment to weigh smaller words higher.
				  // return total_character_score / string_length;
				  
				  abbreviation_score = total_character_score / abbreviation_length;
				  //percentage_of_matched_string = abbreviation_length / string_length;
				  //word_score = abbreviation_score * percentage_of_matched_string;
				  
				  // Reduce penalty for longer strings.
				  //final_score = (word_score + abbreviation_score) / 2;
				  final_score = ((abbreviation_score * (abbreviation_length / string_length)) + abbreviation_score) / 2;
				  
				  final_score = final_score / fuzzies;
				  
				  if (start_of_string_bonus && (final_score + 0.15 < 1)) {
				    final_score += 0.15;
				  }
				  
				  return final_score;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/**
	 * Resolver for fast CSS typing. Handles abbreviations with the following 
	 * notation:<br>
	 * 
	 * <code>(-vendor prefix)?property(value)*(!)?</code>
	 * 
	 * <br><br>
	 * <b>Abbreviation handling</b><br>
	 * 
	 * By default, Emmet searches for matching snippet definition for provided abbreviation.
	 * If snippet wasn't found, Emmet automatically generates element with 
	 * abbreviation's name. For example, <code>foo</code> abbreviation will generate
	 * <code>&lt;foo&gt;&lt;/foo&gt;</code> output.
	 * <br><br>
	 * This module will capture all expanded properties and upgrade them with values, 
	 * vendor prefixes and !important declarations. All unmatched abbreviations will 
	 * be automatically transformed into <code>property-name: ${1}</code> snippets. 
	 * 
	 * <b>Vendor prefixes<b><br>
	 * 
	 * If CSS-property is preceded with dash, resolver should output property with
	 * all <i>known</i> vendor prefixes. For example, if <code>brad</code> 
	 * abbreviation generates <code>border-radius: ${value};</code> snippet,
	 * the <code>-brad</code> abbreviation should generate:
	 * <pre><code>
	 * -webkit-border-radius: ${value};
	 * -moz-border-radius: ${value};
	 * border-radius: ${value};
	 * </code></pre>
	 * Note that <i>o</i> and <i>ms</i> prefixes are omitted since Opera and IE 
	 * supports unprefixed property.<br><br>
	 * 
	 * Users can also provide an explicit list of one-character prefixes for any
	 * CSS property. For example, <code>-wm-float</code> will produce
	 * 
	 * <pre><code>
	 * -webkit-float: ${1};
	 * -moz-float: ${1};
	 * float: ${1};
	 * </code></pre>
	 * 
	 * Although this example looks pointless, users can use this feature to write
	 * cutting-edge properties implemented by browser vendors recently.  
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var prefs = __webpack_require__(26);
		var resources = __webpack_require__(27);
		var stringStream = __webpack_require__(56);
		var ciu = __webpack_require__(29);
		var utils = __webpack_require__(22);
		var template = __webpack_require__(97);
		var cssEditTree = __webpack_require__(71);
	
		var prefixObj = {
			/** Real vendor prefix name */
			prefix: 'emmet',
			
			/** 
			 * Indicates this prefix is obsolete and should't be used when user 
			 * wants to generate all-prefixed properties
			 */
			obsolete: false,
			
			/**
			 * Returns prefixed CSS property name
			 * @param {String} name Unprefixed CSS property
			 */
			transformName: function(name) {
				return '-' + this.prefix + '-' + name;
			},
			
			/**
			 * List of unprefixed CSS properties that supported by 
			 * current prefix. This list is used to generate all-prefixed property
			 * @returns {Array} 
			 */
			properties: function() {
				return getProperties('css.' + this.prefix + 'Properties') || [];
			},
			
			/**
			 * Check if given property is supported by current prefix
			 * @param name
			 */
			supports: function(name) {
				return ~this.properties().indexOf(name);
			}
		};
		
		
		/** 
		 * List of registered one-character prefixes. Key is a one-character prefix, 
		 * value is an <code>prefixObj</code> object
		 */
		var vendorPrefixes = {};
		
		var defaultValue = '${1};';
		
		// XXX module preferences
		prefs.define('css.valueSeparator', ': ',
				'Defines a symbol that should be placed between CSS property and ' 
				+ 'value when expanding CSS abbreviations.');
		prefs.define('css.propertyEnd', ';',
				'Defines a symbol that should be placed at the end of CSS property  ' 
				+ 'when expanding CSS abbreviations.');
		
		prefs.define('stylus.valueSeparator', ' ',
				'Defines a symbol that should be placed between CSS property and ' 
				+ 'value when expanding CSS abbreviations in Stylus dialect.');
		prefs.define('stylus.propertyEnd', '',
				'Defines a symbol that should be placed at the end of CSS property  ' 
				+ 'when expanding CSS abbreviations in Stylus dialect.');
		
		prefs.define('sass.propertyEnd', '',
				'Defines a symbol that should be placed at the end of CSS property  ' 
				+ 'when expanding CSS abbreviations in SASS dialect.');
	
		prefs.define('css.syntaxes', 'css, less, sass, scss, stylus, styl',
				'List of syntaxes that should be treated as CSS dialects.');
		
		prefs.define('css.autoInsertVendorPrefixes', true,
				'Automatically generate vendor-prefixed copies of expanded CSS ' 
				+ 'property. By default, Emmet will generate vendor-prefixed '
				+ 'properties only when you put dash before abbreviation ' 
				+ '(e.g. <code>-bxsh</code>). With this option enabled, you don’t ' 
				+ 'need dashes before abbreviations: Emmet will produce ' 
				+ 'vendor-prefixed properties for you.');
	
		prefs.define('less.autoInsertVendorPrefixes', false, 'Same as <code>css.autoInsertVendorPrefixes</code> but for LESS syntax');
		prefs.define('scss.autoInsertVendorPrefixes', false, 'Same as <code>css.autoInsertVendorPrefixes</code> but for SCSS syntax');
		prefs.define('sass.autoInsertVendorPrefixes', false, 'Same as <code>css.autoInsertVendorPrefixes</code> but for SASS syntax');
		prefs.define('stylus.autoInsertVendorPrefixes', false, 'Same as <code>css.autoInsertVendorPrefixes</code> but for Stylus syntax');
		
		var descTemplate = template('A comma-separated list of CSS properties that may have ' 
			+ '<code><%= vendor %></code> vendor prefix. This list is used to generate '
			+ 'a list of prefixed properties when expanding <code>-property</code> '
			+ 'abbreviations. Empty list means that all possible CSS values may ' 
			+ 'have <code><%= vendor %></code> prefix.');
		
		var descAddonTemplate = template('A comma-separated list of <em>additional</em> CSS properties ' 
				+ 'for <code>css.<%= vendor %>Preperties</code> preference. ' 
				+ 'You should use this list if you want to add or remove a few CSS ' 
				+ 'properties to original set. To add a new property, simply write its name, '
				+ 'to remove it, precede property with hyphen.<br>'
				+ 'For example, to add <em>foo</em> property and remove <em>border-radius</em> one, '
				+ 'the preference value will look like this: <code>foo, -border-radius</code>.');
		
		// properties list is created from cssFeatures.html file
		var props = {
			'webkit': 'animation, animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, appearance, backface-visibility, background-clip, background-composite, background-origin, background-size, border-fit, border-horizontal-spacing, border-image, border-vertical-spacing, box-align, box-direction, box-flex, box-flex-group, box-lines, box-ordinal-group, box-orient, box-pack, box-reflect, box-shadow, color-correction, column-break-after, column-break-before, column-break-inside, column-count, column-gap, column-rule-color, column-rule-style, column-rule-width, column-span, column-width, dashboard-region, font-smoothing, highlight, hyphenate-character, hyphenate-limit-after, hyphenate-limit-before, hyphens, line-box-contain, line-break, line-clamp, locale, margin-before-collapse, margin-after-collapse, marquee-direction, marquee-increment, marquee-repetition, marquee-style, mask-attachment, mask-box-image, mask-box-image-outset, mask-box-image-repeat, mask-box-image-slice, mask-box-image-source, mask-box-image-width, mask-clip, mask-composite, mask-image, mask-origin, mask-position, mask-repeat, mask-size, nbsp-mode, perspective, perspective-origin, rtl-ordering, text-combine, text-decorations-in-effect, text-emphasis-color, text-emphasis-position, text-emphasis-style, text-fill-color, text-orientation, text-security, text-stroke-color, text-stroke-width, transform, transition, transform-origin, transform-style, transition-delay, transition-duration, transition-property, transition-timing-function, user-drag, user-modify, user-select, writing-mode, svg-shadow, box-sizing, border-radius',
			'moz': 'animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, appearance, backface-visibility, background-inline-policy, binding, border-bottom-colors, border-image, border-left-colors, border-right-colors, border-top-colors, box-align, box-direction, box-flex, box-ordinal-group, box-orient, box-pack, box-shadow, box-sizing, column-count, column-gap, column-rule-color, column-rule-style, column-rule-width, column-width, float-edge, font-feature-settings, font-language-override, force-broken-image-icon, hyphens, image-region, orient, outline-radius-bottomleft, outline-radius-bottomright, outline-radius-topleft, outline-radius-topright, perspective, perspective-origin, stack-sizing, tab-size, text-blink, text-decoration-color, text-decoration-line, text-decoration-style, text-size-adjust, transform, transform-origin, transform-style, transition, transition-delay, transition-duration, transition-property, transition-timing-function, user-focus, user-input, user-modify, user-select, window-shadow, background-clip, border-radius',
			'ms': 'accelerator, backface-visibility, background-position-x, background-position-y, behavior, block-progression, box-align, box-direction, box-flex, box-line-progression, box-lines, box-ordinal-group, box-orient, box-pack, content-zoom-boundary, content-zoom-boundary-max, content-zoom-boundary-min, content-zoom-chaining, content-zoom-snap, content-zoom-snap-points, content-zoom-snap-type, content-zooming, filter, flow-from, flow-into, font-feature-settings, grid-column, grid-column-align, grid-column-span, grid-columns, grid-layer, grid-row, grid-row-align, grid-row-span, grid-rows, high-contrast-adjust, hyphenate-limit-chars, hyphenate-limit-lines, hyphenate-limit-zone, hyphens, ime-mode, interpolation-mode, layout-flow, layout-grid, layout-grid-char, layout-grid-line, layout-grid-mode, layout-grid-type, line-break, overflow-style, perspective, perspective-origin, perspective-origin-x, perspective-origin-y, scroll-boundary, scroll-boundary-bottom, scroll-boundary-left, scroll-boundary-right, scroll-boundary-top, scroll-chaining, scroll-rails, scroll-snap-points-x, scroll-snap-points-y, scroll-snap-type, scroll-snap-x, scroll-snap-y, scrollbar-arrow-color, scrollbar-base-color, scrollbar-darkshadow-color, scrollbar-face-color, scrollbar-highlight-color, scrollbar-shadow-color, scrollbar-track-color, text-align-last, text-autospace, text-justify, text-kashida-space, text-overflow, text-size-adjust, text-underline-position, touch-action, transform, transform-origin, transform-origin-x, transform-origin-y, transform-origin-z, transform-style, transition, transition-delay, transition-duration, transition-property, transition-timing-function, user-select, word-break, wrap-flow, wrap-margin, wrap-through, writing-mode',
			'o': 'dashboard-region, animation, animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, border-image, link, link-source, object-fit, object-position, tab-size, table-baseline, transform, transform-origin, transition, transition-delay, transition-duration, transition-property, transition-timing-function, accesskey, input-format, input-required, marquee-dir, marquee-loop, marquee-speed, marquee-style'
		};
		
		Object.keys(props).forEach(function(k) {
			prefs.define('css.' + k + 'Properties', props[k], descTemplate({vendor: k}));
			prefs.define('css.' + k + 'PropertiesAddon', '', descAddonTemplate({vendor: k}));
		});
		
		prefs.define('css.unitlessProperties', 'z-index, line-height, opacity, font-weight, zoom', 
				'The list of properties whose values ​​must not contain units.');
		
		prefs.define('css.intUnit', 'px', 'Default unit for integer values');
		prefs.define('css.floatUnit', 'em', 'Default unit for float values');
		
		prefs.define('css.keywords', 'auto, inherit, all', 
				'A comma-separated list of valid keywords that can be used in CSS abbreviations.');
		
		prefs.define('css.keywordAliases', 'a:auto, i:inherit, s:solid, da:dashed, do:dotted, t:transparent', 
				'A comma-separated list of keyword aliases, used in CSS abbreviation. '
				+ 'Each alias should be defined as <code>alias:keyword_name</code>.');
		
		prefs.define('css.unitAliases', 'e:em, p:%, x:ex, r:rem', 
				'A comma-separated list of unit aliases, used in CSS abbreviation. '
				+ 'Each alias should be defined as <code>alias:unit_value</code>.');
		
		prefs.define('css.color.short', true, 
				'Should color values like <code>#ffffff</code> be shortened to '
				+ '<code>#fff</code> after abbreviation with color was expanded.');
		
		prefs.define('css.color.case', 'keep', 
				'Letter case of color values generated by abbreviations with color '
				+ '(like <code>c#0</code>). Possible values are <code>upper</code>, '
				+ '<code>lower</code> and <code>keep</code>.');
		
		prefs.define('css.fuzzySearch', true, 
				'Enable fuzzy search among CSS snippet names. When enabled, every ' 
				+ '<em>unknown</em> snippet will be scored against available snippet '
				+ 'names (not values or CSS properties!). The match with best score '
				+ 'will be used to resolve snippet value. For example, with this ' 
				+ 'preference enabled, the following abbreviations are equal: '
				+ '<code>ov:h</code> == <code>ov-h</code> == <code>o-h</code> == '
				+ '<code>oh</code>');
		
		prefs.define('css.fuzzySearchMinScore', 0.3, 
				'The minium score (from 0 to 1) that fuzzy-matched abbreviation should ' 
				+ 'achive. Lower values may produce many false-positive matches, '
				+ 'higher values may reduce possible matches.');
		
		prefs.define('css.alignVendor', false, 
				'If set to <code>true</code>, all generated vendor-prefixed properties ' 
				+ 'will be aligned by real property name.');
		
		
		function isNumeric(ch) {
			var code = ch && ch.charCodeAt(0);
			return (ch && ch == '.' || (code > 47 && code < 58));
		}
		
		/**
		 * Check if provided snippet contains only one CSS property and value.
		 * @param {String} snippet
		 * @returns {Boolean}
		 */
		function isSingleProperty(snippet) {
			snippet = utils.trim(snippet);
			
			// check if it doesn't contain a comment and a newline
			if (/\/\*|\n|\r/.test(snippet)) {
				return false;
			}
			
			// check if it's a valid snippet definition
			if (!/^[a-z0-9\-]+\s*\:/i.test(snippet)) {
				return false;
			}
			
			return snippet.replace(/\$\{.+?\}/g, '').split(':').length == 2;
		}
		
		/**
		 * Normalizes abbreviated value to final CSS one
		 * @param {String} value
		 * @returns {String}
		 */
		function normalizeValue(value) {
			if (value.charAt(0) == '-' && !/^\-[\.\d]/.test(value)) {
				value = value.replace(/^\-+/, '');
			}
			
			var ch = value.charAt(0);
			if (ch == '#') {
				return normalizeHexColor(value);
			}
	
			if (ch == '$') {
				return utils.escapeText(value);
			}
	
			return getKeyword(value);
		}
		
		function normalizeHexColor(value) {
			var hex = value.replace(/^#+/, '') || '0';
			if (hex.toLowerCase() == 't') {
				return 'transparent';
			}
	
			var opacity = '';
			hex = hex.replace(/\.(\d+)$/, function(str) {
				opacity = '0' + str;
				return '';
			});
			
			var repeat = utils.repeatString;
			var color = null;
			switch (hex.length) {
				case 1:
					color = repeat(hex, 6);
					break;
				case 2:
					color = repeat(hex, 3);
					break;
				case 3:
					color = hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
					break;
				case 4:
					color = hex + hex.substr(0, 2);
					break;
				case 5:
					color = hex + hex.charAt(0);
					break;
				default:
					color = hex.substr(0, 6);
			}
	
			if (opacity) {
				return toRgba(color, opacity);
			}
			
			// color must be shortened?
			if (prefs.get('css.color.short')) {
				var p = color.split('');
				if (p[0] == p[1] && p[2] == p[3] && p[4] == p[5]) {
					color = p[0] + p[2] + p[4];
				}
			}
			
			// should transform case?
			switch (prefs.get('css.color.case')) {
				case 'upper':
					color = color.toUpperCase();
					break;
				case 'lower':
					color = color.toLowerCase();
					break;
			}
			
			return '#' + color;
		}
	
		/**
		 * Transforms HEX color definition into RGBA one
		 * @param  {String} color   HEX color, 6 characters
		 * @param  {String} opacity Opacity value
		 * @return {String}
		 */
		function toRgba(color, opacity) {
			var r = parseInt(color.substr(0, 2), 16);
			var g = parseInt(color.substr(2, 2), 16);
			var b = parseInt(color.substr(4, 2), 16);
	
			return 'rgba(' + [r, g, b, opacity].join(', ') + ')';
		}
		
		function getKeyword(name) {
			var aliases = prefs.getDict('css.keywordAliases');
			return name in aliases ? aliases[name] : name;
		}
		
		function getUnit(name) {
			var aliases = prefs.getDict('css.unitAliases');
			return name in aliases ? aliases[name] : name;
		}
		
		function isValidKeyword(keyword) {
			return ~prefs.getArray('css.keywords').indexOf(getKeyword(keyword));
		}
		
		/**
		 * Check if passed CSS property support specified vendor prefix 
		 * @param {String} property
		 * @param {String} prefix
		 */
		function hasPrefix(property, prefix) {
			var info = vendorPrefixes[prefix];
			
			if (!info)
				info = utils.find(vendorPrefixes, function(data) {
					return data.prefix == prefix;
				});
			
			return info && info.supports(property);
		}
	
		/**
		 * Finds available vendor prefixes for given CSS property.
		 * Search is performed within Can I Use database and internal
		 * property list
		 * @param  {String} property CSS property name
		 * @return {Array} Array of resolved prefixes or null if
		 * prefixes are not available for this property at all.
		 * Empty array means prefixes are not available for current
		 * user-define era
		 */
		function findVendorPrefixes(property) {
			var prefixes = ciu.resolvePrefixes(property);
			if (!prefixes) {
				// Can I Use database is disabled or prefixes are not
				// available for this property
				prefixes = [];
				Object.keys(vendorPrefixes).forEach(function(key) {
					if (hasPrefix(property, key)) {
						prefixes.push(vendorPrefixes[key].prefix);
					}
				});
	
				if (!prefixes.length) {
					prefixes = null;
				}
			}
	
			return prefixes;
		}
		
		/**
		 * Search for a list of supported prefixes for CSS property. This list
		 * is used to generate all-prefixed snippet
		 * @param {String} property CSS property name
		 * @returns {Array}
		 */
		function findInternalPrefixes(property, noAutofill) {
			var result = [];
			var prefixes = findVendorPrefixes(property);
			
			if (prefixes) {
				var prefixMap = {};
				Object.keys(vendorPrefixes).forEach(function(key) {
					prefixMap[vendorPrefixes[key].prefix] = key;
				});
	
				result = prefixes.map(function(prefix) {
					return prefixMap[prefix];
				});
			}
			
			if (!result.length && !noAutofill) {
				// add all non-obsolete prefixes
				Object.keys(vendorPrefixes).forEach(function(prefix) {
					if (!vendorPrefixes[prefix].obsolete) {
						result.push(prefix);
					}
				});
			}
			
			return result;
		}
		
		function addPrefix(name, obj) {
			if (typeof obj === 'string') {
				obj = {prefix: obj};
			}
			
			vendorPrefixes[name] = utils.extend({}, prefixObj, obj);
		}
		
		function getSyntaxPreference(name, syntax) {
			if (syntax) {
				// hacky alias for Stylus dialect
				if (syntax == 'styl') {
					syntax = 'stylus';
				}
	
				var val = prefs.get(syntax + '.' + name);
				if (typeof val !== 'undefined') {
					return val;
				}
			}
			
			return prefs.get('css.' + name);
		}
		
		/**
		 * Format CSS property according to current syntax dialect
		 * @param {String} property
		 * @param {String} syntax
		 * @returns {String}
		 */
		function formatProperty(property, syntax) {
			var ix = property.indexOf(':');
			property = property.substring(0, ix).replace(/\s+$/, '') 
				+ getSyntaxPreference('valueSeparator', syntax)
				+ utils.trim(property.substring(ix + 1));
			
			return property.replace(/\s*;\s*$/, getSyntaxPreference('propertyEnd', syntax));
		}
		
		/**
		 * Transforms snippet value if required. For example, this transformation
		 * may add <i>!important</i> declaration to CSS property
		 * @param {String} snippet
		 * @param {Boolean} isImportant
		 * @returns {String}
		 */
		function transformSnippet(snippet, isImportant, syntax) {
			if (typeof snippet !== 'string') {
				snippet = snippet.data;
			}
			
			if (!isSingleProperty(snippet)) {
				return snippet;
			}
			
			if (isImportant) {
				if (~snippet.indexOf(';')) {
					snippet = snippet.split(';').join(' !important;');
				} else {
					snippet += ' !important';
				}
			}
			
			return formatProperty(snippet, syntax);
		}
		
		function getProperties(key) {
			var list = prefs.getArray(key);
			var addon = prefs.getArray(key + 'Addon');
			if (addon) {
				addon.forEach(function(prop) {
					if (prop.charAt(0) == '-') {
						list = utils.without(list, prop.substr(1));
					} else {
						if (prop.charAt(0) == '+')
							prop = prop.substr(1);
						
						list.push(prop);
					}
				});
			}
			
			return list;
		}
	
		/**
		 * Tries to produce properties with vendor-prefixed value
		 * @param  {Object} snippetObj Parsed snippet object
		 * @return {Array} Array of properties with prefixed values
		 */
		function resolvePrefixedValues(snippetObj, isImportant, syntax) {
			var prefixes = [];
			var lookup = {};
	
			var parts = cssEditTree.findParts(snippetObj.value);
			parts.reverse();
			parts.forEach(function(p) {
				var partValue = p.substring(snippetObj.value);
				(findVendorPrefixes(partValue) || []).forEach(function(prefix) {
					if (!lookup[prefix]) {
						lookup[prefix] = snippetObj.value;
						prefixes.push(prefix);
					}
	
					lookup[prefix] = utils.replaceSubstring(lookup[prefix], '-' + prefix + '-' + partValue, p);
				});
			});
	
			return prefixes.map(function(prefix) {
				return transformSnippet(snippetObj.name + ':' + lookup[prefix], isImportant, syntax);
			});
		}
		
		
		// TODO refactor, this looks awkward now
		addPrefix('w', {
			prefix: 'webkit'
		});
		addPrefix('m', {
			prefix: 'moz'
		});
		addPrefix('s', {
			prefix: 'ms'
		});
		addPrefix('o', {
			prefix: 'o'
		});
		
		
		module = module || {};
		module.exports = {
			/**
			 * Adds vendor prefix
			 * @param {String} name One-character prefix name
			 * @param {Object} obj Object describing vendor prefix
			 * @memberOf cssResolver
			 */
			addPrefix: addPrefix,
			
			/**
			 * Check if passed CSS property supports specified vendor prefix
			 * @param {String} property
			 * @param {String} prefix
			 */
			supportsPrefix: hasPrefix,
	
			resolve: function(node, syntax) {
				var cssSyntaxes = prefs.getArray('css.syntaxes');
				if (cssSyntaxes && ~cssSyntaxes.indexOf(syntax) && node.isElement()) {
					return this.expandToSnippet(node.abbreviation, syntax);
				}
				
				return null;
			},
	
			/**
			 * Returns prefixed version of passed CSS property, only if this
			 * property supports such prefix
			 * @param {String} property
			 * @param {String} prefix
			 * @returns
			 */
			prefixed: function(property, prefix) {
				return hasPrefix(property, prefix) 
					? '-' + prefix + '-' + property 
					: property;
			},
			
			/**
			 * Returns list of all registered vendor prefixes
			 * @returns {Array}
			 */
			listPrefixes: function() {
				return vendorPrefixes.map(function(obj) {
					return obj.prefix;
				});
			},
			
			/**
			 * Returns object describing vendor prefix
			 * @param {String} name
			 * @returns {Object}
			 */
			getPrefix: function(name) {
				return vendorPrefixes[name];
			},
			
			/**
			 * Removes prefix object
			 * @param {String} name
			 */
			removePrefix: function(name) {
				if (name in vendorPrefixes)
					delete vendorPrefixes[name];
			},
			
			/**
			 * Extract vendor prefixes from abbreviation
			 * @param {String} abbr
			 * @returns {Object} Object containing array of prefixes and clean 
			 * abbreviation name
			 */
			extractPrefixes: function(abbr) {
				if (abbr.charAt(0) != '-') {
					return {
						property: abbr,
						prefixes: null
					};
				}
				
				// abbreviation may either contain sequence of one-character prefixes
				// or just dash, meaning that user wants to produce all possible
				// prefixed properties
				var i = 1, il = abbr.length, ch;
				var prefixes = [];
				
				while (i < il) {
					ch = abbr.charAt(i);
					if (ch == '-') {
						// end-sequence character found, stop searching
						i++;
						break;
					}
					
					if (ch in vendorPrefixes) {
						prefixes.push(ch);
					} else {
						// no prefix found, meaning user want to produce all
						// vendor-prefixed properties
						prefixes.length = 0;
						i = 1;
						break;
					}
					
					i++;
				}
				
				// reached end of abbreviation and no property name left
				if (i == il -1) {
					i = 1;
					prefixes.length = 1;
				}
				
				return {
					property: abbr.substring(i),
					prefixes: prefixes.length ? prefixes : 'all'
				};
			},
			
			/**
			 * Search for value substring in abbreviation
			 * @param {String} abbr
			 * @returns {String} Value substring
			 */
			findValuesInAbbreviation: function(abbr, syntax) {
				syntax = syntax || 'css';
				
				var i = 0, il = abbr.length, value = '', ch;
				while (i < il) {
					ch = abbr.charAt(i);
					if (isNumeric(ch) || ch == '#' || ch == '$' || (ch == '-' && isNumeric(abbr.charAt(i + 1)))) {
						value = abbr.substring(i);
						break;
					}
					
					i++;
				}
				
				// try to find keywords in abbreviation
				var property = abbr.substring(0, abbr.length - value.length);
				var keywords = [];
				// try to extract some commonly-used properties
				while (~property.indexOf('-') && !resources.findSnippet(syntax, property)) {
					var parts = property.split('-');
					var lastPart = parts.pop();
					if (!isValidKeyword(lastPart)) {
						break;
					}
					
					keywords.unshift(lastPart);
					property = parts.join('-');
				}
	
				return keywords.join('-') + value;
			},
			
			parseValues: function(str) {
				/** @type StringStream */
				var stream = stringStream.create(str);
				var values = [];
				var ch = null;
				
				while ((ch = stream.next())) {
					if (ch == '$') {
						stream.match(/^[^\$]+/, true);
						values.push(stream.current());
					} else if (ch == '#') {
						stream.match(/^t|[0-9a-f]+(\.\d+)?/i, true);
						values.push(stream.current());
					} else if (ch == '-') {
						if (isValidKeyword(utils.last(values)) || 
								( stream.start && isNumeric(str.charAt(stream.start - 1)) )
							) {
							stream.start = stream.pos;
						}
						
						stream.match(/^\-?[0-9]*(\.[0-9]+)?[a-z%\.]*/, true);
						values.push(stream.current());
					} else {
						stream.match(/^[0-9]*(\.[0-9]*)?[a-z%]*/, true);
						values.push(stream.current());
					}
					
					stream.start = stream.pos;
				}
				
				return values
					.filter(function(item) {
						return !!item;
					})
					.map(normalizeValue);
			},
			
			/**
			 * Extracts values from abbreviation
			 * @param {String} abbr
			 * @returns {Object} Object containing array of values and clean 
			 * abbreviation name
			 */
			extractValues: function(abbr) {
				// search for value start
				var abbrValues = this.findValuesInAbbreviation(abbr);
				if (!abbrValues) {
					return {
						property: abbr,
						values: null
					};
				}
				
				return {
					property: abbr.substring(0, abbr.length - abbrValues.length).replace(/-$/, ''),
					values: this.parseValues(abbrValues)
				};
			},
			
			/**
			 * Normalizes value, defined in abbreviation.
			 * @param {String} value
			 * @param {String} property
			 * @returns {String}
			 */
			normalizeValue: function(value, property) {
				property = (property || '').toLowerCase();
				var unitlessProps = prefs.getArray('css.unitlessProperties');
				return value.replace(/^(\-?[0-9\.]+)([a-z]*)$/, function(str, val, unit) {
					if (!unit && (val == '0' || ~unitlessProps.indexOf(property)))
						return val;
					
					if (!unit)
						return val.replace(/\.$/, '') + prefs.get(~val.indexOf('.') ? 'css.floatUnit' : 'css.intUnit');
					
					return val + getUnit(unit);
				});
			},
			
			/**
			 * Expands abbreviation into a snippet
			 * @param {String} abbr Abbreviation name to expand
			 * @param {String} value Abbreviation value
			 * @param {String} syntax Currect syntax or dialect. Default is 'css'
			 * @returns {Object} Array of CSS properties and values or predefined
			 * snippet (string or element)
			 */
			expand: function(abbr, value, syntax) {
				syntax = syntax || 'css';
				var autoInsertPrefixes = prefs.get(syntax + '.autoInsertVendorPrefixes');
				
				// check if snippet should be transformed to !important
				var isImportant = /^(.+)\!$/.test(abbr);
				if (isImportant) {
					abbr = RegExp.$1;
				}
	
				// check if we have abbreviated resource
				var snippet = resources.findSnippet(syntax, abbr);
				if (snippet && !autoInsertPrefixes) {
					return transformSnippet(snippet, isImportant, syntax);
				}
				
				// no abbreviated resource, parse abbreviation
				var prefixData = this.extractPrefixes(abbr);
				var valuesData = this.extractValues(prefixData.property);
				var abbrData = utils.extend(prefixData, valuesData);
	
				if (!snippet) {
					snippet = resources.findSnippet(syntax, abbrData.property);
				} else {
					abbrData.values = null;
				}
				
				if (!snippet && prefs.get('css.fuzzySearch')) {
					// let’s try fuzzy search
					snippet = resources.fuzzyFindSnippet(syntax, abbrData.property, parseFloat(prefs.get('css.fuzzySearchMinScore')));
				}
				
				if (!snippet) {
					if (!abbrData.property) {
						return null;
					}
					snippet = abbrData.property + ':' + defaultValue;
				} else if (typeof snippet !== 'string') {
					snippet = snippet.data;
				}
				
				if (!isSingleProperty(snippet)) {
					return snippet;
				}
				
				var snippetObj = this.splitSnippet(snippet);
				var result = [];
				if (!value && abbrData.values) {
					value = abbrData.values.map(function(val) {
						return this.normalizeValue(val, snippetObj.name);
					}, this).join(' ') + ';';
				}
				
				snippetObj.value = value || snippetObj.value;
	
				var prefixes = abbrData.prefixes == 'all' || (!abbrData.prefixes && autoInsertPrefixes) 
					? findInternalPrefixes(snippetObj.name, autoInsertPrefixes && abbrData.prefixes != 'all')
					: abbrData.prefixes;
					
					
				var names = [], propName;
				(prefixes || []).forEach(function(p) {
					if (p in vendorPrefixes) {
						propName = vendorPrefixes[p].transformName(snippetObj.name);
						names.push(propName);
						result.push(transformSnippet(propName + ':' + snippetObj.value,
								isImportant, syntax));
					}
				});
				
				// put the original property
				result.push(transformSnippet(snippetObj.name + ':' + snippetObj.value, isImportant, syntax));
				names.push(snippetObj.name);
	
				result = resolvePrefixedValues(snippetObj, isImportant, syntax).concat(result);
				
				if (prefs.get('css.alignVendor')) {
					var pads = utils.getStringsPads(names);
					result = result.map(function(prop, i) {
						return pads[i] + prop;
					});
				}
				
				return result;
			},
			
			/**
			 * Same as <code>expand</code> method but transforms output into 
			 * Emmet snippet
			 * @param {String} abbr
			 * @param {String} syntax
			 * @returns {String}
			 */
			expandToSnippet: function(abbr, syntax) {
				var snippet = this.expand(abbr, null, syntax);
				if (snippet === null) {
					return null;
				}
	
				if (Array.isArray(snippet)) {
					return snippet.join('\n');
				}
				
				if (typeof snippet !== 'string') {
					return snippet.data;
				}
				
				return snippet + '';
			},
			
			/**
			 * Split snippet into a CSS property-value pair
			 * @param {String} snippet
			 */
			splitSnippet: function(snippet) {
				snippet = utils.trim(snippet);
				if (snippet.indexOf(':') == -1) {
					return {
						name: snippet,
						value: defaultValue
					};
				}
				
				var pair = snippet.split(':');
				
				return {
					name: utils.trim(pair.shift()),
					// replace ${0} tabstop to produce valid vendor-prefixed values
					// where possible
					value: utils.trim(pair.join(':')).replace(/^(\$\{0\}|\$0)(\s*;?)$/, '${1}$2')
				};
			},
			
			getSyntaxPreference: getSyntaxPreference,
			transformSnippet: transformSnippet,
			vendorPrefixes: findVendorPrefixes
		};
	
		return module.exports;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105)(module)))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * string_score.js: String Scoring Algorithm 0.1.10 
	 *
	 * http://joshaven.com/string_score
	 * https://github.com/joshaven/string_score
	 *
	 * Copyright (C) 2009-2011 Joshaven Potter <yourtech@gmail.com>
	 * Special thanks to all of the contributors listed here https://github.com/joshaven/string_score
	 * MIT license: http://www.opensource.org/licenses/mit-license.php
	 *
	 * Date: Tue Mar 1 2011
	
	 * Scores a string against another string.
	 *  'Hello World'.score('he');     //=> 0.5931818181818181
	 *  'Hello World'.score('Hello');  //=> 0.7318181818181818
	 */
	 if (false) {
	 	var define = function (factory) {
	 		module.exports = factory(require, exports, module);
	 	};
	 }
	
	 !(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	 	return {
	 		score: function(string, abbreviation, fuzziness) {
				// If the string is equal to the abbreviation, perfect match.
				if (string == abbreviation) {return 1;}
				  //if it's not a perfect match and is empty return 0
				  if (abbreviation == "") {return 0;}
	
				  var total_character_score = 0,
				  abbreviation_length = abbreviation.length,
				  string_length = string.length,
				  start_of_string_bonus,
				  abbreviation_score,
				  fuzzies=1,
				  final_score;
				  
				  // Walk through abbreviation and add up scores.
				  for (var i = 0,
				  	character_score/* = 0*/,
				  	index_in_string/* = 0*/,
				  	c/* = ''*/,
				  	index_c_lowercase/* = 0*/,
				  	index_c_uppercase/* = 0*/,
				  	min_index/* = 0*/;
				  	i < abbreviation_length;
				  	++i) {
	
				    // Find the first case-insensitive match of a character.
					c = abbreviation.charAt(i);
	
					index_c_lowercase = string.indexOf(c.toLowerCase());
					index_c_uppercase = string.indexOf(c.toUpperCase());
					min_index = Math.min(index_c_lowercase, index_c_uppercase);
					index_in_string = (min_index > -1) ? min_index : Math.max(index_c_lowercase, index_c_uppercase);
	
					if (index_in_string === -1) { 
						if (fuzziness) {
							fuzzies += 1-fuzziness;
							continue;
						} else {
							return 0;
						}
					} else {
						character_score = 0.1;
					}
	
				    // Set base score for matching 'c'.
				    
				    // Same case bonus.
				    if (string[index_in_string] === c) { 
				    	character_score += 0.1; 
				    }
				    
				    // Consecutive letter & start-of-string Bonus
				    if (index_in_string === 0) {
				      // Increase the score when matching first character of the remainder of the string
				      character_score += 0.6;
				      if (i === 0) {
				        // If match is the first character of the string
				        // & the first character of abbreviation, add a
				        // start-of-string match bonus.
				        start_of_string_bonus = 1; //true;
				    }
				}
				else {
					  // Acronym Bonus
					  // Weighing Logic: Typing the first character of an acronym is as if you
					  // preceded it with two perfect character matches.
					  if (string.charAt(index_in_string - 1) === ' ') {
					    character_score += 0.8; // * Math.min(index_in_string, 5); // Cap bonus at 0.4 * 5
					}
				}
	
				    // Left trim the already matched part of the string
				    // (forces sequential matching).
				    string = string.substring(index_in_string + 1, string_length);
				    
				    total_character_score += character_score;
				  } // end of for loop
				  
				  // Uncomment to weigh smaller words higher.
				  // return total_character_score / string_length;
				  
				  abbreviation_score = total_character_score / abbreviation_length;
				  //percentage_of_matched_string = abbreviation_length / string_length;
				  //word_score = abbreviation_score * percentage_of_matched_string;
				  
				  // Reduce penalty for longer strings.
				  //final_score = (word_score + abbreviation_score) / 2;
				  final_score = ((abbreviation_score * (abbreviation_length / string_length)) + abbreviation_score) / 2;
				  
				  final_score = final_score / fuzzies;
				  
				  if (start_of_string_bonus && (final_score + 0.15 < 1)) {
				  	final_score += 0.15;
				  }
				  
				  return final_score;
				}
			};
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Helper class for convenient token iteration
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		/**
		 * @type TokenIterator
		 * @param {Array} tokens
		 * @type TokenIterator
		 * @constructor
		 */
		function TokenIterator(tokens) {
			/** @type Array */
			this.tokens = tokens;
			this._position = 0;
			this.reset();
		}
		
		TokenIterator.prototype = {
			next: function() {
				if (this.hasNext()) {
					var token = this.tokens[++this._i];
					this._position = token.start;
					return token;
				} else {
					this._i = this._il;
				}
				
				return null;
			},
			
			current: function() {
				return this.tokens[this._i];
			},
	
			peek: function() {
				return this.tokens[this._i + i];
			},
			
			position: function() {
				return this._position;
			},
			
			hasNext: function() {
				return this._i < this._il - 1;
			},
			
			reset: function() {
				this._i = 0;
				this._il = this.tokens.length;
			},
			
			item: function() {
				return this.tokens[this._i];
			},
			
			itemNext: function() {
				return this.tokens[this._i + 1];
			},
			
			itemPrev: function() {
				return this.tokens[this._i - 1];
			},
			
			nextUntil: function(type, callback) {
				var token;
				var test = typeof type == 'string' 
					? function(t){return t.type == type;} 
					: type;
				
				while ((token = this.next())) {
					if (callback)
						callback.call(this, token);
					if (test.call(this, token))
						break;
				}
			}
		};
		
		return {
			create: function(tokens) {
				return new TokenIterator(tokens);
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 69 */,
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Abstract implementation of edit tree interface.
	 * Edit tree is a named container of editable “name-value” child elements, 
	 * parsed from <code>source</code>. This container provides convenient methods
	 * for editing/adding/removing child elements. All these update actions are
	 * instantly reflected in the <code>source</code> code with respect of formatting.
	 * <br><br>
	 * For example, developer can create an edit tree from CSS rule and add or 
	 * remove properties from it–all changes will be immediately reflected in the 
	 * original source.
	 * <br><br>
	 * All classes defined in this module should be extended the same way as in
	 * Backbone framework: using <code>extend</code> method to create new class and 
	 * <code>initialize</code> method to define custom class constructor.
	 * 
	 * @example
	 * <pre><code>
	 * var MyClass = require('editTree/base').EditElement.extend({
	 *     initialize: function() {
	 *     // constructor code here
	 *   }
	 * });
	 * 
	 * var elem = new MyClass(); 
	 * </code></pre>
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var range = __webpack_require__(36);
		var utils = __webpack_require__(22);
		var klass = __webpack_require__(99);
		
		/**
		 * Named container of edited source
		 * @type EditContainer
		 * @param {String} source
		 * @param {Object} options
		 */
		function EditContainer(source, options) {
			this.options = utils.extend({offset: 0}, options);
			/**
			 * Source code of edited structure. All changes in the structure are 
			 * immediately reflected into this property
			 */
			this.source = source;
			
			/** 
			 * List of all editable children
			 * @private 
			 */
			this._children = [];
			
			/**
			 * Hash of all positions of container
			 * @private
			 */
			this._positions = {
				name: 0
			};
			
			this.initialize.apply(this, arguments);
		}
		
		/**
		 * The self-propagating extend function for classes.
		 * @type Function
		 */
		EditContainer.extend = klass.extend;
		
		EditContainer.prototype = {
			type: 'container',
			/**
			 * Child class constructor
			 */
			initialize: function() {},
	
			/**
			 * Make position absolute
			 * @private
			 * @param {Number} num
			 * @param {Boolean} isAbsolute
			 * @returns {Boolean}
			 */
			_pos: function(num, isAbsolute) {
				return num + (isAbsolute ? this.options.offset : 0);
			},
			
			/**
			 * Replace substring of tag's source
			 * @param {String} value
			 * @param {Number} start
			 * @param {Number} end
			 * @private
			 */
			_updateSource: function(value, start, end) {
				// create modification range
				var r = range.create(start, typeof end === 'undefined' ? 0 : end - start);
				var delta = value.length - r.length();
				
				var update = function(obj) {
					Object.keys(obj).forEach(function(k) {
						if (obj[k] >= r.end) {
							obj[k] += delta;
						}
					});
				};
				
				// update affected positions of current container
				update(this._positions);
				
				// update affected positions of children
				var recursiveUpdate = function(items) {
					items.forEach(function(item) {
						update(item._positions);
						if (item.type == 'container') {
							recursiveUpdate(item.list());
						}
					});
				};
	
				recursiveUpdate(this.list());
				this.source = utils.replaceSubstring(this.source, value, r);
			},
				
				
			/**
			 * Adds new attribute 
			 * @param {String} name Property name
			 * @param {String} value Property value
			 * @param {Number} pos Position at which to insert new property. By 
			 * default the property is inserted at the end of rule 
			 * @returns {EditElement} Newly created element
			 */
			add: function(name, value, pos) {
				// this is abstract implementation
				var item = new EditElement(name, value);
				this._children.push(item);
				return item;
			},
			
			/**
			 * Returns attribute object
			 * @param {String} name Attribute name or its index
			 * @returns {EditElement}
			 */
			get: function(name) {
				if (typeof name === 'number') {
					return this.list()[name];
				}
				
				if (typeof name === 'string') {
					return utils.find(this.list(), function(prop) {
						return prop.name() === name;
					});
				}
				
				return name;
			},
			
			/**
			 * Returns all children by name or indexes
			 * @param {Object} name Element name(s) or indexes (<code>String</code>,
			 * <code>Array</code>, <code>Number</code>)
			 * @returns {Array}
			 */
			getAll: function(name) {
				if (!Array.isArray(name))
					name = [name];
				
				// split names and indexes
				var names = [], indexes = [];
				name.forEach(function(item) {
					if (typeof item === 'string') {
						names.push(item);
					} else if (typeof item === 'number') {
						indexes.push(item);
					}
				});
				
				return this.list().filter(function(attribute, i) {
					return ~indexes.indexOf(i) || ~names.indexOf(attribute.name());
				});
			},
	
			/**
			 * Returns list of all editable child elements
			 * @returns {Array}
			 */
			list: function() {
				return this._children;
			},
	
			/**
			 * Remove child element
			 * @param {String} name Property name or its index
			 */
			remove: function(name) {
				var element = this.get(name);
				if (element) {
					this._updateSource('', element.fullRange());
					var ix = this._children.indexOf(element);
					if (~ix) {
						this._children.splice(ix, 1);
					}
				}
			},
			
			/**
			 * Returns index of editble child in list
			 * @param {Object} item
			 * @returns {Number}
			 */
			indexOf: function(item) {
				return this.list().indexOf(this.get(item));
			},
			
			/**
			 * Returns or updates element value. If such element doesn't exists,
			 * it will be created automatically and added at the end of child list.
			 * @param {String} name Element name or its index
			 * @param {String} value New element value
			 * @returns {String}
			 */
			value: function(name, value, pos) {
				var element = this.get(name);
				if (element)
					return element.value(value);
				
				if (typeof value !== 'undefined') {
					// no such element — create it
					return this.add(name, value, pos);
				}
			},
			
			/**
			 * Returns all values of child elements found by <code>getAll()</code>
			 * method
			 * @param {Object} name Element name(s) or indexes (<code>String</code>,
			 * <code>Array</code>, <code>Number</code>)
			 * @returns {Array}
			 */
			values: function(name) {
				return this.getAll(name).map(function(element) {
					return element.value();
				});
			},
			
			/**
			 * Sets or gets container name
			 * @param {String} val New name. If not passed, current 
			 * name is returned
			 * @return {String}
			 */
			name: function(val) {
				if (typeof val !== 'undefined' && this._name !== (val = String(val))) {
					this._updateSource(val, this._positions.name, this._positions.name + this._name.length);
					this._name = val;
				}
				
				return this._name;
			},
			
			/**
			 * Returns name range object
			 * @param {Boolean} isAbsolute Return absolute range (with respect of 
			 * rule offset)
			 * @returns {Range}
			 */
			nameRange: function(isAbsolute) {
				return range.create(this._positions.name + (isAbsolute ? this.options.offset : 0), this.name());
			},
	
			/**
			 * Returns range of current source
			 * @param {Boolean} isAbsolute
			 */
			range: function(isAbsolute) {
				return range.create(isAbsolute ? this.options.offset : 0, this.valueOf());
			},
			
			/**
			 * Returns element that belongs to specified position
			 * @param {Number} pos
			 * @param {Boolean} isAbsolute
			 * @returns {EditElement}
			 */
			itemFromPosition: function(pos, isAbsolute) {
				return utils.find(this.list(), function(elem) {
					return elem.range(isAbsolute).inside(pos);
				});
			},
			
			/**
			 * Returns source code of current container 
			 * @returns {String}
			 */
			toString: function() {
				return this.valueOf();
			},
	
			valueOf: function() {
				return this.source;
			}
		};
		
		/**
		 * @param {EditContainer} parent
		 * @param {Object} nameToken
		 * @param {Object} valueToken
		 */
		function EditElement(parent, nameToken, valueToken) {
			/** @type EditContainer */
			this.parent = parent;
			
			this._name = nameToken.value;
			this._value = valueToken ? valueToken.value : '';
			
			this._positions = {
				name: nameToken.start,
				value: valueToken ? valueToken.start : -1
			};
			
			this.initialize.apply(this, arguments);
		}
		
		/**
		 * The self-propagating extend function for classes.
		 * @type Function
		 */
		EditElement.extend = klass.extend;
		
		EditElement.prototype = {
			type: 'element',
	
			/**
			 * Child class constructor
			 */
			initialize: function() {},
			
			/**
			 * Make position absolute
			 * @private
			 * @param {Number} num
			 * @param {Boolean} isAbsolute
			 * @returns {Boolean}
			 */
			_pos: function(num, isAbsolute) {
				return num + (isAbsolute ? this.parent.options.offset : 0);
			},
				
			/**
			 * Sets of gets element value
			 * @param {String} val New element value. If not passed, current 
			 * value is returned
			 * @returns {String}
			 */
			value: function(val) {
				if (typeof val !== 'undefined' && this._value !== (val = String(val))) {
					this.parent._updateSource(val, this.valueRange());
					this._value = val;
				}
				
				return this._value;
			},
			
			/**
			 * Sets of gets element name
			 * @param {String} val New element name. If not passed, current 
			 * name is returned
			 * @returns {String}
			 */
			name: function(val) {
				if (typeof val !== 'undefined' && this._name !== (val = String(val))) {
					this.parent._updateSource(val, this.nameRange());
					this._name = val;
				}
				
				return this._name;
			},
			
			/**
			 * Returns position of element name token
			 * @param {Boolean} isAbsolute Return absolute position
			 * @returns {Number}
			 */
			namePosition: function(isAbsolute) {
				return this._pos(this._positions.name, isAbsolute);
			},
			
			/**
			 * Returns position of element value token
			 * @param {Boolean} isAbsolute Return absolute position
			 * @returns {Number}
			 */
			valuePosition: function(isAbsolute) {
				return this._pos(this._positions.value, isAbsolute);
			},
			
			/**
			 * Returns element name
			 * @param {Boolean} isAbsolute Return absolute range 
			 * @returns {Range}
			 */
			range: function(isAbsolute) {
				return range.create(this.namePosition(isAbsolute), this.valueOf());
			},
			
			/**
			 * Returns full element range, including possible indentation
			 * @param {Boolean} isAbsolute Return absolute range
			 * @returns {Range}
			 */
			fullRange: function(isAbsolute) {
				return this.range(isAbsolute);
			},
			
			/**
			 * Returns element name range
			 * @param {Boolean} isAbsolute Return absolute range
			 * @returns {Range}
			 */
			nameRange: function(isAbsolute) {
				return range.create(this.namePosition(isAbsolute), this.name());
			},
			
			/**
			 * Returns element value range
			 * @param {Boolean} isAbsolute Return absolute range
			 * @returns {Range}
			 */
			valueRange: function(isAbsolute) {
				return range.create(this.valuePosition(isAbsolute), this.value());
			},
			
			/**
			 * Returns current element string representation
			 * @returns {String}
			 */
			toString: function() {
				return this.valueOf();
			},
			
			valueOf: function() {
				return this.name() + this.value();
			}
		};
		
		return {
			EditContainer: EditContainer,
			EditElement: EditElement,
			
			/**
			 * Creates token that can be fed to <code>EditElement</code>
			 * @param {Number} start
			 * @param {String} value
			 * @param {String} type
			 * @returns
			 */
			createToken: function(start, value, type) {
				var obj = {
					start: start || 0,
					value: value || '',
					type: type
				};
				
				obj.end = obj.start + obj.value.length;
				return obj;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * CSS EditTree is a module that can parse a CSS rule into a tree with 
	 * convenient methods for adding, modifying and removing CSS properties. These 
	 * changes can be written back to string with respect of code formatting.
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var editTree = __webpack_require__(70);
		var cssParser = __webpack_require__(87);
		var cssSections = __webpack_require__(95);
		var range = __webpack_require__(36);
		var stringStream = __webpack_require__(56);
		var tokenIterator = __webpack_require__(68);
	
		var defaultOptions = {
			styleBefore: '\n\t',
			styleSeparator: ': ',
			offset: 0
		};
		
		var reSpaceStart = /^\s+/;
		var reSpaceEnd = /\s+$/;
		var WHITESPACE_REMOVE_FROM_START = 1;
		var WHITESPACE_REMOVE_FROM_END   = 2;
		
		/**
		 * Modifies given range to remove whitespace from beginning
		 * and/or from the end
		 * @param  {Range} rng Range to modify
		 * @param  {String} text  Text that range belongs to
		 * @param  {Number} mask  Mask indicating from which end 
		 * whitespace should be removed
		 * @return {Range}
		 */
		function trimWhitespaceInRange(rng, text, mask) {
			mask = mask || (WHITESPACE_REMOVE_FROM_START | WHITESPACE_REMOVE_FROM_END);
			text = rng.substring(text);
			var m;
			if ((mask & WHITESPACE_REMOVE_FROM_START) && (m = text.match(reSpaceStart))) {
				rng.start += m[0].length;
			}
	
			if ((mask & WHITESPACE_REMOVE_FROM_END) && (m = text.match(reSpaceEnd))) {
				rng.end -= m[0].length;
			}
	
			// in case given range is just a whatespace
			if (rng.end < rng.start) {
				rng.end = rng.start;
			}
	
			return rng;
		}
	
		/**
		 * Consumes CSS property and value from current token
		 * iterator state. Offsets iterator pointer into token
		 * that can be used for next value consmption
		 * @param  {TokenIterator} it
		 * @param  {String} text
		 * @return {Object}    Object with `name` and `value` properties 
		 * ar ranges. Value range can be zero-length.
		 */
		function consumeSingleProperty(it, text) {
			var name, value, end;
			var token = it.current();
	
			if (!token) {
				return null;
			}
	
			// skip whitespace
			var ws = {'white': 1, 'line': 1, 'comment': 1};
			while ((token = it.current())) {
				if (!(token.type in ws)) {
					break;
				}
				it.next();
			}
	
			if (!it.hasNext()) {
				return null;
			}
	
			// consume property name
			token = it.current();
			name = range(token.start, token.value);
			var isAtProperty = token.value.charAt(0) == '@';
			while (token = it.next()) {
				name.end = token.end;
				if (token.type == ':' || token.type == 'white') {
					name.end = token.start;
					it.next();
					if (token.type == ':' || isAtProperty) {
						// XXX I really ashame of this hardcode, but I need
						// to stop parsing if this is an SCSS mixin call,
						// for example: @include border-radius(10px)
						break;
					}
				} else if (token.type == ';' || token.type == 'line') {
					// there’s no value, looks like a mixin
					// or a special use case:
					// user is writing a new property or abbreviation
					name.end = token.start;
					value = range(token.start, 0);
					it.next();
					break;
				}
			}
	
			token = it.current();
			if (!value && token) {
				if (token.type == 'line') {
					lastNewline = token;
				}
				// consume value
				value = range(token.start, token.value);
				var lastNewline;
				while ((token = it.next())) {
					value.end = token.end;
					if (token.type == 'line') {
						lastNewline = token;
					} else if (token.type == '}' || token.type == ';') {
						value.end = token.start;
						if (token.type == ';') {
							end = range(token.start, token.value);
						}
						it.next();
						break;
					} else if (token.type == ':' && lastNewline) {
						// A special case: 
						// user is writing a value before existing
						// property, but didn’t inserted closing semi-colon.
						// In this case, limit value range to previous
						// newline
						value.end = lastNewline.start;
						it._i = it.tokens.indexOf(lastNewline);
						break;
					}
				}
			}
	
			if (!value) {
				value = range(name.end, 0);
			}
	
			return {
				name: trimWhitespaceInRange(name, text),
				value: trimWhitespaceInRange(value, text, WHITESPACE_REMOVE_FROM_START | (end ? WHITESPACE_REMOVE_FROM_END : 0)),
				end: end || range(value.end, 0)
			};
		}
	
		/**
		 * Finds parts of complex CSS value
		 * @param {String} str
		 * @returns {Array} Returns list of <code>Range</code>'s
		 */
		function findParts(str) {
			/** @type StringStream */
			var stream = stringStream.create(str);
			var ch;
			var result = [];
			var sep = /[\s\u00a0,;]/;
			
			var add = function() {
				stream.next();
				result.push(range(stream.start, stream.current()));
				stream.start = stream.pos;
			};
			
			// skip whitespace
			stream.eatSpace();
			stream.start = stream.pos;
			
			while ((ch = stream.next())) {
				if (ch == '"' || ch == "'") {
					stream.next();
					if (!stream.skipTo(ch)) break;
					add();
				} else if (ch == '(') {
					// function found, may have nested function
					stream.backUp(1);
					if (!stream.skipToPair('(', ')')) break;
					stream.backUp(1);
					add();
				} else {
					if (sep.test(ch)) {
						result.push(range(stream.start, stream.current().length - 1));
						stream.eatWhile(sep);
						stream.start = stream.pos;
					}
				}
			}
			
			add();
	
			return utils.unique(result.filter(function(item) {
				return !!item.length();
			}));
		}
		
		/**
		 * Parses CSS properties from given CSS source
		 * and adds them to CSSEditContainer node
		 * @param  {CSSEditContainer} node
		 * @param  {String} source CSS source
		 * @param {Number} offset Offset of properties subset from original source
		 */
		function consumeProperties(node, source, offset) {
			var list = extractPropertiesFromSource(source, offset);
	
			list.forEach(function(property) {
				node._children.push(new CSSEditElement(node,
					editTree.createToken(property.name.start, property.nameText),
					editTree.createToken(property.value.start, property.valueText),
					editTree.createToken(property.end.start, property.endText)
					));
			});
		}
	
		/**
		 * Parses given CSS source and returns list of ranges of located CSS properties.
		 * Normally, CSS source must contain properties only, it must be,
		 * for example, a content of CSS selector or text between nested
		 * CSS sections
		 * @param  {String} source CSS source
		 * @param {Number} offset Offset of properties subset from original source.
		 * Used to provide proper ranges of locates items
		 */
		function extractPropertiesFromSource(source, offset) {
			offset = offset || 0;
			source = source.replace(reSpaceEnd, '');
			var out = [];
	
			if (!source) {
				return out;
			}
	
			var tokens = cssParser.parse(source);
			var it = tokenIterator.create(tokens);
			var property;
	
			while ((property = consumeSingleProperty(it, source))) {
				out.push({
					nameText: property.name.substring(source),
					name: property.name.shift(offset),
	
					valueText: property.value.substring(source),
					value: property.value.shift(offset),
	
					endText: property.end.substring(source),
					end: property.end.shift(offset)
				});
			}
	
			return out;
		}
		
		/**
		 * @class
		 * @extends EditContainer
		 */
		var CSSEditContainer = editTree.EditContainer.extend({
			initialize: function(source, options) {
				utils.extend(this.options, defaultOptions, options);
				
				if (Array.isArray(source)) {
					source = cssParser.toSource(source);
				}
	
				var allRules = cssSections.findAllRules(source);
				var currentRule = allRules.shift();
	
				// keep top-level rules only since they will
				// be parsed by nested CSSEditContainer call
				var topLevelRules = [];
				allRules.forEach(function(r) {
					var isTopLevel = !utils.find(topLevelRules, function(tr) {
						return tr.contains(r);
					});
	
					if (isTopLevel) {
						topLevelRules.push(r);
					}
				});
	
	
				var selectorRange = range.create2(currentRule.start, currentRule._selectorEnd);
				this._name = selectorRange.substring(source);
				this._positions.name = selectorRange.start;
				this._positions.contentStart = currentRule._contentStart + 1;
	
				var sectionOffset = currentRule._contentStart + 1;
				var sectionEnd = currentRule.end - 1;
	
				// parse properties between nested rules
				// and add nested rules as children
				var that = this;
				topLevelRules.forEach(function(r) {
					consumeProperties(that, source.substring(sectionOffset, r.start), sectionOffset);
					var opt = utils.extend({}, that.options, {offset: r.start + that.options.offset});
					// XXX I think I don’t need nested containers here
					// They should be handled separately
					// that._children.push(new CSSEditContainer(r.substring(source), opt));
					sectionOffset = r.end;
				});
	
				// consume the rest of data
				consumeProperties(this, source.substring(sectionOffset, currentRule.end - 1), sectionOffset);
				this._saveStyle();
			},
			
			/**
			 * Remembers all styles of properties
			 * @private
			 */
			_saveStyle: function() {
				var start = this._positions.contentStart;
				var source = this.source;
				
				this.list().forEach(function(p) {
					if (p.type === 'container') {
						return;
					}
	
					p.styleBefore = source.substring(start, p.namePosition());
					// a small hack here:
					// Sometimes users add empty lines before properties to logically
					// separate groups of properties. In this case, a blind copy of
					// characters between rules may lead to undesired behavior,
					// especially when current rule is duplicated or used as a donor
					// to create new rule.
					// To solve this issue, we‘ll take only last newline indentation
					var lines = utils.splitByLines(p.styleBefore);
					if (lines.length > 1) {
						p.styleBefore = '\n' + lines[lines.length - 1];
					}
					
					p.styleSeparator = source.substring(p.nameRange().end, p.valuePosition());
					
					// graceful and naive comments removal 
					var parts = p.styleBefore.split('*/');
					p.styleBefore = parts[parts.length - 1];
					p.styleSeparator = p.styleSeparator.replace(/\/\*.*?\*\//g, '');
					
					start = p.range().end;
				});
			},
	
			/**
			 * Returns position of element name token
			 * @param {Boolean} isAbsolute Return absolute position
			 * @returns {Number}
			 */
			namePosition: function(isAbsolute) {
				return this._pos(this._positions.name, isAbsolute);
			},
			
			/**
			 * Returns position of element value token
			 * @param {Boolean} isAbsolute Return absolute position
			 * @returns {Number}
			 */
			valuePosition: function(isAbsolute) {
				return this._pos(this._positions.contentStart, isAbsolute);
			},
	
			/**
			 * Returns element value range
			 * @param {Boolean} isAbsolute Return absolute range
			 * @returns {Range}
			 */
			valueRange: function(isAbsolute) {
				return range.create2(this.valuePosition(isAbsolute), this._pos(this.valueOf().length, isAbsolute) - 1);
			},
			
			/**
			 * Adds new CSS property 
			 * @param {String} name Property name
			 * @param {String} value Property value
			 * @param {Number} pos Position at which to insert new property. By 
			 * default the property is inserted at the end of rule 
			 * @returns {CSSEditProperty}
			 */
			add: function(name, value, pos) {
				var list = this.list();
				var start = this._positions.contentStart;
				var styles = utils.pick(this.options, 'styleBefore', 'styleSeparator');
				
				if (typeof pos === 'undefined') {
					pos = list.length;
				}
				
				/** @type CSSEditProperty */
				var donor = list[pos];
				if (donor) {
					start = donor.fullRange().start;
				} else if ((donor = list[pos - 1])) {
					// make sure that donor has terminating semicolon
					donor.end(';');
					start = donor.range().end;
				}
				
				if (donor) {
					styles = utils.pick(donor, 'styleBefore', 'styleSeparator');
				}
				
				var nameToken = editTree.createToken(start + styles.styleBefore.length, name);
				var valueToken = editTree.createToken(nameToken.end + styles.styleSeparator.length, value);
				
				var property = new CSSEditElement(this, nameToken, valueToken,
						editTree.createToken(valueToken.end, ';'));
				
				utils.extend(property, styles);
				
				// write new property into the source
				this._updateSource(property.styleBefore + property.toString(), start);
				
				// insert new property
				this._children.splice(pos, 0, property);
				return property;
			}
		});
		
		/**
		 * @class
		 * @type CSSEditElement
		 * @constructor
		 */
		var CSSEditElement = editTree.EditElement.extend({
			initialize: function(rule, name, value, end) {
				this.styleBefore = rule.options.styleBefore;
				this.styleSeparator = rule.options.styleSeparator;
				
				this._end = end.value;
				this._positions.end = end.start;
			},
			
			/**
			 * Returns ranges of complex value parts
			 * @returns {Array} Returns <code>null</code> if value is not complex
			 */
			valueParts: function(isAbsolute) {
				var parts = findParts(this.value());
				if (isAbsolute) {
					var offset = this.valuePosition(true);
					parts.forEach(function(p) {
						p.shift(offset);
					});
				}
				
				return parts;
			},
	
			/**
			 * Sets of gets element value. 
			 * When setting value, this implementation will ensure that your have 
			 * proper name-value separator
			 * @param {String} val New element value. If not passed, current 
			 * value is returned
			 * @returns {String}
			 */
			value: function(val) {
				var isUpdating = typeof val !== 'undefined';
				var allItems = this.parent.list();
				if (isUpdating && this.isIncomplete()) {
					var self = this;
					var donor = utils.find(allItems, function(item) {
						return item !== self && !item.isIncomplete();
					});
	
					this.styleSeparator = donor 
						? donor.styleSeparator 
						: this.parent.options.styleSeparator;
					this.parent._updateSource(this.styleSeparator, range(this.valueRange().start, 0));
				}
	
				var value = this.constructor.__super__.value.apply(this, arguments);
				if (isUpdating) {
					// make sure current property has terminating semi-colon
					// if it’s not the last one
					var ix = allItems.indexOf(this);
					if (ix !== allItems.length - 1 && !this.end()) {
						this.end(';');
					}
				}
				return value;
			},
	
			/**
			 * Test if current element is incomplete, e.g. has no explicit
			 * name-value separator
			 * @return {Boolean} [description]
			 */
			isIncomplete: function() {
				return this.nameRange().end === this.valueRange().start;
			},
			
			/**
			 * Sets of gets property end value (basically, it's a semicolon)
			 * @param {String} val New end value. If not passed, current 
			 * value is returned
			 */
			end: function(val) {
				if (typeof val !== 'undefined' && this._end !== val) {
					this.parent._updateSource(val, this._positions.end, this._positions.end + this._end.length);
					this._end = val;
				}
				
				return this._end;
			},
			
			/**
			 * Returns full rule range, with indentation
			 * @param {Boolean} isAbsolute Return absolute range (with respect of
			 * rule offset)
			 * @returns {Range}
			 */
			fullRange: function(isAbsolute) {
				var r = this.range(isAbsolute);
				r.start -= this.styleBefore.length;
				return r;
			},
			
			/**
			 * Returns item string representation
			 * @returns {String}
			 */
			valueOf: function() {
				return this.name() + this.styleSeparator + this.value() + this.end();
			}
		});
		
		return {
			/**
			 * Parses CSS rule into editable tree
			 * @param {String} source
			 * @param {Object} options
			 * @memberOf emmet.cssEditTree
			 * @returns {EditContainer}
			 */
			parse: function(source, options) {
				return new CSSEditContainer(source, options);
			},
			
			/**
			 * Extract and parse CSS rule from specified position in <code>content</code> 
			 * @param {String} content CSS source code
			 * @param {Number} pos Character position where to start source code extraction
			 * @returns {EditContainer}
			 */
			parseFromPosition: function(content, pos, isBackward) {
				var bounds = cssSections.locateRule(content, pos, isBackward);
				if (!bounds || !bounds.inside(pos)) {
					// no matching CSS rule or caret outside rule bounds
					return null;
				}
				
				return this.parse(bounds.substring(content), {
					offset: bounds.start
				});
			},
	
			/**
			 * Locates CSS property in given CSS code fragment under specified character position
			 * @param  {String} css CSS code or parsed CSSEditContainer
			 * @param  {Number} pos Character position where to search CSS property
			 * @return {CSSEditElement}
			 */
			propertyFromPosition: function(css, pos) {
				var cssProp = null;
				/** @type EditContainer */
				var cssRule = typeof css === 'string' ? this.parseFromPosition(css, pos, true) : css;
				if (cssRule) {
					cssProp = cssRule.itemFromPosition(pos, true);
					if (!cssProp) {
						// in case user just started writing CSS property
						// and didn't include semicolon–try another approach
						cssProp = utils.find(cssRule.list(), function(elem) {
							return elem.range(true).end == pos;
						});
					}
				}
	
				return cssProp;
			},
			
			/**
			 * Removes vendor prefix from CSS property
			 * @param {String} name CSS property
			 * @return {String}
			 */
			baseName: function(name) {
				return name.replace(/^\s*\-\w+\-/, '');
			},
			
			/**
			 * Finds parts of complex CSS value
			 * @param {String} str
			 * @returns {Array}
			 */
			findParts: findParts,
	
			extractPropertiesFromSource: extractPropertiesFromSource
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * XML EditTree is a module that can parse an XML/HTML element into a tree with 
	 * convenient methods for adding, modifying and removing attributes. These 
	 * changes can be written back to string with respect of code formatting.
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var editTree = __webpack_require__(70);
		var xmlParser = __webpack_require__(88);
		var range = __webpack_require__(36);
		var utils = __webpack_require__(22);
	
		var defaultOptions = {
			styleBefore: ' ',
			styleSeparator: '=',
			styleQuote: '"',
			offset: 0
		};
		
		var startTag = /^<([\w\:\-]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/m;
		
		var XMLEditContainer = editTree.EditContainer.extend({
			initialize: function(source, options) {
				utils.defaults(this.options, defaultOptions);
				this._positions.name = 1;
				
				var attrToken = null;
				var tokens = xmlParser.parse(source);
				
				tokens.forEach(function(token) {
					token.value = range.create(token).substring(source);
					switch (token.type) {
						case 'tag':
							if (/^<[^\/]+/.test(token.value)) {
								this._name = token.value.substring(1);
							}
							break;
							
						case 'attribute':
							// add empty attribute
							if (attrToken) {
								this._children.push(new XMLEditElement(this, attrToken));
							}
							
							attrToken = token;
							break;
							
						case 'string':
							this._children.push(new XMLEditElement(this, attrToken, token));
							attrToken = null;
							break;
					}
				}, this);
				
				if (attrToken) {
					this._children.push(new XMLEditElement(this, attrToken));
				}
				
				this._saveStyle();
			},
			
			/**
			 * Remembers all styles of properties
			 * @private
			 */
			_saveStyle: function() {
				var start = this.nameRange().end;
				var source = this.source;
				
				this.list().forEach(function(p) {
					p.styleBefore = source.substring(start, p.namePosition());
					
					if (p.valuePosition() !== -1) {
						p.styleSeparator = source.substring(p.namePosition() + p.name().length, p.valuePosition() - p.styleQuote.length);
					}
					
					start = p.range().end;
				});
			},
			
			/**
			 * Adds new attribute 
			 * @param {String} name Property name
			 * @param {String} value Property value
			 * @param {Number} pos Position at which to insert new property. By 
			 * default the property is inserted at the end of rule 
			 */
			add: function(name, value, pos) {
				var list = this.list();
				var start = this.nameRange().end;
				var styles = utils.pick(this.options, 'styleBefore', 'styleSeparator', 'styleQuote');
				
				if (typeof pos === 'undefined') {
					pos = list.length;
				}
				
				
				/** @type XMLEditAttribute */
				var donor = list[pos];
				if (donor) {
					start = donor.fullRange().start;
				} else if ((donor = list[pos - 1])) {
					start = donor.range().end;
				}
				
				if (donor) {
					styles = utils.pick(donor, 'styleBefore', 'styleSeparator', 'styleQuote');
				}
				
				value = styles.styleQuote + value + styles.styleQuote;
				
				var attribute = new XMLEditElement(this, 
						editTree.createToken(start + styles.styleBefore.length, name),
						editTree.createToken(start + styles.styleBefore.length + name.length 
								+ styles.styleSeparator.length, value)
						);
				
				utils.extend(attribute, styles);
				
				// write new attribute into the source
				this._updateSource(attribute.styleBefore + attribute.toString(), start);
				
				// insert new attribute
				this._children.splice(pos, 0, attribute);
				return attribute;
			},
	
			/**
			 * A special case of attribute editing: adds class value to existing
			 * `class` attribute
			 * @param {String} value
			 */
			addClass: function(value) {
				var attr = this.get('class');
				value = utils.trim(value);
				if (!attr) {
					return this.add('class', value);
				}
	
				var classVal = attr.value();
				var classList = ' ' + classVal.replace(/\n/g, ' ') + ' ';
				if (!~classList.indexOf(' ' + value + ' ')) {
					attr.value(classVal + ' ' + value);
				}
			},
	
			/**
			 * A special case of attribute editing: removes class value from existing
			 * `class` attribute
			 * @param {String} value
			 */
			removeClass: function(value) {
				var attr = this.get('class');
				value = utils.trim(value);
				if (!attr) {
					return;
				}
	
				var reClass = new RegExp('(^|\\s+)' + utils.escapeForRegexp(value));
				var classVal = attr.value().replace(reClass, '');
				if (!utils.trim(classVal)) {
					this.remove('class');
				} else {
					attr.value(classVal);
				}
			}
		});
		
		var XMLEditElement = editTree.EditElement.extend({
			initialize: function(parent, nameToken, valueToken) {
				this.styleBefore = parent.options.styleBefore;
				this.styleSeparator = parent.options.styleSeparator;
				
				var value = '', quote = parent.options.styleQuote;
				if (valueToken) {
					value = valueToken.value;
					quote = value.charAt(0);
					if (quote == '"' || quote == "'") {
						value = value.substring(1);
					} else {
						quote = '';
					}
					
					if (quote && value.charAt(value.length - 1) == quote) {
						value = value.substring(0, value.length - 1);
					}
				}
				
				this.styleQuote = quote;
				
				this._value = value;
				this._positions.value = valueToken ? valueToken.start + quote.length : -1;
			},
			
			/**
			 * Returns full rule range, with indentation
			 * @param {Boolean} isAbsolute Return absolute range (with respect of
			 * rule offset)
			 * @returns {Range}
			 */
			fullRange: function(isAbsolute) {
				var r = this.range(isAbsolute);
				r.start -= this.styleBefore.length;
				return r;
			},
			
			valueOf: function() {
				return this.name() + this.styleSeparator
					+ this.styleQuote + this.value() + this.styleQuote;
			}
		});
		
		return {
			/**
			 * Parses HTML element into editable tree
			 * @param {String} source
			 * @param {Object} options
			 * @memberOf emmet.htmlEditTree
			 * @returns {EditContainer}
			 */
			parse: function(source, options) {
				return new XMLEditContainer(source, options);
			},
			
			/**
			 * Extract and parse HTML from specified position in <code>content</code> 
			 * @param {String} content CSS source code
			 * @param {Number} pos Character position where to start source code extraction
			 * @returns {XMLEditElement}
			 */
			parseFromPosition: function(content, pos, isBackward) {
				var bounds = this.extractTag(content, pos, isBackward);
				if (!bounds || !bounds.inside(pos))
					// no matching HTML tag or caret outside tag bounds
					return null;
				
				return this.parse(bounds.substring(content), {
					offset: bounds.start
				});
			},
			
			/**
			 * Extracts nearest HTML tag range from <code>content</code>, starting at 
			 * <code>pos</code> position
			 * @param {String} content
			 * @param {Number} pos
			 * @param {Boolean} isBackward
			 * @returns {Range}
			 */
			extractTag: function(content, pos, isBackward) {
				var len = content.length, i;
				
				// max extraction length. I don't think there may be tags larger 
				// than 2000 characters length
				var maxLen = Math.min(2000, len);
				
				/** @type Range */
				var r = null;
				
				var match = function(pos) {
					var m;
					if (content.charAt(pos) == '<' && (m = content.substr(pos, maxLen).match(startTag)))
						return range.create(pos, m[0]);
				};
				
				// lookup backward, in case we are inside tag already
				for (i = pos; i >= 0; i--) {
					if ((r = match(i))) break;
				}
				
				if (r && (r.inside(pos) || isBackward))
					return r;
				
				if (!r && isBackward)
					return null;
				
				// search forward
				for (i = pos; i < len; i++) {
					if ((r = match(i)))
						return r;
				}
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Filter for aiding of writing elements with complex class names as described
	 * in Yandex's BEM (Block, Element, Modifier) methodology. This filter will
	 * automatically inherit block and element names from parent elements and insert
	 * them into child element classes
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var htmlFilter = __webpack_require__(79);
		var prefs = __webpack_require__(26);
		var abbreviationUtils = __webpack_require__(55);
		var utils = __webpack_require__(22);
	
		prefs.define('bem.elementSeparator', '__', 'Class name’s element separator.');
		prefs.define('bem.modifierSeparator', '_', 'Class name’s modifier separator.');
		prefs.define('bem.shortElementPrefix', '-', 
				'Symbol for describing short “block-element” notation. Class names '
				+ 'prefixed with this symbol will be treated as element name for parent‘s '
				+ 'block name. Each symbol instance traverses one level up in parsed ' 
				+ 'tree for block name lookup. Empty value will disable short notation.');
		
		var shouldRunHtmlFilter = false;
		
		function getSeparators() {
			return {
				element: prefs.get('bem.elementSeparator'),
				modifier: prefs.get('bem.modifierSeparator')
			};
		}
	
		/**
		 * @param {AbbreviationNode} item
		 */
		function bemParse(item) {
			if (abbreviationUtils.isSnippet(item))
				return item;
			
			// save BEM stuff in cache for faster lookups
			item.__bem = {
				block: '',
				element: '',
				modifier: ''
			};
			
			var classNames = normalizeClassName(item.attribute('class')).split(' ');
			
			// guess best match for block name
			var reBlockName = /^[a-z]\-/i;
			item.__bem.block = utils.find(classNames, function(name) {
				return reBlockName.test(name);
			});
			
			// guessing doesn't worked, pick first class name as block name
			if (!item.__bem.block) {
				reBlockName = /^[a-z]/i;
				item.__bem.block = utils.find(classNames, function(name) {
					return reBlockName.test(name);
				}) || '';
			}
	
			classNames = classNames.map(function(name) {
				return processClassName(name, item);
			});
	
			classNames = utils.unique(utils.flatten(classNames)).join(' ');
			if (classNames) {
				item.attribute('class', classNames);
			}
			
			return item;
		}
		
		/**
		 * @param {String} className
		 * @returns {String}
		 */
		function normalizeClassName(className) {
			className = (' ' + (className || '') + ' ').replace(/\s+/g, ' ');
			
			var shortSymbol = prefs.get('bem.shortElementPrefix');
			if (shortSymbol) {
				var re = new RegExp('\\s(' + utils.escapeForRegexp(shortSymbol) + '+)', 'g');
				className = className.replace(re, function(str, p1) {
					return ' ' + utils.repeatString(getSeparators().element, p1.length);
				});
			}
			
			return utils.trim(className);
		}
		
		/**
		 * Processes class name
		 * @param {String} name Class name item to process
		 * @param {AbbreviationNode} item Host node for provided class name
		 * @returns Processed class name. May return <code>Array</code> of
		 * class names 
		 */
		function processClassName(name, item) {
			name = transformClassName(name, item, 'element');
			name = transformClassName(name, item, 'modifier');
			
			// expand class name
			// possible values:
			// * block__element
			// * block__element_modifier
			// * block__element_modifier1_modifier2
			// * block_modifier
			var block = '', element = '', modifier = '';
			var separators = getSeparators();
			if (~name.indexOf(separators.element)) {
				var elements = name.split(separators.element);
				block = elements.shift();
	
				var modifiers = elements.pop().split(separators.modifier);
				elements.push(modifiers.shift());
				element = elements.join(separators.element);
				modifier = modifiers.join(separators.modifier);
			} else if (~name.indexOf(separators.modifier)) {
				var blockModifiers = name.split(separators.modifier);
				
				block = blockModifiers.shift();
				modifier = blockModifiers.join(separators.modifier);
			}
			
			if (block || element || modifier) {
				if (!block) {
					block = item.__bem.block;
				}
				
				// inherit parent bem element, if exists
	//			if (item.parent && item.parent.__bem && item.parent.__bem.element)
	//				element = item.parent.__bem.element + separators.element + element;
				
				// produce multiple classes
				var prefix = block;
				var result = [];
				
				if (element) {
					prefix += separators.element + element;
					result.push(prefix);
				} else {
					result.push(prefix);
				}
				
				if (modifier) {
					result.push(prefix + separators.modifier + modifier);
				}
				
				item.__bem.block = block;
				item.__bem.element = element;
				item.__bem.modifier = modifier;
				
				return result;
			}
			
			// ...otherwise, return processed or original class name
			return name;
		}
		
		/**
		 * Low-level function to transform user-typed class name into full BEM class
		 * @param {String} name Class name item to process
		 * @param {AbbreviationNode} item Host node for provided class name
		 * @param {String} entityType Type of entity to be tried to transform 
		 * ('element' or 'modifier')
		 * @returns {String} Processed class name or original one if it can't be
		 * transformed
		 */
		function transformClassName(name, item, entityType) {
			var separators = getSeparators();
			var reSep = new RegExp('^(' + separators[entityType] + ')+', 'g');
			if (reSep.test(name)) {
				var depth = 0; // parent lookup depth
				var cleanName = name.replace(reSep, function(str) {
					depth = str.length / separators[entityType].length;
					return '';
				});
				
				// find donor element
				var donor = item;
				while (donor.parent && depth--) {
					donor = donor.parent;
				}
				
				if (!donor || !donor.__bem)
					donor = item;
				
				if (donor && donor.__bem) {
					var prefix = donor.__bem.block;
					
					// decide if we should inherit element name
	//				if (entityType == 'element') {
	//					var curElem = cleanName.split(separators.modifier, 1)[0];
	//					if (donor.__bem.element && donor.__bem.element != curElem)
	//						prefix += separators.element + donor.__bem.element;
	//				}
					
					if (entityType == 'modifier' &&  donor.__bem.element)
						prefix += separators.element + donor.__bem.element;
					
					return prefix + separators[entityType] + cleanName;
				}
			}
			
			return name;
		}
		
		/**
		 * Recursive function for processing tags, which extends class names 
		 * according to BEM specs: http://bem.github.com/bem-method/pages/beginning/beginning.ru.html
		 * <br><br>
		 * It does several things:<br>
		 * <ul>
		 * <li>Expands complex class name (according to BEM symbol semantics):
		 * .block__elem_modifier → .block.block__elem.block__elem_modifier
		 * </li>
		 * <li>Inherits block name on child elements: 
		 * .b-block > .__el > .__el → .b-block > .b-block__el > .b-block__el__el
		 * </li>
		 * <li>Treats first dash symbol as '__'</li>
		 * <li>Double underscore (or typographic '–') is also treated as an element 
		 * level lookup, e.g. ____el will search for element definition in parent’s 
		 * parent element:
		 * .b-block > .__el1 > .____el2 → .b-block > .b-block__el1 > .b-block__el2
		 * </li>
		 * </ul>
		 * 
		 * @param {AbbreviationNode} tree
		 * @param {Object} profile
		 */
		function process(tree, profile) {
			if (tree.name) {
				bemParse(tree, profile);
			}
			
			tree.children.forEach(function(item) {
				process(item, profile);
				if (!abbreviationUtils.isSnippet(item) && item.start) {
					shouldRunHtmlFilter = true;
				}
			});
			
			return tree;
		}
	
		return function(tree, profile) {
			shouldRunHtmlFilter = false;
			tree = process(tree, profile);
			// in case 'bem' filter is applied after 'html' filter: run it again
			// to update output
			if (shouldRunHtmlFilter) {
				tree = htmlFilter(tree, profile);
			}
			
			return tree;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Comment important tags (with 'id' and 'class' attributes)
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var prefs = __webpack_require__(26);
		var utils = __webpack_require__(22);
		var template = __webpack_require__(97);
		var abbrUtils = __webpack_require__(55);
		var filterCore = __webpack_require__(54);
		
		prefs.define('filter.commentAfter', 
				'\n<!-- /<%= attr("id", "#") %><%= attr("class", ".") %> -->',
				'A definition of comment that should be placed <i>after</i> matched '
				+ 'element when <code>comment</code> filter is applied. This definition '
				+ 'is an ERB-style template passed to <code>_.template()</code> '
				+ 'function (see Underscore.js docs for details). In template context, '
				+ 'the following properties and functions are availabe:\n'
				+ '<ul>'
				
				+ '<li><code>attr(name, before, after)</code> – a function that outputs' 
				+ 'specified attribute value concatenated with <code>before</code> ' 
				+ 'and <code>after</code> strings. If attribute doesn\'t exists, the ' 
				+ 'empty string will be returned.</li>'
				
				+ '<li><code>node</code> – current node (instance of <code>AbbreviationNode</code>)</li>'
				
				+ '<li><code>name</code> – name of current tag</li>'
				
				+ '<li><code>padding</code> – current string padding, can be used ' 
				+ 'for formatting</li>'
				
				+'</ul>');
		
		prefs.define('filter.commentBefore', 
				'',
				'A definition of comment that should be placed <i>before</i> matched '
				+ 'element when <code>comment</code> filter is applied. '
				+ 'For more info, read description of <code>filter.commentAfter</code> '
				+ 'property');
		
		prefs.define('filter.commentTrigger', 'id, class',
				'A comma-separated list of attribute names that should exist in abbreviatoin '
				+ 'where comment should be added. If you wish to add comment for '
				+ 'every element, set this option to <code>*</code>');
		
		/**
		 * Add comments to tag
		 * @param {AbbreviationNode} node
		 */
		function addComments(node, templateBefore, templateAfter) {
			// check if comments should be added
			var trigger = prefs.get('filter.commentTrigger');
			if (trigger != '*') {
				var shouldAdd = utils.find(trigger.split(','), function(name) {
					return !!node.attribute(utils.trim(name));
				});
	
				if (!shouldAdd) {
					return;
				}
			}
			
			var ctx = {
				node: node,
				name: node.name(),
				padding: node.parent ? node.parent.padding : '',
				attr: function(name, before, after) {
					var attr = node.attribute(name);
					if (attr) {
						return (before || '') + attr + (after || '');
					}
					
					return '';
				}
			};
			
			var nodeBefore = templateBefore ? templateBefore(ctx) : '';
			var nodeAfter = templateAfter ? templateAfter(ctx) : '';
			
			node.start = node.start.replace(/</, nodeBefore + '<');
			node.end = node.end.replace(/>/, '>' + nodeAfter);
		}
		
		function process(tree, before, after) {
			tree.children.forEach(function(item) {
				if (abbrUtils.isBlock(item)) {
					addComments(item, before, after);
				}
				
				process(item, before, after);
			});
				
			return tree;
		}
	
		return function(tree) {
			var templateBefore = template(prefs.get('filter.commentBefore'));
			var templateAfter = template(prefs.get('filter.commentAfter'));
			
			return process(tree, templateBefore, templateAfter);
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Filter for outputting CSS and alike
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		/**
		 * Test if passed item is very first child in parsed tree
		 * @param {AbbreviationNode} item
		 */
		function isVeryFirstChild(item) {
			return item.parent && !item.parent.parent && !item.index();
		}
	
		return function process(tree, profile, level) {
			level = level || 0;
			
			tree.children.forEach(function(item) {
				if (!isVeryFirstChild(item) && profile.tag_nl !== false) {
					item.start = '\n' + item.start;
				}
				process(item, profile, level + 1);
			});
			
			return tree;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Filter for escaping unsafe XML characters: <, >, &
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var charMap = {
			'<': '&lt;',
			'>': '&gt;',
			'&': '&amp;'
		};
		
		function escapeChars(str) {
			return str.replace(/([<>&])/g, function(str, p1){
				return charMap[p1];
			});
		}
		
		return function process(tree) {
			tree.children.forEach(function(item) {
				item.start = escapeChars(item.start);
				item.end = escapeChars(item.end);
				item.content = escapeChars(item.content);
				process(item);
			});
			
			return tree;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Generic formatting filter: creates proper indentation for each tree node,
	 * placing "%s" placeholder where the actual output should be. You can use
	 * this filter to preformat tree and then replace %s placeholder to whatever you
	 * need. This filter should't be called directly from editor as a part 
	 * of abbreviation.
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var abbrUtils = __webpack_require__(55);
		var prefs = __webpack_require__(26);
		var resources = __webpack_require__(27);
	
		prefs.define('format.noIndentTags', 'html', 
				'A comma-separated list of tag names that should not get inner indentation.');
		
		prefs.define('format.forceIndentationForTags', 'body', 
			'A comma-separated list of tag names that should <em>always</em> get inner indentation.');
	
		var placeholder = '%s';
		
		/**
		 * Get indentation for given node
		 * @param {AbbreviationNode} node
		 * @returns {String}
		 */
		function getIndentation(node) {
			var items = prefs.getArray('format.noIndentTags') || [];
			if (~items.indexOf(node.name())) {
				return '';
			}
			
			return '\t';
		}
		
		/**
		 * Test if passed node has block-level sibling element
		 * @param {AbbreviationNode} item
		 * @return {Boolean}
		 */
		function hasBlockSibling(item) {
			return item.parent && abbrUtils.hasBlockChildren(item.parent);
		}
		
		/**
		 * Test if passed item is very first child in parsed tree
		 * @param {AbbreviationNode} item
		 */
		function isVeryFirstChild(item) {
			return item.parent && !item.parent.parent && !item.index();
		}
		
		/**
		 * Check if a newline should be added before element
		 * @param {AbbreviationNode} node
		 * @param {OutputProfile} profile
		 * @return {Boolean}
		 */
		function shouldAddLineBreak(node, profile) {
			if (profile.tag_nl === true || abbrUtils.isBlock(node))
				return true;
			
			if (!node.parent || !profile.inline_break)
				return false;
			
			// check if there are required amount of adjacent inline element
			return shouldFormatInline(node.parent, profile);
	}
		
		/**
		 * Need to add newline because <code>item</code> has too many inline children
		 * @param {AbbreviationNode} node
		 * @param {OutputProfile} profile
		 */
		function shouldBreakChild(node, profile) {
			// we need to test only one child element, because 
			// hasBlockChildren() method will do the rest
			return node.children.length && shouldAddLineBreak(node.children[0], profile);
		}
		
		function shouldFormatInline(node, profile) {
			var nodeCount = 0;
			return !!utils.find(node.children, function(child) {
				if (child.isTextNode() || !abbrUtils.isInline(child))
					nodeCount = 0;
				else if (abbrUtils.isInline(child))
					nodeCount++;
				
				if (nodeCount >= profile.inline_break)
					return true;
			});
		}
		
		function isRoot(item) {
			return !item.parent;
		}
		
		/**
		 * Processes element with matched resource of type <code>snippet</code>
		 * @param {AbbreviationNode} item
		 * @param {OutputProfile} profile
		 */
		function processSnippet(item, profile) {
			item.start = item.end = '';
			if (!isVeryFirstChild(item) && profile.tag_nl !== false && shouldAddLineBreak(item, profile)) {
				// check if we’re not inside inline element
				if (isRoot(item.parent) || !abbrUtils.isInline(item.parent)) {
					item.start = '\n' + item.start;
				}
			}
			
			return item;
		}
		
		/**
		 * Check if we should add line breaks inside inline element
		 * @param {AbbreviationNode} node
		 * @param {OutputProfile} profile
		 * @return {Boolean}
		 */
		function shouldBreakInsideInline(node, profile) {
			var hasBlockElems = node.children.some(function(child) {
				if (abbrUtils.isSnippet(child))
					return false;
				
				return !abbrUtils.isInline(child);
			});
			
			if (!hasBlockElems) {
				return shouldFormatInline(node, profile);
			}
			
			return true;
		}
		
		/**
		 * Processes element with <code>tag</code> type
		 * @param {AbbreviationNode} item
		 * @param {OutputProfile} profile
		 */
		function processTag(item, profile) {
			item.start = item.end = placeholder;
			var isUnary = abbrUtils.isUnary(item);
			var nl = '\n';
			var indent = getIndentation(item);
				
			// formatting output
			if (profile.tag_nl !== false) {
				var forceNl = profile.tag_nl === true && (profile.tag_nl_leaf || item.children.length);
				if (!forceNl) {
					var forceIndentTags = prefs.getArray('format.forceIndentationForTags') || [];
					forceNl = ~forceIndentTags.indexOf(item.name());
				}
				
				// formatting block-level elements
				if (!item.isTextNode()) {
					if (shouldAddLineBreak(item, profile)) {
						// - do not indent the very first element
						// - do not indent first child of a snippet
						if (!isVeryFirstChild(item) && (!abbrUtils.isSnippet(item.parent) || item.index()))
							item.start = nl + item.start;
							
						if (abbrUtils.hasBlockChildren(item) || shouldBreakChild(item, profile) || (forceNl && !isUnary))
							item.end = nl + item.end;
							
						if (abbrUtils.hasTagsInContent(item) || (forceNl && !item.children.length && !isUnary))
							item.start += nl + indent;
					} else if (abbrUtils.isInline(item) && hasBlockSibling(item) && !isVeryFirstChild(item)) {
						item.start = nl + item.start;
					} else if (abbrUtils.isInline(item) && shouldBreakInsideInline(item, profile)) {
						item.end = nl + item.end;
					}
					
					item.padding = indent;
				}
			}
			
			return item;
		}
	
		/**
		 * Processes simplified tree, making it suitable for output as HTML structure
		 * @param {AbbreviationNode} tree
		 * @param {OutputProfile} profile
		 * @param {Number} level Depth level
		 */
		return function process(tree, profile, level) {
			level = level || 0;
		
			tree.children.forEach(function(item) {
				if (abbrUtils.isSnippet(item)) {
					processSnippet(item, profile, level);
				} else {
					processTag(item, profile, level);
				}
				
				process(item, profile, level + 1);
			});
			
			return tree;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Filter for producing HAML code from abbreviation.
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var abbrUtils = __webpack_require__(55);
		var formatFilter = __webpack_require__(77);
	
		function transformClassName(className) {
			return utils.trim(className).replace(/\s+/g, '.');
		}
	
		/**
		 * Condenses all "data-" attributes into a single entry.
		 * HAML allows data attributes to be ouputted as a sub-hash
		 * of `:data` key
		 * @param  {Array} attrs
		 * @return {Array}
		 */
		function condenseDataAttrs(attrs) {
			var out = [], data = null;
			var reData = /^data-/i;
			attrs.forEach(function(attr) {
				if (reData.test(attr.name)) {
					if (!data) {
						data = [];
						out.push({
							name: 'data',
							value: data
						});
					}
	
					data.push(utils.extend({}, attr, {name: attr.name.replace(reData, '')}));
				} else {
					out.push(attr);
				}
			});
	
			return out;
		}
	
		function stringifyAttrs(attrs, profile) {
			var attrQuote = profile.attributeQuote();
			return '{' + attrs.map(function(attr) {
				var value = attrQuote + attr.value + attrQuote;
				if (Array.isArray(attr.value)) {
					value = stringifyAttrs(attr.value, profile);
				} else if (attr.isBoolean) {
					value = 'true';
				}
	
				return ':' + attr.name + ' => ' + value
			}).join(', ') + '}';
		}
		
		/**
		 * Creates HAML attributes string from tag according to profile settings
		 * @param {AbbreviationNode} tag
		 * @param {Object} profile
		 */
		function makeAttributesString(tag, profile) {
			var attrs = '';
			var otherAttrs = [];
			var attrQuote = profile.attributeQuote();
			var cursor = profile.cursor();
			
			tag.attributeList().forEach(function(a) {
				var attrName = profile.attributeName(a.name);
				switch (attrName.toLowerCase()) {
					// use short notation for ID and CLASS attributes
					case 'id':
						attrs += '#' + (a.value || cursor);
						break;
					case 'class':
						attrs += '.' + transformClassName(a.value || cursor);
						break;
					// process other attributes
					default:
						otherAttrs.push({
							name: attrName,
							value: a.value || cursor,
							isBoolean: profile.isBoolean(a.name, a.value)
						});
				}
			});
			
			if (otherAttrs.length) {
				attrs += stringifyAttrs(condenseDataAttrs(otherAttrs), profile);
			}
			
			return attrs;
		}
		
		/**
		 * Processes element with <code>tag</code> type
		 * @param {AbbreviationNode} item
		 * @param {OutputProfile} profile
		 */
		function processTag(item, profile) {
			if (!item.parent)
				// looks like it's root element
				return item;
			
			var attrs = makeAttributesString(item, profile);
			var cursor = profile.cursor();
			var isUnary = abbrUtils.isUnary(item);
			var selfClosing = profile.self_closing_tag && isUnary ? '/' : '';
			var start= '';
				
			// define tag name
			var tagName = '%' + profile.tagName(item.name());
			if (tagName.toLowerCase() == '%div' && attrs && attrs.indexOf('{') == -1)
				// omit div tag
				tagName = '';
				
			item.end = '';
			start = tagName + attrs + selfClosing;
			if (item.content && !/^\s/.test(item.content)) {
				item.content = ' ' + item.content;
			}
			
			var placeholder = '%s';
			// We can't just replace placeholder with new value because
			// JavaScript will treat double $ character as a single one, assuming
			// we're using RegExp literal.
			item.start = utils.replaceSubstring(item.start, start, item.start.indexOf(placeholder), placeholder);
			
			if (!item.children.length && !isUnary)
				item.start += cursor;
			
			return item;
		}
	
		return function process(tree, profile, level) {
			level = level || 0;
			
			if (!level) {
				tree = formatFilter(tree, '_format', profile);
			}
			
			tree.children.forEach(function(item) {
				if (!abbrUtils.isSnippet(item)) {
					processTag(item, profile, level);
				}
				
				process(item, profile, level + 1);
			});
			
			return tree;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Filter that produces HTML tree
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var abbrUtils = __webpack_require__(55);
		var utils = __webpack_require__(22);
		var tabStops = __webpack_require__(31);
		var formatFilter = __webpack_require__(77);
	
		/**
		 * Creates HTML attributes string from tag according to profile settings
		 * @param {AbbreviationNode} node
		 * @param {OutputProfile} profile
		 */
		function makeAttributesString(node, profile) {
			var attrQuote = profile.attributeQuote();
			var cursor = profile.cursor();
			
			return node.attributeList().map(function(a) {
				var isBoolean = profile.isBoolean(a.name, a.value);
				var attrName = profile.attributeName(a.name);
				var attrValue = isBoolean ? attrName : a.value;
				if (isBoolean && profile.allowCompactBoolean()) {
					return ' ' + attrName;
				}
				return ' ' + attrName + '=' + attrQuote + (attrValue || cursor) + attrQuote;
			}).join('');
		}
		
		/**
		 * Processes element with <code>tag</code> type
		 * @param {AbbreviationNode} item
		 * @param {OutputProfile} profile
		 */
		function processTag(item, profile) {
			if (!item.parent) { // looks like it's root element
				return item;
			}
			
			var attrs = makeAttributesString(item, profile); 
			var cursor = profile.cursor();
			var isUnary = abbrUtils.isUnary(item);
			var start = '';
			var end = '';
				
			// define opening and closing tags
			if (!item.isTextNode()) {
				var tagName = profile.tagName(item.name());
				if (isUnary) {
					start = '<' + tagName + attrs + profile.selfClosing() + '>';
					item.end = '';
				} else {
					start = '<' + tagName + attrs + '>';
					end = '</' + tagName + '>';
				}
			}
			
			var placeholder = '%s';
			// We can't just replace placeholder with new value because
			// JavaScript will treat double $ character as a single one, assuming
			// we're using RegExp literal.
			item.start = utils.replaceSubstring(item.start, start, item.start.indexOf(placeholder), placeholder);
			item.end = utils.replaceSubstring(item.end, end, item.end.indexOf(placeholder), placeholder);
			
			// should we put caret placeholder after opening tag?
			if (
					!item.children.length 
					&& !isUnary 
					&& !~item.content.indexOf(cursor)
					&& !tabStops.extract(item.content).tabstops.length
				) {
				item.start += cursor;
			}
			
			return item;
		}
	
		return function process(tree, profile, level) {
			level = level || 0;
			
			if (!level) {
				tree = formatFilter(tree, profile, level)
			}
			
			tree.children.forEach(function(item) {
				if (!abbrUtils.isSnippet(item)) {
					processTag(item, profile, level);
				}
				
				process(item, profile, level + 1);
			});
			
			return tree;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Filter for producing Jade code from abbreviation.
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var abbrUtils = __webpack_require__(55);
		var formatFilter = __webpack_require__(77);
		var tabStops = __webpack_require__(31);
		var profile = __webpack_require__(28);
	
		var reNl = /[\n\r]/;
		var reIndentedText = /^\s*\|/;
		var reSpace = /^\s/;
	
		function transformClassName(className) {
			return utils.trim(className).replace(/\s+/g, '.');
		}
	
		function stringifyAttrs(attrs, profile) {
			var attrQuote = profile.attributeQuote();
			return '(' + attrs.map(function(attr) {
				if (attr.isBoolean) {
					return attr.name;
				}
	
				return attr.name + '=' + attrQuote + attr.value + attrQuote;
			}).join(', ') + ')';
		}
		
		/**
		 * Creates HAML attributes string from tag according to profile settings
		 * @param {AbbreviationNode} tag
		 * @param {Object} profile
		 */
		function makeAttributesString(tag, profile) {
			var attrs = '';
			var otherAttrs = [];
			var attrQuote = profile.attributeQuote();
			var cursor = profile.cursor();
			
			tag.attributeList().forEach(function(a) {
				var attrName = profile.attributeName(a.name);
				switch (attrName.toLowerCase()) {
					// use short notation for ID and CLASS attributes
					case 'id':
						attrs += '#' + (a.value || cursor);
						break;
					case 'class':
						attrs += '.' + transformClassName(a.value || cursor);
						break;
					// process other attributes
					default:
						otherAttrs.push({
							name: attrName,
							value: a.value || cursor,
							isBoolean: profile.isBoolean(a.name, a.value)
						});
				}
			});
			
			if (otherAttrs.length) {
				attrs += stringifyAttrs(otherAttrs, profile);
			}
			
			return attrs;
		}
	
		function processTagContent(item) {
			if (!item.content) {
				return;
			}
	
			var content = tabStops.replaceVariables(item.content, function(str, name) {
				if (name === 'nl' || name === 'newline') {
					return '\n';
				}
				return str;
			});
	
			if (reNl.test(content) && !reIndentedText.test(content)) {
				// multiline content: pad it with indentation and pipe
				var pad = '| ';
				item.content = '\n' + pad + utils.padString(content, pad);
			} else if (!reSpace.test(content)) {
				item.content = ' ' + content;
			}
		}
		
		/**
		 * Processes element with <code>tag</code> type
		 * @param {AbbreviationNode} item
		 * @param {OutputProfile} profile
		 */
		function processTag(item, profile) {
			if (!item.parent)
				// looks like it's a root (empty) element
				return item;
			
			var attrs = makeAttributesString(item, profile);
			var cursor = profile.cursor();
			var isUnary = abbrUtils.isUnary(item);
				
			// define tag name
			var tagName = profile.tagName(item.name());
			if (tagName.toLowerCase() == 'div' && attrs && attrs.charAt(0) != '(')
				// omit div tag
				tagName = '';
				
			item.end = '';
			var start = tagName + attrs;
			processTagContent(item);
	
			var placeholder = '%s';
			// We can't just replace placeholder with new value because
			// JavaScript will treat double $ character as a single one, assuming
			// we're using RegExp literal.
			item.start = utils.replaceSubstring(item.start, start, item.start.indexOf(placeholder), placeholder);
			
			if (!item.children.length && !isUnary)
				item.start += cursor;
			
			return item;
		}
	
		return function process(tree, curProfile, level) {
			level = level || 0;
			
			if (!level) {
				// always format with `xml` profile since
				// Jade requires all tags to be on separate lines
				tree = formatFilter(tree, profile.get('xml'));
			}
			
			tree.children.forEach(function(item) {
				if (!abbrUtils.isSnippet(item)) {
					processTag(item, curProfile, level);
				}
				
				process(item, curProfile, level + 1);
			});
			
			return tree;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Output abbreviation on a single line (i.e. no line breaks)
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var abbrUtils = __webpack_require__(55);
		var rePad = /^\s+/;
		var reNl = /[\n\r]/g;
	
		return function process(tree) {
			tree.children.forEach(function(item) {
				if (!abbrUtils.isSnippet(item)) {
					// remove padding from item 
					item.start = item.start.replace(rePad, '');
					item.end = item.end.replace(rePad, '');
				}
				
				// remove newlines 
				item.start = item.start.replace(reNl, '');
				item.end = item.end.replace(reNl, '');
				item.content = item.content.replace(reNl, '');
				
				process(item);
			});
			
			return tree;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Filter for producing Jade code from abbreviation.
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var abbrUtils = __webpack_require__(55);
		var formatFilter = __webpack_require__(77);
		var tabStops = __webpack_require__(31);
		var prefs = __webpack_require__(26);
		var profile = __webpack_require__(28);
	
		var reNl = /[\n\r]/;
		var reIndentedText = /^\s*\|/;
		var reSpace = /^\s/;
	
		prefs.define('slim.attributesWrapper', 'none', 
			'Defines how attributes will be wrapped:' +
			'<ul>' +
			'<li><code>none</code> – no wrapping;</li>' +
			'<li><code>round</code> — wrap attributes with round braces;</li>' +
			'<li><code>square</code> — wrap attributes with round braces;</li>' +
			'<li><code>curly</code> — wrap attributes with curly braces.</li>' +
			'</ul>');
	
		function transformClassName(className) {
			return utils.trim(className).replace(/\s+/g, '.');
		}
	
		function getAttrWrapper() {
			var start = ' ', end = '';
			switch (prefs.get('slim.attributesWrapper')) {
				case 'round':
					start = '(';
					end = ')';
					break;
				case 'square':
					start = '[';
					end = ']';
					break;
				case 'curly':
					start = '{';
					end = '}';
					break;
			}
	
			return {
				start: start,
				end: end
			};
		}
	
		function stringifyAttrs(attrs, profile) {
			var attrQuote = profile.attributeQuote();
			var attrWrap = getAttrWrapper();
			return attrWrap.start + attrs.map(function(attr) {
				var value = attrQuote + attr.value + attrQuote;
				if (attr.isBoolean) {
					if (!attrWrap.end) {
						value = 'true';
					} else {
						return attr.name;
					}
				}
	
				return attr.name + '=' + value;
			}).join(' ') + attrWrap.end;
		}
		
		/**
		 * Creates HAML attributes string from tag according to profile settings
		 * @param {AbbreviationNode} tag
		 * @param {Object} profile
		 */
		function makeAttributesString(tag, profile) {
			var attrs = '';
			var otherAttrs = [];
			var attrQuote = profile.attributeQuote();
			var cursor = profile.cursor();
			
			tag.attributeList().forEach(function(a) {
				var attrName = profile.attributeName(a.name);
				switch (attrName.toLowerCase()) {
					// use short notation for ID and CLASS attributes
					case 'id':
						attrs += '#' + (a.value || cursor);
						break;
					case 'class':
						attrs += '.' + transformClassName(a.value || cursor);
						break;
					// process other attributes
					default:
						otherAttrs.push({
							name: attrName,
							value: a.value || cursor,
							isBoolean: profile.isBoolean(a.name, a.value)
						});
				}
			});
			
			if (otherAttrs.length) {
				attrs += stringifyAttrs(otherAttrs, profile);
			}
			
			return attrs;
		}
	
		function processTagContent(item) {
			if (!item.content) {
				return;
			}
	
			var content = tabStops.replaceVariables(item.content, function(str, name) {
				if (name === 'nl' || name === 'newline') {
					return '\n';
				}
				return str;
			});
	
			if (reNl.test(content) && !reIndentedText.test(content)) {
				// multiline content: pad it with indentation and pipe
				var pad = '  ';
				item.content = '\n| ' + utils.padString(content, pad);
			} else if (!reSpace.test(content)) {
				item.content = ' ' + content;
			}
		}
		
		/**
		 * Processes element with <code>tag</code> type
		 * @param {AbbreviationNode} item
		 * @param {OutputProfile} profile
		 */
		function processTag(item, profile) {
			if (!item.parent)
				// looks like it's a root (empty) element
				return item;
			
			var attrs = makeAttributesString(item, profile);
			var cursor = profile.cursor();
			var isUnary = abbrUtils.isUnary(item);
			var selfClosing = profile.self_closing_tag && isUnary ? '/' : '';
				
			// define tag name
			var tagName = profile.tagName(item.name());
			if (tagName.toLowerCase() == 'div' && attrs && '([{'.indexOf(attrs.charAt(0)) == -1)
				// omit div tag
				tagName = '';
				
			item.end = '';
			var start = tagName + attrs + selfClosing;
			processTagContent(item);
	
			var placeholder = '%s';
			// We can't just replace placeholder with new value because
			// JavaScript will treat double $ character as a single one, assuming
			// we're using RegExp literal.
			item.start = utils.replaceSubstring(item.start, start, item.start.indexOf(placeholder), placeholder);
			
			if (!item.children.length && !isUnary)
				item.start += cursor;
			
			return item;
		}
	
		return function process(tree, curProfile, level) {
			level = level || 0;
			
			if (!level) {
				// always format with `xml` profile since
				// Slim requires all tags to be on separate lines
				tree = formatFilter(tree, profile.get('xml'));
			}
			
			tree.children.forEach(function(item) {
				if (!abbrUtils.isSnippet(item)) {
					processTag(item, curProfile, level);
				}
				
				process(item, curProfile, level + 1);
			});
			
			return tree;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Trim filter: removes characters at the beginning of the text
	 * content that indicates lists: numbers, #, *, -, etc.
	 * 
	 * Useful for wrapping lists with abbreviation.
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var prefs = __webpack_require__(26);
		prefs.define('filter.trimRegexp', 
			'[\\s|\\u00a0]*[\\d|#|\\-|\*|\\u2022]+\\.?\\s*',
			'Regular expression used to remove list markers (numbers, dashes, ' 
			+ 'bullets, etc.) in <code>t</code> (trim) filter. The trim filter '
			+ 'is useful for wrapping with abbreviation lists, pased from other ' 
			+ 'documents (for example, Word documents).');
		
		function process(tree, re) {
			tree.children.forEach(function(item) {
				if (item.content) {
					item.content = item.content.replace(re, '');
				}
				
				process(item, re);
			});
			
			return tree;
		}
	
		return function(tree) {
			var re = new RegExp(prefs.get('filter.trimRegexp'));
			return process(tree, re);
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Filter for trimming "select" attributes from some tags that contains
	 * child elements
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var abbrUtils = __webpack_require__(55);
	
		var tags = {
			'xsl:variable': 1,
			'xsl:with-param': 1
		};
		
		/**
		 * Removes "select" attribute from node
		 * @param {AbbreviationNode} node
		 */
		function trimAttribute(node) {
			node.start = node.start.replace(/\s+select\s*=\s*(['"]).*?\1/, '');
		}
	
		return function process(tree) {
			tree.children.forEach(function(item) {
				if (!abbrUtils.isSnippet(item)
						&& (item.name() || '').toLowerCase() in tags 
						&& item.children.length)
					trimAttribute(item);
				process(item);
			});
			
			return tree;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * High-level editor interface that communicates with underlying editor (like 
	 * TinyMCE, CKEditor, etc.) or browser.
	 * Basically, you should call <code>editor.setContext(obj)</code> method to
	 * set up undelying editor context before using any other method.
	 * 
	 * This interface is used by <i>actions</i> for performing different 
	 * actions like <b>Expand abbreviation</b>  
	 * @type IEmmetEditor
	 * @constructor
	 * 
	 * @author Sergey Chikuyonok (serge.che@gmail.com)
	 * @link http://chikuyonok.ru
	 */
	function IEmmetEditor() {}
	
	IEmmetEditor.prototype = {
		/**
		 * Returns character indexes of selected text: object with <code>start</code>
		 * and <code>end</code> properties. If there's no selection, should return 
		 * object with <code>start</code> and <code>end</code> properties referring
		 * to current caret position
		 * @return {Object}
		 * @example
		 * var selection = editor.getSelectionRange();
		 * alert(selection.start + ', ' + selection.end); 
		 */
		getSelectionRange: function() {
			return {
				start: 0,
				end: 0
			};
		},
		
		/**
		 * Creates selection from <code>start</code> to <code>end</code> character
		 * indexes. If <code>end</code> is ommited, this method should place caret 
		 * and <code>start</code> index
		 * @param {Number} start
		 * @param {Number} [end]
		 * @example
		 * editor.createSelection(10, 40);
		 * 
		 * //move caret to 15th character
		 * editor.createSelection(15);
		 */
		createSelection: function(start, end) {},
		
		/**
		 * Returns current line's start and end indexes as object with <code>start</code>
		 * and <code>end</code> properties
		 * @return {Object}
		 * @example
		 * var range = editor.getCurrentLineRange();
		 * alert(range.start + ', ' + range.end);
		 */
		getCurrentLineRange: function() {
			return {
				start: 0, 
				end: 0
			};
		},
		
		/**
		 * Returns current caret position
		 * @return {Number|null}
		 */
		getCaretPos: function(){},
		
		/**
		 * Set new caret position
		 * @param {Number} pos Caret position
		 */
		setCaretPos: function(pos){},
		
		/**
		 * Returns content of current line
		 * @return {String}
		 */
		getCurrentLine: function() {},
		
		/**
		 * Replace editor's content or it's part (from <code>start</code> to 
		 * <code>end</code> index). If <code>value</code> contains 
		 * <code>caret_placeholder</code>, the editor will put caret into 
		 * this position. If you skip <code>start</code> and <code>end</code>
		 * arguments, the whole target's content will be replaced with 
		 * <code>value</code>. 
		 * 
		 * If you pass <code>start</code> argument only,
		 * the <code>value</code> will be placed at <code>start</code> string 
		 * index of current content. 
		 * 
		 * If you pass <code>start</code> and <code>end</code> arguments,
		 * the corresponding substring of current target's content will be 
		 * replaced with <code>value</code>. 
		 * @param {String} value Content you want to paste
		 * @param {Number} [start] Start index of editor's content
		 * @param {Number} [end] End index of editor's content
		 * @param {Boolean} [no_indent] Do not auto indent <code>value</code>
		 */
		replaceContent: function(value, start, end, no_indent) {},
		
		/**
		 * Returns editor's content
		 * @return {String}
		 */
		getContent: function(){},
		
		/**
		 * Returns current editor's syntax mode
		 * @return {String}
		 */
		getSyntax: function(){
			return 'html';
		},
		
		/**
		 * Returns current output profile name (see profile module).
		 * In most cases, this method should return <code>null</code> and let 
		 * Emmet guess best profile name for current syntax and user data.
		 * In case you’re using advanced editor with access to syntax scopes 
		 * (like Sublime Text 2), you can return syntax name for current scope. 
		 * For example, you may return `line` profile when editor caret is inside
		 * string of programming language.
		 *  
		 * @return {String}
		 */
		getProfileName: function() {
			return 'xhtml';
		},
		
		/**
		 * Ask user to enter something
		 * @param {String} title Dialog title
		 * @return {String} Entered data
		 * @since 0.65
		 */
		prompt: function(title) {
			return '';
		},
		
		/**
		 * Returns current selection
		 * @return {String}
		 * @since 0.65
		 */
		getSelection: function() {
			return '';
		},
		
		/**
		 * Returns current editor's file path
		 * @return {String}
		 * @since 0.65 
		 */
		getFilePath: function() {
			return '';
		}
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Emmet file i/o interface. Plugin developers should implement this 
	 * interface in order to make some actions to work.
	 * 
	 * This interface should be defined as <code>emmet.define('file')</code>
	 * module
	 * 
	 * @type IEmmetFile
	 * @constructor
	 * @author Sergey Chikuyonok (serge.che@gmail.com)
	 * @link http://chikuyonok.ru
	 * @version 0.65
	 */
	function IEmmetFile() {}
	
	IEmmetFile.prototype = {
		/**
		 * Read file content and return it
		 * @param {String} path File's relative or absolute path
		 * @param {Number} size Number of bytes to read, optional. If not specified, 
		 * reads full file
		 * @param {Function} callback Callback function invoked when reading is
		 * completed
		 * @return {String}
		 */
		read: function(path, size, callback) {
			return '';
		},
		
		/**
		 * Locate <code>file_name</code> file that relates to <code>editor_file</code>.
		 * File name may be absolute or relative path
		 * 
		 * <b>Dealing with absolute path.</b>
		 * Many modern editors have a "project" support as information unit, but you
		 * should not rely on project path to find file with absolute path. First,
		 * it requires user to create a project before using this method (and this 
		 * is not very convenient). Second, project path doesn't always points to
		 * to website's document root folder: it may point, for example, to an 
		 * upper folder which contains server-side scripts.
		 * 
		 * For better result, you should use the following algorithm in locating
		 * absolute resources:
		 * 1) Get parent folder for <code>editorFile</code> as a start point
		 * 2) Append required <code>fileName</code> to start point and test if
		 * file exists
		 * 3) If it doesn't exists, move start point one level up (to parent folder)
		 * and repeat step 2.
		 * 
		 * @param {String} editorFile
		 * @param {String} fileName
		 * @return {String} Returns null if <code>fileName</code> cannot be located
		 */
		locateFile: function(editorFile, fileName) {
			return '';
		},
		
		/**
		 * Creates absolute path by concatenating <code>parent</code> and <code>file_name</code>.
		 * If <code>parent</code> points to file, its parent directory is used
		 * @param {String} parent
		 * @param {String} file_name
		 * @return {String}
		 */
		createPath: function(parent, fileName) {
			return '';
		},
		
		/**
		 * Saves <code>content</code> as <code>file</code>
		 * @param {String} file File's absolute path
		 * @param {String} content File content
		 */
		save: function(file, content) {
			
		},
		
		/**
		 * Returns file extension in lower case
		 * @param {String} file
		 * @return {String}
		 */
		getExt: function(file) {
			var m = (file || '').match(/\.([\w\-]+)$/);
			return m ? m[1].toLowerCase() : '';
		}
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var session = {tokens: null};
		
		// walks around the source
		var walker = {
			init: function (source) {
				// this.source = source.replace(/\r\n?/g, '\n');
				this.source = source;
				this.ch = '';
				this.chnum = -1;
			
				// advance
				this.nextChar();
			},
			nextChar: function () {
				return this.ch = this.source.charAt(++this.chnum);
			},
			peek: function() {
				return this.source.charAt(this.chnum + 1);
			}
		};
	
		// utility helpers
		function isNameChar(c, cc) {
			cc = cc || c.charCodeAt(0);
			return (
				(cc >= 97 && cc <= 122 /* a-z */) || 
				(cc >= 65 && cc <= 90 /* A-Z */) || 
				/* 
				Experimental: include cyrillic ranges 
				since some letters, similar to latin ones, can 
				accidentally appear in CSS tokens
				*/
				(cc >= 1024 && cc <= 1279) || 
				c === '&' || /* selector placeholder (LESS, SCSS) */
				c === '_' || 
				c === '<' || /* comparisons (LESS, SCSS) */
				c === '>' || 
				c === '=' || 
				c === '-'
			);
		}
	
		function isDigit(c, cc) {
			cc = cc || c.charCodeAt(0);
			return (cc >= 48 && cc <= 57);
		}
	
		var isOp = (function () {
			var opsa = "{}[]()+*=.,;:>~|\\%$#@^!".split(''),
				opsmatcha = "*^|$~".split(''),
				ops = {},
				opsmatch = {},
				i = 0;
			for (; i < opsa.length; i += 1) {
				ops[opsa[i]] = true;
			}
			for (i = 0; i < opsmatcha.length; i += 1) {
				opsmatch[opsmatcha[i]] = true;
			}
			return function (ch, matchattr) {
				if (matchattr) {
					return ch in opsmatch;
				}
				return ch in ops;
			};
		}());
		
		// creates token objects and pushes them to a list
		function tokener(value, type) {
			session.tokens.push({
				value: value,
				type:  type || value,
				start: null,
				end:   null
			});
		}
	
		function getPosInfo(w) {
			var errPos = w.chnum;
			var source = w.source.replace(/\r\n?/g, '\n');
			var part = w.source.substring(0, errPos + 1).replace(/\r\n?/g, '\n');
			var lines = part.split('\n');
			var ch = (lines[lines.length - 1] || '').length;
			var fullLine = source.split('\n')[lines.length - 1] || '';
			
			var chunkSize = 100;
			var offset = Math.max(0, ch - chunkSize);
			var formattedLine = fullLine.substr(offset, chunkSize * 2) + '\n';
			for (var i = 0; i < ch - offset - 1; i++) {
				formattedLine += '-';
			}
			formattedLine += '^';
	
			return {
				line: lines.length,
				ch: ch,
				text: fullLine,
				hint: formattedLine
			};
		}
	
		function raiseError(message) {
			var err = error(message);
			var errObj = new Error(err.message, '', err.line);
			errObj.line = err.line;
			errObj.ch = err.ch;
			errObj.name = err.name;
			errObj.hint = err.hint;
	
			throw errObj;
		}
		
		// oops
		function error(m) { 
			var w = walker;
			var info = getPosInfo(walker);
			var tokens = session.tokens;
			session.tokens = null;
	
			var message = 'CSS parsing error at line ' + info.line + ', char ' + info.ch + ': ' + m;
			message += '\n' +  info.hint;
			return {
				name: "ParseError",
				message: message,
				hint: info.hint,
				line: info.line,
				ch: info.ch
			};
		}
	
	
		// token handlers follow for:
		// white space, comment, string, identifier, number, operator
		function white() {
			var c = walker.ch,
				token = '';
		
			while (c === " " || c === "\t") {
				token += c;
				c = walker.nextChar();
			}
		
			tokener(token, 'white');
		
		}
	
		function comment() {
			var w = walker,
				c = w.ch,
				token = c,
				cnext;
		 
			cnext = w.nextChar();
	
			if (cnext === '/') {
				// inline comment in SCSS and LESS
				while (c && !(cnext === "\n" || cnext === "\r")) {
					token += cnext;
					c = cnext;
					cnext = w.nextChar();
				}
			} else if (cnext === '*') {
				// multiline CSS commment
				while (c && !(c === "*" && cnext === "/")) {
					token += cnext;
					c = cnext;
					cnext = w.nextChar();
				}
			} else {
				// oops, not a comment, just a /
				return tokener(token, token);
			}
			
			token += cnext;
			w.nextChar();
			tokener(token, 'comment');
		}
	
		function eatString() {
			var w = walker,
				c = w.ch,
				q = c,
				token = c,
				cnext;
		
			c = w.nextChar();
	
			while (c !== q) {
				if (c === '\n') {
					cnext = w.nextChar();
					if (cnext === "\\") {
						token += c + cnext;
					} else {
						// end of line with no \ escape = bad
						raiseError("Unterminated string");
					}
				} else {
					if (c === "\\") {
						token += c + w.nextChar();
					} else {
						token += c;
					}
				}
			
				c = w.nextChar();
			}
	
			token += c;
	
			return token;
		}
	
		function str() {
			var token = eatString();
			walker.nextChar();
			tokener(token, 'string');
		}
		
		function brace() {
			var w = walker,
				c = w.ch,
				depth = 1,
				token = c,
				stop = false;
		
			c = w.nextChar();
		
			while (c && !stop) {
				if (c === '(') {
					depth++;
				} else if (c === ')') {
					depth--;
					if (!depth) {
						stop = true;
					}
				} else if (c === '"' || c === "'") {
					c = eatString();
				} else if (c === '') {
					raiseError("Unterminated brace");
				}
				
				token += c;
				c = w.nextChar();
			}
			
			tokener(token, 'brace');
		}
	
		function identifier(pre) {
			var c = walker.ch;
			var token = pre ? pre + c : c;
				
			c = walker.nextChar();
			var cc = c.charCodeAt(0);
			while (isNameChar(c, cc) || isDigit(c, cc)) {
				token += c;
				c = walker.nextChar();
				cc = c.charCodeAt(0);
			}
		
			tokener(token, 'identifier');
		}
	
		function num() {
			var w = walker,
				c = w.ch,
				token = c,
				point = token === '.',
				nondigit;
			
			c = w.nextChar();
			nondigit = !isDigit(c);
		
			// .2px or .classname?
			if (point && nondigit) {
				// meh, NaN, could be a class name, so it's an operator for now
				return tokener(token, '.');    
			}
			
			// -2px or -moz-something
			if (token === '-' && nondigit) {
				return identifier('-');
			}
		
			while (c !== '' && (isDigit(c) || (!point && c === '.'))) { // not end of source && digit or first instance of .
				if (c === '.') {
					point = true;
				}
				token += c;
				c = w.nextChar();
			}
	
			tokener(token, 'number');    
		
		}
	
		function op() {
			var w = walker,
				c = w.ch,
				token = c,
				next = w.nextChar();
				
			if (next === "=" && isOp(token, true)) {
				token += next;
				tokener(token, 'match');
				w.nextChar();
				return;
			} 
			
			tokener(token, token);
		}
	
	
		// call the appropriate handler based on the first character in a token suspect
		function tokenize() {
			var ch = walker.ch;
		
			if (ch === " " || ch === "\t") {
				return white();
			}
	
			if (ch === '/') {
				return comment();
			} 
	
			if (ch === '"' || ch === "'") {
				return str();
			}
			
			if (ch === '(') {
				return brace();
			}
		
			if (ch === '-' || ch === '.' || isDigit(ch)) { // tricky - char: minus (-1px) or dash (-moz-stuff)
				return num();
			}
		
			if (isNameChar(ch)) {
				return identifier();
			}
	
			if (isOp(ch)) {
				return op();
			}
	
			if (ch === '\r') {
				if (walker.peek() === '\n') {
					ch += walker.nextChar();
				}
	
				tokener(ch, 'line');
				walker.nextChar();
				return;
			}
			
			if (ch === '\n') {
				tokener(ch, 'line');
				walker.nextChar();
				return;
			}
			
			raiseError("Unrecognized character '" + ch + "'");
		}
	
		return {
			/**
			 * Sprits given source into tokens
			 * @param {String} source
			 * @returns {Array}
			 */
			lex: function (source) {
				walker.init(source);
				session.tokens = [];
	
				// for empty source, return single space token
				if (!source) {
					session.tokens.push(this.white());
				} else {
					while (walker.ch !== '') {
						tokenize();
					}
				}
	
				var tokens = session.tokens;
				session.tokens = null;
				return tokens;
			},
			
			/**
			 * Tokenizes CSS source. It's like `lex()` method,
			 * but also stores proper token indexes in source, 
			 * so it's a bit slower
			 * @param {String} source
			 * @returns {Array}
			 */
			parse: function(source) {
				// transform tokens
				var tokens = this.lex(source), pos = 0, token;
				for (var i = 0, il = tokens.length; i < il; i++) {
					token = tokens[i];
					token.start = pos;
					token.end = (pos += token.value.length);
				}
				return tokens;
			},
	
			white: function() {
				return {
					value: '',
					type:  'white',
					start: 0,
					end:   0
				};
			},
			
			toSource: function(toks) {
				var i = 0, max = toks.length, src = '';
				for (; i < max; i++) {
					src += toks[i].value;
				}
				return src;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * HTML tokenizer by Marijn Haverbeke
	 * http://codemirror.net/
	 * @constructor
	 * @memberOf __xmlParseDefine
	 * @param {Function} require
	 * @param {Underscore} _
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var stringStream = __webpack_require__(56);
	
		var Kludges = {
			autoSelfClosers : {},
			implicitlyClosed : {},
			contextGrabbers : {},
			doNotIndent : {},
			allowUnquoted : true,
			allowMissing : true
		};
	
		// Return variables for tokenizers
		var tagName = null, type = null;
	
		function inText(stream, state) {
			function chain(parser) {
				state.tokenize = parser;
				return parser(stream, state);
			}
	
			var ch = stream.next();
			if (ch == "<") {
				if (stream.eat("!")) {
					if (stream.eat("[")) {
						if (stream.match("CDATA["))
							return chain(inBlock("atom", "]]>"));
						else
							return null;
					} else if (stream.match("--"))
						return chain(inBlock("comment", "-->"));
					else if (stream.match("DOCTYPE", true, true)) {
						stream.eatWhile(/[\w\._\-]/);
						return chain(doctype(1));
					} else
						return null;
				} else if (stream.eat("?")) {
					stream.eatWhile(/[\w\._\-]/);
					state.tokenize = inBlock("meta", "?>");
					return "meta";
				} else {
					type = stream.eat("/") ? "closeTag" : "openTag";
					stream.eatSpace();
					tagName = "";
					var c;
					while ((c = stream.eat(/[^\s\u00a0=<>\"\'\/?]/)))
						tagName += c;
					state.tokenize = inTag;
					return "tag";
				}
			} else if (ch == "&") {
				var ok;
				if (stream.eat("#")) {
					if (stream.eat("x")) {
						ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
					} else {
						ok = stream.eatWhile(/[\d]/) && stream.eat(";");
					}
				} else {
					ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
				}
				return ok ? "atom" : "error";
			} else {
				stream.eatWhile(/[^&<]/);
				return "text";
			}
		}
	
		function inTag(stream, state) {
			var ch = stream.next();
			if (ch == ">" || (ch == "/" && stream.eat(">"))) {
				state.tokenize = inText;
				type = ch == ">" ? "endTag" : "selfcloseTag";
				return "tag";
			} else if (ch == "=") {
				type = "equals";
				return null;
			} else if (/[\'\"]/.test(ch)) {
				state.tokenize = inAttribute(ch);
				return state.tokenize(stream, state);
			} else {
				stream.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
				return "word";
			}
		}
	
		function inAttribute(quote) {
			return function(stream, state) {
				while (!stream.eol()) {
					if (stream.next() == quote) {
						state.tokenize = inTag;
						break;
					}
				}
				return "string";
			};
		}
	
		function inBlock(style, terminator) {
			return function(stream, state) {
				while (!stream.eol()) {
					if (stream.match(terminator)) {
						state.tokenize = inText;
						break;
					}
					stream.next();
				}
				return style;
			};
		}
		
		function doctype(depth) {
			return function(stream, state) {
				var ch;
				while ((ch = stream.next()) !== null) {
					if (ch == "<") {
						state.tokenize = doctype(depth + 1);
						return state.tokenize(stream, state);
					} else if (ch == ">") {
						if (depth == 1) {
							state.tokenize = inText;
							break;
						} else {
							state.tokenize = doctype(depth - 1);
							return state.tokenize(stream, state);
						}
					}
				}
				return "meta";
			};
		}
	
		var curState = null, setStyle;
		function pass() {
			for (var i = arguments.length - 1; i >= 0; i--)
				curState.cc.push(arguments[i]);
		}
		
		function cont() {
			pass.apply(null, arguments);
			return true;
		}
	
		function pushContext(tagName, startOfLine) {
			var noIndent = Kludges.doNotIndent.hasOwnProperty(tagName) 
				|| (curState.context && curState.context.noIndent);
			curState.context = {
				prev : curState.context,
				tagName : tagName,
				indent : curState.indented,
				startOfLine : startOfLine,
				noIndent : noIndent
			};
		}
		
		function popContext() {
			if (curState.context)
				curState.context = curState.context.prev;
		}
	
		function element(type) {
			if (type == "openTag") {
				curState.tagName = tagName;
				return cont(attributes, endtag(curState.startOfLine));
			} else if (type == "closeTag") {
				var err = false;
				if (curState.context) {
					if (curState.context.tagName != tagName) {
						if (Kludges.implicitlyClosed.hasOwnProperty(curState.context.tagName.toLowerCase())) {
							popContext();
						}
						err = !curState.context || curState.context.tagName != tagName;
					}
				} else {
					err = true;
				}
				
				if (err)
					setStyle = "error";
				return cont(endclosetag(err));
			}
			return cont();
		}
		
		function endtag(startOfLine) {
			return function(type) {
				if (type == "selfcloseTag"
						|| (type == "endTag" && Kludges.autoSelfClosers
								.hasOwnProperty(curState.tagName
										.toLowerCase()))) {
					maybePopContext(curState.tagName.toLowerCase());
					return cont();
				}
				if (type == "endTag") {
					maybePopContext(curState.tagName.toLowerCase());
					pushContext(curState.tagName, startOfLine);
					return cont();
				}
				return cont();
			};
		}
		
		function endclosetag(err) {
			return function(type) {
				if (err)
					setStyle = "error";
				if (type == "endTag") {
					popContext();
					return cont();
				}
				setStyle = "error";
				return cont(arguments.callee);
			};
		}
		
		function maybePopContext(nextTagName) {
			var parentTagName;
			while (true) {
				if (!curState.context) {
					return;
				}
				parentTagName = curState.context.tagName.toLowerCase();
				if (!Kludges.contextGrabbers.hasOwnProperty(parentTagName)
						|| !Kludges.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
					return;
				}
				popContext();
			}
		}
	
		function attributes(type) {
			if (type == "word") {
				setStyle = "attribute";
				return cont(attribute, attributes);
			}
			if (type == "endTag" || type == "selfcloseTag")
				return pass();
			setStyle = "error";
			return cont(attributes);
		}
		
		function attribute(type) {
			if (type == "equals")
				return cont(attvalue, attributes);
			if (!Kludges.allowMissing)
				setStyle = "error";
			return (type == "endTag" || type == "selfcloseTag") ? pass()
					: cont();
		}
		
		function attvalue(type) {
			if (type == "string")
				return cont(attvaluemaybe);
			if (type == "word" && Kludges.allowUnquoted) {
				setStyle = "string";
				return cont();
			}
			setStyle = "error";
			return (type == "endTag" || type == "selfCloseTag") ? pass()
					: cont();
		}
		
		function attvaluemaybe(type) {
			if (type == "string")
				return cont(attvaluemaybe);
			else
				return pass();
		}
		
		function startState() {
			return {
				tokenize : inText,
				cc : [],
				indented : 0,
				startOfLine : true,
				tagName : null,
				context : null
			};
		}
		
		function token(stream, state) {
			if (stream.sol()) {
				state.startOfLine = true;
				state.indented = 0;
			}
			
			if (stream.eatSpace())
				return null;
	
			setStyle = type = tagName = null;
			var style = state.tokenize(stream, state);
			state.type = type;
			if ((style || type) && style != "comment") {
				curState = state;
				while (true) {
					var comb = state.cc.pop() || element;
					if (comb(type || style))
						break;
				}
			}
			state.startOfLine = false;
			return setStyle || style;
		}
	
		return {
			/**
			 * @memberOf emmet.xmlParser
			 * @returns
			 */
			parse: function(data, offset) {
				offset = offset || 0;
				var state = startState();
				var stream = stringStream.create(data);
				var tokens = [];
				while (!stream.eol()) {
					tokens.push({
						type: token(stream, state),
						start: stream.start + offset,
						end: stream.pos + offset
					});
					stream.start = stream.pos;
				}
				
				return tokens;
			}		
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/**
	 * 'Expand Abbreviation' handler that parses gradient definition from under 
	 * cursor and updates CSS rule with vendor-prefixed values.
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var prefs = __webpack_require__(26);
		var resources = __webpack_require__(27);
		var utils = __webpack_require__(22);
		var stringStream = __webpack_require__(56);
		var cssResolver = __webpack_require__(66);
		var range = __webpack_require__(36);
		var cssEditTree = __webpack_require__(71);
		var editorUtils = __webpack_require__(34);
		var linearGradient = __webpack_require__(90);
	
		var cssSyntaxes = ['css', 'less', 'sass', 'scss', 'stylus', 'styl'];
		
		// XXX define preferences
		prefs.define('css.gradient.prefixes', 'webkit, moz, o',
				'A comma-separated list of vendor-prefixes for which values should ' 
				+ 'be generated.');
		
		prefs.define('css.gradient.oldWebkit', false,
				'Generate gradient definition for old Webkit implementations');
		
		prefs.define('css.gradient.omitDefaultDirection', true,
			'Do not output default direction definition in generated gradients.');
		
		prefs.define('css.gradient.defaultProperty', 'background-image',
			'When gradient expanded outside CSS value context, it will produce '
				+ 'properties with this name.');
		
		prefs.define('css.gradient.fallback', false,
				'With this option enabled, CSS gradient generator will produce '
				+ '<code>background-color</code> property with gradient first color '
				+ 'as fallback for old browsers.');
	
		/**
		 * Resolves property name (abbreviation): searches for snippet definition in 
		 * 'resources' and returns new name of matched property
		 */
		function resolvePropertyName(name, syntax) {
			var snippet = resources.findSnippet(syntax, name);
			
			if (!snippet && prefs.get('css.fuzzySearch')) {
				var minScore = parseFloat(prefs.get('css.fuzzySearchMinScore'));
				snippet = resources.fuzzyFindSnippet(syntax, name, minScore);
			}
			
			if (snippet) {
				if (typeof snippet !== 'string') {
					snippet = snippet.data;
				}
				
				return cssResolver.splitSnippet(snippet).name;
			}
		}
	
		/**
		 * Returns vendor prefixes for given gradient type
		 * @param {String} type Gradient type (currently, 'linear-gradient' 
		 * is the only supported value)
		 * @return {Array}
		 */
		function getGradientPrefixes(type) {
			var prefixes = cssResolver.vendorPrefixes(type);
			if (!prefixes) {
				// disabled Can I Use, fallback to property list
				prefixes = prefs.getArray('css.gradient.prefixes');
			}
	
			return prefixes || [];
		}
		
		function getPrefixedNames(type) {
			var prefixes = getGradientPrefixes(type);
			var names = prefixes 
				? prefixes.map(function(p) {
					return '-' + p + '-' + type;
				}) 
				: [];
			
			names.push(type);
			
			return names;
		}
		
		/**
		 * Returns list of CSS properties with gradient
		 * @param {Array} gradient List of gradient objects
		 * @param {CSSEditElement} property Original CSS property
		 * @returns {Array}
		 */
		function getPropertiesForGradient(gradients, property) {
			var props = [];
			var propertyName = property.name();
			var omitDir = prefs.get('css.gradient.omitDefaultDirection');
			
			if (prefs.get('css.gradient.fallback') && ~propertyName.toLowerCase().indexOf('background')) {
				props.push({
					name: 'background-color',
					value: '${1:' + gradients[0].gradient.colorStops[0].color + '}'
				});
			}
			
			var value = property.value();
			getGradientPrefixes('linear-gradient').forEach(function(prefix) {
				var name = cssResolver.prefixed(propertyName, prefix);
				if (prefix == 'webkit' && prefs.get('css.gradient.oldWebkit')) {
					try {
						props.push({
							name: name,
							value: insertGradientsIntoCSSValue(gradients, value, {
								prefix: prefix, 
								oldWebkit: true,
								omitDefaultDirection: omitDir
							})
						});
					} catch(e) {}
				}
				
				props.push({
					name: name,
					value: insertGradientsIntoCSSValue(gradients, value, {
						prefix: prefix,
						omitDefaultDirection: omitDir
					})
				});
			});
			
			return props.sort(function(a, b) {
				return b.name.length - a.name.length;
			});
		}
	
		/**
		 * Replaces old gradient definitions in given CSS property value
		 * with new ones, preserving original formatting
		 * @param  {Array} gradients List of CSS gradients
		 * @param  {String} value     Original CSS value
		 * @param  {Object} options   Options for gradient’s stringify() method
		 * @return {String}
		 */
		function insertGradientsIntoCSSValue(gradients, value, options) {
			// gradients *should* passed in order they actually appear in CSS property
			// iterate over it in backward direction to preserve gradient locations
			options = options || {};
			gradients = utils.clone(gradients);
			gradients.reverse().forEach(function(item, i) {
				var suffix = !i && options.placeholder ? options.placeholder : '';
				var str = options.oldWebkit ? item.gradient.stringifyOldWebkit(options) : item.gradient.stringify(options);
				value = utils.replaceSubstring(value, str + suffix, item.matchedPart);
			});
	
			return value;
		}
	
		/**
		 * Returns list of properties with the same meaning 
		 * (e.g. vendor-prefixed + original name)
		 * @param  {String} property CSS property name
		 * @return {Array}
		 */
		function similarPropertyNames(property) {
			if (typeof property !== 'string') {
				property = property.name();
			}
	
			var similarProps = (cssResolver.vendorPrefixes(property) || []).map(function(prefix) {
				return '-' + prefix + '-' + property;
			});
			similarProps.push(property);
			return similarProps;
		}
		
		/**
		 * Pastes gradient definition into CSS rule with correct vendor-prefixes
		 * @param {EditElement} property Matched CSS property
		 * @param {Array} gradients List of gradients to insert
		 */
		function pasteGradient(property, gradients) {
			var rule = property.parent;
			var alignVendor = prefs.get('css.alignVendor');
			var omitDir = prefs.get('css.gradient.omitDefaultDirection');
			
			// we may have aligned gradient definitions: find the smallest value
			// separator
			var sep = property.styleSeparator;
			var before = property.styleBefore;
			
			// first, remove all properties within CSS rule with the same name and
			// gradient definition
			rule.getAll(similarPropertyNames(property)).forEach(function(item) {
				if (item != property && /gradient/i.test(item.value())) {
					if (item.styleSeparator.length < sep.length) {
						sep = item.styleSeparator;
					}
					if (item.styleBefore.length < before.length) {
						before = item.styleBefore;
					}
					rule.remove(item);
				}
			});
			
			if (alignVendor) {
				// update prefix
				if (before != property.styleBefore) {
					var fullRange = property.fullRange();
					rule._updateSource(before, fullRange.start, fullRange.start + property.styleBefore.length);
					property.styleBefore = before;
				}
				
				// update separator value
				if (sep != property.styleSeparator) {
					rule._updateSource(sep, property.nameRange().end, property.valueRange().start);
					property.styleSeparator = sep;
				}
			}
			
			var value = property.value();
	
			// create list of properties to insert
			var propsToInsert = getPropertiesForGradient(gradients, property);
			
			// align prefixed values
			if (alignVendor) {
				var names = [], values = [];
				propsToInsert.forEach(function(item) {
					names.push(item.name);
					values.push(item.value);
				});
				values.push(property.value());
				names.push(property.name());
				
				var valuePads = utils.getStringsPads(values.map(function(v) {
					return v.substring(0, v.indexOf('('));
				}));
				
				var namePads = utils.getStringsPads(names);
				property.name(namePads[namePads.length - 1] + property.name());
				
				propsToInsert.forEach(function(prop, i) {
					prop.name = namePads[i] + prop.name;
					prop.value = valuePads[i] + prop.value;
				});
				
				property.value(valuePads[valuePads.length - 1] + property.value());
			}
			
			// put vendor-prefixed definitions before current rule
			propsToInsert.forEach(function(prop) {
				rule.add(prop.name, prop.value, rule.indexOf(property));
			});
	
			// put vanilla-clean gradient definition into current rule
			property.value(insertGradientsIntoCSSValue(gradients, value, {
				placeholder: '${2}',
				omitDefaultDirection: omitDir
			}));
		}
	
		/**
		 * Validates caret position relatively to located gradients
		 * in CSS rule. In other words, it checks if it’s safe to 
		 * expand gradients for current caret position or not.
		 * 
		 * See issue https://github.com/sergeche/emmet-sublime/issues/411
		 * 
		 * @param  {Array} gradients List of parsed gradients
		 * @param  {Number} caretPos  Current caret position
		 * @param  {String} syntax    Current document syntax
		 * @return {Boolean}
		 */
		function isValidCaretPosition(gradients, caretPos, syntax) {
			syntax = syntax || 'css';
			if (syntax == 'css' || syntax == 'less' || syntax == 'scss') {
				return true;
			}
	
			var offset = gradients.property.valueRange(true).start;
			var parts = gradients.gradients;
	
			// in case of preprocessors where properties are separated with
			// newlines, make sure there’s no gradient definition past
			// current caret position. 
			for (var i = parts.length - 1; i >= 0; i--) {
				if (parts[i].matchedPart.start + offset >= caretPos) {
					return false;
				}
			}
	
			return true;
		}
		
		module = module || {};
		return module.exports = {
			/**
			 * Search for gradient definitions inside CSS property value
			 * @returns {Array} Array of matched gradients
			 */
			findGradients: function(cssProp) {
				var value = cssProp.value();
				var gradients = [];
				var that = this;
				cssProp.valueParts().forEach(function(part) {
					var partValue = part.substring(value);
					if (linearGradient.isLinearGradient(partValue)) {
						var gradient = linearGradient.parse(partValue);
						if (gradient) {
							gradients.push({
								gradient: gradient,
								matchedPart: part
							});
						}
					}
				});
				
				return gradients.length ? gradients : null;
			},
	
			/**
			 * Returns list of gradients found in CSS property
			 * of given CSS code in specified (caret) position
			 * @param  {String} css CSS code snippet
			 * @param  {Number} pos Character index where to start searching for CSS property
			 * @return {Array}
			 */
			gradientsFromCSSProperty: function(css, pos) {
				var cssProp = cssEditTree.propertyFromPosition(css, pos);
				if (cssProp) {
					var grd = this.findGradients(cssProp);
					if (grd) {
						return {
							property: cssProp,
							gradients: grd
						};
					}
				}
	
				return null;
			},
	
			/**
			 * Handler for “Expand Abbreviation” action
			 * @param  {IEmmetEditor} editor
			 * @param  {String} syntax
			 * @param  {String} profile
			 * return {Boolean}
			 */
			expandAbbreviationHandler: function(editor, syntax, profile) {
				var info = editorUtils.outputInfo(editor, syntax, profile);
				if (!~cssSyntaxes.indexOf(info.syntax)) {
					return false;
				}
				
				// let's see if we are expanding gradient definition
				var caret = editor.getCaretPos();
				var content = info.content;
				var gradients = this.gradientsFromCSSProperty(content, caret);
				if (gradients) {
					if (!isValidCaretPosition(gradients, caret, info.syntax)) {
						return false;
					}
	
					var cssProperty = gradients.property;
					var cssRule = cssProperty.parent;
					var ruleStart = cssRule.options.offset || 0;
					var ruleEnd = ruleStart + cssRule.toString().length;
					
					// Handle special case:
					// user wrote gradient definition between existing CSS 
					// properties and did not finished it with semicolon.
					// In this case, we have semicolon right after gradient 
					// definition and re-parse rule again
					if (/[\n\r]/.test(cssProperty.value())) {
						// insert semicolon at the end of gradient definition
						var insertPos = cssProperty.valueRange(true).start + utils.last(gradients.gradients).matchedPart.end;
						content = utils.replaceSubstring(content, ';', insertPos);
						
						var _gradients = this.gradientsFromCSSProperty(content, caret);
						if (_gradients) {
							gradients = _gradients;
							cssProperty = gradients.property;
							cssRule = cssProperty.parent;
						}
					}
					
					// make sure current property has terminating semicolon
					cssProperty.end(';');
					
					// resolve CSS property name
					var resolvedName = resolvePropertyName(cssProperty.name(), syntax);
					if (resolvedName) {
						cssProperty.name(resolvedName);
					}
					
					pasteGradient(cssProperty, gradients.gradients);
					editor.replaceContent(cssRule.toString(), ruleStart, ruleEnd, true);
					return true;
				}
				
				return this.expandGradientOutsideValue(editor, syntax);
			},
	
			/**
			 * Tries to expand gradient outside CSS value 
			 * @param {IEmmetEditor} editor
			 * @param {String} syntax
			 */
			expandGradientOutsideValue: function(editor, syntax) {
				var propertyName = prefs.get('css.gradient.defaultProperty');
				var omitDir = prefs.get('css.gradient.omitDefaultDirection');
				
				if (!propertyName) {
					return false;
				}
				
				// assuming that gradient definition is written on new line,
				// do a simplified parsing
				var content = String(editor.getContent());
				/** @type Range */
				var lineRange = range.create(editor.getCurrentLineRange());
				
				// get line content and adjust range with padding
				var line = lineRange.substring(content)
					.replace(/^\s+/, function(pad) {
						lineRange.start += pad.length;
						return '';
					})
					.replace(/\s+$/, function(pad) {
						lineRange.end -= pad.length;
						return '';
					});
	
				// trick parser: make it think that we’re parsing actual CSS property
				var fakeCSS = 'a{' + propertyName + ': ' + line + ';}';
				var gradients = this.gradientsFromCSSProperty(fakeCSS, fakeCSS.length - 2);
				if (gradients) {
					var props = getPropertiesForGradient(gradients.gradients, gradients.property);
					props.push({
						name: gradients.property.name(),
						value: insertGradientsIntoCSSValue(gradients.gradients, gradients.property.value(), {
							placeholder: '${2}',
							omitDefaultDirection: omitDir
						})
					});
					
					var sep = cssResolver.getSyntaxPreference('valueSeparator', syntax);
					var end = cssResolver.getSyntaxPreference('propertyEnd', syntax);
					
					if (prefs.get('css.alignVendor')) {
						var pads = utils.getStringsPads(props.map(function(prop) {
							return prop.value.substring(0, prop.value.indexOf('('));
						}));
						props.forEach(function(prop, i) {
							prop.value = pads[i] + prop.value;
						});
					}
					
					props = props.map(function(item) {
						return item.name + sep + item.value + end;
					});
					
					editor.replaceContent(props.join('\n'), lineRange.start, lineRange.end);
					return true;
				}
				
				return false;
			},
	
			/**
			 * Handler for “Reflect CSS Value“ action
			 * @param  {String} property
			 */
			reflectValueHandler: function(property) {
				var omitDir = prefs.get('css.gradient.omitDefaultDirection');
				var gradients = this.findGradients(property);
				if (!gradients) {
					return false;
				}
				
				var that = this;
				var value = property.value();
				
				// reflect value for properties with the same name
				property.parent.getAll(similarPropertyNames(property)).forEach(function(prop) {
					if (prop === property) {
						return;
					}
	
					// make sure current property contains gradient definition,
					// otherwise – skip it
					var localGradients = that.findGradients(prop);
					if (localGradients) {
						// detect vendor prefix for current property
						var localValue = prop.value();
						var dfn = localGradients[0].matchedPart.substring(localValue);
						var prefix = '';
						if (/^\s*\-([a-z]+)\-/.test(dfn)) {
							prefix = RegExp.$1;
						}
	
						prop.value(insertGradientsIntoCSSValue(gradients, value, {
							prefix: prefix,
							omitDefaultDirection: omitDir
						}));
					}
				});
				
				return true;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105)(module)))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * CSS linear gradient definition
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var stringStream = __webpack_require__(56);
		var utils = __webpack_require__(22);
	
		// all directions are expressed in “new style” degrees
		var directions = {
			'bottom': 0,
			'bottom left': 45,
			'left': 90,
			'top left': 135,
			'top': 180,
			'top right': 225,
			'right': 270,
			'bottom right': 315,
			
			'to top': 0,
			'to top right': 45,
			'to right': 90,
			'to bottom right': 135,
			'to bottom': 180,
			'to bottom left': 225,
			'to left': 270,
			'to top left': 315
		};
	
		var defaultDirections = ['top', 'to bottom', '0deg'];
	
	
		var reLinearGradient = /^\s*(\-[a-z]+\-)?(lg|linear\-gradient)\s*\(/i;
		var reDeg = /(\d+)deg/i;
		var reKeyword = /top|bottom|left|right/i;
	
		function LinearGradient(dfn) {
			this.colorStops = [];
			this.direction = 180;
	
			// extract tokens
			var stream = stringStream.create(utils.trim(dfn));
			var ch, cur;
			while ((ch = stream.next())) {
				if (stream.peek() == ',') {
					// Is it a first entry? Check if it’s a direction
					cur = stream.current();
	
					if (!this.colorStops.length && (reDeg.test(cur) || reKeyword.test(cur))) {
						this.direction = resolveDirection(cur);
					} else {
						this.addColorStop(cur);
					}
					
					stream.next();
					stream.eatSpace();
					stream.start = stream.pos;
				} else if (ch == '(') { // color definition, like 'rgb(0,0,0)'
					stream.skipTo(')');
				}
			}
			
			// add last token
			this.addColorStop(stream.current());		
		}
	
		LinearGradient.prototype = {
			type: 'linear-gradient',
			addColorStop: function(color, ix) {
				color = normalizeSpace(color || '');
				if (!color) {
					return;
				}
	
				color = this.parseColorStop(color);
	
				if (typeof ix === 'undefined') {
					this.colorStops.push(color);
				} else {
					this.colorStops.splice(ix, 0, color);
				}
			},
	
			/**
			 * Parses color stop definition
			 * @param {String} colorStop
			 * @returns {Object}
			 */
			parseColorStop: function(colorStop) {
				colorStop = normalizeSpace(colorStop);
				
				// find color declaration
				// first, try complex color declaration, like rgb(0,0,0)
				var color = null;
				colorStop = colorStop.replace(/^(\w+\(.+?\))\s*/, function(str, c) {
					color = c;
					return '';
				});
				
				if (!color) {
					// try simple declaration, like yellow, #fco, #ffffff, etc.
					var parts = colorStop.split(' ');
					color = parts[0];
					colorStop = parts[1] || '';
				}
				
				var result = {
					color: color
				};
				
				if (colorStop) {
					// there's position in color stop definition
					colorStop.replace(/^(\-?[\d\.]+)([a-z%]+)?$/, function(str, pos, unit) {
						result.position = pos;
						if (~pos.indexOf('.')) {
							unit = '';
						} else if (!unit) {
							unit = '%';
						}
						
						if (unit) {
							result.unit = unit;
						}
					});
				}
				
				return result;
			},
	
			stringify: function(options) {
				options = options || {};
				var fn = 'linear-gradient';
				if (options.prefix) {
					fn = '-' + options.prefix + '-' + fn;
				}
					
				// transform color-stops
				var parts = this.colorStops.map(function(cs) {
					var pos = cs.position ? ' ' + cs.position + (cs.unit || '') : '';
					return cs.color + pos;
				});
	
				var dir = stringifyDirection(this.direction, !!options.prefix);
				if (!options.omitDefaultDirection || !~defaultDirections.indexOf(dir)) {
					parts.unshift(dir);
				}
	
				return fn + '(' + parts.join(', ') + ')';
			},
	
			stringifyOldWebkit: function() {
				var colorStops = this.colorStops.map(function(item) {
					return utils.clone(item);
				});
				
				// normalize color-stops position
				colorStops.forEach(function(cs) {
					if (!('position' in cs)) // implied position
						return;
					
					if (~cs.position.indexOf('.') || cs.unit == '%') {
						cs.position = parseFloat(cs.position) / (cs.unit == '%' ? 100 : 1);
					} else {
						throw "Can't convert color stop '" + (cs.position + (cs.unit || '')) + "'";
					}
				});
				
				this._fillImpliedPositions(colorStops);
				
				// transform color-stops into string representation
				colorStops = colorStops.map(function(cs, i) {
					if (!cs.position && !i) {
						return 'from(' + cs.color + ')';
					}
					
					if (cs.position == 1 && i == colorStops.length - 1) {
						return 'to(' + cs.color + ')';
					}
					
					return 'color-stop(' + (cs.position.toFixed(2).replace(/\.?0+$/, '')) + ', ' + cs.color + ')';
				});
				
				return '-webkit-gradient(linear, ' 
					+ oldWebkitDirection((this.direction + 180) % 360)
					+ ', '
					+ colorStops.join(', ')
					+ ')';
			},
	
			/**
			 * Fills-out implied positions in color-stops. This function is useful for
			 * old Webkit gradient definitions
			 */
			_fillImpliedPositions: function(colorStops) {
				var from = 0;
				
				colorStops.forEach(function(cs, i) {
					// make sure that first and last positions are defined
					if (!i) {
						return cs.position = cs.position || 0;
					}
					
					if (i == colorStops.length - 1 && !('position' in cs)) {
						cs.position = 1;
					}
					
					if ('position' in cs) {
						var start = colorStops[from].position || 0;
						var step = (cs.position - start) / (i - from);
						colorStops.slice(from, i).forEach(function(cs2, j) {
							cs2.position = start + step * j;
						});
						
						from = i;
					}
				});
			},
	
			valueOf: function() {
				return this.stringify();
			}
		};
	
		function normalizeSpace(str) {
			return utils.trim(str).replace(/\s+/g, ' ');
		}
	
		/**
		 * Resolves textual direction to degrees
		 * @param  {String} dir Direction to resolve
		 * @return {Number}
		 */
		function resolveDirection(dir) {
			if (typeof dir == 'number') {
				return dir;
			}
	
			dir = normalizeSpace(dir).toLowerCase();
			if (reDeg.test(dir)) {
				return +RegExp.$1;
			}
	
			var prefix = /^to\s/.test(dir) ? 'to ' : '';
			var left   = ~dir.indexOf('left')   && 'left';
			var right  = ~dir.indexOf('right')  && 'right';
			var top    = ~dir.indexOf('top')    && 'top';
			var bottom = ~dir.indexOf('bottom') && 'bottom';
	
			var key = normalizeSpace(prefix + (top || bottom || '') + ' ' + (left || right || ''));
			return directions[key] || 0;
		}
	
		/**
		 * Tries to find keyword for given direction, expressed in degrees
		 * @param  {Number} dir Direction (degrees)
		 * @param {Boolean} oldStyle Use old style keywords (e.g. "top" instead of "to bottom")
		 * @return {String}     Keyword or <code>Ndeg</code> expression
		 */
		function stringifyDirection(dir, oldStyle) {
			var reNewStyle = /^to\s/;
			var keys = Object.keys(directions).filter(function(k) {
				var hasPrefix = reNewStyle.test(k);
				return oldStyle ? !hasPrefix : hasPrefix;
			});
	
			for (var i = 0; i < keys.length; i++) {
				if (directions[keys[i]] == dir) {
					return keys[i];
				}
			}
	
			if (oldStyle) {
				dir = (dir + 270) % 360;
			}
	
			return dir + 'deg';
		}
	
		/**
		 * Creates direction definition for old Webkit gradients
		 * @param {String} direction
		 * @returns {String}
		 */
		function oldWebkitDirection(dir) {
			dir = stringifyDirection(dir, true);
			
			if(reDeg.test(dir)) {
				throw "The direction is an angle that can’t be converted.";
			}
			
			var v = function(pos) {
				return ~dir.indexOf(pos) ? '100%' : '0';
			};
			
			return v('left') + ' ' + v('top') + ', ' + v('right') + ' ' + v('bottom');
		}
	
		return {
			/**
			 * Parses gradient definition into an object.
			 * This object can be used to transform gradient into various
			 * forms
			 * @param  {String} gradient Gradient definition
			 * @return {LinearGradient}
			 */
			parse: function(gradient) {
				// cut out all redundant data
				if (this.isLinearGradient(gradient)) {
					gradient = gradient.replace(/^\s*[\-a-z]+\s*\(|\)\s*$/ig, '');
				} else {
					throw 'Invalid linear gradient definition:\n' + gradient;
				}
	
				return new LinearGradient(gradient);
			},
	
			/**
			 * Check if given string can be parsed as linear gradient
			 * @param  {String}  str
			 * @return {Boolean}
			 */
			isLinearGradient: function(str) {
				return reLinearGradient.test(str);
			},
	
			resolveDirection: resolveDirection,
			stringifyDirection: stringifyDirection
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Module for resolving tag names: returns best matched tag name for child
	 * element based on passed parent's tag name. Also provides utility function
	 * for element type detection (inline, block-level, empty)
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		
		var elementTypes = {
	//		empty: 'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,keygen,command'.split(','),
			empty: [],
			blockLevel: 'address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,link,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul,h1,h2,h3,h4,h5,h6'.split(','),
			inlineLevel: 'a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'.split(',')
		};
		
		var elementMap = {
			'p': 'span',
			'ul': 'li',
			'ol': 'li',
			'table': 'tr',
			'tr': 'td',
			'tbody': 'tr',
			'thead': 'tr',
			'tfoot': 'tr',
			'colgroup': 'col',
			'select': 'option',
			'optgroup': 'option',
			'audio': 'source',
			'video': 'source',
			'object': 'param',
			'map': 'area'
		};
		
		return {
			/**
			 * Returns best matched child element name for passed parent's
			 * tag name
			 * @param {String} name
			 * @returns {String}
			 * @memberOf tagName
			 */
			resolve: function(name) {
				name = (name || '').toLowerCase();
				
				if (name in elementMap)
					return this.getMapping(name);
				
				if (this.isInlineLevel(name))
					return 'span';
				
				return 'div';
			},
			
			/**
			 * Returns mapped child element name for passed parent's name 
			 * @param {String} name
			 * @returns {String}
			 */
			getMapping: function(name) {
				return elementMap[name.toLowerCase()];
			},
			
			/**
			 * Check if passed element name belongs to inline-level element
			 * @param {String} name
			 * @returns {Boolean}
			 */
			isInlineLevel: function(name) {
				return this.isTypeOf(name, 'inlineLevel');
			},
			
			/**
			 * Check if passed element belongs to block-level element.
			 * For better matching of unknown elements (for XML, for example), 
			 * you should use <code>!this.isInlineLevel(name)</code>
			 * @returns {Boolean}
			 */
			isBlockLevel: function(name) {
				return this.isTypeOf(name, 'blockLevel');
			},
			
			/**
			 * Check if passed element is void (i.e. should not have closing tag).
			 * @returns {Boolean}
			 */
			isEmptyElement: function(name) {
				return this.isTypeOf(name, 'empty');
			},
			
			/**
			 * Generic function for testing if element name belongs to specified
			 * elements collection
			 * @param {String} name Element name
			 * @param {String} type Collection name
			 * @returns {Boolean}
			 */
			isTypeOf: function(name, type) {
				return ~elementTypes[type].indexOf(name);
			},
			
			/**
			 * Adds new parent–child mapping
			 * @param {String} parent
			 * @param {String} child
			 */
			addMapping: function(parent, child) {
				elementMap[parent] = child;
			},
			
			/**
			 * Removes parent-child mapping
			 */
			removeMapping: function(parent) {
				if (parent in elementMap)
					delete elementMap[parent];
			},
			
			/**
			 * Adds new element into collection
			 * @param {String} name Element name
			 * @param {String} collection Collection name
			 */
			addElementToCollection: function(name, collection) {
				if (!elementTypes[collection])
					elementTypes[collection] = [];
				
				var col = this.getCollection(collection);
				if (!~col.indexOf(name)) {
					col.push(name);
				}
			},
			
			/**
			 * Removes element name from specified collection
			 * @param {String} name Element name
			 * @param {String} collection Collection name
			 * @returns
			 */
			removeElementFromCollection: function(name, collection) {
				if (collection in elementTypes) {
					elementTypes[collection] = utils.without(this.getCollection(collection), name);
				}
			},
			
			/**
			 * Returns elements name collection
			 * @param {String} name Collection name
			 * @returns {Array}
			 */
			getCollection: function(name) {
				return elementTypes[name];
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 92 */,
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author Sergey Chikuyonok (serge.che@gmail.com)
	 * @link http://chikuyonok.ru
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		
		return {
			/**
			 * Encodes data using base64 algorithm
			 * @author Tyler Akins (http://rumkin.com)
			 * @param {String} input
			 * @returns {String}
			 */
			encode : function(input) {
				var output = [];
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4, cdp1, cdp2, cdp3;
				var i = 0, il = input.length, b64 = chars;
	
				while (i < il) {
	
					cdp1 = input.charCodeAt(i++);
					cdp2 = input.charCodeAt(i++);
					cdp3 = input.charCodeAt(i++);
	
					chr1 = cdp1 & 0xff;
					chr2 = cdp2 & 0xff;
					chr3 = cdp3 & 0xff;
	
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
	
					if (isNaN(cdp2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(cdp3)) {
						enc4 = 64;
					}
	
					output.push(b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4));
				}
	
				return output.join('');
			},
	
			/**
			 * Decodes string using MIME base64 algorithm
			 * 
			 * @author Tyler Akins (http://rumkin.com)
			 * @param {String} data
			 * @return {String}
			 */
			decode : function(data) {
				var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, tmpArr = [];
				var b64 = chars, il = data.length;
	
				if (!data) {
					return data;
				}
	
				data += '';
	
				do { // unpack four hexets into three octets using index points in b64
					h1 = b64.indexOf(data.charAt(i++));
					h2 = b64.indexOf(data.charAt(i++));
					h3 = b64.indexOf(data.charAt(i++));
					h4 = b64.indexOf(data.charAt(i++));
	
					bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
	
					o1 = bits >> 16 & 0xff;
					o2 = bits >> 8 & 0xff;
					o3 = bits & 0xff;
	
					if (h3 == 64) {
						tmpArr[ac++] = String.fromCharCode(o1);
					} else if (h4 == 64) {
						tmpArr[ac++] = String.fromCharCode(o1, o2);
					} else {
						tmpArr[ac++] = String.fromCharCode(o1, o2, o3);
					}
				} while (i < il);
	
				return tmpArr.join('');
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Utility module for working with comments in source code
	 * (mostly stripping it from source)
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var range = __webpack_require__(36);
		var stringStream = __webpack_require__(56);
		var reHasComment = /\/\*|\/\//;
	
		return {
			/**
			 * Replaces all comments in given CSS source with spaces,
			 * which allows more reliable (and faster) token search
			 * in CSS content
			 * @param  {String} content CSS content
			 * @return {String}
			 */
			strip: function(content) {
				if (!reHasComment.test(content)) {
					return content;
				}
	
				var stream = stringStream(content);
				var replaceRanges = [];
				var ch, ch2;
	
				while ((ch = stream.next())) {
					if (ch === '/') {
						ch2 = stream.peek();
						if (ch2 === '*') { // multiline CSS comment
							stream.start = stream.pos - 1;
	
							if (stream.skipTo('*/')) {
								stream.pos += 2;
							} else {
								// unclosed comment
								stream.skipToEnd();
							}
	
							replaceRanges.push([stream.start, stream.pos]);
						} else if (ch2 === '/') {
							// preprocessor’s single line comments
							stream.start = stream.pos - 1;
							while ((ch2 = stream.next())) {
								if (ch2 === '\n' || ch2 == '\r') {
									break
								}
							}
	
							replaceRanges.push([stream.start, stream.pos]);
						}
					} else {
						stream.skipQuoted();
					}
				}
	
				return utils.replaceWith(content, replaceRanges, ' ');
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
		var commentsUtils = __webpack_require__(94);
		var range = __webpack_require__(36);
		var stringStream = __webpack_require__(56);
		var cssParser = __webpack_require__(87);
		var htmlMatcher = __webpack_require__(32);
		var xmlEditTree = __webpack_require__(72);
	
		var idCounter = 1;
		var maxId = 1000000;
	
		var reSpaceTrim = /^(\s*).+?(\s*)$/;
		var reSpace = /\s/g;
		var reComma = /,/;
	
		function isQuote(ch) {
			return ch == '"' || ch == "'";
		}
	
		function getId() {
			idCounter = (idCounter + 1) % maxId;
			return 's' + idCounter;
		}
	
		/**
		 * @param {Range} range Full selector range with additional
		 * properties for matching name and content (@see findAllRules())
		 * @param {String} source CSS source
		 */
		function CSSSection(rng, source) {
			this.id = getId();
			/** @type {CSSSection} */
			this.parent = null;
			/** @type {CSSSection} */
			this.nextSibling = null;
			/** @type {CSSSection} */
			this.previousSibling = null;
			this._source = source;
			this._name = null;
			this._content = null;
	
			/**
			 * Custom data for current nodes, used by other modules for
			 * caching etc.
			 * @type {Object}
			 */
			this._data = {};
	
			if (!rng && source) {
				rng = range(0, source);
			}
	
			this.range = rng;
			this.children = [];
		}
	
		CSSSection.prototype = {
			addChild: function(section) {
				if (!(section instanceof CSSSection)) {
					section = new CSSSection(section);
				}
	
				var lastChild = utils.last(this.children);
				if (lastChild) {
					lastChild.nextSibling = section;
					section.previousSibling = lastChild;
				}
				section.parent = this;
	
				this.children.push(section);
				return section;
			},
	
			/**
			 * Returns root node
			 * @return {CSSSection}
			 */
			root: function() {
				var root = this;
				do {
					if (!root.parent) {
						return root;
					}
				} while(root = root.parent);
	
				return root;
			},
	
			/**
			 * Returns currect CSS source
			 * @return {String}
			 */
			source: function() {
				return this._source || this.root()._source;
			},
	
			/**
			 * Returns section name
			 * @return {String}
			 */
			name: function() {
				if (this._name === null) {
					var range = this.nameRange();
					if (range) {
						this._name = range.substring(this.source());
					}
				}
	
				return this._name;
			},
	
			/**
			 * Returns section name range
			 * @return {[type]} [description]
			 */
			nameRange: function() {
				if (this.range && '_selectorEnd' in this.range) {
					return range.create2(this.range.start, this.range._selectorEnd);
				}
			},
	
			/**
			 * Returns deepest child of current section (or section itself) 
			 * which includes given position.
			 * @param  {Number} pos
			 * @return {CSSSection}
			 */
			matchDeep: function(pos) {
				if (!this.range.inside(pos)) {
					return null;
				}
	
				for (var i = 0, il = this.children.length, m; i < il; i++) {
					m = this.children[i].matchDeep(pos);
					if (m) {
						return m;
					}
				};
	
				return this.parent ? this : null;
			},
	
			/**
			 * Returns current and all nested sections ranges
			 * @return {Array}
			 */
			allRanges: function() {
				var out = [];
				if (this.parent) {
					// add current range if it is not root node
					out.push(this.range);
				}
	
				this.children.forEach(function(child) {
					out = out.concat(child.allRanges());
				});
	
				return out;
			},
	
			data: function(key, value) {
				if (typeof value !== 'undefined') {
					this._data[key] = value;
				}
	
				return this._data[key];
			},
	
			stringify: function(indent) {
				indent = indent || '';
				var out = '';
				this.children.forEach(function(item) {
					out += indent + item.name().replace(/\n/g, '\\n') + '\n';
					out += item.stringify(indent + '--');
				});
	
				return out;
			},
	
			/**
			 * Returns current section’s actual content,
			 * e.g. content without nested sections
			 * @return {String} 
			 */
			content: function() {
				if (this._content !== null) {
					return this._content;
				}
	
				if (!this.range || !('_contentStart' in this.range)) {
					return '';
				}
	
				var r = range.create2(this.range._contentStart + 1, this.range.end - 1);
				var source = this.source();
				var start = r.start;
				var out = '';
	
				this.children.forEach(function(child) {
					out += source.substring(start, child.range.start);
					start = child.range.end;
				});
	
				out += source.substring(start, r.end);
				return this._content = utils.trim(out);
			}
		};
	
		return {
			/**
			 * Finds all CSS rules‘ ranges in given CSS source
			 * @param  {String} content CSS source
			 * @return {Array} Array of ranges
			 */
			findAllRules: function(content) {
				content = this.sanitize(content);
				var stream = stringStream(content);
				var ranges = [], matchedRanges;
				var self = this;
	
				var saveRule = function(r) {
					var selRange = self.extractSelector(content, r.start);
					var rule = range.create2(selRange.start, r.end);
					rule._selectorEnd = selRange.end;
					rule._contentStart = r.start;
					ranges.push(rule);
				};
	
				var ch;
				while (ch = stream.next()) {
					if (isQuote(ch)) {
						if (!stream.skipString(ch)) {
							break; // unterminated string
						}
	
						continue;
					}
	
					if (ch == '{') {
						matchedRanges = this.matchBracesRanges(content, stream.pos - 1);
						matchedRanges.forEach(saveRule);
	
						if (matchedRanges.length) {
							stream.pos = utils.last(matchedRanges).end;
							continue;
						} 
					}
				}
				
				return ranges.sort(function(a, b) {
					return a.start - b.start;
				});
			},
	
			/**
			 * Matches curly braces content right after given position
			 * @param  {String} content CSS content. Must not contain comments!
			 * @param  {Number} pos     Search start position
			 * @return {Range}
			 */
			matchBracesRanges: function(content, pos, sanitize) {
				if (sanitize) {
					content = this.sanitize(content);
				}
	
				var stream = stringStream(content);
				stream.start = stream.pos = pos;
				var stack = [], ranges = [];
				var ch;
				while (ch = stream.next()) {
					if (ch == '{') {
						stack.push(stream.pos - 1);
					} else if (ch == '}') {
						if (!stack.length) {
							throw 'Invalid source structure (check for curly braces)';
						}
						ranges.push(range.create2(stack.pop(), stream.pos));
						if (!stack.length) {
							return ranges;
						}
					} else {
						stream.skipQuoted();
					}
				}
	
				return ranges;
			},
	
			/**
			 * Extracts CSS selector from CSS document from
			 * given position. The selector is located by moving backward
			 * from given position which means that passed position
			 * must point to the end of selector 
			 * @param  {String}  content CSS source
			 * @param  {Number}  pos     Search position
			 * @param  {Boolean} sanitize Sanitize CSS source before processing.
			 * Off by default and assumes that CSS must be comment-free already
			 * (for performance)
			 * @return {Range}
			 */
			extractSelector: function(content, pos, sanitize) {
				if (sanitize) {
					content = this.sanitize(content);
				}
	
				var skipString = function() {
					var quote = content.charAt(pos);
					if (quote == '"' || quote == "'") {
						while (--pos >= 0) {
							if (content.charAt(pos) == quote && content.charAt(pos - 1) != '\\') {
								break;
							}
						}
						return true;
					}
	
					return false;
				};
	
				// find CSS selector
				var ch;
				var endPos = pos;
				while (--pos >= 0) {
					if (skipString()) continue;
	
					ch = content.charAt(pos);
					if (ch == ')') {
						// looks like it’s a preprocessor thing,
						// most likely a mixin arguments list, e.g.
						// .mixin (@arg1; @arg2) {...}
						while (--pos >= 0) {
							if (skipString()) continue;
	
							if (content.charAt(pos) == '(') {
								break;
							}
						}
						continue;
					}
	
					if (ch == '{' || ch == '}' || ch == ';') {
						pos++;
						break;
					}
				}
	
				if (pos < 0) {
					pos = 0;
				}
				
				var selector = content.substring(pos, endPos);
	
				// trim whitespace from matched selector
				var m = selector.replace(reSpace, ' ').match(reSpaceTrim);
				if (m) {
					pos += m[1].length;
					endPos -= m[2].length;
				}
	
				return range.create2(pos, endPos);
			},
	
			/**
			 * Search for nearest CSS rule/section that contains
			 * given position
			 * @param  {String} content CSS content or matched CSS rules (array of ranges)
			 * @param  {Number} pos     Search position
			 * @return {Range}
			 */
			matchEnclosingRule: function(content, pos) {
				if (typeof content === 'string') {
					content = this.findAllRules(content);
				}
	
				var rules = content.filter(function(r) {
					return r.inside(pos);
				});
	
				return utils.last(rules);
			},
	
			/**
			 * Locates CSS rule next or before given position
			 * @param  {String}  content    CSS content
			 * @param  {Number}  pos        Search start position
			 * @param  {Boolean} isBackward Search backward (find previous rule insteaf of next one)
			 * @return {Range}
			 */
			locateRule: function(content, pos, isBackward) {
				// possible case: editor reported that current syntax is
				// CSS, but it’s actually a HTML document (either `style` tag or attribute)
				var offset = 0;
				var subrange = this.styleTagRange(content, pos);
				if (subrange) {
					offset = subrange.start;
					pos -= subrange.start;
					content = subrange.substring(content);
				}
	
				var rules = this.findAllRules(content);
				var ctxRule = this.matchEnclosingRule(rules, pos);
	
				if (ctxRule) {
					return ctxRule.shift(offset);
				}
	
				for (var i = 0, il = rules.length; i < il; i++) {
					if (rules[i].start > pos) {
						return rules[isBackward ? i - 1 : i].shift(offset);
					}
				}
			},
	
			/**
			 * Sanitizes given CSS content: replaces content that may 
			 * interfere with parsing (comments, interpolations, etc.)
			 * with spaces. Sanitized content MUST NOT be used for
			 * editing or outputting, it just simplifies searching
			 * @param  {String} content CSS content
			 * @return {String}
			 */
			sanitize: function(content) {
				content = commentsUtils.strip(content);
	
				// remove preprocessor string interpolations like #{var}
				var stream = stringStream(content);
				var replaceRanges = [];
				var ch, ch2;
	
				while ((ch = stream.next())) {
					if (isQuote(ch)) {
						// skip string
						stream.skipString(ch)
						continue;
					} else if (ch === '#' || ch === '@') {
						ch2 = stream.peek();
						if (ch2 === '{') { // string interpolation
							stream.start = stream.pos - 1;
	
							if (stream.skipTo('}')) {
								stream.pos += 1;
							} else {
								throw 'Invalid string interpolation at ' + stream.start;
							}
	
							replaceRanges.push([stream.start, stream.pos]);
						}
					}
				}
	
				return utils.replaceWith(content, replaceRanges, 'a');
			},
	
			/**
			 * Parses and returns all sections in given CSS
			 * as tree-like structure, e.g. provides nesting
			 * info
			 * @param  {String} content CSS content
			 * @return {CSSSection}
			 */
			sectionTree: function(content) {
				var root = new CSSSection(null, content);
				var rules = this.findAllRules(content);
	
				// rules are sorted in order they appear in CSS source
				// so we can optimize their nesting routine
				var insert = function(range, ctx) {
					while (ctx && ctx.range) {
						if (ctx.range.contains(range)) {
							return ctx.addChild(range);
						}
	
						ctx = ctx.parent;
					}
	
					// if we are here then given range is a top-level section
					return root.addChild(range);
				};
	
				var ctx = root;
				rules.forEach(function(r) {
					ctx = insert(r, ctx);
				});
	
				return root;
			},
	
			/**
			 * Returns ranges for all nested sections, available in
			 * given CSS rule
			 * @param  {CSSEditContainer} rule
			 * @return {Array}
			 */
			nestedSectionsInRule: function(rule) {
				var offset = rule.valueRange(true).start;
				var nestedSections = this.findAllRules(rule.valueRange().substring(rule.source));
				nestedSections.forEach(function(section) {
					section.start += offset;
					section.end += offset;
					section._selectorEnd += offset;
					section._contentStart += offset;
				});
				return nestedSections;
			},
	
			styleTagRange: function(content, pos) {
				var tag = htmlMatcher.tag(content, pos);
				return tag && tag.open.name.toLowerCase() == 'style' 
					&& tag.innerRange.cmp(pos, 'lte', 'gte')
					&& tag.innerRange;
			},
	
			styleAttrRange: function(content, pos) {
				var tree = xmlEditTree.parseFromPosition(content, pos, true);
				if (tree) {
					var attr = tree.itemFromPosition(pos, true);
					return attr && attr.name().toLowerCase() == 'style' 
						&& attr.valueRange(true).cmp(pos, 'lte', 'gte')
						&& attr.valueRange(true);
				}
			},
	
			CSSSection: CSSSection
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		/*
		 Source: https://github.com/silentmatt/js-expression-eval
	
		 Based on ndef.parser, by Raphael Graf(r@undefined.ch)
		 http://www.undefined.ch/mparser/index.html
	
		 Ported to JavaScript and modified by Matthew Crumley (email@matthewcrumley.com, http://silentmatt.com/)
	
		 You are free to use and modify this code in anyway you find useful. Please leave this comment in the code
		 to acknowledge its original source. If you feel like it, I enjoy hearing about projects that use my code,
		 but don't feel like you have to let me know or ask permission.
		*/
	
		function object(o) {
			function F() {}
			F.prototype = o;
			return new F();
		}
	
		var TNUMBER = 0;
		var TOP1 = 1;
		var TOP2 = 2;
		var TVAR = 3;
		var TFUNCALL = 4;
	
		function Token(type_, index_, prio_, number_) {
			this.type_ = type_;
			this.index_ = index_ || 0;
			this.prio_ = prio_ || 0;
			this.number_ = (number_ !== undefined && number_ !== null) ? number_ : 0;
			this.toString = function () {
				switch (this.type_) {
				case TNUMBER:
					return this.number_;
				case TOP1:
				case TOP2:
				case TVAR:
					return this.index_;
				case TFUNCALL:
					return "CALL";
				default:
					return "Invalid Token";
				}
			};
		}
	
		function Expression(tokens, ops1, ops2, functions) {
			this.tokens = tokens;
			this.ops1 = ops1;
			this.ops2 = ops2;
			this.functions = functions;
		}
	
		// Based on http://www.json.org/json2.js
	    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        escapable = /[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        meta = {    // table of character substitutions
	            '\b': '\\b',
	            '\t': '\\t',
	            '\n': '\\n',
	            '\f': '\\f',
	            '\r': '\\r',
	            "'" : "\\'",
	            '\\': '\\\\'
	        };
	
		function escapeValue(v) {
			if (typeof v === "string") {
				escapable.lastIndex = 0;
		        return escapable.test(v) ?
		            "'" + v.replace(escapable, function (a) {
		                var c = meta[a];
		                return typeof c === 'string' ? c :
		                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		            }) + "'" :
		            "'" + v + "'";
			}
			return v;
		}
	
		Expression.prototype = {
			simplify: function (values) {
				values = values || {};
				var nstack = [];
				var newexpression = [];
				var n1;
				var n2;
				var f;
				var L = this.tokens.length;
				var item;
				var i = 0;
				for (i = 0; i < L; i++) {
					item = this.tokens[i];
					var type_ = item.type_;
					if (type_ === TNUMBER) {
						nstack.push(item);
					}
					else if (type_ === TVAR && (item.index_ in values)) {
						item = new Token(TNUMBER, 0, 0, values[item.index_]);
						nstack.push(item);
					}
					else if (type_ === TOP2 && nstack.length > 1) {
						n2 = nstack.pop();
						n1 = nstack.pop();
						f = this.ops2[item.index_];
						item = new Token(TNUMBER, 0, 0, f(n1.number_, n2.number_));
						nstack.push(item);
					}
					else if (type_ === TOP1 && nstack.length > 0) {
						n1 = nstack.pop();
						f = this.ops1[item.index_];
						item = new Token(TNUMBER, 0, 0, f(n1.number_));
						nstack.push(item);
					}
					else {
						while (nstack.length > 0) {
							newexpression.push(nstack.shift());
						}
						newexpression.push(item);
					}
				}
				while (nstack.length > 0) {
					newexpression.push(nstack.shift());
				}
	
				return new Expression(newexpression, object(this.ops1), object(this.ops2), object(this.functions));
			},
	
			substitute: function (variable, expr) {
				if (!(expr instanceof Expression)) {
					expr = new Parser().parse(String(expr));
				}
				var newexpression = [];
				var L = this.tokens.length;
				var item;
				var i = 0;
				for (i = 0; i < L; i++) {
					item = this.tokens[i];
					var type_ = item.type_;
					if (type_ === TVAR && item.index_ === variable) {
						for (var j = 0; j < expr.tokens.length; j++) {
							var expritem = expr.tokens[j];
							var replitem = new Token(expritem.type_, expritem.index_, expritem.prio_, expritem.number_);
							newexpression.push(replitem);
						}
					}
					else {
						newexpression.push(item);
					}
				}
	
				var ret = new Expression(newexpression, object(this.ops1), object(this.ops2), object(this.functions));
				return ret;
			},
	
			evaluate: function (values) {
				values = values || {};
				var nstack = [];
				var n1;
				var n2;
				var f;
				var L = this.tokens.length;
				var item;
				var i = 0;
				for (i = 0; i < L; i++) {
					item = this.tokens[i];
					var type_ = item.type_;
					if (type_ === TNUMBER) {
						nstack.push(item.number_);
					}
					else if (type_ === TOP2) {
						n2 = nstack.pop();
						n1 = nstack.pop();
						f = this.ops2[item.index_];
						nstack.push(f(n1, n2));
					}
					else if (type_ === TVAR) {
						if (item.index_ in values) {
							nstack.push(values[item.index_]);
						}
						else if (item.index_ in this.functions) {
							nstack.push(this.functions[item.index_]);
						}
						else {
							throw new Error("undefined variable: " + item.index_);
						}
					}
					else if (type_ === TOP1) {
						n1 = nstack.pop();
						f = this.ops1[item.index_];
						nstack.push(f(n1));
					}
					else if (type_ === TFUNCALL) {
						n1 = nstack.pop();
						f = nstack.pop();
						if (f.apply && f.call) {
							if (Object.prototype.toString.call(n1) == "[object Array]") {
								nstack.push(f.apply(undefined, n1));
							}
							else {
								nstack.push(f.call(undefined, n1));
							}
						}
						else {
							throw new Error(f + " is not a function");
						}
					}
					else {
						throw new Error("invalid Expression");
					}
				}
				if (nstack.length > 1) {
					throw new Error("invalid Expression (parity)");
				}
				return nstack[0];
			},
	
			toString: function (toJS) {
				var nstack = [];
				var n1;
				var n2;
				var f;
				var L = this.tokens.length;
				var item;
				var i = 0;
				for (i = 0; i < L; i++) {
					item = this.tokens[i];
					var type_ = item.type_;
					if (type_ === TNUMBER) {
						nstack.push(escapeValue(item.number_));
					}
					else if (type_ === TOP2) {
						n2 = nstack.pop();
						n1 = nstack.pop();
						f = item.index_;
						if (toJS && f == "^") {
							nstack.push("Math.pow(" + n1 + "," + n2 + ")");
						}
						else {
							nstack.push("(" + n1 + f + n2 + ")");
						}
					}
					else if (type_ === TVAR) {
						nstack.push(item.index_);
					}
					else if (type_ === TOP1) {
						n1 = nstack.pop();
						f = item.index_;
						if (f === "-") {
							nstack.push("(" + f + n1 + ")");
						}
						else {
							nstack.push(f + "(" + n1 + ")");
						}
					}
					else if (type_ === TFUNCALL) {
						n1 = nstack.pop();
						f = nstack.pop();
						nstack.push(f + "(" + n1 + ")");
					}
					else {
						throw new Error("invalid Expression");
					}
				}
				if (nstack.length > 1) {
					throw new Error("invalid Expression (parity)");
				}
				return nstack[0];
			},
	
			variables: function () {
				var L = this.tokens.length;
				var vars = [];
				for (var i = 0; i < L; i++) {
					var item = this.tokens[i];
					if (item.type_ === TVAR && (vars.indexOf(item.index_) == -1)) {
						vars.push(item.index_);
					}
				}
	
				return vars;
			},
	
			toJSFunction: function (param, variables) {
				var f = new Function(param, "with(Parser.values) { return " + this.simplify(variables).toString(true) + "; }");
				return f;
			}
		};
	
		function add(a, b) {
			return Number(a) + Number(b);
		}
		function sub(a, b) {
			return a - b; 
		}
		function mul(a, b) {
			return a * b;
		}
		function div(a, b) {
			return a / b;
		}
		function mod(a, b) {
			return a % b;
		}
		function concat(a, b) {
			return "" + a + b;
		}
	
		function neg(a) {
			return -a;
		}
	
		function random(a) {
			return Math.random() * (a || 1);
		}
		function fac(a) { //a!
			a = Math.floor(a);
			var b = a;
			while (a > 1) {
				b = b * (--a);
			}
			return b;
		}
	
		// TODO: use hypot that doesn't overflow
		function pyt(a, b) {
			return Math.sqrt(a * a + b * b);
		}
	
		function append(a, b) {
			if (Object.prototype.toString.call(a) != "[object Array]") {
				return [a, b];
			}
			a = a.slice();
			a.push(b);
			return a;
		}
	
		function Parser() {
			this.success = false;
			this.errormsg = "";
			this.expression = "";
	
			this.pos = 0;
	
			this.tokennumber = 0;
			this.tokenprio = 0;
			this.tokenindex = 0;
			this.tmpprio = 0;
	
			this.ops1 = {
				"sin": Math.sin,
				"cos": Math.cos,
				"tan": Math.tan,
				"asin": Math.asin,
				"acos": Math.acos,
				"atan": Math.atan,
				"sqrt": Math.sqrt,
				"log": Math.log,
				"abs": Math.abs,
				"ceil": Math.ceil,
				"floor": Math.floor,
				"round": Math.round,
				"-": neg,
				"exp": Math.exp
			};
	
			this.ops2 = {
				"+": add,
				"-": sub,
				"*": mul,
				"/": div,
				"%": mod,
				"^": Math.pow,
				",": append,
				"||": concat
			};
	
			this.functions = {
				"random": random,
				"fac": fac,
				"min": Math.min,
				"max": Math.max,
				"pyt": pyt,
				"pow": Math.pow,
				"atan2": Math.atan2
			};
	
			this.consts = {
				"E": Math.E,
				"PI": Math.PI
			};
		}
	
		Parser.parse = function (expr) {
			return new Parser().parse(expr);
		};
	
		Parser.evaluate = function (expr, variables) {
			return Parser.parse(expr).evaluate(variables);
		};
	
		Parser.Expression = Expression;
	
		Parser.values = {
			sin: Math.sin,
			cos: Math.cos,
			tan: Math.tan,
			asin: Math.asin,
			acos: Math.acos,
			atan: Math.atan,
			sqrt: Math.sqrt,
			log: Math.log,
			abs: Math.abs,
			ceil: Math.ceil,
			floor: Math.floor,
			round: Math.round,
			random: random,
			fac: fac,
			exp: Math.exp,
			min: Math.min,
			max: Math.max,
			pyt: pyt,
			pow: Math.pow,
			atan2: Math.atan2,
			E: Math.E,
			PI: Math.PI
		};
	
		var PRIMARY      = 1 << 0;
		var OPERATOR     = 1 << 1;
		var FUNCTION     = 1 << 2;
		var LPAREN       = 1 << 3;
		var RPAREN       = 1 << 4;
		var COMMA        = 1 << 5;
		var SIGN         = 1 << 6;
		var CALL         = 1 << 7;
		var NULLARY_CALL = 1 << 8;
	
		Parser.prototype = {
			parse: function (expr) {
				this.errormsg = "";
				this.success = true;
				var operstack = [];
				var tokenstack = [];
				this.tmpprio = 0;
				var expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
				var noperators = 0;
				this.expression = expr;
				this.pos = 0;
	
				while (this.pos < this.expression.length) {
					if (this.isOperator()) {
						if (this.isSign() && (expected & SIGN)) {
							if (this.isNegativeSign()) {
								this.tokenprio = 2;
								this.tokenindex = "-";
								noperators++;
								this.addfunc(tokenstack, operstack, TOP1);
							}
							expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
						}
						else if (this.isComment()) {
	
						}
						else {
							if ((expected & OPERATOR) === 0) {
								this.error_parsing(this.pos, "unexpected operator");
							}
							noperators += 2;
							this.addfunc(tokenstack, operstack, TOP2);
							expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
						}
					}
					else if (this.isNumber()) {
						if ((expected & PRIMARY) === 0) {
							this.error_parsing(this.pos, "unexpected number");
						}
						var token = new Token(TNUMBER, 0, 0, this.tokennumber);
						tokenstack.push(token);
	
						expected = (OPERATOR | RPAREN | COMMA);
					}
					else if (this.isString()) {
						if ((expected & PRIMARY) === 0) {
							this.error_parsing(this.pos, "unexpected string");
						}
						var token = new Token(TNUMBER, 0, 0, this.tokennumber);
						tokenstack.push(token);
	
						expected = (OPERATOR | RPAREN | COMMA);
					}
					else if (this.isLeftParenth()) {
						if ((expected & LPAREN) === 0) {
							this.error_parsing(this.pos, "unexpected \"(\"");
						}
	
						if (expected & CALL) {
							noperators += 2;
							this.tokenprio = -2;
							this.tokenindex = -1;
							this.addfunc(tokenstack, operstack, TFUNCALL);
						}
	
						expected = (PRIMARY | LPAREN | FUNCTION | SIGN | NULLARY_CALL);
					}
					else if (this.isRightParenth()) {
					    if (expected & NULLARY_CALL) {
							var token = new Token(TNUMBER, 0, 0, []);
							tokenstack.push(token);
						}
						else if ((expected & RPAREN) === 0) {
							this.error_parsing(this.pos, "unexpected \")\"");
						}
	
						expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL);
					}
					else if (this.isComma()) {
						if ((expected & COMMA) === 0) {
							this.error_parsing(this.pos, "unexpected \",\"");
						}
						this.addfunc(tokenstack, operstack, TOP2);
						noperators += 2;
						expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
					}
					else if (this.isConst()) {
						if ((expected & PRIMARY) === 0) {
							this.error_parsing(this.pos, "unexpected constant");
						}
						var consttoken = new Token(TNUMBER, 0, 0, this.tokennumber);
						tokenstack.push(consttoken);
						expected = (OPERATOR | RPAREN | COMMA);
					}
					else if (this.isOp2()) {
						if ((expected & FUNCTION) === 0) {
							this.error_parsing(this.pos, "unexpected function");
						}
						this.addfunc(tokenstack, operstack, TOP2);
						noperators += 2;
						expected = (LPAREN);
					}
					else if (this.isOp1()) {
						if ((expected & FUNCTION) === 0) {
							this.error_parsing(this.pos, "unexpected function");
						}
						this.addfunc(tokenstack, operstack, TOP1);
						noperators++;
						expected = (LPAREN);
					}
					else if (this.isVar()) {
						if ((expected & PRIMARY) === 0) {
							this.error_parsing(this.pos, "unexpected variable");
						}
						var vartoken = new Token(TVAR, this.tokenindex, 0, 0);
						tokenstack.push(vartoken);
	
						expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL);
					}
					else if (this.isWhite()) {
					}
					else {
						if (this.errormsg === "") {
							this.error_parsing(this.pos, "unknown character");
						}
						else {
							this.error_parsing(this.pos, this.errormsg);
						}
					}
				}
				if (this.tmpprio < 0 || this.tmpprio >= 10) {
					this.error_parsing(this.pos, "unmatched \"()\"");
				}
				while (operstack.length > 0) {
					var tmp = operstack.pop();
					tokenstack.push(tmp);
				}
				if (noperators + 1 !== tokenstack.length) {
					//print(noperators + 1);
					//print(tokenstack);
					this.error_parsing(this.pos, "parity");
				}
	
				return new Expression(tokenstack, object(this.ops1), object(this.ops2), object(this.functions));
			},
	
			evaluate: function (expr, variables) {
				return this.parse(expr).evaluate(variables);
			},
	
			error_parsing: function (column, msg) {
				this.success = false;
				this.errormsg = "parse error [column " + (column) + "]: " + msg;
				throw new Error(this.errormsg);
			},
	
	//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
	
			addfunc: function (tokenstack, operstack, type_) {
				var operator = new Token(type_, this.tokenindex, this.tokenprio + this.tmpprio, 0);
				while (operstack.length > 0) {
					if (operator.prio_ <= operstack[operstack.length - 1].prio_) {
						tokenstack.push(operstack.pop());
					}
					else {
						break;
					}
				}
				operstack.push(operator);
			},
	
			isNumber: function () {
				var r = false;
				var str = "";
				while (this.pos < this.expression.length) {
					var code = this.expression.charCodeAt(this.pos);
					if ((code >= 48 && code <= 57) || code === 46) {
						str += this.expression.charAt(this.pos);
						this.pos++;
						this.tokennumber = parseFloat(str);
						r = true;
					}
					else {
						break;
					}
				}
				return r;
			},
	
			// Ported from the yajjl JSON parser at http://code.google.com/p/yajjl/
			unescape: function(v, pos) {
				var buffer = [];
				var escaping = false;
	
				for (var i = 0; i < v.length; i++) {
					var c = v.charAt(i);
		
					if (escaping) {
						switch (c) {
						case "'":
							buffer.push("'");
							break;
						case '\\':
							buffer.push('\\');
							break;
						case '/':
							buffer.push('/');
							break;
						case 'b':
							buffer.push('\b');
							break;
						case 'f':
							buffer.push('\f');
							break;
						case 'n':
							buffer.push('\n');
							break;
						case 'r':
							buffer.push('\r');
							break;
						case 't':
							buffer.push('\t');
							break;
						case 'u':
							// interpret the following 4 characters as the hex of the unicode code point
							var codePoint = parseInt(v.substring(i + 1, i + 5), 16);
							buffer.push(String.fromCharCode(codePoint));
							i += 4;
							break;
						default:
							throw this.error_parsing(pos + i, "Illegal escape sequence: '\\" + c + "'");
						}
						escaping = false;
					} else {
						if (c == '\\') {
							escaping = true;
						} else {
							buffer.push(c);
						}
					}
				}
		
				return buffer.join('');
			},
	
			isString: function () {
				var r = false;
				var str = "";
				var startpos = this.pos;
				if (this.pos < this.expression.length && this.expression.charAt(this.pos) == "'") {
					this.pos++;
					while (this.pos < this.expression.length) {
						var code = this.expression.charAt(this.pos);
						if (code != "'" || str.slice(-1) == "\\") {
							str += this.expression.charAt(this.pos);
							this.pos++;
						}
						else {
							this.pos++;
							this.tokennumber = this.unescape(str, startpos);
							r = true;
							break;
						}
					}
				}
				return r;
			},
	
			isConst: function () {
				var str;
				for (var i in this.consts) {
					if (true) {
						var L = i.length;
						str = this.expression.substr(this.pos, L);
						if (i === str) {
							this.tokennumber = this.consts[i];
							this.pos += L;
							return true;
						}
					}
				}
				return false;
			},
	
			isOperator: function () {
				var code = this.expression.charCodeAt(this.pos);
				if (code === 43) { // +
					this.tokenprio = 0;
					this.tokenindex = "+";
				}
				else if (code === 45) { // -
					this.tokenprio = 0;
					this.tokenindex = "-";
				}
				else if (code === 124) { // |
					if (this.expression.charCodeAt(this.pos + 1) === 124) {
						this.pos++;
						this.tokenprio = 0;
						this.tokenindex = "||";
					}
					else {
						return false;
					}
				}
				else if (code === 42) { // *
					this.tokenprio = 1;
					this.tokenindex = "*";
				}
				else if (code === 47) { // /
					this.tokenprio = 2;
					this.tokenindex = "/";
				}
				else if (code === 37) { // %
					this.tokenprio = 2;
					this.tokenindex = "%";
				}
				else if (code === 94) { // ^
					this.tokenprio = 3;
					this.tokenindex = "^";
				}
				else {
					return false;
				}
				this.pos++;
				return true;
			},
	
			isSign: function () {
				var code = this.expression.charCodeAt(this.pos - 1);
				if (code === 45 || code === 43) { // -
					return true;
				}
				return false;
			},
	
			isPositiveSign: function () {
				var code = this.expression.charCodeAt(this.pos - 1);
				if (code === 43) { // -
					return true;
				}
				return false;
			},
	
			isNegativeSign: function () {
				var code = this.expression.charCodeAt(this.pos - 1);
				if (code === 45) { // -
					return true;
				}
				return false;
			},
	
			isLeftParenth: function () {
				var code = this.expression.charCodeAt(this.pos);
				if (code === 40) { // (
					this.pos++;
					this.tmpprio += 10;
					return true;
				}
				return false;
			},
	
			isRightParenth: function () {
				var code = this.expression.charCodeAt(this.pos);
				if (code === 41) { // )
					this.pos++;
					this.tmpprio -= 10;
					return true;
				}
				return false;
			},
	
			isComma: function () {
				var code = this.expression.charCodeAt(this.pos);
				if (code === 44) { // ,
					this.pos++;
					this.tokenprio = -1;
					this.tokenindex = ",";
					return true;
				}
				return false;
			},
	
			isWhite: function () {
				var code = this.expression.charCodeAt(this.pos);
				if (code === 32 || code === 9 || code === 10 || code === 13) {
					this.pos++;
					return true;
				}
				return false;
			},
	
			isOp1: function () {
				var str = "";
				for (var i = this.pos; i < this.expression.length; i++) {
					var c = this.expression.charAt(i);
					if (c.toUpperCase() === c.toLowerCase()) {
						if (i === this.pos || (c != '_' && (c < '0' || c > '9'))) {
							break;
						}
					}
					str += c;
				}
				if (str.length > 0 && (str in this.ops1)) {
					this.tokenindex = str;
					this.tokenprio = 5;
					this.pos += str.length;
					return true;
				}
				return false;
			},
	
			isOp2: function () {
				var str = "";
				for (var i = this.pos; i < this.expression.length; i++) {
					var c = this.expression.charAt(i);
					if (c.toUpperCase() === c.toLowerCase()) {
						if (i === this.pos || (c != '_' && (c < '0' || c > '9'))) {
							break;
						}
					}
					str += c;
				}
				if (str.length > 0 && (str in this.ops2)) {
					this.tokenindex = str;
					this.tokenprio = 5;
					this.pos += str.length;
					return true;
				}
				return false;
			},
	
			isVar: function () {
				var str = "";
				for (var i = this.pos; i < this.expression.length; i++) {
					var c = this.expression.charAt(i);
					if (c.toUpperCase() === c.toLowerCase()) {
						if (i === this.pos || (c != '_' && (c < '0' || c > '9'))) {
							break;
						}
					}
					str += c;
				}
				if (str.length > 0) {
					this.tokenindex = str;
					this.tokenprio = 4;
					this.pos += str.length;
					return true;
				}
				return false;
			},
	
			isComment: function () {
				var code = this.expression.charCodeAt(this.pos - 1);
				if (code === 47 && this.expression.charCodeAt(this.pos) === 42) {
					this.pos = this.expression.indexOf("*/", this.pos) + 2;
					if (this.pos === 1) {
						this.pos = this.expression.length;
					}
					return true;
				}
				return false;
			}
		};
	
		return Parser;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * A very simple, ERB-style templating. Basically, just as string substitution.
	 * The reason to not use default Lo-dash’es `_.template()` implementation
	 * is because it fails to run in CSP-enabled environments (Chrome extension, Atom)
	 */
	if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var stringStream = __webpack_require__(56);
		var utils = __webpack_require__(22);
	
		function parseArgs(str) {
			var args = [];
			var stream = stringStream(str);
	
			while (!stream.eol()) {
				if (stream.peek() == ',') {
					args.push(utils.trim(stream.current()));
					stream.next();
					stream.start = stream.pos;
				}
				stream.next();
			}
	
			args.push(utils.trim(stream.current()));
			return args.filter(function(a) {
				return !!a;
			});
		}
	
		function parseFunctionCall(str) {
			var fnName = null, args;
			var stream = stringStream(str);
			while (!stream.eol()) {
				if (stream.peek() == '(') {
					fnName = stream.current();
					stream.start = stream.pos;
					stream.skipToPair('(', ')', true);
					args = stream.current();
					args = parseArgs(args.substring(1, args.length - 1));
					break;
				}
	
				stream.next();
			}
	
			return fnName && {
				name: fnName,
				args: args
			};
		}
	
		function evalArg(arg, context) {
			if (/^['"]/.test(arg)) {
				// plain string
				return arg.replace(/^(['"])(.+?)\1$/, '$2');
			}
	
			if (!isNaN(+arg)) {
				// a number
				return +arg;
			}
	
			// otherwise, treat argument as a property name
			if (arg) {
				var parts = arg.split('.');
				var prop = context;
				while (parts.length) {
					prop = prop[parts.shift()];
				}
	
				return prop;
			}
		}
	
		function process(template, context) {
			return template.replace(/<%[=\-](.+?)%>/g, function(str, match) {
				match = utils.trim(match);
				var fn = parseFunctionCall(match);
				if (fn) {
					var fnArgs = fn.args.map(function(arg) {
						return evalArg(arg, context);
					});
					return context[fn.name].apply(context, fnArgs);
				}
	
				return evalArg(match, context);
			});
		}
	
		return function(template, context) {
			return context ? process(template, context) : function(context) {
				return process(template, context);
			};
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var require;/**
	 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
	 * Available via the MIT or new BSD license.
	 * see: http://github.com/jrburke/almond for details
	 */
	//Going sloppy to avoid 'use strict' string cost, but strict practices should
	//be followed.
	/*jslint sloppy: true */
	/*global setTimeout: false */
	
	var requirejs, require, define;
	(function (undef) {
	    var main, req, makeMap, handlers,
	        defined = {},
	        waiting = {},
	        config = {},
	        defining = {},
	        hasOwn = Object.prototype.hasOwnProperty,
	        aps = [].slice;
	
	    function hasProp(obj, prop) {
	        return hasOwn.call(obj, prop);
	    }
	
	    /**
	     * Given a relative module name, like ./something, normalize it to
	     * a real name that can be mapped to a path.
	     * @param {String} name the relative name
	     * @param {String} baseName a real name that the name arg is relative
	     * to.
	     * @returns {String} normalized name
	     */
	    function normalize(name, baseName) {
	        var nameParts, nameSegment, mapValue, foundMap,
	            foundI, foundStarMap, starI, i, j, part,
	            baseParts = baseName && baseName.split("/"),
	            map = config.map,
	            starMap = (map && map['*']) || {};
	
	        //Adjust any relative paths.
	        if (name && name.charAt(0) === ".") {
	            //If have a base name, try to normalize against it,
	            //otherwise, assume it is a top-level require that will
	            //be relative to baseUrl in the end.
	            if (baseName) {
	                //Convert baseName to array, and lop off the last part,
	                //so that . matches that "directory" and not name of the baseName's
	                //module. For instance, baseName of "one/two/three", maps to
	                //"one/two/three.js", but we want the directory, "one/two" for
	                //this normalization.
	                baseParts = baseParts.slice(0, baseParts.length - 1);
	
	                name = baseParts.concat(name.split("/"));
	
	                //start trimDots
	                for (i = 0; i < name.length; i += 1) {
	                    part = name[i];
	                    if (part === ".") {
	                        name.splice(i, 1);
	                        i -= 1;
	                    } else if (part === "..") {
	                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
	                            //End of the line. Keep at least one non-dot
	                            //path segment at the front so it can be mapped
	                            //correctly to disk. Otherwise, there is likely
	                            //no path mapping for a path starting with '..'.
	                            //This can still fail, but catches the most reasonable
	                            //uses of ..
	                            break;
	                        } else if (i > 0) {
	                            name.splice(i - 1, 2);
	                            i -= 2;
	                        }
	                    }
	                }
	                //end trimDots
	
	                name = name.join("/");
	            } else if (name.indexOf('./') === 0) {
	                // No baseName, so this is ID is resolved relative
	                // to baseUrl, pull off the leading dot.
	                name = name.substring(2);
	            }
	        }
	
	        //Apply map config if available.
	        if ((baseParts || starMap) && map) {
	            nameParts = name.split('/');
	
	            for (i = nameParts.length; i > 0; i -= 1) {
	                nameSegment = nameParts.slice(0, i).join("/");
	
	                if (baseParts) {
	                    //Find the longest baseName segment match in the config.
	                    //So, do joins on the biggest to smallest lengths of baseParts.
	                    for (j = baseParts.length; j > 0; j -= 1) {
	                        mapValue = map[baseParts.slice(0, j).join('/')];
	
	                        //baseName segment has  config, find if it has one for
	                        //this name.
	                        if (mapValue) {
	                            mapValue = mapValue[nameSegment];
	                            if (mapValue) {
	                                //Match, update name to the new value.
	                                foundMap = mapValue;
	                                foundI = i;
	                                break;
	                            }
	                        }
	                    }
	                }
	
	                if (foundMap) {
	                    break;
	                }
	
	                //Check for a star map match, but just hold on to it,
	                //if there is a shorter segment match later in a matching
	                //config, then favor over this star map.
	                if (!foundStarMap && starMap && starMap[nameSegment]) {
	                    foundStarMap = starMap[nameSegment];
	                    starI = i;
	                }
	            }
	
	            if (!foundMap && foundStarMap) {
	                foundMap = foundStarMap;
	                foundI = starI;
	            }
	
	            if (foundMap) {
	                nameParts.splice(0, foundI, foundMap);
	                name = nameParts.join('/');
	            }
	        }
	
	        return name;
	    }
	
	    function makeRequire(relName, forceSync) {
	        return function () {
	            //A version of a require function that passes a moduleName
	            //value for items that may need to
	            //look up paths relative to the moduleName
	            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
	        };
	    }
	
	    function makeNormalize(relName) {
	        return function (name) {
	            return normalize(name, relName);
	        };
	    }
	
	    function makeLoad(depName) {
	        return function (value) {
	            defined[depName] = value;
	        };
	    }
	
	    function callDep(name) {
	        if (hasProp(waiting, name)) {
	            var args = waiting[name];
	            delete waiting[name];
	            defining[name] = true;
	            main.apply(undef, args);
	        }
	
	        if (!hasProp(defined, name) && !hasProp(defining, name)) {
	            throw new Error('No ' + name);
	        }
	        return defined[name];
	    }
	
	    //Turns a plugin!resource to [plugin, resource]
	    //with the plugin being undefined if the name
	    //did not have a plugin prefix.
	    function splitPrefix(name) {
	        var prefix,
	            index = name ? name.indexOf('!') : -1;
	        if (index > -1) {
	            prefix = name.substring(0, index);
	            name = name.substring(index + 1, name.length);
	        }
	        return [prefix, name];
	    }
	
	    /**
	     * Makes a name map, normalizing the name, and using a plugin
	     * for normalization if necessary. Grabs a ref to plugin
	     * too, as an optimization.
	     */
	    makeMap = function (name, relName) {
	        var plugin,
	            parts = splitPrefix(name),
	            prefix = parts[0];
	
	        name = parts[1];
	
	        if (prefix) {
	            prefix = normalize(prefix, relName);
	            plugin = callDep(prefix);
	        }
	
	        //Normalize according
	        if (prefix) {
	            if (plugin && plugin.normalize) {
	                name = plugin.normalize(name, makeNormalize(relName));
	            } else {
	                name = normalize(name, relName);
	            }
	        } else {
	            name = normalize(name, relName);
	            parts = splitPrefix(name);
	            prefix = parts[0];
	            name = parts[1];
	            if (prefix) {
	                plugin = callDep(prefix);
	            }
	        }
	
	        //Using ridiculous property names for space reasons
	        return {
	            f: prefix ? prefix + '!' + name : name, //fullName
	            n: name,
	            pr: prefix,
	            p: plugin
	        };
	    };
	
	    function makeConfig(name) {
	        return function () {
	            return (config && config.config && config.config[name]) || {};
	        };
	    }
	
	    handlers = {
	        require: function (name) {
	            return makeRequire(name);
	        },
	        exports: function (name) {
	            var e = defined[name];
	            if (typeof e !== 'undefined') {
	                return e;
	            } else {
	                return (defined[name] = {});
	            }
	        },
	        module: function (name) {
	            return {
	                id: name,
	                uri: '',
	                exports: defined[name],
	                config: makeConfig(name)
	            };
	        }
	    };
	
	    main = function (name, deps, callback, relName) {
	        var cjsModule, depName, ret, map, i,
	            args = [],
	            usingExports;
	
	        //Use name if no relName
	        relName = relName || name;
	
	        //Call the callback to define the module, if necessary.
	        if (typeof callback === 'function') {
	
	            //Pull out the defined dependencies and pass the ordered
	            //values to the callback.
	            //Default to [require, exports, module] if no deps
	            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
	            for (i = 0; i < deps.length; i += 1) {
	                map = makeMap(deps[i], relName);
	                depName = map.f;
	
	                //Fast path CommonJS standard dependencies.
	                if (depName === "require") {
	                    args[i] = handlers.require(name);
	                } else if (depName === "exports") {
	                    //CommonJS module spec 1.1
	                    args[i] = handlers.exports(name);
	                    usingExports = true;
	                } else if (depName === "module") {
	                    //CommonJS module spec 1.1
	                    cjsModule = args[i] = handlers.module(name);
	                } else if (hasProp(defined, depName) ||
	                           hasProp(waiting, depName) ||
	                           hasProp(defining, depName)) {
	                    args[i] = callDep(depName);
	                } else if (map.p) {
	                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
	                    args[i] = defined[depName];
	                } else {
	                    throw new Error(name + ' missing ' + depName);
	                }
	            }
	
	            ret = callback.apply(defined[name], args);
	
	            if (name) {
	                //If setting exports via "module" is in play,
	                //favor that over return value and exports. After that,
	                //favor a non-undefined return value over exports use.
	                if (cjsModule && cjsModule.exports !== undef &&
	                        cjsModule.exports !== defined[name]) {
	                    defined[name] = cjsModule.exports;
	                } else if (ret !== undef || !usingExports) {
	                    //Use the return value from the function.
	                    defined[name] = ret;
	                }
	            }
	        } else if (name) {
	            //May just be an object definition for the module. Only
	            //worry about defining if have a module name.
	            defined[name] = callback;
	        }
	    };
	
	    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
	        if (typeof deps === "string") {
	            if (handlers[deps]) {
	                //callback in this case is really relName
	                return handlers[deps](callback);
	            }
	            //Just return the module wanted. In this scenario, the
	            //deps arg is the module name, and second arg (if passed)
	            //is just the relName.
	            //Normalize module name, if it contains . or ..
	            return callDep(makeMap(deps, callback).f);
	        } else if (!deps.splice) {
	            //deps is a config object, not an array.
	            config = deps;
	            if (callback.splice) {
	                //callback is an array, which means it is a dependency list.
	                //Adjust args if there are dependencies
	                deps = callback;
	                callback = relName;
	                relName = null;
	            } else {
	                deps = undef;
	            }
	        }
	
	        //Support require(['a'])
	        callback = callback || function () {};
	
	        //If relName is a function, it is an errback handler,
	        //so remove it.
	        if (typeof relName === 'function') {
	            relName = forceSync;
	            forceSync = alt;
	        }
	
	        //Simulate async callback;
	        if (forceSync) {
	            main(undef, deps, callback, relName);
	        } else {
	            //Using a non-zero value because of concern for what old browsers
	            //do, and latest browsers "upgrade" to 4 if lower value is used:
	            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
	            //If want a value immediately, use require('id') instead -- something
	            //that works in almond on the global level, but not guaranteed and
	            //unlikely to work in other AMD implementations.
	            setTimeout(function () {
	                main(undef, deps, callback, relName);
	            }, 4);
	        }
	
	        return req;
	    };
	
	    /**
	     * Just drops the config on the floor, but returns req in case
	     * the config return value is used.
	     */
	    req.config = function (cfg) {
	        config = cfg;
	        if (config.deps) {
	            req(config.deps, config.callback);
	        }
	        return req;
	    };
	
	    /**
	     * Expose module registry for debugging and tooling
	     */
	    requirejs._defined = defined;
	
	    define = function (name, deps, callback) {
	
	        //This module may not have dependencies
	        if (!deps.splice) {
	            //deps is not an array, so probably means
	            //an object literal or factory function for
	            //the value. Adjust args.
	            callback = deps;
	            deps = [];
	        }
	
	        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
	            waiting[name] = [name, deps, callback];
	        }
	    };
	
	    define.amd = {
	        jQuery: true
	    };
	}());


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;if (false) {
		var define = function (factory) {
			module.exports = factory(require, exports, module);
		};
	}
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
		var utils = __webpack_require__(22);
	
		/**
		 * Shared empty constructor function to aid in prototype-chain creation.
		 */
		var ctor = function(){};
	
		/**
		 * Helper function to correctly set up the prototype chain, for subclasses.
		 * Similar to `goog.inherits`, but uses a hash of prototype properties and
		 * class properties to be extended.
		 * Took it from Backbone.
		 * @param {Object} parent
		 * @param {Object} protoProps
		 * @param {Object} staticProps
		 * @returns {Object}
		 */
		function inherits(parent, protoProps, staticProps) {
			var child;
	
			// The constructor function for the new subclass is either defined by
			// you (the "constructor" property in your `extend` definition), or
			// defaulted by us to simply call the parent's constructor.
			if (protoProps && protoProps.hasOwnProperty('constructor')) {
				child = protoProps.constructor;
			} else {
				child = function() {
					parent.apply(this, arguments);
				};
			}
	
			// Inherit class (static) properties from parent.
			utils.extend(child, parent);
	
			// Set the prototype chain to inherit from `parent`, without calling
			// `parent`'s constructor function.
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
	
			// Add prototype properties (instance properties) to the subclass,
			// if supplied.
			if (protoProps)
				utils.extend(child.prototype, protoProps);
	
			// Add static properties to the constructor function, if supplied.
			if (staticProps)
				utils.extend(child, staticProps);
	
			// Correctly set child's `prototype.constructor`.
			child.prototype.constructor = child;
	
			// Set a convenience property in case the parent's prototype is needed
			// later.
			child.__super__ = parent.prototype;
	
			return child;
		}
	
		return {
			/**
			 * The self-propagating extend function for classes.
			 * Took it from Backbone 
			 * @param {Object} protoProps
			 * @param {Object} classProps
			 * @returns {Object}
			 */
			extend: function(protoProps, classProps) {
				var child = inherits(this, protoProps, classProps);
				child.extend = this.extend;
				// a hack required to WSH inherit `toString` method
				if (protoProps.hasOwnProperty('toString'))
					child.prototype.toString = protoProps.toString;
				return child;
			}
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var http = __webpack_require__(101);
	
	var https = module.exports;
	
	for (var key in http) {
	    if (http.hasOwnProperty(key)) https[key] = http[key];
	};
	
	https.request = function (params, cb) {
	    if (!params) params = {};
	    params.scheme = 'https';
	    return http.request.call(this, params, cb);
	}


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var http = module.exports;
	var EventEmitter = __webpack_require__(107).EventEmitter;
	var Request = __webpack_require__(103);
	var url = __webpack_require__(106)
	
	http.request = function (params, cb) {
	    if (typeof params === 'string') {
	        params = url.parse(params)
	    }
	    if (!params) params = {};
	    if (!params.host && !params.port) {
	        params.port = parseInt(window.location.port, 10);
	    }
	    if (!params.host && params.hostname) {
	        params.host = params.hostname;
	    }
	
	    if (!params.protocol) {
	        if (params.scheme) {
	            params.protocol = params.scheme + ':';
	        } else {
	            params.protocol = window.location.protocol;
	        }
	    }
	
	    if (!params.host) {
	        params.host = window.location.hostname || window.location.host;
	    }
	    if (/:/.test(params.host)) {
	        if (!params.port) {
	            params.port = params.host.split(':')[1];
	        }
	        params.host = params.host.split(':')[0];
	    }
	    if (!params.port) params.port = params.protocol == 'https:' ? 443 : 80;
	    
	    var req = new Request(new xhrHttp, params);
	    if (cb) req.on('response', cb);
	    return req;
	};
	
	http.get = function (params, cb) {
	    params.method = 'GET';
	    var req = http.request(params, cb);
	    req.end();
	    return req;
	};
	
	http.Agent = function () {};
	http.Agent.defaultMaxSockets = 4;
	
	var xhrHttp = (function () {
	    if (typeof window === 'undefined') {
	        throw new Error('no window object present');
	    }
	    else if (window.XMLHttpRequest) {
	        return window.XMLHttpRequest;
	    }
	    else if (window.ActiveXObject) {
	        var axs = [
	            'Msxml2.XMLHTTP.6.0',
	            'Msxml2.XMLHTTP.3.0',
	            'Microsoft.XMLHTTP'
	        ];
	        for (var i = 0; i < axs.length; i++) {
	            try {
	                var ax = new(window.ActiveXObject)(axs[i]);
	                return function () {
	                    if (ax) {
	                        var ax_ = ax;
	                        ax = null;
	                        return ax_;
	                    }
	                    else {
	                        return new(window.ActiveXObject)(axs[i]);
	                    }
	                };
	            }
	            catch (e) {}
	        }
	        throw new Error('ajax not supported in this browser')
	    }
	    else {
	        throw new Error('ajax not supported in this browser');
	    }
	})();
	
	http.STATUS_CODES = {
	    100 : 'Continue',
	    101 : 'Switching Protocols',
	    102 : 'Processing',                 // RFC 2518, obsoleted by RFC 4918
	    200 : 'OK',
	    201 : 'Created',
	    202 : 'Accepted',
	    203 : 'Non-Authoritative Information',
	    204 : 'No Content',
	    205 : 'Reset Content',
	    206 : 'Partial Content',
	    207 : 'Multi-Status',               // RFC 4918
	    300 : 'Multiple Choices',
	    301 : 'Moved Permanently',
	    302 : 'Moved Temporarily',
	    303 : 'See Other',
	    304 : 'Not Modified',
	    305 : 'Use Proxy',
	    307 : 'Temporary Redirect',
	    400 : 'Bad Request',
	    401 : 'Unauthorized',
	    402 : 'Payment Required',
	    403 : 'Forbidden',
	    404 : 'Not Found',
	    405 : 'Method Not Allowed',
	    406 : 'Not Acceptable',
	    407 : 'Proxy Authentication Required',
	    408 : 'Request Time-out',
	    409 : 'Conflict',
	    410 : 'Gone',
	    411 : 'Length Required',
	    412 : 'Precondition Failed',
	    413 : 'Request Entity Too Large',
	    414 : 'Request-URI Too Large',
	    415 : 'Unsupported Media Type',
	    416 : 'Requested Range Not Satisfiable',
	    417 : 'Expectation Failed',
	    418 : 'I\'m a teapot',              // RFC 2324
	    422 : 'Unprocessable Entity',       // RFC 4918
	    423 : 'Locked',                     // RFC 4918
	    424 : 'Failed Dependency',          // RFC 4918
	    425 : 'Unordered Collection',       // RFC 4918
	    426 : 'Upgrade Required',           // RFC 2817
	    428 : 'Precondition Required',      // RFC 6585
	    429 : 'Too Many Requests',          // RFC 6585
	    431 : 'Request Header Fields Too Large',// RFC 6585
	    500 : 'Internal Server Error',
	    501 : 'Not Implemented',
	    502 : 'Bad Gateway',
	    503 : 'Service Unavailable',
	    504 : 'Gateway Time-out',
	    505 : 'HTTP Version Not Supported',
	    506 : 'Variant Also Negotiates',    // RFC 2295
	    507 : 'Insufficient Storage',       // RFC 4918
	    509 : 'Bandwidth Limit Exceeded',
	    510 : 'Not Extended',               // RFC 2774
	    511 : 'Network Authentication Required' // RFC 6585
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	
	var base64 = __webpack_require__(111)
	var ieee754 = __webpack_require__(108)
	var isArray = __webpack_require__(109)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = Buffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation
	
	var kMaxLength = 0x3fffffff
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    return 42 === arr.foo() && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()
	
	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (subject, encoding, noZero) {
	  if (!(this instanceof Buffer))
	    return new Buffer(subject, encoding, noZero)
	
	  var type = typeof subject
	
	  // Find the length
	  var length
	  if (type === 'number')
	    length = subject > 0 ? subject >>> 0 : 0
	  else if (type === 'string') {
	    if (encoding === 'base64')
	      subject = base64clean(subject)
	    length = Buffer.byteLength(subject, encoding)
	  } else if (type === 'object' && subject !== null) { // assume object is array-like
	    if (subject.type === 'Buffer' && isArray(subject.data))
	      subject = subject.data
	    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
	  } else
	    throw new TypeError('must start with number, buffer, array or string')
	
	  if (this.length > kMaxLength)
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	      'size: 0x' + kMaxLength.toString(16) + ' bytes')
	
	  var buf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Preferred: Return an augmented `Uint8Array` instance for best performance
	    buf = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return THIS instance of Buffer (created by `new`)
	    buf = this
	    buf.length = length
	    buf._isBuffer = true
	  }
	
	  var i
	  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
	    // Speed optimization -- use set if we're copying from a typed array
	    buf._set(subject)
	  } else if (isArrayish(subject)) {
	    // Treat array-ish objects as a byte array
	    if (Buffer.isBuffer(subject)) {
	      for (i = 0; i < length; i++)
	        buf[i] = subject.readUInt8(i)
	    } else {
	      for (i = 0; i < length; i++)
	        buf[i] = ((subject[i] % 256) + 256) % 256
	    }
	  } else if (type === 'string') {
	    buf.write(subject, 0, encoding)
	  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
	    for (i = 0; i < length; i++) {
	      buf[i] = 0
	    }
	  }
	
	  return buf
	}
	
	Buffer.isBuffer = function (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
	    throw new TypeError('Arguments must be Buffers')
	
	  var x = a.length
	  var y = b.length
	  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function (list, totalLength) {
	  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')
	
	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }
	
	  var i
	  if (totalLength === undefined) {
	    totalLength = 0
	    for (i = 0; i < list.length; i++) {
	      totalLength += list[i].length
	    }
	  }
	
	  var buf = new Buffer(totalLength)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}
	
	Buffer.byteLength = function (str, encoding) {
	  var ret
	  str = str + ''
	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      ret = str.length
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = str.length * 2
	      break
	    case 'hex':
	      ret = str.length >>> 1
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8ToBytes(str).length
	      break
	    case 'base64':
	      ret = base64ToBytes(str).length
	      break
	    default:
	      ret = str.length
	  }
	  return ret
	}
	
	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined
	
	// toString(encoding, start=0, end=buffer.length)
	Buffer.prototype.toString = function (encoding, start, end) {
	  var loweredCase = false
	
	  start = start >>> 0
	  end = end === undefined || end === Infinity ? this.length : end >>> 0
	
	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'binary':
	        return binarySlice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase)
	          throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.equals = function (b) {
	  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max)
	      str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  return Buffer.compare(this, b)
	}
	
	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}
	
	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var byte = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(byte)) throw new Error('Invalid hex string')
	    buf[offset + i] = byte
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
	  return charsWritten
	}
	
	function asciiWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
	  return charsWritten
	}
	
	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
	  return charsWritten
	}
	
	function utf16leWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length, 2)
	  return charsWritten
	}
	
	Buffer.prototype.write = function (string, offset, length, encoding) {
	  // Support both (string, offset, length, encoding)
	  // and the legacy (string, encoding, offset, length)
	  if (isFinite(offset)) {
	    if (!isFinite(length)) {
	      encoding = length
	      length = undefined
	    }
	  } else {  // legacy
	    var swap = encoding
	    encoding = offset
	    offset = length
	    length = swap
	  }
	
	  offset = Number(offset) || 0
	  var remaining = this.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	  encoding = String(encoding || 'utf8').toLowerCase()
	
	  var ret
	  switch (encoding) {
	    case 'hex':
	      ret = hexWrite(this, string, offset, length)
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8Write(this, string, offset, length)
	      break
	    case 'ascii':
	      ret = asciiWrite(this, string, offset, length)
	      break
	    case 'binary':
	      ret = binaryWrite(this, string, offset, length)
	      break
	    case 'base64':
	      ret = base64Write(this, string, offset, length)
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = utf16leWrite(this, string, offset, length)
	      break
	    default:
	      throw new TypeError('Unknown encoding: ' + encoding)
	  }
	  return ret
	}
	
	Buffer.prototype.toJSON = function () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }
	
	  return res + decodeUtf8Char(tmp)
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function binarySlice (buf, start, end) {
	  return asciiSlice(buf, start, end)
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len;
	    if (start < 0)
	      start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0)
	      end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start)
	    end = start
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    return Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    var newBuf = new Buffer(sliceLen, undefined, true)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	    return newBuf
	  }
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0)
	    throw new RangeError('offset is not uint')
	  if (offset + ext > length)
	    throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUInt8 = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	      ((this[offset + 1] << 16) |
	      (this[offset + 2] << 8) |
	      this[offset + 3])
	}
	
	Buffer.prototype.readInt8 = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80))
	    return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16) |
	      (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	      (this[offset + 1] << 16) |
	      (this[offset + 2] << 8) |
	      (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new TypeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new TypeError('index out of range')
	}
	
	Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else objectWriteUInt16(this, value, offset, true)
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else objectWriteUInt16(this, value, offset, false)
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else objectWriteUInt32(this, value, offset, true)
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else objectWriteUInt32(this, value, offset, false)
	  return offset + 4
	}
	
	Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else objectWriteUInt16(this, value, offset, true)
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else objectWriteUInt16(this, value, offset, false)
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else objectWriteUInt32(this, value, offset, true)
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else objectWriteUInt32(this, value, offset, false)
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new TypeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new TypeError('index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function (target, target_start, start, end) {
	  var source = this
	
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (!target_start) target_start = 0
	
	  // Copy 0 bytes; we're done
	  if (end === start) return
	  if (target.length === 0 || source.length === 0) return
	
	  // Fatal error conditions
	  if (end < start) throw new TypeError('sourceEnd < sourceStart')
	  if (target_start < 0 || target_start >= target.length)
	    throw new TypeError('targetStart out of bounds')
	  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
	  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length)
	    end = this.length
	  if (target.length - target_start < end - start)
	    end = target.length - target_start + start
	
	  var len = end - start
	
	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + target_start] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), target_start)
	  }
	}
	
	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length
	
	  if (end < start) throw new TypeError('end < start')
	
	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return
	
	  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')
	
	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var BP = Buffer.prototype
	
	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true
	
	  // save reference to original Uint8Array get/set methods before overwriting
	  arr._get = arr.get
	  arr._set = arr.set
	
	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set
	
	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer
	
	  return arr
	}
	
	var INVALID_BASE64_RE = /[^+\/0-9A-z]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function isArrayish (subject) {
	  return isArray(subject) || Buffer.isBuffer(subject) ||
	      subject && typeof subject === 'object' &&
	      typeof subject.length === 'number'
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    var b = str.charCodeAt(i)
	    if (b <= 0x7F) {
	      byteArray.push(b)
	    } else {
	      var start = i
	      if (b >= 0xD800 && b <= 0xDFFF) i++
	      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
	      for (var j = 0; j < h.length; j++) {
	        byteArray.push(parseInt(h[j], 16))
	      }
	    }
	  }
	  return byteArray
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(str)
	}
	
	function blitBuffer (src, dst, offset, length, unitSize) {
	  if (unitSize) length -= length % unitSize;
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length))
	      break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(102).Buffer))

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(112);
	var Response = __webpack_require__(110);
	var Base64 = __webpack_require__(113);
	var inherits = __webpack_require__(114);
	
	var Request = module.exports = function (xhr, params) {
	    var self = this;
	    self.writable = true;
	    self.xhr = xhr;
	    self.body = [];
	    
	    self.uri = (params.protocol || 'http:') + '//'
	        + params.host
	        + (params.port ? ':' + params.port : '')
	        + (params.path || '/')
	    ;
	    
	    if (typeof params.withCredentials === 'undefined') {
	        params.withCredentials = true;
	    }
	
	    try { xhr.withCredentials = params.withCredentials }
	    catch (e) {}
	    
	    if (params.responseType) try { xhr.responseType = params.responseType }
	    catch (e) {}
	    
	    xhr.open(
	        params.method || 'GET',
	        self.uri,
	        true
	    );
	
	    xhr.onerror = function(event) {
	        self.emit('error', new Error('Network error'));
	    };
	
	    self._headers = {};
	    
	    if (params.headers) {
	        var keys = objectKeys(params.headers);
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            if (!self.isSafeRequestHeader(key)) continue;
	            var value = params.headers[key];
	            self.setHeader(key, value);
	        }
	    }
	    
	    if (params.auth) {
	        //basic auth
	        this.setHeader('Authorization', 'Basic ' + Base64.btoa(params.auth));
	    }
	
	    var res = new Response;
	    res.on('close', function () {
	        self.emit('close');
	    });
	    
	    res.on('ready', function () {
	        self.emit('response', res);
	    });
	
	    res.on('error', function (err) {
	        self.emit('error', err);
	    });
	    
	    xhr.onreadystatechange = function () {
	        // Fix for IE9 bug
	        // SCRIPT575: Could not complete the operation due to error c00c023f
	        // It happens when a request is aborted, calling the success callback anyway with readyState === 4
	        if (xhr.__aborted) return;
	        res.handle(xhr);
	    };
	};
	
	inherits(Request, Stream);
	
	Request.prototype.setHeader = function (key, value) {
	    this._headers[key.toLowerCase()] = value
	};
	
	Request.prototype.getHeader = function (key) {
	    return this._headers[key.toLowerCase()]
	};
	
	Request.prototype.removeHeader = function (key) {
	    delete this._headers[key.toLowerCase()]
	};
	
	Request.prototype.write = function (s) {
	    this.body.push(s);
	};
	
	Request.prototype.destroy = function (s) {
	    this.xhr.__aborted = true;
	    this.xhr.abort();
	    this.emit('close');
	};
	
	Request.prototype.end = function (s) {
	    if (s !== undefined) this.body.push(s);
	
	    var keys = objectKeys(this._headers);
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var value = this._headers[key];
	        if (isArray(value)) {
	            for (var j = 0; j < value.length; j++) {
	                this.xhr.setRequestHeader(key, value[j]);
	            }
	        }
	        else this.xhr.setRequestHeader(key, value)
	    }
	
	    if (this.body.length === 0) {
	        this.xhr.send('');
	    }
	    else if (typeof this.body[0] === 'string') {
	        this.xhr.send(this.body.join(''));
	    }
	    else if (isArray(this.body[0])) {
	        var body = [];
	        for (var i = 0; i < this.body.length; i++) {
	            body.push.apply(body, this.body[i]);
	        }
	        this.xhr.send(body);
	    }
	    else if (/Array/.test(Object.prototype.toString.call(this.body[0]))) {
	        var len = 0;
	        for (var i = 0; i < this.body.length; i++) {
	            len += this.body[i].length;
	        }
	        var body = new(this.body[0].constructor)(len);
	        var k = 0;
	        
	        for (var i = 0; i < this.body.length; i++) {
	            var b = this.body[i];
	            for (var j = 0; j < b.length; j++) {
	                body[k++] = b[j];
	            }
	        }
	        this.xhr.send(body);
	    }
	    else if (isXHR2Compatible(this.body[0])) {
	        this.xhr.send(this.body[0]);
	    }
	    else {
	        var body = '';
	        for (var i = 0; i < this.body.length; i++) {
	            body += this.body[i].toString();
	        }
	        this.xhr.send(body);
	    }
	};
	
	// Taken from http://dxr.mozilla.org/mozilla/mozilla-central/content/base/src/nsXMLHttpRequest.cpp.html
	Request.unsafeHeaders = [
	    "accept-charset",
	    "accept-encoding",
	    "access-control-request-headers",
	    "access-control-request-method",
	    "connection",
	    "content-length",
	    "cookie",
	    "cookie2",
	    "content-transfer-encoding",
	    "date",
	    "expect",
	    "host",
	    "keep-alive",
	    "origin",
	    "referer",
	    "te",
	    "trailer",
	    "transfer-encoding",
	    "upgrade",
	    "user-agent",
	    "via"
	];
	
	Request.prototype.isSafeRequestHeader = function (headerName) {
	    if (!headerName) return false;
	    return indexOf(Request.unsafeHeaders, headerName.toLowerCase()) === -1;
	};
	
	var objectKeys = Object.keys || function (obj) {
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    return keys;
	};
	
	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};
	
	var indexOf = function (xs, x) {
	    if (xs.indexOf) return xs.indexOf(x);
	    for (var i = 0; i < xs.length; i++) {
	        if (xs[i] === x) return i;
	    }
	    return -1;
	};
	
	var isXHR2Compatible = function (obj) {
	    if (typeof Blob !== 'undefined' && obj instanceof Blob) return true;
	    if (typeof ArrayBuffer !== 'undefined' && obj instanceof ArrayBuffer) return true;
	    if (typeof FormData !== 'undefined' && obj instanceof FormData) return true;
	};


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canMutationObserver = typeof window !== 'undefined'
	    && window.MutationObserver;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;
	
	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }
	
	    var queue = [];
	
	    if (canMutationObserver) {
	        var hiddenDiv = document.createElement("div");
	        var observer = new MutationObserver(function () {
	            var queueList = queue.slice();
	            queue.length = 0;
	            queueList.forEach(function (fn) {
	                fn();
	            });
	        });
	
	        observer.observe(hiddenDiv, { attributes: true });
	
	        return function nextTick(fn) {
	            if (!queue.length) {
	                hiddenDiv.setAttribute('yes', 'no');
	            }
	            queue.push(fn);
	        };
	    }
	
	    if (canPost) {
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();
	
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var punycode = __webpack_require__(115);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(116);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};
	
	function isString(arg) {
	  return typeof arg === "string";
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];
	
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	exports.read = function(buffer, offset, isLE, mLen, nBytes) {
	  var e, m,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = -7,
	      i = isLE ? (nBytes - 1) : 0,
	      d = isLE ? -1 : 1,
	      s = buffer[offset + i];
	
	  i += d;
	
	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
	
	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
	
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity);
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};
	
	exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	      i = isLE ? 0 : (nBytes - 1),
	      d = isLE ? 1 : -1,
	      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
	
	  value = Math.abs(value);
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);
	
	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);
	
	  buffer[offset + i - d] |= s * 128;
	};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * isArray
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * toString
	 */
	
	var str = Object.prototype.toString;
	
	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */
	
	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(112);
	var util = __webpack_require__(117);
	
	var Response = module.exports = function (res) {
	    this.offset = 0;
	    this.readable = true;
	};
	
	util.inherits(Response, Stream);
	
	var capable = {
	    streaming : true,
	    status2 : true
	};
	
	function parseHeaders (res) {
	    var lines = res.getAllResponseHeaders().split(/\r?\n/);
	    var headers = {};
	    for (var i = 0; i < lines.length; i++) {
	        var line = lines[i];
	        if (line === '') continue;
	        
	        var m = line.match(/^([^:]+):\s*(.*)/);
	        if (m) {
	            var key = m[1].toLowerCase(), value = m[2];
	            
	            if (headers[key] !== undefined) {
	            
	                if (isArray(headers[key])) {
	                    headers[key].push(value);
	                }
	                else {
	                    headers[key] = [ headers[key], value ];
	                }
	            }
	            else {
	                headers[key] = value;
	            }
	        }
	        else {
	            headers[line] = true;
	        }
	    }
	    return headers;
	}
	
	Response.prototype.getResponse = function (xhr) {
	    var respType = String(xhr.responseType).toLowerCase();
	    if (respType === 'blob') return xhr.responseBlob || xhr.response;
	    if (respType === 'arraybuffer') return xhr.response;
	    return xhr.responseText;
	}
	
	Response.prototype.getHeader = function (key) {
	    return this.headers[key.toLowerCase()];
	};
	
	Response.prototype.handle = function (res) {
	    if (res.readyState === 2 && capable.status2) {
	        try {
	            this.statusCode = res.status;
	            this.headers = parseHeaders(res);
	        }
	        catch (err) {
	            capable.status2 = false;
	        }
	        
	        if (capable.status2) {
	            this.emit('ready');
	        }
	    }
	    else if (capable.streaming && res.readyState === 3) {
	        try {
	            if (!this.statusCode) {
	                this.statusCode = res.status;
	                this.headers = parseHeaders(res);
	                this.emit('ready');
	            }
	        }
	        catch (err) {}
	        
	        try {
	            this._emitData(res);
	        }
	        catch (err) {
	            capable.streaming = false;
	        }
	    }
	    else if (res.readyState === 4) {
	        if (!this.statusCode) {
	            this.statusCode = res.status;
	            this.emit('ready');
	        }
	        this._emitData(res);
	        
	        if (res.error) {
	            this.emit('error', this.getResponse(res));
	        }
	        else this.emit('end');
	        
	        this.emit('close');
	    }
	};
	
	Response.prototype._emitData = function (res) {
	    var respBody = this.getResponse(res);
	    if (respBody.toString().match(/ArrayBuffer/)) {
	        this.emit('data', new Uint8Array(respBody, this.offset));
	        this.offset = respBody.byteLength;
	        return;
	    }
	    if (respBody.length > this.offset) {
	        this.emit('data', respBody.slice(this.offset));
	        this.offset = respBody.length;
	    }
	};
	
	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	;(function (exports) {
		'use strict';
	
	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array
	
		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
	
		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS)
				return 62 // '+'
			if (code === SLASH)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}
	
		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr
	
			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}
	
			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0
	
			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)
	
			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length
	
			var L = 0
	
			function push (v) {
				arr[L++] = v
			}
	
			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}
	
			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}
	
			return arr
		}
	
		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length
	
			function encode (num) {
				return lookup.charAt(num)
			}
	
			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}
	
			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}
	
			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}
	
			return output
		}
	
		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = Stream;
	
	var EE = __webpack_require__(107).EventEmitter;
	var inherits = __webpack_require__(125);
	
	inherits(Stream, EE);
	Stream.Readable = __webpack_require__(120);
	Stream.Writable = __webpack_require__(121);
	Stream.Duplex = __webpack_require__(122);
	Stream.Transform = __webpack_require__(123);
	Stream.PassThrough = __webpack_require__(124);
	
	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;
	
	
	
	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.
	
	function Stream() {
	  EE.call(this);
	}
	
	Stream.prototype.pipe = function(dest, options) {
	  var source = this;
	
	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }
	
	  source.on('data', ondata);
	
	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }
	
	  dest.on('drain', ondrain);
	
	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }
	
	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    dest.end();
	  }
	
	
	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	
	    if (typeof dest.destroy === 'function') dest.destroy();
	  }
	
	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }
	
	  source.on('error', onerror);
	  dest.on('error', onerror);
	
	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);
	
	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);
	
	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);
	
	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);
	
	    dest.removeListener('close', cleanup);
	  }
	
	  source.on('end', cleanup);
	  source.on('close', cleanup);
	
	  dest.on('close', cleanup);
	
	  dest.emit('pipe', source);
	
	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	;(function () {
	
	  var object = true ? exports : this; // #8: web workers
	  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	  function InvalidCharacterError(message) {
	    this.message = message;
	  }
	  InvalidCharacterError.prototype = new Error;
	  InvalidCharacterError.prototype.name = 'InvalidCharacterError';
	
	  // encoder
	  // [https://gist.github.com/999166] by [https://github.com/nignag]
	  object.btoa || (
	  object.btoa = function (input) {
	    for (
	      // initialize result and counter
	      var block, charCode, idx = 0, map = chars, output = '';
	      // if the next input index does not exist:
	      //   change the mapping table to "="
	      //   check if d has no fractional digits
	      input.charAt(idx | 0) || (map = '=', idx % 1);
	      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	    ) {
	      charCode = input.charCodeAt(idx += 3/4);
	      if (charCode > 0xFF) {
	        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
	      }
	      block = block << 8 | charCode;
	    }
	    return output;
	  });
	
	  // decoder
	  // [https://gist.github.com/1020396] by [https://github.com/atk]
	  object.atob || (
	  object.atob = function (input) {
	    input = input.replace(/=+$/, '');
	    if (input.length % 4 == 1) {
	      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
	    }
	    for (
	      // initialize result and counters
	      var bc = 0, bs, buffer, idx = 0, output = '';
	      // get next character
	      buffer = input.charAt(idx++);
	      // character found in table? initialize bit storage and add its ascii value;
	      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
	        // and if not first of each 4 characters,
	        // convert the first 8 bits to one ascii character
	        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
	    ) {
	      // try to find character in table (0-63, not found => -1)
	      buffer = chars.indexOf(buffer);
	    }
	    return output;
	  });
	
	}());


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105)(module), (function() { return this; }())))

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(118);
	exports.encode = exports.stringify = __webpack_require__(119);


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(126);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(132);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(104)))

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(128);
	exports.Stream = __webpack_require__(112);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(129);
	exports.Duplex = __webpack_require__(127);
	exports.Transform = __webpack_require__(130);
	exports.PassThrough = __webpack_require__(131);


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(129)


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(127)


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(130)


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(131)


/***/ },
/* 125 */
114,
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.
	
	module.exports = Duplex;
	
	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/
	
	
	/*<replacement>*/
	var util = __webpack_require__(136);
	util.inherits = __webpack_require__(137);
	/*</replacement>*/
	
	var Readable = __webpack_require__(128);
	var Writable = __webpack_require__(129);
	
	util.inherits(Duplex, Readable);
	
	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});
	
	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);
	
	  Readable.call(this, options);
	  Writable.call(this, options);
	
	  if (options && options.readable === false)
	    this.readable = false;
	
	  if (options && options.writable === false)
	    this.writable = false;
	
	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;
	
	  this.once('end', onend);
	}
	
	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;
	
	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}
	
	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = Readable;
	
	/*<replacement>*/
	var isArray = __webpack_require__(134);
	/*</replacement>*/
	
	
	/*<replacement>*/
	var Buffer = __webpack_require__(102).Buffer;
	/*</replacement>*/
	
	Readable.ReadableState = ReadableState;
	
	var EE = __webpack_require__(107).EventEmitter;
	
	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/
	
	var Stream = __webpack_require__(112);
	
	/*<replacement>*/
	var util = __webpack_require__(136);
	util.inherits = __webpack_require__(137);
	/*</replacement>*/
	
	var StringDecoder;
	
	
	/*<replacement>*/
	var debug = __webpack_require__(133);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/
	
	
	util.inherits(Readable, Stream);
	
	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(127);
	
	  options = options || {};
	
	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;
	
	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	
	
	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;
	
	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;
	
	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;
	
	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(135).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	
	function Readable(options) {
	  var Duplex = __webpack_require__(127);
	
	  if (!(this instanceof Readable))
	    return new Readable(options);
	
	  this._readableState = new ReadableState(options, this);
	
	  // legacy
	  this.readable = true;
	
	  Stream.call(this);
	}
	
	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;
	
	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }
	
	  return readableAddChunk(this, state, chunk, encoding, false);
	};
	
	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};
	
	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);
	
	      if (!addToFront)
	        state.reading = false;
	
	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);
	
	        if (state.needReadable)
	          emitReadable(stream);
	      }
	
	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }
	
	  return needMoreData(state);
	}
	
	
	
	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}
	
	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(135).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};
	
	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}
	
	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;
	
	  if (state.objectMode)
	    return n === 0 ? 0 : 1;
	
	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }
	
	  if (n <= 0)
	    return 0;
	
	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);
	
	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }
	
	  return n;
	}
	
	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;
	
	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;
	
	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }
	
	  n = howMuchToRead(n, state);
	
	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }
	
	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	
	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);
	
	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }
	
	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }
	
	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }
	
	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);
	
	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;
	
	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }
	
	  state.length -= n;
	
	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;
	
	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);
	
	  if (!util.isNull(ret))
	    this.emit('data', ret);
	
	  return ret;
	};
	
	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}
	
	
	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;
	
	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}
	
	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}
	
	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}
	
	
	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}
	
	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}
	
	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};
	
	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;
	
	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;
	
	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);
	
	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }
	
	  function onend() {
	    debug('onend');
	    dest.end();
	  }
	
	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);
	
	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }
	
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }
	
	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];
	
	
	
	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);
	
	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }
	
	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);
	
	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }
	
	  return dest;
	};
	
	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}
	
	
	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;
	
	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;
	
	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;
	
	    if (!dest)
	      dest = state.pipes;
	
	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }
	
	  // slow case. multiple pipe destinations.
	
	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	
	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }
	
	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;
	
	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];
	
	  dest.emit('unpipe', this);
	
	  return this;
	};
	
	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	
	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }
	
	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }
	
	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	
	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};
	
	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}
	
	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}
	
	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};
	
	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}
	
	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;
	
	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }
	
	    self.push(null);
	  });
	
	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;
	
	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });
	
	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }
	
	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });
	
	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };
	
	  return self;
	};
	
	
	
	// exposed for testing purposes only.
	Readable._fromList = fromList;
	
	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;
	
	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;
	
	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);
	
	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);
	
	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);
	
	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();
	
	        c += cpy;
	      }
	    }
	  }
	
	  return ret;
	}
	
	function endReadable(stream) {
	  var state = stream._readableState;
	
	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');
	
	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}
	
	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.
	
	module.exports = Writable;
	
	/*<replacement>*/
	var Buffer = __webpack_require__(102).Buffer;
	/*</replacement>*/
	
	Writable.WritableState = WritableState;
	
	
	/*<replacement>*/
	var util = __webpack_require__(136);
	util.inherits = __webpack_require__(137);
	/*</replacement>*/
	
	var Stream = __webpack_require__(112);
	
	util.inherits(Writable, Stream);
	
	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}
	
	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(127);
	
	  options = options || {};
	
	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
	
	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;
	
	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;
	
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;
	
	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;
	
	  // a flag to see when we're in the middle of a write.
	  this.writing = false;
	
	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;
	
	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };
	
	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;
	
	  // the amount that is being written when _write is called.
	  this.writelen = 0;
	
	  this.buffer = [];
	
	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;
	
	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;
	
	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}
	
	function Writable(options) {
	  var Duplex = __webpack_require__(127);
	
	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);
	
	  this._writableState = new WritableState(options, this);
	
	  // legacy.
	  this.writable = true;
	
	  Stream.call(this);
	}
	
	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};
	
	
	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}
	
	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}
	
	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	
	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;
	
	  if (!util.isFunction(cb))
	    cb = function() {};
	
	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }
	
	  return ret;
	};
	
	Writable.prototype.cork = function() {
	  var state = this._writableState;
	
	  state.corked++;
	};
	
	Writable.prototype.uncork = function() {
	  var state = this._writableState;
	
	  if (state.corked) {
	    state.corked--;
	
	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};
	
	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}
	
	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;
	
	  state.length += len;
	
	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;
	
	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	
	  return ret;
	}
	
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}
	
	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }
	
	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}
	
	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}
	
	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	
	  onwriteStateUpdate(state);
	
	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);
	
	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }
	
	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}
	
	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}
	
	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}
	
	
	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	
	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);
	
	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });
	
	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }
	
	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }
	
	  state.bufferProcessing = false;
	}
	
	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	
	};
	
	Writable.prototype._writev = null;
	
	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;
	
	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);
	
	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }
	
	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};
	
	
	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}
	
	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}
	
	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}
	
	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104)))

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	
	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.
	
	module.exports = Transform;
	
	var Duplex = __webpack_require__(127);
	
	/*<replacement>*/
	var util = __webpack_require__(136);
	util.inherits = __webpack_require__(137);
	/*</replacement>*/
	
	util.inherits(Transform, Duplex);
	
	
	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };
	
	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}
	
	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;
	
	  var cb = ts.writecb;
	
	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));
	
	  ts.writechunk = null;
	  ts.writecb = null;
	
	  if (!util.isNullOrUndefined(data))
	    stream.push(data);
	
	  if (cb)
	    cb(er);
	
	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	
	
	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);
	
	  Duplex.call(this, options);
	
	  this._transformState = new TransformState(options, this);
	
	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;
	
	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;
	
	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;
	
	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}
	
	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};
	
	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};
	
	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};
	
	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;
	
	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};
	
	
	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);
	
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;
	
	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');
	
	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');
	
	  return stream.push(null);
	}


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.
	
	module.exports = PassThrough;
	
	var Transform = __webpack_require__(130);
	
	/*<replacement>*/
	var util = __webpack_require__(136);
	util.inherits = __webpack_require__(137);
	/*</replacement>*/
	
	util.inherits(PassThrough, Transform);
	
	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);
	
	  Transform.call(this, options);
	}
	
	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 132 */
114,
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var Buffer = __webpack_require__(102).Buffer;
	
	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }
	
	
	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}
	
	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }
	
	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};
	
	
	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;
	
	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;
	
	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }
	
	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);
	
	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
	
	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;
	
	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }
	
	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);
	
	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }
	
	  charStr += buffer.toString(this.encoding, 0, end);
	
	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }
	
	  // or just emit the charStr
	  return charStr;
	};
	
	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;
	
	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];
	
	    // See http://en.wikipedia.org/wiki/UTF-8#Description
	
	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }
	
	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }
	
	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};
	
	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);
	
	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }
	
	  return res;
	};
	
	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}
	
	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}
	
	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	function isBuffer(arg) {
	  return Buffer.isBuffer(arg);
	}
	exports.isBuffer = isBuffer;
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(102).Buffer))

/***/ },
/* 137 */
114
/******/ ])))
//# sourceMappingURL=demo.js.map