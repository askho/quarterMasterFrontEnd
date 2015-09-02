/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/theming/Parameters','./library'],function(q,C,P,l){"use strict";var S=C.extend("sap.ui.unified.SplitContainer",{metadata:{library:"sap.ui.unified",properties:{showSecondaryContent:{type:"boolean",group:"Appearance",defaultValue:null},secondaryContentSize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'250px'},secondaryContentWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'250px',deprecated:true},orientation:{type:"sap.ui.core.Orientation",group:"Appearance",defaultValue:sap.ui.core.Orientation.Horizontal}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},secondaryContent:{type:"sap.ui.core.Control",multiple:true,singularName:"secondaryContent"}}}});(function(w){S.prototype.init=function(){this.bRtl=sap.ui.getCore().getConfiguration().getRTL();this._paneRenderer=new sap.ui.unified._ContentRenderer(this,this.getId()+"-panecntnt","secondaryContent");this._canvasRenderer=new sap.ui.unified._ContentRenderer(this,this.getId()+"-canvascntnt","content");this._moveContent=true;};S.prototype.exit=function(){this._paneRenderer.destroy();delete this._paneRenderer;this._canvasRenderer.destroy();delete this._canvasRenderer;delete this._contentContainer;delete this._secondaryContentContainer;};S.prototype.onAfterRendering=function(){this._contentContainer=this.$("canvas");this._secondaryContentContainer=this.$("pane");this._applySecondaryContentSize();};S.prototype._applySecondaryContentSize=function(){if(this.getDomRef()){var v=this.getOrientation()==sap.ui.core.Orientation.Vertical;var s,o;var d,O;var a=this.getSecondaryContentSize();var b=this.getShowSecondaryContent();if(v){s="height";o="width";d="top";O=this.bRtl?"right":"left";}else{s="width";o="height";d=this.bRtl?"right":"left";O="top";}if(this._closeContentDelayId){q.sap.clearDelayedCall(this._closeContentDelayId);}this._secondaryContentContainer.css(s,a);this._secondaryContentContainer.css(o,"");this._secondaryContentContainer.css(d,b?"0":"-"+a);this._secondaryContentContainer.css(O,"");if(this._moveContent){this._contentContainer.css(d,b?a:"0");}else{this._contentContainer.css(d,"0");}if(!b){var h=parseInt(P.get("sapUiUfdSplitContAnimationDuration"),10);this._closeContentDelayId=q.sap.delayedCall(h,this,function(){this._secondaryContentContainer.toggleClass("sapUiUfdSplitContSecondClosed",true);});}else{this._secondaryContentContainer.toggleClass("sapUiUfdSplitContSecondClosed",false);}}};S.prototype._mod=function(m,d){var r=!!this.getDomRef();var a=m.apply(this,[r]);if(r&&d){d.render();}return a;};S.prototype.setShowSecondaryContent=function(s){var r=this.getDomRef();this.setProperty("showSecondaryContent",!!s,r);this._applySecondaryContentSize();return this;};S.prototype.setSecondaryContentSize=function(s){this.setProperty("secondaryContentSize",s,true);this._applySecondaryContentSize();return this;};S.prototype.getSecondaryContentWidth=function(){q.sap.log.warning("SplitContainer: Use of deprecated property \"SecondaryContentWidth\", please use "+"\"SecondaryContentSize\" instead.");return this.getSecondaryContentSize.apply(this,arguments);};S.prototype.setSecondaryContentWidth=function(){q.sap.log.warning("SplitContainer: Use of deprecated property \"SecondaryContentWidth\", please use "+"\"SecondaryContentSize\" instead.");return this.setSecondaryContentSize.apply(this,arguments);};S.prototype.insertContent=function(c,i){return this._mod(function(r){return this.insertAggregation("content",c,i,r);},this._canvasRenderer);};S.prototype.addContent=function(c){return this._mod(function(r){return this.addAggregation("content",c,r);},this._canvasRenderer);};S.prototype.removeContent=function(i){return this._mod(function(r){return this.removeAggregation("content",i,r);},this._canvasRenderer);};S.prototype.removeAllContent=function(){return this._mod(function(r){return this.removeAllAggregation("content",r);},this._canvasRenderer);};S.prototype.destroyContent=function(){return this._mod(function(r){return this.destroyAggregation("content",r);},this._canvasRenderer);};S.prototype.insertSecondaryContent=function(c,i){return this._mod(function(r){return this.insertAggregation("secondaryContent",c,i,r);},this._paneRenderer);};S.prototype.addSecondaryContent=function(c){return this._mod(function(r){return this.addAggregation("secondaryContent",c,r);},this._paneRenderer);};S.prototype.removeSecondaryContent=function(i){return this._mod(function(r){return this.removeAggregation("secondaryContent",i,r);},this._paneRenderer);};S.prototype.removeAllSecondaryContent=function(){return this._mod(function(r){return this.removeAllAggregation("secondaryContent",r);},this._paneRenderer);};S.prototype.destroySecondaryContent=function(){return this._mod(function(r){return this.destroyAggregation("secondaryContent",r);},this._paneRenderer);};})(window);return S;},true);