/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.controller("sap.ui.core.sample.ViewTemplate.scenario.Detail", {
	/*
	 * Event handler for table.
	 */
	onSelectionChange: function (oEvent) {
		var oSelectedListItem = oEvent.getParameter("listItem");

		this.getView().bindElement(oSelectedListItem.getBindingContext().getPath());
		//TODO keep drop-down selection in sync!
	}
});
