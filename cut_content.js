
function SAP() {
    var _ = {};
    _.pr = String.prototype.trim ? function(a) { return a.trim() } : function(a) { return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1] };

    var jNb = function(a) {
        if (!a)
            return "";
        if (/^about:(?:blank|srcdoc)$/.test(a))
            return window.origin || "";
        a.indexOf("blob:") === 0 && (a = a.substring(5));
        a = a.split("#")[0].split("?")[0];
        a = a.toLowerCase();
        a.indexOf("//") == 0 && (a = window.location.protocol + a);
        /^[\w\-]*:\/\//.test(a) || (a = window.location.href);
        var b = a.substring(a.indexOf("://") + 3),
            c = b.indexOf("/");
        c != -1 && (b = b.substring(0, c));
        c = a.substring(0, a.indexOf("://"));
        if (!c)
            throw Error("wa`" + a);
        if (c !== "http" && c !== "https" && c !== "chrome-extension" && c !== "moz-extension" && c !== "file" && c !== "android-app" && c !== "chrome-search" && c !== "chrome-untrusted" && c !== "chrome" && c !== "app" && c !== "devtools")
            throw Error("xa`" + c);
        a = "";
        var f = b.indexOf(":");
        if (f != -1) {
            var h = b.substring(f + 1);
            b = b.substring(0, f);
            if (c === "http" && h !== "80" || c === "https" && h !== "443")
                a = ":" + h
        }
        return c + "://" + b + a
    };
    var lNb = function(a, b, c, f, h) {
            return a && b && c ? [c, kNb(jNb(a), b, f || null, h || [])].join(" ") : null
        },
        kNb = function(a, b, c, f) {
            var h = [];
            if ((Array.isArray(c) ? 2 : 1) == 1)
                return h = [b, a],
                    _.ee(f, function(n) {
                        h.push(n)
                    }),
                    mNb(h.join(" "));
            var k = [],
                l = [];
            _.ee(c, function(n) {
                l.push(n.key);
                k.push(n.value)
            });
            c = Math.floor((new Date).getTime() / 1E3);
            h = k.length == 0 ? [c, b, a] : [k.join(":"), c, b, a];
            _.ee(f, function(n) {
                h.push(n)
            });
            a = mNb(h.join(" "));
            a = [c, a];
            l.length == 0 || a.push(l.join(""));
            return a.join("_")
        },
        mNb = function(a) {
            var b = Bga();
            b.update(a);
            return b.digestString().toLowerCase()
        };
    var nNb = function(a) {
            this.document_ = a || {
                cookie: ""
            }
        },
        oNb;

    _.ee = Array.prototype.forEach ? function(a, b, c) {
            Array.prototype.forEach.call(a, b, c)
        } :
        function(a, b, c) {
            for (var f = a.length, h = typeof a === "string" ? a.split("") : a, k = 0; k < f; k++)
                k in h && b.call(c, h[k], k, a)
        };

    Bga = function() {
        function a() {
            h[0] = 1732584193;
            h[1] = 4023233417;
            h[2] = 2562383102;
            h[3] = 271733878;
            h[4] = 3285377520;
            t = r = 0
        }

        function b(v) {
            for (var z = l, B = 0; B < 64; B += 4)
                z[B / 4] = v[B] << 24 | v[B + 1] << 16 | v[B + 2] << 8 | v[B + 3];
            for (B = 16; B < 80; B++)
                v = z[B - 3] ^ z[B - 8] ^ z[B - 14] ^ z[B - 16],
                z[B] = (v << 1 | v >>> 31) & 4294967295;
            v = h[0];
            var D = h[1],
                H = h[2],
                Q = h[3],
                Y = h[4];
            for (B = 0; B < 80; B++) {
                if (B < 40)
                    if (B < 20) {
                        var fa = Q ^ D & (H ^ Q);
                        var xa = 1518500249
                    } else
                        fa = D ^ H ^ Q,
                        xa = 1859775393;
                else
                    B < 60 ? (fa = D & H | Q & (D | H),
                        xa = 2400959708) : (fa = D ^ H ^ Q,
                        xa = 3395469782);
                fa = ((v << 5 | v >>> 27) & 4294967295) + fa + Y + xa + z[B] & 4294967295;
                Y = Q;
                Q = H;
                H = (D << 30 | D >>> 2) & 4294967295;
                D = v;
                v = fa
            }
            h[0] = h[0] + v & 4294967295;
            h[1] = h[1] + D & 4294967295;
            h[2] = h[2] + H & 4294967295;
            h[3] = h[3] + Q & 4294967295;
            h[4] = h[4] + Y & 4294967295
        }

        function c(v, z) {
            if (typeof v === "string") {
                v = unescape(encodeURIComponent(v));
                for (var B = [], D = 0, H = v.length; D < H; ++D)
                    B.push(v.charCodeAt(D));
                v = B
            }
            z || (z = v.length);
            B = 0;
            if (r == 0)
                for (; B + 64 < z;)
                    b(v.slice(B, B + 64)),
                    B += 64,
                    t += 64;
            for (; B < z;)
                if (k[r++] = v[B++],
                    t++,
                    r == 64)
                    for (r = 0,
                        b(k); B + 64 < z;)
                        b(v.slice(B, B + 64)),
                        B += 64,
                        t += 64
        }

        function f() {
            var v = [],
                z = t * 8;
            r < 56 ? c(n, 56 - r) : c(n, 64 - (r - 56));
            for (var B = 63; B >= 56; B--)
                k[B] = z & 255,
                z >>>= 8;
            b(k);
            for (B = z = 0; B < 5; B++)
                for (var D = 24; D >= 0; D -= 8)
                    v[z++] = h[B] >> D & 255;
            return v
        }
        for (var h = [], k = [], l = [], n = [128], q = 1; q < 64; ++q)
            n[q] = 0;
        var r, t;
        a();
        return {
            reset: a,
            update: c,
            digest: f,
            digestString: function() {
                for (var v = f(), z = "", B = 0; B < v.length; B++)
                    z += "0123456789ABCDEF".charAt(Math.floor(v[B] / 16)) + "0123456789ABCDEF".charAt(v[B] % 16);
                return z
            }
        }
    };


    function getCookieValue(cookieName) {
        // Lấy danh sách cookie và tách chúng ra từng cặp tên-giá trị
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            // Loại bỏ khoảng trắng thừa trước tên cookie
            cookie = cookie.trim();

            // Kiểm tra nếu cookie bắt đầu bằng tên cookie cần tìm
            if (cookie.startsWith(cookieName + '=')) {
                // Trả về phần giá trị sau dấu '='
                return cookie.substring(cookieName.length + 1);
            }
        }

        // Trả về null nếu không tìm thấy cookie
        return null;
    }



    // Gọi hàm để lấy giá trị của SAPISID
    const sapisidValue = getCookieValue('SAPISID');
    f = sapisidValue;
    c = [];
    (f = f ? lNb(String(document.location.href), f, true ? "SAPISIDHASH" : "APISIDHASH", [{ "key": "u", "value": ytcfg.data_.USER_SESSION_ID }]) : null) && c.push(f);
    return f;
}
var x_goog_pageid = "";
var authorization_pre = "";
var channel_id = "";
var client_name = 0;
var client_version = "";
var client_gl = "";
var client_hl = "";
var client_serializedDelegationContext = "";
var client_visibale_data = "";


