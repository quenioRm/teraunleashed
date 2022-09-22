window._abyss = window._abyss || {}, window._abyss.join = function(e, y) {
    "use strict";

    function t() {
        return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || 1 < navigator.maxTouchPoints
    }

    function f() {
        var a = 30,
            t = null,
            s = y(".js-email input"),
            n = y(".js-authKey"),
            i = y(".js-emailAuth");
        n.slideDown(300, function() {
            y("#authKey").focus()
        }), i.addClass("wait"), t = setInterval(function e() {
            return --a < 0 && (i.removeClass("wait"), i.on("click", function() {
                var e = y(".js-email input"),
                    a = y(".js-modalDim"),
                    t = a.prev(".js-modalRecapcha");
                if (0 !== b(e.val())) return !1;
                1 == _abyss.getRecaptchaCheckData() && grecaptcha.reset(), a.fadeIn(300), t.addClass("active"), y("body").addClass("overflow_hidden")
            }), clearTimeout(t), !1 === n.hasClass("complete") && (k(s, !0), k(i, !0))), e
        }(), 1e3)
    }

    function _() {
        var s = !0,
            e = y('.box_agree input[type="checkbox"][required]');
        return y.each(e, function(e, a) {
            if (!y(a).is(":checked")) {
                var t = y(a).parents(".box_agree");
                if (s = !1, t.addClass("error"), 1 <= t.find(".js-policyCheck").length) return;
                C(t)
            }
        }), s
    }

    function o(t) {
        y(".js-serviceWrap").length <= 0 || "" != t && y.ajax({
            type: "post",
            url: "/Member/Join/GetPlayGameList",
            data: {
                _nationCode: t.toUpperCase()
            },
            success: function(e) {
                if (0 == e.length || "VN" === t.toUpperCase()) y(".js-serviceWrap").stop().slideUp();
                else {
                    y("#js-gameList").empty();
                    for (var a = 0; a < e.length; a++) y("#js-gameList").append('<li class="service_item bold">' + e[a] + "</li>");
                    y(".js-serviceWrap").stop().slideDown()
                }
            }
        })
    }

    function m() {
        var e, a = y(".js-submitActive").find('select, input[type="text"], input[type="number"], input[type="email"], input[type="password"]'),
            s = (y(".js-btnJoin"), !1);
        return a.each(function(e, a) {
            var t = y(a);
            1 != s && (!_abyss.isEmpty(t.val()) && "true" != t.attr("aria-invalid") || (s = !0))
        }), 0 == s && 0 < y('.box_agree input[type="checkbox"][required]').length && (e = y('.box_agree input[type="checkbox"][required]'), y.each(e, function(e, a) {
            if (0 == y(a).is(":checked")) return !(s = !0)
        })), "undefined" != typeof grecaptcha && grecaptcha.getResponse && 0 == grecaptcha.getResponse.length && (s = !0), 0 < y(".js-validMark").length && !y(".js-validMark").attr("data-valid") && (s = !0), !s
    }

    function r() {
        var e = y(".custom_inputBox input, .custom_select:not(.js-notErrorcustom) select");
        e.on("change", function(e) {
            e.stopPropagation();
            var a, t, s, n, i, o, r, l, c, u = y(this);
            u.removeClass("typing"), a = u, n = (new Date).getFullYear(), i = a.parents(".js-birthWrap"), o = i.find(".js-birthYear"), r = i.find(".js-birthMonth"), l = i.find(".js-birthDay"), c = parseInt(o.val()), i.length && !_abyss.isEmpty(o.val()) && (c = (c = n < c ? n : c) < 1900 ? 1900 : c, o.val(c), _abyss.isEmpty(r.val()) || _abyss.isEmpty(l.val()) || (s = (s = (t = new Date(o.val(), r.val(), 0).getDate()) < (s = parseInt(l.val())) ? t : s) < 1 ? 1 : s, l.val(s))), m()
        }), e.on("focusin", function(e) {
            var a = y(this).parents(".custom_input"),
                t = a.find(".input_validate"),
                s = t.find("span"),
                n = a.next(".bullet_list"),
                i = a.next(".balloon_box");
            t.addClass("focus"), n.stop().slideDown(300), i.addClass("on"), s.hasClass("field-validation-error") && s.addClass("visible")
        }), e.on("focusout", function(e) {
            var a = y(this),
                t = a.parents(".custom_input"),
                s = t.next(".balloon_box"),
                n = t.find(".input_validate"),
                i = n.find("span");
            s.removeClass("on"), a.removeClass("typing"), a.valid() || (!_abyss.isEmpty(a.val()) || a.valid() || i.hasClass("visible") ? a.valid() || n.stop().slideDown(300) : (n.stop().slideUp(0).stop().slideDown(300), i.addClass("visible")))
        }), e.on("keydown keypress keyup", function(e) {
            e.stopPropagation();
            var a = 300,
                t = y(this),
                s = t.parent().siblings(".input_validate"),
                n = s.find("span");
            if (t.valid()) return s.stop().slideUp(a), void n.removeClass("visible");
            if (!t.hasClass("typing")) {
                if (t.addClass("typing"), _abyss.isEmpty(t.val()) && !n.hasClass("visible")) return a = 0, void s.stop().slideUp(a);
                t.valid() || n.addClass("visible")
            }
        }), 0 < y('.box_agree input[type="checkbox"][required]').length && y('.box_agree input[type="checkbox"][required]').on("change", function() {
            m()
        }), m()
    }

    function l() {
        function e() {
            if (h.html('<span class="loading_mini_circle js-btnLoader"><span class="loading_mini_core"></span></span>'), d.removeClass("active"), u.fadeOut(500), y("body").removeClass("overflow_hidden"), "" !== (c = _abyss.getRecaptchaCheckString())) return v.html("<span>" + c + "</span>"), h.html(BDWeb.Resource.GetResourceValue("WEB_MEMBER_JOIN_INDEX_EMAILAUTH")), !1;
            var e, a, t, s, n, i, o, r, l;
            0 === (e = p.val(), a = y("#g-recaptcha-response").val(), t = y(".js-email input"), s = y(".js-emailAuth"), n = y(".js-authCheck"), i = y(".js-authKey input"), o = 0, r = y(".js-emailCheckResult"), l = y('input[name="_token"]'), y.ajax({
                type: "post",
                url: "/Member/Join/EmailAuth/",
                async: !0,
                data: {
                    _email: e,
                    "g-recaptcha-response": a,
                    _token: 0 < l.length ? l.val() : ""
                },
                beforeSend: function() {
                    s.html('<span class="loading_mini_circle js-btnLoader"><span class="loading_mini_core"></span></span>')
                },
                success: function(e) {
                    o = e.resultCode, k(i, !0), k(n, !0), i.val(""), 0 === e.resultCode ? (r.html(" "), k(s, !1), k(t, !1), s.html(BDWeb.Resource.GetResourceValue("WEB_MEMBER_JOIN_COMPLETE_MAIL_RESEND")), f()) : (r.html("<span>" + e.resultMsg.replace(/\\n/gi, "\n").replace(/ \\n/gi, "\n") + "</span>"), s.html(BDWeb.Resource.GetResourceValue("WEB_MEMBER_JOIN_INDEX_EMAILAUTH")))
                },
                error: function() {
                    return alert(BDWeb.Resource.GetResourceValue("WEB_MSG_COMMON_FAIL")), s.html(BDWeb.Resource.GetResourceValue("WEB_MEMBER_JOIN_INDEX_EMAILAUTH")), !1
                }
            }), o) || h.html(BDWeb.Resource.GetResourceValue("WEB_MEMBER_JOIN_INDEX_EMAILAUTH"))
        }
        var c, u = y(".js-modalDim"),
            d = u.prev(".js-modalRecapcha"),
            p = y(".js-email input"),
            h = y(".js-emailAuth"),
            v = y(".js-emailCheckResult");
        u.on("click", e), d.on("click", ".btn_close", e), d.on("click", function(e) {
            e.stopPropagation()
        })
    }

    function c() {
        y(".js-capslockWrap").each(function(e, a) {
            function t(e) {
                e.getModifierState && (e.getModifierState("CapsLock") ? (n.removeClass("hide"), s.addClass("capslock_on")) : (n.addClass("hide"), s.removeClass("capslock_on")))
            }
            var s = y(a),
                n = s.find(".js-btnCapslock"),
                i = s.find('input[type="password"]');
            i.length && (i[0].addEventListener("keydown", t), i[0].addEventListener("keyup", t), i[0].addEventListener("click", t), i[0].addEventListener("focus", t), i[0].addEventListener("blur", t)), i.on("focusout", function(e) {
                n.addClass("hide"), s.removeClass("capslock_on")
            }), n.on("mouseover", function(e) {
                y(this).siblings(".balloon_box").addClass("on")
            }), n.on("mouseleave", function(e) {
                y(this).siblings(".balloon_box").removeClass("on")
            })
        })
    }

    function u(n) {
        var e, a, t, s, i, o, r, l, c, u, d, p, h, v, f;
        n.length <= 0 || (e = /(?!(?=.*&#))(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[!@#$%^&*()_+=~-]))|((?=.*[0-9])(?=.*[!@#$%^&*()_+=~-]))|((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=~-]))|((?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=~-]))|((?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=~-]))|((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=~-])))(^[a-zA-Z0-9!@#$%^&*()_+=~-]{8,100}$)/, a = /(?!(?=.*&#))(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[!@#$%^&*()_+=~-]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[!@#$%^&*()_+=~-]))|((?=.*[0-9])(?=.*[!@#$%^&*()_+=~-])))(^[a-zA-Z0-9!@#$%^&*()_+=~-]{8,100}$)/, t = /(?!(?=.*&#))(((?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=~-]))|((?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=~-]))|((?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=~-]))|((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(^[a-zA-Z0-9!@#$%^&*()_+=~-]{8,100}$)/, s = /(?!(?=.*&#))(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=~-])))(^[a-zA-Z0-9!@#$%^&*()_+=~-]{8,100}$)/, i = y(".js-email input"), o = y(".js-emailAuth"), r = y(".js-authKey"), l = y(".js-authKey input"), c = y(".js-authCheck"), u = y(".js-validMarkWrap"), d = y(".js-validMark"), p = y(".js-password input"), h = y(".js-passwordCheck"), v = y(".js-btnJoin"), f = y(".js-passShow"), _abyss.inputMask(y(".js-inputMask"), {
            yearrange: {
                minyear: "1900",
                maxyear: (new Date).getFullYear() + 10
            },
            alias: !_abyss.isEmpty(y("#birthFormat")) && y("#birthFormat").val().toLowerCase(),
            showMaskOnHover: !1,
            clearMaskOnLostFocus: !1
        }), f.attr("title", BDWeb.Resource.GetResourceValue("WEB_MEMBER_JOIN_INDEX_INPUT_PASSWORD_SHOW")), f.on("click", function() {
            var e = y(this),
                a = e.siblings("input");
            "password" === a.attr("type") ? (e.parent().addClass("open"), a.attr("type", "text"), e.attr("title", BDWeb.Resource.GetResourceValue("WEB_MEMBER_JOIN_INDEX_INPUT_PASSWORD_HIDE"))) : (e.parent().removeClass("open"), a.attr("type", "password"), e.attr("title", BDWeb.Resource.GetResourceValue("WEB_MEMBER_JOIN_INDEX_INPUT_PASSWORD_SHOW")))
        }), o.on("click", function() {
            var e = y(".js-modalDim"),
                a = e.prev(".js-modalRecapcha");
            if (0 != b(i.val())) return !1;
            1 == _abyss.getRecaptchaCheckData() && grecaptcha.reset(), e.fadeIn(300), a.addClass("active"), y("body").addClass("overflow_hidden")
        }), i.on("keyup change paste input propertychange", function(e) {
            k(l), k(c), l.val(""), l.removeClass("active"), 9 !== e.keyCode && (!0 === y(this).valid() ? k(o, !0) : k(o)), 13 === e.keyCode && "disabled" !== o.attr("disabled") && o.trigger("click")
        }), r.find("input").on("keypress keyup", function() {
            var e = y(this);
            6 < e.val().length && e.val(e.val().slice(0, 6))
        }), r.find("input").on("keydown", function(e) {
            13 === e.keyCode && c.trigger("click")
        }), c.on("click", function() {
            var e, a, t;
            0 === (e = i.val(), a = r.find("input").val(), t = 0, y.ajax({
                type: "post",
                url: "/Member/Join/joinMailAuth",
                async: !1,
                data: {
                    _email: e,
                    _authKey: a
                },
                success: function(e) {
                    alert(e.resultMsg.replace(/\\n/gi, "\n").replace(/ \\n/gi, "\n")), t = e.resultCode
                },
                error: function() {
                    return alert(BDWeb.Resource.GetResourceValue("WEB_MSG_COMMON_FAIL")), !1
                }
            }), t) ? (k(i), k(c), k(o), k(u), setTimeout(function() {
                p.focus().select()
            }, 500), u.addClass("on"), d.attr("data-valid", "true"), m(), r.addClass("complete"), o.addClass("hide")) : r.find("input").focus()
        }), p.parent(".custom_inputBox").append('<span class="js-securityStep"></span>'), p.on("keyup", function() {
            0 == y(this).hasClass("input-validation-error") && 1 == e.test(y(this).val()) ? h.addClass("on") : (h.removeClass("on"), h.find("input").val("")), 1 == s.test(y(this).val()) ? g("safe") : 1 == t.test(y(this).val()) ? g("medium") : 1 == a.test(y(this).val()) ? g("weak") : g()
        }), v.on("click", function() {
            n.submit()
        }), y(".box_agree").find("input[type=checkbox]").on("keyup", function(e) {
            13 === e.keyCode && y(this).trigger("click")
        }), y('.box_agree input[type="checkbox"][required]').on("change", function(e) {
            var a = y(this).parents(".box_agree");
            if (y(this).is(":checked")) {
                if (!a.hasClass("error")) return;
                a.removeClass("error"), a.find(".js-policyCheck").stop().slideUp(200)
            } else y(this).is(":checked") || (a.addClass("error"), C(a))
        }), n.on("submit", function() {
            if (0 == _()) return !1;
            if (!1 === y(this).valid()) return !1;
            if (location.href.toLowerCase().indexOf("transfer") < 0 && "VN" === y(".js-nationSelect").val()) return !1;
            if (0 < o.length && !1 === r.hasClass("complete")) return alert(BDWeb.Resource.GetResourceValue("WEB_MEMBER_LOGIN_CHECK_AUTH_MAIL")), o.focus(), !1;
            if (k(v), k(o, !1), k(i, !0, "readonly"), k(r, !0), n.attr("id").indexOf("Oauth") <= 0) return !0;
            var e = window.screen.width / 2 - 225,
                a = window.screen.height / 2 - 300;
            k(v, !0), null != s && s.close();
            var t = encodeURIComponent("/Member/Join/OauthJoin?" + n.serialize()),
                s = window.open("/Member/OAuth/" + joinType + "?returnUrl=" + t, "", "width=450px,height=600px,top=" + a + ",left=" + e);
            return window.focus && s.focus(), !1
        }), _abyss.initSelect2())
    }
    var b = function(e) {
            var a = 0,
                t = y(".js-emailCheckResult");
            return y.ajax({
                type: "post",
                url: "/Member/Join/isBlockEmailDomain/",
                async: !1,
                data: {
                    _email: e
                },
                success: function(e) {
                    0 !== (a = e.resultCode) && t.html("<span>" + e.resultMsg.replace(/\\n/gi, "\n").replace(/ \\n/gi, "\n") + "</span>")
                },
                error: function() {
                    return alert(BDWeb.Resource.GetResourceValue("WEB_MSG_COMMON_FAIL")), !1
                }
            }), a
        },
        C = function(e) {
            var a = e,
                t = '<div class="input_validate error js-policyCheck"><span class="field-validation-error"><span>' + BDWeb.Resource.GetResourceValue("WEB_MSG_MEMBER_JOIN_INDEX_POLICY_CHECK") + "</span></span>";
            a.find(".js-policyCheck").length < 1 && a.append(t), a.find(".js-policyCheck").stop().slideDown(200)
        },
        a = function() {
            function n() {
                var s = !1;
                a.each(function(e, a) {
                    var t = y(a);
                    _abyss.isEmpty(t.val()) && (s = !0)
                }), s ? (e.addClass("disabled"), e.attr("disabled", "disabled")) : (e.removeClass("disabled"), e.removeAttr("disabled"))
            }
            var s, e = y("#btnKeyCheck"),
                a = y(".js-keyInputBox .js-inputKey");
            a.on("keydown", function(e) {
                var a = y(this),
                    t = a.prev(".js-inputKey");
                s = a.val(), 13 == e.keyCode && y("#btnKeyCheck").trigger("click"), _abyss.isEmpty(s) && 8 == e.keyCode && (t.val(""), t.select())
            }), a.on("keyup", function(e) {
                var a = y(this),
                    t = a.next(".js-inputKey"),
                    s = a.prev(".js-inputKey");
                39 == e.keyCode && t.select(), 37 == e.keyCode && s.select(), 46 == e.keyCode && t.select(), n()
            }), a.on("input", function(e) {
                var a = y(this),
                    t = a.next(".js-inputKey");
                s = a.val(), _abyss.isEmpty(s) || 8 === e.keyCode || t.select(), this.value.length > this.maxLength && (this.value = this.value.slice(0, this.maxLength))
            }), a.on("click", function(e) {
                y(e.target).select()
            });
            var i = {};
            i.key1 = y("#authKey1"), i.key2 = y("#authKey2"), i.key3 = y("#authKey3"), i.key4 = y("#authKey4"), i.key5 = y("#authKey5"), i.key6 = y("#authKey6"), i.key7 = y("#authKey7"), i.key8 = y("#authKey8"), i.key1.focus(), i.key1.on("paste", function(e) {
                var a, t = (e.clipboardData || e.originalEvent.clipboardData || window.clipboardData).getData("text"),
                    s = 6;
                1 < t.length && (a = t.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@@\#$%&\\\=\(\'\"]/gi, "").replace(/ /gi, ""), i.key1.val(a.substr(0, 1)), i.key2.val(0 < a.substr(1, 1).length ? a.substr(1, 1) : i.key2.val()), i.key3.val(0 < a.substr(2, 1).length ? a.substr(2, 1) : i.key3.val()), i.key4.val(0 < a.substr(3, 1).length ? a.substr(3, 1) : i.key4.val()), i.key5.val(0 < a.substr(4, 1).length ? a.substr(4, 1) : i.key5.val()), i.key6.val(0 < a.substr(5, 1).length ? a.substr(5, 1) : i.key6.val()), i.key7.length && (i.key7.val(0 < a.substr(6, 1).length ? a.substr(6, 1) : i.key7.val()), s++), i.key8.length && (i.key8.val(0 < a.substr(7, 1).length ? a.substr(7, 1) : i.key8.val()), s++), s <= t.length ? y("#btnKeyCheck").focus() : i["key" + t.length].focus(), n())
            })
        },
        k = function(e, a, t) {
            if (_abyss.isEmpty(e)) return !1;
            a ? (e.removeClass("disabled"), e.prop("disabled", !1)) : (e.addClass("disabled"), e.attr("disabled", "disabled")), "readonly" === t && (e.addClass("disabled"), e.attr("readonly", !0))
        },
        g = function(e) {
            BDWeb.Resource.GetResourceValue("WEB_MYPAGE_PASSWORD_INDEX_CURRENT_PASSWORD");
            var a = y(".js-securityStep");
            "safe" == e ? (a.removeClass("medium weak"), a.addClass("safe"), a.html(BDWeb.Resource.GetResourceValue("WEB_ACCOUNT_PASSWORD_CHECK_SAFE"))) : "medium" == e ? (a.removeClass("safe weak"), a.addClass("medium"), a.html(BDWeb.Resource.GetResourceValue("WEB_ACCOUNT_PASSWORD_CHECK_MEDIUM"))) : "weak" == e ? (a.removeClass("safe medium"), a.addClass("weak"), a.html(BDWeb.Resource.GetResourceValue("WEB_ACCOUNT_PASSWORD_CHECK_WEAK"))) : (a.removeClass("safe medium weak"), a.html(""))
        };
    return e.joinInit = function() {
        var e, a, t, s = y("#birthFormat").val(),
            n = y("#nationCode").val().toLowerCase(),
            i = y(".js-questionToolTip");
        u(y("#frmJoin")), u(y("#frmJoinOauth")), u(y("#frmTransferJoin")), u(y("#frmAddInformation")), e = y(".box_policy"), a = y(e).find(".MsoNormal"), null != (t = a.attr("style")) && a.attr("style", t.replace("word-break: keep-all;", "")), c(), o(n), y(".js-nationSelect").on("change", function() {
            n = y("#nationCode").val().toLowerCase();
            var e, a, t = y(".js-country").data("nation").toLowerCase();
            o(n), t !== n && alert(BDWeb.Resource.GetResourceValue("WEB_MSG_MEMBER_JOIN_INDEX_NATION_CONFIRM")), location.href.toLowerCase().indexOf("transfer") < 0 && (e = y(this), a = y(this).parent(".custom_select"), "VN" === e.val() ? (a.addClass("error"), y("#error_no_country").slideDown(300)) : (a.removeClass("error"), y("#error_no_country").slideUp(300)))
        }), y(".js-inputMask").on("keydown", function(e) {
            9 === e.keyCode && 0 == e.shiftKey && "readonly" != y(".js-nationSelect").attr("readonly") && y(".js-country .js-nationSelect").select2("open")
        });
        y(document).on("change", 'input:not([type="hidden"])', function(e) {
            e.stopPropagation()
        }), r(), y("#birth").on("focus", function() {
            y("#birth").attr("placeholder", s)
        }), y("#birth").on("focusout", function() {
            n = y("#nationCode").val().toLowerCase(), y("#birth").removeAttr("placeholder")
        }), i.on("mouseenter focusin click", function() {
            y(this).find(".balloon_box").addClass("on")
        }), i.on("mouseleave focusout blur", function() {
            y(this).find(".balloon_box").removeClass("on")
        }), l()
    }, e.joinInitOauthChange = function() {
        y(document).on("change", 'input:not([type="hidden"])', function(e) {
            e.stopPropagation()
        }), r(), u(y("#frmJoin")), c(), l()
    }, e.joinBeforeAuthInit = function() {
        var s = !1;
        y(".js-keyInputBox .js-inputKey").each(function(e, a) {
            var t = y(a);
            _abyss.isEmpty(t.val()) && (s = !0)
        }), s ? y("#btnKeyCheck").addClass("disabled") : y("#btnKeyCheck").removeClass("disabled"), y("#btnMailSend").on("click", function() {
            var e = y("#frmAuthMailSend");
            if ("disabled" == y("#btnMailSend").attr("disabled")) return !1;
            y("#btnMailSend").attr("disabled", "disabled"), y.ajax({
                type: "post",
                url: "/Member/Join/AuthMailSend/",
                data: e.serialize(),
                complete: function() {
                    y("#btnMailSend").removeAttr("disabled")
                },
                success: function(e) {
                    alert(e.message)
                },
                error: function() {
                    return alert(BDWeb.Resource.GetResourceValue("WEB_MSG_COMMON_FAIL")), !1
                }
            })
        }), y("#btnAuthDelete").on("click", function() {
            confirm(BDWeb.Resource.GetResourceValue("WEB_MEMBER_JOIN_COMPLETE_AUTHDELETE_CONFIRM")) && y.ajax({
                type: "post",
                url: "/Member/OauthChange/DeleteProcess",
                data: y("#frmAuthMailSend").serialize(),
                success: function(e) {
                    alert(e.message), window.location.href = e.okUrl
                },
                error: function() {
                    return alert(BDWeb.Resource.GetResourceValue("WEB_MSG_COMMON_FAIL")), !1
                }
            })
        }), y("#btnKeyCheck").on("click", function() {
            if (y(this).hasClass("disabled")) return !1;
            var e = y("#authKey1").val() + y("#authKey2").val() + y("#authKey3").val() + y("#authKey4").val() + y("#authKey5").val() + y("#authKey6").val();
            if (e.length < 6) return !1;
            y("#hdToken").val(e), y("#frmAuthMailCheck").submit()
        })
    }, e.joinBeforePolicyInit = function() {
        y("#btnPolicyAgree").on("click", function() {
            return !!_() && void y("#frmJoinBeforePolicy").submit()
        })
    }, e.JoinAuthCompleteInit = function() {
        var a = 3,
            t = null,
            s = document.getElementById("js-btnDone"),
            t = setInterval(function e() {
                return y(".js-timer").text(a), --a < 0 && (clearTimeout(t), s && s.click()), e
            }(), 1e3)
    }, e.joinSkinFloating = function() {
        var e, a;
        t() && y(".skin_type").addClass("isMobile"), e = y(".js-skinMovieModal").find("iframe"), a = e.attr("data-src"), y(".js-skinModalOpen").on("click", function() {
                0 == t() ? (y(".js-skinMovieModal").addClass("on"), e.attr("src", a)) : window.open(a)
            }), y(".js-skinModalClose").on("click", function() {
                y(".js-skinMovieModal").removeClass("on"), e.attr("src", "")
            }), y(".js-joinOpen").on("click", function() {
                y(".container_wrap").removeClass("close"), y(".container_wrap").addClass("on"), y(".custom_inputBox").first().find("input").focus()
            }), y(".js-joinClose").on("click", function() {
                y(".container_wrap").removeClass("on"), y(".auth_complete_skin").removeClass("opener"), y(".container_wrap").addClass("close")
            }),
            function() {
                var e = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent),
                    a = document.getElementById("videoTag"),
                    t = document.querySelector(".video_wrap");
                if ("" === a || null === a) return;
                a.addEventListener("loadeddata", function() {}), e ? (a.pause(), a.remove(), t.remove()) : a.paused && a.play(), a.classList.add("on"), window.addEventListener("mousemove", function() {
                    a.paused && a.play()
                })
            }()
    }, a(), e
}(window._abyss.join || {}, jQuery);