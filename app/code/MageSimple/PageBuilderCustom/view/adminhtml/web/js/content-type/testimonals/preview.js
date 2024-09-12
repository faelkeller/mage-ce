define([
    'jquery',
    'knockout',
    'Magento_PageBuilder/js/events',
    'underscore',
    'Magento_PageBuilder/js/content-type/preview-collection',
    'Magento_PageBuilder/js/content-type-factory',
    'Magento_PageBuilder/js/config',
    "Magento_PageBuilder/js/content-type-menu/option",
    "mage/translate"
], function ($, ko, events, underscore, PreviewCollection, createContentType, pageBuilderConfig, _option, _translate) {
    'use strict';

    /**
     * Preview Constructor
     *
     * @param parent
     * @param config
     * @param stageId
     * @constructor
     */
    function Preview(parent, config, stageId) {
        var self = this;

        PreviewCollection.call(this, parent, config, stageId);

        events.on("magesimple_testimonals:dropAfter", function (args) {
            if (args.id === self.contentType.id && self.contentType.children().length === 0) {
                self.createItem();
            }
        });
    }
    Preview.prototype = Object.create(PreviewCollection.prototype);



    Preview.prototype.retrieveOptions = function retrieveOptions() {
        var options = PreviewCollection.prototype.retrieveOptions.call(this);

        options.add = new _option({
            preview: this,
            icon: "<i class='icon-pagebuilder-add'></i>",
            title: (0, _translate)("Add"),
            action: this.createItem,
            classes: ["add-child"],
            sort: 10
        });

        return options;
    }

    /**
     *
     */
    Preview.prototype.createItem = function () {
        var self = this;
        console.log("createItem", this.contentType);
        createContentType(
            pageBuilderConfig.getContentTypeConfig("magesimple_testimonal"),
            this.contentType,
            this.contentType.stageId
        ).then(function (gridItem) {
            self.contentType.addChild(gridItem);
        });

    };

    /**
     * Mark as not a standard container
     *
     * @returns {boolean}
     */
    Preview.prototype.isContainer = function () {
        return false;
    };

    return Preview;
});