authorization_pre = SAP();
x_goog_pageid = ytcfg.data_.DELEGATED_SESSION_ID;
channel_id = ytcfg.data_.CHANNEL_ID;
client_name = ytcfg.data_.INNERTUBE_CONTEXT_CLIENT_NAME;
client_version = ytcfg.data_.INNERTUBE_CONTEXT_CLIENT_VERSION;
client_gl = ytcfg.data_.INNERTUBE_CONTEXT_GL;
client_hl = ytcfg.data_.INNERTUBE_CONTEXT_HL;
client_serializedDelegationContext = ytcfg.data_.INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT;
client_visibale_data = ytcfg.data_.VISITOR_DATA;

function secondsToMilliseconds(seconds) {
    return seconds * 1000;
}

// Thực hiện lấy toàn bộ danh sách video hiện có:

fetch("https://studio.youtube.com/youtubei/v1/creator/list_creator_videos?alt=json", {
        "headers": {
            "accept": "*/*",
            "accept-language": "vi,vi-VN;q=0.9,en-US;q=0.8,en;q=0.7",
            "authorization": authorization_pre,
            "content-type": "application/json",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
            "sec-ch-ua-arch": "\"x86\"",
            "sec-ch-ua-bitness": "\"64\"",
            "sec-ch-ua-form-factors": "",
            "sec-ch-ua-full-version": "\"129.0.6668.101\"",
            "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"129.0.6668.101\", \"Not=A?Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"129.0.6668.101\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": "\"\"",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-ch-ua-platform-version": "\"15.0.0\"",
            "sec-ch-ua-wow64": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-goog-authuser": "0",
            "x-goog-pageid": x_goog_pageid,
            "x-origin": "https://studio.youtube.com"
        },
        "referrer": "https://studio.youtube.com/channel/" + channel_id + "/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"filter\":{\"and\":{\"operands\":[{\"channelIdIs\":{\"value\":\"" + channel_id + "\"}},{\"and\":{\"operands\":[{\"videoOriginIs\":{\"value\":\"VIDEO_ORIGIN_UPLOAD\"}},{\"not\":{\"operand\":{\"contentTypeIs\":{\"value\":\"CREATOR_CONTENT_TYPE_SHORTS\"}}}}]}},{\"not\":{\"operand\":{\"tvfilmTypeIs\":{\"value\":\"VIDEO_TVFILM_TYPE_MOVIE\"}}}},{\"not\":{\"operand\":{\"tvfilmTypeIs\":{\"value\":\"VIDEO_TVFILM_TYPE_EPISODE\"}}}},{\"not\":{\"operand\":{\"tvfilmTypeIs\":{\"value\":\"VIDEO_TVFILM_TYPE_EVENT\"}}}}]}},\"order\":\"VIDEO_ORDER_DISPLAY_TIME_DESC\",\"pageSize\":1000,\"pageToken\":\"\",\"mask\":{\"channelId\":true,\"videoId\":true,\"lengthSeconds\":true,\"livestream\":{\"all\":true},\"publicLivestream\":{\"all\":true},\"origin\":true,\"premiere\":{\"all\":true},\"publicPremiere\":{\"all\":true},\"status\":true,\"thumbnailDetails\":{\"all\":true},\"title\":true,\"draftStatus\":true,\"downloadUrl\":true,\"watchUrl\":true,\"shareUrl\":true,\"permissions\":{\"all\":true},\"features\":{\"all\":true},\"timeCreatedSeconds\":true,\"timePublishedSeconds\":true,\"privacy\":true,\"contentOwnershipModelSettings\":{\"all\":true},\"contentType\":true,\"publicShorts\":{\"all\":true},\"podcastRssMetadata\":{\"all\":true},\"videoLinkageShortsAttribution\":{\"all\":true},\"alteredContentSettings\":{\"all\":true},\"tvfilmMetadata\":{\"all\":true},\"responseStatus\":{\"all\":true},\"statusDetails\":{\"all\":true},\"description\":true,\"titleFormattedString\":{\"all\":true},\"descriptionFormattedString\":{\"all\":true},\"descriptionDetails\":{\"all\":true},\"titleDetails\":{\"all\":true},\"metrics\":{\"all\":true},\"audienceRestriction\":{\"all\":true},\"releaseInfo\":{\"all\":true},\"allRestrictions\":{\"all\":true},\"inlineEditProcessingStatus\":true,\"videoPrechecks\":{\"all\":true},\"shorts\":{\"all\":true},\"selfCertification\":{\"all\":true},\"videoStreamUrl\":true,\"thumbnailEditorState\":{\"all\":true},\"videoResolutions\":{\"all\":true},\"scheduledPublishingDetails\":{\"all\":true},\"visibility\":{\"all\":true},\"privateShare\":{\"all\":true},\"sponsorsOnly\":{\"all\":true},\"unlistedExpired\":true,\"videoTrailers\":{\"all\":true},\"remix\":{\"isSource\":true},\"isPaygated\":true},\"context\":{\"client\":{\"clientName\":62,\"clientVersion\":\"1.20241119.03.00\",\"hl\":\"nl\",\"gl\":\"VN\",\"experimentsToken\":\"\",\"utcOffsetMinutes\":420,\"rolloutToken\":\"\",\"userInterfaceTheme\":\"USER_INTERFACE_THEME_DARK\",\"screenWidthPoints\":1920,\"screenHeightPoints\":495,\"screenPixelDensity\":1,\"screenDensityFloat\":1},\"request\":{\"returnLogEntry\":true,\"internalExperimentFlags\":[],\"eats\":\"\",\"sessionInfo\":{\"token\":\"\"},\"consistencyTokenJars\":[]},\"user\":{\"onBehalfOfUser\":\"\",\"delegationContext\":{\"externalChannelId\":\"" + channel_id + "\",\"roleType\":{\"channelRoleType\":\"CREATOR_CHANNEL_ROLE_TYPE_OWNER\"}},\"serializedDelegationContext\":\"\"},\"clientScreenNonce\":\"\"}}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.videos.length; i++) {
            if (data.videos[i].lengthSeconds >= time_conditions) {
                console.log(data.videos[i]);
                authorization_pre = SAP();
                x_goog_pageid = ytcfg.data_.DELEGATED_SESSION_ID;
                channel_id = ytcfg.data_.CHANNEL_ID;
                client_name = ytcfg.data_.INNERTUBE_CONTEXT_CLIENT_NAME;
                client_version = ytcfg.data_.INNERTUBE_CONTEXT_CLIENT_VERSION;
                client_gl = ytcfg.data_.INNERTUBE_CONTEXT_GL;
                client_hl = ytcfg.data_.INNERTUBE_CONTEXT_HL;
                client_serializedDelegationContext = ytcfg.data_.INNERTUBE_CONTEXT_SERIALIZED_DELEGATION_CONTEXT;
                client_visibale_data = ytcfg.data_.VISITOR_DATA;


                let video_id = data.videos[i].videoId;
                let total_len = parseInt(data.videos[i].lengthSeconds)
                let start_time = secondsToMilliseconds(total_len - time_cut);
                let end_time = secondsToMilliseconds(total_len);



                fetch("https://studio.youtube.com/youtubei/v1/video_editor/edit_video?alt=json", {
                        "headers": {
                            "accept": "*/*",
                            "accept-language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
                            "authorization": authorization_pre,
                            "content-type": "application/json",
                            "priority": "u=1, i",
                            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                            "sec-ch-ua-arch": "\"x86\"",
                            "sec-ch-ua-bitness": "\"64\"",
                            "sec-ch-ua-form-factors": "\"Desktop\"",
                            "sec-ch-ua-full-version": "\"131.0.6778.85\"",
                            "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"131.0.6778.85\", \"Chromium\";v=\"131.0.6778.85\", \"Not_A Brand\";v=\"24.0.0.0\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-model": "\"\"",
                            "sec-ch-ua-platform": "\"Windows\"",
                            "sec-ch-ua-platform-version": "\"15.0.0\"",
                            "sec-ch-ua-wow64": "?0",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-goog-authuser": "0",
                            "x-goog-pageid": x_goog_pageid,
                            "x-goog-visitor-id": client_visibale_data,
                            "x-origin": "https://studio.youtube.com",
                            "x-youtube-client-name": client_name,
                            "x-youtube-client-version": client_version,
                            "x-youtube-delegation-context": client_serializedDelegationContext
                        },
                        "referrer": "https://studio.youtube.com/video/" + video_id + "/editor",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": "{\"videoEdit\":{\"trimEdit\":{\"videoSegments\":[{\"start\":{\"millis\":" + start_time + "},\"end\":{\"millis\":" + end_time + "}}]}},\"externalVideoId\":\"" + video_id + "\",\"context\":{\"client\":{\"clientName\":" + client_name + ",\"clientVersion\":\"" + client_version + "\",\"hl\":\"" + client_hl + "\",\"gl\":\"" + client_gl + "\",\"experimentsToken\":\"\",\"utcOffsetMinutes\":420,\"userInterfaceTheme\":\"USER_INTERFACE_THEME_DARK\",\"screenWidthPoints\":2133,\"screenHeightPoints\":275,\"screenPixelDensity\":1,\"screenDensityFloat\":0.8999999761581421},\"request\":{\"returnLogEntry\":true,\"internalExperimentFlags\":[],\"eats\":\"" + client_eats + "\",\"sessionInfo\":{\"token\":\"" + client_token + "\"},\"consistencyTokenJars\":[]},\"user\":{\"onBehalfOfUser\":\"" + x_goog_pageid + "\",\"delegationContext\":{\"externalChannelId\":\"" + channel_id + "\",\"roleType\":{\"channelRoleType\":\"CREATOR_CHANNEL_ROLE_TYPE_OWNER\"}},\"serializedDelegationContext\":\"" + client_serializedDelegationContext + "\"},\"clientScreenNonce\":\"\"}}",
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                    }).then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => console.error('Error:', error));
            }
        }

    })
    .catch(error => console.error('Error:', error));