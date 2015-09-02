/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./BindingParser','./DataType','./EventProvider','./ManagedObjectMetadata','sap/ui/model/CompositeBinding','sap/ui/model/ContextBinding','sap/ui/model/Model','sap/ui/model/Type','jquery.sap.act','jquery.sap.script','jquery.sap.strings'],function(q,B,D,E,M,C,b,c,T){"use strict";var d=E.extend("sap.ui.base.ManagedObject",{metadata:{"abstract":true,publicMethods:["getId","getMetadata","getModel","setModel","hasModel","bindProperty","unbindProperty","bindAggregation","unbindAggregation","bindObject","unbindObject","getObjectBinding"],library:"sap.ui.core",properties:{},aggregations:{},associations:{},events:{"validationSuccess":{enableEventBubbling:true,parameters:{element:{type:'sap.ui.base.ManagedObject'},property:{type:'string'},type:{type:'sap.ui.model.Type'},newValue:{type:'any'},oldValue:{type:'any'}}},"validationError":{enableEventBubbling:true,parameters:{element:{type:'sap.ui.base.ManagedObject'},property:{type:'string'},type:{type:'sap.ui.model.Type'},newValue:{type:'any'},oldValue:{type:'any'},message:{type:'string'}}},"parseError":{enableEventBubbling:true,parameters:{element:{type:'sap.ui.base.ManagedObject'},property:{type:'string'},type:{type:'sap.ui.model.Type'},newValue:{type:'any'},oldValue:{type:'any'},message:{type:'string'}}},"formatError":{enableEventBubbling:true,parameters:{element:{type:'sap.ui.base.ManagedObject'},property:{type:'string'},type:{type:'sap.ui.model.Type'},newValue:{type:'any'},oldValue:{type:'any'}}}},specialSettings:{id:true,models:true,bindingContexts:true,objectBindings:true,Type:true}},constructor:function(i,s,S){E.call(this);if(typeof(i)!="string"&&arguments.length>0){S=s;s=i;if(s&&s.id){i=s["id"];}else{i=null;}}if(!i){i=this.getMetadata().uid()||q.sap.uid();}else{var p=d._fnIdPreprocessor;i=(p?p.call(this,i):i);var t=D.getType("sap.ui.core.ID");if(!t.isValid(i)){throw new Error("\""+i+"\" is not a valid ID.");}}this.sId=i;this.mProperties=this.getMetadata().createPropertyBag();this.mAggregations={};this.mAssociations={};this.mMethods={};this.oParent=null;this.aDelegates=[];this.aBeforeDelegates=[];this.iSuppressInvalidate=0;this.oPropagatedProperties={oModels:{},oBindingContexts:{}};this.mSkipPropagation={};this.oModels={};this.oBindingContexts={};this.mElementBindingContexts={};this.mBindingInfos={};this.sBindingPath=null;this.mBindingParameters=null;this.mBoundObjects={};this._sOwnerId=d._sOwnerId;try{if(this.register){this.register();}if(this._initCompositeSupport){this._initCompositeSupport(s);}if(this.init){this.init();}this.applySettings(s,S);}catch(e){if(this.deregister){this.deregister();}throw e;}}},M);d.create=function(v,k){if(!v||v instanceof d||typeof v!=="object"||v instanceof String){return v;}function g(t){if(typeof t==="function"){return t;}if(typeof t==="string"){return q.sap.getObject(t);}}var a=g(v.Type)||g(k&&k.type);if(typeof a==="function"){return new a(v);}var m="Don't know how to create a ManagedObject from "+v+" ("+(typeof v)+")";q.sap.log.fatal(m);throw new Error(m);};d._fnIdPreprocessor=null;d._fnSettingsPreprocessor=null;d.runWithPreprocessors=function(a,p){var o={id:this._fnIdPreprocessor,settings:this._fnSettingsPreprocessor};p=p||{};this._fnIdPreprocessor=p.id;this._fnSettingsPreprocessor=p.settings;try{var r=a.call();this._fnIdPreprocessor=o.id;this._fnSettingsPreprocessor=o.settings;return r;}catch(e){this._fnIdPreprocessor=o.id;this._fnSettingsPreprocessor=o.settings;throw e;}};d.getOwnerIdFor=function(o){q.sap.log.error("[Deprecated] The private method sap.ui.base.ManagedObject.getOwnerIdFor must no longer be used. Use the public sap.ui.core.Component.getOwnerForId instead.");return o&&o._sOwnerId;};d.runWithOwner=function(a,o){q.sap.log.error("[Deprecated] The private method sap.ui.base.ManagedObject.runWithOwner must no longer be used. Use the public sap.ui.core.Component.runAsOwner instead.");if(o&&typeof o.runAsOwner==="function"){o.runAsOwner(a);}else{throw new Error("trying to execute a function with a non-suitable owner "+o+". See the deprecation hint in the console.");}};d.prototype.applySettings=function(s,S){if(!s||q.isEmptyObject(s)){return this;}var t=this,m=this.getMetadata(),v=m.getJSONKeys(),a=d.create,p=d._fnSettingsPreprocessor,k,V,K;function e(O){for(var i=0,g=O.length;i<g;i++){var h=O[i];if(q.isArray(h)){e(h);}else{t[K._sMutator](a(h,K));}}}p&&p.call(this,s);if(s.models){if(typeof s.models!=="object"){throw new Error("models must be a simple object");}if(s.models instanceof c){this.setModel(s.models);}else{for(k in s.models){this.setModel(s.models[k],k==="undefined"?undefined:k);}}delete s.models;}if(s.bindingContexts){if(typeof s.bindingContexts!=="object"){throw new Error("bindingContexts must be a simple object");}if(s.bindingContexts instanceof sap.ui.model.Context){this.setBindingContext(s.bindingContexts);}else{for(k in s.bindingContexts){this.setBindingContext(s.bindingContexts[k],k==="undefined"?undefined:k);}}delete s.bindingContexts;}if(s.objectBindings){if(typeof s.objectBindings!=="string"&&typeof s.objectBindings!=="object"){throw new Error("binding must be a string or simple object");}if(typeof s.objectBindings==="string"||s.objectBindings.path){this.bindObject(s.objectBindings);}else{for(var k in s.objectBindings){s.objectBindings.model=k;this.bindObject(s.objectBindings[k]);}}delete s.objectBindings;}for(k in s){V=s[k];if((K=v[k])!==undefined){var o;switch(K._iKind){case 0:o=this.extractBindingInfo(V,S);if(o&&typeof o==="object"){this.bindProperty(k,o);}else{this[K._sMutator](o||V);}break;case 1:o=K.altTypes&&this.extractBindingInfo(V,S);if(o&&typeof o==="object"){this.bindProperty(k,o);}else{if(q.isArray(V)){if(V.length>1){q.sap.log.error("Tried to add an array of controls to a single aggregation");}V=V[0];}this[K._sMutator](a(o||V,K));}break;case 2:o=this.extractBindingInfo(V,S);if(o&&typeof o==="object"){this.bindAggregation(k,o);}else{V=o||V;if(V){e(q.isArray(V)?V:[V]);}}break;case 3:this[K._sMutator](V);break;case 4:if(V&&!q.isArray(V)){V=[V];}if(V){for(var i=0,l=V.length;i<l;i++){this[K._sMutator](V[i]);}}break;case 5:if(typeof V=="function"){this[K._sMutator](V);}else{this[K._sMutator](V[0],V[1],V[2]);}break;case-1:default:break;}}else{}}return this;};d.prototype.toString=function(){return"ManagedObject "+this.getMetadata().getName()+"#"+this.getId();};d.prototype.getId=function(){return this.sId;};d.prototype.setProperty=function(p,v,s){var o=this.mProperties[p];v=this.validateProperty(p,v);if(q.sap.equal(o,v)){return this;}if(s){q.sap.act.refresh();this.iSuppressInvalidate++;}this.mProperties[p]=v;if(!this.isInvalidateSuppressed()){this.invalidate();}this.updateModelProperty(p,v,o);E.prototype.fireEvent.call(this,"_change",{"id":this.getId(),"name":p,"oldValue":o,"newValue":v});if(s){this.iSuppressInvalidate--;}return this;};d.prototype.getProperty=function(p){var v=this.mProperties[p],P=this.getMetadata().getProperty(p),t;if(!P){throw new Error("Property \""+p+"\" does not exist in "+this);}t=D.getType(P.type);if(t instanceof D&&t.isArrayType()&&q.isArray(v)){v=v.slice(0);}if(v instanceof String){v=v.valueOf();}return v;};d.prototype.validateProperty=function(p,v){var P=this.getMetadata().getProperty(p),t;if(!P){throw new Error("Property \""+p+"\" does not exist in "+this);}t=D.getType(P.type);if(t instanceof D&&t.isArrayType()&&q.isArray(v)){v=v.slice(0);}if(v===null||v===undefined){if(P.defaultValue!==null){v=P.defaultValue;}else{v=t.getDefaultValue();}}else if(t instanceof D){if(t.getName()=="string"){if(!(typeof v=="string"||v instanceof String)){v=""+v;}}else if(t.getName()=="string[]"){if(typeof v=="string"){v=[v];}if(!q.isArray(v)){throw new Error("\""+v+"\" is of type "+typeof v+", expected string[]"+" for property \""+p+"\" of "+this);}for(var i=0;i<v.length;i++){if(!typeof v[i]=="string"){v[i]=""+v[i];}}}else if(!t.isValid(v)){throw new Error("\""+v+"\" is of type "+typeof v+", expected "+t.getName()+" for property \""+p+"\" of "+this);}}else if(!(v in t)){throw new Error("\""+v+"\" is not a valid entry of the enumeration for property \""+p+"\" of "+this);}if(t&&t.normalize&&typeof t.normalize==="function"){v=t.normalize(v);}return v;};d.prototype.getOriginInfo=function(p){var v=this.mProperties[p];if(!(v instanceof String&&v.originInfo)){return null;}return v.originInfo;};d.prototype.setAssociation=function(a,i,s){if(i instanceof d){i=i.getId();}else if(i!=null&&typeof i!=="string"){return this;}if(this.mAssociations[a]===i){return this;}if(s){this.iSuppressInvalidate++;}this.mAssociations[a]=i;if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}return this;};d.prototype.getAssociation=function(a,o){var r=this.mAssociations[a];if(!r){r=this.mAssociations[a]=o||null;}else{if(typeof r.length==='number'&&!(r.propertyIsEnumerable('length'))){return r.slice();}return r;}return r;};d.prototype.addAssociation=function(a,i,s){if(i instanceof d){i=i.getId();}else if(typeof i!=="string"){return this;}if(s){this.iSuppressInvalidate++;}var I=this.mAssociations[a];if(!I){I=this.mAssociations[a]=[i];}else{I.push(i);}if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}return this;};d.prototype.removeAssociation=function(a,o,s){var I=this.mAssociations[a];var e=null;if(!I){return null;}if(s){this.iSuppressInvalidate++;}if(typeof(o)=="object"&&o.getId){o=o.getId();}if(typeof(o)=="string"){for(var i=0;i<I.length;i++){if(I[i]==o){o=i;break;}}}if(typeof(o)=="number"){if(o<0||o>=I.length){q.sap.log.warning("ManagedObject.removeAssociation called with invalid index: "+a+", "+o);}else{e=I[o];I.splice(o,1);if(!this.isInvalidateSuppressed()){this.invalidate();}}}if(s){this.iSuppressInvalidate--;}return e;};d.prototype.removeAllAssociation=function(a,s){var i=this.mAssociations[a];if(!i){return[];}if(s){this.iSuppressInvalidate++;}delete this.mAssociations[a];if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}return i;};d.prototype.validateAggregation=function(a,o,m){var e=this.getMetadata(),A=e.getManagedAggregation(a),g,t,i,h;if(!A){if(a&&e._mHiddenAggregations&&e._mHiddenAggregations[a]){A=e._mHiddenAggregations[a];q.sap.log.error("Support for '_mHiddenAggregations' is about to be removed (with 1.12 latest). Hidden aggregations like '"+e.getName()+"."+a+"' instead can be declared like normal aggregations but with visibility:'hidden'.");}else{h="Aggregation \""+a+"\" does not exist in "+this;if(/^sap\.(ui\.core|ui\.commons|ui\.table|ui\.ux3|m|makit|viz|uiext\.inbox)$/.test(e.getLibraryName()||"")){throw new Error(h);}else{q.sap.log.error("Support for undeclared aggregations is about to be removed (with 1.12 latest). Hidden aggregations like '"+e.getName()+"."+a+"' can be declared like normal aggregations but with visibility:'hidden'.");return o;}}}if(A.multiple!==m){throw new Error("Aggregation '"+a+"' of "+this+" used with wrong cardinality (declared as "+(A.multiple?"0..n":"0..1")+")");}if(!A.multiple&&!o){return o;}t=q.sap.getObject(A.type);if(typeof t==="function"&&o instanceof t){return o;}if(o&&o.getMetadata&&o.getMetadata().isInstanceOf(A.type)){return o;}g=A.altTypes;if(g&&g.length){if(o==null){return o;}for(i=0;i<g.length;i++){t=D.getType(g[i]);if(t instanceof D){if(t.isValid(o)){return o;}}else if(o in t){return o;}}}h="\""+o+"\" is not valid for aggregation \""+a+"\" of "+this;if(D.isInterfaceType(A.type)){return o;}else{throw new Error(h);}};d.prototype.setAggregation=function(a,o,s){var O=this.mAggregations[a];if(O===o){return this;}o=this.validateAggregation(a,o,false);if(s){this.iSuppressInvalidate++;}if(O instanceof d){O.setParent(null);}this.mAggregations[a]=o;if(o instanceof d){o.setParent(this,a,s);}else{if(!this.isInvalidateSuppressed()){this.invalidate();}}if(s){this.iSuppressInvalidate--;}return this;};d.prototype.getAggregation=function(a,o){var e=this.mAggregations[a];if(!e){e=this.mAggregations[a]=o||null;}if(e){if(typeof e.length==='number'&&!(e.propertyIsEnumerable('length'))){return e.slice();}return e;}else{return null;}};d.prototype.indexOfAggregation=function(a,o){var e=this.mAggregations[a];if(e){if(e.length==undefined){return-2;}for(var i=0;i<e.length;i++){if(e[i]==o){return i;}}}return-1;};d.prototype.insertAggregation=function(a,o,I,s){if(!o){return this;}o=this.validateAggregation(a,o,true);var e=this.mAggregations[a]||(this.mAggregations[a]=[]);var i;if(I<0){i=0;}else if(I>e.length){i=e.length;}else{i=I;}if(i!==I){q.sap.log.warning("ManagedObject.insertAggregation: index '"+I+"' out of range [0,"+e.length+"], forced to "+i);}e.splice(i,0,o);o.setParent(this,a,s);return this;};d.prototype.addAggregation=function(a,o,s){if(!o){return this;}o=this.validateAggregation(a,o,true);var e=this.mAggregations[a];if(!e){e=this.mAggregations[a]=[o];}else{e.push(o);}o.setParent(this,a,s);return this;};d.prototype.removeAggregation=function(a,o,s){var e=this.mAggregations[a],g=null,i;if(!e){return null;}if(s){this.iSuppressInvalidate++;}if(typeof(o)=="string"){for(i=0;i<e.length;i++){if(e[i]&&e[i].getId()===o){o=i;break;}}}if(typeof(o)=="object"){for(i=0;i<e.length;i++){if(e[i]==o){o=i;break;}}}if(typeof(o)=="number"){if(o<0||o>=e.length){q.sap.log.warning("ManagedObject.removeAggregation called with invalid index: "+a+", "+o);}else{g=e[o];e.splice(o,1);g.setParent(null);if(!this.isInvalidateSuppressed()){this.invalidate();}}}if(s){this.iSuppressInvalidate--;}return g;};d.prototype.removeAllAggregation=function(a,s){var e=this.mAggregations[a];if(!e){return[];}if(s){this.iSuppressInvalidate++;}delete this.mAggregations[a];for(var i=0;i<e.length;i++){e[i].setParent(null);}if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}return e;};d.prototype.destroyAggregation=function(a,s){var e=this.mAggregations[a],i,g;if(!e){return this;}if(s){this.iSuppressInvalidate++;}delete this.mAggregations[a];if(e instanceof d){e.destroy(s);}else if(q.isArray(e)){for(i=e.length-1;i>=0;i--){g=e[i];if(g){g.destroy(s);}}}if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}return this;};d.prototype.invalidate=function(){if(this.oParent){this.oParent.invalidate(this);}};d.prototype.isInvalidateSuppressed=function(){var i=this.iSuppressInvalidate>0;if(this.oParent&&this.oParent instanceof d){i=i||this.oParent.isInvalidateSuppressed();}return i;};d.prototype._removeChild=function(o,a,s){if(!a){q.sap.log.error("Cannot remove aggregated child without aggregation name.",null,this);}else{if(s){this.iSuppressInvalidate++;}var i=this.indexOfAggregation(a,o);var A=this.getMetadata().getAggregation(a);if(i==-2){if(A&&this[A._sMutator]){this[A._sMutator](null);}else{this.setAggregation(a,null,s);}}else if(i>-1){if(A&&this[A._sRemoveMutator]){this[A._sRemoveMutator](i);}else{this.removeAggregation(a,i,s);}}if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}}};d.prototype.setParent=function(p,a,s){if(!p){this.oParent=null;this.sParentAggregationName=null;this.oPropagatedProperties={oModels:{},oBindingContexts:{}};q.sap.act.refresh();return;}if(s){q.sap.act.refresh();this.iSuppressInvalidate++;}var o=this.getParent();if(o){o._removeChild(this,this.sParentAggregationName);}this.oParent=p;this.sParentAggregationName=a;this.oPropagatedProperties=p._getPropertiesToPropagate();if(this.hasModel()){this.updateBindingContext(false,true,undefined,true);this.updateBindings(true,null);this.propagateProperties(true);}if(p&&!this.isInvalidateSuppressed()){p.invalidate(this);}if(s){this.iSuppressInvalidate--;}return this;};d.prototype.getParent=function(){return this.oParent;};d.prototype.destroy=function(s){var t=this;if(s){this.iSuppressInvalidate++;}if(this.exit){this.exit();}if(this._exitCompositeSupport){this._exitCompositeSupport();}for(var a in this.mAggregations){this.destroyAggregation(a,s);}if(this.deregister){this.deregister();}if(this.oParent&&this.sParentAggregationName){this.oParent._removeChild(this,this.sParentAggregationName,s);}delete this.oParent;q.each(this.mBindingInfos,function(n,o){if(o.factory){t.unbindAggregation(n,true);}else{t.unbindProperty(n,true);}});if(s){this.iSuppressInvalidate--;}sap.ui.getCore().getMessageManager().removeMessages(this._aMessages);this._aMessages=undefined;E.prototype.destroy.apply(this,arguments);this.setParent=function(){throw Error("The object with ID "+t.getId()+" was destroyed and cannot be used anymore.");};this.bIsDestroyed=true;};d.bindingParser=B.simpleParser;d.prototype.isBinding=function(v,k){return typeof this.extractBindingInfo(v)==="object";};d.prototype.extractBindingInfo=function(v,s){if(v&&typeof v==="object"){if(v.ui5object){delete v.ui5object;}else if(v.path!=undefined||v.parts){if(v.template){v.template=d.create(v.template);}return v;}}if(typeof v==="string"){return d.bindingParser(v,s,true);}};d.prototype.getBindingInfo=function(n){return this.mBindingInfos[n];};d.prototype.bindObject=function(p,P){var a={},o,m,s;if(typeof p=="object"){var e=p;p=e.path;P=e.parameters;m=e.model;a.events=e.events;}s=p.indexOf(">");a.sBindingPath=p;a.mBindingParameters=P;if(s>0){m=p.substr(0,s);a.sBindingPath=p.substr(s+1);}o=this.mBoundObjects[m];if(o&&o.binding){o.binding.detachChange(o.fChangeHandler);o.binding.detachEvents(o.events);delete this.mElementBindingContexts[m];}this.mBoundObjects[m]=a;if(this.getModel(m)){this._bindObject(m,a);}return this;};d.prototype._bindObject=function(m,o){var a,e,g,t=this;var h=function(i){if(a.getBoundContext()===t.getBindingContext(m)){t.setElementBindingContext(null,m);}t.setElementBindingContext(a.getBoundContext(),m);};g=this.getModel(m);e=this.getBindingContext(m);a=g.bindContext(o.sBindingPath,e,o.mBindingParameters);a.attachChange(h);o.binding=a;o.fChangeHandler=h;a.attachEvents(o.events);a.initialize();};d.prototype.bindContext=function(p){return this.bindElement(p);};d.prototype.unbindContext=function(m){return this.unbindElement(m);};d.prototype.unbindObject=function(m){var o=this.mBoundObjects[m];if(o){if(o.binding){o.binding.detachChange(o.fChangeHandler);o.binding.detachEvents(o.events);}delete this.mBoundObjects[m];delete this.mElementBindingContexts[m];this.updateBindingContext(false,false,m);}return this;};d.prototype.bindProperty=function(n,o){var p,F,m,a,t,s,A=true,e=this,P=this.getMetadata().getPropertyLikeSetting(n);if(!P){throw new Error("Property \""+n+"\" does not exist in "+this);}if(typeof o=="string"){p=arguments[1];F=arguments[2];m=arguments[3];if(typeof F=="function"){a=F;}else if(F instanceof T){t=F;}o={formatter:a,parts:[{path:p,type:t,mode:m}]};}if(!o.parts){o.parts=[];o.parts[0]={path:o.path,type:o.type,formatOptions:o.formatOptions,constraints:o.constraints,model:o.model,mode:o.mode};delete o.path;delete o.mode;delete o.model;}q.each(o.parts,function(i,g){if(typeof g=="string"){g={path:g};o.parts[i]=g;}s=g.path.indexOf(">");if(s>0){g.model=g.path.substr(0,s);g.path=g.path.substr(s+1);}if(o.formatter){g.mode=sap.ui.model.BindingMode.OneWay;}if(!e.getModel(g.model)){A=false;}});if(this.isBound(n)){this.unbindProperty(n,true);}this.mBindingInfos[n]=o;if(A){this._bindProperty(n,o);}return this;};d.prototype._bindProperty=function(n,o){var m,a,e,s,g=sap.ui.model.BindingMode.TwoWay,t,h,p=this.getMetadata().getPropertyLikeSetting(n),I=p._iKind===0?p.type:p.altTypes[0],j=this,k=[],l=function(i){var u=sap.ui.getCore().getMessageManager();j.updateProperty(n);if(u&&j._aMessages&&j._aMessages.length>0){sap.ui.getCore().getMessageManager().removeMessages(j._aMessages);j._aMessages=[];}if(e.getMessages()){j.propagateMessages(n,e.getMessages());}if(e.getBindingMode()===sap.ui.model.BindingMode.OneTime){e.detachChange(l);e.detachEvents(o.events);}},r=function(i){var A=[];var u=i.getParameter("messageSource");var v=i.getParameter("messages");if(u=="control"){j._aMessages=v;}if(j._aMessages&&j._aMessages.length>0){A=A.concat(j._aMessages);}if(e.getMessages()){A=A.concat(e.getMessages());}j.propagateMessages(n,A);};a=this.getBindingContext(o.model);q.each(o.parts,function(i,P){a=j.getBindingContext(P.model);m=j.getModel(P.model);t=P.type;if(typeof t=="string"){h=q.sap.getObject(t);t=new h(P.formatOptions,P.constraints);}e=m.bindProperty(P.path,a,o.parameters);e.setType(t,I);e.setFormatter(P.formatter);s=P.mode||m.getDefaultBindingMode();e.setBindingMode(s);if(s!=sap.ui.model.BindingMode.TwoWay){g=sap.ui.model.BindingMode.OneWay;}k.push(e);});if(k.length>1||(o.formatter&&o.formatter.textFragments)){t=o.type;if(typeof t=="string"){h=q.sap.getObject(t);t=new h(o.formatOptions,o.constraints);}e=new C(k,o.useRawValues);e.setType(t,I);e.setBindingMode(o.mode||g);}else{e=k[0];}e.attachChange(l);e.attachMessageChange(r);e.setFormatter(q.proxy(o.formatter,this));o.binding=e;o.modelChangeHandler=l;e.attachEvents(o.events);e.initialize();};d.prototype.unbindProperty=function(n,s){var o=this.mBindingInfos[n],p=this.getMetadata().getPropertyLikeSetting(n);if(o){if(o.binding){o.binding.detachChange(o.modelChangeHandler);o.binding.detachEvents(o.events);}delete this.mBindingInfos[n];if(!s){this[p._sMutator](null);}}return this;};d.prototype.updateProperty=function(n){var o=this.mBindingInfos[n],a=o.binding,p=this.getMetadata().getPropertyLikeSetting(n);if(o.skipPropertyUpdate){return;}try{var v=a.getExternalValue();o.skipModelUpdate=true;this[p._sMutator](v);o.skipModelUpdate=false;}catch(e){o.skipModelUpdate=false;if(e instanceof sap.ui.model.FormatException){this.fireFormatError({element:this,property:n,type:a.getType(),newValue:a.getValue(),oldValue:this[p._sGetter](),exception:e,message:e.message},false,true);o.skipModelUpdate=true;this[p._sMutator](null);o.skipModelUpdate=false;}else{throw e;}}};d.prototype.updateModelProperty=function(n,v,o){if(this.isBound(n)){var a=this.mBindingInfos[n],e=a.binding;if(a.skipModelUpdate){return;}if(e&&e.getBindingMode()==sap.ui.model.BindingMode.TwoWay){try{a.skipPropertyUpdate=true;e.setExternalValue(v);a.skipPropertyUpdate=false;var g=e.getExternalValue();if(v!=g){this.updateProperty(n);}if(e.getType()){this.fireValidationSuccess({element:this,property:n,type:e.getType(),newValue:v,oldValue:o},false,true);}}catch(h){a.skipPropertyUpdate=false;if(h instanceof sap.ui.model.ParseException){this.fireParseError({element:this,property:n,type:e.getType(),newValue:v,oldValue:o,exception:h,message:h.message},false,true);}else if(h instanceof sap.ui.model.ValidateException){this.fireValidationError({element:this,property:n,type:e.getType(),newValue:v,oldValue:o,exception:h,message:h.message},false,true);}else{throw h;}}}}};var f=1;d.prototype.bindAggregation=function(n,o){var p,t,s,F,m=this.getMetadata(),a=m.getAggregation(n);if(!a){throw new Error("Aggregation \""+n+"\" does not exist in "+this);}if(typeof o=="string"){p=arguments[1];t=arguments[2];s=arguments[3];F=arguments[4];o={path:p,sorter:s,filters:F};if(t instanceof d){o.template=t;}else if(typeof t==="function"){o.factory=t;}}if(this.isBound(n)){this.unbindAggregation(n,true);}if(!(o.template||o.factory)){if(a._doesNotRequireFactory){o.factory=function(){throw new Error("dummy factory called unexpectedly ");};}else{throw new Error("Missing template or factory function for aggregation "+n+" of "+this+" !");}}if(o.template){if(o.template._sapui_candidateForDestroy){q.sap.log.warning("A template was reused in a binding, but was already marked as candidate for destroy. You better should declare such a usage with templateShareable:true in the binding configuration.");delete o.template._sapui_candidateForDestroy;}if(o.templateShareable===undefined){o.templateShareable=f;}o.factory=function(i){return o.template.clone(i);};}var S=o.path.indexOf(">");if(S>0){o.model=o.path.substr(0,S);o.path=o.path.substr(S+1);}this.mBindingInfos[n]=o;if(this.getModel(o.model)){this._bindAggregation(n,o);}return this;};d.prototype._bindAggregation=function(n,o){var t=this,a,m=function(h){var u="update"+n.substr(0,1).toUpperCase()+n.substr(1);if(t[u]){var s=h&&h.getParameter("reason");if(s){t[u](s);}else{t[u]();}}else{t.updateAggregation(n);}},e=function(h){var r="refresh"+n.substr(0,1).toUpperCase()+n.substr(1);if(t[r]){t[r](h.getParameter("reason"));}else{m(h);}};var g=this.getModel(o.model);if(this.isTreeBinding(n)){a=g.bindTree(o.path,this.getBindingContext(o.model),o.filters,o.parameters);}else{a=g.bindList(o.path,this.getBindingContext(o.model),o.sorter,o.filters,o.parameters);}if(this.bUseExtendedChangeDetection===true){a.enableExtendedChangeDetection();}o.binding=a;o.modelChangeHandler=m;o.modelRefreshHandler=e;a.attachChange(m);a.attachRefresh(e);a.attachEvents(o.events);a.initialize();};d.prototype.unbindAggregation=function(n,s){var o=this.mBindingInfos[n],a=this.getMetadata().getAggregation(n);if(o){if(o.binding){o.binding.detachChange(o.modelChangeHandler);o.binding.detachRefresh(o.modelRefreshHandler);o.binding.detachEvents(o.events);}if(o.template){if(!o.templateShareable&&o.template.destroy){o.template.destroy();}if(o.templateShareable===f){o.template._sapui_candidateForDestroy=true;}}delete this.mBindingInfos[n];if(!s){this[a._sDestructor]();}}return this;};d.prototype.updateAggregation=function(n){var o=this.mBindingInfos[n],a=o.binding,F=o.factory,A=this.getMetadata().getAggregation(n),e,N=null,g=null,G=null,s=null,t=this;this[A._sDestructor]();if(this.isTreeBinding(n)){var i=0,u=function(h,F,a,p){q.each(h,function(I,j){var k=t.getId()+"-"+i++;e=F(k,j);e.setBindingContext(j,o.model);p[A._sMutator](e);u(a.getNodeContexts(j),F,a,e);});};u(a.getRootContexts(),F,a,this);}else{g=A._sMutator+"Group";G=a.isGrouped()&&this[g];q.each(a.getContexts(o.startIndex,o.length),function(I,h){if(G&&a.aSorters.length>0){N=a.aSorters[0].fnGroup(h);if(typeof N=="string"){N={key:N};}if(N.key!==s){var j;if(o.groupHeaderFactory){j=o.groupHeaderFactory(N);}t[g](N,j);s=N.key;}}var k=t.getId()+"-"+I;e=F(k,h);e.setBindingContext(h,o.model);t[A._sMutator](e);});}};d.prototype.refreshAggregation=function(n){var o=this.mBindingInfos[n],a=o.binding;a.getContexts(o.startIndex,o.length);};d.prototype.propagateMessages=function(n,m){q.sap.log.warning("Message for "+this+", Property "+n);};d.prototype.isTreeBinding=function(n){return false;};d.prototype.updateBindings=function(u,m){var t=this;function a(o){var p=o.parts,i;if(p&&p.length>1){for(i=0;i<p.length;i++){if((u||p[i].model==m)&&!o.binding.aBindings[i].updateRequired(t.getModel(p[i].model))){return true;}}}else if(o.factory){return(u||o.model==m)&&!o.binding.updateRequired(t.getModel(o.model));}else{return(u||p[0].model==m)&&!o.binding.updateRequired(t.getModel(p[0].model));}return false;}function e(o){var p=o.parts,i;if(p){for(i=0;i<p.length;i++){if(!t.getModel(p[i].model)){return false;}}return true;}else if(o.factory){return!!t.getModel(o.model);}return false;}q.each(this.mBindingInfos,function(n,o){if(o.binding&&a(o)){o.binding.detachChange(o.modelChangeHandler);if(o.modelRefreshHandler){o.binding.detachRefresh(o.modelRefreshHandler);}o.binding.detachEvents(o.events);delete o.binding;}if(!o.binding&&e(o)){if(o.factory){t._bindAggregation(n,o);}else{t._bindProperty(n,o);}}});};d.prototype.isBound=function(n){return(n in this.mBindingInfos);};d.prototype.getObjectBinding=function(m){return this.mBoundObjects[m]&&this.mBoundObjects[m].binding;};d.prototype.getEventingParent=function(){return this.oParent;};d.prototype.getBinding=function(n){return this.mBindingInfos[n]&&this.mBindingInfos[n].binding;};d.prototype.getBindingPath=function(n){var i=this.mBindingInfos[n];return i&&(i.path||(i.parts&&i.parts[0]&&i.parts[0].path));};d.prototype.setBindingContext=function(o,m){var O=this.oBindingContexts[m];if(O!==o){this.oBindingContexts[m]=o;this.updateBindingContext(false,true,m);this.propagateProperties(m);}return this;};d.prototype.setElementBindingContext=function(o,m){var O=this.mElementBindingContexts[m];if(O!==o){this.mElementBindingContexts[m]=o;this.updateBindingContext(true,true,m);this.propagateProperties(m);}return this;};d.prototype.updateBindingContext=function(s,S,F,u){var m,o={},a,e,g,t=this;if(u){for(a in this.oModels){if(this.oModels.hasOwnProperty(a)){o[a]=a;}}for(a in this.oPropagatedProperties.oModels){if(this.oPropagatedProperties.oModels.hasOwnProperty(a)){o[a]=a;}}}else{o[F]=F;}for(a in o){if(o.hasOwnProperty(a)){a=a==="undefined"?undefined:a;m=this.getModel(a);g=this.mBoundObjects[a];if(m&&g&&g.sBindingPath&&!s){if(!g.binding){this._bindObject(a,g);}else{e=this._getBindingContext(a);if(e!==g.binding.getContext()){g.binding.setContext(e);}}continue;}q.each(this.mBindingInfos,function(n,h){var j=h.binding;var p=h.parts,i;if(!j){return;}if(p&&p.length>1){for(i=0;i<p.length;i++){if(p[i].model==a){j.aBindings[i].setContext(t.getBindingContext(p[i].model));}}}else if(h.factory){if(h.model==a){j.setContext(t.getBindingContext(h.model));}}else{if(p[0].model==a){j.setContext(t.getBindingContext(p[0].model));}}});if(!S){var e=this.getBindingContext(a);for(var n in this.mAggregations){var A=this.mAggregations[n];if(A instanceof d){A.oPropagatedProperties.oBindingContexts[a]=e;A.updateBindingContext(false,false,a);}else if(A instanceof Array){for(var i=0;i<A.length;i++){A[i].oPropagatedProperties.oBindingContexts[a]=e;A[i].updateBindingContext(false,false,a);}}}}}}};d.prototype.getBindingContext=function(m){if(this.mElementBindingContexts[m]){return this.mElementBindingContexts[m];}return this._getBindingContext(m);};d.prototype._getBindingContext=function(m){var o=this.getModel(m);if(this.oBindingContexts[m]){return this.oBindingContexts[m];}else if(o&&this.oParent&&this.oParent.getModel(m)&&o!=this.oParent.getModel(m)){return undefined;}else{return this.oPropagatedProperties.oBindingContexts[m];}};d.prototype.setModel=function(m,n){if(!m&&this.oModels[n]){delete this.oModels[n];this.propagateProperties(n);this.updateBindings(false,n);}else if(m&&m!==this.oModels[n]){this.oModels[n]=m;this.propagateProperties(n);this.updateBindingContext(false,true,n);this.updateBindings(false,n);}return this;};d.prototype.propagateProperties=function(n){var p=this._getPropertiesToPropagate(),u=n===true,N=u?undefined:n,a,A,i;for(a in this.mAggregations){if(this.mSkipPropagation[a]){continue;}A=this.mAggregations[a];if(A instanceof d){this._propagateProperties(n,A,p,u,N);}else if(A instanceof Array){for(i=0;i<A.length;i++){if(A[i]instanceof d){this._propagateProperties(n,A[i],p,u,N);}}}}};d.prototype._propagateProperties=function(n,o,p,u,N){if(!p){p=this._getPropertiesToPropagate();u=n===true;N=u?undefined:n;}o.oPropagatedProperties=p;o.updateBindings(u,N);o.updateBindingContext(false,true,N,u);o.propagateProperties(n);};d.prototype._getPropertiesToPropagate=function(){var n=q.isEmptyObject(this.oModels),N=q.isEmptyObject(this.oBindingContexts),a=q.isEmptyObject(this.mElementBindingContexts);function m(e,o,g,h){return e?o:q.extend({},o,g,h);}if(N&&n&&a){return this.oPropagatedProperties;}else{return{oModels:m(n,this.oPropagatedProperties.oModels,this.oModels),oBindingContexts:m((N&&a),this.oPropagatedProperties.oBindingContexts,this.oBindingContexts,this.mElementBindingContexts)};}};d.prototype.getModel=function(n){return this.oModels[n]||this.oPropagatedProperties.oModels[n];};d.prototype.hasModel=function(){return!(q.isEmptyObject(this.oModels)&&q.isEmptyObject(this.oPropagatedProperties.oModels));};d.prototype.clone=function(I,l,o){var a=true,e=true;if(o){a=!!o.cloneChildren;e=!!o.cloneBindings;}if(!I){I=M.uid("clone")||q.sap.uid();}if(!l&&a){l=q.map(this.findAggregatedObjects(true),function(O){return O.getId();});}var m=this.getMetadata(),g=m._oClass,s=this.getId()+"-"+I,S={},p=this.mProperties,k,n,h,j=d.bindingParser.escape;for(k in p){if(p.hasOwnProperty(k)&&!(this.isBound(k)&&e)){if(typeof p[k]==="string"){S[k]=j(p[k]);}else{S[k]=p[k];}}}S["models"]=this.oModels;S["bindingContexts"]=this.oBindingContexts;if(a){for(n in this.mAggregations){var A=this.mAggregations[n];if(m.hasAggregation(n)&&!(this.isBound(n)&&e)){if(A instanceof d){S[n]=A.clone(I,l);}else if(q.isArray(A)){S[n]=[];for(var i=0;i<A.length;i++){S[n].push(A[i].clone(I,l));}}else{S[n]=A;}}}for(n in this.mAssociations){var r=this.mAssociations[n];if(q.isArray(r)){r=r.slice(0);for(var i=0;i<r.length;i++){if(q.inArray(r[i],l)>=0){r[i]+="-"+I;}}}else if(q.inArray(r,l)>=0){r+="-"+I;}S[n]=r;}}h=new g(s,S);for(n in this.mBoundObjects){h.mBoundObjects[n]=q.extend({},this.mBoundObjects[n]);}for(n in this.mEventRegistry){h.mEventRegistry[n]=this.mEventRegistry[n].slice();}if(e){for(n in this.mBindingInfos){var t=this.mBindingInfos[n];var u=q.extend({},t);if(!t.templateShareable&&t.template&&t.template.clone){u.template=t.template.clone(I,l);delete u.factory;}else if(t.templateShareable===f){t.templateShareable=u.templateShareable=true;q.sap.log.error("A shared template must be marked with templateShareable:true in the binding info");}delete u.binding;if(t.factory||t.template){h.bindAggregation(n,u);}else{h.bindProperty(n,u);}}}return h;};d._handleLocalizationChange=function(p){var i;if(p===1){q.each(this.oModels,function(n,m){if(m&&m._handleLocalizationChange){m._handleLocalizationChange();}});}else if(p===2){q.each(this.mBindingInfos,function(n,o){var P=o.parts;if(P){for(i=0;i<P.length;i++){if(o.type&&o.type._handleLocalizationChange){o.type._handleLocalizationChange();}}if(o.modelChangeHandler){o.modelChangeHandler();}}});}};d._mapAggregation=function(p,o,n){var k=p.getMetadata().getAllSettings();var O=k[o];var N=k[n];if(!O||!N||O._iKind!=2||N._iKind!=2){return;}var F={"insert":true,"add":true,"remove":true,"removeAll":false,"indexOf":true,"destroy":false,"get":false};function m(P,g){return P+g.substring(0,1).toUpperCase()+g.substring(1);}function a(g){return function(){return this[g].apply(this,arguments);};}for(var P in F){var s=m(P,F[P]?O.singularName:O.name);var e=m(P,F[P]?N.singularName:N.name);p[s]=a(e);}};d.prototype.findAggregatedObjects=function(r){var A=[];function F(o){for(var n in o.mAggregations){var a=o.mAggregations[n];if(q.isArray(a)){for(var i=0;i<a.length;i++){A.push(a[i]);if(r){F(a[i]);}}}else if(a instanceof d){A.push(a);if(r){F(a);}}}}F(this);return A;};return d;},true);