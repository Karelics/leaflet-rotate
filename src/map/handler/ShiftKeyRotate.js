/*
 * L.Handler.ShiftKeyRotate is used by L.Map to add shift-wheel rotation.
 */

// @namespace Map
// @section Interaction Options
L.Map.mergeOptions({

    // @section Touch interaction options
    // @option touchRotate: Boolean|String = *
    // Whether the map can be rotated with a two-finger rotation gesture
    shiftKeyRotate: true,

});

L.Map.ShiftKeyRotate = L.Handler.extend({

    addHooks: function() {
        L.DomEvent.on(this._map._container, "wheel", this._handleShiftScroll, this);
        // this._map.shiftKeyRotate.enable();
        this._map.shiftKeyRotate.rotate = true;
    },

    removeHooks: function() {
        L.DomEvent.off(this._map._container, "wheel", this._handleShiftScroll, this);
        this._map.shiftKeyRotate.rotate = false;
    },

    _handleShiftScroll: function(e) {
        if (e.shiftKey) {
            e.preventDefault();
            this._map.scrollWheelZoom.disable();
            this._map.setBearing((this._map._bearing * L.DomUtil.RAD_TO_DEG) + e.deltaY);
        } else {
            this._map.scrollWheelZoom.enable();
        }
    },

});

// @section Handlers
// @property touchZoom: Handler
// Touch rotate handler.
L.Map.addInitHook('addHandler', 'shiftKeyRotate', L.Map.ShiftKeyRotate);