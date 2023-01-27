/**
 * @external L.DivOverlay
 * 
 * @see https://github.com/Leaflet/Leaflet/tree/v1.9.3/src/layer/DivOverlay.js
 */

const divOverlayProto = L.extend({}, L.DivOverlay.prototype);

L.DivOverlay.include({

    getEvents: function() {
        return L.extend(divOverlayProto.getEvents.apply(this, arguments), { rotate: this._updatePosition });
    },

    _updatePosition: function() {
        // 0. update anchor (leaflet v1.9.3)
        divOverlayProto._updatePosition.apply(this, arguments);
        // 1. subtract anchor
        // 2. rotate element
        // 3. restore anchor
        if (this._map && this._map._rotate && this._zoomAnimated) {
            var anchor = this._getAnchor();
            var pos = L.DomUtil.getPosition(this._container).subtract(anchor);
            L.DomUtil.setPosition(this._container, this._map.rotatedPointToMapPanePoint(pos).add(anchor));
        }

    },

});
