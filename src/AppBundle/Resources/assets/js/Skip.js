// Classes
import {Config, Container, Data, Repository} from './Classes';

// Config
import ExternalData from './config/ExternalData';
import ConfigData from './config/ConfigData';

// Components
import CompanyTable from './components/CompanyTable';

// Addons
// import * from './addons/*';


// Modules
import Company from './modules/Company';
import Global from './modules/Global';

const React = require("react");

class Skip {
    constructor(environment, user) {
        this.loaded = false;
        window.logger = window.l = require('console-log-level')({ level: environment == 'dev' ? 'debug' : 'error' });
        l.debug("Booting up Skip v0.1");

        this.environment = 'dev';
        this.user        = user;
        window.user      = undefined;
    }

    isLoaded() {
        return this.loaded();
    }

    run() {
        this.ie10Workaround();
        this.jqueryPlugins();

        this.config    = new Config(new ConfigData(this).getData());
        this.container = new Container(this);

        this.data      = new Data(new ExternalData(this).getData());
        this.modules   = this.buildModules();
        this.addons    = this.buildAddons();

        require('react-tap-event-plugin');
        this.loaded = true;
        this.getModule('global')();
        this.getModule('company')();

        l.debug("Skip is loaded, and ready!");
    }

    buildModules() {
        var repository = new Repository();
        repository.add('company', Company);
        repository.add('global', Global);

        return repository;
    }

    buildAddons() {
        // var repository = new Repository();
        // repository.add('ImagePlaceholder', new ImagePlaceholder(this));
        // repository.add('ImageRotator', new ImageRotator(this));
        // repository.add('MetaHover', new MetaHover(this));
        // repository.add('SearchComplete', new SearchComplete(this));
        //
        // return repository;
        return true;
    }

    getModule(name) {
        return this.modules.fetch(name);
    }

    getData() {
        return this.data;
    }

    getConfig() {
        return this.config;
    }

    getContainer() {
        return this.container;
    }

    getEnvironment() {
        return this.environment;
    }

    isEnv(environment) {
        return this.getEnvironment() === environment;
    }

    getUser() {
        return this.user;
    }

