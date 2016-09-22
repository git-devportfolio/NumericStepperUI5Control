sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/Button",
	"sap/m/Input"
], function(Control, Button, Input) {
	"use strict";
	return Control.extend("net.devportfolio.custom.control.NumericStepper.control.NumericStepper", {
		metadata: {
			properties: {
				value: {
					type: "string",
					defaultValue: 0
				},
				minValue: {
					type: "int",
					defaultValue: 0
				},
				maxValue: {
					type: "int",
					defaultValue: 999
				},
				width: {
					defaultValue: "4em"
				}
			},
			aggregations: {
				_add: {
					type: "sap.m.Button",
					multiple: false,
					visibility: "hidden"
				},
				_substract: {
					type: "sap.m.Button",
					multiple: false,
					visibility: "hidden"
				},
				_input: {
					type: "sap.m.Input",
					multiple: false,
					visibility: "hidden"
				}
			},
			events: {
				change: {
					parameters: {
						value: {
							type: "int"
						}
					}
				}
			}
		},
		init: function() {
			this.setAggregation("_add", new Button({
				text: "+",
				type: sap.m.ButtonType.Transparent,
				press: this._onAdd.bind(this)
			}).addStyleClass("oAdd"));
			this.setAggregation("_substract", new Button({
				text: "-",
				type: sap.m.ButtonType.Transparent,
				press: this._onSubstract.bind(this)
			}).addStyleClass("oSubstract"));
			this.setAggregation("_input", new Input({
				maxLength: 3,
				width: this.getWidth(),
				value: this.getValue(),
				type: sap.m.InputType.Number,
				change: this._onChange.bind(this),
				liveChange: this._onLiveChange.bind(this)
			// begin of ins DCCK900308
			}));
			/*.attachBrowserEvent("focusin", function(oEvent) {
				console.log(oEvent.target);
				oEvent.target.select();
			});*/
			// end of ins DCCK900308
		},
		getIntValue: function() {
			return parseInt(this.getValue(), 10);
		},
		setValue: function(value) {
			this.setProperty("value", value, true);
			this.getAggregation("_input").setValue(value);
			this._setVisibleButtons();
		},
		_isValidValue: function(value) {
			var v = parseInt(value, 10);
			if (isNaN(v)) {
				return false;
			}
			if (v > this.getMaxValue()) {
				return false;
			}
			if (v < this.getMinValue()) {
				return false;
			}
			return true;
		},
		_onAdd: function() {
			var v = this.getIntValue() + 1;
			if (this._isValidValue(v)) {
				this.setValue(v);
				this.fireEvent("change", {
					value: v,
					delta: 1
				});
			}
		},
		_onSubstract: function() {
			var v = this.getIntValue() - 1;
			if (this._isValidValue(v)) {
				this.setValue(v);
				this.fireEvent("change", {
					value: v,
					delta: -1
				});
			}
		},
		_onLiveChange: function(oEvent) {
			var v = oEvent.getSource().getValue(),
				old = this.getIntValue();
			if (this._isValidValue(v)) {
				v = parseInt(v, 10);
				if (old !== v) {
					this.setValue(parseInt(v, 10));
					this.fireEvent("change", {
						value: v,
						delta: v - old
					});
				}
			} else {
				oEvent.getSource().setValue(this.getIntValue());
			}
		},
		_onChange: function(oEvent) {
			var v = oEvent.getSource().getValue(),
				old = this.getIntValue();
			if (this._isValidValue(v)) {
				v = parseInt(v, 10);
				if (old !== v) {
					this.setValue(parseInt(v, 10));
					this.fireEvent("change", {
						value: v,
						delta: v - old
					});
				}
			} else {
				oEvent.getSource().setValue(this.getIntValue());
			}
		},
		_setEnabledButtons: function() {
			var v = this.getIntValue();
			if (v === this.getMaxValue()) {
				this.getAggregation("_add").setEnabled(false);
			} else {
				this.getAggregation("_add").setEnabled(true);
			}
			if (v === this.getMinValue()) {
				this.getAggregation("_substract").setEnabled(false);
			} else {
				this.getAggregation("_substract").setEnabled(true);
			}
		},
		_setVisibleButtons: function() {
			var v = this.getIntValue();
			if (v === this.getMaxValue()) {
				this.getAggregation("_add").$().css({
					opacity: 0
				});
			} else {
				this.getAggregation("_add").setVisible(true);
			}
			if (v === this.getMinValue()) {
				this.getAggregation("_substract").addStyleClass("oHidden");
			} else {
				this.getAggregation("_substract").removeStyleClass("oHidden");
			}
		},
		renderer: function(oRM, oControl) {
			oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.addClass("oNumericStepper");
			oRM.writeClasses();
			oRM.write(">");
			oRM.renderControl(oControl.getAggregation("_input"));
			oRM.renderControl(oControl.getAggregation("_substract"));
			oRM.renderControl(oControl.getAggregation("_add"));
			oRM.write("</div>");
		}
	});
});