/*
 * Copyright 2016 EPAM Systems
 *
 *
 * This file is part of EPAM Report Portal.
 * https://github.com/epam/ReportPortal
 *
 * Report Portal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Report Portal is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Report Portal.  If not, see <http://www.gnu.org/licenses/>.
 */

define(function (require, exports, module) {
    'use strict';

    var Epoxy = require('backbone-epoxy');
    var Util = require('util');
    var $ = require('jquery');
    var SettingView = require('modals/addWidget/widgetSettings/_settingView');
    var WidgetsConfig = require('widget/widgetsConfig');
    var DropDownComponent = require('components/DropDownComponent');
    var Localization = require('localization');

    var SettingCriteriaView = SettingView.extend({
        className: 'modal-add-widget-setting-action',
        template: 'modal-add-widget-setting-action',
        events: {
        },
        bindings: {
        },
        initialize: function() {
            this.widgetConfig = WidgetsConfig.getInstance();
            this.curWidget = this.widgetConfig.widgetTypes[this.model.get('gadget')];
            if (!this.curWidget.actions) {
                this.destroy();
                return false;
            }
            this.render();
            var actionData = _.map(this.curWidget.actions, function (value) {
                return {name: value.text, value: value.actions.join(',')};
            });
            this.selectAction = new DropDownComponent({
                data: actionData,
                placeholder: Localization.wizard.actionSelectTitle,
                multiple: true,
            });
            $('[data-js-select-action-container]', this.$el).html(this.selectAction.$el);
            this.listenTo(this.selectAction, 'change', this.onChangeSelectAction);
        },
        render: function() {
            this.$el.html(Util.templates(this.template, {}))
        },
        onChangeSelectAction: function(content_fields) {
            this.model.setContentFields(content_fields);
        },
        onDestroy: function() {
            this.selectCriteria && this.selectCriteria.destroy();
        }
    });

    return SettingCriteriaView;
});