    ie10Workaround() {
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement('style');
            msViewportStyle.appendChild(
                document.createTextNode(
                    '@-ms-viewport{width:auto!important}'
                )
            )
            document.querySelector('head').appendChild(msViewportStyle)
        }
    }

    jqueryPlugins() {
        require('malihu-custom-scrollbar-plugin')($);

        require('bootstrap');
        require('bootstrap-select');
        require('bootstrap-switch');
        require('history.js');

        (function($) {
            $.fn.blink = function(options) {
                var defaults = { delay:500 };
                var options = $.extend(defaults, options);

                return this.each(function() {
                    var obj = $(this);
                    setInterval(function() {
                        if($(obj).css("visibility") == "visible") {
                            $(obj).css('visibility','hidden');
                        } else {
                            $(obj).css('visibility','visible');
                        }
                    }, options.delay);
                });
            }
        }(jQuery));

        (() => {
            /*
             * jQuery Highlight plugin
             *
             * Based on highlight v3 by Johann Burkard
             * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
             *
             * Code a little bit refactored and cleaned (in my humble opinion).
             * Most important changes:
             *  - has an option to highlight only entire words (wordsOnly - false by default),
             *  - has an option to be case sensitive (caseSensitive - false by default)
             *  - highlight element tag and class names can be specified in options
             *
             * Usage:
             *   // wrap every occurrance of text 'lorem' in content
             *   // with <span class='highlight'> (default options)
             *   $('#content').highlight('lorem');
             *
             *   // search for and highlight more terms at once
             *   // so you can save some time on traversing DOM
             *   $('#content').highlight(['lorem', 'ipsum']);
             *   $('#content').highlight('lorem ipsum');
             *
             *   // search only for entire word 'lorem'
             *   $('#content').highlight('lorem', { wordsOnly: true });
             *
             *   // don't ignore case during search of term 'lorem'
             *   $('#content').highlight('lorem', { caseSensitive: true });
             *
             *   // wrap every occurrance of term 'ipsum' in content
             *   // with <em class='important'>
             *   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
             *
             *   // remove default highlight
             *   $('#content').unhighlight();
             *
             *   // remove custom highlight
             *   $('#content').unhighlight({ element: 'em', className: 'important' });
             *
             *
             * Copyright (c) 2009 Bartek Szopka
             *
             * Licensed under MIT license.
             *
             */
            jQuery.extend({
                highlight: function (node, re, nodeName, className) {
                    if (node.nodeType === 3) {
                        var match = node.data.match(re);
                        if (match) {
                            var highlight = document.createElement(nodeName || 'span');
                            highlight.className = className || 'highlight';
                            var wordNode = node.splitText(match.index);
                            wordNode.splitText(match[0].length);
                            var wordClone = wordNode.cloneNode(true);
                            highlight.appendChild(wordClone);
                            wordNode.parentNode.replaceChild(highlight, wordNode);
                            return 1; //skip added node in parent
                        }
                    } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
                        !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
                        !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
                        for (var i = 0; i < node.childNodes.length; i++) {
                            i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
                        }
                    }
                    return 0;
                }
            });

            jQuery.fn.unhighlight = function (options) {
                var settings = { className: 'highlight', element: 'span' };
                jQuery.extend(settings, options);

                return this.find(settings.element + "." + settings.className).each(function () {
                    var parent = this.parentNode;
                    parent.replaceChild(this.firstChild, this);
                    parent.normalize();
                }).end();
            };

            jQuery.fn.highlight = function (words, options) {
                var settings = { className: 'highlight', element: 'span', caseSensitive: false, wordsOnly: false };
                jQuery.extend(settings, options);

                if (words.constructor === String) {
                    words = [words];
                }
                words = jQuery.grep(words, function(word, i){
                    return word != '';
                });
                words = jQuery.map(words, function(word, i) {
                    return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                });
                if (words.length == 0) { return this; };

                var flag = settings.caseSensitive ? "" : "i";
                var pattern = "(" + words.join("|") + ")";
                if (settings.wordsOnly) {
                    pattern = "\\b" + pattern + "\\b";
                }
                var re = new RegExp(pattern, flag);

                return this.each(function () {
                    jQuery.highlight(this, re, settings.element, settings.className);
                });
            };
        })();

        (() => {
            function leftMenu(state)
            {
                if ($(window).width() >= 825) {
                    $("#wrapper").removeClass("mobile");
                }
                else {
                    $("#wrapper").addClass("mobile");
                    if (state == 'collapsed' && $('#sidebar-wrapper').hasClass("off")) state = 'full';
                    else if (state == 'full' || state == 'collapsed') state = 'hidden';
                }

                if (state == 'full') {
                    $("#sidebar-wrapper").removeClass("off");
                    $("#toggle-menu-btn").removeClass("fa-caret-right");
                    $("#toggle-menu-btn").addClass("fa-caret-left");
                    $(".sidebar-nav li span, div.aside-section-header, .hide-on-toggle").show();
                    $("#wrapper").removeClass("collapsed");
                }
                else if(state == 'collapsed') {
                    $("#sidebar-wrapper").removeClass("off");
                    $("#toggle-menu-btn").addClass("fa-caret-right");
                    $("#toggle-menu-btn").removeClass("fa-caret-left");
                    $(".sidebar-nav li span, div.aside-section-header, .hide-on-toggle").hide();
                    $("#wrapper").addClass("collapsed");
                }
                else if(state == 'hidden') {
                    $("#sidebar-wrapper").addClass("off");
                    $("#toggle-menu-btn").addClass("fa-caret-right");
                    $("#toggle-menu-btn").removeClass("fa-caret-left");
                    $("#wrapper").removeClass("collapsed");
                }
            }

            function leftMenuResize()
            {
                if ($(window).width() <= 825) {
                    leftMenu('hidden');
                }
                else if ($(window).width() <= 1345) {
                    leftMenu('collapsed');
                }
                else {
                    leftMenu('full');
                }
            }

            (function($){
                $(window).load(function(){
                    $(".cs-widget").mCustomScrollbar();
                });
            })(jQuery);

            $(document).ready(function(e){
                /* Header SEARCH with select dropdown */
                $('.search-panel .dropdown-menu').find('a').click(function(e) {
                    e.preventDefault();
                    var param = $(this).attr("href").replace("#","");
                    var concept = $(this).text();
                    $('.search-panel span#search_concept').text(concept);
                    $('.input-group #search_param').val(param);
                });

                /* Left menu */
                $(window).resize(function(){
                    leftMenuResize();
                });
                leftMenuResize();
                $("#wrapper").show();

                $(".menu-toggle").click(function(e) {
                    e.preventDefault();
                    if ($("#wrapper").hasClass("collapsed")) {
                        leftMenu('full');
                    }
                    else {
                        leftMenu('collapsed');
                    }
                });
                //$("#page-content-wrapper").click(function(e) {
                //	if ($(window).width() <= 1345) {
                //		leftMenuResize();
                //	}
                //});
                $('[data-toggle=tooltip]').tooltip();
                //$('.menu-toggle').tooltip();

                $(window).scroll(function () {
                    if ($(this).scrollTop() > 100) {
                        $('#back-to-top').fadeIn();
                    } else {
                        $('#back-to-top').fadeOut();
                    }
                    var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
                    if (scrollBottom < 40){
                        $('#back-to-top').css('bottom', '50px');
                    }
                    else {
                        $('#back-to-top').css('bottom', '10px');
                    }
                });
                // scroll body to 0px on click
                $('#back-to-top').click(function () {
                    $('#back-to-top').tooltip('hide');
                    $('body,html').animate({
                        scrollTop: 0
                    }, 800);
                    return false;
                });

                // blinking text
                $('.blink').blink();

                // hd switch
                $("[name='hd-switch-checkbox']").bootstrapSwitch();

            });

            // toggle divs
            function toggleDiv(divId) {
                $("#"+divId).toggle();
            }

            // social buttons
            $(function () {
                var all_classes = "";
                var timer = undefined;
                $.each($('li', '.social-class'), function (index, element) {
                    all_classes += " btn-" + $(element).data("code");
                });
                $('li', '.social-class').mouseenter(function () {
                    var icon_name = $(this).data("code");
                    if ($(this).data("icon")) {
                        icon_name = $(this).data("icon");
                    }
                    var icon = "<i class='fa fa-" + icon_name + "'></i>";
                    $('.btn-social', '.social-sizes').html(icon + "Sign in with " + $(this).data("name"));
                    $('.btn-social-icon', '.social-sizes').html(icon);
                    $('.btn', '.social-sizes').removeClass(all_classes);
                    $('.btn', '.social-sizes').addClass("btn-" + $(this).data('code'));
                });
                $($('li', '.social-class')[Math.floor($('li', '.social-class').length * Math.random())]).mouseenter();
            });

            $(function(){
                $(".dropdown-menu > li > a.trigger").on("click",function(e){
                    var current=$(this).next();
                    var grandparent=$(this).parent().parent();
                    if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
                        $(this).toggleClass('right-caret left-caret');
                    grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
                    grandparent.find(".sub-menu:visible").not(current).hide();
                    current.toggle();
                    e.stopPropagation();
                });
                $(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
                    var root=$(this).closest('.dropdown');
                    root.find('.left-caret').toggleClass('right-caret left-caret');
                    root.find('.sub-menu:visible').hide();
                });
            });
        })();
    }
}

module.exports = Skip;
