/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./P13nConditionPanel','./P13nPanel','./library','sap/ui/core/Control'],function(q,P,a,l,C){"use strict";var c=a.extend("sap.m.P13nSortPanel",{metadata:{library:"sap.m",properties:{containerQuery:{type:"boolean",group:"Misc",defaultValue:false},layoutMode:{type:"string",group:"Misc",defaultValue:null}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",visibility:"hidden"},sortItems:{type:"sap.m.P13nSortItem",multiple:true,singularName:"sortItem",bindable:"bindable"}},events:{addSortItem:{},removeSortItem:{},updateSortItem:{}}}});c.prototype._getConditions=function(){return this._oSortPanel.getConditions();};c.prototype.setContainerQuery=function(b){this.setProperty("containerQuery",b);this._oSortPanel.setContainerQuery(b);};c.prototype.setLayoutMode=function(m){this.setProperty("layoutMode",m);this._oSortPanel.setLayoutMode(m);};c.prototype.validateConditions=function(){return this._oSortPanel.validateConditions();};c.prototype.removeInvalidConditions=function(){this._oSortPanel.removeInvalidConditions();};c.prototype.removeValidationErrors=function(){this._oSortPanel.removeValidationErrors();};c.prototype.onBeforeNavigationFrom=function(){return this.validateConditions();};c.prototype.onAfterNavigationFrom=function(){return this.removeInvalidConditions();};c.prototype.setOperations=function(o){this._aOperations=o;if(this._oSortPanel){this._oSortPanel.setOperations(this._aOperations);}};c.prototype.init=function(){sap.ui.getCore().loadLibrary("sap.ui.layout");q.sap.require("sap.ui.layout.Grid");sap.ui.layout.Grid.prototype.init.apply(this);this._aKeyFields=[];this.addStyleClass("sapMSortPanel");if(!this._aOperations){this.setOperations([sap.m.P13nConditionOperation.Ascending,sap.m.P13nConditionOperation.Descending]);}this._oSortPanel=new P({autoReduceKeyFieldItems:true,layoutMode:this.getLayoutMode(),dataChange:this._handleDataChange()});this._oSortPanel.setOperations(this._aOperations);this.addAggregation("content",this._oSortPanel);};c.prototype.exit=function(){var d=function(o){if(o&&o.destroy){o.destroy();}return null;};this._aKeyFields=d(this._aKeyFields);this._aOperations=d(this._aOperations);};c.prototype.addItem=function(i){a.prototype.addItem.apply(this,arguments);var k={key:i.getColumnKey(),text:i.getText(),tooltip:i.getTooltip()};this._aKeyFields.push(k);if(this._oSortPanel){this._oSortPanel.addKeyField(k);}};c.prototype.destroyItems=function(){this.destroyAggregation("items");if(this._oSortPanel){this._oSortPanel.removeAllKeyFields();}return this;};c.prototype.addSortItem=function(s){this.addAggregation("sortItems",s);if(!this._bIgnoreBindCalls){var b=[];this.getSortItems().forEach(function(S){b.push({key:S.getKey(),keyField:S.getColumnKey(),operation:S.getOperation()});});this._oSortPanel.setConditions(b);}};c.prototype.insertSortItem=function(s){this.insertAggregation("sortItems",s);return this;};c.prototype.removeSortItem=function(s){s=this.removeAggregation("sortItems",s);return s;};c.prototype.removeAllSortItems=function(){var s=this.removeAllAggregation("sortItems");this._oSortPanel.setConditions([]);return s;};c.prototype.destroySortItems=function(){this.destroyAggregation("sortItems");if(!this._bIgnoreBindCalls){this._oSortPanel.setConditions([]);}return this;};c.prototype._handleDataChange=function(){var t=this;return function(e){var n=e.getParameter("newData");var o=e.getParameter("operation");var k=e.getParameter("key");var i=e.getParameter("index");var s=null;if(n){var s=new sap.m.P13nSortItem({key:k,columnKey:n.keyField,operation:n.operation});}if(o==="update"){var S=t.getSortItems()[i];if(S){S.setColumnKey(n.keyField);S.setOperation(n.operation);}t.fireUpdateSortItem({key:k,index:i,sortItemData:s});}if(o==="add"){t._bIgnoreBindCalls=true;t.fireAddSortItem({key:k,index:i,sortItemData:s});t._bIgnoreBindCalls=false;}if(o==="remove"){t.fireRemoveSortItem({key:k,index:i});}};};return c;},true);