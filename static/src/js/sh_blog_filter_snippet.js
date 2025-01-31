/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { KeepLast } from "@web/core/utils/concurrency";
import { jsonrpc } from "@web/core/network/rpc_service";

publicWidget.registry.sh_blog_filter_snippet_s_post = publicWidget.Widget.extend({
    selector: ".js_cls_get_sh_blog_filter_s_post",
    disabledInEditableMode: true,
    read_events: {
        "click .js_cls_tab_a": "_onClickTab",
    },

    /**
     * @constructor
     */
    init: function () {
        this._super.apply(this, arguments);
        this.KeepLast = new KeepLast()
    },
    /**
     * @override
     */
    start: function () {
        this.item_template = this.$el.attr("data-item_template") || false;
        this.column_class = this.$el.attr("data-column_class") || "col-md-4";
        this.owl_item_mobile = this.$el.attr("data-owl_item_mobile") || 1;
        this.owl_item_tablet = this.$el.attr("data-owl_item_tablet") || 3;
        this.single_tab_item_template = this.$el.attr("data-single_tab_item_template") || false;
        this.order = this.$el.attr("data-order") || "";
        this.limit = parseInt(this.$el.attr("data-limit")) || false;
        this.blogs_ids = [];
        this.filter_id = parseInt(this.$el.data("filterId")) || false;

        //get snippet options
        var className = this.$el.attr("class");
        if (className) {
            //for category
            var blogs_ids = [];
            var classArray = className.split(" ");
            var arrayLength = classArray.length;
            for (var i = 0; i < arrayLength; i++) {
                var js_blog_id = classArray[i].match("sh_blog_(.*)_bend");
                if (js_blog_id && js_blog_id.length == 2) {
                    blogs_ids.push(parseInt(js_blog_id[1]));
                }
            }
            this.blogs_ids = blogs_ids;
        }
        this.KeepLast.add(this._fetch()).then(this._render.bind(this));
        return this._super.apply(this, arguments);
    },
    /**
     * @override
     */
    destroy: function () {
        this._super(...arguments);
        this.$el.find(".js_cls_render_dynamic_post_area").html("");
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @private
     */
    _fetch: function () {
        var loading = '<i class="js_cls_tab_pane_loading fa fa-circle-o-notch fa-spin" style="font-size:80px;width:100%;text-align:center;"></i>';

        this.$el.find(".js_cls_render_dynamic_post_area").append(loading);

        return jsonrpc("/sh_blog_filter_snippet/get_posts",{
            item_template: this.item_template,
            blogs_ids: this.blogs_ids,
            filter_id: this.filter_id,
            options: {
                order: this.order,
                limit: this.limit,
                column_class: this.column_class,
            },
        }).then((res) => {
            return res;
        });
    },
    /**
     * @private
     */
    _render: function (res) {
        // Add dynamic content
        this.$(".js_cls_render_dynamic_post_area").html(res.data);

        //refresh owl
        if (res.is_show_slider_local) {
            this.$(".js_cls_tab_pane_content").owlCarousel({
                items: res.items,
                autoplay: res.autoplay,
                speed: res.speed,
                loop: res.loop,
                nav:false,
                dots:false,
                margin:15,
                responsive: {
                    0: {
                        items: this.owl_item_mobile,
                    },
                    600: {
                        items: this.owl_item_tablet,
                    },
                    1000: {
                        items: res.items,
                    },
                },
            });
        }
    },

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * Add product to cart and reload the carousel.
     * @private
     * @param {Event} ev
     */
    _onClickTab: function (ev) {
        var self = this;
        var tab_pane_id = $(ev.currentTarget).attr("href");
        tab_pane_id = $.escapeSelector(tab_pane_id);
        var tab_id = parseInt($(ev.currentTarget).attr("data-tab_id")) || false;
        var $tab_pane_content = self.$el.find(tab_pane_id).find(".js_cls_tab_pane_content");
        var is_data_loaded = $tab_pane_content.attr("data-loaded");
        if (is_data_loaded) {
            return;
        }

        var loading = '<i class="js_cls_tab_pane_loading fa fa-circle-o-notch fa-spin" style="font-size:80px;width:100%;text-align:center;"></i>';
        var $already_loading = $tab_pane_content.find(".js_cls_tab_pane_loading");
        if ($already_loading.length) {
            $already_loading.replaceWith(loading);
        } else {
            $tab_pane_content.prepend(loading);
        }

        jsonrpc("/sh_blog_filter_snippet/get_posts", {
            item_template: this.single_tab_item_template,
            blogs_ids: this.blogs_ids,
            filter_id: this.filter_id,
            options: {
                order: this.order,
                limit: this.limit,
                tab_id: tab_id,
                column_class: this.column_class,
            },
        }).then(function (res) {
            $tab_pane_content.html(res.data);
            $tab_pane_content.attr("data-loaded", true);
            //refresh owl
            if (res.is_show_slider_local) {
                $tab_pane_content.owlCarousel("destroy");
                $tab_pane_content.owlCarousel({
                    items: res.items,
                    autoplay: res.autoplay,
                    speed: res.speed,
                    loop: res.loop,
                    nav: res.nav,
                    responsive: {
                        0: {
                            items: self.owl_item_mobile,
                        },
                        600: {
                            items: self.owl_item_tablet,
                        },
                        1000: {
                            items: res.items,
                        },
                    },
                });
            }
        });
    },
});


publicWidget.registry.sh_blog_filter_snippet_7 = publicWidget.Widget.extend({
    selector: "#sh_blog_snippet_7",

    events: {
        'mousemove': '_onMouseMoveAnimation',
    },

    start: function () {
        return this._super.apply(this, arguments);
    },
    
    _onMouseMoveAnimation:function(ev){
        var self = this
        var pageX = ev.pageX - ($(window).width() / 2);
        var pageY = ev.pageY - ($(window).height() / 2);
        var newvalueX = (this.$el.width() * pageX * -1 - 25) / 10000;
        var newvalueY = (this.$el.height() * pageY * -1 - 50) / 10000;
        $('.sh_layer svg').css({
            transform: 'translateX(' + newvalueX + 'px)' + 'translateY(' + newvalueY + 'px)',
        });
    },
});        

// publicWidget.registry.MyBlogWidthTransfer = publicWidget.Widget.extend({
//     selector: "#sh_blog_snippet_8",
//     start: function () {
//         let previousWidth = null; // Önceki genişliği tutmak için bir değişken
//         setInterval(() => {
//             const myBlog = $(document).find("#my_blog");
//             const myModal = $(document).find("#my_modal");
           
//             if (myBlog.length && myModal.length) {
               
//                 const currentWidth = myBlog[0].offsetWidth + "px";
//                 if (currentWidth !== previousWidth) { // Sadece genişlik değiştiyse işlem yap
//                     console.log(myModal[0])
//                     myModal[0].style.width = currentWidth;
//                     myModal[0].style.backgroundColor = "lightblue";
//                     console.log("My Blog genişliği değişti:", currentWidth, "My Modal'a uygulandı.");
//                     previousWidth = currentWidth; // Yeni genişliği kaydet
//                 }
//             } else {
//                 console.log("#my_blog veya #my_modal bulunamadı.");
//             }
//         }, 1000); // 100ms (0.1 saniye) aralıklarla kontrol eder

//         return this._super.apply(this, arguments);
//     },
// });

