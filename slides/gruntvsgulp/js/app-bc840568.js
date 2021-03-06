/**
 * gruntjsmeetup-gulpvsgrunt
 * @version v1.0.0
 * @link [object Object]
 * @timestamp Wed May 21 2014 11:41:58 GMT+0400 (Московское время (зима))
 */
var Reveal = (function() {
    'use strict';
    function e(e) {
        return t(), jt || It
            ? (window.addEventListener('load', T, !1), u(Wt, e), y(), void n())
            : void document.body.setAttribute('class', 'no-transforms');
    }
    function t() {
        It = 'WebkitPerspective' in document.body.style ||
            'MozPerspective' in document.body.style ||
            'msPerspective' in document.body.style ||
            'OPerspective' in document.body.style ||
            'perspective' in document.body.style, jt = 'WebkitTransform' in
            document.body.style ||
            'MozTransform' in document.body.style ||
            'msTransform' in document.body.style ||
            'OTransform' in document.body.style ||
            'transform' in document.body.style, Ot = navigator.userAgent.match(
            /(iphone|ipod|android)/gi
        );
    }
    function n() {
        function e() {
            n.length && head.js.apply(null, n), r();
        }
        for (
            var t = [], n = [], o = 0, a = Wt.dependencies.length;
            a > o;
            o++
        ) {
            var i = Wt.dependencies[o];
            (!i.condition || i.condition()) &&
                (i.async ? n.push(i.src) : t.push(i.src), 'function' ==
                    typeof i.callback &&
                    head.ready(
                        i.src.match(/([\w\d_\-]*)\.?js$|[^\\\/]*$/i)[0],
                        i.callback
                    ));
        }
        t.length ? (head.ready(e), head.js.apply(null, t)) : e();
    }
    function r() {
        a(), o(), c(), J(), setTimeout(
            function() {
                $t.slides.classList.remove(
                    'no-transition'
                ), Ut = !0, w('ready', {
                    indexh: Dt,
                    indexv: Pt,
                    currentSlide: Rt
                });
            },
            1
        );
    }
    function o() {
        var e = f(document.querySelectorAll(Yt));
        e.forEach(function(e) {
            var t = f(e.querySelectorAll('section'));
            t.forEach(function(e, t) {
                t > 0 && e.classList.add('future');
            });
        });
    }
    function a() {
        $t.theme = document.querySelector(
            '#theme'
        ), $t.wrapper = document.querySelector(
            '.reveal'
        ), $t.slides = document.querySelector(
            '.reveal .slides'
        ), $t.slides.classList.add('no-transition'), $t.background = i(
            $t.wrapper,
            'div',
            'backgrounds',
            null
        ), $t.progress = i(
            $t.wrapper,
            'div',
            'progress',
            '<span></span>'
        ), $t.progressbar = $t.progress.querySelector('span'), i(
            $t.wrapper,
            'aside',
            'controls',
            '<div class="navigate-left"></div><div class="navigate-right"></div><div class="navigate-up"></div><div class="navigate-down"></div>'
        ), i($t.wrapper, 'div', 'state-background', null), i(
            $t.wrapper,
            'div',
            'pause-overlay',
            null
        ), Wt.controls &&
            ($t.controls = document.querySelector(
                '.reveal .controls'
            ), $t.controlsLeft = f(
                document.querySelectorAll('.navigate-left')
            ), $t.controlsRight = f(
                document.querySelectorAll('.navigate-right')
            ), $t.controlsUp = f(
                document.querySelectorAll('.navigate-up')
            ), $t.controlsDown = f(
                document.querySelectorAll('.navigate-down')
            ), $t.controlsPrev = f(
                document.querySelectorAll('.navigate-prev')
            ), $t.controlsNext = f(
                document.querySelectorAll('.navigate-next')
            ));
    }
    function i(e, t, n, r) {
        var o = e.querySelector('.' + n);
        return o ||
            (o = document.createElement(t), o.classList.add(n), null !== r &&
                (o.innerHTML = r), e.appendChild(o)), o;
    }
    function s() {
        function e(e, t) {
            var n = {
                background: e.getAttribute('data-background'),
                backgroundSize: e.getAttribute('data-background-size'),
                backgroundImage: e.getAttribute('data-background-image'),
                backgroundColor: e.getAttribute('data-background-color'),
                backgroundRepeat: e.getAttribute('data-background-repeat'),
                backgroundPosition: e.getAttribute('data-background-position'),
                backgroundTransition: e.getAttribute(
                    'data-background-transition'
                )
            },
                r = document.createElement('div');
            return r.className = 'slide-background', n.background &&
                (/^(http|file|\/\/)/gi.test(n.background) ||
                    /\.(png|jpg|jpeg|gif|bmp)$/gi.test(n.background)
                    ? r.style.backgroundImage = 'url(' + n.background + ')'
                    : r.style.background = n.background), n.backgroundSize &&
                (r.style.backgroundSize = n.backgroundSize), n.backgroundImage &&
                (r.style.backgroundImage = 'url("' +
                    n.backgroundImage +
                    '")'), n.backgroundColor &&
                (r.style.backgroundColor = n.backgroundColor), n.backgroundRepeat &&
                (r.style.backgroundRepeat = n.backgroundRepeat), n.backgroundPosition &&
                (r.style.backgroundPosition = n.backgroundPosition), n.backgroundTransition &&
                r.setAttribute(
                    'data-background-transition',
                    n.backgroundTransition
                ), t.appendChild(r), r;
        }
        h() &&
            document.body.classList.add(
                'print-pdf'
            ), $t.background.innerHTML = '', $t.background.classList.add(
            'no-transition'
        ), f(document.querySelectorAll(Yt)).forEach(function(t) {
            var n;
            n = h() ? e(t, t) : e(t, $t.background), f(
                t.querySelectorAll('section')
            ).forEach(function(t) {
                h() ? e(t, t) : e(t, n);
            });
        });
    }
    function c(e) {
        if (
            ($t.wrapper.classList.remove(Wt.transition), 'object' == typeof e &&
                u(Wt, e), It === !1 &&
                (Wt.transition = 'linear'), $t.wrapper.classList.add(
                Wt.transition
            ), $t.wrapper.setAttribute(
                'data-transition-speed',
                Wt.transitionSpeed
            ), $t.wrapper.setAttribute(
                'data-background-transition',
                Wt.backgroundTransition
            ), $t.controls &&
                ($t.controls.style.display = Wt.controls && $t.controls
                    ? 'block'
                    : 'none'), $t.progress &&
                ($t.progress.style.display = Wt.progress && $t.progress
                    ? 'block'
                    : 'none'), Wt.rtl
                ? $t.wrapper.classList.add('rtl')
                : $t.wrapper.classList.remove('rtl'), Wt.center
                ? $t.wrapper.classList.add('center')
                : $t.wrapper.classList.remove('center'), Wt.mouseWheel
                ? (document.addEventListener(
                      'DOMMouseScroll',
                      bt,
                      !1
                  ), document.addEventListener('mousewheel', bt, !1))
                : (document.removeEventListener(
                      'DOMMouseScroll',
                      bt,
                      !1
                  ), document.removeEventListener(
                      'mousewheel',
                      bt,
                      !1
                  )), Wt.rollingLinks ? L() : E(), Wt.previewLinks
                ? S()
                : (k(), S('[data-preview-link]')), Wt.theme && $t.theme)
        ) {
            var t = $t.theme.getAttribute('href'),
                n = /[^\/]*?(?=\.css)/,
                r = t.match(n)[0];
            Wt.theme !== r &&
                (t = t.replace(n, Wt.theme), $t.theme.setAttribute('href', t));
        }
        U();
    }
    function l() {
        Jt = !0, window.addEventListener(
            'hashchange',
            qt,
            !1
        ), window.addEventListener('resize', Tt, !1), Wt.touch &&
            ($t.wrapper.addEventListener(
                'touchstart',
                vt,
                !1
            ), $t.wrapper.addEventListener(
                'touchmove',
                pt,
                !1
            ), $t.wrapper.addEventListener(
                'touchend',
                mt,
                !1
            ), window.navigator.msPointerEnabled &&
                ($t.wrapper.addEventListener(
                    'MSPointerDown',
                    gt,
                    !1
                ), $t.wrapper.addEventListener(
                    'MSPointerMove',
                    ht,
                    !1
                ), $t.wrapper.addEventListener(
                    'MSPointerUp',
                    yt,
                    !1
                ))), Wt.keyboard &&
            document.addEventListener('keydown', ft, !1), Wt.progress &&
            $t.progress &&
            $t.progress.addEventListener('click', wt, !1), Wt.controls &&
            $t.controls &&
            ['touchstart', 'click'].forEach(function(e) {
                $t.controlsLeft.forEach(function(t) {
                    t.addEventListener(e, Lt, !1);
                }), $t.controlsRight.forEach(function(t) {
                    t.addEventListener(e, Et, !1);
                }), $t.controlsUp.forEach(function(t) {
                    t.addEventListener(e, St, !1);
                }), $t.controlsDown.forEach(function(t) {
                    t.addEventListener(e, kt, !1);
                }), $t.controlsPrev.forEach(function(t) {
                    t.addEventListener(e, At, !1);
                }), $t.controlsNext.forEach(function(t) {
                    t.addEventListener(e, xt, !1);
                });
            });
    }
    function d() {
        Jt = !1, document.removeEventListener(
            'keydown',
            ft,
            !1
        ), window.removeEventListener(
            'hashchange',
            qt,
            !1
        ), window.removeEventListener(
            'resize',
            Tt,
            !1
        ), $t.wrapper.removeEventListener(
            'touchstart',
            vt,
            !1
        ), $t.wrapper.removeEventListener(
            'touchmove',
            pt,
            !1
        ), $t.wrapper.removeEventListener(
            'touchend',
            mt,
            !1
        ), window.navigator.msPointerEnabled &&
            ($t.wrapper.removeEventListener(
                'MSPointerDown',
                gt,
                !1
            ), $t.wrapper.removeEventListener(
                'MSPointerMove',
                ht,
                !1
            ), $t.wrapper.removeEventListener(
                'MSPointerUp',
                yt,
                !1
            )), Wt.progress &&
            $t.progress &&
            $t.progress.removeEventListener('click', wt, !1), Wt.controls &&
            $t.controls &&
            ['touchstart', 'click'].forEach(function(e) {
                $t.controlsLeft.forEach(function(t) {
                    t.removeEventListener(e, Lt, !1);
                }), $t.controlsRight.forEach(function(t) {
                    t.removeEventListener(e, Et, !1);
                }), $t.controlsUp.forEach(function(t) {
                    t.removeEventListener(e, St, !1);
                }), $t.controlsDown.forEach(function(t) {
                    t.removeEventListener(e, kt, !1);
                }), $t.controlsPrev.forEach(function(t) {
                    t.removeEventListener(e, At, !1);
                }), $t.controlsNext.forEach(function(t) {
                    t.removeEventListener(e, xt, !1);
                });
            });
    }
    function u(e, t) {
        for (var n in t)
            e[n] = t[n];
    }
    function f(e) {
        return Array.prototype.slice.call(e);
    }
    function v(e, t) {
        var n = e.x - t.x, r = e.y - t.y;
        return Math.sqrt(n * n + r * r);
    }
    function p(e, t) {
        e.style.WebkitTransform = t, e.style.MozTransform = t, e.style.msTransform = t, e.style.OTransform = t, e.style.transform = t;
    }
    function m(e) {
        var t = 0;
        if (e) {
            var n = 0;
            f(e.childNodes).forEach(function(e) {
                'number' == typeof e.offsetTop &&
                    e.style &&
                    ('absolute' === e.style.position && (n += 1), t = Math.max(
                        t,
                        e.offsetTop + e.offsetHeight
                    ));
            }), 0 === n && (t = e.offsetHeight);
        }
        return t;
    }
    function g(e, t) {
        if ((t = t || 0, e)) {
            var n = e.parentNode, r = n.childNodes;
            f(r).forEach(function(n) {
                if ('number' == typeof n.offsetHeight && n !== e) {
                    var r = window.getComputedStyle(n),
                        o = parseInt(r.marginTop, 10),
                        a = parseInt(r.marginBottom, 10);
                    t -= n.offsetHeight + o + a;
                }
            });
            var o = window.getComputedStyle(e);
            t -= parseInt(o.marginTop, 10) + parseInt(o.marginBottom, 10);
        }
        return t;
    }
    function h() {
        return /print-pdf/gi.test(window.location.search);
    }
    function y() {
        /iphone|ipod|android/gi.test(navigator.userAgent) &&
            !/crios/gi.test(navigator.userAgent) &&
            (window.addEventListener('load', b, !1), window.addEventListener(
                'orientationchange',
                b,
                !1
            ));
    }
    function b() {
        0 === window.orientation
            ? (document.documentElement.style.overflow = 'scroll', document.body.style.height = '120%')
            : (document.documentElement.style.overflow = '', document.body.style.height = '100%'), setTimeout(
            function() {
                window.scrollTo(0, 1);
            },
            10
        );
    }
    function w(e, t) {
        var n = document.createEvent('HTMLEvents', 1, 2);
        n.initEvent(e, !0, !0), u(n, t), $t.wrapper.dispatchEvent(n);
    }
    function L() {
        if (It && !('msPerspective' in document.body.style))
            for (
                var e = document.querySelectorAll(Ht + ' a:not(.image)'),
                    t = 0,
                    n = e.length;
                n > t;
                t++
            ) {
                var r = e[t];
                if (
                    !(!r.textContent ||
                        r.querySelector('*') ||
                        r.className && r.classList.contains(r, 'roll'))
                ) {
                    var o = document.createElement('span');
                    o.setAttribute(
                        'data-title',
                        r.text
                    ), o.innerHTML = r.innerHTML, r.classList.add(
                        'roll'
                    ), r.innerHTML = '', r.appendChild(o);
                }
            }
    }
    function E() {
        for (
            var e = document.querySelectorAll(Ht + ' a.roll'),
                t = 0,
                n = e.length;
            n > t;
            t++
        ) {
            var r = e[t], o = r.querySelector('span');
            o && (r.classList.remove('roll'), r.innerHTML = o.innerHTML);
        }
    }
    function S(e) {
        var t = f(document.querySelectorAll(e ? e : 'a'));
        t.forEach(function(e) {
            /^(http|www)/gi.test(e.getAttribute('href')) &&
                e.addEventListener('click', Nt, !1);
        });
    }
    function k() {
        var e = f(document.querySelectorAll('a'));
        e.forEach(function(e) {
            /^(http|www)/gi.test(e.getAttribute('href')) &&
                e.removeEventListener('click', Nt, !1);
        });
    }
    function A(e) {
        x(), $t.preview = document.createElement(
            'div'
        ), $t.preview.classList.add(
            'preview-link-overlay'
        ), $t.wrapper.appendChild($t.preview), $t.preview.innerHTML = [
            '<header>',
            '<a class="close" href="#"><span class="icon"></span></a>',
            '<a class="external" href="' +
                e +
                '" target="_blank"><span class="icon"></span></a>',
            '</header>',
            '<div class="spinner"></div>',
            '<div class="viewport">',
            '<iframe src="' + e + '"></iframe>',
            '</div>'
        ].join(''), $t.preview.querySelector('iframe').addEventListener(
            'load',
            function() {
                $t.preview.classList.add('loaded');
            },
            !1
        ), $t.preview.querySelector('.close').addEventListener(
            'click',
            function(e) {
                x(), e.preventDefault();
            },
            !1
        ), $t.preview.querySelector('.external').addEventListener(
            'click',
            function() {
                x();
            },
            !1
        ), setTimeout(
            function() {
                $t.preview.classList.add('visible');
            },
            1
        );
    }
    function x() {
        $t.preview &&
            ($t.preview.setAttribute(
                'src',
                ''
            ), $t.preview.parentNode.removeChild(
                $t.preview
            ), $t.preview = null);
    }
    function q(e) {
        var t = f(e);
        return t.forEach(function(e, t) {
            e.hasAttribute('data-fragment-index') ||
                e.setAttribute('data-fragment-index', t);
        }), t.sort(function(e, t) {
            return e.getAttribute('data-fragment-index') -
                t.getAttribute('data-fragment-index');
        }), t;
    }
    function T() {
        if ($t.wrapper && !h()) {
            var e = $t.wrapper.offsetWidth, t = $t.wrapper.offsetHeight;
            e -= t * Wt.margin, t -= t * Wt.margin;
            var n = Wt.width, r = Wt.height, o = 20;
            M(Wt.width, Wt.height, o), 'string' == typeof n &&
                /%$/.test(n) &&
                (n = parseInt(n, 10) / 100 * e), 'string' == typeof r &&
                /%$/.test(r) &&
                (r = parseInt(r, 10) / 100 * t), $t.slides.style.width = n +
                'px', $t.slides.style.height = r + 'px', Kt = Math.min(
                e / n,
                t / r
            ), Kt = Math.max(Kt, Wt.minScale), Kt = Math.min(
                Kt,
                Wt.maxScale
            ), 'undefined' == typeof $t.slides.style.zoom ||
                navigator.userAgent.match(/(iphone|ipod|ipad|android)/gi)
                ? p(
                      $t.slides,
                      'translate(-50%, -50%) scale(' +
                          Kt +
                          ') translate(50%, 50%)'
                  )
                : $t.slides.style.zoom = Kt;
            for (
                var a = f(document.querySelectorAll(Ht)), i = 0, s = a.length;
                s > i;
                i++
            ) {
                var c = a[i];
                'none' !== c.style.display &&
                    (c.style.top = Wt.center
                        ? c.classList.contains('stack')
                              ? 0
                              : Math.max(-(m(c) / 2) - o, (-r) / 2) + 'px'
                        : '');
            }
            K();
        }
    }
    function M(e, t, n) {
        f($t.slides.querySelectorAll('section > .stretch')).forEach(function(
            r
        ) {
            var o = g(r, t - 2 * n);
            if (/(img|video)/gi.test(r.nodeName)) {
                var a = r.naturalWidth || r.videoWidth,
                    i = r.naturalHeight || r.videoHeight,
                    s = Math.min(e / a, o / i);
                r.style.width = a * s + 'px', r.style.height = i * s + 'px';
            } else
                r.style.width = e + 'px', r.style.height = o + 'px';
        });
    }
    function N(e, t) {
        'object' == typeof e &&
            'function' == typeof e.setAttribute &&
            e.setAttribute('data-previous-indexv', t || 0);
    }
    function D(e) {
        if (
            'object' == typeof e &&
                'function' == typeof e.setAttribute &&
                e.classList.contains('stack')
        ) {
            var t = e.hasAttribute('data-start-indexv')
                ? 'data-start-indexv'
                : 'data-previous-indexv';
            return parseInt(e.getAttribute(t) || 0, 10);
        }
        return 0;
    }
    function P() {
        if (Wt.overview) {
            at();
            var e = $t.wrapper.classList.contains('overview'),
                t = window.innerWidth < 400 ? 1e3 : 2500;
            $t.wrapper.classList.add('overview'), $t.wrapper.classList.remove(
                'exit-overview'
            ), clearTimeout(Qt), clearTimeout(Gt), Qt = setTimeout(
                function() {
                    for (
                        var n = document.querySelectorAll(Yt),
                            r = 0,
                            o = n.length;
                        o > r;
                        r++
                    ) {
                        var a = n[r], i = Wt.rtl ? -105 : 105;
                        if (
                            (a.setAttribute('data-index-h', r), p(
                                a,
                                'translateZ(-' +
                                    t +
                                    'px) translate(' +
                                    (r - Dt) * i +
                                    '%, 0%)'
                            ), a.classList.contains('stack'))
                        )
                            for (
                                var s = a.querySelectorAll('section'),
                                    c = 0,
                                    l = s.length;
                                l > c;
                                c++
                            ) {
                                var d = r === Dt ? Pt : D(a), u = s[c];
                                u.setAttribute(
                                    'data-index-h',
                                    r
                                ), u.setAttribute('data-index-v', c), p(
                                    u,
                                    'translate(0%, ' + 105 * (c - d) + '%)'
                                ), u.addEventListener('click', Mt, !0);
                            }
                        else
                            a.addEventListener('click', Mt, !0);
                    }
                    F(), T(), e ||
                        w('overviewshown', {
                            indexh: Dt,
                            indexv: Pt,
                            currentSlide: Rt
                        });
                },
                10
            );
        }
    }
    function C() {
        if (Wt.overview) {
            clearTimeout(Qt), clearTimeout(Gt), $t.wrapper.classList.remove(
                'overview'
            ), $t.wrapper.classList.add('exit-overview'), Gt = setTimeout(
                function() {
                    $t.wrapper.classList.remove('exit-overview');
                },
                10
            );
            for (
                var e = f(document.querySelectorAll(Ht)), t = 0, n = e.length;
                n > t;
                t++
            ) {
                var r = e[t];
                r.style.display = '', p(r, ''), r.removeEventListener(
                    'click',
                    Mt,
                    !0
                );
            }
            W(Dt, Pt), ot(), w('overviewhidden', {
                indexh: Dt,
                indexv: Pt,
                currentSlide: Rt
            });
        }
    }
    function R(e) {
        'boolean' == typeof e ? e ? P() : C() : I() ? C() : P();
    }
    function I() {
        return $t.wrapper.classList.contains('overview');
    }
    function j(e) {
        return e = e ? e : Rt, e &&
            e.parentNode &&
            !!e.parentNode.nodeName.match(/section/i);
    }
    function O() {
        var e = document.body,
            t = e.requestFullScreen ||
                e.webkitRequestFullscreen ||
                e.webkitRequestFullScreen ||
                e.mozRequestFullScreen ||
                e.msRequestFullScreen;
        t && t.apply(e);
    }
    function H() {
        var e = $t.wrapper.classList.contains('paused');
        at(), $t.wrapper.classList.add('paused'), e === !1 && w('paused');
    }
    function Y() {
        var e = $t.wrapper.classList.contains('paused');
        $t.wrapper.classList.remove('paused'), ot(), e && w('resumed');
    }
    function z() {
        X() ? Y() : H();
    }
    function X() {
        return $t.wrapper.classList.contains('paused');
    }
    function W(e, t, n, r) {
        Ct = Rt;
        var o = document.querySelectorAll(Yt);
        void 0 === t && (t = D(o[e])), Ct &&
            Ct.parentNode &&
            Ct.parentNode.classList.contains('stack') &&
            N(Ct.parentNode, Pt);
        var a = Ft.concat();
        Ft.length = 0;
        var i = Dt || 0, s = Pt || 0;
        Dt = _(Yt, void 0 === e ? Dt : e), Pt = _(
            zt,
            void 0 === t ? Pt : t
        ), F(), T();
        e:
        for (var c = 0, l = Ft.length; l > c; c++) {
            for (var d = 0; d < a.length; d++)
                if (a[d] === Ft[c]) {
                    a.splice(d, 1);
                    continue e;
                }
            document.documentElement.classList.add(Ft[c]), w(Ft[c]);
        }
        for (; a.length; )
            document.documentElement.classList.remove(a.pop());
        I() && P();
        var u = o[Dt], v = u.querySelectorAll('section');
        if ((Rt = v[Pt] || u, 'undefined' != typeof n)) {
            var p = q(Rt.querySelectorAll('.fragment'));
            f(p).forEach(function(e, t) {
                n > t
                    ? e.classList.add('visible')
                    : e.classList.remove('visible');
            });
        }
        var m = Dt !== i || Pt !== s;
        m
            ? w('slidechanged', {
                  indexh: Dt,
                  indexv: Pt,
                  previousSlide: Ct,
                  currentSlide: Rt,
                  origin: r
              })
            : Ct = null, Ct &&
            (Ct.classList.remove('present'), document
                .querySelector(Xt)
                .classList.contains('present') &&
                setTimeout(
                    function() {
                        var e, t = f(document.querySelectorAll(Yt + '.stack'));
                        for (e in t)
                            t[e] && N(t[e], 0);
                    },
                    0
                )), m && (G(Ct), Q(Rt)), $(), K(), V(), et();
    }
    function U() {
        d(), l(), T(), _t = Wt.autoSlide, ot(), s(), $(), K(), V();
    }
    function _(e, t) {
        var n = f(document.querySelectorAll(e)), r = n.length;
        if (r) {
            Wt.loop && (t %= r, 0 > t && (t = r + t)), t = Math.max(
                Math.min(t, r - 1),
                0
            );
            for (var o = 0; r > o; o++) {
                var a = n[o], i = Wt.rtl && !j(a);
                if (
                    (a.classList.remove('past'), a.classList.remove(
                        'present'
                    ), a.classList.remove('future'), a.setAttribute(
                        'hidden',
                        ''
                    ), t > o)
                )
                    a.classList.add(i ? 'future' : 'past');
                else if (o > t) {
                    a.classList.add(i ? 'past' : 'future');
                    for (
                        var s = f(a.querySelectorAll('.fragment.visible'));
                        s.length;
                        
                    )
                        s.pop().classList.remove('visible');
                }
                a.querySelector('section') && a.classList.add('stack');
            }
            n[t].classList.add('present'), n[t].removeAttribute('hidden');
            var c = n[t].getAttribute('data-state');
            c && (Ft = Ft.concat(c.split(' ')));
            var l = n[t].getAttribute('data-autoslide');
            _t = l ? parseInt(l, 10) : Wt.autoSlide, ot();
        } else
            t = 0;
        return t;
    }
    function F() {
        var e, t, n = f(document.querySelectorAll(Yt)), r = n.length;
        if (r) {
            var o = I() ? 10 : Wt.viewDistance;
            Ot && (o = I() ? 6 : 1);
            for (var a = 0; r > a; a++) {
                var i = n[a],
                    s = f(i.querySelectorAll('section')),
                    c = s.length;
                if (
                    (e = Math.abs((Dt - a) % (r - o)) ||
                        0, i.style.display = e > o ? 'none' : 'block', c)
                )
                    for (var l = D(i), d = 0; c > d; d++) {
                        var u = s[d];
                        t = Math.abs(
                            a === Dt ? Pt - d : d - l
                        ), u.style.display = e + t > o ? 'none' : 'block';
                    }
            }
        }
    }
    function K() {
        if (Wt.progress && $t.progress) {
            var e = f(document.querySelectorAll(Yt)),
                t = document.querySelectorAll(Ht + ':not(.stack)').length,
                n = 0;
            e:
            for (var r = 0; r < e.length; r++) {
                for (
                    var o = e[r], a = f(o.querySelectorAll('section')), i = 0;
                    i < a.length;
                    i++
                ) {
                    if (a[i].classList.contains('present')) break e;
                    n++;
                }
                if (o.classList.contains('present')) break;
                o.classList.contains('stack') === !1 && n++;
            }
            $t.progressbar.style.width = n / (t - 1) * window.innerWidth + 'px';
        }
    }
    function $() {
        if (Wt.controls && $t.controls) {
            var e = B(), t = Z();
            $t.controlsLeft
                .concat($t.controlsRight)
                .concat($t.controlsUp)
                .concat($t.controlsDown)
                .concat($t.controlsPrev)
                .concat($t.controlsNext)
                .forEach(function(e) {
                    e.classList.remove(
                        'enabled'
                    ), e.classList.remove('fragmented');
                }), e.left &&
                $t.controlsLeft.forEach(function(e) {
                    e.classList.add('enabled');
                }), e.right &&
                $t.controlsRight.forEach(function(e) {
                    e.classList.add('enabled');
                }), e.up &&
                $t.controlsUp.forEach(function(e) {
                    e.classList.add('enabled');
                }), e.down &&
                $t.controlsDown.forEach(function(e) {
                    e.classList.add('enabled');
                }), (e.left || e.up) &&
                $t.controlsPrev.forEach(function(e) {
                    e.classList.add('enabled');
                }), (e.right || e.down) &&
                $t.controlsNext.forEach(function(e) {
                    e.classList.add('enabled');
                }), Rt &&
                (t.prev &&
                    $t.controlsPrev.forEach(function(e) {
                        e.classList.add('fragmented', 'enabled');
                    }), t.next &&
                    $t.controlsNext.forEach(function(e) {
                        e.classList.add('fragmented', 'enabled');
                    }), j(Rt)
                    ? (t.prev &&
                          $t.controlsUp.forEach(function(e) {
                              e.classList.add('fragmented', 'enabled');
                          }), t.next &&
                          $t.controlsDown.forEach(function(e) {
                              e.classList.add('fragmented', 'enabled');
                          }))
                    : (t.prev &&
                          $t.controlsLeft.forEach(function(e) {
                              e.classList.add('fragmented', 'enabled');
                          }), t.next &&
                          $t.controlsRight.forEach(function(e) {
                              e.classList.add('fragmented', 'enabled');
                          })));
        }
    }
    function V() {
        f($t.background.childNodes).forEach(function(e, t) {
            var n = Wt.rtl ? 'future' : 'past', r = Wt.rtl ? 'past' : 'future';
            e.className = 'slide-background ' +
                (Dt > t ? n : t > Dt ? r : 'present'), f(
                e.childNodes
            ).forEach(function(e, t) {
                e.className = 'slide-background ' +
                    (Pt > t ? 'past' : t > Pt ? 'future' : 'present');
            });
        }), setTimeout(
            function() {
                $t.background.classList.remove('no-transition');
            },
            1
        );
    }
    function B() {
        var e = document.querySelectorAll(Yt),
            t = document.querySelectorAll(zt),
            n = {
                left: Dt > 0 || Wt.loop,
                right: Dt < e.length - 1 || Wt.loop,
                up: Pt > 0,
                down: Pt < t.length - 1
            };
        if (Wt.rtl) {
            var r = n.left;
            n.left = n.right, n.right = r;
        }
        return n;
    }
    function Z() {
        if (Rt && Wt.fragments) {
            var e = Rt.querySelectorAll('.fragment'),
                t = Rt.querySelectorAll('.fragment:not(.visible)');
            return { prev: e.length - t.length > 0, next: !!t.length };
        }
        return { prev: !1, next: !1 };
    }
    function Q(e) {
        e &&
            (f(e.querySelectorAll('video, audio')).forEach(function(e) {
                e.hasAttribute('data-autoplay') && e.play();
            }), f(
                e.querySelectorAll('iframe[src*="youtube.com/embed/"]')
            ).forEach(function(e) {
                e.hasAttribute('data-autoplay') &&
                    e.contentWindow.postMessage(
                        '{"event":"command","func":"playVideo","args":""}',
                        '*'
                    );
            }));
    }
    function G(e) {
        e &&
            (f(e.querySelectorAll('video, audio')).forEach(function(e) {
                e.hasAttribute('data-ignore') || e.pause();
            }), f(
                e.querySelectorAll('iframe[src*="youtube.com/embed/"]')
            ).forEach(function(e) {
                e.hasAttribute('data-ignore') ||
                    'function' != typeof e.contentWindow.postMessage ||
                    e.contentWindow.postMessage(
                        '{"event":"command","func":"pauseVideo","args":""}',
                        '*'
                    );
            }));
    }
    function J() {
        var e = window.location.hash,
            t = e.slice(2).split('/'),
            n = e.replace(/#|\//gi, '');
        if (isNaN(parseInt(t[0], 10)) && n.length) {
            var r = document.querySelector('#' + n);
            if (r) {
                var o = Reveal.getIndices(r);
                W(o.h, o.v);
            } else
                W(Dt || 0, Pt || 0);
        } else {
            var a = parseInt(t[0], 10) || 0, i = parseInt(t[1], 10) || 0;
            (a !== Dt || i !== Pt) && W(a, i);
        }
    }
    function et(e) {
        if (Wt.history)
            if ((clearTimeout(Zt), 'number' == typeof e))
                Zt = setTimeout(et, e);
            else {
                var t = '/';
                Rt && 'string' == typeof Rt.getAttribute('id')
                    ? t = '/' + Rt.getAttribute('id')
                    : ((Dt > 0 || Pt > 0) && (t += Dt), Pt > 0 &&
                          (t += '/' + Pt)), window.location.hash = t;
            }
    }
    function tt(e) {
        var t, n = Dt, r = Pt;
        if (e) {
            var o = j(e),
                a = o ? e.parentNode : e,
                i = f(document.querySelectorAll(Yt));
            n = Math.max(i.indexOf(a), 0), o &&
                (r = Math.max(
                    f(e.parentNode.querySelectorAll('section')).indexOf(e),
                    0
                ));
        }
        if (!e && Rt) {
            var s = Rt.querySelectorAll('.fragment').length > 0;
            if (s) {
                var c = Rt.querySelectorAll('.fragment.visible');
                t = c.length;
            }
        }
        return { h: n, v: r, f: t };
    }
    function nt() {
        if (Rt && Wt.fragments) {
            var e = q(Rt.querySelectorAll('.fragment:not(.visible)'));
            if (e.length) {
                var t = e[0].getAttribute('data-fragment-index');
                return e = Rt.querySelectorAll(
                    '.fragment[data-fragment-index="' + t + '"]'
                ), f(e).forEach(function(e) {
                    e.classList.add('visible');
                }), w('fragmentshown', {
                    fragment: e[0],
                    fragments: e
                }), $(), !0;
            }
        }
        return !1;
    }
    function rt() {
        if (Rt && Wt.fragments) {
            var e = q(Rt.querySelectorAll('.fragment.visible'));
            if (e.length) {
                var t = e[e.length - 1].getAttribute('data-fragment-index');
                return e = Rt.querySelectorAll(
                    '.fragment[data-fragment-index="' + t + '"]'
                ), f(e).forEach(function(e) {
                    e.classList.remove('visible');
                }), w('fragmenthidden', {
                    fragment: e[0],
                    fragments: e
                }), $(), !0;
            }
        }
        return !1;
    }
    function ot() {
        clearTimeout(Bt), !_t || X() || I() || (Bt = setTimeout(ut, _t));
    }
    function at() {
        clearTimeout(Bt);
    }
    function it() {
        Wt.rtl
            ? (I() || nt() === !1) && B().left && W(Dt + 1)
            : (I() || rt() === !1) && B().left && W(Dt - 1);
    }
    function st() {
        Wt.rtl
            ? (I() || rt() === !1) && B().right && W(Dt - 1)
            : (I() || nt() === !1) && B().right && W(Dt + 1);
    }
    function ct() {
        (I() || rt() === !1) && B().up && W(Dt, Pt - 1);
    }
    function lt() {
        (I() || nt() === !1) && B().down && W(Dt, Pt + 1);
    }
    function dt() {
        if (rt() === !1)
            if (B().up)
                ct();
            else {
                var e = document.querySelector(
                    Yt + '.past:nth-child(' + Dt + ')'
                );
                if (e) {
                    var t = e.querySelectorAll('section').length - 1 || void 0,
                        n = Dt - 1;
                    W(n, t);
                }
            }
    }
    function ut() {
        nt() === !1 && (B().down ? lt() : st()), ot();
    }
    function ft(e) {
        var t = (document.activeElement, !(!document.activeElement ||
            !document.activeElement.type &&
                !document.activeElement.href &&
                'inherit' === document.activeElement.contentEditable));
        if (
            !(t ||
                e.shiftKey && 32 !== e.keyCode ||
                e.altKey ||
                e.ctrlKey ||
                e.metaKey)
        ) {
            if (X() && -1 === [66, 190, 191].indexOf(e.keyCode)) return !1;
            var n = !1;
            if ('object' == typeof Wt.keyboard)
                for (var r in Wt.keyboard)
                    if (parseInt(r, 10) === e.keyCode) {
                        var o = Wt.keyboard[r];
                        'function' == typeof o
                            ? o.apply(null, [e])
                            : 'string' == typeof o &&
                                  'function' == typeof Reveal[o] &&
                                  Reveal[o].call(), n = !0;
                    }
            if (n === !1)
                switch ((n = !0, e.keyCode)) {
                    case 80:
                    case 33:
                        dt();
                        break;
                    case 78:
                    case 34:
                        ut();
                        break;
                    case 72:
                    case 37:
                        it();
                        break;
                    case 76:
                    case 39:
                        st();
                        break;
                    case 75:
                    case 38:
                        ct();
                        break;
                    case 74:
                    case 40:
                        lt();
                        break;
                    case 36:
                        W(0);
                        break;
                    case 35:
                        W(Number.MAX_VALUE);
                        break;
                    case 32:
                        I() ? C() : e.shiftKey ? dt() : ut();
                        break;
                    case 13:
                        I() ? C() : n = !1;
                        break;
                    case 66:
                    case 190:
                    case 191:
                        z();
                        break;
                    case 70:
                        O();
                        break;
                    default:
                        n = !1;
                }
            n
                ? e.preventDefault()
                : 27 !== e.keyCode && 79 !== e.keyCode ||
                      !It ||
                      (R(), e.preventDefault()), ot();
        }
    }
    function vt(e) {
        en.startX = e.touches[0].clientX, en.startY = e.touches[
            0
        ].clientY, en.startCount = e.touches.length, 2 === e.touches.length &&
            Wt.overview &&
            (en.startSpan = v(
                { x: e.touches[1].clientX, y: e.touches[1].clientY },
                { x: en.startX, y: en.startY }
            ));
    }
    function pt(e) {
        if (en.captured)
            navigator.userAgent.match(/android/gi) && e.preventDefault();
        else {
            var t = e.touches[0].clientX, n = e.touches[0].clientY;
            if (2 === e.touches.length && 2 === en.startCount && Wt.overview) {
                var r = v(
                    { x: e.touches[1].clientX, y: e.touches[1].clientY },
                    { x: en.startX, y: en.startY }
                );
                Math.abs(en.startSpan - r) > en.threshold &&
                    (en.captured = !0, r < en.startSpan
                        ? P()
                        : C()), e.preventDefault();
            } else if (1 === e.touches.length && 2 !== en.startCount) {
                var o = t - en.startX, a = n - en.startY;
                o > en.threshold && Math.abs(o) > Math.abs(a)
                    ? (en.captured = !0, it())
                    : o < -en.threshold && Math.abs(o) > Math.abs(a)
                          ? (en.captured = !0, st())
                          : a > en.threshold
                                ? (en.captured = !0, ct())
                                : a < -en.threshold &&
                                      (en.captured = !0, lt()), Wt.embedded
                    ? (en.captured || j(Rt)) && e.preventDefault()
                    : e.preventDefault();
            }
        }
    }
    function mt() {
        en.captured = !1;
    }
    function gt(e) {
        e.pointerType === e.MSPOINTER_TYPE_TOUCH &&
            (e.touches = [{ clientX: e.clientX, clientY: e.clientY }], vt(e));
    }
    function ht(e) {
        e.pointerType === e.MSPOINTER_TYPE_TOUCH &&
            (e.touches = [{ clientX: e.clientX, clientY: e.clientY }], pt(e));
    }
    function yt(e) {
        e.pointerType === e.MSPOINTER_TYPE_TOUCH &&
            (e.touches = [{ clientX: e.clientX, clientY: e.clientY }], mt(e));
    }
    function bt(e) {
        if (Date.now() - Vt > 600) {
            Vt = Date.now();
            var t = e.detail || -e.wheelDelta;
            t > 0 ? ut() : dt();
        }
    }
    function wt(e) {
        e.preventDefault();
        var t = f(document.querySelectorAll(Yt)).length,
            n = Math.floor(e.clientX / $t.wrapper.offsetWidth * t);
        W(n);
    }
    function Lt(e) {
        e.preventDefault(), it();
    }
    function Et(e) {
        e.preventDefault(), st();
    }
    function St(e) {
        e.preventDefault(), ct();
    }
    function kt(e) {
        e.preventDefault(), lt();
    }
    function At(e) {
        e.preventDefault(), dt();
    }
    function xt(e) {
        e.preventDefault(), ut();
    }
    function qt() {
        J();
    }
    function Tt() {
        T();
    }
    function Mt(e) {
        if (Jt && I()) {
            e.preventDefault();
            for (var t = e.target; t && !t.nodeName.match(/section/gi); )
                t = t.parentNode;
            if (
                t &&
                    !t.classList.contains('disabled') &&
                    (C(), t.nodeName.match(/section/gi))
            ) {
                var n = parseInt(t.getAttribute('data-index-h'), 10),
                    r = parseInt(t.getAttribute('data-index-v'), 10);
                W(n, r);
            }
        }
    }
    function Nt(e) {
        var t = e.target.getAttribute('href');
        t && (A(t), e.preventDefault());
    }
    var Dt,
        Pt,
        Ct,
        Rt,
        It,
        jt,
        Ot,
        Ht = '.reveal .slides section',
        Yt = '.reveal .slides>section',
        zt = '.reveal .slides>section.present>section',
        Xt = '.reveal .slides>section:first-child',
        Wt = {
            width: 960,
            height: 700,
            margin: 0.1,
            minScale: 0.2,
            maxScale: 1,
            controls: !0,
            progress: !0,
            history: !1,
            keyboard: !0,
            overview: !0,
            center: !0,
            touch: !0,
            loop: !1,
            rtl: !1,
            fragments: !0,
            embedded: !1,
            autoSlide: 0,
            mouseWheel: !1,
            rollingLinks: !1,
            previewLinks: !1,
            theme: null,
            transition: 'default',
            transitionSpeed: 'default',
            backgroundTransition: 'default',
            viewDistance: 3,
            dependencies: []
        },
        Ut = !1,
        _t = 0,
        Ft = [],
        Kt = 1,
        $t = {},
        Vt = 0,
        Bt = 0,
        Zt = 0,
        Qt = 0,
        Gt = 0,
        Jt = !1,
        en = {
            startX: 0,
            startY: 0,
            startSpan: 0,
            startCount: 0,
            captured: !1,
            threshold: 40
        };
    return {
        initialize: e,
        configure: c,
        sync: U,
        slide: W,
        left: it,
        right: st,
        up: ct,
        down: lt,
        prev: dt,
        next: ut,
        prevFragment: rt,
        nextFragment: nt,
        navigateTo: W,
        navigateLeft: it,
        navigateRight: st,
        navigateUp: ct,
        navigateDown: lt,
        navigatePrev: dt,
        navigateNext: ut,
        layout: T,
        availableRoutes: B,
        availableFragments: Z,
        toggleOverview: R,
        togglePause: z,
        isOverview: I,
        isPaused: X,
        addEventListeners: l,
        removeEventListeners: d,
        getIndices: tt,
        getSlide: function(e, t) {
            var n = document.querySelectorAll(Yt)[e],
                r = n && n.querySelectorAll('section');
            return 'undefined' != typeof t ? r ? r[t] : void 0 : n;
        },
        getPreviousSlide: function() {
            return Ct;
        },
        getCurrentSlide: function() {
            return Rt;
        },
        getScale: function() {
            return Kt;
        },
        getConfig: function() {
            return Wt;
        },
        getQueryHash: function() {
            var e = {};
            return location.search.replace(/[A-Z0-9]+?=(\w*)/gi, function(t) {
                e[t.split('=').shift()] = t.split('=').pop();
            }), e;
        },
        isFirstSlide: function() {
            return null == document.querySelector(Ht + '.past') ? !0 : !1;
        },
        isLastSlide: function() {
            return Rt
                ? Rt.nextElementSibling
                      ? !1
                      : j(Rt) && Rt.parentNode.nextElementSibling ? !1 : !0
                : !1;
        },
        isReady: function() {
            return Ut;
        },
        addEventListener: function(e, t, n) {
            'addEventListener' in window &&
                ($t.wrapper ||
                    document.querySelector('.reveal')).addEventListener(
                    e,
                    t,
                    n
                );
        },
        removeEventListener: function(e, t, n) {
            'addEventListener' in window &&
                ($t.wrapper ||
                    document.querySelector('.reveal')).removeEventListener(
                    e,
                    t,
                    n
                );
        }
    };
})();
!(function(e) {
    function t() {
        v ||
            (v = !0, c(m, function(e) {
                u(e);
            }));
    }
    function n(t, n) {
        var r = e.createElement('script');
        r.type = 'text/' + (t.type || 'javascript'), r.src = t.src ||
            t, r.async = !1, r.onreadystatechange = r.onload = function() {
            var e = r.readyState;
            !n.done && (!e || /loaded|complete/.test(e)) && (n.done = !0, n());
        }, (e.body || p).appendChild(r);
    }
    function r(e, t) {
        return e.state == A
            ? t && t()
            : e.state == k
                  ? L.ready(e.name, t)
                  : e.state == S
                        ? e.onpreload.push(function() {
                              r(e, t);
                          })
                        : (e.state = k, void n(e.url, function() {
                              e.state = A, t && t(), c(h[e.name], function(e) {
                                  u(e);
                              }), i() &&
                                  v &&
                                  c(h.ALL, function(e) {
                                      u(e);
                                  });
                          }));
    }
    function o(e) {
        void 0 === e.state &&
            (e.state = S, e.onpreload = [], n(
                { src: e.url, type: 'cache' },
                function() {
                    a(e);
                }
            ));
    }
    function a(e) {
        e.state = E, c(e.onpreload, function(e) {
            e.call();
        });
    }
    function i(e) {
        e = e || y;
        var t;
        for (var n in e) {
            if (e.hasOwnProperty(n) && e[n].state != A) return !1;
            t = !0;
        }
        return t;
    }
    function s(e) {
        return '[object Function]' == Object.prototype.toString.call(e);
    }
    function c(e, t) {
        if (e) {
            'object' == typeof e && (e = [].slice.call(e));
            for (var n = 0; n < e.length; n++)
                t.call(e, e[n], n);
        }
    }
    function l(e) {
        var t;
        if ('object' == typeof e)
            for (var n in e)
                e[n] && (t = { name: n, url: e[n] });
        else
            t = { name: d(e), url: e };
        var r = y[t.name];
        return r && r.url === t.url ? r : (y[t.name] = t, t);
    }
    function d(e) {
        var t = e.split('/'), n = t[t.length - 1], r = n.indexOf('?');
        return -1 != r ? n.substring(0, r) : n;
    }
    function u(e) {
        e._done || (e(), e._done = 1);
    }
    var f,
        v,
        p = e.documentElement,
        m = [],
        g = [],
        h = {},
        y = {},
        b = e.createElement('script').async === !0 ||
            'MozAppearance' in e.documentElement.style ||
            window.opera,
        w = window.head_conf && head_conf.head || 'head',
        L = window[w] = window[w] ||
            function() {
                L.ready.apply(null, arguments);
            },
        E = 1,
        S = 2,
        k = 3,
        A = 4;
    if (
        (L.js = b
            ? (function() {
                  var e = arguments, t = e[e.length - 1], n = {};
                  return s(t) || (t = null), c(e, function(o, a) {
                      o != t &&
                          (o = l(o), n[o.name] = o, r(
                              o,
                              t && a == e.length - 2
                                  ? (function() {
                                        i(n) && u(t);
                                    })
                                  : null
                          ));
                  }), L;
              })
            : (function() {
                  var e = arguments, t = [].slice.call(e, 1), n = t[0];
                  return f
                      ? (n
                            ? (c(t, function(e) {
                                  s(e) || o(l(e));
                              }), r(
                                  l(e[0]),
                                  s(n)
                                      ? n
                                      : (function() {
                                            L.js.apply(null, t);
                                        })
                              ))
                            : r(l(e[0])), L)
                      : (g.push(function() {
                            L.js.apply(null, e);
                        }), L);
              }), L.ready = function(t, n) {
            if (t == e) return v ? u(n) : m.push(n), L;
            if ((s(t) && (n = t, t = 'ALL'), 'string' != typeof t || !s(n)))
                return L;
            var r = y[t];
            if (r && r.state == A || 'ALL' == t && i() && v) return u(n), L;
            var o = h[t];
            return o ? o.push(n) : o = h[t] = [n], L;
        }, L.ready(e, function() {
            i() &&
                c(h.ALL, function(e) {
                    u(e);
                }), L.feature && L.feature('domloaded', !0);
        }), window.addEventListener)
    )
        e.addEventListener('DOMContentLoaded', t, !1), window.addEventListener(
            'load',
            t,
            !1
        );
    else if (window.attachEvent) {
        e.attachEvent('onreadystatechange', function() {
            'complete' === e.readyState && t();
        });
        var x = 1;
        try {
            x = window.frameElement;
        } catch (q) {
        }
        !x &&
            p.doScroll &&
            (function() {
                try {
                    p.doScroll('left'), t();
                } catch (e) {
                    return void setTimeout(arguments.callee, 1);
                }
            })(), window.attachEvent('onload', t);
    }
    !e.readyState &&
        e.addEventListener &&
        (e.readyState = 'loading', e.addEventListener(
            'DOMContentLoaded',
            handler = function() {
                e.removeEventListener(
                    'DOMContentLoaded',
                    handler,
                    !1
                ), e.readyState = 'complete';
            },
            !1
        )), setTimeout(
        function() {
            f = !0, c(g, function(e) {
                e();
            });
        },
        300
    );
})(document), Reveal.initialize({
    controls: !0,
    progress: !0,
    history: !0,
    slideNumber: !0,
    center: !0,
    transition: 'linear',
    transitionSpeed: 'default',
    dependencies: [
        {
            src: 'js/plugins/highlight.js',
            callback: function() {
                hljs.initHighlightingOnLoad();
            }
        },
        {
            src: 'js/plugins/zoom.js',
            condition: function() {
                return !!document.body.classList;
            }
        }
    ]
});
