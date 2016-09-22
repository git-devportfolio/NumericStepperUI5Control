sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("net.devportfolio.custom.control.NumericStepper.controller.View1", {

		onInit: function() {
			
			this.getView().setModel(new JSONModel(
				{
					products: [
					{
						id: "1",
						product: "Product 1",
						quantity: "10"
					},
					{
						id: "2",
						product: "Product 2",
						quantity: "15"
					},
					{
						id: "3",
						product: "Product 3",
						quantity: "3"
					}]
				}));
				
				// console.log(this.getView().getModel("viewModel"));
		}
	});

});